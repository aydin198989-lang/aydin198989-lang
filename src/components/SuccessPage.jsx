import { CheckCircle } from 'lucide-react'
import { formatPrice } from '../lib/format'

export default function SuccessPage({ order, onCatalog }) {
  if (!order) return null

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <CheckCircle className="mx-auto text-green-600" size={48} />
      <h1 className="mt-4 text-2xl font-bold">Заказ оформлен</h1>
      <p className="mt-2 text-slate-600">
        Номер заказа: <span className="font-medium">{order.id}</span>
      </p>
      <p className="mt-1 text-slate-600">Сумма: {formatPrice(order.total)}</p>
      <p className="mt-3 text-sm text-slate-500">
        Мы свяжемся с вами по телефону {order.customer.phone} для подтверждения доставки.
      </p>
      <button
        type="button"
        onClick={onCatalog}
        className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white"
      >
        Вернуться в каталог
      </button>
    </div>
  )
}
