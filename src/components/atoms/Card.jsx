import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default',
  padding = 'medium',
  hover = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-custom overflow-hidden transition-all duration-300';
  
  const variants = {
    default: '',
    elevated: 'shadow-custom-lg',
    outline: 'border border-gray-200 shadow-none',
    gradient: 'gradient-bg-primary text-white',
  };

  const paddings = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  const hoverClasses = hover ? 'card-hover' : '';

  const cardClasses = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`;

  return (
    <motion.div
      className={cardClasses}
      {...(hover && {
        whileHover: { scale: 1.02 },
        transition: { duration: 0.2 }
      })}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;