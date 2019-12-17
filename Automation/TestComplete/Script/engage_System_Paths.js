//------------------------------------------------------------------------
////////////////////////////////  Engage  ////////////////////////////////
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function gmail_account_main()
{
  var main = Sys.Browser("iexplore").Page("https://mail.google.com/mail/u/0/#inbox");
  
  return main;
}
//------------------------------------------------------------------------
function gmail_account_top_email()
{
  var base = gmail_account_main();
  var panel_seq1 = base.Panel(5).Panel(2).Panel(0).Panel(1).Panel(0).Panel(1);
  var panel_seq2 = panel_seq1.Panel(0).Panel(0).Panel(0).Panel(0).Panel(1).Panel(0).Panel(0);
  var top_email = panel_seq2.Panel(0).Panel(0).Panel(5).Panel(0).Panel("z").Panel(2).Panel(0).Table("k").Row("l");
  
  return top_email;
}
//------------------------------------------------------------------------