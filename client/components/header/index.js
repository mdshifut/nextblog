import { Container } from "reactstrap";
import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import { colorBlack, colorWhite } from "../../utils/cssVariables";
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
          
        }     

        a{
          color:${colorWhite}
        }
        `}</style>
    </header>
  );
};

export default Header;
