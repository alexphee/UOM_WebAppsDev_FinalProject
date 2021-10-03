//Για το γράφημα
function BuildChart(labels, values, chartTitle) {
  var ctx = document.getElementById("myChartS").getContext('2d');
  var myChartS = new Chart(ctx, {
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
        maintainAspectRatio: false, 
        scales:{
            yAxes:[{ticks:{beginAtZero:true}}]
        }
    }
});
  return myChartS;
}

function theChart(){
var table = document.getElementById('TableSwimming');
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
var chart = BuildChart(labels, values, "Swimming time");
}

//Ταξινόμηση
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("TableSwimming");
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
    var table = document.getElementById("TableSwimming")
   sumVal = 0;
   for(var i = 1; i < table.rows.length; i++){
      sumVal = sumVal + parseInt(table.rows[i].cells[1].innerHTML);
    }
document.getElementById("Stotdist").innerHTML =  sumVal;
window.localStorage.setItem('Stest', sumVal);
}

function TotalTime() {
    var table = document.getElementById("TableSwimming")
   sumVal = 0;
   for(var i = 1; i < table.rows.length; i++){
      sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
    }
document.getElementById("Stottime").innerHTML =  sumVal;
window.localStorage.setItem('Sttime', sumVal);
}

//Εισαγωγή δεδομένων
table4 = document.getElementById("TableSwimming");
if(localStorage.tableDatas==undefined){localStorage.tableDatas=table4.innerHTML};
table4.innerHTML = localStorage.tableDatas;  

function InsertDataT1() {
var tables = document.getElementById("TableSwimming");
var len=tables.length;
var row = tables.insertRow(len);
var cell1s = row.insertCell(0);
var cell2s = row.insertCell(1);
var cell3s = row.insertCell(2);
var cell4s = row.insertCell(3);
cell1s.innerHTML = document.querySelector('#Sday').value;
cell2s.innerHTML = document.querySelector('#Sdistance').value;
cell3s.innerHTML = document.querySelector('#Stime').value;
cell4s.innerHTML = `<a onClick="onDelete(this)">Delete</a>`;
localStorage.tableDatas=tables.innerHTML; 
resetForm();
}

function resetForm() {
    document.getElementById("Sday").value = "";
    document.getElementById("Sdistance").value = "";
    document.getElementById("Stime").value = "";
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("TableSwimming").deleteRow(row.rowIndex);
        window.localStorage.removeItem('tableDatas');
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
  table = document.getElementById("TableSwimming");
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

