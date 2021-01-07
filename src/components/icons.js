import {
    faMoon, 
    faSun, 
    faSignOutAlt, 
    faTrash, 
    faCookie, 
    faInfoCircle,
    faEdit,
    faBars,
    faSpinner
    
} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

const Icons = () => {
    return library.add(faMoon, faSun, faTrash, faSignOutAlt, faCookie, faInfoCircle, faEdit, faBars, faSpinner);
};

export default Icons;

