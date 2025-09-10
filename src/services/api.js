// src/services/api.js

// Helper: random number generator
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// 🚀 Fake test connection
export const testConnection = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "ok", message: "Connected successfully (fake)" });
    }, 500);
  });
};

// 🚀 Dynamic fake dashboard summary
export const getDashboardSummary = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalDelays: randomNumber(0, 10),
        totalInfractions: randomNumber(0, 5),
        totalResolved: randomNumber(5, 20),
      });
    }, 500);
  });
};

// 🚀 Dynamic fake insights
export const getInsights = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        insights: [
          {
            id: 1,
            title: "Attendance up",
            value: `${randomNumber(1, 15)}%`,
          },
          {
            id: 2,
            title: "Maintenance issues reduced",
            value: randomNumber(0, 10),
          },
          {
            id: 3,
            title: "Student feedback improved",
            value: `${randomNumber(1, 20)}%`,
          },
        ],
      });
    }, 500);
  });
};
