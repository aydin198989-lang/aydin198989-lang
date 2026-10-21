import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatPrice } from '../lib/format'

export default function CartPage({
  cart,
  cartTotal,
  updateQty,
  removeFromCart,
  onCheckout,
  onCatalog,
}) {
  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Корзина пуста</h1>
        <p className="mt-2 text-slate-500">Добавьте аксессуары из каталога.</p>
        <button
          type="button"
          onClick={onCatalog}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white"
        >
          Перейти в каталог
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">Корзина</h1>
      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-full rounded-xl object-cover sm:h-20 sm:w-20"
            />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-slate-500">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQty(item.id, item.qty - 1)}
                className="rounded-lg border border-slate-200 p-2"
                aria-label="Уменьшить"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-medium">{item.qty}</span>
              <button
                type="button"
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="rounded-lg border border-slate-200 p-2"
                aria-label="Увеличить"
              >
                <Plus size={14} />
              </button>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="ml-2 rounded-lg p-2 text-red-600"
                aria-label="Удалить"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="min-w-[110px] text-right font-semibold">
              {formatPrice(item.price * item.qty)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-500">Итого к оплате</p>
          <p className="text-2xl font-bold">{formatPrice(cartTotal)}</p>
        </div>
        <button
          type="button"
          onClick={onCheckout}
          className="w-full rounded-xl bg-blue-600 px-6 py-3 font-medium text-white sm:w-auto"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  )
}
