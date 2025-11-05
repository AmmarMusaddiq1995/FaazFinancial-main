"use client";

import React from "react";
import { motion } from "framer-motion";

export const AuroraBackground = ({ children, className }) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-900 ${className}`}
    >
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute -inset-[10%] bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.4),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.3),transparent_60%)] blur-3xl"
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
