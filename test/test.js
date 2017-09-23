var chai = require('chai');
var expect = chai.expect;
var path = require('path');

var EventBus = require(path.join(__dirname, '..', 'src/ivBus'));
EventBus = new EventBus.default();

describe('IV Bus', function() {
	var bus;
	var obj1;
	var obj2;
	var channel = "iv";

	before(function() {
		bus = EventBus;
		obj1 = { id: 'one', cb: function(msg) {} }
		obj2 = { id: 'two', cb: function(msg) {} }

		bus.subscribe(channel, obj1, obj1.cb);
		bus.subscribe(channel, obj2, obj2.cb);
		bus.subscribe(channel, obj2, obj2.cb);
	});

	describe('Adding to Bus', function() {
		it('should return 1 listener', function() {
			var ret = bus.getSubscribers('iv');
			var count = 0;

			for (var i = 0; i < ret.length; i++) {
				if (ret[i].listener === obj1) {
					count++;
				}
			}

			expect(count).to.equal(1);
		});

		it('should return 2 listeners', function() {
			var ret = bus.getSubscribers('iv');
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
		it('should return 0 listeners when channel does not exist', function() {
			var ret = bus.getSubscribers('iv1');
			expect(ret).to.be.a('null');

			bus.unsubscribe('iv1', obj1);

			ret = bus.getSubscribers('iv1');
			expect(ret).to.be.a('null');
		});

		it('should return 0 listeners when unsubscribing all listeners', function() {
			var ret = bus.getSubscribers('iv');
			var count = 0;
			expect(ret).to.have.length(3);

			bus.unsubscribe('iv', obj1);

			ret = bus.getSubscribers('iv');
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

			bus.subscribe('test1', listener, listener.cb);
			bus.dispatch('test1', goodMsg);
			bus.unsubscribe('test1', listener);
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

			bus.subscribe('test2', listener, listener.cb);
			bus.dispatch('test2', badMsg);
			bus.unsubscribe('test2', listener);
		});

		it('should dispatch to bus with primitive data', function(done) {
			var listener = {
				id: 'listener',
				cb: function(msg) {
					expect(msg).to.equal(0);
					done();
				}
			};

			bus.subscribe('test3', listener, listener.cb);
			bus.dispatch('test3', 0);
			bus.unsubscribe('test3', listener);
		});

		it('should dispatch to bus with array data', function(done) {
			var listener = {
				id: 'listener',
				cb: function(msg) {
					expect(msg).to.equal('test');
					done();
				}
			};

			bus.subscribe('test3', listener, listener.cb);
			bus.dispatch('test3', ['test']);
			bus.unsubscribe('test3', listener);
		});

		it('should dispatch to bus with no listeners', function(done) {
			bus.dispatch('blank');
			done();
		});
	})
});
