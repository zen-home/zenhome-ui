<template>
  <q-layout>
    <q-page-container>
      <component :is="component" v-bind="$attrs" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutContainer',
  inheritAttrs: false,
  props: {
    component: {
      type: Object,
      required: true
    }
  }
})
</script>
