const Dexie = require('dexie')
const Config = require('../config/default')
const startVersion = 1

class migrateMain {
  static run () {
    let db = new Dexie(Config.database.name)
    let endVersion = Config.database.version
    for (let i = startVersion; i <= endVersion; i++) {
      let Schema = require('./schemas/Version' + i + 'Migrate')
      let Seeder = require('../seeder/Version' + i + 'Seeder')
      db.version(i).stores(Schema).upgrade(Seeder)
    }
    return db
  }
}

export default migrateMain
