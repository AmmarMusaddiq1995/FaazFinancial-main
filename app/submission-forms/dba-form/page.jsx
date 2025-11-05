"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function DBATrademarkForm() {
  return (
    <AuroraBackground className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            Start Your DBA Trademark Registration
          </motion.h1>
          <p className="text-gray-200 mt-2">
            Fill out the form below to begin your DBA trademark registration.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <Label htmlFor="businessName" className="text-white">
              Business Legal Name
            </Label>
            <Input
              id="businessName"
              placeholder="Enter business name"
              className="bg-white/20 text-white border-white/30 focus:ring-green-600"
            />
          </div>

          <div>
            <Label htmlFor="tradeName" className="text-white">
              Proposed Trade Name
            </Label>
            <Input
              id="tradeName"
              placeholder="Enter trade name"
              className="bg-white/20 text-white border-white/30 focus:ring-green-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="formationDate" className="text-white">
                Business Formation Date
              </Label>
              <Input
                id="formationDate"
                type="date"
                className="bg-white/20 text-white border-white/30 focus:ring-green-600"
              />
            </div>

            <div>
              <Label htmlFor="dob" className="text-white">
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                className="bg-white/20 text-white border-white/30 focus:ring-green-600"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="text-white">
              Business Address
            </Label>
            <Input
              id="address"
              placeholder="e.g., 123 Main Street, City, State"
              className="bg-white/20 text-white border-white/30 focus:ring-green-600"
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-xl shadow-md"
            >
              Start Registration
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </AuroraBackground>
  );
}
