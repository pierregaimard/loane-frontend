import { Article } from '@/services/api/entities/Article'
import { Http } from '@/services/api/client/Http'

const getFormattedArticleData = (formData: Record<any, any>) => {
  return <Article> {
    code: formData.code,
    name: formData.name,
    price: Number(String(formData.price).replace(',', '.')),
    category: {
      id: formData.category,
    },
  }
}

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
    const { data } = await Http.post('articles', getFormattedArticleData(articleData))
    return data
  },

  update: async (articleData: Record<any, any>): Promise<Article> => {
    const { data } = await Http.put(`articles/${articleData.id}`, getFormattedArticleData(articleData))
    return data
  },

  delete: async (id: number): Promise<any> => {
    await Http.delete(`articles/${id}`)
  },
}
