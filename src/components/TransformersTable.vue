<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '../services/transformersService'
import VoltageChart from './VoltageChart.vue'

const data = ref([])
const selectedAsset = ref(null)
const voltageReadings = ref([])
const timestamps = ref([])

const selectAsset = (asset) => {
  selectedAsset.value = asset
  voltageReadings.value = asset.lastTenVoltgageReadings.map(reading => reading.voltage)
  timestamps.value = asset.lastTenVoltgageReadings.map(reading => reading.timestamp)
}

onMounted(async () => {
  try {
    data.value = await fetchData()
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})

</script>

<template>
  <div v-if="data.length">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Region</th>
          <th>Health</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asset in data" :key="asset.id" @click="selectAsset(asset)">
          <td>{{ asset.name }}</td>
          <td>{{ asset.region }}</td>
          <td>{{ asset.health }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="selectedAsset">
      <VoltageChart :voltageReadings="voltageReadings" :timestamps="timestamps" />
    </div>
  </div>
</template>

<style scoped>
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