import React from 'react'
import SignUp from './Pagination/SignUp'
import SignIn from './Pagination/SignIn'
import { Routes, Route } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import Customize from './Pagination/Customize'
import axiosClient from './utils/axois'
import { useEffect } from 'react'
import { Navigate } from 'react-router'
import { setData } from './Redux/userSlice'
import CustomizeTwo from './Pagination/CustomizeTwo'
import Home from './Pagination/Home'
import Animation from './Animation/Animation'
import { useState } from 'react'

const App = () => {
  const user = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // check user is already login or not
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const { data } = await axiosClient.get("/api/user/getuser");
        console.log(data.user);

        dispatch(setData(data.user));
      } catch (err) {
        console.log("User not logged in");
      } finally{
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
  return (
    <div className="w-full flex justify-center items-center mt-14">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-[#5DF5FF] animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-[#A06CFF] animate-[spin_1.2s_linear_reverse_infinite]"></div>
      </div>
    </div>
  );
}


  return (
    <>
      <Routes>
        <Route path='/' element={<Animation />} />
        <Route
          path='/signup'
          element={!user ? <SignUp /> : <Navigate to={user.assistantImage && user.assistantName ? "/assistant" : "/customize"} />}
        />

        <Route
          path='/signin'
          element={!user ? <SignIn /> : <Navigate to={user.assistantImage && user.assistantName ? "/assistant" : "/customize"} />}
        />
        <Route path='/customize' element={user ? <Customize /> : <Navigate to="/" />} />
        <Route path="/assistant" element={user ? (user.assistantImage && user.assistantName ? <Home /> : <Navigate to="/customize" />) : <Navigate to="/" />} />

        <Route path='/customize-name' element={user ? <CustomizeTwo /> : <Navigate to="/" />} />

      </Routes>

    </>
  )
}

export default App