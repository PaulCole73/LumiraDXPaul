//USEUNIT Navigation
//USEUNIT V5_Common

//=======================================================================
//
// Add a set of users to a location
//
// Log in as a Location Admin or Clinical Lead at your chosen location, using an existing user
//
// Amend the name in the wa_Users array as required !!!
//
//=======================================================================
function quick_start()
{
         var INRstarV5 = set_system();  
         var w_locn = "@painton";
         
          var wa_Users = new Array(8);
          wa_Users[0] = "admin"+w_locn;
          wa_Users[1] = "lead"+w_locn;
          wa_Users[2] = "cl3"+w_locn;
          wa_Users[3] = "cl2"+w_locn;
          wa_Users[4] = "cl1"+w_locn;
          wa_Users[5] = "c2"+w_locn;
          wa_Users[6] = "c1"+w_locn;
          wa_Users[7] = "readonly"+w_locn;

          var wa_Roles = new Array(8);
          wa_Roles[0] = "Location Administrator";
          wa_Roles[1] = "Clinical Lead";
          wa_Roles[2] = "Clinical Level 3";
          wa_Roles[3] = "Clinical Level 2";
          wa_Roles[4] = "Clinical Level 1";
          wa_Roles[5] = "Clerical 2";
          wa_Roles[6] = "Clerical 1";
          wa_Roles[7] = "Read Only";
          
          for (i=0; i < wa_Users.length; i++)  // Start at i=1 to skip adding an Admin
          {
                    Goto_Add_User();
                    add_user_details(INRstarV5, wa_Users[i], wa_Roles[i]);
            
                    if (i<7)   // Permissions not needed for Read Only user
                    {
                              Goto_Manage_User(wa_Users[i]);
                              set_low_users_permissions(INRstarV5, i);
                    }
          }


}
//-------------------------------------------------------------------------------
// Add the User details
function add_user_details(INRstarV5, p_user, p_role)
{
  Log.Message("Adding User: " + p_user);
  
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelLC = panelMCP.Panel("AdminContent").Panel("LocationContent").Panel(0);
  var formUser = panelLC.Panel("LocationTabContent").Panel("CreateUserWrapper").Form("CreateUserForm");
  
  formUser.Panel(0).Textbox("FullName").Text = p_role;
  formUser.Panel(1).Textbox("Username").Text = p_user;
  formUser.Panel(2).PasswordBox("Password").Text = "Password_1";
  formUser.Panel(3).PasswordBox("ConfirmPassword").Text = "Password_1";
  
  formUser.Panel(4).SubmitButton("Add").Click();  
    
}
//-------------------------------------------------------------------------------
// Set User Permissions 
function set_low_users_permissions(INRstarV5, p_role)
{
      var wa_Perms = new Array(7);
      // c1,c2,cl1,cl2,cl3,ad,lead
      wa_Perms[0] = ["N","N","N","N","N","Y","N"]; // Admin
      wa_Perms[1] = ["N","N","N","N","N","N","Y"]; // Lead
      wa_Perms[2] = ["N","N","N","N","Y","N","N"]; // CL3
      wa_Perms[3] = ["N","N","N","Y","N","N","N"]; // CL2
      wa_Perms[4] = ["N","N","Y","N","N","N","N"]; // CL1
      wa_Perms[5] = ["N","Y","N","N","N","N","N"]; // C2
      wa_Perms[6] = ["Y","N","N","N","N","N","N"]; // C1


  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

  panelLTC = panelMCP.Panel("AdminContent").Panel("LocationContent").Panel(0).Panel("LocationTabContent");

  // Select the Permissions Tab
  panelLTC.Panel("UserContent").Panel("UserAdmin").Link("UserAuthorisationLink").Click();
  
  // Role list
  panelUAC = panelLTC.Panel("UserContent").Panel("UserAccountContent");
  formRF = panelUAC.Panel("AuthorisationWrapper").Panel("UserPermissions").Form("RolesForm");
  table = formRF.Panel("Permissions").Panel("permissionList").Table(0);
  
  // Choose Roles
  set_cbx(table.Cell(1, 1).Checkbox("roles"),wa_Perms[p_role][0]);
  set_cbx(table.Cell(1, 2).Checkbox("roles"),wa_Perms[p_role][1]);
  set_cbx(table.Cell(1, 3).Checkbox("roles"),wa_Perms[p_role][2]);
  set_cbx(table.Cell(1, 4).Checkbox("roles"),wa_Perms[p_role][3]);
  set_cbx(table.Cell(1, 5).Checkbox("roles"),wa_Perms[p_role][4]);
  set_cbx(table.Cell(1, 6).Checkbox("roles"),wa_Perms[p_role][5]);
  set_cbx(table.Cell(1, 7).Checkbox("roles"),wa_Perms[p_role][6]);
    
  // Click button
  table.Cell(1, 9).SubmitButton("Update").Click();  
}
//------------------------------------------------------------------------------------------------------------------
function set_cbx(p_field, p_val)
{
  if (p_val == "Y")
    p_field.ClickChecked(true);
  else  
    p_field.ClickChecked(false);
}