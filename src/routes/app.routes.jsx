import { Routes, Route, Navigate} from 'react-router-dom';
import { Home} from '../pages/Home'
import { Profile } from '../pages/Profile';
import { Tickets } from '../pages/Tickets';
import { Users } from '../pages/Users';
import { Clients } from '../pages/Clients';
import { NewClient } from '../pages/NewClient';
import { NewUser } from '../pages/NewUser';
import { Configurations } from '../pages/Configurations';
import { NewCategorie } from '../pages/NewCategorie';

export function AppRoutes(){
   return(
       <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/clients" element={<Clients/>}/>
            <Route path="/users/:id" element={<NewUser/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/configurations" element={<Configurations/>}/>
            <Route path="/configurations/:option" element={<Configurations/>}/>
            <Route path="/configurations/categories/:id" element={<NewCategorie/>}/>
            <Route path="/" element={<Home/>} />
            <Route path="/ticket/:id" element={<Tickets/>} />
            <Route path="/clients/:id" element={<NewClient/>} />
            <Route path="*" element={<Navigate to="/"/>} />
       </Routes>
   )
}