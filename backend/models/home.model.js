import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hostelNumber: { type: String, required: true },
  roomNumber: { type: String, required: true },
  goingDate: { type: Date, required: true },
  comingDate: { type: Date, required: true },
  isEntered :{type:Boolean,default:false}
});

const homeModel = mongoose.model('Home', HomeSchema);
export default homeModel;