// http://www.spellbook.io
var Spellbook = function () {
	this.range = function (a, b, step) {
		var A = [];
		if (this.empty(a) || this.empty(b)) return A;
		if (typeof a == 'number') {
			A[0] = a;
			step = step || 1;
			while (a+step<= b) A[A.length] = a += step;
		} else {
			var s = 'abcdefghijklmnopqrstuvwxyz';
			if (a === a.toUpperCase()) {
				b = b.toUpperCase();
				s = s.toUpperCase();
			}
			s = s.substring(s.indexOf(a), s.indexOf(b)+ 1);
			A = s.split('');
		}
		return A;
	};

	this.isFunction = function (fn) {
		return typeof fn === 'function';
	};

	this.isArray = function (obj) {
		return typeof obj === "object" && obj instanceof Array;
	};

	this.isObject = function (obj) {
 		return typeof obj === "object" && (this.isArray(obj) === false );
	};

	this.isNumber = function (obj) {
		return typeof obj === "number" || obj instanceof Number;
	};

	this.isString = function (obj ) {
		return typeof obj === "string" || obj instanceof String;
	};

	this.isBoolean = function (obj) {
		return typeof obj === "boolean";
	};

	this.isInteger = function (obj) {
		if (this.isNumber(obj)) return obj % 1 === 0;
		else return false;
	};

	this.random = function (min, max) {
		if (typeof min === "number" && typeof max === "number") return Math.floor(Math.random() * (max - min)) + min;
		else {
			if(!this.isArray(min)) return 0;
			else {
				var index = Math.floor(Math.random() * (min.length));
				return min[index];
			}
		}
	};


	this.shuffle = function (array) {
		for (var i = array.length-1; i >=0; i--) {
			var randomIndex = Math.floor(Math.random()*(i+1));
			var itemAtIndex = array[randomIndex];
			array[randomIndex] = array[i];
			array[i] = itemAtIndex;
		}
		return array;
	};

	this.first = function (array) {
		return array[0];
	};

	this.last = function (array) {
		return array[array.length - 1];
	};

	this.extend = function (obj, obj2) {
		for (var i in obj2) {
			if (obj2.hasOwnProperty(i)) obj[i] = obj2[i];
		}
		return obj;
	};

 	this.clone = this.assign = function (obj) {
		if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj) return obj;

		var temp = obj.constructor();
		for(var key in obj) {
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				obj.isActiveClone = null;
				temp[key] = obj[key];
				delete obj.isActiveClone;
			}
		}
		return temp;
	};

	this.remove = function (array, obj) {
		function filter(array, obj) {
			return array.filter(function (e) {
				if (JSON.stringify(e) !== JSON.stringify(obj)) return e;
			});
		}
		if (typeof obj === 'object' && obj instanceof Array) {
			obj.forEach(function (e) {
				array = filter(array, e);
			});
			return array;
		} else return filter(array, obj);
	};

	this.clear = function (array) {
		return array.splice(array.length,0);
	};

	this.inArray = function (a, b) {
		return !!~a.indexOf(b);
	};

	this.contains = function (a, b) {
		return !!~a.indexOf(b);
	};

	this.unq = this.uniq = function (array, key) {
		var narray = [];
		var keys = {};
		for (var i = 0; i < array.length; i++) {
			if(keys[array[i][key]] === undefined && array[i][key] !== undefined) {
				narray.push(array[i][key]);
				keys[array[i][key]] = 1;
			}
		}
		return narray;
	};

	this.excerpt = function (str, nwords) {
		var words = str.split(' ');
		words.splice(nwords, words.length-1);
		return words.join(' ');
	};

	this.isEmpty = this.empty = function (data) {
		return (data === null || data === "" || data === undefined);
	};

	this.capitalize = function (data) {
		return data.charAt(0).toUpperCase() + data.slice(1);
	};

	this.dos2unix = function (data) {
		return data.replace(/\r\n/g, '\n');
	};

	this.times = function (number, callback) {
		if (typeof number === 'number' && number > 0) {
			if ( typeof callback === 'function') {
				for (var i = 0; i < number; i++) callback(i);
			}
		}
	};

	this.each = function (array, callback, response) {
		var i = 0;
		var done = function () {
			if (i < array.length) {
				y = i;
				i++;
				callback(array[y], y, done, end);
			} else if (typeof response === 'function') response();
		};

		var end = function (data) {
			if (typeof response === 'function') response(data);
		};

		if (i < array.length) done();
		else if (typeof response === 'function') response();
	};

	this.wf = this.waterfall = function (callbacks, response) {
		var i = 0;
		var done = function (data, respdata) {
			if (i < callbacks.length-1) {
				i++;
				if (data) {
					if (data === true) {
						if (typeof response === 'function') response(respdata);
					} else callbacks[i](done, data);
				} else callbacks[i](done);
			} else {
				if (typeof response === 'function') {
					if (data) {
						if (data === true) response(respdata);
						else response(data);
					} else response();
				}
			}
		};
		if (callbacks instanceof Array) callbacks[i](done);
	};

	this.fe = this.forever = function (callback, response) {
		var end = function (data) {
			if (typeof response === 'function') response(data);
		};
		var next = function (data) {
			callback(next, end);
		};
		callback(next, end);
	};

	this.get =  function (obj, route) {
		if (obj !== undefined && typeof route === "string") {
			route = route.split(".");
			if (route.length === 1 ) return obj[route[0]];
			else {
				for (var i = 0; i < route.length; i++) {
					if (obj[route[i]] !== undefined) obj = obj[route[i]];
					else return undefined;
				}
				return obj;
			}
		} else return undefined;
	};

	this.size = function (obj) {
		return Object.keys(obj).length;
	};

	this.getKeys = function(obj, keys) {
		var nobj = {};
		if (this.isArray(keys)) {
			keys.forEach(function (key) {
				nobj[key] = obj[key];
			});
		} else nobj[keys] = obj[keys];
		return nobj;
	};

	this.parallel = function (callbacks, response) {
		var it = 0;
		var data = [];
		var async = function (ix) {
			setTimeout(function () {
				callbacks[ix](done);
			}, 0);

			var done = function (gdata) {
				if (gdata) data[ix] = gdata;
				if (it < callbacks.length -1) it++;
				else {
					if (typeof response === 'function')response(data);
				}
			};
		};

		if (callbacks instanceof Array) {
			for (var i = 0; i < callbacks.length; i++) async(i);
		}
	};

	this.pl = this.parallelLimit = function (limit, callbacks, response) {
		var it = 0;
		var to = callbacks.length;
		var data = [];
		var async = function (ix) {
			setTimeout(function () {
				callbacks[ix](done);
			}, 0);

			var done = function (gdata) {
				to--;
				if (gdata) data[ix] = gdata;
				if (it !== callbacks.length) {
					async(it);
					it++;
				} else if (to === 0 && typeof response === 'function') response(data);
			};
		};

		if (callbacks instanceof Array) {
			for (var i = 0; i < limit; i++) {
				async(i);
				it++;
			}
		}
	};

	this.epl = this.eachpl = this.eachParallelLimit = function (array, limit, callback, response) {
		var it = 0;
		var to = array.length;
		var data = [];
		var async = function (item, index) {
			setTimeout(function () {
				callback(item, index, done);
			}, 0);

			var done = function (gdata) {
				to--;
				if (gdata) data[ix] = gdata;
				if (it !== array.length) {
					async(array[it], it);
					it++;
				} else if (to === 0 && typeof response === 'function') response(data);
			};
		};

		if (array instanceof Array && array.length > 0) {
			if (limit > array.length) limit =  array.length;
			for (var i = 0; i < limit; i++) {
				async(array[i], i);
				it++;
			}
		} else if ( typeof response === 'function') response(data);
	};

	this.for = this.forSync = function (ini, fin, inc, callback, end) {
		var store = [];
		var done = function (data) {
			store.push(data);
			if (ini < fin) {
				ini = ini + inc;
				callback(ini, done, end);
			} else if (typeof end === 'function') end(store);
		};
		callback(ini, done, end);
	};


	this.extender = function () {
		var self = this;
		if (!Array.prototype.remove) {
			Array.prototype.remove = function (obj) {
				return self.remove(this, obj);
			};
		}

		if (!Array.prototype.clear) {
			Array.prototype.clear = function () {
				return self.remove(this);
			};
		}

		if (!Array.prototype.random) {
			Array.prototype.random = function () {
				return self.random(this);
			};
		}

		if (!Array.prototype.shuffle) {
			Array.prototype.shuffle = function () {
				return self.shuffle(this);
			};
		}

		if (!Array.prototype.first) {
			Array.prototype.first = function () {
				return self.first(this);
			};
		}

		if (!Array.prototype.last) {
			Array.prototype.last = function () {
				return self.last(this);
			};
		}

		if (!Array.prototype.inArray) {
			Array.prototype.inArray = function (value) {
				return self.inArray(this, value);
			};
		}

		if (!Array.prototype.contains) {
			Array.prototype.contains = function (value) {
				return self.inArray(this, value);
			};
		}

		if (!Array.prototype.each) {
			Array.prototype.each = function (callback, response) {
				var self = this;
				var end = function (data) {
					if (typeof response === 'function') response(data);
				};
				var i = 0;
				var done = function () {
					if (i < self.length -1) {
						i++;
						callback(self[i], i, done, end);
					} else {
						if (typeof response === 'function') response();
					}
				};
				callback(self[i], i, done, end);
			};
		}

		if (!Object.prototype.extend) {
			Object.prototype.extend = function (obj) {
				self.extend(this, obj);
			};
		}

		if (!Object.prototype.remove) {
			Object.prototype.remove = function (keys) {
				var self = this;
				if (typeof obj === "object" && obj instanceof Array) {
					arr.forEach(function (key) {
						delete(self[key]);
					});
				} else delete(self[keys]);
			};
		}

		if (!Object.prototype.getKeys) {
			Object.prototype.getKeys = function(keys) {
				var self = this;
				var obj = {};
				if (typeof self === "object" && self instanceof Array) {
					keys.forEach(function (key) {
						obj[key] = self[key];
					});
				} else obj[keys] = self[keys];
				return obj;
			};
		}

		if (!String.prototype.repeatify) {
			String.prototype.repeatify = function (num) {
				var strArray = [];
				for (var i = 0; i < num; i++) {
					strArray.push(this.normalize());
				}
				return strArray;
			};
		}

		if (!Number.prototype.times) {
			Number.prototype.times = function (callback) {
				if (this % 1 === 0) {
					for (var i = 0; i < this; i++) callback(i);
				}
			};
		}

		if (!String.prototype.capitalize) {
			String.prototype.capitalize = function () {
				return this.charAt(0).toUpperCase() + this.slice(1);
			};
		}

		if (!String.prototype.dos2unix) {
			String.prototype.dos2unix = function () {
				return this.replace(/\r\n/g, '\n');
			};
		}

		if (!Number.prototype.isInteger) {
			Number.prototype.isInteger = function () {
				this.isInteger = function () {
					return self.isInteger(this);
				};
			};
		}

		if (!Array.prototype.isArray) {
			this.isArray = function () {
				return self.isArray(this);
			};
		}

		if (!Function.prototype.isFunction) {
			this.isFunction = function () {
				return self.isFunction(this);
			};
		}

		if (!Object.prototype.isObject) {
			this.isObject = function () {
		 		return self.isObject(this);
			};
		}

		if (!String.prototype.isString) {
			this.isString = function () {
				return self.isString(this);
			};
		}

		if (!Boolean.prototype.isBoolean) {
			this.isBoolean = function () {
		 	   	return self.isBoolean(this);
			};
		}
	};
};

if (typeof process === 'object') {
	Spellbook.prototype.cp = function (source, target) {
		return new Promise(function (resolve, reject) {
			var rd = fs.createReadStream(source);
			rd.on('error', reject);
			var wr = fs.createWriteStream(target);
			wr.on('error', function (err) {
				reject(err);
			});
			wr.on('finish', function (d) {
				resolve(d);
			});
			rd.pipe(wr);
		});
	};
	module.exports = new Spellbook();
} else {
	Spellbook.prototype.ready = function (callback) {
		document.addEventListener("DOMContentLoaded", function(event) {
			callback(event);
		});
	};

	Spellbook.prototype.comp = {
		data : {},
		stack : [],
		run : function () {
			for (var i = 0; i < this.stack.length; i++) this.stack[i].action(this.stack[i].attr[0], this.stack[i].attr[1]);
			this.stack = [];
		},
		get : function (name, attr) {
			if (typeof this.data[name].action === 'function') this.stack.push({ action : this.data[name].action, attr : [this, attr]});
			return this.data[name].html(this, attr);
		},
		set : function (name, html, action) {
			this.data[name] = {};
			this.data[name].html = html;
			if (typeof action === 'function') this.data[name].action = action;
		},
		destroy : function (name) {
			document.getElementById(name).innerHTML = "";
		},
		render : function (name, id, attr) {
			document.getElementById(id).innerHTML = this.data[name].html(this, attr);
			if (typeof this.data[name].action === 'function') this.stack.push({ action : this.data[name].action, attr : [this, attr]});
			this.run();
		}
	};

	Spellbook.prototype.on = function (obj, eventHandler, callback) {
		obj.addEventListener(eventHandler, function (event) {
			callback(event);
		});
	};

	Spellbook.prototype.id = function (id) {
		return document.getElementById(id);
	};

	Spellbook.prototype.class = function (id) {
		return document.getElementsByClassName(id);
	};

	Spellbook.prototype.ajax = {};

	Spellbook.prototype.ajax.get = function (url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', encodeURI(url));
		xhr.onload = function () {
			if (xhr.status === 200) callback(false, xhr.responseText);
			else callback("Request failed.  Returned status of " + status);
		};
		xhr.send();
	};

	Spellbook.prototype.ajax.post = function (url, data, header, callback) {
		var finaldata = "";
		function param(object) {
			var encodedString = '';
			for (var prop in object) {
				if (object.hasOwnProperty(prop)) {
					if (encodedString.length > 0) encodedString += '&';
					encodedString += encodeURI(prop + '=' + object[prop]);
				}
			}
			return encodedString;
		}

		if (typeof header === "function") {
			callback = header;
			header = "application/json";
			finaldata = JSON.stringify(data);
		} else finaldata = param(data);

		var xhr = new XMLHttpRequest();
		xhr.open('POST', encodeURI(url));
		xhr.setRequestHeader('Content-Type', header);
		xhr.send(finaldata);
		xhr.onload = function () {
			if (xhr.status === 200 && xhr.responseText !== undefined) callback(null, xhr.responseText);
			else if (xhr.status !== 200) callback('Request failed.  Returned status of ' + xhr.status);
		};
	};
	var sb = new Spellbook();
}
