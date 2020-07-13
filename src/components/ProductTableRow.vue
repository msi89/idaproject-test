<template>
  <tr :class="{ selected: (checked) }" v-if="product" @click="check">
    <td style="width: 50px;">
      <Checkbox @changed="onChecked" ref="rowCheck" />
    </td>
    <td>{{ product.product }}</td>
    <td>{{ product.calories }}</td>
    <td>{{ product.fat }}</td>
    <td>{{ product.carbs }}</td>
    <td>{{ product.protein }}</td>
    <td>{{ product.iron }}</td>
    <td style="width: 150px;" class="has-modal">
      <button class="btn-link btn-delete" id="btn-delete" @click="onDelete">
        <icon name="delete" :size="24" fill="#5B5E77" />delete
      </button>
      <!-- <Confirm
        @onconfirm="onConfirmDelete"
        ref="confirm"
        message="Are you sure you want to delete item?"
      />-->
      <div class="floating-modal">
        <span class="floating-modal-title">Are you sure you want to delete item?</span>
        <div class="floating-modal-actions">
          <button>Cancel</button>
          <button class="btn-default" @click="onConfirmDelete">Confirm</button>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import Checkbox from "./Checkbox";
import Icon from "./Icon.vue";
import Confirm from "./Confirm.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ProductTableRow",
  components: { Checkbox, Icon, Confirm },
  props: ["product"],
  data() {
    return {
      current: null,
      checked: false
    };
  },
  computed: {
    ...mapGetters(["selectedProducts", "selectAll"])
  },
  mounted() {
    this.uncheck();
  },
  watch: {
    selectAll: function(newValue, oldValue) {
      if (this.selectAll) {
        this.check();
      } else {
        this.uncheck();
      }
    }
  },
  methods: {
    ...mapActions([
      "addSelectedProducts",
      "removeSelectedProducts",
      "removeProduct"
    ]),
    check() {
      this.checked = this.$refs.rowCheck.check();
      this.handlerSelection();
    },
    uncheck() {
      this.checked = this.$refs.rowCheck.uncheck();
      this.handlerSelection();
    },
    handlerSelection() {
      if (this.checked) {
        this.current = this.product;
        this.addSelectedProducts(this.current);
      } else {
        this.removeSelectedProducts(this.current);
        this.current = null;
      }
    },
    onChecked(e) {
      this.checked = e.checked;
      this.handlerSelection();
    },
    onDelete() {
      //this.$refs.confirm.show();
    },
    onConfirmDelete() {
      this.removeProduct(this.current).then(response => {
        this.uncheck();
      });
    }
  }
};
</script>

<style scoped>
tr.selected,
tr:hover {
  background: rgba(0, 161, 30, 0.07);
}
.btn-delete {
  display: none;
  height: 100%;
  margin: 0;
  padding: 0;
}
tr:hover .btn-delete {
  display: flex;
}
tr {
  height: 48px;
}
.btn-delete:hover {
  background: transparent;
  color: #5b5e77;
}

.has-modal {
  position: relative;
}
.floating-modal {
  z-index: 999;
  position: absolute;
  width: 254px;
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
  transition: visibility 0.8s ease;
}

.floating-modal-title {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #282136;
}
.floating-modal-actions {
  display: flex;
}
.floating-modal-actions button {
  border-radius: 6px;
}
.btn-delete:focus ~ .floating-modal {
  visibility: visible;
}
</style>
