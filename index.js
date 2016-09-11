const request = require('request');

var Logs = {};

/**
 * .pipes() a file to logs.tf
 * @param {OBJECT} data
 * @param {FUNCTION} callback
 */
Logs.uploadLogFile = function (data, callback) {
  if (!data || typeof data === 'function' || !data.apiKey || !data.logLocation) {
    return callback(new Error('Invalid input'), false);
  }

  var url = ``;
  var form = {
    title: data.title,
    map: data.map || undefined,
    key: data.apiKey,
    uploader: 'NodeJS Log Uploader'
  };


};

/**
 * Fetches JSON log data
 * @param {OBJECT} data
 * @param {FUNCTION} callback
 */
Logs.fetchLogData = function (data, callback) {
  if (!data || !data.logId) {
    return callback(new Error('Invalid input - missing data or logId'), false);
  }

  var url = `http://logs.tf/json/${data.logId}`;

  request(url, (error, response, body) => {
    if (!isValidResponse(error, response)) {
      return callback(new Error('Invalid response from Logs.TF'), false);
    }

    body = JSON.parse(body);
    callback(false, body);
  });
};

/**
 * Checks the response of a request
 * @param {ERROR} error
 * @param {OBJECT} response
 */
function isValidResponse(error, response) {
  if (error) {
    return false;
  } else if (!response) {
    return false;
  } else if (response.statusCode != 200) {
    return false;
  }

  return true;
}

module.exports = Logs;
