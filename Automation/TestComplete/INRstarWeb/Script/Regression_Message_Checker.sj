function generic_message_checker(mess_1){

      error_mess = new Array(3);
      error_mess[0] = "The pre-induction INR must be between '0.8' and '1.3'.";               
      error_mess[1] = false;               
      error_mess[2] = false; 
     
     for (i=0; i < error_mess.length; i++)
      {
           if (p_mess_screen==p_mess_expected) {
 
               Log.Checkpoint("Message found test pass");
                 }
               else {
                    Log.Warning("No error message found");
                      }
}

//    p_mess_screen = new Array (4)
//    p_mess_screen[0]               
//    p_mess_screen[1]              
//    p_mess_screen[2]

//function generic_message_checker(p_mess_screen, p_mess_expected, p_state){

//      if (p_state == true)
//      {
//           if (p_mess_screen==p_mess_expected) {
// 
//               Log.Checkpoint("Message found test pass");
//                 }
//               else {
//                    Log.Warning("No error message found");
//                      }
//      }
//      else
//      {
//           if (p_mess_screen!=p_mess_expected) {
// 
//               Log.Checkpoint("Message found test pass");
//                 }
//               else {
//                    Log.Warning("No error message found");
//                      }
//      }
      }