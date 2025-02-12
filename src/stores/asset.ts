import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchData } from '../services/transformersService'
import type { Asset, VoltageReading } from '@/types/asset'

export const useAssetsStore = defineStore('assets', () => {
  const assets = ref<Asset[]>([])

  async function loadAssets() {
    try {
      assets.value = await fetchData()
      console.log('Assets loaded:', assets.value) // Debugging line
    } catch (error) {
      console.error('Failed to fetch assets:', error)
    }
  }

  return { assets, loadAssets }
})