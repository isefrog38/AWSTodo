import React from 'react';
import {IsAuthRedirect} from "../../../utilsFunction/redirectFunction";
import {useFormik} from "formik";
import {NavLink} from 'react-router-dom';
import styled from "styled-components";
import {
    CardWrapper,
    ErrorWrapper,
    FormWrapper,
    RememberMeWrapper,
    TextAuthWrapper,
    TitleAuthWrapper
} from '../../stylesComponents/taskWrapper';
import {Input} from '../../stylesComponents/modalWrappers';
import {colors} from '../../stylesComponents/colors';
import {useTypedDispatch} from "../../../reduxStore/store";
import {PATH} from '../../../utilsFunction/enumPath';
import {Button} from '../../stylesComponents/button';
import {LoginTC} from "../../../thunk/authThunk";

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean
};

export const Login = IsAuthRedirect(() => {

    const dispatch = useTypedDispatch();

    const loginForm = useFormik({
        initialValues: {email: "", password: "", rememberMe: false},
        validate: (values: FormikErrorType) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Field is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Password is required";
            } else if (values.password.length < 7) {
                errors.password = "Invalid password";
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(LoginTC(values.email, values.password, values.rememberMe));
            loginForm.resetForm();
        },
    });

    return (
        <CardWrapper width={413} height={600}>
            <TitleAuthWrapper fontSz={26}>Sign In</TitleAuthWrapper>
            <TitleAuthWrapper fontSz={15}>SenamaSoft</TitleAuthWrapper>

            {/*formik*/}
            <FormWrapper height={300} onSubmit={loginForm.handleSubmit}>
                <TextAuthWrapper fontSz={13} opacity={0.5} color={colors.DarkBlue}>Email</TextAuthWrapper>
                <Input type="email"
                       id="email"
                       placeholder="email"
                       {...loginForm.getFieldProps("email")}/>
                {/*Errors */}
                {loginForm.touched.email && loginForm.errors.email ? (
                    <ErrorWrapper>{loginForm.errors.email}</ErrorWrapper>
                ) : null}
                {/*End errors*/}
                <TextAuthWrapper fontSz={13} opacity={0.5} color={colors.DarkBlue}>Password</TextAuthWrapper>
                <Input type="password"
                       id="password"
                       placeholder="password"
                       {...loginForm.getFieldProps("password")}/>

                {loginForm.touched.password && loginForm.errors.password ? (
                    <ErrorWrapper>{loginForm.errors.password}</ErrorWrapper>
                ) : null}
                <RememberMeWrapper>
                    <StyledCheckBox
                        type="checkbox"
                        id="remember"
                        {...loginForm.getFieldProps("rememberMe")}
                    />
                    <TextAuthWrapper fontSz={13} opacity={1} color={colors.DarkBlue}> Remember me</TextAuthWrapper>
                </RememberMeWrapper>

                <Button type="submit"
                        disabled={!(loginForm.isValid && loginForm.dirty)}
                        height={36} width={266} bgColor={colors.DarkBlue}
                        color={colors.Lavender}>Login</Button>
            </FormWrapper>

            <TextAuthWrapper color={'#2f2e2e'} textAlign={'center'} fontSz={14} opacity={0.5}>
                <ButtonHovered>
                    <NavLink to={PATH.registration}>Don’t have an account?</NavLink>
                </ButtonHovered>
            </TextAuthWrapper>

        </CardWrapper>
    )
});


export const StyledCheckBox = styled.input<{ width?: number, height?: number }>`
  width: ${({width}) => width ? width : 20}px;
  height: ${({height}) => height ? height : 20}px;
  margin-right: 10px;
  cursor: pointer;
`;

export const ButtonHovered = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 20px;
  width: 200px;
  margin: 0 auto;
  padding: 5px 10px;

  &:hover {
    transition: 1s all;
    background-color: rgba(138, 179, 239, 0.64);
  }
`;