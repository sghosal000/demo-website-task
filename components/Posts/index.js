import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const { isSmallerDevice } = useWindowWidth();

  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0)
  const [limit] = useState(isSmallerDevice ? 5 : 10)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);

      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start, limit },
      });
      setPosts(old => [...old, ...posts]);
      if (posts.length < limit) {
        setHasMore(false)
        setMessage('No more posts available.. ')
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setTimeout(() => {
        setMessage('')
      }, 5000);
    };

    fetchPost();
  }, [isSmallerDevice, start]);

  const handleClick = () => {
    setStart(prev => prev + limit)
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
          hasMore &&
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        }
        {
          message && <p>{message}</p>
        }
      </div>
    </Container>
  );
}
