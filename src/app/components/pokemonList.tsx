// src/components/PokemonList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemonList } from '../store/pokemonSlice';
import { RootState, AppDispatch } from '../store';
import PokemonCard from './pokemonCard';
import Input from './input';
import Sidebar from './combactPokeList';
import Loading from './loading';
import EmptyState from './emptyState';

const PokemonList: React.FC = () => {
  const { pokemonList, loading, error } = useSelector((state: RootState) => state.pokemon);
  const [filteredPokemonList, setFilteredPokemonList] = useState(pokemonList);

  useEffect(() => {
    setFilteredPokemonList(pokemonList);
  }, [pokemonList]);
  
  if (loading) return <Loading></Loading>;
  if (error) return <p>Error: {error}</p>;

  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredPokemonList(pokemonList);
    } else {
      const filteredList = pokemonList.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
          pokemon.number.toString().includes(query)
      );
      setFilteredPokemonList(filteredList);
    }
};

  return (
    <div className="flex-1 p-4 flex flex-col items-center justify-center">
      <Input onSearch={handleSearch}/>
      {filteredPokemonList.length === 0 ? (
          <EmptyState text="No encontramos a ese pokemon"/>
        ) : (
          <ul className="max-w-[792px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemonList.map((pokemon: any) => (
              <li key={pokemon.name}>
                <PokemonCard name={pokemon.name} image={pokemon.image} />
                <h5 className="text-l text-center mt-2">{pokemon.name}</h5>
              </li>
            ))}
          </ul>
        )}
      
    </div>
  );
};

export default PokemonList;
