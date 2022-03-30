const express = require('express');
const userModel = require('./model/user.mongo');
const cors = require('cors');
const app = express();

const friendsRouter = require('./router/friends/friend.router');
const communityRouter = require('./router/communities/community.router');

app.use(cors())
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Oooooo Hellooo there nothing here but a lot of things inside come inside and check it out 😈');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    await userModel.findOne({ username, password }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else if (!user) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send(user);
        }
    })

})


app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Please fill all the fields');
    }
    const exists = await userModel.findOne({ username: username });

    if (exists) {
        return res.status(400).send('User already exists');
    }
    const user = {
        username: username,
        email: email,
        password: password,
        friends: [],
        friendsRequests: [],
        community: [],
    }
    await userModel.findOneAndUpdate(
        { username: username },
        user,
        { upsert: true, new: true },
    )
    return res.send('User created');

})


app.get('/users', async (req, res) => {
    await userModel.find({}, { username: 1, _id: 0 })
        .then(users => {
            return res.status(200).send(users);
        })
});




app.use('/friends', friendsRouter);
app.use('/community', communityRouter)


module.exports = app;