<template>
  <div class="timer">{{timeRemaining}}</div>
</template>

<script>
export default {
  name: "Timer",
  props: [],
  data: function() {
    return {
      timeRemaining: 60,
      typing: false,
      timerInterval: {}
    };
  },
  methods: {
    startTypingSpeed: function() {
      this.typing = true;
      this.$emit("is-typing", this.typing);
      this.startTimer();
    },
    startTimer: function() {
      this.timerInterval = setInterval(() => {
        if (this.timeRemaining === 0) {
          this.endTypingSpeed();
          return;
        }
        this.timeRemaining--;
      }, 1000);
    },
    endTypingSpeed: function() {
      clearInterval(this.timerInterval);
      this.typing = false;
      this.$emit("is-typing", this.typing);
      this.$emit("calc-score");
      this.timeRemaining = 60;
      document.activeElement.blur();
    },
    reset: function() {}
  }
};
</script>

<style>
.timer {
  font-size: 100px;
  text-align: center;
  color: white;
  border-radius: 100;
  background-color: green;
}
</style>