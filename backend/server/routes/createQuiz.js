/* eslint-disable max-len */
const express = require('express');

const createQuiz = express.Router(); // CHANGE 'TEMPLATE' TO THE NAME OF YOUR ROUTE
const db = require('../../database/db.js');

createQuiz.route('/').get((req, res) => { // CHANGE GET TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
  console.log('working!');

  res.send('hello world');
//   db.query('QUERY', [], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
//     if (err) throw err;
//     // TODO: res.send();
//   });
});

createQuiz.route('/').post((req, res) => { // CHANGE POST TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
//   console.log(req.body);
  const {
    title, category, difficulty, source, dateCreated, numSubmissions,
  } = req.body;

  db.query(
    'INSERT INTO quizzes (id, category, difficulty, title, source, dateCreated, numSubmissions) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id;',
    [category, difficulty, title, source, dateCreated, numSubmissions],
  ).then((data) => { console.log(data.rows[0].id); res.status(201).send((data.rows[0].id).toString()); })
    .catch((err) => { console.log(err); });
});

module.exports = createQuiz; // CHANGE 'TEMPLATE' TO YOUR ROUTE
