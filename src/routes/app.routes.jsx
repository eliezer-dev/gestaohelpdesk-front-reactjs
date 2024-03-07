import { Routes, Route, Navigate} from 'react-router-dom';
import { Home} from '../pages/Home'
import { Profile } from '../pages/Profile';
import { TicketsNotAssigned } from '../pages/TicketsNotAssigned';

export function AppRoutes(){
   return(
       <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/chamados/semusuario" element={<TicketsNotAssigned/>}/>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<Navigate to="/"/>} />
       </Routes>
   )
}