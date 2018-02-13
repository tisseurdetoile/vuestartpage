<template>
  <h1>Redirection</h1>
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
      window.location.href = url
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
