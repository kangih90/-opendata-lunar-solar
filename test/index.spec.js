var assert = require('chai').assert;
const calendar = require('../src/index.js');

describe('index.js!', function(){

    context('function check(#1, #2)', function(){

        it('param #2 was not empty.', function(){
            assert.equal(calendar.check(1), false);
        });

        it('param #2 greater then 0.', function(){
            assert.equal(calendar.check(1, -1), false);
        });

        it('param #2 greater then 0.', function(){
            assert.equal(calendar.check(1, 0), false);
        });

        it('param #2 greater then 0.', function(){
            assert.equal(calendar.check(1, '-1'), false);
        });

        it('param #2 greater then 0.', function(){
            assert.equal(calendar.check(1, '0'), false);
        });

        it('param #1 not false', function(){
            assert.equal(calendar.check(0, '2'), false);
        });

        it('param #1 length > #2', function(){
            assert.equal(calendar.check('100', '2'), '10');
        });

        it('param #1 length == #2', function(){
            assert.equal(calendar.check(10, '2'), '10');
        });

        it('param #1 length < #2', function(){
            assert.equal(calendar.check(10, '3'), '010');
        });
    });
});