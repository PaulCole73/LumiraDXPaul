//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
//                                API Interactions                                 //
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//

function api_post(address, headers, body_payload)
{
  // Create the aqHttpRequest object
  var aqHttpRequest = aqHttp.CreatePostRequest(address);
 
  // Assign the headers from the incoming headers object 
  for ( var property in headers )
  {
    aqHttpRequest.SetHeader(property, headers[property])
  }

  // Send the request, create the aqHttpResponse object
  var aqHttpResponse = aqHttpRequest.Send(body_payload)
  
  return aqHttpResponse;
}
//---------------------------------------------------------------------------------//