<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useAssetsStore } from '../stores/asset'
import { useFilteredAssetsStore } from '../stores/filteredAssets'
import VoltageChart from './VoltageChart.vue'

const assetsStore = useAssetsStore()
const filteredAssetsStore = useFilteredAssetsStore()
const searchQuery = ref('')
const selectedRegion = ref('')
const selectedHealth = ref('')

onMounted(() => {
  assetsStore.loadAssets()
  filteredAssetsStore.setAssets(assetsStore.assets)
})

const resetStores = () => {
  filteredAssetsStore.setAssets(assetsStore.assets)
  searchQuery.value = ''
  selectedRegion.value = ''
  selectedHealth.value = ''
}

const filterAssets = () => {
  filteredAssetsStore.setAssets(
    assetsStore.assets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesRegion = selectedRegion.value ? asset.region === selectedRegion.value : true
      const matchesHealth = selectedHealth.value ? asset.health === selectedHealth.value : true
      return matchesSearch && matchesRegion && matchesHealth
    })
  )
}

watch([searchQuery, selectedRegion, selectedHealth], filterAssets)

const regions = computed(() => [...new Set(assetsStore.assets.map(asset => asset.region))])
const healthStatuses = computed(() => [...new Set(assetsStore.assets.map(asset => asset.health))])
</script>

<template>
  <div class="container" v-if="assetsStore.assets.length">
    <div class="controls">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a transformer..."
        class="search-bar"
      />
      <select v-model="selectedRegion">
        <option value="">All Regions</option>
        <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
      </select>
      <select v-model="selectedHealth">
        <option value="">All Health Statuses</option>
        <option v-for="health in healthStatuses" :key="health" :value="health">{{ health }}</option>
      </select>
      <button @click="resetStores">Reset</button>
    </div>
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
          <tr v-for="asset in filteredAssetsStore.assets" :key="asset.assetId">
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

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-bar {
  padding: 0.5rem;
  font-size: 1rem;
  flex-grow: 1;
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