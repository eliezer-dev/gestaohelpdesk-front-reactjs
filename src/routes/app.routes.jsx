import { Routes, Route, Navigate} from 'react-router-dom';
import { Home} from '../pages/Home'
import { Profile } from '../pages/Profile';
import { Tickets } from '../pages/Tickets';
import { Client } from '../pages/Client';

export function AppRoutes(){
   return(
       <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/clients" element={<Client/>}/>
            <Route path="/" element={<Home/>} />
            <Route path="/ticket/:id" element={<Tickets/>} />
            <Route path="*" element={<Navigate to="/"/>} />
       </Routes>
   )
}