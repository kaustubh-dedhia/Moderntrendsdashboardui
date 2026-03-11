import { Upload, FileText, X, Video, Check, Users, Plus, Sparkles, Image as ImageIcon, DollarSign, Package, Layers, Palette, Ruler } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import ImageViewerModal from '../components/ImageViewerModal';

export default function EcoReady() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProductEcoReady, customPersonas, addCustomPersona } = useApp();
  const product = products.find((p) => p.id === id);

  const [images, setImages] = useState<string[]>(product?.ecoReady?.images || ['', '', '', '', '']);
  const [size, setSize] = useState(product?.ecoReady?.size || '');
  const [color, setColor] = useState(product?.ecoReady?.color || '');
  const [productCode, setProductCode] = useState(product?.ecoReady?.productCode || product?.productCode || '');
  const [primarySKU, setPrimarySKU] = useState(product?.ecoReady?.primarySKU || '');
  const [tagline, setTagline] = useState(product?.ecoReady?.tagline || '');
  const [description, setDescription] = useState(product?.ecoReady?.description || '');
  const [price, setPrice] = useState(product?.ecoReady?.price || '');
  const [unit, setUnit] = useState(product?.ecoReady?.unit || '');
  const [category, setCategory] = useState(product?.ecoReady?.category || '');
  const [skuVariation, setSkuVariation] = useState(product?.ecoReady?.skuVariation || '');
  const [totalVariants, setTotalVariants] = useState(product?.ecoReady?.totalVariants || '');
  const [specsSheet, setSpecsSheet] = useState(product?.ecoReady?.specsSheet || '');
  const [installationGuide, setInstallationGuide] = useState(product?.ecoReady?.installationGuide || '');
  const [collections, setCollections] = useState(product?.ecoReady?.collections || '');
  const [materialColor, setMaterialColor] = useState(product?.ecoReady?.materialColor || '');
  const [thickness, setThickness] = useState(product?.ecoReady?.thickness || '');
  const [finish, setFinish] = useState(product?.ecoReady?.finish || '');
  const [shape, setShape] = useState(product?.ecoReady?.shape || '');
  const [specialFeatures, setSpecialFeatures] = useState(product?.ecoReady?.specialFeatures || '');
  const [productVideo, setProductVideo] = useState(product?.ecoReady?.productVideo || '');
  const [targetAudienceDocs, setTargetAudienceDocs] = useState(
    product?.ecoReady?.targetAudienceDocs || []
  );
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherPersonaName, setOtherPersonaName] = useState('');

  // Available personas - combine default and custom
  const defaultPersonas = ['Designer', 'Plumber', 'Architect', 'Contractor', 'Homeowner', 'Builder'];
  const availablePersonas = [...defaultPersonas, ...customPersonas];

  // Get selected personas
  const selectedPersonas = targetAudienceDocs.map(doc => doc.audience);

  // Toggle persona selection
  const togglePersona = (persona: string) => {
    if (selectedPersonas.includes(persona)) {
      // Remove persona
      setTargetAudienceDocs(prev => prev.filter(doc => doc.audience !== persona));
    } else {
      // Add persona
      setTargetAudienceDocs(prev => [...prev, { audience: persona, description: '', pdf: '' }]);
    }
  };

  // Add custom persona
  const handleAddCustomPersona = () => {
    if (otherPersonaName.trim()) {
      addCustomPersona(otherPersonaName.trim());
      togglePersona(otherPersonaName.trim());
      setOtherPersonaName('');
      setShowOtherInput(false);
    }
  };

  // Update persona description
  const updatePersonaDescription = (persona: string, description: string) => {
    setTargetAudienceDocs(prev =>
      prev.map(doc =>
        doc.audience === persona ? { ...doc, description } : doc
      )
    );
  };

  // Update persona document
  const updatePersonaDocument = (persona: string, pdf: string) => {
    setTargetAudienceDocs(prev =>
      prev.map(doc =>
        doc.audience === persona ? { ...doc, pdf } : doc
      )
    );
  };

  // Handle persona document upload
  const handlePersonaDocUpload = (persona: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updatePersonaDocument(persona, url);
    }
  };

  // Validation: Check if all required fields are filled
  const isFormValid = () => {
    const hasAtLeastOneImage = images.some(img => img !== '');
    const allTextFieldsFilled = 
      size.trim() !== '' &&
      color.trim() !== '' &&
      productCode.trim() !== '' &&
      primarySKU.trim() !== '' &&
      tagline.trim() !== '' &&
      description.trim() !== '' &&
      price.trim() !== '' &&
      unit.trim() !== '' &&
      category.trim() !== '' &&
      skuVariation.trim() !== '' &&
      totalVariants.trim() !== '' &&
      collections.trim() !== '' &&
      materialColor.trim() !== '' &&
      thickness.trim() !== '' &&
      finish.trim() !== '' &&
      shape.trim() !== '' &&
      specialFeatures.trim() !== '';
    const allFilesFilled = 
      specsSheet !== '' &&
      installationGuide !== '' &&
      productVideo !== '';
    
    return hasAtLeastOneImage && allTextFieldsFilled && allFilesFilled;
  };

  const handleImageUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
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

    updateProductEcoReady(id, {
      images: images.filter((img) => img !== ''),
      size,
      color,
      productCode,
      primarySKU,
      tagline,
      description,
      price,
      unit,
      category,
      skuVariation,
      totalVariants,
      specsSheet,
      installationGuide,
      collections,
      materialColor,
      thickness,
      finish,
      shape,
      specialFeatures,
      productVideo,
      targetAudienceDocs,
    });

    navigate('/products');
  };

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-white to-[#f9f6f9] rounded-3xl p-16 text-center border border-[#bab0aa]/20 shadow-xl">
          <p className="text-black text-lg">Product not found</p>
        </div>
      </div>
    );
  }

  if (product.status === 'incomplete') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-white to-[#f9f6f9] rounded-3xl p-16 text-center border border-[#bab0aa]/20 shadow-xl">
          <p className="text-black text-lg">Please complete Market Ready first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-8">
      {/* Header with Gradient */}
      <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#f9f6f9] to-white p-8 shadow-2xl border-2 border-[#bab0aa]/20">
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              
              <h1 className="text-4xl font-bold text-black tracking-tight">Eco Ready</h1>
            </div>
            <p className="text-black text-base">Complete comprehensive details for {product.productName}</p>
          </div>
          
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Images Section - Premium Grid */}
        <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-3xl p-3 border border-[#bab0aa]/20 shadow-lg hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-lg">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black">Product Gallery</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {images.map((img, index) => (
              <div key={index} className="group relative">
                {img ? (
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#f5f3f0] ring-2 ring-[#215b2f]/20 hover:ring-[#215b2f] transition-all duration-300 shadow-md hover:shadow-xl">
                    <img 
                      src={img} 
                      alt={`Product ${index}`} 
                      className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-500" 
                      onClick={() => setViewingImage(img)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...images];
                        newImages[index] = '';
                        setImages(newImages);
                      }}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-red-500/90 backdrop-blur-sm text-white flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                      <span className="text-white text-xs font-medium">Image {index + 1}</span>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-[#bab0aa]/40 hover:border-[#215b2f] transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-[#f9f6f9] hover:shadow-lg group-hover:scale-105">
                    <Upload className="w-8 h-8 text-[#bab0aa] group-hover:text-[#215b2f] transition-colors mb-1" />
                    <span className="text-xs text-[#745b4e] font-medium">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload(index)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Basic Information - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Size & Color */}
          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="w-5 h-5 text-[#215b2f]" />
              <label className="block text-sm font-bold text-black">Size</label>
            </div>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-white/50 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm"
              placeholder="e.g., 30x40 cm"
              required
            />
          </div>

          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-5 h-5 text-[#215b2f]" />
              <label className="block text-sm font-bold text-black">Color</label>
            </div>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-white/50 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm"
              placeholder="e.g., Beige"
              required
            />
          </div>

          {/* Product Code & SKU */}
          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-[#215b2f]" />
              <label className="block text-sm font-bold text-black">Product Code</label>
            </div>
            <input
              type="text"
              value={productCode}
              readOnly
              className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-[#bab0aa]/10 text-[#745b4e] cursor-not-allowed focus:outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-[#215b2f]" />
              <label className="block text-sm font-bold text-black">Primary SKU</label>
            </div>
            <input
              type="text"
              value={primarySKU}
              onChange={(e) => setPrimarySKU(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-white/50 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm"
              placeholder="e.g., SKU-001"
              required
            />
          </div>
        </div>

        {/* Tagline - Full Width Premium */}
        <div className="bg-gradient-to-br from-[#215b2f]/5 via-white to-[#dea94d]/5 rounded-2xl p-3 border border-[#215b2f]/20 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#dea94d]" />
            <label className="block text-sm font-bold text-black">Tagline</label>
          </div>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#215b2f]/30 bg-white/70 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm"
            placeholder="A catchy tagline that sells your product..."
            required
          />
        </div>

        {/* Description */}
        <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
          <label className="block text-sm font-bold text-black mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-white/50 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm resize-none"
            placeholder="Detailed product description..."
            required
          />
        </div>

        {/* Price & Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-[#dea94d]/10 via-white to-white rounded-2xl p-3 border border-[#dea94d]/30 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              
              <label className="block text-sm font-bold text-black">Price</label>
            </div>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#dea94d]/30 bg-white/70 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#dea94d] focus:border-transparent transition-all text-sm backdrop-blur-sm font-semibold"
              placeholder="$99.99"
              required
            />
          </div>

          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <label className="block text-sm font-bold text-black mb-2">Unit</label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-white/50 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm"
              placeholder="per piece"
              required
            />
          </div>

          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <label className="block text-sm font-bold text-black mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-white/50 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm"
              placeholder="Product category"
              required
            />
          </div>

          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <label className="block text-sm font-bold text-black mb-2">SKU Variation</label>
            <input
              type="text"
              value={skuVariation}
              onChange={(e) => setSkuVariation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-white/50 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm"
              placeholder="Variation details"
              required
            />
          </div>

          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <label className="block text-sm font-bold text-black mb-2">Total Variants</label>
            <input
              type="text"
              value={totalVariants}
              onChange={(e) => setTotalVariants(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-white/50 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm"
              placeholder="Number of variants"
              required
            />
          </div>

          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <label className="block text-sm font-bold text-black mb-2">Collections</label>
            <input
              type="text"
              value={collections}
              onChange={(e) => setCollections(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-white/50 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm"
              placeholder="Collection name"
              required
            />
          </div>
        </div>

        {/* Material Specifications - Premium Grid */}
        <div className="bg-gradient-to-br from-[#745b4e]/5 via-white to-[#bab0aa]/5 rounded-3xl p-3 border border-[#745b4e]/20 shadow-lg hover:shadow-2xl transition-all duration-500">
          <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#745b4e] to-[#5a4639] flex items-center justify-center shadow-md">
              <Layers className="w-4 h-4 text-white" />
            </div>
            Material Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/70 rounded-xl p-3 border border-[#bab0aa]/20 backdrop-blur-sm">
              <label className="block text-xs font-bold text-black mb-2">Material Color</label>
              <input
                type="text"
                value={materialColor}
                onChange={(e) => setMaterialColor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#bab0aa]/30 bg-white text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#745b4e] focus:border-transparent transition-all text-sm"
                placeholder="Material color"
                required
              />
            </div>

            <div className="bg-white/70 rounded-xl p-3 border border-[#bab0aa]/20 backdrop-blur-sm">
              <label className="block text-xs font-bold text-black mb-2">Thickness</label>
              <input
                type="text"
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#bab0aa]/30 bg-white text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#745b4e] focus:border-transparent transition-all text-sm"
                placeholder="Thickness"
                required
              />
            </div>

            <div className="bg-white/70 rounded-xl p-3 border border-[#bab0aa]/20 backdrop-blur-sm">
              <label className="block text-xs font-bold text-black mb-2">Finish</label>
              <input
                type="text"
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#bab0aa]/30 bg-white text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#745b4e] focus:border-transparent transition-all text-sm"
                placeholder="Finish type"
                required
              />
            </div>

            <div className="bg-white/70 rounded-xl p-3 border border-[#bab0aa]/20 backdrop-blur-sm">
              <label className="block text-xs font-bold text-black mb-2">Shape</label>
              <input
                type="text"
                value={shape}
                onChange={(e) => setShape(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#bab0aa]/30 bg-white text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#745b4e] focus:border-transparent transition-all text-sm"
                placeholder="Shape"
                required
              />
            </div>
          </div>
        </div>

        {/* Special Features */}
        <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
          <label className="block text-sm font-bold text-black mb-2">Special Features</label>
          <textarea
            value={specialFeatures}
            onChange={(e) => setSpecialFeatures(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-xl border border-[#bab0aa]/30 bg-white/50 text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm backdrop-blur-sm resize-none"
            placeholder="List special features..."
            required
          />
        </div>

        {/* File Uploads - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <label className="block text-sm font-bold text-black mb-2">Product Specification PDF</label>
            {specsSheet ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#215b2f]/5 border border-[#215b2f]/20">
                <FileText className="w-5 h-5 text-[#215b2f]" />
                <a
                  href={specsSheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-sm font-medium text-black hover:text-[#215b2f] truncate"
                >
                  View Document
                </a>
                <button
                  type="button"
                  onClick={() => setSpecsSheet('')}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-xl border-2 border-dashed border-[#bab0aa]/40 hover:border-[#215b2f] transition-all duration-300 cursor-pointer bg-white/50 hover:bg-white group">
                <Upload className="w-6 h-6 text-[#bab0aa] group-hover:text-[#215b2f] transition-colors" />
                <span className="text-xs font-medium text-black">Upload PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload(setSpecsSheet)}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <label className="block text-sm font-bold text-black mb-2">Installation Guide</label>
            {installationGuide ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#215b2f]/5 border border-[#215b2f]/20">
                <FileText className="w-5 h-5 text-[#215b2f]" />
                <a
                  href={installationGuide}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-sm font-medium text-black hover:text-[#215b2f] truncate"
                >
                  View Document
                </a>
                <button
                  type="button"
                  onClick={() => setInstallationGuide('')}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-xl border-2 border-dashed border-[#bab0aa]/40 hover:border-[#215b2f] transition-all duration-300 cursor-pointer bg-white/50 hover:bg-white group">
                <Upload className="w-6 h-6 text-[#bab0aa] group-hover:text-[#215b2f] transition-colors" />
                <span className="text-xs font-medium text-black">Upload PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload(setInstallationGuide)}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Product Video Section */}
          <div className="bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-2xl p-3 border border-[#bab0aa]/20 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-5 h-5 text-[#215b2f]"/>
              <label className="block text-sm font-bold text-black">Product Video</label>
            </div>
            {productVideo ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#215b2f]/5 border border-[#215b2f]/20">
                <Video className="w-5 h-5 text-[#215b2f]"/>
                <a
                  href={productVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-sm font-medium text-black hover:text-[#215b2f] truncate"
                >
                  View Video
                </a>
                <button
                  type="button"
                  onClick={() => setProductVideo('')}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-xl border-2 border-dashed border-[#bab0aa]/40 hover:border-[#215b2f] transition-all duration-300 cursor-pointer bg-white/50 hover:bg-white group">
                <Upload className="w-6 h-6 text-[#bab0aa] group-hover:text-[#215b2f] transition-colors" />
                <span className="text-xs font-medium text-black">Upload Video</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload(setProductVideo)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Target Audience - Ultra Premium Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#f9f6f9] to-white rounded-3xl p-6 border-2 border-[#bab0aa]/20 shadow-2xl">
          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black">Target Audience</h3>
            </div>
            
            {/* Persona Selection */}
            <div className="flex flex-wrap gap-2 mb-5">
              {availablePersonas.map(persona => (
                <button
                  key={persona}
                  type="button"
                  onClick={() => togglePersona(persona)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-xl hover:scale-105 ${
                    selectedPersonas.includes(persona)
                      ? 'bg-gradient-to-r from-[#215b2f] to-[#1a4825] text-white border-2 border-[#215b2f]'
                      : 'bg-white border-2 border-[#bab0aa]/40 text-black hover:border-[#215b2f]'
                  }`}
                >
                  {selectedPersonas.includes(persona) && <Check className="w-4 h-4" />}
                  {persona}
                </button>
              ))}
              
              {/* Other Button */}
              {!showOtherInput ? (
                <button
                  type="button"
                  onClick={() => setShowOtherInput(true)}
                  className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 bg-white text-black border-2 border-[#bab0aa]/40 hover:border-[#215b2f] shadow-md hover:shadow-xl hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  Other
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-white backdrop-blur-sm px-3 py-1.5 rounded-xl border-2 border-[#bab0aa]/40 shadow-lg">
                  <input
                    type="text"
                    value={otherPersonaName}
                    onChange={(e) => setOtherPersonaName(e.target.value)}
                    placeholder="Enter persona name..."
                    className="px-2 py-1 text-sm text-black bg-transparent border-none focus:outline-none w-40 placeholder-[#bab0aa]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomPersona}
                    className="px-3 py-1 bg-[#215b2f] text-white rounded-lg text-xs font-bold hover:bg-[#1a4825] transition-colors"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowOtherInput(false);
                      setOtherPersonaName('');
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Selected Personas Details */}
            {selectedPersonas.length > 0 && (
              <div className="space-y-3">
                {targetAudienceDocs.map((doc) => (
                  <div key={doc.audience} className="bg-white backdrop-blur-sm rounded-2xl p-5 border border-[#bab0aa]/30 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-bold text-[#215b2f] flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#215b2f] to-[#1a4825] flex items-center justify-center text-white text-xs font-bold">
                          {doc.audience.charAt(0)}
                        </div>
                        {doc.audience}
                      </h4>
                      <button
                        type="button"
                        onClick={() => togglePersona(doc.audience)}
                        className="text-red-500 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded-lg"
                        title="Remove persona"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-black mb-2">
                        Description for {doc.audience}
                      </label>
                      <textarea
                        value={doc.description}
                        onChange={(e) => updatePersonaDescription(doc.audience, e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#bab0aa]/30 bg-white text-black placeholder-[#bab0aa] focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all text-sm resize-none"
                        placeholder={`Write a description targeting ${doc.audience.toLowerCase()}s...`}
                      />
                    </div>

                    {/* Document Upload */}
                    <div>
                      <label className="block text-xs font-bold text-black mb-2">
                        Document for {doc.audience}
                      </label>
                      {doc.pdf ? (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#215b2f]/5 border border-[#215b2f]/20">
                          <FileText className="w-5 h-5 text-[#215b2f]" />
                          <a
                            href={doc.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-sm font-medium text-[#215b2f] hover:underline"
                          >
                            View {doc.audience} Document
                          </a>
                          <button
                            type="button"
                            onClick={() => updatePersonaDocument(doc.audience, '')}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-[#bab0aa]/40 hover:border-[#215b2f] transition-all duration-300 cursor-pointer bg-white hover:bg-[#215b2f]/5 group">
                          <Upload className="w-5 h-5 text-[#bab0aa] group-hover:text-[#215b2f] transition-colors" />
                          <span className="text-sm font-medium text-black">Upload Document</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handlePersonaDocUpload(doc.audience)}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedPersonas.length === 0 && (
              <div className="text-center py-8 px-4 bg-[#f9f6f9] rounded-2xl border-2 border-dashed border-[#bab0aa]/30">
                <Users className="w-12 h-12 text-[#bab0aa] mx-auto mb-3" />
                <p className="text-black text-sm">Select personas above to add targeted audience information</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-6 py-3 rounded-xl border-2 border-[#bab0aa]/40 text-black font-bold hover:bg-[#bab0aa]/10 transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center gap-2 ${
              isFormValid()
                ? 'bg-gradient-to-r from-[#215b2f] to-[#1a4825] text-white hover:from-[#1a4825] hover:to-[#215b2f]'
                : 'bg-[#bab0aa]/30 text-[#bab0aa] cursor-not-allowed'
            }`}
          >
            <Check className="w-5 h-5" />
            Complete Eco Ready
          </button>
        </div>
      </form>

      {viewingImage && (
        <ImageViewerModal
          imageUrl={viewingImage}
          onClose={() => setViewingImage(null)}
        />
      )}
    </div>
  );
}