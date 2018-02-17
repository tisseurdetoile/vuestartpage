<template>
  <div id="redirection">
    <h1 v-if="redirect">Redirection en cours ...</h1>
    <h1 v-if="!redirect">Redirection</h1>
    <a v-if="!redirect" v-bind:href="redirectUrl">{{ redirectUrl }}</a>
  </div>
</template>

<script>
import Redirect from '../js/redirect.js'
export default {
  name: 'Redirect',
  props: ['querystr', 'shrtcut'],
  created () {
    let url = Redirect.getUrl(this.querystr, this.shrtcut)
    if (url != null) {
      console.log(url)
      if (this.redirect) {
        window.location.href = url
      }
      this.redirectUrl = url
    }
  },
  data: function () {
    return {
      redirect: Redirect.doIredirect(),
      redirectUrl: ''
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
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
