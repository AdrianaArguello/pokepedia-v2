// src/store/pokemonSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/';

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

interface PokemonState {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  list: { name: string; image: string }[];
}

const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
  error: null,
  list: []
};

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async () => {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=151`);
    const pokemonList = await Promise.all(
      response.data.results.map(async (pokemon: any) => {
        const pokemonData = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          image: pokemonData.data.sprites.front_default,
          number: pokemonData.data.id,
          height: pokemonData.data.height / 10,
          types: pokemonData.data.types.map((type: { type: { name: string } }) => type.type.name),
          base_stats: {
            attack: pokemonData.data.stats[1].base_stat,
            defense: pokemonData.data.stats[2].base_stat,
            special_attack: pokemonData.data.stats[3].base_stat,
            special_defense: pokemonData.data.stats[4].base_stat,
            speed: pokemonData.data.stats[5].base_stat,
          },
        };
      })
    );
    return pokemonList;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<{ name: string; image: string }>) => {
      state.list.push(action.payload);
    },
    removePokemon: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((pokemon) => pokemon.name !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokémon';
      });
  },
});

export const { addPokemon, removePokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;