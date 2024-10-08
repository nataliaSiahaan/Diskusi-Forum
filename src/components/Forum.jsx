import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      const initializedPosts = storedPosts.map(post => ({
        ...post,
        likes: post.likes || 0,
        liked: post.liked || false,
        comments: post.comments || []
      }));
      setPosts(initializedPosts);
    }
  }, []);

  const addPost = (newPost) => {
    const updatedPosts = [
      { ...newPost, likes: 0, liked: false, comments: [] },
      ...posts
    ];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.liked ? Math.max(0, post.likes - 1) : post.likes + 1, liked: !post.liked };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const addComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const removePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const filteredPosts = filterCategory
    ? posts.filter(post => post.category === filterCategory)
    : posts;

  const categories = [
    'Freelance',
    'CopyWriting',
    'DigitalMarketing',
    'Medsos Affiliate',
    'Content Creator'
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <PostForm addPost={addPost} />

      <PostList
        posts={filteredPosts}
        addComment={addComment}
        handleLike={handleLike}
        removePost={removePost}
      />
    </div>
  );
}

export default Forum;