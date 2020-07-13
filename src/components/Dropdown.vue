<template>
  <section class="dropdown">
    <button @click="visible = !visible">{{ text }}</button>
    <ul :class="{visible: visible}">
      <li v-for="(item,k) in dataset" :key="k" @click="onSelected(item)">
        <checkbox v-if="multiple" />
        <span>{{item}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import Checkbox from "./Checkbox";
export default {
  components: { Checkbox },
  props: {
    dataset: { type: Array },
    multiple: { type: Boolean }
  },
  data() {
    return {
      current: "Select item",
      visible: false,
      values: []
    };
  },
  mounted() {
    if (this.dataset.length > 0) {
      this.current = this.dataset[0];
    }
  },
  computed: {
    text() {
      if (this.multiple) {
        return `${this.values.length} item(s) selected`;
      }
      return this.current;
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    onSelected(item) {
      this.current = item;
      if (this.multiple) {
        this.addToValues(item);
        this.$emit("changed", this.values);
      } else {
        this.$emit("changed", this.current);
        this.close();
      }
    },
    addToValues(item) {
      const exist = this.values.findIndex(i => i === item) > -1;
      if (!exist) {
        this.values.push(item);
      }
    }
  }
};
</script>

<style>
.dropdown {
  position: relative;
  max-width: 230px;
  border: 1px solid #d5dae0;
  border-radius: 2px;
}
.dropdown::before {
  position: absolute;
  right: 5px;
  top: 3px;
  content: "\2304";
  color: #000;
  font-weight: 500;
}
.dropdown button {
  border: 0;
  width: 100%;
  height: 100%;
  padding: 2px 0px;
  padding-right: 25px;
}
.dropdown ul {
  z-index: 9991;
  list-style: none;
  position: absolute;
  top: 45px;
  right: 0;
  width: 204px;
  height: 243px;
  overflow: hidden;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  visibility: hidden;
}
.dropdown ul li {
  display: flex;
  padding: 10px 15px;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #282136;
}
.dropdown ul li:hover {
  background: rgba(0, 161, 30, 0.07);
}
.dropdown ul.visible {
  visibility: visible;
}
.dropdown ul li span {
  cursor: default;
}
</style>