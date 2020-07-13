<template>
  <div class="container">
    <h1 class="header-title">Table UI</h1>
    <div class="separator" />
    <div class="toolbar">
      <div class="tool-group">
        <h2>Sorting by:</h2>
        <button
          v-for="(srt, k) in sortingList"
          class="btn-link"
          :class="{ selected: sorting === k }"
          @click="setSorting(k)"
          :key="k"
        >{{ srt }}</button>
      </div>
      <div class="tool-group">
        <div class="tool-group">
          <button
            class="btn-default"
            id="btn-delete-all"
            :disabled="selectedProducts.length == 0"
            @click="onDeleteAll"
          >
            Delete
            <span
              v-if="selectedProducts.length"
              style="color: #fff"
            >({{ selectedProducts.length }})</span>
          </button>
          <Confirm
            style="width:400px"
            @onconfirm="onConfirmDeleteAll"
            ref="confirm"
            message="Are you sure you want to delete selected items?"
          />
        </div>
        <div class="tool-group">
          <dropdown :dataset="lines" @changed="pageSizeChange" />
        </div>
        <div class="tool-group">
          <button class="btn-pagin" @click="prevPage">
            <icon name="chevron-left" :size="12" />
          </button>
          <span style="margin: 0 2px">{{ pageNumber }}-{{ pageCount }} of {{ products.length }}</span>
          <button class="btn-pagin" @click="nextPage">
            <icon name="chevron-right" :size="12" />
          </button>
        </div>
        <div class="tool-group">
          <dropdown :dataset="sortingList" @changed="onSelectOption" :multiple="true" />
        </div>
      </div>
    </div>
    <ProductTable :dataset="filteredProducts" :loading="loading" />
  </div>
</template>

<script>
import ProductTable from "../components/ProductTable.vue";
import Checkbox from "../components/Checkbox.vue";
import Dropdown from "../components/Dropdown.vue";
import Icon from "../components/Icon.vue";
import Confirm from "../components/Confirm.vue";
import { mapGetters, mapActions } from "vuex";
import { getProducts } from "../api/request";
import { sortProduct } from "../helpers/sorting";
import { paginate } from "../helpers/utils";

export default {
  name: "ProductView",
  components: {
    ProductTable,
    Checkbox,
    Icon,
    Confirm,
    Dropdown
  },
  data() {
    return {
      loading: false,
      pageSize: 10,
      pageNumber: 1,
      lines: ["10 Per Page", "25 Per Page", "50 Per Page", "100 Per Page"]
    };
  },
  mounted() {
    this.loading = true;
    this.fetchProducts().then(response => {
      this.loading = false;
      if (response.error) {
        alert("Some errors occured, please refresh page");
      }
    });
  },
  computed: {
    ...mapGetters(["sortingList", "sorting", "products", "selectedProducts"]),
    filteredProducts() {
      return paginate(this.products, this.pageSize, this.pageNumber).sort(
        sortProduct(this.sorting)
      );
    },
    pageCount() {
      return Math.ceil(this.products.length / this.pageSize);
    }
  },
  methods: {
    ...mapActions({
      setSorting: "setSorting",
      fetchProducts: "fetchProducts",
      removeProducts: "removeProducts"
    }),
    pageSizeChange(e) {
      this.pageSize = parseInt(e.split(" ")[0]);
    },
    onDeleteAll() {
      this.$refs.confirm.show();
    },
    onConfirmDeleteAll() {
      this.removeProducts().then(response => {
        if (response.error) {
          alert("Some errors occured, please refresh page");
        } else {
          this.clearCheckedRow();
        }
      });
    },
    clearCheckedRow() {
      this.$children[3].$children.forEach(child => {
        child.uncheck();
      });
    },
    nextPage() {
      if (this.pageNumber <= this.pageCount) {
        this.pageNumber++;
      }
    },
    prevPage() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
      }
    },
    onSelectOption(values) {}
  }
};
</script>

<style lang="scss">
.btn-pagin {
  padding: 8.5px 10px;
}
.tool-group {
  position: relative;
}
</style>
