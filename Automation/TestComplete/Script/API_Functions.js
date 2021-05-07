//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//                                API Interactions                                 //
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//

function api_post(address, headers, requestBody)
{   
  // Create the aqHttpRequest object
  var aqHttpRequest = aqHttp.CreatePostRequest(address);
 
  // Assign the headers from the incoming headers object 
  for ( var property in headers )
  {
    aqHttpRequest.SetHeader(property, headers[property]);
    //Log.Message(headers[property])
  }
  
  // Send the request, create the aqHttpResponse object
  var aqHttpResponse = aqHttpRequest.Send(requestBody);
  
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
    aqHttpRequest.SetHeader(property, headers[property]);
  }

  // Send the request, create the aqHttpResponse object
  var aqHttpResponse = aqHttpRequest.Send();
   
  return aqHttpResponse;
}
//---------------------------------------------------------------------------------//
