'use client';
import { Heart, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RadioStation } from "../types";

interface SidebarComponentProps {
  addFavorite: (station: RadioStation) => void;
  favoriteStations: RadioStation[];
}

export const SidebarComponent: React.FC<SidebarComponentProps> = ({ addFavorite, favoriteStations }) => {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('https://de1.api.radio-browser.info/json/stations/search?limit=10')
      .then(response => response.json())
      .then(data => setStations(data))
      .catch(error => console.error('Erro ao buscar estações de rádio:', error));
  }, []);

  const filteredStations = stations.filter(station => 
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFavorite = (station: RadioStation) => {
    return favoriteStations.some(fav => fav.name === station.name);
  };

  return (
    <aside className="w-96 bg-zinc-950 p-4 space-y-2">
      <div className="space-y-5 bg-zinc-900 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-base font-semibold text-zinc-200 cursor-pointer hover:text-green-500">
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

      <div className="space-y-5 bg-zinc-900 p-3 rounded-lg overflow-auto">
        <div className="flex flex-col gap-2">
          {filteredStations.map((item, index) => (
            <div
              className="w-full h-16 p-4 flex justify-between gap-2 items-center cursor-pointer transition duration-300 ease-in-out hover:bg-zinc-800 rounded-lg border border-zinc-800"
              key={index}
            >
              <div className="flex items-center gap-4">
                <img src={item.favicon} alt={item.name} width={32} height={32} />
                <p className="flex items-center gap-2 text-xs font-semibold text-zinc-600 ">
                  {item.name}
                </p>
              </div>
              <Heart 
                onClick={() => addFavorite(item)} 
                color={isFavorite(item) ? "red" : "currentColor"}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
