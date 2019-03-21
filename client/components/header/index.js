import { Container } from 'reactstrap';
import React from 'react';
import HeaderTop from './HeaderTop';
import HeaderBottom from './HeaderBottom';
import { colorBlack, colorWhite } from '../../utils/cssVariables';
const Header = () => {
  return (
    <header>
      <Container>
        <HeaderTop />
        <HeaderBottom />
      </Container>
      <style>{`
        header{
          background:${colorBlack};
          color:${colorWhite} ;
          padding:30px 0;
        }
        li{
          display:inline-block
        }     
        ul {
          margin: 0;
          padding:0;
          list-style: none;

        }
        a{
          color:${colorWhite}
        }
        `}</style>
    </header>
  );
};

export default Header;
