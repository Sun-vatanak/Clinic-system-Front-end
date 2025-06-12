import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useMarketReportStore = defineStore("views/market_report_store", {
  state: () => ({
    selectedId: 0,
    markets: ref([]),
    isLoading: ref(false),
    selectType: ref(""),
    itemsPerPage: 10,
    currentPage: 1,
    currentPage: ref(1),
    totalPages: ref(1),
    perPage: 10,
    total_records: ref(1),
  }),

  actions: {
    async onloadMarketReport() {
      this.isLoading = true;
      try {
        const response = await axios.get(
            `/api/market-reports?type=${this.selectType}&scol=id&sdir=desc&per_page=${this.perPage}`
        );
        if (response.data.result) {
          this.markets = response.data.data;
          this.totalPages = response.data.paginate.total_page;
          this.total_records = response.data.paginate.total;
        }
      } catch (error) {
        console.error("Error fetching markets reports:", error);
      } finally {
        this.isLoading = false;
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.onloadMarketReport();
      }
    },
  },
});
