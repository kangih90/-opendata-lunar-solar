/*!
 * Transfer date between solar and lunar calendar using api http://data.go.kr.
 * 공공데이터포털 - (천문우주정보)음력일정보, 양력일정보, 특정음력일정보, 율리우스적일정보를 조회.
 * 
 * API KEY
 * 이 키는 사용 횟수에 제한이 있습니다. 다른 사용자들을 위하여, 평가 및 테스트 용도로 만 사용해주세요.
 * 운영 용도로 사용하실때는 아래 링크에서 발급 받으시기 바랍니다.
 * 키를 입력하지 않으면, 내부의 평가용 키가 사용됩니다.
 * This key has a limit on the number of uses. For other users, please use it only for evaluation and testing purposes.
 * When you use it for operational purposes, please issue it at the link below.
 * If you do not enter a key, the internal evaluation key is used.
 * 
 * https://www.data.go.kr/data/15012679/openapi.do
 * 
 * @author Goo Kang <kangih90@gmail.com>
 * @license MIT
 */

const request = require('request');
const parser = require('fast-xml-parser');
const he = require('he');

const calendar = {
    apiKey: 'FrfJ9dHacz+F1C/eZu2y6H3/IkpYoXks9WESSb89+tGAKHSCoEPkVjMMbYpaklLevH92hAsOX/0RjxXiU8BTiw==',
    apiUrlToLunar: 'http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/getLunCalInfo',
    apiUrlToSolar: 'http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/getSolCalInfo',
    apiUrlToSolars: 'http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/getSpcifyLunCalInfo',
    apiUrlToJulius: 'http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/getJulDayInfo',

    parserOptions : {
        attributeNamePrefix : "@_",
        attrNodeName: "attr", //default is 'false'
        textNodeName : "#text",
        ignoreAttributes : true,
        ignoreNameSpace : false,
        allowBooleanAttributes : false,
        parseNodeValue : true,
        parseAttributeValue : false,
        trimValues: true,
        cdataTagName: "__cdata", //default is 'false'
        cdataPositionChar: "\\c",
        parseTrueNumberOnly: false,
        arrayMode: false, //"strict"
        attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
        tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
        stopNodes: ["parse-me-as-string"]
    }
};

// check parameter - 
calendar.check = function(value, digit) {

    if (!digit) return false;
    if (typeof digit === 'string') digit = parseInt(digit);
    if (digit <= 0) return false;

    if (!value) return false;
    if (typeof value !== 'string') value = value.toString();

    if (value.length > digit) return value.substring(0, digit);
    else if (value.length == digit) return value;
    return value.padStart(digit, '0');
}

calendar.toLunar = function(year, month, day, callback, apiKey) {

    year = this.check(year, 4);
    month = this.check(month, 2);
    day = this.check(day, 2);

    if (!year || !month || !day) {
        console.error('Error: input parameters! required not empty.');
        return false;
    }
    if (typeof year != 'string' || typeof month != 'string' || typeof day != 'string') {
        console.error('Error: input parameters! required only string type');
        return false;
    }
    if (year.length < 4 || month.length < 2 || day.length < 2) {
        console.error('Error: input parameters! invalid string length (4,2,2)');
        return false;
    }
    if (!callback || typeof callback != 'function') {
        console.error('Error: input parameters! required callback function.');
        return false;
    }
    console.log(`toLunar(${year}, ${month}, ${day})`);

    let params = '?ServiceKey=' + encodeURIComponent(apiKey ? apiKey : this.apiKey); /*Service Key*/
    params += '&solYear=' + encodeURIComponent(year); /**/
    params += '&solMonth=' + encodeURIComponent(month); /**/
    params += '&solDay=' + encodeURIComponent(day); /**/
    
    request({
        url: this.apiUrlToLunar + params,
        method: 'GET'
    }, function(error, response, body){
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode == 200) {
                if (parser.validate(body) === true) {
                    let json = parser.parse(body, this.parserOptions);
                    if (json && json.response && json.response.body && json.response.body.items && json.response.body.items.item) {
                        // console.log(json.response.body.items.item);
                        callback(json.response.body.items.item);
                    } else if (json.OpenAPI_ServiceResponse) {
                        console.error(json.OpenAPI_ServiceResponse);
                    } else {
                        console.log('else json');
                    }
                } else {
                    console.error('Parsing error');
                }
            } else {
                console.error('StatusCode was not 200');
            }
        }
        // console.log('Status', response.statusCode);
        // console.log('Response received', body);
    });
    return true;
}

calendar.toSolar = function(year, month, day, callback, apiKey) {

    year = this.check(year, 4);
    month = this.check(month, 2);
    day = this.check(day, 2);

    if (!year || !month || !day) {
        console.error('Error: input parameters! required not empty.');
        return false;
    }
    if (typeof year != 'string' || typeof month != 'string' || typeof day != 'string') {
        console.error('Error: input parameters! required only string type');
        return false;
    }
    if (year.length < 4 || month.length < 2 || day.length < 2) {
        console.error('Error: input parameters! invalid string length (4,2,2)');
        return false;
    }
    if (!callback || typeof callback != 'function') {
        console.error('Error: input parameters! required callback function.');
        return false;
    }
    console.log(`toSolar(${year}, ${month}, ${day})`);

    let params = '?ServiceKey=' + encodeURIComponent(apiKey ? apiKey : this.apiKey); /*Service Key*/
    params += '&lunYear=' + encodeURIComponent(year); /**/
    params += '&lunMonth=' + encodeURIComponent(month); /**/
    params += '&lunDay=' + encodeURIComponent(day); /**/
    
    request({
        url: this.apiUrlToSolar + params,
        method: 'GET'
    }, function(error, response, body){
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode == 200) {
                if (parser.validate(body) === true) {
                    let json = parser.parse(body, this.parserOptions);
                    if (json && json.response && json.response.body && json.response.body.items && json.response.body.items.item) {
                        // console.log(json.response.body.items.item);
                        callback(json.response.body.items.item);
                    } else if (json.OpenAPI_ServiceResponse) {
                        console.error(json.OpenAPI_ServiceResponse);
                    } else {
                        console.log('else json');
                    }
                } else {
                    console.error('Parsing error');
                }
            } else {
                console.error('StatusCode was not 200');
            }
        }
        // console.log('Status', response.statusCode);
        // console.log('Response received', body);
    });
    return true;
}


calendar.toSolars = function(fromSolYear, toSolYear, lunMonth, lunDay, leapMonth, callback, apiKey) {

    fromSolYear = this.check(fromSolYear, 4);
    toSolYear = this.check(toSolYear, 4);
    lunMonth = this.check(lunMonth, 2);
    lunDay = this.check(lunDay, 2);

    if (!fromSolYear || !toSolYear || !lunMonth) {
        console.error('Error: input parameters! required not empty.');
        return false;
    }
    if (typeof fromSolYear != 'string' || typeof toSolYear != 'string' || typeof lunMonth != 'string' || typeof lunDay != 'string') {
        console.error('Error: input parameters! required only string type');
        return false;
    }
    if (fromSolYear.length < 4 || toSolYear.length < 4 || lunMonth.length < 2) {
        console.error('Error: input parameters! invalid string length (4,2,2)');
        return false;
    }
    if (!callback || typeof callback != 'function') {
        console.error('Error: input parameters! required callback function.');
        return false;
    }
    console.log(`toSolars(${fromSolYear}, ${toSolYear}, ${lunMonth}, ${lunDay}, ${leapMonth})`);

    leapMonth = leapMonth ? '윤' : '평';

    let params = '?ServiceKey=' + encodeURIComponent(apiKey ? apiKey : this.apiKey); /*Service Key*/
    params += '&fromSolYear=' + encodeURIComponent(fromSolYear); /**/
    params += '&toSolYear=' + encodeURIComponent(toSolYear); /**/
    params += '&lunMonth=' + encodeURIComponent(lunMonth); /**/
    params += '&lunDay=' + encodeURIComponent(lunDay); /**/
    params += '&leapMonth=' + encodeURIComponent(leapMonth); /**/
    
    request({
        url: this.apiUrlToSolars + params,
        method: 'GET'
    }, function(error, response, body){
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode == 200) {
                if (parser.validate(body) === true) {
                    let json = parser.parse(body, this.parserOptions);
                    if (json && json.response && json.response.body && json.response.body.items) {
                        // console.log(json.response.body.items.item);
                        callback(json.response.body.items);
                    } else if (json.OpenAPI_ServiceResponse) {
                        console.error(json.OpenAPI_ServiceResponse);
                    } else {
                        console.log('else json');
                    }
                } else {
                    console.error('Parsing error');
                }
            } else {
                console.error('StatusCode was not 200');
            }
        }
        // console.log('Status', response.statusCode);
        // console.log('Response received', body);
    });
    return true;
}

calendar.toJulius = function(solJd, callback, apiKey) {

    if (!solJd) {
        console.error('Error: input parameters! required not empty.');
        return false;
    }
    if (typeof solJd != 'string') {
        console.error('Error: input parameters! required only string type');
        return false;
    }
    if (!callback || typeof callback != 'function') {
        console.error('Error: input parameters! required callback function.');
        return false;
    }
    console.log(`toJulius(${solJd})`);

    let params = '?ServiceKey=' + encodeURIComponent(apiKey ? apiKey : this.apiKey); /*Service Key*/
    params += '&solJd=' + encodeURIComponent(solJd); /**/
    
    request({
        url: this.apiUrlToJulius + params,
        method: 'GET'
    }, function(error, response, body){
        if (error) {
            console.error(error);
        } else {
            if (response.statusCode == 200) {
                if (parser.validate(body) === true) {
                    let json = parser.parse(body, this.parserOptions);
                    if (json && json.response && json.response.body && json.response.body.items) {
                        // console.log(json.response.body.items.item);
                        callback(json.response.body.items);
                    } else if (json.OpenAPI_ServiceResponse) {
                        console.error(json.OpenAPI_ServiceResponse);
                    } else {
                        console.log('else json');
                    }
                } else {
                    console.error('Parsing error');
                }
            } else {
                console.error('StatusCode was not 200');
            }
        }
        // console.log('Status', response.statusCode);
        // console.log('Response received', body);
    });
    return true;
}
module.exports = calendar;
