import { TOGGLE_ACTIVE } from "./types";

export function setToggleActive(toggleActive) {
  return {
    type: TOGGLE_ACTIVE,
    toggleActive: toggleActive,
  };
}
