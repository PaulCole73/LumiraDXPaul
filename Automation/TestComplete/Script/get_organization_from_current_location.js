//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_organization_id_from_current_location()
{
  Goto_Options_Location_Management();
  var location_details_tab_path = location_management_details_tab();
  var outer_html_of_tab = location_details_tab_path.outerHTML;
  
  var organizationId = outer_html_of_tab.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
  Log.Message("Location/Organisation ID of current location is: " + organizationId)
  
  return organizationId[0]
}