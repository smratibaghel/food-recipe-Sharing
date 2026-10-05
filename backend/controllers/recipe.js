import {Recipe} from '../models/Recipe.js'
import {SavedRecipe} from '../models/Savedrecipe.js'

export const recipeAdd = async (req, res) => {
    const {
        title,
        instructions,
        ingredients,
        servings
    } = req.body;

    try {
        const recipe = await Recipe.create({
            title,
            instructions,
            ingredients: JSON.parse(ingredients),
            servings: Number(servings),
            imgUrl: req.file
                ? `/uploads/${req.file.filename}`
                : "",
            createdBy: req.user,
        });

        res.status(201).json({
            message: "Recipe created successfully",
            recipe,
        });

    } catch (error) {
        console.error("Recipe Add Error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};


export const getAllRecipe = async(req,res)=>{
    const recipe =await Recipe.find();
    res.json({recipe})
}

export const getRecipeById = async(req,res)=>{
    const id= req.params.id;
    
    try {
        let recipe=await Recipe.findById(id)

        if(!recipe) return res.json({message:"Recipe not found"});

        res.json({recipe})


    } catch (error) {
         res.json({message:error.message})
    }
}

export const getRecipebyUser = async(req,res)=>{
    const userId= req.params.id;
    
    try {
        let recipe=await Recipe.find({user:userId})

        if(!recipe) return res.json({message:"Recipe not found"});

        res.json({recipe})


    } catch (error) {
         res.json({message:error.message})
    }
}

export const savedRecipebyId= async(req,res)=>{
    const id= req.params.id

    let recipe=await SavedRecipe.findOne({recipe:id})
    if (recipe) return res.json({message:"Recipe already saved"});

    recipe= await SavedRecipe.create({recipe:id})

    res.json({message:"recipe saved successfully"})
}

export const getSavedRecipe = async (req, res) => {
    try {
        const recipe = await SavedRecipe.find();

        console.log("SAVED FROM DB:", recipe);

        res.status(200).json({
            recipe
        });
    } catch (error) {
        console.error("GET SAVED ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};
