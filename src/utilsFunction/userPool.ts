import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: "eu-west-3_6EZLRYAWp",
    ClientId: "6iict95poqa0316rqinpdrdnrn"
}

export default new CognitoUserPool(poolData);