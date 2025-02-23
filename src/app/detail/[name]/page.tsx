'use client';

import { useParams, useRouter } from 'next/navigation';
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
  const router = useRouter();

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      router.push('/');
    }
  }, [pokemonList, router]);

  const handleAddRemovePokemon = (pokemon: { name: string; image: string }) => {
      const exists = combactList.some((p) => p.name === pokemon.name);
  
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
        <Link href='/' className="flex gap-2">
          <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
          <span className="text-1l text-slate-500 font-bold">Volver</span>
        </Link>

        <button onClick={() => handleAddRemovePokemon(pokemon)}>
          {combactList.some((p) => p.name === name) ? (
            <span className="text-1l text-red-800 font-bold">Eliminar de la lista</span>
          ) : (
            <span className="text-1l text-slate-500 font-bold">Agregar a la lista</span>
          )}
        </button>
      </div>
      
      <img src={pokemon.image} alt={pokemon.name} className="w-60 h-60" />

      <div className="flex flex-col text-center">
        <h1 className="text-3xl font-bold text-slate-500">{pokemon.name}</h1>
        <ul className="list-disc ml-5 text-slate-500">
          <li>Número: {pokemon.number}</li>
          <li>Altura: {pokemon.height} m</li>
          <li>Tipo: {pokemon.types.join(', ')}</li>
        </ul>
        <div className="mt-4">
          <h2 className="text-1xl font-semibold text-slate-500">Estadísticas Base</h2>
          <ul className="list-disc ml-5 text-slate-500">
            <li>Ataque: {pokemon.base_stats.attack}</li>
            <li>Defensa: {pokemon.base_stats.defense}</li>
            <li>Ataque Especial: {pokemon.base_stats.special_attack}</li>
            <li>Defensa Especial: {pokemon.base_stats.special_defense}</li>
            <li>Velocidad: {pokemon.base_stats.speed}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
