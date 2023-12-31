import { ActionTypes } from "../constants/action-types";
export const setPokemons = (pokemon) => {
  return {
    type: ActionTypes.SET_POKEMON,
    payload: pokemon,
  };
};

export const deletedPokemons = (id) => {
    return {
      type: ActionTypes.REMOVE_SELECTED_POKEMON,
      payload: id
    };
  };
