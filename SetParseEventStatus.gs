// Copyright 2013 Brilliant Age Inc. All Rights Reserved.
 
/**
 * @fileoverview Google Apps Script time-driven event application to :
 *     1) Configure project properties for Parse.com
 *     2) Initialize a RESTful API client to Parse.com 
 *     3) ASync calls using Promises to fetch events (based upon status) from Parse.com
 *     4) Compare event date/time against current time to determine which events should change status from upcoming to past
 *    
 *     
 * @author ger@brilliantage.com (Ger O'Sullivan)
 */
 

/**
 * Extends the Array object to include a diff method.
 * @type {Array}
 * @param (Array)
 * @return (Array);
 */
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};


function setEventStatus() {
    
  var parseDotComObj = new ParseDotCom();
  
  
  Logger.log( 'parseDotComObj is a ParseDotCom: ' + (parseDotComObj instanceof ParseDotCom));
  Logger.log( 'parseDotComObj is a ClientAPIBase: ' + (parseDotComObj instanceof ClientAPIBase));

  try {
    
    var dfd = new Deferred(); 
     
    var initializeClients = function() { 
     
      Logger.log('Got Deferred Object');
      
      var promises = [];
      
      var p = parseDotComObj.initialize();
      promises.push(p); // an async operation
      
      // You want to perform some computation after above tasks are done.
      	Promise.when(promises).done(function() { 
          for (var i = 0, len = arguments.length; i < len; i++) { 
            Logger.log('Arguments :' + arguments[i]);
              if (!arguments[i]) {
                  dfd.resolve(false); 
              }
          }
        dfd.resolve(true);

      }).fail(function(err) { 
          dfd.reject(err); 
      });
      
      return dfd.promise(); 
    };
    
    var promise = initializeClients();
    
    promise.then(function(res){
          Logger.log('Calling promise');
      
          parseDotComObj.query =
            {"status" : "upcoming"};  

      
          var promises = [];
          var p = parseDotComObj.fetchEvents();
          promises.push(p); // an async operation
      
            // You want to perform some computation after above tasks are done.
      	Promise.when(promises).done(function() { 
          for (var i = 0, len = arguments.length; i < len; i++) { 
            Logger.log('Arguments :' + arguments[i]);
              if (!arguments[i]) {
                 Logger.log('Arguments falied:');
                  dfd.resolve(false); 
              }
          }
        dfd.resolve(true);

      }).fail(function(err) { 
          dfd.reject(err); 
      });
      
      return dfd.promise(); 
      
		}
    );

    promise.then(function(res){
      Logger.log('Return Event Date/Time');
      
      Logger.log('Calling myUtilities.getFieldList for Parse');
      Logger.log('results : ' + parseDotComObj.events.results);
      
      
      var parseEventsPastToday = MyUtilities.getEventsPastTodaysDate(parseDotComObj.events.results);
      
      var promises = [];
      Logger.log('parseEventsPastToday count :' + parseEventsPastToday.length);
      
      var p1 = parseDotComObj.setEventStatus(parseEventsPastToday, "past");
      return;
      promises.push(p1); // an async operation
      
      // You want to perform some computation after above tasks are done.
      Promise.when(promises).done(function() { 
        for (var i = 0, len = arguments.length; i < len; i++) { 
          Logger.log('Arguments :' + arguments[i]);
            if (!arguments[i]) {
               Logger.log('Arguments falied:');
                dfd.resolve(false); 
            }
        }
      dfd.resolve(true);

      }).fail(function(err) { 
          dfd.reject(err); 
      });
      
      return dfd.promise(); 
    }
  );
        
      
    
    
  } catch (e) {
    MailApp.sendEmail("ger@brilliantage.com", "Error report - testPromise()", e.message);
  }
  
  
}


function setCustomEventRow() {
  
  
  var parseDotComObj = new ParseDotCom();
  
  
    Logger.log( 'parseDotComObj is a ParseDotCom: ' + (parseDotComObj instanceof ParseDotCom));
  Logger.log( 'parseDotComObj is a ClientAPIBase: ' + (parseDotComObj instanceof ClientAPIBase));

  try {
    
    var dfd = new Deferred(); 
     
    var initializeClients = function() { 
     
      Logger.log('Got Deferred Object');
      
      var promises = [];
      
      var p = parseDotComObj.initialize();
      promises.push(p); // an async operation
      
      // You want to perform some computation after above tasks are done.
      	Promise.when(promises).done(function() { 
          for (var i = 0, len = arguments.length; i < len; i++) { 
            Logger.log('Arguments :' + arguments[i]);
              if (!arguments[i]) {
                  dfd.resolve(false); 
              }
          }
        dfd.resolve(true);

      }).fail(function(err) { 
          dfd.reject(err); 
      });
      
      return dfd.promise(); 
    };
    
    var promise = initializeClients();
    
    
    promise.then(function(res){
      Logger.log('Set new event');
      
      Logger.log("parseDotComObj.getConsumerNamedClassVenueID : " + parseDotComObj.getConsumerNamedClassVenueId());
      Logger.log("parseDotComObj.getConsumerNamedClassGroupID : " + parseDotComObj.getConsumerNamedClassGroupId());
                
        var payload = {"duration": 5400000, 
                          "eventId":"123456", 
                          "headcount" : 0, 
                          "maybe_rsvp_count":0,
                          "yes_rsvp_count" : 0,
                          "name":"Regular Meeting (1st Wed of Month)",
                          "status":"past",
                          "time":1363822200000,
                          "utcOffset":-14000000,
                          "groupId":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Group","objectId":"G9uO7rW5m7"}]},
                          "venueId":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Venue","objectId":"9ModxnN9Zg"}]}
                         } 
        

      var promises = [];

      var p1 = parseDotComObj.postEvent(payload);
      promises.push(p1); // an async operation
      
      // You want to perform some computation after above tasks are done.
      Promise.when(promises).done(function() { 
        for (var i = 0, len = arguments.length; i < len; i++) { 
          Logger.log('Arguments :' + arguments[i]);
            if (!arguments[i]) {
               Logger.log('Arguments falied:');
                dfd.resolve(false); 
            }
        }
      dfd.resolve(true);

      }).fail(function(err) { 
          dfd.reject(err); 
      });
      
      return dfd.promise(); 
    }
  );
    
    
     } catch (e) {
    MailApp.sendEmail("ger@brilliantage.com", "Error report - setCustomEventRow()", e.message);
  }
    
    

  
}
