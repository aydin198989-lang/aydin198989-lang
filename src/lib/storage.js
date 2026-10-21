const KEYS = {
  products: 'qg_products',
  cart: 'qg_cart',
  orders: 'qg_orders',
  admin: 'qg_admin_session',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadProducts(seed) {
  const stored = read(KEYS.products, null)
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    write(KEYS.products, seed)
    return seed
  }
  return stored
}

export function saveProducts(products) {
  write(KEYS.products, products)
}

export function loadCart() {
  return read(KEYS.cart, [])
}

export function saveCart(cart) {
  write(KEYS.cart, cart)
}

export function loadOrders() {
  return read(KEYS.orders, [])
}

export function saveOrders(orders) {
  write(KEYS.orders, orders)
}

export function isAdminSession() {
  try {
    return sessionStorage.getItem(KEYS.admin) === '1'
  } catch {
    return false
  }
}

export function setAdminSession(on) {
  if (on) sessionStorage.setItem(KEYS.admin, '1')
  else sessionStorage.removeItem(KEYS.admin)
}
