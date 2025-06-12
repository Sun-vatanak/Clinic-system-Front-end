import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth/auth";

export const useHomeStore = defineStore("views/home_store", {
    state: () => ({
        vendorDash: {},
        orderChart: {},
        adminDash: {},
        customerChart: {},
        orderAminChart: {}
    }),
    actions: {
        async onloadVendorSummeries() {
            const authStore = useAuthStore();
            try {
                const res = await axios.get(`/api/vendor/dashboard/count`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                if (res.data.result) {
                    this.vendorDash = res.data.data;
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        },

        async fetchOrderChart() {
            const authStore = useAuthStore();
            try {
                const res = await axios.get(`/api/vendor/order/chart`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                if (res.data.result) {
                    this.orderChart = res.data.data;
                }
            } catch (error) {
                console.error("Error fetching order chart data:", error);
            }
        },
        async onloadAdminSummeries(){
            const authStore = useAuthStore();
            try {
                const res = await axios.get(`/api/admin/dash/count`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                if (res.data.result) {
                    this.adminDash = res.data;
                }
            } catch (error) {
                console.error("Error fetching admin dashboard header data:", error);
            }
        },

        async fetchCustomerChart() {
            const authStore = useAuthStore();
            try {
                const res = await axios.get(`/api/users/daily/count`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
        
                if (res.data.result) {
                    const { total_users, male, female } = res.data.data;
                    this.customerChart = { male, female };
                    return total_users;
                }
            } catch (error) {
                console.error("Error fetching customer chart data:", error);
            }
        },
        
        async fetchOrderAdminChart(){
            const authStore = useAuthStore();
            try {
                const res = await axios.get(`/api/orders/chart`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                if (res.data.result) {
                    this.orderAminChart = res.data.data;
                }
            } catch (error) {
                console.error("Error fetching order chart data:", error);
            }
        }

    },
});
