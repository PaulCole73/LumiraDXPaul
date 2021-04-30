//USEUNIT Misc_Functions
//USEUNIT Get_Functions
//USEUNIT INRstar_Get_Cookies_via_Powershell
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                      INRstar Patient Insert Under the hood                      //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
function login_under_the_hood(login_user_number)
{
  //Initialise variables
  var login_parameter,hostname;
  var login_details = new Array();
  var headers = new Object();
  
  //Get login parameter
  if (language == "Italian") {login_parameter = "Accedi";}
  else {login_parameter = "Log+In";}
  
  //Get username & password from 
  login_details = get_login_details();
}
//-----------------------------------------------------------------------------------
function add_a_patient_under_the_hood()
{
  try
  {
    var test_title = "add_a_patient_under_the_hood"
    
    //Setup test scenario
    var cookie_jar = get_cookies_for_under_the_hood()
    var patient = insert_patient(cookie_jar); 

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
function insert_patient(cookie_jar)
{
  //Generate URL
  var hostname = get_hostname();
  
  //Make under the hood call in order to Grab patient insertion id and cookie
  var other_cookie_jar = get_token_for_patient_insert(hostname, cookie_jar);
  
  //Generate Patient
  var patient = patient_generator(other_cookie_jar); 
  
  //Convert patient object into requestBody format
  var requestBody = "";
  for (var item in patient) {
      if (patient.hasOwnProperty(item)) {
          requestBody += encodeURIComponent(item) + '=' + encodeURIComponent(patient[item]) + '&';
      }}
  requestBody = requestBody.slice(0, -1); //Remove Last char 

  //Add Headers
  var headers = new Object();
  headers["Host"] = hostname;
  headers["User-Agent"] = "TestComplete"; 
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  headers["Cookie"] = cookie_jar;
  headers["Content-Length"] = parseInt(requestBody.length);
  
  var address = "https://" + hostname + "/Patient/Insert";
  var response = String(api_post(address, headers, requestBody));
  
  return patient
}
//-----------------------------------------------------------------------------------
function get_token_for_patient_insert(hostname, cookie_jar)
{
  var address = "https://" + hostname + "/Patient/New";
  var headers = new Object();
  var other_cookie_jar = new Object();
    
  //Add Headers
  headers["Connection"] = "keep-alive";
  headers["Host"] = hostname;
  headers["User-Agent"] = "TestComplete"; 
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  headers["Accept"] = "*/*";
  headers["Cookie"] = cookie_jar;
  
  var response = String(api_get(address, headers));
  
  var new_patient_token_ID = response.match(/name="Id" type="hidden" value="([^"]*)/)[1];
  var __RequestVerificationToken = response.match(/name="__RequestVerificationToken" type="hidden" value="([^"]*)/)[1];

  other_cookie_jar["new_patient_token_ID"]=new_patient_token_ID;
  other_cookie_jar["__RequestVerificationToken"]=__RequestVerificationToken;

  return other_cookie_jar
}

//-----------------------------------------------------------------------------------
function patient_parameters(patient_details, other_cookie_jar) 
{ 
  //Initialise a blank payload
  var payload = new Object();

  //Populate payload parameters
  payload.externalResultId = "";
  payload.email = patient_details.email;
  payload.firstName = patient_details.firstname;
  payload.surname = patient_details.surname;
  payload.sex = patient_details.sex;
  payload.title = patient_details.title;
  payload.gender = patient_details.gender;
  payload.mobile = "01884840504";
  payload.born = patient_details.born;
  payload.Phone = "01884840504";
  payload.firstAddressLine = patient_details.firstaddressline;
  payload.secondAddressLine = patient_details.secondaddressline;
  payload.thirdAddressLine = patient_details.thirdaddressline;
  payload.fourthAddressLine = patient_details.fourthaddressline;
  payload.fifthAddressLine = patient_details.fifthaddressline;
  payload.phoneOther = "01884840504";
  payload.postCode = patient_details.postcode;
  payload.patientNumber = patient_details.patient_number;
  payload.ScslHealthDbId = "";
  payload.id = other_cookie_jar.new_patient_token_ID;
  payload.__RequestVerificationToken = other_cookie_jar.__RequestVerificationToken;

  //Return the payload so it can be posted elsewhere
  return payload
}
//-----------------------------------------------------------------------------------

function patient_generator(other_cookie_jar)
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
    patient_data.day_of_birth = Math.floor(Math.random() * (28 - 1 + 1) + 1);
    patient_data.month_of_birth = ("0" + Math.floor(Math.random() * (12 - 01 + 1) + 01)).slice(-2);
    patient_data.year_of_birth =  Math.floor(Math.random() * (2004 - 1940 + 1) + 1940); 
    patient_data.shortmonth = set_month(patient_data.month_of_birth);
    patient_data.dob = patient_data.year_of_birth + "/" + patient_data.month_of_birth + "/" + patient_data.day_of_birth;
    patient_data.born = patient_data.day_of_birth + "-" + patient_data.shortmonth + "-" + patient_data.year_of_birth;
    
    //Sex & Gender generator 
    var array_of_genders = ["Male","Female"]
    patient_data.gender = array_of_genders[Math.floor(Math.random()*2)]
    patient_data.sex = patient_data.gender;
    
    //Patient Number generator
    patient_data.patientnumber = Math.floor(Date.now() / 100);
    
    //Patient Insert Parameters
    patient_data.externalResultId = "";
    patient_data.id = other_cookie_jar.new_patient_token_ID;
    patient_data.__RequestVerificationToken = other_cookie_jar.__RequestVerificationToken;

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