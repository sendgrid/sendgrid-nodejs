exports.Header = function() {
  this.data = {}
  
  this.addTo = function(to) {
    if(!this.data['to']) {
      this.data['to'] = [];
    }
    if(typeof to == 'object') {
      this.data['to'] = this.data['to'].concat(to);
    }else{
      this.data['to'].push(to);
    }
        
  }
  
  
  this.addSubVal = function(key, val) {
    if(!this.data['sub']) {
      this.data['sub'] = {};
    }
    if(typeof val == 'object') {
      this.data['sub'][key] = val;
    }else{
      this.data['sub'][key] = [val];
    }
  }
  

  this.setUniqueArgs = function(val) {
    if(typeof val == 'object') {
      this.data['unique_args'] = val;
    }
  }
  
  
  this.setCategory = function(val) {
    this.data['category'] = val;
  }
  
  
  this.addFilterSetting = function(filter, setting, val) {
    if(!this.data['filters']) {
      this.data['filters'] = {};
    }
    
    if(!this.data['filters'][filter]) {
      this.data['filters'][filter] = {};
    }
    
    if(!this.data['filters'][filter]['settings']) {
      this.data['filters'][filter]['settings'] = {};
    }

    this.data['filters'][filter]['settings'][setting] = val;
  }
  

  this.toJson = function() {
    var json = JSON.stringify(this.data);
    return json.replace(/(["\]}])([,:])(["\[{])/, '$1$2 $3');
  }
  
  
}