<template>
  <div class="container mt-2">
    <h1>{{ title }}</h1>
    <div class="row">
      <div class="col-8">
        <div class="paragraph" v-html="outputHTML">{{ originalParagraph }}</div>
        <div class="typer mt-3">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            placeholder="start typing here"
            v-model="typedText"
          ></textarea>
        </div>
      </div>
      <div class="col-4">
        <Timer ref="timer" v-on:is-typing="isTyping = $event" v-on:calc-score="calculateWpm()" />
        <div class="score mt-3">
          <h2>Score:</h2>
          <div class="alert-info mt-2">
            <strong>WPM:</strong>
            {{stats.current.wpm}}
          </div>
          <div class="alert-info mt-2">
            <strong>Typos:</strong>
            {{stats.current.typos}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from "./Timer.vue";
const PARAGRAPH = `There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable. There is another theory which states that this has already happened.`;
export default {
  name: "Typer",
  components: {
    Timer
  },
  data: function() {
    return {
      title: "Vue-typer",
      originalParagraph: PARAGRAPH,
      typedText: "",
      typoIndex: -1,
      isTyping: false,
      typos: 0,
      stats: {
        current: {},
        previous: {}
      }
    };
  },
  methods: {
    calculateWpm: function() {
      let correctlyTypedText = this.typedText;
      if (this.typoIndex != -1) {
        correctlyTypedText = this.originalParagraph.substring(
          0,
          this.typoIndex
        );
      }
      let words = correctlyTypedText.split(" ").length;
      if (this.stats.current) {
        this.stats.previous = this.stats.current;
      }
      this.stats.current = {
        wpm: words,
        typos: this.typos
      };
    }
  },
  computed: {
    outputHTML: function() {
      let newHTML = '<span class="correct">';
      if (this.typoIndex === -1) {
        newHTML += this.originalParagraph.substr(0, this.typedText.length);
        newHTML += "</span>";
        newHTML += this.originalParagraph.substr(this.typedText.length);
        return newHTML;
      }
      newHTML += this.originalParagraph.substr(0, this.typoIndex);
      newHTML += "</span>";
      newHTML += '<span class="typo">';
      newHTML += this.originalParagraph.substring(
        this.typoIndex,
        this.typedText.length
      );
      newHTML += "</span>";
      newHTML += this.originalParagraph.substr(this.typedText.length);
      return newHTML;
    }
  },
  watch: {
    typedText: function(value) {
      if (!this.isTyping) {
        this.$refs.timer.startTypingSpeed();
      }
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== this.originalParagraph[i]) {
          this.typoIndex = i;
          this.typos++;
          break;
        }
        this.typoIndex = -1;
      }
    }
  }
};
</script>

<style>
.correct {
  color: rgb(63, 81, 181);
  font-size: 22px;
}

.typo {
  color: #f00;
  font-size: 22px;
}
</style>