"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { cn } from "@/utils";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
    className?: string;
}

export interface SneakerProductCardProps {
  name?: string;
  brand?: string;
  price?: number;
  rating?: number;
  sizes?: number[];
  images?: ProductImage[];
  onAddToCart?: () => void;
    className?: string;
}

const defaultImages: ProductImage[] = [
  { id: "1", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=400&fit=crop", alt: "Red sneaker" },
  { id: "2", url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=400&fit=crop", alt: "White sneaker" },
  { id: "3", url: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&h=400&fit=crop", alt: "Green sneaker" },
  { id: "4", url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=400&fit=crop", alt: "Multi sneaker" },
];

export const SneakerProductCard = React.forwardRef<any, SneakerProductCardProps>(({ className, name = "Nike Air Zoom", brand = "Nike", price = 149.99, rating = 4.8, sizes = [7, 8, 9, 10], images = defaultImages, onAddToCart, ...props }, ref) => {
        const [activeImage, setActiveImage] = useState(0);
        const [selectedSize, setSelectedSize] = useState<number | null>(null);
        const [liked, setLiked] = useState(false);
        const [addedToCart, setAddedToCart] = useState(false);

        const handleAddToCart = () => {
        setAddedToCart(true);
        onAddToCart?.();
        setTimeout(() => setAddedToCart(false), 2000);
        };

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-sm rounded-3xl overflow-hidden", className)}
          style={{
            background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.08)",
          }}
        >
          {/* Top Bar: Brand + Wishlist */}
          <div className="flex items-center justify-between px-5 pt-5">
            <div>
              <span className="text-[10px] text-violet-400 font-bold tracking-[0.3em] uppercase">{brand}</span>
              <h2 className="text-white text-lg font-black tracking-tight">{name}</h2>
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setLiked(!liked)}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer"
            >
              <Heart
                size={16}
                fill={liked ? "#ef4444" : "none"}
                stroke={liked ? "#ef4444" : "#71717a"}
                className="transition-colors"
              />
            </motion.button>
          </div>

          {/* Main Image Area */}
          <div className="relative px-5 py-4">
            <div className="flex gap-3">
              {/* Thumbnail Strip */}
              <div className="flex flex-col gap-2">
                {images.map((img, i) => (
                  <motion.button
                    key={img.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(i)}
                    className="w-12 h-12 rounded-xl overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0"
                    style={{
                      borderColor: activeImage === i ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.08)",
                      boxShadow: activeImage === i ? "0 0 12px rgba(124,58,237,0.3)" : "none",
                    }}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>

              {/* Main Image with Animation */}
              <div className="flex-1 relative h-48 rounded-2xl overflow-hidden bg-zinc-900/50">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={images[activeImage].url}
                    alt={images[activeImage].alt}
                    initial={{ opacity: 0, scale: 1.1, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.95, rotate: 3 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm">
                  <Star size={10} fill="#fbbf24" stroke="#fbbf24" />
                  <span className="text-[10px] text-white font-bold">{rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="px-5 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 font-semibold">Size</span>
              <div className="flex gap-1.5">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedSize(size)}
                    className="w-9 h-9 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center justify-center"
                    style={{
                      background: selectedSize === size
                        ? "linear-gradient(135deg, #7c3aed, #6d28d9)"
                        : "rgba(255,255,255,0.05)",
                      color: selectedSize === size ? "#fff" : "#a1a1aa",
                      border: selectedSize === size
                        ? "1px solid rgba(124,58,237,0.5)"
                        : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: selectedSize === size ? "0 0 12px rgba(124,58,237,0.25)" : "none",
                    }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Price + Add to Cart */}
          <div className="flex items-center justify-between px-5 pb-5 pt-2">
            <div>
              <span className="text-2xl font-black text-white">${price}</span>
              <span className="text-xs text-zinc-600 ml-1 line-through">${(price * 1.3).toFixed(0)}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all"
              style={{
                background: addedToCart
                  ? "linear-gradient(135deg, #059669, #10b981)"
                  : "linear-gradient(135deg, #f59e0b, #f97316)",
                color: "#fff",
                boxShadow: addedToCart
                  ? "0 0 20px rgba(16,185,129,0.3)"
                  : "0 0 20px rgba(245,158,11,0.25)",
              }}
            >
              <ShoppingCart size={14} />
              {addedToCart ? "Added!" : "Add To Cart"}
            </motion.button>
          </div>
        </div>
        );
        });
