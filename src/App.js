import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Drinks from './pages/Drinks';
import DetailsRecipes from './pages/DetailsRecipes';
import DetailsDrinks from './pages/DetailsDrinks';
import RecipesProgress from './pages/RecipesProgress';
import DrinksProgress from './pages/DrinksProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals/:id/in-progress" component={ RecipesProgress } />
      <Route path="/drinks/:id/in-progress" component={ DrinksProgress } />
      <Route path="/meals/:id" component={ DetailsRecipes } />
      <Route path="/drinks/:id" component={ DetailsDrinks } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default App;
