import React from 'react';
import { FiUser } from 'react-icons/fi';
import { Container, Dropdown, DropdownList } from './styles';


const Header: React.FC = () => {
    return (
        <Container>

            <div>
                <img src="https://site.getnet.com.br/wp-content/uploads/2018/04/btn_logotipo.png" />
            </div>

            <Dropdown>
                <button>
                    <FiUser size={20} />
                </button>
                <div>
                    <a href="#">Minha Conta</a>
                    <a href="#">Meus pedido</a>
                    <a href="#">Sair</a>
                </div>
            </Dropdown>

        </Container>
    )
}

export default Header;