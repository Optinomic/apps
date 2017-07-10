var Session = (function() {

  var storage = localStorage;

  var isLoggedIn = function() {
    var uid = storage.getItem("optinomic_user_id");
    return !(uid === null);
  };

  var getUserID = function() {
    return parseInt(storage.getItem("optinomic_user_id"));
  };

  var getTrustComputer = function() {
    return JSON.parse(storage.getItem("optinomic_trust_computer"));
  };

  var setTrustComputer = function(trust) {
    trust = trust || false;
    storage.setItem("optinomic_trust_computer", trust);
  };

  var getToken = function() {
    return storage.getItem("optinomic_token");
  };

  var login = function(uid, token) {
    console.log('SESSION | login', uid, token);
    storage.setItem("optinomic_user_id", uid);
    storage.setItem("optinomic_token", token);

    UserStore.start();
  };

  var logout = function() {

    storage.removeItem("optinomic_user_id");
    storage.removeItem("optinomic_token");

    UserStore.stop();
    storage.removeItem("optinomic_trust_computer");
  };

  return {
    isLoggedIn: isLoggedIn,
    getUserID: getUserID,
    getToken: getToken,
    getTrustComputer: getTrustComputer,
    setTrustComputer: setTrustComputer,
    login: login,
    logout: logout
  };

})();
