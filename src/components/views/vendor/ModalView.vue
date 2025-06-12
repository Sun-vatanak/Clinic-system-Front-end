<template>
  <div class="modal fade" id="mdl-view" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 p-3 rounded-4">
        <div class="modal-header border-0 d-flex align-items-center justify-content-between">
          <div class="text-dark-emphasis h5 fw-semibold">ព័ត៌មានលម្អិតអ្នកប្រើប្រាស់</div>
          <a role="button" class="btn-exit bg-light" data-bs-dismiss="modal" aria-label="Close">
            <i class="bi bi-x fs-4 text-primary"></i>
          </a>
        </div>
        <div class="modal-body" v-if="vendorStore.selectedVendor">
          <div>
            <div>
            
              <div v-if="vendorStore.selectedVendor.user">
                <h6 class="border-dash mb-3">ទិន្នន័យផ្ទាល់ខ្លួនអ្នកប្រើប្រាស់</h6>
                <div class="d-flex align-items-center gap-3 mb-4">
                  <div class="user-photo rounded-circle bg-light overflow-auto">
                    <img :src="vendorStore.selectedVendor.user.profile.photo" class="card-img object-fit-cover" alt="" />
                  </div>
                  <div class="lh-1">
                    <h6 class="text-dark fw-semibold">
                      {{ vendorStore.selectedVendor.user.profile.first_name + " " + vendorStore.selectedVendor.user.profile.last_name }}
                    </h6>
                    <span class="text-dark-emphasis fs-14">
                      {{
                        vendorStore.selectedVendor.user.role_id == 4
                          ? "អតិថិជន"
                          : vendorStore.selectedVendor.user.role_id == 3
                          ? "អ្នកដឹកជញ្ជូន"
                          : vendorStore.selectedVendor.user.role_id == 2
                          ? "អ្នកគ្រប់គ្រងហាង"
                          : "អ្នកដឹកជញ្ជូន"
                      }}
                    </span>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="bg-icon">
                    <i class="bi bi-gender-trans text-primary"></i>
                  </div>
                  {{ vendorStore.selectedVendor.user.profile.gender_id == 1 ? "ប្រុស" : "ស្រី" }}
                </div>
                
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="bg-icon"><i class="bi bi-telephone text-primary"></i></div>
                  {{ vendorStore.selectedVendor.user.profile.phone }}
                </div>

                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="bg-icon"><i class="bi bi-envelope text-primary"></i></div>
                  {{ vendorStore.selectedVendor.user.email }}
                </div>
                <div class="d-flex align-items-center gap-2 mb-4">
                  <div class="bg-icon"><i class="bi bi-geo-alt text-primary"></i></div>
                  {{ vendorStore.selectedVendor.user.profile.address }}
                </div>
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="bg-icon">
                    <i class="bi bi-shop-window text-primary"></i>
                  </div>
                  {{ vendorStore.selectedVendor.business_name }}
                </div>
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="bg-icon"><i class="bi bi-shop text-primary"></i></div>
                  {{ vendorStore.selectedVendor.market_name }}
                </div>
                <h6 class="border-dash mb-3">កាលបរិច្ឆេត</h6>
                <div class="d-flex flex-column">
                  
                  <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="bg-icon"><i class="bi bi-door-open text-primary"></i></div>
                  {{ vendorStore.selectedVendor.open_time }} AM
                </div>
                <div class="d-flex align-items-center gap-2 mb-4">
                  <div class="bg-icon">
                    <i class="bi bi-door-closed text-primary"></i>
                  </div>
                  {{ vendorStore.selectedVendor.close_time }} PM
                </div>
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="bg-icon"><i class="bi bi-crosshair text-primary"></i></div>
                  {{ vendorStore.selectedVendor.latitude }}
                </div>
                <div class="d-flex align-items-center gap-2 mb-4">
                  <div class="bg-icon"><i class="bi bi-crosshair text-primary"></i></div>
                  {{ vendorStore.selectedVendor.longitude }}
                </div>
                
                </div>
              </div>
           
            </div>
          </div>
        </div>
        <div class="modal-body" v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useVendorStore } from "@/stores/views/vendor_store";
import { onMounted } from "vue";
import { Modal } from "bootstrap";

const vendorStore = useVendorStore();

onMounted(() => {
  vendorStore.mdl_view = Modal.getOrCreateInstance(document.getElementById("mdl-view"));
});
</script>