<template>
  <div class="item-wrapper">
    <div
      class="item"
      v-on:click="addSelectedItem(this.item)"
      v-bind:class="{ 'active-item': item.active || item.isMatched }">
      <span>{{item.value}}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ADD_SELECTED_ITEM } from "../store/types/action-types";

export default {
  name: 'ItemCell',
  props: ['item'],
  methods: {
    ...mapActions({
      addSelectedItem: ADD_SELECTED_ITEM
    })
  }
}
</script>

<style scoped lang="scss">
  .item-wrapper {
    width: 25%;
    padding: 10px;
  }

  .item {
    height: 200px;
    border-radius: 5px;
    display: flex;
    font-size: 32px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #cccccc;
    border: 2px solid transparent;
    transition: .4s;

    &:not(.active-item):hover {
      border: 2px solid #344079;
    }
  }

  .disabled-item {
    pointer-events: none;
  }

  .active-item {
    background-color: #344079;
  }
</style>
