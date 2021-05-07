//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Get_Functions
//USEUNIT Misc_Functions

//this function sets up the variable elements of a patients data
//non identifier elements e.g. address, phone number etc are hard coded in the patient object
function create_variable_patient_data(name_first, name_last, sex)
{
    var title;
    var first_name_string = create_random_char_string(15);
    var patient_details = new Object();  

    //if no value is passed in for first name then generate a random character string
    if(name_first == null || name_first == "")
    {
      name_first = first_name_string.charAt(0).toUpperCase() + first_name_string.slice(1);
    }
    else
    {
      name_first = create_random_char_string(7) + name_first;
    }
    
    //if no value is passed in for last name then generate a random character string
    if(name_last == null || name_last == "")
    {
      name_last = create_random_char_string(15).toUpperCase();
    }
    else
    {
      name_last = create_random_char_string(7) + name_last;
    }
    
    //adjust sex code for full word and set appropriate title
    //if no value is passed in then male / mr is default
    if(sex == "M")
    {
      sex = "Male";
      title = "Mr";
    }
    else if(sex == "F")
    {
      sex = "Female";
      title = "Mrs";
    }
    else if(sex == null || sex == "")
    {
      sex = "Male";
      title = "Mr";
    }
    
    //postcode format varies between uk and ita
    var postcode;
    if(language == "English")
    {
      postcode = "TR16 4SQ" 
    }
    else
    {
      postcode = "12345"
    }
    
    //add all values SET or GENERATED to the object for reference
    var patient_details = {
      first_name: name_first,
      last_name: name_last,
      gender: sex,
      known_as: title,
      post_code: postcode
    }
    
    return patient_details;
}
//--------------------------------------------------------------------------------