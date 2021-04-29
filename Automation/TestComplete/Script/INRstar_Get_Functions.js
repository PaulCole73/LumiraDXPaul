//USEUNIT TSA_Patient
//-----------------------------------------------------------------------------------
//Returning details from blue banner as an object

function inrstar_get_patient_details_object_from_bluebar()
{
  var patient_details_blue_bar = new Object();
  var patient_banner_blue_bar_path = path_inrstar_patient_banner_blue_bar();
  
  var patient_details_blue_bar = {
  fullname_and_title : patient_banner_blue_bar_path.Panel(0).Label("Name").contentText,
  active_status : patient_banner_blue_bar_path.Panel(1).Panel(0).Label("PatientStatusDisplay_DetachedLabel").contentText,
  born_and_age : patient_banner_blue_bar_path.Panel(2).Panel(0).Label("DateOfBirth_DetachedLabel").contentText,
  gender : patient_banner_blue_bar_path.Panel(2).Panel(1).Label("Gender_DetachedLabel").contentText,
  patientid : patient_banner_blue_bar_path.Panel(3).Panel(0).Label("INRstarId_DetachedLabel").contentText,
  nhs_fiscal : patient_banner_blue_bar_path.Panel(3).Panel(1).Label("NHSNumber_DetachedLabel").contentText,
  patient_number : patient_banner_blue_bar_path.Panel(3).Panel(2).Label("PatientNumber_DetachedLabel").contentText
  }
  return patient_details_blue_bar;
}
//-----------------------------------------------------------------------------------
function get_treatment_row_object_testing()
{
//  var inr_date = aqConvert.StrToDate(aqDateTime.Today());
  var inr_date = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(),(-1)))
  Log.Message(inr_date);
  var treatment = get_treatment_row_object(inr_date,"current");
  Log.Message(treatment);
}
//---------------------
//At the moment this will only handle 1 treatment with the same date if we need this for 2 treatments on the same day then you will need to add in another identifier i.e inr/dose/ntd
function get_treatment_row_object(treatment_date, table_type)
{
  //need to translate the date for finding it in the treatment table
  var treatment_date_identifier = convert_date_format(treatment_date, "numeric", "%d-%b-%Y");
  
  if(table_type == "current" || table_type == null)
  {
    Goto_Patient_Treatment();
    var treatment_table_path = treatment_table();
  }
  else if(table_type == "pending")
  {
    var treatment_table_path = pending_treatment_table();
  }
  else if(table_type == "previous")
  {
    Goto_Patient_Treatment();
    var treatment_table_path = treatment_table_from_previous_plan();
  }
  
  var row_count = treatment_table_path.rowcount;
  
  for(i=0; i<row_count; i++)
  {
    if(treatment_table_path.Cell(i, 0).contentText==treatment_date_identifier)
    {
      var treatment_row_object = new Object();
  
        treatment_row_object = {
        test_date : treatment_table_path.Cell(i, 0).contentText,
        inr : treatment_table_path.Cell(i, 1).contentText,
        dose : treatment_table_path.Cell(i, 2).contentText,
        suggested_dose : treatment_table_path.Cell(i, 3).contentText,
        omits : treatment_table_path.Cell(i, 4).contentText,
        review : treatment_table_path.Cell(i, 5).contentText,
        suggested_review : treatment_table_path.Cell(i, 6).contentText,
        next_test_date : treatment_table_path.Cell(i, 7).contentText,
        dna : treatment_table_path.Cell(i, 8).contentText,
        treatment_comment : treatment_table_path.Cell(i, 9).contentText
        }     
      return treatment_row_object;     
    }
  }
  Log.Message("Didn't find the row you were looking for in the treatment table, you were looking for the treatment with date // " + treatment_date_identifier)
}