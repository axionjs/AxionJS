"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiCloudinary,
  SiPostgresql,
} from "react-icons/si";
import { Shield } from "lucide-react";
import Image from "next/image";

const techStack = [
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
    angle: 0,
    isImage: false,
  },
  { name: "React", icon: SiReact, color: "#61DAFB", angle: 45, isImage: false },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    angle: 90,
    isImage: false,
  },
  {
    name: "NextAuth.js",
    icon: null,
    color: "#000000",
    angle: 135,
    isImage: true,
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    angle: 180,
    isImage: false,
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    color: "#2D3748",
    angle: 225,
    isImage: false,
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#336791",
    angle: 270,
    isImage: false,
  },
  {
    name: "Cloudinary",
    icon: SiCloudinary,
    color: "#3448C5",
    angle: 315,
    isImage: false,
  },
];

const RevolvingTechStack = () => {
  return (
    <div className="relative w-[500px] h-[500px] mx-auto">
      {/* Multiple ripple circles */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-8 border border-4 border-gray-100 rounded-full opacity-40"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute inset-4 border-4 border-gray-100 rounded-full opacity-30"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute inset-0 border-4 border-gray-100 rounded-full opacity-20"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute -inset-4 border border-gray-100 rounded-full opacity-15"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -inset-8 border border-gray-100 rounded-full opacity-10"
      />
      <motion.div
        animate={{ scale: [1, 1.35, 1] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        className="absolute -inset-12 border border-gray-100 rounded-full opacity-5"
      />

      {/* Center logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-black rounded-full flex items-center justify-center z-10 shadow-xl">
        <Shield className="w-14 h-14 text-white" />
      </div>

      {/* Revolving circle - only the container rotates */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        {techStack.map((tech, index) => {
          const radius = 170;
          const x = Math.cos((tech.angle * Math.PI) / 180) * radius;
          const y = Math.sin((tech.angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={`${tech.name}-${index}`}
              className="absolute w-18 h-18 bg-white rounded-2xl flex items-center justify-center border border-gray-200 hover:shadow-xl transition-all duration-300 group shadow-md"
              style={{
                left: `calc(50% + ${x}px - 36px)`,
                top: `calc(50% + ${y}px - 36px)`,
                width: "72px",
                height: "72px",
              }}
              // Counter-rotate to keep icons upright
              animate={{ rotate: -360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              whileHover={{ scale: 1.1 }}
            >
              {tech.isImage ? (
                <div className="w-10 h-10 relative">
                  <Image
                    src="/auth.png"
                    alt="NextAuth.js"
                    fill
                    className="object-contain"
                    sizes="40px"
                  />
                </div>
              ) : (
                <tech.icon
                  className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: tech.color }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main orbit circle */}
      <div className="absolute inset-0 border border-gray-200 rounded-full opacity-30"></div>

      {/* Inner guide circle */}
      <div className="absolute inset-16 border border-gray-150 rounded-full opacity-20"></div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 ">
        {/* Hero Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-screen">
          {/* Left Column - Content */}
          <div className="space-y-10">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600"
              >
                <Shield className="w-4 h-4 mr-2" />
                Enterprise Authentication System
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-7xl font-light text-black leading-tight"
              >
                Secure
                <br />
                <span className="font-medium">RBAC Auth</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                Modern authentication system with role-based access control.
                Built with cutting-edge technologies for enterprise
                applications.
              </motion.p>

              {/* Tech Stack Names */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4"
              >
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                  Powered by Modern Stack
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                    React
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                    Prisma
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                    PostgreSQL
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                    NextAuth.js
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                    Cloudinary
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center space-x-6"
            >
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Production Ready</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">TypeScript</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Secure</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Revolving Tech Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center"
          >
            <RevolvingTechStack />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
