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

## Reference
The algorithm is based on the paper [Heuristics for the Generation of Random Polygons](https://kelvinau.github.io/Random-Irregular-Polygon/paper/Heuristics%20for%20the%20Generation%20of%20Random%20Polygons.pdf) by Thomas Auer & Martin Held.
