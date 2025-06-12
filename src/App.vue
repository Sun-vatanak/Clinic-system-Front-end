<template>
  <div class="container-fluid bg-light">
    <div class="row gx-4" :class="{'section-spacing':routes.meta.showNavbar == true}">
      <div class="col-12 col-lg-2" v-if="routes.meta.showNavbar == true" >
        <Navbar v-if="routes.meta.showHeader == true" />
      </div>
      <div :class="{'col-12 col-xl-10':routes.meta.showNavbar == true}" >
        <div v-if="routes.meta.showNavbar == true || routes.meta.showHeader == true">
          <Header/>
        </div>
        <RouterView />
      </div>
    </div>
    <Login/>
  </div>
</template>
<script setup>
import Navbar from '@/components/layouts/Navbar.vue'
import Header from '@/components/layouts/Header.vue'
import { useRoute, RouterView } from "vue-router";
const routes = useRoute()
</script>
