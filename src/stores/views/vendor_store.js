import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useVendorStore = defineStore('views/vendor_store', {
    state: () => ({
        searchQuery: "",
        selectedVendor: null, 
        // vendor: [],
        selectedId: 0,
        frm: {
            user_id: '',
            business_name: '',
            market_id: '',
            open_time: '',
            close_time: '',
            latitude: '',
            longitude: '',
            is_active: '',
            invoice_img:'',
            user: {
                is_active: '',
                profile: {
                    first_name: '',
                    last_name: '',
                    photo: '',
                },
            },
            is__remove: 0,
        },
        vv: null,
        mdl_add: null,
        mdl_delete: null,
        mdl_edit: null,
        mdl_crop: null,
        mdl_view: null,
        mdl_errorTypeImage:null,
        vendors: ref([]),
        invoice_img:'',
        error_Message:'',
        userVendor: ref([]),
        currentPage: ref(1),
        totalPages: ref(1),
        perPage: 10,
        total_records: ref(1),
        searchQuery: ref(""),
        isLoading: ref(false),
    }),
    actions: {
        async onloadVendor() {
            this.isLoading = true;
            try {
                const response = await axios.get(
                    `/api/vendors?scol=id&sdir=desc&per_page=${this.perPage}&page=${this.currentPage}&search=${this.searchQuery}`
                );
                if (response.data.result) {
                    this.vendors = response.data.data;
                    this.totalPages = response.data.paginate.total_page;
                    this.total_records = response.data.paginate.total;
                }
            } catch (error) {
                console.error("Error fetching markets:", error);
            } finally {
                this.isLoading = false;
            }
        },

        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.onloadVendor();
            }
        },

        async onloadSetvendor() {
            this.isLoading = true;
            try {
                const response = await axios.get(`/api/users?role_id=${2}`)
                if (response.data.result) {
                    this.userVendor = response.data.data;
                }
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            } finally {
                this.isLoading = false;
            }
        },
    }

});