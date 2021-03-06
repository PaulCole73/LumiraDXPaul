//USEUNIT Common
//USEUNIT V5_SQL
function quick_start()
{
          var INRstarV5 = set_system(); 

          get_locn_id(INRstarV5);
}

 //---------------------------------------------------------------------- Get Location Id
function get_locn_id(INRstarV5)
{         
          var w_locn_name = get_locn_name(INRstarV5);
          
          // Find Location ID
          var w_locn_id = SQL_Get_Testing_Location_id(w_locn_name);
          //Log.Message(w_locn_id);
          return w_locn_id;
}
function get_locn_name(INRstarV5)
{
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");

          var panelLS = INRstarV5.Panel("MainPage").panel("Header").Panel("logindisplay").Panel("LoginStatus");
          var w_text = panelLS.TextNode(0).innerText;
          var w_at = aqString.Find(w_text,"@");
          var w_locn_name = aqString.Substring(w_text,w_at+2,50);
          //Log.Message(w_locn_name);

          return w_locn_name;

}

 //---------------------------------------------------------------------- Get Patient NHS No
function get_patient_nhs(INRstarV5)
{
          // Main page definitions
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          // Find Patient NHS No
          var panelPBC = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer");
          var w_nhs_no = panelPBC.Panel("patientZone1").Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
          
          return w_nhs_no;
}
 //---------------------------------------------------------------------- Get Patient Status
function get_patient_status(INRstarV5)
{
// function to retrieve the 'Active' or 'Inactive' status from the patient banner 
// written by Paul Tierney Jan 2014

          // Main page definitions
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          // Find Patient NHS No
          var panelPBC = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer");
          //var w_nhs_no = panelPBC.Panel("patientZone1").Panel(3).Panel(0).Label("NHSNumber_DetachedLabel").innerText;
                  
          //var w_status = panelPBC.Panel("patientZone1").Panel(1).Panel(0).Label("Active_DetachedLabel").innerText; // Pre Release 35
          var w_status = panelPBC.Panel("patientZone1").Panel(1).Panel(0).Label("PatientStatusDisplay_DetachedLabel").innerText; // Release 35 onwards
          //Log.Message(w_status);
          var w_status = aqString.Replace(w_status," patient","");
          //Log.Message(w_status);
          return w_status;
}

 //---------------------------------------------------------------------- Get Patient Number
function get_patient_ptno(INRstarV5)
{
          // Main page definitions
          var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
          // Find Patient NHS No
          var panelPBC = panelMCP.Panel("PatientRecord").Panel("PatientBannerContainer");
          var w_ptno = panelPBC.Panel("patientZone1").Panel(3).Panel(1).Label("PatientNumber_DetachedLabel").innerText;
          
          return w_ptno;
}