<script setup lang="ts">
import { Button } from 'primevue'
</script>

<template>
  <div class="contenedor">
    <h1>Agenda y boletaje de eventos culturales</h1>
    <nav class="flex gap-2">
      <RouterLink to="/" custom v-slot="{ navigate }">
        <Button label="Inicio" icon="pi pi-home" text @click="navigate" />
      </RouterLink>
      <RouterLink to="/eventos-culturales" custom v-slot="{ navigate }">
        <Button label="Eventos" icon="pi pi-calendar" text @click="navigate" />
      </RouterLink>
      <RouterLink to="/recintos" custom v-slot="{ navigate }">
        <Button label="Recintos" icon="pi pi-building" text @click="navigate" />
      </RouterLink>
    </nav>
    <hr />
    <RouterView />
  </div>
</template>
