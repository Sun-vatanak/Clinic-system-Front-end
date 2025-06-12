import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "./auth/auth";
export const useTrackingStore = defineStore('views/Tracking_store', {
    state: () => ({
        frm: {

            order_number: '',
            first_name: '',
            last_name: '',
            phone: '',
            address: '',
            delivery_fee: '',
            total_amount: 0,
            delivery_status_id: '',
            created_date: '',
            is_remove: 0,
        },
    
        currentPage: 1,
        itemsPerPage: 10,
        selectedStatusID: ref(""),
        error_message: "",
        trackings: ref([]),
        currentPage: ref(1),
        totalPages: ref(1),
        perPage: 10,
        total_records: ref(1),
        isLoading: ref(false),


    }),
   
    actions: {
        async onloadTracking() {
            this.isLoading = true;
            const authStore = useAuthStore();
            try {
                const response = await axios.get(
                    `/api/delivery-trackings?scol=id&sdir=desc&per_page=${this.perPage}&page=${this.currentPage}&status_id=${this.selectedStatusID}`
                );
                if (response.data.result) {
                    console.log(response.data.data);
                    this.trackings = response.data.data;
                    this.totalPages = response.data.paginate.total_page;
                    this.total_records = response.data.paginate.total;
                    this.selectedStatusID = "" ? null : this.selectedStatusID;
                }
            } catch (error) {
                console.error("Error fetching trackings:", error);
            } finally {
                this.isLoading = false;
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.onloadTracking();
            }
        },
    }
});
