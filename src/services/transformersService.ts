import type { Asset } from '@/types/asset'

const transformersURL = import.meta.env.VITE_TRANSFORMERS_URL

export const fetchData = async (): Promise<Asset[]> => {
  try {
    const response = await fetch(transformersURL)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data: Asset[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}