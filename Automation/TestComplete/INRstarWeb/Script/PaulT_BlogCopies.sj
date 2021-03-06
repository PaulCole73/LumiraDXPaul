// function OpenNewTab copied from blog (https://support.smartbear.com/articles/testcomplete/tabbed-browsing/#_ga=1.210652944.484015909.1463049902)
function OpenNewTab(URL)
{
  var browser = Sys.Browser();
  if((browser.ProcessName == "ieexplore") && (browser.FileVersionInfo.MajorPart == 6))
  {
    Log.Error("The OpenNewTab operation is not supported in Internet Explorer 6.");
  }
  else
  {
    browser.BrowserWindow(0).Keys("^t");
    browser.ToUrl(URL);
  }
}

// function SelectTab copied from blog (https://support.smartbear.com/articles/testcomplete/tabbed-browsing/#_ga=1.210652944.484015909.1463049902)
function SelectTab(URL)
{
  var browser = Sys.Browser();
  var tabBand;

  switch (browser.ProcessName)
  {
    case "iexplore":
      if (browser.FileVersionInfo.MajorPart == 6)
      {
        Log.Error("The SelectTab operation is not supported in Internet Explorer 6 because it does not have tabbed browsing.");
        return;
      }
      tabBand = browser.BrowserWindow(0).CommandBar.TabBand;
      break;
    case "firefox":
      tabBand = browser.UIPage("chrome://browser/content/browser.xul").TabBand;
      break;
    default:
      Log.Error("The SelectTab operation is not supported in " + browser.ProcessName + ".");
      return;
  }

  var page = browser.WaitPage(URL, 5); // it was set to 0
  if (! page.Exists)
  {
    Log.Error("Browser tab \"" + URL + "\" was not found.");
  }
  else
  {
    tabBand.TabButton(page.contentDocument.title).Click();
  }
}

// Javascript int.TryParse equivalent which I've stolen from http://pietschsoft.com/post/2008/01/14/javascript-inttryparse-equivalent
function TryParseInt(str,defaultValue) {
     var retValue = defaultValue;
     if(str !== null) {
         if(str.length > 0) {
             if (!isNaN(str)) {
                 retValue = parseInt(str);
             }
         }
     }
     //Log.Message("Return Value from TryParseInt is : "+retValue);
     return retValue;
}

// This is a function PT has written using the above as a guide
function TryParseFloat(str,defaultValue) {     
     var retValue = defaultValue;
     if(str !== null) {
         if(str.length > 0) {
             if (!isNaN(str)) {
                 retValue = parseFloat(str);
             }
         }
     }
     Log.Message("Return Value from TryParseFloat is : "+retValue);
     return retValue;
}