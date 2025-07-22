import React from "react";
import { Link } from "react-router-dom";
import { brandName } from "../../../data";

const Footer = () => {
  return (
    <footer className="text-black py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Info */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold">{brandName}</h3>
          <p className="text-sm text-black/80 mt-1">
            Curated lifestyle picks, trusted by thousands.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <Link to="/faq" className="hover:underline hover:text-white/90">FAQs</Link>
          <Link to="/returns" className="hover:underline hover:text-black/90">Returns</Link>
          <Link to="/shipping" className="hover:underline hover:text-black/90">Shipping</Link>
          <Link to="/support" className="hover:underline hover:text-black/90">Support</Link>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 text-center text-xs text-black/70">
        &copy; {new Date().getFullYear()} <span className="font-semibold">{brandName}</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
