import React , {useState} from 'react'
import api from '../api/axiosConfig.js'
import { Link ,useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate(); // ✅ اضافه شده
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', form);
      const token = res.data.token;

      // ذخیره توکن در localStorage یا sessionStorage
      localStorage.setItem('Authorization', `Bearer ${token}`);

      // ریدایرکت به داشبورد یا صفحه موردنظر
      navigate( "/" ,{replace:true}) 
    } catch (err) {
      setError(err.response?.data?.message.en || err.response?.data?.message.en || 'Login failed');
      toast.error(error)
    }
  };
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <Toaster/>
        <form action="" className='border border-amber-400 min-w-lg rounded' onSubmit={handleSubmit}>
            <nav className='px-8 py-4 text-amber-400 w-full border-b flex justify-between mb-5'>
                <span className='font-semibold'>
                    Login
                </span>
                <Link to={'/register'} className='text-red-500 hover:underline'>
                    register
                </Link>
            </nav>
            <div className='text-amber-400 my-1 flex gap-3 px-8'>
                <label className='py-2 w-20 bg-none'>Email :</label>
                <input className='appearance-none bg-input accent-amber-400 py-1  bg-amber-50/10 text-amber-400 placeholder:text-amber-300 px-2 my-1 h-fit rounded  flex-1' name='email' type="email" value={form.email} onChange={handleChange}   autoComplete="off"/>
            </div>
            <div className='text-amber-400 my-1 flex gap-3 px-8'>
                <label className='py-2 w-20'>Password :</label>
                <input name='password'  type="password" value={form.password} onChange={handleChange} className=' appearance-none py-1 accent-amber-400 px-2 my-1 h-fit rounded bg-amber-50/10 text-amber-400 placeholder:text-amber-300 flex-1'  autoComplete="new-password"/>
            </div>
            <div className='px-8 my-3 mb-5 flex gap-3 justify-end'>
                <button type='submit' className='px-8 py-1 w-28 rounded border border-green-400 text-green-400 font-semibold cursor-pointer hover:bg-green-400/10'>
                    Ok
                </button>
            </div>
        </form>


    </div>
  )
}

export default Login