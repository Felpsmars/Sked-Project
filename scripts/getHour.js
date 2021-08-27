function updateClock() {
  let date = new Date();
  let time = date.toLocaleTimeString();
  document.getElementById('time').innerHTML = `${time}`;
}

