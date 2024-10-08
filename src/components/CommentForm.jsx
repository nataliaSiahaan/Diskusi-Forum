import React, { useState } from 'react';

function CommentForm({ postId, addComment }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      addComment(postId, comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mt-2">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-[#DA8359] focus:outline-none"
        placeholder="Tambahkan komentar"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[#ff7272] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#c95757] transition duration-300"
      >
        Kirim
      </button>
    </form>
  );
}

export default CommentForm;
