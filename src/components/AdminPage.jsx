import { useState } from 'react'
import { CATEGORIES } from '../data/seed'
import { formatDate, formatPrice } from '../lib/format'
import { ImagePlus, LogOut, Package, Trash2 } from 'lucide-react'

const STATUSES = [
  { id: 'new', label: 'Новый' },
  { id: 'processing', label: 'В работе' },
  { id: 'done', label: 'Выполнен' },
  { id: 'cancelled', label: 'Отменён' },
]

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function AdminPage({
  isAdmin,
  loginAdmin,
  logoutAdmin,
  products,
  orders,
  addProduct,
  deleteProduct,
  updateOrderStatus,
}) {
  const [login, setLogin] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState('products')
  const [form, setForm] = useState({
    name: '',
    category: 'cases',
    price: '',
    description: '',
    image: '',
  })
  const [notice, setNotice] = useState('')

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const ok = loginAdmin(login.trim(), password)
            setError(ok ? '' : 'Неверный логин или пароль.')
          }}
          className="rounded-2xl border border-slate-200 bg-white p-6"
        >
          <h1 className="text-2xl font-bold">Вход в админку</h1>
          <p className="mt-1 text-sm text-slate-500">Доступ только для администратора.</p>
          {error && (
            <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}
          <label className="mt-4 block text-sm">
            Логин
            <input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="mt-3 block text-sm">
            Пароль
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white"
          >
            Войти
          </button>
        </form>
      </div>
    )
  }

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await fileToDataUrl(file)
    setForm((prev) => ({ ...prev, image: dataUrl }))
  }

  function submitProduct(e) {
    e.preventDefault()
    const price = Number(form.price)
    if (!form.name.trim() || !form.description.trim() || !price || !form.image) {
      setNotice('Заполните название, описание, цену в тенге и фото.')
      return
    }
    addProduct({
      name: form.name.trim(),
      category: form.category,
      price,
      description: form.description.trim(),
      image: form.image,
    })
    setForm({
      name: '',
      category: 'cases',
      price: '',
      description: '',
      image: '',
    })
    setNotice('Товар добавлен и сохранён в каталоге.')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Панель администратора</h1>
        <button
          type="button"
          onClick={logoutAdmin}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm"
        >
          <LogOut size={16} />
          Выйти
        </button>
      </div>

      <div className="mb-5 flex gap-2">
        <button
          type="button"
          onClick={() => setTab('products')}
          className={`rounded-xl px-4 py-2 text-sm font-medium ${
            tab === 'products' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200'
          }`}
        >
          Товары
        </button>
        <button
          type="button"
          onClick={() => setTab('orders')}
          className={`rounded-xl px-4 py-2 text-sm font-medium ${
            tab === 'orders' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200'
          }`}
        >
          Заказы ({orders.length})
        </button>
      </div>

      {tab === 'products' && (
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <form
            onSubmit={submitProduct}
            className="h-fit rounded-2xl border border-slate-200 bg-white p-5"
          >
            <h2 className="mb-3 flex items-center gap-2 font-semibold">
              <ImagePlus size={18} />
              Новый товар
            </h2>
            {notice && (
              <p className="mb-3 rounded-xl bg-blue-50 px-3 py-2 text-sm text-blue-800">
                {notice}
              </p>
            )}
            <label className="block text-sm">
              Название
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
            </label>
            <label className="mt-3 block text-sm">
              Категория
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-3 block text-sm">
              Цена, ₸
              <input
                type="number"
                min="1"
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
            </label>
            <label className="mt-3 block text-sm">
              Описание
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
            </label>
            <label className="mt-3 block text-sm">
              Фото
              <input
                type="file"
                accept="image/*"
                onChange={onFile}
                className="mt-1 w-full text-sm"
              />
            </label>
            {form.image && (
              <img
                src={form.image}
                alt="Превью"
                className="mt-3 h-32 w-full rounded-xl object-cover"
              />
            )}
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white"
            >
              Добавить товар
            </button>
          </form>

          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3"
              >
                <img src={p.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-slate-500">{formatPrice(p.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteProduct(p.id)}
                  className="self-start rounded-lg p-2 text-red-600"
                  aria-label="Удалить товар"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              <Package className="mx-auto mb-2" />
              Заказов пока нет.
            </div>
          ) : (
            orders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-slate-500">{formatDate(order.createdAt)}</p>
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-3 text-sm">
                  {order.customer.name}, {order.customer.phone}
                  <br />
                  {order.customer.city}, {order.customer.address}
                </p>
                <ul className="mt-3 space-y-1 text-sm">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.name} × {item.qty}
                      </span>
                      <span>{formatPrice(item.price * item.qty)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-right font-bold">Итого: {formatPrice(order.total)}</p>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  )
}
