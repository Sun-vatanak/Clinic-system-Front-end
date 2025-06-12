<template>
  <div class="modal fade" id="mdl_logout" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-logout modal-sm">
      <div class="modal-content p-2 rounded-4 d-flex flex-column gap-2">
        <div class="modal-body d-flex flex-column gap-2 align-items-center pb-0">
          <div class="d-flex flex-column gap-3 py-0">
            <h1 class="fs-5 fw-semibold text-dark mb-0">ចាកចេញពីគណនី?</h1>
            <p class="mb-0 fs-6 text-form">
              តើអ្នកប្រាកដថាចង់ចាកចេញពីគណនីរបស់អ្នកឬ?
              អ្នកនឹងត្រូវចូលម្ដងទៀតដើម្បីប្រើប្រាស់គណនី។
            </p>
          </div>
        </div>
        <div class="modal-footer border-0 d-flex justify-content-center gap-2 flex-nowrap pt-1">
          <button type="button" class="btn btn-cancle w-50 rounded-5" data-bs-dismiss="modal">
            បោះបង់
          </button>
          <button type="button" class="btn btn-danger w-50 rounded-5" @click="onclickOk()">
            ចាកចេញ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import { onMounted } from "vue";
import { useProfileStore } from "@/stores/views/store_profile";
import { useAuthStore } from "@/stores/views/auth/auth";
import { useRouter } from "vue-router";
let profileStore = useProfileStore();
const authStore = useAuthStore();
let router = useRouter();

onMounted(() => {
  profileStore.mdl_logout = Modal.getOrCreateInstance(
    document.getElementById("mdl_logout"),
    {
      keyboard: false,
    }
  );
});

const onclickOk = () => {
  authStore.logout();
  profileStore.mdl_logout.hide();
};
</script>
