<script setup>
import { AlertTriangle, CheckCircle2, ChevronDown, RotateCcw, Wrench } from '@lucide/vue'

defineProps({
  route: { type: Object, required: true },
  statuses: { type: Object, required: true },
  selectedSegmentId: { type: String, required: true },
  routeStatus: { type: String, required: true },
})

const emit = defineEmits(['update:selectedSegmentId', 'set-status'])
</script>

<template>
  <section class="maintenance-card">
    <div class="section-title-row">
      <div class="section-icon section-icon--amber"><Wrench :size="17" /></div>
      <div><h3>Route condition</h3><p>Keep this path up to date</p></div>
      <span v-if="routeStatus === 'maintenance'" class="small-alert"><AlertTriangle :size="14" /> Closed</span>
    </div>

    <label class="field-label" for="segment">Route section</label>
    <div class="select-wrap select-wrap--compact">
      <select
        id="segment"
        :value="selectedSegmentId"
        @change="emit('update:selectedSegmentId', $event.target.value)"
      >
        <option v-for="segment in route.segments" :key="segment.properties.id" :value="segment.properties.id">
          {{ segment.properties.name }}
        </option>
      </select>
      <ChevronDown class="select-search" :size="16" aria-hidden="true" />
    </div>

    <div class="condition-actions">
      <button
        class="condition-button condition-button--maintenance"
        :disabled="statuses[selectedSegmentId] === 'maintenance' || statuses[selectedSegmentId] === 'closed'"
        type="button"
        @click="emit('set-status', selectedSegmentId, 'maintenance')"
      >
        <Wrench :size="15" /> Report maintenance
      </button>
      <button
        class="condition-button condition-button--resolved"
        :disabled="statuses[selectedSegmentId] !== 'maintenance'"
        type="button"
        @click="emit('set-status', selectedSegmentId, 'open')"
      >
        <RotateCcw :size="15" /> Mark resolved
      </button>
    </div>
    <p class="condition-note">
      <CheckCircle2 v-if="statuses[selectedSegmentId] === 'open'" :size="14" />
      <AlertTriangle v-else :size="14" />
      {{ statuses[selectedSegmentId] === 'open' ? 'This section is currently open.' : statuses[selectedSegmentId] === 'closed' ? 'This section has no step-free access.' : 'This section is closed for maintenance.' }}
    </p>
  </section>
</template>
