const express = require('express');
const axios = require('axios')
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const { start = 0, limit = 10 } = req.query
  const posts = await fetchPosts({ start, limit });

  const fetchPromises = posts.map(async (post) => {
    // TODO use this route to fetch photos for each post
    // using map to add the image urls for better promise handling. 
    const { data: photos } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    const { data: { name, email } } = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    return {
      ...post,
      images: [
        { url: photos[0].url },
        { url: photos[1].url },
        { url: photos[2].url },
      ],
      user: { name, email }
    }
  });

  postsWithImages = await Promise.all(fetchPromises)

  res.json(postsWithImages);
});

module.exports = router;
