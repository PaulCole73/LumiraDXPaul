//USEUNIT V5_Common
function quick_start()
{
//   SQL_Update_Dates(-4,1,0);  // Stage 1: Previous test, Stage, Next test
//   SQL_Update_Dates(-3,2,0);  // Stage 2: Previous test, Stage, Next test
//   SQL_Update_Dates(-3,2);//  SQL_Find_Patient("219 173 4952");

//  SQL_Update_Stage_1("Emily1");
  SQL_Update_Stage_2("Emily1");



}

function quick_reset_dates_2()
{
   SQL_Update_Dates(-7,1,0);  // Previous test, Stage, Next test
   SQL_Update_Dates(-3,2,0);  // Previous test, Stage, Next test
}
function quick_reset_dates_3()
{
   SQL_Update_Dates_Maintenance("Peter01",-35,7);  // Previous test, Review
}
//--------------------------------------------------------------------------------
function SQL_Set_connection()
{  
 w_system = Log_On_Where();
 
// // Default DB
 //db connection
 
// if (w_system == "Admin-SSIS")
// {
//       db connection
// }
// if (w_system == "TTRClient") or (w_system == "Test8082")
// {  
//    db connection   
//  }
//  Log.Message("Con = " + w_con);
    
  return w_con;
}
//--------------------------------------------------------------------------------
function SQL_Update_Dates_Maintenance(p_patient, p_days, p_days2, p_locn_id)
{
  var w_pid = SQL_Find_Patient_No(p_patient);  
  Log.Message("Today: " + aqDateTime.Today());
  
  Log.Message(p_days + " days ago: " + aqDateTime.AddDays(aqDateTime.Today(), p_days));
  
  var w_txtdate = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), p_days));
  var w_date = aqString.SubString(w_txtdate,6,4) + aqString.SubString(w_txtdate,2,4) + aqString.SubString(w_txtdate,0,2);

  var w_txtreview = aqConvert.StrToDate(aqDateTime.AddDays(w_txtdate, p_days2));
  var w_review = aqString.SubString(w_txtreview,6,4) + aqString.SubString(w_txtreview,2,4) + aqString.SubString(w_txtreview,0,2);

  var w_txttoday = aqConvert.StrToDate(aqDateTime.Today());
  var w_today = aqString.SubString(w_txttoday,6,4) + aqString.SubString(w_txttoday,2,4) + aqString.SubString(w_txttoday,0,2);

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Treatment SET"
     + " Date = '" + w_date + "', "
     + " Inserted = '" + w_date + "', "
     + " NextTest = '" + w_review + "'"
     + " WHERE Date = '" + w_today +"'"
     + " AND PatientId = '" + w_pid + "'";    
    + " AND SectionId = '" + p_locn_id + "'";    
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
//--------------------------------------------------------------------------------
function SQL_Update_Dates_Maintenance_NHS(p_locn_id, p_NHS, p_days, p_days2)
{

  var w_pid = SQL_Find_Patient(p_NHS);  
  Log.Message("Today: " + aqDateTime.Today());
  
  Log.Message(p_days + " days ago: " + aqDateTime.AddDays(aqDateTime.Today(), p_days));
  
  var w_txtdate = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), p_days));
  var w_date = aqString.SubString(w_txtdate,6,4) + aqString.SubString(w_txtdate,2,4) + aqString.SubString(w_txtdate,0,2);

  var w_txtreview = aqConvert.StrToDate(aqDateTime.AddDays(w_txtdate, p_days2));
  var w_review = aqString.SubString(w_txtreview,6,4) + aqString.SubString(w_txtreview,2,4) + aqString.SubString(w_txtreview,0,2);

  var w_txttoday = aqConvert.StrToDate(aqDateTime.Today());
  var w_today = aqString.SubString(w_txttoday,6,4) + aqString.SubString(w_txttoday,2,4) + aqString.SubString(w_txttoday,0,2);

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Treatment SET"
     + " Date = '" + w_date + "', "
     + " Inserted = '" + w_date + "', "
     + " NextTest = '" + w_review + "'"
     + " WHERE Date = '" + w_today +"'"
     + " AND PatientId = '" + w_pid + "'"  
    + " AND SectionId = '" + p_locn_id + "'";    
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
//--------------------------------------------------------------------------------
function SQL_Update_Treatment_Dates_NHS(p_locn_id, p_pid, p_t_date, p_ntdate)
{
  var w_txttoday = aqConvert.StrToDate(aqDateTime.Today());
  var w_today = aqString.SubString(w_txttoday,6,4) + aqString.SubString(w_txttoday,2,4) + aqString.SubString(w_txttoday,0,2);

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Treatment SET"
     + " Date = '" + p_t_date + "', "
     + " Inserted = '" + p_t_date + "', "
     + " NextTest = '" + p_ntdate + "'"
     + " WHERE Date = '" + w_today +"'"
     + " AND PatientId = '" + p_pid + "'"  
    + " AND SectionId = '" + p_locn_id + "'";    
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}

//--------------------------------------------------------------------------------
function SQL_Update_Dates(p_days, p_Stage, p_days2)
{
  var w_pid = SQL_Find_Patient_No("938475839");  
  Log.Message("Today: " + aqDateTime.Today());
  Log.Message(p_days + " days ago: " + aqDateTime.AddDays(aqDateTime.Today(), p_days));
  
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
     + " AND PatientId = '" + w_pid + "'";    
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
//--------------------------------------------------------------------------------
function SQL_Update_Ind_Dates_specific(p_days, p_Stage, p_days2, p_pid)
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
     + " AND PatientId = '"+ p_pid + "'";    
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
//--------------------------------------------------------------------------------
function SQL_Update_Dates_specific(p_t_date, p_ntd_date, p_pid)
{
 Log.Message(p_t_date+", "+p_ntd_date+", "+p_pid);
 
  var w_t_date = aqString.SubString(p_t_date,6,4) + aqString.SubString(p_t_date,2,4) + aqString.SubString(p_t_date,0,2)
  var w_ntd_date = aqString.SubString(p_ntd_date,6,4) + aqString.SubString(p_ntd_date,2,4) + aqString.SubString(p_ntd_date,0,2)
  var w_txttoday = aqConvert.StrToDate(aqDateTime.Today());
  var w_today = aqString.SubString(w_txttoday,6,4) + "-" + aqString.SubString(w_txttoday,3,2)+ "-" + aqString.SubString(w_txttoday,0,2) + " 00:00:00";

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Treatment SET"
     + " Treatment.Date = '" + w_t_date + "', "
     + " Treatment.Inserted = '" + w_t_date + "', "
     + " Treatment.NextTest = '" + w_ntd_date + "'"
     + " Where Treatment.PatientId = '"+ p_pid + "'" 
     + " And Treatment.Date = '" + w_today + "'";  
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
//--------------------------------------------------------------------------------
function SQL_Set_Back_Ind_Dates(p_pid, p_comment, p_tdate, p_ntd_date)
{
  var w_t_date = aqString.SubString(p_tdate,6,4) + "-" + aqString.SubString(p_tdate,3,2) + "-" + aqString.SubString(p_tdate,0,2);
  var w_ntd_date = aqString.SubString(p_ntd_date,6,4) + "-" + aqString.SubString(p_ntd_date,3,2) + "-" + aqString.SubString(p_ntd_date,0,2);
//  var w_txttoday = aqConvert.StrToDate(aqDateTime.Today());
//  var w_today = aqString.SubString(w_txttoday,6,4) + "-" + aqString.SubString(w_txttoday,3,2)+ "-" + aqString.SubString(w_txttoday,0,2) + " 00:00:00";

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Treatment SET"
     + " Treatment.Date = '" + w_t_date + " 00:00:00', "
     + " Treatment.Inserted = '" + w_t_date + " 00:00:00:000', "
     + " Treatment.NextTest = '" + w_ntd_date + " 00:00:00', "
     + " Treatment.OriginalNextTestDate = '" + w_ntd_date + " 00:00:00'"
     + " Where Treatment.PatientId = '"+ p_pid + "'" 
     + " And Treatment.Comments like '" + p_comment + "'";  
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}


//--------------------------------------------------------------------------------
function SQL_Update_MissedDose(w_tid)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Treatment SET"
     + " MissedDose = 1"
     + " WHERE Id = '" + w_tid + "'";    
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
//--------------------------------------------------------------------------------
function SQL_Find_Patient(p_NHS)
{
  var Qry = ADO.CreateADOQuery();
  //var w_pid= ""
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Select ID FROM Patient"
     + " WHERE NHSNumber = '" + p_NHS + "'";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  w_pid = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  if (w_pid == null) // Use input parameter without spaces
  {
        var w_NHS = aqString.Replace(p_NHS," ","");
        var Qry = ADO.CreateADOQuery();
      
        Qry.ConnectionString = SQL_Set_connection();

        Qry.SQL  = "Select ID FROM Patient"
           + " WHERE NHSNumber = '" + w_NHS + "'";
        Log.Message(Qry.SQL);
  
        Qry.Open();
        Qry.First();
        w_pid = Qry.FieldByName("Id").Value;
        Qry.Close();
  }
  
  // Trim the curly brackets off
  if (aqString.SubString(w_pid,0,1) == "{")
  {
    w_pid = aqString.Replace(w_pid,"{", "");
    w_pid = aqString.Replace(w_pid,"}", "");
  }
  

  Log.Message ("pid = " + w_pid)
  return w_pid;
}

//--------------------------------------------------------------------------------

function SQL_PSC_NTD_Count(p_pid)
{

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();
  
  Qry.SQL  = " select COUNT(*) as cnt "
     + " from [ASPNETDB].[task].[Task] t "
     + " join [ASPNETDB].[dbo].[TreatmentTaskTable] ttt ON t.Id=ttt.TaskId "
     + " where ttt.TreatmentId IN "
     + " (SELECT Treatment.Id "
     + " FROM [ASPNETDB].[dbo].[Treatment] " 
     + " WHERE PatientId = '"+ p_pid +"') "
     + " and t.TaskTypeId = 1 "; 
     
  Qry.Open();
  Qry.First();
  var Next_Date_count = Qry.FieldByName("cnt").Value;
  Qry.Close();
  
  return Next_Date_count;
  }

//--------------------------------------------------------------------------------
  
function SQL_PSC_DD_Count(p_pid)
{

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();
  
  Qry.SQL  = " select COUNT(*) as cnt "
     + " from [ASPNETDB].[task].[Task] t "
     + " join [ASPNETDB].[dbo].[TreatmentTaskTable] ttt ON t.Id=ttt.TaskId "
     + " where ttt.TreatmentId IN "
     + " (SELECT Treatment.Id "
     + " FROM [ASPNETDB].[dbo].[Treatment] " 
     + " WHERE PatientId = '"+ p_pid +"') "
     + " and t.TaskTypeId = 2 "; 
     
  Qry.Open();
  Qry.First();
  var DD_task_count = Qry.FieldByName("cnt").Value;
  Qry.Close();
  
  return DD_task_count;
  }
//--------------------------------------------------------------------------------

function SQL_PSC_Schedule_Count(p_pid)
{

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();
  
  Qry.SQL  = " select COUNT(*) as cnt "
     + " from [ASPNETDB].[task].[Task] t "
     + " join [ASPNETDB].[dbo].[TreatmentTaskTable] ttt ON t.Id=ttt.TaskId "
     + " where ttt.TreatmentId IN "
     + " (SELECT Treatment.Id "
     + " FROM [ASPNETDB].[dbo].[Treatment] " 
     + " WHERE PatientId = '"+ p_pid +"') "
     + " and t.TaskTypeId = 3 "; 
     
  Qry.Open();
  Qry.First();
  var Schedule_task_count = Qry.FieldByName("cnt").Value;
  Qry.Close();
  
  return Schedule_task_count;
  }

//--------------------------------------------------------------------------------

function SQL_Find_Patient_Regression(p_NHS,p_Name)
{
  var Qry = ADO.CreateADOQuery();
  var w_pid= ""
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Select ID FROM Patient"
     + " WHERE NHSNumber = '" + p_NHS + "'" 
     + " AND Firstname = '" + p_Name + "'";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  w_pid = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  Log.Message(w_pid)
  
  if (w_pid == null) // Use input parameter without spaces
  {
        var w_NHS = aqString.Replace(p_NHS," ","");
        var Qry = ADO.CreateADOQuery();
      
        Qry.ConnectionString = SQL_Set_connection();

        Qry.SQL  = "Select ID FROM Patient"
           + " WHERE NHSNumber = '" + w_NHS + "'"
           + " AND Firstname = '" + p_Name + "'";;
        Log.Message(Qry.SQL);
        
        Qry.Open();
        Qry.First();
        w_pid = Qry.FieldByName("Id").Value;
        Qry.Close();
  }
  
  Log.Message(w_pid)
  
  // Trim the curly brackets off
  if (aqString.SubString(w_pid,0,1) == "{")
  {
    w_pid = aqString.Replace(w_pid,"{", "");
    w_pid = aqString.Replace(w_pid,"}", "");
  }
  

  Log.Message ("pid = " + w_pid + "patient name = " + p_Name)
  return w_pid;
}
//--------------------------------------------------------------------------------
function SQL_Find_Patient_By_NHS_Status_Section(p_NHS, p_Status, p_Section)
{
// function to return 1 patient ID based on a combination of NHS, Active/Inactive and Section you are logged in at
// written by Paul Tierney Jan 2014

  var Qry = ADO.CreateADOQuery();
  var w_pid= "";
  
  if (p_Status == 'Active')
  {
      var w_active = 1;
  }
  else
  {
      var w_active = 0;
  }  
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Select ID FROM Patient"
     + " WHERE NHSNumber = '" + p_NHS + "' AND active = " + w_active + " AND (testingsectionid = '" + p_Section + "' OR registeredsectionid = '" + p_Section + "')";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  w_pid = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  if (w_pid == null) // Use input parameter without spaces
  {
        var w_NHS = aqString.Replace(p_NHS," ","");
        var Qry = ADO.CreateADOQuery();
      
        Qry.ConnectionString = SQL_Set_connection();

        Qry.SQL  = "Select ID FROM Patient"
          + " WHERE NHSNumber = '" + w_NHS + "' AND active = " + w_active + " AND (testingsectionid = '" + p_Section + "' OR registeredsectionid = '" + p_Section + "')";
        Log.Message(Qry.SQL);
  
        Qry.Open();
        Qry.First();
        w_pid = Qry.FieldByName("Id").Value;
        Log.Message(w_pid);
        Qry.Close();
  }
  
  // Trim the curly brackets off
  if (aqString.SubString(w_pid,0,1) == "{")
  {
    w_pid = aqString.Replace(w_pid,"{", "");
    w_pid = aqString.Replace(w_pid,"}", "");
  }
  

  Log.Message ("pid = " + w_pid)
  return w_pid;
}

//--------------------------------------------------------------------------------
function SQL_Find_Patient_No(p_PtNo)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Select ID FROM Patient"
     + " WHERE PatientNumber = '" + p_PtNo + "'";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_pid = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  if (aqString.SubString(w_pid,0,1) == "{")
  {
    w_pid = aqString.Replace(w_pid,"{", "");
    w_pid = aqString.Replace(w_pid,"}", "");
  }
  return w_pid;
}

//--------------------------------------------------------------------------------
function SQL_Find_1st_Treatment(p_PtId)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Select Top 1 ID FROM Treatment"
     + " WHERE PatientId = '" + p_PtId + "' Order by date";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_tid = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  Log.Message("TreatmentId : " + w_tid);
  
  if (aqString.SubString(w_tid,0,1) == "{")
  {
   Log.Message("Need to strip curlys");
    w_tid = aqString.Replace(w_tid,"{", "");
    w_tid = aqString.Replace(w_tid,"}", "");
  }
  else
   Log.Message("Don't need to strip curlys");
  
 
  return w_tid;
}
//--------------------------------------------------------------------------------
function SQL_Find_Last_Treatment(p_PtId)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Select t.ID FROM Patient p"
     + " JOIN TreatmentPlan tp on p.Id = tp.PatientId" 
     + " JOIN Treatment t on tp.LastTreatmentId = t.Id" 
     + " WHERE t.PatientId = '" + p_PtId + "'" 
     + " AND tp.IsActive = 1"; 
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_tid = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  Log.Message("TreatmentId : " + w_tid);
  
  if (aqString.SubString(w_tid,0,1) == "{")
  {
   Log.Message("Need to strip curlys");
    w_tid = aqString.Replace(w_tid,"{", "");
    w_tid = aqString.Replace(w_tid,"}", "");
  }
  else
   Log.Message("Don't need to strip curlys");
  
 
  return w_tid;
}
//--------------------------------------------------------------------------------
function SQL_Delete_treatment(p_tid)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Delete from Treatment"
     + " WHERE Id = '" + p_tid + "'";
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
//--------------------------------------------------------------------------------
function SQL_Reset_Regime(p_pid, p_regime)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update TreatmentPlan SET"
     + " DosingMethod = '" + p_regime + "'"
     + " WHERE PatientId = '" + p_pid + "'";
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
//--------------------------------------------------------------------------------
function SQL_Reset_Migration_Flag_start()
{
     SQL_Reset_Migration_Flag("Studale Practice");
}
//--------------------------------------------------------------------------------
function SQL_Reset_Migration_Flag(p_section)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  // Get Section
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Select ID FROM Section"
     + " WHERE Name = '" + p_section + "'";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_sect_id = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  var w_Location = w_sect_id;
  Log.Message(w_Location);
  
  // Reset Migration flag

  Qry.SQL = "Update Section Set DataMigration = 'False' Where Id = '" + w_sect_id + "';" 
  
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
function quick_SQL_Get_Testing_Location_id()
{ 
  var p_locn = "Studale High Security Prison & Recreation Centre";
  SQL_Get_Testing_Location_id(p_locn);
}
//--------------------------------------------------------------------------------
function SQL_Get_Testing_Location_id(p_locn)
{
   p_locn = aqString.Replace(p_locn, "'", "''");
    
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Select ID FROM Section"
     + " WHERE Name = '" + p_locn + "'";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_sect_id = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  Log.Message("Section Id = " + w_sect_id);

  if (aqString.SubString(w_sect_id,0,1) == "{")
  {
    w_sect_id = aqString.Replace(w_sect_id,"{", "");
    w_sect_id = aqString.Replace(w_sect_id,"}", "");
  }
  Log.Message(Qry.SQL + " " + w_sect_id);
  
  return w_sect_id;
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
}
//--------------------------------------------------------------------------------
function SQL_Get_Lead_User(w_sect_id)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT Username "
   + " FROM [User] u"
   + " JOIN [UsersInSection] uis on u.id = uis.userid"
     + " WHERE uis.SectionId = '" + w_sect_id+ "'"
      + " AND u.Username like '%lead%'";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_username = Qry.FieldByName("Username").Value;
  Qry.Close();
  
  Log.Message(w_username);
  
  return w_username;
}
//--------------------------------------------------------------------------------
function SQL_Get_Current_User(w_sect_id, w_name)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT Username "
   + " FROM [User] u"
   + " JOIN [UsersInSection] uis on u.id = uis.userid"
     + " WHERE uis.SectionId = '" + w_sect_id+ "'"
      + " AND u.FullName = '"+ w_name+ "'";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_username = Qry.FieldByName("Username").Value;
  Qry.Close();
  
  Log.Message(w_username);
  
  return w_username;
}
//--------------------------------------------------------------------------------
function SQL_Get_UserId(w_name)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT Id "
   + " FROM [User]"
     + " WHERE Username= '"+ w_name+ "'"
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_userid = Qry.FieldByName("Id").Value;
  Qry.Close();
  
//  Log.Message(w_username);
  
  return w_userid;
}
//--------------------------------------------------------------------------------
function SQL_Get_User_Reset_Code(p_userid)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT TOP 1 ResetCode "
   + " FROM [UserPasswordReset] upr"
   + " WHERE upr.userid= '"+ p_userid+ "'"
   + " ORDER BY [INSERTED] desc"
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_resetcode = Qry.FieldByName("ResetCode").Value;
  Qry.Close();
  
//  Log.Message(w_username);
  
  return w_resetcode;
}
//--------------------------------------------------------------------------------
function SQL_Get_All_Users()
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT Username, FullName, Section.Name FROM UsersInSection, [User], Section"
     + " WHERE UserId = [User].Id and SectionId = Section.Id"
     + " Order by Name, UserName"
     + " ";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_username = Qry.FieldByName("Username").Value;
  Qry.Close();
  
  w_
  Log.Message(w_username);
}

//--------------------------------------------------------------------------------
function SQL_Get_All_Clients()
{
  var w_outfile = "d:\\Results\\list_of_clients.csv";

  aqFile.WriteToTextFile(w_outfile, "\r\n",  aqFile.ctANSI, true);
  
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT Name FROM Section"
     + " WHERE Section.ParentSectionId Is null"
     + " and Section.Segment != ''"
     + " Order by Name"
     + " ";
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  while (!Qry.EOF)
  {
      Log.Message(Qry.FieldByName("Name").Value);
      
      // Write the record to the file
     aqFile.WriteToTextFile(w_outfile, Qry.FieldByName("Name").Value + "\r\n", aqFile.ctANSI);

      Qry.Next();
  }
  Qry.Close();
}
//===================================================================
// Section to add a ChangeMessageView for each user in a section, for each message
//===================================================================
function quick_SQL_add_message_views()
{
          SQL_add_message_views('5289EC5B-C6EF-47AA-87A7-4DC9C34A7AFA');
}
//--------------------------------------------------------------------------------
function SQL_add_message_views(p_sectionid)
{
          var wa_messages = SQL_Get_All_ChangeMessages();
          
          var wa_users = SQL_Get_User_List(p_sectionid);
          
 // For each Message, For each User, Add a ChangeMessageView record
           SQL_Insert_ChangeMessageView(wa_messages, wa_users);
}
//--------------------------------------------------------------------------------
function SQL_Get_All_ChangeMessages()
{
 
  var wa_messageids = new Array();
  i =0;
  
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT Id FROM ChangeMessage"
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  while (!Qry.EOF)
  {
      // Write the Id to the array
     wa_messageids[i] =  Qry.FieldByName("Id").Value;
     i++;

      Qry.Next();
  }
  Qry.Close();
  
  return wa_messageids;
}
//--------------------------------------------------------------------------------
function SQL_Get_User_List(p_SectionId)
{
 
  var wa_users = new Array();
  i =0;
  
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "SELECT userid FROM UsersinSection"
  + " where sectionid = '" + p_SectionId + "';" 
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  while (!Qry.EOF)
  {
      // Write the Id to the array
     wa_users[i] =  Qry.FieldByName("userid").Value;
     i++;

      Qry.Next();
  }
  Qry.Close();
  
  return wa_users;
}
//--------------------------------------------------------------------------------
function SQL_Insert_ChangeMessageView(pa_messages, pa_users)
{
  var Qry = ADO.CreateADOQuery();
 
   Qry.ConnectionString = SQL_Set_connection();

    for(x = 0; x < pa_messages.length; x++)
    {
              for(y = 0; y < pa_users.length; y++)
              {
                        Qry.SQL  = " INSERT INTO [ASPNETDB].[dbo].[ChangeMessageView] "
                        +" ([UserId],[changeMessageId],[SeenOn])"
                        +" values"
                        +" ('"+pa_users[y]+"','"+pa_messages[x]+"', '2014-10-14 00:00:00');"
                        
                        Qry.ExecSQL();    
              }
    }
    Qry.Close();
}
//===================================================================

//--------------------------------------------------------------------------------
function SQL_fetch_group(p_id,p_group)
{
// function to get a specific value for a specific patient group record
// written by Paul Tierney Jan 2014

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  // Get the Group Value  
  Qry.SQL  = "SELECT "+p_group +" FROM PatientGroup"
     + " WHERE patientID = '"+p_id+"'"
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_GroupResult = Qry.FieldByName(p_group).Value;
  Qry.Close();
  
  Log.Message(w_GroupResult);
  
  return w_GroupResult;
  
}
//--------------------------------------------------------------------------------
function countNULLgroup(p_id,p_group)
{
// function to return a record count from patient group (useful for checking for the absence of a whole patient group record
// written by Paul Tierney Jan 2014
 
  var Qry = ADO.CreateADODataSet();

  Qry.ConnectionString = SQL_Set_connection();
   
  Qry.CommandText="SELECT "+p_group +" FROM PatientGroup"
     + " WHERE patientID = '"+p_id+"'"

  Log.Message(Qry.CommandText);
  
  Qry.Open();
  Qry.First();
  var w_GroupResult = Qry.RecordCount;
  Log.Message(w_GroupResult);
  Qry.Close();
  
}
//--------------------------------------------------------------------------------
function SQL_fetch_value(p_id,p_value,p_table,p_idtype)
{
// function to get a specific value for a specific table (this is based on SQL_fetch_group but removes the group specifics so can be used on any table)
// you need to call it by stating: 
// - the guid you will put in the SQL where clause (p_id)
// - the field you are querying against (if you are checking for an absence of a record, give it any field in the record)
// - the table you want to query
// - the field prefix for the id you are giving it e.g. if your guid is a patient_id then the p_idtype will be "patient"
// written by Paul Tierney Jan 2014

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();
  
  // Get the Value
  if (p_idtype == "id")
  {
  Qry.SQL  = "SELECT "+p_value +" FROM " +p_table +" WHERE ID = '"+p_id+"'"
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_Result = Qry.FieldByName(p_value).Value;
  Qry.Close();
  
  if (aqString.SubString(w_Result,0,1) == "{")
  {
    Log.Message("Need to strip curlys");
    w_Result = aqString.Replace(w_Result,"{", "");
    w_Result = aqString.Replace(w_Result,"}", "");
  }
  else
  {
    Log.Message("Don't need to strip curlys");
  }
   
  Log.Message(w_Result);
  
  }
  else
  {
    
  Qry.SQL  = "SELECT "+p_value +" FROM " +p_table +" WHERE " +p_idtype +"ID = '"+p_id+"'"
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_Result = Qry.FieldByName(p_value).Value;
  Qry.Close();
  
  if (aqString.SubString(w_Result,0,1) == "{")
  {
    Log.Message("Need to strip curlys");
    w_Result = aqString.Replace(w_Result,"{", "");
    w_Result = aqString.Replace(w_Result,"}", "");
  }
  else
  {
    Log.Message("Don't need to strip curlys");
  }
   
  Log.Message(w_Result);
  }
  return w_Result;
  
}
//--------------------------------------------------------------------------------
function countNULLvalueSingleTable(p_id,p_value,p_table,p_idtype)
{
// function to return a record count from a single group e.g. count if a field in patient is NULL
// you need to call it by stating: 
// - the guid you will put in the SQL where clause (p_id)
// - the field you are querying against
// - the table you want to query
// - the field prefix for the id you are giving it e.g. if your guid is a patient_id then the p_idtype will be "patient"
// Note this function can only count from one table, no complex joins in SQL 

  var Qry = ADO.CreateADODataSet();

  Qry.ConnectionString = SQL_Set_connection();

  if (p_idtype == "id")
  {
      Qry.CommandText  = "SELECT COUNT(*) FROM " +p_table +" WHERE ID = '"+p_id+"' and "+p_value+" is NULL";  
      Log.Message(Qry.CommandText);
  }
  else
  {
      Qry.CommandText  = "SELECT COUNT(*) FROM " +p_table +" WHERE " +p_idtype +"ID = '"+p_id+"'and "+p_value+" is NULL";
      Log.Message(Qry.CommandText);
  }
  Qry.Open();
  Qry.First();
  var w_Result = Qry.RecordCount;
  Log.Message(w_Result);
  return w_Result;
  Qry.Close();
  
}
//--------------------------------------------------------------------------------
function countNULLvalueJoinedTable(p_id,p_value,p_primarytable,p_secondarytable,p_idtype)
{
// function to return a record count when joining one table to another, i.e. join patient to patient group will return 1 if specific patient has
// no group record... 
// you need to call it by stating: 
// - the guid you will put in the SQL where clause (p_id)
// - the field you are querying against (if you are checking for an absence of a record, give it any field in that record)
// - the table which will exist (e.g. patient) as p_primarytable
// - the tbale which will not exist (e.g. patient_group) as p_secondarytable
// - the field prefix for the id you are giving it e.g. if your guid is a patient_id then the p_idtype will be "patient"
  
  // self tester is named differently in database but MJN says this is fine
  if(p_value == "SelfTester")
    p_value = "SelfTesting";


  var Qry = ADO.CreateADODataSet();

  Qry.ConnectionString = SQL_Set_connection();

  if (p_idtype == "id")
  {
      Qry.CommandText  = "SELECT COUNT(*) FROM "+p_primarytable+" LEFT JOIN "+p_secondarytable+" ON "+p_primarytable+".id="+p_secondarytable+"."+p_primarytable+"id WHERE "+p_primarytable+"ID = '"+p_id+"' and "+p_value+" is NULL";  
      Log.Message(Qry.CommandText);
  }
  else
  {
      //not sure you'd ever do this...
      Qry.CommandText  = "SELECT COUNT(*) FROM "+p_primarytable+" LEFT JOIN "+p_secondarytable+" ON "+p_primarytable+".id="+p_secondarytable+"."+p_primarytable+"id WHERE " +p_idtype +"ID = '"+p_id+"'and "+p_value+" is NULL";
      Log.Message(Qry.CommandText);
  }
  Qry.Open();
  Qry.First();
  var w_Result = Qry.RecordCount;
  Log.Message(w_Result);
  return w_Result;
  Qry.Close();
  
}





//--------------------------------------------------------------------------------
function SQL_Clinic(p_clinic_name, p_locn_id)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  // Get the Clinic  
  Qry.SQL  = "SELECT Id FROM Clinic"
     + " WHERE SectionId = '"+p_locn_id+"'"
     + " AND Name = '"+p_clinic_name+"'"
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_clinicId = Qry.FieldByName("Id").Value;
  Qry.Close();
  
  if (aqString.SubString(w_clinicId,0,1) == "{")
  {
    w_clinicId = aqString.Substring(w_clinicId,1,w_clinicId.length-2)
  }
  Log.Message(w_clinicId);
  
  return w_clinicId;
  
}
//--------------------------------------------------------------------------------
function SQL_Clinic_Slot_Length(p_clinicid)
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  // Get the Clinic  
  Qry.SQL  = "SELECT SlotLength FROM Clinic"
     + " WHERE Id = '"+p_clinicid+"'"
  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  var w_slotlength = Qry.FieldByName("SlotLength").Value;
  Qry.Close();
  
  
  return w_slotlength;
  
}
//--------------------------------------------------------------------------------
function SQL_GetNextSlot(p_clinicid, p_ntd)
{
  var Qry = ADO.CreateADOQuery();
  
  var w_start = p_ntd + " 00:00:00.000";
  var w_end = p_ntd + " 23:00:00.000";
  var w_nextslot = "None";
      
  Qry.ConnectionString = SQL_Set_connection();

  // Get the Clinic  
  Qry.SQL  = "SELECT Max(StartDate) as AptTime"
     + " From Appointment"
     + " WHERE ClinicId = '"+p_clinicid+"'"
     + " AND StartDate > '"+w_start+"'"
     + " AND StartDate < '"+w_end+"'"

  Log.Message(Qry.SQL);
  
  Qry.Open();
  Qry.First();
  Log.Message("In SQL routine : " + Qry.FieldByName("AptTime").Value);
  if (Qry.FieldByName("AptTime").Value != null)
  {
     w_nextslot = Qry.FieldByName("AptTime").Value;
  }
  Qry.Close();
  
  Log.Message(w_nextslot);
  
  return w_nextslot;
  
}
//--------------------------------------------------------------------------------
function SQL_Update_Stage_1(p_pno)
{
  var w_pid = SQL_Find_Patient_No(p_pno); 
   
  Log.Message("Today: " + aqDateTime.Today());
  Log.Message("-4 days ago: " + aqDateTime.AddDays(aqDateTime.Today(), -4));
  
  var w_txtdate = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -4));
  var w_date = aqString.SubString(w_txtdate,6,4) + aqString.SubString(w_txtdate,2,4) + aqString.SubString(w_txtdate,0,2);

  var w_txttoday = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), 0));
  var w_today = aqString.SubString(w_txttoday,6,4) + aqString.SubString(w_txttoday,2,4) + aqString.SubString(w_txttoday,0,2);

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Treatment SET"
     + " Date = '" + w_date + "', "
     + " Inserted = '" + w_date + "', "
     + " NextTest = '" + w_today + "'"
     + " WHERE InductionStage = " + 1
     + " AND PatientId = '" + w_pid + "'";    
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
//--------------------------------------------------------------------------------
function SQL_Update_Stage_2(p_pno)
{
  var w_pid = SQL_Find_Patient_No(p_pno); 
  
  // Reset Sate 1
   
  Log.Message("Today: " + aqDateTime.Today());
  Log.Message("-7 days ago: " + aqDateTime.AddDays(aqDateTime.Today(), -7));
  
  var w_txtdate = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -7));
  var w_date = aqString.SubString(w_txtdate,6,4) + aqString.SubString(w_txtdate,2,4) + aqString.SubString(w_txtdate,0,2);

  var w_txttoday = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -3));
  var w_today = aqString.SubString(w_txttoday,6,4) + aqString.SubString(w_txttoday,2,4) + aqString.SubString(w_txttoday,0,2);

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Treatment SET"
     + " Date = '" + w_date + "', "
     + " Inserted = '" + w_date + "', "
     + " NextTest = '" + w_today + "'"
     + " WHERE InductionStage = " + 1
     + " AND PatientId = '" + w_pid + "'";    
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
  
  // reset Stage 2

    Log.Message("Today: " + aqDateTime.Today());
  Log.Message("-3 days ago: " + aqDateTime.AddDays(aqDateTime.Today(), -3));
  
  var w_txtdate = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), -3));
  var w_date = aqString.SubString(w_txtdate,6,4) + aqString.SubString(w_txtdate,2,4) + aqString.SubString(w_txtdate,0,2);

  var w_txttoday = aqConvert.StrToDate(aqDateTime.AddDays(aqDateTime.Today(), 0));
  var w_today = aqString.SubString(w_txttoday,6,4) + aqString.SubString(w_txttoday,2,4) + aqString.SubString(w_txttoday,0,2);

  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Update Treatment SET"
     + " Date = '" + w_date + "', "
     + " Inserted = '" + w_date + "', "
     + " NextTest = '" + w_today + "'"
     + " WHERE InductionStage = " + 2
     + " AND PatientId = '" + w_pid + "'";    
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();


}
//--------------------------------------------------------------------------------
// Delete all patient type data from a section !!
function SQL_reset_section_content()
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = "Declare @sectionID nvarchar(max); "
+" Set @sectionID = 'BBC8CFA1-B8A3-458A-A8A4-DD7B0DD27382'"

+" DELETE FROM Treatment WHERE [SectionId] = @sectionID"
+" DELETE FROM Referral WHERE [ReferalDestination] = @sectionID"
+" DELETE FROM WarfarinPreferences where TreatmentPlanId in (Select Id from TreatmentPlan WHERE PatientId IN (SELECT Id FROM Patient WHERE RegisteredSectionId = @sectionID))"
+" DELETE FROM NextDate WHERE SectionId = @sectionID"
+" DELETE FROM ClinicToAppointment WHERE AppointmentId IN (SELECT ID FROM Appointment WHERE SectionId = @sectionID)"
+" DELETE FROM Appointment WHERE SectionId = @sectionID"
+" ALTER TABLE [dbo].[TreatmentPlan] DROP CONSTRAINT [FK_TreatmentPlan_LastReview]"
+" DELETE FROM Consultation WHERE SectionId = @sectionID"
+" ALTER TABLE [dbo].[TreatmentPlan]  WITH NOCHECK ADD  CONSTRAINT [FK_TreatmentPlan_LastReview] FOREIGN KEY([LastReviewId]) REFERENCES [dbo].[Consultation] ([Id])"
+" DELETE FROM TreatmentPlan WHERE PatientId IN (SELECT Id FROM Patient WHERE RegisteredSectionId = @sectionID)"
+" DELETE FROM Note WHERE PatientId IN (SELECT Id FROM Patient WHERE RegisteredSectionId = @sectionID)"
+" DELETE FROM IQC WHERE SectionId = @sectionID"
+" DELETE FROM EQC WHERE SectionId = @sectionID"
+" DELETE FROM AdverseEvent WHERE PatientId IN (SELECT Id FROM Patient WHERE RegisteredSectionId = @sectionID)"
+" DELETE FROM PatientRecord WHERE PatientId IN (SELECT Id FROM Patient WHERE RegisteredSectionId = @sectionID)"
+" DELETE FROM PatientTransfer WHERE PatientId IN (SELECT Id FROM Patient WHERE RegisteredSectionId = @sectionID)"
+" DELETE FROM PatientGroup WHERE PatientId IN (SELECT Id FROM Patient WHERE RegisteredSectionId = @sectionID)"
+" DELETE FROM PatientDemographics WHERE PatientId IN (SELECT Id FROM Patient WHERE RegisteredSectionId = @sectionID)"
+" DELETE FROM PatientTable WHERE RegisteredSectionId = @sectionID"
+" Update Section Set DataMigration = 'False' Where Id = @sectionID "
+" DELETE FROM Clinician WHERE SectionId = @sectionID";

  Log.Message(Qry.SQL);
  Qry.ExecSQL();    
  Qry.Close();
}

//--------------------------------------------------------------------------------

function SQL_update_review_date(x_pid)

{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  =  "UPDATE NextDate" 
  + " SET [Date] = '2013-05-06 00:00:00.000'" 
  + " WHERE PatientId = '" + x_pid + "' ";
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();

}

//--------------------------------------------------------------------------------

function SQL_update_diagnosis(x_pid)

{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  =  "UPDATE TreatmentPlan" 
  + " SET [DiagnosisId] = '00000000-0000-0000-0000-000000000000'" 
  + " WHERE PatientId = '" + x_pid + "' ";
//  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();

}

//--------------------------------------------------------------------------------

function SQL_update_diagnosis_zero_guid(x_pid)

{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  =  "UPDATE NextDate" 
  + " SET [Date] = '2013-05-06 00:00:00.000'" 
  + " WHERE PatientId = '" + x_pid + "' ";
  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();

}

//--------------------------------------------------------------------------------

function SQL_add_clead_user()
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = " DECLARE @sectionid uniqueidentifier"
+" DECLARE @userid uniqueidentifier"
+" DECLARE @userinsectionid uniqueidentifier"
+" DECLARE @role NVARCHAR(MAX)"
+" DECLARE @sectionname NVARCHAR(MAX)"
+" DECLARE @username NVARCHAR(MAX);"

+" set @sectionid='BBC8CFA1-B8A3-458A-A8A4-DD7B0DD27382';"
+" set @sectionname="

+" set @role="
+" set @username = @role+'@'+@sectionname;"

+" INSERT INTO [ASPNETDB].[dbo].[User] "
+" ([Id],[Username],[Password],[PasswordSalt],[PasswordExpiry],[IsApproved],"
+" [FullName],[LockoutExpiry],[FailedLoginAttempts],[PasswordLastChanged],[HasSignedLicenseAgreement],[HideImportantInfo])"
+" values"
+" (NEWID(),@username,'38DC6678EE0127B4C4024BF5D82CEAA51DAD99AC', 'yZChFbiNhGOs45WV+QE=', '2016-12-30 00:00:00','1', @role,NULL,'0','2012-10-25 00:00:00', '1','2014-05-08 15:12:49.763');"

+" set @userid=(SELECT id from [ASPNETDB].[dbo].[User] where Username=@username);"

+" INSERT INTO [ASPNETDB].[dbo].[UsersInSection]"
+" ([Id],[SectionId],[UserId])"
+" values"
+" (NEWID(),@sectionid,@userid);"

+" set @userinsectionid=(SELECT id from [ASPNETDB].[dbo].[UsersInSection] where UserId=@userid and SectionId=@sectionid);"

+" INSERT INTO [ASPNETDB].[dbo].[UserToRoles]"
+" ([Id], [RoleId], [UserInSectionId])"
+" values"
+" (NEWID(), '4342EB9E-F9D5-4AE8-B9B5-8AC840A70831', @userinsectionid);"

  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
//--------------------------------------------------------------------------------

function SQL_add_cl2_user()
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = " DECLARE @sectionid uniqueidentifier"
+" DECLARE @userid uniqueidentifier"
+" DECLARE @userinsectionid uniqueidentifier"
+" DECLARE @role NVARCHAR(MAX)"
+" DECLARE @sectionname NVARCHAR(MAX)"
+" DECLARE @username NVARCHAR(MAX);"

+" set @sectionid='BBC8CFA1-B8A3-458A-A8A4-DD7B0DD27382';"
+" set @sectionname="

+" set @role="
+" set @username = @role+'@'+@sectionname;"

+" INSERT INTO [ASPNETDB].[dbo].[User] "
+" ([Id],[Username],[Password],[PasswordSalt],[PasswordExpiry],[IsApproved],"
+" [FullName],[LockoutExpiry],[FailedLoginAttempts],[PasswordLastChanged],[HasSignedLicenseAgreement],[HideImportantInfo])"
+" values"
+" (NEWID(),@username,'38DC6678EE0127B4C4024BF5D82CEAA51DAD99AC', 'yZChFbiNhGOs45WV+QE=', '2016-12-30 00:00:00','1', @role,NULL,'0','2012-10-25 00:00:00', '1','2014-05-08 15:12:49.763');"

+" set @userid=(SELECT id from [ASPNETDB].[dbo].[User] where Username=@username);"

+" INSERT INTO [ASPNETDB].[dbo].[UsersInSection]"
+" ([Id],[SectionId],[UserId])"
+" values"
+" (NEWID(),@sectionid,@userid);"

+" set @userinsectionid=(SELECT id from [ASPNETDB].[dbo].[UsersInSection] where UserId=@userid and SectionId=@sectionid);"

+" INSERT INTO [ASPNETDB].[dbo].[UserToRoles]"
+" ([Id], [RoleId], [UserInSectionId])"
+" values"
+" (NEWID(), '36E3026C-4D82-4902-B72F-6FAFB81871C0', @userinsectionid);"

  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}

//--------------------------------------------------------------------------------

function SQL_add_cl3_user()
{
  var Qry = ADO.CreateADOQuery();
      
  Qry.ConnectionString = SQL_Set_connection();

  Qry.SQL  = " DECLARE @sectionid uniqueidentifier"
+" DECLARE @userid uniqueidentifier"
+" DECLARE @userinsectionid uniqueidentifier"
+" DECLARE @role NVARCHAR(MAX)"
+" DECLARE @sectionname NVARCHAR(MAX)"
+" DECLARE @username NVARCHAR(MAX);"

+" set @sectionid='BBC8CFA1-B8A3-458A-A8A4-DD7B0DD27382';"
+" set @sectionname="

+" set @role="
+" set @username = @role+'@'+@sectionname;"

+" INSERT INTO [ASPNETDB].[dbo].[User] "
+" ([Id],[Username],[Password],[PasswordSalt],[PasswordExpiry],[IsApproved],"
+" [FullName],[LockoutExpiry],[FailedLoginAttempts],[PasswordLastChanged],[HasSignedLicenseAgreement],[HideImportantInfo])"
+" values"
+" (NEWID(),@username,'38DC6678EE0127B4C4024BF5D82CEAA51DAD99AC', 'yZChFbiNhGOs45WV+QE=', '2016-12-30 00:00:00','1', @role,NULL,'0','2012-10-25 00:00:00', '1','2014-05-08 15:12:49.763');"

+" set @userid=(SELECT id from [ASPNETDB].[dbo].[User] where Username=@username);"

+" INSERT INTO [ASPNETDB].[dbo].[UsersInSection]"
+" ([Id],[SectionId],[UserId])"
+" values"
+" (NEWID(),@sectionid,@userid);"

+" set @userinsectionid=(SELECT id from [ASPNETDB].[dbo].[UsersInSection] where UserId=@userid and SectionId=@sectionid);"

+" INSERT INTO [ASPNETDB].[dbo].[UserToRoles]"
+" ([Id], [RoleId], [UserInSectionId])"
+" values"
+" (NEWID(), '764719CF-1ABD-41B0-9FF5-62EE699B2173', @userinsectionid);"

  Log.Message(Qry.SQL);
  
  Qry.ExecSQL();    
  Qry.Close();
}
