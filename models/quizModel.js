const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    userId:mongoose.ObjectId,
    quizName:String,
    info:String,
  },
  {
    timestamps:true
  });

module.exports = mongoose.model("Quiz", quizSchema);
