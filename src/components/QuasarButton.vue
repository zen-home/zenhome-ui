<template>
  <q-btn
    data-cy="button"
    label="test emit"
    color="positive"
    rounded
    :icon="mdiNoteEdit"
    @click="$emit('test')"
  />
</template>

<script>
import { mdiNoteEdit } from '@quasar/extras/mdi-v7'
import { defineComponent } from 'vue'

/**
 * @component
 * @description QuasarButton component is a customized button that emits a 'test' event when clicked.
 * @vue-event {Undefined} test - Emitted when the button is clicked.
 * @example <QuasarButton @test="yourEventHandler" />
 */
export default defineComponent({
  name: 'QuasarButton',
  emits: { test: () => true },
  data: () => ({
    mdiNoteEdit
  })
})
</script>
