<script setup lang="ts">
import { ref, onMounted, computed, watch, watchEffect } from 'vue'
import { useAssetsStore } from '../stores/asset'
import { useFilteredAssetsStore } from '../stores/filteredAssets'
import { useSearchFilterStore } from '../stores/searchFilterStore'
import VoltageChart from './VoltageChart.vue'
import SearchInput from './SearchInput.vue'
import SelectDropdown from './SelectDropdown.vue'
import ActionButton from './ActionButton.vue'
import { fetchData } from '../services/transformersService'

const assetsStore = useAssetsStore()
const filteredAssetsStore = useFilteredAssetsStore()
const searchFilterStore = useSearchFilterStore()

onMounted(() => {
  if (filteredAssetsStore.assets.length === 0) {
    assetsStore.loadAssets().then(() => {
      filteredAssetsStore.setAssets(assetsStore.assets)
      filterAssets()
    })
  } else {
    filteredAssetsStore.setAssets(filteredAssetsStore.assets)
    filterAssets()
  }
})

const resetStores = async () => {
  try {
    const freshData = await fetchData()
    assetsStore.assets = freshData
    filteredAssetsStore.setAssets(assetsStore.assets)
    searchFilterStore.setSearchQuery('')
    searchFilterStore.setSelectedRegion('')
    searchFilterStore.setSelectedHealth('')
    searchFilterStore.traceVisibility = assetsStore.assets.map(() => true) // Reset traceVisibility to true for all assets
  } catch (error) {
    console.error('Failed to fetch fresh data:', error)
  }
}

const filterAssets = () => {
  filteredAssetsStore.setAssets(
    assetsStore.assets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchFilterStore.searchQuery.toLowerCase())
      const matchesRegion = searchFilterStore.selectedRegion ? asset.region === searchFilterStore.selectedRegion : true
      const matchesHealth = searchFilterStore.selectedHealth ? asset.health === searchFilterStore.selectedHealth : true
      return matchesSearch && matchesRegion && matchesHealth
    })
  )
}

watch([() => searchFilterStore.searchQuery, () => searchFilterStore.selectedRegion, () => searchFilterStore.selectedHealth], filterAssets)

watchEffect(() => {
  filteredAssetsStore.setAssets(assetsStore.assets)
  filterAssets()
})

const regions = computed(() => [...new Set(assetsStore.assets.map(asset => asset.region))])
const healthStatuses = computed(() => [...new Set(assetsStore.assets.map(asset => asset.health))])
</script>

<template>
  <div class="container" v-if="assetsStore.assets.length">
    <div class="controls">
      <SearchInput
        v-model="searchFilterStore.searchQuery"
        placeholder="Search for a transformer name..."
        inputClass="search-bar"
      />
      <SelectDropdown
        v-model="searchFilterStore.selectedRegion"
        :options="regions.map(region => ({ value: region, text: region }))"
        :defaultOption="{ value: '', text: 'All Regions' }"
        selectClass="select-dropdown"
      />
      <SelectDropdown
        v-model="searchFilterStore.selectedHealth"
        :options="healthStatuses.map(health => ({ value: health, text: health }))"
        :defaultOption="{ value: '', text: 'All Health Statuses' }"
        selectClass="select-dropdown"
      />
      <ActionButton
        buttonText="Refresh Data"
        buttonClass="refresh-button"
        :onClick="resetStores"
      />
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

.search-bar,
.select-dropdown,
.refresh-button {
  padding: 0.5rem;
  font-size: 1rem;
  flex-grow: 1;
  text-align: center; /* Center the text */
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

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar,
  .select-dropdown,
  .refresh-button {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .refresh-button {
    margin-bottom: 0;
  }
}
</style>