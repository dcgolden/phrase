'use strict';
/*The classrooms factory*/
module.exports = {
    classrooms: function(pouchDB, dbName) {
        /*Initalizes pouchDB with the database dbName(defined in /app/index.js) and gives it a variable reference db*/
        var db = pouchDB(dbName + '/classrooms');

        /*Returns the list of all classrooms on database*/
        function list() {
            return db.allDocs({
                    /*This tells server to return all docs starting with classroom*/
                    startkey: 'classroom',
                    endkey: 'classroom{}',
                    inclusive_end: true,
                    /*Include not just the key but all fields*/
                    include_docs: true
                })
                .then(function(res) {
                    console.log(res.rows);
                    return res.rows.map(function(r) {
                        return r.doc;
                    });
                });
        }
        /*Create a new classroom and save to database*/
        function create(classroom) {
            classroom.type = 'classroom';
            classroom._id = 'classroom-' + (new Date()).toISOString();
            return db.put(classroom);
        }
        /*Query a custom view for artilcesby classroom id*/
        function getArticles(id) {
            return db.query('articlesClass/articlesClass', {
                    key: id,
                    include_docs: true
                })
                .then(function(res) {
                    /*Gets*/
                    console.log(res.rows);
                    return res.rows.map(function(r) {
                        return r.doc;
                    });
                });

        }
        /*Get classrooms by id*/
        function get(id) {
            console.log(id);
            return db.get(id);
        }
        /*Update (edit) classroom by classroom object*/
        function update(classroom) {
            return db.put(classroom);
        }
        /*delete classroom by id*/
        function remove(id) {
            return db.get(id).then(db.remove);
        }
        /*List of factory functions*/
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
