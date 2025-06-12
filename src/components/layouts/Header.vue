<template>
  <header class="bg-white rounded-4">
    <div class="d-flex header-admin justify-content-between align-items-center p-3">
      <div class="d-flex align-items-start gap-4 d-lg-flex align-items-center">
        <button class="btn d-block d-xl-none p-0" type="button" data-bs-toggle="offcanvas"
          data-bs-target="#sidebarBackdrop" aria-controls="sidebarBackdrop">
          <i class="bi bi-list fs-1 small"></i>
        </button>
        <div class="lh-base d-none d-sm-block">
          <h5 class="fw-bold text-dark-emphasis mb-0">ផ្ទាំងគ្រប់គ្រង</h5>
          <p class="fs-14 mt-1 mb-0">{{ khmerDate  }}</p>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="dropdown pt-2">
          <button type="button"
            class=" position-relative border-0 p-0 me-4 bg-transparent icon-box-header"
            data-bs-toggle="dropdown" aria-expanded="false">
            <div v-for="notification in notifications" :key="notification.id"
              class="position-absolute num-notification bg-danger rounded-circle small d-flex justify-content-center align-items-center text-white">
              {{ notification.id }}</div>
            <i class="text-dark bi bi-bell-fill fs-5"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end notification-box p-3">
            <h5>Notifications</h5>
            <hr />
            <li v-for="notification in notifications" :key="notification.id" class="list-group-item border-0 py-0">
              <RouterLink to="/order"
                class="list-group-item chat-list-hover d-flex py-2 justify-content-between align-items-center ps-2 mt-1 border-0 rounded-13">
                <p class="d-flex mb-0">
                  <span class="rounded-circle bg-dark-50 d-flex justify-content-center align-items-center icon-box">
                    <img src="../../assets/img/default-profile.png" width="100%" alt="Profile" />
                  </span>
                  &nbsp;
                  <span class="d-flex flex-column">
                    <span class="fw-medium fs-13">
                      {{ notification.message }}
                    </span>
                    <span class="fs-10">{{ notification.fname }} {{ notification.lname }}</span>
                  </span>
                </p>
                <p class="fs-11 m-0 me-2">{{ notification.duration }}</p>
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <div data-bs-toggle="dropdown" aria-expanded="false"
            class="d-flex pf-admin align-items-center text-decoration-none">
            <div role="button" class="profile rounded-circle  rounded profile-admin-pic   overflow-hidden"  style="height: 40px; " >
              <img :src="
                    ProfileStore.crop.avatar
                      ? `${ProfileStore.crop.avatar}`
                      : '/default.png'
                  "
              class="w-100"  alt="Admin Profile " />
            </div>
            <div class="name-pos ms-2 d-flex flex-column align-items-center justify-content-center">
              <p class="mb-0 text-dark fw-semibold h6">
              {{ ProfileStore.userinfo.first_name }} {{ ProfileStore.userinfo.last_name }}
              </p>
              <p class="text-dark fs-13 mb-0">
                {{ ProfileStore.userinfo.role_name }}
              </p>
            </div>
          </div>
          <ul class="dropdown-menu dropdown-menu-end notification-box profile-dropdown p-3">
            <p class="fw-medium">គណនីរបស់អ្នក</p>
            <hr />
            <li class="list-group-item border-0 py-0">
              <RouterLink to="/profile-views"
                class="list-group-item chat-list-hover d-flex py-2 align-items-center ps-2 mt-1 border-0 rounded">
                <i class="bi bi-gear me-2"></i> ការកំណត់ 
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useProfileStore } from "@/stores/views/store_profile";
import { RouterLink } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
const ProfileStore = useProfileStore();
const chatContact = ref([
  { id: 1, fname: 'កាន', lname: 'សុខមាន', position: 'Sale Manager', time: 'អម្បាញ់មិញ', avatar: '../../assets/img/default-profile.png' },
  { id: 2, fname: 'ព្រាប​', lname: 'សុវត្ថិ', position: 'Project Manager', time: '០៤ៈ៣០ ល្ងាច', avatar: '../../assets/img/default-profile.png' },
  { id: 3, fname: 'ធឿន', lname: 'ធារ៉ា', position: 'Developer', time: '១១ៈ២៨ ព្រឹក', avatar: '../../assets/img/default-profile.png' },
]);

const notifications = ref([
  { id: 1, fname: 'ប្លក់', lname: 'ចក់', avatar: '../../assets/img/default-profile.png', message: 'បានទទួលការកក់ និង កំពុងមក...', duration: '១នាទីមុន' },
  { id: 2, fname: 'អេ', lname: 'ភូថង', avatar: '../../assets/img/default-profile.png', message: 'បានច្រានចោល​ការកក់', duration: '2នាទីមុន' },
  { id: 3, fname: 'ហុង', lname: 'ដា', avatar: '../../assets/img/default-profile.png', message: 'ការដឺកជញ្ជូនបានដល់គោលដៅ', duration: '៣នាទីមុន' },
  { id: 4, fname: 'រ៉ា', lname: 'ស្មាច់', avatar: '../../assets/img/default-profile.png', message: 'ការដឺកជញ្ជូនបានដល់គោលដៅ', duration: '៥នាទីមុន' },
]);


const convertToKhmerNumerals = (num) => {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return num.toString().split('').map(digit => khmerDigits[digit] || digit).join('');
};

const khmerMonths = {
  'January': 'មករា',
  'February': 'កុម្ភៈ',
  'March': 'មីនា',
  'April': 'មេសា',
  'May': 'ឧសភា',
  'June': 'មិថុនា',
  'July': 'កក្កដា',
  'August': 'សីហា',
  'September': 'កញ្ញា',
  'October': 'តុលា',
  'November': 'វិច្ឆិកា',
  'December': 'ធ្នូ'
};

const khmerDate = ref('');

onMounted(() => {
  ProfileStore.onloadProfile();
  const now = new Date();
  const day = convertToKhmerNumerals(now.getDate());
  const month = khmerMonths[now.toLocaleString('en-US', { month: 'long' })];
  const year = convertToKhmerNumerals(now.getFullYear());

  khmerDate.value = `${day} ${month} ${year}`;
});
</script>