const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    quizId:mongoose.ObjectId,
    question:String,
    answer1:String,
    answer2:String,
    answer3:String,
    answer4:String,
    correctAnswer:Number,
    image:{
      url:String,
      cloudinaryId:String
    }
  },
  {
    timestamps:true
  });

module.exports = mongoose.model("Question", questionSchema);
