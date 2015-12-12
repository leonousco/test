

window.testEnvGet = function(name, cb) {
    var localPort = '8080';
    var testPort = '8880';
    var devPort = '8580';
    var localIp = "127.0.0.1";
    var basilIp = "192.168.0.169";
    var leoIp = "192.168.0.38";
    var tomketIp = "192.168.0.153"
    var devIp = "dev.nousco.net"
    //var devIp = "192.168.0.169";
    //var leoIp = "192.168.0.38";
    //var basilIp = "192.168.0.169";
    //var ipaddr = basilIp;
    //var port = localPort;
    //var ipaddr = localIp;
    //var ipaddr = basilIp;

    //var ipaddr = localIp;
    //var port = localPort;
    var demog_port = testPort;

    //var ipaddr = leoIp;
    //var ipaddr = tomketIp;
    //var port = testPort;


    //var ipaddr = tomketIp;
    //var port = testPort;

    var ipaddr = devIp;
    var port = devPort;
    var as_ipaddr = devIp;
    var as_port = devPort;

    //var env = 'staging';
    var env = 'develop';
    if(env == 'staging') {
        ipaddr = devIp;
        port = devPort;
        as_ipaddr = devIp;
        as_port = devPort;
    }
    else if(env == 'develop') {
        ipaddr = tomketIp;
        port = testPort;
        as_ipaddr = tomketIp;
        as_port = testPort;
    }
    else if(env == 'basil') {
        ipaddr = basilIp;
        port = localPort;
        as_ipaddr = tomketIp;
        as_port = testPort;
    }
    else if(env == 'leo') {
        ipaddr = leoIp;
        port = localPort;
        as_ipaddr = tomketIp;
        as_port = testPort;
    }


    var token = localStorage.getItem("token");
    var ret = {
        "serverInfos":[
            {
                "serverName":"nmpi",
                "scheme":"http",
                "hostUrl":ipaddr,
                "contextPath":"nmpi_server",
                "servletPath":null,
                "apiPath":"api/v1",
                "url":"http://"+ipaddr+":"+port+"/nmpi_server",
                "apiUrl":"http://"+ipaddr+":"+port+"/nmpi_server/api/v1",
            },
            {
                "serverName":"admin",
                "scheme":"http",
                "hostUrl":"127.0.0.1",
                "hostPort":"8080",
                "contextPath":"demog_server",
                "servletPath":null,
                "apiPath":"api/v1",
                "url":"http://127.0.0.1:8080/demog_server",
                "apiUrl":"http://192.168.0.153:8880/admin_server/nmpi/v1/admin"
            },
            {
                "serverName":"ccm",
                "scheme":"http",
                "hostUrl":"127.0.0.1",
                "hostPort":"8080",
                "contextPath":"demog_server",
                "servletPath":null,
                "apiPath":"api/v1",
                "url":"http://127.0.0.1:8080/demog_server",
                "apiUrl":"http://192.168.0.153:8880/ccm_server/api/v1"
            },
            {
                "serverName":"authentication_server",
                "scheme":"http",
                "hostUrl":as_ipaddr,
                "hostPort":as_port,
                "contextPath":"authentication_server",
                "servletPath":null,
                "apiPath":"api/v1",
                "url":'http://'+as_ipaddr+':'+as_port+'/authentication_server',
                "apiUrl":"http://"+as_ipaddr+":"+as_port+"/authentication_server"
            },
            {
                "serverName":"eval",
                "scheme":"http",
                "hostUrl":'127.0.0.1',
                "hostPort":'8080',
                "contextPath":"ccm_server",
                "servletPath":null,
                "apiPath":"api/v1",
                "url":"http://127.0.0.1:8080/ccm_server",
                "apiUrl":"http://192.168.0.153:8880/ccm_server/api/v1/EvaluationRequest"
            }

        ]};
    cb(ret);
    return ret;
};

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.testEnvGet = function(name, cb) {
        var ret = {
            "serverInfos":[
                {
                    "serverName":"nhp",
                    "scheme":"http",
                    "hostUrl":"127.0.0.1",
                    "hostPort":port,
                    "contextPath":"nhp_server",
                    "servletPath":null,
                    "apiPath":"api/v1",
                    "url":"http://127.0.0.1:"+port+"/nhp_server",
                    "apiUrl":"http://127.0.0.1:"+port+"/nhp_server/api/v1"
                },
                {
                    "serverName":"vs",
                    "scheme":"http",
                    "hostUrl":"127.0.0.1",
                    "hostPort":port,
                    "contextPath":"vs",
                    "servletPath":null,
                    "apiPath":"api/v1",
                    "url":"http://127.0.0.1:"+port+"/vs",
                    "apiUrl":"http://127.0.0.1:"+port+"/vs/api/v1"
                }
            ]};
        cb(ret);
        return ret;
    };



})();

