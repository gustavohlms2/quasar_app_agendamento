<template>
  <q-page class="container" padding>
    <div class="q-pa-md column flex-center q-gutter-md">
      <div v-if="form.esquemas.length != 0" style="max-width:600px;width:90%;">
        <div class="flex-center q-gutter-md q-pa-md">
          <q-card v-for="esquema in form.esquemas" :key="esquema.id">
            <q-card-section>
              <div class="text-h6">{{esquema.nomesquema.toUpperCase()}}</div>
            </q-card-section>
            <q-card-actions>
              <q-btn class="q-mx-sm" color="primary" label="Agendar" @click="avancaCadastro(esquema.id)" style="width: 100%" icon-right="send" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div v-else style="max-width:600px;width:90%;">
        <q-card>
          <q-card-section>
            <div class="text-h6">No momento não há vagas disponíveis para agendamento de vacina.</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="q-pa-md column flex-center q-gutter-md">
      <div style="max-width:600px;width:90%;">
        <div class="flex-center q-gutter-md q-pa-md">
          <q-card>
            <q-card-section>
              <div class="text-h6">AGENDAMENTOS REALIZADOS</div>
            </q-card-section>
            <q-card-actions>
              <q-btn class="q-mx-sm" color="info" label="Consultar" @click="$router.push({ name: 'consulta'})" style="width: 100%" icon-right="send" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import urlAPI from '../utilities/urlAPI'
// import { api } from 'boot/axios'

export default ({
  name: 'PageIndex',
  data () {
    const $store = useStore()
    const imuEsquemaVacinacaoId = computed({
      get: () => $store.state.apiAgendamento.imu_esquema_vacinacao_id,
      set: val => {
        $store.commit('apiAgendamento/updateImuEsquemaVacinacao', val)
      }
    })
    return {
      imuEsquemaVacinacaoId,
      form: {
        esquemas: []
      }
    }
  },
  mounted () {
    this.getEsquemas()
  },
  methods: {
    setEsquemas (esquemaId) {
      this.imuEsquemaVacinacaoId = esquemaId
    },
    getEsquemas () {
      this.$axios.get(urlAPI.ESQUEMAVACINACAO)
        .then((res) => {
          this.form.esquemas = JSON.parse(res.data.dados)
        })
        .catch((err) => { console.log(err) })
    },
    avancaCadastro (esquemaId) {
      this.setEsquemas(esquemaId)
      this.$router.push({ name: 'cadastro' })
    }
  }
})
</script>
