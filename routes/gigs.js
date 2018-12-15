'use strict';

const express = require('express');
const Gig = require('../models/Gig');

const router = express.Router();

router.get('/', (req, res) => {
  Gig.findAll()
    .then((gigs) => {
      console.log(gigs);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

module.exports = router;
