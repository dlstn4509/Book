/**
* https://medium.com/sjk5766/jwt-json-web-token-%EC%86%8C%EA%B0%9C-49e211c65b45
  1. 요청이 들어온다.
    1) req.cookies 의 존재 여부 확인
      가. !존재
        가) DB에서 origin과 api의 일치 여부 확인
          -> 일치
            => token을 발행 (jwt.sign()) - { userid, apikey, origin } 저장
            => res.cookie에 token을 저장
            => next()
          -> !일치
            => next(createError(401, '인증에 실패함'))
      나. 존재
        가) req.cookies에서 token을 확인하고
          `jwt.verify(token, salt): 내용리턴`
        나) 리턴된 내용에서 전달 받은 origin과 apikey의 일치 여부 확인
          -> 일치
            => next()
          -> !일치
            => next(createError(401, '인증에 실패함'))
*/

const jwt = require('jsonwebtoken')

const isApiUser = async (req, res, next) => {
  try {
    const domain = req.protocol + '://' + req.headers.host
    // http://127.0.0.1:3100
    const apikey = req.query.apikey
    // http://127.0.0.1:3100/book?apikey=62f45e12-ffcb-4af7-8705-af5c71db9193
    next()
  }
  catch (err) {
    
  }
}

module.exports = { isApiUser }