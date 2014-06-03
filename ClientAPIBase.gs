function ClientAPIBase() {
        this.init.apply ( this, arguments );
    }

    
ClientAPIBase.prototype ={
        init: function  (  ) {
            var optns = arguments[0] || {};
            this.client = optns.client || null;
            this.events = optns.events || null;
            this.query = optns.query || null;
            this.uriMethod = optns.uriMethod || null;
            this.uriOptions = optns.uriOptions || null;
        },
      
        getClient: function() {
          return this.client;
        },
         
        getEvents: function() {
          return this.events;
        },
      
        getQuery: function() {
          return this.query;
        },
    
        getUriOptions: function() {
          return this.uriOptions;
        },
      
        getUriMethod: function() {
          return this.uriMethod;
        }, 
 
  
        setUriMethod: function(uriMethod) {
          this.uriMethod = uriMethod;
        },
        
        setQuery: function(newQuery) {
            this.query = newQuery;
        },
        
        setClient: function(newClient) {
          this.client = newClient;
        },
        
        setEvents: function(newEvents) {
          this.events = newEvents;
        },
        
        setUriOptions: function(uriOptions) {
          this.uriOptions = uriOptions;
        }
      
    }

