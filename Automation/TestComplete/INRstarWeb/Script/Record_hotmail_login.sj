function Test1()
{
  var form;
  var emailInput;
  Browsers.Item(btIExplorer).Navigate("https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=12&ct=1456936617&rver=6.4.6456.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fmail.live.com%2Fdefault.aspx%3Frru%3Dinbox&lc=2057&id=64855&mkt=en-gb&cbcxt=mai");
  form = Aliases.iexplore1.pageSignIn.formF1;
  emailInput = form.emailinputI0116;
  emailInput.Drag(143, 23, -268, -1);
  emailInput.Keys("[BS]");
  emailInput.HoverMouse(83, 20);
  form.panelIddivPwdUsernameexample.Click(23, 7);
  emailInput.Keys("dean.lester@inrstar[BS][BS][BS][BS][BS][BS][BS]hotmail.com");
}