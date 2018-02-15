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
      <li v-for="(item, index) in lastWeeks.slice(0,10)" v-bind:index="index" v-bind:key="item.t">
        {{ item.n }} (
        <span class="tag" v-for="tag in item.p" v-bind:key="tag">{{ tag }}</span> )
        <a v-if="item.u !== undefined" :href="item.u">⬈</a>
      </li>
    </ul>
    <div id="pieShrt">
      <template>
        <peity :type="'pie'" :options="getoptionPieShrt" :data="pieShrt"></peity>
      </template>
      <ul id="legend">
        <li v-for="(item, index)  in getPieLegeng" v-bind:style="{ color: item.color }" v-bind:index="index" v-bind:key="index">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="tagcloud">
    <ul>
      <li v-for="(item, index) in getTagCloud.slice(0,15)" v-bind:index="index" v-bind:key="index">
        <a href="#">{{ item.name }}<span>{{ item.score }}</span></a>
      </li>
    </ul>
    </div>
    <template>
      <peity :type="'bar'" :options="{'width': 150, 'height':150}" :data="getHistUsage"></peity>
    </template>

  </div>
</template>
<script>
import Peity from 'vue-peity'
import stats from '../js/stats.js'
import Config from '../js/config.js'
import Redirect from '../js/redirect.js'

export default {
  components: {
    Peity
  },
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lastWeeks: stats.getLastWeeks(),
      searchStr: '',
      tags: stats.extractTag(stats.getLastWeeks())
    }
  },
  computed: {
    pieShrt () {
      return this.tags.pieChartShrt.series.toString()
    },
    getoptionPieShrt () {
      let ret = {}
      ret['fill'] = this.tags.pieChartShrt.colors.flat
      ret['width'] = 100
      ret['height'] = 100
      ret['innerRadius'] = 30
      ret['radius'] = 10
      return ret
    },
    getPieLegeng () {
      return this.tags.pieChartShrt.colors.obj
    },
    getTagCloud () {
      return this.tags.tagcloud
    },
    getHistUsage () {
      return this.tags.retSearchByDate.srchByDateDaysHit.toString()
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
.box {
  width: 8px;
  height: 8px;
  margin: 4px;
  border: 1px solid rgba(0, 0, 0, .2);
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

.tagcloud ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.tagcloud ul li {
  display: inline-block;
  margin: 0 .3em .3em 0;
  padding: 0;
}
.tagcloud ul li a {
  position: relative;
  display: inline-block;
  max-width: 100px;
  height: 28px;
  line-height: 28px;
  padding: 0 2.5em 0 1em;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #333;
  font-size: 13px;
  text-decoration: none;
  -webkit-transition: .2s;
  transition: .2s;
}
.tagcloud li span {
  position: absolute;
  top: 3px;
  right: 3px;
  z-index: 2;
  width: 22px;
  height: 22px;
  line-height: 22px;
  background-color: #3498db;
  border-radius: 100%;
  color: #fff;
  font-size: 12px;
  text-align: center;
  -webkit-transition: .2s;
  transition: .2s;
}
.tagcloud ul li a:hover {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: #fff;
}
.tagcloud ul li a:hover span {
  background-color: #fff;
  color: #3498db;
}
</style>
