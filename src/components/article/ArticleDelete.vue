<template>
  <div
    class="
      fixed z-20
      w-full h-full
      top-0 left-0
      flex
      items-center
      justify-center
      bg-pink-200 bg-opacity-30
    "
  >
    <div
      class="
        absolute
        p-8
        rounded-2xl
        bg-white
        ring-4 ring-red-200
        shadow-xl
        text-red-500
      "
    >
      <h1 class="flex justify-center items-center text-4xl mb-3">
        <ExclamationIcon class="w-16 text-red-500 mr-2" />
        Attention
      </h1>
      <p class="text-center text-2xl mb-8">
        Es-tu sure de vouloir supprimer cet article ?
      </p>
      <div class="flex justify-center items-center mb-4">
        <button
          class="
            px-6 py-2 mr-4
            bg-green-400 hover:bg-green-300
            ring-4 ring-green-200
            text-white
            rounded-xl
          "
          @click="$emit('closeWindow')"
        >
          Annuler
        </button>

        <button
          class="
            px-6 py-2
            bg-red-500 hover:bg-red-400
            ring-4 ring-red-200
            text-white
            rounded-xl
          "
          @click="removeArticle"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ExclamationIcon } from '@heroicons/vue/outline'
import { ArticleManager } from '@/services/api/managers/ArticleManager'

export default defineComponent({
  components: { ExclamationIcon },
  props: {
    articleId: {
      type: Number,
      default: null,
    },
  },
  emits: ['closeWindow'],
  methods: {
    async removeArticle() {
      try {
        await ArticleManager.delete(this.$props.articleId)
        await this.$store.dispatch('setArticles')
        this.$emit('closeWindow')
      } catch (error) {
        console.log(error)
      }
    },
  },
})
</script>
