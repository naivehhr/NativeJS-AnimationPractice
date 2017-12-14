'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
	function Person() {
		_classCallCheck(this, Person);

		this.abbb = function (key) {
			console.log('123');
		};

		this.age = 1;
		this.salary = 100;
	}

	_createClass(Person, [{
		key: 'sayHello',
		value: function sayHello() {
			console.log('hello say by aran');
		}
	}]);

	return Person;
}();

module.exports = Person;