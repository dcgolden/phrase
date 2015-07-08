'use strict';
module.exports = {
    classrooms: function(pouchDB, dbName) {
        var db = pouchDB(dbName);

        function list() {
            return db.allDocs({
                    startkey: 'classroom',
                    endkey: 'classroom{}',
                    inclusive_end: true,
                    include_docs: true
                })
                .then(function(res) {
                    console.log(res.rows);
                    return res.rows.map(function(r) {
                        return r.doc;
                    });
                });
        }

        function create(classroom) {
            classroom.type = 'classroom';
            classroom._id = 'classroom-' + (new Date()).toISOString();
            return db.put(classroom);
        }

        function getArticles(id) {
            return db.query('articlesClass/articlesClass', {
                key: id,
                include_docs: true
            })
              .then(function(res) {
                console.log(res.rows);
                return res.rows.map(function(r) {
                    return r.doc;
                });
            });

        }

        function get(id) {
            console.log(id);
            return db.get(id);
        }

        function update(classroom) {
            return db.put(classroom);
        }

        function remove(id) {
            return db.get(id).then(db.remove);
        }

        return Object.freeze({
            list: list,
            create: create,
            get: get,
            update: update,
            remove: remove,
            getArticles: getArticles
        });
    }
};
