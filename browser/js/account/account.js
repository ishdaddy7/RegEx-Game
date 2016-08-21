app.config(function ($stateProvider) {
    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl',
        resolve: {
        	user: function(AuthService) {
        		return AuthService.getLoggedInUser();
        	},
        	topScore: function(ScoreFactory) {
        		return ScoreFactory.fetchTopScore();
        	},
        	userScore: function(user, ScoreFactory) {
        		return ScoreFactory.fetchUserTopScore(user.id);
        	},
        	answeredQuestions: function(user, AnswerFactory) {
        		return AnswerFactory.fetchUserAnswers(user.id);
        	}
        }
    });
});

app.controller('AccountCtrl', function($scope, user, UserFactory, userScore, topScore, answeredQuestions) {
	$scope.user = user;
	$scope.answeredQuestions = answeredQuestions;
	console.log($scope.answeredQuestions);
	$scope.userScore = userScore[0].score;
	$scope.topScore = topScore[0].score;
	$scope.diffused = 100*($scope.userScore/100)/(4*Math.round($scope.userScore/400));
	console.log($scope);

});