import { useState } from 'react';

function LoginForm({ setIsLoggedIn, setShowLoginForm, setLoggedInUser }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState(''); // State untuk nama pengguna
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Fungsi untuk menyimpan user data ke localStorage saat register
  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Cek apakah user sudah terdaftar
    const userExists = users.some(user => user.email === email);
    
    if (userExists) {
      setError('Email sudah terdaftar');
    } else {
      // Simpan user baru ke localStorage dengan nama pengguna
      const newUser = { username, email, password };
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      alert(`Akun telah dibuat untuk: ${email}`);
      setIsRegistering(false);
      setError('');  // Reset error
    }
  };

  // Fungsi untuk login dengan memeriksa localStorage
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Cek apakah email dan password sesuai dengan data di localStorage
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
      setIsLoggedIn(true);
      setShowLoginForm(false);  // Tutup form login
      setLoggedInUser(user.username);  // Simpan nama pengguna yang login
      setError('');  // Reset error jika login berhasil
    } else {
      setError('Email atau password salah');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 h-60% z-60 relative">
        <h2 className="text-2xl font-bold mb-4">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          {isRegistering && (
            <div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-[#c22e2e] focus:outline-none"
                placeholder="Nama Pengguna"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          
          <div>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-[#c22e2e] focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-[#c22e2e] focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#fd8585] text-white font-semibold py-2 rounded-lg hover:bg-[#ee6767] transition duration-300"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isRegistering ? (
            <span>
              Sudah punya akun?{' '}
              <button
                className="text-[#ee6767] hover:underline"
                onClick={() => setIsRegistering(false)}
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              Belum punya akun?{' '}
              <button
                className="text-[#ee6767] hover:underline"
                onClick={() => setIsRegistering(true)}
              >
                Register
              </button>
            </span>
          )}
        </p>

        <button
          onClick={() => setShowLoginForm(false)}
          className="mt-4 text-[#ee6767] hover:underline"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
