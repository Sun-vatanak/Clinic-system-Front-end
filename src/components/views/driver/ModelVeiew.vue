<template>
  <div class="modal fade" id="mdl-view" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 p-3 rounded-4">
        <div class="modal-header border-0 d-flex align-items-center justify-content-between">
          <div class="text-dark-emphasis h5 fw-semibold">ព័ត៌មានលម្អិតអ្នកដឹកញ្ចូន</div>
          <a role="button" class="btn-exit bg-light" data-bs-dismiss="modal" aria-label="Close">
            <i class="bi bi-x fs-4 text-primary"></i>
          </a>
        </div>
        <div class="modal-body" v-if="selectedUser">
          <div>
            <div>
              <div class="d-flex align-items-center gap-3 mb-4">
                <div class="user-photo rounded-circle bg-light overflow-auto">
                  <img :src="selectedUser.user.profile.photo" class="card-img object-fit-cover" alt="" />
                </div>
                <div class="lh-1">
                  <h6 class="text-dark fw-semibold">
                    {{ selectedUser.user.profile.first_name + " " + selectedUser.user.profile.last_name }}
                  </h6>
                  <span class="text-dark-emphasis fs-14">
                    {{
                      selectedUser.user.role_id == 4
                        ? "អតិថិជន"
                        : selectedUser.user.role_id == 3
                        ? "អ្នកដឹកជញ្ជូន"
                        : selectedUser.user.role_id == 2
                        ? "អ្នកគ្រប់គ្រងហាង"
                        : "អ្អ្នកដឹកជញ្ជូន"
                    }}
                  </span>
                </div>
              </div>
              <div>
                <h6 class="border-dash mb-3">ទិន្នន័យផ្ទាល់ខ្លួនអ្នកប្រើប្រាស់</h6>
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="bg-icon">
                    <i class="bi bi-gender-trans text-primary"></i>
                  </div>
                  {{ selectedUser.user.profile.gender_id == 1 ? "ប្រុស" : "ស្រី" }}
                </div>
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="bg-icon"><i class="bi bi-telephone text-primary"></i></div>
                  {{ selectedUser.user.profile.phone }}
                </div>
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="bg-icon"><i class="bi bi-envelope text-primary"></i></div>
                  {{ selectedUser.user.email }}
                </div>
                <div class="d-flex align-items-center gap-2 mb-4">
                  <div class="bg-icon"><i class="bi bi-geo-alt text-primary"></i></div>
                  {{ selectedUser.user.profile.address }}
                </div>
                <h6 class="border-dash mb-3">កាលបរិច្ឆេត</h6>
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center gap-2 mb-3">
                    <div class="bg-icon">
                      <i class="bi bi-person-add text-primary"></i>
                    </div>
                    <span>Latitude  &nbsp;: {{ selectedUser.latitude }}</span>
                  </div>
                  <div class="d-flex align-items-center gap-2 mb-3">
                    <div class="bg-icon">
                      <i class="bi bi-pencil-square text-primary"></i>
                    </div>
                    <span>Longitude: {{ selectedUser.longitude}}</span>
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
import { Modal } from "bootstrap";
import { onMounted, ref } from "vue";
import { usederiverStore } from "@/stores/views/driver_store";

const driverStore  = usederiverStore();
const selectedUser = ref(null);

onMounted(() => {
  driverStore.mdl_view = Modal.getOrCreateInstance(document.getElementById("mdl-view"));
});

const openUserModal = (user) => {
  selectedUser.value = user;
  driverStore.mdl_view.show();
};

defineExpose({ openUserModal });
</script>