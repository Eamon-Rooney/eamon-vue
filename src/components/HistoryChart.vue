<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHistoryStore } from '../stores/historyStore'
import { VuePlotly } from 'vue3-plotly'
import type { LeagueStandings } from '@/types/history'

const historyStore = useHistoryStore()
const selectedMetric = ref('points') // Default metric

const leagueStandings = computed(() => historyStore.leagueStandings as LeagueStandings)
const userHistories = computed(() => historyStore.userHistories)

const plotData = computed(() => {
  return leagueStandings.value.map((user) => {
    const history = userHistories.value[user.entry]?.current || []
    const chips = userHistories.value[user.entry]?.chips || []

    // Map history data for the selected metric
    const xValues = history.map((data) => data.event)
    const yValues = history.map((data) => data[selectedMetric.value])

    // Add chip annotations to the same plot
    const chipAnnotations = chips.map((chip) => {
      const chipEventIndex = xValues.indexOf(chip.event)
      return {
        x: chip.event,
        y: chipEventIndex !== -1 ? yValues[chipEventIndex] : null,
        text: chip.name === '3xc' ? 'Triple Captain' : chip.name,
        showarrow: true,
        arrowhead: 2,
        ax: 0,
        ay: -30,
        font: { color: 'red', size: 12 },
      }
    })

    return {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines+markers',
      name: user.entry_name,
      text: chips.map((chip) => `${chip.name} (Event ${chip.event})`), // Tooltip for chips
      marker: { size: 8 },
      annotations: chipAnnotations, // Add chip annotations
    }
  })
})

const chartLayout = computed(() => ({
  title: 'Game Week Data with Chips',
  xaxis: { title: 'Game Week' },
  yaxis: { title: 'Metric Value' },
  annotations: plotData.value.flatMap((user) => user.annotations || []), // Combine all annotations
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