'use strict';

const express = require('express');
const Gig = require('../models/Gig');

const router = express.Router();

router.get('/', (req, res) => {
  Gig.findAll()
    .then((gigs) => {
      res.render('gigs', {
        gigs,
      });
    })
    .catch(err => console.log(err));
});

router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', (req, res) => {
  const data = {
    title: 'Wordpress Ninja',
    technologies: 'wordpress',
    budget: '1000$',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    contactEmail: 'user100@gmail.com',
  };

  // eslint-disable-next-line object-curly-newline
  const { title, technologies, budget, description, contactEmail } = data;

  Gig.create({
    title,
    technologies,
    budget,
    description,
    contactEmail,
  })
    .then(gig => res.redirect('/gigs'))
    .catch(err => console.log(err));
});

module.exports = router;
