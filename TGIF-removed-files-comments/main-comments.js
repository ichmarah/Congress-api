// Global variables Congress
let table = document.getElementById("table-data");
let independent = document.querySelector("input[value=independent]"); 
let democrat = document.querySelector("input[value=democrat]");
let republican = document.querySelector("input[value=republican]");
let checkBoxes = [democrat, republican, independent];
let filteredStates = []; 
let optionList = ["All"]; 
let dropdown = document.querySelector(".select-state"); 
let filteredMembers = []; 

// Global variables for attendance
let tableG = document.getElementById("att-glance");
let tableL = document.getElementById("att-l");
let tableM = document.getElementById("att-m");


// ==================Async/await Congress, Attendance==================
let members = [];
let api_url;
if (window.location.pathname.includes("senate")) {
    api_url = "https://api.propublica.org/congress/v1/113/senate/members.json";
    fetchData(api_url);
    console.log(api_url)
} else if (window.location.pathname.includes("house")) {
    api_url = "https://api.propublica.org/congress/v1/113/house/members.json";
    fetchData(api_url);
    console.log(api_url)
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



async function fetchData(api_url) { 
    await fetch(api_url, {
            method: "GET",
            headers: {
                "X-API-key": "CoA9BlnMvipImxDh0XmQSmz9EcwJwtqvGrjlhvSI"
            }
        })
        .then(response => response.json()) 
        .then(function (data) {
            members = data.results[0].members;
        })
        .catch(error => console.error(error));

    getList(members);
    getAvg();
    makeGlanceTable();
    getLeast(lvpList, mvpList);
    makeHeaderLM();
    makeTableLeast();
    makeTableMost();

}



// ==================Congress page functions==================
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
    document.getElementById("table-data").innerHTML = ""; // You want this for when there are no checkboxex selected, the table is empty and removes from the screen (but the function is not removed!)

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

    // Use this loop for when the arguments "members" and "filteredMembers" are passed through the function
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





// ==================ATTENDANCE==================
let demList = 0;
let repList = 0;
let indList = 0;

function getList(x) {
    for (let element of members) {
        if (element.party === "D") {
            // demList += demD.length; // This will give 1+1+1+1... until the loop ends and we get the sum
            // Since we already know that the increment is always +1, we can use ++ and remove demD
            demList++;
        } else if (element.party == "R") {
            repList++;
        } else {
            indList++;
        }
    }
    console.log("Sum demList: " + demList); // Sum demList 57
    console.log("Sum repList: " + repList); // Sum demList 46
    console.log("Sum indList: " + indList); // Sum demList 2

    let totNum = demList + repList + indList; // To check if total amount is indeed 105
    console.log("Total list: " + totNum); // 105
}




/* 
Calculate the average "votes with party" for each party in percentage
For each party, add the value of the new element to the values of previous element.
Therefore, start with 0 as a basis.
*/
let demAvgVWP = 0;
let repAvgVWP = 0;
let indAvgVWP = 0;
let totAvgVWP = 0;

function getAvg() {
    for (let element of members) {
        let vwp = element.votes_with_party_pct; // to make it easier instead of using the long name
        // console.log("vwp: " + vwp);
        if (element.party === "D") {
            demAvgVWP += vwp; // Total of the percentages
        } else if (element.party === "R") {
            repAvgVWP += vwp; // Total of the percentages
        } else {
            indAvgVWP += vwp;
        }
        totAvgVWP += vwp;
    }
    console.log("Sum demAvgVWP: " + demAvgVWP);
    console.log("Sum totAvgVWP: " + totAvgVWP);

    demAvgVWP /= demList; // New total of dem percentages is dividing demAvgVWP by the total amount of Ds
    console.log("demAvgVWP: " + demAvgVWP + " %"); // Check up: previous code works

    repAvgVWP /= repList;
    console.log("remAvgVWP: " + repAvgVWP + " %");

    indAvgVWP /= indList;
    console.log("indAvgVWP: " + indAvgVWP + " %");

    totAvgVWP /= members.length
    console.log("totAvgVWP: " + totAvgVWP + "%");
}


// demAvgVWP: 96.97052631578948 %
// remAvgVWP: 88.8445652173913 %
// indAvgVWP: 95.17500000000001 %



// Create table Senate  at glance
function makeGlanceTable() {
    // Create table header
    let tHead = tableG.createTHead();
    let rowHead = tHead.insertRow(); // Insert a row to the table header

    let cell01 = rowHead.insertCell(); // Insert a cell in on row header
    let cellText01 = document.createTextNode("Party"); // Create text to go in cell
    cell01.appendChild(cellText01); // Add the text in the cell

    let cell02 = rowHead.insertCell();
    let cellText02 = document.createTextNode("No. of Reps ");
    cell02.appendChild(cellText02);

    let cell03 = rowHead.insertCell();
    let cellText03 = document.createTextNode("% Voted w/ Party");
    cell03.appendChild(cellText03);



    /*
     Create the rows based on info from statistics js file,
     using template literals to prevent DRY and keep code as short as possible.
    */
    for (let partyName in statistics) {
        // console.log(`${partyName}: ${statistics[partyName].num}`); // Check if template literals actually work

        let row = tableG.insertRow();

        let cell1 = row.insertCell();
        let cell1Text = document.createTextNode(`${partyName}`); // Text node is the value which the template is referring to
        // console.log(cell1Text);
        cell1.appendChild(cell1Text);

        let cell2 = row.insertCell();
        let cell2Text = document.createTextNode(`${statistics[partyName].sen_att_num}`);
        // console.log(cell2Text);
        cell2.appendChild(cell2Text);

        let cell3 = row.insertCell();
        let cell3Text = document.createTextNode(`${statistics[partyName].sen_att_votes}` + "%");
        // console.log(cell3Text);
        cell3.appendChild(cell3Text);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        tableG.appendChild(row);
    }
}




/*
Display top 10% least engaged in the table, sort, and handle duplicate data points (from members)
1. Function to Sort members.missed_votes_pct --> sorted should be descending order 
2. use compare function to sort numbers correctly (function within function)
3. members.length * 0.1 = 105 * 0.1 = 10.5 
4. let leastPct = slice from the sort position 0 to 10 (why also 11 to check if the last two are the same???)
    (ED: is not a correct way)
    Should be: array * 0.10
5. for of loop through leastPct (if members.missed_votes_pct == leastPct, create let cell1,
    create anchor tag, create cell1Text = document.createTExtNode(members.name),
    append text to anchor, use target:_blank, append anchor to cell)
*/





let lvpList = []; //create an empty array to push the sorted values in the array
let mvpList = [];

function getLeast(x) {
    for (let element of members) {
        lvpList.push(element.missed_votes_pct);
        mvpList.push(element.missed_votes_pct);


        lvpList = lvpList.sort((a, b) => {
            return b - a;
        });

        mvpList = mvpList.sort((a, b) => {
            return a - b;
        });
    }
    // console.log("Sorted lvpList: " + lvpList);
    // console.log("Sorted mvpList: " + mvpList);
}





function makeHeaderLM() {
    let tHeadL = tableL.createTHead();
    let tHeadM = tableM.createTHead();
    let rowHeadL = tHeadL.insertRow();
    let rowHeadM = tHeadM.insertRow();

    let cell01 = rowHeadL.insertCell();
    let cell011 = rowHeadM.insertCell();
    let cell01Text = document.createTextNode("Name");
    let cell011Text = document.createTextNode("Name");
    cell01.appendChild(cell01Text);
    cell011.appendChild(cell011Text);

    let cell02 = rowHeadL.insertCell();
    let cell022 = rowHeadM.insertCell();
    let cell02Text = document.createTextNode("No. Missed Votes");
    let cell022Text = document.createTextNode("No. Missed Votes");
    cell02.appendChild(cell02Text);
    cell022.appendChild(cell022Text);

    let cell03 = rowHeadL.insertCell();
    let cell033 = rowHeadM.insertCell();
    let cell03Text = document.createTextNode("% Missed");
    let cell033Text = document.createTextNode("% Missed");
    cell03.appendChild(cell03Text);
    cell033.appendChild(cell033Text);
}



function makeTableLeast() {
    let lvp10 = lvpList.slice(0, (lvpList.length * 0.10)); // Slicing the list at the 10th% of the list and rename this action as mvp10
    console.log("lvp10: " + lvp10);


    for (let element of members) {
        let fullName = element.first_name + " " + element.middle_name + " " + element.last_name;
        // Create a variable that includes the three values of a name
        function fullname() {
            if (element.middle_name === null) {
                return fullName = element.first_name + " " + element.last_name;
            } else {
                return fullName = element.first_name + " " + element.middle_name + " " + element.last_name;
            }
        };
        fullname(fullName);

        for (let i = 0; i <= lvp10.length; i++) {
            if (lvp10[i] === lvp10[i - 1]) {
                continue;
            } else if (element.missed_votes_pct === lvp10[i]) {
                let rowL = tableL.insertRow()
                let url = members.url;

                let cell1L = rowL.insertCell();
                let a = document.createElement("a");
                let cell1LText = document.createTextNode(fullName);
                a.appendChild(cell1LText);
                a.href = url;
                a.target = "_blank";
                cell1L.appendChild(a);

                let cell2L = rowL.insertCell();
                let cell2LText = document.createTextNode(element.missed_votes)
                cell2L.appendChild(cell2LText);

                let cell3L = rowL.insertCell();
                let cell3LText = document.createTextNode(element.missed_votes_pct)
                cell3L.appendChild(cell3LText);

                rowL.appendChild(cell1L);
                rowL.appendChild(cell2L);
                rowL.appendChild(cell3L);


                tableL.appendChild(rowL);
            } else {
                continue;
            }


        };


    }
}




function makeTableMost() {
    let mvp10 = mvpList.slice(0, (mvpList.length * 0.10)); // Slicing the list at the 10th% of the list and rename this action as mvp10
    console.log("mvp10: " + mvp10);


    for (let element of members) {
        let fullName = element.first_name + " " + element.middle_name + " " + element.last_name;
        // Create a variable that includes the three values of a name
        function fullname() {
            if (element.middle_name === null) {
                return fullName = element.first_name + " " + element.last_name;
            } else {
                return fullName = element.first_name + " " + element.middle_name + " " + element.last_name;
            }
        };
        fullname(fullName);

        for (let i = 0; i <= mvp10.length; i++) {
            if (mvp10[i] === mvp10[i - 1]) {
                continue;
            } else if (element.missed_votes_pct === mvp10[i]) {
                let rowM = tableM.insertRow()
                let url = members.url;

                let cell1M = rowM.insertCell();
                let a = document.createElement("a");
                let cell1MText = document.createTextNode(fullName);
                a.appendChild(cell1MText);
                a.href = url;
                a.target = "_blank";
                cell1M.appendChild(a);

                let cell2M = rowM.insertCell();
                let cell2MText = document.createTextNode(element.missed_votes)
                cell2M.appendChild(cell2MText);

                let cell3M = rowM.insertCell();
                let cell3MText = document.createTextNode(element.missed_votes_pct)
                cell3M.appendChild(cell3MText);

                rowM.appendChild(cell1M);
                rowM.appendChild(cell2M);
                rowM.appendChild(cell3M);


                tableM.appendChild(rowM);


            } else {
                continue;
            }

        }

    }
}