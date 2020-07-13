<template>
  <div class="check-container">
    <div class="checkbox" :style="style">
      <input type="checkbox" class="check" @change="change" v-model="checked" />
      <span class="checkmark" v-show="checked">&check;</span>
    </div>
    <span class="checkbox-label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    label: { type: String },
    size: { type: Number, default: 16 },
    color: { type: String, default: "#00A11E" }
  },
  data() {
    return {
      checked: false,
      target: null
    };
  },
  computed: {
    style() {
      return {
        background: this.background,
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    },
    background() {
      return this.checked ? this.color : "#fff";
    }
  },
  methods: {
    change(e) {
      this.$emit("changed", { target: e.target, checked: this.checked });
    },
    check() {
      this.checked = true;
      return this.checked;
    },
    uncheck() {
      this.checked = false;
      return this.checked;
    }
  }
};
</script>

<style scoped>
.check-container {
  display: flex;
  align-items: center;
  margin: 1px;
}

.checkbox {
  position: relative;
  max-width: 25px;
  max-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c6cbd4;
  /* transition: all 0.5s ease; */
}
.checkbox .check {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: 0;
  outline: none;
}

.checkbox .checkmark {
  color: #fff;
  font-weight: bold;
  transition: all 0.5s ease;
}
.check-container .checkbox-label {
  margin-left: 5px;
}
</style>