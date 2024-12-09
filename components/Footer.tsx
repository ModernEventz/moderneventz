// components/Footer.js

import { FaFacebook, FaTwitter, FaLinkedin,FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <p className="text-lg font-semibold">Modern Eventz</p>
          <p className="text-sm">osborn juncion, Kumasi, Ghana</p>
          <p className="text-sm">info@moderneventsgh.com</p>
        </div>
        <div className="mb-4 lg:mb-0">
          <p className="text-lg font-semibold">Quick Links</p>
          <ul className="list-none">
            <li className="mb-2">
              <a href="#" className="hover:text-gray-400">Home</a>
            </li>
            <li className="mb-2">
              <a href="/about-us" className="hover:text-gray-400">About Us</a>
            </li>
           
            <li className="mb-2">
              <a href="/contact-us" className="hover:text-gray-400">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="mb-4 lg:mb-0">
          <p className="text-lg font-semibold">PRODUCTS</p>
          <ul className="list-none">
            <li className="mb-2">
              <a href="/advertising" className="hover:text-gray-400">Advertising</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-400">Sign up as a vendor</a>
            </li>
 
          </ul>
        </div>
        <div>
          <p className="text-lg font-semibold">Connect With Us</p>
          <div className="flex space-x-4">
            <a href="#" className="text-xl hover:text-gray-400">
              <FaFacebook />
            </a>
            <a href="#" className="text-xl hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-gray-400">
              <FaLinkedin />
            </a>
            <a href="#" className="text-xl hover:text-gray-400">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
