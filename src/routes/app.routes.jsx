import { Routes, Route, Navigate} from 'react-router-dom';
import { Home} from '../pages/Home'
import { Profile } from '../pages/Profile';
import { Tickets } from '../pages/Tickets';

export function AppRoutes(){
   return(
       <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/" element={<Home/>} />
            <Route path="/ticket/:id" element={<Tickets/>} />
            <Route path="*" element={<Navigate to="/"/>} />
       </Routes>
   )
}