import { Menu, Search, Shield, ShoppingBag, Store, X } from 'lucide-react'

export default function Header({
  page,
  setPage,
  cartCount,
  search,
  onSearch,
  mobileOpen,
  setMobileOpen,
}) {
  const nav = [
    { id: 'catalog', label: 'Каталог', icon: Store },
    { id: 'cart', label: 'Корзина', icon: ShoppingBag },
    { id: 'admin', label: 'Админка', icon: Shield },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Меню"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <button
          type="button"
          onClick={() => setPage('catalog')}
          className="flex items-center gap-2 font-semibold text-slate-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            QG
          </span>
          <span className="hidden sm:block">Qazaq Gadget</span>
        </button>

        <div className="relative mx-auto hidden w-full max-w-md md:block">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Поиск аксессуаров"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const Icon = item.icon
            const active = page === item.id || (item.id === 'catalog' && page === 'product')
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPage(item.id)}
                className={`relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${
                  active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={16} />
                {item.label}
                {item.id === 'cart' && cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-blue-600 px-1.5 text-[11px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={() => setPage('cart')}
          className="relative rounded-xl p-2 text-slate-700 md:hidden"
          aria-label="Корзина"
        >
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <span className="absolute right-0 top-0 rounded-full bg-blue-600 px-1.5 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Поиск аксессуаров"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none"
          />
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-2 md:hidden">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setPage(item.id)
                setMobileOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-slate-700"
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
