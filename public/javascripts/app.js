angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.comments = [];
    $scope.selected = [];
    $scope.addComment = function() {
      var newcomment = {title:$scope.formContent,upvotes:0};
      $scope.formContent='';
      $http.post('/comments', newcomment).success(function(data){
        $scope.comments.push(data);
      });
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        });
    };
    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
	$scope.incrementUpvotes = function(comment) {
    console.log("Top");
    $scope.selected = [];
    angular.forEach($scope.comments, function(value, key){
      console.log("box");
      if (value.selected == true) {
        console.log("checked");
        $scope.upvote(value);
        $scope.selected.push(value);
      }
    })
    };
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.getAll();

  }

]);
