import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useSaleReportStore = defineStore('views/saleReport_store', {
    state: () => ({
        currentPage: 1,
        itemsPerPage: 7,
        frm: {
            customer: '',
            category: '',
            product: '',
            market: '',
            storeName: '',
            product: '',
            price: '',
            qty: '',
            totals: '',
            order_date: '',
        },

        crop: {
            img: '',
            blob: null,
            avatar: '/default.png'
        },
    
        total_order:ref(0),
        total_qty:ref(0),
        total_amount:ref(0),
        selectedId: 0,
        start_date:ref(''),
        end_date:ref(''),
        reposrt: ref([]),
        totalPages: ref(1),
        perPage: 10,
        total_records: ref(1),
        searchQuery: ref(''),
        isLoading: ref(false),


    }),
    actions: {
        
        async onLoadSaleReport() {
            this.isLoading = true;
            try {
                const res = await axios.get(`/api/vendor/order/report?per_page=${this.perPage}&start_date=${this.start_date}&end_date=${this.end_date}&search=${this.searchQuery}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    }
                });

                if (res.data.result) {
                    this.reposrt = res.data.data;
                    this.totalPages = res.data.paginate.total_page;
                    this.total_records = res.data.paginate.total;
                    this.total_order = res.data.paginate.total
                    this.total_qty = res.data.total_quantity
                    this.total_amount = res.data.total_amount_sum
                }

            } catch (error) {
                console.error("Error fetching subcategories:", error);
            } finally {
                this.isLoading = false;
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
              this.currentPage = page;
              this.onloadUser();
            }
          },

    }
})