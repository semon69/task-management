import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { FaGoogle, } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';

const Registration = () => {
    const { signUp, updateUser, logOut, googleSignIn } = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegistration = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const info = { name, photo, email, password }
        console.log(info)
        signUp(email, password)
            .then(result => {
                Swal.fire('Registration Success. Please Login now')
                console.log(result.user)
                form.reset()
                updateUser(name, photo)
                    .then(() => { })
                    .catch(err => {
                        setError(err)
                        Swal.fire(`${error}`)
                        form.reset()
                    })
                logOut()
                    .then(() => { })
                    .then(error => console.log(error))
            })
            .catch(error => {
                setError(error)
                Swal.fire(`${error}`)

            })
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                Swal.fire('Sign Up Success')
                console.log(result.user)
                navigate('/')
            })
            .catch(error => {
                Swal.fire(`${error}`)
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-4">
                        <form onSubmit={handleRegistration} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name='name' className="input input-bordered"  required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="text" placeholder="photo url" name='photo' className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required/>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" required/>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-black">Register</button>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <div className='text-center'>
                            <button onClick={handleGoogleLogin} className='btn btn-black'> <FaGoogle></FaGoogle> </button>
                        </div>
                        <label className="label">
                            <p className="label-text-alt">Already Have an Account? <Link className='link link-hover' to='/login'>Login</Link></p>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;