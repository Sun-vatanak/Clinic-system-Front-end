<template>
    <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
        <div class="col-3 d-none d-md-block">
            <div class="fs-5 p-0 fw-semibold">អ្នកប្រើប្រាស់</div>
        </div>
        <div class="col-12 col-md-8 p-0">
            <div class="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between justify-content-md-end gap-2 gap-md-3">
                <div class="bg-white search-width mb-3 mb-md-0 search-bar d-flex align-items-center ps-2 rounded-5">
                    <input type="search" @input="userStore.onloadUser()" class="form-control bg-transparent border-0"
                        placeholder="ស្វែងរក" v-model="userStore.searchQuery">
                    <span class="input-group-text bg-transparent border-0">
                        <i class="bi bi-search text-dark-emphasis"></i>
                    </span>
                </div>
                <div>
                    <select class="form-select select-width sort-user px-3 fs-16 text-dark-emphasis search-bar border-0 rounded-5"
                        v-model="userStore.selectedRole" @change="userStore.onloadUser()">
                        <option value="" disabled selected>ជ្រើសរើស</option>
                        <option value="">ទាំងអស់</option>
                        <option value="4">អតិថិជន</option>
                        <option value="3">អ្នកដឹកជញ្ជូន</option>
                        <option value="2">អ្នកគ្រប់គ្រងហាង</option>
                        <option value="1">អ្នកគ្រប់គ្រង​ជាន់ខ្ពស់</option>
                    </select>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <button type="button" @click="onClickAddUser()" class="btn btn-primary p-0 btn-add">
                        <i class="bi bi-plus-lg"></i>
                    </button>
                    <button class="btn btn-primary rounded-5 px-3 d-flex align-items-center" @click="exportToCSV">
                        <i class="bi bi-download me-2"></i>CVS
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/views/user_store';
import axios from 'axios';
import { onMounted } from 'vue';
const userStore = useUserStore();

const onClickAddUser = () => {
    userStore.selectedId = 0;
    userStore.frm.first_name = ''
    userStore.frm.last_name = ''
    userStore.frm.email = ''
    userStore.frm.phone = ''
    userStore.frm.pass = ''
    userStore.frm.con_pass = ''
    userStore.frm.address = ''
    userStore.frm.gender = 1
    userStore.crop.img = ''
    userStore.crop.blob = null
    if (userStore.v_validate) {
        userStore.v_validate.$reset();
    }
    userStore.crop.avatar = '/default.png'
    userStore.mdl_add.show();
};

const exportToCSV = async () => {
    try {
        const response = await axios.get(`/api/users?all=true&role_id=${userStore.selectedRole}`);
        if (response.data.result) {
            const allData = response.data.data;
            const headers = ['ឈ្មោះ', 'អ៊ីម៉ែល', 'លេខទូរស័ព្ទ', 'ភេទ', 'Telegram_id', 'អាស័យដ្ឋាន', 'តួនាទី', 'ថ្ងៃបង្កើត', 'ថ្ងៃកែប្រែ'];

            const data = allData.map(item => [
                `"${item.profile?.first_name || 'N/A'} ${item.profile?.last_name || 'N/A'}"`,
                `"${item.email || 'N/A'}"`,
                `"${item.profile?.phone || 'N/A'}"`,
                `"${item.profile?.gender_id === 1 ? 'ប្រុស' : item.profile?.gender_id === 2 ? 'ស្រី' : 'N/A'}"`,
                `"${item.telegram_id || 'N/A'}"`,
                `"${item.profile?.address || 'N/A'}"`,
                `"${item.profile?.role_name || 'N/A'}"`,
                `"${item.created_at || 'N/A'}"`,
                `"${item.updated_at || 'N/A'}"`,
            ]);
            const BOM = "\uFEFF";
            const csvContent = BOM + [
                headers.join(','),
                ...data.map(row => row.join(','))
            ].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'users.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Failed to fetch user.");
        }
    } catch (error) {
        console.error("Error exporting user:", error);
    }
};

</script>
