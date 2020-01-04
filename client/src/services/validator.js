export default function Validator(str) {
  const testStr = str.trim();
  this.maxLength = function(len) {
    if (testStr.length > len) {
      return false;
    }
    return true;
  };

  this.minLength = function(len) {
    if (testStr.length < len) {
      return false;
    }
    return true;
  };

  this.isEmail = function() {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(testStr)) {
      return true;
    }
    return false;
  };
  this.isPhoneNumber = function() {
    if (/\+38[0-9]{10,10}$/.test(testStr)) {
      return true;
    }
    return false;
  };
  this.noSpeсialChar = function() {
    if (/[-\/\\^$*+?()|[\]{}]/g.test(testStr)) {
      return true;
    }
    return false;
  };

  this.testPassword = function() {
    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (strongRegex.test(testStr)) {
      return 2;
    }
    if (mediumRegex.test(testStr)) {
      return 1;
    }
    return 0;
  };
}
