<script setup lang="ts">
import RecintoList from '@/components/recinto/RecintoList.vue'
import RecintoSave from '@/components/recinto/RecintoSave.vue'
import type { Recinto } from '@/models/recinto'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const recintoListRef = ref<typeof RecintoList | null>(null)
const recintoEdit = ref<Recinto | null>(null)

function handleCreate() {
  recintoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(recinto: Recinto) {
  recintoEdit.value = recinto
  mostrarDialog.value = true
}

function handleSave() {
  recintoListRef.value?.obtenerLista()
}

function handleCloseDialog() {
  mostrarDialog.value = false
}
</script>

<template>
  <div>
    <h2>Recintos</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <RecintoList ref="recintoListRef" @edit="handleEdit" />
    <RecintoSave
      :mostrar="mostrarDialog"
      :recinto="recintoEdit ?? undefined"
      :modoEdicion="!!recintoEdit"
      @guardar="handleSave"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
