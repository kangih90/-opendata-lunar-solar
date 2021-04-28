var assert = require('chai').assert;
var expect = require('chai').expect;

const calendar = require('../src/index.js');
// calendar.debug = true;

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

    context('function toLunar(#1, #2, #3)', function(){

        it('2021 06 20', function(done) {
            calendar.toLunar(2021, 6, 20, function(res){
                expect(res).to.deep.equal({
                    lunDay: 11,
                    lunIljin: '기해(己亥)',
                    lunLeapmonth: '평',
                    lunMonth: 5,
                    lunNday: 30,
                    lunSecha: '신축(辛丑)',
                    lunWolgeon: '갑오(甲午)',
                    lunYear: 2021,
                    solDay: 20,
                    solJd: 2459386,
                    solLeapyear: '평',
                    solMonth: 6,
                    solWeek: '일',
                    solYear: 2021
                });
                done();
            });
        });
    });

    context('function toSolar(#1, #2, #3)', function(){

        it('2021 06 20', function(done) {
            calendar.toSolar(2021, 6, 20, function(res){
                expect(res).to.deep.equal({
                    lunDay: 20,
                    lunIljin: '무인(戊寅)',
                    lunLeapmonth: '평',
                    lunMonth: 6,
                    lunNday: 29,
                    lunSecha: '신축(辛丑)',
                    lunWolgeon: '을미(乙未)',
                    lunYear: 2021,
                    solDay: 29,
                    solJd: 2459425,
                    solLeapyear: '평',
                    solMonth: 7,
                    solWeek: '목',
                    solYear: 2021
                });
                done();
            });
        });
    });

    context('function toSolars(#1, #2, #3, #4)', function(){

        it('2021 06 20 false', function(done) {
            calendar.toSolars(2020, 2022, 6, 20, false, function(res){
                expect(res).to.deep.equal({
                    item: [
                      {
                        lunDay: 20,
                        lunIljin: '갑신(甲申)',
                        lunLeapmonth: '평',
                        lunMonth: 6,
                        lunNday: 20,
                        lunSecha: '경자(庚子)',
                        lunWolgeon: '계미(癸未)',
                        lunYear: 2020,
                        solDay: 9,
                        solJd: 2459071,
                        solLeapyear: '윤',
                        solMonth: 8,
                        solWeek: '일',
                        solYear: 2020
                      },
                      {
                        lunDay: 20,
                        lunIljin: '무인(戊寅)',
                        lunLeapmonth: '평',
                        lunMonth: 6,
                        lunNday: 20,
                        lunSecha: '신축(辛丑)',
                        lunWolgeon: '을미(乙未)',
                        lunYear: 2021,
                        solDay: 29,
                        solJd: 2459425,
                        solLeapyear: '평',
                        solMonth: 7,
                        solWeek: '목',
                        solYear: 2021
                      },
                      {
                        lunDay: 20,
                        lunIljin: '임신(壬申)',
                        lunLeapmonth: '평',
                        lunMonth: 6,
                        lunNday: 20,
                        lunSecha: '임인(壬寅)',
                        lunWolgeon: '정미(丁未)',
                        lunYear: 2022,
                        solDay: 18,
                        solJd: 2459779,
                        solLeapyear: '평',
                        solMonth: 7,
                        solWeek: '월',
                        solYear: 2022
                      }
                    ]
                  });
                done();
            });
        });
    });

    context('function toJulius(#1)', function(){

        it('2229156', function(done) {
            calendar.toJulius('2229156', function(res){
                expect(res).to.deep.equal({
                    lunDay: 1,
                    lunIljin: '기축(己丑)',
                    lunLeapmonth: '평',
                    lunMonth: 1,
                    lunNday: 29,
                    lunSecha: '신미(辛未)',
                    lunWolgeon: '경인(庚寅)',
                    lunYear: 1391,
                    solDay: 5,
                    solJd: 2229156,
                    solLeapyear: '평',
                    solMonth: 2,
                    solWeek: '일',
                    solYear: 1391
                  });
                done();
            });
        });
    });

    context('function toLunarAsync(#1, #2, #3)', function(){

        it('2021 06 20', async () => {
            let res = await calendar.toLunarAsync(2021, 6, 20);
            expect(res).to.deep.equal({
                lunDay: 11,
                lunIljin: '기해(己亥)',
                lunLeapmonth: '평',
                lunMonth: '05',
                lunNday: 30,
                lunSecha: '신축(辛丑)',
                lunWolgeon: '갑오(甲午)',
                lunYear: 2021,
                solDay: 20,
                solJd: 2459386,
                solLeapyear: '평',
                solMonth: '06',
                solWeek: '일',
                solYear: 2021
                });
        });
    });

    context('function toSolarAsync(#1, #2, #3)', function(){

        it('2021 06 20', async () => {
            let res = await calendar.toSolarAsync(2021, 6, 20);
            expect(res).to.deep.equal({
                lunDay: 20,
                lunIljin: '무인(戊寅)',
                lunLeapmonth: '평',
                lunMonth: '06',
                lunNday: 29,
                lunSecha: '신축(辛丑)',
                lunWolgeon: '을미(乙未)',
                lunYear: 2021,
                solDay: 29,
                solJd: 2459425,
                solLeapyear: '평',
                solMonth: '07',
                solWeek: '목',
                solYear: 2021
            });
        });
    });

    context('function toSolarsAsync(#1, #2, #3)', function(){

        it('2021 06 20', async () => {
            let res = await calendar.toSolarsAsync(2020, 2022, 6, 20, false);
            expect(res).to.deep.equal({
                item: [
                  {
                    lunDay: 20,
                    lunIljin: '갑신(甲申)',
                    lunLeapmonth: '평',
                    lunMonth: '06',
                    lunNday: 20,
                    lunSecha: '경자(庚子)',
                    lunWolgeon: '계미(癸未)',
                    lunYear: 2020,
                    solDay: '09',
                    solJd: 2459071,
                    solLeapyear: '윤',
                    solMonth: '08',
                    solWeek: '일',
                    solYear: 2020
                  },
                  {
                    lunDay: 20,
                    lunIljin: '무인(戊寅)',
                    lunLeapmonth: '평',
                    lunMonth: '06',
                    lunNday: 20,
                    lunSecha: '신축(辛丑)',
                    lunWolgeon: '을미(乙未)',
                    lunYear: 2021,
                    solDay: 29,
                    solJd: 2459425,
                    solLeapyear: '평',
                    solMonth: '07',
                    solWeek: '목',
                    solYear: 2021
                  },
                  {
                    lunDay: 20,
                    lunIljin: '임신(壬申)',
                    lunLeapmonth: '평',
                    lunMonth: '06',
                    lunNday: 20,
                    lunSecha: '임인(壬寅)',
                    lunWolgeon: '정미(丁未)',
                    lunYear: 2022,
                    solDay: 18,
                    solJd: 2459779,
                    solLeapyear: '평',
                    solMonth: '07',
                    solWeek: '월',
                    solYear: 2022
                  }
                ]
              });
        });
    });

    context('function toJuliusAsync(#1)', function(){

        it('2229156', async () => {
            let res = await calendar.toJuliusAsync('2229156');
            expect(res).to.deep.equal({
                lunDay: '01',
                lunIljin: '기축(己丑)',
                lunLeapmonth: '평',
                lunMonth: '01',
                lunNday: 29,
                lunSecha: '신미(辛未)',
                lunWolgeon: '경인(庚寅)',
                lunYear: 1391,
                solDay: '05',
                solJd: 2229156,
                solLeapyear: '평',
                solMonth: '02',
                solWeek: '일',
                solYear: 1391
              });
        });
    });

});