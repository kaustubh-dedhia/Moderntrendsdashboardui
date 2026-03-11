import { useApp } from '../context/AppContext';
import { TrendingUp, Package, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router';

export default function Dashboard() {
  const { products } = useApp();

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Market Ready',
      value: products.filter((p) => p.status === 'market-ready' || p.status === 'eco-ready').length,
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
    },
    {
      label: 'Eco Ready',
      value: products.filter((p) => p.status === 'eco-ready').length,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Growth',
      value: '+24%',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const ecoReadyProducts = products.filter((p) => p.status === 'eco-ready');

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-6 animate-slideInUp">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#745b4e] via-[#215b2f] to-[#745b4e] bg-clip-text text-transparent mb-2">Dashboard</h1>
        <p className="text-[#bab0aa] text-lg">Overview of your product management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fadeIn">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            null
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="mb-4 animate-slideInUp">
        <h2 className="text-3xl font-bold text-[#745b4e] mb-2">Featured Products</h2>
        <p className="text-[#bab0aa]">Your eco-ready collection</p>
      </div>

      {ecoReadyProducts.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-16 text-center border border-[#bab0aa]/20 shadow-xl animate-scaleIn">
          
          <p className="text-[#745b4e] text-lg mb-8 font-medium">No completed products yet. Start by adding your first product!</p>
          <Link
            to="/add-product"
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-[#215b2f] via-[#215b2f] to-[#1a4825] text-white font-semibold hover:shadow-2xl hover:shadow-[#215b2f]/30 transition-all duration-300 hover:scale-105"
          >
            Add Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 animate-fadeIn">
          {ecoReadyProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden border border-[#bab0aa]/20 shadow-lg hover:shadow-2xl hover:shadow-[#215b2f]/10 transition-all duration-300 group hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square bg-gradient-to-br from-[#f9f6f9] to-[#bab0aa]/20 relative overflow-hidden">
                {product.initialImage || product.ecoReady?.images[0] || product.marketReady?.images[0] ? (
                  <>
                    <img
                      src={product.initialImage || product.ecoReady?.images[0] || product.marketReady?.images[0]}
                      alt={product.productName}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-8 h-8 text-[#bab0aa]" />
                  </div>
                )}
                <div className="absolute top-1.5 right-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#215b2f] to-[#1a4825] text-white text-[9px] font-bold shadow-lg shadow-[#215b2f]/50">
                    {product.progress}%
                  </span>
                </div>
              </div>
              <div className="p-2">
                <p className="text-[8px] text-[#dea94d] font-bold mb-0.5 tracking-wide uppercase">{product.brandName}</p>
                <h3 className="text-[11px] font-bold text-[#745b4e] mb-0.5 group-hover:text-[#215b2f] transition-colors line-clamp-2 min-h-[28px]">{product.productName}</h3>
                <p className="text-[8px] text-[#bab0aa] mb-1.5 font-medium truncate">{product.productCode}</p>
                <div className="w-full bg-gradient-to-r from-[#f9f6f9] to-[#bab0aa]/10 rounded-full h-1.5 overflow-hidden shadow-inner">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-[#215b2f] via-[#215b2f] to-[#1a4825] shadow-lg transition-all duration-500"
                    style={{ width: `${product.progress}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}