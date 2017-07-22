var socket = io();

//var name = prompt("Input your name : ","guest");
var name = <%= user %>;
console.log(name);
socket.emit("add user", name);
function msg_send(){
  var message = document.getElementById('msg').value;
  //message.time = vid.currentTime;
  socket.emit("msg",{msg:message});
  document.getElementById('msg').value = "";
};
socket.on('chat message', function(chat){
  var ul = document.createElement("ul");
  var new_msg_node = document.createTextNode(chat.user + " : " + chat.msg);
  ul.appendChild(new_msg_node);
  var element = document.getElementById("message_block");
  element.appendChild(ul);
});
socket.on('show notes', function(notes){
//console.log(notes);
  var ul = document.createElement("ul");
  var new_msg_node = document.createTextNode(tmp[1]+ ' : ' + tmp[2]);
  ul.appendChild(new_msg_node);
  var element = document.getElementById("message_block");
  element.appendChild(ul);
});
function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}
function searchKeyPress(e){
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13){
        document.getElementById('send').click();
        return false;
    }
    return true;
}
