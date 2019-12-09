////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { BoundingBox } from "./bbox3";

export class PointBPNode {
	constructor(inputPoints) {
		this.points = [];

		if (Array.isArray(inputPoints)) {
			if (inputPoints.length > 5) {
				this.build(inputPoints);
			} else {
				this.points.concat(inputPoints);
			}
		}	
	}

	build(points) {
		var bbox = BoundingBox3D.fromPoints(points);
		
		var lbox = new BoundingBox(), rbox = new BoundingBox();
		var lpoints = new Array(), rpoints = new Array();

		var ns = bbox.size.normalize();
		if (ns.x > ns.y && ns.x > ns.z) {
			lbox.min.set(bbox.min.x, bbox.min.y, bbox.min.z);
			lbox.max.set(bbox.min.x + bbox.size.x * 0.5, bbox.max.y, bbox.max.z);

			rbox.min.set(bbox.min.x + bbox.size.x * 0.5, bbox.min.y, bbox.min.z);
			rbox.max.set(bbox.max.x, bbox.max.y, bbox.max.z);
		} else if (ns.y > ns.x && ns.y > ns.z) {
			lbox.min.set(bbox.min.x, bbox.min.y, bbox.min.z);
			lbox.max.set(bbox.min.x, bbox.min.y + bbox.size.y * 0.5, bbox.min.z);

			rbox.min.set(bbox.min.x, bbox.min.y + bbox.size.y * 0.5, bbox.min.z);
			rbox.max.set(bbox.max.x, bbox.max.y, bbox.max.z);
		} else {
			lbox.min.set(bbox.min.x, bbox.min.y, bbox.min.z);
			lbox.max.set(bbox.min.x, bbox.min.y, bbox.min.z + bbox.size.z * 0.5);

			rbox.min.set(bbox.min.x, bbox.min.y, bbox.min.z + bbox.size.z * 0.5);
			rbox.max.set(bbox.max.x, bbox.max.y, bbox.max.z);
		}

		for (let i = 0; i < points.length; i++) {
			var p = points[i];

			if (lbox.contains(p)) {
				lpoints.push(p);
			}

			if (rbox.contains(p)) {
				rpoints.push(p);
			}
		}

		if (lpoints.length > 0) {
			this.left = new PointBPNode(lpoints);
		}
		
		if (rpoints.length > 0) {
			this.right = new PointBPNode(rpoints);
		}	
	}

	contains(p) {
		if (this.points._t_contains(p)) {
			return true;
		}

		if (this.left && this.left.contains(p)) {
			return true;
		}

		if (this.right && this.right.cotains(p)) {
			return true;
		}

		return false;
	}
}