<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import type { EventoCultural } from '@/models/eventoCultural'

const ENDPOINT = 'eventos-culturales'
const eventos = ref<EventoCultural[]>([])
const busqueda = ref<string>('')
const eventoDelete = ref<EventoCultural | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

async function obtenerLista() {
  eventos.value = await http.get(ENDPOINT).then((response) => response.data)
}

const eventosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase()
  return eventos.value.filter(
    (evento) =>
      evento.titulo.toLowerCase().includes(texto) ||
      evento.artistaPrincipal.toLowerCase().includes(texto) ||
      evento.recinto.nombre.toLowerCase().includes(texto) ||
      evento.estado.toLowerCase().includes(texto),
  )
})

function formatearFecha(fecha: string) {
  const [anio, mes, dia] = fecha.substring(0, 10).split('-')
  return `${dia}/${mes}/${anio}`
}

function emitirEdicion(evento: EventoCultural) {
  emit('edit', evento)
}

function mostrarEliminarConfirm(evento: EventoCultural) {
  eventoDelete.value = evento
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${eventoDelete.value?.id}`)
  await obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <InputGroup class="mt-3">
      <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
      <InputText
        v-model="busqueda"
        type="text"
        placeholder="Buscar por título, artista, recinto o estado"
      />
    </InputGroup>
    <div class="tabla-scroll">
      <table>
        <thead>
          <tr>
            <th>Nro.</th>
            <th>Evento</th>
            <th>Recinto</th>
            <th>Fecha</th>
            <th>Duración</th>
            <th>Precio (Bs.)</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(evento, index) in eventosFiltrados" :key="evento.id">
            <td>{{ index + 1 }}</td>
            <td>
              <strong>{{ evento.titulo }}</strong>
              <br /><small>{{ evento.artistaPrincipal }}</small>
            </td>
            <td>
              {{ evento.recinto.nombre }}
              <br /><small>{{ evento.recinto.ciudad }}</small>
            </td>
            <td>{{ formatearFecha(evento.fechaEvento) }}</td>
            <td>{{ evento.duracionMinutos }} min</td>
            <td>{{ Number(evento.precioEntrada).toFixed(2) }}</td>
            <td>{{ evento.estado }}</td>
            <td style="white-space: nowrap">
              <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(evento)" />
              <Button
                icon="pi pi-trash"
                aria-label="Eliminar"
                text
                @click="mostrarEliminarConfirm(evento)"
              />
            </td>
          </tr>
          <tr v-if="eventosFiltrados.length === 0">
            <td colspan="8">No se encontraron resultados</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="botones-dialogo">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" severity="danger" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
