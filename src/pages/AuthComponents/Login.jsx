
import { useForm } from 'react-hook-form'

import { useState } from 'react'
import useAuth from '../Hooks/useAuth'

const Login = () => {
    const [error,setError]=useState('')
    const { signInUser, signInWithGoogle}=useAuth()
    const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const googleSignIn =()=>{
    signInWithGoogle()
    .then(res=>console.log(res.user))
  }
  const onSubmit=(data)=>{
    signInUser(data.email,data.password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorCode,errorMessage)
  });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="fieldset p-10 ">
          <label className="label">Email</label>
          <p className="text-red-500 font-bold">{error}</p>
          <input type="email" className="input" placeholder="Email" {...register("email", { required: true })} />
          {errors.email?.type === "required" && (
        <p className="text-red-500 font-bold">email  is required</p>
      )}
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" {...register("password", { required: true ,minLength:6  })}/>
          {errors.password?.type === "minLength" && (
        <p className="text-red-500 font-bold">password must have 6 characters</p>
      )}
      {errors.password?.type === "required" && (
        <p className="text-red-500 font-bold">password  is required</p>
      )}
          <div><a className="link link-hover">Forgot password?</a></div>
          <div className=" flex flex-col gap-3 ">
            <button className="btn bg-amber-600 text-black uppercase my-3 w-3/5  rounded-xl">Register</button>
            <p className="uppercase font-bold text-green-200"> have an account ?<Link to='/login' className="uppercase font-bold text-green-200 underline ml-1">Login</Link></p>
            <span className="border-t-orange-200 border-1 my-2 w-3/5"></span>
            <button onClick={googleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-3/5">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

          </div>
          
        </form>
    </>
  )
}

export default Login
