'use client';
import React, { useState } from 'react';
import { CentralDisplay, SidebarComponent, Title } from "./components";
import { RadioStation } from "./types";

export default function Home() {
  const [favoriteStations, setFavoriteStations] = useState<RadioStation[]>([]);

  const addFavorite = (station: RadioStation) => {
    setFavoriteStations((prevFavorites) => {
      if (prevFavorites.find(fav => fav.name === station.name)) {
        return prevFavorites;
      }
      return [...prevFavorites, station];
    });
  };

  const removeFavorite = (station: RadioStation) => {
    setFavoriteStations((prevFavorites) =>
      prevFavorites.filter(fav => fav.name !== station.name)
    );
  };

  return (
    <div className="h-screen flex">
      <div className="flex-1 flex">
        <SidebarComponent addFavorite={addFavorite} favoriteStations={favoriteStations} />
      </div>
      <div className="flex w-full p-10 flex-col gap-4">
        <Title name={"Radio Browser"} />
        <CentralDisplay favoriteStations={favoriteStations} removeFavorite={removeFavorite} />
      </div>
    </div>
  );
}
