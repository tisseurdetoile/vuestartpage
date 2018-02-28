<template>
  <div class="home">
    <br />
    <div class="search">
      <form @submit.prevent="searchMe">
        <input type="text" size="100" id="search" v-model="searchStr" placeholder="Que rechercher ... que faire">
      </form>
    </div>
    <br />
    <div id="pleft">
      <ul id="lastsrch">
        <h2>Dernières recherche</h2>
        <li v-for="(item, index) in lastWeeks.slice(0,16)" v-bind:index="index" v-bind:key="item.t">
          <a v-if="item.u !== undefined" :href="item.u"><span class="engine">{{ item.n }}</span></a>
          <span class="tag" v-on:click="addTerms(tag)" v-for="tag in item.p.slice(0,4)" v-bind:key="tag">{{ tag }}</span>
          <span v-if="item.p.length > 4" :title="item.p.slice(4,item.p.length).toString()" class="tag" >...</span>
        </li>
      </ul>
    </div>
    <div id="pright">
      <div class="tagcloud">
        <h2>TagCloud</h2>
        <ul>
          <li v-for="(item, index) in getTagCloud.slice(0,15)" v-bind:index="index" v-bind:key="index">
            <a href="#" v-on:click="addTerms(item.name)">{{ item.name }}<span>{{ item.score }}</span></a>
          </li>
        </ul>
      </div>
      <div id="graphs">
        <h2>Graphs</h2>
        <div id="bar">
          <template>
            <peity :type="'bar'" :options="{'width': 150, 'height':150}" :data="getHistUsage"></peity>
          </template>
        </div>
        <div id="pie">
          <div id="pieShrt">
            <template>
              <peity :type="'pie'" :options="getoptionPieShrt" :data="pieShrt"></peity>
            </template>
          </div>
          <div id="pielegend">
            <ul id="legend">
              <li v-for="(item, index)  in getPieLegeng" v-bind:style="{ color: item.color }" v-bind:index="index" v-bind:key="index">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
  data () {
    return {
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
      ret['width'] = 150
      ret['height'] = 150
      ret['innerRadius'] = 50
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
    },
    addTerms: function (term) {
      this.searchStr += ' ' + term
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#pleft {
  text-align: left;
  float: left;
  with:35%;
  min-width: 35%;
}

#pright {
  float: left;
  text-align: left;
  width:45%;
  min-width: 45%;
  margin-left: 5%;
}

#pie {
  margin-left:20px;
}

#pieShrt {
  float: left;
  width: 180px;
}

#bar {
  float: left;
}
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
  list-style-type: none;
}

#lastsrch a {
  text-decoration: none;
  font-weight: bold;
  font-size: 25px;
}

.box {
  width: 8px;
  height: 8px;
  margin: 4px;
  border: 1px solid rgba(0, 0, 0, .2);
}

#lastsrch span.engine {
  position: relative;
  display: inline-block;
  max-width: 100px;
  height: 22px;
  line-height: 22px;
  padding: 0 1em 0 1em;
  background-color: #92B558;
  border: 1px solid #aaa;
  border-radius: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #333;
  font-weight: bold;
  font-size: 10px;
  text-decoration: none;
  -webkit-transition: .2s;
  transition: .2s;
  text-transform: uppercase;
}

#lastsrch span.tag {
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
