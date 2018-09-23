import axios from 'axios'

//initial state
const initialState = {
  recipes: [],
  recByUser: [],
  ingredients: []
}

//action types
const GOT_RECIPES = 'GOT_RECIPES'
const GOT_RECIPES_BY_USER = 'GOT_RECIPES_BY_USER'
const GOT_INGREDIENTS = 'GOT_INGREDIENTS'

//action creators
const gotRecipes = recipes => ({type: GOT_RECIPES, recipes})

const gotRecipesByUser = recipes => ({type: GOT_RECIPES_BY_USER, recipes})

const gotIngredients = ing => ({type: GOT_INGREDIENTS, ing})

//thunk creators
export const getRecipes = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/brews')
    dispatch(gotRecipes(data))
  }
}
export const getRecipesByUser = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/mybrews/${userId}`)
    dispatch(gotRecipesByUser(data))
  }
}

export const getIngredients = recipeId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/brews/${recipeId}`)
    dispatch(gotIngredients(data))
  }
}

//reducer
const brewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_RECIPES:
      return {
        ...state,
        recipes: action.recipes
      }
    case GOT_RECIPES_BY_USER:
      return {
        ...state,
        recByUser: action.recipes
      }
    case GOT_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ing
      }
    default:
      return state
  }
}

export default brewsReducer
