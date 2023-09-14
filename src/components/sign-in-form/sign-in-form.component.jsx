import { useState } from "react";
import { auth, signInWithGooglePopUp, createUserDocumentFromAuth , signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email:'',
    password:''
}

const SignInForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password}=formFields;

    
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const { user } = await signInAuthUserWithEmailAndPassword(auth,email,password)
            console.log(user)

            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Incorrect Password');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated to the email');
                    break;
                default:
                    console.log(error);
            }
        }
    }
    const handleChange = (event) =>{
        const {name,value}=event.target;
        setFormFields({...formFields,[name]:value});
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp();
    }; 
    return(
        <div className="sign-up-container">
            <h2>Already have an Account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    inputOptions = {{
                        type:"email" ,
                        required : true,
                        onChange:handleChange,
                        name:"email",
                        value:email
                    }}
                    />

                <FormInput
                    label='Password'
                    inputOptions = {{
                        type:"password" ,
                        required : true,
                        onChange:handleChange,
                        name:"password",
                        value:password
                    }}
                    />
                <div className="buttons-container">
                <Button type='submit'>Sign In</Button>
                <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google} >Google sign in</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm;