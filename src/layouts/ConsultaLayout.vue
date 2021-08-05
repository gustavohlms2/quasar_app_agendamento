<template>
  <div class="q-pa-md">
    <q-layout view="lhh LpR lff" class="shadow-2 rounded-borders">
      <q-header reveal class="bg-blue">
        <q-toolbar>
            <q-img src="../assets/brasaoNovaSerrana.png" ratio="1" width="60px"/>

            <q-toolbar-title>
                Prefeitura de Nova Serrana
            <br>
              <div class="quebraTexto">
                Preencha o formulário para consultar os já agendamentos realizados
              </div>
            </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'ConsultaLayout',
  data () {}
}
</script>

<style scoped>
  .quebraTexto {
    white-space: normal;
    padding-bottom: 1rem;
  }
</style>
