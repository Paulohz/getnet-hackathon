import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center; 

    flex-direction: column;
`;

export const ContainerProducts = styled.div`

    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 50px;
    
    gap: 80px;


`;

export const Content = styled.div`

display: flex;
flex-direction: row;
border: 1px solid #000;
border-radius: 10px;
padding: 10px;
background: #fff;

img {
   max-width: 300px; 
}

`