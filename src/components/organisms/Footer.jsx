import { Link } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Footer = () => {
  const quickLinks = [
    { name: 'Classes', href: '/classes' },
    { name: 'Trainers', href: '/trainers' },
    { name: 'Membership', href: '/membership' },
    { name: 'About', href: '/about' },
  ];

  const classTypes = [
    { name: 'Yoga', href: '/classes?type=yoga' },
    { name: 'HIIT', href: '/classes?type=hiit' },
    { name: 'Strength', href: '/classes?type=strength' },
    { name: 'Cardio', href: '/classes?type=cardio' },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: 'Instagram', href: '#' },
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'YouTube', icon: 'Youtube', href: '#' },
  ];

  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="gradient-bg-accent p-2 rounded-lg">
                <ApperIcon name="Zap" size={24} className="text-secondary" />
              </div>
              <span className="text-2xl font-display font-bold text-white">
                FitPulse Studio
              </span>
            </Link>
            <p className="text-gray-300 mb-6">
              Transform your body and mind with our premium fitness classes and expert trainers.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={social.name}
                >
                  <ApperIcon name={social.icon} size={20} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Popular Classes</h3>
            <ul className="space-y-2">
              {classTypes.map((classType) => (
                <li key={classType.name}>
                  <Link
                    to={classType.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {classType.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <ApperIcon name="MapPin" size={16} className="text-accent" />
                <span className="text-gray-300">123 Fitness Street, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <ApperIcon name="Phone" size={16} className="text-accent" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <ApperIcon name="Mail" size={16} className="text-accent" />
                <span className="text-gray-300">info@fitpulsestudio.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Hours */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Studio Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-accent font-semibold">Monday - Friday</div>
              <div className="text-gray-300">6:00 AM - 10:00 PM</div>
            </div>
            <div className="text-center">
              <div className="text-accent font-semibold">Saturday</div>
              <div className="text-gray-300">7:00 AM - 8:00 PM</div>
            </div>
            <div className="text-center">
              <div className="text-accent font-semibold">Sunday</div>
              <div className="text-gray-300">8:00 AM - 6:00 PM</div>
            </div>
            <div className="text-center">
              <div className="text-accent font-semibold">Holidays</div>
              <div className="text-gray-300">Varies</div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Get the latest class schedules and fitness tips</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button variant="accent" size="medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 FitPulse Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;