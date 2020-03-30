////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { Vec2 } from "./vec2.js";
import { MathFunctions } from "./functions.js";

export class MathFunctions2 {
  static clamp2(v, min = 0, max = 1) {
    return new Vec2(MathFunctions.clamp(v.x, min, max), MathFunctions.clamp(v.y, min, max));
  }

  static abs2(v) {
    return new Vec2(Math.abs(v.x), Math.abs(v.y));
  }

  static distancePointToPoint(p1, p2) {
    return MathFunctions2.distancePointToPointXY(p1.x, p1.y, p2.x, p2.y);
  }

  static distancePointToPointXY(p1x, p1y, p2x, p2y) {
    const a = p2x - p1x, b = p2y - p1y;
    return Math.sqrt(a * a + b * b);
  }

  static distancePointToLine(p, l) {
    return MathFunctions2.distancePointToLineXYXY(p.x, p.y, l.start.x, l.start.y, l.end.x, l.end.y);
  }
  
  static distancePointToLine2(p, lp1, lp2) {
    return MathFunctions2.distancePointToLineXYXY(p.x, p.y, lp1.x, lp1.y, lp2.x, lp2.y);
  }

  static distancePointToLineXYXY(px, py, x1, y1, x2, y2) {
    const a = y2 - y1, b = x1 - x2, c = x2 * y1 - x1 * y2;
    return Math.abs(a * px + b * py + c) / Math.sqrt(a * a + b * b);
  }

  static distancePointToLineSegment(p, l) {
    return MathFunctions2.distancePointToLineSegmentXYXY(p.x, p.y, l.x1, l.y1, l.x2, l.y2);
  }

  static distancePointToLineSegment2(p, lp1, lp2) {
    return MathFunctions2.distancePointToLineSegmentXYXY(p.x, p.y, lp1.x, lp1.y, lp2.x, lp2.y);
  }

  static distancePointToLineSegmentXYXY(px, py, x1, y1, x2, y2) {
    // source: https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment

    var A = px - x1;
    var B = py - y1;
    var C = x2 - x1;
    var D = y2 - y1;
  
    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = -1;
    if (len_sq != 0) //in case of 0 length line
      param = dot / len_sq;
  
    var xx, yy;
  
    if (param < 0) {
      xx = x1;
      yy = y1;
    }
    else if (param > 1) {
      xx = x2;
      yy = y2;
    }
    else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
  
    var dx = px - xx;
    var dy = py - yy;

    return Math.sqrt(dx * dx + dy * dy);
  }

  static nearestPointToLineSegment(p, l) {
    return MathFunctions2.nearestPointToLineSegmentXYXY(p.x, p.y, l.x1, l.y1, l.x2, l.y2);
  }
  
  static nearestPointToLineSegmentL1L2(p, lp1, lp2) {
    return MathFunctions2.nearestPointToLineSegmentXYXY(p.x, p.y, lp1.x, lp1.y, lp2.x, lp2.y);
  }

  static nearestPointToLineSegmentXYXY(px, py, x1, y1, x2, y2) {
    // source: https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment

    var A = px - x1;
    var B = py - y1;
    var C = x2 - x1;
    var D = y2 - y1;
  
    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = -1;
    if (len_sq !== 0) //in case of 0 length line
      param = dot / len_sq;
  
    var xx, yy;
  
    if (param < 0) {
      xx = x1;
      yy = y1;
    }
    else if (param > 1) {
      xx = x2;
      yy = y2;
    }
    else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
  
    var dx = px - xx;
    var dy = py - yy;

    return { dist: Math.sqrt(dx * dx + dy * dy), x: xx, y: yy };
  }

  // distanceLineToLine: function(l1, l2) {
  //   if (!this.checkParallelLines(l1, l2))
  //     return 0;
    
  //   return this.distancePointToLine(l1.start, l2);
  // },

  static distancePointToRect(p, rect) {
    const de1 = MathFunctions2.distancePointToLineSegment(p, rect.topEdge);
    const de2 = MathFunctions2.distancePointToLineSegment(p, rect.bottomEdge);
    const de3 = MathFunctions2.distancePointToLineSegment(p, rect.leftEdge);
    const de4 = MathFunctions2.distancePointToLineSegment(p, rect.rightEdge);

    return Math.min(de1, de2, de3, de4);
  }

  static pointToNearestPolygon(p, polygon /*, mindist = undefined */) {
    const ret = {
      dist: Infinity,
      line: {},
      lineIndex: undefined,
    };

    for (let i = 0, j = 1; i < polygon.length; i++ , j++) {
      if (j >= polygon.length) j = 0;
      
      const px1 = polygon[i].x, py1 = polygon[i].y, px2 = polygon[j].x, py2 = polygon[j].y;
      
      const r2 = MathFunctions2.nearestPointToLineSegmentXYXY(p.x, p.y, px1, py1, px2, py2);
      if (/*(!mindist || r2.dist < mindist) &&*/ r2.dist < ret.dist) {
        ret.dist = r2.dist;
        ret.line.x1 = px1; ret.line.y1 = py1;
        ret.line.x2 = px2; ret.line.y2 = py2;
        ret.lineIndex = i;
        ret.ip = { x: r2.x, y: r2.y };
      }
    }

    return ret;
  }

  static distancePointToPolygon(p, polygon) {
    let minDist = Infinity;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const p1 = polygon[i], p2 = polygon[j];
      
      const dist = MathFunctions2.distancePointToLineSegmentXYXY(p.x, p.y, p1.x, p1.y, p2.x, p2.y);
      if (dist < minDist) minDist = dist;
    }

    return minDist;
  }

  static rectContainsPoint(r, p) {
    return p.x >= r.x && p.y >= r.y && p.x <= r.right && p.y <= r.bottom;
  }

  static rectContainsPointXY(rx, ry, rw, rh, px, py) {
    return px >= rx && py >= ry && px <= rx + rw && py <= ry + rh;
  }

  static triangleContainsPoint(v1, v2, v3, p) {
    function sign(pt, p2, p3) {
      return (pt.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (pt.y - p3.y);
    }

    const
      b1 = sign(p, v1, v2) < 0,
      b2 = sign(p, v2, v3) < 0,
      b3 = sign(p, v3, v1) < 0;

    return ((b1 == b2) && (b2 == b3));
  }

  static polygonContainsPoint(polygon, p) {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const p1 = polygon[i], p2 = polygon[j];
        
      const intersect = ((p1.y > p.y) != (p2.y > p.y))
        && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x);
      
      if (intersect) inside = !inside;
    }

    return inside;
  }

  static polygonContainsRect(polygon, rect) {
    return this.polygonContainsPoint(polygon, rect.topLeft)
      && this.polygonContainsPoint(polygon, rect.topRight)
      && this.polygonContainsPoint(polygon, rect.bottomLeft)
      && this.polygonContainsPoint(polygon, rect.bottomRight);
  }

  static calcPolygonArea(points) {
    if (points.length < 2) return 0;

    let a = 0;
    
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i], p2 = points[i + 1];
      a += p1.x * p2.y - p1.y * p2.x;
    }
    
    const p1 = points[points.length - 1], p2 = points[0];
    const last = p1.x * p2.y - p1.y * p2.x;
    
    return Math.abs(a + last) * 0.5;
  }

  static lineIntersectsRect(l, r) {
    const containsStart = this.rectContainsPoint(r, l.start),
      containsEnd = this.rectContainsPoint(r, l.end);
    
    if (containsStart || containsEnd) {
      return true;
    }
    
    if (this.lineIntersectsLine(r.topEdge, l))
      return true;
    
    if (this.lineIntersectsLine(r.bottomEdge, l))
      return true;

    if (this.lineIntersectsLine(r.leftEdge, l))
      return true;
  
    if (this.lineIntersectsLine(r.rightEdge, l))
      return true;

    return false;
  }

  static lineIntersectsPolygon(p, l) {
    // todo
  }

  static rectIntersectsRect(r1, r2) {
    const
      r1x1 = r1.x, r1x2 = r1.x + r1.width,
      r1y1 = r1.y, r1y2 = r1.y + r1.height,
      r2x1 = r2.x, r2x2 = r2.x + r2.width,
      r2y1 = r2.y, r2y2 = r2.y + r2.height;

    if (r1x2 < r2x1) return false;
    if (r1x1 > r2x2) return false;
    if (r1y2 < r2y1) return false;
    if (r1y1 > r2y2) return false;
    
    return true;
  }

  static rectIntersectsPolygon(rect, polygon) {

    for (let i = 0; i < polygon.length - 1; i++) {
      const px1 = polygon[i].x, py1 = polygon[i].y,
        px2 = polygon[i + 1].x, py2 = polygon[i + 1].y;
      
      if (this.lineIntersectsRect(new LineSegment2D(px1, py1, px2, py2), rect)) {
        return true;
      }
    }

    return false;
  }
  
  static lineIntersectsLine(l1, l2) {
    return this.lineIntersectsLineXY(
      l1.start.x, l1.start.y, l1.end.x, l1.end.y,
      l2.start.x, l2.start.y, l2.end.x, l2.end.y);
  }

  static lineIntersectsLineXY(a, b, c, d, p, q, r, s) {
    // source: https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function

    const det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      const invdet = 1.0 / det;
      const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) * invdet;
      const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) * invdet;
      return (lambda >= 0 && lambda <= 1) && (gamma >= 0 && gamma <= 1);
    }
  }
  
  static lineIntersectsLineXYGetPoint(line1StartX, line1StartY, line1EndX, line1EndY,
    line2StartX, line2StartY, line2EndX, line2EndY) {
    // original source: http://jsfiddle.net/justin_c_rounds/Gd2S2/light/
    
    const denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    
    if (denominator === 0) {
      return null;
    }

    let a = line1StartY - line2StartY;
    let b = line1StartX - line2StartX;

    const numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    const numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);

    a = numerator1 / denominator;
    b = numerator2 / denominator;

    if ((a < 0 || a > 1) && (b < 0 || b > 1)) {
      return null;
    }

    // if we cast these lines infinitely in both directions, they intersect here:
    const result = {
      x: line1StartX + (a * (line1EndX - line1StartX)),
      y: line1StartY + (a * (line1EndY - line1StartY)),
      ta: a,
      tb: b,
    };

    return result;
  }

  static checkParallelLines(l1, l2) {
    return this.checkParallelLinesXY(
      l1.start.x, l1.start.y, l1.end.x, l1.end.y,
      l2.start.x, l2.start.y, l2.end.x, l2.end.y);
  }

  static checkParallelLinesXY(a, b, c, d, p, q, r, s) {
    return Math.abs((c - a) * (s - q) - (r - p) * (d - b)) < 0.00001;
  }

}
