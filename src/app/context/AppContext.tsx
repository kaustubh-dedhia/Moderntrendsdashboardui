import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  brandName: string;
  primaryCategory: string;
  secondaryCategory: string;
  productName: string;
  productCode: string;
  initialImage?: string;
  marketReady?: MarketReadyData;
  ecoReady?: EcoReadyData;
  status: 'incomplete' | 'market-ready' | 'eco-ready';
  progress: number;
}

export interface MarketReadyData {
  images: string[];
  brochure?: string;
  installationPDF?: string;
  technicalBrochure?: string;
  guidelinesPDF?: string;
}

export interface EcoReadyData {
  images: string[];
  size: string;
  color: string;
  productCode: string;
  primarySKU: string;
  tagline: string;
  description: string;
  price: string;
  unit: string;
  category: string;
  skuVariation: string;
  totalVariants: string;
  specsSheet?: string;
  installationGuide?: string;
  collections: string;
  materialColor: string;
  thickness: string;
  finish: string;
  shape: string;
  specialFeatures: string;
  productVideo?: string;
  targetAudienceDocs: {
    audience: string;
    pdf?: string;
    description: string;
  }[];
}

export interface Brand {
  name: string;
  logo?: string;
}

interface User {
  email: string;
  name: string;
  role: 'admin' | 'pm';
}

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'status' | 'progress'>) => void;
  updateProductMarketReady: (id: string, data: MarketReadyData) => void;
  updateProductEcoReady: (id: string, data: EcoReadyData) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  customPrimaryCategories: string[];
  addCustomPrimaryCategory: (category: string) => void;
  customSecondaryCategories: Record<string, string[]>;
  addCustomSecondaryCategory: (primary: string, secondary: string) => void;
  brands: Brand[];
  addBrand: (brand: Brand) => void;
  getBrandLogo: (brandName: string) => string | undefined;
  customPersonas: string[];
  addCustomPersona: (persona: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [customPrimaryCategories, setCustomPrimaryCategories] = useState<string[]>([]);
  const [customSecondaryCategories, setCustomSecondaryCategories] = useState<Record<string, string[]>>({});
  const [brands, setBrands] = useState<Brand[]>([]);
  const [customPersonas, setCustomPersonas] = useState<string[]>([]);

  const login = (email: string, password: string): boolean => {
    // Mock authentication
    if (email && password) {
      setUser({
        email,
        name: 'Product Manager',
        role: 'pm',
      });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    // Mock signup
    if (name && email && password) {
      setUser({
        email,
        name,
        role: 'pm',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addProduct = (product: Omit<Product, 'id' | 'status' | 'progress'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      status: 'incomplete',
      progress: 0,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProductMarketReady = (id: string, data: MarketReadyData) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              marketReady: data,
              status: 'market-ready',
              progress: 50,
            }
          : p
      )
    );
  };

  const updateProductEcoReady = (id: string, data: EcoReadyData) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ecoReady: data,
              status: 'eco-ready',
              progress: 100,
            }
          : p
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...product,
            }
          : p
      )
    );
  };

  const addCustomPrimaryCategory = (category: string) => {
    if (!customPrimaryCategories.includes(category)) {
      setCustomPrimaryCategories((prev) => [...prev, category]);
    }
  };

  const addCustomSecondaryCategory = (primary: string, secondary: string) => {
    setCustomSecondaryCategories((prev) => ({
      ...prev,
      [primary]: [...(prev[primary] || []), secondary],
    }));
  };

  const addBrand = (brand: Brand) => {
    if (!brands.some((b) => b.name === brand.name)) {
      setBrands((prev) => [...prev, brand]);
    }
  };

  const getBrandLogo = (brandName: string) => {
    const brand = brands.find((b) => b.name === brandName);
    return brand?.logo;
  };

  const addCustomPersona = (persona: string) => {
    if (!customPersonas.includes(persona)) {
      setCustomPersonas((prev) => [...prev, persona]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        products,
        addProduct,
        updateProductMarketReady,
        updateProductEcoReady,
        deleteProduct,
        updateProduct,
        customPrimaryCategories,
        addCustomPrimaryCategory,
        customSecondaryCategories,
        addCustomSecondaryCategory,
        brands,
        addBrand,
        getBrandLogo,
        customPersonas,
        addCustomPersona,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};