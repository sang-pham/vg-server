const {validationResult } = require('express-validator');
const fs = require("fs");
const NODE_ENV = process.env.NODE_ENV;

const commonError = (res, e) => {
  const errorData = {
    success: false,
    message: e.message
  }
  if (NODE_ENV === 'development') {
    errorData.stack = e.stack;
    console.log('Got error at: ', e.stack)
  }
  return res.json(errorData);
}

const unauthorizedError = (res, e) => {
  return res.status(401).json({
    success: false,
    message: e.message
  });
}

const forbiddenError = (res, e) => {
  return res.status(403).json({
    success: false,
    message: e.message
  });
}

const badRequestError = (res, e) => {
  return res.status(400).json({
    success: false,
    message: e.message
  });
}

const asyncHandle = (handle) => {
  return async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = errors.array()[0];
      return res.json({
        success: false,
        message: `${error.msg} (${error.param})`
      });
    }

    Promise.resolve().then(() => {
      return handle(req, res);
    }).then(result => {
      let success = result.success != undefined ? result.success : true
      let status = result.status || undefined
      delete result.success
      delete result.status
      return res.json({
        success,
        status,
        ...result
      });
    }).catch(e => {
      return commonError(res, e)
    })
  }
}

module.exports = {
  commonError,
  unauthorizedError,
  forbiddenError,
  badRequestError,
  asyncHandle,
}