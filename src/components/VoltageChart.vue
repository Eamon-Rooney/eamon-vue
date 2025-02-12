<template>
  <div v-if="plotlyData.length > 0" class="chart-container">
    <div class="plotly-chart">
      <VuePlotly :data="plotlyData" :layout="plotlyLayout" ref="plotlyChart" />
    </div>
    <div class="custom-legend">
      <div v-for="(trace, index) in plotlyData" :key="index">
        <input type="checkbox" :id="'trace-' + index" :checked="traceVisibility[index]" @change="toggleTrace(index)">
        <label :for="'trace-' + index" :style="{ backgroundColor: trace.marker.color }">{{ trace.name }}</label>
      </div>
    </div>
  </div>
  <div v-else class="no-data-message">
    <p>No data found for this query. Try again</p>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Plotly from 'plotly.js-dist'
import { VuePlotly } from 'vue3-plotly'
import { useFilteredAssetsStore } from '../stores/filteredAssets' 

const filteredAssetsStore = useFilteredAssetsStore()
const plotlyChart = ref<InstanceType<typeof VuePlotly> | null>(null)
const traceVisibility = ref<boolean[]>([])

const plotlyData = computed(() => {
  console.log('Voltage Readings in VoltageChart:', filteredAssetsStore.assets) // Debugging line
  const data = filteredAssetsStore.assets
    .filter(asset => asset !== undefined)
    .map(asset => ({
      x: asset.lastTenVoltageReadings.map(reading => reading.timestamp),
      y: asset.lastTenVoltageReadings.map(reading => reading.voltage),
      type: 'scatter',
      mode: 'lines+markers',
      name: asset.name,
      marker: { color: getRandomColor() }, // Assign a random color to each trace
      visible: true // Ensure traces are visible by default
    }))
  
  // Initialize traceVisibility array
  traceVisibility.value = data.map(() => true)
  return data
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
    traceVisibility.value[index] = !traceVisibility.value[index]
  }
}

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// Watch for changes in filteredAssetsStore.assets to reset checkboxes
watch(filteredAssetsStore.assets, () => {
  if (plotlyChart.value) {
    plotlyChart.value.data.forEach((trace, index) => {
      trace.visible = true // Reset visibility to true
      traceVisibility.value[index] = true
    })
    Plotly.redraw(plotlyChart.value.$el)
  }
})
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plotly-chart {
  width: 100%; /* Ensure the chart takes full width */
}

.custom-legend {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-legend div {
  display: flex;
  align-items: center;
  width: 100%;
}

.custom-legend input {
  margin-right: 5px;
}

.custom-legend label {
  padding: 2px 5px;
  border-radius: 3px;
  color: white;
  display: inline-block;
  width: 100%;
}

.no-data-message {
  text-align: center;
  color: red;
  font-weight: bold;
}

@media (min-width: 1024px) {
  .chart-container {
    flex-direction: row;
    justify-content: center;
  }

  .chart-container > .plotly-chart {
    flex: 4;
  }

  .chart-container > .custom-legend {
    flex: 1;
    margin-top: 0;
    margin-left: 20px;
  }
}
</style>