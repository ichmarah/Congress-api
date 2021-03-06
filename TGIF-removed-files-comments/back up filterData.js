// Global variables
let table = document.getElementById("senate-data");
let members = data.results[0].members;
let independent = document.querySelector("input[value=independent]");
let democrat = document.querySelector("input[value=democrat]");
let republican = document.querySelector("input[value=republican]");
let checkBoxes = [democrat, republican, independent];
// console.log(checkBoxes)

let filteredMembers = []; //to be used as argument to create table in the filter filterDate() function
var filteredStates = []; // to filter states and sorted alphabetically
let optionList = ["All"]; // sorted states without duplicates

let dropdown = document.querySelector(".select-state")
let newOptionList = []
let newFilteredStates = [];



// Grab all states and sort them alphabetically
function filterStates() {
    for (i = 0; i < members.length; i++) {
        filteredStates.push(members[i].state);
    }
    console.log(filteredStates);
    filteredStates = filteredStates.sort()
}
filterStates();
console.log(filteredStates) // total of 105 options but there are less amount of states in US. Need to prevent duplicates


// Create options element for the select dropdown
function createOption() {
    // First, filter throught states to remove duplicates
    for (let i = 0; i < filteredStates.length; i++) {
        for (let j = 0; j < filteredStates.length; j++) {
            if (filteredStates[i] === filteredStates[j] && !optionList.includes(filteredStates[i])) { 
                optionList.push(filteredStates[j])
            }
        }
    }
    console.log(optionList)
    // Actual creation of options for select element
    for (let i = 0; i < optionList.length; i++) {
        let option = document.createElement("option");
        option.text = optionList[i];
        option.value = optionList[i];
        dropdown.appendChild(option);
        console.log(option);
        newOptionList.push(option);
    }
}
createOption();
console.log(newOptionList)



// Add event listener to the sorted option list
// for (let i = 0; i < newOptionList.length; i++) {
//     newOptionList[i].addEventListener("change", filterState);
// };
dropdown.addEventListener("change", filterState)


function filterState() {

    // newFilteredStates.length = 0;
    // document.getElementById("alert").style.display = "none" // Do not display the alert for checking a box when boxes are checked
    // Conditionals to filter states
    for (let i = 0; i < members.length; i++) {

        if (dropdown.value === members[i].state) {
            newFilteredStates.push(members[i]);
        } else if (dropdown.value === "all") {
            newFilteredStates = members[i].state;
        }
        // filteredStates = filteredStates.sort((a, b) => {
        //     return a.filteredStates - b.filteredStates;
        // });
        // console.log(filteredStates);
    }


    makeTable(newFilteredStates);
}
filterState()



//Create event for every value of inputs
for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener("change", filterData); // When checkBoxes[i] is changed, apply filterData()
};


function filterData() {
    // console.log("filter data function runs")
    filteredMembers.length = 0;
    document.getElementById("alert").style.display = "none" // Do not display the alert for checking a box when boxes are checked
    for (let i = 0; i < members.length; i++) {
        if (checkBoxes[0].checked === true && members[i].party === "D") {
            filteredMembers.push(members[i]); 
        } else if (checkBoxes[1].checked === true && members[i].party === "R") {
            filteredMembers.push(members[i]);
        } else if (checkBoxes[2].checked === true && members[i].party === "I") {
            filteredMembers.push(members[i]);
        } else if (checkBoxes[0].checked === false && checkBoxes[1].checked === false && checkBoxes[2].checked === false) {
            document.getElementById("alert").style.display = "block" // if all boxes are unchecked, display alert
            document.getElementById("alert").style.color = "red"
        }
    }
    makeTable(filteredMembers); // Create the table every time the function is being called. Function is called when there is a change in eventListener
}
filterData(); //When removing this, table is not visible



// Create table Senate
function makeTable(x, y, z) {
    document.getElementById("senate-data").innerHTML = "";

    // Create table header
    let tHead = table.createTHead();
    let rowHead = tHead.insertRow(); // Insert a row to the table header

    let cell01 = rowHead.insertCell(); // Insert a cell in on row header
    let cellText01 = document.createTextNode("Name"); // Create text to go in cell
    cell01.appendChild(cellText01); // Add the text in the cell

    let cell02 = rowHead.insertCell();
    let cellText02 = document.createTextNode("Party");
    cell02.appendChild(cellText02);

    let cell03 = rowHead.insertCell();
    let cellText03 = document.createTextNode("State");
    cell03.appendChild(cellText03);

    let cell04 = rowHead.insertCell();
    let cellText04 = document.createTextNode("Years in Office");
    cell04.appendChild(cellText04);

    let cell05 = rowHead.insertCell();
    let cellText05 = document.createTextNode("% Votes w/ Party");
    cell05.appendChild(cellText05);

    // Loop in the JSON data in each element of members
    for (let i = 0; i < x.length; i++) {

        let row = table.insertRow();
        let url = x.url;
        let fullName = x.first_name + " " + x.middle_name + " " + x.last_name;

        function fullname() {
            if (x[i].middle_name === null) {
                return fullName = x[i].first_name + " " + x[i].last_name;
            } else {
                return fullName = x[i].first_name + " " + x[i].middle_name + " " + x[i].last_name;
            }
        };
        fullname(fullName);

        let cell1 = row.insertCell();
        let a = document.createElement("a");
        let cellText1 = document.createTextNode(fullname());
        a.appendChild(cellText1);
        a.href = url;
        a.target = "_blank";
        cell1.appendChild(a);

        let cell2 = row.insertCell();
        let cellText2 = document.createTextNode(x[i].party);
        cell2.appendChild(cellText2);

        let cell3 = row.insertCell();
        let cellText3 = document.createTextNode(x[i].state);
        cell3.appendChild(cellText3);

        let cell4 = row.insertCell();
        let cellText4 = document.createTextNode(x[i].seniority);
        cell4.appendChild(cellText4);

        let cell5 = row.insertCell();
        let cellText5 = document.createTextNode(x[i].votes_with_party_pct + "%");
        cell5.appendChild(cellText5);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        table.appendChild(row);
    }
}
makeTable(members, newFilteredStates, filteredMembers);

