<template>
  <q-drawer
    v-model="showDrawer"
    show-if-above
    :width="200"
    :breakpoint="700"
    elevated
    data-cy="drawer"
    class="bg-primary text-white"
  >
    <q-scroll-area class="fit">
      <div class="q-pa-sm">
        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      </div>
      <q-btn data-cy="button">Am I on screen?</q-btn>
    </q-scroll-area>
  </q-drawer>
  <div class="fixed-top-right z-max" v-if="env.NODE_ENV === 'test'" >
    <button @click="showDrawer = !showDrawer" data-cy="toggle-drawer-button">Toggle Drawer (Test Only)</button>
  </div>
</template>

<script>
import { env } from 'src/utils/env'
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'QuasarDrawer',
  setup () {
    const showDrawer = ref(true)

    return {
      env,
      showDrawer
    }
  }
})

</script>
