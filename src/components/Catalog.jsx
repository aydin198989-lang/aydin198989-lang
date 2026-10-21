import { Filter, ShoppingCart } from 'lucide-react'
import { CATEGORIES } from '../data/seed'
import { formatPrice } from '../lib/format'

export default function Catalog({
  products,
  search,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  onOpenProduct,
  onAddToCart,
}) {
  const priceCap = Math.max(...products.map((p) => p.price), 20000)

  const filtered = products
    .filter((p) => (category === 'all' ? true : p.category === category))
    .filter((p) => p.price <= maxPrice)
    .filter((p) => {
      const q = search.trim().toLowerCase()
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      return a.name.localeCompare(b.name, 'ru')
    })

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-4 flex items-center gap-2 font-semibold">
          <Filter size={16} />
          Фильтры
        </div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Категория
        </p>
        <div className="mb-5 flex flex-wrap gap-2 lg:flex-col">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-xl px-3 py-2 text-left text-sm ${
                category === c.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
          Цена до {formatPrice(maxPrice)}
        </label>
        <input
          type="range"
          min={1000}
          max={priceCap}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />

        <label className="mb-2 mt-5 block text-xs font-medium uppercase tracking-wide text-slate-500">
          Сортировка
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
        >
          <option value="name">По названию</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
        </select>
      </aside>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold">Каталог аксессуаров</h1>
            <p className="text-sm text-slate-500">Найдено: {filtered.length}</p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Ничего не найдено. Измените фильтры или поисковый запрос.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => onOpenProduct(product.id)}
                  className="block aspect-[4/3] overflow-hidden bg-slate-100"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition hover:scale-105"
                  />
                </button>
                <div className="flex flex-1 flex-col p-4">
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <ShoppingCart size={16} />
                      В корзину
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
