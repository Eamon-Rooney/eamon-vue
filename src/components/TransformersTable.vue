<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchData } from '../services/transformersService'
import VoltageChart from './VoltageChart.vue'

const data = ref([])
const selectedAssets = ref([])
const voltageReadings = ref([])

onMounted(async () => {
  try {
    data.value = await fetchData()
    updateVoltageData()
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})

watch(selectedAssets, updateVoltageData)

function updateVoltageData() {
  const selectedData = data.value.filter(asset => selectedAssets.value.includes(asset.assetId))
  voltageReadings.value = selectedData.map(asset => ({
    assetId: asset.assetId,
    name: asset.name,
    lastTenVoltgageReadings: asset.lastTenVoltgageReadings
  }))
}

function selectAsset(assetId: number) {
  if (selectedAssets.value.includes(assetId)) {
    selectedAssets.value = selectedAssets.value.filter(id => id !== assetId)
  } else {
    selectedAssets.value.push(assetId)
  }
  updateVoltageData()
}

</script>

<template>
  <div v-if="data.length">
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Region</th>
          <th>Health</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asset in data" :key="asset.assetId">
          <td><input type="checkbox" :checked="selectedAssets.includes(asset.assetId)" @change="() => selectAsset(asset.assetId)" /></td>
          <td>{{ asset.name }}</td>
          <td>{{ asset.region }}</td>
          <td>{{ asset.health }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="selectedAssets.length">
      <VoltageChart :voltageReadings="voltageReadings" />
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