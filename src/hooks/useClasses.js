import { useState, useEffect } from 'react';
import { getClasses, getClassById, bookClass } from '@/services/api/classService';

export const useClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  useEffect(() => {
    loadClasses();
  }, []);

  const refetch = () => {
    loadClasses();
  };

  return {
    classes,
    loading,
    error,
    refetch
  };
};

export const useClass = (id) => {
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadClass = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getClassById(parseInt(id));
      setClassData(data);
    } catch (err) {
      setError('Failed to load class details. Please try again.');
      console.error('Error loading class:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadClass();
    }
  }, [id]);

  const refetch = () => {
    loadClass();
  };

  return {
    classData,
    loading,
    error,
    refetch
  };
};

export const useBookClass = () => {
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState('');

  const book = async (classId) => {
    try {
      setBooking(true);
      setError('');
      const updatedClass = await bookClass(classId);
      return updatedClass;
    } catch (err) {
      setError(err.message || 'Failed to book class. Please try again.');
      console.error('Error booking class:', err);
      throw err;
    } finally {
      setBooking(false);
    }
  };

  return {
    book,
    booking,
    error
  };
};