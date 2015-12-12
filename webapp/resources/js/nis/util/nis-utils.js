// The Template Loader. Used to asynchronously load templates located in separate .html files
window.templateLoader = {		
    load: function(views, callback) {
        var deferreds = [];
        $.each(views, function(index, view) {
        	console.log("load(), index:", index);
            if (window[view.name]) {
            		console.log("load(), view:", view);
                deferreds.push($.get(view.path + view.name +'.html', function(data) {
                    window[view.name].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view.path + view.name + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },
};

window.launcher = {
	run : function(){
		this.getEnv();
	},
	getEnv: function() {
		var launcher = this;
		$.get("env/envInfos", function(data){
			  //alert("Data: " + data);
				utils.setEnvInfos(data.body);
				launcher.start();
			});	
	},
	start: function(){
		templateLoader.load(templateInfo.load(),
				function () {
					app = new Router();
					Backbone.history.start();
				});	
	},
};

window.utils = {
		
	envInfos:{},
	serverInfos:{},
	
	setEnvInfos: function(info) {
		this.envInfos = info;
		//this.hostInfos = info.serverInfos;
		var ss = this.serverInfos = new Object();
		$.each(info.serverInfos, function(index, sinfo) {
			var key = JSON.stringify(sinfo.serverName);
			ss[key] = sinfo;			
			//console.log("setEnvInfos:key:" + key);
		});		
		//console.log("setEnvInfos:" + this.getServerApiUrl("nhp"));
	},	
	getServerInfo:function(name) {
		var ret = this.serverInfos[JSON.stringify(name)]; 
		return ret;
	},
	getServerApiUrl:function(name) {
		var serverInfo = this.getServerInfo(name);
		console.log("getServerApiUrl:", serverInfo.apiUrl);
		return serverInfo.apiUrl;
	},
	displayValidationErrors: function (messages) {
	    for (var key in messages) {
	        if (messages.hasOwnProperty(key)) {
	            this.addValidationError(key, messages[key]);
	        }
	    }
	    //this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
	},
	
	addValidationError: function (field, message) {		
	    var controlGroup = $('#formGroup' + field);	    
	    controlGroup.addClass('has-error');
	    $('#msg' + field).text(message);	    
	    $('#saveAccountButton').prop('disabled', true);
	    $('#deleteAccountButton').prop('disabled', true);
	},
	
	removeValidationError: function (field, model) {	    
		var controlGroup = $('#formGroup' + field);
		controlGroup.removeClass('has-error');
	    controlGroup.addClass('has-success');
	    $('#msg' + field).text('');
	    
	    var check = model.validateAll();
        
        if (check.isValid === true) {
        	$('#saveAccountButton').prop('disabled', false);
    	    $('#deleteAccountButton').prop('disabled', false);            
        }
	    
	},
	
	/*Alert main*/
	showAlert: function(title, text, klass) {
	    $('.alert').removeClass("alert-danger alert-warning alert-success alert-info");
	    $('.alert').addClass(klass);
	    $('.alert').html('<strong>' + title + '</strong> ' + text);	    
	    
	    if(klass == 'alert-success'){
	    	$('.alert').append(' <a href="#accounts" class="alert-link">Back to account list</a>');
	    }
	    
	    $('.alert').show();
	},
	
	hideAlert: function() {		
	    $('.alert').hide();
	},
		
	/*Utility method for image uploading*/
    getFile: function() {
    	var files = $('input[name="fileInput"]')[0].files;    	
    	return files[0];
    },
    
    createFileName: function() {    	
    	var filename = 'pictureId' + $.now() + '.' + this.getFileExt();    	
    	return filename;
    	//return $('#filenameInput').text();
    },
    
    getFileExt: function() {
    	var files = $('input[name="fileInput"]')[0].files;
    	var ext = null;
    	if(files[0] != null){
    		var filename = files[0].name.replace(/\\/g, '/').replace(/.*\//, '');
    		ext = filename.replace(/^.*\./, '').toLowerCase();
    	} 
    	return ext;
    },
    
    checkFile: function() {
    	var files = $('input[name="fileInput"]')[0].files;
    	if(files.length > 0){
    		return true;
    	} else {
    		return false;
    	}    	
    },
    
    checkFileExt: function() {
    	var ext = this.getFileExt();        
    	if(ext != null){    		
	    	if(ext == 'jpg' || ext == 'jpeg' || ext == 'png'){
				return true;
			} else {
				return false;
			}
    	} else {
    		return false;
    	}
    }

};



