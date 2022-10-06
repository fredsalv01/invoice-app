<template>
  <div v-if="currentInvoice" class="invoice-view container">
    <router-link class="nav-link flex" :to="{ name: 'home' }">
      <img src="@/assets/icon-arrow-left.svg" alt="arrow" /> Go Back
    </router-link>
    <!-- header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div
          class="status-button flex"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>
      <div class="right flex">
        <button
          @click="toggleEditInvoice(currentInvoice.docId)"
          class="dark-purple"
        >
          Edit
        </button>
        <button @click="deleteInvoice(currentInvoice.docId)" class="red">
          Delete
        </button>
        <button
          v-if="currentInvoice.invoicePending"
          @click="updateStatusToPaid(currentInvoice.docId)"
          class="green"
        >
          Mark as Paid
        </button>
        <button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          @click="updateStatusToPending(currentInvoice.docId)"
          class="orange"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- invoice details -->
    <div class="invoice-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
            class="item flex"
          >
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price.toFixed(2) }}</p>
            <p>{{ item.total.toFixed(2) }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ currentInvoice.invoiceTotal.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
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
};
</script>
<style lang="scss">
.invoice-view {
  .nav-link {
    margin-bottom: 2rem;
    align-items: center;
    color: #fff;
    font-size: 0.8rem;
    img {
      margin-right: 1rem;
      width: 0.6rem;
      height: 0.8rem;
    }
  }

  .header,
  .invoice-details {
    background-color: #1e2139;
    border-radius: 1.4rem;
  }

  .header {
    align-items: center;
    padding: 1.6rem 2rem;
    font-size: 0.8rem;

    .left {
      align-items: center;
      span {
        color: #dfe3fa;
        margin-right: 1rem;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;

        &:hover {
          opacity: 0.8;
          box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  .invoice-details {
    padding: 3rem;
    margin-top: 1.5rem;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 0.8rem;
        p:first-child {
          font-size: 1.5rem;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 0.6rem;
        }
        p:nth-child(2) {
          font-size: 1rem;
        }

        span {
          color: #888eb0;
          margin-right: 0.5rem;
        }
      }

      .right {
        font-size: 0.8rem;
        align-items: flex-end;
      }
    }

    .middle {
      margin-top: 3.2rem;
      color: #dfe3fa;
      gap: 1rem;

      h4 {
        font-size: 0.8rem;
        font-weight: 400;
        margin-bottom: 0.8rem;
      }

      p {
        font-size: 1rem;
      }

      .bill,
      .payment {
        flex: 1;
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 2rem;
        }
        p {
          font-weight: 600;
        }
      }

      .bill {
        p:nth-child(2) {
          font-size: 1rem;
        }
        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 0.8rem;
        }
      }

      .send-to {
        flex: 2;
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        padding: 2rem;
        border-radius: 1.4rem 1.4rem 0 0;
        background-color: #252945;
        .heading {
          color: #dfe3fa;
          font-size: 0.8rem;
          margin-bottom: 2rem;

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 2rem;
          font-size: 0.85rem;
          color: #fff;

          &:last-child {
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: #fff;
        padding: 2rem;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 1.3rem 1.3rem;
        box-shadow: 2px 8px 8px rgba(0, 0, 0, 0.5);

        p {
          flex: 1;
          font-size: 0.8rem;
        }

        p:nth-child(2) {
          font-size: 1.8rem;
          text-align: right;
        }
      }
    }
  }
}
</style>
