import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TrainerCard = ({ trainer }) => {
  const {
    Id,
    name,
    photo,
    certifications = [],
    specialties = [],
    bio,
    experience,
    classes = []
  } = trainer;

  return (
    <Card hover className="trainer-card h-full flex flex-col">
      <div className="relative">
        <img
          src={photo}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="accent" size="small">
            {experience}+ years
          </Badge>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        
        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-3">{bio}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="primary" size="small">
                {specialty}
              </Badge>
            ))}
            {specialties.length > 3 && (
              <Badge variant="default" size="small">
                +{specialties.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Certifications</h4>
          <div className="flex flex-wrap gap-1">
            {certifications.slice(0, 2).map((cert, index) => (
              <Badge key={index} variant="success" size="small" icon="Award">
                {cert}
              </Badge>
            ))}
            {certifications.length > 2 && (
              <Badge variant="default" size="small">
                +{certifications.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            <ApperIcon name="Users" size={16} />
            <span>{classes.length} classes</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Star" size={16} className="text-yellow-500 fill-current" />
            <span>4.8/5</span>
          </div>
        </div>

        <div className="mt-auto">
          <Button
            as={Link}
            to={`/trainers/${Id}`}
            variant="outline"
            size="small"
            className="w-full"
          >
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TrainerCard;