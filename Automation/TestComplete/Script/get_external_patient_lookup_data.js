//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_external_patient_lookup_data()
{
  var patient_data = new Array();

  var fullname = get_patient_fullname();
  var dob = get_patient_dob();
  var nhs = get_patient_nhs();
  var addr_line_one = get_patient_address_line_one();
  var post_code = get_patient_postcode();
  var test_prac = get_patient_test_prac();
  patient_data.push(fullname, dob, nhs, addr_line_one, post_code, test_prac);
  
  return patient_data;
}