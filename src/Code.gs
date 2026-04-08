let spreadsheet = new ManagedSpreadsheet();
let sss = SpreadsheetApp.getActive()

function currentVersion() {
  return "6.0.0"
}

function addNew(options) {
  let name = options.name
  let task = options.task
  let firstDate = options.fdate
  let worksheet = spreadsheet.sheet("Master")
  let date = firstDate
  let taskid = makeid(7)
  worksheet.append({ 'Task ID': taskid, 'Name': name, 'Task': task, 'First Date': date, 'Latest Revision': date, 'Total Revisions': 0, 'Status': "Pending" })
  return "Done"
}

function addNext(options) {
  let id = options.id
  let theDate = options.pl
  let dateParts = theDate.split("/");
  var nextDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]); 
  let worksheet = spreadsheet.sheet("Master")
  let date = nextDate.toLocaleDateString("en-GB")
  let task = worksheet.find('Task ID', id)
  let index = worksheet.rowIndex('Task ID', id)
  let revs = task["Total Revisions"]
  let firstDate = task["First Date"]
  let correctWeek = nextDate.getWeek() === firstDate.getWeek()

  if (revs > 1 || !correctWeek) {
    if (revs < 2) {
      task["Total Revisions"] = 2
    }

    task["Status"] = "Week Shifted"

    worksheet.update(index,task)

    worksheet.append({ 'Task ID': makeid(7), 'Name': task["Name"], 'Task': task["Task"], 'First Date': date, 'Latest Revision': date, 'Total Revisions': 0 , 'Status': "Pending"})


  } else {
    if (revs === 0) {
      task["Revision 1"] = date
    } else if (revs === 1) {
      task["Revision 2"] = date
    }
    task["Total Revisions"] = revs + 1
    task["Latest Revision"] = date
  }
  worksheet.update(index, task)

}


function fetch(){
  var tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
  let onlyDate = new Date(tomorrow.getFullYear(),tomorrow.getMonth(),tomorrow.getDate())
  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName("Master")
  let data = sheet.getRange(2,1,sheet.getLastRow(),9).getValues()
  let pending = data.filter(function(row){
    let task_status = row[8]
    let last_revision = row[6]
    if (task_status === "Pending" && last_revision < onlyDate) {
      return row
    }
  })
  return pending 
}

function fetchAllPendings(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Master");
  let data = sheet.getRange(2,1,sheet.getLastRow(),9).getValues();
  
  // Filter pending tasks
  let pending = data.filter(function(row){
    let task_status = row[8];
    if (task_status === "Pending") {
      return row;
    }
  });
  
  // Sort by last revision date (assumed to be in the 7th column, index 6)
  pending.sort(function(a, b) {
    let dateA = new Date(a[6]);
    let dateB = new Date(b[6]);
    return dateA - dateB; // Sorts in ascending order by date
  });
  
  return pending;
}


function taskComplete(taskID){
  let worksheet = spreadsheet.sheet("Master")
  let task = worksheet.find('Task ID', taskID)
  let index = worksheet.rowIndex('Task ID', taskID)
  task["Status"] = "Completed"
  worksheet.update(index, task)

}



function fetchAllPendingData(){
  let data = fetchAllPendings()
  let array = []
  data.forEach(function(r){
    array.push([r[0],r[1],r[2],r[6].toLocaleDateString("en-GB")])
  })
  return array
}


function fetchRelevantData(){
  let data = fetch()
  let array = []
  data.forEach(function(r){
    array.push([r[0],r[1],r[2],r[6].toLocaleDateString("en-GB")])
  })
  return array
}

function getInfoByTaskID(taskID){
  let worksheet = spreadsheet.sheet("Master")
  let task = worksheet.find('Task ID', taskID)
  let doer = task["Name"]
  let taskinfo = task["Task"]
  return {name : doer,task : taskinfo,taskid:taskID}
}

function getAllDoers(){
  let sheet = sss.getSheetByName("Doer List")
  let data = sheet.getRange(2,1,sheet.getLastRow()-1,1).getValues()
  return data
}

function archive() {
  let sheet = sss.getSheetByName("Dashboard")
  let data = sheet.getRange(4, 1, 6, 4).getValues()
  let name = sheet.getRange("A2").getValue()
  let week = sheet.getRange("D2").getValue()
  let arch = sss.getSheetByName("Archive")
  let archLast = arch.getLastRow() - 1
  let ared = data[3][1]
  let ayellow = data[3][2]
  let agreen = data[3][3]
  let pred = data[5][1]
  let pyellow = data[5][2]
  let pgreen = data[5][3]
  arch.appendRow([name,week,pred,pyellow,pgreen,ared,ayellow,agreen])
  let spreadsheet = sss.getSheetByName("Dashboard")
  spreadsheet.getRange('B9:D9').activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
}

