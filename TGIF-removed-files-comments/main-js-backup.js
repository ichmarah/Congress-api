// Global variables for Congress
let table = document.getElementById("table-data");
let independent = document.querySelector("input[value=independent]");
let democrat = document.querySelector("input[value=democrat]");
let republican = document.querySelector("input[value=republican]");
let checkBoxes = [democrat, republican, independent];
let filteredStates = [];
let optionList = ["All"];
let dropdown = document.querySelector(".select-state");
let filteredMembers = [];

// Global variables for Attendance



////****************************** Fetch data ******************************
let members;
let api_url;
if (window.location.pathname.includes("senate")) {
    api_url = "https://api.propublica.org/congress/v1/113/senate/members.json";
    fetchData(api_url);
} else if (window.location.pathname.includes("house")) {
    api_url = "https://api.propublica.org/congress/v1/113/house/members.json";
    fetchData(api_url);
}


async function fetchData(api_url) {
    document.getElementById("alert").style.display = "none";
    
    await fetch(api_url, {
            method: "GET",
            headers: {
                "X-API-key": "CoA9BlnMvipImxDh0XmQSmz9EcwJwtqvGrjlhvSI"
            }
        })
        .then(response => response.json())
        .then(function (data) {
            members = data.results[0].members;
            document.getElementById("loader").style.visibility = "hidden";

        })
        .catch(error => console.error(error));
        
    dropdown.addEventListener("change", filterData);
    for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener("change", filterData);
    };
    filterStates();
    createOption();
    filterData();
    makeTable(members, filteredMembers);
    makeTable(filteredMembers);
}





//****************************** functions Congress page ******************************
function filterStates() {
    for (i = 0; i < members.length; i++) {
        filteredStates.push(members[i].state);
    }
    filteredStates = filteredStates.sort()
}



function createOption() {
    for (let i = 0; i < filteredStates.length; i++) {
        for (let j = 0; j < filteredStates.length; j++) {
            if (filteredStates[i] === filteredStates[j] && !optionList.includes(filteredStates[i])) {
                optionList.push(filteredStates[j])
            }
        }
    }

    for (let i = 0; i < optionList.length; i++) {
        let option = document.createElement("option");
        option.text = optionList[i];
        option.value = optionList[i];
        dropdown.appendChild(option);
    }
}



function filterData() {
    filteredMembers.length = 0;
    document.getElementById("alert").style.display = "none"
    for (let i = 0; i < members.length; i++) {
        if (dropdown.value === members[i].state || dropdown.value === "All") {
            if (checkBoxes[0].checked === true && members[i].party === "D") {
                filteredMembers.push(members[i]);
            } else if (checkBoxes[1].checked === true && members[i].party === "R") {
                filteredMembers.push(members[i]);
            } else if (checkBoxes[2].checked === true && members[i].party === "I") {
                filteredMembers.push(members[i]);
            } else if (checkBoxes[0].checked === false && checkBoxes[1].checked === false && checkBoxes[2].checked === false) {
                document.getElementById("alert").style.display = "block"
                document.getElementById("alert").style.color = "red"
            }
        }
    }
    makeTable(filteredMembers);
}



function makeTable(x) {
    document.getElementById("table-data").innerHTML = "";

    let tHead = table.createTHead();
    let rowHead = tHead.insertRow();

    let cell01 = rowHead.insertCell();
    let cellText01 = document.createTextNode("Name");
    cell01.appendChild(cellText01);

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



//==================== functions Attendance page====================
