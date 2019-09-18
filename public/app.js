console.log("hello world");

const socket = io();

var client = feathers();
const config = client.get("authentication");

client.configure(feathers.socketio(socket));
client.configure(feathers.authentication(config));

var token = login();

getTodo();

async function login() {
  const auth = await client.authenticate({
    strategy: "local",
    email: "a@test.com",
    password: "abcde"
  });
  return auth.accessToken;
}

async function getTodo() {
  const todoRecs = await client.service("todo").find();
  this.renderList("todosNode", todoRecs);
}

async function renderList(nodeId, data) {
  document.getElementById(nodeId).innerHTML = "";
  let dataList = "";
  for (var i = 0; i < data.data.length; i++) {
    dataList += "<li>" + data.data[i]["title"] + "</li>";
  }
  document.getElementById(nodeId).innerHTML = `<ul>${dataList}</ul>`;
}

async function insertTodo() {
  console.log("todo is ", document.getElementById("inTodo").value);
  const todoCreate = await client
    .service("todo")
    .create({ title: document.getElementById("inTodo").value });
  console.log("todo created");
  document.getElementById("inTodo").value = "";
  this.getTodo();
}
