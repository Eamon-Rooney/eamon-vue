<template>
  <div>
    <VuePlotly :data="plotlyData" :layout="plotlyLayout" />
  </div>
</template>
  
<script>
import { VuePlotly } from 'vue3-plotly'

export default {
  components: {
    VuePlotly
  },
  props: {
    voltageReadings: {
      type: Array,
      required: true
    }
  },
  computed: {
    plotlyData() {
      return this.voltageReadings.map(reading => ({
        x: reading.lastTenVoltgageReadings.map(r => r.timestamp),
        y: reading.lastTenVoltgageReadings.map(r => r.voltage),
        type: 'scatter',
        mode: 'lines+markers',
        name: `${reading.name} (${reading.assetId})`
      }))
    },
    plotlyLayout() {
      return {
        title: 'Voltage Readings',
        xaxis: {
          title: 'Timestamp'
        },
        yaxis: {
          title: 'Voltage'
        },
        showlegend: true, // Ensure legend is shown
        legend: {
          itemclick: false, // Disable legend item click
          itemdoubleclick: false // Disable legend item double click
        }
      }
    }
  }
}
</script>

<style scoped>
/* Add any necessary styles */
</style>