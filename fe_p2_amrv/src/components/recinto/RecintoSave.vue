<script setup lang="ts">
import type { Recinto } from '@/models/recinto'
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputNumber, InputText } from 'primevue'

const ENDPOINT = 'recintos'
const props = defineProps({
  mostrar: Boolean,
  recinto: {
    type: Object as () => Recinto,
    default: () => ({}) as Recinto,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])
const recinto = ref<Recinto>({ ...props.recinto })

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      recinto.value = props.recinto?.id ? { ...props.recinto } : ({ aforoMaximo: null } as Recinto)
    }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: recinto.value.nombre,
      ciudad: recinto.value.ciudad,
      aforoMaximo: recinto.value.aforoMaximo ?? null,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${recinto.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    recinto.value = {} as Recinto
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    :header="props.modoEdicion ? 'Editar recinto' : 'Nuevo recinto'"
    :style="{ width: '28rem' }"
    :breakpoints="{ '640px': '94vw' }"
    modal
  >
    <div class="campo">
      <label for="nombre">Nombre</label>
      <InputText
        id="nombre"
        v-model="recinto.nombre"
        maxlength="100"
        placeholder="Ej. Teatro Gran Mariscal"
        autocomplete="off"
        autofocus
      />
    </div>
    <div class="campo">
      <label for="ciudad">Ciudad</label>
      <InputText id="ciudad" v-model="recinto.ciudad" maxlength="50" autocomplete="off" />
    </div>
    <div class="campo">
      <label for="aforoMaximo">Aforo máximo (opcional)</label>
      <InputNumber
        inputId="aforoMaximo"
        v-model="recinto.aforoMaximo"
        :min="0"
        :useGrouping="false"
      />
    </div>
    <div class="botones-dialogo">
      <Button
        type="button"
        label="Cancelar"
        icon="pi pi-times"
        severity="secondary"
        @click="dialogVisible = false"
      />
      <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
    </div>
  </Dialog>
</template>

<style scoped></style>
