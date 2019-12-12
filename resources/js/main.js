//====================== Fetch data general function ======================
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
    await fetch(api_url, {
            method: "GET",
            headers: {
                "X-API-key": "CoA9BlnMvipImxDh0XmQSmz9EcwJwtqvGrjlhvSI"
            }
        })
        .then(response => response.json())
        .then(function (data) {
            members = data.results[0].members;
            return members;
        })
        .catch(error => console.error(error))
};

//====================== Fetch data for pages ====================== 
let currentPage = window.location.pathname;

switch (true) {
    case currentPage.includes("data"):
        let filteredStates = [];
        let optionList = ["All"];
        let dropdown = document.querySelector(".select-state");
        let filteredMembers = [];

        document.getElementById("alert").style.display = "none";

        fetchData(api_url)
            .then(function (data) {
                dropdown.addEventListener("change", filterData);

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
                    let independent = document.querySelector("input[value=independent]");
                    let democrat = document.querySelector("input[value=democrat]");
                    let republican = document.querySelector("input[value=republican]");
                    let checkBoxes = [democrat, republican, independent];
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
                    for (let i = 0; i < checkBoxes.length; i++) {
                        checkBoxes[i].addEventListener("change", filterData);
                    }
                }

                function makeTable(x) {
                    let table = document.getElementById("table-data");
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

                filterStates();
                createOption();
                filterData();
                makeTable(members, filteredMembers);
                // makeTable(filteredMembers);
            })
            .catch(error => console.error(error));
    case currentPage.includes("attendance") || currentPage.includes("loyalty"):
        fetchData(api_url)
            .then(function (data) {
                document.getElementById("loader").style.visibility = "hidden";

                function getList() {
                    let demList = 0;
                    let repList = 0;
                    let indList = 0;
                    let demAvgVWP = 0;
                    let repAvgVWP = 0;
                    let indAvgVWP = 0;
                    let totAvgVWP = 0;
                    for (let element of members) {
                        if (element.party === "D") {
                            demList++;
                        } else if (element.party == "R") {
                            repList++;
                        } else {
                            indList++;
                        }
                    }
                    let totNum = demList + repList + indList;
                    // }

                    // function getAvg() {
                    for (let element of members) {
                        let vwp = element.votes_with_party_pct;
                        if (element.party === "D") {
                            demAvgVWP += vwp;
                        } else if (element.party === "R") {
                            repAvgVWP += vwp;
                        } else {
                            indAvgVWP += vwp;
                        }
                        totAvgVWP += vwp;
                    }

                    demAvgVWP /= demList;
                    repAvgVWP /= repList;
                    indAvgVWP /= indList;
                    totAvgVWP /= members.length
                }

                function makeGlanceTable() {
                    let tableG = document.getElementById("att-loy-glance");

                    let tHead = tableG.createTHead();
                    let rowHead = tHead.insertRow();

                    let cell01 = rowHead.insertCell();
                    let cellText01 = document.createTextNode("Party");
                    cell01.appendChild(cellText01);

                    let cell02 = rowHead.insertCell();
                    let cellText02 = document.createTextNode("No. of Reps ");
                    cell02.appendChild(cellText02);

                    let cell03 = rowHead.insertCell();
                    let cellText03 = document.createTextNode("% Voted w/ Party");
                    cell03.appendChild(cellText03);

                    for (let partyName in statistics) {
                        let row = tableG.insertRow();

                        let cell1 = row.insertCell();
                        let cell1Text = document.createTextNode(`${partyName}`);
                        cell1.appendChild(cell1Text);

                        let cell2 = row.insertCell();
                        let cell2Text = document.createTextNode(`${statistics[partyName].sen_att_num}`);
                        cell2.appendChild(cell2Text);

                        let cell3 = row.insertCell();
                        let cell3Text = document.createTextNode(`${statistics[partyName].sen_att_votes}` + "%");
                        cell3.appendChild(cell3Text);

                        row.appendChild(cell1);
                        row.appendChild(cell2);
                        row.appendChild(cell3);

                        tableG.appendChild(row);
                    }
                }

                function makeTableLeast() {
                    let tableL = document.getElementById("att-loy-l");
                    let lvpList = [];
                    let tableM = document.getElementById("att-loy-m");

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

                    for (let element of members) {
                        lvpList.push(element.missed_votes_pct);


                        lvpList = lvpList.sort((a, b) => {
                            return b - a;
                        });

                    }

                    let lvp10 = lvpList.slice(0, (lvpList.length * 0.10));

                    for (let element of members) {
                        let fullName = element.first_name + " " + element.middle_name + " " + element.last_name;

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
                    let tableM = document.getElementById("att-loy-m");
                    let mvpList = [];
                    for (let element of members) {
                        mvpList.push(element.missed_votes_pct);


                        mvpList = mvpList.sort((a, b) => {
                            return a - b;
                        });
                    }

                    let mvp10 = mvpList.slice(0, (mvpList.length * 0.10));
                    for (let element of members) {
                        let fullName = element.first_name + " " + element.middle_name + " " + element.last_name;

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
                getList();
                // getAvg();
                makeGlanceTable();
                // getLeast(lvpList, mvpList);
                // makeHeaderLM();
                makeTableLeast();
                makeTableMost();
            })
            .catch(error => console.error(error));
}

//====================== functions Congress page ======================
// function filterStates() {
//     for (i = 0; i < members.length; i++) {
//         filteredStates.push(members[i].state);
//     }
//     filteredStates = filteredStates.sort()
// }

// function createOption() {
//     for (let i = 0; i < filteredStates.length; i++) {
//         for (let j = 0; j < filteredStates.length; j++) {
//             if (filteredStates[i] === filteredStates[j] && !optionList.includes(filteredStates[i])) {
//                 optionList.push(filteredStates[j])
//             }
//         }
//     }

//     for (let i = 0; i < optionList.length; i++) {
//         let option = document.createElement("option");
//         option.text = optionList[i];
//         option.value = optionList[i];
//         dropdown.appendChild(option);
//     }
// }

// function filterData() {
//     let independent = document.querySelector("input[value=independent]");
//     let democrat = document.querySelector("input[value=democrat]");
//     let republican = document.querySelector("input[value=republican]");
//     let checkBoxes = [democrat, republican, independent];
//     filteredMembers.length = 0;
//     document.getElementById("alert").style.display = "none"
//     for (let i = 0; i < members.length; i++) {
//         if (dropdown.value === members[i].state || dropdown.value === "All") {
//             if (checkBoxes[0].checked === true && members[i].party === "D") {
//                 filteredMembers.push(members[i]);
//             } else if (checkBoxes[1].checked === true && members[i].party === "R") {
//                 filteredMembers.push(members[i]);
//             } else if (checkBoxes[2].checked === true && members[i].party === "I") {
//                 filteredMembers.push(members[i]);
//             } else if (checkBoxes[0].checked === false && checkBoxes[1].checked === false && checkBoxes[2].checked === false) {
//                 document.getElementById("alert").style.display = "block"
//                 document.getElementById("alert").style.color = "red"
//             }
//         }
//     }
//     makeTable(filteredMembers);
// }

// function makeTable(x) {
//     let table = document.getElementById("table-data");
//     document.getElementById("table-data").innerHTML = "";

//     let tHead = table.createTHead();
//     let rowHead = tHead.insertRow();

//     let cell01 = rowHead.insertCell();
//     let cellText01 = document.createTextNode("Name");
//     cell01.appendChild(cellText01);

//     let cell02 = rowHead.insertCell();
//     let cellText02 = document.createTextNode("Party");
//     cell02.appendChild(cellText02);

//     let cell03 = rowHead.insertCell();
//     let cellText03 = document.createTextNode("State");
//     cell03.appendChild(cellText03);

//     let cell04 = rowHead.insertCell();
//     let cellText04 = document.createTextNode("Years in Office");
//     cell04.appendChild(cellText04);

//     let cell05 = rowHead.insertCell();
//     let cellText05 = document.createTextNode("% Votes w/ Party");
//     cell05.appendChild(cellText05);

//     for (let i = 0; i < x.length; i++) {

//         let row = table.insertRow();
//         let url = x.url;
//         let fullName = x.first_name + " " + x.middle_name + " " + x.last_name;

//         function fullname() {
//             if (x[i].middle_name === null) {
//                 return fullName = x[i].first_name + " " + x[i].last_name;
//             } else {
//                 return fullName = x[i].first_name + " " + x[i].middle_name + " " + x[i].last_name;
//             }
//         };
//         fullname(fullName);

//         let cell1 = row.insertCell();
//         let a = document.createElement("a");
//         let cellText1 = document.createTextNode(fullname());
//         a.appendChild(cellText1);
//         a.href = url;
//         a.target = "_blank";
//         cell1.appendChild(a);

//         let cell2 = row.insertCell();
//         let cellText2 = document.createTextNode(x[i].party);
//         cell2.appendChild(cellText2);

//         let cell3 = row.insertCell();
//         let cellText3 = document.createTextNode(x[i].state);
//         cell3.appendChild(cellText3);

//         let cell4 = row.insertCell();
//         let cellText4 = document.createTextNode(x[i].seniority);
//         cell4.appendChild(cellText4);

//         let cell5 = row.insertCell();
//         let cellText5 = document.createTextNode(x[i].votes_with_party_pct + "%");
//         cell5.appendChild(cellText5);

//         row.appendChild(cell1);
//         row.appendChild(cell2);
//         row.appendChild(cell3);
//         row.appendChild(cell4);
//         row.appendChild(cell5);

//         table.appendChild(row);
//     }
// }

//==================== functions Attendance and Loyalty pages ====================
// function getList() {
//     let demList = 0;
//     let repList = 0;
//     let indList = 0;
//     let demAvgVWP = 0;
//     let repAvgVWP = 0;
//     let indAvgVWP = 0;
//     let totAvgVWP = 0;
//     for (let element of members) {
//         if (element.party === "D") {
//             demList++;
//         } else if (element.party == "R") {
//             repList++;
//         } else {
//             indList++;
//         }
//     }
//     let totNum = demList + repList + indList;
//     // }

//     // function getAvg() {
//     for (let element of members) {
//         let vwp = element.votes_with_party_pct;
//         if (element.party === "D") {
//             demAvgVWP += vwp;
//         } else if (element.party === "R") {
//             repAvgVWP += vwp;
//         } else {
//             indAvgVWP += vwp;
//         }
//         totAvgVWP += vwp;
//     }

//     demAvgVWP /= demList;
//     repAvgVWP /= repList;
//     indAvgVWP /= indList;
//     totAvgVWP /= members.length
// }

// function makeGlanceTable() {
//     let tHead = tableG.createTHead();
//     let rowHead = tHead.insertRow();

//     let cell01 = rowHead.insertCell();
//     let cellText01 = document.createTextNode("Party");
//     cell01.appendChild(cellText01);

//     let cell02 = rowHead.insertCell();
//     let cellText02 = document.createTextNode("No. of Reps ");
//     cell02.appendChild(cellText02);

//     let cell03 = rowHead.insertCell();
//     let cellText03 = document.createTextNode("% Voted w/ Party");
//     cell03.appendChild(cellText03);

//     for (let partyName in statistics) {
//         let row = tableG.insertRow();

//         let cell1 = row.insertCell();
//         let cell1Text = document.createTextNode(`${partyName}`);
//         cell1.appendChild(cell1Text);

//         let cell2 = row.insertCell();
//         let cell2Text = document.createTextNode(`${statistics[partyName].sen_att_num}`);
//         cell2.appendChild(cell2Text);

//         let cell3 = row.insertCell();
//         let cell3Text = document.createTextNode(`${statistics[partyName].sen_att_votes}` + "%");
//         cell3.appendChild(cell3Text);

//         row.appendChild(cell1);
//         row.appendChild(cell2);
//         row.appendChild(cell3);

//         tableG.appendChild(row);
//     }
// }

// function getLeast(x) {
//     for (let element of members) {
//         lvpList.push(element.missed_votes_pct);
//         mvpList.push(element.missed_votes_pct);

//         lvpList = lvpList.sort((a, b) => {
//             return b - a;
//         });
//         mvpList = mvpList.sort((a, b) => {
//             return a - b;
//         });
//     }
// }

// function makeHeaderLM() {

// }

// function makeTableLeast() {
//     let tableL = document.getElementById("att-loy-l");
//     let lvpList = [];

//     let tHeadL = tableL.createTHead();
//     let tHeadM = tableM.createTHead();
//     let rowHeadL = tHeadL.insertRow();
//     let rowHeadM = tHeadM.insertRow();

//     let cell01 = rowHeadL.insertCell();
//     let cell011 = rowHeadM.insertCell();
//     let cell01Text = document.createTextNode("Name");
//     let cell011Text = document.createTextNode("Name");
//     cell01.appendChild(cell01Text);
//     cell011.appendChild(cell011Text);

//     let cell02 = rowHeadL.insertCell();
//     let cell022 = rowHeadM.insertCell();
//     let cell02Text = document.createTextNode("No. Missed Votes");
//     let cell022Text = document.createTextNode("No. Missed Votes");
//     cell02.appendChild(cell02Text);
//     cell022.appendChild(cell022Text);

//     let cell03 = rowHeadL.insertCell();
//     let cell033 = rowHeadM.insertCell();
//     let cell03Text = document.createTextNode("% Missed");
//     let cell033Text = document.createTextNode("% Missed");
//     cell03.appendChild(cell03Text);
//     cell033.appendChild(cell033Text);

//     for (let element of members) {
//         lvpList.push(element.missed_votes_pct);


//         lvpList = lvpList.sort((a, b) => {
//             return b - a;
//         });

//     }

//     let lvp10 = lvpList.slice(0, (lvpList.length * 0.10));

//     for (let element of members) {
//         let fullName = element.first_name + " " + element.middle_name + " " + element.last_name;

//         function fullname() {
//             if (element.middle_name === null) {
//                 return fullName = element.first_name + " " + element.last_name;
//             } else {
//                 return fullName = element.first_name + " " + element.middle_name + " " + element.last_name;
//             }
//         };
//         fullname(fullName);

//         for (let i = 0; i <= lvp10.length; i++) {
//             if (lvp10[i] === lvp10[i - 1]) {
//                 continue;
//             } else if (element.missed_votes_pct === lvp10[i]) {
//                 let rowL = tableL.insertRow()
//                 let url = members.url;

//                 let cell1L = rowL.insertCell();
//                 let a = document.createElement("a");
//                 let cell1LText = document.createTextNode(fullName);
//                 a.appendChild(cell1LText);
//                 a.href = url;
//                 a.target = "_blank";
//                 cell1L.appendChild(a);

//                 let cell2L = rowL.insertCell();
//                 let cell2LText = document.createTextNode(element.missed_votes)
//                 cell2L.appendChild(cell2LText);

//                 let cell3L = rowL.insertCell();
//                 let cell3LText = document.createTextNode(element.missed_votes_pct)
//                 cell3L.appendChild(cell3LText);

//                 rowL.appendChild(cell1L);
//                 rowL.appendChild(cell2L);
//                 rowL.appendChild(cell3L);


//                 tableL.appendChild(rowL);
//             } else {
//                 continue;
//             }
//         };
//     }
// }

// function makeTableMost() {
//     for (let element of members) {
//         mvpList.push(element.missed_votes_pct);


//         mvpList = mvpList.sort((a, b) => {
//             return a - b;
//         });
//     }

//     let mvp10 = mvpList.slice(0, (mvpList.length * 0.10));
//     for (let element of members) {
//         let fullName = element.first_name + " " + element.middle_name + " " + element.last_name;

//         function fullname() {
//             if (element.middle_name === null) {
//                 return fullName = element.first_name + " " + element.last_name;
//             } else {
//                 return fullName = element.first_name + " " + element.middle_name + " " + element.last_name;
//             }
//         };
//         fullname(fullName);

//         for (let i = 0; i <= mvp10.length; i++) {
//             if (mvp10[i] === mvp10[i - 1]) {
//                 continue;
//             } else if (element.missed_votes_pct === mvp10[i]) {
//                 let rowM = tableM.insertRow()
//                 let url = members.url;

//                 let cell1M = rowM.insertCell();
//                 let a = document.createElement("a");
//                 let cell1MText = document.createTextNode(fullName);
//                 a.appendChild(cell1MText);
//                 a.href = url;
//                 a.target = "_blank";
//                 cell1M.appendChild(a);

//                 let cell2M = rowM.insertCell();
//                 let cell2MText = document.createTextNode(element.missed_votes)
//                 cell2M.appendChild(cell2MText);

//                 let cell3M = rowM.insertCell();
//                 let cell3MText = document.createTextNode(element.missed_votes_pct)
//                 cell3M.appendChild(cell3MText);

//                 rowM.appendChild(cell1M);
//                 rowM.appendChild(cell2M);
//                 rowM.appendChild(cell3M);

//                 tableM.appendChild(rowM);
//             } else {
//                 continue;
//             }
//         }
//     }
// }