 function dt()
 {
         var  w_today = aqDateTime.GetDayOfWeek(aqDateTime.Today());
          // work out what date next Monday is
          var w_days_to_next_Monday = 9 - w_today;
          var w_date = aqConvert.StrToDate(aqDateTime.AddDays( aqDateTime.Today(), w_days_to_next_Monday));

          Log.Message(w_date);
 }