<template>
    <div class="d-flex align-items-center justify-content-center  vh-100">
        <section class="container">
            <div class="row p-3 px-1 mx-auto  bg-white rounded rounded-4 w-auth-form">

                <div class="col-12 col-md-6">
                    <div class="card border-0 h-100">
                        <div class="card-body d-flex flex-column justify-content-center gap-4">
                            <div class="d-flex flex-column gap-4">
                                <h1 class="fs-3 fw-bold mb-0">ប្ដូរលេខសម្ងាត់</h1>
                                <p class="mb-0 text-form">
                                    ពាក្យសម្ងាត់ពីមុនរបស់អ្នកត្រូវបានកំណត់ឡើងវិញ។
                                    សូមកំណត់ពាក្យសម្ងាត់ថ្មីសម្រាប់គណនីរបស់អ្នក។
                                </p>
                            </div>

                            <form class="row g-3" @submit.prevent="onClickNewPassword">
                                <div class="col-12">
                                    <div class="input-field position-relative">
                                        <input
                                            :type="forgetPasswordStore.checkTypePassword.showPassword ? 'text' : 'password'"
                                            id="password" class="form-control" placeholder=""
                                            :class="{ 'border-danger': forgetPasswordStore.vueValidation.password.$error || isCheckPss }"
                                            v-model="forgetPasswordStore.data.password" autocomplete="off" />
                                        <label for="password" class="form-label">ពាក្យសម្ងាត់</label>
                                        <span class="eye-class"><i @click="onClickEye"
                                                :class="forgetPasswordStore.checkTypePassword.showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i></span>
                                    </div>
                                    <label class="text-danger small"
                                        v-if="forgetPasswordStore.vueValidation.password.$error">
                                        {{ forgetPasswordStore.vueValidation.password.$errors[0].$message }}
                                    </label>
                                </div>
                                <div class="col-12">
                                    <div class="input-field position-relative">
                                        <input
                                            :type="forgetPasswordStore.checkTypePassword.showConfirmPassword ? 'text' : 'password'"
                                            id="confirmPassword" class="form-control" placeholder=""
                                            :class="{ 'border-danger': forgetPasswordStore.vueValidation.confirmPassword.$error || isCheckPss }"
                                            v-model="forgetPasswordStore.data.confirmPassword" autocomplete="off" />
                                        <label for="confirmPassword" class="form-label">ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់</label>
                                        <span class="eye-class"><i @click="onClickEyeConfirm"
                                                :class="forgetPasswordStore.checkTypePassword.showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i></span>
                                    </div>
                                    <label class="text-danger small"
                                        v-if="forgetPasswordStore.vueValidation.confirmPassword.$error">
                                        {{ forgetPasswordStore.vueValidation.confirmPassword.$errors[0].$message }}
                                    </label>

                                    <label class="text-danger small mt-2" v-if="isCheckPss"
                                        :class="{ 'd-none': forgetPasswordStore.vueValidation.confirmPassword.$error }">
                                        OTP ផុតកំណត់ ឬ មិនត្រឹមត្រូវ
                                    </label>
                                </div>

                                <div class="col-12 d-flex flex-column gap-3">
                                    <button type="submit" class="btn btn-primary w-100 rounded-5" :disabled="isLoading">
                                        <span v-if="!isLoading">ប្ដូរពាក្យសម្ងាត់</span>
                                        <span v-if="isLoading">កំពុងប្ដូរពាក្យសម្ងាត់</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="d-none d-md-block col-6">
                    <div class="card border-0  h-100 bg-secondary rounded-4">
                        <img :src="image" alt="" class="image">
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script setup>
import image from '@/assets/img/new_password.png';
import { useRouter } from 'vue-router';
import { required, email, integer, helpers, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';
import { useForgetPasswordStore } from "@/stores/views/auth/forgetPassword";
import axios from 'axios';
const router = useRouter();
const forgetPasswordStore = useForgetPasswordStore();


const isLoading = ref(false);
let isCheckPss = ref("");

const confirmPasswordMatch = helpers.withMessage(
    'ពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់មិនដូចគ្នា!',
    (value) => value === forgetPasswordStore.data.password
);

let ruleValidation = computed(() => ({

    password: {
        required: helpers.withMessage('សូមបញ្ចូលលេខសម្ងាត់', required),
        minLength: helpers.withMessage('លេខសម្ងាត់ត្រូវមានយ៉ាងតិច 8 តួ', minLength(8)),

    },
    confirmPassword: {
        required: helpers.withMessage('ការផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់មិនត្រឹមត្រូវ', required),
        confirmPasswordMatch
    }

}));

forgetPasswordStore.vueValidation = useVuelidate(ruleValidation, forgetPasswordStore.data);

const onClickEye = () => {
    forgetPasswordStore.checkTypePassword.showPassword = !forgetPasswordStore.checkTypePassword.showPassword;
    password.type = forgetPasswordStore.checkTypePassword.showPassword ? "text" : "password";
};

const onClickEyeConfirm = () => {
    forgetPasswordStore.checkTypePassword.showConfirmPassword = !forgetPasswordStore.checkTypePassword.showConfirmPassword;
    confirmPassword.type = forgetPasswordStore.checkTypePassword.showConfirmPassword ? "text" : "password";
};

const onClickNewPassword = async () => {
    await forgetPasswordStore.vueValidation.password.$validate();
    if (forgetPasswordStore.vueValidation.password.$error) return;
    await forgetPasswordStore.vueValidation.confirmPassword.$validate();
    if (forgetPasswordStore.vueValidation.confirmPassword.$error) return;

    let frmData = new FormData();
    frmData.append("otp", forgetPasswordStore.data.Otp);
    frmData.append("email", forgetPasswordStore.data.email);
    frmData.append("new_password", forgetPasswordStore.data.password);
    frmData.append("new_password_confirmation", forgetPasswordStore.data.confirmPassword);
    isLoading.value = true;
    try {
        const res = await axios.post(`/api/reset/password`, frmData, {
            headers: {
                Accept: "application/json",
            },
        });
        if (res.data.result) {
            forgetPasswordStore.onClear();
            router.push("/login");
        } else {
            isCheckPss.value = true
        }
    } catch (error) {
        console.log(error);

    } finally {
        isLoading.value = false;
    }

}

</script>