import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  text-align: center;
  background: red;
  color: white;
  font-size: 16px;

 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  img {
    width:  150px;
  }

`;

export const Dropdown = styled.div`

  margin-right: 100px;

  overflow: hidden;

  button {
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  }

  div {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;

  a{
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }
  }

  &:hover div{
    display: block;
  }
`;



export const DropdownList = styled.div`




  `;

