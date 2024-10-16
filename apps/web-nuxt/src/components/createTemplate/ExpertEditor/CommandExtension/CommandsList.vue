<template>
  <div class="dropdown-menu">
    <template v-if="items.format.length || items.insert.length">
      <div class="h-[300px] overflow-y-scroll bg-primary-50">
        <!-- FORMAT GROUP -->
        <div v-if="items.format.length">
          <p class="dropdown-header">
            FORMAT
          </p>
          <p
            v-for="(item, index) in items.format"
            :key="index"
            :class="{ 'is-selected': index === selectedIndex }"
            class=" px-4 py-1 cursor-pointer bg-primary-50 m-0 text-primary-500 hover:font-semibold "
            @click="selectItem(index, 'format')"
          >
            {{ item.title }}
          </p>
        </div>

        <!-- INSERT GROUP -->
        <div v-if="items.insert.length">
          <p class="dropdown-header">
            INSERT
          </p>
          <p
            v-for="(item, index) in items.insert"
            :key="index"
            :class="{ 'is-selected': index === selectedIndex }"
            class=" px-4 py-1 cursor-pointer bg-primary-50 m-0 text-primary-500  hover:font-semibold"
            @click="selectItem(index, 'insert')"
          >
            {{ item.title }}
          </p>
        </div>
      </div>
    </template>

    <div v-else class="item">
      No result
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object, // Updated to handle grouped commands as an object
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
      selectedGroup: 'format', // Track group of selected items
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items[this.selectedGroup].length) - 1) % this.items[this.selectedGroup].length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items[this.selectedGroup].length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex, this.selectedGroup)
    },

    selectItem(index, group) {
      const item = this.items[group][index]

      if (item)
        this.command(item)
    },
  },
}
</script>

<style lang="scss">
.dropdown-menu {
  background: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  overflow: auto;
  padding: 0.4rem;
  position: relative;

  .dropdown-header {
    font-weight: bold;
    color: var(--gray-4);
    padding: 0.5rem;
    border-bottom: 1px solid var(--gray-2);
  }

  .border {
    padding: 0.5rem;
  }

  // .is-selected {
  //   background-color: var(--gray-3);
  // }
}
</style>

<!-- <template>
  <div class="dropdown-menu">
    <template v-if="items.length">
      <p
        v-for="(item, index) in items"
        :key="index"
        :class="{ 'is-selected': index === selectedIndex }"
        class="border px-4 py-1 cursor-pointer bg-primary-50 m-0 text-primary-500"
        @click="selectItem(index)"
      >
        {{ item.title }}
      </p>
    </template>
    <div v-else class="item">
      No result
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item)
        this.command(item)
    },
  },
}
</script>

  <style lang="scss">
  /* Dropdown menu */
  .dropdown-menu {
    background: var(--white);
    border: 1px solid var(--gray-1);
    border-radius: 0.7rem;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow: auto;
    padding: 0.4rem;
    position: relative;

    button {
      align-items: center;
      background-color: transparent;
      display: flex;
      gap: 0.25rem;
      text-align: left;
      width: 100%;

      &:hover,
      &:hover.is-selected {
        background-color: var(--gray-3);
      }

      &.is-selected {
        background-color: var(--gray-2);
      }
    }
  }
  </style> -->
