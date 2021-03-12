//USEUNIT Misc_Functions

//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                           INRstarAPI Misc Functions                             //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
function patient_orchestrater()
{
  reset_folder();
  add_a_patient_under_the_hood();
}

//-----------------------------------------------------------------------------------
function test_logging_inHere()
{
  login_under_the_hood("5");
  
}
//-----------------------------------------------------------------------------------
function login_under_the_hood(login_user_number)
{
  //Initialise variables
  var login_parameter = "";
  var login_details = new Array();
  var headers = new Object();
  
  //Get login parameter
  if (language == "Italian") {login_parameter = "Accedi";}
  else {login_parameter = "Log In";}
  
  //Get username & password from 
  login_details = get_login_details();

  //Get test URL store it as address
  var base_url = INRstar_base().URL;
  var address = base_url + "Security/Authentication/Logon"
  var host = base_url.replace(/(^\w+:|^)\/\//, '').slice(0, -1)
  
  //Add Headers
  headers["Connection"] = "keep-alive";
  headers["Host"] = host; 
  headers["User-Agent"] = "TestComplete"; 
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  
  //Get Initial token and session Id
  var response = api_get_login_tokens_and_session_id(address, headers);
      
  //Add the cookies to the request header to include both the decoded request_verification_token and the session_id
  headers["Cookie"] = "__RequestVerificationToken_Lw__=" + response.request_verification_token + ";" + "ASP.NET_SessionId=" + response.session_id + ";" + "LatestVersion=False";   
  
  var requestBody = 
    "username=" + encodeURIComponent('cl3@regression') + 
    "&password=" + encodeURIComponent(login_details[20]) + 
    "&Log_In=" + encodeURIComponent(login_parameter) + 
    "&__RequestVerificationToken=" + encodeURIComponent(response.request_verification_token);

  //Login Proper
  api_post(address, headers, requestBody);
  
  return headers.Cookie
}
//-----------------------------------------------------------------------------------
function add_a_patient_under_the_hood()
{
  try
  {
    var test_title = "add_a_patient_under_the_hood"
    
    //Setup test scenario
//    login(7, "Shared");
//    var location_id = get_organization_id_from_current_location();   
//    Goto_Patient_Search();
//    var patient = patient_generator();
//    var patient_insertion_parameters = patient_parameters(patient); 
//    var inserted_patient = insert_patient(patient_insertion_parameters);

    //Log_Off(); 
  }
  catch(e)
  {
    Log.Warning("Test \"" + test_title + "\" FAILED Exception Occured = " + e);
    var suite_name = "add_a_patient_under_the_hood";
    var test_name = "add_a_patient_under_the_hood";
    handle_failed_tests(suite_name, test_name); 
  } 
}
//-----------------------------------------------------------------------------------
function insert_patient(parameters)
{
//  //Get Token
//  var token = get_token_for_patient_insert();
//  
//  //Obtain URL
//  var address = get_csp_url_from_the_inrstar_url() + "/externalresults/observation";
//  
//  //Create the Headers into an object
//  var headers = new Object();
//  headers["Content-Type"] = "application/json";
//  headers["Accepts"] = "application/json";
//  headers["api-version"] = "2.1";
//  headers["Authorization"] = "Bearer " + token; 
//
//  //Call upon api_post() to send the request
//  //api_post(address, headers, body_payload)
}
//-----------------------------------------------------------------------------------
function get_token_for_patient_insert()
{
  //Obtain URL
  //var address = something "/Patient/New";
  
  //Create the Headers into an object
  var headers = new Object();
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  headers["X-Requested-With"] = "XMLHttpRequest";
  headers["Upgrade-Insecure-Requests"] = "1";
  headers["Accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9";
  headers["Origin"] = address;
  headers["Host"] = "inrstar-uk-test1.caresolutions.lumiradx.com";
  headers["Dxscript"] = "1_142,1_80,1_135,1_131,1_90,1_84,1_82,8_11,8_18,8_25,8_27,8_10,8_13,8_14,8_19,14_23,14_18,8_22,1_91,1_98,1_92,1_77,1_128,1_126,8_24,8_23,8_17,8_20,1_133,1_119,1_127,8_21,1_104,8_15,1_94,1_100,8_16,1_105,1_103,1_97,8_26,8_12"

  //Perform the api request record the response
  var response = String(api_get(address, headers));
  Log.Message(response);
  
  //Extract the request_verification_token from the response
  var request_verification_token = response.match(/name=\"__RequestVerificationToken\" type=\"hidden\" value="([^\"]*)"/);    
  Log.Message(request_verification_token[1]);
  
  //Extract the new_patient_token_id from the response
  var new_patient_token_id = response.match(/name="Id" type="hidden" value="([^\"]*)"/);    
  Log.Message(new_patient_token_id);
    
  return 
}
//-----------------------------------------------------------------------------------
function patient_parameters(patient_details, token_id) 
{ 
  //Initialise a blank payload
  var payload = new Object();

  //Populate payload parameters
  payload.Email = patient_details.email;
  payload.FirstName = patient_details.firstname;
  payload.Surname = patient_details.surname;
  payload.Sex = patient_details.sex;
  payload.Title = patient_details.title;
  payload.Gender = patient_details.gender;
  payload.Mobile = "01884840504";
  payload.Born = patient_details.born;
  payload.Phone = "01884840504";
  payload.FirstAddressLine = patient_details.firstaddressline;
  payload.SecondAddressLine = patient_details.secondaddressline;
  payload.ThirdAddressLine = patient_details.thirdaddressline;
  payload.FourthAddressLine = patient_details.fourthaddressline;
  payload.PhoneOther = "01884840504";
  payload.PostCode = patient_details.postcode;
  payload.PatientNumber = patient_details.patient_number;
  payload.ScslHealthDbId = "";

//  Log.Message("Payload created as: " + payload.FirstName);
//  Log.Message("Payload created as: " + payload.Surname);
//  Log.Message("Payload created as: " + payload.Sex);
//  Log.Message("Payload created as: " + payload.Title);
//  Log.Message("Payload created as: " + payload.Gender);
//  Log.Message("Payload created as: " + payload.Mobile);
//  Log.Message("Payload created as: " + payload.Born);
//  Log.Message("Payload created as: " + payload.Phone);
//  Log.Message("Payload created as: " + payload.FirstAddressLine);
//  Log.Message("Payload created as: " + payload.SecondAddressLine);
//  Log.Message("Payload created as: " + payload.ThirdAddressLine);
//  Log.Message("Payload created as: " + payload.FourthAddressLine);
//  Log.Message("Payload created as: " + payload.PhoneOther);
//  Log.Message("Payload created as: " + payload.PostCode);
//  Log.Message("Payload created as: " + payload.PatientNumber);
//  Log.Message("Payload created as: " + payload.ScslHealthDbId);
//    
  //Return the payload so it can be posted elsewhere
  return payload
}
//-----------------------------------------------------------------------------------

function patient_generator()
{
    //Create an object to store all patient data
    var patient_data = new Object();
   
    //Name and address generator
    patient_data.firstname = random_word_generator();
    patient_data.surname = random_word_generator();
    patient_data.firstaddressline = random_word_generator() + " House";
    patient_data.secondaddressline = random_word_generator() + " Street";
    patient_data.thirdaddressline = random_word_generator();
    patient_data.fourthaddressline = random_word_generator() + " Town";
    patient_data.fifthaddressline = random_word_generator() + " City";
    patient_data.postcode = "TR11 4HL";                                    
    patient_data.email = "automation" + patient_data.surname + "@fakemail.com"
    
    //Title generator
    var array_of_titles = ["Mr","Mrs","Ms","Miss","Dr","Prof"]
    patient_data.title = array_of_titles[Math.floor(Math.random()*array_of_titles.length)]
    
    //Italian overides - Changes required to make data fit the Italian model 
    if (language == "Italian" || language == "italian")
    {
      patient_data.postcode = "60030";  
      var array_of_titles = ["Sig","Sig.ra","Dr","Prof"]
      patient_data.title = array_of_titles[Math.floor(Math.random()*array_of_titles.length)]
    }
    
    //DOB generator between 1940 and 2004
    patient_data.day_of_birth = Math.floor(Math.random() * 28) + 11;
    patient_data.month_of_birth = ("0" + Math.floor(Math.random() * (12 - 01 + 1) + 01)).slice(-2);
    patient_data.year_of_birth =  Math.floor(Math.random() * (2004 - 1940 + 1) + 1940); 
    patient_data.shortmonth = set_month(patient_data.month_of_birth);
    patient_data.dob = patient_data.year_of_birth + "/" + patient_data.month_of_birth + "/" + patient_data.day_of_birth;
    patient_data.born = patient_data.day_of_birth + "/" + patient_data.shortmonth + "/" + patient_data.year_of_birth;
    
    //Sex & Gender generator 
    var array_of_genders = ["Male","Female"]
    patient_data.gender = array_of_genders[Math.floor(Math.random()*2)]
    patient_data.sex = patient_data.gender;
    
    //Patient Number generator
    patient_data.patient_number = Math.floor(Date.now() / 100);
    
    //Spit out the variables
    Log.message("Patient Number: " + patient_data.patient_number);
    Log.message("Sex: " + patient_data.sex);
    Log.message("Gender: " + patient_data.gender);
    Log.message("Title: " + patient_data.title);
    Log.Message("Numeric_Month_of_birth: " + patient_data.month_of_birth);
    Log.message("DOB_Shortmonth: " + patient_data.shortmonth);
    Log.message("DOB: " + patient_data.dob);
    Log.message("Firstname " + patient_data.firstname);
    Log.message("Surname " + patient_data.surname);
    Log.message("firstaddressline " + patient_data.firstaddressline);
    Log.message("secondaddressline " + patient_data.secondaddressline);
    Log.message("third=addressline " + patient_data.thirdaddressline);
    Log.message("fourthaddressline " + patient_data.fourthaddressline);
    Log.message("fifthaddressline: " + patient_data.fifthaddressline);
    Log.message("postcode: " + patient_data.postcode);

    return patient_data
}
//-----------------------------------------------------------------------------------
function random_word_generator()
{
  var myArray = ["marmite","unwinsome","spaak","nahuatl","triclinium","unminuted","conroy","ungabled","timid","photospectroscopy",
  "myrmecophily","overbragged","nonsensual","mosquitofish","punning","unconspired","lace","nanner","asynjur","preconspiring","wasper",
  "sextus","feasance","untroubled","subalimentation","eskar","neisseria","nonabsorption","lequear","braccio","quickhatch","reindictment",
  "retrying","copolymerization","schemata","woodpecker","genip","gance","resterilize","thornhead","considered","dejected","ballocks",
  "predeparture","vibraharp","engel","sholom","heteropterous","ereuthalion","resupplied","tergite","microbacterium","existentially",
  "bucuresti","untrustworthy","vigorousness","ibada","untabulable","woodcutter","hallah","humboldtianum","aeolipyle","unbelligerent",
  "lastex","revisit","uncatered","diapaused","hulloaing","retrogression","pseudosemantic","hesitance","delphinia","chicory","whatnot",
  "broadwife","muskrat","misarrangement","uncially","preacher","sanctuaried","redleg","delightsomeness","jugglingly","melchite",
  "overdramatized","overweigh","stapher","retouchtracing","hyetograph","defined","postnodal","clistocarp","familyish","quadrifid","ingweonic",
  "tortoise","paralyze","vintage","outglitter","unintegrable","outroguing","keene","azbine","perversity","override","chrysolite",
  "nonmaterialistically","systematic","trichome","signory","collier","biguanide","battels","proprietorial","felicitation","spumone",
  "trifurcated","subcommendatory","cocainised","gamins","flippantly","predict","respirational","noncommunicative","detestably",
  "pretaught","metaphor","jugoslavian","moses","nonideologic","megalopia","sconcheon","evan","horoscopy","nuttiest","macrostylous","timbre",
  "vaporise","carver","obstreperousness","america","allodium","cellulation","withdrawingness","unoverlooked","manometric","scrapper",
  "singularizing","habile","caudation","adulate","jailbait","tommy","preverification","headliner","intermarginal","unpunctuated",
  "fourposter","tomonaga","winger","erysichthon","pietermaritzburg","scotti","maslin","unspringing","kateri","mulberry","tapestrying",
  "glycol","subfactory","unsaponifiable","acarnan","forestall","compositeness","wagram","chorzw","teuthis","nymphomania","terrene",
  "nasopharyngeal","prayingly","brachium","preoceanic","intermittently","flaming","pedantesque","defeatism","outthieve","unserrate",
  "riboflavine","umtali","allopatric","overgrazing","archetype","ciliate","conical","underisory","bedrench","reemergence","picked",
  "gelatinising","bolometer","improbableness","hacienda","pronavy","surfboarder","maureen","prerelated","submanor","vagotropic","opiated",
  "macropsia","regimentals","enculturating","inscape","blastomycosis","pantropically","semasiologist","explicit","bottineau","toastiest",
  "agnation","endophytous","puzzolan","renovate","lambent","citronellal","benzaldehyde","underbottom","stubbed","cargo","auroral","cricketer",
  "supercynical","nanometer","remediated","menuki","lychnoscope","margherita","megarus","preadmired","corned","dictatorial","charley","grace",
  "alghero","subangular","phosphor","balanchine","pascagoula","slimline","bueno","attend","fatherlike","autoeciousness","corposant","actionably",
  "wingedness","supernaturally","leeboard","boswellize","collied","gooseneck","aryanizing","dubitation","assigned","arterialise","tamping",
  "seriocomical","unknighted","abnormalising","ethylene","moralism","centralia","caecally","cloke","festa","lawbreaking","sulphurous","mimer",
  "vaccinator","mudsucker","roomier","snefru","burly","petechiae","fps","moneylender","sox","gummosis","sanitizer","antimedicative",
  "centennially","pupilage","bhutto","lawton","psychobiology","hymettius","icehouses","apologised","hoyle","raider","locoism","quirites",
  "ghetto","epical","fanaticized","counsellor","arrogated","intertraffic","candelabra","selectance","shikari","overphilosophized","enteralgia",
  "stromboli","verboten","parthia","hegeleos","nonglutenous","overgesticulative","nebulizing","bornholm","amusedly","creosotic","conjured",
  "caesaropapist","unconical","electrojet","untractability","surroundings","amerigo","iphitus","robert","axiology","altgeld","expodite","barometrograph",
  "unforegone","rout","athenaeum","airwomen","oceanica","interpaving","perfectionism","liberalness","restrict","undergone","symbolical","unquizzed",
  "nonolfactory","countrified","unruddled","antifoggant","preimpress","esterhazy","acromegaly","sacellum","indefiniteness","hayward","castellation",
  "endosporous","pale","harquebus","unconstructive","overcomer","superannuation","bluetit","abbey","kalis","nonprecious","beg","guarded","labilization",
  "enology","marth","turk","telchines","foetus","nonmutational","dogfish","regardable","advisability","quotable","multispermous","unanswerably",
  "jauntier","ironing","entomophily","unfretful","pinky","ordinal","commence","insight","bugloss","nonephemeral","uniformness","manumitted",
  "repurchase","airlight","hillo","alexa","kathodic","coldness","maelstrom","momentary","puerpera","save","rotatively","rubefaction","frobisher",
  "unpaired","terminableness","pretimely","jiber","dyspeptical","rgenotherapy","lounger","sapient","autodidact","auriculated","raster","touristry",
  "artiest","destalinize","reindex","darken","parlormaid","awakeningly","authoritatively","foreshadow","serialised","compellable","lister",
  "sanctification","ladderless","pontlevis","williamsburg","hypermoral","noncitation","calx","atmidometer","preentry","choriamb","phonology",
  "mittimus","ungeared","encapsulate","steinbok","clianthus","dropwort","synovitis","limmasol","brickyard","tsiranana","slickpaper","semipaganish",
  "raptus","unadjudicated","unelastically","poison","argentinean","supercynical","liang","nonvibratory","arsis","turmoil","alemannic","kopeck",
  "unpunctuality","chronobiology","snarly","deoxidising","candula","canonising","chirring","bicyclical","leonie","laboratory","eastman","paracelsist",
  "postdiagnostic","mzungu","flowering","breda","biscay","haulback","aporias","dempster","autoplast","vined","skelmersdale","supposititious","sinon",
  "nagor","eggleston","ferrite","spunger","serge","pisciculturist","curatrix","uninherited","quakiest","unsmooth","exaggerating","amnestied","nonstoical",
  "nonadventitious","levitically","examinable","grizzle","undelusive","guildford","housebreak","sermonised","nongravitational","denier","cypriote",
  "metallised","cryoscope","stripteaser","streps","ependymal","antiproductivity","infeudation","havers","edibles","protectorship","preimbibing",
  "multiplex","distressful","fortitude","flavoury","preevade","danilo","frenchwomen","axilemmata","unhesitatingly","duplicable","tabularized",
  "iatrochemical","holoplankton","uninfusive","endrin","acculturize","imprinting","complainant","physiatric","duping","unscholarlike","ginger"];
  
  // String Jumblifier
  var firststring = myArray[Math.floor(Math.random()*myArray.length)].substr(0, 3);
  var secondstring = myArray[Math.floor(Math.random()*myArray.length)].substr(0, 3);
  var thirdstring = myArray[Math.floor(Math.random()*myArray.length)];
  var randomword = thirdstring+firststring+secondstring;
  var randomwordCapitalized = randomword.charAt(0).toUpperCase() + randomword.slice(1)

return randomwordCapitalized
}