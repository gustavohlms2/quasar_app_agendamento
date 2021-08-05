<template>
  <q-page class="container" padding>
    <q-form
      @submit="onSubmit"
      class="row q-col-gutter-md"
      ref="myForm"
    >

      <div v-if="form.agendas.length==0" style="width: 100%;">
        <div class="q-pa-md column flex-center q-gutter-md">
          <q-card>
            <q-card-section>
              <div class="text-h6">Não há agendas cadastradas.</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-select
        filled
        label="Ponto de vacinação"
        class="col-md-12 col-sm-12 col-xs-12"
        v-model="form.imu_ponto_vacinacao_id"
        :options="form.imu_ponto_vacinacao_ids"
        :rules="[
          val => val && val != null || 'Informe um ponto de vacinação'
        ]">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Não há resultados
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-date
        class="col-md-11 col-sm-11 col-xs-11"
        style='margin:5%;'
        minimal
        v-model="form.data_agenda"
        :options="filterDataAgendas"
        :events="filterDataAgendas"
        :event-color="(date) => 'primary'"
        @click="mostraModal()"
        :rules="[ val => val && val.length > 0 || 'Data não pode ficar em branco']"/>

      <div v-if="!form.dialog" style="width:100%;">
        <div v-if="form.imu_agenda_vacinacao_id !== null">
          <div class="q-pa-md column flex-center q-gutter-md">
            <q-card>
              <div class="text-h7">
                <b>Endereço: </b> {{form.imu_ponto_vacinacao_id.endereco}}
              </div>
              <div class="text-h7">
                <b>Data: </b> {{alteraData(form.data_agenda)}}
              </div>
              <div class="text-h7">
                <b>Horário: </b> {{ buscaHorario(form.imu_agenda_vacinacao_id) }}
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <q-dialog v-model="form.dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6" style="border-bottom: 1px solid black;">Horários Disponiveis</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-option-group
              :options="filterAgendasHorarios"
              type="radio"
              v-model="form.imu_agenda_vacinacao_id"
              :rules="[
                val => val && val.length > 0 || 'Informe um ponto de vacinação'
              ]"
              />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup @click="form.dialog =false"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div style="margin-top:20px;">
        <q-page-sticky position="bottom" :offset="[18, 18]" class="full-width flex flex-center">
          <q-card-actions class="full-width flex flex-center">
            <q-btn class="q-mx-sm" color="deep-orange" label="Voltar" @click="$router.push({ name: 'cadastro' })" icon="keyboard_arrow_left" />
            <q-btn class="q-mx-sm" color="secondary" label="Avançar" type="submit" icon-right="keyboard_arrow_right" />
          </q-card-actions>
        </q-page-sticky>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import urlAPI from '../utilities/urlAPI'
import { useQuasar } from 'quasar'

export default {
  name: 'DisponibilidadeIndex',
  data () {
    // const $store = useStore()
    const $store = useStore()
    const $q = useQuasar()
    const imuAgendamentoVacinacao = computed({
      get: () => $store.state.apiAgendamento.imu_agendamento_vacinacao_id,
      set: val => {
        $store.commit('apiAgendamento/updateNewAgendamentos', val)
      }
    })

    const clearDadosPaciente = computed({
      set: val => {
        $store.commit('apiAgendamento/clearDadosPaciente')
      }
    })

    function alertaPreenchimento () {
      $q.dialog({
        title: 'Alerta',
        message: 'Favor informar um horário para agendamento!',
        cancel: false,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
      })
    }
    function confirmaAgendamento () {
      $q.dialog({
        title: 'Alerta',
        message: 'Deseja confirmar o agendamento?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.geraAgendamento()
      })
    }
    return {
      form: {
        imu_ponto_vacinacao_ids: [],
        imu_ponto_vacinacao_id: null,
        imu_agenda_vacinacao_id: null,
        ponto_id: null,
        data_agenda: null,
        data_agendas: [],
        clone_data: null,
        agendas: [],
        horarios_agendas: [],
        esquemaimunizacao_id: $store.state.apiAgendamento.imu_esquema_vacinacao_id,
        // co_dose: (($store.state.apiAgendamento.co_dose !== [] && $store.state.apiAgendamento.co_dose !== undefined) ? $store.state.apiAgendamento.co_dose.value : ''),
        esu_grupo_atendimento_id: (($store.state.apiAgendamento.esu_grupo_atendimento_id !== [] && $store.state.apiAgendamento.esu_grupo_atendimento_id !== undefined) ? $store.state.apiAgendamento.esu_grupo_atendimento_id.value : ''),
        nompaciente: $store.state.apiAgendamento.nompaciente,
        numcpf: $store.state.apiAgendamento.numcpf,
        telcontato: $store.state.apiAgendamento.telcontato,
        datnascimento: $store.state.apiAgendamento.datnascimento,
        nommae: $store.state.apiAgendamento.nommae,
        maximizedToggle: false,
        dialog: false
      },
      imuAgendamentoVacinacao,
      alertaPreenchimento,
      confirmaAgendamento,
      clearDadosPaciente
    }
  },
  mounted () {
    this.getPontoVacinacao()
    this.getDatasAgendas()
  },
  methods: {
    clearValores () {
      this.clearDadosPaciente = null
    },
    alteraData (date) {
      return new Date(date).toLocaleDateString('pt-BR')
    },
    mostraModal () {
      this.form.imu_agenda_vacinacao_id = null
      if (this.form.data_agenda !== undefined && this.form.data_agenda !== this.form.clone_data) {
        this.form.clone_data = this.form.data_agenda
        this.form.dialog = true
      } else {
        this.form.dialog = false
      }
    },
    buscaHorario (idAgenda) {
      const arr = this.filterAgendasHorarios.filter(agendaI => agendaI.value === idAgenda)
      return (arr.length > 0) ? arr[0].label : ''
    },
    getPontoVacinacao () {
      this.$axios.get(urlAPI.PONTOVACINACAO, { params: { esquemaimunizacao_id: this.form.esquemaimunizacao_id } })
        .then((res) => {
          this.form.imu_ponto_vacinacao_ids = JSON.parse(res.data.dados)
        })
        .catch((err) => { console.log(err) })
    },
    getDatasAgendas () {
      const idPonto = this.form.imu_ponto_vacinacao_id !== null ? this.form.imu_ponto_vacinacao_id.id : ''
      this.$axios.get(urlAPI.AGENDASDISPONIVEIS, { params: { esquemaimunizacao_id: this.form.esquemaimunizacao_id, imu_ponto_vacinacao_id: idPonto, data_agenda: this.form.data_agenda, esu_grupo_atendimento_id: this.form.esu_grupo_atendimento_id } })
        .then((res) => {
          this.form.agendas = JSON.parse(res.data.dados)
        })
        .catch((err) => { console.log(err) })
    },
    pontoIguais (idP) {
      if (idP.imu_ponto_vacinacao_id === this.form.imu_ponto_vacinacao_id.value) {
        return idP
      }
    },
    pontoDatasIguais (idP) {
      if (idP.imu_ponto_vacinacao_id === this.form.imu_ponto_vacinacao_id.value && (new Date(idP.data_agenda)).toLocaleDateString('en-ZA') === (new Date(this.form.data_agenda)).toLocaleDateString('en-ZA')) {
        return idP
      }
    },
    onSubmit () {
      if (this.form.imu_agenda_vacinacao_id !== null) {
        this.confirmaAgendamento()
      } else {
        this.alertaPreenchimento()
      }
    },
    setimuAgendamentoVacinacao (value) {
      this.imuAgendamentoVacinacao = value
    },
    geraAgendamento () {
      this.$axios.get(urlAPI.LOCALIZACRIAPACIENTEAGENDAMENTO, { params: { nompaciente: this.form.nompaciente, datnascimento: this.form.datnascimento, nommae: this.form.nommae, numcpf: this.form.numcpf, telcontato: this.form.telcontato, imu_agenda_vacinacao_id: this.form.imu_agenda_vacinacao_id, co_dose: this.form.co_dose, esu_grupo_atendimento_id: this.form.esu_grupo_atendimento_id, imu_esquema_vacinacao_id: this.form.esquemaimunizacao_id, numprontuario: 0, situacao: 'A' } }).then((res) => {
        this.$q.notify({ message: res.data.message, color: res.data.color, icon: res.data.icon })
        if (res.data.imu_agendamento_vacinacao_id !== null) {
          this.setimuAgendamentoVacinacao(res.data.imu_agendamento_vacinacao_id)
          this.clearValores()
          this.$router.push({ name: 'confirmacao' })
        }
      }).catch((err) => { console.log(err) })
    }
  },
  computed: {
    filterAgendasPonto () {
      // function to compare names
      if (this.form.imu_ponto_vacinacao_id == null) {
        return this.form.agendas
      }
      return this.form.agendas.filter(this.pontoIguais)
    },
    filterDataAgendas () {
      if (this.form.imu_ponto_vacinacao_id == null) {
        return []
      }
      const arr = this.filterAgendasPonto.map(agendaI => (new Date(agendaI.data_agenda)).toLocaleDateString('en-ZA'))
      return arr
    },
    filterAgendasPontoAgenda () {
      // function to compare names
      if (this.form.imu_ponto_vacinacao_id == null) {
        return this.form.agendas
      }
      return this.form.agendas.filter(this.pontoDatasIguais)
    },
    filterAgendasHorarios () {
      if (this.form.imu_ponto_vacinacao_id == null) {
        return []
      }
      const arr = this.filterAgendasPontoAgenda.map(agendaI => agendaI.horarios)
      return arr.length >= 1 ? arr[0] : arr
    }
  }
}
</script>
