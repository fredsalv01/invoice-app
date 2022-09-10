import { createStore } from 'vuex'
import db from '../firebase/firebaseInit'
import {collection, getDocs} from 'firebase/firestore'

export default createStore({
  state: {
    invoiceData: [],
    invoiceModal: null,
    modalActive: null
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    }
  },
  actions: {
    async GET_INVOICES({commit, state}){
      const getData = await getDocs(collection(db, "invoices"));
      getData.forEach((doc) => {
        state.invoiceData.push({id: doc.id, ...doc.data() })
      })
    }
  },
  modules: {
  }
})
