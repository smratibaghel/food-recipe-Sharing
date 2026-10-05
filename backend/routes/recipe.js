import express from "express";
import { getAllRecipe,
    getRecipeById,
    getRecipebyUser,
    getSavedRecipe, 
    recipeAdd, 
    savedRecipebyId } from "../controllers/recipe.js";
import { Authentication } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router=express.Router();

//create recipe
router.post('/add',Authentication,upload.single("imgUrl"),recipeAdd)

//get all recipe
router.get('/',getAllRecipe)

//get recipe by id
router.get('/recipe/:id',getRecipeById)

//get recipe by user id
router.get('/user/:id',getRecipebyUser)

//save recipe by id
router.post('/save/:id',Authentication,savedRecipebyId)

//get saved recipe
router.get('/saved',Authentication,getSavedRecipe)
export default router;