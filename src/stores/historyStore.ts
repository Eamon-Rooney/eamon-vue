import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchLeagueStandings } from '../services/leagueService'
import { fetchUserHistory } from '../services/historyService'

export const useHistoryStore = defineStore('history', () => {
  const leagueStandings = ref([])
  const userHistories = ref<Record<number, { current: any[]; chips: any[] }>>({}) // Store histories and chips by entry ID

  async function loadLeagueAndHistories(leagueId: number = 124484) {
    const storedData = localStorage.getItem('history-store')
    const now = Date.now()

    if (storedData) {
      const parsedData = JSON.parse(storedData)
      const { timestamp, standings, histories } = parsedData

      // Check if the data is less than 10 minutes old
      if (now - timestamp < 10 * 60 * 1000) {
        console.log('Using cached data from local storage')
        leagueStandings.value = standings
        userHistories.value = histories
        return
      }
    }

    // If no valid cached data, fetch from API
    try {
      console.log('Fetching data from API...')
      const standings = await fetchLeagueStandings(leagueId)
      leagueStandings.value = standings

      const histories: Record<number, { current: any[]; chips: any[] }> = {}
      for (const user of standings) {
        histories[user.entry] = await fetchUserHistory(user.entry)
      }
      userHistories.value = histories

      // Save the data to local storage with a timestamp
      localStorage.setItem(
        'history-store',
        JSON.stringify({
          timestamp: now,
          standings: leagueStandings.value,
          histories: userHistories.value,
        })
      )
    } catch (error) {
      console.error('Failed to load league and histories:', error)
    }
  }

  return { leagueStandings, userHistories, loadLeagueAndHistories }
}, {
  persist: {
    key: 'history-store', // Key for local storage
    storage: localStorage, // Use local storage
  },
})