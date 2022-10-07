import { mapMutations, mapState } from "vuex";

export default (await import("vue")).defineComponent({
  name: "invoiceView",
  data() {
    return {
      currentInvoice: null,
    };
  },
  created() {
    this.getCurrentInvoice();
  },
  methods: {
    ...mapMutations(["SET_CURRENT_INVOICE"]),
    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
      this.currentInvoice = this.currentInvoiceArray[0];
    },
  },
  computed: {
    ...mapState(["currentInvoiceArray"]),
  },
});
function __VLS_template() {
  // @ts-ignore
  [
    currentInvoice,
    toggleEditInvoice,
    deleteInvoice,
    updateStatusToPaid,
    updateStatusToPending,
  ];
  return {};
}
