import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import QuickViewModal from "@/components/molecules/QuickViewModal";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { addToCart, addToWishlist } from "@/services/api/cartService";
function ProductCard({ product }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0

  const fallbackImages = [
    product.images?.[0],
    `https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=${encodeURIComponent(product.name?.substring(0, 20) || 'Product')}`,
    `https://picsum.photos/300/400?random=${product.Id}`,
    null // Will show color placeholder
  ]

  async function handleAddToCart(e) {
    e.preventDefault()
    e.stopPropagation()
    
    if (isAddingToCart) return
    
    setIsAddingToCart(true)
    
    try {
      await addToCart(product.Id, 1)
      toast.success(`${product.name} added to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add item to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  async function handleAddToWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    
    if (isAddingToWishlist) return
    
    setIsAddingToWishlist(true)
    
    try {
      await addToWishlist(product.Id)
      toast.success(`${product.name} added to wishlist!`)
    } catch (error) {
      console.error('Error adding to wishlist:', error)
      toast.error('Failed to add item to wishlist')
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  function handleImageError() {
    console.warn(`Image failed to load for product ${product.Id}:`, fallbackImages[retryCount])
    
    if (retryCount < fallbackImages.length - 1) {
      setRetryCount(prev => prev + 1)
      setImageError(false)
      setImageLoading(true)
    } else {
      setImageError(true)
      setImageLoading(false)
    }
  }

  function handleImageLoad() {
    setImageLoading(false)
    setImageError(false)
  }

  function handleMouseEnter(e) {
    setIsHovered(true)
    handleMouseMove(e)
  }

  function handleMouseLeave() {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  function handleMouseMove(e) {
    if (!isHovered) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const renderImage = () => {
    const currentImage = fallbackImages[retryCount]
    
    if (imageError || !currentImage) {
      // Color placeholder fallback
      return (
        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <ApperIcon name="Image" className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">{product.name?.substring(0, 20) || 'Product'}</p>
            <p className="text-xs">{product.brand || 'No Image'}</p>
          </div>
        </div>
      )
    }

    return (
      <>
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={currentImage}
          alt={product.name}
          className={`w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </>
    )
  }

return (
    <>
      <Link to={`/product/${product.Id}`}>
        <motion.div
          className="group bg-surface rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden relative cursor-pointer"
          whileHover={{ y: -2 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={() => setIsQuickViewOpen(true)}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden">
            {/* Discount Badge */}
            {renderImage()}
            
            {discountPercentage > 0 && (
              <Badge variant="sale" className="absolute top-2 left-2 transform -rotate-12">
                {discountPercentage}% OFF
              </Badge>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              className="absolute top-2 right-2 flex flex-col gap-2"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddToWishlist}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
              >
                <ApperIcon name="Heart" size={16} />
              </Button>
            </motion.div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium text-secondary line-clamp-1">{product.brand}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.name}</p>
            
            <div className="flex items-center gap-2 mt-2">
              {product.discountPrice ? (
                <>
                  <span className="text-lg font-semibold text-secondary">
                    ₹{product.discountPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-lg font-semibold text-secondary">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>
            
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {product.sizes.slice(0, 4).map((size) => (
                  <span
                    key={size}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {size}
                  </span>
                ))}
                {product.sizes.length > 4 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    +{product.sizes.length - 4}
                  </span>
                )}
              </div>
            )}
            
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                height: isHovered ? "auto" : 0 
              }}
              className="overflow-hidden mt-3"
            >
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="w-full"
                size="sm"
              >
                {isAddingToCart ? (
                  <ApperIcon name="Loader2" size={16} className="animate-spin" />
                ) : !product.inStock ? (
                  "Out of Stock"
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Link>
      
      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isVisible={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        mousePosition={mousePosition}
      />
    </>
<Button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className="w-full"
              size="sm"
            >
              {isAddingToCart ? (
                <ApperIcon name="Loader2" size={16} className="animate-spin" />
              ) : !product.inStock ? (
                "Out of Stock"
              ) : (
                "Add to Cart"
              )}
            </Button>
  );
};

export default ProductCard;