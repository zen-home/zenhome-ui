<template>
  <q-page class="flex flex-center">
    {{ users }}
  </q-page>
</template>

<script>

export default {
  async setup () {
    const stuff = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'query Users { users { name id } }'
      })
    }).then(response => response.json())

    console.log(stuff)

    return {
      users: stuff
    }
  }
}
</script>
