let hourArray;

let containerEl = $(".container");
/* 
MomentJS
need to establish moment to tell current local time
    we will need an interval(n) assume N will be about 10000ms
when we have local time printed to console, we can then  plan on how it fits in the code
*/

$(document).ready(loadCalendar(), updateCalendar());

// hour slot object
function hourSlotObj(id) {
    this.elId = "#" + id;
    this.hour = parseInt(id.split("-")[1]);
};

// function to load calendar from the DOM
function loadCalendar() {
    let targetDiv = $(".time-block").toArray();
    if(localStorage.getItem("schedule") === null) {
        hourArray = [];

        for(let i = 0; i < targetDiv.length; i++) {
            // placing DOM elements into hourArray as hourSlot obj
            hourArray[i] = new hourSlotObj(targetDiv[i].id);
        }
    } else {
        hourArray = JSON.parse(localStorage.getItem("schedule"));

        for(let i = 0; i < targetDiv.length; i++) {
            if(hourArray[i].elId === "#" + targetDiv[i].id) {
                if(hourArray[i].content) {
                    targetDiv[i].childNodes[3].textContent = hourArray[i].content;
                }
            }
        }
    }
};

// this will update the color of the scheduler
function updateCalendar() {
    for(let hourSlot of hourArray) {
        if(hourSlot.hour === moment().hour()) {
            $(hourSlot.elId).css("background-color", "LightCoral");
        } else if(hourSlot.hour <= moment().hour()) {
            $(hourSlot.elId).css("background-color", "LightGrey");
        } else if(hourSlot.hour >= moment().hour()) {
            $(hourSlot.elId).css("background-color", "LightGreen");
        }
    }
};

function loadToStorage() {
    localStorage.setItem("schedule", JSON.stringify(hourArray));
};

function saveTextHandler(event) {
    let target = event.target; 

    if(target.className === "btn saveBtn col-md-1") {
        console.log(target.previousSibling.previousSibling.value);
        console.log(target.parentNode.id);

        for(let i = 0; i < hourArray.length; i++) {
            if(hourArray[i].elId === "#" + target.parentNode.id) {
                hourArray[i].content = target.previousSibling.previousSibling.value;
            }
        }
        loadToStorage();
    }
};


// event listeners
containerEl.on("click", saveTextHandler);

// set interval to 1 second refresh
setInterval(updateCalendar, 1000);