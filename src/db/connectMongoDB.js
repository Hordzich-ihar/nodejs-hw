import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Successfully connected database');
  } catch (error) {
    console.log('Failed connect database', error);
    throw error;
  }
};
