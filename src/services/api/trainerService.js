import trainersData from '@/services/mockData/trainers.json';

// Mock API delay to simulate network requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getTrainers = async () => {
  await delay(300);
  return [...trainersData]; // Return a copy to prevent mutations
};

export const getTrainerById = async (id) => {
  await delay(250);
  const trainer = trainersData.find(trainer => trainer.Id === id);
  if (!trainer) {
    throw new Error('Trainer not found');
  }
  return { ...trainer }; // Return a copy
};

export const createTrainer = async (trainerData) => {
  await delay(400);
  const newTrainer = {
    ...trainerData,
    Id: Math.max(...trainersData.map(trainer => trainer.Id)) + 1
  };
  trainersData.push(newTrainer);
  return { ...newTrainer };
};

export const updateTrainer = async (id, updates) => {
  await delay(350);
  const index = trainersData.findIndex(trainer => trainer.Id === id);
  if (index === -1) {
    throw new Error('Trainer not found');
  }
  trainersData[index] = { ...trainersData[index], ...updates };
  return { ...trainersData[index] };
};

export const deleteTrainer = async (id) => {
  await delay(300);
  const index = trainersData.findIndex(trainer => trainer.Id === id);
  if (index === -1) {
    throw new Error('Trainer not found');
  }
  const deletedTrainer = trainersData.splice(index, 1)[0];
  return { ...deletedTrainer };
};