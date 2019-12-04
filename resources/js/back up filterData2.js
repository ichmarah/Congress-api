let table = document.getElementById("senate-data");
let members = data.results[0].members;
let independent = document.getElementById("independent");
let democrat = document.getElementById("democrat");
let republican = document.getElementById("republican");
let checkBoxes = [democrat, republican, independent];
let filteredMembers = [];

checkBoxes[0].addEventListener("change", function () {
    makeTable(filterData());
});


function filterData() {
    for (let i = 0; i < members.length; i++) {
        if (checkBoxes[0].checked === true && members[i].party === "D") {
            filteredMembers.push(members[i]);
        }
        // } else if (checkBoxes[1].checked === true && members[i].party === "R") {
        //     filteredMembers.push(members[i]);
        // } else if (checkBoxes[2].checked === true && members[i].party === "I") {
        //     filteredMembers.push(members[i]);
        // };
    }
    return filteredMembers;
    // console.log(filteredMembers);
}
filterData();


// Create table Senate
function makeTable(x) {
 

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
    for (let i = 0; i < filteredMembers.length; i++) {

        let row = table.insertRow();
        let url = filteredMembers.url;
        let fullName = filteredMembers.first_name + " " + filteredMembers.middle_name + " " + filteredMembers.last_name;

        function fullname() {
            if (filteredMembers[i].middle_name === null) {
                return fullName = filteredMembers[i].first_name + " " + filteredMembers[i].last_name;
            } else {
                return fullName = filteredMembers[i].first_name + " " + filteredMembers[i].middle_name + " " + filteredMembers[i].last_name;
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
        let cellText2 = document.createTextNode(filteredMembers[i].party);
        cell2.appendChild(cellText2);

        let cell3 = row.insertCell();
        let cellText3 = document.createTextNode(filteredMembers[i].state);
        cell3.appendChild(cellText3);

        let cell4 = row.insertCell();
        let cellText4 = document.createTextNode(filteredMembers[i].seniority);
        cell4.appendChild(cellText4);

        let cell5 = row.insertCell();
        let cellText5 = document.createTextNode(filteredMembers[i].votes_with_party_pct + "%");
        cell5.appendChild(cellText5);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        table.appendChild(row);


    }
}
makeTable(filteredMembers);

// Create filter for each party







// democrat.addEventListener("click", function () {

// });

// republican.addEventListener("click", function () {
//     filterData()
// });

// independent.addEventListener("click", function () {
//     filterData()
// });