'use strict';

module.exports = {
    articles: function(pouchDB, dbName) {
        var db = pouchDB(dbName);

        function list() {
            return db.allDocs({
                    startkey: 'article',
                    endkey: 'article{}',
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

        function create(article) {
            article.type = 'article';
            article._id = 'article-' + (new Date()).toISOString()
            return db.put(article);
        }

        function get(id) {
            return db.get(id);
        }

        function update(article) {
            return db.put(article);
        }

        function remove(id) {
            return db.get(id).then(function(doc) {
                return db.remove(doc);
            });
        }

        return Object.freeze({
            list: list,
            create: create,
            get: get,
            update: update,
            remove: remove
        });
        /*annotations: function(pouchDB, annotationDbName) {
            var db = pouchDB(annotationDbName);

            var ddoc = {
                _id: '_design/annotator',
                views: {
                    annotations: {
                        map: function(doc) {
                            if ('uri' in doc && 'ranges' in doc) {
                                emit(doc.uri, 1);
                            }
                        }.toString()
                    }
                }
            };

            function create(annotation) {
                annotation.id = PouchDB.utils.uuid();
                annotation._id = annotation.id;
                return db.post(annotation)
                    .then(function(resp) {
                        annotation._rev = resp.rev;
                        return annotation;
                    })
                    .catch(console.log.bind(console));
            },


            function query(queryObj) {
                queryObj.reduce = false;
                queryObj.include_docs = true;
                return db.query('annotator/annotations', queryObj)
                    .then(function(resp) {
                        var annotations = [];
                        for (var i = 0; i < resp.rows.length; i++) {
                            annotations.push(resp.rows[i].doc);
                        }
                        return {
                            results: annotations,
                            metadata: {
                                total: resp.rows.length
                            }
                        };
                    })
                    .catch(console.log.bind(console));
            }

            function update(annotation) {
                return db.put(annotation)
                    .then(function(resp) {
                        annotation._rev = resp.rev;
                        return annotation;
                    })
                    .catch(console.log.bind(console));
            } {
                return db.put(article);
            }

            function delete(annotation) {
                return db.remove(annotation)
                    .then(function(resp) {
                        return annotation;
                    })
                    .catch(console.log.bind(console));
            }
            };
        }
    })*/
    }
};
