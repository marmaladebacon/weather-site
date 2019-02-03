import Vuex from "vuex";
import { state, mutations, getters } from "../../src/store";
import { RootState } from "../../src/store/types";

const { setPosition, addToSavedPositions } = mutations;

describe("Home View", () => {
  let localState: RootState;
  beforeEach(() => {
    localState = {
      position: {
        lat: 0,
        lng: 0
      },
      savedPositions: []
    };
  });

  test("store returns default value", () => {
    const result = getters.position(localState, getters, {}, {});
    expect(result).toEqual({ lat: 0, lng: 0 });
  });

  test("store changes value", () => {
    setPosition(localState, { lat: 1, lng: 2 });
    const result = getters.position(localState, getters, {}, {});
    expect(result).toEqual({ lat: 1, lng: 2 });
  });

  test("store saves position", () => {
    const result1 = getters.savedPositions(localState, getters, {}, {});
    expect(result1.length).toEqual(0);
    addToSavedPositions(localState, { lat: 1, lng: 2 });
    const result2 = getters.savedPositions(localState, getters, {}, {});
    expect(result2.length).toEqual(1);
    expect(result2[0]).toEqual({ lat: 1, lng: 2 });
    addToSavedPositions(localState, { lat: 2, lng: 1 });
    const result3 = getters.savedPositions(localState, getters, {}, {});
    expect(result3.length).toEqual(2);
    expect(result3[1]).toEqual({ lat: 2, lng: 1 });
  });
});
