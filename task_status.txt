function loadPartialHTML(partial){
  const htmlServ = HtmlService.createTemplateFromFile(partial)
  return htmlServ.evaluate().getContent()
}

function loadFollowUpView() {
  try {
  return loadPartialHTML("followup")
  } catch (e) {
    Logger.log(e)
  }
}

function loadAddNewView() {
  return loadPartialHTML("new_task")
}

function loadReviseView() {
  return loadPartialHTML("revise")
}

function loadPendingTasksView() {
  return loadPartialHTML("all_pending")
}