//Για το γράφημα
function BuildChart(labels, values, chartTitle) {
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: chartTitle,
              data: values, 
              backgroundColor: [ 
                  'rgb(123, 0, 180, 0.5)'
              ],
              borderColor: [ 
                 
                  'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1 
          }]
      },
      options: {
        responsive: true, 
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
        scales:{
            yAxes:[{ticks:{beginAtZero:true}}]
        }
    }
});
  return myChart;
}


function theChart(){
var table = document.getElementById('TableExercise');
var json = []; //Η πρώτη σειρά πρέπει να είναι th
var headers = [];
for (var i = 0; i < table.rows[0].cells.length; i++) {
  headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
}

for (var i = 1; i < table.rows.length; i++) {
  var tableRow = table.rows[i];
  var rowData = {};
  for (var j = 0; j < tableRow.cells.length-1; j++) {
      rowData[headers[j]] = tableRow.cells[j].innerHTML;
  }
  json.push(rowData);
}
console.log(json);

var labels = json.map(function (e) {
  return e.day;
});
console.log(labels);

var values = json.map(function (e) {
  return e.time;
});
console.log(values);
var chart = BuildChart(labels, values, "Workout time");
}

//Για το δεύτερο γράφημα
function SecondChart(){
  var table = document.getElementById("TableExercise")
  SumChest = 0;
  SumBack = 0;
  SumArms = 0;
  SumLegs = 0;

var xValues = ["Chest", "Back", "Arms", "Legs"];
var yValues = [0, 0, 0, 0];
var barColors = ['rgba(153, 102, 255, 1)', 'rgba(183, 102, 255, 1)','rgba(203, 102, 255, 1)','rgba(233, 102, 255, 1)'];
for(var i = 1; i < table.rows.length; i++){
  if(table.rows[i].cells[1].innerHTML=='Chest'){SumChest++;yValues[0]=SumChest}
  if(table.rows[i].cells[1].innerHTML=='Back'){SumBack++;yValues[1]=SumBack}
  if(table.rows[i].cells[1].innerHTML=='Arms'){SumArms++;yValues[2]=SumArms}
  if(table.rows[i].cells[1].innerHTML=='Legs'){SumLegs++;yValues[3]=SumLegs}
}
new Chart("myChart2", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    responsive: true, 
        maintainAspectRatio: false, 
        scales:{
            yAxes:[{ticks:{beginAtZero:true}}]
        },
    title: {
      display: true,
      text: "Muscle group focus"
    }
  }
});
}

//Ταξινόμηση
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("TableExercise");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }} else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }}}
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }}}}

//Υπολογισμός στατιστικών
function TotalTime() {
  var table = document.getElementById("TableExercise")
 sumVal = 0;
 for(var i = 1; i < table.rows.length; i++){
    sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
  }
document.getElementById("tottime").innerHTML =  sumVal;
window.localStorage.setItem('Ettime', sumVal);
}

//Εισαγωγή δεδομένων
table2 = document.getElementById("TableExercise");
if(localStorage.tableDatag==undefined){localStorage.tableDatag=table2.innerHTML};
table2.innerHTML = localStorage.tableDatag;  

function InsertDataT1() {
var tableg = document.getElementById("TableExercise");
var len=tableg.length;
var row = tableg.insertRow(len);
var cell1g = row.insertCell(0);
var cell2g = row.insertCell(1);
var cell3g = row.insertCell(2);
var cell4g = row.insertCell(3);
cell1g.innerHTML = document.querySelector('#day').value;
cell2g.innerHTML = document.querySelector('#distance').value;
cell3g.innerHTML = document.querySelector('#time').value;
cell4g.innerHTML = `<a onClick="onDelete(this)">Delete</a>`;
localStorage.tableDatag=tableg.innerHTML; 
resetForm();
}

function resetForm() {
  document.getElementById("day").value = "";
  document.getElementById("distance").value = "";
  document.getElementById("time").value = "";
}

function onDelete(td) {
  if (confirm('Are you sure to delete this record ?')) {
      row = td.parentElement.parentElement;
      document.getElementById("TableExercise").deleteRow(row.rowIndex);
      window.localStorage.removeItem('tableDatag');
      resetForm();
  }
}


//απόκρυψη γραφημάτων
function hideMe() {
  var x = document.getElementById('chartArea');
  if (x.style.display === 'none'){
    window.location.reload(); 
  }
  else
      x.style.display = 'none';
}

//Φιλτράρισμα ανά ημέρα
function filterDay() {
  let dropdown, table, rows, cells1, day, filter;
  dropdown = document.getElementById("daysDropdown");
  table = document.getElementById("TableExercise");
  rows = table.getElementsByTagName("tr");
  filter = dropdown.value;

  for (let row of rows) { 
    cells1 = row.getElementsByTagName("td");
    day = cells1[0] || null; 
    if (filter === "All" || !day || (filter === day.textContent)) {
      row.style.display = "";
    }
    else {
      row.style.display = "none"; 
    }
  }
}

//var longestDist = 0;


window.onload = TotalTime();
window.onload = theChart();
window.onload = SecondChart();
window.onload = filterDay();
