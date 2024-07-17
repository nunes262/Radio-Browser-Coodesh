'use client';
import { Heart, Play, Search, Trash2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { RadioStation } from "../types";

interface CentralDisplayProps {
  favoriteStations: RadioStation[];
  removeFavorite: (station: RadioStation) => void;
}

export const CentralDisplay: React.FC<CentralDisplayProps> = ({ favoriteStations, removeFavorite }) => {
  const [currentStationIndex, setCurrentStationIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredStations = favoriteStations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (audioRef.current && currentStationIndex !== null && favoriteStations[currentStationIndex]) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentStationIndex, favoriteStations]);

  return (
    <div className="w-full h-full flex items-center justify-start flex-col bg-zinc-900 rounded-lg overflow-auto">
      <div className="w-full flex items-center justify-between p-4">
        <p>FAVORITE RADIOS</p>
        <div className="flex items-center gap-2 text-base font-semibold bg-zinc-800 p-3 rounded-lg text-zinc-200 cursor-pointer">
          <Search />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent text-zinc-200 w-full focus:outline-none" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {currentStationIndex !== null && favoriteStations[currentStationIndex] && (
        <div className="w-full flex justify-center items-center p-4 space-x-4 bg-zinc-800 rounded-lg">
          <p className="text-zinc-200 text-lg">{favoriteStations[currentStationIndex].name}</p>
          <audio controls autoPlay className="flex-1" ref={audioRef}>
            <source src={favoriteStations[currentStationIndex].url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <div className="flex flex-col gap-2 w-full p-4">
        {filteredStations.map((station, index) => (
          <div key={index} className="border border-zinc-700 w-full flex justify-between items-center p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-3 bg-zinc-800 cursor-pointer">
                <Play onClick={() => setCurrentStationIndex(favoriteStations.indexOf(station))} />
              </div>
              <img src={station.favicon} alt={station.name} width={32} height={32} />
              <div className="flex flex-col gap-2">
                <b>{station.name}</b>
                <p>{station.country}, {station.countrycode}</p>
              </div>
            </div>
            <Trash2 className="cursor-pointer hover:text-red-500" onClick={() => removeFavorite(station)} />
          </div>
        ))}
      </div>
    </div>
  );
};
