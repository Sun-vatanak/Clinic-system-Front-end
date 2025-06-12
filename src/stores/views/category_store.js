import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useCategoryStore = defineStore('views/category_store', {
    state: () => ({
        frm: {
            name: '',
            is_remove: 0,
            photo:''
        },
        crop: {
            img: '',
            blob: null,
            avatar: '/default.png'
        },
        v_validate: null,
        selectedId: 0,
        error_message: "",
        categorys: [
            { id: 1, name: "Category 1", create_at: "2025-02-11" },
            { id: 2, name: "Category 2", create_at: "2025-02-11" },
            { id: 3, name: "Category 3", create_at: "2025-02-11" },
            { id: 4, name: "Category 4", create_at: "2025-02-11" },
            { id: 5, name: "Category 5", create_at: "2025-02-11" },
        ],
        currentPage: 1,
        itemsPerPage: 10,
        mdl_add: null,
        mdl_delete: null,
        mdl_edit: null,
        mdl_crop: null,
        modalErrorTypeImage: null,
        categories: ref([]),
        currentPage: ref(1),
        totalPages: ref(1),
        perPage: 10,
        total_records: ref(1),
        searchQuery: ref(""),
        isLoading: ref(false),
    }),
    actions: {
        async onloadCategory() {
            this.isLoading = true;
            try {
                const response = await axios.get(
                    `/api/categories?scol=id&sdir=desc&per_page=${this.perPage}&page=${this.currentPage}&search=${this.searchQuery}`
                );
                if (response.data.result) {
                    this.categories = response.data.data;
                    this.totalPages = response.data.paginate.total_page;
                    this.total_records = response.data.paginate.total;
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                this.isLoading = false;
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.onloadCategory();
            }
        },
    }
});
