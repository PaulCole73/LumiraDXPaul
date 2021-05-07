//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_dosing_method(dm)
{
  var dose_method;
  
  switch(dm)
  {
    case 0: 
    dose_method = "Coventry";
    break;
    case 1: 
    dose_method = "Hillingdon";
    break;
    case 2: 
    dose_method = "Fast";
    break;
    case 3: 
    dose_method = "Oates";
    break;
    case 4: 
    dose_method = "Tait";
    break;
    case 5: 
    dose_method = "Manual";
    break;
  }
  
  return dose_method;
}