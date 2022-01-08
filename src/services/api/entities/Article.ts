import ArticleCategory from '@/services/api/entities/ArticleCategory'

export interface Article {
  id: number,
  code: string,
  name: string,
  price: number,
  category: ArticleCategory
}
