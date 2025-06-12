<template>
  <div class="modal fade" id="mdl-add" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content p-3 rounded-4">
        <form @submit.prevent="onclickSaveUser">
          <div class="modal-header border-0">
            <h5 class="modal-title">
              {{
                driverStore.selectedId == 0
                  ? "បន្ថែមអ្នកដឹកជញ្ជូន"
                  : "កែប្រែអ្នកដឹកជញ្ជូន"
              }}
            </h5>
          </div>
          <div class="modal-body">
            <div class="d-flex flex-wrap flex-md-nowrap gap-3" v-if="driverStore.selectedId === 0">
              <div class="mb-0 mb-md-3 w-100">
                <div class="input-field">
                  <select class="form-select rounded-5" id="category" v-model="driverStore.frm.user_id"
                    autocomplete="off" :class="{ 'is-invalid': v_validate.user_id.$error }">
                    <option value="" hidden selected>ជ្រើសរើស</option>
                    <option v-for="u in driverStore.users" :key="u.id" :value="u.id">
                      {{ u.profile.first_name + " " + u.profile.last_name }}
                    </option>
                  </select>
                  <label for="user_id" class="form-label">អ្នកដឹកជញ្ជូន</label>
                </div>
                <div class="invalid-feedback d-block ps-2" v-if="v_validate.user_id.$error">
                  {{ v_validate.user_id.$errors[0].$message }}
                </div>
                <div class="invalid-feedback d-block ps-2" v-if="serverErrors.user_id">
                  {{ serverErrors.user_id[0] }}
                </div>
              </div>
              <div class="mb-0 mb-md-3 w-100">
                <div class="input-field">
                  <input type="text" class="form-control rounded-5" id="vin" v-model="driverStore.frm.vin"
                    :class="{ 'is-invalid': v_validate.vin.$error || serverErrors.vin }" placeholder=""
                    autocomplete="off" />
                  <label for="vin" class="form-label">លេខសម្គាល់យានជំនិះ</label>
                </div>
                <div class="invalid-feedback d-block ps-2" v-if="v_validate.vin.$error">
                  {{ v_validate.vin.$errors[0].$message }}
                </div>
                <div class="invalid-feedback d-block ps-2" v-if="serverErrors.vin">
                  {{ serverErrors.vin[0] }}
                </div>
              </div>
            </div>
            <div class="d-flex flex-wrap mt-3 mt-md-0 flex-md-nowrap gap-3">
              <div class="mb-0 mb-md-3 w-100">
                <div class="input-field">
                  <input type="text" class="form-control rounded-5" id="latitude" v-model="driverStore.frm.latitude"
                    :class="{
                      'is-invalid': v_validate.latitude.$error || serverErrors.latitude,
                    }" placeholder="" autocomplete="off" />
                  <label for="latitude" class="form-label">រយៈទទឹង</label>
                </div>
                <div class="invalid-feedback d-block ps-2" v-if="v_validate.latitude.$error">
                  {{ v_validate.latitude.$errors[0].$message }}
                </div>
                <div class="invalid-feedback d-block ps-2" v-if="serverErrors.latitude">
                  {{ serverErrors.latitude[0] }}
                </div>
              </div>
              <div class="mb-3 w-100">
                <div class="input-field">
                  <input type="text" class="form-control rounded-5" id="longitude" v-model="driverStore.frm.longitude"
                    :class="{
                      'is-invalid': v_validate.longitude.$error || serverErrors.longitude,
                    }" placeholder="" autocomplete="off" />
                  <label for="longitude" class="form-label">រយៈបណ្តោយ</label>
                </div>
                <div class="invalid-feedback d-block ps-2" v-if="v_validate.longitude.$error">
                  {{ v_validate.longitude.$errors[0].$message }}
                </div>
                <div class="invalid-feedback d-block ps-2" v-if="serverErrors.longitude">
                  {{ serverErrors.longitude[0] }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-light rounded-5 btn-150 text-cancel" data-bs-dismiss="modal">
              បោះបង់
            </button>
            <button :disabled="isLoading" type="submit" class="btn btn-primary rounded-5 btn-150">
              <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              {{ isLoading ? "កំពុងបញ្ជូន" : "បញ្ជូន" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import { ref, computed, onMounted } from "vue";
import { usederiverStore } from "@/stores/views/driver_store";
import { helpers, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import axios from "axios";

const driverStore = usederiverStore();
const isLoading = ref(false);
const serverErrors = ref({});


const minValue = (min) => (value) => !isNaN(value) && parseFloat(value) >= min;
const maxValue = (max) => (value) => !isNaN(value) && parseFloat(value) <= max;
const numeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

const rules = computed(() => ({
  user_id: {
    required: helpers.withMessage("សូមជ្រើសរើសអ្នកដឹកជញ្ជូន", required),
  },
  latitude: {
    required: helpers.withMessage("សូមបញ្ចូល latitude", required),
    minValue: helpers.withMessage("Latitude ត្រូវធំជាង​ ​ឬស្មើ -90!", minValue(-90)),
    maxValue: helpers.withMessage("Latitude ត្រូវតូចជាង ឬស្មើ 90!", maxValue(90)),
    numeric: helpers.withMessage("Latitude ត្រូវតែជា​លេខ!", numeric),
  },
  longitude: {
    required: helpers.withMessage("សូមបញ្ចូល longitude", required),
    minValue: helpers.withMessage("Longitude ត្រូវធំជាង​ ​ឬស្មើ -180!", minValue(-180)),
    maxValue: helpers.withMessage("Longitude ត្រូវតូចជាង ឬស្មើ 180!", maxValue(180)),
    numeric: helpers.withMessage("Longitude ត្រូវតែជា​លេខ!", numeric),
  },
  vin: {
    required: helpers.withMessage("សូមបញ្ចូលលេខសម្គាល់យានជំនិះ", required),
  },
}));

const v_validate = useVuelidate(rules, driverStore.frm);

onMounted(() => {
  driverStore.fetchUsers();
  console.log(driverStore.users);
  driverStore.mdl_add = Modal.getOrCreateInstance(document.getElementById("mdl-add"));
});

const onclickSaveUser = async () => {
  v_validate.value.$validate();
  if (v_validate.value.$error) {
    console.log("Form validation errors:", v_validate.value.$errors);
    return;
  }

  const formData = {
    user_id: driverStore.frm.user_id,
    latitude: parseFloat(driverStore.frm.latitude),
    longitude: parseFloat(driverStore.frm.longitude),
    vin: driverStore.frm.vin,
    is_active: driverStore.frm.is_active === "1" ? true : false,
  };

  if (
    !formData.user_id ||
    !formData.latitude ||
    !formData.longitude ||
    !formData.vin ||
    formData.is_active === undefined
  ) {
    console.error("Please fill all required fields.");
    return;
  }

  isLoading.value = true;
  serverErrors.value = {};
  try {
    if (driverStore.selectedId == 0) {
      const response = await axios.post("/api/deliveries", formData);
      console.log("Delivery created:", response.data);
    } else {
      const response = await axios.put(
        `/api/deliveries/${driverStore.selectedId}`,
        formData
      );
    }
    driverStore.mdl_add.hide();
    driverStore.onloadDriver();
  } catch (error) {
    console.error(
      "Error saving delivery:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.data) {
      if (error.response.data.message === "This user is already a delivery.") {
        serverErrors.value = { user_id: ["ការដឹកជញ្ជូន​បានប្រើប្រាល់ពីមុនហើយ"] };
      } else if (error.response.data.message === "The vin has already been taken.") {
        serverErrors.value = { vin: ["លេខសម្គាល់យានជំនិះបានប្រើប្រាល់ពីមុនហើយ"] };
      } else if (error.response.data.errors) {
        serverErrors.value = error.response.data.errors;
      }
      console.log("Server validation errors:", serverErrors.value);
    }
  } finally {
    isLoading.value = false;
  }
};

</script>

<style>
.form-control {
  box-shadow: none !important;
}

.ts-control {
  border-radius: 20px !important;
  padding: 0.6rem 1rem !important;
  border: 1px solid #ced4da !important;
  box-shadow: none !important;
}

.ts-wrapper.single .ts-control {
  background: #fff !important;
  border: #dc3545 !important;
}

.ts-dropdown {
  border-radius: 20px !important;
  overflow: hidden !important;
  border: 1px solid #ced4da !important;
  margin-top: 5px !important;
  box-shadow: none !important;
}

.put-hidden {
  display: none !important;
}

.ts-dropdown .option {
  padding: 0.5rem 1rem !important;
}

.ts-control .item {
  transform: translateY(0px) !important;
}

.ts-dropdown .create {
  padding: 0.5rem 1rem !important;
  color: #007bff;
  display: none !important;
  font-weight: bold;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875em;
}
</style>