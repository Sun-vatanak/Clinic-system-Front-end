import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useSubcategoryStore = defineStore('views/subcategory_store', {
    state: () => ({
        searchQuery: "",
        frm: {
            name: '',
            category_id: '',
        },
        crop: {
            img: '',
            blob: null,
            avatar: '/default.png'
        },
        vv: null,
        selectedId: 0,
        mdl_add: null,
        mdl_delete: null,
        mdl_edit: null,
        mdl_crop: null,

        subcategories: ref([]),
        currentPage: ref(1),
        totalPages: ref(1),
        perPage: 10,
        total_records: ref(1),
        searchQuery: ref(""),
        isLoading: ref(false),
    }),
    actions: {
        async onloadSubcategory() {
            this.isLoading = true;
            try {
                const response = await axios.get(
                    `/api/subcategories?scol=id&sdir=desc&per_page=${this.perPage}&page=${this.currentPage}&search=${this.searchQuery}`
                );
                if (response.data.result) {
                    this.subcategories = response.data.data;
                    this.totalPages = response.data.paginate.total_page;
                    this.total_records = response.data.paginate.total;
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
                this.onloadSubcategory();
            }
        },
    }
});