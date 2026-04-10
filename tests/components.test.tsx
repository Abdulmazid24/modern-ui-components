import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock framer-motion to avoid animation issues in test env
vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag: string) => {
      return React.forwardRef((props: any, ref: any) => {
        const { 
          initial, animate, exit, variants, whileHover, whileTap, 
          whileInView, whileDrag, drag, dragConstraints, dragElastic,
          dragSnapToOrigin, dragMomentum, layout, transition,
          onDragStart, onDragEnd, onAnimationComplete,
          ...rest 
        } = props;
        return React.createElement(tag, { ...rest, ref });
      });
    }
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  useMotionValue: (init: number) => ({ get: () => init, set: () => {}, onChange: () => () => {} }),
  useSpring: (val: any) => val,
  useTransform: (val: any, input?: any, output?: any) => {
    if (typeof val === 'function') return { get: val };
    return { get: () => (typeof val === 'number' ? val : 0) };
  },
  useAnimation: () => ({ start: () => Promise.resolve(), stop: () => {} }),
  useInView: () => true,
}));

// ============================================================
// Smoke Tests: Ensure every component renders without crashing
// ============================================================
describe('Component Registry Smoke Tests', () => {

  it('renders FrequencyEqualizer without crashing', async () => {
    const { FrequencyEqualizer } = await import('../packages/react/audio-eq/FrequencyEqualizer');
    const { container } = render(React.createElement(FrequencyEqualizer));
    expect(container).toBeTruthy();
  });

  it('renders CyberGauge without crashing', async () => {
    const { CyberGauge } = await import('../packages/react/gauge/CyberGauge');
    const { container } = render(React.createElement(CyberGauge));
    expect(container).toBeTruthy();
  });

  it('renders FanOutSwatches without crashing', async () => {
    const { FanOutSwatches } = await import('../packages/react/color-palette/FanOutSwatches');
    const { container } = render(React.createElement(FanOutSwatches));
    expect(container).toBeTruthy();
  });

  it('renders VaultPasswordMeter without crashing', async () => {
    const { VaultPasswordMeter } = await import('../packages/react/password-meter/VaultPasswordMeter');
    const { container } = render(React.createElement(VaultPasswordMeter));
    expect(container).toBeTruthy();
  });

  it('renders NeumorphicPricing without crashing', async () => {
    const { NeumorphicPricing } = await import('../packages/react/pricing-cards/NeumorphicPricing');
    const { container } = render(React.createElement(NeumorphicPricing));
    expect(container).toBeTruthy();
  });

  it('renders PulseActivityLog without crashing', async () => {
    const { PulseActivityLog } = await import('../packages/react/activity-feed/PulseActivityLog');
    const { container } = render(React.createElement(PulseActivityLog));
    expect(container).toBeTruthy();
  });

});
