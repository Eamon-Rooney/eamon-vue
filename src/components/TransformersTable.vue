<script setup lang="ts">
import { onMounted } from 'vue'
import { useAssetsStore } from '../stores/asset'
import VoltageChart from './VoltageChart.vue'

const assetsStore = useAssetsStore()

onMounted(() => {
  assetsStore.loadAssets()
})
</script>

<template>
  <div class="container" v-if="assetsStore.assets.length">
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Health</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asset in assetsStore.assets" :key="asset.assetId">
            <td>{{ asset.name }}</td>
            <td>{{ asset.region }}</td>
            <td>{{ asset.health }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="chart-container">
      <VoltageChart />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.table-container {
  width: 100%;
}

.chart-container {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>