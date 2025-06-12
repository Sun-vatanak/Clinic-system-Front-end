import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
export const useAuthStore = defineStore("auth/login", {
  state: () => ({
    user: null,
    token: sessionStorage.getItem("token") || null,
    data: {
      email_or_phone: "",
      password: "",
      state: "active",
    },
    checkTypePassword: {
      showPassword: true,
    },
    vueValidation: null,
  }),

  actions: {
    login(userData, token) {
      this.user = userData;
      this.token = token;
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      router.push("/");
    },

    async logout() {
      try {
        await axios.post(
          "/api/logout",
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
      } catch (err) {
        console.error(err);
      } finally {
        this.user = null;
        this.token = null;
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];

        router.push("/login");
      }
    },

    loadUser() {
      const storedUser = sessionStorage.getItem("user");
      const storedToken = sessionStorage.getItem("token");
      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser);
        this.token = storedToken;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
      }
    },
  },
});
