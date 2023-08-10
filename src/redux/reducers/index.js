import { combineReducers } from "@reduxjs/toolkit";
import { pokemonReducer } from "./pokemonReducer";

const reducers = combineReducers({
  allpokemons: pokemonReducer,
});

export default reducers;
