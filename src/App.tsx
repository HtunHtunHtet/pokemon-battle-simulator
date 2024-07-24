import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pokemon from './components/Pokemon';
import BattleButton from './components/BattleButton';
import BattleLog from './components/BattleLog';

interface Move {
  move: {
    name: string;
  };
}

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  moves: Move[];
}

function App() {
  const [pokemon1, setPokemon1] = useState<PokemonData | null>(null);
  const [pokemon2, setPokemon2] = useState<PokemonData | null>(null);
  const [battleLog, setBattleLog] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomMoveName = (moves: Move[]) => {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex].move.name;
  };

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        if (!response.ok) throw new Error('Failed to fetch Pokemon list');
        const data = await response.json();
        return data.results;
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    const fetchPokemon = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch Pokemon data');
        const data = await response.json();
        return data;
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    const getRandomPokemon = async () => {
      const pokemonList = await fetchPokemonList();
      if (!pokemonList) return;

      const randomIndices = [
        Math.floor(Math.random() * pokemonList.length),
        Math.floor(Math.random() * pokemonList.length),
      ];

      const [pokemon1Data, pokemon2Data] = await Promise.all([
        fetchPokemon(pokemonList[randomIndices[0]].url),
        fetchPokemon(pokemonList[randomIndices[1]].url),
      ]);

      setPokemon1(pokemon1Data);
      setPokemon2(pokemon2Data);
      setLoading(false);
    };

    getRandomPokemon();
  }, []);

  const startBattle = () => {
    if (pokemon1 && pokemon2) {
      const move1 = getRandomMoveName(pokemon1.moves);
      const move2 = getRandomMoveName(pokemon2.moves);

      const winner = Math.random() > 0.5 ? pokemon1 : pokemon2;
      const loser = winner === pokemon1 ? pokemon2 : pokemon1;
      const winningMove = winner === pokemon1 ? move1 : move2;

      setBattleLog(`${winner.name} lands a decisive blow with ${winningMove} knocking out ${loser.name}!`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <>
        <div className="container border mt-5">
          <div className="row justify-content-end">
            <div className="col-md-6 text-center order-md-2">
              {pokemon1 && <Pokemon name={pokemon1.name} sprites={pokemon1.sprites}
                                    moveName={getRandomMoveName(pokemon1.moves)}/>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 text-center order-md-1">
              {pokemon2 && <Pokemon name={pokemon2.name} sprites={pokemon2.sprites}
                                    moveName={getRandomMoveName(pokemon2.moves)}/>}
            </div>
          </div>
          <div className="row justify-content-center mt-3 mb-3">
            <div className="col-md-8 text-center">
              <BattleLog battleLog={battleLog}/>
            </div>
            <div className="col-md-4 text-center">
              <BattleButton startBattle={startBattle}/>
            </div>
          </div>
        </div>
      </>
  );
}

export default App;