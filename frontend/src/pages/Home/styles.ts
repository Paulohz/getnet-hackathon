import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 30px 0;
    flex-direction: row;
    height: 50px;


    input {
        width: 48%
    }
`;

export const Marker = styled.div`
 width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: #f00;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;

  &:after{
    content: '';
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #fff;
    position: absolute;
    border-radius: 50%;
}

  `

  export const Map = styled.div`
    display: flex;
    align-items: center; 
    height: 100vh;
    flex-direction: column;
  `