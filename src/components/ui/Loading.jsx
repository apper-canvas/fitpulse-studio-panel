import { motion } from 'framer-motion';

const Loading = ({ variant = 'default' }) => {
  if (variant === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-custom overflow-hidden"
          >
            <div className="h-48 bg-gray-200 shimmer"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded shimmer mb-3"></div>
              <div className="h-4 bg-gray-200 rounded shimmer mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded shimmer mb-4 w-1/2"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded-full shimmer w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full shimmer w-20"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded shimmer flex-1"></div>
                <div className="h-8 bg-gray-200 rounded shimmer flex-1"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-custom p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg shimmer"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded shimmer mb-2"></div>
                <div className="h-4 bg-gray-200 rounded shimmer w-2/3 mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-full shimmer w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full shimmer w-20"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-200 rounded shimmer w-24"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'profile') {
    return (
      <div className="bg-white rounded-xl shadow-custom overflow-hidden">
        <div className="h-64 bg-gray-200 shimmer"></div>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full shimmer"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded shimmer mb-2"></div>
              <div className="h-5 bg-gray-200 rounded shimmer w-2/3"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded shimmer"></div>
            <div className="h-4 bg-gray-200 rounded shimmer w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
          </div>
          <div className="mt-6 flex gap-2">
            <div className="h-6 bg-gray-200 rounded-full shimmer w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full shimmer w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full shimmer w-18"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;