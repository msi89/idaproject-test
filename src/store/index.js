import Vue from "vue";
import Vuex from "vuex";
import { getProducts, deleteProducts } from "../api/request";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sortingList: [
      "Product (100g serving)",
      "Calories",
      "Fat(g)",
      "Carbs(g)",
      "Protein(g)",
      "Iron(%)",
    ],
    selectAll: false,
    sorting: 0,
    products: [],
    selectedProducts: [],
  },
  mutations: {
    SET_SELECT_ALL: (state, payload) => (state.selectAll = payload),
    SET_SORTING: (state, payload) => (state.sorting = payload),
    SET_PRODUCTS: (state, payload) => (state.products = payload),
    REMOVE_PRODUCT: (state, payload) => {
      state.products = state.products.filter((p) => p.id != payload.id);
    },
    REMOVE_PRODUCTS: (state) => {
      state.products = state.products.filter((pd) => {
        const i = state.selectedProducts.findIndex((s) => s.id == pd.id);
        if (i === -1) {
          return true;
        }
        return false;
      });
      state.selectedProducts = [];
      state.selectAll = false;
    },
    ADD_SELECTED_PRODUCTS: (state, payload) => {
      const i = state.selectedProducts.findIndex((p) => p.id == payload.id);
      if (i === -1) {
        state.selectedProducts.push(payload);
      }
    },
    REMOVE_SELECTED_PRODUCT: (state, payload) => {
      state.selectedProducts = state.selectedProducts.filter(
        (p) => p.id != payload.id
      );
    },
  },
  actions: {
    setSelectAll({ commit }, payload) {
      commit("SET_SELECT_ALL", payload);
    },
    setSorting({ commit }, payload) {
      commit("SET_SORTING", payload);
    },
    async fetchProducts({ commit }) {
      try {
        const response = await getProducts();
        commit("SET_PRODUCTS", response);
        return response;
      } catch (error) {
        return error;
      }
    },
    async removeProduct(context, product) {
      try {
        const response = await deleteProducts();
        context.commit("REMOVE_PRODUCT", product);
        return response;
      } catch (error) {
        return error;
      }
    },
    async removeProducts({ commit }) {
      try {
        const response = await deleteProducts();
        commit("REMOVE_PRODUCTS");
        return response;
      } catch (error) {
        return error;
      }
    },
    addSelectedProducts({ commit }, product) {
      commit("ADD_SELECTED_PRODUCTS", product);
    },
    removeSelectedProducts({ commit }, product) {
      commit("REMOVE_SELECTED_PRODUCT", product);
    },
  },
  modules: {},
  getters: {
    sorting: (stable) => stable.sorting,
    sortingList: (stable) => stable.sortingList,
    products: (stable) => stable.products,
    selectedProducts: (stable) => stable.selectedProducts,
    selectAll: (stable) => stable.selectAll,
  },
});
