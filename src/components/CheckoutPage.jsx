import { useState } from 'react'
import { formatPrice } from '../lib/format'

export default function CheckoutPage({ cart, cartTotal, onBack, onPlaceOrder }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: 'Алматы',
    address: '',
    comment: '',
  })
  const [error, setError] = useState('')

  function change(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function submit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError('Укажите имя, телефон и адрес доставки.')
      return
    }
    onPlaceOrder(form)
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 lg:grid-cols-[1fr_320px]">
      <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5">
        <h1 className="mb-4 text-2xl font-bold">Оформление заказа</h1>
        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Имя
            <input
              name="name"
              value={form.name}
              onChange={change}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              required
            />
          </label>
          <label className="block text-sm">
            Телефон
            <input
              name="phone"
              value={form.phone}
              onChange={change}
              placeholder="+7 700 000 00 00"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              required
            />
          </label>
          <label className="block text-sm">
            Город
            <input
              name="city"
              value={form.city}
              onChange={change}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            Адрес доставки
            <input
              name="address"
              value={form.address}
              onChange={change}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              required
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            Комментарий
            <textarea
              name="comment"
              value={form.comment}
              onChange={change}
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
        </div>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-slate-200 px-4 py-3"
          >
            Назад
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white"
          >
            Подтвердить заказ
          </button>
        </div>
      </form>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 font-semibold">Ваш заказ</h2>
        <ul className="space-y-2 text-sm">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span>
                {item.name} × {item.qty}
              </span>
              <span className="font-medium">{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 font-bold">
          <span>Итого</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
      </aside>
    </div>
  )
}
