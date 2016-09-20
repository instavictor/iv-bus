var chai = require('chai');
var expect = chai.expect;
var path = require('path');

var EventBus = require(path.join(__dirname, '..', 'src/ivEventBus'));

describe('IV Bus', function() {
	var bus;
	var obj1;
	var obj2;
	var channel = "iv";

	before(function() {
		bus = new EventBus();
		obj1 = { id: 'one', cb: function(msg) {} }
		obj2 = { id: 'two', cb: function(msg) {} }

		bus.addListener(channel, obj1, obj1.cb);
		bus.addListener(channel, obj2, obj2.cb);
		bus.addListener(channel, obj2, obj2.cb);
	});

	describe('Adding to Bus', function() {
		it('should return 1 listener', function() {
			var ret = bus.getListeners('iv');
			var count = 0;

			for (var i = 0; i < ret.length; i++) {
				if (ret[i].listener === obj1) {
					count++;
				}
			}

			expect(count).to.equal(1);
		});

		it('should return 2 listeners', function() {
			var ret = bus.getListeners('iv');
			var count = 0;

			for (var i = 0; i < ret.length; i++) {
				if (ret[i].listener === obj2) {
					count++;
				}
			}

			expect(count).to.equal(2);
		});
	});

	describe('Removing from Bus', function() {
		it('should return 0 listeners', function() {
			var ret = bus.getListeners('iv');
			var count = 0;
			expect(ret).to.have.length(3);

			bus.removeListener('iv', obj1);

			ret = bus.getListeners('iv');
			expect(ret).to.have.length(2);

			for (var i = 0; i < ret.length; i++) {
				if (ret[i].listener === obj1) {
					count++;
				}
			}

			expect(count).to.equal(0);
		});
	})

	describe('Dispatching to Bus', function() {
		let goodMsg, badMsg;

		before(function() {
			[goodMsg, badMsg] = ['hello', 'goodbye'];
		});

		it('should dispatch to bus and ack', function(done) {
			var listener = {
				id: 'listener',
				cb: function(msg) {
					expect(this.id).to.equal('listener');
					expect(msg).to.equal('hello');
					done();
				}
			};

			bus.addListener('test1', listener, listener.cb);
			bus.dispatch('test1', goodMsg);
			bus.removeListener('test1', listener);
		});

		it('should dispatch to bus and not ack', function(done) {
			let listener = {
				id: 'listener',
				cb: function(msg) {
					expect(this.id).to.equal('listener');
					expect(msg).to.not.equal('hello');
					done();
				}
			};

			bus.addListener('test2', listener, listener.cb);
			bus.dispatch('test2', badMsg);
			bus.removeListener('test2', listener);
		});
	})
});
