import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useOrderAdminStore = defineStore('views/orderadmin_store', {
    state: () => ({
        frm: {
            order_number: '',
            first_name : '',
            last_name: '',
            created_at: '',
            total_amount: '',
            status_id: '',
            is_remove: 0,
        },
        selectedId: 0,
        currentPage: 1,
        itemsPerPage: 10,
        mdl_refund: null,
        error_message: "",
        orderAdmins: ref([]),
        currentPage: ref(1),
        totalPages: ref(1),
        perPage: 10,
        total_records: ref(1),
        isLoading: ref(false),
        selectedStatusID: ref(""),
    }),
   
    actions: {
        async onloadOrderAdmin() {
            this.isLoading = true;
            try {
                const response = await axios.get(
                    `/api/orders?scol=id&sdir=desc&per_page=${this.perPage}&page=${this.currentPage}&status_id=${this.selectedStatusID}`
                );
                if (response.data.result) {
                    console.log(response.data.data);
                    this.orderAdmins = response.data.data;
                    this.totalPages = response.data.paginate.total_page;
                    this.total_records = response.data.paginate.total;
                    this.selectedStatusID = "" ? null : this.selectedStatusID;
                }
            } catch (error) {
                console.error("Error fetching Order Admin", error);
            } finally {
                this.isLoading = false;
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.onloadOrderAdmin();
            }
        },
    }
});
