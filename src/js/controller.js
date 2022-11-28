import * as model from './model.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './View/recipeView.js';
import searchView from './View/searchView.js';
import resultsView from './View/resultsView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecipe = async function() {
  try {
    // 1. Show Spinner
    recipeView.renderSpinner();


    // 2. Load Recipe
    const id = window.location.hash.slice(1);

    if(!id) return;

    await model.loadRecipe(id);

    // 3. Render Data 
    recipeView.render(model.state.recipe);
      
  } catch (err) {
    recipeView.renderError();
  }
};


const controlSearchRecipe = async function() {
  try {
    const query = searchView.getQuery();
    if(!query) return;

    resultsView.renderSpinner();

    await model.loadSearchRecipe(query);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getResultsPerPage(1))
  } catch (err) {
    console.log(err);
    resultsView.renderError();
  }
}


const init = async function() {
  recipeView.addHandlerRender(controllRecipe);
  searchView.addHandlerSearch(controlSearchRecipe);
}

init();


