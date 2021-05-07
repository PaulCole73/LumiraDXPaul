//USEUNIT Misc_Functions
//USEUNIT System_Paths
//USEUNIT INRstar_Navigation

//-----------------------------------------------------------------------------------
function get_check_digit(fifteen_digit_fiscal)
{
  fifteen_digit_fiscal = aqString.ToUpper(fifteen_digit_fiscal);
  var error_message = "Value invalid. Please enter 15 digits only with values 0-9 A-Z.";
  
  if(aqString.GetLength(fifteen_digit_fiscal) < 15 || aqString.GetLength(fifteen_digit_fiscal) > 15)
  {
    Log.Message(error_message);
    return error_message;
  }
  
  var sum_of_values = 0; 
  
  var potential_values = new Array();                   //all possible values that can be accepted/calculated on in this field
  potential_values.push("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
  
  var odd_character_code_values = new Array();          //converted values for characters in ODD positions in original
  odd_character_code_values.push(1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23);
  
  var even_character_code_values = new Array();         //converted values for characters in EVEN positions in original
  even_character_code_values.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25);
  
  var check_digit_values = new Array();                 //values used for the check digit
  check_digit_values.push("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
  
  for(var i = 1; i <= aqString.GetLength(fifteen_digit_fiscal); i++) //check every value in entry code
  {
    var character_at_current_position = aqString.SubString(fifteen_digit_fiscal, i - 1, 1); //split values by character
    var position_in_array = null;
    var character_code_value;
    
    for(var j = 0; j < potential_values.length; j++) //find character in list of potential values
    {
      if(potential_values[j] == character_at_current_position)
      {
        position_in_array = j; //get the position the character appears
        break;
      }
    }
    
    if(position_in_array == null) //if a character is not found in the list of potential values then error
    {
      Log.Message(error_message)
      return error_message;
    }
    
    if(i % 2 != 0) //is the value odd
    {
      character_code_value = odd_character_code_values[position_in_array]; //if it is odd get the values at the matching position from the odd array
    }
    else
    {
      character_code_value = even_character_code_values[position_in_array]; //else get the values at the matching position from the even array
    }
    
    sum_of_values = sum_of_values + character_code_value; //sum each value that is generated
  }
  
  var remainder = sum_of_values % 26; //divide by number of letters in alphabet
  var check_digit = check_digit_values[remainder]; //remainder should be a number between 0 - 25 select the relevant value from the check_digit array
  
  Log.Message(check_digit);
  return check_digit;
}