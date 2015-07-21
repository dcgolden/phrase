module.exports = {
  users: function (pouchDB, remoteUserDbName) {
    var db = pouchDB(remoteUserDbName)

    function signup (username, password, email, role) {
      return db.signup(username, password, { metadata: { email: email, role: role}})
    }

    function login (username, password) {
      return db.login(username, password)
    }

    function logout () {
      return db.logout()
    }

    function getSession () {
      return db.getSession()
    }

    function getUser(username) {
      return db.getUser(username)
    }

    function changePassword (username, password) {
      return db.changePassword(username, password)
    }
    

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