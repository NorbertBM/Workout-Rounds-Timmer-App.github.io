// const roundTime = 3;
// todo: get Rounds and Rests
const round1 = document.getElementById("round_1");
const rest1 = document.getElementById("rest_1");
const round2 = document.getElementById("round_2");
const rest2 = document.getElementById("rest_2");
const round3 = document.getElementById("round_3");
const roundTimeInput = document.getElementById("roundTime");
const restTimeInput = document.getElementById("restTime");
const startStopBtn = document.getElementById("start");

const body = document.querySelector("body");
const icon = document.querySelector("i");

//todo: Alerts
const alert10sec = document.getElementById("alert10Sec");
const alertStop = document.getElementById("alertStop");
const alertGo = document.getElementById("alertGo");

const startTimer = () => {
  //   const restTimeInput = document.getElementById("roundTime");
  startStopBtn.innerHTML = "Stop";
  startStopBtn.style.backgroundColor = "#e24379";
  startStopBtn.onclick = newWorkout;
  console.log(startStopBtn);

  let roundTime = roundTimeInput.value * 60;

  let restTime = restTimeInput.value * 60;
  let time = "10";

  // todo: Start Condition
  if (roundTimeInput.value === "" || restTimeInput.value === "") {
    alert("Input Round & Rest Time");
    return;
  } else {
    // todo: Alert Start in 10 seconds;
    setAlert(alert10sec);

    // const startCountdown = document.querySelector("#start-countdown");
    const startCountdown = document.querySelector(".title");

    setInterval(() => {
      getReady(startCountdown);

      // console.log(startCountdown.querySelector("#seconds").innerHTML);
    }, 1000);

    // setTimeout(() => {
    //   window.location.search();
    // }, 10000);

    // todo: Start the Rounds after 10 sec
    setTimeout(() => {
      // alertGo();
      document.querySelector("header").style.display = "none";
      setAlert(alertGo);
      setInterval(() => {
        // console.log(roundTimeInput.value);
        // todo: Start the Round
        if (round1.innerText !== "0:00") {
          icon.classList.remove("fa-heartbeat");
          addRemoveIconClass("fa-heartbeat", "fa-fist-raised");
          updateRound(round1);
          // todo: Round 1
          round1.parentElement.classList.add("active");

          round1.innerText === "0:10"
            ? (setAlert(alert10sec), (round1.style.color = "#e24379"))
            : round1;
          round1.innerText === "0:00" ? setAlert(alertStop) : round1;
        } else if (round1.innerText === "0:00" && rest1.innerText !== "0:00") {
          // todo: Rest 1
          addRemoveIconClass("fa-fist-raised", "fa-chair");

          updateRest(rest1);
          resetRoundTime();

          // round1.parentElement.classList.remove("active");
          // rest1.parentElement.classList.add("active");
          addRemoveActiveClass(round1, rest1);
          // console.log("rest");

          // rest1.innerText === "0:10"
          //   ? (setAlert(alert10sec), (rest1.style.color = "red"))
          //   : rest1;
          // todo: Replace with check for 10 sec
          checkFor10Sec(rest1);
          rest1.innerText === "0:00" ? setAlert(alertGo) : rest1;
        } else if (rest1.innerText === "0:00" && round2.innerText !== "0:00") {
          // todo: Round 2

          addRemoveActiveClass(rest1, round2);
          addRemoveIconClass("fa-chair", "fa-fist-raised");

          updateRound(round2);

          checkFor10Sec(round2);
          round2.innerText === "0:00" ? setAlert(alertStop) : round2;
          resetRestTime();
        } else if (round2.innerText === "0:00" && rest2.innerText !== "0:00") {
          // todo: Rest 2

          updateRest(rest2);
          resetRoundTime();

          addRemoveActiveClass(round2, rest2);
          addRemoveIconClass("fa-fist-raised", "fa-chair");

          checkFor10Sec(rest2);

          rest2.innerText === "0:00" ? setAlert(alertGo) : rest2;
        } else if (round3.innerText !== "0:00") {
          // todo: Round 3

          updateRound(round3);

          addRemoveActiveClass(rest2, round3);
          addRemoveIconClass("fa-chair", "fa-fist-raised");

          checkFor10Sec(round3);
          // todo: Sound stop alert & stop the timer (interval)
          round3.innerText === "0:00"
            ? (setAlert(alertStop), clearInterval(startTimer))
            : round3;
        }
        // todo: Create new Workout
        if (round3.innerText === "0:00") {
          body.innerHTML = `
                  <h1 class="title" style=''>Done</h1>
            <div class="inputs-container">
              <button class="btn" onclick="newWorkout()">Again</button>
            </div>  
                  `;
        }
      }, 1000);
    }, 11000);

    // todo!: Create countdown timer functions :

    // todo: Start Rounds
    function getReady(element) {
      let secondes = time % 60;
      // console.log(secondes);
      element.innerHTML = `
    
      <div class="inputs-container flex">
      <h4 class='title'>Get Ready in</h4>
     
      <h2 id='seconds' class="active animateSeconds ">${secondes}</h2>
      `;

      time--;
    }
    // <h6>Round length:</h6> <span '>${roundTimeInput.value} min</span>
    // <h6>Round length:</h6> <span >${restTimeInput.value} min</span>
    // </div>
    // todo: Update Rounds
    function updateRound(round) {
      const minutes = Math.floor(roundTime / 60);
      let secondes = roundTime % 60;
      //   use turnery operator to set trailing 0
      secondes = secondes < 10 ? "0" + secondes : secondes;

      round.innerHTML = `${minutes}:${secondes}`;
      roundTime--;
    }

    // todo: Reset Rounds time
    function resetRoundTime() {
      return (roundTime = roundTimeInput.value * 60);
    }

    // todo: Update Rest
    function updateRest(rest) {
      const minutes = Math.floor(restTime / 60);
      let secondes = restTime % 60;
      secondes = secondes < 10 ? "0" + secondes : secondes;

      rest.innerHTML = `${minutes}:${secondes}`;
      restTime--;
    }

    // todo: Reset Rest time
    function resetRestTime() {
      return (restTime = restTimeInput.value * 60);
    }

    //todo: Check for 10sec marker in the activity
    function checkFor10Sec(activity) {
      activity.innerText === "0:10"
        ? (setAlert(alert10sec), (activity.style.color = "#e24379"))
        : activity;
    }
    // todo: Create addRemoveActiveClass Function

    function addRemoveActiveClass(previousActivity, currentActivity) {
      // document.querySelector("i").classList.add("fa-fist-raised");
      previousActivity.parentElement.classList.remove("active");
      currentActivity.parentElement.classList.add("active");
    }
    // todo: Create addRemoveIconClass Function
    function addRemoveIconClass(currentIcon, nextIcon) {
      icon.classList.remove(currentIcon);
      icon.classList.add(nextIcon);
    }
    //todo: Interaction Alerts

    function setAlert(alert) {
      alert.play();
      setTimeout(() => {
        alert.pause();
        alert.currentTime = 0;
      }, 1300);
    }
  }
};

// todo: create new Workout
const newWorkout = () => {
  window.location.reload();
};

// todo: Display Clock
{
  const myVar = setInterval(myTimer, 1000);
  function myTimer() {
    const d = new Date();
    const t = d.toLocaleTimeString();
    document.getElementById("theTime").innerHTML = t;
  }
}
