<template>
  <div class="contact">
    <h1>Information</h1>
    <h2>Présentation</h2>
      <p>
        Un simple outil pour simplifier et suivre ces de recherche sur le web.
        Fonctionne avec Firefox et Chrome.
      </p>
    <h2>Installation</h2>
    <p>Bookmarker les liens ci dessous. puis editer les bookmarks
      Changer 'azerty' en '%s' dans l'url et associé le bookmark à un mot clef (<i> pour firefox</i>) par exemple <i>/g</i>.
      Toutes les fois ou vous taperer /g suivis d'un terme a recherché ans la barre d'adresse vous serez redirigé vers le moteur
      de recherche et la recherche seras enregistré dans le "localStorage" de votre navigateur.
    </p>
    <ul class="lines">
      <li v-for="(item, index) in currconfig.shrCut" v-bind:index="index" v-bind:key="item.shrt">
        <router-link :to="{ path: 'redirectMe', query: { s: item.shrt, q: 'azerty' }}">{{ item.name }}</router-link>
      </li>
    </ul>
    <br />
    <h1>Contact</h1>
    <ul>
      <li>
        <a href="http://www.tisseurdetoile.net">Le TisseurDeToile</a>
      </li>
      <li>
        <a href="https://github.com/tisseurdetoile/vuestartpage">Github</a>
      </li>
    </ul>
    <br />
    <h2>Vue.js Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Configuration from '../js/config.js'

export default {
  created: function () {
    this.$parent.changeActive('contact')
  },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currconfig: Configuration.fetch()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

ul.line {
  list-style-type: disc;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
