//USEUNIT Data_Load_Part_1

// Script to Open SSMS, then load and run te database clear down script
//
//=======================================================================
function main()
{
  open_ssms();
  reset_database();
  add_clients();
}


//=======================================================================
function open_ssms()
{
  var explorer;
  explorer = Aliases.Explorer;
  explorer.wndStart.ClickButton();
  explorer.wndDV2ControlHost.Click(102, 412);
  TestedApps.Ssms.Run(1, true);
  Aliases.Ssms.ConnectionDialog.connect.ClickButton();
}

//=======================================================================
function reset_database()
{
  var wnd_desked_gsk;
  var lazyTreeView;
  var explorer;
  wnd_desked_gsk = Aliases.Ssms.wnd_desked_gsk;
  lazyTreeView = wnd_desked_gsk.GenericPane.GenericPane.ObjectExplorerWindow.ObjectExplorerTree;
  lazyTreeView.Keys("[Win][Win][Win]");
  NameMapping.Sys.Keys("[Hold][Win]e[Release]");
  lazyTreeView.Keys("[Win]");
  explorer = Aliases.Explorer;
  explorer.wndComputer.Computer.DUIViewWndClassName.DirectUIHWND.CtrlNotifySink.ShellView.DirectUIHWND.DblClick(92, 224);
  explorer.wndCabinetWClass1.ShellTabWindowClass.DUIViewWndClassName.DirectUIHWND.CtrlNotifySink.ShellView.DirectUIHWND.DblClick(61, 442);
  explorer.wndCabinetWClass2.ShellTabWindowClass.DUIViewWndClassName.DirectUIHWND.CtrlNotifySink.ShellView.DirectUIHWND.DblClick(96, 61);
  wnd_desked_gsk.panelMsodocktop.toolbarSqlEditor.buttonExecute.ClickButton();
}
function add_clients()
{
  add_client();
}