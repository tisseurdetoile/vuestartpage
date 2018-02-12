<template>
  <form>
    <p>
      Debug :
      <input type="checkbox" v-model="currconfig.debug">
      {{currconfig.debug ? "oui" : "non"}}
    </p>

    <p>
      Stat :
      <input type="checkbox" v-model="currconfig.stat">
      {{currconfig.stat ? "oui" : "non"}}
    </p>

    <p>
      Noredirect :
      <input type="checkbox" v-model="currconfig.noredirect">
      {{currconfig.noredirect ? "oui" : "non"}}
    </p>

    <p v-for="(item, index) in currconfig.shrCut" v-bind:index="index" v-bind:key="item.shrt">
      <input type="text" size="2" max="2" v-model="item.shrt">
      <input type="text" size="10" max="10" v-model="item.name">
      <input type="text" size="100" v-model="item.url">
      <button v-on:click="removeElement(index)">X</button>
    </p>

    <button v-on:click="save">Sauvegarder</button>
    <button v-on:click="newItem">Nouveaux</button>
    <p><button class="btn btn-lg btn-primary" v-on:click="showjson = !showjson">JSON</button></p>
    <p v-if="showjson" class="code">
    <pre>data: {{currconfig}}</pre>
    </p>
    <button v-on:click="exportData">Exporter</button>
    <input type="file" @change="importData($event)">
  </form>
</template>
<script>
import Configuration from '../js/config.js'

export default {
  name: 'configuration',
  data: function () {
    return {
      showjson: false,
      currconfig: Configuration.fetch()
    }
  },
  methods: {
    save: function () {
      Configuration.save()
    },
    newItem: function () {
      Configuration.addToTail()
    },
    removeElement: function (index) {
      Configuration.removeItem(index)
    },
    exportData: function () {
      Configuration.exportData()
    },
    importData: function (event) {
      var fr = new FileReader()
      fr.onload = function (e) { Configuration.importData(e.target.result.toString()) }
      fr.readAsText(event.target.files[0])
    }
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
