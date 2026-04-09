import React from 'react';
import { LiquidAccordion } from '../components/accordion';
import { Sparkles, Zap, Shield, Layers, Globe } from 'lucide-react';

export const AccordionDemo: React.FC = () => {
  const items = [
    {
      id: 'what',
      title: 'What makes this accordion different?',
      content: 'Unlike any accordion ever built, this component features a liquid mercury border that flows and pulses when the panel is active. The border uses CSS Houdini @property for angle-based conic-gradient rotation, creating an effect that\'s literally impossible with standard CSS. The content reveals with a spring-physics height animation.',
      icon: <Sparkles size={18} />,
    },
    {
      id: 'performance',
      title: 'How is the performance optimized?',
      content: 'Every animation runs on the GPU compositor thread using transform and opacity — never triggering layout recalculations. The height animation measures scrollHeight once and transitions via CSS, not JavaScript. The liquid border uses @property to animate a custom CSS variable, delegating interpolation entirely to the browser\'s rendering engine.',
      icon: <Zap size={18} />,
    },
    {
      id: 'accessible',
      title: 'Is this component fully accessible?',
      content: 'Absolutely. Every panel header is a native <button> with aria-expanded state. Content regions use role="region" with matching aria-controls IDs. The component supports both single-select (radio behavior) and multi-select (checkbox behavior) modes through the allowMultiple prop.',
      icon: <Shield size={18} />,
    },
    {
      id: 'portable',
      title: 'Can I copy this into my project?',
      content: 'Yes — the component is completely self-contained. Copy the component folder and the relevant CSS section (clearly labeled LIQUID ACCORDION in index.css) into your project. The only dependency is lucide-react for the chevron icon, which you can replace with any SVG.',
      icon: <Layers size={18} />,
    },
    {
      id: 'responsive',
      title: 'Does it work on mobile devices?',
      content: 'The accordion is fully responsive with fluid typography and spacing. On smaller screens, the padding and font sizes adapt proportionally. Touch targets exceed the 44px minimum recommended by WCAG guidelines, ensuring comfortable interaction on any device.',
      icon: <Globe size={18} />,
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{
        backgroundColor: '#030712',
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.06) 0%, transparent 50%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <div className="text-center mb-16 z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Liquid <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Morphing</span> Accordion
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
          Mercury-like borders that pulse and flow on the active panel. Built with CSS Houdini for effects impossible with standard CSS.
        </p>
      </div>

      {/* Accordion */}
      <div className="w-full max-w-2xl z-10">
        <LiquidAccordion items={items} />
      </div>
    </div>
  );
};
