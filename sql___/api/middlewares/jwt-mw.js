/**
* 1. 요청이 들어온다.
*  1) req.cookies 의 존재 여부 확인
*    가. !존재
*      가) DB에서 origin과 api의 일치 여부 확인
*        -> 일치
*          => token을 발행 (jwt.sign()) - { userid, apikey, origin } 저장
*          => res.cookie에 token을 저장
*          => next()
*        -> !일치
*          => next(createError(401, '인증에 실패함'))
*    나. 존재
*     가) req.cookies에서 token을 확인하고
*        `jwt.verify(token, salt): 내용리턴`
*     나) 리턴된 내용에서 전달 받은 origin과 apikey의 일치 여부 확인
*        -> 일치
*          => next()
*        -> !일치
*          => next(createError(401, '인증에 실패함'))
*/

const jwt = require('jsonwebtoken')

const isApiUser = async (req, res, next) => {
  try {
    
  }
  catch (err) {
    
  }
}

module.exports = { isApiUser }