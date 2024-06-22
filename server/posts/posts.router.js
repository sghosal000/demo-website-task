const express = require('express');
const axios = require('axios')
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const fetchPromises = posts.map(async (post) => {
    // TODO use this route to fetch photos for each post
    // using map to add the image urls for better promise handling. 
    const { data: photos } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    return {
      ...post,
      images: [
        { url: photos[0].url },
        { url: photos[1].url },
        { url: photos[2].url },
      ],
    }
  });

  postsWithImages = await Promise.all(fetchPromises)

  res.json(postsWithImages);
});

module.exports = router;
