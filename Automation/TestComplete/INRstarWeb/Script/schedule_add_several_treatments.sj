//USEUNIT V5_SQL
//USEUNIT Add_INR_Simple
//USEUNIT Navigation

function quick_start()
{



}
//--------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------
function add_several_treatments()
{
  var w_ptno = "ceh1";

  wa_review = new Array(5);
  wa_review[0] = 7;             // last review period
  wa_review[1] = 7;            // 1st previous review period
  wa_review[2] = 14;            // 2nd previous review period
  wa_review[3] = 28;             // 3rd previous review period
  wa_review[4] = 7;             // 4th previous review period
  
  wa_inr = new Array(5);
  wa_inr[0] = "1.9";
  wa_inr[1] = "2.3";
  wa_inr[2] = "2.5";
  wa_inr[3] = "2.4";
  wa_inr[4] = "1.7";
  
  var w_treatment_days_diff = 0;
  for (x=0; x<wa_review.length; x++)
  {
    w_treatment_days_diff = w_treatment_days_diff + wa_review[x];
  }  
  w_treatment_days_diff = w_treatment_days_diff * (-1);
  Log.Message ("w_treatment_days_diff : " + w_treatment_days_diff);
  
  var w_days = w_treatment_days_diff;

// Loop around the number of reviews, adding each treatment, then resetting the dates  
  for (i=0; i<wa_review.length; i++)
  {
      if (i>0)
        w_days = (w_days + wa_review[i-1]);
      
      Goto_Patient_New_INR();
      add_inr_simple(wa_inr[i]);
     
      // Reset the treatment details
      SQL_Update_Dates_Maintenance(w_ptno, w_days, wa_review[i]);
  }
   
}