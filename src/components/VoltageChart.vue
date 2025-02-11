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
    },
    timestamps: {
      type: Array,
      required: true
    }
  },
  computed: {
    plotlyData() {
      return [{
        x: this.timestamps,
        y: this.voltageReadings,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' }
      }]
    },
    plotlyLayout() {
      return {
        title: 'Last 10 Voltage Readings',
        xaxis: { title: 'Timestamp' },
        yaxis: { title: 'Voltage' }
      }
    }
  }
}
</script>

<style scoped>
/* Add any necessary styles */
</style>