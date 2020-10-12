import React from 'react';
import { FiUser } from 'react-icons/fi';
import { Container, Dropdown } from './styles';


const Header: React.FC = () => {
    return (
        <Container>

            <div>
                <img src="https://site.getnet.com.br/wp-content/uploads/2018/04/btn_logotipo.png" alt="logo" />
            </div>

            <Dropdown>
                <button>
                    <FiUser size={20} />
                </button>
                <div>

                </div>
            </Dropdown>

        </Container>
    )
}

export default Header;