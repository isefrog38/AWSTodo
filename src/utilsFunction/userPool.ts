import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: "eu-west-3_6EZLRYAWp",
    ClientId: "1av95erant2g4ugpk5gdm4qn83"
}

export default new CognitoUserPool(poolData);