<template>
    <section class="section-header">
      <h5 class="fs-3 fw-bolder mb-1 text-dark">Yoeng Yu</h5>
      <p>{{ formattedDate }}</p>
    </section>
    <section class="section-summary mt-3">
      <div class="row gy-3 gx-3">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="bg-white rounded-3 p-3 h-100">
            <div class="d-flex justify-content-between">
              <h5 class="mb-3 fw-bold">Revenue</h5>
              <p class="d-flex align-items-center">
                <i class="bi bi-arrow-down-short fs-5 d-block text-danger"></i>
                <span class="text-danger d-block">10%</span>
              </p>
            </div>
            <div class="d-flex gap-3">
              <div class="summary-icon bg-revenue">
                <i class="bi bi-graph-up-arrow d-block text-primary"></i>
              </div>
              <h5 class="fs-3 fw-bolder">$2.027</h5>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="bg-white rounded-3 p-3 h-100">
            <div class="d-flex justify-content-between">
              <h5 class="mb-3 fw-bold">Orders</h5>
              <p class="d-flex align-items-center">
                <i class="bi bi-arrow-up-short fs-5 d-block text-success"></i>
                <span class="text-success d-block">10%</span>
              </p>
            </div>
            <div class="d-flex gap-3">
              <div class="summary-icon bg-order">
                <i class="bi bi-cart-check-fill d-block text-success"></i>
              </div>
              <h5 class="fs-3 fw-bolder">300</h5>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="bg-white rounded-3 p-3 h-100">
            <div class="d-flex justify-content-between">
              <h5 class="mb-3 fw-bold pb-1">Products</h5>
            </div>
            <div class="d-flex gap-3">
              <div class="summary-icon bg-product">
                <i class="bi bi-box d-block text-info"></i>
              </div>
              <h5 class="fs-3 fw-bolder">100</h5>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="bg-white rounded-3 p-3 h-100">
            <div class="d-flex justify-content-between">
              <h5 class="mb-3 fw-bold">Customers</h5>
              <p class="d-flex align-items-center">
                <i class="bi bi-arrow-up-short fs-5 d-block text-success"></i>
                <span class="text-success d-block">10%</span>
              </p>
            </div>
            <div class="d-flex gap-3">
              <div class="summary-icon bg-customer">
                <i class="bi bi-person d-block text-warning fs-5"></i>
              </div>
              <h5 class="fs-3 fw-bolder">100</h5>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-9">
          <div class="bg-white rounded-3 p-3">
            <h5 class="fw-bold">Daily Sales</h5>
            <BarChart :chart-data="BarData" :options="BarOptions" :styles="chartStyle" />
          </div>
        </div>
        <div class="col-12 col-lg-3">
          <div class="bg-white rounded-3 p-3 h-100">
            <h5 class="fw-bold">Sell By Category</h5>
            <div class="d-flex flex-column justify-content-center h-100">
              <DoughnutChart :chart-data="DoughnutData" :options="DoughnutOptions" :styles="chartStyle" />
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-9">
          <div class="bg-white rounded-3 p-3">
            <div class="d-flex justify-content-between">
              <h5 class="fw-bold">Recent Orders</h5>
              <router-link to="/order" class="text-decoration-none d-flex align-items-center">
                <span class="d-block">View All</span>
                <i class="bi bi-arrow-right d-block ps-2"></i>
              </router-link>
            </div>
            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">#123</th>
                    <td>28 June, 2025</td>
                    <td>$200</td>
                    <td>
                      <span class="badge bg-success rounded-5 p-2">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">#123</th>
                    <td>28 June, 2025</td>
                    <td>$200</td>
                    <td>
                      <span class="badge bg-success rounded-5 p-2">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">#123</th>
                    <td>28 June, 2025</td>
                    <td>$200</td>
                    <td>
                      <span class="badge bg-success rounded-5 p-2">Completed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3">
          <div class="bg-white rounded-3 p-3">
            <div class="d-flex justify-content-between">
              <h5 class="fw-bold">Out Of Stock</h5>
              <router-link to="/inventory" class="text-decoration-none d-flex align-items-center">
                <span class="d-block">View All</span>
                <i class="bi bi-arrow-right d-block ps-2"></i>
              </router-link>
            </div>
            <div>
              <table class="table">
                <tbody>
                  <tr>
                    <td class="border-0">
                      <div class="d-flex align-items-center gap-3">
                        <div class="out-stock-img">
                          <img src="/public/products/programming/java.jpg" alt="java.jpg">
                        </div>
                        <div>
                          <h6 class="m-0">Web Development</h6>
                          <p class="text-dark-emphasis m-0">Available <span class="text-warning">10</span></p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-0">
                      <div class="d-flex align-items-center gap-3">
                        <div class="out-stock-img">
                          <img src="/public/products/programming/java.jpg" alt="java.jpg">
                        </div>
                        <div>
                          <h6 class="m-0">Web Development</h6>
                          <p class="text-dark-emphasis m-0">Available <span class="text-warning">10</span></p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-0">
                      <div class="d-flex align-items-center gap-3">
                        <div class="out-stock-img">
                          <img src="/public/products/programming/java.jpg" alt="java.jpg">
                        </div>
                        <div>
                          <h6 class="m-0">Web Development</h6>
                          <p class="text-dark-emphasis m-0">Available <span class="text-warning">10</span></p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from "vue";
  import { BarChart, DoughnutChart } from 'vue-chart-3';
  import { Chart, registerables } from 'chart.js';
  import router from "@/router";
  Chart.register(...registerables);
  
  
  const getFormattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const formattedDate = ref(getFormattedDate());
  
  const chartStyle = computed(() => {
    return {
      maxWidth: '100%',
      height: '300px'
    }
  })
  
  const BarData = reactive({
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: 'Daily Sales ($)',
        data: [150, 200, 180, 220, 300, 400, 350],
        backgroundColor: [
          '#bccee4',
          '#546ee5',
          '#91a7f2',
          '#7689d4',
          '#546ee5',
          '#415bb0',
          '#2f46a2',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  });
  
  const DoughnutData = reactive({
    labels: [
      'B1',
      'B2',
      'B3',
    ],
    datasets: [
      {
        label: 'Daily Sales ($)',
        data: [150, 200, 180],
        backgroundColor: [
          '#bccee4',
          '#546ee5',
          '#91a7f2',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  });
  
  
  const BarOptions = reactive({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  });
  
  const DoughnutOptions = reactive({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          color: '#333',
          padding: 15,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      doughnutCenter: {
        display: true,
        text: 'Total Sales',
        color: '#0000000',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    cutout: '80%',
  });
  
  </script>
  