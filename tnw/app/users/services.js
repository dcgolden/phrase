/*Users factory*/
module.exports = {
  users: function (pouchDB, remoteUserDbName) {
    /*Initalizes pouchDB with the database remoteUserDbName(defined in /app/index.js) and gives it a variable reference db*/
    var db = pouchDB(remoteUserDbName)
    /*sign up function, sends metadata of email, role(teacher or student) and name to server*/
    function signup (username, password, email, role, firstName, lastName) {
      return db.signup(username, password, { metadata: { email: email, role: role, firstName: firstName, lastName: lastName}})
    }
    /*log into database*/
    function login (username, password) {
      return db.login(username, password)
    }
    /*log out of database*/
    function logout () {
      return db.logout()
    }
    /*get current session info*/
    function getSession () {
      return db.getSession()
    }
    /*Get user info*/
    function getUser(username) {
      return db.getUser(username)
    }
    /*change user password*/
    function changePassword (username, password) {
      return db.changePassword(username, password)
    }
    
    /*list of factory functions*/
    return Object.freeze({
      signup: signup,
      login: login,
      logout: logout,
      getSession: getSession,
      getUser: getUser,
      changePassword: changePassword
    })
  }
}
