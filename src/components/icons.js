import {
    faMoon, 
    faSun, 
    faSignOutAlt, 
    faTrash, 
    faCookie, 
    faInfoCircle,
    faEdit,
    
} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

const Icons = () => {
    return library.add(faMoon, faSun, faTrash, faSignOutAlt, faCookie, faInfoCircle, faEdit);
};

export default Icons;

