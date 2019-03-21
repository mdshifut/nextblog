import css from 'styled-jsx/css';
import {
  colorWhite,
  colorGray,
  colorBlue,
  colorGrayDeep,
  colorDeepBlack
} from './cssVariables';
export const formPageCss = css`
  .registerLogin__left {
    background-color: #6ca4db;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
  }
  .registerLogin__left,
  .registerLogin__right {
    padding: 80px 60px;
    color: ${colorWhite};
  }
  .registerLogin__right {
    margin-left: -15px;
  }
  .registerLogin__left-heading {
    margin-bottom: 60px;
    color: ${colorWhite};
  }
  .registerLogin__link {
    text-decoration: underline;
    color: ${colorGray};
    position: absolute;
    bottom: 80px;
    left: 60px;
    text-transform: uppercase;
  }
`;

export const signUpSignInFromCss = css.global`
  .signUpSignInFrom__form-group {
    position: relative;
  }
  .signUpSignInFrom__form-group p {
    padding-left: 20px;
  }
  .signUpSignInFrom__icon {
    position: absolute;
    left: 20px;
    top: 15px;
    transition: 0.3s;
    font-size: 16px;
    color: ${colorGray};
  }
  .signUpSignInFrom__icon.isFocused {
    color: ${colorBlue};
  }
  .signUpSignInFrom__icon.isInvalid {
    color: #dc3545;
  }
  .signUpSignInFrom__icon.isValid {
    color: #28a745;
  }
  .signUpSignInFrom__input {
    border-radius: 40px;
    padding: 22px;
    padding-left: 45px;
    color: ${colorGrayDeep};
    background-color: ${colorDeepBlack};
    border-color: ${colorDeepBlack};
    transition: 0.3s;
  }
  .signUpSignInFrom__input:focus {
    color: #d6dade;
    background-color: ${colorDeepBlack};
    border-color: ${colorBlue};
    box-shadow: none;
  }
  .signUpSignInFrom__btn {
    margin-top: 30px;
    padding: 10px 30px;
    text-align: center;
    font-family: 'Domine', serif;
    font-size: 18px;
    border: none;
    border-radius: 50px;
    background-color: ${colorBlue};
    color: ${colorWhite};
    cursor: pointer;
    transition: 0.3s;
  }
  .signUpSignInFrom__btn:hover {
    background-color: ${colorWhite};
    color: ${colorDeepBlack};
  }
  .signUpSignInFrom__btn:disabled,
  .signUpSignInFrom__btn[disabled] {
    background-color: ${colorDeepBlack};
    color: #d6dade;
  }
  .signUpSignInFrom__link {
    color: ${colorGrayDeep};
    font-size: 14px;
    text-decoration: none;
    cursor: pointer;
  }
  .signUpSignInFrom__link:hover {
    color: ${colorBlue};
  }
`;

export const confirmationCss = css.resolve`
 .activeAccount {
  padding: 170px 80px;
  max-width: 900px;

  
}
.activeAccount i {
  font-size: 100px;
  margin: 30px 0;
  display: inline-block;
}
.activeAccount a {
  color: ${colorGrayDeep};
  display: inline-block;
  margin-top: 20px;
  font-weight: 700;
}
.activeAccount a:hover {
  color: ${colorBlue}
}

`;
