var chai = require('chai')
var sb = require('../spellbook')

describe('Tools: Check Type', function () {
	describe('#isFunction()', function () {
		it('Check is function', function () {
			chai.assert.isTrue(sb.isFunction(function () {}), "Is function")
		})

		it('Check empty is not true', function () {
			chai.assert.isNotTrue(sb.isFunction(), "Is empty")
		})

		it('Check array is not true', function () {
			chai.assert.isNotTrue(sb.isFunction([]), "Is array")
		})

		it('Check string is not true', function () {
			chai.assert.isNotTrue(sb.isFunction(""), "Is string")
		})

		it('Check number is not true', function () {
			chai.assert.isNotTrue(sb.isFunction(1), "Is number")
		})

		it('Check object is not true', function () {
			chai.assert.isNotTrue(sb.isFunction({}), "Is object")
		})
	})

	describe('#isArray()', function () {
		it('Check is array', function () {
			chai.assert.isTrue(sb.isArray([]), "Is array")
		})

		it('Check function is not true', function () {
			chai.assert.isNotTrue(sb.isArray(function () {}), "Is function")
		})

		it('Check empty is not true', function () {
			chai.assert.isNotTrue(sb.isArray(), "Is empty")
		})

		it('Check string is not true', function () {
			chai.assert.isNotTrue(sb.isArray(""), "Is string")
		})

		it('Check number is not true', function () {
			chai.assert.isNotTrue(sb.isArray(1), "Is number")
		})

		it('Check object is not true', function () {
			chai.assert.isNotTrue(sb.isArray({}), "Is object")
		})
	})

	describe('#isObject()', function () {
		it('Check is object', function () {
			chai.assert.isTrue(sb.isObject({}), "Is object")
		})

		it('Check is array', function () {
			chai.assert.isNotTrue(sb.isObject([]), "Is array")
		})

		it('Check function is not true', function () {
			chai.assert.isNotTrue(sb.isObject(function () {}), "Is function")
		})

		it('Check empty is not true', function () {
			chai.assert.isNotTrue(sb.isObject(), "Is empty")
		})

		it('Check string is not true', function () {
			chai.assert.isNotTrue(sb.isObject(""), "Is string")
		})

		it('Check number is not true', function () {
			chai.assert.isNotTrue(sb.isObject(1), "Is number")
		})
	})
})