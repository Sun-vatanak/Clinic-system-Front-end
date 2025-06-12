import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Market from "@/views/MarketView.vue";
import ProductCategory from "@/views/CategoryView.vue";
import User from "@/views/UserView.vue";
import Order from "@/views/OrderView.vue";
import Product from "@/views/ProductView.vue";
import SellReport from "@/views/SellReportView.vue";
import ProfileView from "@/views/ProfileView.vue";
import OrderDetail from "@/views/OrderDetailView.vue";
import SubCategory from "@/views/SubcategoryView.vue";
import NotFound from "@/views/NotFound.vue";
import Driver from "@/views/DriverView.vue";
import Vendor from "@/views/VendorView.vue";
import Login from "@/views/AuthViews/Login.vue";
import { useAuthStore } from "@/stores/views/auth/auth";
import TrackingView from "@/views/TrackingView.vue";
import OrderAdminView from "@/views/OrderAdminView.vue";
import ForgetPassword from "@/views/AuthViews/ForgetPassword.vue";
import OTP from "@/views/AuthViews/OTP.vue";
import NewPassword  from "@/views/AuthViews/NewPassword.vue";
import ProductReportView from "@/views/ProductReportView.vue";
import VendorReportView from "@/views/VendorReportView.vue";
import DeliveryReportView from "@/views/DeliveryReportView.vue";
import MarketReport from "@/views/MarketReport.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "ទំព័រដើម",
        showNavbar: true,
        showHeader: true,
        roles: [1, 2],
      },
    },

    {
      path: "/market",
      name: "Market",
      component: Market,
      meta: {
        title: "ផ្សារ",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },

    {
      path: "/product-category",
      name: "ProductCategory",
      component: ProductCategory,
      meta: {
        title: "ប្រភេទផលិតផល",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
    {
      path: "/subcategory",
      name: "SubCategory",
      component: SubCategory,
      meta: {
        title: "ប្រភេទផលិតផលរង",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
    {
      path: "/user",
      name: "User",
      component: User,
      meta: {
        title: "អ្នកប្រើប្រាស់",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
    {
      path: "/driver",
      name: "Driver",
      component: Driver,
      meta: {
        title: "អ្នកដឹកជញ្ជូន",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
    {
      path: "/tracking",
      name: "Tracking",
      component: TrackingView,
      meta: {
        title: "ការដឹកជញ្ជូន",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
    {
      path: "/vendor",
      name: "Vendor",
      component: Vendor,
      meta: {
        title: "អ្នកលក់",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
    {
      path: "/vendorreport",
      name: "VendorReport",
      component: VendorReportView,
      meta: {
        title: "របាយការណ៍អ្នកលក់",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
    {
      path: "/deliveryreport",
      name: "DeliveryReport",
      component: DeliveryReportView,
      meta: {
        title: "របាយការណ៍អ្នកដឹកជញ្ចូន",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
    {
      path: "/orderadmin",
      name: "OrderAdmin",
      component: OrderAdminView,
      meta: {
        title: "ការលក់",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
    {
      path: "/order",
      name: "Order",
      component: Order,
      meta: {
        title: "ការកម្ម៉ង់",
        showNavbar: true,
        showHeader: true,
        roles: [2],
      },
    },
    {
      path: "/product",
      name: "Product",
      component: Product,
      meta: {
        title: "ផលិតផល",
        showNavbar: true,
        showHeader: true,
        roles: [2],
      },
    },
    {
      path: "/sell-report",
      name: "SellReport",
      component: SellReport,
      meta: {
        title: "របាយការណ៍លក់",
        showNavbar: true,
        showHeader: true,
        roles: [1, 2],
      },
    },
    {
      path: "/order-detail",
      name: "OrderDetail",
      component: OrderDetail,
      meta: {
        title: "ការបញ្ជាទិញ",
        showNavbar: true,
        showHeader: true,
        roles: [2],
      },
    },
    {
      path: "/profile-views",
      name: "ProfileViews",
      component: ProfileView,
      meta: {
        title: "ការកំណត់",
        showNavbar: true,
        showHeader: true,
        roles: [1, 2],
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/forget-password",
      name: "forgetPassword",
      component: ForgetPassword,
      meta: {
        title: "ភ្លេចពាក្យសម្ងាត់",
      },
    },
    {
      path: "/otp",
      name: "OTP",
      component: OTP,
      meta: {
        title: "លេខសម្ងាត់",
      },
    },
    {
      path: "/new-password",
      name: "newPassword",
      component: NewPassword,
      meta: {
        title: "លេខសម្ងាត់",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: {
        title: "ទំព័រមិនត្រូវបានរកឃើញ",
        showNavbar: false,
        showHeader: false,
      },
    },
    {
      path: "/product-reports",
      name: "ProductReports",
      component: ProductReportView,
      meta: {
        title: "របាការណ៌ផលិតផល",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
    {
      path: "/market-reports",
      name: "MarketReports",
      component: MarketReport,
      meta: {
        title: "របាការណ៌ផ្សារ",
        showNavbar: true,
        showHeader: true,
        roles: [1],
      },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   if (to.meta.requiresAuth && !authStore.token) {
//     next("/login");
//   } else if (
//     Array.isArray(to.meta.roles) &&
//     !to.meta.roles.includes(authStore.user?.role?.id)
//   ) {
//     next("/login");
//   } else {
//     next();
//   }
// });

router.afterEach((to) => {
  const defaultTitle = "ទំព័រដើម";
  document.title = to.meta.title || defaultTitle;
});
export default router;
