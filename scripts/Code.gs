function doGet() {
  var htmlUrl = "<NGROK_URL>?redirect_uri="+ getRedirectURI() + "&state=" + generateNewStateToken("asyncCallback", {user:'udara', email:'udara@sample.com'});
  Logger.log("Inside doGet htmlUrl: " + htmlUrl);

  var button = CardService.newTextButton()
    .setText("link")
    .setOpenLink(CardService.newOpenLink()
    .setUrl(htmlUrl)
    .setOpenAs(CardService.OpenAs.OVERLAY)
    .setOnClose(CardService.OnClose.RELOAD_ADD_ON));
 
  var card = CardService.newCardBuilder().addSection(CardService.newCardSection().addWidget(CardService.newButtonSet().addButton(button)));
  return card.build();
}


function generateNewStateToken(callbackName, user_info) {
  return ScriptApp.newStateToken()
    .withMethod(callbackName)
    .withArgument("user_info", JSON.stringify(user_info))
    .withTimeout(3600)
    .createToken();
}

function getRedirectURI() {
    return "https://script.google.com/macros/d/" + ScriptApp.getScriptId() + "/usercallback";
}

function asyncCallback(data) {
    Logger.log("Inside asyncCallback: " + JSON.stringify(data));
    return HtmlService.createHtmlOutputFromFile("success");
}