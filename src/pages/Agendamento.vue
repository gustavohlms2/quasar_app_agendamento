<template>
    <div class="q-pa-md row items-start flex-center q-gutter-md">
        <q-card-actions class="my-card bg-grey-1 col-10 full-width flex flex-center" padding style="height: auto; display: flex;">

            <q-img src="../assets/brasaoNovaSerrana.png" ratio="1" height="60px" width="60px"/>

            <q-toolbar-title>
                22/06/2021 - 07:01
                <br>
                Ativos
            </q-toolbar-title>

        </q-card-actions>

        <q-card-actions class="full-width flex flex-center">
            <q-btn class="q-mx-sm" color="deep-orange" label="Cancelar" @click="$router.push({ name: 'index' })" style="width: 45%" />
            <q-btn class="q-mx-sm" align="center" color="secondary" label="Comprovante" @click="confirm = true" style="width: 45%" />
        </q-card-actions>

        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
                <span class="q-ml-sm">You are currently not connected to any network.</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'Cadastro',
  setup () {
    onMounted(() => {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      console.log(newUser)
      // axios.post('http://localhost:5000/signup', newUser)
      axios.get('https://pokeapi.co/api/v2/pokemon/1')
        .then(res => {
          console.log(res.base_experience)
          this.error = ''
          this.$router.push('/login')
        }, err => {
          console.log(err.response)
          this.error = err.response.data.error
          this.$router.push('/login') // comentar
        })
    })

    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      address: ref('')
    }
  }
}
</script>
