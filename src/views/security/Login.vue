<template>
  <main
    class="
      flex
      h-screen
      justify-center
      items-center
      bg-gradient-to-r
      from-yellow-200
      via-fuschia-200
      to-pink-400
    "
  >
    <section class="w-96">
      <h1 class="h1 text-2xl text-white mb-5 text-center">
        Bienvenue<br>
        dans la marchande de<br>
        <strong class="text-9xl text-pink-600 text-shadow-sm">Loane</strong>
      </h1>

      <p
        v-if="errorMessage"
        class="
          px-3
          rounded-lg
          shadow-md
          text-red-500
          bg-white
          mb-4
          flex
          items-center
          justify-center
          gap-x-4
        "
      >
        <ExclamationIcon class="h-32" />
        <span class="text-left">{{ errorMessage }}</span>
      </p>

      <form @submit="submit">
        <AppInput
          v-model="username"
          label="Nom d'utilisateur"
          :error="errors.username"
          class="w-full"
          :label-attrs="{ class: 'text-pink-600 pl-3' }"
          :block-attrs="{ class: 'text-left mb-5' }"
        />

        <AppInput
          v-model="password"
          type="password"
          label="Mot de passe"
          :error="errors.password"
          class="w-full"
          :label-attrs="{ class: 'text-pink-600 pl-3' }"
          :block-attrs="{ class: 'text-left mb-8' }"
        />

        <button
          type="submit"
          class="
            w-full
            p-2
            rounded-xl
            bg-white
            text-pink-600
            hover:shadow-lg hover:transform hover:scale-105
            active:outline-none active:ring-4 active:ring-pink-200
            transition
            duration-150
            ease-in-out
          "
        >
          C'est parti!
        </button>
      </form>

      <p class="text-pink-500 mt-6 text-center">
        Je n'ai pas encore de compte<br>
        <router-link
          :to="{ name: 'SignIn' }"
          class="
            text-white
            text-center
            block
            py-1
            border border-white
            mt-2
            rounded-xl
            hover:bg-white
            hover:text-pink-500
            hover:shadow-lg
            hover:transform
            hover:scale-105
            transition
            duration-150
            ease-in-out
          "
        >
          Je crée mon compte
        </router-link>
      </p>
    </section>
  </main>
</template>

<script lang="ts">
import { useForm, useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'
import { ExclamationIcon } from '@heroicons/vue/solid'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { ExclamationIcon },
  setup() {
    const store = useStore()
    const router = useRouter()
    const errorMessage = ref('')

    const validationSchema = object({
      username: string().required('Oups! tu as oublié de tapper ton nom d\'utilisateur'),
      password: string().required('Oups! tu as oublié de tapper ton mot de passe'),
    })

    const { handleSubmit, errors } = useForm({
      validationSchema: validationSchema,
    })

    const { value: username } = useField('username')
    const { value: password } = useField('password')

    const submit = handleSubmit(async function (values) {
      try {
        await store.dispatch('authenticate', values)
        await router.push({ name: 'Home' })
      } catch (err) {
        errorMessage.value = err.response.data.message
      }
    })

    return {
      username,
      password,
      errors,
      errorMessage,
      submit,
    }
  },
})
</script>

<style lang="scss">
h1 strong {
  font-family: 'Leckerli One', cursive;
}
</style>
