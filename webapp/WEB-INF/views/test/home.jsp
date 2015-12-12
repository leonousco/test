<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- ì 3ê°ì ë©í íê·¸ë *ë°ëì* head íê·¸ì ì²ìì ìì¼í©ëë¤; ì´ë¤ ë¤ë¥¸ ì½íì¸ ë¤ì ë°ëì ì´ íê·¸ë¤ *ë¤ìì* ìì¼ í©ëë¤ -->
    <title>admin page ver 0.1v</title>
    <!-- jQuery -->
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <!-- í©ì³ì§ê³  ìµìíë ìµì  CSS -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"> -->
    <!-- ë¶ê°ì ì¸ íë§ -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"> -->
    <!-- í©ì³ì§ê³  ìµìíë ìµì  ìë°ì¤í¬ë¦½í¸ -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>


    <!-- Bootstrap Core CSS -->
    <link href="resources/css/home/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="resources/css/home/sb-admin.css" rel="stylesheet">
    <!-- Morris Charts CSS -->
    <link href="resources/css/home/plugins/morris.css" rel="stylesheet">
    <!-- Custom Fonts -->
    <link href="resources/css/home/font-awesome.min.css" rel="stylesheet" type="text/css">


</head>
<body>
    <div id = "wrapper">
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
            </button>
            <a class="navbar-brand" href="admin_page.html">Admin Page test ver 0.1</a>

            <a class="navbar-brand" href="home/nis">NIS PAGE</a>
            <a class="navbar-brand" >/</a>
            <a class="navbar-brand" href="home/ccm">CCM PAGE </a>


        </div>
        <!-- Top Menu Items -->
        <ul class="nav navbar-right top-nav">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bell"></i> <b class="caret"></b></a>
                <ul class="dropdown-menu alert-dropdown">
                    <li>
                        <a href="#">Alert Name <span class="label label-default">Alert Badge</span></a>
                    </li>
                    <li>
                        <a href="#">Alert Name <span class="label label-primary">Alert Badge</span></a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="#">View All</a>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> baron <b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li>
                        <a href="#"><i class="fa fa-fw fa-user"></i> Profile</a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-fw fa-envelope"></i> Inbox</a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-fw fa-gear"></i> Settings</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="#"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->

</nav>
</div>
<!-- jQuery (ë¶í¸ì¤í¸ë©ì ìë°ì¤í¬ë¦½í¸ íë¬ê·¸ì¸ì ìí´ íìí©ëë¤) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</body>
</html>
