import mongoose, { now } from 'mongoose';


const journelSchema = new mongoose.Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });
  

export const journelModel = mongoose.model('Journel', journelSchema);