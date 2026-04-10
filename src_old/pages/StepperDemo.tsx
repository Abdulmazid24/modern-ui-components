import React, { useState } from 'react';
import { LiquidStepper } from '../components/stepper';

export const StepperDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(2); // Start at step 3

  const steps = [
    { id: 'account', label: 'Account', description: 'Create your account' },
    { id: 'profile', label: 'Profile', description: 'Set up your profile' },
    { id: 'billing', label: 'Billing', description: 'Payment information' },
    { id: 'review', label: 'Review', description: 'Confirm your details' },
    { id: 'complete', label: 'Complete', description: 'All done!' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-12"
      style={{
        backgroundColor: '#030712',
        backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Liquid <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Stepper</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Click any step to navigate. The liquid fill animates with a morphing blob at its tip, 
          and the active step pulses with a breathing glow.
        </p>
      </div>

      <div className="w-full max-w-3xl z-10">
        <LiquidStepper
          steps={steps}
          currentStep={currentStep}
          onChange={setCurrentStep}
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 z-10">
        <button
          onClick={() => setCurrentStep((p) => Math.max(p - 1, 0))}
          disabled={currentStep === 0}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep((p) => Math.min(p + 1, steps.length - 1))}
          disabled={currentStep === steps.length - 1}
          className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/30 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
        >
          Next Step
        </button>
      </div>

      {/* Current step info */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 z-10 text-center">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Current Step</p>
        <p className="text-white font-bold text-lg">{steps[currentStep].label}</p>
        <p className="text-white/50 text-sm">{steps[currentStep].description}</p>
      </div>
    </div>
  );
};
