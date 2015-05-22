(function() {
  'use strict';

  angular.module('myou.dashboard.servicemonitor')
    .factory('InterfacesService', InterfacesService)
    .factory('CalleeService', CalleeService);


  function InterfacesService($http, $q, Constant) {

    var interfacesService = {};
    interfacesService.data = {};
    interfacesService.data.appId = null;

    interfacesService.getAppId = function(appKey) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/app_id' + '?app_key=' + appKey).success(function(data) {
        interfacesService.data.appId = data.app_id;
      });
    };

    interfacesService.getInterfaces = function(appId, cb) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/interfaces/' + appId).success(function(data) {
        interfacesService.data.interfaces = data;
        cb();
      });
    };

    interfacesService.createInterface = function(callerInterface, cb) {
      return $http.post(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/interfaces' + '?action=create_caller', callerInterface)
        .success(function(data) {
          cb(null);
        })
        .error(function(err) {
          cb('error', err.message);
        });
    };

    interfacesService.modifyInterface = function(interfaceId, callerInterface, cb) {
      return $http.post(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/interfaces/' + interfaceId, callerInterface)
        .success(function(data) {
          cb(null);
        })
        .error(function(err) {
          cb('error', err.message);
        });
    };

    interfacesService.deleteInterface = function(interfaceId, cb) {
      return $http.delete(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/interfaces/' + interfaceId)
        .success(function(data) {
          cb(null);
        })
        .error(function(err) {
          cb('error', err.message);
        });
    };

    return interfacesService;

  }

  function CalleeService($http, $q, Constant) {
    var INTERFACES = 'interfaces';
    var CALLEE_INTERFACE = 'callee_interfaces_report';

    var calleeService = {};
    calleeService.data = {};

    calleeService.getCalleeList = function(appId, interfaceId, startDateTime, endDateTime, cb) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + INTERFACES + '/' + appId + '/' + CALLEE_INTERFACE + '/' + interfaceId + '?start_datetime=' + startDateTime + '&end_datetime=' + endDateTime)
        .success(function(data) {
          calleeService.data.calleeList = data;
          cb();
        });
    };

    calleeService.createCallee = function(calleeInterface, cb) {
      return $http.post(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + INTERFACES + '?action=create_callee', calleeInterface)
        .success(function(data) {
          cb(null);
        })
        .error(function(err) {
          cb('error', err.message);
        });
    };

    calleeService.modifyCallee = function(calleeId, calleeInterface, cb) {
      return $http.put(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + INTERFACES + '/' + calleeId, calleeInterface)
        .success(function(data) {
          cb(null);
        })
        .error(function(err) {
          cb('error', err.message);
        });
    };

    calleeService.deleteCallee = function(calleeId, cb) {
      return $http.delete(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + INTERFACES + '/' + calleeId)
        .success(function(data) {
          cb(null);
        })
        .error(function(err) {
          cb('error', err.message);
        });
    };

    calleeService.getAllCalleeList = function(cb) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + INTERFACES)
        .success(function(data) {
          calleeService.data.allCalledList = data;
          cb();
        });
    };

    calleeService.bindCallee = function(data, cb) {
      return $http.post(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + INTERFACES + '?action=bind', data)
        .success(function(data) {
          cb(null);
        })
        .error(function(err) {
          cb('error', err.message);
        });
    };

    calleeService.unbindCallee = function(callerId, calleeId, cb) {
      return $http.delete(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + 'caller_callee?caller_interface_id=' + callerId + '&callee_interface_id=' + calleeId)
        .success(function(data) {
          cb(null);
        })
        .error(function(err) {
          cb('error', err.message);
        });
    };

    calleeService.getCalleeDetail = function(callerId, calleeId, startDate, endDate, limit, skip, cb) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/interface_details' + '?caller_interface_id=' + callerId + '&callee_interface_id=' + calleeId + '&start_datetime=' + startDate + '&end_datetime=' + endDate + '&limit=' + limit + '&skip=' + skip)
        .success(function(data) {
          cb();
        });
    };

    return calleeService;
  }
})();
