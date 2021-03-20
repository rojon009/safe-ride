import React, { useContext } from "react";
import { useHistory, useLocation } from 'react-router';
import { useState } from "react";
import { useForm } from "react-hook-form";
import './Login.css';
import { UserContext } from "../../App";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle } from "../../firebase/firebase";


const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const location = useLocation();
    const history = useHistory();
    let {from} = location.state || {from: {state: '/'}}
    
    const [signUp, setSignUp] = useState(true);
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = ({name, email, password}) => {
        if(signUp) {
            createUserWithEmailAndPassword(email, password)
            .then(res => res.user)
            .then(user => {
                user.updateProfile({
                    displayName: name
                })
                return user;
            })
            .then(user => {
                setLoggedInUser(user);
                history.replace(from);
            })
        } else {
            signInWithEmailAndPassword(email,password)
            .then(user => {
                setLoggedInUser(user);
                history.replace(from);
            })
        }
    };

    const loginInWithGoogle = () => {
        signInWithGoogle()
        .then(res => res.user)
        .then(user => {
            setLoggedInUser(user);
            history.replace(from);
        })
    }


    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
        <div className="login-page">
            <div className="form-area">
                <h1>Create an Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        signUp && (
                            <>
                                <input id="name" name="name" type="text" placeholder="Name" ref={register({ required: true })} />
                                {errors.name && <span className="error">This field is required</span>}
                            </>
                        )
                    }

                    <input id="email" name="email" type="email" placeholder="Email" ref={register({ required: true, pattern: { value: re, message: 'Email is not Valid.' } })} />
                    {errors.email && errors.email.type === 'required' && <span className="error">This field is required</span>}
                    {errors.email?.message && <span className="error">{errors.email?.message}</span>}
                    <input id="password" name="password" type="password" placeholder="Password" ref={register({ required: true, minLength: 6 })} />
                    {errors.password && errors.password.type === 'required' && <span className="error">This field is required</span>}
                    {errors.password && errors.password.type === 'minLength' && <span className="error">Password must be at least 6 character</span>}
                    {
                        signUp && (
                            <>
                                <input id="confirm_password" name="confirm_password" type="password" placeholder="Confirm Password" ref={register({
                                    required: true, validate: {
                                        confirm: value => value === watch('password')
                                    }
                                })} />
                                {errors.confirm_password && errors.confirm_password.type === 'required' && <span className="error">This field is required</span>}
                                {errors.confirm_password && errors.confirm_password.type === 'confirm' && <span className="error">Password does not match</span>}
                            </>
                        )
                    }
                    <input type="submit" value={signUp ? 'Sign Up' : 'Login'} />
                </form>
                <p>Already have an Account? <button onClick={() => setSignUp(!signUp)} className="login">{signUp ? 'Login' : 'Sign Up'}</button></p>
            </div>
            <div className="other-option">
                <h1>or</h1>
                <button onClick={loginInWithGoogle} className="google"><img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="google"/> Sign In With Google</button>
            </div>
        </div>
    );
}

export default Login;