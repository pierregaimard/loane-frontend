<template>
  <main class="text-center">
    <section
      class="
        w-96 p-8 mb-5
        mx-auto
        rounded-3xl
        bg-gradient-to-r
        from-pink-200
        to-pink-300
      "
    >
      <h1 class="h1 text-2xl text-white mb-8 text-center">
        {{ title }}
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
          v-model="code"
          label="Code"
          :error="errors.code"
          class="w-full"
          :label-attrs="{ class: 'text-pink-600 pl-3' }"
          :block-attrs="{ class: 'text-left mb-5' }"
        />

        <AppInput
          v-model="name"
          label="Nom de l'article"
          :error="errors.name"
          class="w-full"
          :label-attrs="{ class: 'text-pink-600 pl-3' }"
          :block-attrs="{ class: 'text-left mb-5' }"
        />

        <AppInput
          v-model="price"
          label="Prix"
          :error="errors.price"
          class="w-full"
          type="number"
          step="0.01"
          lang="en-US"
          :label-attrs="{ class: 'text-pink-600 pl-3' }"
          :block-attrs="{ class: 'text-left mb-5' }"
        />

        <AppSelect
          v-model="category"
          label="Catégorie"
          :error="errors.category"
          class="w-full"
          :label-attrs="{ class: 'text-pink-600 pl-3' }"
          :block-attrs="{ class: 'text-left mb-5' }"
          :options="categories"
        />

        <button
          type="submit"
          class="
            w-full
            p-2 mt-5
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
          {{ submitLabel }}
        </button>
      </form>
    </section>
    <router-link
      :to="{ name: 'Articles' }"
      class="
        bg-pink-300
        py-2 px-4 mt-8
        ring-2 ring-pink-100
        rounded-xl
        text-white
        font-bold
        hover:text-green-100
      "
    >
      Annuler
    </router-link>
  </main>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, PropType, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { object, string, number } from 'yup'
import { useField, useForm } from 'vee-validate'
import { ArticleManager } from '@/services/api/managers/ArticleManager'
import { Article } from '@/services/api/entities/article'
import { ExclamationIcon } from '@heroicons/vue/solid'
import { ArticleCategoryManager } from '@/services/api/managers/ArticleCategoryManager'
import { AppSelectOption } from '@/interfaces/AppSelectOption'

export default defineComponent({
  components: { ExclamationIcon },
  props: {
    article: {
      type: Object as PropType<Article>,
      default: null,
    },
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const errorMessage = ref('')
    const categories = ref<AppSelectOption[]>([])
    const title = ref('J\'ajoute un article')
    const submitLabel = ref('J\'enregistre mon nouvel article')
    const isUpdateRoute = route.name === 'ArticleUpdate'

    onBeforeMount(async () => {
      const articleCategories = await ArticleCategoryManager.find()
      const formattedCategories: AppSelectOption[] = []
      articleCategories.forEach((category) => {
        formattedCategories.push({
          value: category.id,
          label: category.label,
        })
      })
      categories.value = formattedCategories

      if (isUpdateRoute) {
        const article = await ArticleManager.findOne(Number(route.params.id))
        title.value = 'Je modifie mon article'
        submitLabel.value = 'J\'enregistre mes modifications'

        id.value = article.id
        code.value = article.code
        name.value = article.name
        price.value = article.price
        category.value = article.category.id
      }
    })

    const validationSchema = object({
      code: string()
        .required('Oups! tu as oublié le code')
        .matches(
          /^[a-zA-Z0-9]+([-_]?[a-zA-Z0-9])*$/,
          'Oups! uniquement des lettres, des chiffres et des tirets. ex: 22-3524aBCt ',
        )
        .min(2),
      name: string().required('Oups! tu as oublié le nom').min(3),
      price: number().required('Oups! tu as oublié le prix').positive(),
      category: number().required('Oups! tu as oublié la categorie'),
    })

    const { handleSubmit, errors } = useForm({
      validationSchema: validationSchema,
    })

    const submit = handleSubmit(async function (values) {
      try {
        (isUpdateRoute)
          ? await ArticleManager.update(values)
          : await ArticleManager.create(values)
        await router.push({ name: 'Articles' })
      } catch (err) {
        errorMessage.value = err.response.data.message
      }
    })

    const { value: id } = useField('id')
    const { value: code } = useField('code')
    const { value: name } = useField('name')
    const { value: price } = useField('price')
    const { value: category } = useField('category')

    return {
      categories,
      id,
      code,
      name,
      price,
      category,
      errors,
      errorMessage,
      submit,
      title,
      submitLabel,
    }
  },
})
</script>
