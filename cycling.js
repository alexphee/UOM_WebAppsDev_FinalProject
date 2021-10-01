//Για το γράφημα
function BuildChart(labels, values, chartTitle) {
  var ctx = document.getElementById("myChartC").getContext('2d');
  var myChartC = new Chart(ctx, {
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
  return myChartC;
}

function theChart(){
var table = document.getElementById('TableCycling');
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
  return e.distance;
});
console.log(values);
var chart = BuildChart(labels, values, "Cycling time");
}

//Ταξινόμηση
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("TableCycling");
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
function TotalDistance() {
    var table = document.getElementById("TableCycling")
   sumVal = 0;
   for(var i = 1; i < table.rows.length; i++){
      sumVal = sumVal + parseInt(table.rows[i].cells[1].innerHTML);
    }
document.getElementById("Ctotdist").innerHTML =  sumVal;
window.localStorage.setItem('Ctest', sumVal);
}

function TotalTime() {
    var table = document.getElementById("TableCycling")
   sumVal = 0;
   for(var i = 1; i < table.rows.length; i++){
      sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
    }
document.getElementById("Ctottime").innerHTML =  sumVal;
window.localStorage.setItem('Cttime', sumVal);
}

//Εισαγωγή δεδομένων
table3 = document.getElementById("TableCycling");
if(localStorage.tableDatac==undefined){localStorage.tableDatac=table3.innerHTML};
table3.innerHTML = localStorage.tableDatac;  

function InsertDataT1() {
var tablec = document.getElementById("TableCycling");
var len=tablec.length;
var row = tablec.insertRow(len);
var cell1c = row.insertCell(0);
var cell2c = row.insertCell(1);
var cell3c = row.insertCell(2);
var cell4c = row.insertCell(3);
cell1c.innerHTML = document.querySelector('#Cday').value;
cell2c.innerHTML = document.querySelector('#Cdistance').value;
cell3c.innerHTML = document.querySelector('#Ctime').value;
cell4c.innerHTML = `<a onClick="onDelete(this)">Delete</a>`;
localStorage.tableDatac=tablec.innerHTML; 
resetForm();
}


function resetForm() {
    document.getElementById("Cday").value = "";
    document.getElementById("Cdistance").value = "";
    document.getElementById("Ctime").value = "";
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("TableCycling").deleteRow(row.rowIndex);
        window.localStorage.removeItem('tableDatac');
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
  table = document.getElementById("TableCycling");
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

window.onload = TotalDistance();
window.onload = TotalTime();
window.onload = theChart();
window.onload = filterDay();

