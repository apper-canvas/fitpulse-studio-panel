import classesData from '@/services/mockData/classes.json';

// Mock API delay to simulate network requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getClasses = async () => {
  await delay(300);
  return [...classesData]; // Return a copy to prevent mutations
};

export const getClassById = async (id) => {
  await delay(250);
  const classData = classesData.find(cls => cls.Id === id);
  if (!classData) {
    throw new Error('Class not found');
  }
  return { ...classData }; // Return a copy
};

export const createClass = async (classData) => {
  await delay(400);
  const newClass = {
    ...classData,
    Id: Math.max(...classesData.map(cls => cls.Id)) + 1,
    enrolled: 0
  };
  classesData.push(newClass);
  return { ...newClass };
};

export const updateClass = async (id, updates) => {
  await delay(350);
  const index = classesData.findIndex(cls => cls.Id === id);
  if (index === -1) {
    throw new Error('Class not found');
  }
  classesData[index] = { ...classesData[index], ...updates };
  return { ...classesData[index] };
};

export const deleteClass = async (id) => {
  await delay(300);
  const index = classesData.findIndex(cls => cls.Id === id);
  if (index === -1) {
    throw new Error('Class not found');
  }
  const deletedClass = classesData.splice(index, 1)[0];
  return { ...deletedClass };
};

export const bookClass = async (id) => {
  await delay(400);
  const index = classesData.findIndex(cls => cls.Id === id);
  if (index === -1) {
    throw new Error('Class not found');
  }
  if (classesData[index].enrolled >= classesData[index].capacity) {
    throw new Error('Class is full');
  }
  classesData[index].enrolled += 1;
  return { ...classesData[index] };
};