// Environnement de developpement

import { environment } from 'src/environments/environment';

const netLink: string = 'https://matyla.spa-dev.com/api/'; // ONLINE - LINK
//const localLink: string = 'http://192.168.1.169/mathyla/api/'; // LOCAL - LINK
const localLink: string = 'http://192.168.1.180/afrifish/api/'; // LOCAL - LINK
//const localLink: string = 'http://localhost/mathyla/api/'; // LOCAL - LINK

// Access Geant...
export const BASE_URL = environment.production ? netLink : localLink;

