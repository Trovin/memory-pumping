<template>
  <main class="home">
    <div class="wrapper">
      <header
        class="header"
        v-bind:class="{ 'header_disabled': !dashboardState }">
        <div class="left-part">
          <div class="header-item movies">{{step}} movies</div>
          <div class="header-item time">Time: {{formatTime(time)}}</div>
        </div>
        <button class="btn" v-on:click="restartGame()">Reset</button>
      </header>

      <div
        class="items-grid"
        v-bind:class="{ 'items-grid_disabled': !dashboardState }">
        <ItemCell :item="item" v-for="item in items"/>
      </div>

    </div>
  </main>
</template>

<script>
import moment from 'moment';

import ItemCell from '../components/ItemCell.vue';
import { mapMutations, mapState, mapActions } from 'vuex';

import { RESTART_GAME } from "../store/types/action-types";

export default {
  name: 'Home',
  components: {
    ItemCell
  },
  computed: {
    ...mapState({
      time: state => state.TIME,
      step: state => state.STEP,
      items: state => state.ITEMS,
      dashboardState: state => state.DASHBOARD_STATE
    })
  },
  methods: {
    ...mapMutations({
      generateItems: 'GENERATE_ITEMS'
    }),
    ...mapActions({
      restartGame: RESTART_GAME
    }),
    formatTime: function (date) {
      return moment.utc(date).format("HH:mm:ss");
    }
  },
  created() {
    this.generateItems();
  }
}
</script>

<style scoped lang="scss">
  .home {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }

  .header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    color: #000000;
    background-color: #cccccc;

    &_disabled {
      background-color: #6a1010;
    }
  }

  .left-part {
    display: flex;
  }

  .btn, .header-item {
    outline: none;
    border: 0;
    font-size: 22px;
    padding: 10px;
    border-radius: 5px;
    color: #ffffff;
    background-color: #555555;
    text-transform: uppercase;
  }

  .btn {
    cursor: pointer;
    transition: .4s;
  }

  .btn:hover {
    background-color: #666666;
  }

  .movies {
    margin-right: 10px;
  }

  .wrapper {
    flex-grow: 1;
    color: #ffffff;
    background-color: #ffffff;
  }

  .items-grid {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;

    &_disabled {
      pointer-events: none;
    }
  }
</style>
