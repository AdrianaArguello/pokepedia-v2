'use client';

import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/app/store';
import Loading from '@/app/components/loading';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { addPokemon, removePokemon } from '@/app/store/pokemonSlice';
import Link from 'next/link';

interface Pokemon {
  name: string;
  image: string;
  number: number;
  height: number;
  types: string[];
  base_stats: {
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
}

export default function PokemonDetailPage() {
  const params = useParams();
  const name = params?.name as string;
  const pokemonList = useSelector((state: RootState) => state.pokemon.pokemonList);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const combactList = useSelector((state: RootState) => state.pokemon.list);


  const handleAddRemovePokemon = (pokemon: { name: string; image: string }) => {
      const exists = combactList.some((p) => p.name === pokemon.name);
      console.log('exists', exists)
  
      if (exists) {
          dispatch(removePokemon(pokemon.name));
      } else {
        if (combactList.length < 6) {
          dispatch(addPokemon(pokemon));
        } else {
          alert('No puedes agregar más de 6 Pokémon.');
        }
      }
  };

  useEffect(() => {
    if (pokemonList.length > 0) {
      const foundPokemon: any = pokemonList.find((p: any) => p.name === name);
      setPokemon(foundPokemon);
      setLoading(false);
    }
  }, [pokemonList, name]);


  if (loading) {
    return <Loading></Loading>;
  }

  if (!pokemon) {
    return <p>Pokémon no encontrado</p>;
  }

  return (
    <div className="max-w-[792px] flex-1 p-4 flex flex-col items-center justify-center">
      <div className="w-[100%] flex justify-between">
        <Link href='/' className="flex">
          <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
          Volver
        </Link>

        <button onClick={() => handleAddRemovePokemon(pokemon)}>
          {combactList.some((p) => p.name === name) ? (
            'Remover de la lista'
          ) : (
            'Agregar a la lista'
          )}
        </button>
      </div>


      <img src={pokemon.image} alt={pokemon.name} className="w-60 h-60" />
      
      <h1 className="text-3xl font-bold">{pokemon.name}</h1>
      <p>Número: {pokemon.number}</p>
      <p>Altura: {pokemon.height} m</p>
      <p>Tipo: {pokemon.types.join(', ')}</p>
      <div className="mt-4">
        <h2 className="text-1xl font-semibold">Estadísticas Base</h2>
        <ul className="list-disc ml-5">
          <li>Ataque: {pokemon.base_stats.attack}</li>
          <li>Defensa: {pokemon.base_stats.defense}</li>
          <li>Ataque Especial: {pokemon.base_stats.special_attack}</li>
          <li>Defensa Especial: {pokemon.base_stats.special_defense}</li>
          <li>Velocidad: {pokemon.base_stats.speed}</li>
        </ul>
      </div>
    </div>
  );
};
