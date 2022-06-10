import React from 'react';
import styled from "styled-components";
import {colors} from "../../stylesComponents/colors";

type ButtonClearType = {
    button: "button"
    br?: number
    bg?: string
    name: string
    width?: number
    onClick: () => void
}

export const Button = ({br, bg, onClick, name, width, button}: ButtonClearType) => {
    return (
        <ButtonAddNewPack type={button} br={br} bg={bg} width={width} onClick={onClick}>{name}</ButtonAddNewPack>
    );
};


const ButtonAddNewPack = styled.button<{width?: number, bg?: string, br?: number}>`
  width: ${({width}) => width ? width : 20}%;
  height: 2vw;
  font-size: 0.8vw;
  background-color: ${({bg}) => bg ? bg : colors.Blue};
  color: ${colors.WhiteColor};
  border-radius: ${({br}) => br ? br : 20}px;
  letter-spacing: 0.7px;
  border: none;
  cursor: pointer;`