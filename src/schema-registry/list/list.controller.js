var angular = require('angular');
var angularAPP = angular.module('angularAPP');

var SubjectListCtrl = function ($scope, $rootScope, $log, $mdMedia, SchemaRegistryFactory, env,$http){

  $log.info("Starting schema-registry controller : list ( initializing subject cache )");

  function addCompatibilityValue() {
    angular.forEach($rootScope.allSchemas, function (schema) {
      SchemaRegistryFactory.getSubjectConfig(schema.subjectName).then(
        function success(config) {
          schema.compatibilityLevel = config.compatibilityLevel;
        },
        function errorCallback(response) {
          $log.error(response);
        });
    })
  }

  /*
   * Watch the 'newCreated' and update the subject-cache accordingly
   */

  $scope.$watch(function () {
    return $rootScope.listChanges;
  }, function (a) {
    if (a !== undefined && a === true) {
      loadCache(); //When new is created refresh the list
      $rootScope.listChanges = false;
    }
  }, true);
  // listen for the event in the relevant $scope
  $scope.$on('newEvolve', function (event, args) {
    loadCache();
  });

  $scope.$watch(function () {
    return env.getSelectedCluster().NAME;
  }, function (a) {
    $scope.cluster = env.getSelectedCluster().NAME;
    loadCache(); //When cluster change, reload the list
  }, true);
  /**
   * Load cache by fetching all latest subjects
   */
  function loadCache() {
    $rootScope.allSchemas = [];
    var promise = SchemaRegistryFactory.refreshLatestSubjectsCACHE();
    promise.then(function (cachedData) {
      $rootScope.allSchemas = cachedData;
      //关闭这个，他会去查询所有的schema的兼容级别
      // addCompatibilityValue();
    }, function (reason) {
      $log.error('Failed at loadCache : ' + reason);
    }, function (update) {
      $log.debug('Got notification: ' + update);
    });
  }

  //给每页的条数赋值
  var itemsPerPage = (window.innerHeight - 355) / 48;
  Math.floor(itemsPerPage) < 3 ? $scope.itemsPerPage = 3 : $scope.itemsPerPage = Math.floor(itemsPerPage);
    $rootScope.pagination= {
        totalData:0,
        currentPage :1,
        itemsPerPage:0
    }

    $rootScope.pagination.itemsPerPage = $scope.itemsPerPage;


    $scope.getSchemaDetail = function (schema) {
        //请求过了
        if(schema.requested !== undefined && schema.requested){
            return;
        }
        //将请求状态设为ture
        schema.requested = true;

        // var schemaData =getSchemaByName(schema.subjectName);
        // schema.version = 12;
        // schema.id = 1;
        // 需要在网络上查找
        var url = env.SCHEMA_REGISTRY() + '/subjects/' + schema.subjectName + '/versions/latest';
        $http.get(url).then(function(result){
            // $timeout(function(){
            //      $scope.apply(function(){
            var data = result.data;
            schema.version = data.version // version
            schema.id = data.id            // id
            schema.schema = data.schema   // schema - in String - schema i.e. {\"type\":\"record\",\"name\":\"User\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"}]}
            schema.Schema = JSON.parse(data.schema)// js type | name | doc | fields ...
            //       });
            // });

        },function(data){
            $log.info("error:"+data)
        });

        $log.info("id:"+schema.id);

    }


};

SubjectListCtrl.$inject = ['$scope', '$rootScope', '$log', '$mdMedia', 'SchemaRegistryFactory', 'env','$http'];

angularAPP.controller('SubjectListCtrl', SubjectListCtrl);

//In small devices the list is hidden
// $scope.$mdMedia = $mdMedia;
// $scope.$watch(function () {
//   return $mdMedia('gt-sm');
// }, function (display) {
//   $rootScope.showList = display;
// });
