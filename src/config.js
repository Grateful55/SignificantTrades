const fs = require('fs')
const path = require('path')

console.log(`[init] reading config.json...`)

/* Default configuration (its not ok to change here!, use config.json.)
 */

const DEFAULTS = {
  // default pair we track
  pair: 'BTCUSD',

  // will connect to exchanges and subscribe to pairs on startup
  collect: true,

  // default server port
  port: 3000,

  // dont broadcast below ms interval
  delay: 0,

  // aggregate trades that came within same millisecond before broadcast
  // (note) saving to storage is NOT impacted
  // (warning) will add +50ms delay for confirmation that trade actually came on same ms
  aggr: true,

  // restrict origin (now using regex)
  origin: '.*',

  // max interval an ip can fetch in a limited amount of time (usage restriction, default 7 day)
  maxFetchUsage: 1000 * 60 * 60 * 24,

  // the limited amount of time in which the user usage will be stored
  fetchUsageResetInterval: 1000 * 60 * 10,

  // admin access type (whitelist, all, none)
  admin: 'whitelist',

  // enable websocket server (if you only use this for storing trade data set to false)
  websocket: true,

  // enable api (historical/{from: timestamp}/{to: timestamp})
  api: true,

  // storage solution, either
  // false | null (no storage, everything is wiped out after broadcast)
  // "files" (periodical text file),
  // "influx" (timeserie database),

  // NB: use array or comma separated storage names for multiple storage solution
  // default = "files" just store in text files, no further installation required.
  storage: 'files',

  // store interval (in ms)
  backupInterval: 1000 * 10,

  // influx db server to use when storage is set to "influx"
  influxUrl: 'localhost:9200',

  // influx database
  influxDatabase: 'significant_trades',

  // base name measurement used to store the bars
  // if influxMeasurement is "trades" and influxTimeframe is "10000", influx will save to trades_10s
  influxMeasurement: 'trades',

  // timeframe in ms (default 10s === 10000ms)
  // this is lowest timeframe that influx will use to group the trades
  influxTimeframe: 10000,

  // downsampling
  influxResampleTo: [1000 * 30, 1000 * 60, 1000 * 60 * 3, 1000 * 60 * 5, 1000 * 60 * 15],

  // preload continuous queries measurements (each influxResampleTo) with N ms of data on startup (default = 24h of data)
  influxPreheatRange: 1000 * 60 * 60 * 24,

  // create new text file every N ms when storage is set to "file" (default 1h)
  filesInterval: 3600000,

  // default place to store the trades data files
  filesLocation: './data',
}

/* Load custom server configuration
 */

let config

try {
  const configPath = path.resolve(__dirname, '../config.json')
  const configExamplePath = path.resolve(__dirname, '../config.json.example')
  if (!fs.existsSync(configPath) && fs.existsSync(configExamplePath)) {
    fs.copyFileSync(configExamplePath, configPath)
  }

  config = require(configPath)
} catch (error) {
  throw new Error(`Unable to parse configuration file\n\n${error.message}`)
}

/* Merge default
 */

config = Object.assign(DEFAULTS, config)

/* Node arg based configuration
*/

if (process.argv.length > 2) {
  let exchanges = []

  process.argv.slice(2).forEach((arg) => {
    const keyvalue = arg.split('=')

    if (keyvalue.length === 1) {
      exchanges.push(arg)
    } else {
      try {
        config[keyvalue[0]] = JSON.parse(keyvalue[1])
      } catch (error) {
        config[keyvalue[0]] = keyvalue[1]
      }
    }
  })

  if (exchanges.length) {
    config.exchanges = exchanges
  }
}

/* Validate storage
*/

if (config.storage) {
  if (!Array.isArray(config.storage)) {
    if (config.storage.indexOf(',') !== -1) {
      config.storage = config.storage.split(',').map(a => a.trim())
    } else {
      config.storage = [config.storage.trim()]
    }
  }
  console.log(config.storage);
  for (let storage of config.storage) {
    const storagePath = path.resolve(__dirname, 'storage/' + storage + '.js');
    if (!fs.existsSync(storagePath)) {
      throw new Error(`Unknown storage solution "${storagePath}"`)
    }
  }
} else {
  config.storage = null;
}

/* Others validations
*/

module.exports = config