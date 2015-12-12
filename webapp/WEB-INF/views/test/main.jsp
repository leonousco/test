
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>ValueSet UI : ${requestPath}  </title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no">
<link rel="stylesheet" type="text/css"	href="resources/css/normalize.css" media="all" />
<link rel="stylesheet" type="text/css"	href="resources/css/myschedule/base.css" media="all" />
<link rel="stylesheet" type="text/css"	href="resources/css/test/mainmenu.css" media="all" />
</head>
<body>	
	<script src="resources/js/react/react-0.13.3.min.js"></script>
	<script src="resources/js/react/JSXTransformer-0.13.3.js"></script>
	<!-- script src="resources/js/react/react-json-table.min.js"></script> -->
	<script src="resources/js/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/require/require.js"></script>	
	<script type="text/javascript" src="resources/js/lib/underscore-1.7.0.min.js"></script>
	<script type="text/jsx" src="resources/js/test/main.js"></script>
	<script type="text/jsx">
		var data="${requestPath}";
		var childsLink="${childsLink}";
	    $(function () {
	        renderClient(data, childsLink);
	    });
	</script>	
</body>
</html>