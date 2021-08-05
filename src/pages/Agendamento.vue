<template>
    <div class="q-pa-md row items-start flex-center q-gutter-md">
      <div v-if="form.imu_agendamento_vacinacao_ids.length > 0" >
        <div class="flex-center q-gutter-md">
          <q-card v-for="agendamento in form.imu_agendamento_vacinacao_ids" :key="agendamento.id">
            <q-card-section>
              <div class="row items-start">
                <q-avatar v-if="agendamento.situacao=='A'" color="secondary" text-color="white">A</q-avatar>
                <q-avatar v-else color="deep-orange" text-color="yellow">C</q-avatar>
                <div class="text-h6 q-pa-md"><b>{{agendamento.data_agenda}} {{agendamento.hora_agenda}}</b></div>
              </div>
              <div class="text-h6">{{agendamento.nomesquema}}</div>
              <q-card-actions class="full-width flex flex-center">
                <q-btn class="q-mx-sm" color="deep-orange" :disabled="agendamento.situacao=='C'" label="Cancelar" @click="confirmaCancelamento(agendamento);" />
                <q-btn class="q-mx-sm" color="secondary" :disabled="agendamento.situacao=='C'" label="Comprovante" @click="setAgendamentoComprovante(agendamento.id)" />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div v-else>
        <q-card class="col-md-6 col-sm-6 col-xs-6">
          <q-card-section>
            <div class="text-h6">Não há agendamentos de vacinação cadastrados.</div>
          </q-card-section>
        </q-card>
      </div>

      <div style="margin-top:20px;">
        <q-page-sticky position="bottom" :offset="[18, 18]" class="full-width flex flex-center">
          <q-card-actions class="full-width flex flex-center">
            <q-btn class="q-mx-sm" color="secondary" label="Inicío" @click="$router.push({ name: 'index' })" />
          </q-card-actions>
        </q-page-sticky>
      </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import urlAPI from '../utilities/urlAPI'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default {
  name: 'AgendamentoIndex',
  data () {
    const $store = useStore()
    const $q = useQuasar()
    const imuAgendamentoVacinacao = computed({
      get: () => $store.state.apiAgendamento.imu_agendamento_vacinacao_id,
      set: val => {
        $store.commit('apiAgendamento/updateNewAgendamentos', val)
      }
    })

    function confirmaCancelamento (agendamento) {
      this.form.agendamento = agendamento
      $q.dialog({
        title: 'Alerta',
        message: 'Deseja confirmar o agendamento?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.form.agendamento.situacao = 'C'
        api.get(urlAPI.ALTERAAGENDAMENTO, { params: { imu_agendamento_vacinacao_id: this.form.agendamento.id } })
          .then((res) => {
            this.$q.notify({
              message: 'Cadastro atualizado com sucesso',
              color: 'positive',
              icon: 'check_circle_outline'
            })
          })
          .catch((err) => { console.log(err) })
      })
    }
    return {
      form: {
        imu_agendamento_vacinacao_ids: [],
        imu_agendamento_vacinacao_id: null,
        agendamento: null
      },
      imuAgendamentoVacinacao,
      confirmaCancelamento
    }
  },
  mounted () {
    this.setAgendamentos()
  },
  methods: {
    setAgendamentos () {
      const $store = useStore()
      this.form.imu_agendamento_vacinacao_ids = JSON.parse(JSON.stringify($store.state.apiAgendamento.imu_agendamento_vacinacao_ids))
    },
    setAgendamentoComprovante (idAgendamento) {
      this.imuAgendamentoVacinacao = idAgendamento
      this.$router.push({ name: 'confirmacao' })
    },
    updateSituacaoAgendamento (agendamento) {
      agendamento.situacao = 'C'
      this.$axios.get(urlAPI.ALTERAAGENDAMENTO, { params: { imu_agendamento_vacinacao_id: agendamento.id } })
        .then((res) => {
          this.$q.notify({
            message: 'Cadastro atualizado com sucesso',
            color: 'positive',
            icon: 'check_circle_outline'
          })
        })
        .catch((err) => { console.log(err) })
    }
  }
}
</script>
