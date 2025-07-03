import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import SearchBar from '@/components/molecules/SearchBar';
import FilterSidebar from '@/components/molecules/FilterSidebar';
import ClassCard from '@/components/molecules/ClassCard';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { getClasses } from '@/services/api/classService';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'time', 'difficulty', 'capacity'

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    filterAndSortClasses();
  }, [classes, searchTerm, sortBy]);

  const loadClasses = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getClasses();
      setClasses(data);
    } catch (err) {
      setError('Failed to load classes. Please try again.');
      console.error('Error loading classes:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortClasses = () => {
    let filtered = classes;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (cls) =>
          cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.trainer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'time':
          return a.time?.localeCompare(b.time) || 0;
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'capacity':
          return (a.capacity - a.enrolled) - (b.capacity - b.enrolled);
        default:
          return 0;
      }
    });

    setFilteredClasses(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filters) => {
    // Apply additional filters based on the filters object
    let filtered = classes;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (cls) =>
          cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.trainer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filters
    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter((cls) =>
        filters.types.includes(cls.type)
      );
    }

    // Apply trainer filters
    if (filters.trainers && filters.trainers.length > 0) {
      filtered = filtered.filter((cls) =>
        filters.trainers.includes(cls.trainer)
      );
    }

    // Apply difficulty filters
    if (filters.difficulty && filters.difficulty.length > 0) {
      filtered = filtered.filter((cls) =>
        filters.difficulty.includes(cls.difficulty)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'time':
          return a.time?.localeCompare(b.time) || 0;
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'capacity':
          return (a.capacity - a.enrolled) - (b.capacity - b.enrolled);
        default:
          return 0;
      }
    });

    setFilteredClasses(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    filterAndSortClasses();
  };

  const handleBookClass = (classData) => {
    toast.success(`Successfully booked ${classData.name}!`);
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
        <Error message={error} onRetry={loadClasses} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Our Classes
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the perfect workout for your fitness level and goals
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
          <div className="w-full lg:w-96">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search classes, trainers, or types..."
            />
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input py-2 px-3 text-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="time">Sort by Time</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="capacity">Sort by Availability</option>
            </select>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="small"
                icon="Grid3X3"
                onClick={() => setViewMode('grid')}
              />
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="small"
                icon="List"
                onClick={() => setViewMode('list')}
              />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {searchTerm && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            <Badge variant="primary" size="small">
              Search: {searchTerm}
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 hover:text-white/80"
              >
                <ApperIcon name="X" size={12} />
              </button>
            </Badge>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <FilterSidebar
            filters={{}}
            onFilterChange={handleFilter}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Classes Grid/List */}
        <div className="flex-1">
          {filteredClasses.length === 0 ? (
            <Empty
              title="No classes found"
              message="Try adjusting your search or filter criteria to find classes."
              icon="Search"
            />
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {filteredClasses.length} class{filteredClasses.length !== 1 ? 'es' : ''} found
                </p>
              </div>

              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredClasses.map((classData, index) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;