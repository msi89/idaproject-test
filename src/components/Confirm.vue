<template>
  <div class="confirm" :class="{visible: visible}" :style="styles">
    <span class="confirm-title">{{message}}</span>
    <div class="confirm-actions">
      <button @click="handlerClick(0)">Cancel</button>
      <button @click="handlerClick(1)" class="btn-default">Confirm</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirm",
  props: ["message", "styles"],
  data() {
    return { visible: false };
  },
  methods: {
    handlerClick(e) {
      this.$emit("onconfirm", e);
      this.close();
    },
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    }
  }
};
</script>

<style>
.confirm {
  z-index: 999;
  position: absolute;
  min-width: 254px;
  max-width: 325px;
  height: 96px;
  top: 48px;
  right: 0;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  visibility: hidden;
}
.confirm.visible {
  visibility: visible;
}
.confirm-title {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #282136;
}
.confirm-actions {
  display: flex;
}
.confirm-actions button {
  border-radius: 6px;
}
</style>