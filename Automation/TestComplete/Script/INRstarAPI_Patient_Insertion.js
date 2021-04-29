//USEUNIT Misc_Functions
//USEUNIT INRstar_Get_Cookies_via_Powershell

//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------//
//                      INRstar Patient Insert Under the hood                      //
//---------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
function test_logging_in_Here()
{
  //A quick temporary way of testing the logging in process
  var cookie_jar = login_under_the_hood("5");
}
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

  //Get test URL store it as base_url - also create host from this
  var base_url = INRstar_base().URL; 
  if (base_url.indexOf("//") > -1) 
    {hostname = base_url.split('/')[2];}
  else 
    {hostname = base_url.split('/')[0];}

  var url = "https://" + hostname + "/Security/Authentication/Logon";
  
  //Add Headers
  headers["Connection"] = "keep-alive";
  headers["Host"] = hostname;
  headers["User-Agent"] = "TestComplete"; 
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  headers["Referer"] = url;
  
  
  //Get Initial token and session Id & add it to the cookie/token object jar
  var cookie_jar = api_get_login_tokens_and_session_id(url, headers);
  
  //Using response from initial get - create the encoded requestbody 
  var requestBody = 
    "__RequestVerificationToken=" + encodeURIComponent(cookie_jar.request_verification_token) +
    "&Username=" + encodeURIComponent(login_details[5]) + 
    "&Password=" + encodeURIComponent(login_details[20]) + 
    "&Log_In=" + encodeURIComponent(login_parameter);

  //Add cookies to the request header to include both the decoded request_verification_token and the session_id + Content-Length
  headers["Cookie"] = "__RequestVerificationToken_Lw__=" + cookie_jar.request_verification_token + ";" + "ASP.NET_SessionId=" + cookie_jar.session_id;   
  headers["Content-Length"] = parseInt(requestBody.length);
  
  //Login Proper
  var post_response = api_post(url, headers, requestBody);
  
  //Extract headers from response
  var response_headers = post_response.AllHeaders; 
   
  //Extrat INRstarN3 token from response & add it to the cookie/token object jar
  cookie_jar.INRstarN3 = response_headers.match(/INRstarN3=([^;]*)/); 
  
  Log.Message("Cookie                    : " + headers.Cookie);
  Log.Message("Response Data Headers     : " + response_headers);    
  Log.Message("Session ID                : " + cookie_jar.session_id) 
  Log.Message("Request Verification Token: " + cookie_jar.request_verification_token)   
  Log.Message("INRstarN3 Token           : " + cookie_jar.INRstarN3)  
    
  return cookie_jar
}
//-----------------------------------------------------------------------------------
function add_a_patient_under_the_hood()
{
  try
  {
    var test_title = "add_a_patient_under_the_hood"
    
    //Setup test scenario
    //var cookie_jar = get_cookies_for_under_the_hood();
    var cookie_jar = get_cookies_for_under_the_hood()
    var patient = patient_generator(); 
    var inserted_patient = insert_patient(patient, cookie_jar);

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
function get_hostname()
{
  var base_url = INRstar_base().URL; 
  var hostname;
  if (base_url.indexOf("//") > -1) 
    {hostname = base_url.split('/')[2];}
  else 
    {hostname = base_url.split('/')[0];}
    
  return hostname
}
//-----------------------------------------------------------------------------------
function insert_patient(patient, cookie_jar)
{
  var hostname = get_hostname();
  var address = "https://" + hostname + "/Patient/Insert";
  var other_cookie_jar = get_token_for_patient_insert(hostname, cookie_jar);
  var patient_insertion_parameters = patient_parameters(patient, other_cookie_jar);
  
  //Convert object to requestBody

  var requestBody = "Id="+ encodeURIComponent(other_cookie_jar.new_patient_token_ID) +"&externalResultId=&Email=Overphilortysophized.Yodh%40fakemail.com&FirstName=Overphilortysophized&Sex=Male&Title=Mr&Gender=Male&Mobile=01888288322&NHSNumber=&Born=16-apr-1928&Phone=01884840504&FirstAddressLine=Dysacousma+House&SecondAddressLine=Brainlessly+Street&FourthAddressLine=JmeterLand&ThirdAddressLine=JmeterLand&FifthAddressLine=Cecity+City&PhoneOther=01883382999&PostCode=TR11+4HL&PatientNumber=1619765420250&ScslHealthDbId=&Surname=Yodh&__ASP.NET_SessionId=Not+Found&__RequestVerificationToken="+encodeURIComponent(other_cookie_jar.__RequestVerificationToken)
  var headers = new Object();
  
  //Add Headers
  headers["Connection"] = "keep-alive";
  headers["Host"] = hostname;
  headers["User-Agent"] = "TestComplete"; 
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  headers["Accept"] = "*/*";
  headers["Cookie"] = cookie_jar;
  headers["Content-Length"] = parseInt(requestBody.length);
  
  var response = String(api_post(address, headers, requestBody));
  
  Log.Message(response)
  return 
}
//-----------------------------------------------------------------------------------
function dothisF()
{
  var cookie_jar = "ASP.NET_SessionId=idt0ek4pwbcw3o4nz2m4eqjs;__RequestVerificationToken_Lw__=IyjSvAR2jF3uAHtYLFCh5NOmM4erq30guM6Qum8WfBtHsnhD0uaNqFA28Q3h+8VrD9/JzjhWvlF3mvkMCT90xPNz2hQBWeLa6/a+fBtMhIZzxfFsLxWT+pRFsGkQjlUX2L8+6BBpl+o5PDFuirBPh6m4Qxo=;LatestVersion=False;INRstarN3=A39BA8CA5EAAE1CCBF511E8B2A91CC8DEB00401A9AAB17692A4214320D3146C6A685875C36B46D783C0B16B8D0EB93E31C6DC9F76C9996F2D136187165E737B560113E2B8FC139917E6451D91A48D1F50CA3F3E2741977551D025C091AE39519DCB8862E2E054857265F00A29C02920F11783155179F1A7F6ABEACAAD27202F71695230FC98BF4240027351B1614A50656787F73BB19F8E10BA259C8326CEE9D207BF676C448BA1BEA33BCC34079FCD1B107FC906378EE1E452AD4C74B069899BEA3B77FA1A1E36DCD5E30C47E2389D968BB84F16F7633B35CDFBA42583ACF9B22E0EEA418B86E33CE214AABA4DCEF2BD52B59E9831732462D09C51B6F1B08507A46DE2FD697F347E1A456CE4CF6E2F664EE55430ABF661EFE91AE5342B65437E9D020B5750AD047A4675A05C2310C1BBD4676DA9DD73F48A798A7963ECC79B79B5FC24FC6E4316E08381253DAA32DA6E4405CE37C8EA3F4D89E41260EE42DB9F75169E547DFB6B7658B9CCDFBE67ECEB6F7BF3DA69274CE750C525661E9C08C86C7F2E2A023B2A0A07F9A7DA7EEB4F139E2ED6995578FBF52424F7D3725D5199E4ABBA5B3008A69961AA950CCD96D7FA26A2D66A2B59CE5D8299817E9EAC93F82D050DE"
  insert_patient('', cookie_jar)
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
  
  var new_patient_token_ID = response.match(/name="Id" type="hidden" value="([^"]*)"/)[1];
  var __RequestVerificationToken = response.match(/name="__RequestVerificationToken" type="hidden" value="([^"]*)"/)[1];

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
  payload.externalResultId = encodeURIComponent("");
  payload.Email = encodeURIComponent(patient_details.email);
  payload.FirstName = encodeURIComponent(patient_details.firstname);
  payload.Surname = encodeURIComponent(patient_details.surname);
  payload.Sex = encodeURIComponent(patient_details.sex);
  payload.Title = encodeURIComponent(patient_details.title);
  payload.Gender = encodeURIComponent(patient_details.gender);
  payload.Mobile = encodeURIComponent("01884840504");
  payload.Born = encodeURIComponent(patient_details.born);
  payload.Phone = encodeURIComponent("01884840504");
  payload.FirstAddressLine = encodeURIComponent(patient_details.firstaddressline);
  payload.SecondAddressLine = encodeURIComponent(patient_details.secondaddressline);
  payload.ThirdAddressLine = encodeURIComponent(patient_details.thirdaddressline);
  payload.FourthAddressLine = encodeURIComponent(patient_details.fourthaddressline);
  payload.PhoneOther = encodeURIComponent("01884840504");
  payload.PostCode = encodeURIComponent(patient_details.postcode);
  payload.PatientNumber = encodeURIComponent(patient_details.patient_number);
  payload.ScslHealthDbId = encodeURIComponent("");
  payload.Id = encodeURIComponent(other_cookie_jar.new_patient_token_ID);
  payload.__RequestVerificationToken = encodeURIComponent(other_cookie_jar.__RequestVerificationToken);
  
  Log.Message("externalResultId created as: " + payload.externalResultId);
  Log.Message("FirstName created as: " + payload.FirstName);
  Log.Message("Surname created as: " + payload.Surname);
  Log.Message("Sex created as: " + payload.Sex);
  Log.Message("Title created as: " + payload.Title);
  Log.Message("Gender created as: " + payload.Gender);
  Log.Message("Mobile created as: " + payload.Mobile);
  Log.Message("Born created as: " + payload.Born);
  Log.Message("Phone created as: " + payload.Phone);
  Log.Message("FirstAddressLine created as: " + payload.FirstAddressLine);
  Log.Message("SecondAddressLine created as: " + payload.SecondAddressLine);
  Log.Message("ThirdAddressLine created as: " + payload.ThirdAddressLine);
  Log.Message("FourthAddressLine created as: " + payload.FourthAddressLine);
  Log.Message("PhoneOther created as: " + payload.PhoneOther);
  Log.Message("PostCode created as: " + payload.PostCode);
  Log.Message("PatientNumber created as: " + payload.PatientNumber);
  Log.Message("ScslHealthDbId created as: " + payload.ScslHealthDbId);
  Log.Message("other_cookie_jar.Id created as: " + payload.Id);
  Log.Message("other_cookie_jar.__RequestVerificationToken created as: " + payload.__RequestVerificationToken);

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