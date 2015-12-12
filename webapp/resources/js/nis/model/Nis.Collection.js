
(function () {
    'use strict';

    Nis.Collection = Backbone.Collection.extend({
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.initOptions(options);
        },
        initOptions:function(options) {
            this.options = _.extend({
                pageSize:10,
            }, options);
        },
        url:function() {
            return this.getListUrl();
        },
        getPageSize:function() {
            return this.options.pageSize;
        },
        getList:function(query, page, size) {
            //console.log("getList: ", this.url);
            var newOptions = {};
            if(query) {
                newOptions = _.extend({}, query);
            }
            this.addQueryParam(newOptions, "page", page);
            this.addQueryParam(newOptions, "size", size);
            return this.getPagedList(newOptions);
        },
        addQueryParam:function(options, key, value) {
            options.queryParam = options.queryParam || {};
            if(! _.isUndefined(value)) {
                options.queryParam[key] = value;
            }
        },
        parse: function (response) {
            console.log("Inside Parse");
            var values = response.body;
            if(values) {
                for (var i = 0, length = values.length; i < length; i++) {
                    var currentValues = values[i];
                    this.push(currentValues);
                }
            }
            console.log(this.toJSON());
            return this.models;
        },
        getListUrl:function() {
            return this.getEntityUrl() + "/list";
        },
        getListCountUrl:function() {
            return this.getEntityUrl() + "/count";
        },
        getQueryUrl:function() {
            return this.getEntityUrl() + "/query";
        },
        makeQueryString:function(options) {
            if(options.queryParam) {
                var ret = "?";
                $.each(options.queryParam, function(key, value) {
                    if(ret != '?')
                        ret += '&';
                    ret += key;
                    if(value && value.op) {
                        ret += value.op;
                        ret += value.value;
                    }   
                    else {
                        ret += '=';
                        ret += value;                        
                    }                 
                });
                return ret;
            }
            return '';
        },
        getPagedListUrl:function(options) {
            var url = this.getListUrl();
            if(options.hasQuery) {
                url = this.getQueryUrl();
            }
            if(options == null ||  _.isEmpty(options))
                return url;
            url += this.makeQueryString(options);
            return url;
        },
        getPagedList:function(options, onSuccessCb, onFailCb) {
            var targetUrl = this.getPagedListUrl(options);
            //console.log("getPagedList:", targetUrl);
            var collection = this;
            $.ajax({
                url:targetUrl,
                dataType:"json",
                success:function (response) {
                    //console.log("getPagedList success: " + response.body + ", options:" + options);
                    var values = response.body;
                    collection.reset(values);
                    if(onSuccessCb) {
                        onSuccessCb(values);
                    }
                    else if(options.success) {
                        options.success(values);
                    }
                },
                error:function(xhr, status, error) {
                    console.log("error: getPagedList", error);
                    if(onFailCb) {
                        onFailCb(status, error);
                    }
                    else if(options.error) {
                        options.error(status, error);
                    }
                },
            });
        },
        query: function (options) {
            var newOptions = {
                hasQuery:true,
                queryParam: options.queryParam,
                success:options.success,
                error:options.error,
            };
            this.getPagedList(newOptions); 
        },        
        getCount:function(options, cbOnSuccess) {
            var url = this.getListCountUrl();
            url += this.makeQueryString(options);
            $.ajax({
                url:url,
                dataType:"json",
                success:function (response) {
                    //console.log("getCount: success: ", response.body);
                    var values = response.body;
                    if(cbOnSuccess)
                        cbOnSuccess(values);
                }
            });
        },
    });


    _.extend(Nis.Collection.prototype, Nis.Model.Mixin);



})();
