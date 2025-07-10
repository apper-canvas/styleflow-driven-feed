import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import CategoryCard from "@/components/molecules/CategoryCard";
import ProductGrid from "@/components/organisms/ProductGrid";
import ApperIcon from "@/components/ApperIcon";

const Home = () => {
  const categories = [
    {
      name: "Men's Fashion",
      image: "/api/placeholder/400/300",
      link: "/category/men"
    },
    {
      name: "Women's Fashion",
      image: "/api/placeholder/400/300",
      link: "/category/women"
    },
    {
      name: "Kids Collection",
      image: "/api/placeholder/400/300",
      link: "/category/kids"
    },
    {
      name: "Beauty & Care",
      image: "/api/placeholder/400/300",
      link: "/category/beauty"
    }
  ];

  const brands = [
    { name: "Nike", logo: "/api/placeholder/120/60" },
    { name: "Adidas", logo: "/api/placeholder/120/60" },
    { name: "Zara", logo: "/api/placeholder/120/60" },
    { name: "H&M", logo: "/api/placeholder/120/60" },
    { name: "Uniqlo", logo: "/api/placeholder/120/60" },
    { name: "Levi's", logo: "/api/placeholder/120/60" }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold font-display mb-6"
            >
              Discover Your
              <span className="block text-yellow-300">Perfect Style</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8 text-white text-opacity-90"
            >
              Explore our curated collection of premium fashion and accessories. 
              From trending styles to timeless classics, find everything you need to express your unique personality.
            </motion.p>
            
<motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Link to="/category/men">
                  Shop Men's Collection
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="/category/women">
                  Shop Women's Collection
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-secondary mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our diverse range of fashion categories, carefully curated to match every style and occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CategoryCard
                category={category.name}
                image={category.image}
                link={category.link}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-secondary mb-4">Trending Now</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out our most popular items that are flying off the shelves this season.
          </p>
        </motion.div>

        <ProductGrid limit={8} />

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/category/women" className="flex items-center gap-2">
              View All Products
              <ApperIcon name="ArrowRight" size={16} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary mb-4">Featured Brands</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Shop from your favorite brands and discover new ones that match your style.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-secondary to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
              Be the first to know about new arrivals, exclusive sales, and fashion tips. 
              Join our community of style enthusiasts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="primary" size="lg" className="bg-primary hover:bg-opacity-90">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;