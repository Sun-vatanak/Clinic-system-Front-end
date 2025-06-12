<template>
    <div class="row gy-3">
        <div v-if="!driverStore.total_records == 0" class="col-12 ps-3 col-md-6 d-flex justify-content-center justify-content-md-start mb-3">
            <span>បង្ហាញ {{ (driverStore.currentPage - 1) * driverStore.perPage + 1 }} ដល់
                {{ Math.min(driverStore.currentPage * driverStore.perPage, driverStore.total_records) }}
                នៃ
                {{ driverStore.total_records }} ទិន្នន័យ</span>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
            <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-3">
                <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="driverStore.changePage(currentPage - 1)">
                            &laquo;
                        </a>
                    </li>

                    <li v-if="visiblePages[0] > 1" class="page-item">
                        <a class="page-link" href="#" @click.prevent="driverStore.changePage(1)">1</a>
                    </li>

                    <li v-if="visiblePages[0] > 2" class="page-item disabled">
                        <span class="page-link">...</span>
                    </li>

                    <li v-for="page in visiblePages" :key="page" class="page-item"
                        :class="{ active: currentPage === page }">
                        <a class="page-link" href="#" @click.prevent="driverStore.changePage(page)">{{ page }}</a>
                    </li>

                    <li v-if="visiblePages[visiblePages.length - 1] < totalPages" class="page-item disabled">
                        <span class="page-link">...</span>
                    </li>

                    <li v-if="visiblePages[visiblePages.length - 1] < totalPages" class="page-item">
                        <a class="page-link" href="#" @click.prevent="driverStore.changePage(totalPages)">{{
                            totalPages }}</a>
                    </li>

                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="driverStore.changePage(currentPage + 1)">
                            &raquo;
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { usederiverStore } from "@/stores/views/driver_store";


const driverStore = usederiverStore ();
const { currentPage, totalPages } = storeToRefs(driverStore);
console.log(driverStore.total_records );

const visiblePages = computed(() => {
    const maxVisiblePages = 5;
    const pages = [];
    let start = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages.value, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});
</script>
