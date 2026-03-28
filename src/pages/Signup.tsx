import React, { useState } from 'react';
import { NeumorphicCard } from '../components/NeumorphicCard';
import { NeumorphicInput } from '../components/NeumorphicInput';
import { NeumorphicButton } from '../components/NeumorphicButton';
import { Eye, EyeOff, Mail, User } from 'lucide-react';

interface SignupProps {
  onSwitchToLogin?: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Signup Successful!');
    }, 1500);
  };

  return (
    <div className="neo-container min-h-screen flex items-center justify-center p-6 transition-all duration-300">
      <NeumorphicCard className="max-w-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-8 tracking-wide">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="w-full flex flex-col gap-6">
          <NeumorphicInput
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-label="Full Name"
            icon={<User size={20} />}
          />

          <NeumorphicInput
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Email Address"
            icon={<Mail size={20} />}
          />

          <NeumorphicInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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

          <NeumorphicInput
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            aria-label="Confirm Password"
            icon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="focus:outline-none hover:text-gray-700 transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />

          <div className="mt-4 mx-auto w-1/2">
            <NeumorphicButton type="submit" disabled={loading} className="w-full">
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
              ) : (
                'Sign Up'
              )}
            </NeumorphicButton>
          </div>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            type="button"
            className="font-bold text-gray-600 hover:text-gray-800 underline transition"
          >
            Sign In
          </button>
        </p>
      </NeumorphicCard>
    </div>
  );
};
