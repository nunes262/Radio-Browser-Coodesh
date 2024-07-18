'use client';
import React, { useEffect, useState } from 'react';
import { CentralDisplay, SidebarComponent, Title } from "./components";
import { RadioStation } from "./types";
import { AlignJustify } from 'lucide-react';

export default function Home() {
  const [favoriteStations, setFavoriteStations] = useState<RadioStation[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addFavorite = (station: RadioStation) => {
    setFavoriteStations((prevFavorites) => {
      if (prevFavorites.find(fav => fav.name === station.name)) {
        return prevFavorites;
      }
      return [...prevFavorites, station];
    });
    localStorage.setItem('favoriteStations', JSON.stringify(favoriteStations));
  };

  const removeFavorite = (station: RadioStation) => {
    setFavoriteStations((prevFavorites) =>
      prevFavorites.filter(fav => fav.name !== station.name)
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => { 
    const savedFavorites = localStorage.getItem('favoriteStations'); 
    if (savedFavorites) {
       setFavoriteStations(JSON.parse(savedFavorites)); 
    }
  }, []);


  return (
    <div className="h-screen flex flex-col md:flex-row">
      <button 
        className="md:hidden p-4"
        onClick={toggleSidebar}
      >
        <AlignJustify className='hover:text-green-500'/>
      </button>
      <SidebarComponent addFavorite={addFavorite} favoriteStations={favoriteStations} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex w-full p-4 flex-col gap-4 md:p-10">
        <Title name={"Radio Browser"} />
        <CentralDisplay favoriteStations={favoriteStations} removeFavorite={removeFavorite} />
      </div>
    </div>
  );
}
