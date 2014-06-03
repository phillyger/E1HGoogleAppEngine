// Copyright 2013 Brilliant Age Inc. All Rights Reserved.
 
/**
 * @fileoverview Google Apps Script time-driven event application to :
 *     1) Configure project properties for Parse.com and Meetup.com
 *     2) Initialize a RESTful API client to Parse.com and Meetup.com
 *     3) ASync calls using Promises to fetch events (based upon status) from Parse.com and Meetup.com
 *     4) Compare event ids from both to determine which events are missing from Parse.com
 *     5) Synchronize data in Parse.com with that of Meetup.com
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

var STATUS_KEY_PROPERTY_NAME = "STATUS_KEY_UPCOMING";
var queryStatus;

function syncEvents() {
  

  var meetupDotComObj = new MeetupDotCom();
  var parseDotComObj = new ParseDotCom();
  
  
  Logger.log( 'parseDotComObj is a ParseDotCom: ' + (parseDotComObj instanceof ParseDotCom));
  Logger.log( 'meetupDotComObj is a ParseDotCom: ' + (meetupDotComObj instanceof ParseDotCom));
  Logger.log( 'parseDotComObj is a ClientAPIBase: ' + (parseDotComObj instanceof ClientAPIBase));
  Logger.log( 'meetupDotComObj is a ClientAPIBase: ' + (meetupDotComObj instanceof ClientAPIBase));
  try {
    
    var dfd = new Deferred(); 
     
    var initializeClients = function() { 
     
      Logger.log('Got Deferred Object');
      
      var promises = [];
      var p1 = meetupDotComObj.initialize();
      var p2 = parseDotComObj.initialize();
      promises.push(p1); // an async operation
      promises.push(p2); // an async operation
      
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
          queryStatus = ScriptProperties.getProperty(STATUS_KEY_PROPERTY_NAME);
          meetupDotComObj.query = 
            {"status" : queryStatus, 
              "page" : 2  
             };  
      
          parseDotComObj.query =
            {"status" : queryStatus};  

      
          var promises = [];
          var p1 = meetupDotComObj.fetchEvents();
          var p2 = parseDotComObj.fetchEvents();
          promises.push(p1); // an async operation
          promises.push(p2); // an async operation
      
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
      Logger.log('Return Event Ids');
      
      Logger.log('Calling myUtilities.getFieldList for Parse');
      Logger.log('Parse.com :: .events.results: ' + parseDotComObj.events.results);
      
      Logger.log('Meetup.com :: .events.results: ' + meetupDotComObj.events.results);
      
      
      var parseEventIds = MyUtilities.getFieldList(parseDotComObj.events.results, "eventId");
      
      Logger.log('Calling myUtilities.getFieldList for Meetup');
      var meetupEventIds = MyUtilities.getFieldList(meetupDotComObj.events.results, "id");

      
      Logger.log('Meetup Event ids: ' + meetupEventIds.join());
      Logger.log('Parse Event ids: ' + parseEventIds.join());
      Logger.log('Array difference: ' + meetupEventIds.diff(parseEventIds));
      
      var missingEventIdsInParse = meetupEventIds.diff(parseEventIds);
      Logger.log('missingEventIdsInParse.length :' +  missingEventIdsInParse.length);
                 
      if (missingEventIdsInParse.length == 0 ) 
        // don't do anything if zero difference between events
        return;
      
      var rowsToAdd = MyUtilities.getItemsByKeys(meetupDotComObj.events.results, "id", missingEventIdsInParse);
      
      
      
      Logger.log('Missing row(s) : ' + Utilities.jsonStringify(rowsToAdd));
     
      var promises = [];
      for (var i=0; i < rowsToAdd.length; i++) {   
        var payload = parseDotComObj.parseBuilder(rowsToAdd[i], queryStatus);
        var p = parseDotComObj.postEvent(payload);
        promises.push(p); // an async operation
      }
      
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

/*
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('swiss', function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
});

Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    this.method('uber', function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }        
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});
*/

