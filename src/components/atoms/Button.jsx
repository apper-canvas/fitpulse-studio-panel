import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-animate';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary shadow-lg',
    accent: 'bg-accent text-secondary hover:bg-accent/90 focus:ring-accent shadow-lg',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
    danger: 'bg-error text-white hover:bg-error/90 focus:ring-error shadow-lg',
    success: 'bg-success text-white hover:bg-success/90 focus:ring-success shadow-lg',
    gradient: 'gradient-bg-primary text-white hover:brightness-110 focus:ring-primary shadow-lg',
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-6 py-4 text-lg',
  };

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24,
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const renderIcon = () => {
    if (loading) {
      return <ApperIcon name="Loader2" size={iconSizes[size]} className="animate-spin" />;
    }
    if (icon) {
      return <ApperIcon name={icon} size={iconSizes[size]} />;
    }
    return null;
  };

  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={children ? 'mr-2' : ''}>{renderIcon()}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={children ? 'ml-2' : ''}>{renderIcon()}</span>
      )}
    </motion.button>
  );
};

export default Button;