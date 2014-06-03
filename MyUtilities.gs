
function MyUtilities() {
  MyUtilities.init.apply ( this, arguments );
    }

MyUtilities = {
  
  init: function() {},
  
  serialize : function(obj) {
      var str = [];
      for(var p in obj)
         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }, 
  
  test : function() {
     return Logger.log('We reached here static MyUtilities.'); 
    },
  
  
 getFieldList : function(aList, field) {
      
    Logger.log('MyUtilities():: getFieldList:');
    var count = aList.length;
    var fieldList = new Array(count);
    for(var i=0; i < aList.length; i++) {
       var item =  aList[i];
       fieldList[i] = item[field];
    }
    
    return fieldList;
  },
      
      
  getItemsByKeys : function(contentArray, aSearchKey, valueListToFind) {
    
    Logger.log('MyUtilities():: getItemsByKeys:');
    Logger.log('valueListToFind: ' + Utilities.jsonStringify(valueListToFind));
    Logger.log('valueListToFind.length: ' + valueListToFind.length);
              
    var filteredContentMatchingKey = new Array();
    for (var k=0; k < valueListToFind.length; k++) {
      Logger.log('aValueToFind : ' + valueListToFind[k]);
      var aValueToFind = valueListToFind[k];
      
      for (var i=0; i < contentArray.length; i++) {
        Logger.log(aSearchKey+'['+i+'] : ' + contentArray[i][aSearchKey]);
        
        Logger.log(Utilities.jsonStringify(contentArray[i]));
        if (contentArray[i][aSearchKey] == aValueToFind) {
          
          filteredContentMatchingKey.push(contentArray[i]);
        } 
      }
    }
    return filteredContentMatchingKey;
  },
      
  getEventsPastTodaysDate : function(aList) {
     Logger.log('MyUtilities():: getEventsPastTodaysDate:');
    
    var count = aList.length;
    var fieldDict = new Array(count);
    var eventsPastToday = new Array();
    for(var i=0; i < aList.length; i++) {
       var item =  aList[i];
      fieldDict[i] = {"time": item["time"], 
                      "duration":item["duration"],
                      "utcOffset":item["utcOffset"]
                     };
                      
     
                      
    }
    
    var now = new Date();
    // Can also be used as a standalone function
    dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    // Saturday, June 9th, 2007, 5:46:21 PM
    
    // You can use one of several named masks
    //now.format("isoDateTime");
    // 2007-06-09T17:46:21
    
    
    for (var i=0; i < fieldDict.length; i++) {
      var item = fieldDict[i];

      Logger.log('time: ' + item.time); 
      Logger.log('duration: ' + item.duration);
      Logger.log('utcOffset: ' + item.utcOffset); 
      
      var utcSeconds = (item.time+ item.duration + item.utcOffset)/1000;
      Logger.log('utcSeconds: ' + utcSeconds);

      
      var eventDate = MyUtilities.epochToJsDate(utcSeconds);
      Logger.log('jsDate.getDate(): ' + eventDate.toDateString());
      
      //Logger.log('Date comparison: ' + Dates.compare(eventDate, Date.now()));
      
      // formatDateObjWithDateParams();
      // isNotGreaterThanToday Then return Event
      
      
      if (Dates.compare(eventDate, now) > 0) {
          Logger.log(eventDate.toDateString() +' is greater than ' + now);
      } else {
         Logger.log(eventDate.toDateString() +' is less than ' + now);
        eventsPastToday.push(aList[i]);
      }
     
    }
    return eventsPastToday; 
    
  },

                 
    epochToJsDate: function (ts){
        // ts = epoch timestamp
        // returns date obj
        return new Date(ts*1000);
   },
}  
    
    
    
// Source: http://stackoverflow.com/questions/497790
var Dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}



/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

