<template>
  <div class="container mt-2">
    <h1>{{ title }}</h1>
    <div class="row">
      <div class="col-8">
        <h3>Add new keyboard</h3>
        <form>
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              v-model="newKeyboard.name"
              name="nameInput"
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
            <label for="splitInputCheck" class="form-check-label"></label>
          </div>
          <button type="button" class="btn btn-primary" v-on:click="saveKeyboard()">Save</button>
        </form>
      </div>
      <div class="col-4">
        <div>
          <h3>Current keyboard</h3>
          {{currentKeyboard}}
        </div>

        <div>
          <h3>Your keyboards</h3>
          <ul class="list-group">
            <li class="list-group-item" v-for="keeb in keyboards">
              {{keeb.name}}, {{keeb.switches}}
              <small>{{keeb.layout}}, {{keeb.split}}</small>
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
  mounted() {},
  methods: {
    saveKeyboard: function() {
      this.keyboards.push(this.newKeyboard);
      this.newKeyboard = {
        name: "",
        layout: "",
        switches: "",
        split: false
      };
    }
  }
};
</script>

<style>
.list-group-item {
  background-color: var(--bg);
  color: var(--text-color);
}
</style>