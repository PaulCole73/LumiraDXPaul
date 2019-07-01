//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Field_Tests
//USEUNIT Navigation

function add_and_validate_patient_demographics(INRstarV5)
{
      var panelMain = INRstarV5.Panel("MainPage");
      var panelMCP = panelMain.Panel("main").Panel("MainContentPanel");
      var panelDPAF = panelMCP.Panel("PatientContent").Fieldset("PatientDetailsAddFieldset");
      var form = "";

      Log.Message("Adding New patient demographics");

      // Enter Patient Number
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_patient_number(INRstarV5, form);
//      
//      // Select Title
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_title(INRstarV5, form);
//  
//      // Add Family Name
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_family_name(INRstarV5, form);
//  
//      // Add Given Name
////      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_given_name(INRstarV5, form);
//  
//      // Select DoB
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_born(INRstarV5, form);
//
//      // Select Sex
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_sex(INRstarV5, form);
//      
//      // Select Gender
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_gender(INRstarV5, form);
//
//      // Select Ethnicity
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_ethnicity(INRstarV5, form);
//
//      // Select Language
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_language(INRstarV5, form);
//
//      // Select Marital Status
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_marital_status(INRstarV5, form);
// 
//
//      // ------------------------ Right hand side
//      // Test Address
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_address_line_1(INRstarV5, form);
////      test_address_line_2(INRstarV5, form);
////      test_address_line_3(INRstarV5, form);
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_address_town(INRstarV5, form);
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_address_county(INRstarV5, form);
//      test_address_postcode(INRstarV5, form);
//    
//      // Test Email
//      form = panelDPAF.Form("PatientAddDetailsForm");
//      test_email(INRstarV5, form);

      WaitSeconds(1,"Prior to validating NHS Number");
      // Add NHS Number - done last to ensure all tests are complete
      form = panelDPAF.Form("PatientAddDetailsForm");
      test_NHS_number(INRstarV5, form);
  
}


