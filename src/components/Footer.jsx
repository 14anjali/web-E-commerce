import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-6">
        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2">Navigation</h3>
          <a href="/home" className="hover:underline">Home</a>
          <a href="/product" className="hover:underline">Products</a>
          <a href="/cart" className="hover:underline">Cart</a>
          <a href="/wishlist" className="hover:underline">Wishlist</a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2">Contact</h3>
          <span>Email: support@mystore.com</span>
          <span>Phone: +1 234 567 890</span>
          <span>Address: 123 Main Street, City, Country</span>
        </div>

        {/* Social / Other Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
          <a href="#" className="hover:underline">Facebook</a>
          <a href="#" className="hover:underline">Twitter</a>
          <a href="#" className="hover:underline">Instagram</a>
        </div>
      </div>

      <div className="text-center text-gray-400 py-4 border-t border-gray-700">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
