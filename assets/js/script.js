let hourArray;

// on wepage load, will load calendar and update the color of timeslots based on local time.
$(document).ready(loadCalendar(), updateCalendar());


// function to load calendar from the DOM if no previous data stored or load from local storage
function loadCalendar() {
    let targetDiv = $(".time-block").toArray();

    // checking if local storage is empty to create array of hour slots from the DOM
    if(localStorage.getItem("schedule") === null) {
        hourArray = [];

        // empty hour slot object
        function hourSlotObj(id) {
            this.elId = "#" + id;
            this.hour = parseInt(id.split("-")[1]);
        };

        for(let i = 0; i < targetDiv.length; i++) {
            // placing DOM elements into hourArray as hourSlot obj
            hourArray[i] = new hourSlotObj(targetDiv[i].id);
        }
    } else {
        // if local storage content is found array is populated with hourSlotObj
        hourArray = JSON.parse(localStorage.getItem("schedule"));

        // if there is text content in objs, display to DOM
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

// function to identify what save button is being clicked and saving the text content
function saveTextHandler(event) {
    let target = event.target; 

    if(target.className === "btn saveBtn col-md-1") {

        // searching for object in array to add content
        for(let hourSlot of hourArray) {
            if(hourSlot.elId === "#" + target.parentNode.id) {
                hourSlot.content = target.previousSibling.previousSibling.value;
            }
        }
        // saving updated array to local stoarage
        loadToStorage();
    }
};

// function to save obj array to storage
function loadToStorage() {
    localStorage.setItem("schedule", JSON.stringify(hourArray));
};


// event listener to give save button functionality
$(".container").on("click", saveTextHandler);

// set interval to 1 second refresh
setInterval(updateCalendar, 1000);