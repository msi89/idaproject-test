<template>
  <table class="table">
    <thead>
      <tr>
        <th style="width: 50px;">
          <Checkbox @changed="onCheckAll" />
        </th>
        <th>Product(100g serving)</th>
        <th>Calories</th>
        <th>Fat(g)</th>
        <th>Carbs(g)</th>
        <th>Protein(g)</th>
        <th>Iron(%)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td colspan="7" align="center">Please wait...</td>
      </tr>
      <Row v-for="(product, n) in dataset" :key="n" :product="product" v-else />
    </tbody>
  </table>
</template>

<script>
import Checkbox from "./Checkbox";
import Row from "./ProductTableRow";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProductTable",
  props: {
    dataset: { type: Array },
    loading: { type: Boolean, default: true }
  },
  components: { Checkbox, Row },
  data() {
    return {
      selected: -1,
      checked: false
    };
  },
  computed: {
    ...mapGetters(["selectAll"])
  },
  methods: {
    ...mapActions(["setSelectAll"]),
    onSelected(i) {
      this.selected = i;
    },
    onCheckAll(e) {
      this.setSelectAll(e.checked);
    }
  }
};
</script>

<style>
table {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  border-collapse: collapse;
}
table th,
table td {
  font-style: normal;
  line-height: 24px;
  font-size: 14px;
}
table th {
  font-weight: 600;
  color: #282136;
  text-align: left;
  padding: 16px;
  border-bottom: 1px solid #ededed;
}
table td {
  font-weight: normal;
  color: #282136;
  padding: 12px 16px;
}
tbody tr:nth-child(odd) {
  background-color: #f8f9fa; /* #F8F9FA*/
  color: #fff;
}
tbody tr.selected {
  background: rgba(0, 161, 30, 0.07);
}
</style>
