import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';

interface CompanyCategory {
    id: number;
    name: string;
    products: CompanyProducts[];
}

interface CompanyProducts {
    id: number;
    name: string;
    description: string;
    photo: string;
    price: string;
}

const DisplayCompany: React.FC = () => {

    const [categories, setCategories] = useState<CompanyCategory[]>([]);
    //const [products, setProducts] = useState<CompanyCategory[]>([]);


    let location = useLocation();
    useEffect(() => {
        api.get(`products/indexByCompany/${location.state}`).then(response => {
            setCategories(response.data);

        });
    }, []);

    return (
        <>
            <h1>oi</h1>
            {categories.map(category => (
                <div key={category.id}>
                    <h2>{category.name}</h2>
                    {category.products.map(products => (
                        <div key={products.id}>
                            <h3>{products.name}</h3>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

export default DisplayCompany;