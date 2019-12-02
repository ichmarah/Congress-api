let table = document.getElementById("senate-loy-glance");
let tableL = document.getElementById("senate-loy-l");
let tableM = document.getElementById("senate-loy-m");
let members = data.results[0].members;

// Get number of members in each party
// Use zero as start for summing up the amount of Ds, Rs, and Is
let demList = 0;
let repList = 0;
let indList = 0;

function getList() {
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
getList();




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
        console.log("vwp: " + vwp);
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
        let cell2Text = document.createTextNode(`${statistics[partyName].sen_att_num}`);
        console.log(cell2Text);
        cell2.appendChild(cell2Text);

        let cell3 = row.insertCell();
        let cell3Text = document.createTextNode(`${statistics[partyName].sen_att_votes}` + "%");
        console.log(cell3Text);
        cell3.appendChild(cell3Text);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        table.appendChild(row);
    }
}
makeGlanceTable();



let llpList = []; //least loyal percentage. create an empty array to push the sorted values in the array
let mlpList = [];

function getLeast(x, y) {
    for (let element of members) {
        llpList.push(element.votes_with_party_pct);
        mlpList.push(element.votes_with_party_pct);


        llpList = llpList.sort((a, b) => {
            return a - b;
        });

        mlpList = mlpList.sort((a, b) => {
            return b - a;
        });
    }
    console.log("Sorted lvpList: " + llpList);
    console.log("Sorted mvpList: " + mlpList);
}
getLeast(llpList, mlpList);



let llp10 = llpList.slice(0, (llpList.length * 0.10)); // Slicing the list at the 10th% of the list and rename this action as mvp10
console.log("llp10: " + llp10);
let mlp10 = mlpList.slice(0, (mlpList.length * 0.10)); // Slicing the list at the 10th% of the list and rename this action as mvp10
console.log("mlp10: " + mlp10);



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
    let cell02Text = document.createTextNode("No. Party Votes");
    let cell022Text = document.createTextNode("No. Party Votes");
    cell02.appendChild(cell02Text);
    cell022.appendChild(cell022Text);

    let cell03 = rowHeadL.insertCell();
    let cell033 = rowHeadM.insertCell();
    let cell03Text = document.createTextNode("% Party Votes");
    let cell033Text = document.createTextNode("% Party Votes");
    cell03.appendChild(cell03Text);
    cell033.appendChild(cell033Text);
}
makeHeaderLM();




function makeTableLeast() {
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

        for (let i = 0; i <= llp10.length; i++) {
            if (llp10[i] === llp10[i-1]) {
                continue;
            } else if (element.votes_with_party_pct === llp10[i]) {
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
                let cell2LText = document.createTextNode(element.total_votes)
                cell2L.appendChild(cell2LText);

                let cell3L = rowL.insertCell();
                let cell3LText = document.createTextNode(element.votes_with_party_pct)
                cell3L.appendChild(cell3LText);

                rowL.appendChild(cell1L);
                rowL.appendChild(cell2L);
                rowL.appendChild(cell3L);


                tableL.appendChild(rowL);

            }


        };


    }
}
makeTableLeast()



function makeTableMost() {
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

        for (let i = 0; i <= mlp10.length; i++) {
            if (mlp10[i] === mlp10[i-1]) {
                continue;
            } else if (element.votes_with_party_pct === mlp10[i]) {
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
                let cell2MText = document.createTextNode(element.total_votes)
                cell2M.appendChild(cell2MText);

                let cell3M = rowM.insertCell();
                let cell3MText = document.createTextNode(element.votes_with_party_pct)
                cell3M.appendChild(cell3MText);

                rowM.appendChild(cell1M);
                rowM.appendChild(cell2M);
                rowM.appendChild(cell3M);


                tableM.appendChild(rowM);

            }


        };


    }
}
makeTableMost()