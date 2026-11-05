<script setup lang="ts">
import EventoCulturalList from '@/components/evento/EventoCulturalList.vue'
import EventoCulturalSave from '@/components/evento/EventoCulturalSave.vue'
import type { EventoCultural } from '@/models/eventoCultural'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const eventoListRef = ref<typeof EventoCulturalList | null>(null)
const eventoEdit = ref<EventoCultural | null>(null)

function handleCreate() {
  eventoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(evento: EventoCultural) {
  eventoEdit.value = evento
  mostrarDialog.value = true
}

function handleSave() {
  eventoListRef.value?.obtenerLista()
}

function handleCloseDialog() {
  mostrarDialog.value = false
}
</script>

<template>
  <div>
    <h2>Eventos culturales</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <EventoCulturalList ref="eventoListRef" @edit="handleEdit" />
    <EventoCulturalSave
      :mostrar="mostrarDialog"
      :evento="eventoEdit ?? undefined"
      :modoEdicion="!!eventoEdit"
      @guardar="handleSave"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
