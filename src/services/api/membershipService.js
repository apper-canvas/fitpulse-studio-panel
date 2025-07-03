import membershipData from '@/services/mockData/membership.json';

// Mock API delay to simulate network requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getMembershipPlans = async () => {
  await delay(300);
  return [...membershipData]; // Return a copy to prevent mutations
};

export const getMembershipPlanById = async (id) => {
  await delay(250);
  const plan = membershipData.find(plan => plan.Id === id);
  if (!plan) {
    throw new Error('Membership plan not found');
  }
  return { ...plan }; // Return a copy
};

export const createMembershipPlan = async (planData) => {
  await delay(400);
  const newPlan = {
    ...planData,
    Id: Math.max(...membershipData.map(plan => plan.Id)) + 1
  };
  membershipData.push(newPlan);
  return { ...newPlan };
};

export const updateMembershipPlan = async (id, updates) => {
  await delay(350);
  const index = membershipData.findIndex(plan => plan.Id === id);
  if (index === -1) {
    throw new Error('Membership plan not found');
  }
  membershipData[index] = { ...membershipData[index], ...updates };
  return { ...membershipData[index] };
};

export const deleteMembershipPlan = async (id) => {
  await delay(300);
  const index = membershipData.findIndex(plan => plan.Id === id);
  if (index === -1) {
    throw new Error('Membership plan not found');
  }
  const deletedPlan = membershipData.splice(index, 1)[0];
  return { ...deletedPlan };
};