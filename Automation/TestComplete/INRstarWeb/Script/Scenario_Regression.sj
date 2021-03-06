//USEUNIT x_Scenario_Baker
//USEUNIT x_Scenario_Bowen
//USEUNIT x_Scenario_Brown
//USEUNIT x_Scenario_Dennis
//USEUNIT x_Scenario_DSouza
//USEUNIT x_Scenario_Green
//USEUNIT x_Scenario_Pascoe
//USEUNIT Scenario_Perkins
//USEUNIT Scenario_Smith
//USEUNIT Scenario_Smith_Doris
//USEUNIT Scenario_Whittingham

//=============================================================================
// Scenario Regression Tests
//
//=============================================================================

function scenario_regression()
{
         // Scenario 1
         scenario_smith();
         
         // Scenario 2  (uses number)
         scenario_whittingham();
         
         // Scenario 4
         scenario_dsouza();
         
         // Scenario 5
         scenario_perkins();
         
         // Scenario 6
         scenario_baker();
         
         // Scenario 7
         scenario_dennis();
         
         // Scenario 8
         scenario_brown();
         
         // Scenario 9 (uses number)
         scenario_smith_doris();
         
         // Scenario 10
         scenario_green();
         
         // Scenario 11
         scenario_pascoe();
         
         // Scenario 12
         scenario_bowen();
//         
}