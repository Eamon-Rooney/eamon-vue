import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchLeagueStandings } from '../services/leagueService'
import { fetchUserHistory } from '../services/historyService'

export const useHistoryStore = defineStore('history', () => {
  const leagueStandings = ref([])
  const userHistories = ref<Record<number, any>>({}) // Store histories by entry ID

  async function loadLeagueAndHistories(leagueId: number = 175725) {
    try {
      const standings = await fetchLeagueStandings(leagueId)
      console.log('League Standings in Store:', standings) // Debugging
      leagueStandings.value = standings

      const histories: Record<number, any> = {}
      for (const user of standings) {
        histories[user.entry] = await fetchUserHistory(user.entry) // Use entry instead of id
        console.log(`History for Entry ${user.entry}:`, histories[user.entry]) // Debugging
      }
      userHistories.value = histories
    } catch (error) {
      console.error('Failed to load league and histories:', error)
    }
  }

  return { leagueStandings, userHistories, loadLeagueAndHistories }
})