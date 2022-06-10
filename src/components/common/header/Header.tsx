import React from 'react';
import s from "./Header.module.css";
import {PageSelect} from "../../../utilsFunction/PageSelector";
import {useAppSelector, useTypedDispatch} from "../../../reduxStore/store";
import {setLanguageAC} from "../../../reduxStore/appReducer";
import {AppInitialStateType, LanguageType} from "../../../types/reducersType";
import {getLanguageTC} from "../../../thunk/todolistThunk";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {LogOutTC} from "../../../thunk/authThunk";

export const Header = () => {

    const {language} = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useTypedDispatch();
    const {t} = useTranslation();


    const onClickHandler = () => {
        dispatch(LogOutTC());
    }
    const onLanguageChange = (language: LanguageType) => {
        dispatch(setLanguageAC({language}));
        dispatch(getLanguageTC());
    }

    return (
        <div className={s.main_header}>
            <div className={s.header}>
                <div className={s.select}>
                    <PageSelect value={language}
                                pd={15}
                                onChange={onLanguageChange}
                                items={["eng", "rus"] as LanguageType[]}
                    />
                </div>

                <h1 className={s.h1}>
                    {t('todolist_senamaSoft')}
                </h1>

                <ButtonWrapper>
                    <LogOutButton onClick={onClickHandler}>
                        LogOut
                    </LogOutButton>
                </ButtonWrapper>
            </div>
        </div>
    );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-right: 50px;
`;

const LogOutButton = styled.button`
  padding: 7px 20px;
  background-color: #c23c3c;
  font-size: 1rem;
  color: aliceblue;
  font-weight: 550;
  cursor: pointer;
  border: none;
  border-radius: 8px;
`;