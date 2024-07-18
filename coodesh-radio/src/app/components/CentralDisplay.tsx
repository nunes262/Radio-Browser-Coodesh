'use client';
import { Heart, Play, Search, Trash2, MoveRight, MoveLeft } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { RadioStation } from "../types";

interface CentralDisplayProps {
  favoriteStations: RadioStation[];
  removeFavorite: (station: RadioStation) => void;
}

export const CentralDisplay: React.FC<CentralDisplayProps> = ({ favoriteStations, removeFavorite }) => {
  const [currentStationIndex, setCurrentStationIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredStations = favoriteStations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.language?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedStations = filteredStations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (audioRef.current && currentStationIndex !== null && favoriteStations[currentStationIndex]) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentStationIndex, favoriteStations]);

  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);

  return (
    <div className="w-full h-full flex items-center justify-start flex-col bg-zinc-900 rounded-lg overflow-auto">

      {currentStationIndex !== null && favoriteStations[currentStationIndex] && (
        <div className="w-full flex justify-between items-center p-4 space-x-4 flex-col md:flex-row bg-zinc-800 rounded-lg space-y-4">
          <div className="flex items-center gap-4 flex-col md:flex-row">
            <img 
              src={favoriteStations[currentStationIndex].favicon} 
              alt={favoriteStations[currentStationIndex].name} 
              className="w-20 h-20 md:w-12 md:h-12 rounded-full" 
            />
            <p className="text-zinc-200 text-lg flex flex-col items-center text-center md:items-start">
              <b className="text-green-500">Current Radio</b>
              {favoriteStations[currentStationIndex].name}
            </p>
          </div>
          <audio controls autoPlay ref={audioRef}>
            <source src={favoriteStations[currentStationIndex].url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className="w-full flex items-center space-y-4 justify-between p-4 flex-col md:flex-row">
        <p>FAVORITE RADIOS</p>
        <div className="flex items-center gap-2 text-base font-semibold bg-zinc-800 p-3 rounded-lg text-zinc-200 cursor-pointer hover:text-green-500">
          <Search />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent text-zinc-200 w-full focus:outline-none" 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2 w-full p-4">
        {paginatedStations.map((station, index) => (
          <div key={index} className="border border-zinc-700 w-full flex justify-between items-center p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <div className={`rounded-full p-3 bg-zinc-800 cursor-pointer ${favoriteStations.indexOf(station) === currentStationIndex ? 'text-green-500' : ''}`}>
                <Play onClick={() => setCurrentStationIndex(favoriteStations.indexOf(station))} className="hover:text-green-500"/>
              </div>
              <img src={station.favicon} alt={station.name} width={32} height={32} className="hidden md:block"/>
              <div className="flex flex-col gap-2">
                <b>{station.name}</b>
                <p className="hidden md:block">{station.country}, {station.countrycode}</p>
              </div>
            </div>
            <Trash2 className="cursor-pointer hover:text-red-500" onClick={() => removeFavorite(station)} />
          </div>
        ))}
      </div>
      {filteredStations.length === 0 ? (
        <div className="w-full flex justify-center items-center p-4">
          <p className="text-zinc-200">Nenhuma estação favoritada!</p>
        </div>
      ): (
        <div className="w-full flex justify-center items-center p-4">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 m-2 bg-zinc-800 text-zinc-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MoveLeft/>
          </button>
          <p className="text-zinc-200">{currentPage} of {totalPages}</p>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 m-2 bg-zinc-800 text-zinc-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MoveRight/>
          </button>
        </div>
      )}
    </div>
  );
};
