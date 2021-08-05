<template>
  <q-page class="container" padding>
    <q-form
      @submit="onSubmit"
      class="row q-col-gutter-md"
      ref="myForm"
    >
      <q-input filled v-model="form.nompaciente" label="Nome"
        class="col-md-12 col-sm-12 col-xs-12"
        maxlength=100
        v-on:keypress="isLetter($event)"
        :rules="[
          val => val && val.length > 0 || 'Nome é obrigatório',
          val => val && val.length > 10 || 'Preenha o nome completo',
          val => val && val.split(' ').length > 1 && val.split(' ')[1].length > 0 || 'Preenha um sobrenome'
        ]">
        <template v-slot:append>
          <q-icon name="close" @click="form.nompaciente = ''" class="cursor-pointer"/>
        </template>
      </q-input>
      <q-input v-model="form.datnascimento" filled type="date"
        hint="Data de nascimento"
        class="col-md-6 col-sm-6 col-xs-12"
        :rules="[
          val => val && val.length > 0 || 'Data não pode ficar em branco',
          validaDtNascimento
        ]"/>
      <q-input filled v-model="form.nommae"
        maxlength=100
        class="col-md-6 col-sm-6 col-xs-12"
        label="Nome da Mãe"
        v-on:keypress="isLetter($event)"
        :rules="[
          val => val && val.length > 0 || 'Nome da mãe é obrigatório',
          val => val && val.length > 10 || 'Preenha o nome completo',
          val => val && val.split(' ').length > 1 && val.split(' ')[1].length > 0 || 'Preenha um sobrenome'
        ]"/>
      <q-input
          filled
          v-model="form.numcpf"
          class="col-md-6 col-sm-6 col-xs-12"
          label="CPF"
          mask="###.###.###-##"
          unmasked-value
          :rules="[
              val => val && val.length > 0 || 'CPF obrigatório',
              val => val.length === 11 || 'Informe o cpf completo',
              val => isValidCPF(val) || 'Informe um cpf válido'
          ]"
        />
      <q-input
          filled
          v-model="form.telcontato"
          class="col-md-6 col-sm-6 col-xs-12"
          label="Telefone"
          mask="(##) ##### - ####"
          unmasked-value
          :rules="[
            val => val && val.length > 0 || 'Telefone obrigatório',
            val => val.length > 9 || 'Informe um telefone real'
          ]"
        />

      <q-select label="Grupo de Atendimento"
        filled
        class="col-md-6 col-sm-6 col-xs-12"
        v-model="form.esu_grupo_atendimento_id"
        :options="form.esu_grupo_atendimento_ids"
        >
        <template v-slot:append>
          <q-icon name="close" @click.stop="form.esu_grupo_atendimento_id = ''" class="cursor-pointer" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Não há resultados
            </q-item-section>
          </q-item>
        </template>
      </q-select>
<!--
      <q-select label="Dose"
        filled
        class="col-md-6 col-sm-6 col-xs-12"
        v-model="form.co_dose"
        :options="form.co_doses"
        >
        <template v-slot:append>
          <q-icon name="close" @click.stop="form.co_dose = ''" class="cursor-pointer" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Não há resultados
            </q-item-section>
          </q-item>
        </template>
      </q-select>
-->
      <div style="margin-top:20px;">
        <q-page-sticky position="bottom" :offset="[18, 18]" class="full-width flex flex-center">
          <q-card-actions class="full-width flex flex-center">
            <q-btn class="q-mx-sm" color="deep-orange" label="Voltar"  type="reset"  @click="$router.push({ name: 'index' })" icon="keyboard_arrow_left" />
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

export default {
  name: 'CadastroIndex',
  data () {
    const $store = useStore()
    const storeEsuGrupoAtendimentoId = computed({
      get: () => $store.state.apiAgendamento.esu_grupo_atendimento_id,
      set: val => {
        $store.commit('apiAgendamento/updateEsuGrupoAtendimento', val)
      }
    })
    /* const storeCoDose = computed({
      get: () => $store.state.apiAgendamento.co_dose,
      set: val => {
        $store.commit('apiAgendamento/updateCoDose', val)
      }
    }) */
    const storeNomPaciente = computed({
      get: () => $store.state.apiAgendamento.nompaciente,
      set: val => {
        $store.commit('apiAgendamento/updateNompaciente', val)
      }
    })
    const storeDatNascimento = computed({
      get: () => $store.state.apiAgendamento.datnascimento,
      set: val => {
        $store.commit('apiAgendamento/updateDatanascimento', val)
      }
    })
    const storeNumCpf = computed({
      get: () => $store.state.apiAgendamento.numcpf,
      set: val => {
        $store.commit('apiAgendamento/updateNumcpf', val)
      }
    })
    const storeNomMae = computed({
      get: () => $store.state.apiAgendamento.nommae,
      set: val => {
        $store.commit('apiAgendamento/updateNommae', val)
      }
    })
    const storeTelContato = computed({
      get: () => $store.state.apiAgendamento.telcontato,
      set: val => {
        $store.commit('apiAgendamento/updateTelcontato', val)
      }
    })

    return {
      // storeCoDose,
      storeNomPaciente,
      storeDatNascimento,
      storeNumCpf,
      storeNomMae,
      storeTelContato,
      storeEsuGrupoAtendimentoId,
      form: {
        nompaciente: storeNomPaciente,
        datnascimento: storeDatNascimento,
        nommae: storeNomMae,
        numcpf: storeNumCpf,
        telcontato: storeTelContato,
        co_doses: [],
        // co_dose: storeCoDose,
        esu_grupo_atendimento_ids: [],
        esu_grupo_atendimento_id: storeEsuGrupoAtendimentoId
      }
    }
  },
  mounted () {
    // this.getDose()
    this.getGrupoAtendimento()
  },
  methods: {
    validaDtNascimento (val) {
      if (new Date(val) > new Date()) {
        return 'Data não ser superior a data atual'
      } else if (new Date(val) < new Date('01/01/1900')) {
        return 'Data não ser inferior a 01/01/1900'
      }
    },
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
    setStoreDose () {
      this.storeCoDose = this.form.co_dose
    },
    setStoreNomPaciente () {
      this.storeNomPaciente = this.form.nompaciente
    },
    setStoreDatNascimento () {
      this.storeDatNascimento = this.form.datnascimento
    },
    setStoreNumCpf () {
      this.storeNumCpf = this.form.numcpf
    },
    setStoreNomMae () {
      this.storeNomMae = this.form.nommae
    },
    setStoreTelContato () {
      this.storeTelContato = this.form.telcontato
    },
    setStoreGrupoAtendimento () {
      this.storeEsuGrupoAtendimentoId = this.form.esu_grupo_atendimento_id
    },
    getDose () {
      const $store = useStore()
      this.$axios.get(urlAPI.DOSEVACINACAO, { params: { esquemaimunizacao_id: $store.state.apiAgendamento.imu_esquema_vacinacao_id } })
        .then((res) => {
          this.form.co_doses = JSON.parse(res.data.dados)
        })
        .catch((err) => { console.log(err) })
    },
    getGrupoAtendimento () {
      this.$axios.get(urlAPI.GRUPOATENDIMENTO)
        .then((res) => {
          this.form.esu_grupo_atendimento_ids = JSON.parse(res.data.dados)
        })
        .catch((err) => { console.log(err) })
    },
    onSubmit () {
      // this.setStoreDose()
      this.setStoreGrupoAtendimento()
      this.setStoreDatNascimento()
      this.setStoreNumCpf()
      this.setStoreNomMae()
      this.setStoreNomPaciente()
      this.setStoreTelContato()
      this.$router.push('/disponibilidade')
    }
  }
}
</script>
