//USEUNIT System_Paths

//------------------------------------------------------------------------------- 
function logoff(TestStepMode)
{
var INRstar = INRstar_base();
var logout_button = INRstar.Panel("MainPage").Panel("header").Panel("logindisplay").Panel("LoginStatus").Link("LogoutLink");
          
var Mode = TestStepMode

    if(Mode == 'Shared')
        {
          //Clicking logout
          logout_button.Click();
        }
}
//------------------------------------------------------------------------------- 