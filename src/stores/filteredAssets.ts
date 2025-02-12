import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Asset } from '@/types/asset'

export const useFilteredAssetsStore = defineStore('filteredAssets', () => {
  const assets = ref<Asset[]>([])

  function setAssets(newAssets: Asset[]) {
    assets.value = newAssets
  }

  return { assets, setAssets }
})