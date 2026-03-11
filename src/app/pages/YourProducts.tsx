import { useApp } from '../context/AppContext';
import { Package, Edit2, Trash2, FileEdit, Briefcase, Leaf, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

export default function YourProducts() {
  const { products, deleteProduct } = useApp();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set());

  const toggleBrandExpand = (productId: string) => {
    setExpandedBrands(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleDelete = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-6 animate-slideInUp">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#745b4e] via-[#215b2f] to-[#745b4e] bg-clip-text text-transparent mb-2">Your Products</h1>
        <p className="text-[#bab0aa] text-lg">Manage and track all your products</p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-16 text-center border border-[#bab0aa]/20 shadow-xl animate-scaleIn">
          
          <p className="text-[#745b4e] text-lg mb-8 font-medium">No products yet. Start by adding your first product!</p>
          <Link
            to="/add-product"
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-[#215b2f] via-[#215b2f] to-[#1a4825] text-white font-semibold hover:shadow-2xl hover:shadow-[#215b2f]/30 transition-all duration-300 hover:scale-105"
          >
            Add Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 animate-fadeIn">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden border border-[#bab0aa]/20 shadow-lg hover:shadow-2xl hover:shadow-[#215b2f]/10 transition-all duration-300 hover:scale-[1.02] relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square bg-gradient-to-br from-[#f9f6f9] to-[#bab0aa]/20 relative overflow-hidden group">
                {product.initialImage || product.marketReady?.images[0] || product.ecoReady?.images[0] ? (
                  <>
                    <img
                      src={product.initialImage || product.marketReady?.images[0] || product.ecoReady?.images[0]}
                      alt={product.productName}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-8 h-8 text-[#bab0aa]" />
                  </div>
                )}
              </div>

              <div className="p-3">
                {/* Brand Name Section */}
                <div className="mb-2">
                  <div className="flex items-start gap-1 flex-wrap">
                    {/* Brand Name */}
                    <p className={`font-bold text-[#dea94d] text-xs tracking-wide uppercase ${
                      expandedBrands.has(product.id) ? 'whitespace-normal' : 'truncate flex-1 min-w-0'
                    }`}>
                      {product.brandName}
                    </p>
                    
                    {/* More/Less Button */}
                    <button
                      onClick={() => toggleBrandExpand(product.id)}
                      className="text-[#215b2f] hover:text-[#1a4825] transition-colors flex items-center gap-0.5 flex-shrink-0"
                      title={expandedBrands.has(product.id) ? "Show less" : "More details"}
                    >
                      <span className="text-[9px] font-semibold">
                        {expandedBrands.has(product.id) ? "Less" : "More"}
                      </span>
                      {expandedBrands.has(product.id) ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                    
                    {/* Action Buttons - at the end of text */}
                    <div className="flex gap-1 flex-shrink-0">
                      {/* Edit Product Button */}
                      <Link
                        to={`/edit-product/${product.id}`}
                        title="Edit Product Details"
                        className="w-6 h-6 rounded-md bg-white border border-[#bab0aa]/30 flex items-center justify-center hover:bg-[#215b2f] hover:border-[#215b2f] active:bg-[#215b2f] active:border-[#215b2f] text-[#745b4e] hover:text-white active:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                      >
                        <FileEdit className="w-3 h-3" />
                      </Link>
                      {/* Market Ready Edit Button */}
                      <Link
                        to={`/market-ready/${product.id}`}
                        title="Edit Market Ready"
                        className="w-6 h-6 rounded-md bg-white border border-[#bab0aa]/30 flex items-center justify-center hover:bg-[#215b2f] hover:border-[#215b2f] text-[#745b4e] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                      >
                        <Briefcase className="w-3 h-3" />
                      </Link>
                      {/* Eco Ready Edit Button */}
                      <Link
                        to={product.status === 'incomplete' ? '#' : `/eco-ready/${product.id}`}
                        title="Edit Eco Ready"
                        className={`w-6 h-6 rounded-md bg-white border border-[#bab0aa]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm ${
                          product.status === 'incomplete'
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-[#215b2f] hover:border-[#215b2f] text-[#745b4e] hover:text-white'
                        }`}
                        onClick={(e) => {
                          if (product.status === 'incomplete') {
                            e.preventDefault();
                          }
                        }}
                      >
                        <Leaf className="w-3 h-3" />
                      </Link>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(product.id)}
                        title="Delete Product"
                        className="w-6 h-6 rounded-md bg-white border border-[#bab0aa]/30 flex items-center justify-center hover:bg-red-500 hover:border-red-500 text-[#745b4e] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-[#745b4e] mb-1 line-clamp-2 min-h-[32px]">{product.productName}</h3>
                <p className="text-[9px] mb-2 text-[#bab0aa] font-medium truncate">{product.productCode}</p>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-[9px] mb-1">
                    <span className="text-[#745b4e] font-semibold">Progress</span>
                    <span className="text-[#215b2f] font-bold">{product.progress}%</span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-[#f9f6f9] to-[#bab0aa]/10 rounded-full h-2 overflow-hidden shadow-inner">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#215b2f] via-[#215b2f] to-[#1a4825] shadow-lg transition-all duration-500"
                      style={{ width: `${product.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1">
                  <Link
                    to={`/market-ready/${product.id}`}
                    className={`flex-1 py-2 px-2 rounded-lg text-[10px] font-bold text-center transition-all duration-300 ${
                      product.status === 'incomplete'
                        ? 'bg-gradient-to-r from-[#215b2f] to-[#1a4825] text-white hover:shadow-lg hover:shadow-[#215b2f]/30 hover:scale-105'
                        : 'bg-[#f9f6f9] text-[#bab0aa] cursor-default'
                    }`}
                  >
                    Market
                  </Link>
                  <Link
                    to={product.status === 'incomplete' ? '#' : `/eco-ready/${product.id}`}
                    className={`flex-1 py-2 px-2 rounded-lg text-[10px] font-bold text-center transition-all duration-300 ${
                      product.status === 'market-ready' || product.status === 'eco-ready'
                        ? 'bg-gradient-to-r from-[#215b2f] to-[#1a4825] text-white hover:shadow-lg hover:shadow-[#215b2f]/30 hover:scale-105'
                        : 'bg-[#bab0aa]/20 text-[#bab0aa] cursor-not-allowed'
                    }`}
                    onClick={(e) => {
                      if (product.status === 'incomplete') {
                        e.preventDefault();
                      }
                    }}
                  >
                    Eco
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl text-center border border-[#bab0aa]/20 shadow-xl animate-scaleIn px-[25px] py-[15px]">
            <p className="text-[#745b4e] text-lg mb-8 font-medium">Are you sure you want to delete this product?</p>
            <div className="flex justify-center">
              <button
                onClick={confirmDelete}
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-[#215b2f] via-[#215b2f] to-[#1a4825] text-white font-semibold hover:shadow-2xl hover:shadow-[#215b2f]/30 transition-all duration-300 hover:scale-105 mr-4 px-[20px] py-[10px]"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-[#215b2f] via-[#215b2f] to-[#1a4825] text-white font-semibold hover:shadow-2xl hover:shadow-[#215b2f]/30 transition-all duration-300 hover:scale-105 px-[20px] py-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}