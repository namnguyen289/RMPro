angular.module('hoss_app.controllers', [])


    .controller('IntroCtrl', function ($scope) {

    })

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {
        $scope.productData = {};
        $ionicModal.fromTemplateUrl('templates/app/restaurant/product.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        // Triggered in the product modal to close it
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        // Open the product modal
        $scope.productDetail = function () {
            $scope.modal.show();
        };
        $scope.doOrder = function () {
//            console.log('Doing login', $scope.loginData);
            //$state.go("dashboard.charts");
            $timeout(function () {
                $scope.closeModal();
            }, 1000);
        };

        // Click like product
        $scope.doLike = function(){
            var btn_like = angular.element(document.querySelector('.product-like'));
            btn_like.find('i').toggleClass('active');
        }
    })

