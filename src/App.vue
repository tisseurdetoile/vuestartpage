<template>
  <div id="app">
    <div id="main">
      <nav v-bind:class="active" v-on:click.prevent>
        <a href="#" class="Week">{{ week }}</a>
        <a href="#" class="home" v-on:click="makeActive('home', '/')">Home</a>
        <a href="#" class="configuration" v-on:click="makeActive('configuration', 'config')">Config</a>
        <a href="#" class="stats" v-on:click="makeActive('stats', '/')">stats</a>
        <a href="#" class="contact" v-on:click="makeActive('contact', 'contact')">Contact</a>
      </nav>
      <p>You chose <b>{{ active }}</b></p>
    </div>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Configuration from './js/config.js'
import dates from './js/dates.js'

export default {
  name: 'App',
  data: function () {
    return {
      active: 'home',
      currconfig: Configuration.fetch(),
      week: dates.getWeek('S.')
    }
  },
  methods: {
    makeActive: function (item, page) {
      this.active = item
      this.$router.push(page)
    },
    changeActive: function (item) {
      console.log('>>' + item)
      this.active = item
    }
  }
  /*,
  watch: {
    config: {
      handler: function (config) {
        console.log('config.handler.Config.save')
        Config.save(config)
      }
    }
  }
  */
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
  }

  #content {
    padding-left: 15%;
    padding-right: 15%;
    text-align: center;
  }
  * {
    margin: 0;
    padding: 0;
  }

  body {
    font: 15px/1.3 'Open Sans', sans-serif;
    color: #5e5b64;
    text-align: center;
  }

  a, a:visited {
    outline: none;
    color: #389dc1;
  }

  a:hover {
    text-decoration: none;
  }

  section, footer, header, aside, nav {
    display: block;
  }

  /*-------------------------
  * The menu
  --------------------------*/

  nav {
    display: inline-block;
    margin: 0px auto 20px;
    background-color: #5597b4;
    box-shadow: 0 1px 1px #ccc;
    border-radius: 2px;
  }

  nav a {
    display: inline-block;
    padding: 18px 30px;
    color: #fff !important;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none !important;
    line-height: 1;
    text-transform: uppercase;
    background-color: transparent;

    -webkit-transition: background-color 0.25s;
    -moz-transition: background-color 0.25s;
    transition: background-color 0.25s;
  }

  nav a:first-child {
    border-radius: 2px 0 0 2px;
  }

  nav a:last-child {
    border-radius: 0 2px 2px 0;
  }

  nav.home .home,
  nav.configuration .configuration,
  nav.stats .stats,
  nav.contact .contact {
    background-color: #e35885;
  }

  p {
    font-size: 22px;
    font-weight: bold;
    color: #7d9098;
  }

  p b {
    color: #ffffff;
    display: inline-block;
    padding: 5px 10px;
    background-color: #c4d7e0;
    border-radius: 2px;
    text-transform: uppercase;
    font-size: 18px;
  }

  .resource {
    margin: 20px 0;
  }
</style>
