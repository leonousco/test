<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- 위 3개의 메타 태그는 *반드시* head 태그의 처음에 와야합니다; 어떤 다른 콘텐츠들은 반드시 이 태그들 *다음에* 와야 합니다 -->
    <title>admin page ver 0.1v</title>
    <!-- jQuery -->
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <!-- 합쳐지고 최소화된 최신 CSS -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"> -->
    <!-- 부가적인 테마 -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"> -->
    <!-- 합쳐지고 최소화된 최신 자바스크립트 -->
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
            <a class="navbar-brand" href="admin_main.html">Admin Page test ver 0.1</a>
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
        z    <div class="collapse navbar-collapse navbar-ex1-collapse">
        <ul class="nav navbar-nav side-nav">

                                                                <!-- MANAGE PAGE -->

            <li>
                <a href="javascript:;" data-toggle="collapse" data-target="#demo1"><i class="fa fa-fw fa-arrows-v"></i> 관리자 화면 <i class="fa fa-fw fa-caret-down"></i></a>
                <ul id="demo1" class="collapse">
                    <li>
                        <a href="#">회원가입 view</a>
                    </li>
                    <li>
                        <a href="#">권한부여 view</a>
                    </li>
                    <li>
                        <a href="#">회원 탈퇴 승인 view</a>
                    </li>
                    <li>
                        <a href="#">CCM metadata 관리 view</a>
                    </li>
                </ul>
            </li>
                                                                    <!-- User - PAGE -->
            <li>
                <a></a>

            </li>

            <li>
                <a href="javascript:;" data-toggle="collapse" data-target="#demo6"><i class="fa fa-fw fa-arrows-v"></i> 개발자 화면 <i class="fa fa-fw fa-caret-down"></i></a>
                <ul id="demo6" class="collapse">
                    <li>
                        <a href="#">​회원 탈퇴 view</a>
                    </li>
                    <li>
                        <a href="#">​CCM 등록 view</a>
                    </li>
                    <li>
                        <a href="#">​CCM 수정 view</a>
                    </li>
                </ul>
            </li>


        </ul>
    </div>
</nav>
</div>
<!-- jQuery (부트스트랩의 자바스크립트 플러그인을 위해 필요합니다) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</body>
</html>

