(function() {
    'use strict';

    app.service('LoginSrvc', LoginSrvc, ['Session', 'UserSrvc', 'User']);

    function LoginSrvc(Session, UserSrvc, User, $timeout) {
        var login = this;
        login.user = {
            userId: null,
            name: "User",
            data: null,
            isSessionActive: false
        };

        login.login = function() {
            var user = {
                userId: null,
                name: "User",
                data: null,
                isSessionActive: false
            };
            login.validateLogin();
            if (login.validateLogin()) {
                $timeout(function() {
                    user.name = User.getFirst() + " " + User.getLast();
                    user.isSessionActive = true;
                }, 250);
                console.log("it happened.");
                login.user = user;
                return true;
            } else {
              return false;
            }
        };

        login.logout = function() {
          login.user = {
              userId: null,
              name: "User",
              data: null,
              isSessionActive: false
          };
          UserSrvc.endSession();
          if(!login.validateLogin()){
            User.resetUser();
          }
        }

        login.validateLogin = function() {
          var isValidationDone = false;
            do {
                login.user.data = UserSrvc.hasValidLoginCredentials();
                console.log(login.user.data);
                if(login.user.data != null) {
                  isValidationDone = true;
                }
            }
            while (login.user.data == null);
            if (isValidationDone) {
                console.log("it happened before the other.");
                Session.setSessionActive(true);
                login.user.userId = login.user.data.userId;
                login.user.isSessionActive = Session.isSessionActive();
                setSessionAndCookies();
                if (Session.isActiveSession && Session.isValidSession) {
                    return true;
                } else if (Session.isActiveSession) {
                    return false;
                } else if (Session.isValidSession) {
                    return false;
                } else {
                    return false;
                }
            }
        }

        function setSessionAndCookies() {
            Session.setName("username");
            Session.setUserId(UserSrvc.getUserId());
            Session.setExpirationIndays(364);
            Session.setSession();
            Session.setCookie(Session.session);
            Session.checkCookie();
        }

    }
})();
