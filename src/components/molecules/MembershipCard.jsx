import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const MembershipCard = ({ plan, featured = false, onSelect }) => {
  const {
    planId,
    name,
    price,
    duration,
    features = [],
    classAccess,
    description
  } = plan;

  return (
    <Card 
      className={`membership-card relative ${featured ? 'featured' : ''} h-full flex flex-col`}
      hover
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="accent" size="small" icon="Star">
            Most Popular
          </Badge>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="mb-2">
          <span className="text-4xl font-bold gradient-text">${price}</span>
          <span className="text-gray-600 ml-2">/{duration}</span>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <ApperIcon name="Activity" size={20} className="text-primary" />
          <span className="font-semibold text-gray-900">Class Access</span>
        </div>
        <Badge variant="primary" size="medium" className="mb-4">
          {classAccess}
        </Badge>
      </div>

      <div className="flex-1 mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Features Included</h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ApperIcon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <Button
          onClick={() => onSelect(plan)}
          variant={featured ? "gradient" : "primary"}
          size="medium"
          className="w-full"
        >
          Choose {name}
        </Button>
      </div>
    </Card>
  );
};

export default MembershipCard;