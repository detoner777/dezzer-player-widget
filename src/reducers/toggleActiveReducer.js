import { TOGGLE_ACTIVE } from "../actions/types";

const initialState = {
  toggleActive: null,
};

export function toggleActiveReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ACTIVE:
      return {
        ...state,
        toggleActive: action.toggleActive,
      };
    default:
      return state;
  }
}
