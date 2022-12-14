import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: 10,
    }
}

export const loadRecipe = async function(id) {
    try {
     const data = await getJSON(`${API_URL}/${id}`);

    const {recipe} = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }

    } catch (error) {
        throw error;
    }
    
}

export const loadSearchRecipe = async function(query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`)
        

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }
        })

    } catch (err) {
        throw err;
    }
}

export const getResultsPerPage = function(page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
} 