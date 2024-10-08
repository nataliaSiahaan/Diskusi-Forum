import { useState, useEffect } from 'react';
import Forum from './components/Forum';
import Banner from './components/Banner';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginForm from './components/LoginForm';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="pl-40">
        <Header 
          isLoggedIn={isLoggedIn} 
          loggedInUser={loggedInUser} 
          setIsLoggedIn={setIsLoggedIn} 
          setShowLogin={setShowLoginForm} 
        />
        <div className={`mx-32 my-8 ${isSidebarOpen ? 'shifted' : ''}`}>
          <Banner />
        </div>

        <div className="mx-32 my-8 p-2">
          <Forum />
        </div>

        {showLoginForm && (
          <LoginForm
            setIsLoggedIn={setIsLoggedIn}
            setShowLoginForm={setShowLoginForm}
            setLoggedInUser={setLoggedInUser}
          />
        )}
      </div>
    </>
  );
}

export default App;
