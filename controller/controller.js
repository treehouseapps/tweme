const users_model = require('../models/coll-users')
const news_model = require('../models/coll-news')
const meme_model = require('../models/coll-meme')
const tweet_model = require('../models/coll-tweet')
const { render } = require('ejs')
const home = async (req, res) => {
    const result = await news_model.find()
    res.render('index', { title: 'Home', result, session: req.session._id })
}
const genre = async (req, res) => {
    res.render('genre', { title: 'Genre', session: req.session._id })
}
const post = async (req, res) => {
    if (req.session._id) {
        const result = await meme_model.find().sort({ _id: -1 })
        res.render('post', { title: 'Post', result, session: req.session._id })
    }
    else {
        res.redirect('/login')
    }
}
const formatTime = (timestamp) => {
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
};
const tweet = async (req, res) => {
    if (req.session._id) {
        const result = await tweet_model.find().sort({ createdAt: -1 }).lean();

        res.render('tweet', {
            title: 'Tweet',
            result,
            session: req.session._id,
            formatTime // ✅ Pass function to EJS
        });
    } else {
        res.redirect('/login');
    }
};
const search = async (req, res) => {
    if (req.session._id) {
        const tag = req.body.search; // Get tag from form
        const cap_tag = tag.charAt(0).toUpperCase() + tag.slice(1);
        const result = await tweet_model.find({ gener: cap_tag }).sort({ createdAt: -1 });
        res.render('tweet', { title: 'Tweet', result, session: req.session._id, formatTime });
    } else {
        res.redirect('/login');
    }
};
const genre_filter = async (req, res) => {
    if (req.session._id) {
        const tag = req.params.tag; // Get tag from URL
        const result = await tweet_model.find({ gener: tag }).sort({ createdAt: -1 });
        res.render('tweet', { title: 'Tweet', result, session: req.session._id, formatTime });
    } else {
        res.redirect('/login');
    }
};
const login = async (req, res) => {
    await res.render('login', { title: 'Login', session: req.session._id })
}
const login_post = async (req, res) => {
    let uname = req.body.name
    const result = await users_model.findOne({ name: uname })
    if (result) {
        req.session._id = result._id
        if (result._name == 'tweme') {
            res.redirect('/form')
        }
        else {
            res.redirect('/genre')
        }
    }
    else {
        res.redirect('/tweet')
    }

}
const signin = async (req, res) => {
    users_model.insertMany(req.body)
    res.redirect('/login')
}
const form = async (req, res) => {
    await res.render('form', { title: 'Form', session: req.session._id })
}
const uploading_meme = async (req, res) => {
    meme_model.insertMany(req.body)
    res.redirect('/post')
}
const uploading_tweet = async (req, res) => {
    tweet_model.insertMany(req.body)
    console.log(req.body)
    res.redirect('/tweet')
}
const post_reaction = async (req, res) => {
    try {
        if (!req.session._id) {
            res.redirect('/login');
            return
        }
        const { id, type } = req.params;
        const post = await meme_model.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post 1 not found" });
        }
        if (post[type].includes(req.session._id)) {
            return
        }
        post[type].push(req.session._id)
        await post.save(); // Save to database

        res.json({ success: true, value: post[type] }); // Send back new like count
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}
const tweet_reaction = async (req, res) => {
    try {
        if (!req.session._id) {
            res.redirect('/login');
            return
        }
        const { id, type } = req.params;
        const post = await tweet_model.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        if (post[type].includes(req.session._id)) {
            return
        }
        post[type].push(req.session._id)
        await post.save(); // Save to database

        res.json({ success: true, value: post[type] }); // Send back new like count
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}
const a = async (req, res) => {
    const data = await tweet_model.find()
    console.log(data)
    res.end()
}
module.exports = { a, search, genre_filter, genre, home, post, tweet, signin, login, login_post, form, uploading_meme, uploading_tweet, post_reaction, tweet_reaction }