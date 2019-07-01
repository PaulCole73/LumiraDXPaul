function Test1()
{
  var browser;
  var panel;
  var panel2;
  var panel3;
  var passwordBox;
  var page;
  Browsers.Item(btIExplorer).Navigate("https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1488299359&rver=6.4.6456.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f&lc=2057&id=292841&mkt=en-gb&cbcxt=out&fl=wld");
  browser = Aliases.browser;
  panel = browser.pageSignInToYourMicrosoftAccount.formI0281.panelMaincontent.sectionSectionNoMarginBottom.panelCredentialsinputpane.panel;
  panel2 = panel.panelRow.panelFormGroupColMd24;
  panel3 = panel2.panelPlaceholdercontainer;
  panel3.panelPhholder.panelEmailPhoneOrSkypeName.Click(167, 14);
  panel3.emailinputI0116.SetText("regression@hotmail.com");
  panel.buttonNext.Click(159, 11);
  panel = panel2.panelPlaceholdercontainer2;
  panel.panelPhholder.panelPassword.Click(106, 8);
  passwordBox = panel.passwordboxI0118;
  passwordBox.SetText("IRstar_5");
  passwordBox.Keys("[Enter]");
  page = browser.pageSignInToYourMicrosoftAccount2;
  page.Wait();
  panel = page.formI0281.panelMaincontent.sectionSectionNoMarginBottom.panelCredentialsinputpane.panel.panelRow;
  panel.HoverMouse(222, 95);
  panel.panelFormGroupColMd24.panelPlaceholdercontainer.panelPhholder.panelPassword.Click(198, 15);
}