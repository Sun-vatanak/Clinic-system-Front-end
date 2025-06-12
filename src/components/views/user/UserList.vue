<template>
    <div class="row bg-white section-spacing rounded-4">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-dark-emphasis" scope="col">ល.រ</th>
                        <th class="text-dark-emphasis" scope="col">ឈ្មោះ</th>
                        <th class="text-dark-emphasis" scope="col">លេខទូរស័ព្ទ</th>
                        <th class="text-dark-emphasis" scope="col">តួនាទី</th>
                        <th class="text-dark-emphasis" scope="col">ស្ថានភាព</th>
                        <th class="text-dark-emphasis" scope="col">មុខងារ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="userStore.isLoading">
                        <td colspan="6" class="border-none">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-if="userStore.data_users.length === 0 && !userStore.isLoading">
                        <td colspan="7" class="text-center py-3">
                            គ្មាននិន្នន័យ
                        </td>
                    </tr>
                    <tr v-if="!userStore.isLoading" v-for="user, i in userStore.data_users" :key="user.id" class="align-middle">
                        <td>{{ i + 1 }}</td>
                        <td>
                            <div class="d-flex align-items-center gap-2">
                                <div class="profile_user bg-light overflow-hidden">
                                    <img :src="user.profile.photo" class="card-img" alt="">
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                    <span>
                                        {{ `${user.profile.first_name} ${user.profile.last_name}` }}
                                    </span>
                                    <span class="fs-12">{{ user.email }}</span>
                                </div>
                            </div>
                        </td>
                        <td>{{ user.profile.phone }}</td>
                        <td>
                            <div class="dropdown dropstart">
                                <a role="button" class="dropdown-toggle text-dark text-decoration-none"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ user.role.id == 1 ? 'អ្នកគ្រប់គ្រង​ជាន់ខ្ពស់' : user.role.id == 2 ?
                                        'អ្នកគ្រប់គ្រងហាង' : user.role.id == 3 ? 'អ្នកដឹកជញ្ជូន' : 'អតិថិជន' }}
                                </a>
                                <ul class="dropdown-menu" :disabled="isLoading">
                                    <li :class="{ 'disabled-class' : authStore.user.profile.id == user.id}"><a role="button" class="dropdown-item" @click="onclickSetrole(user, 4)">
                                            <i class="bi bi-person text-primary"></i>
                                            អតិថិជន
                                        </a></li>
                                    <li :class="{ 'disabled-class' : authStore.user.profile.id == user.id}"><a role="button" class="dropdown-item" @click="onclickSetrole(user, 3)">
                                            <i class="bi bi-person text-primary"></i>
                                            អ្នកដឹកជញ្ជូន
                                        </a></li>
                                    <li :class="{ 'disabled-class' : authStore.user.profile.id == user.id}"><a role="button" class="dropdown-item" @click="onclickSetrole(user, 2)">
                                            <i class="bi bi-person text-primary"></i>
                                            អ្នកគ្រប់គ្រងហាង
                                        </a></li>
                                    <li :class="{ 'disabled-class' : authStore.user.profile.id == user.id}"><a role="button" class="dropdown-item" @click="onclickSetrole(user, 1)">
                                            <i class="bi bi-person text-primary"></i>
                                            អ្នកគ្រប់គ្រង​ជាន់ខ្ពស់
                                        </a></li>
                                </ul>
                            </div>
                        </td>
                        <td class="fs-4" :class="user.status ? 'text-primary' : 'text-primary'">
                            <i class="bi-toggle-off status-user" role="button" :class="{ 'bi-toggle-on': user.is_active }, { 'disabled-class' : authStore.user.profile.id == user.id}"
                                @click="onclickStatus(user)">
                            </i>
                        </td>
                        <td>
                            <div class="d-flex gap-3">
                                <a role="button" class="btn-action btn-views" @click="onclickViewsUser(user)" title="មើលលម្អិត">
                                    <i class="bi bi-eye"></i>
                                </a>
                                <a role="button" class="btn-update btn-action" @click="onclickEditUser(user)" title="កែប្រែ">
                                    <i class="bi bi-pencil-square"></i>
                                </a>
                                <a role="button" class="btn-delete btn-action" :class="{ 'disabled-class' : authStore.user.profile.id == user.id}" @click="onclickDeleteUser(user)" title="លុប">
                                    <i class="bi bi-trash"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="!userStore.isLoading">
            <Pagination />
        </div>
    </div>
</template>

<script setup>
import Pagination from "@/components/views/user/Pagination.vue";
import { useUserStore } from '@/stores/views/user_store';
import { onMounted, ref } from "vue";
import axios from 'axios';
import Loading from "../reusable/loading.vue";
import { useAuthStore } from "@/stores/views/auth/auth";

const authStore = useAuthStore();
const userStore = useUserStore();
const isLoading = ref(false);
onMounted(() => {
    userStore.onloadUser();
});

const onclickEditUser = (userObj) => {
    userStore.selectedId = userObj.id;
    userStore.frm.first_name = userObj.profile.first_name;
    userStore.frm.last_name = userObj.profile.last_name;
    userStore.frm.email = userObj.email;
    userStore.frm.phone = userObj.profile.phone;
    userStore.frm.pass = '';
    userStore.frm.con_pass = '';
    userStore.frm.address = userObj.profile.address;
    userStore.frm.gender = userObj.profile.gender_id;
    // userStore.frm.gender == 1 ? "male" : "female";
    userStore.crop.img = ''
    userStore.crop.avatar = userObj.profile.photo ? userObj.profile.photo : '/default.png';
    if (userStore.v_validate.$error) {
        userStore.v_validate.$reset();
    }
    userStore.mdl_add.show();
};

const onclickDeleteUser = (user) => {
    userStore.selectedId = user.id;
    userStore.frm.first_name = user.profile.first_name;
    userStore.frm.last_name = user.profile.last_name;
    userStore.mdl_delete.show();
};
const onclickViewsUser = (user) => {
    userStore.frm.id = user.id;
    userStore.frm.first_name = user.profile.first_name;
    userStore.frm.last_name = user.profile.last_name;
    userStore.frm.gender = user.profile.gender;
    userStore.frm.email = user.email;
    userStore.frm.phone = user.profile.phone;
    userStore.frm.address = user.profile.address;
    userStore.frm.gender = user.profile.gender_id;
    userStore.frm.role_id = user.role.id;
    userStore.frm.created_at = user.created_at;
    userStore.frm.updated_at = user.updated_at;
    userStore.crop.avatar = user.profile.photo ? user.profile.photo : '/default.png';
    userStore.mdl_view.show();
}

const onclickSetrole = async (user, role_id) => {
    let frmData = new FormData();
    frmData.append('role_id', role_id);
    isLoading.value = true;
    try {
        await axios.post(`/api/users/role/${user.id}`, frmData);
        userStore.onloadUser();
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}

const onclickStatus = async (user) => {
    user.is_active = !user.is_active;
    isLoading.value = true;

    try {
        if (user.is_active) {
            await axios.put(`/api/users/enable/${user.id}`);
        } else {
            await axios.put(`/api/users/disable/${user.id}`);
        }
    } catch (error) {
        console.error(error);
        user.is_active = !user.is_active;
    } finally {
        isLoading.value = false;
    }
};

</script>