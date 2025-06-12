<template>
    <div class="modal fade" id="mdl-add" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content p-3 rounded-4">
                <form action="" @submit.prevent>
                    <div class="modal-header border-0">
                        <h5 class="modal-title">{{ userStore.selectedId == 0 ? 'បន្ថែមអ្នកប្រើប្រាស់' :
                            'កែប្រែអ្នកប្រើប្រាស់' }}</h5>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex align-items-center gap-3 mb-4">
                            <div class="form-photo bg-light rounded-circle overflow-auto">
                                <img :src="userStore.crop.avatar ? userStore.crop.avatar : '/default.png'"
                                    class="card-img object-fit-cover" alt="">
                            </div>
                            <div>
                                <div class="d-flex flex-column mb-3">
                                    <span class="fw-medium mb-1">បញ្ចូលរូបភាព​អ្នកប្រើប្រាស់</span>
                                    <span class="fs-13">ទំហំនៃរូបភាព​ 1 MB</span>
                                </div>
                                <div class="d-flex align-items-center gap-4">
                                    <a role="button" class="text-decoration-none text-primary fs-14"
                                        @click="chooseFileImage()">
                                        <i class="bi bi-upload"></i> ជ្រើសរើស
                                    </a>
                                    <a role="button" class="text-decoration-none text-danger fs-14"
                                        @click="removeImage()">
                                        <i class="bi bi-trash"></i> លុប
                                    </a>
                                </div>
                                <input type="file" @change="onSelectedImage($event)" class="form-control d-none"
                                    id="file_img"  accept="image/jpeg, image/png, image/gif">
                            </div>
                        </div>
                        <div>
                            <div class="d-flex flex-wrap flex-md-nowrap gap-3">
                                <div class="mb-0 mb-md-3 w-100">
                                    <div class="input-field">
                                        <input type="text" class="form-control rounded-5" id="Fname"
                                            v-model="userStore.frm.first_name" placeholder="" autocomplete="off"
                                            :class="{ 'is-invalid': userStore.v_validate.first_name.$error }" />
                                        <label for="fname" class="form-label">នាមត្រកូល</label>
                                    </div>
                                    <div class="invalid-feedback d-block ps-2"
                                        v-if="userStore.v_validate.first_name.$error">
                                        {{ userStore.v_validate.first_name.$errors[0].$message }}
                                    </div>
                                </div>
                                <div class="mb-3 w-100">
                                    <div class="input-field">
                                        <input type="text" class="form-control rounded-5" id="lname"
                                            v-model="userStore.frm.last_name" placeholder="" autocomplete="off"
                                            :class="{ 'is-invalid': userStore.v_validate.last_name.$error }" />
                                        <label for="lname" class="form-label">នាមខ្លូន</label>
                                    </div>
                                    <div class="invalid-feedback d-block ps-2"
                                        v-if="userStore.v_validate.last_name.$error">
                                        {{ userStore.v_validate.last_name.$errors[0].$message }}
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap flex-md-nowrap gap-3">
                                <div class="mb-0 mb-md-3 w-100">
                                    <div class="input-field">
                                        <input type="text" @input="resetTaken()" class="form-control rounded-5"
                                            id="email" v-model="userStore.frm.email" placeholder="" autocomplete="off"
                                            :class="{ 'is-invalid': userStore.v_validate.email.$error }" />
                                        <label for="email" class="form-label">អ៊ីម៉ែល</label>
                                    </div>
                                    <div class="invalid-feedback d-block ps-2" v-if="userStore.v_validate.email.$error">
                                        {{ userStore.v_validate.email.$errors[0].$message }}
                                    </div>


                                </div>
                                <div class="mb-3 w-100">
                                    <div class="input-field">
                                        <input type="text" class="form-control rounded-5" id="phone"
                                            v-model="userStore.frm.phone" placeholder="" @input="resetTaken()" autocomplete="off"
                                            :class="{ 'is-invalid': userStore.v_validate.phone.$error }" />
                                        <label for="phone" class="form-label">លេខទូរស័ព្ទ</label>
                                    </div>
                                    <div class="invalid-feedback d-block ps-2" v-if="userStore.v_validate.phone.$error">
                                        {{ userStore.v_validate.phone.$errors[0].$message }}
                                    </div>
                                </div>
                            </div>
                            <div class="flex-wrap flex-md-nowrap gap-3"
                                :class="{ 'd-flex': userStore.selectedId == 0, 'd-none': userStore.selectedId != 0 }">
                                <div class="mb-0 mb-md-3 w-100 position-relative">
                                    <div class="input-field">
                                        <input :type="showPassword ? 'text' : 'password'"
                                            class="form-control rounded-5 pe-5" id="password"
                                            v-model="userStore.frm.pass" placeholder="" autocomplete="off"
                                            :class="{ 'is-invalid': userStore.v_validate.pass.$error }" />
                                        <label for="password" class="form-label">ពាក្យសម្ងាត់</label>
                                        <i v-if="!userStore.v_validate.pass.$error" class="eye-pass bi"
                                            :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"
                                            @click="togglePasswordVisibility('password')">
                                        </i>
                                    </div>
                                    <div class="invalid-feedback d-block ps-2" v-if="userStore.v_validate.pass.$error">
                                        {{ userStore.v_validate.pass.$errors[0].$message }}
                                    </div>
                                </div>
                                <div class="mb-3 w-100 position-relative">
                                    <div class="input-field">
                                        <input :type="showConfirmPassword ? 'text' : 'password'"
                                            class="form-control rounded-5 pe-5" id="confirm_password"
                                            v-model="userStore.frm.con_pass" placeholder="" autocomplete="off"
                                            :class="{ 'is-invalid': userStore.v_validate.con_pass.$error }" />
                                        <label for="confirm_password" class="form-label">បញ្ចាក់ពាក្យសម្ងាត់</label>
                                        <i v-if="!userStore.v_validate.con_pass.$error" class="eye-pass bi"
                                            :class="showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"
                                            @click="togglePasswordVisibility('confirm')">
                                        </i>
                                    </div>
                                    <div class="invalid-feedback d-block ps-2"
                                        v-if="userStore.v_validate.con_pass.$error">
                                        {{ userStore.v_validate.con_pass.$errors[0].$message }}
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3 w-100">
                                <div class="input-field">
                                    <input type="text" class="form-control rounded-5" id="address"
                                        v-model="userStore.frm.address" placeholder="" autocomplete="off"
                                        :class="{ 'is-invalid': userStore.v_validate.address.$error }" />
                                    <label for="address" class="form-label">អាស័យដ្ឋាន</label>
                                </div>
                                <div class="invalid-feedback d-block ps-2" v-if="userStore.v_validate.address.$error">
                                    {{ userStore.v_validate.address.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <div class="form-check">
                                    <input class="form-check-input" checked type="radio" id="male" value="1"
                                        v-model="userStore.frm.gender">
                                    <label class="form-check-label" for="male">
                                        ប្រុស
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="fmale" value="2"
                                        v-model="userStore.frm.gender">
                                    <label class="form-check-label" for="fmale">
                                        ស្រី
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-light rounded-5 btn-150 text-cancel"
                            data-bs-dismiss="modal">បោះបង់</button>
                        <button :disabled="isLoading" type="submit" @click="onclickSaveUser()"
                            class="btn btn-primary rounded-5 btn-150">
                            <span v-if="!isLoading" role="status"> {{ userStore.selectedId == 0 ? "បញ្ជូន" : "កែប្រែ"
                                }}</span>
                            <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span v-if="isLoading" role="status">
                                {{ userStore.selectedId == 0 ? " កំពុងបញ្ជូន" : " កំពុងកែប្រែ" }}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup>
import { Modal } from 'bootstrap';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/views/user_store';
import { useAuthStore } from "@/stores/views/auth/auth";
import { helpers, required, maxLength, minLength, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import axios from 'axios';

const userStore = useUserStore();
const authStore = useAuthStore();
const isLoading = ref(false);
const isEmailTaken = ref(false);
const isPhoneTaken = ref(false);

const taken = helpers.withMessage('អ្នកប្រើរប្រាស់ម្នាក់នេះមានរួចហើយ', () => {
    return !isEmailTaken.value;
});
const takenPhone = helpers.withMessage('អ្នកប្រើរប្រាស់ម្នាក់នេះមានរួចហើយ', () => {
    return !isPhoneTaken.value;
});

const resetTaken = () => {
    isEmailTaken.value = false;
    isPhoneTaken.value = false;
}

onMounted(() => {
    userStore.mdl_add = Modal.getOrCreateInstance(document.getElementById('mdl-add'));
});
const sameAsPassword = (value, siblings) => value === siblings.pass;
const minValue = (value) => value >= 0;
const rules = computed(() => ({
    first_name: {
        required: helpers.withMessage("សូមបញ្ចូលនាមត្រកូល", required),
        maxLength: helpers.withMessage("សូមបញ្ចូលនាមត្រកូលមិនអាចលើសពី 50 តួអក្សរ", maxLength(50))
    },
    last_name: {
        required: helpers.withMessage("សូមបញ្ចូលនាមខ្លួន", required),
        maxLength: helpers.withMessage("សូមបញ្ចូលនាមខ្លួនមិនអាចលើសពី 50 តួអក្សរ", maxLength(50))
    },
    gender: {
        required: helpers.withMessage("សូមជ្រើសរើសភេទ", required)
    },
    phone: {
        required: helpers.withMessage("សូមបញ្ចូលលេខទូរស័ព្ទ", required),
        minLength: helpers.withMessage("សូមបញ្ចូលលេខទូរស័ព្ទនៅចន្លោះ 9 ទៅ 10 តួអក្សរ", minLength(9)),
        maxLength: helpers.withMessage("សូមបញ្ចូលលេខទូរស័ព្ទនៅចន្លោះ 9 ទៅ 10 តួអក្សរ", maxLength(10)),
        minValue: helpers.withMessage("សូមបញ្ចូលលេខទូរស័ព្ទមិនអាចតូចជាង0", minValue),
        startsWithZero: helpers.withMessage(
            "លេខទូរស័ព្ទត្រូវចាប់ផ្តើមដោយលេខ 0",
            (value) => /^0\d{8,9}$/.test(value)
        ),
        takenPhone
    },
    email: {
        required: helpers.withMessage("សូមបញ្ចូលអ៊ីម៉ែល", required),
        email: helpers.withMessage("អ៊ីម៉ែលមិនត្រឹមត្រូវទេ", email),
        maxLength: helpers.withMessage("សូមបញ្ចូលអ៊ីម៉ែលមិនអាចលើសពី 50 តួអក្សរ", maxLength(50)),
        taken
    },
    address: {
        required: helpers.withMessage("សូមបញ្ចូលអាស័យដ្ឋាន", required),
        maxLength: helpers.withMessage("សូមបញ្ចូលអាស័យដ្ឋានមិនអាចលើសពី 255 តួអក្សរ", maxLength(255))
    },
    pass: userStore.selectedId == 0 ? {
        required: helpers.withMessage("សូមបញ្ចូលពាក្យសម្ងាត់", required),
        minLength: helpers.withMessage("សូមបញ្ចូលពាក្យសម្ងាត់យ៉ាងតិច 6 តួអក្សរ", minLength(6))
    } : {},

    con_pass: userStore.selectedId == 0 ? {
        required: helpers.withMessage("សូមបញ្ចូលបញ្ចាក់ពាក្យសម្ងាត់", required),
        minLength: helpers.withMessage("សូមបញ្ចូលបញ្ចាក់ពាក្យសម្ងាត់យ៉ាងតិច 6 តួអក្សរ", minLength(6)),
        sameAsPassword: helpers.withMessage("ពាក្យសម្ងាត់មិនដូចគ្នាទេ", sameAsPassword)
    } : {}
}));

userStore.v_validate = useVuelidate(rules, userStore.frm);

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const togglePasswordVisibility = (field) => {
    if (field === 'password') showPassword.value = !showPassword.value;
    if (field === 'confirm') showConfirmPassword.value = !showConfirmPassword.value;
};

const chooseFileImage = () => {
    document.getElementById('file_img').value = '';
    document.getElementById('file_img').click();
};

const onSelectedImage = (e) => {
    if (e.currentTarget.files.length === 0) {
        return;
    }
    const file = e.currentTarget.files[0];
    const maxSize = 1 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
        userStore.error_Message = 'អ្នកអាចប្រើរូបភាពប្រភេទ JPEG, PNG និង GIF';
        userStore.mdl_errorTypeImage.show();
        userStore.mdl_add.hide();
        return;
    }

    if (file.size > maxSize) {
        userStore.error_Message = 'ទំហំរូបភាពមិនត្រូវលើស 1MB';
        userStore.mdl_errorTypeImage.show();
        userStore.mdl_add.hide();
        return;
    }

    userStore.frm.is_remove = 0;
    userStore.crop.img = URL.createObjectURL(file);
    userStore.mdl_add.hide();
    userStore.mdl_crop.show();
};


const removeImage = () => {
    userStore.crop.avatar = null;
    userStore.frm.is_remove = 1;
}

const onclickSaveUser = async () => {
    userStore.v_validate.$validate();
    if (userStore.v_validate.$error) {
        return;
    }
    let frmData = new FormData();
    frmData.append('first_name', userStore.frm.first_name);
    frmData.append('last_name', userStore.frm.last_name);
    frmData.append('gender_id', userStore.frm.gender);
    frmData.append('phone', userStore.frm.phone);
    frmData.append('address', userStore.frm.address);
    frmData.append('email', userStore.frm.email);

    if (userStore.selectedId == 0) {
        frmData.append('password', userStore.frm.pass);
        frmData.append('password_confirmation', userStore.frm.con_pass);
    }

    if (userStore.selectedId != 0) {
        
        frmData.append('is_remove', userStore.frm.is_remove);
    }


    if (userStore.crop.blob) {
        frmData.append('photo', userStore.crop.blob);
    }

    isLoading.value = true;
    if (userStore.selectedId == 0) {
        try {
            const res = await axios.post('/api/users', frmData,{
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authStore.token}`
                }
            });
            if (res.data.result) {
                userStore.mdl_add.hide();
                userStore.onloadUser();
            }
        } catch (err) {
            if (err.response?.data?.errors?.email?.[0]) {
                console.log(err.response.data.errors.email[0]);
                if (err.response.data.errors.email[0].includes('The email has already been taken.')) {
                    isEmailTaken.value = true;
                } 
            }

            if (err.response?.data?.errors?.phone?.[0]) {
                console.log(err.response.data.errors.phone[0]);
                 if (err.response.data.errors.phone[0].includes('The phone has already been taken.')) {
                    isPhoneTaken.value = true;
                }
            }
        } finally {
            isLoading.value = false;
        }
    } else {
        try {
            const res = await axios.post(`/api/users/${userStore.selectedId}`, frmData,{
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authStore.token}`
                }
            });
            
            if (res.data.result) {
                userStore.mdl_add.hide();
                userStore.onloadUser();
            }
        } catch (err) {
            console.log(err.response.data);

            if (err.response?.data?.errors?.email?.[0]) {
                console.log(err.response.data.errors.email[0]);
                if (err.response.data.errors.email[0].includes('The email has already been taken.')) {
                    isEmailTaken.value = true;
                }
            }

            if (err.response?.data?.errors?.phone?.[0]) {
                console.log(err.response.data.errors.phone[0]);
                 if (err.response.data.errors.phone[0].includes('The phone has already been taken.')) {
                    isPhoneTaken.value = true;
                }
            }
        } finally {
            isLoading.value = false;
        }
    }
};
</script>
