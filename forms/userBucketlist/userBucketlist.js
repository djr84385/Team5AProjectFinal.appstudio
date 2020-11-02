req = ""
query = ""
results = ""
pw = "JeremyBIA123"  // put your database password here
userName = "jrp85607"
database = "375groupa5"
currentUserEvents = []

console.log(accountName)

query = "SELECT event_name, description, date_added, date_completed FROM `events` e INNER JOIN bucketlists b ON e.bucket_id = b.bucket_id INNER JOIN `user` u ON u.user_id = b.user_id WHERE u.username = '" + accountName + "';"
console.log(query)

req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + userName + "&pass=" + pw + "&database=" + database + "&query=" + query)

if (req.status == 200) { //transit worked.
  currentUserEvents = JSON.parse(req.responseText)
  console.log(currentUserEvents)
} else
  console.log("error")
  
var dataJson = JSON.stringify(currentUserEvents);

// class values are here:
// http://getbootstrap.com/css/#type-alignment
var columns1 = [
            {title: "Event"},
            {title: "Description"},
            {title: "Date Added"},
            {title: "Date Completed"},
        ];
        
function Main() {
  updateTable();
}

DataTable1.onclick = function(event) {
  if(typeof(event.target._DT_CellIndex) != "object" ) { return; }
 var row,col;
  row = event.target._DT_CellIndex.row;
  col = event.target._DT_CellIndex.column;
  NSB.MsgBox("Click on "  +  row  +  ", "  +  col  +  ". Value is '"  +  currentUserEvents[row][col]  +  "'.");
};

function updateTable() {
  DataTable1.settings.columns = columns1;
  DataTable1.settings.data = currentUserEvents;
  DataTable1.build();
}

Button1.onclick = function() {
  currentUserEvents[0][0] += "+"; //Just to make a change to the table
  updateTable();
};

Button2.onclick = function() {
  var table = $("#DataTable1").DataTable();
  table.clear();

  DataTable1.settings.data = JSON.parse(dataJson);
  DataTable1.settings.data[0][0] = "George";
  setTimeout(loadTable, 50);
};

function loadTable() {
  var table = $("#DataTable1").DataTable();
  table.rows.add(DataTable1.settings.data).draw();
}

Button3.onclick = function() {
  var table;
   table = $("#DataTable1").DataTable();
   $(table.rows().nodes()).removeClass("highlight");
   $(table.cells().nodes()).removeClass("highlight");
   $(table.column(2).nodes()).addClass("highlight");
};

Button4.onclick = function() {
 var table;
   table = $("#DataTable1").DataTable();
   $(table.rows().nodes()).removeClass("highlight");
   $(table.cells().nodes()).removeClass("highlight");
   $(table.row(2).nodes()).addClass("highlight");
};

Fliptoggle1.onchange = function() {
  DataTable1.settings.ordering = Fliptoggle1.value;
  updateTable();
};

Fliptoggle4.onchange = function() {
  DataTable1.settings.paging = Fliptoggle4.value;
  updateTable();
};

Fliptoggle5.onchange = function() {
  DataTable1.settings.searching = Fliptoggle5.value;
  updateTable();
};

