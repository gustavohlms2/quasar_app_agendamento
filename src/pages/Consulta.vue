<template>
    <q-page class="container" padding>
      <q-form
      @submit="onSubmit"
      class="row q-col-gutter-md"
      ref="myForm"
      >
        <q-input
            filled
            v-model="form.numcpf"
            class="col-md-12 col-sm-12 col-xs-12"
            label="CPF"
            mask="###.###.###-##"
            unmasked-value
            :rules="[
              val => form.chave != '' || val.length > 0 || 'CPF obrigatório',
              val => form.chave != '' || val.length === 11 || 'Informe o cpf completo',
              val => form.chave != '' || isValidCPF(val) || 'Informe um cpf válido'
            ]"
            />
        <q-toolbar-title class="full-width flex flex-center">
            Ou digite um código
        </q-toolbar-title>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <q-input filled v-model="form.chave" label="Código" maxlength=20 type="number"/>
        </div>
        <div style="margin-top:20px;">
          <q-page-sticky position="bottom" :offset="[18, 18]" class="full-width flex flex-center">
            <q-card-actions class="full-width flex flex-center">
                <q-btn class="q-mx-sm" color="deep-orange" label="Voltar" @click="$router.push({ name: 'index' })" icon="keyboard_arrow_left" />
                <q-btn class="q-mx-sm" color="secondary" label="Consultar" type="submit" icon-right="keyboard_arrow_right" />
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

export default {
  name: 'ConsultaIndex',
  data () {
    const $store = useStore()
    const imuAgendamentoVacinacaoIds = computed({
      get: () => $store.state.apiAgendamento.imu_agendamento_vacinacao_ids,
      set: val => {
        $store.commit('apiAgendamento/updateAgendamentos', val)
      }
    })
    return {
      imuAgendamentoVacinacaoIds,
      form: {
        numcpf: '',
        chave: ''
      }
    }
  },
  methods: {
    isLetter (e) {
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z ]+$/.test(char)) return true
      else e.preventDefault() // If not match, don't add to input text
    },
    isValidCPF (cpf) {
      if (typeof cpf !== 'string') return false
      cpf = cpf.replace(/[^\d]+/g, '')
      if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
      cpf = cpf.split('')
      const validator = cpf
        .filter((digit, index, array) => index >= array.length - 2 && digit)
        .map(el => +el)
      const toValidate = pop => cpf
        .filter((digit, index, array) => index < array.length - pop && digit)
        .map(el => +el)
      const rest = (count, pop) => (toValidate(pop)
        .reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11 % 10
      return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1])
    },
    onSubmit () {
      this.$axios.get(urlAPI.AGENDAMENTOSFEITOS, { params: this.form })
        .then((res) => {
          this.imuAgendamentoVacinacaoIds = JSON.parse(res.data.dados)
          this.$q.notify({
            message: 'Busca realizada com sucesso',
            color: 'positive',
            icon: 'check_circle_outline'
          })
          this.$router.push('/agendamento')
        })
        .catch((err) => { console.log(err) })
    },
    mounted () {
      this.getPost()
    }
  }
}
</script>
