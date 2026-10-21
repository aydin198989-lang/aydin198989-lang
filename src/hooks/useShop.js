import { useCallback, useEffect, useMemo, useState } from 'react'
import { SEED_PRODUCTS } from '../data/seed'
import {
  isAdminSession,
  loadCart,
  loadOrders,
  loadProducts,
  saveCart,
  saveOrders,
  saveProducts,
  setAdminSession,
} from '../lib/storage'

const ADMIN_LOGIN = 'admin'
const ADMIN_PASSWORD = 'admin123'

export function useShop() {
  const [products, setProducts] = useState(() => loadProducts(SEED_PRODUCTS))
  const [cart, setCart] = useState(() => loadCart())
  const [orders, setOrders] = useState(() => loadOrders())
  const [isAdmin, setIsAdmin] = useState(() => isAdminSession())

  useEffect(() => saveProducts(products), [products])
  useEffect(() => saveCart(cart), [cart])
  useEffect(() => saveOrders(orders), [orders])

  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ]
    })
  }, [])

  const updateQty = useCallback((id, qty) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty } : item))
        .filter((item) => item.qty > 0),
    )
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  )

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  )

  const placeOrder = useCallback(
    (customer) => {
      if (cart.length === 0) return null
      const order = {
        id: `ord-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'new',
        customer,
        items: cart,
        total: cartTotal,
      }
      setOrders((prev) => [order, ...prev])
      setCart([])
      return order
    },
    [cart, cartTotal],
  )

  const loginAdmin = useCallback((login, password) => {
    const ok = login === ADMIN_LOGIN && password === ADMIN_PASSWORD
    if (ok) {
      setAdminSession(true)
      setIsAdmin(true)
    }
    return ok
  }, [])

  const logoutAdmin = useCallback(() => {
    setAdminSession(false)
    setIsAdmin(false)
  }, [])

  const addProduct = useCallback((product) => {
    const next = {
      ...product,
      id: `p-${Date.now()}`,
      inStock: true,
    }
    setProducts((prev) => [next, ...prev])
    return next
  }, [])

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateOrderStatus = useCallback((id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }, [])

  return {
    products,
    cart,
    orders,
    isAdmin,
    cartCount,
    cartTotal,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    placeOrder,
    loginAdmin,
    logoutAdmin,
    addProduct,
    deleteProduct,
    updateOrderStatus,
  }
}
