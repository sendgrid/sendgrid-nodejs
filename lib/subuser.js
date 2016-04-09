/**
 * Created by abdulmoiz on 4/2/2016.
 */
"use strict";

var request         = require('request');

function SubUser(params) {
    params = params || {};
    this.api_key    = params.api_key;
    this.api_user   = params.api_user;

}

SubUser.prototype.addSubAccount = function(subAccountData, callBack) {
    var data = {
        'api_user'          :this.api_user,
        'api_key'           :this.api_key,
        'username'          :subAccountData.username,
        'email'             :subAccountData.email,
        'password'          :subAccountData.password,
        'confirm_password'  :subAccountData.confirm_password,
        'first_name'        :subAccountData.first_name,
        'last_name'         :subAccountData.last_name,
        'address'           :subAccountData.address || 'na',
        'city'              :subAccountData.city ||'na',
        'state'             :subAccountData.state || 'na',
        'zip'               :subAccountData.zip || 'na',
        'country'           :subAccountData.country || 'na',
        'phone'             :subAccountData.phone || 'na',
        'website'           :subAccountData.website || 'na',
        'company'           :subAccountData.company ||'na'
    };
    request.post({url:'https://api.sendgrid.com/apiv2/customer.add.json', formData: data}, function (err, httpResponse, body) {
        if (err) {
            return callBack(err);
        }
        var data;
        try{
            data = JSON.parse(body)
        }catch(ex){
            return callBack(null, data);
        }
        if(data.message == 'error'){
            return callBack(data);
        }
        callBack(null, body);
    });
};


SubUser.prototype.retreiveSubAccounts = function(subAccountData, callBack) {
    if(typeof subAccountData !='object'|| subAccountData === null) subAccountData =  {};
    subAccountData.api_key  = this.api_key;
    subAccountData.api_user = this.api_user;
    subAccountData.task     = 'get';
    //subAccountData contains query options
    request.post({url:'https://api.sendgrid.com/apiv2/customer.profile.json', formData: subAccountData}, function (err, httpResponse, body) {
        if (err) {
            return callBack(err);
        }
        var data;
        try{
            data = JSON.parse(body)
        }catch(ex){
            return callBack(null, data);
        }
        if(data.message == 'error'){
            return callBack(data);
        }
        callBack(null, body);
    });
};


SubUser.prototype.removeSubAccount = function(subUserName, callBack) {
    var data  = {
        'api_key': this.api_key,
        'api_user': this.api_user,
        'user': subUserName //must be a valid sub user name
    };
    request.post({url:'https://api.sendgrid.com/apiv2/customer.delete.json', formData: data}, function (err, httpResponse, body) {
        if (err) {
            return callBack(err);
        }
        var data;
        try{
            data = JSON.parse(body)
        }catch(ex){
            return callBack(null, data);
        }
        if(data.message == 'error'){
            return callBack(data);
        }
        callBack(null, body);
    });
};

module.exports = SubUser;
