import {
    faMoon, 
    faSun, 
    faSignOutAlt, 
    faTrash, 
    faCookie, 
    faInfoCircle,
    faEdit,
    faBars
    
} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

const Icons = () => {
    return library.add(faMoon, faSun, faTrash, faSignOutAlt, faCookie, faInfoCircle, faEdit, faBars);
};

export default Icons;

