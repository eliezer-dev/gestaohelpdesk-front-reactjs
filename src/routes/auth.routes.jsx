import { Routes, Route, Navigate} from 'react-router-dom';
import { SignIn} from '../pages/SignIn'

export function AuthRoutes(){
    const user = localStorage.getItem("@rocketmovies:user")
   return(
       <Routes>
           <Route path="/login" element={<SignIn/>} />
           {!user && <Route path="*" element={<Navigate to="/"/>} />}
       </Routes>
   )
}