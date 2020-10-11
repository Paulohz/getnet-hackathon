import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    height: 100vh;
    flex-direction: row;
    
`;

export const Content = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;   
    border: 1px solid #000;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    width: 450px;
    padding: 50px;
  
    

  button {
      margin: 20px 0
  }
`;