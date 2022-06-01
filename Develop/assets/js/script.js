let hourArray = [];

/* 
MomentJS
need to establish moment to tell current local time
    we will need an interval(n) assume N will be about 10000ms
when we have local time printed to console, we can then  plan on how it fits in the code
*/

$(document).ready(updateCalendar());

// hour slot object
function hourSlotObj(id) {
    this.elId = id;
    this.hour = id.split("-")[1];
}

// function to load calendar from the DOM
function loadCalendar() {
    let targetDiv = $(".time-block").toArray();

    for(let i = 0; i < targetDiv.length; i++) {
        // placing DOM elements into hourArray as hourSlot obj
        hourArray[i] = new hourSlotObj(targetDiv[i].id);
    }
}

loadCalendar();

hourArray.push(new hourSlot("hour-11"));

console.log(hourArray[0].hour);

function updateCalendar() {
    
};

//setInterval(updateCalendar, 10000);