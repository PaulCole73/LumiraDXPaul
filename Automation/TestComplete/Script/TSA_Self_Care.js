//USEUNIT System_Paths
//USEUNIT INRstar_Navigation
//USEUNIT Misc_Functions
//--------------------------------------------------------------------------------
function warfarin_self_care(stage)
{
  Goto_Self_Care();
  var INRstarV5 = INRstar_base();
  var enrol_button = warfarin_self_testing_initial_enrol_button_path();
  var stage_one_buttons = warfarin_self_testing_self_testing_stage_one_path();
  var training_button = warfarin_self_testing_self_testing_stage_two_path();
  var authorise_button = warfarin_self_testing_self_testing_stage_three_path();
  var stage_four_buttons = warfarin_self_testing_self_testing_stage_four_path();
  
  if(stage=='1')
  {
    enrol_button.Click();
    stage_one_buttons.Panel(0).Checkbox("Program_Warfarin_Self_Testing_Phases_Stage_1_5_Content_Input").ClickChecked(true); 
    stage_one_buttons.Button("Program_Warfarin_Self_Testing_Phases_Stage_1_6_Content_Input").Click();
    WaitSeconds(4,"Waiting to be enrolled")
  } 
  else if (stage=='2')
  {
    training_button.ClickChecked(true); 
  }  
  else if (stage=='3')
  {
    authorise_button.ClickChecked(true);
    INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).TextNode(0).Click();
  } 
  else if (stage=='disenrolled')
  {
    enrol_button.Click();
    stage_one_buttons.Panel(0).Checkbox("Program_Warfarin_Self_Testing_Phases_Stage_1_5_Content_Input").ClickChecked(true); 
    stage_one_buttons.Button("Program_Warfarin_Self_Testing_Phases_Stage_1_6_Content_Input").Click();
    WaitSeconds(6,"Waiting to be enrolled")
        
    training_button.ClickChecked(true); 
    WaitSeconds(1,"Waiting for authorise button")
        
    authorise_button.ClickChecked(true);
    INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).TextNode(0).Click();
    WaitSeconds(1,"Waiting for remove button")
  
    stage_four_buttons.Panel(0).Checkbox("Program_Warfarin_Self_Testing_Phases_Stage_4_1_Content_Input").ClickChecked(true);
    stage_four_buttons.Button("Program_Warfarin_Self_Testing_Phases_Stage_4_3_Content_Input").Click();
    INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).TextNode(0).Click();
    
  } 
  else if (stage=='all')
  {
    enrol_button.Click();
    stage_one_buttons.Panel(0).Checkbox("Program_Warfarin_Self_Testing_Phases_Stage_1_5_Content_Input").ClickChecked(true); 
    stage_one_buttons.Button("Program_Warfarin_Self_Testing_Phases_Stage_1_6_Content_Input").Click();
    WaitSeconds(10,"Waiting to be enrolled")
        
    training_button.ClickChecked(true); 
    WaitSeconds(1,"Waiting for authorise button")
        
    authorise_button.ClickChecked(true);
    INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).TextNode(0).Click();
  } 
} 
//--------------------------------------------------------------------------------
function self_care_DDD(stage)
{
  Goto_Self_Care();
  var INRstarV5 = INRstar_base();
  
  if(stage == "1")
  {
    var enrol_ddd_button = ddd_initial_enrol_button_path();
    WaitSeconds(2);
    enrol_ddd_button.Click();
    WaitSeconds(2);
  
    var stage_one_path = ddd_self_testing_self_testing_stage_one_path();
    stage_one_path.Panel(0).Checkbox("Program_Digital_dosing_diary_Phases_Stage_1_5_Content_Input").ClickChecked(true); 
    stage_one_path.Button("Program_Digital_dosing_diary_Phases_Stage_1_6_Content_Input").Click();
    WaitSeconds(8, "Waiting for the Email Confirmation box...");
    process_popup("Email sent", "Ok");
  }
  else if(stage == "2")
  {
    checkbox = ddd_self_testing_self_testing_stage_three_path().Panel(0).Checkbox("Program_Digital_dosing_diary_Phases_Stage_3_1_Content_Input");
    checkbox.ClickChecked(true);
  }
  else if(stage == "disenrolled")
  {
    var enrol_ddd_button = ddd_initial_enrol_button_path();
    enrol_ddd_button.Click();
  
    var stage_one_path = ddd_self_testing_self_testing_stage_one_path();
    stage_one_path.Panel(0).Checkbox("Program_Digital_dosing_diary_Phases_Stage_1_5_Content_Input").ClickChecked(true); 
    stage_one_path.Button("Program_Digital_dosing_diary_Phases_Stage_1_6_Content_Input").Click();
    WaitSeconds(6, "Waiting for the Email Confirmation box...");
  
    INRstarV5.Panel(3).Panel(1).Panel(0).Button(0).TextNode(0).Click();
  
    var stage_four_path = ddd_self_testing_self_testing_stage_four_path();
    stage_four_path.Panel(0).Checkbox("Program_Digital_dosing_diary_Phases_Stage_4_1_Content_Input").ClickChecked(true); 
    stage_four_path.Button("Program_Digital_dosing_diary_Phases_Stage_4_3_Content_Input").Click();
  
    INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).TextNode(0).Click();
    WaitSeconds(1);
  }
} 
//--------------------------------------------------------------------------------
function self_care_manaul()
{
  var INRstarV5 = INRstar_base();
  Goto_Patient_Management_Edit();
  var main_area = patient_management_path()
  var patient_groups_path = patient_management_groups();
  
  patient_groups_path.Panel(3).Checkbox("SelfTester").Click();
  INRstarV5.Panel(3).Panel(1).Panel(0).Button(1).TextNode(0).Click();
  
  main_area.Panel(0).SubmitButton("UpdatePatientManagementDetails").Click();
} 
//--------------------------------------------------------------------------------









