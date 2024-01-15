<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="flex flex-center q-mb-md">
        <quasar-button @test="handleTest" />
      </div>
      <pre><code>{{ users }}</code></pre>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import QuasarButton from 'src/components/QuasarButton.vue'

const users = ref(null)

const handleTest = () => {
  // eslint-disable-next-line no-console
  console.log('Test event emitted!')
}

const fetchData = async () => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: 'query Users { users { name id } }'
    })
  })
  const data = await response.json()
  users.value = data
}

fetchData()
</script>
