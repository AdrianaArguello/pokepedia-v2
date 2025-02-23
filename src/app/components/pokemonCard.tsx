import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon, removePokemon } from "../store/pokemonSlice";
import Link from "next/link";
import { RootState } from "../store";


interface PokemonCardProps {
    name: string;
    image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image }) => {
    const dispatch = useDispatch();
    const pokemonList = useSelector((state: RootState) => state.pokemon.list);


    const handleAddRemovePokemon = (pokemon: { name: string; image: string }) => {
        const exists = pokemonList.some((p) => p.name === pokemon.name);
    
        if (exists) {
            dispatch(removePokemon(pokemon.name));
        } else {
            if (pokemonList.length < 6) {
                dispatch(addPokemon(pokemon));
            } else {
                alert('No puedes agregar más de 6 Pokémon.');
            }
        }
    };

    return (
        <div className="pokemon-card border border-slate-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer max-w-[150px]">
            <Link href={`/detail/${name}`} prefetch={false}>
                <img src={image} alt={name} className="w-24 h-24 mx-auto" />
            </Link>
            <div className="absolute top-0 right-0 mt-2 mr-2">
                <button
                    onClick={() => handleAddRemovePokemon({name, image})}
                    className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
                    >
                    {pokemonList.some((p) => p.name === name) ? (
                        <TrashIcon className="w-4 h-4" />
                        ) : (
                        <PlusIcon className="w-4 h-4" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default PokemonCard;