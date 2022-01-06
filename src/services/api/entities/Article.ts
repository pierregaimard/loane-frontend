import ArticleCategory from '@/services/api/entities/ArticleCategory'

export default interface Article {
  id: number,
  code: string,
  name: string,
  price: number,
  category: ArticleCategory
}
