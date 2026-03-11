import { useParams, Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Package, FileText, Video, CheckCircle, Hash, Tag, Palette, Maximize2, Grid3x3, Star, Minus, Plus, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Play, Rotate3d } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useApp();
  const product = products.find((p) => p.id === id);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'documents'>('description');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBackButtonActive, setIsBackButtonActive] = useState(false);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-12 text-center border border-[#e8e6e3]">
          <p className="text-[#6b6b6b]">Product not found</p>
        </div>
      </div>
    );
  }

  const allImages = [
    ...(product.ecoReady?.images || []),
    ...(product.marketReady?.images || []),
  ].filter((img) => img);

  const relatedProducts = products.filter(
    (p) => p.status === 'eco-ready' && p.id !== product.id
  ).slice(0, 4);

  const rating = 4.8;
  const reviewCount = 245;

  return (
    <div className="max-w-7xl mx-auto pb-8">
      {/* Back Button - Removed, now handled by Layout component */}

      {/* Breadcrumb */}
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#f9f6f9] to-[#f5f3f0] relative group">
            {allImages[selectedImage] ? (
              <>
                <img
                  src={allImages[selectedImage]}
                  alt={product.productName}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                
                
                {/* Previous Button */}
                {allImages.length > 1 && (
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#2d2d2d]" />
                  </button>
                )}

                {/* Next Button */}
                {allImages.length > 1 && (
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5 text-[#2d2d2d]" />
                  </button>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-20 h-20 text-[#d4d2cf]" />
              </div>
            )}
          </div>
          
          {/* Image Thumbnails + 360° View & Video in same row */}
          <div className="grid grid-cols-5 gap-2">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden bg-[#f9f6f9] transition-all ${
                  selectedImage === index 
                    ? 'ring-2 ring-[#215b2f] shadow-md scale-105' 
                    : 'hover:ring-2 hover:ring-[#bab0aa] hover:scale-105'
                }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain p-2" />
              </button>
            ))}
            
            {/* 360° View Button */}
            <button
              className="aspect-square rounded-lg bg-[#f9f6f9] border border-[#e8e6e3] flex flex-col items-center justify-center transition-all hover:shadow-lg hover:scale-105 hover:border-[#215b2f]"
            >
              <Rotate3d className="w-4 h-4 text-[#215b2f] mb-0.5" />
              <span className="text-[9px] text-[#2d2d2d] font-semibold">360°</span>
            </button>

            {/* Video Button */}
            <a
              href={product.ecoReady?.productVideo || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square rounded-lg bg-[#f9f6f9] border border-[#e8e6e3] flex flex-col items-center justify-center transition-all hover:shadow-lg hover:scale-105 hover:border-[#dea94d]"
            >
              <Play className="w-4 h-4 text-[#dea94d] mb-0.5" />
              <span className="text-[9px] text-[#2d2d2d] font-semibold">VD</span>
            </a>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <p className="text-xs text-[#215b2f] font-semibold mb-1 uppercase tracking-wide">
              {product.brandName}
            </p>
            <h1 className="text-3xl font-bold text-[#2d2d2d] mb-2 leading-tight">
              {product.productName}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating) 
                        ? 'fill-[#dea94d] text-[#dea94d]' 
                        : 'text-[#d4d2cf]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#2d2d2d]">{rating}</span>
              <span className="text-xs text-[#6b6b6b]">({reviewCount} Review)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-[#215b2f]">
                {product.ecoReady?.price || '$99.99'}
              </span>
              {product.ecoReady?.unit && (
                <span className="text-base text-[#6b6b6b]">/ {product.ecoReady.unit}</span>
              )}
            </div>

            {/* Tagline/Short Description */}
            {product.ecoReady?.tagline && (
              <p className="text-sm text-[#745b4e] leading-relaxed mb-3">
                {product.ecoReady.tagline}
              </p>
            )}
          </div>

          {/* Size Selector */}
          {product.ecoReady?.size && (
            <div>
              <label className="block text-xs font-semibold text-[#2d2d2d] mb-2">
                Size
              </label>
              <div className="flex gap-2">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-lg border-2 text-xs font-medium transition-all ${
                      size === 'Medium'
                        ? 'border-[#215b2f] bg-[#215b2f] text-white shadow-md'
                        : 'border-[#d4d2cf] text-[#6b6b6b] hover:border-[#215b2f]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.ecoReady?.color && (
            <div>
              <label className="block text-xs font-semibold text-[#2d2d2d] mb-2">
                Select Color
              </label>
              <div className="flex gap-2">
                {[
                  { name: 'Green', color: '#215b2f' },
                  { name: 'Brown', color: '#745b4e' },
                  { name: 'Beige', color: '#bab0aa' },
                  { name: 'Navy', color: '#1e3a5f' },
                  { name: 'Gray', color: '#6b6b6b' },
                ].map((colorOption) => (
                  <button
                    key={colorOption.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                      colorOption.name === 'Green'
                        ? 'border-[#2d2d2d] ring-2 ring-[#215b2f] ring-offset-2'
                        : 'border-[#d4d2cf]'
                    }`}
                    style={{ backgroundColor: colorOption.color }}
                    title={colorOption.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#2d2d2d] mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border-2 border-[#d4d2cf] rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-[#f9f6f9] transition-colors"
                >
                  <Minus className="w-4 h-4 text-[#6b6b6b]" />
                </button>
                <span className="px-5 py-2 font-semibold text-[#2d2d2d] min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-[#f9f6f9] transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#6b6b6b]" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#215b2f] text-white text-sm font-semibold hover:bg-[#1a4825] hover:shadow-lg transition-all duration-300 hover:scale-[1.02] px-4 py-3">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button className="flex-1 rounded-lg bg-[#215b2f] text-white text-sm font-semibold hover:bg-[#1a4825] hover:shadow-lg transition-all duration-300 hover:scale-[1.02] px-4 py-3">
              Buy Now
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`px-3 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-110 ${
                isFavorite 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-[#d4d2cf] hover:border-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#6b6b6b]'}`} />
            </button>
          </div>

          {/* Product Meta */}
          <div className="border-t border-[#e8e6e3] pt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#2d2d2d]">SKU:</span>
              <span className="text-[#6b6b6b]">{product.ecoReady?.primarySKU || product.productCode}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#2d2d2d]">Category:</span>
              <span className="text-[#6b6b6b]">{product.ecoReady?.category || 'Furniture'}</span>
            </div>
            {product.marketReady?.targetAudience && (
              <div className="flex items-start gap-2 text-xs">
                <span className="font-semibold text-[#2d2d2d]">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {product.marketReady.targetAudience.map((tag, index) => (
                    <span key={index} className="text-[#6b6b6b]">
                      {tag}{index < product.marketReady!.targetAudience.length - 1 && ','}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 pt-1">
              
              
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-[#215b2f] bg-[#215b2f]/5 rounded-lg px-3 py-2.5">
            <CheckCircle className="w-4 h-4" />
            <span className="font-semibold text-sm">In Stock & Ready to Ship</span>
          </div>
        </div>
      </div>

      {/* Tabs Section - PREMIUM REDESIGN */}
      <div className="bg-gradient-to-br from-white via-[#f9f6f9]/30 to-white rounded-2xl border border-[#e8e6e3] overflow-hidden mb-8 shadow-xl shadow-[#bab0aa]/10">
        {/* Tabs Header with Glassmorphism */}
        <div className="flex border-b border-[#e8e6e3] bg-white/60 backdrop-blur-xl">
          {[
            { id: 'description', label: 'Description', icon: FileText },
            { id: 'specifications', label: 'Additional Information', icon: Grid3x3 },
            { id: 'documents', label: 'Documents', icon: Package },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold transition-all duration-300 relative group flex items-center justify-center gap-1 sm:gap-2 ${
                  activeTab === tab.id
                    ? 'text-[#215b2f] bg-gradient-to-br from-[#215b2f]/10 via-[#215b2f]/5 to-transparent'
                    : 'text-[#6b6b6b] hover:text-[#2d2d2d] hover:bg-gradient-to-br hover:from-[#f9f6f9] hover:to-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'}`} />
                <span className="whitespace-nowrap text-[10px] sm:text-xs md:text-sm">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#215b2f] via-[#1a4825] to-[#215b2f] rounded-t-full shadow-lg shadow-[#215b2f]/50"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content with Enhanced Styling */}
        <div className="px-[25px] py-[15px]">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="space-y-6 animate-fadeIn">
              {product.ecoReady?.description && (
                <div className="bg-gradient-to-br from-[#f9f6f9]/40 to-white rounded-xl border border-[#e8e6e3]/50 px-[20px] py-[10px]">
                  <h3 className="text-lg font-bold text-[#215b2f] mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-lg shadow-[#215b2f]/30">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    Product Overview
                  </h3>
                  <p className="text-[#6b6b6b] leading-relaxed text-base">
                    {product.ecoReady.description}
                  </p>
                </div>
              )}
              {product.ecoReady?.specialFeatures && (
                <div className="bg-gradient-to-br from-white to-[#f9f6f9]/40 rounded-xl border border-[#e8e6e3]/50 px-[24px] py-[10px]">
                  <h3 className="text-lg font-bold text-[#215b2f] mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-lg shadow-[#215b2f]/30">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    Special Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.ecoReady.specialFeatures.split(',').map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/80 border border-[#e8e6e3]/50 hover:border-[#215b2f]/30 hover:shadow-md transition-all duration-300 group">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm text-[#2d2d2d] font-medium leading-relaxed">{feature.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specifications' && product.ecoReady && (
            <div className="animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Size', value: product.ecoReady.size, icon: Maximize2 },
                  { label: 'Color', value: product.ecoReady.color, icon: Palette },
                  { label: 'Material Color', value: product.ecoReady.materialColor, icon: Palette },
                  { label: 'Thickness', value: product.ecoReady.thickness, icon: Maximize2 },
                  { label: 'Finish', value: product.ecoReady.finish, icon: Star },
                  { label: 'Shape', value: product.ecoReady.shape, icon: Grid3x3 },
                  { label: 'Total Variants', value: product.ecoReady.totalVariants, icon: Hash },
                  { label: 'Collections', value: product.ecoReady.collections, icon: Tag },
                ].map((spec, index) => {
                  const SpecIcon = spec.icon;
                  return (
                    <div
                      key={index}
                      className="group relative bg-gradient-to-br from-white to-[#f9f6f9]/50 p-5 rounded-xl border border-[#e8e6e3]/50 hover:border-[#215b2f]/30 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      {/* Animated Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#215b2f]/0 to-[#215b2f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                          <SpecIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#bab0aa] uppercase tracking-wider mb-1">
                            {spec.label}
                          </p>
                          <p className="text-base font-bold text-[#2d2d2d] truncate">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="animate-fadeIn">
              {/* Market Ready Section */}
              {(product.marketReady?.brochure || product.marketReady?.technicalBrochure || product.marketReady?.installationPDF || product.marketReady?.guidelinesPDF) && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-lg shadow-[#215b2f]/30">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#215b2f]">Market Ready Documents</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.marketReady?.brochure && (
                      <a
                        href={product.marketReady.brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col gap-3 p-5 rounded-xl bg-gradient-to-br from-white to-[#f9f6f9]/50 border-2 border-[#e8e6e3] hover:border-[#215b2f] hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                      >
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#215b2f]/0 via-[#215b2f]/5 to-[#215b2f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#215b2f]/10 to-[#215b2f]/5 flex items-center justify-center group-hover:from-[#215b2f] group-hover:to-[#1a4825] transition-all duration-300 shadow-md">
                            <FileText className="w-6 h-6 text-[#215b2f] group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm text-[#2d2d2d] group-hover:text-[#215b2f] transition-colors">Product Brochure</p>
                            <p className="text-xs text-[#bab0aa] font-semibold uppercase tracking-wide">PDF Document</p>
                          </div>
                        </div>
                        
                        {/* Download Badge */}
                        <div className="relative flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#215b2f]/10 text-[#215b2f] text-xs font-bold">Market Ready</span>
                          <span className="text-[#215b2f] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                        </div>
                      </a>
                    )}
                    {product.marketReady?.technicalBrochure && (
                      <a
                        href={product.marketReady.technicalBrochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col gap-3 p-5 rounded-xl bg-gradient-to-br from-white to-[#f9f6f9]/50 border-2 border-[#e8e6e3] hover:border-[#215b2f] hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#215b2f]/0 via-[#215b2f]/5 to-[#215b2f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#215b2f]/10 to-[#215b2f]/5 flex items-center justify-center group-hover:from-[#215b2f] group-hover:to-[#1a4825] transition-all duration-300 shadow-md">
                            <FileText className="w-6 h-6 text-[#215b2f] group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm text-[#2d2d2d] group-hover:text-[#215b2f] transition-colors">Technical Brochure</p>
                            <p className="text-xs text-[#bab0aa] font-semibold uppercase tracking-wide">PDF Document</p>
                          </div>
                        </div>
                        <div className="relative flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#215b2f]/10 text-[#215b2f] text-xs font-bold">Market Ready</span>
                          <span className="text-[#215b2f] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                        </div>
                      </a>
                    )}
                    {product.marketReady?.installationPDF && (
                      <a
                        href={product.marketReady.installationPDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col gap-3 p-5 rounded-xl bg-gradient-to-br from-white to-[#f9f6f9]/50 border-2 border-[#e8e6e3] hover:border-[#215b2f] hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#215b2f]/0 via-[#215b2f]/5 to-[#215b2f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#215b2f]/10 to-[#215b2f]/5 flex items-center justify-center group-hover:from-[#215b2f] group-hover:to-[#1a4825] transition-all duration-300 shadow-md">
                            <FileText className="w-6 h-6 text-[#215b2f] group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm text-[#2d2d2d] group-hover:text-[#215b2f] transition-colors">Installation PDF</p>
                            <p className="text-xs text-[#bab0aa] font-semibold uppercase tracking-wide">PDF Document</p>
                          </div>
                        </div>
                        <div className="relative flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#215b2f]/10 text-[#215b2f] text-xs font-bold">Market Ready</span>
                          <span className="text-[#215b2f] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                        </div>
                      </a>
                    )}
                    {product.marketReady?.guidelinesPDF && (
                      <a
                        href={product.marketReady.guidelinesPDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col gap-3 p-5 rounded-xl bg-gradient-to-br from-white to-[#f9f6f9]/50 border-2 border-[#e8e6e3] hover:border-[#215b2f] hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#215b2f]/0 via-[#215b2f]/5 to-[#215b2f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#215b2f]/10 to-[#215b2f]/5 flex items-center justify-center group-hover:from-[#215b2f] group-hover:to-[#1a4825] transition-all duration-300 shadow-md">
                            <FileText className="w-6 h-6 text-[#215b2f] group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm text-[#2d2d2d] group-hover:text-[#215b2f] transition-colors">Guidelines PDF</p>
                            <p className="text-xs text-[#bab0aa] font-semibold uppercase tracking-wide">PDF Document</p>
                          </div>
                        </div>
                        <div className="relative flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#215b2f]/10 text-[#215b2f] text-xs font-bold">Market Ready</span>
                          <span className="text-[#215b2f] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Eco Ready Section */}
              {(product.ecoReady?.specsSheet || product.ecoReady?.installationGuide || product.ecoReady?.productVideo || product.ecoReady?.targetAudienceDocs?.some(doc => doc.pdf)) && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-lg shadow-[#215b2f]/30">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#215b2f]">Eco Ready Documents</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.ecoReady?.specsSheet && (
                      <a
                        href={product.ecoReady.specsSheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col gap-3 p-5 rounded-xl bg-gradient-to-br from-white to-[#f9f6f9]/50 border-2 border-[#e8e6e3] hover:border-[#215b2f] hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#215b2f]/0 via-[#215b2f]/5 to-[#215b2f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#215b2f]/10 to-[#215b2f]/5 flex items-center justify-center group-hover:from-[#215b2f] group-hover:to-[#1a4825] transition-all duration-300 shadow-md">
                            <FileText className="w-6 h-6 text-[#215b2f] group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm text-[#2d2d2d] group-hover:text-[#215b2f] transition-colors">Specs Sheet</p>
                            <p className="text-xs text-[#bab0aa] font-semibold uppercase tracking-wide">PDF Document</p>
                          </div>
                        </div>
                        <div className="relative flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#215b2f]/10 text-[#215b2f] text-xs font-bold">Eco Ready</span>
                          <span className="text-[#215b2f] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                        </div>
                      </a>
                    )}
                    {product.ecoReady?.installationGuide && (
                      <a
                        href={product.ecoReady.installationGuide}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col gap-3 p-5 rounded-xl bg-gradient-to-br from-white to-[#f9f6f9]/50 border-2 border-[#e8e6e3] hover:border-[#215b2f] hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#215b2f]/0 via-[#215b2f]/5 to-[#215b2f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#215b2f]/10 to-[#215b2f]/5 flex items-center justify-center group-hover:from-[#215b2f] group-hover:to-[#1a4825] transition-all duration-300 shadow-md">
                            <FileText className="w-6 h-6 text-[#215b2f] group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm text-[#2d2d2d] group-hover:text-[#215b2f] transition-colors">Installation Guide</p>
                            <p className="text-xs text-[#bab0aa] font-semibold uppercase tracking-wide">PDF Document</p>
                          </div>
                        </div>
                        <div className="relative flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#215b2f]/10 text-[#215b2f] text-xs font-bold">Eco Ready</span>
                          <span className="text-[#215b2f] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                        </div>
                      </a>
                    )}
                    
                    {/* Target Audience Documents */}
                    {product.ecoReady?.targetAudienceDocs?.map((doc, index) => (
                      doc.pdf && (
                        <a
                          key={index}
                          href={doc.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex flex-col gap-3 p-5 rounded-xl bg-gradient-to-br from-white to-[#f9f6f9]/50 border-2 border-[#e8e6e3] hover:border-[#215b2f] hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#215b2f]/0 via-[#215b2f]/5 to-[#215b2f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#215b2f]/10 to-[#215b2f]/5 flex items-center justify-center group-hover:from-[#215b2f] group-hover:to-[#1a4825] transition-all duration-300 shadow-md">
                              <FileText className="w-6 h-6 text-[#215b2f] group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-sm text-[#2d2d2d] group-hover:text-[#215b2f] transition-colors">{doc.audience} Doc</p>
                              <p className="text-xs text-[#bab0aa] font-semibold uppercase tracking-wide">PDF Document</p>
                            </div>
                          </div>
                          <div className="relative flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-[#215b2f]/10 text-[#215b2f] text-xs font-bold">Eco Ready</span>
                            <span className="text-[#215b2f] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                          </div>
                        </a>
                      )
                    ))}

                    {/* Product Video */}
                    {product.ecoReady?.productVideo && (
                      <a
                        href={product.ecoReady.productVideo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col gap-3 p-5 rounded-xl bg-gradient-to-br from-[#215b2f]/5 to-[#215b2f]/10 border-2 border-[#215b2f]/30 hover:border-[#215b2f] hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#215b2f]/0 via-[#215b2f]/10 to-[#215b2f]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-lg shadow-[#215b2f]/30 group-hover:scale-110 transition-transform">
                            <Video className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm text-[#2d2d2d] group-hover:text-[#215b2f] transition-colors">Product Video</p>
                            <p className="text-xs text-[#bab0aa] font-semibold uppercase tracking-wide">Video File</p>
                          </div>
                        </div>
                        <div className="relative flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#215b2f]/20 text-[#215b2f] text-xs font-bold">Eco Ready • Video</span>
                          <span className="text-[#215b2f] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Watch →</span>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="text-center mb-6">
            <p className="text-xs text-[#215b2f] font-semibold mb-1 uppercase tracking-wide">
              Related Products
            </p>
            <h2 className="text-2xl font-bold text-[#2d2d2d]">
              Explore Related Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-[#e8e6e3] hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-square bg-gradient-to-br from-[#f9f6f9] to-[#f5f3f0] relative overflow-hidden">
                  {relatedProduct.ecoReady?.images[0] ? (
                    <img
                      src={relatedProduct.ecoReady.images[0]}
                      alt={relatedProduct.productName}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-[#d4d2cf]" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#215b2f] text-white text-xs font-bold">
                      Pro-20%
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#215b2f] hover:text-white transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-[#215b2f] font-semibold mb-0.5 uppercase">
                    {relatedProduct.brandName}
                  </p>
                  <h3 className="text-sm font-semibold text-[#2d2d2d] mb-1.5 line-clamp-1 group-hover:text-[#215b2f] transition-colors">
                    {relatedProduct.productName}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < 4 ? 'fill-[#dea94d] text-[#dea94d]' : 'text-[#d4d2cf]'
                        }`}
                      />
                    ))}
                    <span className="text-[10px] text-[#6b6b6b] ml-0.5">4.9</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-[#215b2f]">
                      {relatedProduct.ecoReady?.price || '$99.99'}
                    </span>
                    <span className="text-xs text-[#bab0aa] line-through">
                      $129.00
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}