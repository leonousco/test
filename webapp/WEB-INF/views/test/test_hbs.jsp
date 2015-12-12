
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Handlebars.js Tutorial</title>
</head>
<body>

  <h1>List of Animals and Sounds</h1>
  <div id="animalList">
  </div>
 
  <!-- HANDLEBARS TEMPLATE -->
  <script id="animalTemplate" type="text/x-handlebars-template">
    {{#if animals}}
      <ul>
        {{#each animals}} 
          <li class="animal">{{type}} says {{sound}}</li>
        {{/each}} 
      </ul>
    {{else}}
      <p>There are no animals.</p>
    {{/if}}

    <p>{{helper}}</p>
    <p>{{multiply 7 16}}</p>
  </script>
 
  <!-- REQUIRE HANDLEBARS -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="resources/js/test/hbs/handlebars.js"></script>
  <script src="resources/js/test/hbs/helpers.js"></script>

  <!-- RENDER TEMPLATE AFTER EVERYTHING ELSE LOADED -->
  <script src="resources/js/test/hbs/animalList.js"></script>
 
</body>
</html>