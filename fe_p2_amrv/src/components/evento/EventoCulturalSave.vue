<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputNumber, InputText, Select } from 'primevue'
import { ESTADOS_EVENTO, type EventoCultural } from '@/models/eventoCultural'
import type { Recinto } from '@/models/recinto'

const ENDPOINT = 'eventos-culturales'
const props = defineProps({
  mostrar: Boolean,
  evento: {
    type: Object as () => EventoCultural,
    default: () => ({}) as EventoCultural,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])
const evento = ref<EventoCultural>({ ...props.evento })
const recintos = ref<Recinto[]>([])
const estados = ESTADOS_EVENTO

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

async function obtenerRecintos() {
  recintos.value = await http.get('recintos').then((res) => res.data)
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerRecintos()
      if (props.evento?.id) {
        evento.value = {
          ...props.evento,
          idRecinto: props.evento.recinto?.id ?? props.evento.idRecinto,
          fechaEvento: props.evento.fechaEvento.substring(0, 10),
        }
      } else {
        evento.value = { estado: 'Programado' } as EventoCultural
      }
    }
  },
)

async function handleSave() {
  try {
    const body = {
      idRecinto: evento.value.idRecinto,
      titulo: evento.value.titulo,
      artistaPrincipal: evento.value.artistaPrincipal,
      duracionMinutos: evento.value.duracionMinutos,
      precioEntrada: evento.value.precioEntrada,
      fechaEvento: evento.value.fechaEvento,
      estado: evento.value.estado,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${evento.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    evento.value = {} as EventoCultural
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    :header="props.modoEdicion ? 'Editar evento cultural' : 'Nuevo evento cultural'"
    :style="{ width: '36rem' }"
    :breakpoints="{ '640px': '94vw' }"
    modal
  >
    <div class="campo">
      <label for="titulo">Título</label>
      <InputText id="titulo" v-model="evento.titulo" maxlength="150" autocomplete="off" autofocus />
    </div>
    <div class="campo">
      <label for="artistaPrincipal">Artista principal</label>
      <InputText
        id="artistaPrincipal"
        v-model="evento.artistaPrincipal"
        maxlength="100"
        autocomplete="off"
      />
    </div>
    <div class="campo">
      <label for="recinto">Recinto</label>
      <Select
        id="recinto"
        v-model="evento.idRecinto"
        :options="recintos"
        optionLabel="nombre"
        optionValue="id"
        placeholder="Seleccione un recinto"
        filter
      >
        <template #option="{ option }"> {{ option.nombre }} - {{ option.ciudad }} </template>
      </Select>
    </div>
    <div>
      <div class="campo">
        <label for="fechaEvento">Fecha del evento</label>
        <InputText id="fechaEvento" v-model="evento.fechaEvento" type="date" />
      </div>
      <div class="campo">
        <label for="estado">Estado</label>
        <Select id="estado" v-model="evento.estado" :options="estados" placeholder="Seleccione" />
      </div>
    </div>
    <div>
      <div class="campo">
        <label for="duracionMinutos">Duración (minutos)</label>
        <InputNumber
          inputId="duracionMinutos"
          v-model="evento.duracionMinutos"
          :min="1"
          :useGrouping="false"
        />
      </div>
      <div class="campo">
        <label for="precioEntrada">Precio de entrada</label>
        <InputNumber
          inputId="precioEntrada"
          v-model="evento.precioEntrada"
          mode="decimal"
          :min="0"
          :minFractionDigits="2"
          :maxFractionDigits="2"
        />
      </div>
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
