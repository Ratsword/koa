'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const context = require('../../test-helpers/context')

describe('ctx.toJSON()', () => {
  it('should return a json representation', () => {
    const ctx = context()

    ctx.req.method = 'POST'
    ctx.req.url = '/items'
    ctx.req.headers['content-type'] = 'text/plain'
    ctx.status = 200
    ctx.body = '<p>Hey</p>'

    const obj = JSON.parse(JSON.stringify(ctx))
    const req = obj.request
    const res = obj.response

    assert.deepStrictEqual({
      method: 'POST',
      url: '/items',
      header: {
        'content-type': 'text/plain'
      }
    }, req)

    assert.deepStrictEqual({
      status: 200,
      message: 'OK',
      header: {
        'content-type': 'text/html; charset=utf-8',
        'content-length': 10
      }
    }, res)
  })
})
