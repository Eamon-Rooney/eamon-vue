<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useHistoryStore } from '../stores/historyStore'

const historyStore = useHistoryStore()
const leagueId = 175725 // Default league ID
const leagueStandings = computed(() => historyStore.leagueStandings as Array<{ entry: number; player_name: string; entry_name: string }>)

onMounted(() => {
  historyStore.loadLeagueAndHistories(leagueId)
  console.log('League Standings in Component:', historyStore.leagueStandings) // Debugging
})
</script>

<template>
  <div>
    <h2>League Standings</h2>
    <table v-if="leagueStandings.length" class="league-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player Name</th>
          <th>Team Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in leagueStandings" :key="user.entry">
          <td>{{ index + 1 }}</td>
          <td>{{ user.player_name }}</td>
          <td>{{ user.entry_name }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No data available.</p>
  </div>
</template>

<style scoped>
.league-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

.league-table th,
.league-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.league-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.league-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.league-table tr:hover {
  background-color: #f1f1f1;
}

.league-table th,
.league-table td {
  text-align: center;
}
</style>