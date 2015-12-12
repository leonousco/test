
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>GetBookMarks -- Share your favorite links online</title>
  <link rel="stylesheet" href="resources/css/test/ember/normalize.css">
  <link rel="stylesheet" type="text/css" href="resources/css/test/ember/bootstrap.css">
  <link rel="stylesheet" href="resources/css/test/ember/style.css">
</head>
<body>

  <script type="text/x-handlebars">
    <nav class="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">GetBookMarks</a>
          
        </div>
        <ul class="nav navbar-nav pull-right">
            <li>{{#link-to 'newstory'}}<span class="glyphicon glyphicon-plus"></span> Submit Story{{/link-to}}</li>
          </ul>
        
      </div>
    </nav>
    <div id="main" class="container">
      {{outlet}}
    </div>
  </script>

  <script type="text/x-handlebars" id="index">
    <div class="row">
      <div class="col-md-4">
        <table class='table'>
          <thead>
            <tr><th>Recent Stories</th></tr>
          </thead>
          {{#each controller}}
            <tr><td>
            {{#link-to 'story' this}}
              {{title}}
            {{/link-to}}
            </td></tr>

          {{/each}}
        </table>
      </div>
      <div class="col-md-8">
        {{outlet}}
      </div>
    </div>
  </script>

  <script type="text/x-handlebars" id="story">
    <h1>{{title}}</h1>
    <h2> by {{fullname}} <small class="muted">{{format-date submittedOn}}</small></h2>
    {{#each tagnames}}
        
        <span class="label label-primary">{{this}}</span>
        
      {{/each}}
    <hr>
    <p class="lead">
      {{excerpt}}
    </p>
    
  </script>

  <script type="text/x-handlebars" id="newstory">
    <form class="form-horizontal" role="form">
      <div class="form-group">
        <label for="title" class="col-sm-2 control-label">Title</label>
        <div class="col-sm-10">
          <input type="title" class="form-control" id="title" name="title" placeholder="Title of the link" required>
        </div>
      </div>
      <div class="form-group">
        <label for="excerpt" class="col-sm-2 control-label">Excerpt</label>
        <div class="col-sm-10">
          <textarea class="form-control" id="excerpt" name="excerpt" placeholder="Short description of the link" required></textarea>
        </div>
      </div>

      <div class="form-group">
        <label for="url" class="col-sm-2 control-label">Url</label>
        <div class="col-sm-10">
          <input type="url" class="form-control" id="url" name="url" placeholder="Url of the link" required>
        </div>
      </div>
      <div class="form-group">
        <label for="tags" class="col-sm-2 control-label">Tags</label>
        <div class="col-sm-10">
          <textarea id="tags" class="form-control" name="tags" placeholder="Comma seperated list of tags" rows="3" required></textarea>
        </div>
      </div>
      <div class="form-group">
        <label for="fullname" class="col-sm-2 control-label">Full Name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="fullname" name="fullname" placeholder="Enter your Full Name like Shekhar Gulati" required>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-success" {{action 'save'}}>Submit Story</button>
        </div>
      </div>
  </form>
  </script>


  <script src="resources/js/test/ember/libs/jquery-1.9.1.js"></script>
  <script src="resources/js/test/ember/libs/handlebars-1.0.0.js"></script>
  <script src="resources/js/test/ember/libs/ember-1.1.2.js"></script>
  <script src="resources/js/test/ember/libs/ember-data.js"></script>
  <script src="resources/js/test/ember/libs/localstorage_adapter.js"></script>
  <script src="resources/js/test/ember/libs/moment.min.js"></script>
  <script src="resources/js/test/ember/app.js"></script>

</body>
</html>
