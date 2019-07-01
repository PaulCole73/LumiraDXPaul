function open_emis()
{
  Aliases.explorer.wndProgman.SHELLDLL_DefView.FolderView.DblClickItem("EMIS Web", 0);
}

function Test1()
{
  var consultationDataGridView;
  consultationDataGridView = Aliases.EmisWeb.MainForm.clientContainer.panelModuleContainer.ConsultationsPage.sharingNavigator.panel1.panel1.splitContainer1.SplitterPanel.gridSplitContainer.SplitterPanel.grid;
  consultationDataGridView.Click(326, 54);
  consultationDataGridView.DblClick(329, 79);
  consultationDataGridView.DblClick(330, 93);
}

function finding_data(){
Sys.Process("EmisWeb").WinFormsObject("MainForm").WinFormsObject("clientContainer").WinFormsObject("panelModuleContainer")
.WinFormsObject("ConsultationModePage").WinFormsObject("sharingNavigator").WinFormsObject("panel1").WinFormsObject("pnlMain")
.WinFormsObject("pnlLeft").WinFormsObject("WorkAreaPanel").WinFormsObject("HeaderBasedStyleControl").WinFormsObject("pnlWorkArea")
.WinFormsObject("pnlPageContainer").WinFormsObject("ProblemPageControl", "").WinFormsObject("ProblemSectionControl")

}

function test(){
var test = Aliases.EmisWeb.MainForm.clientContainer.panelModuleContainer.WinFormsObject("ConsultationModePage").WinFormsObject("sharingNavigator").WinFormsObject("panel1").WinFormsObject("pnlMain").WinFormsObject("pnlLeft").WinFormsObject("WorkAreaPanel").WinFormsObject("HeaderBasedStyleControl").WinFormsObject("pnlWorkArea").WinFormsObject("pnlPageContainer").WinFormsObject("ProblemPageControl", "").WinFormsObject("ProblemSectionControl").WinFormsObject("tlSection").WinFormsObject("EditingControl_Additional").wText
Log.Message(test)
}