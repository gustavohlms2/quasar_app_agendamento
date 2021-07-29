<template>
    <div class="q-pa-md">
        <div class="q-gutter-y-md column" style="width: 100;margin-bottom:20px;">
        <q-input filled v-model="nome" label="Nome" />
        </div>
        <div class="q-gutter-y-md column" style="width: 100;">
        <q-input filled label="Data de nascimento" v-model="datanascimento" mask="date" :rules="['date']">
            <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="datanascimento">
                    <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                </q-date>
                </q-popup-proxy>
            </q-icon>
            </template>
        </q-input>
        </div>
        <div class="q-gutter-y-md column" style="width: 100;">
            <q-input filled v-model="nomemae" label="Nome da Mãe" />
        </div>
        <div class="q-gutter-y-md column" style="width: 100;margin-top:05px;">
        <q-input
            filled
            v-model="cpf"
            label="CPF"
            mask="###.###.###-##"
        />
        </div>
        <q-toolbar-title class="full-width flex flex-center">
            Ou digite um código
        </q-toolbar-title>
        <div class="q-gutter-y-md column" style="width: 100;">
            <q-input filled v-model="numcodigo" label="Código" />
        </div>
        <q-card-actions class="full-width flex flex-center">
            <q-btn class="q-mx-sm" color="deep-orange" label="Voltar" @click="$router.push({ name: 'index' })" style="width: 45%" />
            <q-btn class="q-mx-sm" color="secondary" label="Consultar" @click="$router.push({ name: 'agendamento' })" style="width: 45%" />
        </q-card-actions>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Consulta',
  setup () {
    return {
      nome: ref(''),
      datanascimento: ref(''),
      nomemae: ref(''),
      cpf: ref(''),
      email: ref(''),
      telefone: ref(''),
      numcodigo: ref(''),
      grupo: ref(null),
      dose: ref(null),
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },
  methods: {
  }
}
</script>
