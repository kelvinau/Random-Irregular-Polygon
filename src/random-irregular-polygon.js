class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class RIP {
  constructor(opts) {
    this.numOfPoints = opts.numOfPoints;
    this.minCoordVal = opts.minCoordVal;
    this.maxCoordVal = opts.maxCoordVal;
    this.isIntCoord = !!opts.isIntCoord;
  }

  getPolygonCoord() {
    const points = this.spacePartition(this.getRandomPoints());
    this.sortPoints(points);
    return points;
  }

  getRandomPoints() {
    let points = [];
    let pointSet = new Set();
    for (let i = 0; i < this.numOfPoints; ) {
      let x = this.getRandomNum(this.minCoordVal, this.maxCoordVal, this.isIntCoord);
      let y = this.getRandomNum(this.minCoordVal, this.maxCoordVal, this.isIntCoord);
      let key = x + '-' + y;
      if (!pointSet.has(key)) {
        pointSet.add(key);
        points.push(new Point(x, y));
        i++;
      }
    }
    return points;
  }

  getRandomNum(min, max, isInt) {
    if (!isInt) {
      return Math.random() * (max - min) + min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  spacePartition(points) {
    let firstPoint = points[0];
    let secondIndex = this.getRandomNum(1, this.numOfPoints - 1, true);
    let secondPoint = points[secondIndex];
    this.swapPoints(points, 1, secondIndex);
    //console.log(points);

    let i = 2;
    let j = this.numOfPoints - 1;
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
    //console.log(points);
    return points;
  }

  spacePartitionRec(points, l, r) {
    if (r > l + 1) {
      let rp = this.getRandomNum(l + 1, r - l - 1, true);
      let firstPoint = points[l];
      let secondPoint = r === this.numOfPoints ? points[0] : points[r];
      let randomStartPoint = this.getRandomPointOnSegment(firstPoint, secondPoint);
      let randomEndPoint = points[rp];
      this.swapPoints(points, l + 1, rp);

      let i = l + 2;
      let j = r - 1;
      let isToLeft = this.isToLeftOrOnLine(randomStartPoint, randomEndPoint, points[l]);

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

  swapPoints(points, i, j) {
    let tmp = points[i];
    points[i] = points[j];
    points[j] = tmp;
  }

  isToLeftOrOnLine(start, end, point) {
    return this.isLeft(start, end, point) <= 0;
  }

  isLeft(start, end, point) {
    return (end.x - start.x) * (point.y - start.y) - (end.y - start.y) * (point.x - start.x);
  }

  getRandomPointOnSegment(start, end) {
    let randomRatio = Math.random();
    return new Point(
      start.x + (end.x - start.x) * randomRatio,
      start.y + (end.y - start.y) * randomRatio
    );
  }

  sortPoints(points) {
    let p0 = {};
    p0.y = Math.min.apply(null, points.map(p => p.y));
    p0.x = Math.max.apply(null, points.filter( p=> p.y === p0.y).map(p => p.x));
    points.sort((a,b) => {
      const isLeft = this.isLeft(a, b, p0);
      if (isLeft === 0) {
        return distCompare(a, b, p0);
      };
      return isLeft;
    });

    function distCompare(a, b, p0) {
      const distA = (p0.x - a.x) * (p0.x - a.x) + (p0.y - a.y) * (p0.y - a.y);
      const distB = (p0.x - b.x) * (p0.x - b.x) + (p0.y - b.y) * (p0.y - b.y);
      return distA - distB;
    }
  }
}
