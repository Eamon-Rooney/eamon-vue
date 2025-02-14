import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchFilterStore = defineStore('searchFilter', () => {
  const searchQuery = ref('')
  const selectedRegion = ref('')
  const selectedHealth = ref('')
  const traceVisibility = ref<boolean[]>([])
  const traceColors = ref<string[]>([])
  const currentPage = ref(1)
  const itemsPerPage = ref(3)

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setSelectedRegion(region: string) {
    selectedRegion.value = region
  }

  function setSelectedHealth(health: string) {
    selectedHealth.value = health
  }

  function setTraceVisibility(visibility: boolean[]) {
    traceVisibility.value = visibility
  }

  function setTraceColors(colors: string[]) {
    traceColors.value = colors
  }

  return {
    searchQuery,
    selectedRegion,
    selectedHealth,
    traceVisibility,
    traceColors,
    currentPage,
    itemsPerPage,
    setSearchQuery,
    setSelectedRegion,
    setSelectedHealth,
    setTraceVisibility,
    setTraceColors
  }
}, {
  persist: true
})