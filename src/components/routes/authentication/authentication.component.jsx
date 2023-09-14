// import { useEffect } from "react";
// import { getRedirectResult } from 'firebase/auth';

import { 
    // auth,
    signInWithGooglePopUp, 
    // signInWithGoogleRedirect,
    createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils";

import SignUpForm from "../../sign-up-form/sign-up-form.component";
import SignInForm from "../../sign-in-form/sign-in-form.component";

import './authentication.styles.scss';

// const logGooglRedirectUser = async () => {
//     const {user} = await signInWithGoogleRedirect();
//     console.log({user});
// }

const Authentication = () => {
    /* The below commented code is to how to sig In using google redirect and we have button below as well to perform it*/

    // useEffect(()=> {
    //     const asyncFunc = async () => {
    //         const response = await getRedirectResult(auth);
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     asyncFunc();
    // },[])

    return(
        <div className="authentication-container">
            {/* <button onClick={signInWithGoogleRedirect}>Sign In with google redirect</button> */}
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}
export default Authentication;