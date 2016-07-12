//var assert = require('chai').assert
var chai = require('chai')
var sb = require('../spellbook')
var object = { a : 1, b : 2 }

describe('Tools: Generic', function () {
	describe('sb.range()', function () {
		it('Return array', function () {
			chai.assert.typeOf(sb.range(), 'array')
			chai.assert.lengthOf(sb.range(), 0)
		})

		it('Return array of numbers: 0, 1000', function () {
			var res = sb.range(0,1000)
			chai.assert.typeOf(res, 'array')
			chai.assert.lengthOf(res, 1001)
			for (var i = 0;i<res.length; i++) chai.assert.typeOf(res[i], 'number')
		})

		it('Return array of varers: a, z', function () {
			var res = sb.range('a','z')
			chai.assert.typeOf(res, 'array')
			chai.assert.lengthOf(res, 26)
			for (var i = 0;i<res.length; i++) chai.assert.typeOf(res[i], 'string')
		})

		it('Return array of varers: A, Z', function () {
			var res = sb.range('A','Z')
			chai.assert.typeOf(res, 'array')
			chai.assert.lengthOf(res, 26)
			for (var i = 0;i<res.length; i++) chai.assert.typeOf(res[i], 'string')
		})
/*
		it('Testing combinations: 1, Z', function () {
			var res = sb.range(1,'Z')
			assert.typeOf(res, 'array')
			assert.lengthOf(res, 26)
			for (var i = 0;i<res.length; i++) assert.typeOf(res[i], 'string')
		})
*/
	})

	describe('sb.assing()', function () {
		var obj_copy = sb.assign(object)
		it('Return object', function () {
			chai.assert.isObject(obj_copy)
		})

		it('The same object', function () {
			chai.assert.notEqual(obj_copy, object)
		})

		it('The same data', function () {
			chai.assert.notStrictEqual(obj_copy, object, "The same values")
		})
	})

	describe('sb.clone()', function () {
		var obj_copy = sb.clone(object)
		it('Return object', function () {
			chai.assert.isObject(obj_copy)
		})

		it('The same object', function () {
			chai.assert.notEqual(obj_copy, object)
		})

		it('The same data', function () {
			chai.assert.notStrictEqual(obj_copy, object, "The same values")
		})
	})

	describe('sb.remove()', function () {
		var obj_array = [{ a : 1}, { a : 2}, { b : 3}]
		var number_array = [1, 2, 6]
		var string_array = ["1", "2", "6"]
		it('Delete object and return array', function () {
			var res = sb.remove(obj_array, { b : 3 })
			chai.assert.isArray(res)
		})

		it('Delete object and length is correct', function () {
			var res = sb.remove(obj_array, { b : 3 })
			chai.assert.lengthOf(res, 2)
		})

		it('Delete string and return array', function () {
			var res = sb.remove(string_array, "6")
			chai.assert.isArray(res)
		})

		it('Delete string and length is correct', function () {
			var res = sb.remove(string_array, "2")
			chai.assert.lengthOf(res, 2)
		})
	})

	
})
