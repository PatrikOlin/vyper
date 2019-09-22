<template>
  <div class="container mt-2">
    <h1>{{ title }}</h1>
    <div class="row">
      <div class="col-8">
        <div class="paragraph" v-html="outputHTML">{{ originalParagraph }}</div>
        <div class="typer mt-3">
          <textarea
            class="form-control"
            id="typerTextArea"
            rows="10"
            placeholder="start typing here"
            v-model="typedText"
          ></textarea>
        </div>
      </div>
      <div class="col-4">
        <Timer ref="timer" v-on:is-typing="isTyping = $event" v-on:calc-score="calculateWpm()" />
        <div class="mt-2">
          <button class="btn btn-reset btn-block" @click="reset()">Reset</button>
        </div>
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
import PARAGRAPHS from "../assets/paragraphs.json";

export default {
  name: "Typer",
  components: {
    Timer
  },
  data: function() {
    return {
      title: "Vyper",
      paragraphs: PARAGRAPHS.paragraphs,
      originalParagraph: null,
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
    },
    pickNewParagraph() {
      const idx = Math.floor(Math.random() * this.paragraphs.length);
      this.originalParagraph = this.paragraphs[idx].paragraph;
    },
    reset() {
      this.isTyping = false;
      this.typoIndex = -1;
      this.pickNewParagraph();
      this.typedText = "";
      this.$refs.timer.resetTimer();
    }
  },
  created() {
    this.pickNewParagraph();
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
      if (
        this.isTyping &&
        this.typedText.length === this.originalParagraph.length &&
        this.typoIndex === -1
      ) {
        this.pickNewParagraph();
        this.typedText = "";
      }
    }
  }
};
</script>

<style>
.correct {
  color: var(--pink);
  font-size: 20px;
}

.typo {
  color: var(--hot-pink);
  font-size: 20px;
  text-decoration: underline;
  -webkit-text-decoration-color: var(--hot-pink);
  text-decoration-color: var(--hot-pink);
  -webkit-text-decoration-style: wavy;
  text-decoration-style: wavy;
}

.paragraph {
  text-align: left;
  font-size: 18px;
}

.typer textarea {
  color: var(--typed-text);
  background-color: var(--dark-bg);
  border: none;
}

.typer textarea:focus {
  color: var(--typed-text);
  background-color: var(--dark-bg);
  outline: none;
}
</style>