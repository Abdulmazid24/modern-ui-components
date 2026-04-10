import React from 'react';
import { AuroraInput, AuroraTextarea } from '../components/aurora-input';
import { Mail, Lock, User, Search } from 'lucide-react';

export const AuroraInputDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{
        backgroundColor: '#020617',
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div className="text-center mb-16 z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Aurora <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Input Fields</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
          Northern lights gradient that follows your cursor and intensifies on focus. 
          Hover and click on the inputs below.
        </p>
      </div>

      <div className="w-full max-w-md z-10 flex flex-col gap-6">
        <AuroraInput
          label="Full Name"
          placeholder="Abdul Mazid"
          icon={<User size={18} />}
          inputSize="md"
        />

        <AuroraInput
          label="Email Address"
          type="email"
          placeholder="hello@example.com"
          icon={<Mail size={18} />}
          inputSize="md"
          helperText="We'll never share your email with anyone."
        />

        <AuroraInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Lock size={18} />}
          inputSize="md"
        />

        <AuroraInput
          label="Username"
          placeholder="Not available"
          error="This username is already taken"
          icon={<User size={18} />}
          inputSize="md"
        />

        <AuroraInput
          label="Search"
          placeholder="Search components..."
          icon={<Search size={18} />}
          inputSize="lg"
        />

        <AuroraTextarea
          label="Message"
          placeholder="Tell us about your project..."
          rows={4}
        />

        <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all text-sm mt-2">
          Submit Form
        </button>
      </div>
    </div>
  );
};
