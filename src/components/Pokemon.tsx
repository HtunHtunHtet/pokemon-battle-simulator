import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PokemonProps {
    name: string;
    sprites: {
        front_default: string;
    };
    moveName: string;
}

interface MoveDetails {
    name: string;
    accuracy: number;
    power: number;
    pp: number;
}

const Pokemon: React.FC<PokemonProps> = ({ name, sprites, moveName }) => {
    const [moveDetails, setMoveDetails] = useState<MoveDetails | null>(null);

    useEffect(() => {
        const fetchMoveDetails = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
            const data = await response.json();
            setMoveDetails(data);
        };

        fetchMoveDetails();
    }, [moveName]);

    return (
        <div className="row no-gutters">
            <div className="col-md-6 text-end">
                <img src={sprites.front_default} alt={name} className="img-fluid"
                     style={{width: '100%', height: 'auto'}}/>
            </div>

            <div className="col-md-6 text-start">
                <div className='pt-5'>
                    <h2>{name}</h2>
                    {moveDetails && (
                        <div>
                            <span className="badge bg-primary">{moveName} : {moveDetails.power}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pokemon;