import Config from './config.js'
import stats from './searchstat.js'

var Redirect = {
  /**
   * retourne l'url à utiliser
   * @param query
   * @param shrtcut
   */
  getUrl (query, shrtcut) {
    if (query === undefined && shrtcut === undefined) {
      return null
    }

    let readConfig = Config.getShrCut(shrtcut)

    if (readConfig != null) {
      console.log(readConfig)
      let url = readConfig.url.replace('::%s::', query)
      if (url != null) {
        if (Config.doIStat()) {
          stats.putStat(query, readConfig, url)
        }
        return url
      }
    }

    return null
  },
  doIredirect () {
    return Config.doIRedirect()
  }
}
export default Redirect
