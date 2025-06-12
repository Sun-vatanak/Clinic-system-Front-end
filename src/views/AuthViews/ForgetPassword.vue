<template>
    <div class="d-flex align-items-center justify-content-center vh-100">
        <section class="container">
            <div class="row p-3 px-1 mx-auto bg-white rounded rounded-4 w-auth-form">
                <div class="col-12 col-md-6">
                    <div class="card border-0  h-100">
                        <div class="card-body d-flex flex-column justify-content-center gap-4">
                            <div class="d-flex flex-column gap-4">
                                <h1 class="fs-3 fw-bold mb-0">ភ្លេចពាក្យសម្ងាត់</h1>
                                <p class="mb-0 text-form">
                                    បំពេញលេខទូរសព្ទរបស់អ្នកដើម្បីទទួលបានតំណភ្ជាប់ប្ដូរលេខសម្ងាត់
                                    (អ៊ីម៉ែលដែលភ្ជាប់ជាមួយគណនីរបស់អ្នក)
                                </p>
                            </div>

                            <form action="" class="row g-3" @submit.prevent="onClickForgetPassword">
                                <div class="col-12">
                                    <div class="input-field">
                                        <input type="text" @input="Clear()" id="email" autocomplete="off"
                                            class="form-control"
                                            :class="{ 'is-invalid': forgetPasswordStore.vueValidation.email.$error }"
                                            placeholder="" v-model="forgetPasswordStore.data.email" />
                                        <label for="email" class="form-label">អុីមែល</label>
                                    </div>
                                    <label class="text-danger small"
                                        v-if="forgetPasswordStore.vueValidation.email.$error">
                                        {{ forgetPasswordStore.vueValidation.email.$errors[0].$message }}
                                    </label>
                                    <label class="text-danger small" v-if="isCheckPss"
                                        :class="{ 'd-none': forgetPasswordStore.vueValidation.email.$error }">
                                        មិនអាចស្វែងរកអុីមែលរបស់អ្នក
                                    </label>
                                </div>

                                <div class="col-12 d-flex flex-column gap-3">
                                    <button type="submit" class="btn btn-primary w-100 rounded-5" :disabled="isLoading">
                                        <span v-if="!isLoading">ផ្ញើតំណភ្ជាប់ប្ដូរលេខសម្ងាត់</span>
                                        <span v-if="isLoading">កំពុងផ្ញើតំណភ្ជាប់</span>
                                    </button>
                                </div>
                                <div class="col-12 d-flex flex-column gap-3">
                                    <button type="button" :disabled="isLoading"
                                        class="btn btn-secondary w-100 rounded-5" @click="goBack">ត្រឡប់ក្រោយ</button>
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
import image from "@/assets/img/forget.png";
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { required, email, integer, helpers, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useForgetPasswordStore } from "@/stores/views/auth/forgetPassword";
import axios from "axios";

const isLoading = ref(false);
let isCheckPss = ref("");
const router = useRouter();
const forgetPasswordStore = useForgetPasswordStore();


const Clear = () => {
    isCheckPss.value = false;
}

const isPhoneOrEmail = helpers.withMessage(
    'សូមបញ្ចូលអុីមែល',
    (value) => {
        return forgetPasswordStore.regex.emailRegex.test(value) || forgetPasswordStore.regex.phoneRegex.test(value);
    }
);

let ruleValidation = computed(() => ({

    email: {
        required: helpers.withMessage('សូមបញ្ចូលអុីមែល', required),
        isPhoneOrEmail
    },

}));

forgetPasswordStore.vueValidation = useVuelidate(ruleValidation, forgetPasswordStore.data);

const onClickForgetPassword = async () => {
    forgetPasswordStore.vueValidation.$validate();
    if (forgetPasswordStore.vueValidation.$error) {
        return
    }

    let frmData = new FormData();
    frmData.append("email", forgetPasswordStore.data.email);
    isLoading.value = true;
    try {
        const res = await axios.post(`/api/forgot/password`, frmData, {
            headers: {
                Accept: "application/json",
            },
        });

        if (res.data.result) {
            forgetPasswordStore.setEmail(forgetPasswordStore.data.email);
            router.push("/otp");
        } else {
            isCheckPss.value = true
        }
    } catch (error) {

    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    // alert(forgetPasswordStore.data.email)
});

const goBack = () => {
    router.back();
};
</script>
