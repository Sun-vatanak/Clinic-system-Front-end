<template>
  <div class="modal fade" id="mdl-add" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-3 rounded-4">
        <div class="modal-header border-0">
          <h5 class="modal-title">
            {{
              subcategoryStore.selectedId == 0
                ? "បន្ថែមប្រភេទផលិតផលរង"
                : "កែប្រែប្រភេទផលិតផលរង"
            }}
          </h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onclickAddMarket()">
            <div class="mb-3 w-100">
              <div class="input-field">
                <input type="text" @input="resetTaken()" class="form-control rounded-5" id="name"
                  v-model="subcategoryStore.frm.name" placeholder="" :class="{
                    'is-invalid': subcategoryStore.vv.name.$error,
                  }" autocomplete="off" />
                <label for="name" class="form-label">ប្រភេទផលិតផលរង</label>
              </div>
              <div class="invalid-feedback d-block ps-2" v-if="subcategoryStore.vv.name.$error">
                {{ subcategoryStore.vv.name.$errors[0].$message }}
              </div>
            </div>
            <div class="mb-4 w-100">
              <div class="input-field position-relative">
                <select class="form-select rounded-5" id="category" v-model="subcategoryStore.frm.category_id" :class="{
                  'is-invalid':
                    subcategoryStore.vv.category_id.$error
                }">
                  <option value="" disabled selected>ប្រភេទផលិតផល</option>
                  <option v-for="c in categoryStore.categories" :key="c.id" :value="c.id">
                    {{ c.name }}
                  </option>
                </select>
                <label for="category" class="form-label floating-label">
                  ប្រភេទផលិតផល
                </label>
              </div>
              <div class="invalid-feedback d-block ps-2" v-if="subcategoryStore.vv.category_id.$error">
                {{
                  subcategoryStore.vv.category_id.$errors[0].$message
                }}
              </div>
            </div>
            <div class="w-100 d-flex gap-2 justify-content-end">
              <button type="button" class="btn btn-light rounded-5 btn-150 text-cancel me-2" data-bs-dismiss="modal"
                :disabled="isLoading">បោះបង់</button>
              <button type="submit" class="btn btn-primary rounded-5 btn-150" :disabled="isLoading">
                <span v-if="!isLoading" role="status">{{ subcategoryStore.selectedId == 0 ? " បញ្ជូន" :
                  "កែប្រែ"
                }}</span>
                <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span v-if="isLoading" role="status">
                  {{ subcategoryStore.selectedId == 0 ? " កំពុងបញ្ជូន" : " កំពុងកែប្រែ" }}
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
import { useSubcategoryStore } from "@/stores/views/subcategory_store";
import { useCategoryStore } from "@/stores/views/category_store";
import { required, helpers, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import axios from "axios";

const isLoading = ref(false);
const subcategoryStore = useSubcategoryStore();
const categoryStore = useCategoryStore();

const isNameTaken = ref(false);
const taken = helpers.withMessage('ប្រភេទផលិតផលនេះមានរួចហើយ', () => {
  return !isNameTaken.value;
});

const resetTaken = () => {
  isNameTaken.value = false;
}

const rules = computed(() => ({
  name: {
    required: helpers.withMessage("សូមបញ្ចូលប្រភេទផលិតផលរង", required),
    maxLength: helpers.withMessage('មិនអាចលើស 50 តួអក្សរ', maxLength(50)),
    taken
  },
  category_id: {
    required: helpers.withMessage("សូមបញ្ចូលប្រភេទផលិតផល", required),
  },
}));

subcategoryStore.vv = useVuelidate(rules, subcategoryStore.frm);

onMounted(() => {
  subcategoryStore.mdl_add = Modal.getOrCreateInstance(document.getElementById("mdl-add"));
  categoryStore.onloadCategory();
});



const onclickAddMarket = async () => {
  subcategoryStore.vv.$validate();
  if (subcategoryStore.vv.$error) {
    return;
  }

  let frmData = new FormData();
  frmData.append("name", subcategoryStore.frm.name);
  frmData.append("category_id", subcategoryStore.frm.category_id);

  isLoading.value = true;
  if (subcategoryStore.selectedId == 0) {
    try {
      const res = await axios.post('/api/subcategories', frmData);
      if (res.data.result) {
        subcategoryStore.mdl_add.hide();
        subcategoryStore.onloadSubcategory();
      }
    } catch (err) {
      if (err.response?.data?.errors?.name?.[0]) {
        if (err.response.data.errors.name[0].includes('The name has already been taken.')) {
          isNameTaken.value = true;
        }
      }
    } finally {
      isLoading.value = false;
    }
  } else {
    try {
      const res = await axios.post(`/api/subcategories/${subcategoryStore.selectedId}`, frmData);
      if (res.data.result) {
        subcategoryStore.mdl_add.hide();
        subcategoryStore.onloadSubcategory();
      }
    } catch (err) {
      if (err.response?.data?.errors?.name?.[0]) {
        if (err.response.data.errors.name[0].includes('The name has already been taken.')) {
          isNameTaken.value = true;
        }
      }
    } finally {
      isLoading.value = false;
    }
  }
};
</script>
