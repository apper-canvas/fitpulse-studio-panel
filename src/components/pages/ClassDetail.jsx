import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { getClassById } from '@/services/api/classService';

const ClassDetail = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadClassDetail();
  }, [id]);

  const loadClassDetail = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getClassById(parseInt(id));
      setClassData(data);
    } catch (err) {
      setError('Failed to load class details. Please try again.');
      console.error('Error loading class detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClass = () => {
    toast.success(`Successfully booked ${classData.name}!`);
  };

  const handleJoinWaitlist = () => {
    toast.info(`Added to waitlist for ${classData.name}!`);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Loading variant="profile" />
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Error message={error} onRetry={loadClassDetail} />
      </div>
    );
  }

  const {
    name,
    type,
    trainer,
    duration,
    difficulty,
    capacity,
    enrolled,
    schedule = [],
    equipment = [],
    description
  } = classData;

  const availableSpots = capacity - enrolled;
  const capacityPercentage = (enrolled / capacity) * 100;
  
  const getCapacityColor = () => {
    if (capacityPercentage >= 90) return 'bg-red-500';
    if (capacityPercentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getDifficultyVariant = () => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'beginner';
      case 'intermediate': return 'intermediate';
      case 'advanced': return 'advanced';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:text-primary">Home</Link>
          </li>
          <li><ApperIcon name="ChevronRight" size={14} /></li>
          <li>
            <Link to="/classes" className="hover:text-primary">Classes</Link>
          </li>
          <li><ApperIcon name="ChevronRight" size={14} /></li>
          <li className="text-gray-900">{name}</li>
        </ol>
      </nav>

      {/* Class Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-accent p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{name}</h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <ApperIcon name="User" size={16} />
                    <span>{trainer}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Clock" size={16} />
                    <span>{duration} min</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <Badge variant="accent" size="medium">
                  {type}
                </Badge>
                <Badge variant={getDifficultyVariant()} size="medium">
                  {difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Class</h2>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </Card>
          </motion.div>

          {/* Equipment */}
          {equipment.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Equipment Needed</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {equipment.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <ApperIcon name="Package" size={16} className="text-primary" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Schedule */}
          {schedule.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Class Schedule</h2>
                <div className="space-y-3">
                  {schedule.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ApperIcon name="Calendar" size={16} className="text-primary" />
                        <div>
                          <div className="font-medium text-gray-900">{slot.day}</div>
                          <div className="text-sm text-gray-600">{slot.time}</div>
                        </div>
                      </div>
                      <Badge variant="success" size="small">
                        Available
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Trainer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Your Trainer</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{trainer}</h3>
                  <p className="text-gray-600">Certified {type} Instructor</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ApperIcon name="Star" size={14} className="text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">4.9/5 rating</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to={`/trainers/${trainer.toLowerCase().replace(' ', '-')}`}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  View full profile →
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book This Class</h3>
              
              {/* Capacity Indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Class Capacity</span>
                  <span className="font-medium">
                    {enrolled}/{capacity} enrolled
                  </span>
                </div>
                <div className="capacity-indicator">
                  <motion.div
                    className={`capacity-fill ${getCapacityColor()}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${capacityPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {availableSpots > 0 ? `${availableSpots} spots available` : 'Class full'}
                </p>
              </div>

              {/* Booking Actions */}
              <div className="space-y-3">
                {availableSpots > 0 ? (
                  <Button
                    onClick={handleBookClass}
                    variant="primary"
                    size="large"
                    className="w-full"
                    icon="Calendar"
                  >
                    Book Now
                  </Button>
                ) : (
                  <Button
                    onClick={handleJoinWaitlist}
                    variant="accent"
                    size="large"
                    className="w-full"
                    icon="Clock"
                  >
                    Join Waitlist
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="medium"
                  className="w-full"
                  icon="Heart"
                >
                  Add to Favorites
                </Button>
              </div>

              {/* Class Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Class Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{duration} minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Difficulty</span>
                    <Badge variant={getDifficultyVariant()} size="small">
                      {difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Class Type</span>
                    <Badge variant="primary" size="small">
                      {type}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;