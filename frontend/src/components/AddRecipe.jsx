import React, { useContext, useState } from "react";
import { AppContext } from "../context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function AddRecipe() {
    const navigate = useNavigate();
    const { addRecipe } = useContext(AppContext);

    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState([
        {
            name: "",
            quantity: "",
        },
    ]);
    const [instructions, setInstructions] = useState("");
    const [servings, setServings] = useState("");
    const [imgUrl, setImgUrl] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    // Add new ingredient
    const addIngredient = () => {
        setIngredients([
            ...ingredients,
            {
                name: "",
                quantity: "",
            },
        ]);
    };

    // Update ingredient
    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...ingredients];

        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [field]: value,
        };

        setIngredients(updatedIngredients);
    };

    // Remove ingredient
    const removeIngredient = (index) => {
        const updatedIngredients = ingredients.filter(
            (_, i) => i !== index
        );

        setIngredients(updatedIngredients);
    };

    // Handle image
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImgUrl(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Submit form
   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await addRecipe(
            title,
            instructions,
            ingredients,
            servings,
            imgUrl,
           
        );

        console.log("Recipe response:", response);

        toast.success("Recipe added successfully!");

        setTimeout(() => {
            navigate("/");
        }, 1500);

    } catch (error) {
        console.error("Recipe add error:", error);

        toast.error(
            error?.response?.data?.message || "Recipe add nahi hui"
        );
    }
};


    return (
        <div className="add-recipe-page login-page">
            <form className="recipe-form" onSubmit={handleSubmit}>
                <h1>Add Recipe</h1>

                {/* Recipe Title */}
                <div className="form-group">
                    <label>Recipe Title</label>

                    <input
                        type="text"
                        placeholder="Enter recipe title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Instructions */}
                <div className="form-group">
                    <label>Instructions</label>

                    <textarea
                        rows="6"
                        placeholder="Write recipe instructions..."
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </div>

                {/* Ingredients */}
                <div className="form-group">
                    <label>Ingredients</label>

                    {ingredients.map((ingredient, index) => (
                        <div className="ingredient-row" key={index}>
                            <input
                                type="text"
                                placeholder="Ingredient name"
                                value={ingredient.name}
                                onChange={(e) =>
                                    handleIngredientChange(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <input
                                type="text"
                                placeholder="Quantity (e.g. 2 cups)"
                                value={ingredient.quantity}
                                onChange={(e) =>
                                    handleIngredientChange(
                                        index,
                                        "quantity",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            {ingredients.length > 1 && (
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() =>
                                        removeIngredient(index)
                                    }
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        className="add-btn"
                        onClick={addIngredient}
                    >
                        + Add More Ingredients
                    </button>
                </div>

                {/* Servings */}
                <div className="form-group">
                    <label>Servings</label>

                    <input
                        type="number"
                        min="1"
                        placeholder="e.g. 4"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        required
                    />
                </div>

                {/* Recipe Image */}
                <div className="form-group">
                    <label>Recipe Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Recipe preview"
                            className="image-preview"
                        />
                    )}
                </div>

                {/* Submit */}
                <button type="submit" className="submit-btn">
                    Add Recipe
                </button>
            </form>

            <ToastContainer />
        </div>
    );
}

export default AddRecipe;