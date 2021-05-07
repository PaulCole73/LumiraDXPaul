//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_fiscal_code()
{
  var fourteen_digit_value = get_unique_number();                                               //get a unique code (14 digit epoc value)                 
  
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var position = get_random_num_inrange(0, 15);                                                 //select random insert location
  var fifteenth_digit = alphabet[Math.floor(Math.random() * alphabet.length)];                  //get a random letter
  
  var fifteen_digit_fiscal = aqString.Insert(fourteen_digit_value, fifteenth_digit, position);  //insert random letter into unique 14 digit code
  var check_character = get_check_digit(fifteen_digit_fiscal);                                  //get a valid check character
  var fiscal = fifteen_digit_fiscal + check_character;                                          //fiscal needs 15 alphanumeric + validated check character
  
  Log.Message(fiscal);
  return fiscal;
}