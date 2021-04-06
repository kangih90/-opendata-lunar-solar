/*!
 * Transfer date between solar and lunar calendar using api http://data.go.kr.
 * 공공데이터포털 - (천문우주정보)음력일정보, 양력일정보, 특정음력일정보, 율리우스적일정보를 조회.
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

calendar.toLunar = function(year, month, day, callback, apiKey) {

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
                        console.log(json.response.body.items.item);
                        callback(json.response.body.items.item);
                    }
                }
            }
        }
        console.log('Status', response.statusCode);
        console.log('Response received', body);
    });
    return true;
}

calendar.toSolar = function(year, month, day, callback, apiKey) {

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
                        console.log(json.response.body.items.item);
                        callback(json.response.body.items.item);
                    }
                }
            }
        }
        console.log('Status', response.statusCode);
        console.log('Response received', body);
    });
    return true;
}

module.exports = calendar;
