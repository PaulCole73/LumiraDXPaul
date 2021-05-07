//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_patient_nhs()
{
  var patient_blue_banner_path = path_inrstar_patient_banner_blue_bar()
  var nhs_num = patient_blue_banner_path.Panel(3).FindChild("idStr", "NHSNumber_DetachedLabel", 3).innerText; //Panel(0).Label("NHSNumber_DetachedLabel").innerText; path has changed for UK
          
  return nhs_num;
}