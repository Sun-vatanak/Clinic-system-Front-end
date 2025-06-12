import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "./auth/auth";
export const useUserStore = defineStore("views/user_store", {
  state: () => ({
    frm: {
      first_name: "",
      last_name: "",
      gender: 1,
      email: "",
      phone: "",
      address: "",
      role_id: "",
      is_remove: 0,
      pass: "",
      con_pass: "",
      created_at: "",
      updated_at: "",
    },

    crop: {
      img: "",
      blob: null,
      avatar: "/default.png",
    },
    v_validate: null,
    spinnerId: ref(0),
    selectedId: 0,
    is_active: false,
    itemsPerPage: 6,
    currentPage: 1,
    error_Message: "",

    mdl_errorTypeImage: null,
    mdl_add: null,
    mdl_delete: null,
    mdl_edit: null,
    mdl_crop: null,
    mdl_view: null,

    data_users: ref([]),
    currentPage: ref(1),
    totalPages: ref(1),
    perPage: 10,
    total_records: ref(1),
    searchQuery: ref(""),
    selectedRole: ref(""),
    isLoading: ref(false),
  }),
  actions: {
    async onloadUser() {
      this.isLoading = true;
      const authStore = useAuthStore();
      try {
        const response = await axios.get(`/api/users?scol=id&sdir=desc&per_page=${this.perPage}&page=${this.currentPage}&search=${this.searchQuery}&role_id=${this.selectedRole}`);
        if (response.data.result) {
          this.data_users = response.data.data;
          this.totalPages = response.data.paginate.total_page;
          this.total_records = response.data.paginate.total;
          this.selectedRole = "" ? null : this.selectedRole;
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
  },
});
