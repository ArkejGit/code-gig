'use strict';

const express = require('express');
const Sequelize = require('sequelize');
const Gig = require('../models/Gig');

const { Op } = Sequelize;
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
  // eslint-disable-next-line object-curly-newline, prefer-const
  let { title, technologies, budget, description, contactEmail } = req.body;

  const errors = [];

  if (!title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if (!description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!contactEmail) {
    errors.push({ text: 'Please add a contact email' });
  }

  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contactEmail,
    });
  } else {
    budget = !budget ? 'Unknown' : `${budget}$`;

    technologies = technologies.toLowerCase().replace(/, /g, ',');

    Gig.create({
      title,
      technologies,
      budget,
      description,
      contactEmail,
    })
      .then(() => res.redirect('/gigs'))
      .catch(err => console.log(err));
  }
});

router.get('/search', (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: `%${term}%` } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log(err));
});

module.exports = router;
