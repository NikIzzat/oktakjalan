<script setup>
import { computed, ref } from 'vue'
import { Camera, Check, ImagePlus, LoaderCircle, X } from '@lucide/vue'

const props = defineProps({
  route: { type: Object, required: true },
})

const emit = defineEmits(['close', 'submit'])
const rating = ref('Average')
const reason = ref('')
const selectedSegmentId = ref(props.route.segments[0].properties.id)
const photo = ref(null)
const photoName = ref('')
const fileInput = ref(null)
const error = ref('')
const isPreparing = ref(false)
const canSubmit = computed(() => reason.value.trim().length > 0)

function choosePhoto(event) {
  const file = event.target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    error.value = 'Please choose an image file.'
    event.target.value = ''
    return
  }
  if (file.size > 8 * 1024 * 1024) {
    error.value = 'Choose an image smaller than 8 MB.'
    event.target.value = ''
    return
  }
  error.value = ''
  photoName.value = file.name
  photo.value = file
}

async function submitReport() {
  if (isPreparing.value) return
  if (!canSubmit.value) {
    error.value = 'Add a short note about this route before submitting.'
    return
  }

  isPreparing.value = true
  error.value = ''
  try {
    let photoData = ''
    if (photo.value) {
      const bitmap = await createImageBitmap(photo.value)
      const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(bitmap.width * scale)
      canvas.height = Math.round(bitmap.height * scale)
      const context = canvas.getContext('2d')
      if (!context) throw new Error('Could not prepare the selected photo.')
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
      bitmap.close()
      photoData = canvas.toDataURL('image/jpeg', 0.72)
    }

    emit('submit', {
      id: crypto.randomUUID(),
      routeId: props.route.id,
      routeName: props.route.destination,
      segmentId: selectedSegmentId.value,
      segmentName: props.route.segments.find((segment) => segment.properties.id === selectedSegmentId.value)?.properties.name,
      rating: rating.value,
      reason: reason.value.trim(),
      photoName: photoName.value,
      photoData,
      createdAt: new Date().toISOString(),
      location: props.route.segments
        .find((segment) => segment.properties.id === selectedSegmentId.value)
        ?.geometry.coordinates[0],
    })
  } catch (failure) {
    console.error('Could not prepare the selected report photo.', failure)
    error.value = 'This image could not be prepared. Try another photo.'
  } finally {
    isPreparing.value = false
  }
}
</script>

<template>
  <div class="dialog-backdrop" @click.self="emit('close')" @keydown.esc="emit('close')">
    <section class="report-dialog" role="dialog" aria-modal="true" aria-labelledby="report-title">
      <div class="dialog-heading">
        <div class="dialog-icon"><Camera :size="19" /></div>
        <button class="icon-button" type="button" aria-label="Close report form" @click="emit('close')"><X :size="19" /></button>
        <p class="eyebrow">CAMPUS COMMUNITY</p>
        <h2 id="report-title">Share a route update</h2>
        <p class="dialog-subtitle">Your report helps everyone move with confidence.</p>
      </div>

      <form class="report-form" @submit.prevent="submitReport">
        <div class="form-route">
          <span class="form-route-label">REPORTING ON</span>
          <strong>{{ route.destination }}</strong>
        </div>

        <label class="field-label" for="report-segment">Which section?</label>
        <div class="select-wrap select-wrap--compact">
          <select id="report-segment" v-model="selectedSegmentId">
            <option v-for="segment in route.segments" :key="segment.properties.id" :value="segment.properties.id">
              {{ segment.properties.name }}
            </option>
          </select>
        </div>

        <fieldset class="rating-field">
          <legend class="field-label">How was this route?</legend>
          <div class="rating-options">
            <button v-for="option in ['Bad', 'Average', 'Good']" :key="option" type="button" :class="{ selected: rating === option }" @click="rating = option">
              <span>{{ option === 'Bad' ? '😕' : option === 'Average' ? '😐' : '😊' }}</span>{{ option }}
            </button>
          </div>
        </fieldset>

        <label class="field-label" for="report-reason">What should others know?</label>
        <textarea id="report-reason" v-model="reason" rows="3" maxlength="280" placeholder="e.g. The ramp is clear, but the paving is uneven near the entrance." required></textarea>

        <input ref="fileInput" class="sr-only" type="file" accept="image/*" @change="choosePhoto" />
        <button class="upload-area" type="button" @click="fileInput?.click()">
          <span class="upload-icon"><ImagePlus :size="19" /></span>
          <span><strong>{{ photoName || 'Add a photo' }}</strong><small>{{ photoName ? 'Photo attached' : 'Optional · JPG, PNG up to 8 MB' }}</small></span>
          <Check v-if="photoName" class="upload-check" :size="17" />
          <span v-else class="upload-action">Browse</span>
        </button>
        <p v-if="error" class="form-error" role="alert">{{ error }}</p>

        <div class="form-actions">
          <button class="button button--quiet" type="button" @click="emit('close')">Cancel</button>
          <button class="button button--primary" type="submit" :disabled="!canSubmit || isPreparing">
            <LoaderCircle v-if="isPreparing" class="spinning" :size="15" />
            <template v-else>Submit report <Check :size="16" /></template>
          </button>
        </div>
      </form>
    </section>
  </div>
</template>
