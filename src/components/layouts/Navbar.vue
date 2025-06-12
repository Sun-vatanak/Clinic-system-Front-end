<template>
  <div class="sticky-sidebar rounded-4 p-3 d-none d-xl-block">
    <div class="admin-logo-img d-flex justify-content-center">
      <img src="@/assets/img/logoSys.png" class="logo-admin  object-fit-cover  "  alt="" />
    </div>
    <ul class="list-unstyled scroll-bar mt-4">
      <li>
        <router-link to="/"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
          :class="{ 'text-primary bg-light rounded-5': route.name == 'home' }">
          <span><i class="bi bi-house"></i></span>
          <span>ទំព័រដើម</span>
        </router-link>
      </li>
      <li >
        <router-link to="/market"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
          :class="{ 'text-primary bg-light rounded-5': route.name == 'Market' }">
          <span><i class="bi bi-basket"></i></span>
          <span>គ្រប់គ្រងផ្សារ</span>
        </router-link>
      </li>
      <li >
        <router-link to="/product-category"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2" :class="{
            'text-primary bg-light rounded-5': route.name == 'ProductCategory',
          }">
          <span><i class="bi bi-folder"></i></span>
          <span>គ្រប់គ្រងប្រភេទ</span>
        </router-link>
      </li>
      <li >
        <router-link to="/subcategory"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2" :class="{
            'text-primary bg-light rounded-5': route.name == 'SubCategory',
          }">
          <span><i class="bi bi-diagram-3"></i></span>
          <span>ប្រភេទរង</span>
        </router-link>
      </li>
      <li >
        <router-link to="/user"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
          :class="{ 'text-primary bg-light rounded-5': route.name == 'User' }">
          <span><i class="bi bi-person"></i></span>
          <span>អ្នកប្រើប្រាស់</span>
        </router-link>
      </li>
      <li >
        <router-link to="/driver"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
          :class="{ 'text-primary bg-light rounded-5': route.name == 'Driver' }">
          <span><i class="bi bi-person-gear"></i></span>
          <span>អ្នកដឹកជញ្ចូន</span>
        </router-link>
      </li>
      <li >
        <router-link to="/tracking"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
          :class="{ 'text-primary bg-light rounded-5': route.name == 'Tracking' }">
          <span><i class="bi bi-truck"></i></span>
          <span>ការដឹកជញ្ជូន</span>
        </router-link>
      </li>
      <li >
        <router-link to="/vendor"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
          :class="{ 'text-primary bg-light rounded-5': route.name == 'Vendor' }">
          <span><i class="bi bi-shop"></i></span>
          <span>អ្នកលក់</span>
        </router-link>
      </li>
      <li >
        <router-link to="/orderadmin"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
          :class="{ 'text-primary bg-light rounded-5': route.name == 'OrderAdmin' }">
          <span><i class="bi bi-cart-check"></i></span>
          <span>ការលក់</span>
        </router-link>
      </li>
      <li>
        <div  @click="toggleSubmenu"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
          style="cursor: pointer;">
          <span><i class="bi bi-clipboard2-data"></i></span>
          <span>របាយការណ៍</span>
          <i :class="['ms-auto bi', isSubmenuOpen ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
        </div>

        <transition name="fade">
          <ul v-show="isSubmenuOpen" class="ps-4 list-unstyled">
            <li >
              <router-link to="/product-reports"
                class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
                :class="{ 'text-primary bg-light rounded-5': route.name == 'ProductReports' }">
                <span><i class="bi bi-box-seam"></i></span>
                <span>ផលិតផល</span>
              </router-link>
            </li>
            <li >
              <router-link to="/market-reports"
                class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
                :class="{ 'text-primary bg-light rounded-5': route.name == 'MarketReports' }">
                <span><i class="bi bi-basket"></i></span>
                <span>ផ្សារ</span>
              </router-link>
            </li>
            <li>
              <router-link to="/vendorreport"
                class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
                :class="{ 'text-primary bg-light rounded-5': route.name == 'VendorReport' }">
                <span><i class="bi bi-bar-chart"></i></span>
                <span>អ្នកលក់</span>
              </router-link>
            </li>
            <li>
              <router-link to="/deliveryreport"
                class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2"
                :class="{ 'text-primary bg-light rounded-5': route.name == 'DeliveryReport' }">
                <span><i class="bi bi-truck"></i></span>
                <span>អ្នកដឹកជញ្ចូន</span>
              </router-link>
            </li>
          </ul>
        </transition>
      </li>
      <li >
        <router-link to="/order"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2" :class="{
            'text-primary bg-light rounded-5':
              route.name == 'Order' ||
              route.name == 'OrderDetail'
          }">
          <span><i class="bi bi-card-list"></i></span>
          <span>គ្រប់គ្រងការកម្មង់</span>
        </router-link>
      </li>
      <li >
        <router-link to="/product"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2" :class="{
            'text-primary bg-light rounded-5': route.name == 'Product',
          }">
          <span><i class="bi bi-box-seam"></i></span>
          <span>ផលិតផល</span>
        </router-link>
      </li>
      <li >
        <router-link to="/sell-report"
          class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2" :class="{
            'text-primary bg-light rounded-5': route.name == 'SellReport',
          }">
          <span><i class="bi bi-bar-chart-line"></i></span>
          <span>របាយការណ៍លក់</span>
        </router-link>
      </li>
      <li>
        <a class="routerLink text-decoration-none text-truncate px-3 d-flex align-items-center gap-2 p-2 mb-2 text-dark"
          @click="openModalLogout">
          <span><i class="bi bi-box-arrow-right text-danger"></i></span>
          <span class="text-danger">ចាកចេញ</span>
        </a>
      </li>
    </ul>
  </div>

  <!-- offcanvase -->
  <div class="offcanvas offcanvas-start offcanvas-dashboard-pdt" tabindex="-1" id="sidebarBackdrop"
    aria-labelledby="admin-sidebar">
    <div class="offcanvas-header">
      <div class="admin-logo-img" id="admin-sidebar">
        <img src="@/assets/img/logo.png" class="logo-admin" alt="" />
      </div>
      <button type="button" class="border-0 ms-auto btn-light btn-back" data-bs-dismiss="offcanvas" aria-label="Close">
        <i class="bi bi-arrow-right-short text-primary fs-3"></i>
      </button>
    </div>
    <div class="offcanvas-body">
      <div>
        <ul class="list-unstyled">
          <li data-bs-dismiss="offcanvas" aria-label="Close">
            <router-link to="/"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5': route.name == 'home',
                'text-dark': !route.name == 'home',
              }">
              <span><i class="bi bi-speedometer2"></i></span>
              <span>ទំព័រដើម</span>
            </router-link>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/market"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5': route.name == 'Market',
                'text-dark': !route.name == 'Market',
              }">
              <span><i class="bi bi-basket"></i></span>
              <span>គ្រប់គ្រងផ្សារ</span>
            </router-link>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/product-category"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5':
                  route.name == 'ProductCategory',
                'text-dark': !route.name == 'productCategory',
              }">
              <span><i class="bi bi-grid"></i></span>
              <span>គ្រប់គ្រងប្រភេទ</span>
            </router-link>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/subcategory"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5': route.name == 'SubCategory',
                'text-dark': !route.name == 'SubCategory',
              }">
              <span><i class="bi bi-diagram-3"></i></span>
              <span>ប្រភេទរង</span>
            </router-link>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/user"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5': route.name == 'User',
                'text-dark': !route.name == 'User',
              }">
              <span><i class="bi bi-person"></i></span>
              <span>អ្នកប្រើប្រាស់</span>
            </router-link>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/driver"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5': route.name == 'Driver',
                'text-dark': !route.name == 'Driver',
              }">
              <span><i class="bi bi-person-gear"></i></span>
              <span>អ្នកដឹកជញ្ជូន</span>
            </router-link>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/tracking"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5': route.name == 'Tracking',
                'text-dark': !route.name == 'Tracking',
              }">
              <span><i class="bi bi-truck"></i></span>
              <span>ការដឹកជញ្ជូន</span>
            </router-link>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/vendor"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5': route.name == 'Vendor',
                'text-dark': !route.name == 'Vendor',
              }">
              <span><i class="bi bi-shop"></i></span>
              <span>អ្នកលក់</span>
            </router-link>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/orderadmin"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5': route.name == 'OrderAdmin',
                'text-dark': !route.name == 'OrderAdmin',
              }">
              <span><i class="bi bi-cart-check"></i></span>
              <span>ការលក់</span>
            </router-link>
          </li>
          <div  @click="toggleSubmenu"
            class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2"
            style="cursor: pointer;">
            <span><i class="bi bi-clipboard2-data"></i></span>
            <span>របាយការណ៍</span>
            <i :class="['ms-auto bi', isSubmenuOpen ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
          </div>
          <li>
            <transition name="fade">
              <ul v-show="isSubmenuOpen" class="ps-4 list-unstyled">
                <li data-bs-dismiss="offcanvas" aria-label="Close" >
                  <router-link to="/product-reports"
                    class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2"
                    :class="{ 'text-primary bg-light rounded-5': route.name == 'ProductReports' }">
                    <span><i class="bi bi-box-seam"></i></span>
                    <span>ផលិតផល</span>
                  </router-link>
                </li>
                <li data-bs-dismiss="offcanvas" aria-label="Close" >
                  <router-link to="/market-reports"
                    class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2"
                    :class="{ 'text-primary bg-light rounded-5': route.name == 'MarketReports' }">
                    <span><i class="bi bi-basket"></i></span>
                    <span>ផ្សារ</span>
                  </router-link>
                </li>
                <li data-bs-dismiss="offcanvas" aria-label="Close">
                  <router-link to="/vendorreport"
                    class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2"
                    :class="{ 'text-primary bg-light rounded-5': route.name == 'VendorReport' }">
                    <span><i class="bi bi-bar-chart"></i></span>
                    <span>អ្នកលក់</span>
                  </router-link>
                </li>
                <li data-bs-dismiss="offcanvas" aria-label="Close">
                  <router-link to="/deliveryreport"
                    class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2"
                    :class="{ 'text-primary bg-light rounded-5': route.name == 'DeliveryReport' }">
                    <span><i class="bi bi-truck"></i></span>
                    <span>អ្នកដឹកជញ្ចូន</span>
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/order"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5':
                  route.name == 'Order' ||
                  route.name == 'OrderDetail',
              }">
              <span><i class="bi bi-card-list"></i></span>
              <span>គ្រប់គ្រងការកម្មង់</span>
            </router-link>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/product"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5': route.name == 'Product',
              }">
              <span><i class="bi bi-box-seam"></i></span>
              <span>ផលិតផល</span>
            </router-link>
          </li>
          <li data-bs-dismiss="offcanvas" aria-label="Close" >
            <router-link to="/sell-report"
              class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2" :class="{
                'text-primary bg-light rounded-5': route.name == 'SellReport',
              }">
              <span><i class="bi bi-bar-chart-line"></i></span>
              <span>របាយការណ៍លក់</span>
            </router-link>
          </li>
          <li>
            <a class="routerLink text-decoration-none text-truncate d-flex align-items-center gap-2 p-2 text-danger"
              @click="openModalLogout">
              <span><i class="bi bi-box-arrow-right"></i></span>
              <span>ចាកចេញ</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <ModalLogout />
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from 'vue'
import { useProfileStore } from "@/stores/views/store_profile";
import ModalLogout from "@/components/views/profile/ModalConfirmLogout.vue";
// import { useAuthStore } from "@/stores/views/auth/auth";

// const authStore = useAuthStore();
const profileStore = useProfileStore();

const route = useRoute();

const openModalLogout = () => {
  profileStore.mdl_logout.show();
};
const isSubmenuOpen = ref(false)

function toggleSubmenu() {
  isSubmenuOpen.value = !isSubmenuOpen.value
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>