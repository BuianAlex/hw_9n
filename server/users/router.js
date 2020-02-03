const router = require('express').Router()
const service = require('./service')
const passport = require('passport')
const formidable = require('formidable')
const fs = require('fs')
const stream = require('stream')
const path = require('path')
const csv = require('csv-parser')
const checkPermissios = require('../middleWare/permissionsMiddleware')
const HttpError = require('../middleWare/errorMiddleware')
const validate = require('../middleWare/validateMiddleware')
const validator = require('./validator')
const normalise = require('./normaliseUserData')

router.post(
  '/login',
  validate(validator.login),
  passport.authenticate('local', { failWithError: true }),
  (req, res, next) => {
    if (req.user) {
      res.status(200).send({ result: normalise(req.user) })
    }
  },
  (err, req, res, next) => {
    if (err.status == 401) {
      err.message = `Sorry, the member name and password
    you entered do not match. Please try again`
    }
    next(new HttpError(err.message, err.status))
  }
)

router.get('/logout', function(req, res) {
  req.logout()
  res.send({ result: 'Bye' })
})

router.get('/get', checkPermissios.onlyAuthenficated, (req, res, next) => {
  const limit = req.query.limit
  const page = req.query.page

  service
    .get(limit, page)
    .then(data => res.send({ result: data }))
    .catch(next)
})

router.get(
  '/get-one/:id',
  checkPermissios.onlyAuthenficated,
  (req, res, next) => {
    if (/^[0-9]+$/g.test(req.params.id)) {
      service
        .getOne(req.params.id)
        .then(data => {
          if (data) {
            res.send({ result: data })
          } else {
            next(new HttpError('', 404))
          }
        })
        .catch(next)
    } else {
      next(new HttpError('', 404))
    }
  }
)

router.post(
  '/create',
  checkPermissios.userCreate,
  validate(validator.create),
  (req, res, next) => {
    service
      .create(req.body)
      .then(data => {
        res.status(200).send({ result: true })
      })
      .catch(err => {
        if (err.code === 11000) {
          next(new HttpError('', 409))
        } else {
          next(err)
        }
      })
  }
)

router.put(
  '/update/:id',
  checkPermissios.onlyAdmin,
  validate(validator.edit),
  (req, res, next) => {
    if (/^[0-9]+$/g.test(req.params.id)) {
      service
        .update(req.params.id, req.body)
        .then(data => {
          if (data) {
            res.send({ result: true })
          } else {
            next(new HttpError('', 404))
          }
        })
        .catch(next)
    } else {
      next(new HttpError('', 404))
    }
  }
)

router.post(
  '/delete',
  checkPermissios.onlyAdmin,
  validate(validator.deleteMany),
  (req, res, next) => {
    service
      .deleteMany(req.body)
      .then(data => {
        res.send({ result: true })
      })
      .catch(err => {
        next
      })
  }
)
router.post('/csv', checkPermissios.onlyAdmin, (req, res, next) => {
  const form = new formidable.IncomingForm()

  form.parse(req, (err, fields, file) => {
    if (file.csvFile.size === 0) {
      next(new HttpError('', 400))
    } else if (file.csvFile.type !== 'text/csv') {
      next(new HttpError('Not accessible file type', 400))
    } else {
      const source = fs.createReadStream(file.csvFile.path)
      const results = []
      source
        .pipe(csv('loginName', 'password', 'email', 'phone', 'photo'))
        .on('data', data => results.push(data))
        .on('end', async () => {
          if (results.length) {
            service
              .addFromCsv(results)
              .then(data => {
                res.send({ result: data })
              })
              .catch(err => {
                next(err)
              })
          } else {
            next(new HttpError('', 406))
          }
        })
    }
  })
})

module.exports = router
