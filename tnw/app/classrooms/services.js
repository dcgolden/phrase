module.exports = {
  classrooms: function (pouchDB, dbName) {
    var db = pouchDB(dbName)

    function list () {
      return db.query(function (doc) { 
        if (doc.type === 'classroom') { 
          return emit(doc._id) 
        }
      }, {include_docs: true})
        .then(function (res) {
          return res.rows.map(function (r) { return r.doc })
        })
    }

    function create (classroom) {
      classroom.type = 'classroom'
      classroom._id = 'classroom-' + (new Date()).toISOString()
      return db.put(classroom)
    }

    function get (id) {
      return db.get(id)
    }

    function update (classroom) {
      return db.put(classroom)
    }

    return Object.freeze({
      list: list,
      create: create,
      get: get,
      update: update,
      // remove: remove
    })
  }
}