"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

export interface InteractiveOtpFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onSuccess?: () => void;
  onFail?: () => void;
  expectedOtp?: string;
}

type Status = "idle" | "success" | "error";

export const InteractiveOtpForm = React.forwardRef<HTMLDivElement, InteractiveOtpFormProps>(
  ({ className, onSuccess, onFail, expectedOtp = "123456", ...props }, ref) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [status, setStatus] = useState<Status>("idle");
  const [timer, setTimer] = useState(30);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return;

    if (enteredOtp === expectedOtp) {
      setStatus("success");
      onSuccess?.();
    } else {
      setStatus("error");
      onFail?.();
    }
  };

  const handleClosePopup = () => {
    if (status === "success") {
      // Reset form on close after success
      setOtp(Array(6).fill(""));
      setTimer(30);
      inputRefs.current[0]?.focus();
    } else {
      // Clear inputs on error
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    }
    setStatus("idle");
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col items-center justify-center p-8 rounded-3xl bg-[#1c1c1e] text-white w-[380px] overflow-hidden font-sans",
        className
      )}
      style={{
        boxShadow: "10px 10px 20px #0e0e10, -10px -10px 20px #2a2a2c",
      }}
      {...props}
    >
      <h2 className="text-2xl font-semibold mb-2">Verify Code</h2>
      <p className="text-sm text-gray-400 mb-8">Enter the 6-digit code</p>

      {/* Inputs (Debossed "Holes") */}
      <div className="flex gap-3 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-12 text-center text-xl font-bold bg-[#1c1c1e] text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            style={{
              // DEBOSSED SHADOW (গর্তের মত)
              boxShadow: "inset 3px 3px 6px #0d0d0e, inset -3px -3px 6px #2b2b2e",
            }}
          />
        ))}
      </div>

      {/* Verify Button (Embossed) */}
      <button
        onClick={handleVerify}
        disabled={otp.join("").length !== 6}
        className={cn(
          "w-full py-3 rounded-xl font-semibold transition-all duration-300",
          otp.join("").length === 6 
            ? "bg-indigo-600 text-white cursor-pointer hover:bg-indigo-500 active:scale-95" 
            : "bg-indigo-600/50 text-white/50 cursor-not-allowed"
        )}
        style={{
          boxShadow: otp.join("").length === 6 ? "4px 4px 10px #0d0d0e, -4px -4px 10px #2b2b2e" : "none",
        }}
      >
        Verify
      </button>

      {/* Resend Timer */}
      <p className="text-sm text-gray-400 mt-6">
        {timer > 0 ? (
          <>Resend in <span className="text-indigo-400">{timer}s</span></>
        ) : (
          <button 
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            onClick={() => setTimer(30)}
          >
            Resend Code
          </button>
        )}
      </p>

      {/* Popups */}
      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1c1c1e]/80 backdrop-blur-sm z-10 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#242426] p-6 rounded-2xl flex flex-col items-center text-center w-full max-w-[280px]"
              style={{
                boxShadow: "10px 10px 20px #0e0e10, -10px -10px 20px #2a2a2c",
              }}
            >
              {status === "success" ? (
                <>
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Success</h3>
                  <p className="text-sm text-gray-400 mb-6">OTP verified successfully 🎉</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Error</h3>
                  <p className="text-sm text-gray-400 mb-6">Invalid OTP. Try again</p>
                </>
              )}

              <button
                onClick={handleClosePopup}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition-colors active:scale-95"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

InteractiveOtpForm.displayName = "InteractiveOtpForm";
