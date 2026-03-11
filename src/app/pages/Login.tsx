import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9f6f9] via-[#ffffff] to-[#f9f6f9]/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#dea94d]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#215b2f]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md p-8 animate-scaleIn">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#745b4e]/10 p-10 border border-[#bab0aa]/20">
          <div className="text-center mb-10">
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#745b4e] via-[#215b2f] to-[#745b4e] bg-clip-text text-transparent mb-3">Welcome Back</h1>
            <p className="text-[#bab0aa] text-lg">Sign in to Modern Trends</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[#745b4e] mb-2.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border-2 border-[#bab0aa]/30 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#215b2f]/50 focus:border-[#215b2f] transition-all shadow-sm hover:border-[#bab0aa]/50 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[#745b4e] mb-2.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border-2 border-[#bab0aa]/30 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#215b2f]/50 focus:border-[#215b2f] transition-all shadow-sm hover:border-[#bab0aa]/50 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#215b2f] via-[#215b2f] to-[#1a4825] text-white font-bold hover:shadow-2xl hover:shadow-[#215b2f]/30 hover:scale-[1.02] transition-all duration-300 text-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#bab0aa] font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#dea94d] font-bold hover:text-[#215b2f] transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}