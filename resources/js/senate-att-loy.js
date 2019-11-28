let table = document.getElementById("senate-att-glance");
let tableLM = document.getElementById("senate-att-lm");
let members = data.results[0].members;

// Get number of members in each party
// Use zero as start for summing up the amount of Ds, Rs, and Is
let demList = 0;
let repList = 0;
let indList = 0;

function getList() {
    for (let element of members) {
        // let demD = element.party;
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
getList();



/* 
Calculate the average "votes with party" for each party in percentage
For each party, add the value of the new element to the values of previous element.
Therefore, start with 0 as a basis.
*/
let demAvgVWP = 0;
let repAvgVWP = 0;
let indAvgVWP = 0;

function getAvg() {
    for (let element of members) {
        let vwp = element.votes_with_party_pct; // to make it easier instead of using the long name
        console.log("vwp: " + vwp);
        if (element.party === "D") {
            demAvgVWP += vwp; // Total of the percentages
        } else if (element.party === "R") {
            repAvgVWP += vwp; // Total of the percentages
        } else {
            indAvgVWP += vwp;
        }
    }
    console.log("Sum demAvgVWP: " + demAvgVWP);

    demAvgVWP /= demList // New total of dem percentages is dividing demAvgVWP by the total amount of Ds
    console.log("demAvgVWP: " + demAvgVWP + " %"); // Check up: previous code works

    repAvgVWP /= repList
    console.log("remAvgVWP: " + repAvgVWP + " %");

    indAvgVWP /= indList
    console.log("indAvgVWP: " + indAvgVWP + " %");
}
getAvg();
// demAvgVWP: 96.97052631578948 %
// remAvgVWP: 88.8445652173913 %
// indAvgVWP: 95.17500000000001 %




// Create table Senate  at glance
function makeGlanceTable() {
    // Create table header
    let tHead = table.createTHead();
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

        let row = table.insertRow();

        let cell1 = row.insertCell();
        let cell1Text = document.createTextNode(`${partyName}`); // Text node is the value which the template is referring to
        console.log(cell1Text);
        cell1.appendChild(cell1Text);

        let cell2 = row.insertCell();
        let cell2Text = document.createTextNode(`${statistics[partyName].num}`);
        console.log(cell2Text);
        cell2.appendChild(cell2Text);

        let cell3 = row.insertCell();
        let cell3Text = document.createTextNode(`${statistics[partyName].votes}` + "%");
        console.log(cell3Text);
        cell3.appendChild(cell3Text);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        table.appendChild(row);
    }
}
makeGlanceTable()


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

// Create table with bootom 10% least attendance
function getL10(x, y) {


    for (let element of members) { // for each element in members,
        let lmvp = element.missed_votes_pct; // Give the missed votes pct a variable name of mvp
        // let lmv = element.missed_votes;
        console.log("lvp: " + lmvp); // list of all lmvp values (previous approach works)
        // console.log("lv: " + lmv);
        lvpList.push(lmvp); // for each element in members, push the lmvp value in the empy lvpList array.
        mvpList.push(lmvp);
    }
    console.log("lvpList: " + lvpList); // Check up: previous code works as wanted.
    console.log("mvpList: " + mvpList);

    lvpList = lvpList.sort((a, b) => { //The values in the lvpList array should be sorted from highest number to lowest
        return b - a; // compare function is used to compare the values
    });
    mvpList = mvpList.sort((a, b) => { 
        return a - b;
    });
    console.log("Sorted lvpList: " + lvpList); // Check up: previous code works
    console.log("Sorted mvpList: " + mvpList);
    //`rather than hard-coding 10 (or numbers in general), calculate where the 10th percent is in the array (get the number of elements in array / 10)
    // lvpList = mvpList.slice(0, 10); // show from sorted mvpList the values of index 0 to 10 ( 10% of members.length = 10% of 105 = 10.5)
    // console.log("Sliced lvpList: " + lvpList);

    console.log("Length lvpList: " + lvpList.length); // Check if lengt of mvpList is still 105
    let lvp10 = lvpList.slice(0, (lvpList.length * 0.10)); // Slicing the list at the 10th% of the list and rename this action as mvp10
    let mvp10 = mvpList.slice(0, (mvpList.length * 0.10));
    console.log("lvp10: " + lvp10);
    console.log("mvp10: " + mvp10);
    // lvp10: 76.26,54.55,19.94,17.2,14.63,12.48,11.72,11.57,10.96,10.35
    // mvp10: 0,0,0,0,0.15,0.15,0.29,0.3,0.3,0.3

}
getL10(lvpList, mvpList);




// function makeTables (x, y, z) {

// }
// makeTables(lvpList, lvList, tableLM)





//=======================================
// //Create table
// let tHeadL = tableLeast.createTHead();
// let rowHeadL = tHeadL.insertRow(); // Insert a row to the table header


// let cell01 = rowHeadL.insertCell(); // Insert a cell in on row header
// let cellText01 = document.createTextNode("Name"); // Create text to go in cell
// cell01.appendChild(cellText01); // Add the text in the cell

// let cell02 = rowHeadL.insertCell();
// let cellText02 = document.createTextNode("No. Missed Votes");
// cell02.appendChild(cellText02);

// let cell03 = rowHeadL.insertCell();
// let cellText03 = document.createTextNode("% Missed");
// cell03.appendChild(cellText03);

// for (let i = 0; i <= mvp10.length && i <= mv10.length; i++) {
//     for (let element of members) {

//         let fullName = element.first_name + " " + element.middle_name + " " + element.last_name;
//         // Create a variable that includes the three values of a name
//         function fullname() {
//             if (element.middle_name === null) {
//                 return fullName = element.first_name + " " + element.last_name;
//             } else {
//                 return fullName = element.first_name + " " + element.middle_name + " " + element.last_name;
//             }
//         };
//         fullname(fullName);

//         if (mvp10[i] === element.missed_votes_pct) {
//             let rowL = tableLeast.insertRow();
//             let url = element.url;
//             console.log(url)
//             // Create reference to URL

//             let cell1 = rowL.insertCell(); //Create a cell and inser it into the row
//             let a = document.createElement("a"); // Create an anchor tag, <a>
//             let cellText1 = document.createTextNode(fullName); // In this anchor tag, create e TextNode. Does not matter if <a> is before/after this line, because it will be appended to the anchor anyway.
//             a.appendChild(cellText1); // Append the TextNode to the <a>
//             a.href = url; // Set the href of the <a>, which is the variable url
//             a.target = "_blank"; // Opening the link should be in a new tab
//             cell1.appendChild(a); // Append the <a> to the cell

//             let cell2 = rowL.insertCell();
//             let cellText2 = document.createTextNode(mv10[i]);
//             cell2.appendChild(cellText2);

//             let cell3 = rowL.insertCell();
//             let cellText3 = document.createTextNode(mvp10[i] + "%");
//             cell3.appendChild(cellText3);
//         }
//     }