//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation
//USEUNIT Quick_Patient
//USEUNIT Test_Patient_Status
//USEUNIT V5_SQL
//USEUNIT V5_Patient_Banner

//USEUNIT Add_INR_Complex
//USEUNIT Delete_Treatments
//=====================================================================================
//
//=====================================================================================
function quick_start()
{
    var INRstarV5 = set_system(); 

    // Test 1 : Add new patient demographics and check default settings on Patient management page
    Goto_Add_Patient();
    quick_ttr_pt_demographics(); 

    var w_test1 = check_pat_mgmt_new_pat(INRstarV5);
    Log.Event("Test 1 - add_pat_check_pat_mgmt_new_pat - COMPLETE");
    
    // Test 2 : Add new patient treatment plan and check patient management page unaffected
    // Test 3 : Alter treatment plan to different drug and check patient management page unaffected
    // Test 4 : Edit Patient management page, check for mandatory fields and error messages
    // Test 5 : Edit Patient management page, set a value in every field
    // Test 6 : Edit Patient management page, unset every field
    // Test 7 : Edit Patient management page, set every value for every field (cycle)
    // Test 8 : 8.	Add a review, check patient management page unaffected
    // Test 9	: Change diagnosis back to Warfarin and treatment, check patient management page unaffected
    // Test 10 : 	Add a note, check patient management page unaffected
    // Test 11 : Add an adverse event, check patient management page unaffected
    // Test 12 : Edit demographics, check patient management page unaffected
    // Test 13 : Suspend the patient, check patient management page
    // Test 14 : Unsuspend the patient, check patient management page
    // Test 15 : Deactivate the patient, check patient management page
          
}

function show_test_result(p_result)
{
// function to display a nice green tick if a test passes or a yellow warning if it fails
// written by Paul Tierney

    if (p_result == "pass")
    {
        Log.Checkpoint("TEST PASS");
    }
    else
    {
        Log.Warning("TEST FAIL");
    }
} 

function check_pat_mgmt_new_pat(INRstarV5)
{ 
   
    WaitSeconds(1,"Going to Patient Management");
    //Open patient management tab
    var w_address_stem = Goto_Patient_Management(INRstarV5);  

    //----------Begin testing Labels and Section headers display-----------------------------------------------------------------------------------------//
    
    //status section header
    WaitSeconds(1,"Checking Section Header for Patient Status section");
    Sys.HighlightObject(w_address_stem.TextNode(0),3);
    var w_status_label = w_address_stem.TextNode(0).contentText;
    var w_test_result = compare_actual_to_expected(INRstarV5, w_status_label, "Status");
    show_test_result(w_test_result);
        
    //care team section header
    //.TextNode(0)
    WaitSeconds(1,"Checking Field Label for Patient Care Team");
    Sys.HighlightObject(w_address_stem.Panel("PatientManagementDetailsWrapper").Panel("PatientManagementDetails").TextNode(0),3);
    var w_careTeam_label = w_address_stem.Panel("PatientManagementDetailsWrapper").Panel("PatientManagementDetails").TextNode(0).contentText;
    var w_test_result = compare_actual_to_expected(INRstarV5, w_careTeam_label, "Care Team");
    show_test_result(w_test_result);
    
    //groups section header
    //.Panel("PatientManagementDetailsWrapper").Panel("PatientGroups").TextNode(0)
    WaitSeconds(1,"Checking Section Header for Patient Groups section");
    Sys.HighlightObject(w_address_stem.Panel("PatientManagementDetailsWrapper").Panel("PatientGroups").TextNode(0),3);
    var w_groups_label = w_address_stem.Panel("PatientManagementDetailsWrapper").Panel("PatientGroups").TextNode(0).contentText;
    var w_test_result = compare_actual_to_expected(INRstarV5, w_groups_label, "Groups");
    show_test_result(w_test_result);
    
    
    //Set expected value for Testing and Registered Section Name   
    var w_logged_in_loc = get_locn_name(INRstarV5);
    var w_logged_in_loc_id = get_locn_id(INRstarV5);
    
    //Get unique patient ID
    var w_nhs = get_patient_nhs(INRstarV5);
    var w_status = get_patient_status(INRstarV5);
    var w_section = get_locn_id(INRstarV5);
    var w_pat_id = SQL_Find_Patient_By_NHS_Status_Section(w_nhs, w_status, w_section);  
    
    //----------Begin testing Patient Status area of screen---------------------------------------------------------------------------------------------//
    var w_panel = "PatientStatus";
    var wa_screen_field = "PatientStatus_DetachedLabel";
    var wa_screen_field_label = wa_screen_field+"_Label";
    var wa_db_field = "PatientStatusReasonID";

    // check field label                
    //WaitSeconds(1,"Checking Field Label for Patient Status");
    var w_pat_field_label = get_screen_field_values(w_address_stem, w_panel, wa_screen_field_label, 0);
    var w_test_result = compare_actual_to_expected(INRstarV5, w_pat_field_label, "Status:");
    show_test_result(w_test_result); 

    // check screen value                
    //WaitSeconds(1,"Checking Screen value for Patient Status");
    var w_pat_screen_value = get_screen_field_values(w_address_stem, w_panel, wa_screen_field, 0);
    var w_test_result = compare_actual_to_expected(INRstarV5, w_pat_screen_value, "Active");
    show_test_result(w_test_result);

    // check database value
    WaitSeconds(1,"Checking Database value for Patient Status");
    var w_pat_db_value = countNULLvalueJoinedTable(w_pat_id,wa_db_field,"patient","patientstatus","id");
    w_test_result = compare_actual_to_expected(INRstarV5, w_pat_db_value, 1);
    show_test_result(w_test_result);            
    
    //----------Begin testing care team area of screen-------------------------------------------------------------------------------------------------//
    var w_panel = "PatientManagementDetails";
    var w_panelParent = "PatientManagementDetailsWrapper"; // bit of a fudge, stem can't include this panel as it wouldnt work for status area at top of tab!
    wa_field = new Array(5);
    wa_field[0] = "TestingSectionId_DetachedLabel";
    wa_field[1] = "RegisteredSectionId_DetachedLabel";
    wa_field[2] = "ClinicianName_DetachedLabel";
    wa_field[3] = "GPName_DetachedLabel";
    wa_field[4] = "ClinicLocationName_DetachedLabel";

    for (i=0; i < wa_field.length; i++)
    {
        //define the stem of where the fields are on screen
        var w_field_addr = w_address_stem + ".Panel(" + w_panelParent + ".Panel(" + w_panel + ").Panel(" + wa_field[i] + ")";
        
        //check if field should be hidden or not - last 3 fields are in this category
        if (i > 1)
        {
            //check field exists, compare whether we think it should be, display test result (e.g. green tick for a pass)
            var w_field_exists = check_field_exists(INRstarV5, wa_field[i]);
            var w_test_result = compare_actual_to_expected(INRstarV5, w_field_exists, "hidden");
            Log.Message("Checking screen for field : "+wa_field[i]);
            show_test_result(w_test_result);
            
            //check database value for field - all fields are in Patient table - problem is we don't have field name in a variable!
            if (i == 2) //Clinician
            {
                var wa_screen_field_label = wa_field[i]+"_Label";

                // check field label                
                //WaitSeconds(1,"Checking Field Label for " +wa_screen_field_label);
                var w_pat_field_label = get_screen_field_values(w_address_stem, w_panel, wa_screen_field_label, i);
                var w_test_result = compare_actual_to_expected(INRstarV5, w_pat_field_label, "A/C Clinician:");
                show_test_result(w_test_result); 

                // Check database value
                WaitSeconds(1,"Checking Database value for " +wa_field[i]);
                var w_pat_db_value = SQL_fetch_value(w_pat_id, "ClinicianId", "patient", "id");
                w_test_result = compare_actual_to_expected(INRstarV5, w_pat_db_value, "00000000-0000-0000-0000-000000000000");
                show_test_result(w_test_result);
            }
            else if (i == 3) //GPName
            {
                var wa_screen_field_label = wa_field[i]+"_Label";

                // check field label                
                //WaitSeconds(1,"Checking Field Label for " +wa_screen_field_label);
                var w_pat_field_label = get_screen_field_values(w_address_stem, w_panel, wa_screen_field_label, i);
                var w_test_result = compare_actual_to_expected(INRstarV5, w_pat_field_label, "GP Name:");
                show_test_result(w_test_result); 

                // Check database value
                WaitSeconds(1,"Checking Database value for " +wa_field[i]);
                var w_pat_db_value = countNULLvalueSingleTable(w_pat_id,"GPName","patient","id");
                w_test_result = compare_actual_to_expected(INRstarV5, w_pat_db_value, 1);
                show_test_result(w_test_result);
            
            }
            else if (i == 4) //Preferred Clinic
            {
                var wa_screen_field_label = wa_field[i]+"_Label";

                // check field label                
                //WaitSeconds(1,"Checking Field Label for " +wa_screen_field_label);
                var w_pat_field_label = get_screen_field_values(w_address_stem, w_panel, wa_screen_field_label, i);
                var w_test_result = compare_actual_to_expected(INRstarV5, w_pat_field_label, "Preferred Clinic:");
                show_test_result(w_test_result); 

                // Check database value
                WaitSeconds(1,"Checking Database value for " +wa_field[i]);
                var w_pat_db_value = countNULLvalueSingleTable(w_pat_id,"ClinicLocationId","patient","id");
                w_test_result = compare_actual_to_expected(INRstarV5, w_pat_db_value, 1);
                show_test_result(w_test_result);            
            }
            
        }
        else if (i == 0) //TestingSection
        {
            var wa_screen_field_label = wa_field[i]+"_Label";
        
            // check field label                
            //WaitSeconds(1,"Checking Field Label for " +wa_screen_field_label);
            var w_pat_field_label = get_screen_field_values(w_address_stem, w_panel, wa_screen_field_label, i);
            var w_test_result = compare_actual_to_expected(INRstarV5, w_pat_field_label, "Testing Location:");
            show_test_result(w_test_result); 

            // check screen value                
            //WaitSeconds(1,"Checking Screen value for " +wa_field[i]);
            var w_pat_screen_value = get_screen_field_values(w_address_stem, w_panel, wa_field[i], i);
            var w_test_result = compare_actual_to_expected(INRstarV5, w_pat_screen_value, w_logged_in_loc);
            show_test_result(w_test_result);

            // check database value
            WaitSeconds(1,"Checking Database value for " +wa_field[i]);
            var w_pat_db_value = SQL_fetch_value(w_pat_id, "testingsectionid", "patient", "id");            
            w_test_result = compare_actual_to_expected(INRstarV5, w_pat_db_value, w_logged_in_loc_id);
            show_test_result(w_test_result);            

        }        
        else if (i == 1) //RegisteredSection
        {
            var wa_screen_field_label = wa_field[i]+"_Label";

            // check field label                
            //WaitSeconds(1,"Checking Field Label for " +wa_screen_field_label);
            var w_pat_field_label = get_screen_field_values(w_address_stem, w_panel, wa_screen_field_label, i);
            var w_test_result = compare_actual_to_expected(INRstarV5, w_pat_field_label, "Registered Practice:");
            show_test_result(w_test_result);            
                    
            // check screen value                
            //WaitSeconds(1,"Checking Screen value for " +wa_field[i]);
            var w_pat_screen_value = get_screen_field_values(w_address_stem, w_panel, wa_field[i], i);
            var w_test_result = compare_actual_to_expected(INRstarV5, w_pat_screen_value, w_logged_in_loc);
            show_test_result(w_test_result);

            // check database value
            WaitSeconds(1,"Checking Database value for " +wa_field[i]);
            var w_pat_db_value = SQL_fetch_value(w_pat_id, "registeredsectionid", "patient", "id");            
            w_test_result = compare_actual_to_expected(INRstarV5, w_pat_db_value, w_logged_in_loc_id);
            show_test_result(w_test_result);            

        }
    }
    
    //----------Begin testing groups area of screen---------------------------------------------------------------------------------------------------------//
    var w_panel = "PatientGroups";

    wa_field = new Array(4);
    wa_field[0] = "Transport";
    wa_field[1] = "HomeVisit";
    wa_field[2] = "Complex";
    wa_field[3] = "SelfTester";
    
       
    for (i=0; i < wa_field.length; i++)
    {
        //define the stem of where the fields are on screen
        var w_field_addr = w_address_stem + ".Panel(" + w_panel + ").Panel(" + wa_field[i] + ")";

        var wa_screen_field_label = wa_field[i]+"_Label";
        
        if(wa_field[i] == "Transport")
        {
            var w_expected_label = "Transport Required:";
        }
        else if(wa_field[i] == "HomeVisit")
        {
            var w_expected_label = "Home Visit Required:";              
        } 
        else if(wa_field[i] == "Complex")
        {
            var w_expected_label = "Complex Patient:";              
        } 
        else if(wa_field[i] == "SelfTester")
        {
            var w_expected_label = "INR Self Tester:";              
        } 

        var wa_screen_field_label = wa_field[i]+"_Label";

        // check field label                
        //WaitSeconds(1,"Checking Field Label for " +wa_screen_field_label);
        var w_pat_field_label = get_screen_field_values(w_address_stem, w_panel, wa_screen_field_label, i);
        var w_test_result = compare_actual_to_expected(INRstarV5, w_pat_field_label, w_expected_label);
        show_test_result(w_test_result);                     
                
        // check screen value                
        //WaitSeconds(1,"Checking Screen value for " +wa_field[i]);
        var w_pat_screen_value = get_screen_checkbox_values(w_address_stem, w_panel, wa_field[i], i);
        var w_test_screen_result = compare_actual_to_expected(INRstarV5, w_pat_screen_value, false);           
        show_test_result(w_test_screen_result);

        // check database value
        WaitSeconds(1,"Checking Database value for " +wa_field[i]);
        var w_pat_db_value = countNULLvalueJoinedTable(w_pat_id,wa_field[i],"patient","patientgroup","id");
        w_test_result = compare_actual_to_expected(INRstarV5, w_pat_db_value, 1);
        show_test_result(w_test_result);            
        
    }
                     
}

function compare_actual_to_expected(INRstarV5, p_patient_value, p_expected_value)
{
// function to compare one value against another and say if it matches or not
// this could be a field value or even compare if field exists against whether you expect it to or not
// written by Paul Tierney
      Log.Message("Comparing patient value : "+p_patient_value+" against expected value : "+p_expected_value);
      if (p_patient_value == p_expected_value)
      {
          return "pass";
      }
      else
      {
          return "fail";
      }

}

function check_field_exists(INRstarV5, p_field)
{
// function to see if a field is visible on screen
// written by Paul Tierney

    var w_found;
    var w_test_result;
    
    var w_fld = INRstarV5.NativeWebObject.Find("idStr", p_field);

    if (w_fld.Exists == false || w_fld.Visible == false)
    //if (w_fld.contentText == null)
    {
       Log.Warning("'" + p_field + "' not found");
       w_found = false;
       w_test_result = "hidden";
    }
    else
    {
       Log.Warning("'" + p_field + "' FOUND");
       w_found = true;
       w_test_result = "visible";
    }
          
    return w_test_result;
}




function get_screen_field_values(p_field_addr_stem, p_panel, p_field, p_arraycount)
{
// function to return the value of a label field on the patient_management_tab
// written by Paul Tierney

    WaitSeconds(1,"Checking value for: "+ p_field);
    Log.Message("Field is : "+p_field);
    
    // the status panel at the top of the page doesn't have as many panels as the bits at the bottom!
    if(p_panel == "PatientStatus")
    {
        Sys.HighlightObject(p_field_addr_stem.Panel(p_panel).Panel(p_arraycount).Panel(p_arraycount).Label(p_field),3);
        var w_pat_value = p_field_addr_stem.Panel(p_panel).Panel(p_arraycount).Panel(p_arraycount).Label(p_field).contentText;
        Log.Message("Value for "+p_field + " = "+w_pat_value);       
    
    }
    else
    {
        var w_panelParent = "PatientManagementDetailsWrapper";
        Sys.HighlightObject(p_field_addr_stem.Panel(w_panelParent).Panel(p_panel).Panel(p_arraycount).Label(p_field),3);
        var w_pat_value = p_field_addr_stem.Panel(w_panelParent).Panel(p_panel).Panel(p_arraycount).Label(p_field).contentText;
        Log.Message("Value for "+p_field + " = "+w_pat_value);
    }
    
    return w_pat_value;

}



function get_screen_checkbox_values(p_field_addr_stem, p_panel, p_field, p_arraycount)
{
// function to return the value of a checkbox field on the patient_management_tab
// written by Paul Tierney

    //Log.Message("Checking screen Checkbox values");
      
    WaitSeconds(1,"Checking screen value for: "+ p_field);
    var w_panelParent = "PatientManagementDetailsWrapper";
    Sys.HighlightObject(p_field_addr_stem.Panel(w_panelParent).Panel(p_panel).Panel(p_arraycount).Checkbox(p_field),3);
    var w_pat_value = p_field_addr_stem.Panel(w_panelParent).Panel(p_panel).Panel(p_arraycount).Checkbox(p_field).checked;
    Log.Message("Patient Value for "+p_field + " = "+w_pat_value);
    return w_pat_value;

}    