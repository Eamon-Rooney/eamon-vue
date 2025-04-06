<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHistoryStore } from '../stores/historyStore'
import { VuePlotly } from 'vue3-plotly'
import type { LeagueStandings } from '@/types/history'

const historyStore = useHistoryStore()
const selectedMetric = ref('points') // Default metric

// Bind to the store's leagueStandings and userHistories
const leagueStandings = computed(() => historyStore.leagueStandings as LeagueStandings)
const userHistories = computed(() => historyStore.userHistories)

const chartData = computed(() => {
  return leagueStandings.value.map((user) => ({
    x: userHistories.value[user.entry]?.map((data: { event: any }) => data.event) || [],
    y: userHistories.value[user.entry]?.map((data: { [key: string]: any }) => data[selectedMetric.value]) || [],
    type: 'scatter',
    mode: 'lines+markers',
    name: user.entry_name,
  }))
})

const chartLayout = {
  title: 'Game Week Data',
  xaxis: { title: 'Game Week' },
  yaxis: { title: 'Metric Value' },
}
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
    <VuePlotly :data="chartData" :layout="chartLayout" />
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