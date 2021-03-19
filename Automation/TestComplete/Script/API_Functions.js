﻿//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//                                API Interactions                                 //
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//

function api_post(address, headers, requestBody)
{ 
  Log.Message(requestBody)
  
  // Create the aqHttpRequest object
  var aqHttpRequest = aqHttp.CreatePostRequest(address);
 
  // Assign the headers from the incoming headers object 
  for ( var property in headers )
  {
    aqHttpRequest.SetHeader(property, headers[property])
    Log.Message(headers[property])
  }
  
  // Send the request, create the aqHttpResponse object
  var aqHttpResponse = aqHttpRequest.Send(requestBody)
  
  return aqHttpResponse;
}

//---------------------------------------------------------------------------------//
function api_get(address, headers)
{
  // Create the aqHttpRequest object
  var aqHttpRequest = aqHttp.CreateGetRequest(address);
 
  // Assign the headers from the incoming headers object 
  for ( var property in headers )
  {
    aqHttpRequest.SetHeader(property, headers[property])
  }

  // Send the request, create the aqHttpResponse object
  var aqHttpResponse = aqHttpRequest.Send()
   
  return aqHttpResponse
}
//---------------------------------------------------------------------------------//
// returns object containing cookies and sessionid
function api_get_login_tokens_and_session_id(address, headers) 
{
  var cookie_jar = new Object();
  
  // Create the aqHttpRequest object
  var aqHttpRequest = aqHttp.CreateGetRequest(address);
 
  // Assign the headers from the incoming headers object 
  for ( var property in headers )
  {
    aqHttpRequest.SetHeader(property, headers[property])
  }

  // Send the request, create the aqHttpResponse object
  var aqHttpResponse = aqHttpRequest.Send()
  
  // Read the response data extrcat tokens and cookies from it
  var response_data = aqHttpResponse.AllHeaders; // All headers
  cookie_jar.session_id = response_data.match(/ASP.NET_SessionId=([^;]*)/)[1];
  cookie_jar.request_verification_token = response_data.match(/__RequestVerificationToken_Lw__=([^;]*)/)[1];       
  
  return cookie_jar
}
//---------------------------------------------------------------------------------//
