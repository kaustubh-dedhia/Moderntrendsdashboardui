import { createBrowserRouter, Navigate } from 'react-router';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import YourBrands from './pages/YourBrands';
import YourProducts from './pages/YourProducts';
import MarketReady from './pages/MarketReady';
import EcoReady from './pages/EcoReady';
import Selling from './pages/Selling';
import ProductDetails from './pages/ProductDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'add-product',
        element: <AddProduct />,
      },
      {
        path: 'edit-product/:id',
        element: <EditProduct />,
      },
      {
        path: 'brands',
        element: <YourBrands />,
      },
      {
        path: 'products',
        element: <YourProducts />,
      },
      {
        path: 'market-ready/:id',
        element: <MarketReady />,
      },
      {
        path: 'eco-ready/:id',
        element: <EcoReady />,
      },
      {
        path: 'selling',
        element: <Selling />,
      },
      {
        path: 'product/:id',
        element: <ProductDetails />,
      },
    ],
  },
]);