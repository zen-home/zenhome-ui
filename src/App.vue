<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

/**
 * App component serves as the entry point for the application.
 * It renders the router-view which handles the different pages.
 *
 * @component
 * @example
 * <App />
 */
export default defineComponent({
  name: 'App'
})
</script>
