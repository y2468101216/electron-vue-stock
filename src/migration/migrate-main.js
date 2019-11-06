class migrateMain {
  constructor (dbPath) {
    this.dbPath = dbPath
    this.sqlite3 = require('sqlite3').verbose()
    this.fs = require('fs')
  }

  run () {
    let db = new this.sqlite3.Database(this.dbPath) // 這裡是把資料存入記憶體
    let sqls = []
    fs.readdirSync('./sqls').forEach(file => {
      sqls.push(file)
    })
    db.serialize(function () {
      db.run('CREATE TABLE lorem (info TEXT)')
    })

    db.close()
  }

  checkMigrationTable () {
    let db = new this.sqlite3.Database(this.dbPath) // 這裡是把資料存入記憶體
    let sql = "SELECT name FROM sqlite_master WHERE type='table' AND name='migrations';"
    db.all(sql, function (err, rows) {
      if (rows.length == 0) {

      }
    })

    db.close()
  }

  createMigrationTable () {

  }
}

modules.export = migrateMain
