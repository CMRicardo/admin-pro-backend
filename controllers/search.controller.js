import { request, response } from 'express'

export const getAll = (req = request, res = response) => {
  const { query } = req.params
  return res.json({
    ok: true,
    query
  })
}
