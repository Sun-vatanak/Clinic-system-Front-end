<template>
    <div class="d-flex align-items-center justify-content-center vh-100">
        <section class="container">
            <div class="row p-3 px-1 mx-auto bg-white rounded rounded-4 w-auth-form">
                <div class="col-12 col-md-6">
                    <div class="card border-0">
                        <div class="card-body d-flex flex-column gap-4">
                            <div class="d-flex flex-column gap-4">
                                <h1 class="fs-3 fw-bold mb-0">ផ្ទៀងផ្ទាត់លេខកូដ</h1>
                                <p class="mb-0 text-form">
                                    លេខកូដផ្ទៀងផ្ទាត់ត្រូវបានផ្ញើទៅអ៊ីមែលរបស់អ្នក។
                                </p>
                            </div>

                            <form action="" class="row g-3" @submit.prevent="onClickVerify">
                                <div class="col-12">
                                    <label for="otpVerify" class="form-label">បញ្ចូលលេខកូដ</label>
                                    <div class="g-2 row">
                                        <div class="otp-control col-2" v-for="(value, index) in forgetPasswordStore.otp"
                                            :key="index">
                                            <input :disabled="isLoading" @input="Clear()" type="text"
                                                class="form-control otpVerify"
                                                :class="{ 'border-danger': forgetPasswordStore.msgError.msgOtp || isCheckPss }"
                                                maxlength="1" v-model="forgetPasswordStore.otp[index]"
                                                @keydown="handleKeyNavigation($event, index)" />
                                        </div>
                                    </div>

                                    <label v-show="forgetPasswordStore.msgError.msgOtp" class="text-danger small">
                                        {{ forgetPasswordStore.msgError.msgOtp }}
                                    </label>

                                    <label class="text-danger small" v-if="isCheckPss"
                                        :class="{ 'd-none': forgetPasswordStore.msgError.msgOtp }">
                                        សូមបញ្ចូលលេខកូដ OTP ដែលត្រឹមត្រូវ
                                    </label>

                                </div>

                                <div class="col-12 d-flex flex-column gap-3">
                                    <button type="submit" :disabled="isLoading" class="btn btn-primary w-100 rounded-5">
                                        <span v-if="!isLoading">បញ្ជាក់</span>
                                        <span v-if="isLoading">កំពុងបញ្ជាក់</span>
                                    </button>
                                    <button type="button" :disabled="isLoading"
                                        class="btn btn-secondary w-100 rounded-5" @click="onGoBack">ត្រឡប់ក្រោយ</button>
                                </div>

                                <div class="col-12">
                                    <p class="mb-0 text-form">
                                        មិនបានទទួលលេខកូដទេ? <RouterLink to="/forget-password" class="custom-link"
                                            :class="{ 'disabled-class': isLoading }"> ផ្ញើឡើងវិញ</RouterLink>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="d-none d-md-block col-6">
                    <div class="card border-0 h-100 bg-secondary rounded-4">
                        <img :src="image" alt="" class="image" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import image from "@/assets/img/otp.png";
import { useRouter } from "vue-router";
import { required, email, integer, helpers, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';
import { useForgetPasswordStore } from "@/stores/views/auth/forgetPassword";
import axios from "axios";


const isLoading = ref(false);
let isCheckPss = ref("");
const router = useRouter();
const forgetPasswordStore = useForgetPasswordStore();


const Clear = () => {
    isCheckPss.value = false;
    forgetPasswordStore.msgError.msgOtp = "";
}

let ruleValidation = computed(() => ({
    otp: {
        required: helpers.withMessage('សូមបញ្ចូលលេខកូដOTP', required),
    },
}));

forgetPasswordStore.vueValidation = useVuelidate(ruleValidation, forgetPasswordStore.otp);


const onClickVerify = async () => {
    const otpCode = Array.isArray(forgetPasswordStore.otp)
        ? forgetPasswordStore.otp.join("").trim()
        : forgetPasswordStore.otp.trim();
    if (otpCode.length === 6) {
        forgetPasswordStore.msgError.msgOtp = "";
        let frmData = new FormData();
        frmData.append("otp", otpCode);
        frmData.append("email", forgetPasswordStore.data.email);
        isLoading.value = true;
        try {
            const res = await axios.post(`/api/verify/otp`, frmData, {
                headers: {
                    Accept: "application/json",
                },
            });
            if (res.data.result) {
                forgetPasswordStore.setOtp(otpCode);
                router.push("/new-password");
            } else {
                isCheckPss.value = true
            }
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
        }
    } else {
        forgetPasswordStore.msgError.msgOtp = "សូមបំពេញលេខកូដទាំងអស់។";
    }
};

const onGoBack = () => {
    router.back();
};

const handleKeyNavigation = (event, index) => {
    const key = event.key;
    const inputs = document.querySelectorAll(".otpVerify");
    if (/^[a-zA-Z0-9]$/.test(key)) {
        if (index < forgetPasswordStore.otp.length - 1) {
            setTimeout(() => {
                inputs[index + 1].focus();
            }, 50);
        }
    } else if (key === "Backspace") {
        forgetPasswordStore.otp[index] = "";
        if (index > 0) {
            setTimeout(() => {
                inputs[index - 1].focus();
            }, 50);
        }
    } else if (key === "ArrowRight" && index < forgetPasswordStore.otp.length - 1) {
        inputs[index + 1].focus();
    } else if (key === "ArrowLeft" && index > 0) {
        inputs[index - 1].focus();
    } else {
        event.preventDefault();
    }
};

</script>
