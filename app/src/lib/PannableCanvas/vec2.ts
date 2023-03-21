export class Vec2 {
	static zero = new Vec2(0, 0)
	constructor(public readonly x: number, public readonly y: number) {}
	add(x: number, y: number) {
		return new Vec2(this.x + x, this.y + y)
	}
	addVec(v: Vec2) {
		return new Vec2(this.x + v.x, this.y + v.y)
	}
	sub(x: number, y: number) {
		return new Vec2(this.x - x, this.y - y)
	}
	subVec(v: Vec2) {
		return new Vec2(this.x - v.x, this.y - v.y)
	}
	mul(v: Vec2) {
		return new Vec2(this.x * v.x, this.y * v.y)
	}
	mulScalar(s: number) {
		return new Vec2(this.x * s, this.y * s)
	}
	div(v: Vec2) {
		return new Vec2(this.x / v.x, this.y / v.y)
	}
	mag() {
		return Math.sqrt(this.mag2())
	}
	mag2() {
		return this.x * this.x + this.y * this.y
	}
	normalize() {
		return this.divScalar(this.mag())
	}
	divScalar(s: number) {
		return new Vec2(this.x / s, this.y / s)
	}
	dot(v: Vec2) {
		return this.x * v.x + this.y * v.y
	}
	cross(v: Vec2) {
		return this.x * v.y - this.y * v.x
	}
	rotate(angle: number) {
		const s = Math.sin(angle)
		const c = Math.cos(angle)
		return new Vec2(this.x * c - this.y * s, this.x * s + this.y * c)
	}
	rotateAround(v: Vec2, angle: number) {
		const s = Math.sin(angle)
		const c = Math.cos(angle)
		const x = this.x - v.x
		const y = this.y - v.y
		return new Vec2(x * c - y * s + v.x, x * s + y * c + v.y)
	}
	copy() {
		return new Vec2(this.x, this.y)
	}
	distanceTo(v: Vec2) {
		return Math.sqrt(this.distanceTo2(v))
	}
	distanceTo2(v: Vec2) {
		return Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2)
	}
	map(func: (xOrY: number) => number) {
		return new Vec2(func(this.x), func(this.y))
	}
	static lerpFunc = (a: number, b: number, t: number) => a + (b - a) * t
	lerp(other: Vec2, time: number) {
		return new Vec2(Vec2.lerpFunc(this.x, other.x, time), Vec2.lerpFunc(this.y, other.y, time))
	}
}
