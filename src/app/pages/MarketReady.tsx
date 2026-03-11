import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Upload, FileText, X, ChevronDown, ArrowLeft, ArrowRight, Image as ImageIcon, BookOpen, Wrench, FileCheck, ScrollText } from 'lucide-react';

export default function MarketReady() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProductMarketReady } = useApp();
  const product = products.find((p) => p.id === id);

  const [images, setImages] = useState<string[]>(product?.marketReady?.images || []);
  const [brochure, setBrochure] = useState(product?.marketReady?.brochure || '');
  const [installationPDF, setInstallationPDF] = useState(product?.marketReady?.installationPDF || '');
  const [technicalBrochure, setTechnicalBrochure] = useState(
    product?.marketReady?.technicalBrochure || ''
  );
  const [guidelinesPDF, setGuidelinesPDF] = useState(product?.marketReady?.guidelinesPDF || '');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    updateProductMarketReady(id, {
      images,
      brochure,
      installationPDF,
      technicalBrochure,
      guidelinesPDF,
    });

    navigate('/products');
  };

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-12 text-center border border-[#bab0aa]/30">
          <p className="text-[#bab0aa]">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        {/* Navigation Header with Page Toggle */}
        <div className="flex items-center justify-between mb-3">
          {/* Empty spacer to keep alignment */}
          <div></div>

          {/* Navigation to Eco Ready if Available */}
          {product.status === 'eco-ready' && (
            <button
              onClick={() => navigate(`/eco-ready/${id}`)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#215b2f] to-[#1a4825] text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 group border border-[#215b2f]"
            >
              <span className="text-sm">Continue to Eco Ready</span>
              <ArrowRight className="w-4 h-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
        <h1 className="text-3xl font-semibold text-[#745b4e] mb-1">Market Ready</h1>
        <p className="text-[#bab0aa]">Complete market-ready details for {product.productName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Product Images Section - Hero Card */}
        <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#215b2f]/5 via-transparent to-[#215b2f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative">
            {/* Section Header */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#215b2f] to-[#215b2f]/80 flex items-center justify-center shadow-md">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#745b4e] mb-0.5">Product Images</h3>
                <p className="text-xs text-black">Minimum 2 high-quality product photos required</p>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-[#215b2f]/10 border border-[#215b2f]/20">
                <span className="text-xs font-bold text-[#215b2f]">{images.length} / 2+</span>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-2">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedImage(img)}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#f9f6f9] to-[#bab0aa]/10 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group/img border border-[#bab0aa]/20 cursor-pointer"
                >
                  <img 
                    src={img} 
                    alt={`Product ${index + 1}`} 
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-md bg-red-500/90 backdrop-blur-sm text-white flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-200 shadow-lg opacity-0 group-hover/img:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-1.5 left-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-white bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Button */}
            <label className="group/upload relative flex flex-col items-center justify-center gap-1.5 py-3 px-3 rounded-lg border-2 border-dashed border-[#bab0aa]/40 hover:border-[#215b2f] transition-all duration-300 cursor-pointer bg-gradient-to-br from-[#f9f6f9] to-white hover:from-[#215b2f]/5 hover:to-[#215b2f]/5 hover:shadow-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#215b2f]/0 via-[#215b2f]/5 to-[#215b2f]/0 translate-x-[-100%] group-hover/upload:translate-x-[100%] transition-transform duration-1000" />
              
              <div className="relative text-center">
                <span className="block text-xs font-bold text-[#745b4e] group-hover/upload:text-[#215b2f] transition-colors">
                  Click to Upload Images
                </span>
                <span className="block text-xs text-black mt-0.5">
                  PNG, JPG up to 10MB
                </span>
              </div>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Documents Section - Premium Cards Grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {/* Brochure Card */}
          <div className="bg-white rounded-xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group/card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#215b2f]/5 to-transparent rounded-bl-full" />
            
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#215b2f] to-[#215b2f]/80 flex items-center justify-center shadow-sm group-hover/card:scale-110 transition-transform duration-300">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#745b4e] text-sm">Brochure</h4>
                  <p className="text-xs text-black">PDF, DOC, DOCX</p>
                </div>
                {brochure && (
                  <div className="w-7 h-7 rounded-full bg-[#215b2f] flex items-center justify-center">
                    <FileCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>

              {brochure ? (
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gradient-to-br from-[#215b2f]/5 to-[#215b2f]/10 border border-[#215b2f]/20 group/file hover:shadow-sm transition-all">
                  <FileText className="w-4 h-4 text-[#215b2f]" />
                  <a
                    href={brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-xs font-semibold text-[#745b4e] hover:text-[#215b2f] transition-colors"
                  >
                    View Brochure
                  </a>
                  <button
                    type="button"
                    onClick={() => setBrochure('')}
                    className="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="group/upload flex flex-col items-center justify-center gap-1.5 py-3 px-3 rounded-lg border-2 border-dashed border-[#bab0aa]/40 hover:border-[#215b2f] transition-all cursor-pointer bg-gradient-to-br from-[#f9f6f9] to-white hover:from-[#215b2f]/5 hover:to-[#215b2f]/10 hover:shadow-sm">
                  <Upload className="w-5 h-5 text-[#215b2f] group-hover/upload:scale-110 transition-all" />
                  <span className="text-xs font-medium text-black group-hover/upload:text-[#745b4e] transition-colors">
                    Upload Brochure
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload(setBrochure)}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Installation PDF Card */}
          <div className="bg-white rounded-xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group/card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#215b2f]/5 to-transparent rounded-bl-full" />
            
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#215b2f] to-[#215b2f]/80 flex items-center justify-center shadow-sm group-hover/card:scale-110 transition-transform duration-300">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#745b4e] text-sm">Installation PDF</h4>
                  <p className="text-xs text-black">Setup guide</p>
                </div>
                {installationPDF && (
                  <div className="w-7 h-7 rounded-full bg-[#215b2f] flex items-center justify-center">
                    <FileCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>

              {installationPDF ? (
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gradient-to-br from-[#215b2f]/5 to-[#215b2f]/10 border border-[#215b2f]/20 group/file hover:shadow-sm transition-all">
                  <FileText className="w-4 h-4 text-[#215b2f]" />
                  <a
                    href={installationPDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-xs font-semibold text-[#745b4e] hover:text-[#215b2f] transition-colors"
                  >
                    View Installation PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => setInstallationPDF('')}
                    className="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="group/upload flex flex-col items-center justify-center gap-1.5 py-3 px-3 rounded-lg border-2 border-dashed border-[#bab0aa]/40 hover:border-[#215b2f] transition-all cursor-pointer bg-gradient-to-br from-[#f9f6f9] to-white hover:from-[#215b2f]/5 hover:to-[#215b2f]/10 hover:shadow-sm">
                  <Upload className="w-5 h-5 text-[#215b2f] group-hover/upload:scale-110 transition-all" />
                  <span className="text-xs font-medium text-black group-hover/upload:text-[#745b4e] transition-colors">
                    Upload Installation PDF
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload(setInstallationPDF)}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Technical Brochure Card */}
          <div className="bg-white rounded-xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group/card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#215b2f]/5 to-transparent rounded-bl-full" />
            
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#215b2f] to-[#215b2f]/80 flex items-center justify-center shadow-sm group-hover/card:scale-110 transition-transform duration-300">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#745b4e] text-sm">Technical Brochure</h4>
                  <p className="text-xs text-black">Specifications</p>
                </div>
                {technicalBrochure && (
                  <div className="w-7 h-7 rounded-full bg-[#215b2f] flex items-center justify-center">
                    <FileCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>

              {technicalBrochure ? (
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gradient-to-br from-[#215b2f]/5 to-[#215b2f]/10 border border-[#215b2f]/20 group/file hover:shadow-sm transition-all">
                  <FileText className="w-4 h-4 text-[#215b2f]" />
                  <a
                    href={technicalBrochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-xs font-semibold text-[#745b4e] hover:text-[#215b2f] transition-colors"
                  >
                    View Technical Brochure
                  </a>
                  <button
                    type="button"
                    onClick={() => setTechnicalBrochure('')}
                    className="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="group/upload flex flex-col items-center justify-center gap-1.5 py-3 px-3 rounded-lg border-2 border-dashed border-[#bab0aa]/40 hover:border-[#215b2f] transition-all cursor-pointer bg-gradient-to-br from-[#f9f6f9] to-white hover:from-[#215b2f]/5 hover:to-[#215b2f]/10 hover:shadow-sm">
                  <Upload className="w-5 h-5 text-[#215b2f] group-hover/upload:scale-110 transition-all" />
                  <span className="text-xs font-medium text-black group-hover/upload:text-[#745b4e] transition-colors">
                    Upload Technical Brochure
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload(setTechnicalBrochure)}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Guidelines PDF Card */}
          <div className="bg-white rounded-xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group/card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#215b2f]/5 to-transparent rounded-bl-full" />
            
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#215b2f] to-[#215b2f]/80 flex items-center justify-center shadow-sm group-hover/card:scale-110 transition-transform duration-300">
                  <ScrollText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#745b4e] text-sm">Guidelines PDF</h4>
                  <p className="text-xs text-black">Usage guidelines</p>
                </div>
                {guidelinesPDF && (
                  <div className="w-7 h-7 rounded-full bg-[#215b2f] flex items-center justify-center">
                    <FileCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>

              {guidelinesPDF ? (
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gradient-to-br from-[#215b2f]/5 to-[#215b2f]/10 border border-[#215b2f]/20 group/file hover:shadow-sm transition-all">
                  <FileText className="w-4 h-4 text-[#215b2f]" />
                  <a
                    href={guidelinesPDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-xs font-semibold text-[#745b4e] hover:text-[#215b2f] transition-colors"
                  >
                    View Guidelines PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => setGuidelinesPDF('')}
                    className="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="group/upload flex flex-col items-center justify-center gap-1.5 py-3 px-3 rounded-lg border-2 border-dashed border-[#bab0aa]/40 hover:border-[#215b2f] transition-all cursor-pointer bg-gradient-to-br from-[#f9f6f9] to-white hover:from-[#215b2f]/5 hover:to-[#215b2f]/10 hover:shadow-sm">
                  <Upload className="w-5 h-5 text-[#215b2f] group-hover/upload:scale-110 transition-all" />
                  <span className="text-xs font-medium text-black group-hover/upload:text-[#745b4e] transition-colors">
                    Upload Guidelines PDF
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload(setGuidelinesPDF)}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button - Premium */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={images.length < 2}
            className={`w-full px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 ${
              images.length >= 2
                ? 'bg-gradient-to-r from-[#215b2f] to-[#1a4825] text-white hover:from-[#1a4825] hover:to-[#215b2f]'
                : 'bg-[#bab0aa]/30 text-[#bab0aa] cursor-not-allowed'
            }`}
          >
            <FileCheck className="w-5 h-5" />
            Save Market Ready
          </button>
          {images.length < 2 && (
            <p className="text-center text-xs text-black mt-2">
              📸 Please upload at least 2 product images to continue
            </p>
          )}
        </div>
      </form>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full flex flex-col items-center gap-4">
            <img 
              src={selectedImage} 
              alt="Full size preview" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}