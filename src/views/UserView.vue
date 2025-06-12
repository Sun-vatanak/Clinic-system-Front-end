<template>
    <div class="rounded-4 mb-3">
        <div class="container-fluid">
            <UserHeader />
            <UserList />
        </div>
    </div>
    <ModalAdd />
    <ModalCrop />
    <ModalDelete />
    <ModalView />
    <UserErr />
</template>

<script setup>
import UserHeader from '@/components/views/user/UserHeader.vue';
import UserList from '@/components/views/user/UserList.vue';
import ModalCrop from '@/components/views/user/ModalCrop.vue';
import ModalAdd from '@/components/views/user/modalAdd.vue';
import ModalDelete from '@/components/views/user/modalDelete.vue';
import ModalView from '@/components/views/user/modalView.vue';
import UserErr from '@/components/views/user/UserErr.vue';
</script>