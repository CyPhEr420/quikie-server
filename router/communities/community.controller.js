const communityModel = require('../../model/community.mongo');
const userModel = require('../../model/user.mongo');



async function httpGetCreateCommunity(req, res) {
    const { name, description, admin } = req.body;
    const community = {
        name: name,
        description: description,
        members: [admin],
        posts: [],
        events: [],
        admin: admin,
    }
    await communityModel.findOneAndUpdate(
        { name: name },
        community,
        { upsert: true, new: true },
    )
    return res.send('Community created');

}

async function httpGetAllCommunities(req, res) {
    const communities = await communityModel.find({}, { name: 1, description: 1, admin: 1, _id: 0 });
    return res.send(communities);
}

async function httpGetCommunityFollow(req, res) {
    const { user, community } = req.params;

    await communityModel.findOneAndUpdate(
        { name: community },
        { $push: { members: user } },
        { upsert: true, new: true },
    )
    await userModel.findOneAndUpdate(
        { username: user },
        { $push: { community: community } },
        { upsert: true, new: true },
    )
    return res.send('User added to community');

}

async function httpGetCommunityUnfollow(req, res) {
    const { user, community } = req.params;
    await communityModel.findOneAndUpdate(
        { name: community },
        { $pull: { members: user } },
        { upsert: true, new: true },
    )
    await userModel.findOneAndUpdate(
        { username: user },
        { $pull: { community: community } },
        { upsert: true, new: true },
    )
    return res.send('User removed from community');

}

async function httpGetAllUserCommunities(req, res) {
    const user = req.params.user;
    const communities = await userModel.findOne({ username: user }, { community: 1, _id: 0 });
    return res.send(communities);
}

module.exports = {
    httpGetCreateCommunity,
    httpGetAllCommunities,
    httpGetCommunityFollow,
    httpGetCommunityUnfollow,
    httpGetAllUserCommunities,
}