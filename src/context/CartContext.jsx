import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import medusa from '../lib/medusa';

const CartContext = createContext();

const REGION_ID = 'reg_01KM38KEBWAGY16DWNRPSRHG95';

function normalizeCart(medusaCart) {
  if (!medusaCart) return { items: [], subtotal: 0 };

  const items = (medusaCart.items || []).map(item => ({
    id: item.id,
    product_id: item.id, // line item ID used by CartDrawer for update/remove
    quantity: item.quantity,
    product: {
      name: item.title || item.product_title || '',
      slug: item.product?.handle || item.variant?.product?.handle || '',
      price: (item.unit_price || 0) / 100,
      images: item.thumbnail
        ? [item.thumbnail]
        : item.variant?.product?.thumbnail
          ? [item.variant.product.thumbnail]
          : ['https://via.placeholder.com/400x500?text=BLC'],
    }
  }));

  return {
    id: medusaCart.id,
    items,
    subtotal: (medusaCart.subtotal || 0) / 100,
    total: (medusaCart.total || 0) / 100,
  };
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = useCallback(async () => {
    const cartId = localStorage.getItem('medusa_cart_id');
    if (!cartId) return;
    try {
      const { cart: medusaCart } = await medusa.store.cart.retrieve(cartId);
      setCart(normalizeCart(medusaCart));
    } catch (error) {
      console.error('Error fetching cart:', error);
      localStorage.removeItem('medusa_cart_id');
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const ensureCart = async () => {
    let cartId = localStorage.getItem('medusa_cart_id');
    if (!cartId) {
      const { cart: newCart } = await medusa.store.cart.create({ region_id: REGION_ID });
      cartId = newCart.id;
      localStorage.setItem('medusa_cart_id', cartId);
    }
    return cartId;
  };

  const addToCart = async (productHandle, quantity = 1) => {
    setLoading(true);
    try {
      const cartId = await ensureCart();

      // Look up the product by handle to get variant ID
      const { products } = await medusa.store.product.list({ handle: productHandle, region_id: REGION_ID });
      if (!products?.length) throw new Error(`Product not found: ${productHandle}`);

      const variant = products[0].variants?.[0];
      if (!variant) throw new Error(`No variant for product: ${productHandle}`);

      await medusa.store.cart.createLineItem(cartId, {
        variant_id: variant.id,
        quantity,
      });

      await fetchCart();
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (lineItemId, quantity) => {
    setLoading(true);
    try {
      const cartId = localStorage.getItem('medusa_cart_id');
      if (!cartId) return;

      if (quantity <= 0) {
        await medusa.store.cart.deleteLineItem(cartId, lineItemId);
      } else {
        await medusa.store.cart.updateLineItem(cartId, lineItemId, { quantity });
      }
      await fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (lineItemId) => {
    setLoading(true);
    try {
      const cartId = localStorage.getItem('medusa_cart_id');
      if (!cartId) return;
      await medusa.store.cart.deleteLineItem(cartId, lineItemId);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const cartItemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      fetchCart,
      cartItemsCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
