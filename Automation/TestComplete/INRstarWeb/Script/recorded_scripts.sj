
function Test2()
{
  var  afx;
  var  page32770;
  var  comboBoxEx32;
  var  edit;
  var  internetExplorerServer;
  TestedApps.IETester.Run(1, true);
  afx = Sys.Process("IETester").Window("Afx:00400000:8*", "IETester (multi-process mode)");
  afx.Window("Afx:RibbonBar:400000*", "IETester").Click(106, 14);
  page32770 = afx.Window("MDIClient").Window("Afx:00400000:b*", "about:blank").Window("AfxFrameOrView100su").Window("#32770");
  comboBoxEx32 = page32770.Window("ComboBoxEx32");
  edit = comboBoxEx32.Window("ComboBox").Window("Edit");
  edit.Click(1, 4);
  comboBoxEx32.wText = "www.testingtolvaddon.com";
  edit.Keys("[Enter]");
  Sys.Process("IETester", 2).Window("#32770", "Connect to www.testingtolvaddon.com").Window("Button", "OK").ClickButton();
  internetExplorerServer = page32770.Window("Shell Embedding").Window("Shell DocObject View").Window("Internet Explorer_Server");
  internetExplorerServer.Click(994, 213);
  internetExplorerServer.Click(191, 303);
  internetExplorerServer.Keys("Mary[Tab]Mary");
  internetExplorerServer.Click(941, 355);
}

function Test1()
{
  var  internetExplorerServer;
  internetExplorerServer = Sys.Process("IETester", 1).Window("Afx:00400000:8*", "IETester (multi-process mode)").Window("MDIClient").Window("Afx:00400000:b*", "INRstarWeb").Window("AfxFrameOrView100su").Window("#32770").Window("Shell Embedding").Window("Shell DocObject View").Window("Internet Explorer_Server");
  internetExplorerServer.Click(586, 40);
  internetExplorerServer.Click(112, 75);
}

function Test3()
{
  var  internetExplorerServer;
  internetExplorerServer = Sys.Process("IETester", 1).Window("Afx:00400000:8*", "IETester (multi-process mode)").Window("MDIClient").Window("Afx:00400000:b*", "INRstarWeb").Window("AfxFrameOrView100su").Window("#32770").Window("Shell Embedding").Window("Shell DocObject View").Window("Internet Explorer_Server");
  internetExplorerServer.Click(128, 154);
  internetExplorerServer.Keys("1234567890[Enter]");
}

function Test4()
{
  var  iexplore;
  var  panel;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  panel = iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage");
  panel.Panel("header").Link("PatientLink").Click();
  panel.Panel("main").Panel("MainContentPanel").Panel("PatientTab").Link("AddPatientDetailsTab").Click();
}

function Test5()
{
  Sys.Process("iexplore", 2).IEFrame(0).Tab("INRstarWeb - Windows Internet Explorer").Window("Shell DocObject View").Window("Internet Explorer_Server").Click(41, 81);
}

function Test6()
{
  var  iexplore;
  var  form;
  var  textbox;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  form = iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("Patient_NHSNumber");
  textbox.Click(18, 9);
  textbox.Text = "12345";
  form.Panel(0).SubmitButton("AddPatientDetails").Click();
}

function Test7()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm").Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Select("Patient_Title").ClickItem("Mr");
}

function Test8()
{
  var  iexplore;
  var  vselect;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  vselect = iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm").Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Select("Patient_Title");
  vselect.ClickItem("Miss");
  vselect.ClickItem("Mrs");
  vselect.ClickItem("(Other...)");
}

function Test9()
{
  var  iexplore;
  var  textbox;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  textbox = iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm").Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(2).Textbox("Patient_Surname");
  textbox.Click(15, 8);
  textbox.Text = "bonsai";
}


function Test10()
{
  var  iexplore;
  var  toolbarWindow32;
  var  textbox;
  iexplore = Sys.Process("iexplore");
  toolbarWindow32 = iexplore.IEFrame(0).Window("InternetToolbarHost", "ITBarHost").Window("WorkerW", "Menu Bar").Window("ReBarWindow32").Window("ToolbarWindow32");
  toolbarWindow32.ClickItemXY("&Edit", 19, 9, false);
  toolbarWindow32.PopupMenu.Click("Find on this Page...");
  textbox = iexplore.Page("res://ieframe.dll/find.dlg").Table(0).Cell(0, 1).Textbox("txtFindText");
  textbox.Click(20, 8);
  textbox.Click(17, 6);
  textbox.Text = "Please enter a Given name";
}




function Test11()
{
  var  iexplore;
  var  toolbarWindow32;
  var  page;
  var  button;
  var  textbox;
  iexplore = Sys.Process("iexplore");
  toolbarWindow32 = iexplore.IEFrame(0).Window("InternetToolbarHost", "ITBarHost").Window("WorkerW", "Menu Bar").Window("ReBarWindow32").Window("ToolbarWindow32");
  toolbarWindow32.ClickItemXY("&Edit", 13, 7, false);
  toolbarWindow32.PopupMenu.Click("Find on this Page...");
  page = iexplore.Page("res://ieframe.dll/find.dlg");
  button = page.Table(1).Cell(0, 1).Button("btnFindNext");
  button.Click();
  iexplore.Window("#32770", "Windows Internet Explorer").Window("Button", "OK").ClickButton();
  textbox = page.Table(0).Cell(0, 1).Textbox("txtFindText");
  textbox.Click(131, 8);
  textbox.Text = "Please enter a Family name";
  button.Click();
  iexplore.Window("Internet Explorer_TridentDlgFrame", "Find").Close();
}

function Test12()
{
  var  iexplore;
  var  page;
  var  panel;
  var  form;
  var  textbox;
  iexplore = Sys.Process("iexplore");
//  iexplore.ToURL("http://www.testingtolvaddon.com/");
  page = iexplore.Page("http://www.testingtolvaddon.com/");
  panel = page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent");
  form = panel.Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("Patient_NHSNumber");
  textbox.Click(13, 12);
  textbox.Text = "1234";
  form.Panel(0).SubmitButton("AddPatientDetails").Click();
  form = panel.Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("Patient_NHSNumber");
  textbox.Drag(33, 11, -81, -6);
  textbox.Text = "5678";
  page.Drag(1010, 369, 7, 252);
  form.Panel(0).SubmitButton("AddPatientDetails").Click();
  form = panel.Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("Patient_NHSNumber");
  textbox.Drag(32, 9, -87, 0);
  textbox.Text = "abcedrf";
  form.Panel(0).SubmitButton("AddPatientDetails").Click();
}

function Test13()
{
  var  iexplore;
  var  page;
  var  panel;
  var  form;
  var  textbox;
  var  toolbarWindow32;
  var  button;
  var  wndWindowsForms10Window8app0378734a;
  var  wnd;
  iexplore = Sys.Process("iexplore");
//  iexplore.ToURL("http://www.testingtolvaddon.com/");
  page = iexplore.Page("http://www.testingtolvaddon.com/");
  panel = page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent");
  form = panel.Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("Patient_NHSNumber");
  textbox.Click(18, 8);
  textbox.Text = "1234";
  form.Panel(0).SubmitButton("AddPatientDetails").Click();
  toolbarWindow32 = iexplore.IEFrame(0).Window("InternetToolbarHost", "ITBarHost").Window("WorkerW", "Menu Bar").Window("ReBarWindow32").Window("ToolbarWindow32");
  toolbarWindow32.ClickItemXY("&Edit", 15, 10, false);
  toolbarWindow32.PopupMenu.Click("Find on this Page...");
  iexplore.Page("res://ieframe.dll/find.dlg").Table(1).Cell(0, 1).Button("btnFindNext").Click();
  iexplore.Window("Internet Explorer_TridentDlgFrame", "Find").Close();
  textbox = panel.Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm").Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("Patient_NHSNumber");
  textbox.Drag(39, 9, -93, 2);
  textbox.Text = "poiuytr";
  textbox.Keys("[Enter]");
  toolbarWindow32.ClickItemXY("&Edit", 17, 9, false);
  toolbarWindow32.PopupMenu.Click("Find on this Page...");
  button = iexplore.Page("res://ieframe.dll/find.dlg").Table(1).Cell(0, 1).Button("btnFindNext");
  button.Click();
  button.Click();
  iexplore.Window("Internet Explorer_TridentDlgFrame", "Find").Close();
  textbox = panel.Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm").Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("Patient_NHSNumber");
  textbox.Drag(49, 7, -109, 0);
  textbox.Text = "780 223 1254";
  textbox.Keys("[Enter]");
  TestedApps.NHSNumberGenerator.Run(1, true);
  wndWindowsForms10Window8app0378734a = Sys.Process("NHSNumberGenerator").Window("WindowsForms10.Window.8.app.0.378734a", "Generate NHS Number");
  wndWindowsForms10Window8app0378734a.Window("WindowsForms10.BUTTON.app.0.378734a", "Generate").ClickButton();
  wnd = wndWindowsForms10Window8app0378734a.Window("WindowsForms10.EDIT.app.0.378734a");
  wnd.Drag(142, 20, -182, 1);
  wnd.Keys("^c");
  form = panel.Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  textbox = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(0).Textbox("Patient_NHSNumber");
  textbox.Drag(76, 10, -164, 4);
  textbox.Drag(79, 8, -132, -1);
  textbox.Text = "780 223 1254";
  textbox.Keys("^v");
  page.Drag(1012, 289, 11, 224);
  form.Panel(0).SubmitButton("AddPatientDetails").Click();
  page.Drag(1015, 382, -11, -182);
}

function Test14()
{
  var  iexplore;
  var  page;
  var  panel;
  var  form;
  var  panel2;
  var  vselect;
  iexplore = Sys.Process("iexplore");
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  page = iexplore.Page("http://www.testingtolvaddon.com/");
  panel = page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent");
  form = panel.Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Textbox("PatientBorn").Click(56, 5);
  panel2 = page.Panel("ui_datepicker_div");
  panel2.Table(0).Cell(2, 0).Link(0).Click();
  form.Panel(0).SubmitButton("AddPatientDetails").Click();
  form = panel.Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(4).Image("calendar_png").Click(5, 7);
  panel2.Panel(0).Panel(0).Select(1).Click(67, 9);
  vselect = iexplore.Window("Internet Explorer_Server").Page("http://www.testingtolvaddon.com/").Select(0);
  vselect.Drag(63, 439, -2, -280);
  vselect.Click(20, 200);
  panel2.Table(0).Cell(1, 5).Link(0).Click();
  form.Panel(0).SubmitButton("AddPatientDetails").Click();
  page.Drag(1016, 406, -7, -387);
}

function Test15()
{
  var  iexplore;
  var  panel;
  iexplore = Sys.Process("iexplore");
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  panel = iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTab");
  panel.Link("AddPatientDetailsTab").Click();
  panel.Link("PatientLink").Click();
}

function Test16()
{
  var  iexplore;
  var  panel;
  iexplore = Sys.Process("iexplore");
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  panel = iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panel.Panel("PatientIndexHeader").Panel("PatientTab").Link("PatientClinicalTab").Click();
  panel.Panel("PatientTabContent").Fieldset(0).Panel("PatientCurrentClinicalDetails").Fieldset(0).Panel(0).Button("AddPatientClinicalLink").Click();
}

function Test17()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore");
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Fieldset(0).Panel("PatientCurrentClinicalDetails").Form("PatientEditClinicalForm").Fieldset(0).Panel(0).SubmitButton("UpdatePatientClinical").Click();
}

function Test18()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore");
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  iexplore.Page("http://www.testingtolvaddon.com/").Panel(4).Panel(1).Button(1).TextNode(0).Click(49, 13);
}

function Test19()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 1);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  iexplore.Page("http://www.testingtolvaddon.com/").Panel(4).Panel(1).Button(1).TextNode(0).Click(40, 16);
}

function Test20()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 1);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  iexplore.Page("http://www.testingtolvaddon.com/").Panel(4).Panel(1).Button(1).Click();
}

function Test21()
{
  var  iexplore;
  var  fieldset;
  var  checkbox;
  iexplore = Sys.Process("iexplore", 1);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  fieldset = iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Fieldset(0).Panel("PatientCurrentClinicalDetails").Form("PatientEditClinicalForm").Fieldset(0).Fieldset(0);
  fieldset.Panel("EditClinicalDetails").Panel(5).Checkbox("Clinical_NPSA").ClickChecked(true);
  checkbox = fieldset.Panel(0).Panel(0).Checkbox("Clinical_Use5");
  checkbox.ClickChecked(false);
  checkbox.ClickChecked(true);
}

function Test22()
{
  var  wndWindowsForms10Window8app0378734a;
  var  wnd;
  TestedApps.NHSNumberGenerator.Run(1, true);
  wndWindowsForms10Window8app0378734a = Sys.Process("NHSNumberGenerator").Window("WindowsForms10.Window.8.app.0.378734a", "Generate NHS Number");
  wndWindowsForms10Window8app0378734a.Window("WindowsForms10.BUTTON.app.0.378734a", "Generate").ClickButton();
  Sys.Process("iexplore", 2).ToURL("http://vmwiki/wiki/index.php/Product:UAT_%26_Design#Clinical_Tab");
  wnd = wndWindowsForms10Window8app0378734a.Window("WindowsForms10.EDIT.app.0.378734a");
  wnd.Drag(150, 17, -178, -11);
  wnd.Keys("^c");
  wndWindowsForms10Window8app0378734a.Close();
}

function Test23()
{
  var  wndWindowsForms10Window8app0378734a;
  TestedApps.NHSNumberGenerator.Run(1, true);
  wndWindowsForms10Window8app0378734a = Sys.Process("NHSNumberGenerator").Window("WindowsForms10.Window.8.app.0.378734a", "Generate NHS Number");
  wndWindowsForms10Window8app0378734a.Window("WindowsForms10.BUTTON.app.0.378734a", "Generate").ClickButton();
  wndWindowsForms10Window8app0378734a.Close();
}

function Test24()
{
  var  iexplore;
  var  page;
  var  form;
  var  fieldset;
  var  textbox;
  var  passwordBox;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/Authentication/LogOn?ReturnUrl=%2fhome");
  page = iexplore.Page("http://www.testingtolvaddon.com/Authentication/LogOn?ReturnUrl=%2fhome");
  form = page.Panel("MainPage").Panel("main").Panel("LogonPage").Form("Logon");
  form.Panel("Disclaimer").Fieldset(0).Panel(0).RadioButton("AgreeDisclaimer").Click();
  fieldset = form.Fieldset(0);
  textbox = fieldset.Panel(0).Textbox("Username");
  textbox.Click(16, 14);
  textbox.Text = "Mary";
  passwordBox = fieldset.Panel(1).PasswordBox("Password");
  passwordBox.Text = "Mary";
  passwordBox.Keys("[Enter]");
  //Please wait until download completes: "http://www.testingtolvaddon.com/"
  page.Wait();
}

function Test25()
{
  var  IEFrame;
  var  toolbarWindow32;
  var  findBarClass;
  var  edit;
  IEFrame = Sys.Process("iexplore", 1).IEFrame(0);
  toolbarWindow32 = IEFrame.Window("Frame Tab").Window("InternetToolbarHost", "ITBarHost").Window("WorkerW", "Menu Bar").Window("ReBarWindow32").Window("ToolbarWindow32");
  toolbarWindow32.ClickItemXY("&Edit", 19, 6, false);
  toolbarWindow32.PopupMenu.Click("Find on this Page...");
  findBarClass = IEFrame.CommandBar.Window("FindBarClass");
  edit = findBarClass.Window("Edit", "", 1);
  edit.wText = "Please enter a valid NHS number";
  toolbarWindow32 = findBarClass.Window("ToolbarWindow32", "", 2);
  toolbarWindow32.ClickItem("Next", false);
  toolbarWindow32.ClickItem("Next", false);
  edit.wText = "Please enter a valid NHS number2";
}

function Test26()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm").Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails").Panel(1).Select("Patient_Title").ClickItem("Mr");
}

function Test27()
{
  var  iexplore;
  var  page;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  page = iexplore.Page("http://www.testingtolvaddon.com/");
  page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Fieldset("OverrideTreatmentFieldset").Form("NewHistoricalTreatmentForm").Panel(0).Button("Save").Click();
  page.Panel(5).Panel(1).Button(1).Click();
}

function Test28()
{
  var  iexplore;
  var  page;
  var  fieldset;
  var  fieldset2;
  var  fieldset3;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  page = iexplore.Page("http://www.testingtolvaddon.com/");
  fieldset = page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Form("NewINRForm").Fieldset("NewINR");
  fieldset2 = fieldset.Fieldset(0);
  fieldset3 = fieldset2.Panel(0).Fieldset("NewINRConfirmFieldSet");
  fieldset3.Panel(0).Checkbox("PatientIdentityConfirmedCheckedValue").ClickChecked(true);
  fieldset3.Panel(2).Checkbox("ConfirmDoseYesCheckedValue").ClickChecked(true);
  fieldset3 = fieldset2.Panel(1).Fieldset("NewINRQuestionFieldSet");
  fieldset3.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
  fieldset3.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
  fieldset2.Panel(2).Fieldset("NewINRResultFieldSet").Panel(0).Select("INRSelectValue").ClickItem("2.3");
  fieldset.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
  page.Panel(5).Panel(1).Button(1).TextNode(0).Click(37, 22);
  page.Panel(5).Panel(1).Button(0).TextNode(0).Click(47, 20);
  page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("PendingTreatmentContent").Panel(0).Button("AcceptPendingTreatment").Click();
  page.MouseWheel(-4);
}


function Test29()
{
  var  iexplore;
  var  page;
  var  fieldset;
  var  fieldset2;
  var  fieldset3;
  iexplore = Sys.Process("iexplore", 5);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  page = iexplore.Page("http://www.testingtolvaddon.com/");
  fieldset = page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Form("NewINRForm").Fieldset("NewINR");
  fieldset2 = fieldset.Fieldset(0);
  fieldset3 = fieldset2.Panel(0).Fieldset("NewINRConfirmFieldSet");
  fieldset3.Panel(0).Checkbox("PatientIdentityConfirmedCheckedValue").ClickChecked(true);
  fieldset3.Panel(2).Checkbox("ConfirmDoseYesCheckedValue").ClickChecked(true);
  fieldset3 = fieldset2.Panel(1).Fieldset("NewINRQuestionFieldSet");
  fieldset3.Panel(2).Checkbox("MissedDosesNoCheckedValue").ClickChecked(true);
  fieldset3.Panel(5).Checkbox("OtherMedicationNoCheckedValue").ClickChecked(true);
  fieldset2.Panel(2).Fieldset("NewINRResultFieldSet").Panel(0).Select("INRSelectValue").ClickItem("2.8");
  fieldset.Panel(0).SubmitButton("CalculateWarfarinDose").Click();
  page.Panel(5).Panel(1).Button(1).TextNode(0).Click(31, 14);
  page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("PendingTreatmentContent").Panel(0).Button("AcceptPendingTreatment").Click();
  page.Panel(5).Panel(1).Button(0).TextNode(0).Click(41, 16);
}

function Test30()
{
  var  iexplore;
  var  page;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  page = iexplore.Page("http://www.testingtolvaddon.com/");
  page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("ContactsContainer").Panel("TreatmentHistoryButtons").Button("DeleteLatestTreatment").Click();
  page.Panel(5).Panel(1).Button(1).TextNode(0).Click(42, 19);
}

function Test31()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  iexplore.Page("http://www.testingtolvaddon.com/").Panel(4).Panel(1).Button(0).TextNode(0).Click(41, 19);
}

function Test32()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 6);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientIndexHeader").Panel("PatientTab").Link("PatientNewINRTab").Click();
}

function Test33()
{
  var  iexplore;
  var  page;
  var  panel;
  var  panel2;
  var  form;
  var  table;
  var  vselect;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  page = iexplore.Page("http://www.testingtolvaddon.com/");
  panel = page.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panel.Panel("PatientIndexHeader").Panel("PatientTab").Link("TreatmentItem").Click();
  panel2 = panel.Panel("PatientTabContent");
  panel2.Panel("ContactsContainer").Panel("TreatmentHistoryButtons").Button("AddHistoricalTreatment").Click();
  form = panel2.Fieldset("OverrideTreatmentFieldset").Form("NewHistoricalTreatmentForm");
  table = form.Table("AddHistoricalTreatmentTable");
  table.Cell(1, 0).Image("calendar_png").Click(9, 9);
  panel = page.Panel("ui_datepicker_div");
  panel.Panel(0).Panel(0).Select(0).Click(70, 9);
  panel.Table(0).Cell(1, 1).Link(0).Click();
  vselect = table.Cell(1, 2).Select("INR");
  vselect.ClickItem("2.5");
  vselect.ClickItem("2.5");
  table.Cell(1, 3).Select("Dose").ClickItem("3.0");
  table.Cell(1, 4).Select("Review").ClickItem("1 Days");
  form.Panel(0).Button("Save").Click();
  page.Panel(5).Panel(1).Button(1).TextNode(0).Click(32, 15);
}


function Test34()
{
  var  iexplore;
  var  panel;
  var  panel2;
  var  form;
  var  textbox;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://www.testingtolvaddon.com/");
  panel = iexplore.Page("http://www.testingtolvaddon.com/").Panel("MainPage");
  panel.Panel("header").Link("PatientLink").Click();
  panel2 = panel.Panel("main").Panel("MainContentPanel");
  panel2.Panel("PatientTab").Link("AddPatientDetailsTab").Click();
  form = panel2.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset").Form("PatientAddDetailsForm");
  panel = form.Fieldset(0).Panel("PatientDetailsWrapper").Panel("EditPatientDetails");
  textbox = panel.Panel(0).Textbox("Patient_NHSNumber");
  textbox.Click(54, 7);
  textbox.Text = "132456";
  panel.Panel(1).Select("Patient_Title").ClickItem("Mr");
  textbox = panel.Panel(2).Textbox("Patient_Surname");
  textbox.Click(71, 9);
  textbox.Text = "Smith";
  form.Panel(0).SubmitButton("AddPatientDetails").Click();
}

function Test35()
{
  var  iexplore;
  var  panel;
  var  panel2;
  var  form;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  panel = iexplore.Page("http://inrstar5testing/").Panel("MainPage");
  panel.Panel("header").Link("AdminLink").Click();
  panel2 = panel.Panel("main").Panel("MainContentPanel").Panel(0);
  panel2.Link("SectionSettingsTab").Click();
  panel = panel2.Panel("AdminContent").Panel("LocationSettings");
  panel.Link(0).Click();
  panel2 = panel.Panel("fbf2810f_9c35_473a_94de_6ba9b5a20728Content");
  panel2.Panel(2).Button("Edit").Click();
  form = panel2.Form("EditSettingForm");
  form.Panel(0).Select("Value").ClickItem("Coventry Maintenance");
  form.Panel(2).SubmitButton("Save").Click();
  panel.Link(2).Click();
  panel2 = panel.Panel("c145f7b4_9add_4958_a23f_354dbb3a792cContent");
  panel2.Panel(2).Button("Edit").Click();
  form = panel2.Form("EditSettingForm");
  form.Panel(1).Select("Value").ClickItem("False");
  form.Panel(2).SubmitButton("Save").Click();
}

function Test36()
{
  var  iexplore;
  var  panel;
  var  fieldset;
  var  fieldset2;
  var  textbox;
  var  button;
  iexplore = Sys.Process("IEXPLORE", 2);
  iexplore.ToURL("http://inrstar5testing/");
  panel = iexplore.Page("http://inrstar5testing/").Panel("MainPage");
  panel.Panel("header").Link("PatientLink").Click();
  fieldset = panel.Panel("main").Panel("MainContentPanel").Panel("PatientContent").Fieldset(0);
  fieldset2 = fieldset.Fieldset(0);
  textbox = fieldset2.Textbox("Search");
  textbox.Click(42, 12);
  textbox.Text = "p";
  button = fieldset2.Button("SearchButton");
  button.Click();
  button.MouseWheel(-5);
  fieldset.Panel("SearchResults").Panel("PatientSearchResults").Table("PatientResults").Cell(7, 0).Link(0).Click();
}

function Test37()
{
  var  iexplore;
  iexplore = Sys.Process("IEXPLORE", 2);
  iexplore.ToURL("http://inrstar5testing/");
  iexplore.Page("http://inrstar5testing/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTab").Link("PatientLink").Click();
}

function Test38()
{
  var  iexplore;
  var  page;
  var  panel;
  var  panel2;
  var  form;
  iexplore = Sys.Process("IEXPLORE", 2);
  iexplore.ToURL("http://inrstar5testing/");
  page = iexplore.Page("http://inrstar5testing/");
  page.Drag(1018, 112, -2, 291);
  panel = page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("LocationSettings");
  panel.Link(19).Click();
  page.Drag(1013, 215, 8, 169);
  panel2 = panel.Panel("c6b3b36_22c1_11de_a922_ce8f55d89593Content");
  panel2.Panel(7).Button("Edit").Click();
  form = panel2.Form("EditSettingForm");
  form.Panel(4).Select("Value").ClickItem("False");
  form.Panel(5).Select("Value").ClickItem("True");
  form.Panel(7).SubmitButton("Save").Click();
}

function Test39()
{
  var  iexplore;
  var  form;
  iexplore = Sys.Process("IEXPLORE", 2);
  iexplore.ToURL("http://inrstar5testing/");
  form = iexplore.Page("http://inrstar5testing/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("LocationSettings").Panel("b2055940_4f5c_470d_844c_068a137c5144Content").Form("EditSettingForm");
  form.Panel(2).Select("Value").ClickItem("Baglin");
  form.Panel(4).SubmitButton("Save").Click();
}

function Test40()
{
  var  iexplore;
  var  explorer;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  iexplore.Page("http://inrstar5testing/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("ContactsContainer").Table("TreatmentHistoryTable").Cell(2, 8).Link("TreatmentInformationActionLink").Image("NotificationIcon_png").Click(7, 7);
  explorer = Sys.Process("Explorer");
  explorer.Window("Ghost", "INRstarWeb - Windows Internet Explorer").Click(450, 10);
  explorer.Window("#32770", "*").Window("Button", "OK").ClickButton();
}

function Test41()
{
  var  iexplore;
  var  page;
  var  image;
  iexplore = Sys.Process("iexplore", 8);
  iexplore.ToURL("http://inrstar5testing/");
  page = iexplore.Page("http://inrstar5testing/");
  image = page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("ContactsContainer").Table("TreatmentHistoryTable").Cell(2, 8).Link("TreatmentInformationActionLink").Image("NotificationIcon_png");
  image.Click(8, 10);
  image.Click(9, 6);
  page.Panel(4).Panel(0).Link(0).TextNode(0).Click(7, 6);
}

function Test42()
{
  var  iexplore;
  var  page;
  var  form;
  var  fieldset;
  var  textbox;
  var  panel;
  var  panel2;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/Authentication/LogOn?ReturnUrl=%2f");
  page = iexplore.Page("http://inrstar5testing/Authentication/LogOn?ReturnUrl=%2f");
  form = page.Panel("MainPage").Panel("main").Panel("LogonPage").Form("Logon");
  form.Panel("Disclaimer").Fieldset(0).Panel(0).RadioButton("AgreeDisclaimer").Click();
  fieldset = form.Fieldset(0);
  textbox = fieldset.Panel(0).Textbox("Username");
  textbox.Click(11, 8);
  textbox.Text = "doctor2";
  fieldset.Panel(1).PasswordBox("Password").Text = "doctor2";
  fieldset.Click(944, 152);
  //Please wait until download completes: "http://inrstar5testing/Authentication/LogOn"
  page.Wait();
  fieldset = page.Panel("MainPage").Panel("main").Panel("LogonPage").Form("Logon").Fieldset(0);
  textbox = fieldset.Panel(0).Textbox("Username");
  textbox.Drag(12, 9, -22, -2);
  textbox.Text = "Doctor2";
  textbox.Keys("[Down]");
  textbox.Text = "Doctor2";
  fieldset.Panel(1).PasswordBox("Password").Text = "Doctor2";
  fieldset.Panel(2).SubmitButton("LoginButton").Click();
  //Please wait until download completes: "http://inrstar5testing/"
  page.Wait();
  panel = page.Panel("MainPage");
  panel2 = panel.Panel("main").Panel("MainContentPanel").Panel("PatientTab").Panel("Messages").Fieldset(0).Panel("UserMessages");
  panel2.Link("ReferredPatientHeaderLink").Click();
  panel2.Panel("ReferredPatients").Table("ReferredPatientReportTable").Cell(1, 0).Link(0).Click();
  panel.Panel("header").Panel("logindisplay").Panel("LoginStatus").Link(0).Click();
  //Please wait until download completes: "http://inrstar5testing/Authentication/LogOn?ReturnUrl=%2f"
  page.Wait();
}

function Test43()
{
  var  iexplore;
  var  page;
  Sys.Process("iexplore", 1).IEFrame(0).Click(904, 8);
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  page = iexplore.Page("http://inrstar5testing/");
  page.Panel("MainPage").Panel("header").Panel("logindisplay").Panel("LoginStatus").Link(0).Click();
  //Please wait until download completes: "http://inrstar5testing/Authentication/LogOn?ReturnUrl=%2f"
  page.Wait();
}

function Test44()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  iexplore.Page("http://inrstar5testing/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("PendingTreatmentContent").Panel(0).Button("ReferPendingTreatment").Click();
}

function Test45()
{
  var  iexplore;
  var  page;
  var  panel;
  var  panel2;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  page = iexplore.Page("http://inrstar5testing/");
  panel = page.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  panel2 = panel.Panel("PatientTab").Panel("Messages").Fieldset(0).Panel("UserMessages");
  panel2.Link("ReferredPatientHeaderLink").Click();
  panel2.Panel("ReferredPatients").Table("ReferredPatientReportTable").Cell(1, 0).Link(0).Click();
  panel2 = panel.Panel("PatientTabContent");
  panel2.Panel("PendingTreatmentContent").Panel(0).Button("AcceptPendingTreatment").Click();
  panel2.Panel("PendingTreatmentContent").Panel(0).Button("AcceptPendingTreatment").Click();
  page.Panel(4).Panel(1).Button(0).TextNode(0).Click(34, 15);
}

function Test46()
{
  var  wndWindowsForms10Window8app0378734a;
  var  wnd;
  TestedApps.NHSNumberGenerator1.Run(1, true);
  wndWindowsForms10Window8app0378734a = Sys.Process("NHSNumberGenerator").Window("WindowsForms10.Window.8.app.0.378734a", "Generate NHS Number");
  wndWindowsForms10Window8app0378734a.Window("WindowsForms10.BUTTON.app.0.378734a", "Generate").ClickButton();
  wnd = wndWindowsForms10Window8app0378734a.Window("WindowsForms10.EDIT.app.0.378734a", "", 2);
  wnd.Drag(148, 18, -187, 11);
  wnd.Keys("^c");
}

function Test47()
{
  var  iexplore;
  var  page;
  iexplore = Sys.Process("iexplore", 5);
  iexplore.ToURL("http://inrstar5testing/");
  page = iexplore.Page("http://inrstar5testing/");
  page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("TreatmentContainer").Fieldset(0).Panel("TreatmentHistoryButtons").Button("DeleteLatestTreatment").Click();
  page.Panel(5).Panel(1).Button(1).TextNode(0).Click(27, 19);
}

function Test48()
{
  var  iexplore;
  var  page;
  iexplore = Sys.Process("iexplore", 5);
  iexplore.ToURL("http://inrstar5testing/");
  page = iexplore.Page("http://inrstar5testing/");
  page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("PendingTreatmentContent").Panel(0).Button("CancelPendingTreatment").Click();
  page.Panel(5).Panel(1).Button(1).TextNode(0).Click(19, 20);
}

function Test49()
{
  var  iexplore;
  var  page;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  page = iexplore.Page("http://inrstar5testing/");
  page.Panel(5).Panel(1).Button(0).TextNode(0).Click(37, 22);
  page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("PendingTreatmentContent").Panel(0).Button("CancelPendingTreatment").Click();
  page.Panel(5).Panel(1).Button(1).TextNode(0).Click(47, 17);
}

function Test50()
{
  var  iexplore;
  var  panel;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  panel = iexplore.Page("http://inrstar5testing/").Panel("MainPage");
  panel.Panel("header").Link("HomeLink").Click();
  panel.Panel("main").Panel("MainContentPanel").Panel("PatientTab").Panel("Messages").Fieldset(0).Panel("UserMessages").Link("OverduePatientHeaderLink").Click();
}

function Test51()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  iexplore.Page("http://inrstar5testing/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTab").Panel("Messages").Fieldset(0).Panel("UserMessages").Panel("OverduePatients").Table("PatientOverdueReportTable").Cell(7, 0).Link(0).Click();
}

function Test52()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  iexplore.Page("http://inrstar5testing/").Panel("ui_datepicker_div").Table(0).Cell(4, 6).Link(0).Click();
}

function Test53()
{
  var  iexplore;
  var  page;
  var  panel;
  var  panel2;
  var  panel3;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  page = iexplore.Page("http://inrstar5testing/");
  page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("PendingTreatmentContent").Panel(0).Button("AcceptPendingTreatment").Click();
  panel = page.Panel(4);
  panel2 = panel.Panel("modalDialogBox").Fieldset(0).Panel("DayClinics");
  panel3 = panel2.Fieldset(0).Panel(0);
  panel3.Link("TestClinicHeaderLink").Click();
  panel3.Panel("Test_content").Table(0).Cell(6, 1).Link(0).Click();
  panel2.Fieldset(0).Form("AddAppointmentForm").Panel(4).SubmitButton("AddAppointmentSubmitButton").Click();
  panel.Panel(1).Button(0).TextNode(0).Click(49, 14);
}

function Test54()
{
  var  iexplore;
  var  page;
  var  panel;
  var  panel2;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  page = iexplore.Page("http://inrstar5testing/");
  panel = page.Panel(5).Panel("modalDialogBox").Fieldset(0).Panel("DayClinics");
  panel2 = panel.Fieldset(0).Panel(0);
  panel2.Link("Scenario_ClinicClinicHeaderLink").Click();
  panel2.Panel("ScenarioClinic_content").Table(0).Cell(5, 1).Link(0).Click();
  panel.Fieldset(0).Form("AddAppointmentForm").Panel(4).SubmitButton("AddAppointmentSubmitButton").Click();
  page.Panel(4).Panel(1).Button(0).TextNode(0).Click(51, 23);
}

function Test55()
{
  var  iexplore;
  var  panel;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5testing/");
  panel = iexplore.Page("http://inrstar5testing/").Panel(5).Panel("modalDialogBox").Fieldset(0).Panel(0).Panel("AppointmentCalendar").Panel(0);
  panel.Panel(0).Panel(0).Select(1).Click(68, 9);
  panel.Table(0).Cell(2, 4).Link(0).Click();
}

function Test56()
{
  var  iexplore;
  var  panel;
  var  form;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5man/");
  panel = iexplore.Page("http://inrstar5man/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Panel("PendingTreatmentContent");
  panel.Panel(0).Button("OverridePendingTreatment").Click();
  form = panel.Form("EditPendingTreatmentForm");
  form.Table("OverrideSuggestedTreatmentTable").Cell(1, 1).Select("Treatment_Dose").ClickItem("3.7");
  form.Panel(0).SubmitButton("OverrideAccept").Click();
  panel.Panel("DosingScheduleContent").Panel("ScheduleGrid").Table("ScheduleSelectorTable").Cell(1, 2).Button("Use").Click();
  panel.Panel(0).Button("AcceptPendingTreatment").Click();
}

function Test57()
{
  var  iexplore;
  var  explorer;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Link("UserManagementTab").Click();
  explorer = Sys.Process("Explorer");
  explorer.Window("Ghost", "INRstarWeb - Windows Internet Explorer").Click(648, 18);
  explorer.Window("#32770", "*").Window("Button", "OK").ClickButton();
}

function Test58()
{
  var  iexplore;
  var  page;
  var  panel;
  var  panel2;
  var  form;
  var  textbox;
  var  passwordBox;
  var  fieldset;
  var  panel3;
  var  fieldset2;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  page = iexplore.Page("http://inrstar5auto/");
  panel = page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0);
  panel.Link("UserManagementTab").Click();
  panel2 = panel.Panel("AdminContent");
  panel = panel2.Panel("AdminContent");
  panel.Fieldset(0).Panel(0).Select("ChildSections").ClickItem("Location2");
  panel.Panel("LocationsUsersContainer").Fieldset(0).Panel(1).Button("AddNewUser").Click();
  form = panel2.Fieldset(0).Form("CreateUserForm");
  textbox = form.Panel(0).Textbox("FullName");
  textbox.Click(70, 13);
  textbox.Drag(70, 12, -152, -6);
  textbox.Text = "Loc2Org";
  textbox.Keys("^c");
  textbox = form.Panel(1).Textbox("Username");
  textbox.Click(28, 11);
  textbox.Text = "";
  textbox.Keys("^v");
  passwordBox = form.Panel(2).PasswordBox("Password");
  passwordBox.Click();
  passwordBox.Text = "";
  passwordBox.Keys("^v");
  passwordBox = form.Panel(3).PasswordBox("ConfirmPassword");
  passwordBox.Click();
  passwordBox.Text = "";
  passwordBox.Keys("^v");
  form.Panel(4).SubmitButton("Add").Click();
  panel = panel2.Panel("AdminContent");
  panel.Fieldset(0).Panel(0).Select("ChildSections").ClickItem("Location2");
  panel2 = panel.Panel("LocationsUsersContainer");
  panel2.Fieldset(0).Panel(0).Select("Users").ClickItem("Loc2Org");
  fieldset = panel2.Panel("UserAccountContainer").Fieldset(0);
  fieldset.Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
  panel = fieldset.Panel("UserAdminContainer").Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0).Panel("RoleList");
  panel.Checkbox("RoleList_0").ClickChecked(true);
  panel.Checkbox("RoleList_1").ClickChecked(true);
  panel.Checkbox("RoleList_2").ClickChecked(true);
  page.Panel(4).Click(220, 502);
  panel = page.Panel("MainPage");
  fieldset = panel.Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("AdminContent").Panel("LocationsUsersContainer").Panel("UserAccountContainer").Fieldset(0).Panel("UserAdminContainer").Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0);
  fieldset.Panel("RoleList").Checkbox("RoleList_3").ClickChecked(true);
  fieldset.SubmitButton("SaveRoles").Click();
  panel.Panel("header").Panel("logindisplay").Panel("LoginStatus").Link(0).Click();
  //Please wait until download completes: "http://inrstar5auto/Authentication/LogOn?ReturnUrl=%2f"
  page.Wait();
  form = page.Panel("MainPage").Panel("main").Panel("LogonPage").Form("Logon");
  form.Panel("Disclaimer").Fieldset(0).Panel(0).Panel(1).RadioButton("AgreeDisclaimer").Click();
  fieldset = form.Fieldset(0);
  textbox = fieldset.Panel(0).Textbox("Username");
  textbox.Click(142, 15);
  textbox.Text = "";
  textbox.Keys("^v");
  textbox.Text = "Loc2Org";
  passwordBox = fieldset.Panel(1).PasswordBox("Password");
  passwordBox.Text = "";
  passwordBox.Keys("^v");
  fieldset.Panel(2).SubmitButton("LoginButton").Click();
  //Please wait until download completes: "http://inrstar5auto/"
  page.Wait();
  panel = page.Panel("MainPage");
  panel2 = panel.Panel("header");
  panel2.Link("AdminLink").Click();
  panel3 = panel.Panel("main").Panel("MainContentPanel").Panel(0);
  panel3.Link("SectionDoctorsTab").Click();
  panel = panel3.Panel("AdminContent");
  panel.Fieldset(0).Panel(0).Button("AddDoctorLink").Click();
  form = panel.Fieldset(0).Form("AddDoctorForm");
  textbox = form.Panel(0).Textbox("Doctor_Name");
  textbox.Click(107, 12);
  textbox.Drag(76, 12, -253, 1);
  textbox.Text = "Doctor2";
  textbox.Keys("^c");
  form.Panel(2).SubmitButton("UpdateDoctorButton").Click();
  panel3.Link("UserManagementTab").Click();
  fieldset = panel.Panel("AdminContent").Panel("LocationsUsersContainer").Fieldset(0);
  fieldset.Panel(0).Select("Users").Click(104, 11);
  fieldset.Panel(1).Button("AddNewUser").Click();
  form = panel.Fieldset(0).Form("CreateUserForm");
  textbox = form.Panel(0).Textbox("FullName");
  textbox.Click(50, 13);
  textbox.Text = "";
  textbox.Keys("^v");
  textbox = form.Panel(1).Textbox("Username");
  textbox.Click(73, 8);
  textbox.Text = "";
  textbox.Keys("^v");
  passwordBox = form.Panel(2).PasswordBox("Password");
  passwordBox.Click();
  passwordBox.Text = "";
  passwordBox.Keys("^v");
  passwordBox = form.Panel(3).PasswordBox("ConfirmPassword");
  passwordBox.Click();
  passwordBox.Text = "";
  passwordBox.Keys("^v");
  form.Panel(4).SubmitButton("Add").Click();
  panel3 = panel.Panel("AdminContent").Panel("LocationsUsersContainer");
  panel3.Fieldset(0).Panel(0).Select("Users").ClickItem("Doctor2");
  fieldset = panel3.Panel("UserAccountContainer").Fieldset(0);
  fieldset.Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
  fieldset2 = fieldset.Panel("UserAdminContainer").Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0);
  panel = fieldset2.Panel("RoleList");
  panel.Checkbox("RoleList_3").ClickChecked(true);
  panel.Checkbox("RoleList_6").ClickChecked(false);
  panel.Checkbox("RoleList_5").ClickChecked(true);
  fieldset2.SubmitButton("SaveRoles").Click();
  panel2.Panel("logindisplay").Panel("LoginStatus").Link(0).Click();
  //Please wait until download completes: "http://inrstar5auto/Authentication/LogOn?ReturnUrl=%2f"
  page.Wait();
}

function Test59()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5man/");
  iexplore.Page("http://inrstar5man/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientIndexHeader").Panel("PatientTab").Link("ExitPatientRecordTab").Click();
}

function Test60()
{
  var  iexplore;
  var  panel;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5man/");
  panel = iexplore.Page("http://inrstar5man/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("LocationSettings");
  panel.Link(8).Click();
  panel.Link(9).Click();
  panel.Link(10).Click();
  panel.Link(11).Click();
  panel.Link(12).Click();
  panel.Link(13).Click();
}

function Test61()
{
  var  iexplore;
  var  panel;
  var  panel2;
  var  form;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5man/");
  panel = iexplore.Page("http://inrstar5man/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("LocationSettings");
  panel2 = panel.Panel("e6_b8f1_4a6a_9cfa_51752685c57bContent");
  panel2.Panel(1).Button("Edit").Click();
  form = panel2.Form("EditSettingForm");
  form.Panel(0).Select("Value").ClickItem("7");
  form.Panel(1).SubmitButton("Save").Click();
  panel.Link(9).Click();
  panel2 = panel.Panel("cb6c3f0f_b4d7_4da9_800b_590f7fa2c48eContent");
  panel2.Panel(1).Button("Edit").Click();
  form = panel2.Form("EditSettingForm");
  form.Panel(0).Select("Value").ClickItem("20");
  form.Panel(1).SubmitButton("Save").Click();
}

function Test62()
{
  var  iexplore;
  var  panel;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5man/");
  panel = iexplore.Page("http://inrstar5man/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("LocationSettings");
  panel.Link(8).Click();
  panel.Panel("e6_b8f1_4a6a_9cfa_51752685c57bContent").Panel(1).Button("Edit").Click();
  panel.Link(9).Click();
  panel.Panel("cb6c3f0f_b4d7_4da9_800b_590f7fa2c48eContent").Panel(1).Button("Edit").Click();
  panel.Link(10).Click();
  panel.Panel("d00dbf34_fa8a_494f_9e0e_8594fb1ed304Content").Panel(1).Button("Edit").Click();
  panel.Link(11).Click();
  panel.Panel("fa52c6_9a11_4489_af38_fd2438ae06c0Content").Panel(1).Button("Edit").Click();
  panel.Link(12).Click();
  panel.Panel("bf1efb8_b761_4437_b1ad_c75a6afead95Content").Panel(1).Button("Edit").Click();
  panel.Link(13).Click();
  panel.Panel("dbc_71c9_4f0d_87ea_596fd059e65fContent").Panel(1).Button("Edit").Click();
}



function Test63()
{
  var  ssms;
  var  wnd_desked_gsk;
  var  genericPane;
  var  windowsForms10SysTreeView32app03553390;
  var  ezMdiContainer;
  var  MSPaneWindow;
  var  richEdit20W;
  var  dataGridView;
  var  wnd;
  Sys.Process("Explorer").Window("Shell_TrayWnd").Window("ReBarWindow32").Window("MSTaskSwWClass", "Running Applications").Window("ToolbarWindow32", "Running Applications").CheckItem("Microsoft SQL Server Management Studio", true, false);
  ssms = Sys.Process("Ssms");
  wnd_desked_gsk = ssms.Window("wndclass_desked_gsk", "Microsoft SQL Server Management Studio");
  wnd_desked_gsk.Panel("MsoDockTop").Panel("Menubar").MenuItem("View").Click();
  genericPane = wnd_desked_gsk.Window("GenericPane", "Object Explorer");
  windowsForms10SysTreeView32app03553390 = genericPane.Window("GenericPane").Window("WindowsForms10.Window.8.app.0.3553390").Window("WindowsForms10.SysTreeView32.app.0.3553390");
  windowsForms10SysTreeView32app03553390.ExpandItem("|dev-sandpit\\manualtesting (SQL Server 10.0.1600 - sa)|Databases");
  windowsForms10SysTreeView32app03553390.ExpandItem("|dev-sandpit\\manualtesting (SQL Server 10.0.1600 - sa)|Databases|ASPNETDB");
  windowsForms10SysTreeView32app03553390.ExpandItem("|dev-sandpit\\manualtesting (SQL Server 10.0.1600 - sa)|Databases|ASPNETDB|Tables");
  windowsForms10SysTreeView32app03553390.Drag(357, 260, 0, 128);
  windowsForms10SysTreeView32app03553390.ClickItemR("|dev-sandpit\\manualtesting (SQL Server 10.0.1600 - sa)|Databases|ASPNETDB|Tables|dbo.Treatment");
  ssms.Window("WindowsForms10.Window.20808.app.0.3553390").Click(46, 78);
  ezMdiContainer = wnd_desked_gsk.Window("MDIClient").Window("EzMdiContainer");
  MSPaneWindow = ezMdiContainer.Window("DockingView", "*").Window("GenericPane", "*").Window("MSPaneWindow", "{BADC3CB2-07EA-4E8D-BC19-35DF68AADD70}");
  richEdit20W = MSPaneWindow.Window("RichEdit20W");
  richEdit20W.HScroll.Pos = 0;
  richEdit20W.DblClick(111, 51);
  richEdit20W.Keys("^v");
  richEdit20W.Drag(131, 33, 19, -1);
  richEdit20W.Keys(" = 1[Del]");
  dataGridView = MSPaneWindow.Window("WindowsForms10.Window.8.app.0.3553390", "Query Result Pane").Window("WindowsForms10.Window.8.app.0.3553390", "DataGridView");
  dataGridView.Click(94, 28);
  wnd = dataGridView.Window("WindowsForms10.Window.8.app.0.3553390").Window("WindowsForms10.EDIT.app.0.3553390", "3ec041de-b468-4a89-a7ec-04948d8604a5");
  wnd.Drag(39, 7, 5, 0);
  wnd.wText = "2010-11-14 00:00:00";
  dataGridView.Window("WindowsForms10.SCROLLBAR.app.0.3553390", "", 1).wPosition = 341;
  dataGridView.Click(453, 33);
  wnd.Drag(37, 3, 6, 0);
  wnd.wText = "2010-11-18 00:00:00";
  dataGridView.Click(655, 30);
  wnd.Drag(35, 5, 6, 0);
  wnd.wText = "2010-11-14 12:05:00";
  dataGridView.Click(646, 53);
  ezMdiContainer.Click(720, 7);
  genericPane.Click(356, 8);
}

function Test64()
{
  var  ssms;
  var  dataGridView;
  var  wnd;
  var  wndWindowsForms10tooltipsclass32app03553390;
  ssms = Sys.Process("Ssms");
  dataGridView = ssms.Window("wndclass_desked_gsk", "Microsoft SQL Server Management Studio").Window("MDIClient").Window("EzMdiContainer").Window("DockingView", "*").Window("GenericPane", "*").Window("MSPaneWindow", "{BADC3CB2-07EA-4E8D-BC19-35DF68AADD70}").Window("WindowsForms10.Window.8.app.0.3553390", "Query Result Pane").Window("WindowsForms10.Window.8.app.0.3553390", "DataGridView");
  wnd = dataGridView.Window("WindowsForms10.Window.8.app.0.3553390").Window("WindowsForms10.EDIT.app.0.3553390", "3ec041de-b468-4a89-a7ec-04948d8604a5");
  wnd.Click(17, 5);
  wnd.Click(0, 7);
  wndWindowsForms10tooltipsclass32app03553390 = ssms.Window("WindowsForms10.tooltips_class32.app.0.3553390");
  wndWindowsForms10tooltipsclass32app03553390.Click(18, 0);
  dataGridView.Click(19, 8);
  wndWindowsForms10tooltipsclass32app03553390.Click(8, 4);
  wnd.wText = "2010-11-14";
  wnd.Keys("[Tab]");
  wnd.wText = "2010-11-18";
  wnd.Keys("[Tab]");
  wnd.wText = "2010-11-14";
  wnd.Keys("[Down]");
}

function Test65()
{
  var  ssms;
  ssms = Sys.Process("Ssms");
  ssms.Window("wndclass_desked_gsk", "Microsoft SQL Server Management Studio").Window("MDIClient").Window("EzMdiContainer").Window("DockingView", "*").Window("GenericPane", "*").Window("MSPaneWindow", "{BADC3CB2-07EA-4E8D-BC19-35DF68AADD70}").Window("WindowsForms10.Window.8.app.0.3553390", "Query Result Pane").Window("WindowsForms10.Window.8.app.0.3553390", "DataGridView").Click(17, 8);
  ssms.Window("WindowsForms10.tooltips_class32.app.0.3553390").Click(2, 9);
}

function Test66()
{
  Sys.Process("Ssms").Window("wndclass_desked_gsk", "Microsoft SQL Server Management Studio").Panel("MsoDockTop").Panel("Menubar").MenuItem("View").Click();
}

function Test67()
{
  Sys.Process("Ssms").Window("wndclass_desked_gsk", "Microsoft SQL Server Management Studio").Window("VsChannel", "", 4).Click(13, 38);
}

function Test68()
{
  Sys.Process("Ssms").Window("wndclass_desked_gsk", "Microsoft SQL Server Management Studio").Panel("MsoDockTop").Panel("Menubar").MenuItem("View").Click();
}

function Test69()
{
  var  iexplore;
  var  page;
  var  form;
  var  fieldset;
  var  textbox;
  var  panel;
  var  panel2;
  var  panel3;
  var  fieldset2;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5man/Authentication/LogOn?ReturnUrl=%2f");
  page = iexplore.Page("http://inrstar5man/Authentication/LogOn?ReturnUrl=%2f");
  form = page.Panel("MainPage").Panel("main").Panel("LogonPage").Form("Logon");
  form.Panel("Disclaimer").Fieldset(0).Panel(0).Panel(1).RadioButton("AgreeDisclaimer").Click();
  fieldset = form.Fieldset(0);
  textbox = fieldset.Panel(0).Textbox("Username");
  textbox.Click(104, 15);
  textbox.Text = "Jay";
  fieldset.Panel(1).PasswordBox("Password").Text = "Jay";
  fieldset.Panel(2).SubmitButton("LoginButton").Click();
  //Please wait until download completes: "http://inrstar5man/"
  page.Wait();
  panel = page.Panel("MainPage");
  panel2 = panel.Panel("header");
  panel2.Link("AdminLink").Click();
  panel3 = panel.Panel("main").Panel("MainContentPanel").Panel(0);
  panel3.Link("UserManagementTab").Click();
  panel = panel3.Panel("AdminContent");
  panel.Panel("AdminContent").Fieldset(0).Panel(1).Button("AddNewLocation").Click();
  form = panel.Fieldset(0).Form("NewSectionForm");
  textbox = form.Panel(0).Textbox("Name");
  textbox.Click(25, 12);
  textbox.Text = "The Barnum Practice";
  form.Panel(1).Select("Segment").ClickItem("Practice");
  textbox = form.Panel(2).Textbox("Code");
  textbox.Click(12, 13);
  textbox.Text = "BNM001";
  textbox = form.Panel(3).Textbox("Contact");
  textbox.Click(17, 9);
  textbox.Text = "Dr Fred Smith";
  form.Panel(4).Textbox("Title").Text = "Senior Partner";
  form.Panel(5).Textbox("PhoneNumber").Text = "01872 2345566";
  form.Panel(6).Textbox("MobileNumber").Text = "";
  form.Panel(7).Textbox("AddressLine1").Text = "67 Upper Boscawen Street";
  form.Panel(8).Textbox("AddressLine2").Text = "";
  form.Panel(9).Textbox("AddressLine3").Text = "";
  form.Panel(10).Textbox("Town").Text = "Penzance";
  form.Panel(11).Textbox("County").Text = "Cornwall";
  form.Panel(12).Textbox("PostCode").Text = "TR25 5RT";
  form.Panel(13).Textbox("Country").Text = "UK";
  form.Panel(14).Textbox("PrimaryEmailAddress").Text = "fred.smith@barnum.nhs.uk";
  form.Panel(16).SubmitButton("Accept").Click();
  panel3 = panel.Panel("AdminContent");
  panel3.Fieldset(0).Panel(0).Select("ChildSections").ClickItem("The Barnum Practice");
  panel3.Panel("LocationsUsersContainer").Fieldset(0).Panel(1).Button("AddNewUser").Click();
  form = panel.Fieldset(0).Form("CreateUserForm");
  textbox = form.Panel(0).Textbox("FullName");
  textbox.Click(42, 13);
  textbox.Text = "Dr Fred Smith";
  form.Panel(1).Textbox("Username").Text = "FredS";
  form.Panel(2).PasswordBox("Password").Text = "FredS01";
  form.Panel(3).PasswordBox("ConfirmPassword").Text = "FredS01";
  form.Panel(4).SubmitButton("Add").Click();
  panel3 = panel.Panel("AdminContent");
  panel3.Fieldset(0).Panel(0).Select("ChildSections").ClickItem("The Barnum Practice");
  panel = panel3.Panel("LocationsUsersContainer");
  panel.Fieldset(0).Panel(0).Select("Users").ClickItem("FredS");
  fieldset = panel.Panel("UserAccountContainer").Fieldset(0);
  fieldset.Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
  fieldset2 = fieldset.Panel("UserAdminContainer").Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0);
  fieldset2.Checkbox("roles_3").ClickChecked(true);
  fieldset2.Checkbox("roles_2").ClickChecked(true);
  fieldset2.Checkbox("roles").ClickChecked(true);
  fieldset2.Panel(0).SubmitButton("Update").Click();
  panel2.Panel("logindisplay").Panel("LoginStatus").Link(0).Click();
  //Please wait until download completes: "http://inrstar5man/Authentication/LogOn?ReturnUrl=%2f"
  page.Wait();
}

function Test70()
{
  var  iexplore;
  var  page;
  var  form;
  var  fieldset;
  var  textbox;
  var  panel;
  var  panel2;
  var  panel3;
  var  fieldset2;
  var  fieldset3;
  var  passwordBox;
  var  vselect;
  var  page32770;
  var  richEdit20WPT;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5man/Authentication/LogOn?ReturnUrl=%2f");
  page = iexplore.Page("http://inrstar5man/Authentication/LogOn?ReturnUrl=%2f");
  form = page.Panel("MainPage").Panel("main").Panel("LogonPage").Form("Logon");
  form.Panel("Disclaimer").Fieldset(0).Panel(0).Panel(1).RadioButton("AgreeDisclaimer").Click();
  fieldset = form.Fieldset(0);
  textbox = fieldset.Panel(0).Textbox("Username");
  textbox.Click(59, 8);
  textbox.Text = "FredS";
  fieldset.Panel(1).PasswordBox("Password").Text = "FredS01";
  fieldset.Panel(2).SubmitButton("LoginButton").Click();
  //Please wait until download completes: "http://inrstar5man/"
  page.Wait();
  panel = page.Panel("MainPage");
  panel2 = panel.Panel("header");
  panel2.Link("AdminLink").Click();
  panel3 = panel.Panel("main").Panel("MainContentPanel").Panel(0);
  panel3.Link("UserManagementTab").Click();
  panel = panel3.Panel("AdminContent");
  panel.Panel("AdminContent").Panel("LocationsUsersContainer").Fieldset(0).Panel(1).Button("AddNewUser").Click();
  form = panel.Fieldset(0).Form("CreateUserForm");
  textbox = form.Panel(0).Textbox("FullName");
  textbox.Click(46, 12);
  textbox.Text = "Helen Jones";
  form.Panel(1).Textbox("Username").Text = "HelenJ";
  form.Panel(2).PasswordBox("Password").Text = "HelenJ01";
  form.Panel(3).PasswordBox("ConfirmPassword").Text = "HelenJ01";
  form.Panel(4).SubmitButton("Add").Click();
  panel3 = panel.Panel("AdminContent").Panel("LocationsUsersContainer");
  fieldset = panel3.Fieldset(0);
  fieldset.Panel(0).Select("Users").ClickItem("HelenJ");
  fieldset2 = panel3.Panel("UserAccountContainer").Fieldset(0);
  fieldset2.Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
  fieldset3 = fieldset2.Panel("UserAdminContainer").Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0);
  fieldset3.Checkbox("roles_3").ClickChecked(true);
  fieldset3.Checkbox("roles_7").ClickChecked(false);
  fieldset3.Panel(0).SubmitButton("Update").Click();
  fieldset.Panel(1).Button("AddNewUser").Click();
  form = panel.Fieldset(0).Form("CreateUserForm");
  textbox = form.Panel(0).Textbox("FullName");
  textbox.Click(44, 12);
  textbox.Text = "Jane Evans";
  form.Panel(1).Textbox("Username").Text = "JaneE";
  form.Panel(2).PasswordBox("Password").Text = "JaneE01";
  form.Panel(3).PasswordBox("ConfirmPassword").Text = "JaneE01";
  form.Panel(4).SubmitButton("Add").Click();
  panel3 = panel.Panel("AdminContent").Panel("LocationsUsersContainer");
  fieldset = panel3.Fieldset(0);
  fieldset.Panel(0).Select("Users").ClickItem("JaneE");
  fieldset2 = panel3.Panel("UserAccountContainer").Fieldset(0);
  fieldset2.Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
  fieldset3 = fieldset2.Panel("UserAdminContainer").Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0);
  fieldset3.Checkbox("roles_2").ClickChecked(true);
  fieldset3.Checkbox("roles_7").ClickChecked(false);
  fieldset3.Panel(0).SubmitButton("Update").Click();
  fieldset.Panel(1).Button("AddNewUser").Click();
  form = panel.Fieldset(0).Form("CreateUserForm");
  textbox = form.Panel(0).Textbox("FullName");
  textbox.Click(56, 14);
  textbox.Text = "Sally Thompson";
  form.Panel(1).Textbox("Username").Text = "SallyT";
  passwordBox = form.Panel(2).PasswordBox("Password");
  passwordBox.Text = "Sallt01";
  form.Panel(3).PasswordBox("ConfirmPassword").Text = "SallyT01";
  passwordBox.Drag(64, 9, -126, -2);
  passwordBox.Text = "SallyT01";
  form.Panel(4).SubmitButton("Add").Click();
  panel3 = panel.Panel("AdminContent").Panel("LocationsUsersContainer");
  vselect = panel3.Fieldset(0).Panel(0).Select("Users");
  vselect.ClickItem("SallyT");
  panel = panel3.Panel("UserAccountContainer");
  fieldset = panel.Fieldset(0);
  fieldset.Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
  fieldset2 = fieldset.Panel("UserAdminContainer").Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0);
  fieldset2.Checkbox("roles").ClickChecked(true);
  fieldset2.Checkbox("roles_7").ClickChecked(false);
  fieldset2.Panel(0).SubmitButton("Update").Click();
  vselect.ClickItem("FredS");
  fieldset = panel.Fieldset(0);
  fieldset.Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
  fieldset2 = fieldset.Panel("UserAdminContainer").Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0);
  fieldset2.Checkbox("roles_4").ClickChecked(true);
  fieldset2.Checkbox("roles_7").ClickChecked(false);
  fieldset2.Checkbox("roles_6").ClickChecked(true);
  fieldset2.Panel(0).SubmitButton("Update").Click();
  panel2.Panel("logindisplay").Panel("LoginStatus").Link(0).Click();
  //Please wait until download completes: "http://inrstar5man/Authentication/LogOn?ReturnUrl=%2f"
}

function Test71()
{
  var  iexplore;
  var  fieldset;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/SystemAdministration/Dashboard");
  fieldset = iexplore.Page("http://inrstar5auto/SystemAdministration/Dashboard").Panel("MainPage").Fieldset("DashboardContent");
  fieldset.Panel(0).Panel("navigation").Link("AccountManagementLink").Click();
  fieldset.Panel("main").Panel("MainContentPanel").Panel(1).Button("New_Client").Click();
}

function Test72()
{
  var  iexplore;
  var  panel;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/SystemAdministration/Dashboard");
  panel = iexplore.Page("http://inrstar5auto/SystemAdministration/Dashboard").Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel");
  panel.Panel(0).Select("ClientAccounts").ClickItem("Stu Test");
  panel.Panel(1).Button("View_Client").Click();
  panel.Panel("AccountTabs").Link("AccountAdministratorTab").Click();
  panel.Panel("ClientAccountContent").Panel(0).Button("Add").Click();
}

function Test73()
{
  var  iexplore;
  var  form;
  var  textbox;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/SystemAdministration/Dashboard");
  form = iexplore.Page("http://inrstar5auto/SystemAdministration/Dashboard").Panel("MainPage").Fieldset("DashboardContent").Panel("main").Panel("MainContentPanel").Panel("ClientAccountContent").Fieldset(0).Form("AddAdministrator");
  textbox = form.Panel(0).Textbox("FullName");
  textbox.Click(11, 9);
  textbox.Text = "Full Name";
  form.Panel(1).Textbox("Username").Text = "Username";
  form.Panel(2).PasswordBox("Password").Text = "password1";
  form.Panel(3).PasswordBox("ConfirmPassword").Text = "Password1";
  form.Panel(4).SubmitButton("Add").Click();
}

function Test74()
{
  var  iexplore;
  var  panel;
  var  panel2;
  var  fieldset;
  var  fieldset2;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  panel = iexplore.Page("http://inrstar5auto/").Panel("MainPage");
  panel.Panel("header").Link("AdminLink").Click();
  panel2 = panel.Panel("main").Panel("MainContentPanel").Panel(0);
  panel2.Link("UserManagementTab").Click();
  panel = panel2.Panel("AdminContent").Panel("AdminContent").Panel("LocationsUsersContainer");
  panel.Fieldset(0).Panel(0).Select("Users").ClickItem("Loc2Org");
  fieldset = panel.Panel("UserAccountContainer").Fieldset(0);
  fieldset.Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
  fieldset2 = fieldset.Panel("UserAdminContainer").Fieldset(0).Panel(0).Form("RolesForm").Fieldset(0);
  fieldset2.Checkbox("roles_4").ClickChecked(true);
  fieldset2.Panel(0).SubmitButton("Update").Click();
}

function Test75()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("AdminContent").Panel("LocationsUsersContainer").Fieldset(0).Panel(1).Button("AddNewUser").Click();
}

function Test76()
{
  var  iexplore;
  var  panel;
  var  panel2;
  var  fieldset;
  var  button;
  var  panel3;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  panel = iexplore.Page("http://inrstar5auto/").Panel("MainPage");
  panel2 = panel.Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("AdminContent");
  fieldset = panel2.Fieldset(0);
  button = fieldset.Panel(1).Button("AddNewLocation");
  button.Click();
  button.Click();
  panel3 = fieldset.Panel(0);
  panel3.Select("ChildSections").Click(160, 10);
  panel3.Click(481, 0);
  panel.Panel("header").Panel("logindisplay").Panel("LoginStatus").Link(0).Click();
  panel2.Panel("LocationsUsersContainer").Fieldset(0).Panel(0).Click(503, 2);
}

function Test77()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("AdminContent").Fieldset(0).Panel(1).Button("AddNewLocation").Click();
}

function Test78()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("header").Link("AdminLink").Click();
  Sys.Process("Explorer").Window("Shell_TrayWnd").Window("ReBarWindow32").Window("MSTaskSwWClass", "Running Applications").Window("ToolbarWindow32", "Running Applications").CheckItem("Rescue Technician Console - Windows Internet Explorer", true, false);
}

function Test79()
{
  var  iexplore;
  var  panel;
  var  panel2;
  var  fieldset;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  panel = iexplore.Page("http://inrstar5auto/").Panel("MainPage");
  panel.Panel("header").Link("AdminLink").Click();
  panel2 = panel.Panel("main").Panel("MainContentPanel").Panel(0);
  panel2.Link("UserManagementTab").Click();
  fieldset = panel2.Panel("AdminContent").Panel("AdminContent").Fieldset(0);
  fieldset.Panel(0).Select("ChildSections").ClickItem("The Valley Practice Org");
  fieldset.Panel(1).Button("AddNewLocation").Click();
}

function Test80()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("AdminContent").Panel("LocationsUsersContainer").Panel("UserAccountContainer").Fieldset(0).Panel("UserAdmin").Link("UserRolesAndPermissionsLink").Click();
}

function Test81()
{
  var  iexplore;
  var  panel;
  var  form;
  var  textbox;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  panel = iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent");
  panel.Fieldset(0).Panel(0).Button("AddDoctorLink").Click();
  form = panel.Fieldset(0).Form("AddClinicianForm");
  textbox = form.Panel(0).Textbox("Name");
  textbox.Click(49, 13);
  textbox.Text = "Sid Bron";
  form.Panel(2).SubmitButton("Save").Click();
}

function Test82()
{
  var  iexplore;
  var  page;
  var  panel;
  var  form;
  var  textbox;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  page = iexplore.Page("http://inrstar5auto/");
  panel = page.Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent");
  panel.Fieldset(0).Panel(0).Button("AddNPTBatchDetailsLink").Click();
  form = panel.Fieldset(0).Form("NewNPTBatchDetailsForm");
  textbox = form.Panel(0).Textbox("BatchNumber");
  textbox.Click(10, 10);
  textbox.Text = "t1234";
  form.Panel(2).SubmitButton("SubmitNewNPTBatchDetails").Click();
  panel.Fieldset(0).Panel(0).Button("AddNPTBatchDetailsLink").Click();
  form = panel.Fieldset(0).Form("NewNPTBatchDetailsForm");
  textbox = form.Panel(0).Textbox("BatchNumber");
  textbox.Click(54, 14);
  textbox.Text = "t1235";
  form.Panel(1).Image("calendar_png").Click(12, 10);
  panel = page.Panel("ui_datepicker_div");
  panel.Panel(0).Panel(0).Select(1).Click(67, 11);
  panel.Table(0).Cell(2, 3).Link(0).Click();
  form.Panel(2).SubmitButton("SubmitNewNPTBatchDetails").Click();
}


function Test83()
{
  var  wndWindowsForms10Window8app0378734a;
  var  wnd;
  TestedApps.NHSNumberGenerator3.Run(1, true);
  wndWindowsForms10Window8app0378734a = Sys.Process("NHSNumberGenerator").Window("WindowsForms10.Window.8.app.0.378734a", "Generate NHS Number");
  wndWindowsForms10Window8app0378734a.Window("WindowsForms10.BUTTON.app.0.378734a", "Generate").ClickButton();
  wnd = wndWindowsForms10Window8app0378734a.Window("WindowsForms10.EDIT.app.0.378734a");
  wnd.Drag(149, 17, -213, -3);
  wnd.Keys("^c");
  wndWindowsForms10Window8app0378734a.Close();
  Sys.Process("Explorer").Window("Shell_TrayWnd").Window("ReBarWindow32").Window("MSTaskSwWClass", "Running Applications").Window("ToolbarWindow32", "Running Applications").CheckItem("TestComplete - C:\\TFSWFRoot\\SCSL\\Products\\INRstarV5\\INRstarV5.pjs", true, false);
}

function Test84()
{
  var  iexplore;
  var  form;
  var  textarea;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  form = iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel("PatientTabContent").Fieldset("DeactivatePatient").Form("DeactivatePatientForm");
  form.Panel(0).Select("InactiveReason").ClickItem("Other");
  textarea = form.Panel(1).Textarea("Notes");
  textarea.Click(91, 13);
  textarea.Keys("Set Inactive on creation");
  form.Panel(2).SubmitButton("Confirm").Click();
}

function Test85()
{
  var  iexplore;
  var  link;
  iexplore = Sys.Process("iexplore", 6);
  iexplore.ToURL("http://inrstar5auto/");
  link = iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("header").Link("AdminLink");
  link.Click();
  link.Click();
  link.Click();
}

function Test86()
{
  var  iexplore;
  var  panel;
  var  panel2;
  var  fieldset;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  panel = iexplore.Page("http://inrstar5auto/").Panel("MainPage");
  panel.Panel("header").Link("AdminLink").Click();
  panel2 = panel.Panel("main").Panel("MainContentPanel").Panel(0);
  panel2.Link("LocationManagementTab").Click();
  panel = panel2.Panel("AdminContent");
  fieldset = panel.Fieldset(0);
  fieldset.Panel(0).Select("Locations").ClickItem("Maplestead Surgey Org");
  fieldset.Panel(1).Button("ManageLocation").Click();
  panel2 = panel.Panel("LocationContent");
  panel2.Panel("LocationTab").Link("LocationUsersLink").Click();
  panel2.Panel("LocationTabContent").Fieldset(0).Panel(1).Button("AddNewUser").Click();
}

function Test87()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("LocationContent").Panel("LocationTabContent").Panel("UserContent").Fieldset(0).Panel("UserAdmin").Link("UserAuthorisationLink").Click();
}

function Test88()
{
  var  iexplore;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("LocationContent").Panel("LocationTabContent").Fieldset(0).Panel(1).Button("ManageUser").Click();
}

function Test89()
{
  var  iexplore;
  var  panel;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  panel = iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("LocationContent");
  panel.Panel("LocationTab").Link("LocationUsersLink").Click();
  panel.Panel("LocationTabContent").Fieldset(0).Panel(1).Button("AddNewUser").Click();
}

function Test90()
{
  var  iexplore;
  var  panel;
  var  fieldset;
  iexplore = Sys.Process("iexplore", 2);
  iexplore.ToURL("http://inrstar5auto/");
  panel = iexplore.Page("http://inrstar5auto/").Panel("MainPage").Panel("main").Panel("MainContentPanel").Panel(0).Panel("AdminContent").Panel("LocationContent").Panel("LocationTabContent");
  fieldset = panel.Fieldset(0);
  fieldset.Panel(0).Select("Users").ClickItem("freda.smith@001.com");
  fieldset.Panel(1).Button("ManageUser").Click();
  panel.Panel("UserContent").Fieldset(0).Panel("UserAdmin").Link("UserAuthorisationLink").Click();
}

function Test91()
{
	var  browser;
	var  form;
	var  panel;
	var  textbox;
	browser = Aliases.INRstarWindows.wndINRstar.WindowsForms10Window8app033c0d9d.ShellEmbedding.ShellDocObjectView.browser;
	browser.ToURL("http://inrstar5auto/Security/Authentication/LogOn?ReturnUrl=%2f");
	form = browser.pageInrstar.panelMainpage.panelMain.panelLogonpage.panelLogonformwrapper.formLogon;
	form.panelDisclaimer.panelActionButtonContainer.panelData.radiobuttonAgreedisclaimer.Click();
	panel = form.panelLoginarea;
	textbox = panel.panelData.textboxUsername;
	textbox.Click(66, 11);
	textbox.Text = "hugo.searle@002.com";
	panel.panelData1.passwordboxPassword.Text = "Hugo02";
	panel.panelActionButtonContainer.submitbuttonLoginbutton.Click();
	//Please wait until download completes: "http://inrstar5auto/"
	browser.Wait();
}

function Test92()
{
  var  mozillaWindowClass;
  mozillaWindowClass = Aliases.firefox.wndMozillaUIWindowClass.MozillaWindowClass.MozillaContentWindowClass.MozillaWindowClass;
  mozillaWindowClass.Click(583, 322);
  mozillaWindowClass.Click(401, 449);
  mozillaWindowClass.Keys("Sally.[BS][BS][BS][BS][BS][BS][BS]sally.church@002.com[Tab]Sall0[BS]y02");
  mozillaWindowClass.Click(657, 508);
}

function Test93()
{
  var  firefox;
  var  mozillaWindowClass;
  firefox = Aliases.firefox;
  mozillaWindowClass = firefox.wndMozillaUIWindowClass.MozillaWindowClass.MozillaContentWindowClass.MozillaWindowClass;
  mozillaWindowClass.Click(246, 128);
  mozillaWindowClass.Click(59, 174);
  mozillaWindowClass.Click(193, 303);
  mozillaWindowClass.Click(245, 383);
  mozillaWindowClass.Click(245, 416);
  mozillaWindowClass.Click(565, 418);
  mozillaWindowClass.Click(566, 469);
  mozillaWindowClass.Click(808, 384);
  firefox.wndMozillaWindowClass.Click(50, 88);
  mozillaWindowClass.Click(788, 508);
  mozillaWindowClass.Click(606, 454);
  mozillaWindowClass.Click(667, 453);
  mozillaWindowClass.MouseWheel(-4);
  mozillaWindowClass.Click(613, 695);
}

function Test94()
{
  var  iexplore;
  var  page;
  var  panel;
  var  form;
  iexplore = Aliases.iexplore;
  iexplore.ToURL("http://inrstar5auto/");
  page = iexplore.pageInrstar;
  panel = page.panelMainpage.panelMain.panelMaincontentpanel.panelPatientrecord.panelPatienttab.panelPatienttabcontent.panelPatienttreatmentwrapper.panelPatientpendingtreatment;
  panel.panelDosingschedule.panelActionButtonContainer.buttonOverridependingtreatment.Click();
  form = panel.formEditpendingtreatmentform;
  form.tableOverridesuggestedtreatmentt.cell.imageCalendarPng.Click(9, 5);
  panel = page.panelUiDatepickerDiv;
  panel.panelUiDatepickerHeaderUiWidgetH.panelUiDatepickerTitle.selectUiDatepickerMonth.Click(68, 12);
  iexplore.browser.pageHttpInrstar5auto.select.Click(44, 11);
  panel.Click(153, 191);
  panel.tableUiDatepickerCalendar.cell.link31.Click();
  form.panelActionButtonContainer.buttonOverrideaccept.Click();
}

function Test95()
{
  var  iexplore;
  var  page;
  var  panel;
  var  panel2;
  var  form;
  var  fieldset;
  var  table;
  var  textbox;
  iexplore = Aliases.iexplore;
  iexplore.ToURL("http://inrstar5auto/");
  page = iexplore.pageInrstar;
  panel = page.panelMainpage;
  panel.panelHeader.linkOptionslink.Click();
  panel2 = panel.panelMain.panelMaincontentpanel;
  panel2.panelTabs.linkIqctab.Click();
  panel = panel2.panelAdmincontent;
  panel2 = panel.panelIqcwrapper;
  panel2.panelActionButtonContainer.buttonAddiqc.Click();
  form = panel.formAddiqcresultform;
  fieldset = form.fieldsetContainer;
  fieldset.panelData.imageCalendarPng.Click(8, 7);
  table = page.panelUiDatepickerDiv.tableUiDatepickerCalendar;
  table.cell1.link6.Click();
  textbox = fieldset.panelData1.textboxBatchnumber;
  textbox.Click(45, 10);
  textbox.Text = "XYZ123";
  fieldset.panelData2.imageCalendarPng.Click(13, 9);
  table.cell.link30.Click();
  textbox = fieldset.panelData3.textboxExpectedresult;
  textbox.Click(63, 14);
  textbox.Text = "2.5-3.5";
  fieldset.panelData5.selectResult.ClickItem("3.3");
  textbox = fieldset.panelData4.textboxMachineid;
  textbox.Click(90, 13);
  textbox.Text = "XS-004";
  form.panelActionButtonContainer.submitbuttonAddiqcresult.Click();
  panel2.tableLocationsiqctable.cellCol8.buttonEditiqc.Click();
  form = panel.formEditiqcresultform;
  form.fieldsetContainer.panelData.selectResult.ClickItem("3.0");
  form.panelActionButtonContainer.submitbuttonUpdateiqcresult.Click();
}

function Test96()
{
  var  iexplore;
  var  page;
  var  panel;
  var  button;
  var  form;
  var  vselect;
  var  button2;
  var  textNode;
  iexplore = Aliases.iexplore;
  iexplore.ToURL("http://inrstar5auto/");
  page = iexplore.pageInrstar;
  panel = page.panelMainpage.panelMain.panelMaincontentpanel.panelPatientrecord.panelPatienttabcontent.panelPatienttreatmentwrapper.panelPatientpendingtreatment.panelPendingtreatmentinfo;
  button = panel.panelActionButtonContainer.buttonOverridependingtreatment;
  button.Click();
  form = panel.formEditpendingtreatmentform;
  vselect = form.tableOverridesuggestedtreatmentt.cell.selectTreatmentDose;
  vselect.ClickItem("0.1");
  button2 = form.panelActionButtonContainer.buttonOverrideaccept;
  button2.Click();
  textNode = page.panelUiDialogUiWidgetUiWidgetCon.panelUiDialogButtonpaneUiWidgetC.panelUiDialogButtonset.buttonUiButtonUiWidgetUiStateDef.textnodeConfirm;
  textNode.Click(52, 22);
  button.Click();
  vselect.ClickItem("0.2");
  button2.Click();
  textNode.Click(41, 22);
  button.Click();
  vselect.ClickItem("0.3");
  button2.Click();
  textNode.Click(37, 13);
}

function Test97()
{
  var  iexplore;
  var  panel;
  var  textbox;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://192.168.16.158/");
  panel = iexplore.pageInrstar.panelMainpage.panelMain.panelMaincontentpanel.panelPatientcontent.fieldsetPatientdetailsaddfieldse.formPatientadddetailsform.fieldsetContainer.panelEditpatientdetails;
  panel.panelData1.selectTitle.ClickItem("Mr");
  textbox = panel.panelData.textboxSurname;
  textbox.Click(44, 13);
  textbox.Text = "J";
  Aliases.Dwm.wndGhost.Click(379, 682);
  Aliases.WerFault.dlgInternetExplorer.DirectUIHWND.CtrlNotifySink.btnCloseProgram.ClickButton();
}

function Test98()
{
  var  iexplore;
  var  page;
  var  form;
  var  panel;
  var  textbox;
  var  panel2;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://192.168.16.158/");
  page = iexplore.pageInrstar;
  form = page.panelMainpage.panelMain.panelMaincontentpanel.panelPatientcontent.fieldsetPatientdetailsaddfieldse.formPatientadddetailsform;
  panel = form.fieldsetContainer.panelEditpatientdetails;
  panel.panelData1.selectTitle.ClickItem("Mr");
  textbox = panel.panelData.textboxSurname;
  textbox.Click(30, 10);
  textbox.Text = "Jones";
  textbox = panel.panelData2.textboxFirstname;
  textbox.Click(30, 17);
  textbox.Text = "Freddy";
  panel2 = panel.panelData3;
  panel2.Click(260, 11);
  panel2.imageCalendarPng.Click(12, 12);
  panel = page.panelUiDatepickerDiv;
  panel.panelUiDatepickerHeaderUiWidgetH.panelUiDatepickerTitle.selectUiDatepickerYear.ClickItem("1958");
  panel.tableUiDatepickerCalendar.cell.link4.Click();
  form.panelActionButtonContainer.submitbuttonAddpatientdetails.Click();
}

function Test99()
{
  var  iexplore;
  var  page;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("https://83.98.30.169/");
  page = iexplore.pageInrstar1;
  page.panelMainpage.panelMain.panelMaincontentpanel.panelPatientcontent.panelSearchresults.panelPatientsearchresults.tablePatientresults.cellCol1.linkPatientlink.Click();
  page.panelUiDialogUiWidgetUiWidgetCon.panelUiDialogButtonpaneUiWidgetC.panelUiDialogButtonset.buttonUiButtonUiWidgetUiStateDef.textnodeConfirm.Click(40, 14);
}

function Test100()
{
  var  iexplore;
  var  panel;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://inrstar5testing/");
  panel = iexplore.pageInrstar2.panelMainpage.panelMain.panelMaincontentpanel.panelUsertabcontent.panelUsermessages.panelUserclinicalreports.panelOverduepatients;
  panel.tablePatientoverduereporttable.cellNhsnumber.Drag(105, 22, 9, 174);
  panel.panelActionButtonContainer.buttonPrintoverduereport.Click();
}

function Test101()
{
  var  iexplore;
  var  panel;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://inrstar5testing/");
  panel = iexplore.pageInrstar2.panelMainpage.panelMain.panelMaincontentpanel.panelUsertabcontent.panelUsermessages.panelUserclinicalreports;
  panel.linkOverduepatientheaderlink.Click();
  panel.panelOverduepatients.tablePatientoverduereporttable.cellTextcolumn.linkPatientlink.Click();
}

function Test102()
{
  var  iexplore;
  var  fieldset;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://inrstar5testing/");
  fieldset = iexplore.pageInrstar2.panelMainpage.panelMain.panelMaincontentpanel.panelPatientrecord.panelPatienttabcontent.panelPatienttreatmentwrapper.panelPatientpendingtreatment.panelPendingtreatmentinfo.panelDosingschedulecontent.fieldsetContainer;
  fieldset.panelActionButtonContainer.buttonReOrderSchedule.Click();
  fieldset.fieldsetSchedulegrid.textnodeTake10XWhite05mgTotal50m.Drag(82, 9, 6, 119);
}

function Test103()
{
  var  iexplore;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://inrstar5testing/");
  iexplore.pageInrstar2.panelMainpage.panelMain.panelMaincontentpanel.panelPatientrecord.panelPatienttabcontent.panelPatienttreatmentwrapper.panelPatientpendingtreatment.panelPendingtreatmentinfo.panelDosingschedulecontent.fieldsetContainer.fieldsetSchedulegrid.textnodeTake5XBrown1mgTotal50mg.Drag(106, 12, -2, 146);
}

function Test104()
{
  var  iexplore;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://inrstar5testing/");
  iexplore.pageInrstar2.panelMainpage.panelMain.panelMaincontentpanel.panelPatientrecord.panelPatienttabcontent.panelPatienttreatmentwrapper.panelPatientpendingtreatment.panelPendingtreatmentinfo.panelDosingschedulecontent.fieldsetContainer.fieldsetSchedulegrid.textnodeTake1XBlue3mg2XBrown1mgT.Drag(22, 2, 1, 108);
}

function Test105()
{
  var  iexplore;
  var  page;
  var  panel;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://inrstar5testing/");
  page = iexplore.pageInrstar2;
  page.panelMainpage.panelMain.panelMaincontentpanel.panelPatientrecord.panelPatienttabcontent.panelPatienttreatmentwrapper.panelPatienttreatmenthistory.panelPatienttreatmentinrhistory.panelViewpatienthistoricaltreatm.tablePatienttreatmenthistorytabl.cellPatienttreatmenthistorytable.linkTreatmentinformationactionli.imageNotificationiconPng.Click(6, 11);
  panel = page.panelUiDialogUiWidgetUiWidgetCon.panelUiDialogButtonpaneUiWidgetC.panelUiDialogButtonset;
  panel.buttonUiButtonUiWidgetUiStateDef.textnodeViewAuditTrail.Click(74, 15);
  panel.buttonUiButtonUiWidgetUiStateDef1.textnodeClose.Click(11, 9);
}

function Test106()
{
  var  iexplore;
  var  form;
  var  textarea;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://inrstar5testing/");
  form = iexplore.pageInrstar2.panelMainpage.panelMain.panelMaincontentpanel.panelPatientrecord.panelPatienttabcontent.fieldsetDeactivatepatient.formDeactivatepatientform;
  form.panelData.selectInactivereason.ClickItem("Other");
  textarea = form.panelDataNoheight.textareaNotes;
  textarea.Click(198, 14);
  textarea.Keys("Pre-release testing");
  form.panelActionButtonContainer.submitbuttonConfirm.Click();
}

function Test107()
{
  var  iexplore;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://inrstar5testing/");
  iexplore.pageInrstar2.panelMainpage.panelMain.panelMaincontentpanel.panelPatientrecord.panelPatienttabcontent.panelPatientadverseeventswrapper.panelPatientadverseeventlist.Click(112, 10);
}

function Test108()
{
  var  explorer;
  var  msctls_progress32;
  explorer = Aliases.Explorer;
  explorer.wndShell_TrayWnd.ReBarWindow32.MSTaskSwWClass.MSTaskListWClass.Click(151, 24);
  msctls_progress32 = explorer.wndLibraries.WorkerW.ReBarWindow32.AddressBandRoot.msctls_progress32;
  msctls_progress32.ToolbarWindow32.ClickItem(202, false);
  msctls_progress32.ComboBoxEx32.ClickItem("\\\\inrstar5testing\\c$");
  explorer.wndCabinetWClass.ShellTabWindowClass.DUIViewWndClassName.DirectUIHWND.CtrlNotifySink.ShellView.DirectUIHWND.DblClick(60, 60);
  explorer.wndinetpub.inetpub.DUIViewWndClassName.DirectUIHWND.CtrlNotifySink.ShellView.DirectUIHWND.DblClick(59, 124);
  explorer.wndwwwroot.wwwroot.DUIViewWndClassName.DirectUIHWND.CtrlNotifySink.ShellView.DirectUIHWND.DblClick(57, 62);
  explorer.wndINRstar.INRstar.DUIViewWndClassName.DirectUIHWND.CtrlNotifySink.ShellView.DirectUIHWND.DblClick(56, 42);
  TestedApps.MSACCESS.Run(1, true);
  explorer.dlg.DirectUIHWND.CtrlNotifySink.btnOK.ClickButton();
}

function Test109()
{
  var  iexplore;
  var  panel;
  iexplore = Aliases.iexplore1;
  iexplore.ToURL("http://inrstar5testing/");
  panel = iexplore.pageInrstar2.panelMainpage.panelMain.panelMaincontentpanel.panelUsertabcontent.panelUsermessages.panelUserclinicalreports;
  panel.linkReferredpatientheaderlink.Click();
  panel.panelReferredpatients.tableReferredpatientreporttable.cellTextcolumn.linkPatientlink.Click();
}

function Test110()
{
  var iexplore;
  var fieldset;
  iexplore = Aliases.iexplore1;
  iexplore.ToUrl("http://192.168.16.158:8080/");
  fieldset = iexplore.pageInrstarAdmin.panelMainpage.fieldsetDashboardcontent;
  fieldset.panelLeftcol.panelNavigation.linkAccountmanagementlink.Click();
  fieldset.panelMain.panelMaincontentpanel.panelActionButtonContainer.buttonNewClient.Click();
}

function Test111()
{
  var form1;
  var button;
  var textBox;
  var edit;
  form1 = Aliases.NHSNumberGenerator.Form1;
  button = form1.button1;
  button.ClickButton();
  button.ClickButton();
  textBox = form1.textBox1;
  textBox.Drag(149, 19, -163, 0);
  textBox.ClickR(35, 21);
  textBox.PopupMenu.Click("Copy");
  TestedApps.notepad.Run(1, true);
  edit = Aliases.notepad.wndNotepad.Edit;
  edit.ClickR(208, 72);
  edit.PopupMenu.Click("Paste");
}

function Test112()
{
  var iexplore;
  var form;
  var panel;
  var textbox;
  iexplore = Aliases.iexplore;
  iexplore.ToUrl("http://inrstar5testing:8080/Security/Authentication/LogOn?ReturnUrl=%2f");
  form = iexplore.pageInrstar1.panelMainpage.panelMain.panelLogonpage.panelLogonformwrapper.formLogon;
  form.panelDisclaimer.panelActionButtonContainer.panelData.radiobuttonAgreedisclaimer.Click();
  panel = form.panelLoginarea;
  textbox = panel.panelLogininput.panelData.textboxUsername;
  textbox.Click(80, 7);
  textbox.SetText("guyifgyuifhugh");
  panel.panelActionButtonContainer.submitbuttonLoginbutton.Click();
  //Please wait until download completes: "http://inrstar5testing:8080/Security/Authentication/LogOn"
  iexplore.pageInrstar2.Wait();
}

function Test113()
{
  var form1;
  var textBox;
  Aliases.NHSNumberGenerator.Form1.Close();
  TestedApps.NHSNumberGenerator.Run(1, true);
  form1 = Aliases.NHSNumberGenerator.Form1;
  form1.button1.ClickButton();
  textBox = form1.textBox1;
  textBox.Drag(149, 14, -188, 4);
  textBox.Keys("^c");
}

function Test114()
{
  var browser;
  var panel;
  var panel2;
  browser = Aliases.INRstarWindows.BrowserForm.INRstarBrowser.WebBrowserBaseNativeWindow.ShellDocObjectView.browser;
  panel = browser.pageHttp19216816158SecurityAuthe.panelMainpage.panelMain.panelLogonpage.panelLogonformwrapper.formLogon.panelLoginarea;
  panel2 = panel.panelLogininput;
  panel2.panelData.textboxUsername.SetText("gov@prison");
  panel2.panelData1.passwordboxPassword.SetText("INRstar_5");
  panel.panelActionButtonContainer.submitbuttonLoginbutton.ClickButton();
  browser.Wait();
  panel = browser.pageHttp19216816158.panelMainpage;
  panel.panelHeader.linkMainpatientlink.Click();
  panel2 = panel.panelMain.panelMaincontentpanel;
  panel2.panelManagepatients.panelPatienttab.linkRecentpatientstablink.Click();
  panel2.panelPatientcontent.panelRecentpatientswrapper.tableRecentpatientstable.cellCol1.linkPatientlink.Click();
}

function Test115()
{
  var iexplore;
  var page;
  var panel;
  var panel2;
  var cell;
  iexplore = Aliases.iexplore1;
  iexplore.ToUrl("http://192.168.16.158:8040/");
  page = iexplore.pageInrstar3;
  page.panelMainpage.panelMain.panelMaincontentpanel.panelPatientrecord.panelPatienttabcontent.panelPatienttreatmentwrapper.panelPatientpendingtreatment.panelActionButtonContainer.buttonMakeappointment.ClickButton();
  panel = page.panelUiDialogUiWidgetUiWidgetCon;
  panel2 = panel.panelModaldialogbox;
  cell = panel2.panelClinicswrapper.tableScheduler.cell;
  cell.panelSchedulerContainerblockInne.tableSchedulerContainerblockCont.cell.panelSchedulerContainerblockVert.panelSchedulerContainerblockVert.panelAppointmentlayer.panelSchedulerAptsblockAptdiv0.panelSchedulerAptsblockApttempla.table.cell.ClickR(40, 74);
  cell.panelSchedulerAptmenublockInnerc.panelSchedulerAptmenublockSmapt.tableSchedulerAptmenublockSmaptD.cellDxmsubmenuInrstar.table.cellSchedulerAptmenublockSmaptDx.textnodeMakeAppointment.Click(5, 9);
  cell = panel2.panelModalappointmentswrapper.tableAppointmentsscheduler.cell;
  panel2 = cell.panelAppointmentsschedulerContai.tableAppointmentsschedulerContai.cell.panelAppointmentsschedulerContai.panelAppointmentsschedulerContai.panelSelectionlayer.panelAppointmentsschedulerCommon;
  panel2.Click(210, 8);
  panel2.ClickR(211, 12);
  cell.panelAppointmentsschedulerViewme.panelAppointmentsschedulerViewme.tableAppointmentsschedulerViewme.cellDxmsubmenuInrstar.table.cellAppointmentsschedulerViewmen.textnodeMakeAppointment.Click(9, 5);
  panel.panelUiDialogButtonpaneUiWidgetC.panelUiDialogButtonset.buttonUiButtonUiWidgetUiStateDef.ClickButton();
}

function Test116()
{
  var iexplore;
  iexplore = Aliases.iexplore1;
  iexplore.ToUrl("http://192.168.16.158/");
  iexplore.pageInrstar.panelUiDialogUiWidgetUiWidgetCon.panelModaldialogbox.panelModalappointmentswrapper.tableAppointmentsscheduler.cell.panelAppointmentsschedulerContai.tableAppointmentsschedulerContai.cell.panelAppointmentsschedulerContai.Drag(797, 49, -3, 102);
}

function Test117()
{
  var iexplore;
  var panel;
  iexplore = Aliases.iexplore1;
  iexplore.ToUrl("http://192.168.16.158/");
  panel = iexplore.pageInrstar.panelUiDialogUiWidgetUiWidgetCon.panelModaldialogbox.panelModalappointmentswrapper.tableAppointmentsscheduler.cell.panelAppointmentsschedulerContai.tableAppointmentsschedulerContai.cell.panelAppointmentsschedulerContai;
  panel.HoverMouse(796, 57);
  panel.Drag(793, 27, 3, 32);
}

function Test118()
{
  var iexplore;
  var panel;
  var panel2;
  iexplore = Aliases.iexplore1;
  iexplore.ToUrl("http://192.168.16.158:8080/");
  panel = iexplore.pageInrstarAdmin.panelMainpage.fieldsetDashboardcontent.panelMain.panelMaincontentpanel;
  panel.panelActionButtonContainer.buttonManageClient.ClickButton();
  panel.panelAccounttabs.linkAccountadministratortab.Click();
  panel2 = panel.panelClientaccountcontent;
  panel2.panelActionButtonContainer.buttonAdd.ClickButton();
  panel2.panelAddadministratorwrapper.formAddadministrator.panelData.textboxFullname.Click(12, 8);
}

function Test119()
{
  var explorer;
  explorer = Aliases.Explorer;
  explorer.wndStart.ClickButton();
  explorer.wndDV2ControlHost.Click(102, 412);
  TestedApps.Ssms.Run(1, true);
  Aliases.Ssms.ConnectionDialog.connect.ClickButton();
}

function Test120()
{
  Aliases.Ssms.wnd_desked_gsk.Close();
}

function Test121()
{
  Aliases.Explorer.wndCabinetWClass2.Close();
}

function Test122()
{
  var ssms;
  var edit;
  ssms = Aliases.Ssms;
  ssms.wnd_desked_gsk.GenericPane.GenericPane.ObjectExplorerWindow.ObjectExplorerTree.Keys("^o");
  edit = ssms.wndbosa_sdm_Mso96.Edit;
  edit.SetText("y:\\sql_scripts\\resetAllpasswords.sql");
  edit.Keys("[Enter]");
  ssms.dlgMicrosoftSQLServerManagementStudio.btnOK.ClickButton();
}

function Test123()
{
  var ssms;
  var wnd_desked_gsk;
  var edit;
  var wndbosa_sdm_Mso96;
  ssms = Aliases.Ssms;
  wnd_desked_gsk = ssms.wnd_desked_gsk;
  wnd_desked_gsk.Click(527, 15);
  wnd_desked_gsk.GenericPane.GenericPane.ObjectExplorerWindow.ObjectExplorerTree.Keys("^o");
  edit = Aliases.notepad.wndNotepad.Edit;
  edit.Drag(753, 20, -751, 1);
  edit.Keys("^c");
  wndbosa_sdm_Mso96 = ssms.wndbosa_sdm_Mso96;
  edit = wndbosa_sdm_Mso96.Edit;
  edit.Click(10, 9);
  edit.SetText("\\\\scslsrv1\\Old_commonfiles\\Technical Information\\INRstar\\Testing\\SQL Scripts\\clearASPNETDB.sql");
  wndbosa_sdm_Mso96.Click(626, 398);
  wnd_desked_gsk.panelMsodocktop.toolbarSqlEditor.buttonExecute.ClickButton();
}

function Test124()
{
          var wndWindowsForms10Window8app0378734a;
          var wnd;
          Aliases.Explorer.wndProgman.SHELLDLL_DefView.FolderView.DblClickItem("NHSNumberGenerator", 0);
          TestedApps.NHSNumberGenerator1.Run(1, true);
          wndWindowsForms10Window8app0378734a = Aliases.NHSNumberGenerator.wndWindowsForms10Window8app0378734a;
          wndWindowsForms10Window8app0378734a.btnGenerate.DblClick(42, 11);
          wnd = wndWindowsForms10Window8app0378734a.Item;
          wnd.DblClick(148, 18);
          wnd.Keys("^c^c");
}

function Test125()
{
          var INRstarWindows;
          var browser;
          var page;
          var form;
          var panel;
          var pagePopup;
          INRstarWindows = Aliases.INRstarWindows;
          browser = INRstarWindows.BrowserForm.INRstarBrowser.WebBrowserBaseNativeWindow.ShellDocObjectView.browser;
          browser.Click(322, 335);
          page = browser.pageHttp19216816158;
          page.document.all.Item("Start").SetText("01-Jan-2014");
          form = page.panelMainpage.panelMain.panelMaincontentpanel.panelPatientrecord.panelPatientmaintabcontent.panelPatienttabcontent.panelPatienttreatmentplanwrapper.panelPatienttreatmentplandetails.formAddtreatmentplanform;
          panel = form.fieldsetContainer.panelEditpatienttreatmentplaninf;
          panel.panelData.selectDiagnosisselected.ClickItem("~Select Diagnosis");
          pagePopup = INRstarWindows.pagepopup0;
          pagePopup.Click(68, 57);
          panel.panelData2.selectDrugid.ClickItem("~Select Drug");
          pagePopup.Click(114, 39);
          panel.panelData3.selectTreatmentduration.ClickItem("~Select Duration");
          pagePopup.Click(83, 154);
          form.panelPatienttreatmentplaninforma.submitbuttonAddpatienttreatmentp.ClickButton();
}

function Test126()
{
  Browsers.Item(btIExplorer).Navigate("http://192.168.16.158:6061/");
  Aliases.iexplore1.pageInrstarAdmin2.fieldsetDashboardcontent.panelMaincontentpanel.panel.panelData.textboxSearchbox.Keys("[Enter][Down][Down][Enter]");
}