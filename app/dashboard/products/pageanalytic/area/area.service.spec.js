'use strict';

describe('AreaService: ', function() {
  var $httpBackend;
  var Constant;
  var AreaService;
  var PieArrayService;

  var dataRespond1 = [{
    'country': 'China',
    'ip': '1',
    'province': '上海市',
    'pv': '21',
    'uv': '3'
  }, {
    'country': '中国',
    'ip': '1',
    'province': '吉林省',
    'pv': '31',
    'uv': '2'
  }];

  var dataRespond1Pv = [
    [
      '中国.吉林省', 31
    ],
    [
      'China.上海市', 21
    ]
  ];

  var dataRespond1Ip = [
    [
      'China.上海市', 1
    ],
    [
      '中国.吉林省', 1
    ]
  ];

  var dataRespond1Uv = [
    [
      'China.上海市', 3
    ],
    [
      '中国.吉林省', 2
    ]
  ];

  var dataRespond2 = [{
    'country': 'China',
    'ip': '1',
    'province': '1',
    'pv': '2',
    'uv': '3'
  }, {
    'country': 'China',
    'ip': '4',
    'province': '2',
    'pv': '5',
    'uv': '6'
  }, {
    'country': 'China',
    'ip': '7',
    'province': '3',
    'pv': '8',
    'uv': '9'
  }, {
    'country': 'China',
    'ip': '2',
    'province': '4',
    'pv': '3',
    'uv': '4'
  }, {
    'country': 'China',
    'ip': '5',
    'province': '5',
    'pv': '6',
    'uv': '7'
  }, {
    'country': 'China',
    'ip': '9',
    'province': '6',
    'pv': '8',
    'uv': '1'
  }];

  var dataRespond2Pv = [
    [
      'China.3', 8
    ],
    [
      'China.6', 8
    ],
    [
      'China.5', 6
    ],
    [
      'China.2', 5
    ],
    [
      '其他', 5
    ]
  ];

  var dataRespond2Ip = [
    [
      'China.6', 9
    ],
    [
      'China.3', 7
    ],
    [
      'China.5', 5
    ],
    [
      'China.2', 4
    ],
    [
      '其他', 3
    ]
  ];

  var dataRespond2Uv = [
    [
      'China.3', 9
    ],
    [
      'China.5', 7
    ],
    [
      'China.2', 6
    ],
    [
      'China.4', 4
    ],
    [
      '其他', 4
    ]
  ];

  var today = {
    start: '2015-05-15',
    end: '2015-05-15'
  };

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function(_$httpBackend_, _AreaService_, _PieArrayService_, _Constant_) {
      AreaService = _AreaService_;
      PieArrayService = _PieArrayService_;
      $httpBackend = _$httpBackend_;
      Constant = _Constant_;
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('fn: getData: ', function() {

    it('when dataRespond1.length less than 5, expect AreaService.data.tableData equal dataRespond1 and ' +
      'AreaService.data.pv equal dataRespond1Pv and ' +
      'AreaService.data.ip equal dataRespond1Ip and ' +
      'AreaService.data.uv equal dataRespond1Uv', function() {

        $httpBackend.expectGET(Constant.URL.PRODUCTS_REGION + '?start_date=' + today.start + '&end_date=' + today.end + '&tid=' + 10000014)
          .respond(dataRespond1);
        AreaService.getData(today.start, today.end, 10000014);
        $httpBackend.flush();

        expect(AreaService.data.tableData).toEqual(dataRespond1);
        expect(AreaService.data.pv).toEqual(dataRespond1Pv);
        expect(AreaService.data.ip).toEqual(dataRespond1Ip);
        expect(AreaService.data.uv).toEqual(dataRespond1Uv);

      });
  });

  describe('fn: getData: ', function() {

    it('when dataRespond2.length big than 5, expect AreaService.data.tableData equal dataRespond2 and ' +
      'AreaService.data.pv equal dataRespond2Pv and ' +
      'AreaService.data.ip equal dataRespond2Ip and ' +
      'AreaService.data.uv equal dataRespond2Uv', function() {

        $httpBackend.expectGET(Constant.URL.PRODUCTS_REGION + '?start_date=' + today.start + '&end_date=' + today.end + '&tid=' + 10000014)
          .respond(dataRespond2);
        AreaService.getData(today.start, today.end, 10000014);
        $httpBackend.flush();

        expect(AreaService.data.tableData).toEqual(dataRespond2);
        expect(AreaService.data.pv).toEqual(dataRespond2Pv);
        expect(AreaService.data.ip).toEqual(dataRespond2Ip);
        expect(AreaService.data.uv).toEqual(dataRespond2Uv);

      });
  });

});
