# publicdata-lunar-solar
공공데이터포털 - (천문우주정보)음력일정보, 양력일정보, 특정음력일정보, 율리우스적일정보를 조회

```
npm install @publicdata/lunar-solar
```

API KEY
이 키는 사용 횟수에 제한이 있습니다. 다른 사용자들을 위하여, 평가 및 테스트 용도로 만 사용해주세요.
운영 용도로 사용하실때는 아래 링크에서 발급 받으시기 바랍니다.
키를 입력하지 않으면, 내부의 평가용 키가 사용됩니다.
This key has a limit on the number of uses. For other users, please use it only for evaluation and testing purposes.
When you use it for operational purposes, please issue it at the link below.
If you do not enter a key, the internal evaluation key is used.
https://www.data.go.kr/data/15012679/openapi.do

```
const calendar = require('@publicdata/lunar-solar');
// API KEY
const apiKey = 'FrfJ9dHacz+F1C/eZu2y6H3/IkpYoXks9WESSb89+tGAKHSCoEPkVjMMbYpaklLevH92hAsOX/0RjxXiU8BTiw==';
let bOk = false;
```

# 1. solar to lunar
```
bOk = calendar.toLunar('2021', '06', '20', function(json){
    if (bOk) {
        console.log(json);
    }
}, apiKey);
```

console.log
```
toLunar(2021, 06, 20)
{
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
}
```

# 2. lunar to solar
```
bOk = calendar.toSolar('2021', '06', '20', function(json){
    if (bOk) {
        console.log(json);
    }
}, apiKey);
```

console.log
```
toSolar(2021, 06, 20)
{
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
}
```

# 3. specified lunar date.
```
bOk = calendar.toSolars('2020', '2022', '06', '20', '평', function(json){
    if (bOk) {
        console.log(json);
    }
}, apiKey);
```

console.log
```
toSolars(2020, 2022, 06, 20, 평)
{
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
}
```

# 4. julius date.
```
bOk = calendar.toJulius('2229156', function(json){
    if (bOk) {
        console.log(json);
    }
}, apiKey);
```

console.log
```
toJulius(2229156)
{
  item: {
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
  }
}
```
