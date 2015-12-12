/* global $, _, Nis */


EnvManager = (
    function (Nis, _, $) {
    'use strict';

    return function () {
		return {
			envInfos:{},
			
			serverInfos:{},  
			
			loadEnv: function(cbResult) {
				//console.log("loadEnv: cbResult:", cbResult);
				if(cbResult) {
					var launcher = this;
					if(this.isNormalRunMode()) {
						$.get("env/envInfos", function(data){
							launcher.setEnvInfos(data.body);
							cbResult(true);
						});						
					}
					else {
						Nis.testEnvGet("env/envInfos", function(data){
							launcher.setEnvInfos(data);
							cbResult(true);
						});	
						//cbResult(true);
					}
				}
				else {
					var deferred = $.Deferred();
					var launcher = this;
					if(this.isNormalRunMode()) {
						$.get("env/envInfos", function(data){
							launcher.setEnvInfos(data.body);
							deferred.resolve(true);
						});						
					}
					else {
						testEnvGet("env/envInfos", function(data){
							launcher.setEnvInfos(data);
							deferred.resolve(true);							
						});
						
					}
					 return deferred.promise();					
				}
			},
			setEnvInfos: function(info) {
				this.envInfos = info;
				var ss = this.serverInfos = new Object();
				$.each(info.serverInfos, function(index, sinfo) {
					var key = JSON.stringify(sinfo.serverName);
					ss[key] = sinfo;			
				});		
				//console.log("setEnvInfos:" + this.getServerApiUrl("nhp"));
			},	
			getServerInfo:function(name) {
				var ret = this.serverInfos[JSON.stringify(name)]; 
				return ret;
			},
			getServerApiUrl:function(name) {
				var serverInfo = this.getServerInfo(name);
				//console.log("getServerApiUrl:", serverInfo.apiUrl);
				return serverInfo.apiUrl;
			},
			getRunMode:function() {
				if(NisMVC.rMode) {
					return NisMVC.rMode;
				}
				return "normal";
			},
			isNormalRunMode:function() {
				if(this.getRunMode == "normal") {
					return true;
				}
				return false;
			},
		};  // return
    }; // return function
} // function

)(Marionette, _, $);


window.nisUrl = {		
	urlRoot: function(serverName) {
		//console.log("urlRoot:" + serverName);
		return NisMVC.evnMaganger.getServerApiUrl(serverName);
	},
};

window.entityUrl = {
	urlRoot: function(entityName, serverName, token) {
		//console.log("urlRoot:" + entityName);
		if(token)
			return nisUrl.urlRoot(serverName)+"/token/"+token+"/"+entityName;
		else
			return nisUrl.urlRoot(serverName)+"/"+entityName;
	},
	
	url : function(id, entityName, serverName, token) {
		//console.log("url:" + entityName);
		var ret = id ? this.urlRoot(entityName, serverName, token)
			+'/id/' + id : this.urlRoot(entityName, serverName, token);
		//console.log("url:ret:" + ret);
	    return ret;
	  },

	url4ccm : function(id, entityName, serverName) {
		//console.log("url:" + entityName);
          var token = localStorage.getItem("token") || "no-token";
		var ret = id ? this.urlRoot(entityName, serverName, token)
			+'/id/' + id : this.urlRoot(entityName, serverName, token);
		console.log("url:ret:" + ret);
	    return ret; 
	  },	
};