//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation
//USEUNIT Add_INR_Manual_Schedules

//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient

function quick_start ()
{

}

//****************************************************************
function add_manual_loop()
{

  // Reset Output File
  w_run = "20-1";
  w_mess="Schedule : " + w_run;
  var w_outfile = "\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_Results\\"+ w_run +".csv";
  aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI, true);
  
  var INRstarV5 = set_system(); 

    // Read input file
//    driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_test_data\\schedules_30.xls","Data");
    driver = DDT.ExcelDriver("\\\\scslsrv1\\old_commonfiles\\technical information\\inrstar\\testing\\TestComplete_test_data\\"+ w_run + ".xls","Data");
    
    // find the Org Admin record
    // Then add the Location and the Loc Admin
    while (!driver.EOF())
    {
         if (driver.Value(0) == "Y")
         {
              edit_tablets(INRstarV5, driver.Value(1),driver.Value(2),driver.Value(3),driver.Value(4),driver.Value(5)),
              
              Goto_Patient_New_INR();
              // Date, INR, Testing Method, Dose, Omits, Review
              add_inr_manual(w_outfile, "25","Apr", "2013", "2.7" , "PoCT", driver.Value(6), "0 Days", "21 Days", driver.Value(10), driver.Value(11), driver.Value(12), driver.Value(13), driver.Value(14), driver.Value(15), driver.Value(16));

              // Delete the latest treatment
              delete_treatment();
              
         }
         driver.Next();      
    }
}
function edit_tablets(INRstarV5, p_5, p_3, p_1, p_H, p_S)
{
  Goto_Patient_Clinical_Edit();
    
  var panelMCP = INRstarV5.Panel("MainPage").Panel("main").Panel("MainContentPanel");
  var panelPTC = panelMCP.Panel("PatientRecord").Panel("PatientTabContent");
  var panelPCD = panelPTC.Panel("PatientClinicalWrapper").Panel("PatientClinicalDetails");
  var form = panelPCD.Form("PatientEditClinicalForm");
  var panel1 = form.Panel("EditPatientClinicalTabletSelection");   

  set_cbx(panel1.Panel(1).Checkbox("Tablets_Use5"),p_5);
  set_cbx(panel1.Panel(2).Checkbox("Tablets_Use3"),p_3);
  set_cbx(panel1.Panel(3).Checkbox("Tablets_Use1"),p_1);
  set_cbx(panel1.Panel(4).Checkbox("Tablets_UseHalf"),p_H);
  
  // Click Save
  form.Panel(0).Button("UpdatePatientClinical").Click();

}
function set_cbx(p_field, p_val)
{
  if (p_val == 1)
    p_field.ClickChecked(true);
  else  
    p_field.ClickChecked(false);
}