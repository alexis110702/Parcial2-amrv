<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import type { EventoCultural } from '@/models/eventoCultural'

const eventos = ref<EventoCultural[]>([])

function formatearFecha(fecha: string) {
  const [anio, mes, dia] = fecha.substring(0, 10).split('-')
  return `${dia}/${mes}/${anio}`
}

onMounted(async () => {
  eventos.value = await http.get('eventos-culturales').then((res) => res.data)
})
</script>

<template>
  <div>
    <h2>Agenda de eventos</h2>
    <p>Listado de eventos culturales ordenados por fecha.</p>
    <ul>
      <li v-for="evento in eventos" :key="evento.id">
        {{ formatearFecha(evento.fechaEvento) }} - <strong>{{ evento.titulo }}</strong> ({{
          evento.artistaPrincipal
        }}) en {{ evento.recinto.nombre }}, {{ evento.recinto.ciudad }} - Bs.
        {{ Number(evento.precioEntrada).toFixed(2) }} - {{ evento.estado }}
      </li>
      <li v-if="eventos.length === 0">No hay eventos registrados</li>
    </ul>
  </div>
</template>
