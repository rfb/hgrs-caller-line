import * as functions from 'firebase-functions';
import { storage, initializeApp } from 'firebase-admin';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

initializeApp()
nunjucks.configure(path.join(__dirname, '../templates'))


export const incomingCall = functions.https.onRequest(async (request, response) => {
  const { params } = request;

  functions.logger.info("params", {
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

  const greetingAudio = await storage().bucket().file('audio/welcomeAudio.mp3').getSignedUrl({
    version: 'v2',
    action: 'read',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  })

  response.contentType('application/xml');
  response.send(nunjucks.render('incomingCall.njk', { greetingAudio }));
});

export const recordingComplete = functions.https.onRequest((_request, response) => {
  response.contentType('application/xml');
  response.send(nunjucks.render('recordingComplete.njk'));
});
