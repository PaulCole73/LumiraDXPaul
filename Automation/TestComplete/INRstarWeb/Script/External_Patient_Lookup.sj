//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT V5_Common_Popups
//USEUNIT Navigation
//====================================================================================
//
// Open EPl
// Check agreement
// Select reason
// Add comments

// Select patient
// a) via NHs number
// b )via Name, Dob & Gender
// c) use additional parameters

// return to Patient


function quick_start()
{
          // ---- Test 1 - should fail with more than 1 patient found
          var w_reason = 1;
          var w_comment = "Automation Test";
          
          var w_pid = "3567887653";
          var w_surname = "";
          var w_dob = "";
          var w_gender = "Female";   // Male, Female, Not Known
          
          var w_firstname = "";
          var w_postcode = "";
          var w_locationname = "";

         Goto_Patient_EPL();
         epl(w_reason, w_comment, w_pid, w_surname, w_dob, w_gender, w_firstname, w_postcode, w_locationname );

          // ---- Test 2 - should fail with no patients found
          var w_reason = 1;
          var w_comment = "Automation Test";
          
          var w_pid = "3567887653";
          var w_surname = "";
          var w_dob = "";
          var w_gender = "Female";   // Male, Female, Not Known
          
          var w_firstname = "D'isabell";
          var w_postcode = "";
          var w_locationname = "";

         Goto_Patient_EPL();
         epl(w_reason, w_comment, w_pid, w_surname, w_dob, w_gender, w_firstname, w_postcode, w_locationname );

          // ---- Test 3 - should pass
          var w_reason = 1;
          var w_comment = "Automation Test";
          
          var w_pid = "3567887653";
          var w_surname = "";
          var w_dob = "";
          var w_gender = "Female";   // Male, Female, Not Known
          
          var w_firstname = "D'isabella";
          var w_postcode = "";
          var w_locationname = "";

         Goto_Patient_EPL();
         epl(w_reason, w_comment, w_pid, w_surname, w_dob, w_gender, w_firstname, w_postcode, w_locationname );
}



//====================================================================================
function epl(p_reason, p_comment, p_pid, p_surname, p_dob, p_gender, p_firstname, p_postcode, p_locationname)
{
       var INRstarV5 = set_system();
       var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
       var formPASF = panelMCP.Panel("PatientContent").Panel("AdvancedSearchTab").Form("PatientAdvancedSearchForm");
       
       // Sub-areas
       var panelR = formPASF.Panel("LocationSearchDiv").Panel("Reason");
       var panelASC = formPASF.Panel("AdvancedSearchCriteria");
       var panelASL =  panelASC.Panel("AdvancedSearchLeft");
       var panelASR =  panelASC.Panel("AdvancedSearchRight");
       
       // Set confirm to checked
       panelR.Panel(0).Checkbox("DirectCareConfirmation").ClickChecked(true);
       
       // Set Reason
       panelR.Panel(1).Select("Reason").ClickItem(p_reason);
       
       // Set Comment
       panelR.Panel(2).Textbox("SupportingNotes").Text = p_comment;
       
       // Determine which fields to search with
       
       panelASL.Panel(0).Textbox("NHSNumber").Text = p_pid;
       panelASL.Panel(2).Textbox("Surname").Text = p_surname;
       // panelASL.dob.Text  = p_dob;
       panelASL.Panel(4).Select("Gender").ClickItem(p_gender);    
       
       // Add additional fields
       panelASR.Panel(0).Textbox("FirstName").Text = p_firstname; 
       panelASR.Panel(1).Textbox("Postcode").Text = p_postcode; 
       
       // Click 'Search'
       panelASC.Panel(0).SubmitButton("SearchButton").Click();
       
       WaitSeconds(2,"Waiting for Search to complete")
       var formPASF = panelMCP.Panel("PatientContent").Panel("AdvancedSearchTab").Form("PatientAdvancedSearchForm");
       var panelASC = formPASF.Panel("AdvancedSearchCriteria");
       var cell = panelASC.Panel("SearchResults").Panel("PatientSearchResults").Table("PatientResults").Cell(1,0);
       
       
       if (cell.innerText == "More than one matching patient, please refine the search criteria" || cell.innerText == "No patients found")
       {
                // Incorrect parameters
                Log.Message("EPL - Failed with '" + cell.innerText+ "'")
       }
       else
       {
                 // Click Patient
                panelASC.Panel("SearchResults").Panel("PatientSearchResults").Table("PatientResults").Cell(1, 0).Link("PatientLink").Click();
      }
}