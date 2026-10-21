import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { CATEGORIES } from '../data/seed'
import { formatPrice } from '../lib/format'

export default function ProductPage({ product, onBack, onAddToCart }) {
  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <p className="mb-4 text-slate-500">Товар не найден.</p>
        <button type="button" onClick={onBack} className="text-blue-600">
          Вернуться в каталог
        </button>
      </div>
    )
  }

  const categoryName =
    CATEGORIES.find((c) => c.id === product.category)?.name || product.category

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm text-slate-600"
      >
        <ArrowLeft size={16} />
        Назад в каталог
      </button>
      <div className="grid gap-6 overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover md:h-full"
        />
        <div className="p-6">
          <p className="text-sm text-blue-600">{categoryName}</p>
          <h1 className="mt-1 text-2xl font-bold">{product.name}</h1>
          <p className="mt-3 text-slate-600">{product.description}</p>
          <p className="mt-6 text-3xl font-bold">{formatPrice(product.price)}</p>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <ShoppingCart size={18} />
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  )
}
