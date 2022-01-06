import Article from '@/services/api/entities/Article'
import { Http } from '@/services/api/client/Http'

export const ArticleManager = {
  find: async (): Promise<Article[]> => {
    const { data } = await Http.get('articles')
    return data
  },

  findByCategory: async (categoryId: number): Promise<Article[]> => {
    const { data } = await Http.get(`articles?categoryId=${categoryId}`)
    return data
  },

  findOne: async (id: number): Promise<Article> => {
    const { data } = await Http.get(`articles/${id}`)
    return data
  },

  create: async (articleData: Record<any, any>): Promise<Article> => {
    const formattedData = <Article> {
      code: articleData.code,
      name: articleData.name,
      price: articleData.price,
      category: {
        id: articleData.category,
      },
    }

    const { data } = await Http.post('articles', formattedData)
    return data
  },
}
