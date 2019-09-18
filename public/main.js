// const feathers = require('@feathersjs/client');

console.log('hello world');
let app = feathers();
let client = feathers.rest('http://localhost:3030/');

app.configure(client.fetch(window.fetch));

// login();

const todo = app.service('todo');
todo
  .post({ title: 'blah1' })
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    throw e;
  });

function login() {
  // const auth = app.service('authentication');
  // const authRes = auth.post({
  //   user: 'a@test.com',
  //   password: 'abcde',
  //   strategy: 'local'
  // });
  app
    .authenticata({
      user: 'a@test.com',
      password: 'abcde',
      strategy: 'local'
    })
    .then(res => {
      console.log(res);
    });
  // console.log(authRes);
}
