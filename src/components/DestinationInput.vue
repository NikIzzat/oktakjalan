<script setup>
import { MapPin, Search } from '@lucide/vue'

defineProps({
  destinations: { type: Array, required: true },
  modelValue: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="destination-input">
    <label class="field-label" for="destination">Where would you like to go?</label>
    <div class="select-wrap">
      <MapPin :size="18" aria-hidden="true" />
      <select
        id="destination"
        :value="modelValue"
        @change="emit('update:modelValue', $event.target.value)"
      >
        <option v-for="place in destinations" :key="place.id" :value="place.id">
          {{ place.destination }}
        </option>
      </select>
      <Search class="select-search" :size="17" aria-hidden="true" />
    </div>
  </div>
</template>
