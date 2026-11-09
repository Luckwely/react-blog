import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="mt-auto w-full shrink-0 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-10 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <h1 className="text-3xl font-bold mb-4 text-white">Myblog</h1>
           
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Catégories</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Technologie
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Lifestyle
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Voyage
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-300">
                <MdEmail size={18} />
                <span>contact@myblog.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <MdPhone size={18} />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <MdLocationOn size={18} />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 Myblog. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}
