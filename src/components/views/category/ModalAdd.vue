<template>
    <div class="modal fade" id="mdl-add" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3 rounded-4">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        {{ categoryStore.selectedId == 0 ? "បន្ថែមប្រភេទផលិតផល" : "កែប្រែប្រភេទផលិតផល" }}
                    </h5>
                </div>
                <div class="modal-body">
                    <div class="d-flex align-items-center gap-3 mb-4">
                        <div class="form-photo overflow-hidden mb-3">
                            <div class="from-photo bg-light rounded-circle overflow-hidden" :class="{
                                ' border border-1 border-danger': categoryStore.v_validate.photo.$error
                            }" >
                                <img :src="categoryStore.crop.avatar ? categoryStore.crop.avatar : '/default.png'"
                                    class="card-img" alt="">
                            </div>
                            <div class="invalid-feedback d-block ps-2 position-absolute bottom-1" v-if=" categoryStore.v_validate.photo.$error">
                                    {{ categoryStore.v_validate.photo.$errors[0].$message }}
                            </div>
                        </div>
                        <div>
                            <div class="d-flex flex-column mb-3">
                                <span class="fw-medium mb-1">បញ្ចូលរូបភាព​នៃប្រភេទផលិតផល</span>
                                <span class="fs-13">ទំហំនៃរូបភាព​ 1 MB</span>
                            </div>
                            <div class="d-flex align-items-center gap-4">
                                <a role="button" class="text-decoration-none text-primary fs-14"
                                    @click="chooseFileImage()">
                                    <i class="bi bi-upload"></i> ជ្រើសរើស
                                </a>
                                <a role="button" class="text-decoration-none text-danger fs-14" @click="removeImage()">
                                    <i class="bi bi-trash"></i> លុប
                                </a>
                            </div>
                            <input type="file" @change="onSelectedImage($event)" :class="{ 'is-invalid': categoryStore.v_validate.photo.$error }" class="form-control d-none"
                                id="file_img" accept="image/jpeg, image/png, image/gif">
                        </div>
                    </div>
                    <div>
                        <form @submit.prevent="onclickAddMarket()">
                            <div class="mb-4 w-100">
                                <div class="input-field">
                                    <input @input="resetTaken()" type="text" autocomplete="off"
                                        class="form-control rounded-5" id="name" v-model="categoryStore.frm.name"
                                        placeholder=""
                                        :class="{ 'is-invalid': categoryStore.v_validate.name.$error }" />
                                    <label for="name" class="form-label ">ប្រភេទផលិតផល</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2" v-if="categoryStore.v_validate.name.$error">
                                    {{ categoryStore.v_validate.name.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="w-100 text-end">
                                <button type="button" class="btn btn-light rounded-5 btn-150 text-cancel me-2"
                                    data-bs-dismiss="modal" :disabled="isLoading" @click="onCanncel()">បោះបង់</button>
                                <button type="submit" class="btn btn-primary rounded-5 btn-150" :disabled="isLoading">
                                    <span v-if="!isLoading" role="status">{{ categoryStore.selectedId == 0 ? " បញ្ជូន" :
                                        "កែប្រែ"
                                    }}</span>
                                    <span v-if="isLoading" class="spinner-border spinner-border-sm"
                                        aria-hidden="true"></span>
                                    <span v-if="isLoading" role="status">
                                        {{ categoryStore.selectedId == 0 ? " កំពុងបញ្ជូន" : " កំពុងកែប្រែ" }}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Modal } from 'bootstrap';
import { computed, onMounted, ref } from 'vue';
import { useCategoryStore } from '@/stores/views/category_store';
import { helpers, required, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import axios from 'axios';

const categoryStore = useCategoryStore();

const isNameTaken = ref(false);
const taken = helpers.withMessage('ប្រភេទផលិតផលនេះមានរួចហើយ', () => {
    return !isNameTaken.value;
});
const resetTaken = () => {
    isNameTaken.value = false;
}

const isLoading = ref(false);

const onCanncel = () => {
    categoryStore.frm.is_remove = 0
}

const rules = computed(() => ({
    name: {
        required: helpers.withMessage('សូមបញ្ចូលប្រភេទផលិតផល', required),
        maxLength: helpers.withMessage('មិនអាចលើស 50 តួអក្សរ', maxLength(50)),
        taken
    },
    photo:{
        required: helpers.withMessage('សូមបញ្ចូលរូបភាពរបស់ផលិតផល', required),

    }
}));

categoryStore.v_validate = useVuelidate(rules, categoryStore.frm);

onMounted(() => {
    categoryStore.mdl_add = Modal.getOrCreateInstance(document.getElementById('mdl-add'));
});

const removeImage = () => {
    categoryStore.crop.avatar = null;
    categoryStore.frm.is_remove = 1;
    categoryStore.frm.photo = '';

}

const chooseFileImage = () => {
    document.getElementById('file_img_crop').value = '';
    document.getElementById('file_img').click();
}

const onSelectedImage = (e) => {
    if (e.currentTarget.files.length === 0) {
        return;
    }

    const file = e.currentTarget.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 1 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
        categoryStore.error_message = 'អ្នកអាចប្រើរូបភាពប្រភេទ JPEG, PNG និង GIF';
        categoryStore.mdl_add.hide();
        categoryStore.modalErrorTypeImage.show();
        return;
    }

    if (file.size > maxSize) {
        categoryStore.error_message = 'ទំហំរូបភាពមិនត្រូវលើស 1MB';
        categoryStore.mdl_add.hide();
        categoryStore.modalErrorTypeImage.show();
        return;
    }

    categoryStore.frm.is_remove = 0;
    categoryStore.crop.avatar = file;
    categoryStore.frm.photo = URL.createObjectURL(file);
    categoryStore.crop.img = URL.createObjectURL(file);
    categoryStore.mdl_add.hide();
    categoryStore.mdl_crop.show();
}


const onclickAddMarket = async () => {
    categoryStore.v_validate.$validate();
    if (categoryStore.v_validate.$error) {
        return;
    }

    let frmData = new FormData();
    frmData.append('name', categoryStore.frm.name);
    if(categoryStore.selectedId != 0) {
        frmData.append('is_remove', categoryStore.frm.is_remove);
    }
    if (categoryStore.crop.blob) {
        frmData.append('photo', categoryStore.crop.blob);
    }

    isLoading.value = true;
    if (categoryStore.selectedId == 0) {
        try {
            const res = await axios.post('/api/categories', frmData);
            if(res.data.result){
                categoryStore.mdl_add.hide();
                categoryStore.onloadCategory();
            }
        } catch (err) {
            if (err.response?.data?.errors?.name?.[0]) {
                console.log(err.response.data.errors.name[0]);
                if (err.response.data.errors.name[0].includes('The name has already been taken.')) {
                    isNameTaken.value = true;
                }
            }
        } finally {
            isLoading.value = false;
        }
    } else {
        try {
            const res = await axios.post(`/api/categories/${categoryStore.selectedId}`, frmData);
            if(res.data.result){
                categoryStore.mdl_add.hide();
                categoryStore.onloadCategory();
            }
        } catch (err) {
            if (err.response?.data?.errors?.name?.[0]) {
                console.log(err.response.data.errors.name[0]);
                if (err.response.data.errors.name[0].includes('The name has already been taken.')) {
                    isNameTaken.value = true;
                }
            }
        } finally {
            isLoading.value = false;
        }
    }
}
</script>
