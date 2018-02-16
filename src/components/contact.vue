<template>
  <div class="contact">
    <h1>vueStartPage</h1>
    <h2>Présentation</h2>
      <p class="text">
        Une page statique, pour simplifier et suivre ses recherches sur le web.
        Voir les moteurs que l'on utilise le plus, les mots les plus recherché.
        Toutes informations sont stoqués dans le navigateur (LocalStorage)
        <br />
        Fonctionne avec Firefox et Chrome.
      </p>
    <h2>Installation</h2>
    <br />
    <ul class="lines">
      <li v-for="(item, index) in currconfig.shrCut" v-bind:index="index" v-bind:key="item.shrt">
        <router-link :to="{ path: 'redirectMe', query: { s: item.shrt, q: 'azerty' }}">{{ item.name }}</router-link>
      </li>
    </ul>
    <br />
    <p class="text">
      <ul>
        <li>Bookmarker les liens ci dessus.</li>
        <li>Editer les bookmarks.</li>
        <li>Changer 'azerty' en '%s' dans l'url</li>
        <li>Associé le bookmark à un mot clef</li>
        <li>par exemple /g</li>
      </ul>
      <br />
      Toutes les fois ou vous taperez /g suivis d'un terme a recherché dans la barre d'adresse
      vous serez redirigé vers le moteur  de recherche et la recherche seras enregistré dans le "localStorage" de votre navigateur.
    </p>

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
  text-align: right;
}
ul {
  list-style-type: none;
  padding: 0;
}

ul.line {
  list-style-type: disc;
  padding: 0;
}

.contact {
  margin-left: 35%;
  width: 30%;
}

p.text {

  color: #389dc1;
  text-align: left;
  align-content: center;
  font-size: 16px;
}

ul.lines li a {
  position: relative;
  display: inline-block;
  max-width: 100px;
  height: 20px;
  line-height: 20px;
  margin-left: 5px;
  padding: 0 1em 0 1em;
  background-color: #fff;
  border: 1px solid #389dc1;
  border-radius: 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #389dc1;
  font-weight: bold;
  font-size: 10px;
  text-decoration: none;
  -webkit-transition: .2s;
  transition: .2s;
  text-transform: uppercase;
}

li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
