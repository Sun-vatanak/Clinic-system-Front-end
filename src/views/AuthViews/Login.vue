<template>
    <div class="vh-100 d-flex justify-content-center align-items-center">
        <div class="row p-3 px-1 mx-auto bg-white rounded rounded-3 w-auth-form">
            <div class="d-none d-md-block col-6">
                <div class="card border-0 h-100 bg-secondary">
                    <img :src="image" alt="" class="image" />
                </div>
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
                <div class="card border-0">
                    <div class="card-body d-flex flex-column gap-4">
                        <div class="d-flex flex-column gap-4">
                            <h1 class="fs-3 fw-bold mb-0">ចូលប្រើប្រាស់</h1>
                        </div>
                        <form action="" class="row g-4" @submit.prevent="onClickLogin">
                            <div class="col-12">
                                <div class="input-field">
                                    <input type="text" autocomplete="off" class="form-control" :class="{
                                        'is-invalid':
                                            authStore.vueValidation.email_or_phone.$error || isCheckPss || isCheckRole || isCheckVendor || isCheckActive
                                    }" id="email" v-model="authStore.data.email_or_phone" placeholder="" />
                                    <label for="email" class="form-label">អុីមែល ឬ លេខទូរសព្ទ</label>
                                </div>
                                <label class="text-danger small" v-if="authStore.vueValidation.email_or_phone.$error">
                                    {{
                                        authStore.vueValidation.email_or_phone.$errors[0].$message
                                    }}
                                </label>
                            </div>
                            <div class="col-12">
                                <div class="input-field mb-2">
                                    <input :type="password" autocomplete="off" class="form-control" :class="{
                                        'is-invalid': authStore.vueValidation.password.$error || isCheckPss || isCheckRole || isCheckVendor || isCheckActive
                                    }" id="password" v-model="authStore.data.password" placeholder="" />
                                    <label for="password" class="form-label">លេខសម្ងាត់</label>
                                    <span class="eye-class"
                                        :class="{ 'd-none': authStore.vueValidation.password.$error || isCheckPss || isCheckRole || isCheckVendor || isCheckActive }"><i
                                            @click="onClickEye" :class="authStore.checkTypePassword.showPassword
                                                ? 'bi bi-eye-slash'
                                                : 'bi bi-eye'
                                                "></i></span>
                                </div>

                                <label class="text-danger small" v-if="authStore.vueValidation.password.$error">
                                    {{ authStore.vueValidation.password.$errors[0].$message }}
                                </label>
                                <label class="text-danger small" v-if="isCheckPss">
                                    អុីមែល ឬ លេខទូរសព្ទ​ ឬ លេខសម្ងាត់មិនត្រឹមត្រូវ សូមព្យាយាមម្តងទៀត
                                </label>
                                <label class="text-danger small" v-if="isCheckRole">
                                    សូមអភ័យទោសអ្នកមិនមានសិទ្ធក្នុងការចូលប្រើប្រាស់
                                </label>
                                <label class="text-danger small" v-if="isCheckVendor">
                                    សូមអភ័យទោសអ្នកមិនទាន់មានគណនីជាអ្នកគ្រប់គ្រងហាងទេ
                                </label>
                                <label class="text-danger small" v-if="isCheckActive">
                                    គណនីរបស់អ្នកត្រូវបានបិទ។ សូមទាក់ទងក្រុមគាំទ្ររបស់យើងដើម្បីជំនួយបន្ថែម។
                                </label>
                            </div>
                            
                            <div class="d-flex justify-content-end">
                                <router-link to="/forget-password"
                                class="custom-link">ភ្លេចពាក្យសម្ងាត់មែនទេ?</router-link>
                            </div>

                            <div class="col-12">
                                <button type="submit" class="btn btn-primary w-100 rounded-4" :disabled="isLoading">
                                    <span v-if="!isLoading">ចូលប្រើប្រាស់</span>
                                    <span v-if="isLoading">កំពុងចូល...</span>
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
import image from "@/assets/img/login.png";
import { useRouter } from "vue-router";
import { required, integer, helpers, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/views/auth/auth";
import axios from "axios";

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(false);
let isCheckPss = ref("");
let isCheckRole = ref("");
let isCheckVendor = ref("");
let isCheckActive = ref("");

let ruleValidation = computed(() => ({
    email_or_phone: {
        required: helpers.withMessage("សូមបញ្ចូលអុីមែល ឬលេខទូរស័ព្ទ", required),
    },
    password: {
        required: helpers.withMessage("សូមបញ្ចូលលេខសម្ងាត់", required),

    },
}));

authStore.vueValidation = useVuelidate(ruleValidation, authStore.data);

const onClickEye = () => {
    authStore.checkTypePassword.showPassword =
        !authStore.checkTypePassword.showPassword;
    password.type = authStore.checkTypePassword.showPassword
        ? "text"
        : "password";
};

let onClickLogin = async () => {

    authStore.vueValidation.$validate();
    if (authStore.vueValidation.$error) {
        return;
    }

    let frmData = new FormData();
    frmData.append("email_or_phone", authStore.data.email_or_phone);
    frmData.append("password", authStore.data.password);
    isLoading.value = true;
    try {

        const res = await axios.post(`/api/login`, frmData, {
            headers: {
                Accept: "application/json",
            },
        });
        if (res.data.result === false && res.data.message.includes("Vendor information is missing. Please complete vendor profile before logging in.")) {
            isCheckVendor.value = true;
            isCheckPss.value = false
            return;
        }

        if (res.data.result === false && res.data.message.includes("Your account is inactive. Please contact support.")) {
            isCheckActive.value = true;
            isCheckPss.value = false
            return;
        }
        
        if (res.data.result === false) {
            isCheckPss.value = true
            return
        }
        if (res.data.data.role.id === 4 || res.data.data.role.id === 3) {
            isCheckRole.value = true
            isCheckPss.value = false
            return
        }

        if (res.data.result) {
            authStore.data.email_or_phone = "";
            authStore.data.password = "";
            authStore.login(
                {
                    profile: {
                        id: res.data.data.id,
                        first_name: res.data.data.profile.first_name,
                        last_name: res.data.data.profile.last_name,
                        email: res.data.data.email,
                        phone: res.data.data.profile.phone,
                        gender_id: res.data.data.profile.gender_id,
                        photo: res.data.data.profile.photo,
                        teletegram_id: res.data.data.teletegram_id,
                    },
                    role: {
                        id: res.data.data.role.id,
                        name: res.data.data.role.name,
                    },
                },
                res.data.data.token
            );
        }
    } catch (error) {
        console.error(error.response.data.message);
    } finally {
        isLoading.value = false;
    }
};
</script>
