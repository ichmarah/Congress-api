let table = document.getElementById("senate-data");
let members = data.results[0].members;
console.log(members);
// Get reference to the table
// Declare members for easy use
//[0] because results and members have only one element index




// Create table Senate
function makeTable(x, y) {

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
    for (let element of members) {
        // A variable created called "element" to provide the value of each index item (index item is object itself)
        let row = table.insertRow();
        // A row is created for every index item (that is a property of the nested object "members")

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
        // Change value of fullName depending on the conditional if the middle_name is "null"

        let url = element.url;
        // Create reference to URL

        let cell1 = row.insertCell(); //Create a cell and inser it into the row
        let a = document.createElement("a"); // Create an anchor tag, <a>
        let cellText1 = document.createTextNode(fullName); // In this anchor tag, create e TextNode. Does not matter if <a> is before/after this line, because it will be appended to the anchor anyway.
        a.appendChild(cellText1); // Append the TextNode to the <a>
        a.href = url; // Set the href of the <a>, which is the variable url
        a.target = "_blank"; // Opening the link should be in a new tab
        cell1.appendChild(a); // Append the <a> to the cell

        let cell2 = row.insertCell();
        let cellText2 = document.createTextNode(element.party);
        cell2.appendChild(cellText2);

        let cell3 = row.insertCell();
        let cellText3 = document.createTextNode(element.state);
        cell3.appendChild(cellText3);

        let cell4 = row.insertCell();
        let cellText4 = document.createTextNode(element.seniority);
        cell4.appendChild(cellText4);

        let cell5 = row.insertCell();
        let cellText5 = document.createTextNode(element.votes_with_party_pct + "%");
        cell5.appendChild(cellText5);

        row.appendChild(cell1); // Add the cells with the text to the row
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        table.appendChild(row); // Add the row to the table
    }

}

makeTable(table, members);




// let independent = document.getElementById("independent");
// let democrat = document.getElementById("democrat");
// let republican = document.getElementById("republican");

// democrat.addEventListener("click", function () {
//     filterData();
// });
// republican.addEventListener("click", function () {
//     filterData();
// });
// independent.addEventListener("click", function () {
//     filterData();
// });

// function filterData() {
//     var filteredData = [];
//     for (let element of members) {
//         if (democrat.checked == true && element.party == "D") {
//             filteredData.push(element);
//         } else if (republican.checked == true && element.party == "R") {
//             filteredData.push(element);
//         } else if (independent.checked == true && element.party == "I") {
//             filteredData.push(element);
//         } else if (independent.checked == false && democrat.checked == false && republican.checked == false) {
//             document.getElementById('alert').style.display = 'block';
//         };
//     }
//     return filteredData;
//     // console.log(filteredData);
// }


// let checkBoxes = ["democrat", "republican", "independent"]

// function filterData(array, table) {
//     for (let i = 0; i < array.length; i++) {
//         if (checkBoxes[i].checked === false) {
            
//         }
        
//     }
// }
// fileterData(checkBoxes, table)