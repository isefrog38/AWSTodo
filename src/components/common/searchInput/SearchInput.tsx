import React, {ChangeEvent, useState} from 'react';
import s from "./SearchInput.module.css";
import styled from "styled-components";

const SearchImg = "https://cdn-icons-png.flaticon.com/512/149/149852.png";

type InputFormType = {
    valueSearch: string
    onChangeWithDebounce: (title: string) => void
}

export const SearchInput = ({valueSearch, onChangeWithDebounce}: InputFormType) => {

    const [value, setValue] = useState<string>(valueSearch);
    const [timerId, setTimerId] = useState<number | null>(null);


    const onChangeSearchHandler = (title: ChangeEvent<HTMLInputElement>) => {
        setValue(title.currentTarget.value);
        timerId && clearTimeout(timerId);
        const id: number = +setTimeout(onChangeWithDebounce, 700, title.currentTarget.value);
        setTimerId(id);
    };

    const defaultPlaceholder = "Search todo";

    return (
        <div className={s.addMessageBlock}>
            <InputWrapper
                className={s.inputAddMessage}
                placeholder={defaultPlaceholder}
                onChange={onChangeSearchHandler}
                value={value}
            />
        </div>
    );
};

export const InputWrapper = styled.input`
  height: 4vh;
  width: ${({width}) => width ? width : '90%'};
  background: url(${SearchImg}) no-repeat scroll 0.5vw 0.5vw;
  border-radius: 0.3vw;
  margin-right: 2vw;
  background-size: 1vw;
  font-size: 1vw;
  border: 1px solid #D9D9F1;
  opacity: 0.7;

  :nth-child(1) {
    background-color: #ECECF9;
  }

  :nth-child(2) {
    background-color: #ECECF9;
  }

  :hover {
    border: 1px solid #635D80;
  }

  :focus {
    outline: none;
    border: 1px solid #635D80;
  }
`;