/* eslint-disable */
import { createStore } from "vuex";
import db from "../firebase/firebaseInit";
import { collection, getDocs } from "firebase/firestore";

export default createStore({
  state: {
    invoiceData: [],
    invoiceModal: null,
    modalActive: null,
    invoicesLoaded: null,
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(payload);
      console.log(state.invoiceData);
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
  },
  actions: {
    async GET_INVOICES({ commit, state }) {
      const getData = await getDocs(collection(db, "invoices"));
      getData.forEach((doc) => {
        const data = { docId: doc.id, ...doc.data() };
        commit("SET_INVOICE_DATA", data);
      });
      commit("INVOICES_LOADED");
    },
  },
  modules: {},
});
