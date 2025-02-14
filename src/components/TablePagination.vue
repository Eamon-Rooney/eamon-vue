<template>
  <div class="pagination" v-if="totalPages > 0">
    <ActionButton
      buttonText="Previous"
      :buttonClass="{'disabled': currentPage === 1}"
      :onClick="prevPage"
    />
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <label class="items-per-page">
      Items per page:
      <input type="text" v-model.number="itemsPerPage" @change="updateItemsPerPage" :max="props.totalItems" min="1" />
    </label>
    <ActionButton
      buttonText="Next"
      :buttonClass="{'disabled': currentPage === totalPages}"
      :onClick="nextPage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits } from 'vue'
import { useSearchFilterStore } from '../stores/searchFilterStore'
import ActionButton from './ActionButton.vue'

const props = defineProps({
  totalItems: Number,
  initialItemsPerPage: Number,
})

const emits = defineEmits(['update:currentPage', 'update:itemsPerPage'])

const searchFilterStore = useSearchFilterStore()

const currentPage = ref(searchFilterStore.currentPage || 1)
const itemsPerPage = ref(searchFilterStore.itemsPerPage || props.initialItemsPerPage || 3)

const totalPages = computed(() => Math.ceil(props.totalItems / itemsPerPage.value))

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    emits('update:currentPage', currentPage.value)
    searchFilterStore.currentPage = currentPage.value
    localStorage.setItem('searchFilter', JSON.stringify(searchFilterStore.$state))
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    emits('update:currentPage', currentPage.value)
    searchFilterStore.currentPage = currentPage.value
    localStorage.setItem('searchFilter', JSON.stringify(searchFilterStore.$state))
  }
}

const updateItemsPerPage = () => {
  emits('update:itemsPerPage', itemsPerPage.value)
  currentPage.value = 1
  emits('update:currentPage', currentPage.value)
  searchFilterStore.itemsPerPage = itemsPerPage.value
  searchFilterStore.currentPage = currentPage.value
  localStorage.setItem('searchFilter', JSON.stringify(searchFilterStore.$state))
}

watch(() => props.totalItems, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
    emits('update:currentPage', currentPage.value)
    searchFilterStore.currentPage = currentPage.value
    localStorage.setItem('searchFilter', JSON.stringify(searchFilterStore.$state))
  }
})

// Watch for changes in the searchFilterStore and update local state
watch(
  () => [searchFilterStore.itemsPerPage, searchFilterStore.currentPage],
  ([newItemsPerPage, newCurrentPage]) => {
    itemsPerPage.value = newItemsPerPage
    currentPage.value = newCurrentPage
  }
)
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f2f2f2;
  cursor: pointer;
  flex-grow: 1;
  text-align: center;
}

.pagination button.disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.pagination span {
  flex-grow: 1;
  text-align: center;
  margin: 0.5rem 0;
}

.items-per-page {
  flex-grow: 1;
  text-align: center;
  margin: 0.5rem 0;
}

.pagination input {
  width: 50px;
  text-align: center;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

@media (max-width: 600px) {
  .pagination {
    flex-direction: column;
    align-items: stretch;
  }

  .pagination button,
  .pagination span,
  .items-per-page {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .items-per-page {
    margin-bottom: 1rem;
  }
}
</style>