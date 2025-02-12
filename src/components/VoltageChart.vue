<template>
  <div>
    <VuePlotly :data="plotlyData" :layout="plotlyLayout" ref="plotlyChart" />
    <div class="custom-legend">
      <div v-for="(trace, index) in plotlyData" :key="index">
        <input type="checkbox" :id="'trace-' + index" :checked="trace.visible !== 'legendonly'" @change="toggleTrace(index)">
        <label :for="'trace-' + index">{{ trace.name }}</label>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'
import Plotly from 'plotly.js-dist'
import { VuePlotly } from 'vue3-plotly'
import { useAssetsStore } from '../stores/asset' 

const assetsStore = useAssetsStore()
const plotlyChart = ref<InstanceType<typeof VuePlotly> | null>(null)

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
    showlegend: false // Hide default legend
  }
})

const toggleTrace = (index: number) => {
  if (plotlyChart.value) {
    const currentVisibility = plotlyChart.value.data[index].visible
    const update = {
      visible: currentVisibility === true || currentVisibility === undefined ? 'legendonly' : true
    }
    Plotly.restyle(plotlyChart.value.$el, update, [index])
  }
}
</script>

<style scoped>
.custom-legend {
  margin-top: 10px;
}
.custom-legend div {
  display: flex;
  align-items: center;
}
.custom-legend input {
  margin-right: 5px;
}
</style>