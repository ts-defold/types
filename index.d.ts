/** @noSelfInFile */
/// <reference types="lua-types/5.1" />

// DEFOLD. stable version 1.2.174 (8f3e864464062e1b35c207521dc65dfd77899cdf)
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


type hash = {
}

type url = {
}

type node = {
}

type buffer = {
}

type bufferstream = {
}

declare namespace vmath {

	type vector3 = number & {
		x: number,
		y: number,
		z: number,
	}

	type vector4 = number & {
		x: number,
		y: number,
		z: number,
		w: number,
	}

	type matrix4 = number & {
		c0: vmath.vector4,
		c1: vmath.vector4,
		c2: vmath.vector4,
		c3: vmath.vector4,
		m01: number,
		m02: number,
		m03: number,
		m04: number,
		m11: number,
		m12: number,
		m13: number,
		m14: number,
		m21: number,
		m22: number,
		m23: number,
		m24: number,
		m31: number,
		m32: number,
		m33: number,
		m34: number,
	}

	type quaternion = number & {
		x: number,
		y: number,
		z: number,
		w: number,
	}
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace buffer {

	/**
	* float32
	*/
	let VALUE_TYPE_FLOAT32: any

	/**
	* int16
	*/
	let VALUE_TYPE_INT16: any

	/**
	* int32
	*/
	let VALUE_TYPE_INT32: any

	/**
	* int64
	*/
	let VALUE_TYPE_INT64: any

	/**
	* int8
	*/
	let VALUE_TYPE_INT8: any

	/**
	* uint16
	*/
	let VALUE_TYPE_UINT16: any

	/**
	* uint32
	*/
	let VALUE_TYPE_UINT32: any

	/**
	* uint64
	*/
	let VALUE_TYPE_UINT64: any

	/**
	* uint8
	*/
	let VALUE_TYPE_UINT8: any

	/**
	* Copy all data streams from one buffer to another, element wise.
	* ⚠ Each of the source streams must have a matching stream in the
	* destination buffer. The streams must match in both type and size.
	* The source and destination buffer can be the same.
	* @param dst  the destination buffer
	* @param dstoffset  the offset to start copying data to
	* @param src  the source data buffer
	* @param srcoffset  the offset to start copying data from
	* @param count  the number of elements to copy
	*/
	function copy_buffer(dst: buffer, dstoffset: number, src: buffer, srcoffset: number, count: number): void

	/**
	* Copy a specified amount of data from one stream to another.
	* ⚠ The value type and size must match between source and destination streams.
	* The source and destination streams can be the same.
	* @param dst  the destination stream
	* @param dstoffset  the offset to start copying data to (measured in value type)
	* @param src  the source data stream
	* @param srcoffset  the offset to start copying data from (measured in value type)
	* @param count  the number of values to copy (measured in value type)
	*/
	function copy_stream(dst: bufferstream, dstoffset: number, src: bufferstream, srcoffset: number, count: number): void

	/**
	* Create a new data buffer containing a specified set of streams. A data buffer
	* can contain one or more streams with typed data. This is useful for managing
	* compound data, for instance a vertex buffer could contain separate streams for
	* vertex position, color, normal etc.
	* @param element_count  The number of elements the buffer should hold
	* @param declaration  A table where each entry (table) describes a stream

`name`: The name of the stream
`type`: The data type of the stream
`count`: The number of values each element should hold

	*/
	function create(element_count: number, declaration: object): void

	/**
	* Get a copy of all the bytes from a specified stream as a Lua string.
	* @param buffer  the source buffer
	* @param stream_name  the name of the stream
	* @return data  the buffer data as a Lua string
	*/
	function get_bytes(buffer: buffer, stream_name: hash): string

	/**
	* Get a specified stream from a buffer.
	* @param buffer  the buffer to get the stream from
	* @param stream_name  the stream name
	* @return stream  the data stream
	*/
	function get_stream(buffer: buffer, stream_name: any): bufferstream

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace html5 {

	/**
	* Executes the supplied string as JavaScript inside the browser.
	* A call to this function is blocking, the result is returned as-is, as a string.
	* (Internally this will execute the string using the `eval()` JavaScript function.)
	* @param code  Javascript code to run
	* @return result  result as string
	*/
	function run(code: string): string

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace http {

	/**
	* Perform a HTTP/HTTPS request.
	* ⚠ If no timeout value is passed, the configuration value "network.http_timeout" is used. If that is not set, the timeout value is `0` (which blocks indefinitely).
	* @param url  target url
	* @param method  HTTP/HTTPS method, e.g. "GET", "PUT", "POST" etc.
	* @param callback  response callback function

`self`
The current object
`id`
Internal message identifier. Do not use!
`response`
The response data. Contains the fields:


`status`: the status of the response
`response`: the response data
`headers`: all the returned headers

	* @param headers  optional table with custom headers
	* @param post_data  optional data to send
	* @param options  optional table with request parameters. Supported entries:

`timeout`: timeout in seconds

	*/
	function request(url: string, method: string, callback: any, headers?: object, post_data?: string, options?: object): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace image {

	/**
	* luminance image type
	*/
	let TYPE_LUMINANCE: any

	/**
	* RGB image type
	*/
	let TYPE_RGB: any

	/**
	* RGBA image type
	*/
	let TYPE_RGBA: any

	/**
	* Load image (PNG or JPEG) from buffer.
	* @param buffer  image data buffer
	* @param premult  optional flag if alpha should be premultiplied. Defaults to `false`
	* @return image  object or `nil` if loading fails. The object is a table with the following fields:

`width`: image width
`height`: image height
`type`: image type
- `image.TYPE_RGB`
- `image.TYPE_RGBA`
- `image.TYPE_LUMINANCE`


`buffer`: the raw image data

	*/
	function load(buffer: string, premult?: boolean): object

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace json {

	/**
	* Decode a string of JSON data into a Lua table.
	* A Lua error is raised for syntax errors.
	* @param json  json data
	* @return data  decoded json
	*/
	function decode(json: string): object

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace msg {

	/**
	* Post a message to a receiving URL. The most common case is to send messages
	* to a component. If the component part of the receiver is omitted, the message
	* is broadcast to all components in the game object.
	* The following receiver shorthands are available:
	* 
	* - `"."` the current game object
	* - `"#"` the current component
	* 
	* ⚠ There is a 2 kilobyte limit to the message parameter table size.
	* @param receiver  The receiver must be a string in URL-format, a URL object or a hashed string.
	* @param message_id  The id must be a string or a hashed string.
	* @param message  a lua table with message parameters to send.
	*/
	function post(receiver: any, message_id: any, message?: any): void

	/**
	* This is equivalent to `msg.url(nil)` or `msg.url("#")`, which creates an url to the current
	* script component.
	* @return url  a new URL
	*/
	function url(): url

	/**
	* The format of the string must be `[socket:][path][#fragment]`, which is similar to a HTTP URL.
	* When addressing instances:
	* 
	* - `socket` is the name of a valid world (a collection)
	* - `path` is the id of the instance, which can either be relative the instance of the calling script or global
	* - `fragment` would be the id of the desired component
	* 
	* In addition, the following shorthands are available:
	* 
	* - `"."` the current game object
	* - `"#"` the current component
	* 
	* @param urlstring  string to create the url from
	* @return url  a new URL
	*/
	function url(urlstring: string): url

	/**
	* creates a new URL from separate arguments
	* @param socket  socket of the URL
	* @param path  path of the URL
	* @param fragment  fragment of the URL
	* @return url  a new URL
	*/
	function url(socket?: any, path?: any, fragment?: any): url

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace timer {

	/**
	* Indicates an invalid timer handle
	*/
	let INVALID_TIMER_HANDLE: any

	/**
	* You may cancel a timer from inside a timer callback.
	* Cancelling a timer that is already executed or cancelled is safe.
	* @param handle  the timer handle returned by timer.delay()
	* @return true  if the timer was active, false if the timer is already cancelled / complete
	*/
	function cancel(handle: any): any

	/**
	* Adds a timer and returns a unique handle
	* You may create more timers from inside a timer callback.
	* Using a delay of 0 will result in a timer that triggers at the next frame just before
	* script update functions.
	* If you want a timer that triggers on each frame, set delay to 0.0f and repeat to true.
	* Timers created within a script will automatically die when the script is deleted.
	* @param delay  time interval in seconds
	* @param repeat  true = repeat timer until cancel, false = one-shot timer
	* @param callback  timer callback function

`self`
The current object
`handle`
The handle of the timer
`time_elapsed`
The elapsed time - on first trigger it is time since timer.delay call, otherwise time since last trigger

	* @return handle  identifier for the create timer, returns timer.INVALID_TIMER_HANDLE if the timer can not be created
	*/
	function delay(delay: any, repeat: any, callback: any): any

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace vmath {

	/**
	* Calculates the conjugate of a quaternion. The result is a
	* quaternion with the same magnitudes but with the sign of
	* the imaginary (vector) parts changed:
	* `q* = [w, -v]`
	* @param q1  quaternion of which to calculate the conjugate
	* @return q  the conjugate
	*/
	function conj(q1: any): any

	/**
	* Given two linearly independent vectors P and Q, the cross product,
	* P &#x00D7; Q, is a vector that is perpendicular to both P and Q and
	* therefore normal to the plane containing them.
	* If the two vectors have the same direction (or have the exact
	* opposite direction from one another, i.e. are not linearly independent)
	* or if either one has zero length, then their cross product is zero.
	* @param v1  first vector
	* @param v2  second vector
	* @return v  a new vector representing the cross product
	*/
	function cross(v1: any, v2: any): any

	/**
	* The returned value is a scalar defined as:
	* `P &#x22C5; Q = |P| |Q| cos &#x03B8;`
	* where &#x03B8; is the angle between the vectors P and Q.
	* 
	* - If the dot product is positive then the angle between the vectors is below 90 degrees.
	* - If the dot product is zero the vectors are perpendicular (at right-angles to each other).
	* - If the dot product is negative then the angle between the vectors is more than 90 degrees.
	* 
	* @param v1  first vector
	* @param v2  second vector
	* @return n  dot product
	*/
	function dot(v1: any, v2: any): number

	/**
	* The resulting matrix is the inverse of the supplied matrix.
	* ⚠ For ortho-normal matrices, e.g. regular object transformation,
	* use `vmath.ortho_inv()` instead.
	* The specialized inverse for ortho-normalized matrices is much faster
	* than the general inverse.
	* @param m1  matrix to invert
	* @return m  inverse of the supplied matrix
	*/
	function inv(m1: any): any

	/**
	* Returns the length of the supplied vector or quaternion.
	* If you are comparing the lengths of vectors or quaternions, you should compare
	* the length squared instead as it is slightly more efficient to calculate
	* (it eliminates a square root calculation).
	* @param v  value of which to calculate the length
	* @return n  length
	*/
	function length(v: any): number

	/**
	* Returns the squared length of the supplied vector or quaternion.
	* @param v  value of which to calculate the squared length
	* @return n  squared length
	*/
	function length_sqr(v: any): number

	/**
	* Linearly interpolate between two vectors. The function
	* treats the vectors as positions and interpolates between
	* the positions in a straight line. Lerp is useful to describe
	* transitions from one place to another over time.
	* ⚠ The function does not clamp t between 0 and 1.
	* @param t  interpolation parameter, 0-1
	* @param v1  vector to lerp from
	* @param v2  vector to lerp to
	* @return v  the lerped vector
	*/
	function lerp(t: number, v1: any, v2: any): any

	/**
	* Linearly interpolate between two quaternions. Linear
	* interpolation of rotations are only useful for small
	* rotations. For interpolations of arbitrary rotations,
	* vmath.slerp yields much better results.
	* ⚠ The function does not clamp t between 0 and 1.
	* @param t  interpolation parameter, 0-1
	* @param q1  quaternion to lerp from
	* @param q2  quaternion to lerp to
	* @return q  the lerped quaternion
	*/
	function lerp(t: number, q1: any, q2: any): any

	/**
	* Linearly interpolate between two values. Lerp is useful
	* to describe transitions from one value to another over time.
	* ⚠ The function does not clamp t between 0 and 1.
	* @param t  interpolation parameter, 0-1
	* @param n1  number to lerp from
	* @param n2  number to lerp to
	* @return n  the lerped number
	*/
	function lerp(t: number, n1: number, n2: number): number

	/**
	* The resulting identity matrix describes a transform with
	* no translation or rotation.
	* @return m  identity matrix
	*/
	function matrix4(): any

	/**
	* Creates a new matrix with all components set to the
	* corresponding values from the supplied matrix. I.e.
	* the function creates a copy of the given matrix.
	* @param m1  existing matrix
	* @return m  matrix which is a copy of the specified matrix
	*/
	function matrix4(m1: any): any

	/**
	* The resulting matrix describes a rotation around the axis by the specified angle.
	* @param v  axis
	* @param angle  angle in radians
	* @return m  matrix represented by axis and angle
	*/
	function matrix4_axis_angle(v: any, angle: number): any

	/**
	* The resulting matrix describes the same rotation as the quaternion, but does not have any translation (also like the quaternion).
	* @param q  quaternion to create matrix from
	* @return m  matrix represented by quaternion
	*/
	function matrix4_from_quat(q: any): any

	/**
	* Constructs a frustum matrix from the given values. The left, right,
	* top and bottom coordinates of the view cone are expressed as distances
	* from the center of the near clipping plane. The near and far coordinates
	* are expressed as distances from the tip of the view frustum cone.
	* @param left  coordinate for left clipping plane
	* @param right  coordinate for right clipping plane
	* @param bottom  coordinate for bottom clipping plane
	* @param top  coordinate for top clipping plane
	* @param near  coordinate for near clipping plane
	* @param far  coordinate for far clipping plane
	* @return m  matrix representing the frustum
	*/
	function matrix4_frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): any

	/**
	* The resulting matrix is created from the supplied look-at parameters.
	* This is useful for constructing a view matrix for a camera or
	* rendering in general.
	* @param eye  eye position
	* @param look_at  look-at position
	* @param up  up vector
	* @return m  look-at matrix
	*/
	function matrix4_look_at(eye: any, look_at: any, up: any): any

	/**
	* Creates an orthographic projection matrix.
	* This is useful to construct a projection matrix for a camera or rendering in general.
	* @param left  coordinate for left clipping plane
	* @param right  coordinate for right clipping plane
	* @param bottom  coordinate for bottom clipping plane
	* @param top  coordinate for top clipping plane
	* @param near  coordinate for near clipping plane
	* @param far  coordinate for far clipping plane
	* @return m  orthographic projection matrix
	*/
	function matrix4_orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): any

	/**
	* Creates a perspective projection matrix.
	* This is useful to construct a projection matrix for a camera or rendering in general.
	* @param fov  angle of the full vertical field of view in radians
	* @param aspect  aspect ratio
	* @param near  coordinate for near clipping plane
	* @param far  coordinate for far clipping plane
	* @return m  perspective projection matrix
	*/
	function matrix4_perspective(fov: number, aspect: number, near: number, far: number): any

	/**
	* The resulting matrix describes a rotation around the x-axis
	* by the specified angle.
	* @param angle  angle in radians around x-axis
	* @return m  matrix from rotation around x-axis
	*/
	function matrix4_rotation_x(angle: number): any

	/**
	* The resulting matrix describes a rotation around the y-axis
	* by the specified angle.
	* @param angle  angle in radians around y-axis
	* @return m  matrix from rotation around y-axis
	*/
	function matrix4_rotation_y(angle: number): any

	/**
	* The resulting matrix describes a rotation around the z-axis
	* by the specified angle.
	* @param angle  angle in radians around z-axis
	* @return m  matrix from rotation around z-axis
	*/
	function matrix4_rotation_z(angle: number): any

	/**
	* The resulting matrix describes a translation of a point
	* in euclidean space.
	* @param position  position vector to create matrix from
	* @return m  matrix from the supplied position vector
	*/
	function matrix4_translation(position: any): any

	/**
	* Performs an element wise multiplication between two vectors of the same type
	* The returned value is a vector defined as (e.g. for a vector3):
	* `v = vmath.mul_per_elem(a, b) = vmath.vector3(a.x * b.x, a.y * b.y, a.z * b.z)`
	* @param v1  first vector
	* @param v2  second vector
	* @return v  multiplied vector
	*/
	function mul_per_elem(v1: any, v2: any): any

	/**
	* Normalizes a vector, i.e. returns a new vector with the same
	* direction as the input vector, but with length 1.
	* ⚠ The length of the vector must be above 0, otherwise a
	* division-by-zero will occur.
	* @param v1  vector to normalize
	* @return v  new normalized vector
	*/
	function normalize(v1: any): any

	/**
	* The resulting matrix is the inverse of the supplied matrix.
	* The supplied matrix has to be an ortho-normal matrix, e.g.
	* describe a regular object transformation.
	* ⚠ For matrices that are not ortho-normal
	* use the general inverse `vmath.inv()` instead.
	* @param m1  ortho-normalized matrix to invert
	* @return m  inverse of the supplied matrix
	*/
	function ortho_inv(m1: any): any

	/**
	* Calculates the extent the projection of the first vector onto the second.
	* The returned value is a scalar p defined as:
	* `p = |P| cos &#x03B8; / |Q|`
	* where &#x03B8; is the angle between the vectors P and Q.
	* @param v1  vector to be projected on the second
	* @param v2  vector onto which the first will be projected, must not have zero length
	* @return n  the projected extent of the first vector onto the second
	*/
	function project(v1: any, v2: any): number

	/**
	* Creates a new identity quaternion. The identity
	* quaternion is equal to:
	* `vmath.quat(0, 0, 0, 1)`
	* @return q  new identity quaternion
	*/
	function quat(): any

	/**
	* Creates a new quaternion with all components set to the
	* corresponding values from the supplied quaternion. I.e.
	* This function creates a copy of the given quaternion.
	* @param q1  existing quaternion
	* @return q  new quaternion
	*/
	function quat(q1: any): any

	/**
	* Creates a new quaternion with the components set
	* according to the supplied parameter values.
	* @param x  x coordinate
	* @param y  y coordinate
	* @param z  z coordinate
	* @param w  w coordinate
	* @return q  new quaternion
	*/
	function quat(x: number, y: number, z: number, w: number): any

	/**
	* The resulting quaternion describes a rotation of `angle`
	* radians around the axis described by the unit vector `v`.
	* @param v  axis
	* @param angle  angle
	* @return q  quaternion representing the axis-angle rotation
	*/
	function quat_axis_angle(v: any, angle: number): any

	/**
	* The resulting quaternion describes the rotation from the
	* identity quaternion (no rotation) to the coordinate system
	* as described by the given x, y and z base unit vectors.
	* @param x  x base vector
	* @param y  y base vector
	* @param z  z base vector
	* @return q  quaternion representing the rotation of the specified base vectors
	*/
	function quat_basis(x: any, y: any, z: any): any

	/**
	* The resulting quaternion describes the rotation that,
	* if applied to the first vector, would rotate the first
	* vector to the second. The two vectors must be unit
	* vectors (of length 1).
	* ⚠ The result is undefined if the two vectors point in opposite directions
	* @param v1  first unit vector, before rotation
	* @param v2  second unit vector, after rotation
	* @return q  quaternion representing the rotation from first to second vector
	*/
	function quat_from_to(v1: any, v2: any): any

	/**
	* The resulting quaternion describes a rotation of `angle`
	* radians around the x-axis.
	* @param angle  angle in radians around x-axis
	* @return q  quaternion representing the rotation around the x-axis
	*/
	function quat_rotation_x(angle: number): any

	/**
	* The resulting quaternion describes a rotation of `angle`
	* radians around the y-axis.
	* @param angle  angle in radians around y-axis
	* @return q  quaternion representing the rotation around the y-axis
	*/
	function quat_rotation_y(angle: number): any

	/**
	* The resulting quaternion describes a rotation of `angle`
	* radians around the z-axis.
	* @param angle  angle in radians around z-axis
	* @return q  quaternion representing the rotation around the z-axis
	*/
	function quat_rotation_z(angle: number): any

	/**
	* Returns a new vector from the supplied vector that is
	* rotated by the rotation described by the supplied
	* quaternion.
	* @param q  quaternion
	* @param v1  vector to rotate
	* @return v  the rotated vector
	*/
	function rotate(q: any, v1: any): any

	/**
	* Spherically interpolates between two vectors. The difference to
	* lerp is that slerp treats the vectors as directions instead of
	* positions in space.
	* The direction of the returned vector is interpolated by the angle
	* and the magnitude is interpolated between the magnitudes of the
	* from and to vectors.
	* ⚠ Slerp is computationally more expensive than lerp.
	* The function does not clamp t between 0 and 1.
	* @param t  interpolation parameter, 0-1
	* @param v1  vector to slerp from
	* @param v2  vector to slerp to
	* @return v  the slerped vector
	*/
	function slerp(t: number, v1: any, v2: any): any

	/**
	* Slerp travels the torque-minimal path maintaining constant
	* velocity, which means it travels along the straightest path along
	* the rounded surface of a sphere. Slerp is useful for interpolation
	* of rotations.
	* Slerp travels the torque-minimal path, which means it travels
	* along the straightest path the rounded surface of a sphere.
	* ⚠ The function does not clamp t between 0 and 1.
	* @param t  interpolation parameter, 0-1
	* @param q1  quaternion to slerp from
	* @param q2  quaternion to slerp to
	* @return q  the slerped quaternion
	*/
	function slerp(t: number, q1: any, q2: any): any

	/**
	* Creates a vector of arbitrary size. The vector is initialized
	* with numeric values from a table.
	* ⚠ The table values are converted to floating point
	* values. If a value cannot be converted, a 0 is stored in that
	* value position in the vector.
	* @param t  table of numbers
	* @return v  new vector
	*/
	function vector(t: object): any

	/**
	* Creates a new zero vector with all components set to 0.
	* @return v  new zero vector
	*/
	function vector3(): any

	/**
	* Creates a new vector with all components set to the
	* supplied scalar value.
	* @param n  scalar value to splat
	* @return v  new vector
	*/
	function vector3(n: number): any

	/**
	* Creates a new vector with all components set to the
	* corresponding values from the supplied vector. I.e.
	* This function creates a copy of the given vector.
	* @param v1  existing vector
	* @return v  new vector
	*/
	function vector3(v1: any): any

	/**
	* Creates a new vector with the components set to the
	* supplied values.
	* @param x  x coordinate
	* @param y  y coordinate
	* @param z  z coordinate
	* @return v  new vector
	*/
	function vector3(x: number, y: number, z: number): any

	/**
	* Creates a new zero vector with all components set to 0.
	* @return v  new zero vector
	*/
	function vector4(): any

	/**
	* Creates a new vector with all components set to the
	* supplied scalar value.
	* @param n  scalar value to splat
	* @return v  new vector
	*/
	function vector4(n: number): any

	/**
	* Creates a new vector with all components set to the
	* corresponding values from the supplied vector. I.e.
	* This function creates a copy of the given vector.
	* @param v1  existing vector
	* @return v  new vector
	*/
	function vector4(v1: any): any

	/**
	* Creates a new vector with the components set to the
	* supplied values.
	* @param x  x coordinate
	* @param y  y coordinate
	* @param z  z coordinate
	* @param w  w coordinate
	* @return v  new vector
	*/
	function vector4(x: number, y: number, z: number, w: number): any

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace zlib {

	/**
	* A lua error is raised is on error
	* @param buf  buffer to deflate
	* @return buf  deflated buffer
	*/
	function deflate(buf: string): string

	/**
	* A lua error is raised is on error
	* @param buf  buffer to inflate
	* @return buf  inflated buffer
	*/
	function inflate(buf: string): string

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace collectionfactory {

	/**
	* loaded
	*/
	let STATUS_LOADED: any

	/**
	* loading
	*/
	let STATUS_LOADING: any

	/**
	* unloaded
	*/
	let STATUS_UNLOADED: any

	/**
	* The URL identifies the collectionfactory component that should do the spawning.
	* Spawning is instant, but spawned game objects get their first update calls the following frame. The supplied parameters for position, rotation and scale
	* will be applied to the whole collection when spawned.
	* Script properties in the created game objects can be overridden through
	* a properties-parameter table. The table should contain game object ids
	* (hash) as keys and property tables as values to be used when initiating each
	* spawned game object.
	* See go.property for more information on script properties.
	* The function returns a table that contains a key for each game object
	* id (hash), as addressed if the collection file was top level, and the
	* corresponding spawned instance id (hash) as value with a unique path
	* prefix added to each instance.
	* ⚠ Calling collectionfactory.create create on a collection factory that is marked as dynamic without having loaded resources
	* using collectionfactory.load will synchronously load and create resources which may affect application performance.
	* @param url  the collection factory component to be used
	* @param position  position to assign to the newly spawned collection
	* @param rotation  rotation to assign to the newly spawned collection
	* @param properties  table of script properties to propagate to any new game object instances
	* @param scale  uniform scaling to apply to the newly spawned collection (must be greater than 0).
	* @return ids  a table mapping the id:s from the collection to the new instance id:s
	*/
	function create(url: any, position?: any, rotation?: any, properties?: object, scale?: number): object

	/**
	* This returns status of the collection factory.
	* Calling this function when the factory is not marked as dynamic loading always returns COMP_COLLECTION_FACTORY_STATUS_LOADED.
	* @param url  the collection factory component to get status from
	* @return status  status of the collection factory component

- `collectionfactory.STATUS_UNLOADED`
- `collectionfactory.STATUS_LOADING`
- `collectionfactory.STATUS_LOADED`

	*/
	function get_status(url?: any): any

	/**
	* Resources loaded are referenced by the collection factory component until the existing (parent) collection is destroyed or collectionfactory.unload is called.
	* Calling this function when the factory is not marked as dynamic loading does nothing.
	* @param url  the collection factory component to load
	* @param complete_function  function to call when resources are loaded.

`self`
The current object.
`url`
url of the collection factory component
`result`
True if resource were loaded successfully

	*/
	function load(url?: any, complete_function?: any): void

	/**
	* This decreases the reference count for each resource loaded with collectionfactory.load. If reference is zero, the resource is destroyed.
	* Calling this function when the factory is not marked as dynamic loading does nothing.
	* @param url  the collection factory component to unload
	*/
	function unload(url?: any): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace collectionproxy {

	/**
	* Post this message to a collection-proxy-component to start background loading of the referenced collection.
	* When the loading has completed, the message proxy_loaded will be sent back to the script.
	* A loaded collection must be initialized (message init) and enabled (message enable) in order to be simulated and drawn.
	*/
	//let async_load: string

	/**
	* return an indexed table of missing resources for a collection proxy. Each
	* entry is a hexadecimal string that represents the data of the specific
	* resource. This representation corresponds with the filename for each
	* individual resource that is exported when you bundle an application with
	* LiveUpdate functionality. It should be considered good practise to always
	* check whether or not there are any missing resources in a collection proxy
	* before attempting to load the collection proxy.
	* @param collectionproxy  the collectionproxy to check for missing
resources.
	* @return resources  the missing resources
	*/
	function missing_resources(collectionproxy: url): object

	/**
	* Post this message to a collection-proxy-component to disable the referenced collection, which in turn disables the contained game objects and components.
	*/
	//let disable: string

	/**
	* Post this message to a collection-proxy-component to enable the referenced collection, which in turn enables the contained game objects and components.
	* If the referenced collection was not initialized prior to this call, it will automatically be initialized.
	*/
	//let enable: string

	/**
	* Post this message to a collection-proxy-component to finalize the referenced collection, which in turn finalizes the contained game objects and components.
	*/
	//let final: string

	/**
	* Post this message to a collection-proxy-component to initialize the game objects and components in the referenced collection.
	* Sending enable to an uninitialized collection proxy automatically initializes it.
	* The init message simply provides a higher level of control.
	*/
	//let init: string

	/**
	* Post this message to a collection-proxy-component to start the loading of the referenced collection.
	* When the loading has completed, the message proxy_loaded will be sent back to the script.
	* A loaded collection must be initialized (message init) and enabled (message enable) in order to be simulated and drawn.
	*/
	//let load: string

	/**
	* This message is sent back to the script that initiated a collection proxy load when the referenced
	* collection is loaded. See documentation for load for examples how to use.
	*/
	//let proxy_loaded: string

	/**
	* This message is sent back to the script that initiated an unload with a collection proxy when
	* the referenced collection is unloaded. See documentation for unload for examples how to use.
	*/
	//let proxy_unloaded: string

	/**
	* Post this message to a collection-proxy-component to modify the time-step used when updating the collection controlled by the proxy.
	* The time-step is modified by a scaling `factor` and can be incremented either continuously or in discrete steps.
	* The continuous mode can be used for slow-motion or fast-forward effects.
	* The discrete mode is only useful when scaling the time-step to pass slower than real time (`factor` is below 1).
	* The time-step will then be set to 0 for as many frames as the scaling demands and then take on the full real-time-step for one frame,
	* to simulate pulses. E.g. if `factor` is set to `0.1` the time-step would be 0 for 9 frames, then be 1/60 for one
	* frame, 0 for 9 frames, and so on. The result in practice is that the game looks like it's updated at a much lower frequency than 60 Hz,
	* which can be useful for debugging when each frame needs to be inspected.
	*/
	//let set_time_step: string

	/**
	* Post this message to a collection-proxy-component to start the unloading of the referenced collection.
	* When the unloading has completed, the message proxy_unloaded will be sent back to the script.
	*/
	//let unload: string

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace factory {

	/**
	* loaded
	*/
	let STATUS_LOADED: any

	/**
	* loading
	*/
	let STATUS_LOADING: any

	/**
	* unloaded
	*/
	let STATUS_UNLOADED: any

	/**
	* The URL identifies which factory should create the game object.
	* If the game object is created inside of the frame (e.g. from an update callback), the game object will be created instantly, but none of its component will be updated in the same frame.
	* Properties defined in scripts in the created game object can be overridden through the properties-parameter below.
	* See go.property for more information on script properties.
	* ⚠ Calling factory.create on a factory that is marked as dynamic without having loaded resources
	* using factory.load will synchronously load and create resources which may affect application performance.
	* @param url  the factory that should create a game object.
	* @param position  the position of the new game object, the position of the game object calling `factory.create()` is used by default, or if the value is `nil`.
	* @param rotation  the rotation of the new game object, the rotation of the game object calling `factory.create()` is used by default, or if the value is `nil`.
	* @param properties  the properties defined in a script attached to the new game object.
	* @param scale  the scale of the new game object (must be greater than 0), the scale of the game object containing the factory is used by default, or if the value is `nil`
	* @return id  the global id of the spawned game object
	*/
	function create(url: any, position?: any, rotation?: any, properties?: object, scale?: any): hash

	/**
	* This returns status of the factory.
	* Calling this function when the factory is not marked as dynamic loading always returns
	* factory.STATUS_LOADED.
	* @param url  the factory component to get status from
	* @return status  status of the factory component

- `factory.STATUS_UNLOADED`
- `factory.STATUS_LOADING`
- `factory.STATUS_LOADED`

	*/
	function get_status(url?: any): any

	/**
	* Resources are referenced by the factory component until the existing (parent) collection is destroyed or factory.unload is called.
	* Calling this function when the factory is not marked as dynamic loading does nothing.
	* @param url  the factory component to load
	* @param complete_function  function to call when resources are loaded.

`self`
The current object.
`url`
url of the factory component
`result`
True if resources were loaded successfully

	*/
	function load(url?: any, complete_function?: any): void

	/**
	* This decreases the reference count for each resource loaded with factory.load. If reference is zero, the resource is destroyed.
	* Calling this function when the factory is not marked as dynamic loading does nothing.
	* @param url  the factory component to unload
	*/
	function unload(url?: any): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace label {

	/**
	* The color of the label. The type of the property is vector4.
	*/
	let color: any

	/**
	* The font used when rendering the label. The type of the property is hash.
	*/
	let font: any

	/**
	* Gets the text from a label component
	* @param url  the label to get the text from
	* @return metrics  the label text
	*/
	function get_text(url: any): string

	/**
	* Gets the text metrics from a label component
	* @param url  the label to get the (unscaled) metrics from
	* @return metrics  a table with the following fields:

- width
- height
- max_ascent
- max_descent

	*/
	function get_text_metrics(url: any): object

	/**
	* Sets the text of a label component
	* ⚠ This method uses the message passing that means the value will be set after `dispatch messages` step.
	* More information is available in the Application Lifecycle manual.
	* @param url  the label that should have a constant set
	* @param text  the text
	*/
	function set_text(url: any, text: string): void

	/**
	* The material used when rendering the label. The type of the property is hash.
	*/
	let material: any

	/**
	* The outline color of the label. The type of the property is vector4.
	*/
	let outline: any

	/**
	* The scale of the label. The type of the property is number (uniform)
	* or vector3 (non uniform).
	*/
	let scale: any

	/**
	* The shadow color of the label. The type of the property is vector4.
	*/
	let shadow: any

	/**
	* Returns the size of the label. The size will constrain the text if line break is enabled.
	* The type of the property is vector3.
	*/
	let size: any

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace model {

	/**
	* The current animation set on the component. The type of the property is hash.
	*/
	let animation: any

	/**
	* The normalized animation cursor. The type of the property is number.
	* ⚠ Please note that model events may not fire as expected when the cursor is manipulated directly.
	*/
	let cursor: any

	/**
	* The material used when rendering the model. The type of the property is hash.
	*/
	let material: any

	/**
	* Cancels all animation on a model component.
	* @param url  the model for which to cancel the animation
	*/
	function cancel(url: any): void

	/**
	* Gets the id of the game object that corresponds to a model skeleton bone.
	* The returned game object can be used for parenting and transform queries.
	* This function has complexity `O(n)`, where `n` is the number of bones in the model skeleton.
	* Game objects corresponding to a model skeleton bone can not be individually deleted.
	* @param url  the model to query
	* @param bone_id  id of the corresponding bone
	* @return id  id of the game object
	*/
	function get_go(url: any, bone_id: any): hash

	/**
	* Plays an animation on a model component with specified playback
	* mode and parameters.
	* An optional completion callback function can be provided that will be called when
	* the animation has completed playing. If no function is provided,
	* a model_animation_done message is sent to the script that started the animation.
	* ⚠ The callback is not called (or message sent) if the animation is
	* cancelled with model.cancel. The callback is called (or message sent) only for
	* animations that play with the following playback modes:
	* 
	* - `go.PLAYBACK_ONCE_FORWARD`
	* - `go.PLAYBACK_ONCE_BACKWARD`
	* - `go.PLAYBACK_ONCE_PINGPONG`
	* 
	* @param url  the model for which to play the animation
	* @param anim_id  id of the animation to play
	* @param playback  playback mode of the animation

- `go.PLAYBACK_ONCE_FORWARD`
- `go.PLAYBACK_ONCE_BACKWARD`
- `go.PLAYBACK_ONCE_PINGPONG`
- `go.PLAYBACK_LOOP_FORWARD`
- `go.PLAYBACK_LOOP_BACKWARD`
- `go.PLAYBACK_LOOP_PINGPONG`

	* @param play_properties  optional table with properties
Play properties table:

`blend_duration`
Duration of a linear blend between the current and new animation.
`offset`
The normalized initial value of the animation cursor when the animation starts playing.
`playback_rate`
The rate with which the animation will be played. Must be positive.

	* @param complete_function  function to call when the animation has completed.

`self`
The current object.
`message_id`
The name of the completion message, `"model_animation_done"`.
`message`
Information about the completion:


`animation_id` - the animation that was completed.
`playback` - the playback mode for the animation.


`sender`
The invoker of the callback: the model component.

	*/
	function play_anim(url: any, anim_id: any, playback: any, play_properties?: object, complete_function?: any): void

	/**
	* This message is sent when a Model animation has finished playing back to the script
	* that started the animation.
	* ⚠ No message is sent if a completion callback function was supplied
	* when the animation was started. No message is sent if the animation is cancelled with
	* model.cancel(). This message is sent only for animations that play with
	* the following playback modes:
	* 
	* - `go.PLAYBACK_ONCE_FORWARD`
	* - `go.PLAYBACK_ONCE_BACKWARD`
	* - `go.PLAYBACK_ONCE_PINGPONG`
	* 
	*/
	//let model_animation_done: string

	/**
	* The animation playback rate. A multiplier to the animation playback rate. The type of the property is number.
	*/
	let playback_rate: any

	/**
	* The texture hash id of the model. Used for getting/setting model texture for unit 0-7
	*/
	let textureN: any

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace particlefx {

	/**
	* postspawn state
	*/
	let EMITTER_STATE_POSTSPAWN: any

	/**
	* prespawn state
	*/
	let EMITTER_STATE_PRESPAWN: any

	/**
	* sleeping state
	*/
	let EMITTER_STATE_SLEEPING: any

	/**
	* spawning state
	*/
	let EMITTER_STATE_SPAWNING: any

	/**
	* Starts playing a particle FX component.
	* Particle FX started this way need to be manually stopped through `particlefx.stop()`.
	* Which particle FX to play is identified by the URL.
	* ⚠ A particle FX will continue to emit particles even if the game object the particle FX component belonged to is deleted. You can call `particlefx.stop()` to stop it from emitting more particles.
	* @param url  the particle fx that should start playing.
	* @param emitter_state_function  optional callback function that will be called when an emitter attached to this particlefx changes state.

`self`
The current object
`id`
The id of the particle fx component
`emitter`
The id of the emitter
`state`
the new state of the emitter:


- `particlefx.EMITTER_STATE_SLEEPING`
- `particlefx.EMITTER_STATE_PRESPAWN`
- `particlefx.EMITTER_STATE_SPAWNING`
- `particlefx.EMITTER_STATE_POSTSPAWN`

	*/
	function play(url: any, emitter_state_function?: any): void

	/**
	* Resets a shader constant for a particle FX component emitter.
	* The constant must be defined in the material assigned to the emitter.
	* Resetting a constant through this function implies that the value defined in the material will be used.
	* Which particle FX to reset a constant for is identified by the URL.
	* @param url  the particle FX that should have a constant reset
	* @param emitter  the id of the emitter
	* @param constant  the name of the constant
	*/
	function reset_constant(url: any, emitter: any, constant: any): void

	/**
	* Sets a shader constant for a particle FX component emitter.
	* The constant must be defined in the material assigned to the emitter.
	* Setting a constant through this function will override the value set for that constant in the material.
	* The value will be overridden until particlefx.reset_constant is called.
	* Which particle FX to set a constant for is identified by the URL.
	* @param url  the particle FX that should have a constant set
	* @param emitter  the id of the emitter
	* @param constant  the name of the constant
	* @param value  the value of the constant
	*/
	function set_constant(url: any, emitter: any, constant: any, value: any): void

	/**
	* Stops a particle FX component from playing.
	* Stopping a particle FX does not remove already spawned particles.
	* Which particle FX to stop is identified by the URL.
	* @param url  the particle fx that should stop playing
	*/
	function stop(url: any): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace sound {

	/**
	* Post this message to a sound-component to make it play its sound. Multiple voices is supported. The limit is set to 32 voices per sound component.
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* ⚠ A sound will continue to play even if the game object the sound component belonged to is deleted. You can send a `stop_sound` to stop the sound.
	*/
	//let play_sound: string

	/**
	* Post this message to a sound-component to set gain on all active playing voices.
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	*/
	//let set_gain: string

	/**
	* Get mixer group gain
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* @param group  group name
	* @return gain  gain in linear scale
	*/
	function get_group_gain(group: any): number

	/**
	* Get a mixer group name as a string.
	* ⚠ This function is to be used for debugging and
	* development tooling only. The function does a reverse hash lookup, which does not
	* return a proper string value when the game is built in release mode.
	* @param group  group name
	* @return name  group name
	*/
	function get_group_name(group: any): string

	/**
	* Get a table of all mixer group names (hashes).
	* @return groups  table of mixer group names
	*/
	function get_groups(): object

	/**
	* Get peak value from mixer group.
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* Also note that the returned value might be an approximation and in particular
	* the effective window might be larger than specified.
	* @param group  group name
	* @param window  window length in seconds
	* @return peak_l  peak value for left channel
	* @return peak_r  peak value for right channel
	*/
	function get_peak(group: any, window: number): number

	/**
	* Get RMS (Root Mean Square) value from mixer group. This value is the
	* square root of the mean (average) value of the squared function of
	* the instantaneous values.
	* For instance: for a sinewave signal with a peak gain of -1.94 dB (0.8 linear),
	* the RMS is `0.8 &times; 1/sqrt(2)` which is about 0.566.
	* ⚠ Note the returned value might be an approximation and in particular
	* the effective window might be larger than specified.
	* @param group  group name
	* @param window  window length in seconds
	* @return rms_l  RMS value for left channel
	* @return rms_r  RMS value for right channel
	*/
	function get_rms(group: any, window: number): number

	/**
	* Checks if background music is playing, e.g. from iTunes.
	* 🌎 On non mobile platforms,
	* this function always return `false`.
	* 🌎 On Android you can only get a correct reading
	* of this state if your game is not playing any sounds itself. This is a limitation
	* in the Android SDK. If your game is playing any sounds, *even with a gain of zero*, this
	* function will return `false`.
	* The best time to call this function is:
	* 
	* - In the `init` function of your main collection script before any sounds are triggered
	* - In a window listener callback when the window.WINDOW_EVENT_FOCUS_GAINED event is received
	* 
	* Both those times will give you a correct reading of the state even when your application is
	* swapped out and in while playing sounds and it works equally well on Android and iOS.
	* @return playing  `true` if music is playing, otherwise `false`.
	*/
	function is_music_playing(): boolean

	/**
	* Checks if a phone call is active. If there is an active phone call all
	* other sounds will be muted until the phone call is finished.
	* 🌎 On non mobile platforms,
	* this function always return `false`.
	* @return call_active  `true` if there is an active phone call, `false` otherwise.
	*/
	function is_phone_call_active(): boolean

	/**
	* Pause all active voices
	* @param url  the sound that should pause
	* @param pause  true if the sound should pause
	*/
	function pause(url: any, pause: any): void

	/**
	* Make the sound component play its sound. Multiple voices are supported. The limit is set to 32 voices per sound component.
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* ⚠ A sound will continue to play even if the game object the sound component belonged to is deleted. You can call `sound.stop()` to stop the sound.
	* @param url  the sound that should play
	* @param play_properties  
optional table with properties:
`delay`
delay in seconds before the sound starts playing, default is 0.
`gain`
sound gain between 0 and 1, default is 1. The final gain of the sound will be a combination of this gain, the group gain and the master gain.
`pan`
sound pan between -1 and 1, default is 0. The final pan of the sound will be an addition of this pan and the sound pan.
`speed`
sound speed where 1.0 is normal speed, 0.5 is half speed and 2.0 is double speed. The final speed of the sound will be a multiplication of this speed and the sound speed.

	* @param complete_function  function to call when the sound has finished playing.

`self`
The current object.
`message_id`
The name of the completion message, `"sound_done"`.
`message`
Information about the completion:


`play_id` - the sequential play identifier that was given by the sound.play function.


`sender`
The invoker of the callback: the sound component.

	*/
	function play(url: any, play_properties?: object, complete_function?: any): void

	/**
	* Set gain on all active playing voices of a sound.
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* @param url  the sound to set the gain of
	* @param gain  sound gain between 0 and 1. The final gain of the sound will be a combination of this gain, the group gain and the master gain.
	*/
	function set_gain(url: any, gain?: number): void

	/**
	* Set mixer group gain
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* @param group  group name
	* @param gain  gain in linear scale
	*/
	function set_group_gain(group: any, gain: number): void

	/**
	* Set panning on all active playing voices of a sound.
	* The valid range is from -1.0 to 1.0, representing -45 degrees left, to +45 degrees right.
	* @param url  the sound to set the panning value to
	* @param pan  sound panning between -1.0 and 1.0
	*/
	function set_pan(url: any, pan?: number): void

	/**
	* Stop playing all active voices
	* @param url  the sound that should stop
	*/
	function stop(url: any): void

	/**
	* This message is sent back to the sender of a `play_sound` message, if the sound
	* could be played to completion.
	*/
	//let sound_done: string

	/**
	* Post this message to a sound-component to make it stop playing all active voices
	*/
	//let stop_sound: string

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace spine {

	/**
	* READ ONLY The current animation set on the component.
	* hash.
	*/
	let animation: any

	/**
	* The normalized animation cursor. The type of the property is number.
	* ⚠ Please note that spine events may not fire as expected when the cursor is manipulated directly.
	*/
	let cursor: any

	/**
	* The material used when rendering the spine model. The type of the property is hash.
	*/
	let material: any

	/**
	* number.
	* The playback_rate is a non-negative number, a negative value will be clamped to 0.
	*/
	let playback_rate: any

	/**
	* The current skin on the component. The type of the property is hash.
	* If setting the skin property the skin must be present on the spine
	* model or a runtime error is signalled.
	*/
	let skin: any

	/**
	* Cancels all running animations on a specified spine model component.
	* @param url  the spine model for which to cancel the animation
	*/
	function cancel(url: any): void

	/**
	* Returns the id of the game object that corresponds to a specified skeleton bone.
	* The returned game object can be used for parenting and transform queries.
	* This function has complexity `O(n)`, where `n` is the number of bones in the spine model skeleton.
	* Game objects corresponding to a spine model skeleton bone can not be individually deleted.
	* @param url  the spine model to query
	* @param bone_id  id of the corresponding bone
	* @return id  id of the game object
	*/
	function get_go(url: any, bone_id: any): hash

	/**
	* Plays a specified animation on a spine model component with specified playback
	* mode and parameters.
	* An optional completion callback function can be provided that will be called when
	* the animation has completed playing. If no function is provided,
	* a spine_animation_done message is sent to the script that started the animation.
	* ⚠ The callback is not called (or message sent) if the animation is
	* cancelled with spine.cancel. The callback is called (or message sent) only for
	* animations that play with the following playback modes:
	* 
	* - `go.PLAYBACK_ONCE_FORWARD`
	* - `go.PLAYBACK_ONCE_BACKWARD`
	* - `go.PLAYBACK_ONCE_PINGPONG`
	* 
	* @param url  the spine model for which to play the animation
	* @param anim_id  id of the animation to play
	* @param playback  playback mode of the animation

- `go.PLAYBACK_ONCE_FORWARD`
- `go.PLAYBACK_ONCE_BACKWARD`
- `go.PLAYBACK_ONCE_PINGPONG`
- `go.PLAYBACK_LOOP_FORWARD`
- `go.PLAYBACK_LOOP_BACKWARD`
- `go.PLAYBACK_LOOP_PINGPONG`

	* @param play_properties  optional table with properties:

`blend_duration`
duration of a linear blend between the current and new animation.
`offset`
the normalized initial value of the animation cursor when the animation starts playing.
`playback_rate`
the rate with which the animation will be played. Must be positive.

	* @param complete_function  function to call when the animation has completed.

`self`
The current object.
`message_id`
The name of the completion message, `"spine_animation_done"`.
`message`
Information about the completion:


`animation_id` - the animation that was completed.
`playback` - the playback mode for the animation.


`sender`
The invoker of the callback: the spine model component.

	*/
	function play_anim(url: any, anim_id: any, playback: any, play_properties?: object, complete_function?: any): void

	/**
	* Resets any previously set IK target of a spine model, the position will be reset
	* to the original position from the spine scene.
	* @param url  the spine model containing the object
	* @param ik_constraint_id  id of the corresponding IK constraint object
	*/
	function reset_ik_target(url: any, ik_constraint_id: any): void

	/**
	* Sets a game object as target position of an inverse kinematic (IK) object. As the
	* target game object's position is updated, the constraint object is updated with the
	* new position.
	* @param url  the spine model containing the object
	* @param ik_constraint_id  id of the corresponding IK constraint object
	* @param target_url  target game object
	*/
	function set_ik_target(url: any, ik_constraint_id: any, target_url: any): void

	/**
	* Sets a static (vector3) target position of an inverse kinematic (IK) object.
	* @param url  the spine model containing the object
	* @param ik_constraint_id  id of the corresponding IK constraint object
	* @param position  target position
	*/
	function set_ik_target_position(url: any, ik_constraint_id: any, position: any): void

	/**
	* Sets the spine skin on a spine model.
	* @param url  the spine model for which to set skin
	* @param spine_skin  spine skin id
	* @param spine_slot  optional slot id to only change a specific slot
	*/
	function set_skin(url: any, spine_skin: any, spine_slot?: any): void

	/**
	* This message is sent when a Spine animation has finished playing back to the script
	* that started the animation.
	* ⚠ No message is sent if a completion callback function was supplied
	* when the animation was started. No message is sent if the animation is cancelled with
	* model.cancel(). This message is sent only for animations that play with
	* the following playback modes:
	* 
	* - `go.PLAYBACK_ONCE_FORWARD`
	* - `go.PLAYBACK_ONCE_BACKWARD`
	* - `go.PLAYBACK_ONCE_PINGPONG`
	* 
	*/
	//let spine_animation_done: string

	/**
	* This message is sent when Spine animation playback fires events. These events
	* has to be defined on the animation track in the Spine animation editor. An event
	* can contain custom values expressed in the fields `integer`, `float` and `string`.
	*/
	//let spine_event: string

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace sprite {

	/**
	* This message is sent to the sender of a `play_animation` message when the
	* animation has completed.
	* Note that this message is sent only for animations that play with the following
	* playback modes:
	* 
	* - Once Forward
	* - Once Backward
	* - Once Ping Pong
	* 
	* See play_animation for more information and examples of how to use
	* this message.
	*/
	//let animation_done: string

	/**
	* The normalized animation cursor. The type of the property is number.
	*/
	let cursor: any

	/**
	* The image used when rendering the sprite. The type of the property is hash.
	*/
	let image: any

	/**
	* The material used when rendering the sprite. The type of the property is hash.
	*/
	let material: any

	/**
	* Post this message to a sprite component to make it play an animation from its tile set.
	*/
	//let play_animation: string

	/**
	* number.
	* The playback_rate is a non-negative number, a negative value will be clamped to 0.
	*/
	let playback_rate: any

	/**
	* The non-uniform scale of the sprite. The type of the property is vector3.
	*/
	let scale: any

	/**
	* READ ONLY Returns the size of the sprite, not allowing for any additional scaling that may be applied.
	* The type of the property is vector3.
	*/
	let size: any

	/**
	* Play an animation on a sprite component from its tile set
	* An optional completion callback function can be provided that will be called when
	* the animation has completed playing. If no function is provided,
	* a animation_done message is sent to the script that started the animation.
	* @param url  the sprite that should play the animation
	* @param id  hash name hash of the animation to play
	* @param complete_function  function to call when the animation has completed.

`self`
The current object.
`message_id`
The name of the completion message, `"animation_done"`.
`message`
Information about the completion:


`current_tile` - the current tile of the sprite.
`id` - id of the animation that was completed.


`sender`
The invoker of the callback: the sprite component.

	* @param play_properties  optional table with properties:

`offset`
the normalized initial value of the animation cursor when the animation starts playing.
`playback_rate`
the rate with which the animation will be played. Must be positive.

	*/
	function play_flipbook(url: any, id: any, complete_function?: any, play_properties?: object): void

	/**
	* Sets horizontal flipping of the provided sprite's animations.
	* The sprite is identified by its URL.
	* If the currently playing animation is flipped by default, flipping it again will make it appear like the original texture.
	* @param url  the sprite that should flip its animations
	* @param flip  `true` if the sprite should flip its animations, `false` if not
	*/
	function set_hflip(url: any, flip: boolean): void

	/**
	* Sets vertical flipping of the provided sprite's animations.
	* The sprite is identified by its URL.
	* If the currently playing animation is flipped by default, flipping it again will make it appear like the original texture.
	* @param url  the sprite that should flip its animations
	* @param flip  `true` if the sprite should flip its animations, `false` if not
	*/
	function set_vflip(url: any, flip: boolean): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace tilemap {

	/**
	* The material used when rendering the tile map. The type of the property is hash.
	*/
	let material: any

	/**
	* The tile source used when rendering the tile map. The type of the property is hash.
	*/
	let tile_source: any

	/**
	* Get the bounds for a tile map. This function returns multiple values:
	* The lower left corner index x and y coordinates (1-indexed),
	* the tile map width and the tile map height.
	* The resulting values take all tile map layers into account, meaning that
	* the bounds are calculated as if all layers were collapsed into one.
	* @param url  the tile map
	* @return x  x coordinate of the bottom left corner
	* @return y  y coordinate of the bottom left corner
	* @return w  number of columns (width) in the tile map
	* @return h  number of rows (height) in the tile map
	*/
	function get_bounds(url: any): number

	/**
	* Get the tile set at the specified position in the tilemap.
	* The position is identified by the tile index starting at origo
	* with index 1, 1. (see tilemap.set_tile())
	* Which tile map and layer to query is identified by the URL and the
	* layer name parameters.
	* @param url  the tile map
	* @param layer  name of the layer for the tile
	* @param x  x-coordinate of the tile
	* @param y  y-coordinate of the tile
	* @return tile  index of the tile
	*/
	function get_tile(url: any, layer: any, x: number, y: number): number

	/**
	* Replace a tile in a tile map with a new tile.
	* The coordinates of the tiles are indexed so that the "first" tile just
	* above and to the right of origo has coordinates 1,1.
	* Tiles to the left of and below origo are indexed 0, -1, -2 and so forth.
	* 
	* +-------+-------+------+------+
	* |  0,3  |  1,3  | 2,3  | 3,3  |
	* +-------+-------+------+------+
	* |  0,2  |  1,2  | 2,2  | 3,2  |
	* +-------+-------+------+------+
	* |  0,1  |  1,1  | 2,1  | 3,1  |
	* +-------O-------+------+------+
	* |  0,0  |  1,0  | 2,0  | 3,0  |
	* +-------+-------+------+------+
	* 
	* 
	* The coordinates must be within the bounds of the tile map as it were created.
	* That is, it is not possible to extend the size of a tile map by setting tiles outside the edges.
	* To clear a tile, set the tile to number 0. Which tile map and layer to manipulate is identified by the URL and the layer name parameters.
	* @param url  the tile map
	* @param layer  name of the layer for the tile
	* @param x  x-coordinate of the tile
	* @param y  y-coordinate of the tile
	* @param tile  index of new tile to set
	* @param h_flipped  optional if the tile should be horizontally flipped
	* @param v_flipped  optional i the tile should be vertically flipped
	*/
	function set_tile(url: any, layer: any, x: number, y: number, tile: number, h_flipped?: boolean, v_flipped?: boolean): void

	/**
	* Sets the visibility of the tilemap layer
	* @param url  the tile map
	* @param layer  name of the layer for the tile
	* @param visible  should the layer be visible
	*/
	function set_visible(url: any, layer: any, visible: boolean): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

