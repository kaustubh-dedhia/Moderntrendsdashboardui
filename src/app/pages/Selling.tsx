import { useApp } from '../context/AppContext';
import { Package, Eye, Star, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

export default function Selling() {
  const { products } = useApp();
  const sellingProducts = products.filter((p) => p.status === 'eco-ready');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="mb-4 text-center">
        
        <h1 className="font-bold text-[#2d2d2d] mb-3 text-[32px]">
          Shop Our Products
        </h1>
        <p className="text-[#6b6b6b] max-w-2xl mx-auto text-[15px]">
          Discover our curated collection of eco-ready products, designed with precision and crafted for excellence
        </p>
      </div>

      {sellingProducts.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-16 text-center border border-[#bab0aa]/20 shadow-xl">
          <Package className="w-20 h-20 text-[#bab0aa] mx-auto mb-6" />
          <p className="text-[#745b4e] text-lg mb-8 font-medium">
            No products ready for sale yet. Complete Eco Ready to list products here!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-[#215b2f] via-[#215b2f] to-[#1a4825] text-white font-semibold hover:shadow-2xl hover:shadow-[#215b2f]/30 transition-all duration-300 hover:scale-105"
          >
            View Products
          </Link>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
            {sellingProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-lg overflow-hidden border border-[#e8e6e3] hover:shadow-xl transition-all duration-300 hover:scale-105 relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image */}
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-square bg-gradient-to-br from-[#f9f6f9] to-[#f5f3f0] relative overflow-hidden">
                    {product.ecoReady?.images[0] || product.marketReady?.images[0] ? (
                      <img
                        src={product.ecoReady?.images[0] || product.marketReady?.images[0]}
                        alt={product.productName}
                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-[#d4d2cf]" />
                      </div>
                    )}
                    
                    {/* Badge */}
                    

                    {/* Hover Actions */}
                    <div className={`absolute top-1 right-1 flex flex-col gap-1 transition-opacity duration-300 ${
                      hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      
                      <button className="w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#215b2f] hover:text-white transition-all">
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Quick Add to Cart on Hover */}
                    <div className={`absolute bottom-0 left-0 right-0 p-1 transition-all duration-300 ${
                      hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}>
                      <button className="w-full flex items-center justify-center gap-1 px-1.5 py-1 rounded-md bg-[#215b2f] text-white text-[9px] font-semibold hover:bg-[#1a4825] shadow-xl transition-all">
                        <ShoppingCart className="w-2.5 h-2.5" />
                        Add
                      </button>
                    </div>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-1.5">
                  <p className="text-[8px] text-[#215b2f] font-semibold mb-0.5 uppercase tracking-wide">
                    {product.brandName}
                  </p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-[11px] font-semibold text-[#2d2d2d] mb-1 line-clamp-2 group-hover:text-[#215b2f] transition-colors min-h-[28px]">
                      {product.productName}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-2 h-2 ${
                          i < 4 ? 'fill-[#dea94d] text-[#dea94d]' : 'text-[#d4d2cf]'
                        }`}
                      />
                    ))}
                    <span className="text-[8px] text-[#6b6b6b] ml-0.5">4.9</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-[#215b2f]">
                        {product.ecoReady?.price || '$99.99'}
                      </span>
                      <span className="text-[8px] text-[#bab0aa] line-through">
                        $129
                      </span>
                    </div>
                  </div>

                  {/* Tagline */}
                  {product.ecoReady?.tagline && (
                    <p className="text-[8px] text-[#745b4e] mt-1 line-clamp-1 italic">
                      {product.ecoReady.tagline}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          
        </>
      )}
    </div>
  );
}