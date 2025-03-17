import mongoose from "mongoose";

const OutingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hostelNumber: { type: String, required: true },
  roomNumber: { type: String, required: true },
  goingTime: { type: Date, required: true },
  isEntered :{type:Boolean,default:false}
});

const outingModel = mongoose.model('Outing', OutingSchema);
export default outingModel;