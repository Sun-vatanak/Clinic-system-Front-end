import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useProductStore = defineStore("views/product_store", {
  state: () => ({
    selectedId: 0,
    vendor_id: 2,
    itemsPerPage: 6,
    currentPage: 1,
    error_Message: "",
    isDiscount: false,
    frm: {
      name: "",
      category: "",
      category_id: "",
      price: "",
      vendor: "",
      is_remove: 0,
      unit_measure: "",
      unit_measure_id: "",
      stock_qty: "",
      stock_level: "",
      description: "",
      discount: 0,
      start_date: "",
      end_date: "",
      photo: "",
    },
    frm_details: {
      name: "",
      price: "",
      stock_qty: "",
      stock_level: "",
      photo: "",
      description: "",
      discount: "",
      start_date: "",
      end_date: "",
      subcategory: "",
      measure: "",
      market: "",
    },
    crop: {
      img: "",
      blob: null,
      avatar: "/default.png",
    },

    products: ref([]),
    product_details: ref([]),
    subcategories: ref([]),

    mdl_errorTypeImage: null,
    v_validate: null,
    mdl_add: null,
    mdl_delete: null,
    mdl_crop: null,

    data_users: ref([]),
    currentPage: ref(1),
    totalPages: ref(1),
    perPage: 10,
    selectedSubcategory: ref(""),
    total_records: ref(1),
    searchQuery: ref(""),
    selectedRole: ref(""),
    isLoading: ref(false),
  }),
  actions: {
    async onloadProduct() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/api/products/dashboard?vendor_id=${this.vendor_id}&search=${this.searchQuery}&scol=id&sdir=desc&page=${this.currentPage}&per_page=${this.perPage}&subcategory_id=${this.selectedSubcategory}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.result) {
          this.products = response.data.data;
          this.totalPages = response.data.paginate.total_page;
          this.total_records = response.data.paginate.total;
          this.selectedStockLevel = "";
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.onloadProduct();
      }
    },
    async onloadSubcategory() {
      this.isLoading = true;
      try {
        const response = await axios.get(`/api/subcategories`);
        if (response.data.result) {
          this.subcategories = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
