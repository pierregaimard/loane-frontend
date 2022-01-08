<template>
  <main class="px-10 max-w-screen-lg mx-auto">
    <div class="flex justify-end">
      <router-link
        :to="{ name: 'ArticlesAdd' }"
        class="
          flex items-center
          font-bold text-pink-300
          px-2 py-1
          rounded-lg
          bg-white
          border-2
          border-pink-200
          ring-4 ring-pink-100
          transform ease-in-out duration-100 hover:scale-105
        "
      >
        <PlusCircleIcon class="w-8 h-8 mr-1" />
        Ajouter un article
      </router-link>
    </div>
    <h1
      class="
        text-pink-400 text-5xl text-center
        my-6
      "
    >
      Mes articles
    </h1>
    <div
      v-for="article in $store.state.articles"
      :key="article.id"
      class="
        p-3 my-3
        border
        hover:shadow
        rounded-xl
        flex justify-between items-center
      "
      :class="articleBoxColor(article.category.color)"
    >
      <div class="text-gray-600 flex items-center">
        <HeroIcon
          :icon="article.category.icon"
          class="h-8 mr-3"
          :class="`text-${article.category.color}`"
        />
        {{ article.code }} - <strong class="font-bold ml-2">{{ article.name }}</strong>
        <em
          class="px-2 py-1 ml-2 rounded-xl text-white"
          :class="articleBackgroundColor(article.category.color)">
          {{ article.price }} €
        </em>
      </div>
      <div>
        <router-link
          :to="{ name: 'ArticleUpdate', params: { id: article.id } }"
          class="
            mr-4 px-3 py-1
            bg-pink-300 hover:bg-pink-400
            ring-4 ring-pink-100
            rounded-xl
            font-bold
            text-white
          "
        >
          Modifier
        </router-link>

        <button
          class="
            px-3 py-1
            bg-pink-300 hover:bg-pink-400
            ring-4 ring-pink-100
            rounded-xl
            font-bold
            text-white
          "
          @click="displayArticleDelete(article.id)"
        >
          Supprimer
        </button>
      </div>
    </div>
    <ArticleDelete
      v-show="deleteArticleVisibility"
      :article-id="deleteArticleId"
      @close-window="deleteArticleVisibility = false"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { PlusCircleIcon } from '@heroicons/vue/outline'
import { useStore } from 'vuex'
import HeroIcon from '@/components/utils/HeroIcon.vue'
import ArticleDelete from '@/components/article/ArticleDelete.vue'

export default defineComponent({
  components: {
    HeroIcon,
    ArticleDelete,
    PlusCircleIcon,
  },
  setup() {
    const store = useStore()
    const deleteArticleVisibility = ref(false)
    const deleteArticleId = ref<number | null>(null)

    onBeforeMount(() => {
      store.dispatch('setArticles', { category: null })
    })

    return {
      deleteArticleVisibility,
      deleteArticleId,
    }
  },
  methods: {
    articleBoxColor(color: string) {
      return `border-${color}`
    },
    articleBackgroundColor(color: string) {
      return `bg-${color}`
    },
    displayArticleDelete(id: number) {
      this.deleteArticleId = id
      this.deleteArticleVisibility = true
    },
  },
})
</script>

<style lang="scss">
h1 {
  font-family: 'Leckerli One', cursive;
}
</style>
