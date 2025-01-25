import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/">
          <div className="text-white font-bold text-lg hover:text-gray-300">
            My Docs Site
          </div>
        </Link>
        <div className="flex space-x-4">
          <Link href="/docs">
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Docs
            </div>
          </Link>
          <Link href="/docs/form-builder">
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Form Builder
            </div>
          </Link>
          <Link href="/docs/ai-page-builder">
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              AI Page Builder
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
