<template>
  <form>
    <p>
      Debug :
      <input type="checkbox" v-model="debug">
      {{debug ? "oui" : "non"}}
    </p>

    <p>
      Stat :
      <input type="checkbox" v-model="stat">
      {{stat ? "oui" : "non"}}
    </p>

    <p>
      Noredirect :
      <input type="checkbox" v-model="noredirect">
      {{noredirect ? "oui" : "non"}}
    </p>

    <p v-for="(item, index) in shrCut" v-bind:index="index" v-bind:key="item.shrt">
      {{ item.shrt }} - {{ item.name }} - {{ item.url }}
    </p>

    <p class="code">
    <pre>data: {{$data}}</pre>
    </p>

  </form>
</template>
<script>
import Config from '../js/config.js'
export default {
  name: 'configuration',
  data: function () {
    return Config
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.code pre {
  background: #f4f4f4;
  border: 1px solid #ddd;
  text-align: left;
  border-left: 3px solid #f36d33;
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 8px;
  line-height: 1.6;
  margin-bottom: 1.6em;
  max-width: 100%;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
