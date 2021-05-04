//USEUNIT Admin_Dash_Navigation
//USEUNIT Admin_Dash_System_Paths
//--------------------------------------------------------------------------------

function get_audit_entry_admin_dash(audit_item)
{
  wait_for_object(admin_dash_navigation(), "idStr", "ViewAuditTrailLink", 1);
  
  var obj_root = admin_dash_add_location_admin_form();
  var obj = admin_dash_navigation().Link("ViewAuditTrailLink");
  click_navigation_wrapper(obj, obj_root, "idStr", "AuditTrailTable", 2);

  var table = admin_dash_audit_table();
  var text = table.Cell(audit_item, 1).innerText;
  WaitSeconds(2, "Waiting for audit value...");
  
  return text;
}