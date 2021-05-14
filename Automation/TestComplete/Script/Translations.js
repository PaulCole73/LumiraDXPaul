//USEUNIT Misc_Functions
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                             INRstar Translations                                //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
function get_english_shortmonth_translation(string)
{
  if (language == 'Italian')
  {
    var translation_dictionary = {
      "gen":"Jan",
      "feb":"Feb",
      "mar":"Mar",
      "apr":"Apr",
      "mag":"May",
      "giu":"Jun",
      "lug":"Jul",
      "ago":"Aug",
      "set":"Sep",
      "ott":"Oct",
      "nov":"Nov",
      "dic":"Dec"};
      
    if (translation_dictionary[string] == null)
    {
      Log.Message("Unable to find english translation of: " + string);
      string = "Untranslated_" + string;
    }
    else
    {
      string = translation_dictionary[string];
    }
  }
  
return string;
}
//-----------------------------------------------------------------------------------
function set_italian_long_month(month)
{
  var long_month;

  switch(month)
  {
  case "January":
  long_month = "gennaio";
  break;
  case "February":
  long_month = "febbraio";
  break;
  case "March":
  long_month = "marzo";
  break;
  case "April":
  long_month = "aprile";
  break;
  case "May":
  long_month = "maggio";
  break;
  case "June":
  long_month = "giugno";
  break;
  case "July":
  long_month = "luglio";
  break;
  case "August":
  long_month = "agosto";
  break;
  case "September":
  long_month = "settembre";
  break;
  case "October":
  long_month = "ottobre";
  break;
  case "November":
  long_month = "novembre";
  break;
  case "December":
  long_month = "dicembre";
  break;
  default:
  Log.Message("Couldn't find the month you were looking for");
  }
return long_month;
}
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
function get_decimal_translation(decimal_value)
{
  if (language == 'Italian')
  {
    decimal_value = decimal_value.replace(".", ","); 
  }
  return decimal_value
}
//-----------------------------------------------------------------------------------
function get_string_translation(string)
{
  if (language != "English")
  {
    var translation_dictionary = {
      
"The adverse event was successfully added"	
    :{
      Italian:	"L'evento indesiderato è stato aggiunto correttamente"	
    },
"This patient's current anticoagulant is not licensed for patients under the age of 18 years.":
    {
     Italian: "L'attuale anticoagulante di questo paziente non è autorizzato per i pazienti di età inferiore a 18 anni."
    },      
"Mr"	
    :{
      Italian:	"Sig."	
    },
      
"Mrs": {
      Italian:	"Sig.ra"	
    },
      
"Jan"	
    :{
      Italian:	"gen"	
    },
      
"Feb"	
    :{
      Italian:	"feb"	
    },
      
"Mar"	
    :{
      Italian:	"mar"	
    },
      
"Apr"	
    :{
      Italian:	"apr"	
    },
      
"May"	
    :{
      Italian:	"mag",
    },
      
"Jun"	
    :{
      Italian:	"giu"	
    },
      
"Jul"	
    :{
      Italian:	"lug"	
    },
      
"Aug"	
    :{
      Italian:	"ago"	
    },
      
"Sep"	
    :{
      Italian:	"set"	
    },
      
"Oct"	
    :{
      Italian:	"ott"	
    },
      
"Nov"	
    :{
      Italian:	"nov"	
    },
      
"Dec"	
    :{
      Italian:	"dic"	
    },
      
"Add Adverse Event"	
    :{
      Italian:	"Aggiungere evento indesiderato"	
    },
      
"Confirmation Required"	
    :{
      Italian:	"Confermare richiesta"	
    },
      
"Confirm"	
    :{
      Italian:	"Conferma"	
    },
      
"Delete Adverse Event"	
    :{
      Italian:	"Eliminare eventi indesiderati"	
    },
      
"Add Note"	
    :{
      Italian:	"Aggiungere nota"	
    },
      
"Add Patient"	
    :{
      Italian:	"Aggiungere paziente"	
    },
      
"This patient may already exist at this location as "	
    :{
      Italian:	"Questo paziente può già essere in questa sede come "	
    },
      
0.8	
    :{
      Italian:	"0,8"	
    },
      
0.9	
    :{
      Italian:	"0,9"	
    },
      
1.0	
    :{
      Italian:	"1,0"	
    },
      
1.1	
    :{
      Italian:	"1,1"	
    },
      
1.2	
    :{
      Italian:	"1,2"	
    },
      
1.3	
    :{
      Italian:	"1,3"	
    },
      
1.4	
    :{
      Italian:	"1,4"	
    },
      
1.5	
    :{
      Italian:	"1,5"	
    },
      
1.6	
    :{
      Italian:	"1,6"	
    },
      
1.7	
    :{
      Italian:	"1,7"	
    },
      
1.8	
    :{
      Italian:	"1,8"	
    },
      
1.9	
    :{
      Italian:	"1,9"	
    },
      
2.0	
    :{
      Italian:	"2,0"	
    },
      
2.1	
    :{
      Italian:	"2,1"	
    },
      
2.2	
    :{
      Italian:	"2,2"	
    },
      
2.3	
    :{
      Italian:	"2,3"	
    },
      
2.4	
    :{
      Italian:	"2,4"	
    },
      
2.5	
    :{
      Italian:	"2,5"	
    },
      
2.6	
    :{
      Italian:	"2,6"	
    },
      
2.7	
    :{
      Italian:	"2,7"	
    },
      
2.8	
    :{
      Italian:	"2,8"	
    },
      
2.9	
    :{
      Italian:	"2,9"	
    },
      
3.0	
    :{
      Italian:	"3,0"	
    },
      
3.1	
    :{
      Italian:	"3,1"	
    },
      
3.2	
    :{
      Italian:	"3,2"	
    },
      
3.3	
    :{
      Italian:	"3,3"	
    },
      
3.4	
    :{
      Italian:	"3,4"	
    },
      
3.5	
    :{
      Italian:	"3,5"	
    },
      
3.6	
    :{
      Italian:	"3,6"	
    },
      
3.7	
    :{
      Italian:	"3,7"	
    },
      
3.8	
    :{
      Italian:	"3,8"	
    },
      
3.9	
    :{
      Italian:	"3,9"	
    },
      
4.0	
    :{
      Italian:	"4,0"	
    },
      
4.1	
    :{
      Italian:	"4,1"	
    },
      
4.2	
    :{
      Italian:	"4,2"	
    },
      
4.3	
    :{
      Italian:	"4,3"	
    },
      
4.4	
    :{
      Italian:	"4,4"	
    },
      
4.5	
    :{
      Italian:	"4,5"	
    },
      
4.6	
    :{
      Italian:	"4,6"	
    },
      
4.7	
    :{
      Italian:	"4,7"	
    },
      
4.8	
    :{
      Italian:	"4,8"	
    },
      
4.9	
    :{
      Italian:	"4,9"	
    },
      
5.0	
    :{
      Italian:	"5,0"	
    },
      
5.1	
    :{
      Italian:	"5,1"	
    },
      
5.2	
    :{
      Italian:	"5,2"	
    },
      
5.3	
    :{
      Italian:	"5,3"	
    },
      
5.4	
    :{
      Italian:	"5,4"	
    },
      
5.5	
    :{
      Italian:	"5,5"	
    },
      
5.6	
    :{
      Italian:	"5,6"	
    },
      
5.7	
    :{
      Italian:	"5,7"	
    },
      
5.8	
    :{
      Italian:	"5,8"	
    },
      
5.9	
    :{
      Italian:	"5,9"	
    },
      
6.0	
    :{
      Italian:	"6,0"	
    },
      
6.1	
    :{
      Italian:	"6,1"	
    },
      
6.2	
    :{
      Italian:	"6,2"	
    },
      
6.3	
    :{
      Italian:	"6,3"	
    },
      
6.4	
    :{
      Italian:	"6,4"	
    },
      
6.5	
    :{
      Italian:	"6,5"	
    },
      
6.6	
    :{
      Italian:	"6,6"	
    },
      
6.7	
    :{
      Italian:	"6,7"	
    },
      
6.8	
    :{
      Italian:	"6,8"	
    },
      
6.9	
    :{
      Italian:	"6,9"	
    },
      
7.0	
    :{
      Italian:	"7,0"	
    },
      
7.1	
    :{
      Italian:	"7,1"	
    },
      
7.2	
    :{
      Italian:	"7,2"	
    },
      
7.3	
    :{
      Italian:	"7,3"	
    },
      
7.4	
    :{
      Italian:	"7,4"	
    },
      
7.5	
    :{
      Italian:	"7,5"	
    },
      
7.6	
    :{
      Italian:	"7,6"	
    },
      
7.7	
    :{
      Italian:	"7,7"	
    },
      
7.8	
    :{
      Italian:	"7,8"	
    },
      
7.9	
    :{
      Italian:	"7,9"	
    },
      
8.0	
    :{
      Italian:	"8,0"	
    },
      
8.1	
    :{
      Italian:	"8,1"	
    },
      
8.2	
    :{
      Italian:	"8,2"	
    },
      
8.3	
    :{
      Italian:	"8,3"	
    },
      
8.4	
    :{
      Italian:	"8,4"	
    },
      
8.5	
    :{
      Italian:	"8,5"	
    },
      
8.6	
    :{
      Italian:	"8,6"	
    },
      
8.7	
    :{
      Italian:	"8,7"	
    },
      
8.8	
    :{
      Italian:	"8,8"	
    },
      
8.9	
    :{
      Italian:	"8,9"	
    },
      
9.0	
    :{
      Italian:	"9,0"	
    },
      
9.1	
    :{
      Italian:	"9,1"	
    },
      
9.2	
    :{
      Italian:	"9,2"	
    },
      
9.3	
    :{
      Italian:	"9,3"	
    },
      
9.4	
    :{
      Italian:	"9,4"	
    },
      
9.5	
    :{
      Italian:	"9,5"	
    },
      
9.6	
    :{
      Italian:	"9,6"	
    },
      
9.7	
    :{
      Italian:	"9,7"	
    },
      
9.8	
    :{
      Italian:	"9,8"	
    },
      
9.9	
    :{
      Italian:	"9,9"	
    },
      
10.0	
    :{
      Italian:	"10,0"	
    },
      
"4 Weeks"	
    :{
      Italian:	"4 Settimane"	
    },
      
"6 Weeks"	
    :{
      Italian:	"6 Settimane"	
    },
      
"8 Weeks"	
    :{
      Italian:	"8 Settimane"	
    },
      
"10 Weeks"	
    :{
      Italian:	"10 Settimane"	
    },
      
"12 Weeks"	
    :{
      Italian:	"12 Settimane"	
    },
      
"13 Weeks"	
    :{
      Italian:	"13 Settimane"	
    },
      
"26 Weeks"	
    :{
      Italian:	"26 Settimane"	
    },
      
"52 Weeks"	
    :{
      Italian:	"52 Settimane"	
    },
      
"There are no IQCs recorded"	
    :{
      Italian:	"Nessun CQI registrato"	
    },
      
"IQC Deleted"	
    :{
      Italian:	"CQI eliminato"	
    },
      
"Confirm Email Address"	
    :{
      Italian:	"Confermare indirizzo email"	
    },
      
"Email Address"	
    :{
      Italian:	"Indirizzo email"	
    },
      
"Cancel"	
    :{
      Italian:	"Annulla"	
    },
      
"Important Information"	
    :{
      Italian:	"Informazioni importanti"	
    },
      
"The login details are incorrect, please re-enter"	
    :{
      Italian:	"I dati di accesso non sono corretti, reinserire"	
    },
      
"Welcome to the INRstar anticoagulation monitoring system."	
    :{
      Italian:	"Benvenuti nel sistema di monitoraggio anticoagulazione INRstar."	
    },
      
"New review created"	
    :{
      Italian:	"Nuovo riesame creato"	
    },
      
"Atrial fibrillation"	
    :{
      Italian:	"Fibrillazione atriale"	
    },
      
"Drug Confirmation Change"	
    :{
      Italian:	"Conferma di Modifica del farmaco"	
    },
      
"Manual Dosing"	
    :{
      Italian:	"Dosaggio manuale"	
    },
      
"Hillingdon Maintenance"	
    :{
      Italian:	"Coventry Maintenance"	
    },
      
"Induction"	
    :{
      Italian:	"Induzione lenta di Tait"	
    },
      
"Induction Slow Tait"	
    :{
      Italian:	"Induzione lenta di Tait"	
    },
      
"Induction Slow Oates"	
    :{
      Italian:	"Induzione lenta di Tait"	
    },
      
"Induction Fast Fennerty Gedge"	
    :{
      Italian:	"Induzione lenta di Tait"	
    },
      
"Coventry Maintenance"	
    :{
      Italian:	"Coventry Maintenance"	
    },
      
"More information"	
    :{
      Italian:	"Ulteriori informazioni"	
    },
      
"Day"	
    :{
      Italian:	"Giorno"	
    },
      
"Days"	
    :{
      Italian:	"Giorni"	
    },
      
"Indefinite"	
    :{
      Italian:	"Indefinito"	
    },
      
"New review created"	
    :{
      Italian:	"Nuovo riesame creato"	
    },
      
"Acenocoumarol"	
    :{
      Italian:	"Acenocumarolo"	
    },
      
"Apixaban"	
    :{
      Italian:	"Apixaban"	
    },
      
"Edoxaban"	
    :{
      Italian:	"Edoxaban"	
    },
      
"Dabigatran"	
    :{
      Italian:	"Dabigatran"	
    },
      
"Dalteparin (LMWH)"	
    :{
      Italian:	"Dalteparina (EBPM)"	
    },
      
"Enoxaparin (LMWH)"	
    :{
      Italian:	"Enoxaparina (EBPM)"	
    },
      
"Rivaroxaban"	
    :{
      Italian:	"Rivaroxaban"	
    },
      
"Warfarin"	
    :{
      Italian:	"Warfarin (Coumadin)"	
    },
      
"Added Diagnosis"	
    :{
      Italian:	"Diagnosi aggiunta"	
    },
      
"Edit Diagnosis"	
    :{
      Italian:	"Modificare diagnosi"	
    },
      
"Delete Diagnosis"	
    :{
      Italian:	"Eliminare la diagnosi"	
    },
      
"Edit Treatment Plan Details"	
    :{
      Italian:	"Modificare dettagli del piano di trattamento"	
    },
      
"Deactivating this patient will archive all existing treatment information and will cancel any unsaved treatment results."	
    :{
      Italian:	"Se si disattiva questo paziente tutte le informazioni esistenti in merito al trattamento verranno archiviate e i risultati del trattamento non salvati verranno eliminati."	
    },
      
"De-activating a patient should only be done if they have completed their treatment and are no longer taking anticoagulant drugs."	
    :{
      Italian:	"La disattivazione di un paziente deve essere eseguita solo se il paziente ha completato il trattamento e non sta più assumendo farmaci anticoagulanti."	
    },
      
"It should not be done if the patient is simply going to be away for a period of time (eg on holiday or admitted to hospital etc)."	
    :{
      Italian:	"Non eseguire se il paziente sarà lontano soltanto per un periodo di tempo (ad esempio, in vacanza o ricoverato in ospedale, ecc)."	
    },
      
"De-Activating a patient"	
    :{
      Italian:	"Disattivazione di un paziente"	
    },
      
"Please select the reason for deactivation"	
    :{
      Italian:	"Selezionare il motivo della disattivazione"	
    },
      
"The patient has been successfully deactivated"	
    :{
      Italian:	"Il paziente è stato correttamente disattivato"	
    },
      
"Deactivate Patient"	
    :{
      Italian:	"Disattivare paziente"	
    },
      
"Clinical Details"	
    :{
      Italian:	"Dettagli clinici"	
    },
      
"Activate Patient"	
    :{
      Italian:	"Attiva paziente"	
    },
      
"This patient has successfully been reactivated, you will now need to enter the current warfarin dose"	
    :{
      Italian:	"Questo paziente è stato riattivato correttamente. A questo punto è necessario inserire la dose di Warfarin (Coumadin)"	
    },
      
"and review period before using the system to calculate a new warfarin dose."	
    :{
      Italian:	"corrente e il periodo di riesame prima di usare il sistema per calcolare una nuova dose di Warfarin (Coumadin)."	
    },
      
"I confirm that this patient has received sufficient training and is competent to perform INR self-testing"	
    :{
      Italian:	"Confermo che questo paziente ha ricevuto una formazione sufficiente ed è in grado di eseguire il self test per INR."	
    },
      
"Please Confirm"	
    :{
      Italian:	"Confermare"	
    },
      
"Please confirm treatment date"	
    :{
      Italian:	"Confermare la data di trattamento"	
    },
      
"Please confirm that the following is correct"	
    :{
      Italian:	"Confermare che quanto segue è corretto"	
    },
      
"Please select a Suspended Until date"	
    :{
      Italian:	"Selezionare una data di sospensione fino al"	
    },
      
"Please select a Reason for suspension"	
    :{
      Italian:	"Selezionare un motivo per la sospensione"	
    },
      
"The patient has been successfully suspended"	
    :{
      Italian:	"Il paziente è stato correttamente sospeso"	
    },
      
"until"	
    :{
      Italian:	"fino a"	
    },
      
"Suspend Patient"	
    :{
      Italian:	"Sospendere il paziente"	
    },
      
"On holiday"	
    :{
      Italian:	"In vacanza"	
    },
      
"Monday"	
    :{
      Italian:	"lunedi"	
    },
      
"Tuesday"	
    :{
      Italian:	"martedì"	
    },
      
"Wednesday"	
    :{
      Italian:	"mercoledì"	
    },
      
"Thursday"	
    :{
      Italian:	"giovedì"	
    },
      
"Friday"	
    :{
      Italian:	"venerdì"	
    },
      
"Saturday"	
    :{
      Italian:	"sabato"	
    },
      
"Sunday"	
    :{
      Italian:	"domenica"	
    },
      
"The patient(s) have been successfully unsuspended."	
    :{
      Italian:	"La sospensione dei pazienti è stata annullata correttamente."	
    },
      
"The patient has been successfully unsuspended."	
    :{
      Italian:	"La sospensione del paziente è stata correttamente annullata."	
    },
      
"The patient(s) may have been treated elsewhere during the suspension period."	
    :{
      Italian:	"È possibile che i pazienti siano stati trattati altrove durante il periodo di sospensione."	
    },
      
"The patient may have been treated elsewhere during the suspension period."	
    :{
      Italian:	"È possibile che il paziente sia stato trattato altrove durante il periodo di sospensione."	
    },
      
"For warfarin patients please ensure that any recent INR results and warfarin doses are entered as historical treatments."	
    :{
      Italian:	"Per pazienti trattati con Warfarin (Coumadin) verificare che i risultati di INR recenti e le dosi di Warfarin (Coumadin) vengano inserite come trattamenti precedenti."	
    },
      
"For non-warfarin patients you should ensure review information is up to date."	
    :{
      Italian:	"Per i pazienti non trattati con Warfarin (Coumadin) è necessario assicurarsi che le informazioni del riesame siano aggiornate."	
    },
      
"Unsuspend Patients"	
    :{
      Italian:	"Annullamento sospensione pazienti"	
    },
      
"Unsuspend Patient"	
    :{
      Italian:	"Annullamento sospensione paziente"	
    },
      
"The patient(s) registered practice has been successfully changed."	
    :{
      Italian:	"Lo studio medico autorizzato del paziente è stato cambiato con successo."	
    },
      
"Please confirm to continue"	
    :{
      Italian:	"Confermare per continuare"	
    },
      
"Changed patient's registered practice"	
    :{
      Italian:	"Studio medico autorizzato del paziente cambiato"	
    },
      
"Name"	
    :{
      Italian:	"Nome"	
    },
      
"Requested change of patient's testing practice"	
    :{
      Italian:	"Richiesta di modifica dello studio medico del paziente"	
    },
      
"This patient's dosing method is currently set to Induction Fast Fennerty Gedge Protocol. Are you sure you want to transfer them?"	
    :{
      Italian:	"Questo metodo di dosaggio del paziente è attualmente impostato sul protocollo Induzione lenta di Tait. Trasferire?"	
    },
      
"Transfer patient testing location accepted"	
    :{
      Italian:	"Trasferimento della sede del test del paziente accettato"	
    },
      
"PoCT Batch Expired"	
    :{
      Italian:	"Lotto PoCT scaduto"	
    },
      
"Enter pre-treatment INR test information"	
    :{
      Italian:	"Inserire informazioni pre-trattamento del test di INR:"	
    },
      
"PoCT Batch"	
    :{
      Italian:	"Lotto PoCT"	
    },
      
"~Select PoCT Batch"	
    :{
      Italian:	"~Selezionare il lotto PoCT"	
    },
      
"~Select Method"	
    :{
      Italian:	"~Selezionare il metodo"	
    },
      
"This patient cannot be transferred because they have a pending treatment."	
    :{
      Italian:	"Questo paziente non può essere trasferito perché ha un trattamento in sospeso."	
    },
      
"Add User"	
    :{
      Italian:	"Aggiungere utente"	
    },
      
"Edit user permissions"	
    :{
      Italian:	"Modificare autorizzazioni utente"	
    },
      
"Reset Password"	
    :{
      Italian:	"Reimpostare password"	
    },
      
"Role changed from"	
    :{
      Italian:	"Ruolo modificato da"	
    },
      
"to deleted"	
    :{
      Italian:	"a eliminato"	
    },
      
"Clerical 1"	
    :{
      Italian:	"Impiegato 1"	
    },
      
"Ok"	
    :{
      Italian:	"OK"	
    },
      
"record"	
    :{
      Italian:	"cartella clinica"	
    },
      
"was updated"	
    :{
      Italian:	"è stata aggiornato"	
    },
      
"Disable User"	
    :{
      Italian:	"Disabilitare utente"	
    },
      
"to"	
    :{
      Italian:	"a"	
    },
      
"Yes"	
    :{
      Italian:	"Si"	
    },
      
"No"	
    :{
      Italian:	"No"	
    },
      
"False"	
    :{
      Italian:	"No"	
    },
      
"True"	
    :{
      Italian:	"Si"	
    },
      
"Account Enabled"	
    :{
      Italian:	"Account abilitato"	
    },
      
"changed from"	
    :{
      Italian:	"modificato da"	
    },
      
"Enable User"	
    :{
      Italian:	"Abilita utente"	
    },
      
"disabled"	
    :{
      Italian:	"disattivato"	
    },
      
"Added EQC Result"	
    :{
      Italian:	"Risultato CQE aggiunto"	
    },
      
"There are no EQCs recorded"	
    :{
      Italian:	"Nessun CQE registrato"	
    },
      
"The patient's dosing method is currently set to :"	
    :{
      Italian:	"Il metodo di dosaggio del paziente è attualmente impostato su:"	
    },
      
"Add Treatment Plan Details"	
    :{
      Italian:	"Aggiungere dettagli piano di trattamento"	
    },
      
"Close"	
    :{
      Italian:	"Chiudi"	
    },
      
"Unable to synchronize with the LumiraDX instrument"	
    :{
      Italian:	"Impossibile sincronizzarsi con lo strumento LumiraDX"	
    },
      
"Please acknowledge"	
    :{
      Italian:	"Confermare"	
    },
      
"disabled"	
    :{
      Italian:	"disattivato"	
    },
      
"This treatment plan ended on the"	
    :{
      Italian:	"Questo piano di trattamento si è concluso il"	
    },
      
"*patient(s) with incomplete treatment.*"	
    :{
      Italian:	"*pazienti con trattamento incompleto.*"	
    },
      
"The patient's next review details have been successfully updated."	
    :{
      Italian:	"I dettagli del riesame successivo del paziente sono stati aggiornati correttamente."	
    },
      
"Add New INR"	
    :{
      Italian:	"Aggiungere nuovo INR"	
    },
      
"New treatment plan will invalidate Induction protocol"	
    :{
      Italian:	"Il nuovo piano di trattamento invaliderà protocollo di induzione"	
    },
      
"Transfer patient testing location declined Acknowledged"	
    :{
      Italian:	"Trasferimento della sede del test del paziente rifiutato e confermato"	
    },
      
"This patient is currently on an Induction protocol. Creating a new treatment plan will invalidate the Induction protocol"	
    :{
      Italian:	"Questo paziente è attualmente in un protocollo di induzione. La creazione di un nuovo piano di trattamento invaliderà il protocollo di induzione"	
    },
      
"New Treatment Plan"	
    :{
      Italian:	"Nuovo piano di trattamento"	
    },
      
"Changed Next Review Date - Face-to-face."	
    :{
      Italian:	"Data di riesame successivo cambiata - Faccia a faccia."	
    },
      
"Enter new INR test information"	
    :{
      Italian:	"Inserire nuove informazioni sul test per INR"	
    },
      
"Please ensure that this patient has discontinued their existing anticoagulation medication and has an INR less or equal to 2.5 before commencing this treatment plan. Consult product literature for details."	
    :{
      Italian:	"Prima di iniziare questo piano di trattamento, accertarsi che questo paziente abbia interrotto l'assunzione del farmaco anticoagulante esistente e abbia un INR inferiore o uguale a 2,5. Per informazioni dettagliate, consultare la documentazione del prodotto."	
    },
      
"Please ensure that this patient has discontinued their existing anticoagulation medication before commencing this treatment plan. Consult product literature for details."	
    :{
      Italian:	"Prima di iniziare questo piano di trattamento, accertarsi che questo paziente abbia interrotto l'assunzione del farmaco anticoagulante esistente. Per informazioni dettagliate, consultare la documentazione del prodotto."	
    },
      
"Please ensure that this patient has discontinued their warfarin treatment and has an INR less or equal to 3.0 (stroke prevention) or 2.5(DVT/PE) before commencing this treatment plan. Consult product literature for details"	
    :{
      Italian:	"Prima di iniziare questo piano di trattamento, accertarsi che questo paziente abbia interrotto il trattamento con warfarin (Coumadin) e abbia un INR inferiore o uguale a 3,0 (prevenzione dell'ictus) o 2,5 (TVP/EP). Per informazioni dettagliate, consultare la documentazione del prodotto."	
    },
      
"Please ensure that this patient has discontinued their warfarin treatment and has an INR of less than 2.0 before commencing this treatment plan. Consult product literature for details."	
    :{
      Italian:	"Prima di iniziare questo piano di trattamento, accertarsi che questo paziente abbia interrotto il trattamento con warfarin (Coumadin) e abbia un INR inferiore a 2,0. Per informazioni dettagliate, consultare la documentazione del prodotto."	
    },
      
"Treatment Referred"	
    :{
      Italian:	"Trattamento con rinvio specialistico"	
    },
      
"Treatments from previous plan"	
    :{
      Italian:	"Trattamenti dal piano precedente"	
    },
      
"New Warfarin Treatment Plan"	
    :{
      Italian:	"Nuovo piano di trattamento del Warfarin (Coumadin)"	
    },
      
"Is this patient currently taking Warfarin?"	
    :{
      Italian:	"Questo paziente attualmente sta prendendo Warfarin (Coumadin)?"	
    },
      
"Is Treatment Plan In Use?"	
    :{
      Italian:	"Il piano di trattamento è in uso?"	
    },
      
"Are Previous Treatment Plan's Treatments Relevant?"	
    :{
      Italian:	"I trattamenti contenuti nel piano di trattamento precedente sono pertinenti?"	
    },
      
"set to"	
    :{
      Italian:	"impostata su"	
    },
      
"Appts:"	
    :{
      Italian:	"Agenda degli appuntamenti:"	
    },
      
"Select This Clinic"	
    :{
      Italian:	"Selezionare questa clinica"	
    },
      
"Make Appointment"	
    :{
      Italian:	"Prendere appuntamento"	
    },
      
"Authorisation Required"	
    :{
      Italian:	"Autorizzazione richiesta"	
    },
      
"Authorise"	
    :{
      Italian:	"Autorizzare"	
    },
      
"This patient has the following booked appointment(s):"	
    :{
      Italian:	"Questo paziente ha i seguenti appuntamenti prenotati:"	
    },
      
"at"	
    :{
      Italian:	"a"	
    },
      
"All appointments will be cancelled."	
    :{
      Italian:	"Tutti gli appuntamenti saranno annullati."	
    },
      
"INR Test"	
    :{
      Italian:	"Test per INR"	
    },
      
"Saving this treatment plan will cancel all future appointments"	
    :{
      Italian:	"Il salvataggio di questo piano di trattamento annulla tutti gli appuntamenti futuri"	
    },
      
"Booked"	
    :{
      Italian:	"Prenotati"	
    },
      
"Cancelled"	
    :{
      Italian:	"Annullato"	
    },
      
"Appointment"	
    :{
      Italian:	"Appuntamento"	
    },
      
"Status"	
    :{
      Italian:	"Stato"	
    },
      
"Add Historical Treatment"	
    :{
      Italian:	"Aggiungere trattamento precedente"	
    },
      
"Add Manual Treatment"	
    :{
      Italian:	"Aggiungere trattamento manuale"	
    },
      
"Insert Confirmation"	
    :{
      Italian:	"Inserire conferma"	
    },
      
"Comments set to"	
    :{
      Italian:	"Commenti impostata su"	
    },
      
"Treatment Deleted"	
    :{
      Italian:	"Trattamento eliminato"	
    },
      
"Adding a historical treatment to this patient will remove them from this induction protocol. The patient must be treated by manual dosing."	
    :{
      Italian:	"L'aggiunta di un trattamento precedente a questo paziente causerà la sua rimozione da questo protocollo di induzione. Il paziente deve essere trattato tramite dosaggio manuale."	
    },
      
"No Protocol"	
    :{
      Italian:	"Nessun protocollo"	
    },
      
"The patient currently has no dosing method, you will need to update their treatment plan details before you can dose the patient."	
    :{
      Italian:	"Il paziente attualmente non ha un metodo di dosaggio, sarà necessario aggiornare i dettagli del piano di trattamento prima di poter assegnare il dosaggio al paziente."	
    },
      
"You cannot add a treatment with a date that is older than the patient's latest treatment date."	
    :{
      Italian:	"Impossibile aggiungere un trattamento con una data precedente l'ultima data di trattamento del paziente."	
    },
      
"This patient already has an INR result recorded on this date. It is not possible to enter more than one INR result on the same day unless the patient is being dosed manually."	
    :{
      Italian:	"Questo paziente ha già un risultato di INR registrato in questa data. Non è possibile inserire più di un risultato di INR nello stesso giorno, a meno che al paziente non venga assegnato manualmente un dosaggio."	
    },
      
"Low INR warning: Patient may be at increased risk of thromboembolic events until INR is back in-range."	
    :{
      Italian:	"Avviso di INR basso: Il paziente può essere soggetto a un maggiore rischio di eventi tromboembolici fino a quando l'INR non ritorna nell'intervallo."	
    },
      
"Consult clinical lead for advice about the use of LMWH for very low INR if clinically appropriate."	
    :{
      Italian:	"Consultare il responsabile clinico per un consiglio sull'uso di EBPM per INR molto basso, se appropriato dal punto di vista clinico."	
    },
      
"set at"	
    :{
      Italian:	"impostato a"	
    },
      
"Please confirm you want to delete the treatment added on the"	
    :{
      Italian:	"Confermare che si desidera eliminare il trattamento aggiunto il"	
    },
      
"INRstar cannot provide a dosing schedule for this dose using the selected tablet strengths, please choose an alternative schedule."	
    :{
      Italian:	"INRstar non può fornire un programma di dosaggio per questa dose utilizzando i dosaggi selezionati delle compresse, scegliere un programma alternativo."	
    },
      
"Dose Change"	
    :{
      Italian:	"Modifica della dose"	
    },
      
"Treatment Authorised"	
    :{
      Italian:	"Trattamento autorizzato"	
    },
      
"The patient is less than 12 years old; this patient can only be manually dosed"	
    :{
      Italian:	"Il paziente ha meno di 12 anni; a questo paziente può essere assegnata la dose solo manualmente"	
    },
      
"To use this algorithm safely patients should be established on warfarin and have an interval between the last 2 INR tests of at least 7 days. This patient does not currently meet this criterion."	
    :{
      Italian:	"Per utilizzare questo algoritmo in modo sicuro i pazienti devono essere sottoposti a Warfarin (Coumadin) e l'intervallo tra gli ultimi 2 test per INR deve essere di almeno 7 giorni. Al momento questo paziente non soddisfa questo criterio."	
    },
      
"This patient has recently started warfarin. Please confirm that they are appropriately stable for a maintenance algorithm"	
    :{
      Italian:	"Questo paziente ha recentemente iniziato ad assumere Warfarin (Coumadin). Confermare che sia adeguatamente stabile per un algoritmo di mantenimento"	
    },
      
"Dose change from 2.5mg/day to 10.0mg/day is greater than 20%. Please confirm that the new dose is appropriate."	
    :{
      Italian:	"La modifica della dose da 2,5mg/giorno a 10,0mg/giorno è maggiore del 20%. Confermare che la nuova dose è adeguata."	
    },
      
"The patients may have been treated elsewhere during the suspension period. For Vitamin K Antagonist patients please ensure that any recent INR results and Vitamin K Antagonist doses are entered as historical treatments. For non-Vitamin K Antagonist patients you should ensure review information is up to date."	
    :{
      Italian:	"È possibile che i pazienti siano stati trattati altrove durante il periodo di sospensione. Per pazienti trattati con Antagonisti della Vitamina K (AVK) assicurarsi che i risultati di INR recenti e le dosi degli Antagonisti della Vitamina K (AVK) vengano inseriti come trattamenti precedenti. Per i pazienti trattati con Anticoagulanti Non Antagonisti della Vitamina K è necessario assicurarsi che le informazioni del riesame siano aggiornate."	
    },
      
"Male"	
    :{
      Italian:	"Maschio"	
    },
      
"Female"	
    :{
      Italian:	"Femmina"	
    },
      
"The patient's last treatment was more than"	
    :{
      Italian:	"L'ultimo trattamento del paziente ha avuto luogo più di"	
    },
      
"days ago"	
    :{
      Italian:	"giorni fa"	
    },
      
"please ensure that the dose and review period are still current and accurate"	
    :{
      Italian:	"accertarsi che la dose e il periodo di riesame siano ancora correnti e accurati"	
    },
      
"mg/day"	
    :{
      Italian:	"mg/giorni"	
    },
      
"END USER PROGRAM LICENCE AGREEMENT"	
    :{
      Italian:	"Accordo di licenza per programma con l’utente finale"	
    },
      
"This patient transfer cannot be accepted because they have a pending treatment."	
    :{
      Italian:	"Questo trasferimento del paziente non può essere accettato perché il paziente ha un trattamento in sospeso."	
    },
      
"Please contact their current testing location."	
    :{
      Italian:	"Contattare la sede del test corrente."	
    },
      
"Comments changed from"	
    :{
      Italian:	"Commenti modificato da"	
    },
      
"No patients found"	
    :{
      Italian:	"Nessun paziente trovato"	
    },
      
"Treatment record was updated."	
    :{
      Italian:	"Treatment cartella clinica è stata aggiornato."	
    },
      
"Duplicate"	
    :{
      Italian:	"Duplicato"	
    },
      
"Discard"	
    :{
      Italian:	"Rimuovi"	
    },
      
"Archive Reason"	
    :{
      Italian:	"Motivo dell'archiviazione"	
    },
      
"This INR test was not performed today"	
    :{
      Italian:	"Questo test per INR non è stato eseguito oggi"	
    },
      
"Enter as historical treatment"	
    :{
      Italian:	"Inserire come trattamento precedente"	
    },
      
"Enter as valid INR result"	
    :{
      Italian:	"Inserire come risultato di INR valido"	
    },
      
"Find Patient"	
    :{
      Italian:	"Cerca paziente"	
    },
      
"Dose Patient"	
    :{
      Italian:	"Assegna dose"	
    },
      
"Archive"	
    :{
      Italian:	"Archiviazione"	
    },
      
"Error: Currently unable to dose patient"	
    :{
      Italian:	"Errore: Al momento non è possibile assegnare la dose del paziente"	
    },
      
"None"	
    :{
      Italian:	"Nessuno",
    },
      
"No patient found"	
    :{
      Italian:	"Nessun paziente trovato"	
    },
    
"There are no new results"	
    :{
      Italian:	"Nessun nuovo risultato"	
    }
             
// ^^^ Insert translations above this line ^^^    
  }
  
  if (translation_dictionary[string] == null)
  {
      Log.Message("Unable to Translate: " + string + " there is no entry in the translation file for it");
      string = "Untranslated_" + string;
  }
  else
  {
      var translations = translation_dictionary[string];
    
      if (translations[language] == null)
      {
          Log.Message("Unable to Translate: " + string + " although the string exists in the translations file - there is no " + language + " translation for it");
          string = "Untranslated_" + string;
      }
      else
      {
          string = translations[language];
      }
  }
  }
  return string
}