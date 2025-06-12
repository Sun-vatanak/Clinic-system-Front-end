<template>
  <div class="bg-white p-4 rounded-4">
    <div class="row">
      <div class="col-12">
        <h5 class="text-dark-emphasis">របាយការណ៍នៃការកម្មង់</h5>
      </div>
      <div class="col-12">
        <div>
          <BarChart :chart-data="state.bar" :options="chartOptions" :height="300" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import { useHomeStore } from "@/stores/views/home_store";
import { useAuthStore } from "@/stores/views/auth/auth";

const authStore = useAuthStore();
const homeStore = useHomeStore();

Chart.register(...registerables);

const state = reactive({
  bar: {
    labels: [
      'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
      'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
    ],
    datasets: [
      {
        label: 'ការកម្មង់',
        data: [],
        backgroundColor: '#5995ff',
        barThickness: 28
      }
    ]
  }
});

const loadChartData = async () => {
  if (authStore.user?.role?.id === 2) {
    await homeStore.fetchOrderChart();
    state.bar.datasets[0].data = Object.values(homeStore.orderChart);
  } else if (authStore.user?.role?.id === 1) {
    await homeStore.fetchOrderAdminChart();
    state.bar.datasets[0].data = Object.values(homeStore.orderAminChart);
  }
};

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: {
          family: 'Kantumruy Pro'
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: 'Kantumruy Pro'
        }
      }
    },
    y: {
      ticks: {
        font: {
          family: 'Kantumruy Pro'
        }
      }
    }
  }
}));

onMounted(loadChartData);
</script>
