import React, { useEffect } from 'react'
import { AppContext } from './App_Context'
import axios from 'axios';
import { useState } from 'react';

const App_State = (props) => {
  const url = "http://localhost:3000/api";

  const [token, setToken] = useState("");
  const [recipe, setrecipe] = useState([]);
  const [savedRecipe, setsavedRecipe] = useState([]);
  const [user, setuser] = useState([])
  const [userId, setuserId] = useState("")
  const [userRecipe, setuserRecipe] = useState([])
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [reload, setreload] = useState(true)
  useEffect(() => {
    const fetchRecipe = async () => {
      const api = await axios.get(`${url}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.recipe);
      setrecipe(api.data.recipe);
    };
    fetchRecipe();
    getSavedRecipeById();
    profile();
    recipeByUser(userId);
    
  }, [token,userId,reload]);

  useEffect(() => {
  if(token){
    localStorage.setItem("token",token)
  }
  const tokenFromLocalStorage = localStorage.getItem("token",token)
  if(tokenFromLocalStorage)
  {
    setToken(tokenFromLocalStorage);
    setisAuthenticated(true)
  }
  }, [token,reload])
  

  //register
  const register = async (name, email, password) => {
    const api = await axios.post(`${url}/register`, {
      name, email, password
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    setToken(api.data.token)
    return api;

  }

  //login
  const login = async (email, password) => {
    const api = await axios.post(`${url}/login`, {
      email, password
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    setToken(api.data.token)
        setisAuthenticated(true)

    return api;
    //console.log("login data",api )
  }

  //add recipe
 const addRecipe = async (
    title,
    instructions,
    ingredients,
    servings,
    imgUrl
) => {
    try {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("instructions", instructions);
        formData.append(
            "ingredients",
            JSON.stringify(ingredients)
        );
        formData.append(
            "servings",
            Number(servings)
        );

        if (imgUrl) {
            formData.append("imgUrl", imgUrl);
        }

        const api = await axios.post(
            `${url}/add`,
            formData,
            {
                headers: {
                    Auth: token,
                },
                withCredentials: true,
            }
        );

        console.log("ADD RECIPE API:", api.data);

        return api;

    } catch (error) {
        console.error(
            "ADD RECIPE ERROR:",
            error.response?.data || error.message
        );

        throw error;
    }
};


  // recipeById
  const getRecipeById = async (id) => {
    const api = await axios.get(`${url}/recipe/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(api);
    return api;
  };

  // save Recipe By Id
  const savedRecipeById = async (id) => {
    const api = await axios.post(
      `${url}/save/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log(api);
    setreload(!reload);
    return api;
  };

  // getSaved recipe
 const getSavedRecipeById = async () => {
  try {
    const api = await axios.get(
      `${url}/saved`,
      {
        headers: {
          Auth: token,
        },
        withCredentials: true,
      }
    );

    console.log("FULL SAVED RESPONSE:", api.data);

    console.log("SAVED RECIPES:", api.data.recipe);

    setsavedRecipe(api.data.recipe);

  } catch (error) {
    console.error(
      "GET SAVED RECIPE ERROR:",
      error.response?.data || error.message
    );
  }
};


  // profile
 const profile = async () => {
  try {
    const api = await axios.get(`${url}/user`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    console.log("FULL PROFILE RESPONSE:", api.data);
    console.log("USER:", api.data?.user);

    if (api.data?.user) {
      setuserId(api.data.user._id);
      setuser(api.data.user);
    } else {
      console.log("User not found in response:", api.data);
    }
  } catch (error) {
    console.log(
      "Profile error:",
      error.response?.data || error.message
    );
  }
};



  // get recipe by userId
  const recipeByUser = async (id) =>{
    const api = await axios.get(`${url}/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        
      },
      withCredentials: true,
    });
    // console.log("user Specific recipe ",api)
    setuserRecipe(api.data.recipe)
  }
  const logOut = () =>{
    localStorage.removeItem("token",token)
    setToken("")
    setisAuthenticated(false)
  }

  return (
    <div>
      <AppContext.Provider value={{
        login,
        register,
        addRecipe,
        recipe,
        getRecipeById,
        savedRecipeById,
        savedRecipe,
        userRecipe,
        user,
        logOut,
        isAuthenticated,
        setisAuthenticated,
      }}>
        {props.children}
      </AppContext.Provider>
    </div>
  )
}

export default App_State;
