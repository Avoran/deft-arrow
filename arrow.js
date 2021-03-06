angular.module('deft.arrow', [])
  .directive('arrow', function () {
    return {
      replace: true,
      scope: {arrowData: '=arrow'},
      template: '' +
      '<div class="arrow" style="{{ transform(arrow.rotation) }}" data-ng-style="outerCss()">' +
        '<div style="width:{{arrow.right.width}}px;height:{{arrow.height}}px;position:relative;overflow:hidden;float:left">' +
          '<div class="triangle" style="width:{{2*arrow.right.x}}px;height:{{2*arrow.right.y}}px;position:absolute;top:{{arrow.height-arrow.right.y}}px;left:{{arrow.right.width-arrow.right.x}}px;{{ transform(arrow.right.rotation) }}"></div>' +
        '</div>' +
        '<div style="width:{{arrow.left.width}}px;height:{{arrow.height}}px;position:relative;overflow:hidden;float:left">' +
          '<div class="triangle" style="width:{{2*arrow.left.x}}px;height:{{2*arrow.left.y}}px;position:absolute;top:{{arrow.height-arrow.left.y}}px;right:{{arrow.left.width-arrow.left.x}}px;{{ transform(arrow.left.rotation) }}"></div>' +
        '</div>' +
      '</div>',
      link: function ($scope) {
        $scope.arrow = defaults($scope.arrowData, {
          width: 100,
          height: 100,
          align: 'center',
          side: 'top',
          position: 'center',
          left: {width: 0, x: 0, y: 0},
          right: {width: 0, x: 0, y: 0}
        });

        switch ($scope.arrow.side) {
          case 'top':
            $scope.arrow.rotation = 'rotate(0deg)';
            break;
          case 'left':
            $scope.arrow.rotation = 'rotate(270deg)';
            break;
          case 'right':
            $scope.arrow.rotation = 'rotate(90deg)';
            break;
          case 'bottom':
            $scope.arrow.rotation = 'rotate(180deg)';
            break;
          default:
            break;
        }

        if ($scope.arrow.align == 'center') $scope.arrow.left.width = $scope.arrow.width / 2;
        if ($scope.arrow.align == 'left') $scope.arrow.left.width = $scope.arrow.width;
        $scope.arrow.right.width = $scope.arrow.width - $scope.arrow.left.width;

        $scope.transform = function (rotation) {
          return "transform:" + rotation + ";-webkit-transform:" + rotation + ";-ms-transform:" + rotation + ";";
        };

        $scope.outerCss = function () {
          var css = {position: 'absolute'};
          switch ($scope.arrow.side) {
            case 'bottom':
            case 'top':
              css[$scope.arrow.side] = '-' + $scope.arrow.height + 'px';
              setCssPositioningProps($scope.arrow.position, css);
              break;
            case 'left':
            case 'right':
              css[$scope.arrow.side] = '-' + Math.floor(($scope.arrow.width + $scope.arrow.height) / 2) + 'px';
              setCssPositioningProps($scope.arrow.position, css);
          }

          return css;
        };

        function setCssPositioningProps(positioning, cssObj) {
          if (positioning == 'center') {
            if ($scope.arrow.side == 'top' || $scope.arrow.side == 'bottom') {
              cssObj['left'] = '50%';
              cssObj['marginLeft'] = '-' + $scope.arrow.width / 2 + 'px';
            } else {
              cssObj['top'] = '50%';
              cssObj['marginTop'] = '-' + $scope.arrow.height / 2 + 'px';
            }

            return;
          }

          for (var key in positioning) {
            if (!positioning.hasOwnProperty(key)) continue;
            cssObj[key] = positioning[key];
          }
        }

        createArrow();
        function createArrow(lifeParam) {
          var pos = (typeof lifeParam === 'undefined') ? 'right' : 'left';

          var angle1 = Math.atan($scope.arrow[pos].width / $scope.arrow.height);
          var angle2 = Math.atan($scope.arrow.height / $scope.arrow[pos].width);
          if (angle2 < angle1) {
            $scope.arrow[pos].x = Math.sin(angle2) * $scope.arrow[pos].width;
            $scope.arrow[pos].y = Math.cos(angle2) * $scope.arrow[pos].width;
          } else {
            $scope.arrow[pos].x = Math.sin(angle1) * $scope.arrow.height;
            $scope.arrow[pos].y = Math.cos(angle1) * $scope.arrow.height;
          }

          if (pos == 'left') $scope.arrow.left.rotation = 'rotate(' + -angle1 + 'rad)';
          else $scope.arrow.right.rotation = 'rotate(' + angle1 + 'rad)';

          if (typeof lifeParam === 'undefined') createArrow(false);
        }

        function defaults(origObj, defaultObj) {
          var obj = JSON.parse(JSON.stringify(origObj));
          for (var key in defaultObj) {
            if (!defaultObj.hasOwnProperty(key)) continue;
            if (!obj.hasOwnProperty(key)) obj[key] = defaultObj[key];
            else if (obj[key] instanceof Object) obj[key] = defaults(obj[key], defaultObj[key]);
          }

          return obj;
        }
      }
    }
  })
;
