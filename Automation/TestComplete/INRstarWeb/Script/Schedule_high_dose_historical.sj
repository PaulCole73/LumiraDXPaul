//USEUNIT Common
//USEUNIT V5_Common
//USEUNIT V5_Common_Presets
//USEUNIT V5_Common_Batch
//USEUNIT Navigation

//USEUNIT Delete_Treatments
//USEUNIT Quick_Patient

function quick_start ()
{

}

//****************************************************************
function add_historical_loop()
{
  var w_start_dose = 20.1;
  var w_end_dose = 30.0;
  
  var w_dose = w_start_dose;

//  var w_outfile = "d:\\Results\\V5_Fixed_Dose"+w_File+"_"+w_Start_INR+".csv";
  
  var INRstarV5 = set_system(); 

  while (w_dose <= w_end_dose)
  {
      Goto_Add_Historical();    
      quick_pt_historical_clever("20", "4", "2013", w_dose, "28 Days", "Quick Patient treatment");

//        // Record the values produced
//        record_values(INRstarV5, w_dose, w_outfile);
        
      // Delete the latest treatment
      delete_treatment();
  
      // Increment dose
      w_dose = roundNumber(w_dose + 0.1,1);
  }
}