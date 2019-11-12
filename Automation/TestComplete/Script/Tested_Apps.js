function open_application(app_name) //not in use, not functioning
{
  var app = app_name
  if (app == "INRstar")
  {
    p = TestedApps.Items(0).Run()
    if( ! p.Exists)
    {
      WaitSeconds(10)
    }
  }
}
//--------------------------------------------------------------------------------
function RunIE()
{ 
  Browsers.Item(btIExplorer).Run("https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1488299359&rver=6.4.6456.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f&lc=2057&id=292841&mkt=en-gb&cbcxt=out&fl=wld");
}
//--------------------------------------------------------------------------------
function RunHotmail(username,password)
{
  var user = username
  var pass = password
  Browsers.Item(btIExplorer).Run("http://www.hotmail.com");
  
  browser = Aliases.browser;
  panel = browser.pageSignInToYourMicrosoftAccount.formI0281.panelMaincontent.sectionSectionNoMarginBottom.panelCredentialsinputpane.panel;
  panel2 = panel.panelRow.panelFormGroupColMd24;
  panel3 = panel2.panelPlaceholdercontainer;
  panel3.panelPhholder.panelEmailPhoneOrSkypeName.Click(167, 14);
  panel3.emailinputI0116.SetText(user)
  
  panel.buttonNext.Click(159, 11);
  panel = panel2.panelPlaceholdercontainer2;
  panel.panelPhholder.panelPassword.Click(106, 8);
  passwordBox = panel.passwordboxI0118;
  passwordBox.SetText(password);
  passwordBox.Keys("[Enter]");
}









