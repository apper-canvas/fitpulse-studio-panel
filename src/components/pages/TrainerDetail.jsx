import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import ClassCard from '@/components/molecules/ClassCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { getTrainerById } from '@/services/api/trainerService';
import { getClasses } from '@/services/api/classService';

const TrainerDetail = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [trainerClasses, setTrainerClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTrainerDetail();
  }, [id]);

  const loadTrainerDetail = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [trainerData, classesData] = await Promise.all([
        getTrainerById(parseInt(id)),
        getClasses()
      ]);
      
      setTrainer(trainerData);
      
      // Filter classes taught by this trainer
      const filteredClasses = classesData.filter(cls => cls.trainer === trainerData.name);
      setTrainerClasses(filteredClasses);
    } catch (err) {
      setError('Failed to load trainer details. Please try again.');
      console.error('Error loading trainer detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClass = (classData) => {
    toast.success(`Successfully booked ${classData.name}!`);
  };

  const handleBookPersonalTraining = () => {
    toast.info(`Personal training session request sent to ${trainer.name}!`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Loading variant="profile" />
      </div>
    );
  }

  if (error || !trainer) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Error message={error} onRetry={loadTrainerDetail} />
      </div>
    );
  }

  const {
    name,
    photo,
    certifications = [],
    specialties = [],
    bio,
    experience,
    classes = []
  } = trainer;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:text-primary">Home</Link>
          </li>
          <li><ApperIcon name="ChevronRight" size={14} /></li>
          <li>
            <Link to="/trainers" className="hover:text-primary">Trainers</Link>
          </li>
          <li><ApperIcon name="ChevronRight" size={14} /></li>
          <li className="text-gray-900">{name}</li>
        </ol>
      </nav>

      {/* Trainer Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={photo}
                alt={name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                    {name}
                  </h1>
                  <p className="text-lg text-gray-600">Certified Fitness Trainer</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="accent" size="medium">
                    {experience}+ years
                  </Badge>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Star" size={16} className="text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.9/5</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty, index) => (
                      <Badge key={index} variant="primary" size="small">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert, index) => (
                      <Badge key={index} variant="success" size="small" icon="Award">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleBookPersonalTraining}
                  variant="gradient"
                  size="large"
                  icon="Calendar"
                >
                  Book Personal Training
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  icon="MessageCircle"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: 'Users', value: '150+', label: 'Clients Trained' },
            { icon: 'Activity', value: trainerClasses.length, label: 'Classes Teaching' },
            { icon: 'Award', value: certifications.length, label: 'Certifications' },
            { icon: 'Clock', value: `${experience}+`, label: 'Years Experience' },
          ].map((stat, index) => (
            <Card key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <ApperIcon name={stat.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Classes Section */}
      {trainerClasses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Classes by {name}
            </h2>
            <Link to="/classes" className="text-primary hover:text-primary/80 font-medium">
              View all classes →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainerClasses.map((classData, index) => (
              <motion.div
                key={classData.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ClassCard
                  classData={classData}
                  onBook={handleBookClass}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Training Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Card>
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
            Training Philosophy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            "I believe that fitness is not just about physical transformation, but about building confidence, 
            mental resilience, and creating sustainable healthy habits. Every client is unique, and I tailor 
            my approach to meet you where you are and help you reach where you want to be."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <ApperIcon name="Target" size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-900">Goal-Oriented</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <ApperIcon name="Heart" size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-900">Holistic Approach</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <ApperIcon name="Zap" size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-900">Personalized Training</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-primary to-accent text-white text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Let's work together to achieve your fitness goals with personalized training and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleBookPersonalTraining}
              variant="accent"
              size="large"
              icon="Calendar"
            >
              Book Personal Session
            </Button>
            <Button
              variant="outline"
              size="large"
              icon="Phone"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Contact {name}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default TrainerDetail;