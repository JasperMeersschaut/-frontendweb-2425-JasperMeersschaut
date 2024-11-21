import {useContext} from 'react';
import {AuthContext} from './Auth.context.jsx';
export const useAuth =()=>useContext(AuthContext);