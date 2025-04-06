<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHistoryStore } from '../stores/historyStore'
import { VuePlotly } from 'vue3-plotly'
import type { LeagueStandings } from '@/types/history'

const historyStore = useHistoryStore()
const selectedMetric = ref('points') // Default metric
const showChips = ref(false) // Toggle for showing or hiding chips

const leagueStandings = computed(() => historyStore.leagueStandings as LeagueStandings)
const userHistories = computed(() => historyStore.userHistories)

const plotData = computed(() => {
  return leagueStandings.value.flatMap((user) => {
    const history = userHistories.value[user.entry]?.current || []
    const chips = userHistories.value[user.entry]?.chips || []

    // Map history data for the selected metric
    const xValues = history.map((data) => data.event)
    const yValues = history.map((data) => data[selectedMetric.value])

    // Main trace for the manager's history
    const historyTrace = {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines+markers',
      name: user.entry_name,
      marker: { size: 8 },
    }

    // Chip markers (only included if showChips is true)
    const chipTraces = showChips.value
      ? chips.map((chip) => ({
          x: [chip.event],
          y: [yValues[xValues.indexOf(chip.event)] || 0],
          type: 'scatter',
          mode: 'markers+text',
          text: [chip.name === '3xc' ? 'Triple Captain' : chip.name],
          textposition: 'top center',
          marker: { size: 12, color: 'red' },
          name: `${chip.name} (Event ${chip.event})`,
        }))
      : []

    return [historyTrace, ...chipTraces]
  })
})

const chartLayout = computed(() => ({
  title: 'Game Week Data with Chips',
  xaxis: { title: 'Game Week' },
  yaxis: { title: 'Metric Value' },
}))
</script>

<template>
  <div>
    <h2>Game Week Chart</h2>
    <label for="metric">Select Metric:</label>
    <select id="metric" v-model="selectedMetric">
      <option value="points">Points</option>
      <option value="total_points">Total Points</option>
      <option value="bank">Bank</option>
      <option value="value">Value</option>
      <option value="event_transfers">Transfers</option>
      <option value="event_transfers_cost">Transfer Cost</option>
      <option value="points_on_bench">Points on Bench</option>
    </select>
    <div>
      <label>
        <input type="checkbox" v-model="showChips" />
        Show Chips
      </label>
    </div>
    <VuePlotly :data="plotData" :layout="chartLayout" />
  </div>
</template>

<style scoped>
label {
  font-weight: bold;
  margin-right: 10px;
}
select {
  margin-bottom: 20px;
}
</style>