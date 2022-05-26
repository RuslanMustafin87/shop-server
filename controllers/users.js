const formidable = require('formidable');
const axios = require('axios');
const { validationResult } = require('express-validator');

const config = require('../configs/config.json');
const PORT = config.http.PORT;
const URL = config.http.URL;


