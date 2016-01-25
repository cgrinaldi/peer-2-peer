# Peer 2 Peer Financial Transfers
An app that allows users to send fake money to each other in real-time. Made using React, Redux, Node, MongoDB, and Socket.IO.

## Instructions
Clone onto your local machine followed by:

0. `mongod` to start up the local instance of MongoDB
1. `npm install`
2. Rename `server/config.sample.js` to `server/config.js` and input correct information (mainly the secret)
3. `node server.js` 
4. Navigate to `localhost:3000`.

## Creating Users
When you first run the app, there will be no users in the system. Simply create a 
couple of user accounts in order to see them in your `Dashboard` view. Socket.IO is used to monitor
when users are created or log on, so you can see them appear in real-time.

## Transactions
Currently, transferring money between accounts is not functioning on the client-side. However, the server end point is setup, so 
if you use something like [Postman](https://www.getpostman.com/), you can send a POST request to `http://localhost:3000/transactions/send`,
including `from`, `to`, and `amount` in the body of the request. 

Socket.IO is used to monitor when someone sends you a transfer in real-time, and you can see their balance update.

If you click on the `Transactions` tab, you can see all of the transactions that have been performed.

## Major Tasks Remaining
- [ ] Implement sending money in UI
- [ ] Implement API endpoint for requesting money
- [ ] Implement requesting money in UI
- [ ] Handle online and offline messages

## Issues
See [issues](https://github.com/cgrinaldi/peer-2-peer/issues) for additional work that needs to be done.

