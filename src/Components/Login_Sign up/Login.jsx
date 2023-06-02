import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { FaGoogle, } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
const Login = () => {
    // const { signIn, googleSignIn } = useContext(AuthContext)
    const {signIn, googleSignIn} = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                console.log(result.user)
                Swal.fire('Login Success')
                form.reset()
                navigate('/')
                
            })
            .catch(error => {
                setError(error)
                Swal.fire(`${error}`)

            })
    }
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                setError('')
                navigate('/')
            })
            .catch(error => {
                setError(error)
                Swal.fire(`${error}`)
            })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-4">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-black">Login</button>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <div className='text-center'>
                            <button onClick={handleGoogleLogin} className='btn btn-black'> <FaGoogle></FaGoogle> </button>
                        </div>
                        <label className="label mt-5">
                            <p className="label-text-alt">Don't Have an Account? <Link className='link link-hover' to='/registration'>Registration</Link></p>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;