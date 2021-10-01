//Για το γράφημα
function BuildChart(labels, values, chartTitle) {
    var ctx = document.getElementById("myChartR").getContext('2d');
    var myChartR = new Chart(ctx, {
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
    return myChartR;
  }
  
  
  function theChart(){
  var table = document.getElementById('TableRunning');
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
  var chart = BuildChart(labels, values, "Running time");
  }
  
  //Ταξινόμηση
  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("TableRunning");
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
    var table = document.getElementById("TableRunning")
   sumVal = 0;
   for(var i = 1; i < table.rows.length; i++){
      sumVal = sumVal + parseInt(table.rows[i].cells[1].innerHTML);
    }
  document.getElementById("Rtotdist").innerHTML =  sumVal;
  window.localStorage.setItem('Rtest', sumVal);
  }
  
  function TotalTime() {
    var table = document.getElementById("TableRunning")
   sumVal = 0;
   for(var i = 1; i < table.rows.length; i++){
      sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
    }
  document.getElementById("Rtottime").innerHTML =  sumVal;
  window.localStorage.setItem('Rttime', sumVal);

  }
  
  //Εισαγωγή δεδομένων
  table2 = document.getElementById("TableRunning");
  if(localStorage.tableDatar==undefined){localStorage.tableDatar=table2.innerHTML};
  table2.innerHTML = localStorage.tableDatar;  
  
  function InsertDataT1() {
  var tabler = document.getElementById("TableRunning");
  var len=tabler.length;
  var row = tabler.insertRow(len);
  var cell1r = row.insertCell(0);
  var cell2r = row.insertCell(1);
  var cell3r = row.insertCell(2);
  var cell4r = row.insertCell(3);
  cell1r.innerHTML = document.querySelector('#Rday').value;
  cell2r.innerHTML = document.querySelector('#Rdistance').value;
  cell3r.innerHTML = document.querySelector('#Rtime').value;
  cell4r.innerHTML = `<a onClick="onDelete(this)">Delete</a>`;
  localStorage.tableDatar=tabler.innerHTML; 
  resetForm();
  }
  
  function resetForm() {
    document.getElementById("Rday").value = "";
    document.getElementById("Rdistance").value = "";
    document.getElementById("Rtime").value = "";
  }
  
  function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("TableRunning").deleteRow(row.rowIndex);
        window.localStorage.removeItem('tableDatar');
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
  table = document.getElementById("TableRunning");
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

  