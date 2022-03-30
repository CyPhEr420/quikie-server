const express = require('express');
const { httpGetCreateCommunity,
    httpGetAllCommunities,
    httpGetCommunityFollow,
    httpGetCommunityUnfollow,
    httpGetAllUserCommunities, } = require('./community.controller')

const communityRouter = express.Router();

communityRouter.post('/create', httpGetCreateCommunity);
communityRouter.get('/', httpGetAllCommunities)
communityRouter.get('/:user', httpGetAllUserCommunities);
communityRouter.get('/:user/:community/follow', httpGetCommunityFollow);
communityRouter.get('/:user/:community/unfollow', httpGetCommunityUnfollow);

module.exports = communityRouter;