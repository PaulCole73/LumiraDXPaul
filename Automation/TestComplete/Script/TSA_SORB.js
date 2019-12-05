//USEUNIT System_Paths
//USEUNIT SORB_Functions
//USEUNIT Navigation
//USEUNIT V5_Common_Batch
//USEUNIT Add_INR_Simple

//--------------------------------------------------------------------------------
function add_sorb_based_on_suggested()
{ 
    click_sorb_button("suggested");
    var sorb_table_path = sorb_table();
    
    //sorb_table_path.Cell(1, 4).Table(0).Cell(0, 0).Button("btnDec0").Click();
    //sorb_table_path.Cell(1, 4).Table(0).Cell(0, 1).Button("btnInc0");
    sorb_table_path.Cell(1, 4).Table(0).Cell(0, 2).Button("btnSkip0").Click();
    
    var sorb_finish_buttons = sorb_schedule_finish_buttons();
    sorb_finish_buttons.Button("SORBOk").Click();
} 
//--------------------------------------------------------------------------------
function add_sorb_based_on_current()
{ 
    click_sorb_button("current");
    var sorb_table_path = sorb_table();
    
    //sorb_table_path.Cell(1, 4).Table(0).Cell(0, 0).Button("btnDec0").Click();
    //sorb_table_path.Cell(1, 4).Table(0).Cell(0, 1).Button("btnInc0");
    sorb_table_path.Cell(1, 4).Table(0).Cell(0, 2).Button("btnSkip0").Click();
    
    var sorb_finish_buttons = sorb_schedule_finish_buttons();
    sorb_finish_buttons.Button("SORBOk").Click();
} 
//--------------------------------------------------------------------------------
function click_sorb_button(tab) //should be in SORB tsa
{
  var path = pending_treatment_buttons();
  panelPTI = path.Panel("PendingTreatmentInfo");
  
  if(tab == "suggested")
  {
    panelPTI.Panel(0).Button("SkipOrBoost0").Click();
  }
  else if (tab == "current")
  {
    panelPTI.Panel("DosingSchedule").Link("CurrentTab").Click();
    panelPTI.Panel(0).Button("SkipOrBoost1").Click(); 
  }   
}