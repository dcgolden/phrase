'use strict';
/*uses cssify module (like browserify but for css) to bundle CSS*/
var cssify = require('cssify');
cssify.byUrl('//cdn.rawgit.com/angular/bower-material/master/angular-material.css');
cssify.byUrl('/main.css');
/*pouchDB needs it's own requires outside of browserify*/
window.PouchDB = require('pouchdb');
window.PouchDB.plugin(require('pouchdb-authentication'));
/*browserify stuff begins here, this is how you add node_modules with browserify*/
require('angular').module('app', [
        require('angular-animate'),
        require('angular-aria'),
        require('angular-material'),
        require('./ng-icons'), /*svg-icons*/
        require('angular-ui-router'), /*controls user going between views*/
        require('angular-messages'), /*used to show fields are required*/
        require('./classrooms'), /*Add new url branches/main states here*/
        require('./articles'),
        require('./users')
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $urlRouterProvider.otherwise('/')
        $stateProvider
        /*Also need to add the new url/states here*/
            .state('home', require('./components/home'))
            .state('about', require('./components/about'))
            .state('contact', require('./components/contact'))
            /*All theming is done here. md-primary, md-hue-1 etc are very useful class tags*/
        $mdThemingProvider.theme('default')
            .primaryPalette('blue', {
                'default': '500', // by default use shade 500 from the palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '500', // use shade 500 for the <code>md-hue-2</code> class
                'hue-3': '700' // use shade 700 for the <code>md-hue-3</code> class
            })
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('red', {
                'default': 'A200' // use shade A200 for default, and keep all other shades the same
            });

    }])
    //ahh directives, these are very useful. read up on them
    //directive for the nav bar. it is used in the app/indx.html file
    .directive('appNav', ['users', require('./components/app-nav')])
    //directive for the footer. I couldnt get it to position correctly but it works. use like the appNav in app/index.html with the tag
    //<footer-bar></footer-bar>
    .directive('footerBar', ['users', require('./components/footer-bar')])
    //directive for the avatar. this lets us place tha avatar anywhere we want. instead of using template tho. maybe use templateUrl
    //and try to dynamically change the users avatar based on his or her choice. or make it 'template: user.avatar' and set it that way
    //look up how to make a variable too in the HTML so we could give it height and width each time we call it like
    //<userAvatar height=100px width=100px></userAvatar>
    .directive('userAvatar', function() {
        return {
            replace: true,
            template: '<svg class="user-avatar" viewBox="0 0 250 250" height="86" width="86" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
        };
    })
    //directive that compares two text fields... used for password and confirm password. could also use for email confirmation
    .directive("compareTo", function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    })
    //our apps controller. we use one controller but it only 'loads' for whatever page we are on (also navbar and footer if they are in the view)
    .controller('AppController', ['$scope', 'classrooms', 'users', AppController])
    /*Constants for database name*/
<<<<<<< HEAD
    .constant('dbName', 'https://couchdb-34f38d.smileupps.com/classrooms')
    .constant('remoteUserDbName', 'https://couchdb-34f38d.smileupps.com/_users')
    .constant('annotationDbName', 'https://couchdb-34f38d.smileupps.com/annotator')
=======
    .constant('dbName', 'https://phrasedev.smileupps.com/phrase')
    .constant('remoteUserDbName', 'https://phrasedev.smileupps.com/_users')
    .constant('annotationDbName', 'https://phrasedev.smileupps.com/annotator')
    
>>>>>>> 2f33a2fb464a9a9c641a828f313efd8433d0dd5f
    //.factory('classrooms', ['pouchDb', require('./services/classrooms')])

//some functions we want everywhere in our app
function AppController($scope, users) {
    //variable for toggling navBar
    $scope.showMenu = true;
    $scope.toggle = function() {
        $scope.showMenu = !$scope.showMenu;
    };

    //this listens for $emit then $broadcasts. used to make navBar controller know weather to use menu button or back button
    $scope.$on('pushChangesToAllNodes', function(event, message) {
        $scope.$broadcast(message.name, message.data);
    });

}
