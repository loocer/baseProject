const jwt = require('jsonwebtoken')
const fs = require('fs')

// 获取签发 JWT 时需要用的密钥
const privateKey = fs.readFileSync('./config/private.key')
// Token 数据
const payload = {
  name: 'wanghao',
  admin: true
}

// 密钥
const secret = 'ILOVENINGHAO'

// 签发 Token
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' })

// 输出签发的 Token
console.log(token)