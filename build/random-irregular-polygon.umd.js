;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.RIP = factory();
  }
}(this, function() {
"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(x, y) {
  _classCallCheck(this, Point);

  this.x = x;
  this.y = y;
};

var RIP =
/*#__PURE__*/
function () {
  function RIP(opts) {
    _classCallCheck(this, RIP);

    this.numOfPoints = opts.numOfPoints;
    this.minCoordVal = opts.minCoordVal;
    this.maxCoordVal = opts.maxCoordVal;
    this.isIntCoord = !!opts.isIntCoord;
  }

  _createClass(RIP, [{
    key: "getPolygonCoord",
    value: function getPolygonCoord() {
      var points = this.spacePartition(this.getRandomPoints());
      this.sortPoints(points);
      return points;
    }
  }, {
    key: "getRandomPoints",
    value: function getRandomPoints() {
      var points = [];
      var pointSet = new Set();

      for (var i = 0; i < this.numOfPoints;) {
        var x = this.getRandomNum(this.minCoordVal, this.maxCoordVal, this.isIntCoord);
        var y = this.getRandomNum(this.minCoordVal, this.maxCoordVal, this.isIntCoord);
        var key = x + '-' + y;

        if (!pointSet.has(key)) {
          pointSet.add(key);
          points.push(new Point(x, y));
          i++;
        }
      }

      return points;
    }
  }, {
    key: "getRandomNum",
    value: function getRandomNum(min, max, isInt) {
      if (!isInt) {
        return Math.random() * (max - min) + min;
      }

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "spacePartition",
    value: function spacePartition(points) {
      var firstPoint = points[0];
      var secondIndex = this.getRandomNum(1, this.numOfPoints - 1, true);
      var secondPoint = points[secondIndex];
      this.swapPoints(points, 1, secondIndex);
      var i = 2;
      var j = this.numOfPoints - 1;

      while (i <= j) {
        while (i < this.numOfPoints && this.isToLeftOrOnLine(firstPoint, secondPoint, points[i])) {
          i++;
        }

        while (j > 1 && !this.isToLeftOrOnLine(firstPoint, secondPoint, points[j])) {
          j--;
        }

        if (i <= j) {
          this.swapPoints(points, i, j);
          i++;
          j--;
        }
      }

      this.swapPoints(points, 1, j);
      this.spacePartitionRec(points, 0, j);
      return points;
    }
  }, {
    key: "spacePartitionRec",
    value: function spacePartitionRec(points, l, r) {
      if (r > l + 1) {
        var rp = this.getRandomNum(l + 1, r - l - 1, true);
        var firstPoint = points[l];
        var secondPoint = r === this.numOfPoints ? points[0] : points[r];
        var randomStartPoint = this.getRandomPointOnSegment(firstPoint, secondPoint);
        var randomEndPoint = points[rp];
        this.swapPoints(points, l + 1, rp);
        var i = l + 2;
        var j = r - 1;
        var isToLeft = this.isToLeftOrOnLine(randomStartPoint, randomEndPoint, points[l]);

        while (i <= j) {
          while (i < r && this.isToLeftOrOnLine(randomStartPoint, randomEndPoint, points[i]) === isToLeft) {
            i++;
          }

          while (j > l + 1 && this.isToLeftOrOnLine(randomStartPoint, randomEndPoint, points[j]) !== isToLeft) {
            j--;
          }

          if (i <= j) {
            this.swapPoints(points, i, j);
            i++;
            j--;
          }
        }

        this.swapPoints(points, l + 1, j);
        this.spacePartitionRec(points, l, j);
        this.spacePartitionRec(points, j, r);
      }
    }
  }, {
    key: "swapPoints",
    value: function swapPoints(points, i, j) {
      var tmp = points[i];
      points[i] = points[j];
      points[j] = tmp;
    }
  }, {
    key: "isToLeftOrOnLine",
    value: function isToLeftOrOnLine(start, end, point) {
      return this.isLeft(start, end, point) <= 0;
    }
  }, {
    key: "isLeft",
    value: function isLeft(start, end, point) {
      return (end.x - start.x) * (point.y - start.y) - (end.y - start.y) * (point.x - start.x);
    }
  }, {
    key: "getRandomPointOnSegment",
    value: function getRandomPointOnSegment(start, end) {
      var randomRatio = Math.random();
      return new Point(start.x + (end.x - start.x) * randomRatio, start.y + (end.y - start.y) * randomRatio);
    }
  }, {
    key: "sortPoints",
    value: function sortPoints(points) {
      var _this = this;

      var p0 = {};
      p0.y = Math.min.apply(null, points.map(function (p) {
        return p.y;
      }));
      p0.x = Math.max.apply(null, points.filter(function (p) {
        return p.y === p0.y;
      }).map(function (p) {
        return p.x;
      }));
      points.sort(function (a, b) {
        var isLeft = _this.isLeft(a, b, p0);

        if (isLeft === 0) {
          return distCompare(a, b, p0);
        }

        ;
        return isLeft;
      });

      function distCompare(a, b, p0) {
        var distA = (p0.x - a.x) * (p0.x - a.x) + (p0.y - a.y) * (p0.y - a.y);
        var distB = (p0.x - b.x) * (p0.x - b.x) + (p0.y - b.y) * (p0.y - b.y);
        return distA - distB;
      }
    }
  }]);

  return RIP;
}();
return RIP;
}));
