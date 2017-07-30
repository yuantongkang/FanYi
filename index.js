const fs = require('fs')
const md5 = require('md5')
const request = require('request')
const appKey = '58d743b47ed40a03'
const secKey = 'fshcGf2VdZm4qC0JUj5O6VDeqlKCaaVB'
const salt = 3
let wordData;
fs.readFile(__dirname + '/word.txt', 'utf8',
  (err, data) => {
    console.log(__dirname)
    wordData = data.split('\r\n')

  }
)
class Fanyi {
  constructor(from) {
    this.from = from
    this.result = []
  }
  buildRequest() {
    return {
      q: this.from,
      'from': "EN",
      'to': "zh-CHS",
      appKey,
      secKey,
      salt,
      sign: md5(appKey + this.from + salt + secKey)
    }
  }
  callback(err,response,body){
     this.result.push(JSON.parse(body).web[0].value)
     return this.result
  }
  getResult() {
    let res = this.result
    let form = this.buildRequest()
    let c = request.post('http://openapi.youdao.com/api', { form },this.callback.bind(this))
    return this
  }
}
let combindResult = {};

let a = new Fanyi('apple').getResult().getZH()
console.log(a)
// setTimeout(function () {
//   let finalResult = []
//   console.log(typeof wordData)
//   wordData.forEach((item) => {
//     let temp = new Fanyi(item)
//     finalResult.push(temp.getZH());  
//   })
// }, 2000)
