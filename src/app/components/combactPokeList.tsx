// components/Sidebar.tsx
'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import PokemonCard from './pokemonCard';
import EmptyState from './emptyState';
import Loading from './loading';

const Sidebar: React.FC = () => {
  const addedPokemonList = useSelector((state: RootState) => state.pokemon.list);

  return (
    <div className="w-[456px] h-screen bg-white shadow-md">
      <div className="w-[456px] fixed flex flex-col items-center justify-center">
      <h1 className="text-2xl p-4 font-bold">LISTOS PARA EL COMBATE</h1>
        <div>
            {addedPokemonList.length === 0 ? (
              <EmptyState text="No hay pokemones listos para el combate."/>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                {addedPokemonList.map((pokemon: any) => (
                  <li key={pokemon.name}>
                    <PokemonCard name={pokemon.name} image={pokemon.image} />
                    <h5 className="text-l text-center mt-2">{pokemon.name}</h5>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
