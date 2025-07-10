import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartService from '@/services/api/cartService';

// Async thunks for cart operations
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    const response = await cartService.getCartItems();
    return response;
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (cartItem) => {
    const response = await cartService.addToCart(cartItem);
    return response;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ id, quantity }) => {
    const response = await cartService.updateCartItem(id, { quantity });
    return response;
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (id) => {
    await cartService.removeFromCart(id);
    return id;
  }
);

export const clearAllCart = createAsyncThunk(
  'cart/clearAllCart',
  async () => {
    await cartService.clearCart();
    return [];
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalCount: 0,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.totalCount = action.payload.reduce((total, item) => total + item.quantity, 0);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add item to cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Refresh cart items after adding
        // This will be handled by fetching cart items again
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update cart item quantity
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex(item => item.Id === updatedItem.Id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updatedItem };
          state.totalCount = state.items.reduce((total, item) => total + item.quantity, 0);
        }
      })
      // Remove item from cart
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const removedId = action.payload;
        state.items = state.items.filter(item => item.Id !== removedId);
        state.totalCount = state.items.reduce((total, item) => total + item.quantity, 0);
      })
      // Clear all cart
      .addCase(clearAllCart.fulfilled, (state) => {
        state.items = [];
        state.totalCount = 0;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;