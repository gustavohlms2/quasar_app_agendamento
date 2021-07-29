<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-8 text-white">
    <q-header  style="height: auto; display: flex;" >

        <q-img src="../assets/brasaoNovaSerrana.png" ratio="1" width="60px"/>

        <q-toolbar-title>
        Prefeitura de Nova Serrana
        <br>
        Agendamento de Vacinação
        </q-toolbar-title>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'SecondLayout',
  data () {}
}
</script>
