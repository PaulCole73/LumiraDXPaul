function Test2()
{
  var browser;
  var form;
  var textbox;
  var button;
  var page;
  Browsers.Item(btIExplorer).Navigate("https://login.yahoo.com/config/mail?&.src=ym&.intl=uk");
  browser = Aliases.iexplore1;
  form = browser.pageYahooLogin.panelMbrDesktop.fieldsetMbrLoginFieldset.formMbrLoginForm;
  textbox = form.panelInputs.textboxLoginUsername;
  textbox.Click(62, 19);
  textbox.SetText("");
  button = form.buttonLoginSignin;
  button.ClickButton();
  form.panelPasswdField.passwordboxLoginPasswd.SetText("");
  button.ClickButton();
}

function Test1()
{
  var page;
  var panel;
  var panel2;
  
  
  Browsers.Item(btIExplorer).Navigate("https://us-mg5.mail.yahoo.com/neo/launch?.rand=ckb972nnp6dic");
  page = Aliases.iexplore1.page2UnreadDeaninrstarYahooMail3;
  panel = page.panelMain;
  panel.panelInboxcontainer.panelMsgList.panelYui3160114571077383344220.panelYui3160114571077383341689.textnodeYui316011457107738334168.Click(218, 11);
  panel2 = panel.panelYui3160114571077383341920.panelYui3160114571077383341950.panelYui3160114571077383342035;

}