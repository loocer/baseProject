const jwt = require('jsonwebtoken')
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlLCJpYXQiOjE1NjAyMjI3OTV9.D7bpyEQYfPx-bH0SFYAQwn57pzp5ICsPRG9z5n3H0GtfeLlCKntSVnA2XKF5MdDojE6izO4TDtgwMuwl1E-A3zviVCiMorklMBvkncieYWjGC6iMAAmZdsPvLFY3_FFxqyGOGZD8vyJN3iQz3t2Gzw6Lkjl9zD5TscVHLNlA5rN71et7j1VQt7xOnxR4Qh7rS1dspKobtJbHDVE-2VHxfkLYMzDQ0G9CVclrdhjGtpDIEttRjEdShGIS-2N6e-Hr5UoJ2TDVUJqGdCe0WYZ5lQ3iyRr-CxYDYPtRFQtZdHDZVU6Fn3j81pHp68Ez8abEhFLI4bBCFA1ZI0dNXLYF1A'
const fs = require('fs')
const publicKey = fs.readFileSync('./config/public.key')
jwt.verify(token, publicKey, (error, decoded) => {
  if (error) {
  	console.log(2)
    console.log(error.message)
    return
  }
  console.log(1)
  console.log(decoded)
})