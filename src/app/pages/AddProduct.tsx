import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';
import { PackagePlus, ChevronDown, AlertCircle, Upload, X, ArrowLeft } from 'lucide-react';
import ImageViewerModal from '../components/ImageViewerModal';

const defaultPrimaryCategories = [
  'Household Products',
  'Kitchen',
  'Toilet',
  'Bathroom',
  'Balcony',
];

const defaultSecondaryCategories: Record<string, string[]> = {
  Kitchen: ['Knife', 'Table Cloth', 'Spoon', 'Fork', 'Plate', 'Bowl', 'Cup'],
  Bathroom: ['Towel', 'Soap Dispenser', 'Mirror', 'Bath Mat', 'Shower Curtain'],
  Toilet: ['Toilet Brush', 'Toilet Paper Holder', 'Cleaning Supplies'],
  Balcony: ['Plant Pot', 'Outdoor Chair', 'Table', 'Umbrella'],
  'Household Products': ['Vacuum', 'Broom', 'Mop', 'Dustpan', 'Storage Box'],
};

export default function AddProduct() {
  const {
    addProduct,
    customPrimaryCategories,
    addCustomPrimaryCategory,
    customSecondaryCategories,
    addCustomSecondaryCategory,
    products,
    brands,
    addBrand,
  } = useApp();
  const navigate = useNavigate();

  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [showPrimaryOther, setShowPrimaryOther] = useState(false);
  const [customPrimary, setCustomPrimary] = useState('');

  const [secondaryCategory, setSecondaryCategory] = useState('');
  const [showSecondaryOther, setShowSecondaryOther] = useState(false);
  const [customSecondary, setCustomSecondary] = useState('');

  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [error, setError] = useState('');
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const [isBackButtonActive, setIsBackButtonActive] = useState(false);

  const allPrimaryCategories = [...defaultPrimaryCategories, ...customPrimaryCategories, 'Other'];

  const getSecondaryOptions = () => {
    if (!primaryCategory || primaryCategory === 'Other') return [];
    const defaultOptions = defaultSecondaryCategories[primaryCategory] || [];
    const customOptions = customSecondaryCategories[primaryCategory] || [];
    return [...defaultOptions, ...customOptions, 'Other'];
  };

  const handlePrimaryCategoryChange = (value: string) => {
    setPrimaryCategory(value);
    setSecondaryCategory('');
    setShowPrimaryOther(value === 'Other');
    setShowSecondaryOther(false);
  };

  const handleSecondaryCategoryChange = (value: string) => {
    setSecondaryCategory(value);
    setShowSecondaryOther(value === 'Other');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    let finalPrimary = primaryCategory;
    if (showPrimaryOther && customPrimary) {
      addCustomPrimaryCategory(customPrimary);
      finalPrimary = customPrimary;
    }

    let finalSecondary = secondaryCategory;
    if (showSecondaryOther && customSecondary) {
      addCustomSecondaryCategory(finalPrimary, customSecondary);
      finalSecondary = customSecondary;
    }

    // Check for duplicate product code
    const existingProductCode = products.find((p) => p.productCode === productCode);
    if (existingProductCode) {
      setError('Product code already exists. Please use a different code.');
      return;
    }

    // Check for duplicate product name within the same brand
    const duplicateProductName = products.find(
      (p) => p.brandName.toLowerCase() === brandName.toLowerCase() && 
             p.productName.toLowerCase() === productName.toLowerCase()
    );
    if (duplicateProductName) {
      setError(`A product named "${productName}" already exists in the "${brandName}" brand. Please use a different product name.`);
      return;
    }

    // Add brand if it's new
    if (isNewBrand) {
      addBrand({ name: brandName, logo: brandLogo });
    }

    addProduct({
      brandName,
      primaryCategory: finalPrimary,
      secondaryCategory: finalSecondary,
      productName,
      productCode,
      initialImage: productImage || undefined,
    });

    // Reset form
    setBrandName('');
    setBrandLogo(null);
    setProductImage(null);
    setPrimaryCategory('');
    setSecondaryCategory('');
    setProductName('');
    setProductCode('');
    setCustomPrimary('');
    setCustomSecondary('');
    setShowPrimaryOther(false);
    setShowSecondaryOther(false);
    setError('');

    navigate('/products');
  };

  // Check if brand is new
  const isNewBrand = brandName && !brands.some((b) => b.name.toLowerCase() === brandName.toLowerCase());

  return (
    <>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        {/* Removed - now handled by Layout component */}

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-3xl font-semibold text-[#745b4e] mb-2">Add Product</h1>
          <p className="text-[#bab0aa]">Create a new product in your catalog</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-[#bab0aa]/30 shadow-sm">
          <div className="space-y-5">
            {/* Brand Name */}
            <div>
              <label htmlFor="brandName" className="block text-sm font-medium text-[#745b4e] mb-2">
                Brand Name
              </label>
              <input
                id="brandName"
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#bab0aa]/40 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
                placeholder="Enter brand name"
                required
              />
            </div>

            {/* Brand Logo */}
            {isNewBrand && (
              <div>
                <label className="block text-sm font-medium text-[#745b4e] mb-2">
                  Brand Logo (Optional)
                  <span className="ml-2 text-xs text-[#215b2f] bg-[#215b2f]/10 px-2 py-1 rounded-full">
                    New Brand
                  </span>
                </label>
                {!brandLogo ? (
                  <label
                    htmlFor="brandLogo"
                    className="block w-full px-4 py-8 rounded-xl border-2 border-dashed border-[#bab0aa]/40 bg-[#f9f6f9] hover:border-[#215b2f] hover:bg-[#f9f6f9]/70 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Upload className="w-8 h-8 text-[#bab0aa]" />
                      <p className="text-sm text-[#745b4e]">Click to upload brand logo</p>
                      <p className="text-xs text-[#bab0aa]">PNG, JPG up to 5MB</p>
                    </div>
                    <input
                      id="brandLogo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setBrandLogo(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                ) : (
                  <div className="relative w-full px-4 py-4 rounded-xl border border-[#bab0aa]/40 bg-[#f9f6f9]">
                    <div className="flex items-center gap-4">
                      <img
                        src={brandLogo}
                        alt="Brand Logo Preview"
                        className="w-20 h-20 object-contain rounded-xl border border-[#bab0aa]/30 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setViewingImage(brandLogo)}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#745b4e]">Logo uploaded</p>
                        <p className="text-xs text-[#bab0aa]">Brand logo ready</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBrandLogo(null)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Primary Category */}
            <div>
              <label htmlFor="primaryCategory" className="block text-sm font-medium text-[#745b4e] mb-2">
                Primary Category
              </label>
              <div className="relative">
                <select
                  id="primaryCategory"
                  value={primaryCategory}
                  onChange={(e) => handlePrimaryCategoryChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#bab0aa]/40 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all appearance-none"
                  required
                >
                  <option value="">Select primary category</option>
                  {allPrimaryCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bab0aa] pointer-events-none" />
              </div>
            </div>

            {/* Custom Primary Category */}
            {showPrimaryOther && (
              <div>
                <label htmlFor="customPrimary" className="block text-sm font-medium text-[#745b4e] mb-2">
                  Custom Primary Category
                </label>
                <input
                  id="customPrimary"
                  type="text"
                  value={customPrimary}
                  onChange={(e) => setCustomPrimary(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#bab0aa]/40 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
                  placeholder="Enter custom category"
                  required
                />
              </div>
            )}

            {/* Secondary Category */}
            {primaryCategory && !showPrimaryOther && (
              <div>
                <label htmlFor="secondaryCategory" className="block text-sm font-medium text-[#745b4e] mb-2">
                  Secondary Category
                </label>
                <div className="relative">
                  <select
                    id="secondaryCategory"
                    value={secondaryCategory}
                    onChange={(e) => handleSecondaryCategoryChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#bab0aa]/40 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all appearance-none"
                    required
                  >
                    <option value="">Select secondary category</option>
                    {getSecondaryOptions().map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bab0aa] pointer-events-none" />
                </div>
              </div>
            )}

            {/* Custom Secondary Category */}
            {showSecondaryOther && (
              <div>
                <label htmlFor="customSecondary" className="block text-sm font-medium text-[#745b4e] mb-2">
                  Custom Secondary Category
                </label>
                <input
                  id="customSecondary"
                  type="text"
                  value={customSecondary}
                  onChange={(e) => setCustomSecondary(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#bab0aa]/40 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
                  placeholder="Enter custom secondary category"
                  required
                />
              </div>
            )}

            {/* Product Name */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-[#745b4e] mb-2">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#bab0aa]/40 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Product Code */}
            <div>
              <label htmlFor="productCode" className="block text-sm font-medium text-[#745b4e] mb-2">
                Unique Product Code
              </label>
              <input
                id="productCode"
                type="text"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#bab0aa]/40 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#215b2f] focus:border-transparent transition-all [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
                placeholder="e.g., PROD-001"
                required
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-[#745b4e] mb-2">
                Product Image (Optional)
              </label>
              {!productImage ? (
                <label
                  htmlFor="productImage"
                  className="block w-full px-4 py-8 rounded-xl border-2 border-dashed border-[#bab0aa]/40 bg-[#f9f6f9] hover:border-[#215b2f] hover:bg-[#f9f6f9]/70 transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-8 h-8 text-[#bab0aa]" />
                    <p className="text-sm text-[#745b4e]">Click to upload product image</p>
                    <p className="text-xs text-[#bab0aa]">PNG, JPG up to 5MB</p>
                  </div>
                  <input
                    id="productImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProductImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              ) : (
                <div className="relative w-full px-4 py-4 rounded-xl border border-[#bab0aa]/40 bg-[#f9f6f9]">
                  <div className="flex items-center gap-4">
                    <img
                      src={productImage}
                      alt="Product Image Preview"
                      className="w-20 h-20 object-contain rounded-xl border border-[#bab0aa]/30 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setViewingImage(productImage)}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#745b4e]">Image uploaded</p>
                      <p className="text-xs text-[#bab0aa]">Product image ready</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProductImage(null)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#215b2f] to-[#215b2f]/90 text-white font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <PackagePlus className="w-5 h-5" />
                Add Item
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Image Viewer Modal */}
      {viewingImage && (
        <ImageViewerModal
          imageUrl={viewingImage}
          onClose={() => setViewingImage(null)}
        />
      )}
    </>
  );
}