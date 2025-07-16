import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Loding from './Loding';
import toast, { Toaster } from 'react-hot-toast';
function Register() {
    const [info, setInfo] = useState({
        username:"",
        password:"",
        email:""
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{

            e.preventDefault()
            setIsLoading(true)
            
            try {
                const res = await axios.post('http://localhost:3000/api/users/register',info)
                localStorage.setItem('Authorization', 'Bearer '+res.data.token);
                setIsLoading(false)
                navigate( "/" ,{replace:true}) 
            } catch (error) {
                toast.error(error.message)

            
        }
    }
  return (
    <div>
        <Loding visible={isLoading}/>
        
        
        <div className='w-full min-h-screen flex justify-center items-center'>
        
        <form action="" className='border border-amber-400 min-w-lg rounded' onSubmit={(e)=>{handleSubmit(e)}}>
            <nav className='px-8 py-4 text-amber-400 w-full border-b flex justify-between mb-5'>
                <span className='font-semibold'>
                    register
                </span>
                <Link to={'/login'} className='text-red-500 hover:underline'>
                    login
                </Link>
            </nav>
            <div className='text-amber-400 my-1 flex gap-3 px-8'>
                <label className='py-2 w-22'>Name :</label>
                <input value={info.username} onChange={(e)=>{
                    e.preventDefault()
                    setInfo(prev =>({...prev , username:e.target.value}))
                }} type="text" className=' py-1 accent-amber-400 px-2 my-1 h-fit rounded bg-amber-50/10 flex-1'  />
            </div>
            <div className='text-amber-400 my-1 flex gap-3 px-8'>
                <label className='py-2 w-22'>Email :</label>
                <input type="email" value={info.email} onChange={(e)=>{
                    e.preventDefault()
                    setInfo(prev =>({...prev , email:e.target.value}))
                }} className=' py-1 accent-amber-400 px-2 my-1 h-fit rounded bg-amber-50/10 flex-1'  />
            </div>
            <div className='text-amber-400 my-1 flex gap-3 px-8'>
                <label className='py-2 w-22'>Password :</label>
                <input type="password" value={info.password} onChange={(e)=>{
                    e.preventDefault()
                    
                    setInfo(prev =>({...prev , password:e.target.value}))
                }} className=' py-1 accent-amber-400 px-2 my-1 h-fit rounded bg-amber-50/10 flex-1'  />
            </div>
            <div className='px-8 my-3 mb-5 flex gap-3 justify-end'>
                <button type='submit' className='px-8 py-1 w-28 rounded border bg-green-400 font-semibold cursor-pointer hover:bg-green-600'>
                    Ok
                </button>
                <button type='reset' className='px-8 py-1 w-28 rounded border border-red-500 text-red-500 font-semibold cursor-pointer hover:bg-rose-500/15'>
                    Cansel
                </button>
            </div>
        </form>


    </div></div>
  )
}

export default Register