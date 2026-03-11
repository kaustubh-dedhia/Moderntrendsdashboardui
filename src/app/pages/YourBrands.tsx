import { useApp } from '../context/AppContext';
import { Store, Package, Image, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

export default function YourBrands() {
  const { products, getBrandLogo, deleteProduct } = useApp();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  const toggleProductExpand = (productId: string) => {
    setExpandedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleDelete = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  // Group products by brand
  const brandGroups = products.reduce((acc, product) => {
    if (!acc[product.brandName]) {
      acc[product.brandName] = [];
    }
    acc[product.brandName].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  const brands = Object.keys(brandGroups);

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-6 animate-slideInUp">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#745b4e] via-[#215b2f] to-[#745b4e] bg-clip-text text-transparent mb-2">Your Brands</h1>
        <p className="text-[#bab0aa] text-lg">Manage your product brands</p>
      </div>

      {brands.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-16 text-center border border-[#bab0aa]/20 shadow-xl animate-scaleIn">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#f9f6f9] to-[#bab0aa]/20 flex items-center justify-center">
            <Store className="w-12 h-12 text-[#bab0aa]" />
          </div>
          <p className="text-[#745b4e] text-lg mb-8 font-medium">No brands yet. Add your first product to create a brand!</p>
          <Link
            to="/add-product"
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-[#215b2f] via-[#215b2f] to-[#1a4825] text-white font-semibold hover:shadow-2xl hover:shadow-[#215b2f]/30 transition-all duration-300 hover:scale-105"
          >
            Add Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 animate-fadeIn">
          {brands.map((brandName, brandIndex) => {
            const brandLogo = getBrandLogo(brandName);
            
            return (
              <div
                key={brandName}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-[#bab0aa]/20 shadow-lg hover:shadow-2xl hover:shadow-[#215b2f]/10 transition-all duration-300 hover:scale-[1.01]"
                style={{ animationDelay: `${brandIndex * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#bab0aa]/20">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f9f6f9] to-[#bab0aa]/20 flex items-center justify-center overflow-hidden shadow-lg">
                    {brandLogo ? (
                      <img
                        src={brandLogo}
                        alt={brandName}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Store className="w-5 h-5 text-[#bab0aa]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-[#745b4e] truncate">{brandName}</h3>
                    <p className="text-xs text-[#bab0aa] font-semibold">
                      {brandGroups[brandName].length} {brandGroups[brandName].length === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {brandGroups[brandName].map((product) => (
                    <div
                      key={product.id}
                      className="relative"
                    >
                      {/* Edit and Delete Buttons - Top Right */}
                      <div className="absolute top-1 right-1 z-10 flex gap-0.5">
                        <Link
                          to={`/edit-product/${product.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-5 h-5 rounded-md bg-white/90 backdrop-blur-sm border border-[#bab0aa]/30 flex items-center justify-center hover:bg-[#215b2f] hover:border-[#215b2f] text-[#745b4e] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                        >
                          <Edit2 className="w-2.5 h-2.5" />
                        </Link>
                        <button
                          onClick={(e) => handleDelete(product.id, e)}
                          className="w-5 h-5 rounded-md bg-white/90 backdrop-blur-sm border border-[#bab0aa]/30 flex items-center justify-center hover:bg-[#215b2f] hover:border-[#215b2f] text-[#745b4e] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <Link
                        to={`/products`}
                        className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-[#f9f6f9] to-[#f9f6f9]/50 hover:from-[#f9f6f9]/80 hover:to-[#f9f6f9]/30 transition-all duration-300 group hover:shadow-md border border-transparent hover:border-[#bab0aa]/20"
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f9f6f9] to-[#bab0aa]/20 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                          {product.initialImage || product.marketReady?.images[0] || product.ecoReady?.images[0] ? (
                            <img
                              src={product.initialImage || product.marketReady?.images[0] || product.ecoReady?.images[0]}
                              alt={product.productName}
                              className="w-full h-full object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <Image className="w-4 h-4 text-[#bab0aa]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 flex-wrap">
                            <h4 className={`text-sm font-bold text-[#745b4e] group-hover:text-[#215b2f] transition-colors ${
                              expandedProducts.has(product.id) ? 'whitespace-normal' : 'truncate flex-1 min-w-0'
                            }`}>
                              {product.productName}
                            </h4>
                            {product.productName.length > 25 && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleProductExpand(product.id);
                                }}
                                className="text-[#215b2f] hover:text-[#1a4825] transition-colors flex items-center gap-0.5 flex-shrink-0"
                                title={expandedProducts.has(product.id) ? "Show less" : "Show more"}
                              >
                                <span className="text-[9px] font-semibold">
                                  {expandedProducts.has(product.id) ? "Less" : "More"}
                                </span>
                                {expandedProducts.has(product.id) ? (
                                  <ChevronUp className="w-3 h-3" />
                                ) : (
                                  <ChevronDown className="w-3 h-3" />
                                )}
                              </button>
                            )}
                          </div>
                          <p className="text-[10px] text-[#bab0aa] font-medium truncate">{product.productCode}</p>
                          
                        </div>
                        
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl text-center border border-[#bab0aa]/20 shadow-xl animate-scaleIn px-[10px] py-[5px]">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#f9f6f9] to-[#bab0aa]/20 flex items-center justify-center">
              <Trash2 className="w-12 h-12 text-[#bab0aa]" />
            </div>
            <p className="text-[#745b4e] text-lg mb-8 font-medium">Are you sure you want to delete this product?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmDelete}
                className="inline-flex items-center px-8 py-4 rounded-2xl bg-white border-2 border-[#215b2f] text-[#215b2f] font-semibold hover:bg-[#215b2f] hover:text-white active:bg-[#215b2f] active:text-white transition-all duration-300 hover:scale-105"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="inline-flex items-center px-8 py-4 rounded-2xl bg-white border-2 border-[#215b2f] text-[#215b2f] font-semibold hover:bg-[#215b2f] hover:text-white active:bg-[#215b2f] active:text-white transition-all duration-300 hover:scale-105"
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