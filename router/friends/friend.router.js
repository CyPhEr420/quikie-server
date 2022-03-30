const express = require('express');

const friendsRouter = express.Router();

const { httpGetAllFriends,
    httpGetAllFriendRequest,
    httpAcceptFriendRequest,
    httpRejectFriendRequest,
    httpSendFriendRequest } = require('./friends.controller')


friendsRouter.get('/:user', httpGetAllFriends);
friendsRouter.get('/:user/requests', httpGetAllFriendRequest);
friendsRouter.post('/:user/requests/send', httpSendFriendRequest);
friendsRouter.post('/:user/requests/accept', httpAcceptFriendRequest);
friendsRouter.post('/:user/requests/reject', httpRejectFriendRequest);

module.exports = friendsRouter;