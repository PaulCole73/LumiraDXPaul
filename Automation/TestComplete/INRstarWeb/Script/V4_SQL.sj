//USEUNIT V5_Common
function quick_start()
{
//   SQL_Update_Dates(-4,1,0);  // Previous test, Stage, Next test, normally -4,1,0
   SQL_Update_Dates(-3,2,0);  // Previous test, Stage, Next test, then -3,2,0
//   SQL_Update_Dates(-3,2);
//   SQL_Find_Patient("037 051 8608");
}

//--------------------------------------------------------------------------------
function SQL_Set_connection()
{              
 var w_con = "Provider=SQLNCLI;"
//     + " Server=dev-sandpit\\manualtesting;"
     + " Server=dev-sandpit\\autotesting;"
     + " Database=ASPNETDB;"
     + " User Id=sa;"
     + " Password=AdminStar-1;"; 
  Log.Message(w_con);
  
  return w_con;
}

//--------------------------------------------------------------------------------
function SQL_Update_Dates(p_days, p_Stage, p_days2)
{
    
  Log.Message(aqDateTime.Today());
  Log.Message(aqDateTime.AddDays(aqDateTime.Today(), p_days));
  
  var w_txtdate = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), p_days));
  var w_date = aqString.SubString(w_txtdate,6,4) + aqString.SubString(w_txtdate,2,4) + aqString.SubString(w_txtdate,0,2);

  var w_txttoday = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), p_days2));
  var w_today = aqString.SubString(w_txttoday,6,4) + aqString.SubString(w_txttoday,2,4) + aqString.SubString(w_txttoday,0,2);

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Treatment SET"
     + " Date = '" + w_date + "', "
     + " Inserted = '" + w_date + "', "
     + " NextTest = '" + w_today + "'"
     + " WHERE InductionStage = " + p_Stage
     + " AND PatientId like 'E754%'";    
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}

//--------------------------------------------------------------------------------
function SQL_Find_Patient(p_NHS)
{
  var w_NHS = aqString.Replace(p_NHS," ","");
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Select ID FROM Patient"
     + " WHERE NHSNumber = '" + w_NHS + "'";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_pid = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  return w_pid;
}

//--------------------------------------------------------------------------------
function SQL_Reset_Regime(p_pid, p_regime)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Clinical SET"
     + " DosingMethod = '" + p_regime + "'"
     + " WHERE PatientId = '" + p_pid + "'";
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}

//--------------------------------------------------------------------------------
function SQL_Report_DosingMethod()
{
    var w_outfile = "D:\\Results\\SQL_DosingMethods.csv";

    aqFile.WriteToTextFile(w_outfile, "\r\n",  aqFile.ctANSI, true);

  var Qry = ADO.CreateADOQuery();
  var w_mess;
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT"     
//  +" Patient.FirstName"
//  +", Patient.Surname"
  +" Patient.Id"
  +", Patient.Born"
  +", Clinical.DosingMethod"
  +" FROM Patient INNER JOIN Clinical ON Patient.Id = Clinical.PatientId"
  +" WHERE Clinical.DosingMethod = 'Induction Slow'"
  +" AND Patient.Active = 1"
  +" ORDER BY Clinical.DosingMethod";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  while (!Qry.EOF)
  {
//        w_mess=Qry.FieldByName("Surname").Value
//        +", " + Qry.FieldByName("Firstname").Value
//        +", " + Qry.FieldByName("DosingMethod").Value;
//        aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);
//        Qry.Next()
        w_mess=Qry.FieldByName("Id").Value
        +", " + Qry.FieldByName("Born").Value
        +", " + Qry.FieldByName("DosingMethod").Value;
        aqFile.WriteToTextFile(w_outfile, w_mess + "\r\n",  aqFile.ctANSI);
        
        Log.Message(w_mess);
        
        Qry.Next()
        
  }
  Qry.Close();
}

//--------------------------------------------------------------------------------
function SQL_Get_Location_id()
{
  var w_Location = "Crofty Surgery";
  
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Select ID FROM Section"
     + " WHERE Name = '" + w_Location + "'";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_sect_id = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  Log.Message(w_sect_id);
  
  SQL_Get_Users(w_sect_id);

}
//--------------------------------------------------------------------------------
function SQL_Get_Users(w_sect_id)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT Username FROM User, UsersInSection"
     + " WHERE User.Id = UsersInSection.UserId AND UsersInSection.SectionId = '" + w_sect_id + "'";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_username = Qry.FieldByName("Username").Value;
  Qry.Close();
  
  Log.Message(w_username);
}//--------------------------------------------------------------------------------
function SQL_Get_All_Users()
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT Username, FullName, Section.Name FROM UsersInSection, User, Section"
     + " WHERE UserId = User.Id and SectionId = Section.Id"
     + " Order by Name, UserName"
     + " ";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_username = Qry.FieldByName("Username").Value;
  Qry.Close();
  
  Log.Message(w_username);
}