angular.module('deft.arrow', [])
	.directive('arrow', function(){
        return {
            restrict: 'A',
            scope: { position: '=', width: "=", height: "=", align: "=" },
            replace: true,
            template: '' +
                '<div class="arrow" style="-webkit-transform: {{arrow.rotation}}">' +
                    '<div class="left" style="width: {{arrow.right.width}}px; height: {{arrow.height}}px; position: relative; overflow: hidden">' +
                        '<div style="width: {{2*arrow.right.x}}px; height: {{2*arrow.right.y}}px; position: absolute; top: {{arrow.height-arrow.right.y}}px; left: {{arrow.right.width-arrow.right.x}}px; -webkit-transform: {{arrow.right.rotation}}"></div>' +
                    '</div>' +
                    '<div class="left" style="width: {{arrow.left.width}}px; height: {{arrow.height}}px; position: relative; overflow: hidden">' +
                        '<div style="width: {{2*arrow.left.x}}px; height: {{2*arrow.left.y}}px; position: absolute; top: {{arrow.height-arrow.left.y}}px; right: {{arrow.left.width-arrow.left.x}}px; -webkit-transform: {{arrow.left.rotation}}"></div>' +
                    '</div>' +
                '</div>',
            link: function($scope){
                $scope.arrow = {
                    width: $scope.width ? $scope.width: 100,
                    height: $scope.height ? $scope.height: 100,
                    align: $scope.align ? $scope.align: 'center',
                    left: { width: 0, x: 0, y: 0 },
                    right: { width: 0, x: 0, y: 0 },
                    rotation: null
                };
                if($scope.position) {
                    switch ($scope.position) {
                        case 'top': $scope.arrow.rotation = 'rotate(0deg)'; break;
                        case 'left': $scope.arrow.rotation = 'rotate(270deg)'; break;
                        case 'right': $scope.arrow.rotation = 'rotate(90deg)'; break;
                        case 'bottom': $scope.arrow.rotation = 'rotate(180deg)'; break;
                        default: break;
                    }
                }
                if ($scope.arrow.align == 'center') $scope.arrow.left.width = $scope.arrow.width / 2;
                if ($scope.arrow.align == 'left') $scope.arrow.left.width = $scope.arrow.width;
                $scope.arrow.right.width = $scope.arrow.width - $scope.arrow.left.width;

                createArrow(false);
                function createArrow(border, lifeParam){
                    var pos = (typeof lifeParam === 'undefined') ? 'right' : 'left';

                    var angle1 = Math.atan($scope.arrow[pos].width/$scope.arrow.height);
                    var angle2 = Math.atan($scope.arrow.height/$scope.arrow[pos].width);
                    if(angle2 < angle1) {
                        $scope.arrow[pos].x = Math.sin(angle2) * $scope.arrow[pos].width;
                        $scope.arrow[pos].y = Math.cos(angle2) * $scope.arrow[pos].width;
                    } else {
                        $scope.arrow[pos].x = Math.sin(angle1) * $scope.arrow.height;
                        $scope.arrow[pos].y = Math.cos(angle1) * $scope.arrow.height;
                    }

                    if(pos == 'left') $scope.arrow.left.rotation = 'rotate(' + -angle1 + 'rad)';
                    else $scope.arrow.right.rotation = 'rotate(' + angle1 + 'rad)';

                    if (typeof lifeParam === 'undefined') createArrow(border, false);
                }
            }
        }
    })
;