import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useProfileStore = defineStore("views/profile_store", {
  state: () => ({
    frm: {
      first_name: "",
      last_name: "",
      gender_id: "",
      is_remove: 0,
      email:"",
      phone: "",
      address: "",
    },
    crop: {
      img: "",
      blob: null,
      avatar: "",
    },
    data: {
      currentPassword: "",
      new_password: "",
      new_password_confirmation: "",
    },
    checkTypePassword: {
      showCurrentPassword: false,
      showPassword: false,
      showConfirmPassword: false,
    },
    mdl_crop: null,
   
    mdl_delete: null,
    mdl_cf: null,
    mdl_errorTypeImage: null,
    Pfavtar: null,
    selectedId: 1,
    userinfo: ref({
      first_name: "",
      last_name: "",
      role_name: "",
    }),
    isLoading: false,
    error_Message: "",
    v_validate: null,
    vv: null,
  }),
  actions: {
    async onloadProfile() {
      this.isLoading = true;
      try {
        const response = await axios.get(`/api/profile/users`);
        if (response.data.result) {
          this.userinfo = response.data.data;
          this.frm.first_name = this.userinfo.first_name;
          this.frm.last_name = this.userinfo.last_name;
          this.frm.gender_id = this.userinfo.gender_id;
          this.frm.phone = this.userinfo.phone;
          this.frm.email = this.userinfo.email; 
          this.frm.address = this.userinfo.address;
          this.crop.avatar = this.userinfo.photo;
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});