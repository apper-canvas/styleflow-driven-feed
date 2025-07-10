import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { updateCartItemQuantity, removeItemFromCart } from "@/store/cartSlice";

const CartItem = ({ item, onUpdate, onRemove }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsLoading(true);
    try {
      await dispatch(updateCartItemQuantity({ id: item.Id, quantity: newQuantity })).unwrap();
      onUpdate();
      toast.success("Cart updated successfully!");
    } catch (error) {
      toast.error("Failed to update cart");
    } finally {
      setIsLoading(false);
    }
  };

const handleRemove = async () => {
    setIsLoading(true);
    try {
      await dispatch(removeItemFromCart(item.Id)).unwrap();
      onRemove();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = item.product.discountPrice 
    ? item.product.discountPrice * item.quantity
    : item.product.price * item.quantity;

  return (
    <div className="flex items-center gap-4 p-4 bg-surface rounded-lg shadow-card">
      <img
        src={item.product.images?.[0] || "/api/placeholder/80/100"}
        alt={item.product.name}
        className="w-20 h-24 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h4 className="font-medium text-secondary">{item.product.brand}</h4>
        <p className="text-sm text-gray-600 line-clamp-1">{item.product.name}</p>
        
        <div className="flex items-center gap-4 mt-2">
          {item.size && (
            <span className="text-sm text-gray-500">Size: {item.size}</span>
          )}
          {item.color && (
            <span className="text-sm text-gray-500">Color: {item.color}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isLoading || item.quantity <= 1}
              className="p-1 w-8 h-8"
            >
              <ApperIcon name="Minus" size={14} />
            </Button>
            
            <span className="mx-2 font-medium">{item.quantity}</span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isLoading}
              className="p-1 w-8 h-8"
            >
              <ApperIcon name="Plus" size={14} />
            </Button>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-semibold text-secondary">
              ₹{totalPrice.toLocaleString()}
            </div>
            {item.product.discountPrice && (
              <div className="text-sm text-gray-500 line-through">
                ₹{(item.product.price * item.quantity).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        disabled={isLoading}
        className="p-2 text-error hover:bg-error hover:text-white"
      >
        <ApperIcon name="Trash2" size={16} />
      </Button>
    </div>
  );
};

export default CartItem;