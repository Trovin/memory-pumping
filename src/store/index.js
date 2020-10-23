import { createStore } from 'vuex';

import ItemData from "../models/ItemData";

import {
  TIME,
  STEP,
  FLAG,
  ITEMS,
  INTERVAL,
  SELECTED_ITEMS,
  DASHBOARD_STATE,
  MAXIMUM_MATCHING_PAIRS,
  CURRENT_MATCHING_PAIRS
} from "./types/state-types";

import {
  START_TIMER,
  RESET_TIMER,
  RESET_GAME_DATA,
  GENERATE_ITEMS,
  INCREASE_STEP_COUNTER,
  CHECK_ITEMS_FOR_MATCH,
  CHANGE_SELECTED_ITEM_STATE
} from "./types/mutation-types";

import {
  RESTART_GAME,
  ADD_SELECTED_ITEM,
  CHECK_GAME_CONDITIONS
} from "./types/action-types";

export default createStore({
  state: {
    [TIME]: 0,
    [STEP]: 0,
    [FLAG]: false,
    [ITEMS]: [],
    [INTERVAL]: null,
    [SELECTED_ITEMS]: [],
    [DASHBOARD_STATE]: true,
    [MAXIMUM_MATCHING_PAIRS]: 4,
    [CURRENT_MATCHING_PAIRS]: 0
  },
  mutations: {
    [START_TIMER](state) {
      if (!state.FLAG) {
        state.FLAG = true;
        state.INTERVAL = setInterval(() => state.TIME = state.TIME + 1000, 1000);
      }
    },
    [RESET_TIMER](state) {
      clearInterval(state.INTERVAL);
      state.TIME = 0;
      state.FLAG = false;
    },
    [RESET_GAME_DATA](state) {
      state.STEP = 0;
      state.ITEMS = [];
      state.SELECTED_ITEMS = [];
      state.CURRENT_MATCHING_PAIRS = 0;
    },
    [GENERATE_ITEMS](state) {
      const max = state.MAXIMUM_MATCHING_PAIRS;

      for (let i = 0, j = max; i < max; i++, j++) {
        const firstItem = new ItemData(i, i);
        const secondItem = new ItemData(j, i);
        state.ITEMS.push(firstItem, secondItem);
      }
      state.ITEMS = state.ITEMS.sort(() => Math.random() - 0.5);
    },
    [INCREASE_STEP_COUNTER](state) {
      state.STEP++;
    },
    [CHANGE_SELECTED_ITEM_STATE](state, id) {
      const selectedItem = state.ITEMS.find(item => item.id === id);
      selectedItem.active = true;
    },
    [CHECK_ITEMS_FOR_MATCH](state) {
      const firstItem = state.SELECTED_ITEMS[0];
      const secondItem = state.SELECTED_ITEMS[1];
      const selected = state.ITEMS.filter(item => item.id === firstItem.id || item.id === secondItem.id);

      setTimeout(() => {
        selected.map(item => item.active = false);
        state.DASHBOARD_STATE = true;
      }, 1000);

      if (firstItem.value === secondItem.value) {
        selected.map(item => item.isMatched = true);
        state.CURRENT_MATCHING_PAIRS++;
      }

      state.SELECTED_ITEMS = [];
    }
  },
  actions: {
    [ADD_SELECTED_ITEM] (context, item) {
      context.state.SELECTED_ITEMS.push(item);
      context.commit('START_TIMER');
      context.commit('CHANGE_SELECTED_ITEM_STATE', item.id);
      context.dispatch('CHECK_GAME_CONDITIONS');
    },
    [CHECK_GAME_CONDITIONS] (context) {
      if (context.state.SELECTED_ITEMS.length % 2 === 0) {
        context.commit('INCREASE_STEP_COUNTER');
        this.state.DASHBOARD_STATE = false;
        context.commit('CHECK_ITEMS_FOR_MATCH');
      }

      if (this.state.MAXIMUM_MATCHING_PAIRS === this.state.CURRENT_MATCHING_PAIRS) {

        setTimeout(() => {
          context.dispatch('RESTART_GAME');
          alert('Congratulation, game is passed (Restart)')
        }, 600);
      }
    },
    [RESTART_GAME](context) {
      context.commit('RESET_TIMER');
      context.commit('RESET_GAME_DATA');
      context.commit('GENERATE_ITEMS');
    },
  }
})
