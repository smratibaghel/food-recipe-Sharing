import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    instructions:{
        type:String,
        required:true,
    },
    ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
      },
    },
  ],
   
    servings: {
      type: Number,
      required: true,
    },
     imgUrl: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
})
export const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;