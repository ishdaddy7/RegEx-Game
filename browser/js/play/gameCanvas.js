app.directive('gameCanvas', function($window, $injector) {

  var linkFn = function(scope, ele, attrs) {
    console.log('linkFn ran - line 4 of gameCanvas');
    scope.gameConfig = {
      width: 800,
      height: 600,
      scoreIncrement: 10
    }

    RegexGame.game = new Phaser.Game(scope.gameConfig.width, scope.gameConfig.height, Phaser.AUTO, 'playGame');

    RegexGame.game.scope = scope;

    RegexGame.game.state.add('Boot', RegexGame.Boot);
    RegexGame.game.state.add('Preload', RegexGame.Preload);
    RegexGame.game.state.add('MainMenu', RegexGame.MainMenu);
    RegexGame.game.state.add('Game', RegexGame.Game);
    RegexGame.game.state.start('Boot');

    console.log('line 21 of gameCanvasjs', RegexGame.game.scope)
    var w = angular.element($window);
    w.bind('resize', function(evt) {
      // If the window is resized
    });

  };

  return {
/*    scope: {
      ngModel: '=',
      mapId: '='
    },*/
    template: '<div ng-class="currentBomb ? \'blurry\' : \'not-blurry\'" id=\'playGame\' balls></div><bomb-view ng-if="currentBomb" ></bomb-view>',
    link: linkFn
  }
})
