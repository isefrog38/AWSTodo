import React from 'react';
import {CheckEmailIcon} from "./checkEmailIcon";
import styled from "styled-components";
import { useAppSelector } from '../../../reduxStore/store';
import { CardWrapper, TextAuthWrapper, TitleAuthWrapper } from '../../stylesComponents/taskWrapper';
import { colors } from '../../stylesComponents/colors';
import {initialStateAuthorizationType} from "../../../types/authType";

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  background: #D7D8EF`

export const CheckEmail = () => {

    const {user} = useAppSelector<initialStateAuthorizationType>(state => state.AuthorizationReducer);

    return (
        <CardWrapper width={413} height={468}>
            <TitleAuthWrapper fontSz={26}>SenamaSoft</TitleAuthWrapper>
            <IconWrapper>
                <CheckEmailIcon/>
            </IconWrapper>
            <TitleAuthWrapper fontSz={22}> Check Email </TitleAuthWrapper>
            <TextAuthWrapper textAlign={'center'}
                             opacity={0.5}
                             color={colors.DarkBlue}
                             fontSz={16}>
                {`We’ve sent an Email with activated link to ${user.email}`}
            </TextAuthWrapper>
        </CardWrapper>

    )
}

