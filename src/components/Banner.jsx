import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [randomBanner, setRandomBanner] = useState(null);

  useEffect(() => {
    // Mengambil data dari API
    fetch('https://66e3fab0d2405277ed1287b5.mockapi.io/api/dasboard/banner')
      .then((response) => response.json())
      .then((data) => {
        setBannerData(data);
        // Memilih banner secara acak
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomBanner(data[randomIndex]);
      })
      .catch((error) => console.error('Error fetching banner data:', error));
  }, []);

  if (!randomBanner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center p-4 bg-[#FFB1B1] rounded-lg shadow-md">
      <div className="w-1/3 max-h-64 overflow-hidden rounded-l-lg">
        <img
          src={randomBanner.imageside}
          alt={randomBanner.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-2/3 p-4">
        <h1 className="text-3xl font-extrabold text-[#c22e2e] tracking-wide text-center">
          {randomBanner.title}
        </h1>
        <p className="text-xl italic text-center mt-2">{randomBanner.quote}</p>
      </div>
    </div>
  );
};

export default Banner;