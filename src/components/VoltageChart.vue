<template>
  <div>
    <VuePlotly :data="plotlyData" :layout="plotlyLayout" />
  </div>
</template>
  
<script setup lang="ts">
import { VuePlotly } from 'vue3-plotly'
import type { VoltageReading } from '@/types/asset'
import { computed, defineProps } from 'vue'
import { useAssetsStore } from '../stores/asset' 

const assetsStore = useAssetsStore()

const plotlyData = computed(() => {
  console.log('Voltage Readings in VoltageChart:', assetsStore.assets) // Debugging line
  return assetsStore.assets
    .filter(asset => asset !== undefined)
    .map(asset => ({
      x: asset.lastTenVoltageReadings.map(reading => reading.timestamp),
      y: asset.lastTenVoltageReadings.map(reading => reading.voltage),
      type: 'scatter',
      mode: 'lines+markers',
      name: asset.name
    }))
})

const plotlyLayout = computed(() => {
  return {
    title: 'Voltage Readings',
    xaxis: {
      title: 'Timestamp'
    },
    yaxis: {
      title: 'Voltage'
    },
    showlegend: true, // Ensure legend is shown
    // legend: {
    //   itemclick: false, // Disable legend item click
    //   itemdoubleclick: false // Disable legend item double click
    // }
  }
})
</script>

<style scoped>
/* Add any necessary styles */
</style>