const userModel = require('../../model/user.mongo');



async function httpGetAllFriends(req, res) {
    const username = req.params.user;
    await userModel.findOne({ username: username })
        .then(user => {
            if (user) {
                return res.status(200).send(user.friends);
            } else {
                return res.status(404).send('User not found');
            }
        })

}

async function httpSendFriendRequest(req, res) {
    const { friendname } = req.body;
    const username = req.params.user;

    await userModel.findOne({ username: friendname })
        .then(user => {
            if (user.friendsRequests.includes(username)) {
                return res.status(400).send('Friend request already sent');
            } else {
                user.friendsRequests.push(username);
                user.save();
                return res.status(200).send('Friend request sent');
            }
        })
}


async function httpGetAllFriendRequest(req, res) {
    const username = req.params.user;
    await userModel.findOne({ username: username })
        .then(user => {
            if (user) {
                return res.status(200).send(user.friendsRequests);
            } else {
                return res.status(404).send('User not found');
            }
        })
}

async function httpAcceptFriendRequest(req, res) {
    const { friendname } = req.body;
    const username = req.params.user;

    await userModel.findOne({ username: username }).
        then(user => {
            if (user.friendsRequests.includes(friendname)) {
                user.friends.push(friendname);
                user.friendsRequests.splice(user.friendsRequests.indexOf(friendname), 1);
                user.save();
                userModel.findOne({ username: friendname })
                    .then(friend => {
                        friend.friends.push(username);
                        friend.save();
                    })

                return res.status(200).send('Friend request accepted');
            } else {
                return res.status(400).send('Friend request not found');
            }
        })
}

async function httpRejectFriendRequest(req, res) {
    const { friendname } = req.body;
    const username = req.params.user;

    await userModel.findOne({ username: username })
        .then(user => {
            if (user.friendsRequests.includes(friendname)) {
                user.friendsRequests.splice(user.friendsRequests.indexOf(friendname), 1);
                user.save();
                return res.status(200).send('Friend request rejected');
            } else {
                return res.status(400).send('Friend request not found');
            }
        })
}

module.exports = {
    httpGetAllFriends,
    httpGetAllFriendRequest,
    httpAcceptFriendRequest,
    httpRejectFriendRequest,
    httpSendFriendRequest
}