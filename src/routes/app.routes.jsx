import { Routes, Route, Navigate} from 'react-router-dom';
import { Home} from '../pages/Home'
import { Profile } from '../pages/Profile';
import { NewTicket } from '../pages/NewTicket';

export function AppRoutes(){
   return(
       <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/" element={<Home/>} />
            <Route path="/ticket/new" element={<NewTicket/>} />
            <Route path="*" element={<Navigate to="/"/>} />
       </Routes>
   )
}