<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="width: 100;margin-top:05px;">
      <q-select filled v-model="bairro" :options="options" label="Bairro" />
    </div>
    <div class="q-gutter-y-md column" style="width: 100;margin-top:05px;">
      <q-select filled v-model="ponto" :options="options" label="Ponto" />
    </div>
    <div class="q-gutter-md row items-start flex flex-center" style="width: 100;margin-top:05px;">
      <q-date
        v-model="data_agenda"
        :events="events"
        :event-color="(date) => date[9] % 2 === 0 ? 'teal' : 'orange'" style="width: 100;"
      />
    </div>
    <q-card-actions class="full-width flex flex-center">
      <q-btn class="q-mx-sm" color="secondary" label="Voltar" @click="$router.push({ name: 'cadastro' })" style="width: 45%" icon="keyboard_arrow_left" />
      <q-btn class="q-mx-sm" color="secondary" label="Avançar" @click="$router.push({ name: 'confirmacao' })" style="width: 45%" icon-right="keyboard_arrow_right" />
    </q-card-actions>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Disponibilidade',
  data () {
    return {
      bairro: '',
      ponto: '',
      data_agenda: ref('2019/02/01'),
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      events: ['2019/02/01', '2019/02/05', '2019/02/06', '2019/02/09', '2019/02/23']
    }
  },
  methods: {
  }
}
</script>
