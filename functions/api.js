const express = require('express');
const serverless = require('serverless-http');
const { firebaseApp } = require('../firebaseconfig');
const { getFirestore, doc, getDoc } = require('firebase/firestore');
const crypto = require('crypto');

const db = getFirestore(firebaseApp);

const app = express();
const router = express.Router();

function hashApiKey(apiKey) {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(403).send('Forbidden: No API Key provided');
  }

  const hashedApiKey = hashApiKey(apiKey);
  const apiKeyRef = doc(db, 'apiKeys', hashedApiKey);
  const apiKeyDoc = await getDoc(apiKeyRef);

  if (apiKeyDoc.exists()) {
    next();
  } else {
    res.status(403).send('Forbidden: Invalid API Key');
  }
};

router.use(apiKeyMiddleware);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/api/v1', (req, res) => {
  res.send('API v1');
});

router.get('/api/v1/player', (req, res) => {
  res.send('API v1 Player');
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);