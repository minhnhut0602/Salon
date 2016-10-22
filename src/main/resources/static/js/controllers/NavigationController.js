(function() {
  'use strict';

  app.controller('NavigationCtrl', NavigationCtrl, ['Session', 'UserSrvc']);
  function NavigationCtrl($scope, Session, UserSrvc) {
    $scope.currentNavigationItem = 'home';
    $scope.displayLoginForm = displayLoginForm;
    $scope.displayNewPromotionModal = displayNewPromotionModal;
    $scope.displayNewAppointmentModal = displayNewAppointmentModal;
    $scope.displayNewCustomerModal = displayNewCustomerModal;
    $scope.user = "User";

    function displayNewPromotionModal() {
      console.log("displayNewPromotionModal");
    };

    function displayNewAppointmentModal() {
      console.log("displayNewAppointmentModal");
    };

    function displayNewCustomerModal() {
      console.log("displayNewCustomerModal");
    };

    function displayLoginForm() {
      console.log("displayLoginForm");
      // TODO: Create modal for login form
      UserSrvc.setUserId("0");
      UserSrvc.setPassword("root");
      var user = UserSrvc.getUserId();
      var password = UserSrvc.getPassword();
      console.log(user + " " + password);
      if(validateLogin()) {
        console.log("Validation ran and successful");
      } else {
        console.log("Validation ran and unsuccessful");
      }
    };

    function validateLogin() {
      var validUserData = UserSrvc.hasValidLoginCredentials();
      if(validUserData != null) {
          console.log("User has valid login credentials!");
          setSessionAndCookies();
          if(Session.isActiveSession && Session.isValidSession) {
            console.log("Validated And Active Session!");
            return true;
          } else if (Session.isActiveSession) {
              console.log("Session has not been validated");
              return false;
          } else if (Session.isValidSession) {
              console.log("User has logged out");
              return false;
            } else {
              console.log("User has not yet logged in");
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
