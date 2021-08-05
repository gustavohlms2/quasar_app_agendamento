<template>
  <div class="q-pa-md row flex-center items-start q-gutter-md">
    <div>
      <q-card class="my-card" style="padding:20px;font-size:10px;" id='printMe' >
        <div class="q-pa-md text-h6">Dados do cidadão</div>
        <div >
          <div >
            <b>Nome: </b> {{this.dados['nompaciente']}}
          </div>
        </div>
          <div >
          <div >
            <b>Data de nascimento: </b> {{this.dados['data_nascimento']}}
          </div>
        </div>
        <div >
          <div >
            <b>Idade: </b> {{this.dados['idade']}}
          </div>
        </div>
        <div >
          <div >
            <b>CPF: </b> {{this.dados['numcpf']}}
          </div>
        </div>
        <div >
          <div >
            <b>Telefone: </b> {{this.dados['telcontato']}}
          </div>
        </div>
        <div >
          <div >
            <b>Grupo Prioritário: </b> {{this.dados['nome_grup']}}
          </div>
        </div>
        <div >
          <div >
            <b>Campanha: </b> {{this.dados['nomesquema']}}
          </div>
        </div>

        <div class="q-pa-md text-h6">Dados do agendamento</div>
        <div >
          <div >
            <b>Unidade de saúde: </b> {{this.dados['nomunidade']}}
          </div>
        </div>
        <div >
          <div >
            <b>Ponto: </b> {{this.dados['nome_ponto']}}
          </div>
        </div>
        <div >
          <div >
            <b>Endereço: </b> Rua: {{this.dados['nomlogradouro']}} - Bairro: {{this.dados['nombairro']}} - Nº {{this.dados['numimovel']}} - Complemento {{this.dados['cplimovel']}}
          </div>
        </div>
        <div >
          <div >
            <b>Cidade: </b> {{this.dados['nommunicipio']}}/{{this.dados['sgluf']}}
          </div>
        </div>
        <div >
          <div >
            <b>Telefone: </b> {{this.dados['numtelefone']}}
          </div>
        </div>

        <div class="text-red">
          <div >
            <b>Data: </b> {{this.dados['data_agenda']}}
          </div>
        </div>
        <div class="text-red">
          <div >
            <b>Horário: </b> {{this.dados['hora_inicio']}}
          </div>
        </div>
        <div class="text-red">
          <div >
            <b>Código: </b> {{this.dados['chave']}}
          </div>
        </div>
        <div class="q-pa-md text-h6">Orientações</div>
        <div >
          {{this.dados['protocolo']}}
        </div>
      </q-card>
      <div class="q-pa-md text-center col items-center">
        <q-btn
          color="primary"
          icon-right="archive"
          label="Gerar PDF"
          no-caps
          @click="exportFile"
        />
      </div>
      <div style="margin-top:20px;">
        <q-page-sticky position="bottom" :offset="[18, 18]">
          <q-card-actions>
            <q-btn class="q-mx-sm" color="secondary" label="Início" @click="$router.push({ name: 'index' })" />
          </q-card-actions>
        </q-page-sticky>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
// import { exportFile } from 'quasar'
import urlAPI from '../utilities/urlAPI'
import JSPDF from 'jspdf'

export default {
  name: 'ConfirmacaoIndex',
  data () {
    const $store = useStore()
    return {
      dados: {},
      idade: '',
      imu_agendamento_vacinacao_id: $store.state.apiAgendamento.imu_agendamento_vacinacao_id
    }
  },
  mounted () {
    this.getDadosAgendamento()
  },
  methods: {
    getDadosAgendamento () {
      this.$axios.get(urlAPI.LOCALIZAAGENDAMENTO, { params: { imu_agendamento_vacinacao_id: this.imu_agendamento_vacinacao_id } })
        .then((res) => {
          this.dados = JSON.parse(res.data.dados)
        })
        .catch((err) => { console.log(err) })
    },
    printWindow () {
      // Pass the element id here
      this.$htmlToPaper('printMe')
    },
    exportFile () {
      const doc = new JSPDF('p', 'pt', 'a4')
      doc.setFontSize('10')
      doc.html(document.getElementById('printMe'), { callback: function (doc) { doc.save('agendamento_vacinas.pdf') }, x: 10, y: 10 })
    }
  }
}
</script>
