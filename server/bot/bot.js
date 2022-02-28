console.log('hello')

const addUser = require("../schemas/resolvers");

console.log(addUser(
{     username: 'NewGuy',
      email: 'email@gmail.com',
      whatGym: 'Sabre',
      administrator: false,
      password: "test123",
      beltColor: "white"
}
));