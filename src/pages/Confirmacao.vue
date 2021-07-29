<template>
    <q-page class="flex flex-center">
        <div class="text-caption">Seu registro foi salvo</div>

        <q-card-actions class="full-width flex flex-center">
            <q-btn class="q-mx-sm" color="secondary" label="Início" @click="$router.push({ name: 'index' })" style="width: 50%" />
        </q-card-actions>
    </q-page>
</template>

<script>
export default {
  name: 'Confirmacao',
  data () {
    return {
      email: ''
    }
  },
  methods: {
  }
}
</script>
