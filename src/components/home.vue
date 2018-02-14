<template>
  <div class="home">
    <br />
    <div class="search">
      <form @submit.prevent="searchMe">
        <input type="text" size="100" id="search" v-model="searchStr" placeholder="Que rechercher ... que faire">
      </form>
    </div>
    <br />

    <ul id="lastsrch">
      <li v-for="(item, index) in lastTen" v-bind:index="index" v-bind:key="item.t">
        {{ item.n }} (
        <span class="tag" v-for="tag in item.p" v-bind:key="tag">{{ tag }}</span> )
        <a v-if="item.u !== undefined" :href="item.u">⬈</a>
      </li>
    </ul>
  </div>
</template>

<script>
import stats from '../js/stats.js'
import Config from '../js/config.js'
import Redirect from '../js/redirect.js'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lastTen: stats.last(10),
      searchStr: ''
    }
  },
  methods: {
    searchMe: function () {
      if (this.searchStr.length >= 0) {
        let readShrt = Config.getFirstShrCut()
        let url = Redirect.getUrl(this.searchStr, readShrt.shrt)
        window.location.href = url
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
#lastsrch {
  text-align: left;
}

#lastsrch li {
  margin-bottom: 8px;
}

#lastsrch a {
  text-decoration: none;
}

#lastsrch span.tag {
  padding: 1px 3px;
  margin-left: 8px;
  font-size: 1em;
  white-space: normal;
  border: 1px solid #e3edf3;
  background: #e6eff3;
  border-radius: 3px;
}
</style>
