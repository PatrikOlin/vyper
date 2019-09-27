<template>
  <div class="container mt-2">
    <h1>{{ title }}</h1>
    <div class="row">
      <div class="col-8 new-keyboard">
        <h3>Add new keyboard</h3>
        <form>
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              v-model="newKeyboard.name"
              name="nameInput"
              d
              class="form-control"
              placeholder="Keyboard name"
            />
          </div>
          <div class="form-group">
            <label>Layout</label>
            <input
              type="text"
              v-model="newKeyboard.layout"
              name="layoutInput"
              class="form-control"
              placeholder="Layout"
            />
          </div>
          <div class="form-group">
            <label>Switches</label>
            <input
              type="text"
              v-model="newKeyboard.switches"
              name="switchesInput"
              class="form-control"
              placeholder="Switches"
            />
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              v-model="newKeyboard.split"
              name="splitInput"
              id="splitInputCheck"
              class="form-check-input"
            />
            <label for="splitInputCheck" class="form-check-label">Split?</label>
          </div>
          <button type="button" class="btn btn-primary" v-on:click="saveKeyboard()">Save</button>
        </form>
      </div>
      <div class="col-4">
        <div>
          <h3>Current keyboard</h3>
          <div class="list-group-item">{{currentKeyboard}}</div>
        </div>

        <div>
          <h3>Your keyboards</h3>
          <ul class="list-group">
            <li class="list-group-item" v-for="keeb in keyboards" v-bind:key="keeb.name">
              <strong>{{keeb.name}}</strong>
              , {{keeb.switches}}
              <br />
              <small>{{keeb.layout}}</small>
              <small v-if="keeb.split">{{keeb.split}}</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Keyboards",
  data: function() {
    return {
      title: "Keyboards",
      currentKeyboard: null,
      newKeyboard: {
        name: "",
        layout: "",
        switches: "",
        split: false
      },
      keyboards: []
    };
  },
  mounted() {
    if (localStorage.keyboards) {
      this.keyboards = JSON.parse(localStorage.keyboards);
    }
  },
  methods: {
    saveKeyboard: function() {
      this.keyboards.push(this.newKeyboard);
      this.newKeyboard = {
        name: "",
        layout: "",
        switches: "",
        split: false
      };
      localStorage.keyboards = JSON.stringify(this.keyboards);
    }
  }
};
</script>

<style>
.list-group-item,
.form-group input {
  background-color: var(--bright-bg) !important;
  color: var(--text-color) !important;
  border: none !important;
}

.new-keyboard {
  text-align: left;
}

.btn-primary {
  background-color: var(--purple) !important;
  border-color: var(--purple) !important;
}
</style>