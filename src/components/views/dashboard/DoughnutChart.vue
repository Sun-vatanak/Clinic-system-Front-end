<template>
    <div class="rounded-4 p-4 h-100 bg-white">
        <div class="row gy-4">
            <div class="col-12 lh-1">
                <h5 class="text-dark-emphasis">អ្នកចុះឈ្មោះប្រចាំថ្ងៃ</h5>
            </div>
            <div class="col-12 position-relative">
                <DoughnutChart :chart-data="chartData" :options="chartOptions" :height="230" :width="230" />
                <div class="chart-text lh-1">
                    <h5>{{ totalUsers }} នាក់</h5>
                    <span>{{ currentDate }}</span>
                </div>
            </div>
            <div class="col-12">
                <div class="d-flex align-items-center flex-wrap justify-content-center gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <div class="male rounded-circle"></div>
                        <span class="fs-14">ភេទប្រុស {{ maleCount }} នាក់</span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <div class="female rounded-circle"></div>
                        <span class="fs-14">ភេទស្រី {{ femaleCount }} នាក់</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DoughnutChart } from 'vue-chart-3'
import { computed, onMounted, ref } from 'vue';
import { useHomeStore } from "@/stores/views/home_store";

const homeStore = useHomeStore();

const totalUsers = ref(0);
const maleCount = ref(0);
const femaleCount = ref(0);
const currentDate = ref(new Date().toLocaleDateString('km-KH'));  

const chartData = computed(() => {
    const { male, female } = homeStore.customerChart;
    maleCount.value = male;
    femaleCount.value = female;
    totalUsers.value = male + female;
    return {
        labels: ['ប្រុស', 'ស្រី'],
        datasets: [{
            data: [male, female],
            backgroundColor: ['#2F6BFF', '#03B8FA']
        }]
    };
});

const chartOptions = computed(() => ({
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            padding: 15
        }
    }
}));

onMounted(async () => {
    await homeStore.fetchCustomerChart();
});
</script>

<style scoped>
.chart-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
</style>
