var DEBUG = false;


/***************** PARSE.com DEVELOPMENT KEYS *********************
/**
 * Key of ScriptProperties for Parse.com Application ID.
 * @type {String}
 * @const
 */
var PARSE_DOT_COM_APP_ID_KEY_PROPERTY_NAME_DEV = "PARSE_DOT_COM_APP_ID_KEY_DEV";


/**
 * Key of ScriptProperties for Parse.com REST API Key.
 * @type {String}
 * @const
 */
var PARSE_DOT_COM_REST_API_KEY_PROPERTY_NAME_DEV = "PARSE_DOT_COM_REST_API_KEY_DEV";


/**
 * Key of ScriptProperties for Parse.com a class name Group with ObjectID value.
 * @type {String}
 * @const
 */
var PARSE_DOT_COM_NAMED_CLASS_GROUP_ID_PROPERTY_NAME_DEV = "PARSE_DOT_COM_NAMED_CLASS_GROUP_ID_DEV";

/**
 * Key of ScriptProperties for Parse.com a class name Venue with ObjectID value.
 * @type {String}
 * @const
 */
var PARSE_DOT_COM_NAMED_CLASS_VENUE_ID_PROPERTY_NAME_DEV = "PARSE_DOT_COM_NAMED_CLASS_VENUE_ID_DEV";


/**
 * Key of ScriptProperties for Parse.com a class name (EVENT) Type with ObjectID value.
 * @type {String}
 * @const
 */
var PARSE_DOT_COM_NAMED_CLASS_EVENTTYPE_PROPERTY_NAME_DEV = "PARSE_DOT_COM_NAMED_CLASS_EVENTTYPE_DEV";



/***************** PARSE.com PRODUCTION KEYS *********************
/**
 * Key of ScriptProperties for Parse.com Application ID.
 * @type {String}
 * @const
 */

var PARSE_DOT_COM_APP_ID_KEY_PROPERTY_NAME = "PARSE_DOT_COM_APP_ID_KEY_PROD";

/**
 * Key of ScriptProperties for Parse.com REST API Key.
 * @type {String}
 * @const
 */
var PARSE_DOT_COM_REST_API_KEY_PROPERTY_NAME = "PARSE_DOT_COM_REST_API_KEY_PROD";


/**
 * Key of ScriptProperties for Parse.com Base URL.
 * @type {String}
 * @const
 */
var PARSE_DOT_COM_BASE_URI_PROPERTY_NAME = "PARSE_DOT_COM_BASE_URI";


/**
 * Key of ScriptProperties for Parse.com a class name Group with ObjectID value.
 * @type {String}
 * @const
 */
var PARSE_DOT_COM_NAMED_CLASS_GROUP_ID_PROPERTY_NAME = "PARSE_DOT_COM_NAMED_CLASS_GROUP_ID_PROD";

/**
 * Key of ScriptProperties for Parse.com a class name Venue with ObjectID value.
 * @type {String}
 * @const
 */
var PARSE_DOT_COM_NAMED_CLASS_VENUE_ID_PROPERTY_NAME = "PARSE_DOT_COM_NAMED_CLASS_VENUE_ID_PROD";

/**
 * Key of ScriptProperties for Parse.com a class name (EVENT) Type with ObjectID value.
 * @type {String}
 * @const
 */
var PARSE_DOT_COM_NAMED_CLASS_EVENTTYPE_PROPERTY_NAME = "PARSE_DOT_COM_NAMED_CLASS_EVENTTYPE_PROD";


if (DEBUG) {
  PARSE_DOT_COM_APP_ID_KEY_PROPERTY_NAME = PARSE_DOT_COM_APP_ID_KEY_PROPERTY_NAME_DEV;
  PARSE_DOT_COM_REST_API_KEY_PROPERTY_NAME = PARSE_DOT_COM_REST_API_KEY_PROPERTY_NAME_DEV;
  PARSE_DOT_COM_NAMED_CLASS_VENUE_ID_PROPERTY_NAME = PARSE_DOT_COM_NAMED_CLASS_VENUE_ID_PROPERTY_NAME_DEV;
  PARSE_DOT_COM_NAMED_CLASS_GROUP_ID_PROPERTY_NAME = PARSE_DOT_COM_NAMED_CLASS_GROUP_ID_PROPERTY_NAME_DEV;
  PARSE_DOT_COM_NAMED_CLASS_EVENTTYPE_PROPERTY_NAME = PARSE_DOT_COM_NAMED_CLASS_EVENTTYPE_PROPERTY_NAME_DEV;
  
}


function ParseDotCom() {
        this.init.apply ( this, arguments );
    }
    ParseDotCom.prototype = {
        init : function() {
          ClientAPIBase.prototype.init.apply (this, arguments);
          var optns = arguments[0] || {};
          this.consumerBaseURI = optns.consumerBaseURI || this.getConsumerBaseURI();
          this.consumerAppId = optns.consumerAppId || this.getConsumerAppId();
          this.consumerRESTAPIKey = optns.consumerRestAPIKey || this.getConsumerRESTAPIKey();
          this.consumerNamedClassGroupId = optns.consumerNamedClassGroupId || this.getConsumerNamedClassGroupId();
          this.consumerNamedClassVenueId = optns.consumerNamedClassVenueId || this.getConsumerNamedClassVenueId();
          this.consumerNamedClassEventType = optns.consumerNamedClassEventType || this.getConsumerNamedClassEventType();
          
          this.rowData = optns.rowData || this.getRowData();
        },
        getClient : ClientAPIBase.prototype.getClient,
        getEvents : ClientAPIBase.prototype.getEvents,
        getQuery : ClientAPIBase.prototype.getQuery,
        getUriOptions: ClientAPIBase.prototype.getUriOptions,
        getUriMethod: ClientAPIBase.prototype.getUriMethod,

      

        
        initialize: function () {
          Logger.log('Calling initialize - ParseDotCom');
    
          this.uriMethod = "GET";
          this.configureUriOptions();
          this.client = { "url" : this.consumerBaseURI, "options" : this.uriOptions };
        },
      
        configureUriOptions: function(payload) {
    
          Logger.log('Calling setUriOptions - ParseDotCom');
          Logger.log('this.consumerAppId: ' + this.consumerAppId);
          Logger.log('this.consumerRESTAPIKey: ' + this.consumerRESTAPIKey);
          
          var headers = {
            "X-Parse-Application-Id": this.consumerAppId,
            "X-Parse-REST-API-Key": this.consumerRESTAPIKey,
          };
          
          var contentType = "application/json; charset=utf-8";
          Logger.log('this.uriMethod: ' + this.uriMethod);
          this.uriOptions = {
            "method": this.uriMethod,
            "contentType": contentType,
            "headers": headers,
            "payload": payload
          };
        },
    
        setConsumerAppId: function (appIdKey) {
            ScriptProperties.setProperty(PARSE_DOT_COM_APP_ID_KEY, appIdKey);
          },
        
        getConsumerAppId: function () {
          this.consumerAppId = ScriptProperties.getProperty(PARSE_DOT_COM_APP_ID_KEY_PROPERTY_NAME);
          if (this.consumerAppId == null) {
            this.consumerAppId = "";
          }
          return this.consumerAppId;
        },
    
        setConsumerRESTAPIKey: function (RestAPIKey) {
            ScriptProperties.setProperty(PARSE_DOT_COM_REST_API_KEY, RestAPIKey);
          },
        
        getConsumerRESTAPIKey: function () {
          this.consumerRestAPIKey = ScriptProperties.getProperty(PARSE_DOT_COM_REST_API_KEY_PROPERTY_NAME);
          if (this.consumerRestAPIKey == null) {
            this.consumerRestAPIKey = "";
          }
          return this.consumerRestAPIKey;
        },
        
        
        setConsumerBaseURI: function (BaseURI) {
            ScriptProperties.setProperty(PARSE_DOT_COM_BASE_URI, BaseURI);
          },
        
        getConsumerBaseURI: function () {
          Logger.log('Calling getConsumerBaseURI - ParseDotCom:' + PARSE_DOT_COM_BASE_URI_PROPERTY_NAME);
          this.consumerBaseURI = ScriptProperties.getProperty(PARSE_DOT_COM_BASE_URI_PROPERTY_NAME);
          if (this.consumerBaseURI == null) {
            this.consumerBaseURI = "";
          }
          return this.consumerBaseURI;
        },
      
      getConsumerNamedClassGroupId : function() {
          Logger.log('Calling getConsumerNamedClassGroupId - ParseDotCom:' + PARSE_DOT_COM_NAMED_CLASS_GROUP_ID_PROPERTY_NAME);
          this.consumerNamedClassGroupId = ScriptProperties.getProperty(PARSE_DOT_COM_NAMED_CLASS_GROUP_ID_PROPERTY_NAME);
          if (this.consumerNamedClassGroupId == null) {
            this.consumerNamedClassGroupId = "";
          }
        
          Logger.log('Value is : ' + this.consumerNamedClassGroupId);
        
          return this.consumerNamedClassGroupId;
      },
      
      
      getConsumerNamedClassVenueId : function() {
          Logger.log('Calling getConsumerNamedClassVenueId - ParseDotCom:' + PARSE_DOT_COM_NAMED_CLASS_VENUE_ID_PROPERTY_NAME);
          this.consumerNamedClassVenueId = ScriptProperties.getProperty(PARSE_DOT_COM_NAMED_CLASS_VENUE_ID_PROPERTY_NAME);
          if (this.consumerNamedClassVenueId == null) {
            this.consumerNamedClassVenueId = "";
          }
         
        Logger.log('Value is : ' + this.consumerNamedClassVenueId);
          return this.consumerNamedClassVenueId;
      },
      
      getConsumerNamedClassEventType : function() {
          Logger.log('Calling getConsumerNamedClassEventType - ParseDotCom:' + PARSE_DOT_COM_NAMED_CLASS_EVENTTYPE_PROPERTY_NAME);
          this.consumerNamedClassEventType = ScriptProperties.getProperty(PARSE_DOT_COM_NAMED_CLASS_EVENTTYPE_PROPERTY_NAME);
          if (this.consumerNamedClassEventType == null) {
            this.consumerNamedClassEventType = "";
          }
         
        Logger.log('Value is : ' + this.consumerNamedClassEventType);
          return this.consumerNamedClassEventType;
      },
        
        setRowData: function (row, queryStatus) {
          Logger.log('queryStatus ' + queryStatus); 
          if (queryStatus == "upcoming") {
          this.rowData = {"duration": row["duration"], 
                          "eventId":row["id"], 
                          "headcount" : row["headcount"], 
                          "maybe_rsvp_count":row["maybe_rsvp_count"],
                          "yes_rsvp_count" : row["yes_rsvp_count"],
                          "name":row["name"],
                          "status":row["status"],
                          "time":row["time"],
                          "utcOffset":row["utc_offset"],
                          "groupId":{"__type":"Pointer","className":"Group","objectId":this.consumerNamedClassGroupId},
                          "venueId":{"__type":"Pointer","className":"Venue","objectId":this.consumerNamedClassVenueId},
                          "type":{"__type":"Pointer","className":"EventType","objectId":this.consumerNamedClassEventType},
                         }
          } else {
                      this.rowData = { 
                          "eventId":row["id"], 
                          "headcount" : row["headcount"], 
                          "maybe_rsvp_count":row["maybe_rsvp_count"],
                          "yes_rsvp_count" : row["yes_rsvp_count"],
                          "name":row["name"],
                          "status":row["status"],
                          "time":row["time"],
                          "utcOffset":row["utc_offset"],
                          "groupId":{"__type":"Pointer","className":"Group","objectId":this.consumerNamedClassGroupId},
                          "venueId":{"__type":"Pointer","className":"Venue","objectId":this.consumerNamedClassVenueId},
                          "type":{"__type":"Pointer","className":"EventType","objectId":this.consumerNamedClassEventType},
                         }
          }
        },
                                                 
        getRowData: function () {                                      
          return this.rowData;
        },
                                                 
        fetchEvents: function() {
    
          Logger.log('Calling fetchEvents - ParseDotCom');
          try {
           
           var query = encodeURIComponent("where="+Utilities.jsonStringify(this.query));   
           var response = UrlFetchApp.fetch(this.client.url +"?"+ query, this.client.options);
            
           Logger.log('ParseDotCom()::fetchEvents::query: ' + query);
           Logger.log('ParseDotCom()::fetchEvents::response: ' + response.getContentText());
                       
          // MailApp.sendEmail("ger@brilliantage.com", "Success", response.getContentText());
           
            this.events = JSON.parse(response.getContentText());
            
          } catch (e) {
            MailApp.sendEmail("ger@brilliantage.com", "Error report - fetchEvents", e.message);
          }
        },
        
        postEvent: function(payload) {
          
          var payload_encoded = encodeURIComponent(Utilities.jsonStringify(payload));
          this.uriMethod = "post";
          this.configureUriOptions(Utilities.jsonStringify(payload));
          
          Logger.log('this.setClient= url : ' + this.consumerBaseURI+' options: ' + this.uriOptions);
          this.client={ "url" : this.consumerBaseURI, "options" : this.uriOptions };
          
          //Logger.log('this.payload: ' + Utilities.jsonStringify(payload));
          //Logger.log('this.payload encoded: ' + payload_encoded);
          Logger.log('Posting New Event...');
          
          //this.client = { "url" : this.consumerBaseURI, "options" : this.uriOptions};
          
          this.client.options.method = "POST";
          this.client.options.payload = Utilities.jsonStringify(payload);
          
          Logger.log("this.client.url: "+ this.client.url);
          Logger.log("this.client.options.method: "+ this.client.options.method);
          Logger.log("this.client.options.contentType: "+ this.client.options.contentType);
           Logger.log("this.client.options.payload: "+ this.client.options.payload);
          
          UrlFetchApp.fetch(this.client.url, this.client.options);
          
          Logger.log('Successfully posted new event...');
          
        },
        
        parseBuilder: function(row, queryStatus) {
          Logger.log('client info::url ' + this.client.url);  
          Logger.log('queryStatus: ' + queryStatus);  
          Logger.log('row: ' + row);
          
          this.setRowData(row, queryStatus);
          var payload = this.getRowData();
          
          Logger.log('row: ' + Utilities.jsonStringify(payload));
          
          return payload;
        },
      
      setEventStatus: function(events, status) {
          
        Logger.log('Start setEventStatus...');


        Logger.log('Updating Event with status...:' + status);
     

          
        for (var i=0; i < events.length; i++) {
          var thisEvent = events[i];
          Logger.log('thisEvent.objectId: ' + thisEvent.objectId);
          payload = {"status":status};
          this.client.options.method = "PUT";
          this.client.options.payload = Utilities.jsonStringify(payload);
          this.client={ "url" : this.consumerBaseURI+"/"+thisEvent.objectId, "options" : this.uriOptions };
          
          
          Logger.log("this.client.url: "+ this.client.url);
          Logger.log("this.client.options.method: "+ this.client.options.method);
          Logger.log("this.client.options.contentType: "+ this.client.options.contentType);
          Logger.log("this.client.options.payload: "+ this.client.options.payload);
          
                    
           //var response = UrlFetchApp.fetch(this.client.url +"?"+ query, this.client.options); 
           //Logger.log('ParseDotCom()::fetchEvents::query: ' + query);
           //Logger.log('ParseDotCom()::fetchEvents::response: ' + response.getContentText());
          
          UrlFetchApp.fetch(this.client.url, this.client.options);
          Logger.log('Successfully updated existing event...');
        }

          
        },
    }


