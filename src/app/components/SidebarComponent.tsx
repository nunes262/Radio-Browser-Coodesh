'use client';
import { Heart, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RadioStation } from "../types";

interface SidebarComponentProps {
  addFavorite: (station: RadioStation) => void;
  favoriteStations: RadioStation[];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const SidebarComponent: React.FC<SidebarComponentProps> = ({ addFavorite, favoriteStations, isSidebarOpen, toggleSidebar }) => {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://de1.api.radio-browser.info/json/stations/search?limit=100')
      .then(response => response.json())
      .then(data => {
        setStations(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar estações de rádio:', error);
        setLoading(false);
      });
  }, []);

  const filteredStations = stations.filter(station => 
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFavorite = (station: RadioStation) => {
    return favoriteStations.some(fav => fav.name === station.name);
  };

  return (
    <aside className={`fixed md:static inset-0 p-4 flex flex-col transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-50 md:z-auto`}>
      <div className="bg-zinc-900 p-3 rounded-lg">
        <div className="flex items-center justify-between">
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
          <button className="md:hidden text-zinc-200" onClick={toggleSidebar}>
            <X />
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 p-3 rounded-lg overflow-auto flex-grow mt-2">
        {loading ? (
          <p className="text-zinc-200 text-sm text-center justify-self-center">Carregando...</p>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredStations.map((item, index) => (
              <div
                className="w-full h-16 p-4 flex justify-between gap-2 items-center cursor-pointer transition duration-300 ease-in-out hover:bg-zinc-800 rounded-lg border border-zinc-800"
                key={index}
              >
                <div className="flex items-center gap-4">
                  <img src={item.favicon} alt={item.name} width={32} height={32} />
                  <p className="flex items-center gap-2 text-xs font-semibold text-zinc-600 max-w-[150px] truncate">
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
        )}
      </div>
    </aside>
  );
};
