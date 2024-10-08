import React, { useState } from 'react';
import CommentForm from './CommentForm';

function PostList({ posts, addComment, handleLike, removePost }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [expandedPostIds, setExpandedPostIds] = useState([]);

  // Daftar kategori yang tetap, meskipun tidak ada postingan di kategori tertentu
  const categories = [
    'Semua', 
    'Freelance', 
    'CopyWriting', 
    'DigitalMarketing', 
    'Medsos Affiliate', 
    'Content Creator'
  ];

  // Fungsi untuk menangani perubahan kategori
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter postingan berdasarkan kategori yang dipilih
  const filteredPosts =
    selectedCategory === 'Semua'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // Fungsi untuk toggle expand konten
  const toggleContent = (postId) => {
    setExpandedPostIds((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-[#c22e2e] mb-6">Postingan Terbaru</h2>
      
      {/* Dropdown Filter Kategori */}
      <div className="mb-4">
        <label htmlFor="category" className="mr-2 text-gray-600">Filter berdasarkan kategori:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded p-2"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Daftar Postingan */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-500">Tidak ada postingan di kategori ini.</p>
      ) : (
        filteredPosts.map((post) => {
          const isExpanded = expandedPostIds.includes(post.id);
          const previewText = post.body.slice(0, 100);

          return (
            <div
              key={post.id}
              className="border border-gray-300 rounded-lg p-4 mb-4 relative bg-white shadow-md"
            >
              <button
                onClick={() => removePost(post.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Hapus
              </button>

              <h3 className="text-2xl font-semibold mb-2 text-[#c22e2e]">{post.title}</h3>
              <p className="text-gray-500 mb-2">Kategori: {post.category}</p>
              <p className="mb-4">
                {isExpanded ? post.body : `${previewText}...`}
                {post.body.length > 100 && (
                  <button
                    onClick={() => toggleContent(post.id)}
                    className="text-blue-500 ml-2"
                  >
                    {isExpanded ? 'Baca lebih sedikit' : 'Baca selengkapnya'}
                  </button>
                )}
              </p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-auto mb-4 rounded-lg"
                />
              )}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleLike(post.id)}
                  className="text-blue-500 hover:underline"
                >
                  {post.liked ? 'Unlike' : 'Like'} ({post.likes})
                </button>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Komentar</h4>
                <CommentForm postId={post.id} addComment={addComment} />
                {post.comments.length === 0 ? (
                  <p className="text-gray-500">Belum ada komentar.</p>
                ) : (
                  post.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-lg p-2 mb-2"
                    >
                      <p>{comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default PostList;
