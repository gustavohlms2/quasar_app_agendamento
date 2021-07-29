<template>
  <div class="q-pa-md row items-start flex-center q-gutter-md">
    <q-card class="my-card bg-grey-1 col-10" vertical=false>
      <q-card-section>
        <div class="text-h6">Osford</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-actions class="full-width">
        <q-btn class="q-mx-sm" color="primary" label="Agendar" @click="$router.push({ name: 'cadastro', params: { email: '1'} })" style="width: 100%" icon-right="send" />
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-pa-md row items-start flex-center q-gutter-md">
    <q-card class="my-card bg-grey-1 col-10" vertical=false>
      <q-card-section>
        <div class="text-h6">Jonson</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-actions class="full-width">
        <q-btn class="q-mx-sm" color="primary" label="Agendar" @click="$router.push({ name: 'home' })" style="width: 100%" icon-right="send" />
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-pa-md row items-start flex-center q-gutter-md">
    <q-card class="my-card bg-grey-1 col-10" vertical=false>
      <q-card-section>
        <div class="text-h6">Agendamentos Realizados</div>
      </q-card-section>

      <q-card-actions class="full-width">
        <q-btn class="q-mx-sm" color="info" label="Consultar" @click="$router.push({ name: 'consulta' })" style="width: 100%" icon-right="send" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
