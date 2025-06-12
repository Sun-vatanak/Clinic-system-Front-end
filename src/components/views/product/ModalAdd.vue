<template>
    <div class="modal fade" id="mdl-add" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content p-3 rounded-4">
                <div class="modal-header border-0">
                    <h5 class="modal-title">{{ productStore.selectedId == 1 ? 'កែប្រែផលិតផល' : 'បន្ថែមផលិតផល' }}</h5>
                </div>
                <div class="modal-body product-info">
                    <div class="d-flex align-items-center gap-3 mb-6 position-relative">
                        <div>
                            <div class="form-photo rounded-circle bg-light overflow-auto" :class="{
                                ' border border-1 border-danger': productStore.v_validate.photo.$error
                            }">
                                <img :src="productStore.crop.avatar ? productStore.crop.avatar : '/default.png'"
                                    class="card-img object-fit-cover border-danger" alt="">
                            </div>
                            <div class="invalid-feedback d-block ps-2 position-absolute bottom-1"
                                v-if="productStore.v_validate.photo.$error">
                                {{ productStore.v_validate.photo.$errors[0].$message }}
                            </div>
                        </div>
                        <div>
                            <div class="d-flex flex-column mb-3">
                                <span class="fw-medium mb-1">បញ្ចូលរូបភាព​នៃផ្សារ</span>
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
                            <input type="file" :class="{ 'is-invalid': productStore.v_validate.photo.$error }"
                                @change="onSelectedImage($event)" class="form-control d-none" id="file_img"  accept="image/jpeg, image/png, image/gif">
                        </div>
                    </div>
                    <form @submit="preventDefault">
                        <div class="d-flex flex-wrap flex-md-nowrap gap-3">
                            <div class="mb-0 mb-md-3 w-100">
                                <div class="input-field">
                                    <input type="text" class="form-control rounded-5" id="name"
                                        v-model="productStore.frm.name" placeholder="" autocomplete="off"
                                        :class="{ 'is-invalid': productStore.v_validate.name.$error }" />
                                    <label for="name" class="form-label">ឈ្មោះផលិតផល</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2" v-if="productStore.v_validate.name.$error">
                                    {{ productStore.v_validate.name.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="mb-3 w-100">
                                <div class="w-100">
                                    <div class="input-field">
                                        <select class="form-select rounded-5" id="category"
                                            v-model="productStore.frm.category_id" autocomplete="off"
                                            :class="{ 'is-invalid': productStore.v_validate.category_id.$error }">
                                            <option value="" hidden selected>ជ្រើសរើស</option>
                                            <option v-for="product in productStore.subcategories" :key="product.id"
                                                :value="product.id">
                                                {{ product.name }}
                                            </option>
                                        </select>
                                        <label for="category" class="form-label">ប្រភេទផលិតផលរង</label>
                                    </div>
                                    <div class="invalid-feedback d-block ps-2"
                                        v-if="productStore.v_validate.category_id.$error">
                                        {{ productStore.v_validate.category_id.$errors[0].$message }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap flex-md-nowrap gap-3">
                            <div class="mb-0 mb-md-3 w-100">
                                <div class="input-field">
                                    <input type="text" class="form-control rounded-5" id="name"
                                        v-model="productStore.frm.stock_qty" placeholder="" autocomplete="off"
                                        :class="{ 'is-invalid': productStore.v_validate.stock_qty.$error }" />
                                    <label for="name" class="form-label">ចំនួនស្តុក</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2"
                                    v-if="productStore.v_validate.stock_qty.$error">
                                    {{ productStore.v_validate.stock_qty.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="mb-0 mb-md-3 w-100">
                                <div class="input-field">
                                    <select class="form-select rounded-5" id="name"
                                        v-model="productStore.frm.unit_measure_id" autocomplete="off"
                                        :class="{ 'is-invalid': productStore.v_validate.unit_measure_id.$error }">
                                        <option value="" hidden selected>ជ្រើសរើស</option>
                                        <option value="1">ដុំ</option>
                                        <option value="2">គីឡូក្រាម</option>
                                        <option value="3">ក្រាម</option>
                                        <option value="4">លីត</option>
                                        <option value="5">កញ្ចប់</option>
                                        <option value="6">ប្រអប់</option>
                                    </select>
                                    <label for="name" class="form-label">រង្វាស់</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2"
                                    v-if="productStore.v_validate.unit_measure_id.$error">
                                    {{ productStore.v_validate.unit_measure_id.$errors[0].$message }}
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap flex-md-nowrap gap-3">
                            <div class="mb-3 w-100">
                                <div class="input-field">
                                    <input type="text" class="form-control rounded-5" id="name"
                                        v-model="productStore.frm.stock_level" placeholder="" autocomplete="off"
                                        :class="{ 'is-invalid': productStore.v_validate.stock_level.$error }" />
                                    <label for="name" class="form-label">កម្រិតបញ្ជាទិញឡើងវិញ</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2"
                                    v-if="productStore.v_validate.stock_level.$error">
                                    {{ productStore.v_validate.stock_level.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="mb-3 w-100">
                                <div class="input-field">
                                    <input type="text" class="form-control rounded-5" id="name"
                                        v-model="productStore.frm.price" placeholder="" autocomplete="off"
                                        :class="{ 'is-invalid': productStore.v_validate.price.$error }" />
                                    <label for="name" class="form-label">តម្លៃ</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2" v-if="productStore.v_validate.price.$error">
                                    {{ productStore.v_validate.price.$errors[0].$message }}
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap flex-md-nowrap gap-3">
                            <div class="mb-3 w-100">
                                <div class="input-field">
                                    <input type="text" class="form-control rounded-5" id="name"
                                        v-model="productStore.frm.discount" placeholder=""
                                        @input="productStore.frm.discount" autocomplete="off"
                                        :class="{ 'is-invalid': productStore.v_validate.discount.$error }" />
                                    <label for="name" class="form-label">បញ្ចុះតម្លៃ</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2"
                                    v-if="productStore.v_validate.discount.$error">
                                    {{ productStore.v_validate.discount.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="mb-3 w-100">
                                <div class="input-field">
                                    <input type="date" ref="datepicker2" class="form-control rounded-5" id="start_date"
                                        :disabled="productStore.frm.discount == 0" v-model="productStore.frm.start_date"
                                        placeholder="" autocomplete="off"
                                        :class="{ 'is-invalid': productStore.v_validate.start_date.$error }" />
                                    <label for="start_date" class="form-label">ថ្ងៃចាប់ផ្តើមបញ្ចះតម្លៃ</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2"
                                    v-if="productStore.v_validate.start_date.$error">
                                    {{ productStore.v_validate.start_date.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="mb-3 w-100">
                                <div class="input-field">
                                    <input type="date" ref="datepicker" class="form-control rounded-5" id="end_name"
                                        :disabled="productStore.frm.discount == 0" v-model="productStore.frm.end_date"
                                        placeholder="" autocomplete="off"
                                        :class="{ 'is-invalid': productStore.v_validate.end_date.$error }" />
                                    <label for="name" class="form-label">ថ្ងៃបញ្ចប់បញ្ចះតម្លៃ</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2"
                                    v-if="productStore.v_validate.end_date.$error">
                                    {{ productStore.v_validate.end_date.$errors[0].$message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-4 w-100">
                            <div class="input-field">
                                <textarea class="form-control rounded-5" id="category"
                                    v-model="productStore.frm.description" placeholder="" autocomplete="off"
                                    :class="{ 'is-invalid': productStore.v_validate.description.$error }"></textarea>
                                <label for="category" class="form-label label-text-area">អំពីផលិតផល</label>
                            </div>
                            <div class="invalid-feedback d-block ps-2"
                                v-if="productStore.v_validate.description.$error">
                                {{ productStore.v_validate.description.$errors[0].$message }}
                            </div>
                        </div>

                        <div class="modal-footer border-0 m-0 p-0 ">
                            <button type="button" class="btn btn-light rounded-5 btn-150 text-cancel"
                                @click="onCencel()">បោះបង់</button>
                            <button type="submit" @click="handleSubmit()" :disabled="isLoading"
                                class="btn btn-primary rounded-5 btn-150">
                                <span v-if="!isLoading" role="status"> {{ productStore.selectedId == 0 ? "បញ្ជូន" :
                                    "កែប្រែ"
                                    }}</span>
                                <span v-if="isLoading" class="spinner-border spinner-border-sm"
                                    aria-hidden="true"></span>
                                <span v-if="isLoading" role="status">
                                    {{ productStore.selectedId == 0 ? " កំពុងបញ្ជូន" : " កំពុងកែប្រែ" }}
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
import { Modal } from 'bootstrap';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/views/product_store';
import { useAuthStore } from '@/stores/views/auth/auth';
import { required, helpers, integer, numeric } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import { preventDefault } from 'tom-select/dist/cjs/utils';

const productStore = useProductStore();
const authStore = useAuthStore();
const isLoading = ref(false);
const datepicker = ref(null);
const datepicker2 = ref(null);

const maxValue = (value) => value <= 10000;
const maxValueStock = (value) => value <= 10;
const minValueStock = (value) => value > 0;
const minValue = (value) => value >= 0;
const minLength = (value) => value.length >= 3;
const maxLength = (value) => value.length <= 250;
const noPercentageSymbol = (value) => !String(value).includes('%');
const isAfterStartDate = (end_date, vm) => {
    if (!vm.start_date || !end_date) return true;
    return new Date(end_date) > new Date(vm.start_date);
};

const rules = computed(() => ({
    name: {
        required: helpers.withMessage('សូមបញ្ចូលឈ្មោះផលិតផល', required),
        maxLength: helpers.withMessage('ឈ្មោះផលិតផលមិនអាចលើស 250 តួអក្ស', maxLength),
    },
    category_id: {
        required: helpers.withMessage('សូមបញ្ចូលប្រភេទផលិតផល', required)
    },
    stock_qty: {
        required: helpers.withMessage('សូមបញ្ចូលចំនួនផលិតផល', required),
        minValue: helpers.withMessage('សូមបញ្ចូលចំនួនផលិតផលមិនអាចតូចជាង 0', minValue),

    },
    stock_level: {
        required: helpers.withMessage('សូមបញ្ចូលចំនួនក្នុងស្តុក', required),
        integer: helpers.withMessage('សូមបញ្ចូលចំនួនក្នុងស្តុក', integer),
        minValueStock: helpers.withMessage('សូមបញ្ចូលចំនួនក្នុងស្តុកមិនអាចតូចជាងឬស្មើរ 0', minValueStock),
        maxValueStock: helpers.withMessage('សូមបញ្ចូលចំនួនក្នុងស្តុកមិនអាចធំជាង  10', maxValueStock)
    },
    price: {
        required: helpers.withMessage('សូមបញ្ចូលតម្លៃ', required),
        numeric: helpers.withMessage('សូមបញ្ចូលចំនួនតម្លៃអោយបានត្រឹមត្រូវ e.g xx ឬ xx.xx', numeric),

    },
    unit_measure_id: {
        required: helpers.withMessage('សូមបញ្ចូលខ្នាតវាស់', required)
    },
    description: {
        required: helpers.withMessage('សូមបញ្ចូលការពិពណ៌នា', required),
        maxLength: helpers.withMessage('សូមបញ្ចូលការពិពណ៌នាមិនអាចលើស 250 តួអក្ស', maxLength)
    },
    discount: productStore.frm.discount != 0 ? {
        required: helpers.withMessage('សូមបញ្ចូលបញ្ចុះតម្លៃ', required),
        noPercentageSymbol: helpers.withMessage('សូមកុំបញ្ចូល % ក្នុងបញ្ចុះតម្លៃ', noPercentageSymbol),
        numeric: helpers.withMessage('សូមបញ្ចូលចំនួនបញ្ចុះតម្លៃត្រឹមត្រូវ', numeric),
    } : {},
    start_date: productStore.frm.discount != 0 ? {
        required: helpers.withMessage('សូមបញ្ចូលថ្ងៃចាប់ផ្តើមបញ្ចុះតម្លៃ', required)
    } : {},
    end_date: productStore.frm.discount != 0 ? {
        required: helpers.withMessage('សូមបញ្ចូថ្ងៃឈប់បញ្ចុះតម្លៃ', required),
        isAfterStartDate: helpers.withMessage('ថ្ងៃបញ្ចប់ត្រូវធំជាងថ្ងៃចាប់ផ្តើម', isAfterStartDate)
    } : {},
    photo: {
        required: helpers.withMessage('សូមបញ្ចូលរូបភាពរបស់ផលិតផល', required),
    }
}));


productStore.v_validate = useVuelidate(rules, productStore.frm);

onMounted(() => {
    productStore.mdl_add = Modal.getOrCreateInstance(document.getElementById('mdl-add'));
    productStore.onloadSubcategory();
    flatpickr(datepicker.value, {
        enableTime: false,
        dateFormat: "Y-m-d",
    });
    flatpickr(datepicker2.value, {
        enableTime: false,
        dateFormat: "Y-m-d",
    });
});

const onCencel = () => {
    productStore.mdl_add.hide();
    productStore.frm.is_remove = 0;
}

const chooseFileImage = () => {
    document.getElementById('file_img').value = ''
    document.getElementById('file_img').click();
}

const onSelectedImage = (e) => {

    if (e.currentTarget.files.length === 0) {
        return;
    }
    const file = e.currentTarget.files[0];
    const maxSize = 1 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
        productStore.error_Message = 'អ្នកអាចប្រើរូបភាពប្រភេទ JPEG, PNG និង GIF';
        productStore.mdl_errorTypeImage.show();
        productStore.mdl_add.hide();
        return;
    }

    if (file.size > maxSize) {
        productStore.error_Message = 'ទំហំរូបភាពមិនត្រូវលើស 1MB';
        productStore.mdl_errorTypeImage.show();
        productStore.mdl_add.hide();
        return;
    }
    productStore.frm.photo = URL.createObjectURL(file)
    productStore.crop.img = URL.createObjectURL(file)
    productStore.mdl_add.hide();
    productStore.mdl_crop.show();
}

const removeImage = () => {
    productStore.crop.avatar = null;
    productStore.frm.is_remove = 1;
    productStore.frm.photo = ""
}

const handleSubmit = async () => {
    productStore.v_validate.$validate();
    if (productStore.v_validate.$error) return;

    let frmData = new FormData();
    frmData.append('name', productStore.frm.name);
    frmData.append('price', productStore.frm.price);
    frmData.append('stock_qty', productStore.frm.stock_qty);
    frmData.append('stock_level', productStore.frm.stock_level);
    frmData.append('description', productStore.frm.description);
    frmData.append('measure_id', productStore.frm.unit_measure_id);
    frmData.append('subcategory_id', productStore.frm.category_id);

    if (productStore.frm.discount !== 0) {

        frmData.append('discount_percentage', productStore.frm.discount);
        frmData.append('start_date', productStore.frm.start_date);
        frmData.append('end_date', productStore.frm.end_date);
    }

    if (productStore.crop.blob) {

        frmData.append('photo', productStore.crop.blob);
    }

    isLoading.value = true;
    if (productStore.selectedId == 0) {
        try {
            const res = await axios.post('/api/products', frmData, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authStore.token}`
                }
            });
            console.log(res.data.result);
            
            if (res.data.result) {
                productStore.mdl_add.hide();
                productStore.onloadProduct();
            }
        } catch (err) {
            console.log(err);
        } finally {
            isLoading.value = false;
        }
    } else {
        try {
            const res = await axios.post(`/api/products/${productStore.selectedId}`, frmData, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authStore.token}`
                }
            });
            if (res.data.result) {
                productStore.mdl_add.hide();
                productStore.onloadProduct();
            }
        } catch (err) {
            console.log(err);
        } finally {
            isLoading.value = false;
        }
    }
};
</script>
