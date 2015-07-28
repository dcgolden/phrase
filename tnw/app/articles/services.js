'use strict';
/*The Articles Factory*/
module.exports = {
    articles: function(pouchDB, dbName, annotationDbName) {
        /*Initalizes pouchDB with the database dbName(defined in /app/index.js) and gives it a variable reference db*/
        var db = pouchDB(dbName);
        /*Returns the list of all articles on database*/
        function list() {
            return db.allDocs({
                    /*This tells the server to get all docs that start with article*/
                    startkey: 'article',
                    endkey: 'article{}',
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
        /*Create a new article and save to database*/
        function create(article) {
            article.type = 'article';
            article._id = 'article-' + (new Date()).toISOString();
            return db.put(article);
        }
        /*Get article by id*/
        function get(id) {
            return db.get(id);
        }
        /*Update (edit) article by article object*/
        function update(article) {
            return db.put(article);
        }
        /*Delete article by id*/
        function remove(id) {
            return db.get(id).then(function(doc) {
                return db.remove(doc);
            });
        }
        /*List of factory functions*/
        return Object.freeze({
            list: list,
            create: create,
            get: get,
            update: update,
            remove: remove
        });

    }
};
