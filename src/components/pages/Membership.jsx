import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MembershipCard from '@/components/molecules/MembershipCard';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Input from '@/components/atoms/Input';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { getMembershipPlans } from '@/services/api/membershipService';

const Membership = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    healthConditions: '',
    goals: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    loadMembershipPlans();
  }, []);

  const loadMembershipPlans = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getMembershipPlans();
      setPlans(data);
    } catch (err) {
      setError('Failed to load membership plans. Please try again.');
      console.error('Error loading membership plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowSignupForm(true);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    toast.success(`Welcome to FitPulse Studio! Your ${selectedPlan.name} membership is now active.`);
    setShowSignupForm(false);
    setSelectedPlan(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      emergencyContact: '',
      emergencyPhone: '',
      healthConditions: '',
      goals: '',
      paymentMethod: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
      city: '',
      state: '',
      zipCode: ''
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded shimmer w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded shimmer w-96"></div>
        </div>
        <Loading variant="cards" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Error message={error} onRetry={loadMembershipPlans} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Choose Your Membership
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan that fits your fitness goals and lifestyle
        </p>
      </div>

      {/* Membership Plans */}
      {!showSignupForm ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.planId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MembershipCard
                  plan={plan}
                  featured={plan.name === 'Premium'}
                  onSelect={handleSelectPlan}
                />
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <Card>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
                Why Choose FitPulse Studio?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: 'Zap',
                    title: 'State-of-the-Art Equipment',
                    description: 'Train with the latest fitness technology and equipment'
                  },
                  {
                    icon: 'Users',
                    title: 'Expert Trainers',
                    description: 'Learn from certified professionals with years of experience'
                  },
                  {
                    icon: 'Calendar',
                    title: 'Flexible Scheduling',
                    description: 'Book classes that fit your busy schedule'
                  },
                  {
                    icon: 'Heart',
                    title: 'Supportive Community',
                    description: 'Join a welcoming fitness community that motivates you'
                  },
                  {
                    icon: 'Target',
                    title: 'Personalized Programs',
                    description: 'Get customized workouts designed for your goals'
                  },
                  {
                    icon: 'Award',
                    title: 'Proven Results',
                    description: 'Join hundreds who have achieved their fitness goals'
                  }
                ].map((benefit, index) => (
                  <div key={benefit.title} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                      <ApperIcon name={benefit.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <Card>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    question: 'Can I cancel my membership anytime?',
                    answer: 'Yes, you can cancel your membership at any time with 30 days notice.'
                  },
                  {
                    question: 'Are there any setup fees?',
                    answer: 'No setup fees! The price you see is what you pay.'
                  },
                  {
                    question: 'Can I freeze my membership?',
                    answer: 'Yes, you can freeze your membership for up to 3 months per year.'
                  },
                  {
                    question: 'Do you offer day passes?',
                    answer: 'Yes, we offer day passes for $25 if you want to try before committing.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </>
      ) : (
        /* Signup Form */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Complete Your Membership
              </h2>
              <Button
                variant="ghost"
                size="small"
                icon="X"
                onClick={() => setShowSignupForm(false)}
              />
            </div>

            {/* Selected Plan Summary */}
            <div className="bg-primary/5 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Selected Plan: {selectedPlan.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">${selectedPlan.price}</span>
                <span className="text-gray-600">/{selectedPlan.duration}</span>
              </div>
            </div>

            <form onSubmit={handleSubmitSignup} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleFormChange('firstName', e.target.value)}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleFormChange('lastName', e.target.value)}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Contact Name"
                    value={formData.emergencyContact}
                    onChange={(e) => handleFormChange('emergencyContact', e.target.value)}
                    required
                  />
                  <Input
                    label="Contact Phone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleFormChange('emergencyPhone', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Health & Fitness */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Health & Fitness</h3>
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Health Conditions or Injuries</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      value={formData.healthConditions}
                      onChange={(e) => handleFormChange('healthConditions', e.target.value)}
                      placeholder="Please list any health conditions or injuries we should be aware of..."
                    />
                  </div>
                  <div>
                    <label className="form-label">Fitness Goals</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      value={formData.goals}
                      onChange={(e) => handleFormChange('goals', e.target.value)}
                      placeholder="What are your fitness goals? (e.g., weight loss, muscle gain, general fitness...)"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Payment Method</label>
                    <select
                      className="form-input"
                      value={formData.paymentMethod}
                      onChange={(e) => handleFormChange('paymentMethod', e.target.value)}
                    >
                      <option value="card">Credit/Debit Card</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>
                  
                  {formData.paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Input
                          label="Card Number"
                          value={formData.cardNumber}
                          onChange={(e) => handleFormChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <Input
                        label="Expiry Date"
                        value={formData.expiryDate}
                        onChange={(e) => handleFormChange('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        required
                      />
                      <Input
                        label="CVV"
                        value={formData.cvv}
                        onChange={(e) => handleFormChange('cvv', e.target.value)}
                        placeholder="123"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    value={formData.billingAddress}
                    onChange={(e) => handleFormChange('billingAddress', e.target.value)}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) => handleFormChange('city', e.target.value)}
                      required
                    />
                    <Input
                      label="State"
                      value={formData.state}
                      onChange={(e) => handleFormChange('state', e.target.value)}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) => handleFormChange('zipCode', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="large"
                  onClick={() => setShowSignupForm(false)}
                  className="flex-1"
                >
                  Back to Plans
                </Button>
                <Button
                  type="submit"
                  variant="gradient"
                  size="large"
                  className="flex-1"
                  icon="CreditCard"
                >
                  Complete Membership
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Membership;