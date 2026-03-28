import React, { useState } from 'react';
import { NeumorphicCard } from '../components/NeumorphicCard';
import { NeumorphicInput } from '../components/NeumorphicInput';
import { NeumorphicButton } from '../components/NeumorphicButton';
import { Eye, EyeOff, Mail } from 'lucide-react';

interface LoginProps {
  onSwitchToSignup?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Login Successful!');
    }, 1500);
  };

  return (
    <div className="neo-container min-h-screen flex items-center justify-center p-6 transition-all duration-300">
      <NeumorphicCard>
        <h1 className="text-3xl font-bold text-gray-700 mb-8 tracking-wide">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
          <div className="relative">
            <NeumorphicInput
              type="text"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email or Username"
              icon={<Mail size={20} />}
            />
          </div>

          <div className="relative">
            <NeumorphicInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
          </div>

          <div className="flex justify-end pr-2 mt-[-10px]">
             <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition">
               Forgot password?
             </button>
          </div>

          <div className="mt-4 mx-auto w-1/2">
            <NeumorphicButton type="submit" disabled={loading} className="w-full">
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
              ) : (
                'Sign In'
              )}
            </NeumorphicButton>
          </div>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            type="button"
            className="font-bold text-gray-600 hover:text-gray-800 underline transition"
          >
            Sign Up
          </button>
        </p>
      </NeumorphicCard>
    </div>
  );
};
