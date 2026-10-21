import { useMemo, useState } from 'react'
import AdminPage from './components/AdminPage.jsx'
import CartPage from './components/CartPage.jsx'
import Catalog from './components/Catalog.jsx'
import CheckoutPage from './components/CheckoutPage.jsx'
import Header from './components/Header.jsx'
import ProductPage from './components/ProductPage.jsx'
import SuccessPage from './components/SuccessPage.jsx'
import { useShop } from './hooks/useShop.js'

export default function App() {
  const shop = useShop()
  const [page, setPage] = useState('catalog')
  const [productId, setProductId] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [maxPrice, setMaxPrice] = useState(20000)
  const [sort, setSort] = useState('name')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)
  const [toast, setToast] = useState('')

  const product = useMemo(
    () => shop.products.find((p) => p.id === productId) || null,
    [shop.products, productId],
  )

  function showToast(message) {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  function addAndNotify(item) {
    shop.addToCart(item)
    showToast('Товар добавлен в корзину')
  }

  return (
    <div className="min-h-screen">
      <Header
        page={page}
        setPage={setPage}
        cartCount={shop.cartCount}
        search={search}
        setSearch={setSearch}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {page === 'catalog' && (
        <Catalog
          products={shop.products}
          search={search}
          category={category}
          setCategory={setCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sort={sort}
          setSort={setSort}
          onOpenProduct={(id) => {
            setProductId(id)
            setPage('product')
          }}
          onAddToCart={addAndNotify}
        />
      )}

      {page === 'product' && (
        <ProductPage
          product={product}
          onBack={() => setPage('catalog')}
          onAddToCart={addAndNotify}
        />
      )}

      {page === 'cart' && (
        <CartPage
          cart={shop.cart}
          cartTotal={shop.cartTotal}
          updateQty={shop.updateQty}
          removeFromCart={shop.removeFromCart}
          onCheckout={() => setPage('checkout')}
          onCatalog={() => setPage('catalog')}
        />
      )}

      {page === 'checkout' && (
        <CheckoutPage
          cart={shop.cart}
          cartTotal={shop.cartTotal}
          onBack={() => setPage('cart')}
          onPlaceOrder={(customer) => {
            const order = shop.placeOrder(customer)
            if (order) {
              setLastOrder(order)
              setPage('success')
            }
          }}
        />
      )}

      {page === 'success' && (
        <SuccessPage order={lastOrder} onCatalog={() => setPage('catalog')} />
      )}

      {page === 'admin' && (
        <AdminPage
          isAdmin={shop.isAdmin}
          loginAdmin={shop.loginAdmin}
          logoutAdmin={shop.logoutAdmin}
          products={shop.products}
          orders={shop.orders}
          addProduct={shop.addProduct}
          deleteProduct={shop.deleteProduct}
          updateOrderStatus={shop.updateOrderStatus}
        />
      )}

      {toast && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
