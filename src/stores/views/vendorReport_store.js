import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useVendorReportStore = defineStore('views/vendorReport_store', {
    state: () => ({
        currentPage: 1,
        itemsPerPage: 7,
        frm: {
            user_id: '',
            first_name: '',
            last_name: '',
            photo: '',
            business_name: '',
            market_name: '',
            rating_count: '',
            order_count:'',
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
        vendor: ref([]),
        totalPages: ref(1),
        perPage: 10,
        total_records: ref(1),
        selectedRole: ref(''),
        isLoading: ref(false),
        market:ref([]),
        market_id:ref(''),
        type:ref(''),


    }),
    actions: {
        
        async onLoadVendoerReport() {
            this.isLoading = true;
            try {
                const res = await axios.get(`/api/vendor-reports?market_id=${this.market_id}&type=${this.type}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    }
                });

                if (res.data.result) {
                    this.vendor = res.data.data;
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
              this.onLoadVendoerReport();
            }
          },

        async onLoadMarket() {
            this.isLoading = true;
            try {
                const res = await axios.get(`/api/markets`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    }
                });

                if (res.data.result) {
                    this.market = res.data.data;
                }

            } catch (error) {
                console.error("Error fetching subcategories:", error);
            } finally {
                this.isLoading = false;
            }
        },

    }
})