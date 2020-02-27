// Named export - has a name. have as many needed.
// Default export - has no name. you can only have one.

const message = 'Some message from myModule.js';
const name = 'Andrew';
const location = 'Philly';
const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}

export { getGreeting, message, name, location as default }