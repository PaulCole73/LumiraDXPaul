//USEUNIT Navigation
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Popups
//USEUNIT V5_Common_Letter
//USEUNIT Add_INR_Refer

//====================================================================================
//
// Letter Testing
//
//====================================================================================
function quick_start()
{
         var w_locn = "";
         
//          Add_Permissions(w_locn);
//          Remove_Permissions(w_locn);
          Add_50_Letters(w_locn);
//          Add_lots_of_text(w_locn);
//          edit_letter_permissionsw_locn();
//          copy_letter_permissions(w_locn);
}
//----------------------------------------------------------------------------
function Add_Permissions(p_locn)
{
          // Log on as CL2
          Log_On_User();
          var w_lettername = create_letter("Add_Permissions","","");
          Log_Off();
          
          //---------------------------------------------------------------------------------------
          // Set up output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\letters_"+w_lettername+".csv";
    
         var w_mess = w_lettername;  
         // Reset Output File
         aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //---------------------------------------------------------------------------------------
          // For each Role, add the role to the letter
          // For each User, see if the letter is now visible
          //---------------------------------------------------------------------------------------           
          var wa_Users = new Array(7);
          wa_Users[0] = 
          wa_Users[1] = 
          wa_Users[2] = 
          wa_Users[3] = 
          wa_Users[4] = 
          wa_Users[5] = 
          wa_Users[6] = "";

          var wa_Roles = new Array(7);
          wa_Roles[0] = "Clinical Lead";
          wa_Roles[1] = "Clinical Level 3";
          wa_Roles[2] = "Clinical Level 2";
          wa_Roles[3] = "Clinical Level 1";
          wa_Roles[4] = "Location Administrator";
          wa_Roles[5] = "Clerical 2";
          wa_Roles[6] = "Clerical 1";
         
          for (r = 0; r < wa_Roles.length; r++)
          {
                    // Log on as CL2
                    Log_On_User();
                    
                    // Add next permission (wa_Role)
                    add_permission(w_outfile, w_lettername, wa_Roles[r], r);

                    // Log off
                    Log_Off();
                                        
                    // Test letter for each Role
          
                    for (u = 0; u <wa_Users.length; u++)
                    {
                              // Log on as User
                              Log_On_User();
 
                              // Test Letter
                              var INRstarV5 = set_system();  
                              
                              test_letter(INRstarV5, w_outfile, w_lettername, wa_Users[u]);
                   
                              // Log off
                              Log_Off();
                     }
          }
 }
//----------------------------------------------------------------------------
function Remove_Permissions(p_locn)
{
          // Log on as CL2
          Log_On_User();
          var w_lettername = create_letter("Remove_Permissions","","");
          Log_Off();
          
          //---------------------------------------------------------------------------------------
          // Set up output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\letters_"+w_lettername+".csv";
    
         var w_mess = w_lettername;  
         // Reset Output File
         aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //---------------------------------------------------------------------------------------
          // For each Role, remove the role from the letter
          // For each User, see if the letter is now visible
          //---------------------------------------------------------------------------------------           
          var wa_Users = new Array(7);
          wa_Users[0] = 
          wa_Users[1] = 
          wa_Users[2] = 
          wa_Users[3] = 
          wa_Users[4] = 
          wa_Users[5] = 
          wa_Users[6] = "";

          var wa_Roles = new Array(7);
          wa_Roles[0] = "Clinical Lead";
          wa_Roles[1] = "Clinical Level 3";
          wa_Roles[2] = "Clinical Level 2";
          wa_Roles[3] = "Clinical Level 1";
          wa_Roles[4] = "Location Administrator";
          wa_Roles[5] = "Clerical 2";
          wa_Roles[6] = "Clerical 1";

          // Add all the permissions to the letter         
          Log_On_User();
          for (r = 0; r < wa_Roles.length; r++)
          {
                    add_permission(w_outfile, w_lettername, wa_Roles[r], r);
          }
          Log_Off();

          // Remove each role and test each user
          for (r = 0; r < wa_Roles.length; r++)
          {
                    // Log on as CL2
                    Log_On_User();
                    
                    // Remove next permission (wa_Role)
                    remove_permission(w_outfile, w_lettername, wa_Roles[r], r);

                    // Log off
                    Log_Off();
                                        
                    // Test letter for each Role
          
                    for (u = 0; u <wa_Users.length; u++)
                    {
                              // Log on as User
                              Log_On_User(wa_Users[u],"");
 
                              // Test Letter
                              var INRstarV5 = set_system();  
                              
                              test_letter(INRstarV5, w_outfile, w_lettername, wa_Users[u]);
                   
                              // Log off
                              Log_Off();
                     }
          }
 }
//----------------------------------------------------------------------------
function Add_50_Letters(p_locn)
{
          // Log on as CL2
          Log_On_User();
          
          // Add 50 letters
          for (i = 0; i< 50; i++)
          {
                    create_letter("Test Letter","1",""); //  1 = Clinical Lead
          }
          Log_Off();
}
//----------------------------------------------------------------------------
function Add_lots_of_text(p_locn)
{
          var w_big_text = set_big_text();
         
//          // Log on as CL2
          Log_On_User();
          
          // Add a letter with lots of text
         create_letter("Big Letter", "1", w_big_text); //  1 = Clinical Lead
         
          Log_Off();
}
//----------------------------------------------------------------------------
function  edit_letter_permissions()
{
          // Log on as CL2
          Log_On_User();
          var w_lettername = create_letter("Edit_Permissions","","");
          Log_Off();
          
          //---------------------------------------------------------------------------------------
          // Set up output file
         var w_outfile = "\\\\scslsrv1\\Shared\\Development and Testing\\testing\\testcomplete_results\\letters_"+w_lettername+".csv";
    
         var w_mess = w_lettername;  
         // Reset Output File
         aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);

          //---------------------------------------------------------------------------------------
          // For each Role, add the role to the letter
          // For each User, see if the letter is now visible
          //---------------------------------------------------------------------------------------           
          var wa_Users = new Array(7);
          wa_Users[0] = "";
          wa_Users[1] = "";
          wa_Users[2] = "";
          wa_Users[3] = "";
          wa_Users[4] = "";
          wa_Users[5] = "";
          wa_Users[6] = "";

          var wa_Roles = new Array(7);
          wa_Roles[0] = "Clinical Lead";
          wa_Roles[1] = "Clinical Level 3";
          wa_Roles[2] = "Clinical Level 2";
          wa_Roles[3] = "Clinical Level 1";
          wa_Roles[4] = "Location Administrator";
          wa_Roles[5] = "Clerical 2";
          wa_Roles[6] = "Clerical 1";
         
          for (r = 0; r < wa_Roles.length; r++)
          {
                    // Log on as CL2
                    Log_On_User();
                    
                    // Add next permission (wa_Role)
                    add_permission(w_outfile, w_lettername, wa_Roles[r], r);

                    // Log off
                    Log_Off();
                                        
                    // Test letter for each Role
          
                    for (u = 0; u <wa_Users.length; u++)
                    {
                              // Log on as User
                              Log_On_User(wa_Users[u],"");
 
                              // Test Letter
                              var INRstarV5 = set_system();  
                              
                              test_letter(INRstarV5, w_outfile, w_lettername, wa_Users[u]);
                   
                              // Log off
                              Log_Off();
                     }
          }
}
//----------------------------------------------------------------------------
function  copy_letter_permissions()
{
}

