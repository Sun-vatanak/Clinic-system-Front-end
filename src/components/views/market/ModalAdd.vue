<template>
    <div class="modal fade" id="mdl-add" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3 rounded-4">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        {{ marketStore.selectedId == 0 ? "បន្ថែមផ្សារ" : "កែប្រែផ្សារ" }}
                    </h5>
                </div>
                <div class="modal-body">
                    <div class="d-flex align-items-center gap-3 mb-4 position-relative" :class="{'mb-65': marketStore.v_validate.photo.$error}">
                        <div class="form-photo overflow-hidden">
                            <div class="from-photo bg-light rounded-circle overflow-hidden" :class="{
                                ' border border-1 border-danger': marketStore.v_validate.photo.$error
                            }">
                                <img :src="marketStore.crop.avatar ? marketStore.crop.avatar : '/default.png'"
                                    class="card-img" alt="">
                            </div>
                            <div class="invalid-feedback d-block ps-2 position-absolute bottom-1" v-if=" marketStore.v_validate.photo.$error">
                                    {{ marketStore.v_validate.photo.$errors[0].$message }}
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
                            <input type="file" @change="onSelectedImage($event)" class="form-control d-none"
                                id="file_img" accept="image/jpeg, image/png, image/gif">
                        </div>
                    </div>
                    <div>
                        <form @submit.prevent="onclickAddMarket()">
                            <div class="mb-3 w-100">
                                <div class="input-field">
                                    <input @input="resetTaken()" type="text" autocomplete="off"
                                        class="form-control rounded-5" id="name" v-model="marketStore.frm.name"
                                        placeholder="" :class="{
                                            'is-invalid': marketStore.v_validate.name.$error,
                                        }" />
                                    <label for="name" class="form-label">ឈ្មោះផ្សារ</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2" v-if="marketStore.v_validate.name.$error">
                                    {{ marketStore.v_validate.name.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="mb-3 w-100">
                                <div class="input-field">
                                    <select class="form-select rounded-5" id="category"
                                        v-model="marketStore.frm.location" :class="{
                                            'is-invalid':
                                                marketStore.v_validate.location.$error
                                        }" autocomplete="off">
                                        <option value="" disabled selected>ជ្រើសរាជធានី</option>
                                        <option v-for="p in state.province" :key="p.id" :value="p.name">
                                            {{ p.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="invalid-feedback d-block ps-2"
                                    v-if="marketStore.v_validate.location.$error">
                                    {{ marketStore.v_validate.location.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="d-flex flex-wrap flex-md-nowrap gap-3">
                                <div class="mb-0 mb-md-3 w-100">
                                    <div class="input-field">
                                        <input type="text" class="form-control rounded-5" id="latitude"
                                            v-model="marketStore.frm.latitude" placeholder="" :class="{
                                                'is-invalid': marketStore.v_validate.latitude.$error,
                                            }" autocomplete="off"/>
                                        <label for="latitude" class="form-label">Latitude</label>
                                    </div>
                                    <div class="invalid-feedback d-block ps-2"
                                        v-if="marketStore.v_validate.latitude.$error">
                                        {{ marketStore.v_validate.latitude.$errors[0].$message }}
                                    </div>
                                </div>
                                <div class="mb-3 w-100">
                                    <div class="input-field">
                                        <input type="text" class="form-control rounded-5" id="longitude"
                                            v-model="marketStore.frm.longitude" placeholder="" :class="{
                                                'is-invalid': marketStore.v_validate.longitude.$error,
                                            }" autocomplete="off"/>
                                        <label for="longitude" class="form-label">Longitude</label>
                                    </div>
                                    <div class="invalid-feedback d-block ps-2"
                                        v-if="marketStore.v_validate.longitude.$error">
                                        {{ marketStore.v_validate.longitude.$errors[0].$message }}
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3 w-100">
                                <div class="input-field">
                                    <input type="text" class="form-control rounded-5" id="Description"
                                        v-model="marketStore.frm.description" placeholder="" :class="{
                                            'is-invalid': marketStore.v_validate.description.$error,
                                        }" autocomplete="off"/>
                                    <label for="description" class="form-label">ការពិពណ៌នា</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2"
                                    v-if="marketStore.v_validate.description.$error">
                                    {{ marketStore.v_validate.description.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="w-100 d-flex justify-content-end gap-2">
                                <button type="button" class="btn btn-light rounded-5 btn-150 text-cancel"
                                    data-bs-dismiss="modal">
                                    បោះបង់
                                </button>
                                <button type="submit" class="btn btn-primary rounded-5 btn-150"
                                    @click="onclickAddMarket()" :disabled="isLoading">
                                    <span v-if="!isLoading" role="status">{{ marketStore.selectedId == 0 ? " បញ្ជូន" :
                                        "កែប្រែ"
                                    }}</span>
                                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"
                                        aria-hidden="true"></span>
                                    <span v-if="isLoading" role="status">
                                        {{ marketStore.selectedId == 0 ? "កំពុងបញ្ជូន" : "​ កំពុងកែប្រែ" }}
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
import { Modal } from "bootstrap";
import { computed, onMounted, reactive, ref, } from "vue";
import { useMarketStore } from "@/stores/views/market_store";
import {
    helpers,
    required,
    maxLength,
    minValue,
    maxValue,
    numeric,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import axios from "axios";

const marketStore = useMarketStore();

const isNameTaken = ref(false);
const taken = helpers.withMessage('ឈ្មោះផ្សារនេះមានរួចហើយ', () => {
    return !isNameTaken.value;
});
const resetTaken = () => {
    isNameTaken.value = false;
}

const isLoading = ref(false);

const state = reactive({
    province: [
        { id: 1, name: 'ភ្នំពេញ' },
    ]
})

const decimalPrecision = (digits, decimals) =>
    helpers.withMessage(
        `ចំនួនត្រូវតែមាន ${digits} ខ្ទង់ និង ${decimals} ខ្ទង់ក្រោយក្បៀស!`,
        (value) => {
            const regex = new RegExp(`^-?\\d{1,${digits - decimals}}(\\.\\d{1,${decimals}})?$`);
            return regex.test(value);
        }
    );

const rules = computed(() => ({
    name: {
        required: helpers.withMessage("សូមបញ្ចូលឈ្មោះផ្សារ!", required),
        maxLength: helpers.withMessage("មិនអាចបញ្ចូលលើស 60 តួអក្សរ", maxLength(60)),
        taken
    },
    location: {
        required: helpers.withMessage("សូមបញ្ចូលទីតាំងផ្សារ!", required),
    },
    latitude: {
        required: helpers.withMessage("សូមបញ្ចូល latitude!", required),
        numeric: helpers.withMessage("Latitude ត្រូវតែជា​លេខ!", numeric),
        minValue: helpers.withMessage("Latitude ត្រូវធំជាង​ ​ឬស្មើ -90!", minValue(-90)),
        maxValue: helpers.withMessage("Latitude ត្រូវតូចជាង ឬស្មើ 90!", maxValue(90)),
        decimalPrecision: decimalPrecision(10, 8),
    },
    longitude: {
        required: helpers.withMessage("សូមបញ្ចូល longitude!", required),
        numeric: helpers.withMessage("Longitude ត្រូវតែជា​លេខ!", numeric),
        minValue: helpers.withMessage("Longitude ត្រូវធំជាង​ ​ឬស្មើ -180!", minValue(-180)),
        maxValue: helpers.withMessage("Longitude ត្រូវតូចជាង ឬស្មើ 180!", maxValue(180)),
        decimalPrecision: decimalPrecision(11, 8),
    },
    description: {
        required: helpers.withMessage("សូមបញ្ជូលការពិពណ៌៉នា", required),
    },
    photo:{
        required: helpers.withMessage('សូមបញ្ចូលរូបភាពរបស់ផ្សារ', required),

    }
}));

marketStore.v_validate = useVuelidate(rules, marketStore.frm);

onMounted(() => {
    marketStore.mdl_add = Modal.getOrCreateInstance(
        document.getElementById("mdl-add")
    );
});

const removeImage = () => {
    marketStore.crop.avatar = null;
    marketStore.frm.is_remove = 1;
    marketStore.frm.photo = '';
    
};

const chooseFileImage = () => {
    document.getElementById("file_img").click();
};

const onSelectedImage = (e) => {
    if (e.currentTarget.files.length === 0) {
        return;
    }

    const file = e.currentTarget.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 1 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
        marketStore.error_message = 'អ្នកអាចប្រើរូបភាពប្រភេទ JPEG, PNG និង GIF';
        marketStore.mdl_add.hide();
        marketStore.modalErrorTypeImage.show();
        return;
    }

    if (file.size > maxSize) {
        marketStore.error_message = 'ទំហំរូបភាពមិនត្រូវលើស 1MB';
        marketStore.mdl_add.hide();
        marketStore.modalErrorTypeImage.show();
        return;
    }

    marketStore.frm.is_remove = 0;
    marketStore.crop.img = URL.createObjectURL(file);
    marketStore.frm.photo = URL.createObjectURL(file);
    marketStore.mdl_add.hide();
    marketStore.mdl_crop.show();
}



const onclickAddMarket = async () => {
    marketStore.v_validate.$validate();
    if (marketStore.v_validate.$error) {
        return;
    }

    let frmData = new FormData();
    frmData.append('name', marketStore.frm.name);
    frmData.append('location', marketStore.frm.location);
    frmData.append('latitude', marketStore.frm.latitude);
    frmData.append('longitude', marketStore.frm.longitude);
    frmData.append('description', marketStore.frm.description);
    if (marketStore.selectedId != 0) {
        frmData.append("is_remove", marketStore.frm.is_remove);
    }
    if (marketStore.crop.blob) {
        frmData.append("photo", marketStore.crop.blob);
    }

    isLoading.value = true;
    if (marketStore.selectedId == 0) {
        try {
            const res = await axios.post('/api/markets', frmData);
            if (res.data.result) {
                marketStore.mdl_add.hide();
                marketStore.onloadMarket();
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
            const res = await axios.post(`/api/markets/${marketStore.selectedId}`, frmData);
            if (res.data.result) {
                marketStore.mdl_add.hide();
                marketStore.onloadMarket();
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
};
</script>
