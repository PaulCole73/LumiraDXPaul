function Test1()
{
  var folderView;
  var toolbarWindow32;
  folderView = Aliases.Explorer.wndProgman.SHELLDLL_DefView.FolderView;
  folderView.Click(461, 216);
  folderView.Click(1159, 896);
  toolbarWindow32 = Aliases.iexplore1.BrowserWindow.WorkerW.ReBarWindow32.ControlBandClass.ToolbarWindow32;
  toolbarWindow32.ClickItemXY("Tools", 11, 11, false);
  toolbarWindow32.PopupMenu.Click("Zoom (100%)|150%");
}

function Test2()
{
  var browserWindow;
  var toolbarWindow32;
  browserWindow = Aliases.iexplore1.BrowserWindow;
  browserWindow.Click(533, 19);
  Browsers.Item(btIExplorer).Navigate("https://inrstaranalytics.test/Dashboard/1");
  Aliases.iexplore1.pageAfdwidget.Keys("[F12]");
  toolbarWindow32 = browserWindow.FrameTab.tabpage.BaseBar.ReBarWindow32.IEDEVTOOLS.IEDEVTOOLSMENU.ToolbarWindow32;
  toolbarWindow32.ClickItemXY("&Tools", 25, 16, false);
  toolbarWindow32.PopupMenu.Click("Resize|800x600");
  Aliases.Explorer.wndProgman.SHELLDLL_DefView.FolderView.Click(912, 39);
}

function Test3()
{
  var toolbarWindow32;
  toolbarWindow32 = Aliases.iexplore1.BrowserWindow.WorkerW.ReBarWindow32.ControlBandClass.ToolbarWindow32;
  toolbarWindow32.ClickItemXY("Tools", 13, 13, false);
  toolbarWindow32.PopupMenu.Click("Zoom (100%)|150%");
}

function Test4()
{
  var browserWindow;
  var baseBar;
  var iedevtools;
  var sysTabControl32;
  var sysListView32;
  browserWindow = Aliases.iexplore1.BrowserWindow;
  browserWindow.Keys("[F12]");
  baseBar = browserWindow.FrameTab.tabpage.BaseBar;
  iedevtools = baseBar.ReBarWindow32.IEDEVTOOLS;
  iedevtools.IEDEVTOOLSMENU.ToolbarWindow32.ClickItemXY("&Tools", 12, 11, false);
  sysTabControl32 = iedevtools.SysTabControl32;
  sysTabControl32.Keys("^2");
  sysTabControl32.MouseWheel(1);
  sysTabControl32.ClickTab("Network");
  sysListView32 = sysTabControl32.page32770.page32770.SysListView32;
  sysListView32.Click(467, 37);
  baseBar.Drag(719, 2, 33, -134);
  sysListView32.Click(464, 83);
}

function Test5()
{
  var iedevtools;
  var sysTabControl32;
  Browsers.Item(btIExplorer).Navigate("https://inrstaranalytics.test/Dashboard");
  Aliases.iexplore1.pageInrstarAnalytics.panelPagecontent.panelHomepage.panelRow.panelColLg12.Keys("[F12]");
  iedevtools = Aliases.iexplore1.BrowserWindow.FrameTab.tabpage.BaseBar.ReBarWindow32.IEDEVTOOLS;
  iedevtools.Click(330, 36);
  sysTabControl32 = iedevtools.SysTabControl32;
  sysTabControl32.Keys("^1");
  iedevtools.Click(513, 29);
  sysTabControl32.Click(287, 21);
  sysTabControl32.ClickTab("Network");
  sysTabControl32.page32770.ATL6264E6B0.Click(375, 0);
}