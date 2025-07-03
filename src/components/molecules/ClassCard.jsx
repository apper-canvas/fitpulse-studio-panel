import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
const ClassCard = ({ classData, onBook }) => {
  const {
    Id,
    name,
    type,
    trainer,
    duration,
    difficulty,
    capacity,
    enrolled,
    time,
    description,
    equipment = []
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
    <Card hover className="h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="User" size={14} />
              <span>{trainer}</span>
              <span className="text-gray-400">•</span>
              <ApperIcon name="Clock" size={14} />
              <span>{duration} min</span>
            </div>
          </div>
          <Badge variant={getDifficultyVariant()} size="small">
            {difficulty}
          </Badge>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="primary" size="small" icon="Activity">
            {type}
          </Badge>
          {time && (
            <Badge variant="default" size="small" icon="Clock">
              {time}
            </Badge>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        {equipment.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Equipment needed:</p>
            <div className="flex flex-wrap gap-1">
              {equipment.map((item, index) => (
                <Badge key={index} variant="default" size="small">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Capacity</span>
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
      </div>

<div className="flex gap-2 pt-4 border-t border-gray-100">
        <Button
          as={Link}
          to={`/classes/${Id}`}
          variant="outline"
          size="small"
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          onClick={() => {
            if (availableSpots > 0) {
              onBook(classData);
            } else {
              // Handle waitlist functionality
              toast.info(`${classData.name} is full. You've been added to the waitlist.`);
            }
          }}
          disabled={availableSpots === 0}
          variant={availableSpots > 0 ? "primary" : "ghost"}
          size="small"
          className="flex-1"
        >
          {availableSpots > 0 ? 'Book Now' : 'Waitlist'}
        </Button>
      </div>
    </Card>
  );
};

export default ClassCard;