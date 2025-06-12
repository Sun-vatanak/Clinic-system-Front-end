import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const usederiverStore = defineStore('views/driver_store', {
  state: () => ({
    searchQuery: ref(""),
    selectedRole: ref(""), 
    frm: {
      user_id: '',
      latitude: '',
      fname:'',
      lname:'',
      longitude: '',
      vin: '',
      is_active: '1',
    },
    crop: {
      img: '',
      blob: null,
      avatar: '/default.png',
    },
    driver: ref([]),
    selectedId: 0,
    users: [],
    vv: null,
    mdl_add: null,
    mdl_delete: null,
    mdl_edit: null,
    mdl_view: null,
    currentPage: ref(1),
    totalPages: ref(1),
    perPage: 10,
    total_records: ref(1),
    isLoading: false,
    spinnerId: null,
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      try {
        const response = await axios.get('/api/users?role_id=3');   
        if (response.data.result) {
          this.users = response.data.data;
          console.log(this.users);
          
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async onloadDriver() {
      this.isLoading = true;
      try {
        const response = await axios.get(`/api/deliveries?scol=id&sdir=desc&per_page=${this.perPage}&page=${this.currentPage}&search=${this.searchQuery}&role=${this.selectedRole}`);
        if (response.data.result) {
          this.driver = response.data.data;
          this.totalPages = response.data.paginate.total_page;
          this.total_records = response.data.paginate.total;
        }
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      } finally {
        this.isLoading = false;
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.onloadDriver();
      }
    },
  },
});