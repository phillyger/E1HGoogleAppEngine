
/**
 * Key of ScriptProperties for Meetup.com Group API Key.
 * http://www.meetup.com/meetup_api/
 * @type {String}
 * @const
 */
var MEETUP_DOT_COM_GROUP_API_KEY_PROPERTY_NAME = "MEETUP_DOT_COM_GROUP_API_KEY";

/**
 * Key of ScriptProperties for Meetup.com Group ID Key.
 * http://www.meetup.com/meetup_api/
 * @type {String}
 * @const
 */
var MEETUP_DOT_COM_GROUP_ID_KEY_PROPERTY_NAME = "MEETUP_DOT_COM_GROUP_ID_KEY";

/**
 * Key of ScriptProperties for Meetup.com Base URI.
 * http://www.meetup.com/meetup_api/
 * @type {String}
 * @const
 */
var MEETUP_DOT_COM_BASE_URI_PROPERTY_NAME = "MEETUP_DOT_COM_BASE_URI";

/**
 * Key of ScriptProperties for Meetup.com Group URL Name.
 * http://www.meetup.com/meetup_api/
 * @type {String}
 * @const
 */
var MEETUP_DOT_COM_GROUP_URL_NAME_PROPERTY_NAME = "MEETUP_DOT_COM_GROUP_URL_NAME";


function MeetupDotCom() {
        this.init.apply ( this, arguments );
    }
    MeetupDotCom.prototype = {
        init : function() {
          ClientAPIBase.prototype.init.apply (this, arguments);
          var optns = arguments[0] || {};
          this.consumerBaseURIKey = optns.consumerBaseURIKey || this.getConsumerBaseURIKey();
          this.consumerGroupIdKey = optns.consumerGroupIdKey || this.getConsumerGroupIdKey();
          this.consumerGroupAPIKey = optns.consumerGroupAPIKey || this.getConsumerGroupAPIKey();
          this.consumerGroupURLNameKey = optns.consumerGroupURLNameKey || this.getConsumerGroupURLNameKey();
        },
        getClient : ClientAPIBase.prototype.getClient,
        getEvents : ClientAPIBase.prototype.getEvents,
        getQuery : ClientAPIBase.prototype.getQuery,
        getUriOptions: ClientAPIBase.prototype.getUriOptions,
        getUriMethod: ClientAPIBase.prototype.getUriMethod,
      
      
      
        initialize: function () {

          Logger.log('Calling initialize - MeetupDotCom');
          var payloadJSON = {"key" : this.consumerGroupAPIKey, 
                         "sign" : "true",  
                         "group_urlname" : this.consumerGroupURLNameKey};
          
          var payloadString = payloadJSON;    
          //var myUtilities = new MyUtilities();   
          var url = this.consumerBaseURIKey + MyUtilities.serialize(payloadString);
          
          var contentType = "application/json; charset=utf-8";
          var options = {
               "method": "GET",
               "contentType": contentType
            };
          
           this.client = { "url" : url, "options" : options };
        },
        
        setConsumerGroupAPIKey: function (appIdKey) {
            ScriptProperties.setProperty(MEETUP_DOT_COM_GROUP_API_KEY_PROPERTY_NAME, appIdKey);
          },
        
        getConsumerGroupAPIKey: function () {
          this.consumerGroupAPIKey = ScriptProperties.getProperty(MEETUP_DOT_COM_GROUP_API_KEY_PROPERTY_NAME);
          if (this.consumerGroupAPIKey == null) {
            this.consumerGroupAPIKey = "";
          }
          return this.consumerGroupAPIKey;
        },
    
    
        setConsumerGroupIdKey: function (groupIdKey) {
            ScriptProperties.setProperty(MEETUP_DOT_COM_GROUP_ID_KEY_PROPERTY_NAME, groupIdKey);
          },
        
        getConsumerGroupIdKey: function () {
          this.consumerGroupIdKey = ScriptProperties.getProperty(MEETUP_DOT_COM_GROUP_ID_KEY_PROPERTY_NAME);
          if (this.consumerGroupIdKey == null) {
            this.consumerGroupIdKey = "";
          }
          return this.consumerGroupIdKey;
        },
        
        
        setConsumerBaseURIKey: function (baseURIKey) {
            ScriptProperties.setProperty(MEETUP_DOT_COM_BASE_URI_PROPERTY_NAME, baseURIKey);
          },
        
        getConsumerBaseURIKey: function () {
          this.consumerBaseURIKey = ScriptProperties.getProperty(MEETUP_DOT_COM_BASE_URI_PROPERTY_NAME);
          if (this.consumerBaseURIKey == null) {
            this.consumerBaseURIKey = "";
          }
          return this.consumerBaseURIKey;
        },
        
        
        setConsumerGroupURLNameKey: function (groupURLNameKey) {
            ScriptProperties.setProperty(MEETUP_DOT_COM_GROUP_URL_NAME_PROPERTY_NAME, groupURLNameKey);
          },
        
        getConsumerGroupURLNameKey: function () {
          this.consumerGroupURLNameKey = ScriptProperties.getProperty(MEETUP_DOT_COM_GROUP_URL_NAME_PROPERTY_NAME);
          if (this.consumerGroupURLNameKey == null) {
            this.consumerGroupURLNameKey = "";
          }
          return this.consumerGroupURLNameKey;
        },
        
        
        
        fetchEvents: function() {
    
          Logger.log('Calling fetchEvents - MeetupDotCom');
          try {
            
          
            if (this.query) {
                  
               var query = this.client.url +"&"+ MyUtilities.serialize(this.query);
          
               var response = UrlFetchApp.fetch(query, this.client.options);
                
                //Logger.log('MeetupDotCom()::fetchEvents::query: ' + query);
                //Logger.log('MeetupDotCom()::fetchEvents::response: ' + response.getContentText());
                           
                
              
               this.events = JSON.parse(response.getContentText());
            }
    
          }  catch (e) {
             MailApp.sendEmail("ger@brilliantage.com", "Error report - fetchEvents - Meetup", e.message);
          }
        }
  }
