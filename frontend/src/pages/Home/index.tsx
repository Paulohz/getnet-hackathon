import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

import { FiFilter } from 'react-icons/fi';

import api from '../../services/api';


import { Container, Marker } from './styles';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';

const AnyReactComponent = ({ id }: any) => (<Link to={{
    pathname:'/displaycompany',
    state: id
}} ><Marker></Marker></Link>);

interface Marker {
    id: number;
    latitude: number;
    longitude: number;
}


const center = {
    lat: -23.5477699,
    lng: -46.6212523
};


const zoom = 12;

const Home: React.FC = () => {
    const [searchedName, setSearchedName] = useState<string>();

    const [markers, setMarkers] = useState<Marker[]>([]);


    useEffect(() => {
        api.get('/companies/indexByLikeName', {
            params: {
                name: searchedName,
                userLatitude: center.lat,
                userLongitude: center.lng,
                radius: 10
            }
        }).then(response => {
            setMarkers(response.data);
        })
    }

        , [searchedName])

    const handleChangeSearch = (value: string) => (
        setSearchedName(value)
    );

    return (
        <>
            <Header />

            <Container>
                <span><FiFilter size={20} /></span>
                <input name="search" type="text" placeholder="Digite para pesquisar" onChange={event => handleChangeSearch(event.target.value)} />
            </Container>



            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_API_KEY}` }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >


                    {markers.map(marker => (
                        <AnyReactComponent key={marker.id}
                            lat={marker.latitude}
                            lng={marker.longitude}
                            id={marker.id}
                        />
           

                    ))}

                </GoogleMapReact>
            </div >
        </>
    )
};

export default Home;