import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useDeliveryReportStore = defineStore('views/deliveryReport_store', {
    state: () => ({
        currentPage: 1,
        itemsPerPage: 7,
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
        delivery: ref([]),
        totalPages: ref(1),
        perPage: 10,
        total_records: ref(1),
        selectedRole: ref(''),
        isLoading: ref(false),
        type:ref(1),


    }),
    actions: {
        
        async onLoadDeliveryReport() {
            this.isLoading = true;
            try {
                const res = await axios.get(`/api/delivery-reports?&type=${this.type}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    }
                });

                if (res.data.result) {
                    this.delivery = res.data.data;
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
              this.onLoadDeliveryReport();
            }
          },
    }
})