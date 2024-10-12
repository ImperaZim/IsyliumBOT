//const express = require('express')
//export * from 'express'
import express from 'express'
const app = express()

export function startExpress() {
  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.listen(19134)
}