import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';

import Map from '../../Components/Map'

import { Container } from './styles';
import { loadMapApi } from "../../utils/GoogleMapsUtils";
import Header from '../../Components/Header';

const Home: React.FC = () => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const googleMapScript = loadMapApi();
        googleMapScript.addEventListener('load', function () {
            setScriptLoaded(true);
        });
    }, []);

    return (
        <>
        <Header />
            <Container>
                <span><FiFilter size={20} /></span>
                <input type="text" placeholder="Digite para pesquisar" />
            </Container>

            <div className="App">
                {scriptLoaded && (
                    <Map
                        mapType={google.maps.MapTypeId.ROADMAP}
                        mapTypeControl={true}
                    />
                )}
            </div>
        </>
    )
};

export default Home;