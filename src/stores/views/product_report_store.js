import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useProductReportStore = defineStore('views/product_report_store', {
    state: () => ({
        selectedId: 0,
        itemsPerPage: 10,
        currentPage: 1,
        error_Message: "",
        products: {},
        vendors: ref([]), 
        categories: ref([]), 
        selectedVendor: ref(''),  
        selectCategory: ref(''),  
        start_date: ref(''),  
        end_date: ref(''),  
        isLoading: ref(false),
        data_users: ref([]),
        currentPage: ref(1),
        totalPages: ref(1),
        perPage: 10,
        total_records: ref(1),
        isLoading: ref(false),
    }),
    actions: {
        async getProductReport() {
            this.isLoading = true;
            try {
                const response = await axios.get(`/api/products?vendor_id=${this.selectedVendor}&category_id=${this.selectCategory}&start_date=${this.start_date}&end_date=${this.end_date}&scol=id&sdir=desc&page=${this.currentPage}&per_page=${this.perPage}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                });
        
                if (response.data.data) {
                    this.products = response.data.data;
                } else {
                    this.products = [];
                }
        
                if (response.data.paginate) {
                    this.totalPages = response.data.paginate.total_page;
                    this.total_records = response.data.paginate.total;
                } else {
                    this.totalPages = 1;
                    this.total_records = this.products.length;
                }
        
            } catch (error) {
                console.error("Error fetching product report:", error);
            } finally {
                this.isLoading = false;
            }
        },
        

        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.getProductReport();

            }
        },

        async onloadVendor() {
            this.isLoading = true;
            try {
                const response = await axios.get(`/api/vendors`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                });

                if (response.data.result) {
                    this.vendors = response.data.data;
                }
            } catch (error) {
                console.error("Error fetching vendors:", error);
            } finally {
                this.isLoading = false;
            }
        },

        async onloadSubcateigy() {
            this.isLoading = true;
            try {
                const response = await axios.get(`/api/categories`);
                if (response.data.result) {
                    this.categories = response.data.data;
                }
            } catch (error) {
                console.error("Error fetching subcategory:", error);
            } finally {
                this.isLoading = false;
            }
        }
    }
});
