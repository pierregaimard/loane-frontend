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
      <h1 class="h1 text-2xl text-white mb-8 text-center">
        La marchande de<br>
        <strong class="text-6xl text-pink-600 text-shadow-sm">Loane</strong>
      </h1>

      <h2 class="h1 text-2xl text-white mb-5 text-center">
        Je crée mon compte
      </h2>

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
          v-model="firstName"
          label="Prénom"
          :error="errors.firstName"
          class="w-full"
          :label-attrs="{ class: 'text-pink-600 pl-3' }"
          :block-attrs="{ class: 'text-left mb-5' }"
        />

        <AppInput
          v-model="lastName"
          label="Nom"
          :error="errors.lastName"
          class="w-full"
          :label-attrs="{ class: 'text-pink-600 pl-3' }"
          :block-attrs="{ class: 'text-left mb-5' }"
        />

        <AppInput
          v-model="email"
          label="E-mail"
          :error="errors.email"
          class="w-full"
          :label-attrs="{ class: 'text-pink-600 pl-3' }"
          :block-attrs="{ class: 'text-left mb-5' }"
        />

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
          Je crée mon compte
        </button>
      </form>
    </section>
  </main>
</template>

<script lang="ts">
import { useForm, useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'
import { ref } from '@vue/reactivity'
import { ExclamationIcon } from '@heroicons/vue/solid'
import { defineComponent } from 'vue'
import { UserManager } from '@/services/api/managers/UserManager'
import User from '@/services/api/entities/User'

export default defineComponent({
  components: { ExclamationIcon },
  setup() {
    const router = useRouter()
    const errorMessage = ref('')

    const validationSchema = object({
      firstName: string().required('Oups! tu as oublié de tapper ton prénom'),
      lastName: string().required('Oups! tu as oublié de tapper ton nom'),
      email: string()
        .required('Oups! tu as oublié de tapper ton mail')
        .email('Oups! ton adresse mail semble incorrecte'),
      username: string().required('Oups! tu as oublié de tapper ton nom d\'utilisateur'),
      password: string()
        .required('Oups! tu as oublié de tapper ton mot de passe')
        .min(4, 'Oups! il faut que ton mot de passe comporte au moins 4 caractères'),
    })

    const { handleSubmit, errors } = useForm({
      validationSchema: validationSchema,
    })

    const { value: firstName } = useField('firstName')
    const { value: lastName } = useField('lastName')
    const { value: email } = useField('email')
    const { value: username } = useField('username')
    const { value: password } = useField('password')

    const submit = handleSubmit(async function (values) {
      try {
        await UserManager.signIn(values)
        await router.push({ name: 'Login' })
      } catch (err) {
        errorMessage.value = err.response.data.message
      }
    })

    return {
      firstName,
      lastName,
      email,
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
  font-weight: 400;
}
</style>
