#will need to set below variables manually if not running from testcomplete - typical value is inrstar-uk-test1.caresolutions.lumiradx.com 
$host_url = $args[0]
$username = $args[1]
$password = $args[2]

$webrequest = Invoke-WebRequest -Uri "https://$host_url/Security/Authentication/LogOn" -SessionVariable sesh

$dbForm = $webrequest.Forms[0]
$dbForm.fields["Username"]="$username"
$dbForm.fields["Password"]="$password"

$webrequest2 = Invoke-WebRequest -Uri ("https://$host_url/Security/Authentication/LogOn") -WebSession $sesh -Method Post -Body $dbForm.Fields

$cookies = $sesh.Cookies.GetCookies("https://$host_url")

foreach ($cookie in $cookies) { 
     Write-Host "$($cookie.name)=$($cookie.value)" 
}