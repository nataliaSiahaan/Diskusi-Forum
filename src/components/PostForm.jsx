import { useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { FaCamera } from "react-icons/fa";
import LoginForm from './LoginForm';

function PostForm({ addPost }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const categories = [
    'Freelance',
    'CopyWriting',
    'DigitalMarketing',
    'Medsos Affiliate',
    'Content Creator',
  ];

  // Fungsi untuk membuka form postingan atau form login
  const toggleFormVisibility = () => {
    if (isLoggedIn) {
      setIsFormVisible(!isFormVisible);
    } else {
      setShowLoginForm(true); // Menampilkan form login
    }
  };

  // Fungsi submit form postingan
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || body.trim() === '' || selectedCategory === '') {
      setError('Judul, isi, dan kategori tidak boleh kosong!');
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      body,
      category: selectedCategory,
      comments: [],
      image: imagePreview,
    };

    addPost(newPost);

    setTitle('');
    setBody('');
    setSelectedCategory('');
    setImagePreview(null);
    setError('');
    setIsFormVisible(false);
  };

  // Fungsi untuk handle upload gambar
  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="post-form-container">
      {/* Tombol untuk membuka form postingan */}
      <button
        className="text-2xl font-semibold text-[#c22e2e] mb-6 flex items-center"
        onClick={toggleFormVisibility}
      >
        <HiPencilSquare className="text-[#c22e2e] mr-2" />
        Buat Postingan Baru
      </button>

      {/* Jika belum login, tampilkan form login */}
      {showLoginForm && (
        <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          setShowLoginForm={setShowLoginForm}
          setLoggedInUser={setLoggedInUser}
        />
      )}

      {/* Jika sudah login dan isFormVisible true, tampilkan form postingan */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-[#c22e2e]">{error}</p>}
          
          {/* Input untuk kategori */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Pilih Kategori
            </label>
            <select
              id="category"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Pilih kategori...</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Input untuk judul */}
          <div>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-[#c22e2e] focus:outline-none"
              placeholder="Judul Postingan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-[#c22e2e] focus:outline-none"
              placeholder="Isi Postingan"
              rows="4"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="file-upload" className="flex items-center space-x-2 cursor-pointer text-[#c22e2e]">
              <FaCamera />
              <span>Upload Gambar</span>
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 max-h-64" />}
          </div>

          <button
            type="submit"
            className="w-full bg-[#fd8585] text-white font-semibold py-2 rounded-lg hover:bg-[#ee6767] transition duration-300"
          >
            Posting
          </button>
        </form>
      )}
    </div>
  );
}

export default PostForm;
