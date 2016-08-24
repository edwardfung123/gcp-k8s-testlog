// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var winston = require('winston');
var expressWinston = require('express-winston');

var colorize = process.env.NODE_ENV !== 'production';
var stringify = process.env.NODE_ENV === 'production';

var consoleTransport = new winston.transports.Console({
  json: true,
  stringify: stringify,
  colorize: colorize,
  level: 'debug',
});

var winstonInstance = new winston.Logger({
  transports: [
    consoleTransport,
  ],
});

winstonInstance.rewriters.push(function(level, msg, meta){
  if (meta.severity === null || meta.severity === undefined){
    meta.severity = level.toUpperCase();
  }
  return meta;
});


// Logger to capture all requests and output them to the console.
// [START requests]
var requestLogger = expressWinston.logger({
  winstonInstance: winstonInstance,
});
// [END requests]

// Logger to capture any top-level errors and output json diagnostic info.
// [START errors]
var errorLogger = expressWinston.errorLogger({
  winstonInstance: winstonInstance,
});
// [END errors]

module.exports = {
  requestLogger: requestLogger,
  errorLogger: errorLogger,
  error: winstonInstance.error,
  warn: winstonInstance.warn,
  info: winstonInstance.info,
  log: winstonInstance.log,
  verbose: winstonInstance.verbose,
  debug: winstonInstance.debug,
  silly: winstonInstance.silly
};
