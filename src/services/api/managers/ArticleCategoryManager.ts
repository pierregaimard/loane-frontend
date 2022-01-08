import ArticleCategory from '@/services/api/entities/ArticleCategory'
import { Http } from '@/services/api/client/Http'

export const ArticleCategoryManager = {
  find: async (): Promise<ArticleCategory[]> => {
    const { data } = await Http.get('articles-categories')
    return data
  },

  findOne: async (id: number): Promise<ArticleCategory> => {
    const { data } = await Http.get(`articles-categories/${id}`)
    return data
  },
}
