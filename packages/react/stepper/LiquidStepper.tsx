"use client";

import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface LiquidStepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  onChange?: (stepIndex: number) => void;
}

export const LiquidStepper: React.FC<LiquidStepperProps> = ({
  steps,
  currentStep,
  onChange,
}) => {
  return (
    <div className="liquid-stepper">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <React.Fragment key={step.id}>
            {/* Step Node */}
            <button
              className={`liquid-step-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isUpcoming ? 'upcoming' : ''}`}
              onClick={() => onChange?.(index)}
              aria-current={isActive ? 'step' : undefined}
            >
              {/* Glow ring for active state */}
              {isActive && <div className="liquid-step-glow" />}

              {/* Circle */}
              <div className="liquid-step-circle">
                {isCompleted ? (
                  <Check size={18} strokeWidth={3} />
                ) : (
                  <span className="liquid-step-number">{index + 1}</span>
                )}
              </div>

              {/* Label & Description */}
              <div className="liquid-step-text">
                <span className="liquid-step-label">{step.label}</span>
                {step.description && (
                  <span className="liquid-step-desc">{step.description}</span>
                )}
              </div>
            </button>

            {/* Connector bar between steps */}
            {index < steps.length - 1 && (
              <div className="liquid-step-connector">
                <div
                  className="liquid-step-fill"
                  style={{
                    transform: `scaleX(${index < currentStep ? 1 : 0})`,
                  }}
                />
                {/* Liquid blob at the tip of the fill */}
                {index === currentStep - 1 && (
                  <div className="liquid-blob" />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
