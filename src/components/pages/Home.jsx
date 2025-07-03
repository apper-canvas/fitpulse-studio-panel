import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import HeroSection from '@/components/organisms/HeroSection';
import ClassCard from '@/components/molecules/ClassCard';
import TrainerCard from '@/components/molecules/TrainerCard';
import MembershipCard from '@/components/molecules/MembershipCard';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { getClasses } from '@/services/api/classService';
import { getTrainers } from '@/services/api/trainerService';
import { getMembershipPlans } from '@/services/api/membershipService';

const Home = () => {
  const [featuredClasses, setFeaturedClasses] = useState([]);
  const [featuredTrainers, setFeaturedTrainers] = useState([]);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setError('');

      const [classesData, trainersData, plansData] = await Promise.all([
        getClasses(),
        getTrainers(),
        getMembershipPlans()
      ]);

      // Get featured classes (first 3)
      setFeaturedClasses(classesData.slice(0, 3));
      
      // Get featured trainers (first 3)
      setFeaturedTrainers(trainersData.slice(0, 3));
      
      // Get membership plans
      setMembershipPlans(plansData);
    } catch (err) {
      setError('Failed to load home page data. Please try again.');
      console.error('Error loading home data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClass = (classData) => {
    toast.success(`Successfully booked ${classData.name}!`);
  };

  const handleSelectMembership = (plan) => {
    toast.info(`Redirecting to membership signup for ${plan.name}...`);
  };

  if (loading) {
    return (
      <div className="space-y-12">
        <div className="hero-section">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-96 bg-white/20 rounded-xl shimmer"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Loading variant="cards" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Error message={error} onRetry={loadHomeData} />
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Classes */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Featured Classes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular classes designed to challenge and inspire you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {featuredClasses.map((classData) => (
            <motion.div
              key={classData.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ClassCard 
                classData={classData} 
                onBook={handleBookClass}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button as={Link} to="/classes" variant="outline" size="large">
            View All Classes
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose FitPulse Studio?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're more than just a gym - we're your fitness family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'Users',
                title: 'Expert Trainers',
                description: 'Our certified trainers are here to guide you every step of the way',
                color: 'text-primary'
              },
              {
                icon: 'Calendar',
                title: 'Flexible Scheduling',
                description: 'Choose from 30+ classes per week that fit your busy lifestyle',
                color: 'text-accent'
              },
              {
                icon: 'Heart',
                title: 'Supportive Community',
                description: 'Join a welcoming community that celebrates your achievements',
                color: 'text-success'
              },
              {
                icon: 'Zap',
                title: 'State-of-the-Art Equipment',
                description: 'Train with the latest fitness technology and equipment',
                color: 'text-info'
              },
              {
                icon: 'Target',
                title: 'Personalized Programs',
                description: 'Get customized workouts designed for your specific goals',
                color: 'text-warning'
              },
              {
                icon: 'Trophy',
                title: 'Proven Results',
                description: 'Join hundreds of members who have achieved their fitness goals',
                color: 'text-error'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${feature.color}`}>
                    <ApperIcon name={feature.icon} size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trainers */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Meet Our Trainers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from certified professionals who are passionate about helping you succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {featuredTrainers.map((trainer) => (
            <motion.div
              key={trainer.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TrainerCard trainer={trainer} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button as={Link} to="/trainers" variant="outline" size="large">
            Meet All Trainers
          </Button>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Choose Your Membership
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect plan that fits your fitness goals and lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <motion.div
                key={plan.planId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MembershipCard 
                  plan={plan} 
                  featured={plan.name === 'Premium'}
                  onSelect={handleSelectMembership}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-primary/90 to-accent/80 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join FitPulse Studio today and discover what you're truly capable of
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="large" icon="UserPlus">
              Join Now
            </Button>
            <Button variant="outline" size="large" icon="Calendar">
              Book Free Trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;