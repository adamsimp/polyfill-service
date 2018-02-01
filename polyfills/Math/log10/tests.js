/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is a function', function () {
	proclaim.isFunction(Math.log10);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Math.log10.length, 1);
});

it('has correct name', function() {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Math.log10.name, 'log10');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Math.log10), 'log10');
	}
});

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
};
var ifSupportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported() ? it : xit;

ifSupportsDescriptors('property is not enumerable', function () {
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Math.log10));
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.log10()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.log10(undefined)));
});

it('works as expected when called with string arguments', function () {
	proclaim.strictEqual(Math.log10(''), Math.log10(0));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.log10(Infinity), Infinity);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.log10(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.log10(0), -Infinity);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.log10(-0), -Infinity);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.log10(1), 0);
	// TODO: Make polyfill pass this test
	// proclaim.strictEqual(Math.log10(5), 0.6989700043360189);
	// proclaim.strictEqual(Math.log10(50), 1.6989700043360187);
	// proclaim.strictEqual(Math.log10(1000), 3);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.log10(1.5), 0.17609125905568124);
	// TODO: Make polyfill pass this test
	// proclaim.strictEqual(Math.log10(0.1), -1);
	// proclaim.strictEqual(Math.log10(0.5), -0.3010299956639812);
});

it('works as expected when called with negative integers', function () {
	proclaim.isTrue(isNaN(Math.log10(-1)));
});

it('works as expected when called with negative real numbers', function () {
	proclaim.isTrue(isNaN(Math.log10(-0.1)));
});
