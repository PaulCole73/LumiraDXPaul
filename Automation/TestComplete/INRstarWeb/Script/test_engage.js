//function Test1()
//{
//  var browser;
//  browser = Aliases.browser;
//  browser.BrowserWindow.Chrome_RenderWidgetHostHWND.Click(1430, 165);
//  Browsers.Item(btChrome).Navigate("https://chrome.google.com/webstore/category/extensions");
//  browser.pageChromeGoogleComWebstoreCateg.Wait();
//}

function Test2()
{
  var page;
  var form;
  var emailInput;
  var passwordBox;
  Browsers.Item(btChrome).Navigate("https://engage-starsky.lumiradxcaresolutions.com/");
  page = Aliases.browser.pageEngageStarskyLumiradxcaresol;
  page.Wait();
  form = page.formSubPageLogin;
  emailInput = form.emailinputInputUsername;
  emailInput.Click(145, 19);
  emailInput.Keys("dean@inrstar");
  passwordBox = form.passwordboxInputPassword;
  passwordBox.Click(133, 30);
  passwordBox.SetText("test");
}

