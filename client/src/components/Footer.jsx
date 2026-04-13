import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiGithub } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-gray-400 py-20 border-t border-white/5 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">🔥</span>
              <span className="text-2xl font-poppins font-black text-white tracking-tight">Foodie</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Delivering the finest flavors from around the world straight to your doorstep. Quality and speed in every bite.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<FiFacebook />} />
              <SocialLink icon={<FiTwitter />} />
              <SocialLink icon={<FiInstagram />} />
              <SocialLink icon={<FiGithub />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-poppins font-black uppercase text-xs tracking-[0.2em]">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-white font-poppins font-black uppercase text-xs tracking-[0.2em]">Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-poppins font-black uppercase text-xs tracking-[0.2em]">Get in Touch</h4>
            <div className="text-sm space-y-4">
              <p>📍 123 Flavor Street, Culinary City, CC 54321</p>
              <p>📞 +1 (234) 567-890</p>
              <p>✉️ support@foodie.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-600">
          <p>&copy; {new Date().getFullYear()} Foodie Plateform. Engineered for Excellence.</p>
          <div className="flex space-x-8">
            <span className="hover:text-gray-400 cursor-pointer">Security</span>
            <span className="hover:text-gray-400 cursor-pointer">Status</span>
            <span className="hover:text-gray-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all duration-300">
    {icon}
  </a>
);

export default Footer;
