import React, {createContext} from "react";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import Pool from "../../utilsFunction/userPool";
import {setAppErrorMessageAC} from "../../reduxStore/appReducer";
import {useTypedDispatch} from "../../reduxStore/store";
import {AuthMeTC} from "../../thunk/authThunk";

export const tokenInStorage = `CognitoIdentityServiceProvider.1av95erant2g4ugpk5gdm4qn83.35a94f8b-4ef4-4faf-8d9c-b3bcc5534c78.accessToken`;

export const AccountContext = createContext<any>(0);


export const Account = ({children}: any) => {
    const dispatch = useTypedDispatch();

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
               user.getSession((err: Error , session: any) => {
                   if (err) {
                       reject(err);
                   } else {
                       resolve(session);
                   }
               });
            } else {
                reject();
            }
        });
    };

    const auth = async (Username: string, Password: string): Promise<any> => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool,
            });

            const authDetails = new AuthenticationDetails({
                Username,
                Password
            });

            user.authenticateUser(authDetails, {
                onFailure: err => {
                    dispatch(setAppErrorMessageAC({error: err.message}));
                    reject(err);
                },
                onSuccess: response => {
                    dispatch(AuthMeTC(getSession));
                    resolve(response);
                },
                newPasswordRequired: data => {
                    resolve(data);
                }
            });
        })
    };

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    };

    return (
        <AccountContext.Provider value={{ auth, getSession, logout }}>
            {children}
        </AccountContext.Provider>
    );
};
