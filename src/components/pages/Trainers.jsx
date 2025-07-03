import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import TrainerCard from '@/components/molecules/TrainerCard';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { getTrainers } from '@/services/api/trainerService';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    loadTrainers();
  }, []);

  useEffect(() => {
    filterTrainers();
  }, [trainers, searchTerm, selectedSpecialty]);

  const loadTrainers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTrainers();
      setTrainers(data);
    } catch (err) {
      setError('Failed to load trainers. Please try again.');
      console.error('Error loading trainers:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterTrainers = () => {
    let filtered = trainers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (trainer) =>
          trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trainer.specialties.some(specialty => 
            specialty.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          trainer.certifications.some(cert => 
            cert.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply specialty filter
    if (selectedSpecialty) {
      filtered = filtered.filter(trainer =>
        trainer.specialties.includes(selectedSpecialty)
      );
    }

    setFilteredTrainers(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const getAllSpecialties = () => {
    const specialties = new Set();
    trainers.forEach(trainer => {
      trainer.specialties.forEach(specialty => specialties.add(specialty));
    });
    return Array.from(specialties).sort();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded shimmer w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded shimmer w-96"></div>
        </div>
        <Loading variant="cards" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Error message={error} onRetry={loadTrainers} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Our Expert Trainers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet our certified professionals who are dedicated to helping you achieve your fitness goals
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
          <div className="w-full lg:w-96">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search trainers, specialties, or certifications..."
            />
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="form-input py-2 px-3 text-sm min-w-[200px]"
            >
              <option value="">All Specialties</option>
              {getAllSpecialties().map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {searchTerm && (
            <Badge variant="primary" size="small">
              Search: {searchTerm}
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 hover:text-white/80"
              >
                <ApperIcon name="X" size={12} />
              </button>
            </Badge>
          )}
          {selectedSpecialty && (
            <Badge variant="accent" size="small">
              Specialty: {selectedSpecialty}
              <button
                onClick={() => setSelectedSpecialty('')}
                className="ml-2 hover:text-white/80"
              >
                <ApperIcon name="X" size={12} />
              </button>
            </Badge>
          )}
        </div>
      </div>

      {/* Trainers Grid */}
      {filteredTrainers.length === 0 ? (
        <Empty
          title="No trainers found"
          message="Try adjusting your search or filter criteria to find trainers."
          icon="Users"
        />
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {filteredTrainers.length} trainer{filteredTrainers.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrainers.map((trainer, index) => (
              <motion.div
                key={trainer.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TrainerCard trainer={trainer} />
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Ready to Train with Our Experts?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Book a personal training session or join one of our group classes today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="large" icon="Calendar">
              Book Personal Training
            </Button>
            <Button variant="outline" size="large" icon="Users">
              Join Group Classes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainers;