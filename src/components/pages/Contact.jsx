import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Visit Us',
      details: ['123 Fitness Street', 'Health District, City, State 12345'],
      action: 'Get Directions'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      details: ['(555) 123-4567', 'Mon-Fri: 6AM-10PM', 'Sat-Sun: 7AM-8PM'],
      action: 'Call Now'
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      details: ['info@fitpulsestudio.com', 'support@fitpulsestudio.com'],
      action: 'Send Email'
    },
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      details: ['Available 24/7', 'Instant responses', 'Expert support'],
      action: 'Start Chat'
    }
  ];

  const faqs = [
    {
      question: 'What are your operating hours?',
      answer: 'We\'re open Monday-Friday 6AM-10PM, Saturday 7AM-8PM, and Sunday 8AM-6PM.'
    },
    {
      question: 'Do you offer trial memberships?',
      answer: 'Yes! We offer a 7-day free trial for new members to experience our facilities and classes.'
    },
    {
      question: 'What should I bring for my first visit?',
      answer: 'Just bring comfortable workout clothes, a water bottle, and a positive attitude! We provide towels and basic equipment.'
    },
    {
      question: 'Do you offer personal training?',
      answer: 'Absolutely! Our certified trainers offer personalized one-on-one sessions and small group training.'
    },
    {
      question: 'Is parking available?',
      answer: 'Yes, we have free parking available for all members and visitors in our dedicated lot.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our classes, membership, or facilities? We'd love to hear from you!
          </p>
        </motion.div>
      </div>

      {/* Contact Cards */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="text-center h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <ApperIcon name={info.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-600">{detail}</p>
                  ))}
                </div>
                <Button variant="outline" size="small" className="w-full">
                  {info.action}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                />
                <div>
                  <label className="form-label">Subject</label>
                  <select
                    className="form-input"
                    value={formData.subject}
                    onChange={(e) => handleFormChange('subject', e.target.value)}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="classes">Class Information</option>
                    <option value="personal-training">Personal Training</option>
                    <option value="facilities">Facilities Tour</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Message</label>
                <textarea
                  className="form-input"
                  rows="5"
                  value={formData.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <Button type="submit" variant="gradient" size="large" className="w-full" icon="Send">
                Send Message
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <Card>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <ApperIcon name="HelpCircle" size={16} className="text-primary" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="primary" size="medium" className="w-full" icon="Calendar">
                Schedule a Tour
              </Button>
              <Button variant="outline" size="medium" className="w-full" icon="UserPlus">
                Start Free Trial
              </Button>
              <Button variant="ghost" size="medium" className="w-full" icon="Download">
                Download Class Schedule
              </Button>
            </div>
          </Card>

          {/* Studio Hours */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Studio Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">6:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">7:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">8:00 AM - 6:00 PM</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
            <h2 className="text-2xl font-display font-bold mb-2">Visit Our Studio</h2>
            <p className="opacity-90">Located in the heart of the city, easily accessible by car or public transport</p>
          </div>
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <ApperIcon name="MapPin" size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive map would be displayed here</p>
              <p className="text-sm text-gray-500">123 Fitness Street, Health District, City, State 12345</p>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <Card className="bg-gradient-to-r from-primary to-accent text-white">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-6">
            Join hundreds of satisfied members who have transformed their lives at FitPulse Studio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="large" icon="UserPlus">
              Join Now
            </Button>
            <Button variant="outline" size="large" icon="Calendar" className="border-white text-white hover:bg-white hover:text-primary">
              Book Free Trial
            </Button>
          </div>
        </Card>
      </motion.section>
    </div>
  );
};

export default Contact;