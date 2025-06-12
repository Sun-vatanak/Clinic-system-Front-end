<template>
  <div class="modal fade" id="mdl-add" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog none modal-dialog-centered">
      <div class="modal-content p-3 rounded-4">
        <div class="modal-header border-0">
          <h5 class="modal-title mb-0">
            {{ vendorStore.selectedId == 0 ? "បន្ថែមអាជីវករ" : "កែប្រែទិន្នន័យអាជីវករ" }}
          </h5>
        </div>
        <div class="modal-body mt-0 py-0">
          <form @submit.prevent="onclickAddVendor()">
            <div class="mb-4">
              <div class="d-flex align-items-center gap-3">
                <div class="frame_invoice position-relative">
                  <img :src="vendorStore.invoice_img ? vendorStore.invoice_img : '/public/default.png'"
                    class=" border-invoice rounded-4 object-fit-cover" :class="{
                      ' border border-1 border-danger': vendorStore.vv.invoice_img.$error
                    }" width="100%" height="100%" alt="">
                  <button type="button"
                    class="btn bg-secondary p-2 border-0 py-1 rounded-5 position-absolute bottom-invoice"
                    @click="selectInvoice()"><i class="bi bi-camera-fill fs-5 text-primary m-0 p-0"></i></button>
                </div>
                <div class="d-flex flex-column mb-3">
                  <span class="fw-medium mb-1">បញ្ចូលរូបភាព​នៃ QR Code របស់អ្នកគ្រប់គ្រងហាង </span>
                  <span class="fs-13">ទំហំនៃរូបភាព​ 1 MB</span>
                </div>
              </div>
              <input type="file" class="d-none" :class="{ 'is-invalid': vendorStore.vv.invoice_img.$error }"
                id="photo_invoice" @change="onSelectedImage($event)">
              <div class="invalid-feedback d-block ps-2" v-if="vendorStore.vv.invoice_img.$error">
                {{ vendorStore.vv.invoice_img.$errors[0].$message }}
              </div>
            </div>
            <div class="mb-3 w-100">
              <div class="input-field">
                <select class="form-control rounded-5" id="user_id"
                  v-model="vendorStore.frm.user_id">
                  <option value="" disabled>ជ្រើសរើសឈ្មោះអាជីវករ</option>
                  <option v-for="u in vendorStore.userVendor" :key="u.id" :value="u.id">
                    {{ u.profile.first_name }} {{ u.profile.last_name }}
                  </option>
                </select>
                <label for="user_id" class="form-label">ឈ្មោះម្ចាស់អាជីវកម្ម</label>
              </div>
              <div class="invalid-feedback d-block ps-2" v-if="vendorStore.vv.user_id.$error">
                {{ vendorStore.vv.user_id.$errors[0].$message }}
              </div>
              <div class="invalid-feedback d-block ps-2" v-if="serverErrors.user_id">
                {{ serverErrors.user_id[0] }}
              </div>
            </div>
            <div class="mb-3 w-100">
              <div class="input-field">
                <input type="text" @input="resetTaken()" class="form-control rounded-5" id="business_name"
                  v-model="vendorStore.frm.business_name"
                  :class="{ 'is-invalid': vendorStore.vv.business_name.$error || serverErrors.business_name }"
                  placeholder="" autocomplete="off" />
                <label for="business_name" class="form-label">ឈ្មោះអាជីវកម្ម</label>
              </div>
              <div class="invalid-feedback d-block ps-2" v-if="vendorStore.vv.business_name.$error">
                {{ vendorStore.vv.business_name.$errors[0].$message }}
              </div>
              <div class="invalid-feedback d-block ps-2" v-if="serverErrors.business_name">
                {{ serverErrors.business_name[0] }}
              </div>
            </div>
            <div class="mb-3 w-100">
              <div class="input-field position-relative">
                <select class="form-select rounded-5" id="market_id" v-model="vendorStore.frm.market_id">
                  <option value="" disabled selected>ជ្រើសរើសផ្សារ</option>
                  <option v-for="m in marketStore.markets" :key="m.id" :value="m.id">
                    {{ m.name }}
                  </option>
                </select>
                <label for="market_id" class="form-label floating-label">ផ្សារ</label>
              </div>
              <div class="invalid-feedback d-block" v-if="vendorStore.vv.market_id.$error">
                {{ vendorStore.vv.market_id.$errors[0].$message }}
              </div>
              <div class="invalid-feedback d-block" v-if="serverErrors.market_id">
                {{ serverErrors.market_id[0] }}
              </div>
            </div>
            <div class="w-100 d-flex gap-2 justify-content-end">
              <div class="mb-3 w-100">
                <div class="input-field">
                  <input type="time" class="form-control rounded-5" v-model="vendorStore.frm.open_time"
                    :class="{ 'is-invalid': vendorStore.vv.open_time.$error || serverErrors.open_time }"
                    autocomplete="off" />
                  <label for="open_time" class="form-label">ម៉ោងបើក</label>
                </div>
                <div class="invalid-feedback d-block" v-if="vendorStore.vv.open_time.$error">
                  {{ vendorStore.vv.open_time.$errors[0].$message }}
                </div>
                <div class="invalid-feedback d-block" v-if="serverErrors.open_time">
                  {{ serverErrors.open_time[0] }}
                </div>
              </div>
              <div class="mb-3 w-100">
                <div class="input-field">
                  <input type="time" class="form-control rounded-5" v-model="vendorStore.frm.close_time"
                    :class="{ 'is-invalid': vendorStore.vv.close_time.$error || serverErrors.close_time }"
                    autocomplete="off" />
                  <label for="close_time" class="form-label">ម៉ោងបិទ</label>
                </div>
                <div class="invalid-feedback d-block" v-if="vendorStore.vv.close_time.$error">
                  {{ vendorStore.vv.close_time.$errors[0].$message }}
                </div>
                <div class="invalid-feedback d-block" v-if="serverErrors.close_time">
                  {{ serverErrors.close_time[0] }}
                </div>
              </div>
            </div>
            <div class="d-flex flex-wrap flex-md-nowrap gap-2">
              <div class="mb-3 w-50">
                <div class="input-field w-100">
                  <input type="text" class="form-control rounded-5" v-model="vendorStore.frm.latitude" placeholder=""
                    :class="{ 'is-invalid': vendorStore.vv.latitude.$error || serverErrors.latitude }"
                    autocomplete="off" />
                  <label for="" class="form-label">រយៈទទឹង</label>
                </div>
                <div class="invalid-feedback d-block" v-if="vendorStore.vv.latitude.$error">
                  {{ vendorStore.vv.latitude.$errors[0].$message }}
                </div>
                <div class="invalid-feedback d-block" v-if="serverErrors.latitude">
                  {{ serverErrors.latitude[0] }}
                </div>
              </div>
              <div class="mb-3 w-50">
                <div class="input-field">
                  <input type="text" class="form-control rounded-5" v-model="vendorStore.frm.longitude" placeholder=""
                    :class="{ 'is-invalid': vendorStore.vv.longitude.$error || serverErrors.longitude }"
                    autocomplete="off" />
                  <label for="longitude" class="form-label">រយៈបណ្តោយ</label>
                </div>
                <div class="invalid-feedback d-block" v-if="vendorStore.vv.longitude.$error">
                  {{ vendorStore.vv.longitude.$errors[0].$message }}
                </div>
                <div class="invalid-feedback d-block" v-if="serverErrors.longitude">
                  {{ serverErrors.longitude[0] }}
                </div>
              </div>
            </div>
            <div class="alert alert-danger" v-if="serverErrors.general" role="alert">
              {{ serverErrors.general[0] }}
            </div>

            <div class="w-100 d-flex gap-2 justify-content-end">
              <button type="button" class="btn btn-light rounded-5 btn-150 text-cancel me-2" data-bs-dismiss="modal"
                :disabled="isLoading">
                បោះបង់
              </button>
              <button type="submit" class="btn btn-primary rounded-5 btn-150" :disabled="isLoading">
                <span v-if="!isLoading" role="status">{{
                  vendorStore.selectedId == 0 ? " បញ្ជូន" : "កែប្រែ"
                }}</span>
                <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span v-if="isLoading" role="status">
                  {{ vendorStore.selectedId == 0 ? " កំពុងបញ្ជូន" : " កំពុងកែប្រែ" }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import { computed, onMounted, ref } from "vue";
import { useVendorStore } from "@/stores/views/vendor_store";
import { useMarketStore } from "@/stores/views/market_store";
import { useAuthStore } from "@/stores/views/auth/auth";
import {
  required,
  helpers,
  maxLength,
  minValue,
  maxValue,
  numeric,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import axios from "axios";


const isLoading = ref(false);
const serverErrors = ref({});

const vendorStore = useVendorStore();
const marketStore = useMarketStore();
const authStore = useAuthStore();

const isNameTaken = ref(false);
const taken = helpers.withMessage("ឈ្មោះអាជីវករនេះមានរួចហើយ", () => !isNameTaken.value);

const resetTaken = () => {
  isNameTaken.value = false;
  serverErrors.value = {};
};

const decimalPrecision = (digits, decimals) =>
  helpers.withMessage(
    `ចំនួនត្រូវតែមាន ${digits} ខ្ទង់ និង ${decimals} ខ្ទង់ក្រោយក្បៀស!`,
    (value) => {
      const regex = new RegExp(`^-?\\d{1,${digits - decimals}}(\\.\\d{1,${decimals}})?$`);
      return regex.test(value);
    }
  );

const rules = computed(() => ({
  user_id: {
    required: helpers.withMessage("សូមជ្រើសរើសឈ្មោះអ្នកប្រើប្រាស់", required),
    taken,
  },
  business_name: {
    required: helpers.withMessage("សូមបញ្ចូលឈ្មោះផ្សារ!", required),
    maxLength: helpers.withMessage("មិនអាចបញ្ចូលលើស 50 តួអក្សរ", maxLength(50)),
    taken,
  },
  market_id: { required: helpers.withMessage("សូមជ្រើសរើសផ្សារ", required) },
  open_time: { required: helpers.withMessage("សូមបញ្ចូលម៉ោងបើក", required) },
  close_time: { required: helpers.withMessage("សូមបញ្ចូលម៉ោងបិទ", required) },
  latitude: {
    required: helpers.withMessage("សូមបញ្ចូល latitude!", required),
    numeric: helpers.withMessage("Latitude ត្រូវតែជាលេខ!", numeric),
    minValue: helpers.withMessage("Latitude ត្រូវធំជាង ​ឬស្មើ -90!", minValue(-90)),
    maxValue: helpers.withMessage("Latitude ត្រូវតូចជាង ឬស្មើ 90!", maxValue(90)),
  },
  longitude: {
    required: helpers.withMessage("សូមបញ្ចូល longitude!", required),
    numeric: helpers.withMessage("Longitude ត្រូវតែជាលេខ!", numeric),
    minValue: helpers.withMessage("Longitude ត្រូវធំជាង ​ឬស្មើ -180!", minValue(-180)),
    maxValue: helpers.withMessage("Longitude ត្រូវតូចជាង ឬស្មើ 180!", maxValue(180)),
  },
  invoice_img: {
  required: helpers.withMessage('សូមបញ្ចូលរូបភាពរបស់ផលិតផល', value => {
    return !!value || !!vendorStore.frm.invoice_img; 
  }),
}
}));

vendorStore.vv = useVuelidate(rules, vendorStore.frm);

onMounted(() => {
  vendorStore.mdl_add = Modal.getOrCreateInstance(document.getElementById("mdl-add"));
  vendorStore.onloadVendor();
  marketStore.onloadMarket();
  vendorStore.onloadSetvendor();
});

const selectInvoice = () => {
  document.getElementById('photo_invoice').click();
}
const onSelectedImage = (e) => {
  if (e.currentTarget.files.length === 0) {
    return;
  }

  const file = e.currentTarget.files[0];
  const maxSize = 1 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (!allowedTypes.includes(file.type)) {
    vendorStore.vv.invoice_img.$touch();
    vendorStore.error_Message = 'អ្នកអាចប្រើរូបភាពប្រភេទ JPEG និង PNG';
    vendorStore.mdl_errorTypeImage.show();
    vendorStore.mdl_add.hide();
    return;
  }
  if (file.size > maxSize) {
    vendorStore.vv.invoice_img.$touch();
    vendorStore.error_Message = 'ទំហំរូបភាពមិនត្រូវលើស 1MB';
    vendorStore.mdl_errorTypeImage.show();
    vendorStore.mdl_add.hide();
    return;
  }
  vendorStore.vv.invoice_img.$reset();
  vendorStore.frm.invoice_img = file;
  vendorStore.invoice_img = URL.createObjectURL(file);

};

const onclickAddVendor = async () => {

  serverErrors.value = {};
  vendorStore.vv.$touch();
  const isValid = await vendorStore.vv.$validate();

  if (!isValid) {
    console.error("Client-side validation failed:", vendorStore.vv.$errors);
    return;
  }
  const frmData = new FormData();
  frmData.append("user_id", vendorStore.frm.user_id);
  frmData.append("business_name", vendorStore.frm.business_name);
  frmData.append("market_id", vendorStore.frm.market_id);
  frmData.append("open_time", vendorStore.frm.open_time);
  frmData.append("close_time", vendorStore.frm.close_time);
  frmData.append("latitude", vendorStore.frm.latitude);
  frmData.append("longitude", vendorStore.frm.longitude);
  if (vendorStore.frm.invoice_img instanceof File) {
    frmData.append("qrcode", vendorStore.frm.invoice_img);
}

  isLoading.value = true;

  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authStore.token,
        "Content-Type": "multipart/form-data",
      },
    };

    let res;
    if (vendorStore.selectedId === 0) {
      res = await axios.post("/api/vendors", frmData, config);
    } else {
      res = await axios.post(`/api/vendors/${vendorStore.selectedId}`, frmData, config);
    }

    if (res.data.result) {
      vendorStore.mdl_add.hide();
      vendorStore.onloadVendor();
    } else {
      if (res.data.message === "This user is already a vendor.") {
        serverErrors.value.user_id = ["អ្នកប្រើប្រាស់នេះជាអ្នកលក់រួចហើយ។"];
      } else {
        serverErrors.value.general = [res.data.message || "មានបញ្ហាកើតឡើង!"];
      }
    }
  } catch (error) {
    console.error("Error submitting form:", error.response?.data || error.message);
    const errorData = error.response?.data;
    if (errorData?.errors) {
      serverErrors.value = errorData.errors;
    } else if (errorData?.message === "This user is already a vendor.") {
      serverErrors.value.user_id = ["អ្នកប្រើប្រាស់នេះជាអ្នកមានរួចហើយ។"];
    } else if (errorData?.message) {
      serverErrors.value.general = [errorData.message];
    } else {
      serverErrors.value.general = ["ការភ្ជាប់ទៅសេវ៉ាមានបញ្ហា!"];
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.alert-danger {
  margin-bottom: 1rem;
}
</style>