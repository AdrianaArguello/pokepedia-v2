'use client';
import { useEffect } from 'react';
import Sidebar from './components/combactPokeList';
import Loading from './components/loading';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { fetchPokemonList } from './store/pokemonSlice';

interface ClientWrapperProps {
    children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
    const { loading } = useSelector((state: RootState) => state.pokemon);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPokemonList());
    }, [dispatch]);
      

    if (loading) return <Loading></Loading>;

    return (
        <div className="flex">
            <div className="flex-1 p-4">
                {children}
            </div>
            <Sidebar />
        </div>
    );
};

export default ClientWrapper;
