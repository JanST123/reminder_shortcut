const express = require('express');
const chrono = require('chrono-node');

const app = express();

app.use(express.json()) // for parsing application/json

app.get('/', function (req, res) {
  res.send('Reminder parser');
});

app.post('/', function (req, res) {
  let text = req.body.text;
  if (!text) {
    res.status(400).send('No text given');
    return;
  }

  let language = req.body.language || 'en';

  // try to extract list
  let list = undefined;
  if (text.match(/\B#([a-zA-Z0-9_-]{2,})/)) {
    list = RegExp.$1;

    text = text.replace(/\B#([a-zA-Z0-9_-]{2,})/, '');
  }

  // try to extract prio
  let prio1 = undefined;
  let prio2 = undefined;
  let prio3 = undefined;
  if (text.match(/\bp([1-3])\b/)) {
    switch (RegExp.$1) {
      case '1': prio1 = true; break;
      case '2': prio2 = true; break;
      case '3': prio3 = true; break;
    }

    text = text.replace(/\bp([1-3])\b/, '');
  }

  // try to extract time
  // try german first cause it's more special

  const localChrono = (language in chrono) ? chrono[language] : chrono;

  let date = localChrono.parseDate(text);
  if (date) {
    const parseDetails = localChrono.parse(text);
    if (parseDetails && parseDetails.length && parseDetails[0].index !== undefined) {
      text = text.substring(0, parseDetails[0].index) + text.substring(parseDetails[0].index + parseDetails[0].text.length + 1);
    }

  } 

  // remove leading/trailing whitespace which could have been there due to replacements
  text = text.trim();

  res.send({
    list,
    prio1,
    prio2,
    prio3,
    date: date ? date.toISOString() : undefined,
    text
  })
})

app.listen(3000)