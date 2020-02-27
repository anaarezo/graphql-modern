//Running math.js and myModule.js
import myCurrentLocation, { getGreeting, message, name} from './myModule';
import myAddFunction, { subtract } from './math';
//import myCurrentLocation from './myModule';

//myModule.js
console.log(message, name);
console.log(myCurrentLocation);
console.log(getGreeting('Jessica'));

// Math.js
console.log(myAddFunction(1,-2));
console.log(subtract(10,2));