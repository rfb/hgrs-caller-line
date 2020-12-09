import * as functions from 'firebase-functions';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

nunjucks.configure(path.join(__dirname, '../templates'))

export const incomingCall = functions.https.onRequest((request, response) => {
  const { params } = request;

  functions.logger.info({
    CallSid: params.CallSid,
    AccountSid: params.AccountSid,
    From: params.From,
    To: params.To,
    CallStatus: params.CallStatus,
    ApiVersion: params.ApiVersion,
    Direction: params.Direction,
    ForwardedFrom: params.ForwardedFrom,
    CallerName: params.CallerName,
    ParentCallSid: params.ParentCallSid,
    FromCity: params.FromCity,
    FromState: params.FromState,
    FromZip: params.FromZip,
    FromCountry: params.FromCountry,
    ToCity: params.ToCity,
    ToState: params.ToState,
    ToZip: params.ToZip,
    ToCountry: params.ToCountry
  });

  response.contentType('application/xml');
  response.send(nunjucks.render('incomingCall.njk'));
});

export const recordingComplete = functions.https.onRequest((_request, response) => {
  response.contentType('application/xml');
  response.send(nunjucks.render('recordingComplete.njk'));
});
