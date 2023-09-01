import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';

var authenticationData = {
	Username: 'krishnanandshenoy17@gmail.com',
	Password: 'krishnasAws5',
};






let authenticate = (authenticationData) => {



    var authenticationDetails = new AuthenticationDetails(
        authenticationData
    );



    var poolData = {
        UserPoolId: 'us-east-1_cQ6ah8TNX', 
        ClientId: '67oofubin9d1trpqkpgjcus5mn',
    };
    var userPool = new CognitoUserPool(poolData);


    var userData = {
        Username: 'krishnanandshenoy17@gmail.com',
        Pool: userPool,
    };


    var cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {

        onSuccess: async function(result) {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log("\n\n\nAccessToken : ", accessToken)

            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    console.log(
                        'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
                    );
                }
            });

            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            // AWS.config.region = 'us-east-1';
    
            // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            // 	IdentityPoolId: '...', // your identity pool id here
            // 	Logins: {
            // 		// Change the key below according to the specific region your user pool is in.
            // 		'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': result
            // 			.getIdToken()
            // 			.getJwtToken(),
            // 	},
            // });
    
            // //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            // AWS.config.credentials.refresh(error => {
            // 	if (error) {
            // 		console.error(error);
            // 	} else {
            // 		// Instantiate aws sdk service objects now that the credentials have been updated.
            // 		// example: var s3 = new AWS.S3();
            // 		console.log('Successfully logged!');
            // 	}
            // });
        },
    
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
    
}


export  {
    authenticate
}