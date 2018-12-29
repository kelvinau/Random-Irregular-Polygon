# Random-Irregular-Polygon

Demo: https://demo.kelvinau.net/Random-Irregular-Polygon/animation.html

JS Library for Generating Random Irregular Polygon

![Random Irregular Polygon Demo](https://kelvinau.github.io/Random-Irregular-Polygon/demo/animation.gif)

## Usage

```
const generator = new RIP({
  numOfPoints: 10, // number of points
  minCoordVal: 20, // minimum coordinate value
  maxCoordVal: 100, // maximum coordinate value
});
const coords = generator.getPolygonCoord();
```
