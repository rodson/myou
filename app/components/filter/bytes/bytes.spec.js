'use strict';

describe('bytesFilter', function() {
  var bytesFilter;

  beforeEach(function() {
    module('myou.filter.bytes');

    inject(function(_bytesFilter_) {
      bytesFilter = _bytesFilter_;
    });
  });

  it('should convert file size to human reading format', function() {
    expect(bytesFilter(2048)).toBe('2.0 KB');
    expect(bytesFilter(2 * 1024 * 1024 + 0.2 * 1024 * 1024)).toBe('2.2 MB');
    expect(bytesFilter(3 * 1024 * 1024 * 1024 + 0.2 * 1024 * 1024 * 1024))
      .toBe('3.2 GB');
    expect(bytesFilter(0)).toBe('0 KB');
  });

});
