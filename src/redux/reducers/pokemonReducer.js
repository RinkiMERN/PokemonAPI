import { ActionTypes } from "../constants/action-types";


const initialState = {
  pokemon: [],
};

export const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_POKEMON:
      return {
       
        pokemon: [action.payload, ...state.pokemon],
      };
    // case ActionTypes.SELECTED_POKEMON:
    //   return { ...state, ...action.payload };
    case ActionTypes.REMOVE_SELECTED_POKEMON:
      return {
        ...state,
        pokemon: state.pokemon.filter((poky) => poky.id !== action.payload),
      };

    default:
      return state;
  }
};
