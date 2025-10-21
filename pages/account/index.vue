<template>
  <div class="main container transparent pb-5">
    <div class="row py-4">
      <div class="col-lg-8">
        <!-- Top cards here -->
        <div class="row">
          <!--Total Deposit here -->
          <div class="col-lg-4">
            <div class="card__holder d-flex p-3">
              <img src="~/assets/img/vectors/deposit.svg" alt="deposit" />

              <div v-if="loading" class="ml-3 w-50">
                <Skeleton class="mb-2" />
                <Skeleton />
              </div>

              <div v-else class="ml-3">
                <p class="text">Total Deposit</p>
                <h4 class="funds" :title="totalDeposit">
                  {{ $truncate(totalDeposit) }}
                </h4>
              </div>
            </div>
          </div>

          <!-- Campaign Expenses here -->
          <div class="col-lg-4">
            <div class="card__holder d-flex p-3">
              <IconsDisbursed />

              <div v-if="loading" class="ml-3 w-50">
                <Skeleton class="mb-2" />
                <Skeleton />
              </div>

              <div v-else class="ml-3">
                <p class="text">Expenses</p>
                <h4 class="funds" :title="expenses">
                  {{ $truncate(expenses) }}
                </h4>
              </div>
            </div>
          </div>

          <!--  Cash Balance here -->
          <div class="col-lg-4">
            <div class="card__holder d-flex p-3">
              <IconsTotalBalance />

              <div v-if="loading" class="ml-3 w-50">
                <Skeleton class="mb-2" />
                <Skeleton />
              </div>

              <div v-else class="ml-3">
                <p class="text">Cash Balance</p>
                <p class="funds" :title="cashBalace">
                  {{ $truncate(cashBalace) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Transactions table here -->
        <div class="mt-3">
          <TablesAccountTransactions />
        </div>
      </div>

      <div class="col-lg-4">
        <TablesAccountWallet @getWallet="reloadData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Account",
  layout: "dashboard",

  data: () => ({
    loading: false,
    wallet: {},
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),


    
   // show fiat balances when running in our dev funding mode
   isDevPayNow() {
     return process.env.NUXT_PUBLIC_PAYNOW_MODE === "dev";
   },

          totalDeposit() {
          const v = this.isDevPayNow
            ? (this.wallet?.MainWallet?.fiat_balance ?? 0) // fallback for dev
            : (this.wallet?.total_deposit ?? 0);           // real deposits in prod
          return `${this.$root.$options.filters.formatCurrency(v)}`;
        },

        expenses() {
      const v = this.wallet?.spend_for_campaign ?? 0;
      return `${this.$root.$options.filters.formatCurrency(v)}`;
    },

        cashBalace() {
      // in dev show fiat_balance; otherwise show on-chain token balance
      const main = this.wallet?.MainWallet || {};
      const v = this.isDevPayNow
        ? (main.fiat_balance ?? main.balance ?? 0)
        : (main.balance ?? 0);
      return `${this.$root.$options.filters.formatCurrency(v)}`;
    },
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.Organisation?.id;
    this.getWallet();
  },

  methods: {
    async getWallet() {
      try {
        this.loading = true;

        const response = await this.$axios.get(
          `/organisations/${this.orgId}/wallets`
        );

        if (response.status === "success") {
          console.log("WALLET", response.data);
          this.wallet = response?.data;
        }
      } catch (err) {
        console.log("Walleterr:::", err);
      } finally {
        this.loading = false;
      }
    },

        reloadData() {
      // light refresh of wallet summary
      this.getWallet();
    },
  },
};
</script>

<style scoped>
.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
  height: 6rem;
}

.text {
  color: #7c8db5;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0px !important;
}
.funds {
  color: var(--primary-blue);
  font-weight: 500;
  font-size: 1.125rem;
  padding-top: 5px;
  word-break: break-all;
}

.ml-3 {
  margin-left: 0.75rem !important;
}

.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
</style>
