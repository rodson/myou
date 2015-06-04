(function() {
  'use strict';

  /**
   * @ngInject
   */
  function InterfacesConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor.interfaces', {
        url: '/interfaces',
        templateUrl: 'app/dashboard/products/servicemonitor/interfaces/interfaces.html',
        controllerAs: 'vm',
        controller: InterfacesCtrl,
        resolve: InterfacesCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function InterfacesCtrl(localStorageService, $filter, $mdDialog, $mdToast, InterfacesService, CalleeService) {
    var vm = this;
    var now = new Date();
    vm.enddate = $filter('date')(now, 'yyyy-MM-dd HH:mm:ss');
    vm.startdate = $filter('date')(now.getTime() - 5 * 60 * 1000, 'yyyy-MM-dd HH:mm:ss');
    vm.treeGridCtrl = {};
    vm.treeData = [];
    vm.expandingProperty = {
      field: 'ID',
      sortable: true
    };

    vm.appId = localStorageService.get('appId');

    vm.colDefs = [{
      field: 'ID',
      displayName: '接口ID',
    }, {
      field: 'Name',
      displayName: '接口名'
    }, {
      field: 'Des',
      displayName: '接口描述'
    }, {
      field: 'AP',
      displayName: '告警率'
    }, {
      field: 'RCAP',
      displayName: '返回码告警率'
    }, {
      field: 'TCAP',
      displayName: '时延告警率'
    }, {
      field: 'ATC',
      displayName: '平均时延'
    }, {
      field: 'MTC',
      displayName: '最大时延'
    }, {
      field: 'MITC',
      displayName: '最小时延'
    }, {
      field: 'CC',
      displayName: '调用次数'
    }, {
      field: 'Edit',
      displayName: '编辑',
      cellTemplate: ['<md-button class="md-icon-button" aria-label="编辑" title="编辑" ng-click="cellTemplateScope.click($event, row)">', '<ng-md-icon icon="mode_edit" size="25"></ng-md-icon></md-button>'].join(''),
      cellTemplateScope: {
        //cellTemplateScope.click($event, row)
        //为什么这个地方一定要传入$event：告诉$dialog是这里触发你的，否则动画会有问题
        click: function(event, data) {
          var dt = {
            interface_id: data.branch.ID,
            interface_name: data.branch.Name,
            interface_desc: data.branch.Des
          };
          vm.showEditModal(event, dt);
        }
      }
    }, {
      field: 'Del',
      displayName: '删除',
      cellTemplate: ['<md-button class="md-icon-button" aria-label="删除" title="删除" ng-click="cellTemplateScope.click($event, row)">', '<ng-md-icon icon="delete" size="25"></ng-md-icon></md-button>'].join(''),
      cellTemplateScope: {
        click: function(event, data) {
          var dt = {
            interface_id: data.branch.ID,
            interface_name: data.branch.Name,
            interface_desc: data.branch.Des
          };
          vm.showDeleteModal(event, dt);
        }
      }
    }, {
      field: 'Det',
      displayName: '操作',
      cellTemplate: ['<md-button class="md-icon-button" aria-label="..." ng-attr-title="{{ row.branch.IsMain ? \'添加被调接口\' : \'详细信息\' }}"', 'ng-click="cellTemplateScope.click($event, row)">', '<ng-md-icon icon="add_circle" size="25" ng-if="row.branch.IsMain"></ng-md-icon>', '<ng-md-icon icon="info" size="25" ng-if="!row.branch.IsMain"></ng-md-icon>', '</md-button>'].join(''),
      cellTemplateScope: {
        click: function(event, data) {
          if (data.branch.IsMain) {
            vm.showCalleeAddModal(event, data.branch.ID);
          } else {
            var dt = {
              callerId: data.branch.CallerId,
              callee_interface_id: data.branch.ID,
              callee_interface_name: data.branch.Name
            };
            vm.showCalleeDetail(event, dt);
          }
        }
      }
    }];

    vm.getInterfacesInternal = function() {
      InterfacesService.getInterfaces(vm.appId, function() {
        vm.treeData = [];
        vm.interfaceList = InterfacesService.data.interfaces;
        vm.interfaceList.forEach(function(obj) {
          CalleeService.getCalleeList(vm.appId, obj.interface_id, vm.startdate, vm.enddate, function() {
            var data = CalleeService.data.calleeList;
            var temp = {
              'IsMain': true,
              'ID': obj.interface_id,
              'Name': obj.interface_name,
              'Des': obj.interface_desc,
              'AP': '-',
              'RCAP': '-',
              'TCAP': '-',
              'ATC': '-',
              'MTC': '-',
              'MITC': '-',
              'CC': '-',
              'Edit': '',
              'Del': '',
              'Det': ''
            };
            temp.children = [];
            for (var i = 0; i < data.length; i++) {
              var tempChild = {
                'IsMain': false,
                'CallerId': obj.interface_id,
                'ID': data[i].callee_interface_id,
                'Name': data[i].callee_interface_name,
                'Des': data[i].callee_interface_desc,
                'AP': data[i].alert_percent,
                'RCAP': data[i].return_code_alert_percent,
                'TCAP': data[i].time_cost_alert_percent,
                'ATC': data[i].avg_time_cost,
                'MTC': data[i].max_time_cost,
                'MITC': data[i].min_time_cost,
                'CC': data[i].call_count,
                'Edit': '',
                'Del': '',
                'Det': ''
              };
              temp.children.push(tempChild);
            }
            vm.treeData.push(temp);
          });
        });
      });
    };

    vm.showAddModalDialog = function(ev, dt) {
      $mdDialog.show({
        controller: AddModalDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'addInterfaceModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              appId: vm.appId
            };
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showEditModal = function(ev, dt) {
      $mdDialog.show({
        controller: EditModalDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'addInterfaceModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              callerInterface: dt
            };
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showDeleteModal = function(ev, dt) {
      $mdDialog.show({
        controller: DeleteInterfaceModalDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'deleteInterfaceModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return dt;
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showCalleeAddModal = function(ev, callerId) {
      $mdDialog.show({
        controller: AddCalleeModalDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'addCalleeModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              appId: vm.appId,
              callerId: callerId
            };
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showCalleeDetail = function(ev, dt) {
      $mdDialog.show({
        controller: DetialDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'calleeDetailModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              callerId: dt.callerId,
              calleeName: dt.callee_interface_name,
              calleeId: dt.callee_interface_id,
              startDate: vm.startdate,
              endDate: vm.enddate
            };
          }
        }
      }).then(function(answer) {}, function() {});
    };

    vm.showAlert = function(msg) {
      $mdToast.show(
        $mdToast.simple()
        .content(msg)
        .position('top right')
        .hideDelay(1500)
      );
      vm.getInterfacesInternal();
    };

    vm.getInterfacesInternal();
  }

  InterfacesCtrl.resolve = {
    /**
     * @ngInject
     */
    getAppId: function(getAppId) {
      return getAppId;
    }
  };

  /**
   * @ngInject
   */
  function AddModalDialogCtrl($mdDialog, $timeout, data, InterfacesService) {
    var vm = this;
    vm.title = '添加接口';
    vm.ok = function() {
      if (!vm.interfaceName || !vm.interfaceDesc) {
        return;
      }
      var callerInterface = {
        app_id: data.appId,
        interface_name: vm.interfaceName,
        interface_desc: vm.interfaceDesc
      };

      InterfacesService.createInterface(callerInterface, function(error) {
        if (error) {
          vm.errortip = error.message;
          return;
        }
        $mdDialog.hide('添加成功');
      });
      $timeout(function() {
        vm.errortip = '';
      }, 2000);
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function EditModalDialogCtrl($mdDialog, $timeout, data, InterfacesService) {
    var vm = this;
    vm.title = '编辑接口';
    vm.interfaceName = data.callerInterface.interface_name;
    vm.interfaceDesc = data.callerInterface.interface_desc;
    vm.ok = function() {
      if (!vm.interfaceName || !vm.interfaceDesc) {
        return;
      }
      data.callerInterface.interface_name = vm.interfaceName;
      data.callerInterface.interface_desc = vm.interfaceDesc;
      InterfacesService.modifyInterface(data.callerInterface.interface_id, data.callerInterface, function(error) {
        if (error) {
          vm.errortip = error.message;
          return;
        }
        $mdDialog.hide('更新成功');
      });
      $timeout(function() {
        vm.errortip = '';
      }, 2000);
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function AddCalleeModalDialogCtrl($mdDialog, $timeout, data, CalleeService) {
    var vm = this;
    var appId = data.appId;
    var callerId = data.callerId;

    vm.calleeInterface = {
      app_id: appId,
      caller_interface_id: callerId,
      interface_name: '',
      interface_desc: ''
    };

    CalleeService.getAllCalleeList(function() {
      var list = CalleeService.data.allCalledList;
      for (var i = 0; i < list.length; i++) {
        list[i].display = list[i].app_name + ' (' + list[i].interface_name + ')';
      }
      vm.calleeList = list;
    });

    vm.usePublicChange = function() {
      if (vm.usePublic && vm.calleeList[0] && !vm.selectCallee) {
        vm.selectCallee = vm.calleeList[0];
      }
    };

    vm.ok = function(event) {
      if (vm.usePublic) {
        if (vm.selectCallee && vm.selectCallee.interface_id) {
          CalleeService.bindCallee({
            caller_interface_id: callerId,
            callee_interface_id: vm.selectCallee.interface_id
          }, function(error) {
            if (error) {
              vm.errortip = error.message;
              return;
            }
            $mdDialog.hide('添加成功');
          });
        } else {
          vm.errortip = '请选择一个公共接口';
        }
        $timeout(function() {
          vm.errortip = '';
        }, 2000);

      } else {
        if (!vm.interfaceName || !vm.interfaceDesc) {
          return;
        }
        vm.calleeInterface.interface_name = vm.interfaceName;
        vm.calleeInterface.interface_desc = vm.interfaceDesc;
        CalleeService.createCallee(vm.calleeInterface, function(error) {
          if (error) {
            vm.errortip = error.message;
            return;
          }
          $mdDialog.hide('添加成功');
        });
        $timeout(function() {
          vm.errortip = '';
        }, 2000);
      }
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function DetialDialogCtrl($mdDialog, data, CalleeService) {
    var vm = this;
    vm.calleeName = data.calleeName;

    vm.totalItems = 0;
    vm.limit = 10;
    vm.skip = 0;
    vm.pageCount = 0;
    vm.currentPage = 1;

    vm.getData = function() {
      CalleeService.getCalleeDetail(data.callerId, data.calleeId, data.startDate, data.endDate, vm.limit, vm.skip, function() {
        console.log(CalleeService.data);
        vm.calleeList = CalleeService.data.calleeDetail.data;
        vm.totalItems = CalleeService.data.calleeDetail.total;
        vm.pageCount = vm.totalItems / vm.limit;

        vm.calleeList = [{
          time_cost: 100,
          return_code: 404,
          caller_ip: '172.18.49.89',
          callee_ip: '172.18.90.90',
          callee_port: 409,
          created_at: '2015-05-04 10:09:08'
        }, {
          time_cost: 200,
          return_code: 400,
          caller_ip: '172.18.49.189',
          callee_ip: '172.18.90.910',
          callee_port: 4000,
          created_at: '2015-05-05 10:09:08'
        }];
      });
    };

    vm.getNextPage = function(page) {
      vm.skip = (page - 1) * vm.limit;
      vm.getData();
    };

    vm.ok = function() {
      $mdDialog.hide();
    };

    vm.getData();
  }

  /**
   * @ngInject
   */
  function DeleteInterfaceModalDialogCtrl($mdDialog, $timeout, data, InterfacesService) {
    var vm = this;
    vm.interfaceName = data.interface_name;

    vm.ok = function() {
      InterfacesService.deleteInterface(data.interface_id, function(error) {
        if (error) {
          vm.errortip = error.message;
          return;
        }
        $mdDialog.hide('删除成功');
      });
      $timeout(function() {
        vm.errortip = '';
      }, 2000);
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('InterfacesCtrl', InterfacesCtrl)
    .config(InterfacesConfig);

})();
