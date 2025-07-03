import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const About = () => {
  const stats = [
    { icon: 'Users', value: '500+', label: 'Happy Members' },
    { icon: 'Calendar', value: '5+', label: 'Years of Excellence' },
    { icon: 'Award', value: '15+', label: 'Expert Trainers' },
    { icon: 'Activity', value: '30+', label: 'Class Types' },
  ];

  const values = [
    {
      icon: 'Heart',
      title: 'Community First',
      description: 'We believe in building a supportive community where everyone feels welcome and motivated to achieve their best.'
    },
    {
      icon: 'Target',
      title: 'Results-Driven',
      description: 'Our programs are designed with proven methods to help you reach your fitness goals effectively and safely.'
    },
    {
      icon: 'Zap',
      title: 'Innovation',
      description: 'We stay ahead of fitness trends and continuously update our equipment and programs to give you the best experience.'
    },
    {
      icon: 'Users',
      title: 'Expert Guidance',
      description: 'Our certified trainers are passionate about fitness and dedicated to helping you succeed on your journey.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Head Trainer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      bio: 'Former Olympic athlete with 15+ years of training experience'
    },
    {
      name: 'Mike Chen',
      role: 'Strength & Conditioning Coach',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      bio: 'Specializes in powerlifting and functional movement'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Yoga & Mindfulness Instructor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
      bio: 'Certified yoga instructor with focus on mental wellness'
    },
    {
      name: 'David Kim',
      role: 'HIIT & Cardio Specialist',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      bio: 'High-intensity training expert and nutrition consultant'
    }
  ];

  const timeline = [
    {
      year: '2018',
      title: 'The Beginning',
      description: 'FitPulse Studio was founded with a mission to make fitness accessible and enjoyable for everyone.'
    },
    {
      year: '2019',
      title: 'Expansion',
      description: 'Added new equipment and expanded our class offerings to include yoga, pilates, and strength training.'
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Launched virtual classes and online training programs to serve our community during challenging times.'
    },
    {
      year: '2021',
      title: 'Community Growth',
      description: 'Reached 300+ members and introduced specialized programs for seniors and youth.'
    },
    {
      year: '2022',
      title: 'Facility Upgrade',
      description: 'Renovated our space with state-of-the-art equipment and created dedicated areas for different training styles.'
    },
    {
      year: '2023',
      title: 'Excellence Recognition',
      description: 'Named "Best Fitness Studio" by local community and expanded our trainer certification programs.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            About FitPulse Studio
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We're more than just a fitness studio - we're a community dedicated to helping you 
            transform your life through movement, strength, and wellness.
          </p>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
              alt="FitPulse Studio"
              className="rounded-2xl shadow-2xl max-w-full h-auto"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <ApperIcon name={stat.icon} size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-primary to-accent text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-4">Our Mission</h2>
                <p className="text-lg opacity-90 mb-6">
                  To create an inclusive, supportive environment where individuals of all fitness levels 
                  can discover their strength, build confidence, and achieve their wellness goals through 
                  expert guidance and community support.
                </p>
                <Button variant="accent" size="large" icon="Target">
                  Join Our Mission
                </Button>
              </div>
              <div className="hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
                  alt="Mission"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These core principles guide everything we do at FitPulse Studio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ApperIcon name={value.icon} size={24} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our passionate team of certified professionals is here to support your fitness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <Card hover className="text-center h-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <Badge variant="primary" size="small" className="mb-3">
                  {member.role}
                </Badge>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From humble beginnings to becoming a cornerstone of our community's health and wellness
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary to-accent"></div>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <Card>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="accent" size="small">{item.year}</Badge>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-primary to-accent text-white">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-lg opacity-90 mb-6">
            Experience the FitPulse difference and start your transformation today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="large" icon="UserPlus">
              Start Your Journey
            </Button>
            <Button variant="outline" size="large" icon="Calendar" className="border-white text-white hover:bg-white hover:text-primary">
              Book a Tour
            </Button>
          </div>
        </Card>
      </motion.section>
    </div>
  );
};

export default About;