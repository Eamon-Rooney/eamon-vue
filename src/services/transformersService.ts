const transformersURL = 'https://mp1bd39e1e8b61c35a5e.free.beeceptor.com/transformersList'

export const fetchData = async () => {
  try {
    const response = await fetch(transformersURL)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}