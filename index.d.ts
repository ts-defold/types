/** @noSelfInFile */
/// <reference types="lua-types/5.1" />
/// <reference types="@typescript-to-lua/language-extensions" />

// DEFOLD. stable version 1.8.0 (fd3b8c652df601220d8651f581fa2fada8205237)
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare type hash = {
}

declare type url = {
}

declare type node = {
}

declare type buffer = {
}

declare type bufferstream = Array<number> & LuaUserdata & {
}

declare namespace vmath {

	export type vector3 = number & {
		x: number,
		y: number,
		z: number,
	}

	export type vector4 = number & {
		x: number,
		y: number,
		z: number,
		w: number,
	}

	export type matrix4 = number & {
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

	export type quaternion = number & {
		x: number,
		y: number,
		z: number,
		w: number,
	}
}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //



/**
* All ids in the engine are represented as hashes, so a string needs to be hashed
* before it can be compared with an id.
* @param s  string to hash
* @return hash  a hashed string
*/
declare function hash(s: string): hash

/**
* Returns a hexadecimal representation of a hash value.
* The returned string is always padded with leading zeros.
* @param h  hash value to get hex string for
* @return hex  hex representation of the hash
*/
declare function hash_to_hex(h: hash): string

/**
* Pretty printing of Lua values. This function prints Lua values
* in a manner similar to +print()+, but will also recurse into tables
* and pretty print them. There is a limit to how deep the function
* will recurse.
* @param v  value to print
*/
declare function pprint(v: any): void

// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace socket {

	/**
	* max numbers of sockets the select function can handle
	*/
	export let _SETSIZE: any

	/**
	* the current LuaSocket version
	*/
	export let _VERSION: any

	/**
	* This function is a shortcut that creates and returns a TCP client object connected to a remote
	* address at a given port. Optionally, the user can also specify the local address and port to
	* bind (`locaddr` and `locport`), or restrict the socket family to `"inet"` or `"inet6"`.
	* Without specifying family to connect, whether a tcp or tcp6 connection is created depends on
	* your system configuration.
	* @param address  the address to connect to.
	* @param port  the port to connect to.
	* @param locaddr  optional local address to bind to.
	* @param locport  optional local port to bind to.
	* @param family  optional socket family to use, `"inet"` or `"inet6"`.
	* @return tcp_client  a new IPv6 TCP client object, or `nil` in case of error.
	* @return error  the error message, or `nil` if no error occurred.
	*/
	export function connect(address: string, port: number, locaddr?: string, locport?: number, family?: string): LuaMultiReturn<[any, any, string, any]>

	/**
	* Returns the time in seconds, relative to the system epoch (Unix epoch time since January 1, 1970 (UTC) or Windows file time since January 1, 1601 (UTC)).
	* You should use the values returned by this function for relative measurements only.
	* @return seconds  the number of seconds elapsed.
	*/
	export function gettime(): number

	/**
	* This function creates and returns a clean try function that allows for cleanup before the exception is raised.
	* The `finalizer` function will be called in protected mode (see protect).
	* @param finalizer  a function that will be called before the try throws the exception.
	* @return try  the customized try function.
	*/
	export function newtry(finalizer: any): any

	/**
	* Converts a function that throws exceptions into a safe function. This function only catches exceptions thrown by try functions. It does not catch normal Lua errors.
	* ⚠ Beware that if your function performs some illegal operation that raises an error, the protected function will catch the error and return it as a string. This is because try functions uses errors as the mechanism to throw exceptions.
	* @param func  a function that calls a try function (or assert, or error) to throw exceptions.
	* @return safe_func  an equivalent function that instead of throwing exceptions, returns `nil` followed by an error message.
	*/
	export function protect(func: any): any

	/**
	* The function returns a list with the sockets ready for reading, a list with the sockets ready for writing and an error message. The error message is "timeout" if a timeout condition was met and nil otherwise. The returned tables are doubly keyed both by integers and also by the sockets themselves, to simplify the test if a specific socket has changed status.
	* `Recvt` and `sendt` parameters can be empty tables or `nil`. Non-socket values (or values with non-numeric indices) in these arrays will be silently ignored.
	* The returned tables are doubly keyed both by integers and also by the sockets themselves, to simplify the test if a specific socket has changed status.
	* ⚠ This function can monitor a limited number of sockets, as defined by the constant socket._SETSIZE. This number may be as high as 1024 or as low as 64 by default, depending on the system. It is usually possible to change this at compile time. Invoking select with a larger number of sockets will raise an error.
	* ⚠ A known bug in WinSock causes select to fail on non-blocking TCP sockets. The function may return a socket as writable even though the socket is not ready for sending.
	* ⚠ Calling select with a server socket in the receive parameter before a call to accept does not guarantee accept will return immediately. Use the settimeout method or accept might block forever.
	* ⚠ If you close a socket and pass it to select, it will be ignored.
	* (Using select with non-socket objects: Any object that implements `getfd` and `dirty` can be used with select, allowing objects from other libraries to be used within a socket.select driven loop.)
	* @param recvt  array with the sockets to test for characters available for reading.
	* @param sendt  array with sockets that are watched to see if it is OK to immediately write on them.
	* @param timeout  the maximum amount of time (in seconds) to wait for a change in status. Nil, negative or omitted timeout value allows the function to block indefinitely.
	* @return sockets_r  a list with the sockets ready for reading.
	* @return sockets_w  a list with the sockets ready for writing.
	* @return error  an error message. "timeout" if a timeout condition was met, otherwise `nil`.
	*/
	export function select(recvt: any, sendt: any, timeout?: number): LuaMultiReturn<[any, any, string, any]>

	/**
	* This function drops a number of arguments and returns the remaining.
	* It is useful to avoid creation of dummy variables:
	* `D` is the number of arguments to drop. `Ret1` to `retN` are the arguments.
	* The function returns `retD+1` to `retN`.
	* @param d  the number of arguments to drop.
	* @param ret1  argument 1.
	* @param ret2  argument 2.
	* @param retN  argument N.
	* @return retD_1  argument D+1.
	* @return retD_2  argument D+2.
	* @return retN  argument N.
	*/
	export function skip(d: number, ret1?: any, ret2?: any, retN?: any): any
	export function skip(d: number, ret1?: any, ret2?: any, retN?: any): any

	/**
	* Freezes the program execution during a given amount of time.
	* @param time  the number of seconds to sleep for.
	*/
	export function sleep(time: number): void

	/**
	* Creates and returns an IPv4 TCP master object. A master object can be transformed into a server object with the method `listen` (after a call to `bind`) or into a client object with the method `connect`. The only other method supported by a master object is the `close` method.
	* @return tcp_master  a new IPv4 TCP master object, or `nil` in case of error.
	* @return error  the error message, or `nil` if no error occurred.
	*/
	export function tcp(): LuaMultiReturn<[any, any, string, any]>

	/**
	* Creates and returns an IPv6 TCP master object. A master object can be transformed into a server object with the method `listen` (after a call to `bind`) or into a client object with the method connect. The only other method supported by a master object is the close method.
	* Note: The TCP object returned will have the option "ipv6-v6only" set to true.
	* @return tcp_master  a new IPv6 TCP master object, or `nil` in case of error.
	* @return error  the error message, or `nil` if no error occurred.
	*/
	export function tcp6(): LuaMultiReturn<[any, any, string, any]>

	/**
	* Creates and returns an unconnected IPv4 UDP object. Unconnected objects support the `sendto`, `receive`, `receivefrom`, `getoption`, `getsockname`, `setoption`, `settimeout`, `setpeername`, `setsockname`, and `close` methods. The `setpeername` method is used to connect the object.
	* @return udp_unconnected  a new unconnected IPv4 UDP object, or `nil` in case of error.
	* @return error  the error message, or `nil` if no error occurred.
	*/
	export function udp(): LuaMultiReturn<[any, any, string, any]>

	/**
	* Creates and returns an unconnected IPv6 UDP object. Unconnected objects support the `sendto`, `receive`, `receivefrom`, `getoption`, `getsockname`, `setoption`, `settimeout`, `setpeername`, `setsockname`, and `close` methods. The `setpeername` method is used to connect the object.
	* Note: The UDP object returned will have the option "ipv6-v6only" set to true.
	* @return udp_unconnected  a new unconnected IPv6 UDP object, or `nil` in case of error.
	* @return error  the error message, or `nil` if no error occurred.
	*/
	export function udp6(): LuaMultiReturn<[any, any, string, any]>

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace b2d {

	/**
	* Get the Box2D body from a collision object
	* @param url  the url to the game object collision component
	* @return body  the body if successful. Otherwise `nil`.
	*/
	export function get_body(url: string | hash | url): any

	/**
	* Get the Box2D world from the current collection
	* @return world  the world if successful. Otherwise `nil`.
	*/
	export function get_world(): any

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace b2d.body {

	/**
	* Dynamic body
	*/
	export let B2_DYNAMIC_BODY: any

	/**
	* Kinematic body
	*/
	export let B2_KINEMATIC_BODY: any

	/**
	* Static (immovable) body
	*/
	export let B2_STATIC_BODY: any

	/**
	* Apply an angular impulse.
	* @param body  body
	* @param impulse  impulse the angular impulse in units of kg*m*m/s
	*/
	export function apply_angular_impulse(body: any, impulse: number): void

	/**
	* Apply a force at a world point. If the force is not
	* applied at the center of mass, it will generate a torque and
	* affect the angular velocity. This wakes up the body.
	* @param body  body
	* @param force  the world force vector, usually in Newtons (N).
	* @param point  the world position of the point of application.
	*/
	export function apply_force(body: any, force: vmath.vector3, point: vmath.vector3): void

	/**
	* Apply a force to the center of mass. This wakes up the body.
	* @param body  body
	* @param force  the world force vector, usually in Newtons (N).
	*/
	export function apply_force_to_center(body: any, force: vmath.vector3): void

	/**
	* Apply an impulse at a point. This immediately modifies the velocity.
	* It also modifies the angular velocity if the point of application
	* is not at the center of mass. This wakes up the body.
	* @param body  body
	* @param impulse  the world impulse vector, usually in N-seconds or kg-m/s.
	* @param point  the world position of the point of application.
	*/
	export function apply_linear_impulse(body: any, impulse: vmath.vector3, point: vmath.vector3): void

	/**
	* Apply a torque. This affects the angular velocity
	* without affecting the linear velocity of the center of mass.
	* This wakes up the body.
	* @param body  body
	* @param torque  torque about the z-axis (out of the screen), usually in N-m.
	*/
	export function apply_torque(body: any, torque: number): void

	/**
	* Print the body representation to the log output
	* @param body  body
	*/
	export function dump(body: any): void

	/**
	* Get the angular damping of the body.
	* @param body  body
	* @return damping  the damping
	*/
	export function get_angular_damping(body: any): number

	/**
	* Set the angular velocity.
	* @param body  body
	* @param omega  the new angular velocity in radians/second.
	*/
	export function get_angular_velocity(body: any, omega: number): void

	/**
	* Get the angular velocity.
	* @param body  body
	* @return velocity  the angular velocity in radians/second.
	*/
	export function get_angular_velocity(body: any): number

	/**
	* Get the gravity scale of the body.
	* @param body  body
	* @return scale  the scale
	*/
	export function get_gravity_scale(body: any): number

	/**
	* Get the rotational inertia of the body about the local origin.
	* @param body  body
	* @return inertia  the rotational inertia, usually in kg-m^2.
	*/
	export function get_inertia(body: any): number

	/**
	* Get the linear damping of the body.
	* @param body  body
	* @return damping  the damping
	*/
	export function get_linear_damping(body: any): number

	/**
	* Get the linear velocity of the center of mass.
	* @param body  body
	* @return velocity  the linear velocity of the center of mass.
	*/
	export function get_linear_velocity(body: any): vmath.vector3

	/**
	* Get the world linear velocity of a world point attached to this body.
	* @param body  body
	* @param world_point  a point in world coordinates.
	* @return velocity  the world velocity of a point.
	*/
	export function get_linear_velocity_from_world_point(body: any, world_point: vmath.vector3): vmath.vector3

	/**
	* Get the world velocity of a local point.
	* @param body  body
	* @param world_point  a point in local coordinates.
	* @return velocity  the world velocity of a point.
	*/
	export function get_linear_velocity_from_world_point(body: any, world_point: vmath.vector3): vmath.vector3

	/**
	* Get the local position of the center of mass.
	* @param body  body
	* @return center  Get the local position of the center of mass.
	*/
	export function get_local_center(body: any): vmath.vector3

	/**
	* Gets a local point relative to the body's origin given a world point.
	* @param body  body
	* @param world_point  a point in world coordinates.
	* @return vector  the corresponding local point relative to the body's origin.
	*/
	export function get_local_point(body: any, world_point: vmath.vector3): vmath.vector3

	/**
	* Gets a local vector given a world vector.
	* @param body  body
	* @param world_vector  a vector in world coordinates.
	* @return vector  the corresponding local vector.
	*/
	export function get_local_vector(body: any, world_vector: vmath.vector3): vmath.vector3

	/**
	* Get the total mass of the body.
	* @param body  body
	* @return mass  the mass, usually in kilograms (kg).
	*/
	export function get_mass(body: any): number

	/**
	* Get the next body in the world's body list.
	* @param body  body
	* @return body  the next body
	*/
	export function get_next(body: any): any

	/**
	* Get the world body origin position.
	* @param body  body
	* @return position  the world position of the body's origin.
	*/
	export function get_position(body: any): vmath.vector3

	/**
	* Get the type of this body.
	* @param body  body
	* @return type  the body type
	*/
	export function get_type(body: any): any

	/**
	* Get the parent world of this body.
	* @param body  body
	* @return world  
	*/
	export function get_world(body: any): any

	/**
	* Get the angle in radians.
	* @param body  body
	* @return angle  the current world rotation angle in radians.
	*/
	export function get_world_center(body: any): number

	/**
	* Get the world position of the center of mass.
	* @param body  body
	* @return center  Get the world position of the center of mass.
	*/
	export function get_world_center(body: any): vmath.vector3

	/**
	* Get the world coordinates of a point given the local coordinates.
	* @param body  body
	* @param local_vector  localPoint a point on the body measured relative the the body's origin.
	* @return vector  the same point expressed in world coordinates.
	*/
	export function get_world_point(body: any, local_vector: vmath.vector3): vmath.vector3

	/**
	* Get the world coordinates of a vector given the local coordinates.
	* @param body  body
	* @param local_vector  a vector fixed in the body.
	* @return vector  the same vector expressed in world coordinates.
	*/
	export function get_world_vector(body: any, local_vector: vmath.vector3): vmath.vector3

	/**
	* Get the active state of the body.
	* @param body  body
	* @return enabled  is the body active
	*/
	export function is_active(body: any): any

	/**
	* Get the sleeping state of this body.
	* @param body  body
	* @return enabled  true if the body is awake, false if it's sleeping.
	*/
	export function is_awake(body: any): any

	/**
	* Is this body in bullet mode
	* @param body  body
	* @return enabled  true if the body is in bullet mode
	*/
	export function is_bullet(body: any): any

	/**
	* Does this body have fixed rotation?
	* @param body  body
	* @return enabled  is the rotation fixed
	*/
	export function is_fixed_rotation(body: any): any

	/**
	* Is this body allowed to sleep
	* @param body  body
	* @return enabled  true if the body is allowed to sleep
	*/
	export function is_sleeping_allowed(body: any): any

	/**
	* This resets the mass properties to the sum of the mass properties of the fixtures.
	* This normally does not need to be called unless you called SetMassData to override
	* @param body  body
	*/
	export function reset_mass_data(body: any): void

	/**
	* Set the active state of the body. An inactive body is not
	* simulated and cannot be collided with or woken up.
	* If you pass a flag of true, all fixtures will be added to the
	* broad-phase.
	* If you pass a flag of false, all fixtures will be removed from
	* the broad-phase and all contacts will be destroyed.
	* Fixtures and joints are otherwise unaffected. You may continue
	* to create/destroy fixtures and joints on inactive bodies.
	* Fixtures on an inactive body are implicitly inactive and will
	* not participate in collisions, ray-casts, or queries.
	* Joints connected to an inactive body are implicitly inactive.
	* An inactive body is still owned by a b2World object and remains
	* in the body list.
	* @param body  body
	* @param enable  true if the body should be active
	*/
	export function set_active(body: any, enable: any): void

	/**
	* Set the angular damping of the body.
	* @param body  body
	* @param damping  the damping
	*/
	export function set_angular_damping(body: any, damping: number): void

	/**
	* Set the sleep state of the body. A sleeping body has very low CPU cost.
	* @param body  body
	* @param enable  flag set to false to put body to sleep, true to wake it.
	*/
	export function set_awake(body: any, enable: any): void

	/**
	* Should this body be treated like a bullet for continuous collision detection?
	* @param body  body
	* @param enable  if true, the body will be in bullet mode
	*/
	export function set_bullet(body: any, enable: any): void

	/**
	* Set this body to have fixed rotation. This causes the mass to be reset.
	* @param body  body
	* @param enable  true if the rotation should be fixed
	*/
	export function set_fixed_rotation(body: any, enable: any): void

	/**
	* Set the gravity scale of the body.
	* @param body  body
	* @param scale  the scale
	*/
	export function set_gravity_scale(body: any, scale: number): void

	/**
	* Set the linear damping of the body.
	* @param body  body
	* @param damping  the damping
	*/
	export function set_linear_damping(body: any, damping: number): void

	/**
	* Set the linear velocity of the center of mass.
	* @param body  body
	* @param velocity  the new linear velocity of the center of mass.
	*/
	export function set_linear_velocity(body: any, velocity: vmath.vector3): void

	/**
	* You can disable sleeping on this body. If you disable sleeping, the body will be woken.
	* @param body  body
	* @param enable  if false, the body will never sleep, and consume more CPU
	*/
	export function set_sleeping_allowed(body: any, enable: any): void

	/**
	* Set the position of the body's origin and rotation.
	* This breaks any contacts and wakes the other bodies.
	* Manipulating a body's transform may cause non-physical behavior.
	* @param body  body
	* @param position  the world position of the body's local origin.
	* @param angle  the world position of the body's local origin.
	*/
	export function set_transform(body: any, position: vmath.vector3, angle: number): void

	/**
	* Set the type of this body. This may alter the mass and velocity.
	* @param body  body
	* @param type  the body type
	*/
	export function set_type(body: any, type: any): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace crash {

	/**
	* android build fingerprint
	*/
	export let SYSFIELD_ANDROID_BUILD_FINGERPRINT: any

	/**
	* system device language as reported by sys.get_sys_info
	*/
	export let SYSFIELD_DEVICE_LANGUAGE: any

	/**
	* device model as reported by sys.get_sys_info
	*/
	export let SYSFIELD_DEVICE_MODEL: any

	/**
	* engine version as hash
	*/
	export let SYSFIELD_ENGINE_HASH: any

	/**
	* engine version as release number
	*/
	export let SYSFIELD_ENGINE_VERSION: any

	/**
	* system language as reported by sys.get_sys_info
	*/
	export let SYSFIELD_LANGUAGE: any

	/**
	* device manufacturer as reported by sys.get_sys_info
	*/
	export let SYSFIELD_MANUFACTURER: any

	/**
	* The max number of sysfields.
	*/
	export let SYSFIELD_MAX: any

	/**
	* system name as reported by sys.get_sys_info
	*/
	export let SYSFIELD_SYSTEM_NAME: any

	/**
	* system version as reported by sys.get_sys_info
	*/
	export let SYSFIELD_SYSTEM_VERSION: any

	/**
	* system territory as reported by sys.get_sys_info
	*/
	export let SYSFIELD_TERRITORY: any

	/**
	* The max number of user fields.
	*/
	export let USERFIELD_MAX: any

	/**
	* The max size of a single user field.
	*/
	export let USERFIELD_SIZE: any

	/**
	* A table is returned containing the addresses of the call stack.
	* @param handle  crash dump handle
	* @return backtrace  table containing the backtrace
	*/
	export function get_backtrace(handle: number): any

	/**
	* The format of read text blob is platform specific
	* and not guaranteed
	* but can be useful for manual inspection.
	* @param handle  crash dump handle
	* @return blob  string with the platform specific data
	*/
	export function get_extra_data(handle: number): string

	/**
	* The function returns a table containing entries with sub-tables that
	* have fields 'name' and 'address' set for all loaded modules.
	* @param handle  crash dump handle
	* @return modules  module table
	*/
	export function get_modules(handle: number): any

	/**
	* read signal number from a crash report
	* @param handle  crash dump handle
	* @return signal  signal number
	*/
	export function get_signum(handle: number): number

	/**
	* reads a system field from a loaded crash dump
	* @param handle  crash dump handle
	* @param index  system field enum. Must be less than crash.SYSFIELD_MAX
	* @return value  value recorded in the crash dump, or `nil` if it didn't exist
	*/
	export function get_sys_field(handle: number, index: number): LuaMultiReturn<[string, any]>

	/**
	* reads user field from a loaded crash dump
	* @param handle  crash dump handle
	* @param index  user data slot index
	* @return value  user data value recorded in the crash dump
	*/
	export function get_user_field(handle: number, index: number): string

	/**
	* The crash dump will be removed from disk upon a successful
	* load, so loading is one-shot.
	* @return handle  handle to the loaded dump, or `nil` if no dump was found
	*/
	export function load_previous(): LuaMultiReturn<[number, any]>

	/**
	* releases a previously loaded crash dump
	* @param handle  handle to loaded crash dump
	*/
	export function release(handle: number): void

	/**
	* Crashes occuring before the path is set will be stored to a default engine location.
	* @param path  file path to use
	*/
	export function set_file_path(path: string): void

	/**
	* Store a user value that will get written to a crash dump when
	* a crash occurs. This can be user id:s, breadcrumb data etc.
	* There are 32 slots indexed from 0. Each slot stores at most 255 characters.
	* @param index  slot index. 0-indexed
	* @param value  string value to store
	*/
	export function set_user_field(index: number, value: string): void

	/**
	* Performs the same steps as if a crash had just occured but
	* allows the program to continue.
	* The generated dump can be read by crash.load_previous
	*/
	export function write_dump(): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace go {

	/**
	* Post this message to a game object instance to make that instance acquire the user input focus.
	* User input is distributed by the engine to every instance that has
	* requested it. The last instance to request focus will receive it first.
	* This means that the scripts in the instance will have first-hand-chance
	* at reacting on user input, possibly consuming it (by returning
	* `true` from `on_input`) so that no other instances
	* can react on it. The most common case is for a script to send this message
	* to itself when it needs to respond to user input.
	* A script belonging to an instance which has the user input focus will
	* receive the input actions in its `on_input` callback function.
	* See on_input for more information on how user input can be
	* handled.
	*/
	export type acquire_input_focus = "acquire_input_focus"

	/**
	* This message disables the receiving component. All components are enabled by default, which means they will receive input, updates
	* and be a part of the simulation. A component is disabled when it receives the `disable` message.
	* undefined Components that currently supports this message are:
	* 
	* - Collection Proxy
	* - Collision Object
	* - Gui
	* - Label
	* - Spine Model
	* - Sprite
	* - Tile Grid
	* - Model
	* - Mesh
	* 
	*/
	export type disable = "disable"

	/**
	* This message enables the receiving component. All components are enabled by default, which means they will receive input, updates
	* and be a part of the simulation. A component is disabled when it receives the `disable` message.
	* undefined Components that currently supports this message are:
	* 
	* - Collection Proxy
	* - Collision Object
	* - Gui
	* - Label
	* - Spine Model
	* - Sprite
	* - Tile Grid
	* - Model
	* - Mesh
	* 
	*/
	export type enable = "enable"

	/**
	* The rotation of the game object expressed in Euler angles.
	* Euler angles are specified in degrees in the interval (-360, 360).
	* The type of the property is vector3.
	*/
	export let euler: any


	/**
	* This is a callback-function, which is called by the engine at fixed intervals to update the state of a script
	* component. The function will be called if 'Fixed Update Frequency' is enabled in the Engine section of game.project.
	* It can for instance be used to update game logic with the physics simulation if using a fixed timestep for the
	* physics (enabled by ticking 'Use Fixed Timestep' in the Physics section of game.project).
	* @param self  reference to the script state to be used for storing data
	* @param dt  the time-step of the frame update
	*/
	export function fixed_update(self: object, dt: number): void

	/**
	* in-back
	*/
	export let EASING_INBACK: any

	/**
	* in-bounce
	*/
	export let EASING_INBOUNCE: any

	/**
	* in-circlic
	*/
	export let EASING_INCIRC: any

	/**
	* in-cubic
	*/
	export let EASING_INCUBIC: any

	/**
	* in-elastic
	*/
	export let EASING_INELASTIC: any

	/**
	* in-exponential
	*/
	export let EASING_INEXPO: any

	/**
	* in-out-back
	*/
	export let EASING_INOUTBACK: any

	/**
	* in-out-bounce
	*/
	export let EASING_INOUTBOUNCE: any

	/**
	* in-out-circlic
	*/
	export let EASING_INOUTCIRC: any

	/**
	* in-out-cubic
	*/
	export let EASING_INOUTCUBIC: any

	/**
	* in-out-elastic
	*/
	export let EASING_INOUTELASTIC: any

	/**
	* in-out-exponential
	*/
	export let EASING_INOUTEXPO: any

	/**
	* in-out-quadratic
	*/
	export let EASING_INOUTQUAD: any

	/**
	* in-out-quartic
	*/
	export let EASING_INOUTQUART: any

	/**
	* in-out-quintic
	*/
	export let EASING_INOUTQUINT: any

	/**
	* in-out-sine
	*/
	export let EASING_INOUTSINE: any

	/**
	* in-quadratic
	*/
	export let EASING_INQUAD: any

	/**
	* in-quartic
	*/
	export let EASING_INQUART: any

	/**
	* in-quintic
	*/
	export let EASING_INQUINT: any

	/**
	* in-sine
	*/
	export let EASING_INSINE: any

	/**
	* linear interpolation
	*/
	export let EASING_LINEAR: any

	/**
	* out-back
	*/
	export let EASING_OUTBACK: any

	/**
	* out-bounce
	*/
	export let EASING_OUTBOUNCE: any

	/**
	* out-circlic
	*/
	export let EASING_OUTCIRC: any

	/**
	* out-cubic
	*/
	export let EASING_OUTCUBIC: any

	/**
	* out-elastic
	*/
	export let EASING_OUTELASTIC: any

	/**
	* out-exponential
	*/
	export let EASING_OUTEXPO: any

	/**
	* out-in-back
	*/
	export let EASING_OUTINBACK: any

	/**
	* out-in-bounce
	*/
	export let EASING_OUTINBOUNCE: any

	/**
	* out-in-circlic
	*/
	export let EASING_OUTINCIRC: any

	/**
	* out-in-cubic
	*/
	export let EASING_OUTINCUBIC: any

	/**
	* out-in-elastic
	*/
	export let EASING_OUTINELASTIC: any

	/**
	* out-in-exponential
	*/
	export let EASING_OUTINEXPO: any

	/**
	* out-in-quadratic
	*/
	export let EASING_OUTINQUAD: any

	/**
	* out-in-quartic
	*/
	export let EASING_OUTINQUART: any

	/**
	* out-in-quintic
	*/
	export let EASING_OUTINQUINT: any

	/**
	* out-in-sine
	*/
	export let EASING_OUTINSINE: any

	/**
	* out-quadratic
	*/
	export let EASING_OUTQUAD: any

	/**
	* out-quartic
	*/
	export let EASING_OUTQUART: any

	/**
	* out-quintic
	*/
	export let EASING_OUTQUINT: any

	/**
	* out-sine
	*/
	export let EASING_OUTSINE: any

	/**
	* loop backward
	*/
	export let PLAYBACK_LOOP_BACKWARD: any

	/**
	* loop forward
	*/
	export let PLAYBACK_LOOP_FORWARD: any

	/**
	* ping pong loop
	*/
	export let PLAYBACK_LOOP_PINGPONG: any

	/**
	* no playback
	*/
	export let PLAYBACK_NONE: any

	/**
	* once backward
	*/
	export let PLAYBACK_ONCE_BACKWARD: any

	/**
	* once forward
	*/
	export let PLAYBACK_ONCE_FORWARD: any

	/**
	* once ping pong
	*/
	export let PLAYBACK_ONCE_PINGPONG: any

	/**
	* This is only supported for numerical properties. If the node property is already being
	* animated, that animation will be canceled and replaced by the new one.
	* If a `complete_function` (lua function) is specified, that function will be called when the animation has completed.
	* By starting a new animation in that function, several animations can be sequenced together. See the examples for more information.
	* ⚠ If you call `go.animate()` from a game object's `final()` function,
	* any passed `complete_function` will be ignored and never called upon animation completion.
	* See the properties guide for which properties can be animated and the animation guide for how
	* them.
	* @param url  url of the game object or component having the property
	* @param property  id of the property to animate
	* @param playback  playback mode of the animation

- `go.PLAYBACK_ONCE_FORWARD`
- `go.PLAYBACK_ONCE_BACKWARD`
- `go.PLAYBACK_ONCE_PINGPONG`
- `go.PLAYBACK_LOOP_FORWARD`
- `go.PLAYBACK_LOOP_BACKWARD`
- `go.PLAYBACK_LOOP_PINGPONG`

	* @param to  target property value
	* @param easing  easing to use during animation. Either specify a constant, see the animation guide for a complete list, or a vmath.vector with a curve
	* @param duration  duration of the animation in seconds
	* @param delay  delay before the animation starts in seconds
	* @param complete_function  optional function to call when the animation has completed

`self`

The current object.

`url`

The game object or component instance for which the property is animated.

`property`

The id of the animated property.


	*/
	export function animate(url: string | hash | url, property: string | hash, playback: any, to: number | vmath.vector3 | vmath.vector4 | vmath.quaternion, easing: any, duration: number, delay?: number, complete_function?: any): void

	/**
	* By calling this function, all or specified stored property animations of the game object or component will be canceled.
	* See the properties guide for which properties can be animated and the animation guide for how to animate them.
	* @param url  url of the game object or component
	* @param property  optional id of the property to cancel
	*/
	export function cancel_animations(url: string | hash | url, property?: string | hash): void

	/**
	* Delete one or more game objects identified by id. Deletion is asynchronous meaning that
	* the game object(s) are scheduled for deletion which will happen at the end of the current
	* frame. Note that game objects scheduled for deletion will be counted against
	* `max_instances` in "game.project" until they are actually removed.
	* ⚠ Deleting a game object containing a particle FX component emitting particles will not immediately stop the particle FX from emitting particles. You need to manually stop the particle FX using `particlefx.stop()`.
	* ⚠ Deleting a game object containing a sound component that is playing will not immediately stop the sound from playing. You need to manually stop the sound using `sound.stop()`.
	* @param id  optional id or table of id's of the instance(s) to delete, the instance of the calling script is deleted by default
	* @param recursive  optional boolean, set to true to recursively delete child hiearchy in child to parent order
	*/
	 function delete$(id?: any, recursive?: boolean): void
	export { delete$ as delete }

	/**
	* check if the specified game object exists
	* @param url  url of the game object to check
	* @return exists  true if the game object exists
	*/
	export function exists(url: string | hash | url): any

	/**
	* gets a named property of the specified game object or component
	* @param url  url of the game object or component having the property
	* @param property  id of the property to retrieve
	* @param options  optional options table
index into array property (1 based)
name of internal property
	* @return value  the value of the specified property
	*/
	export function get(url: string | hash | url, property: string | hash, options?: any): any

	/**
	* Returns or constructs an instance identifier. The instance id is a hash
	* of the absolute path to the instance.
	* 
	* - If `path` is specified, it can either be absolute or relative to the instance of the calling script.
	* - If `path` is not specified, the id of the game object instance the script is attached to will be returned.
	* 
	* @param path  path of the instance for which to return the id
	* @return id  instance id
	*/
	export function get_id(path?: string): hash

	/**
	* Get the parent for a game object instance.
	* @param id  optional id of the game object instance to get parent for, defaults to the instance containing the calling script
	* @return parent_id  parent instance or `nil`
	*/
	export function get_parent(id?: string | hash | url): LuaMultiReturn<[hash, any]>

	/**
	* The position is relative the parent (if any). Use go.get_world_position to retrieve the global world position.
	* @param id  optional id of the game object instance to get the position for, by default the instance of the calling script
	* @return position  instance position
	*/
	export function get_position(id?: string | hash | url): vmath.vector3

	/**
	* The rotation is relative to the parent (if any). Use go.get_world_rotation to retrieve the global world rotation.
	* @param id  optional id of the game object instance to get the rotation for, by default the instance of the calling script
	* @return rotation  instance rotation
	*/
	export function get_rotation(id?: string | hash | url): vmath.quaternion

	/**
	* The scale is relative the parent (if any). Use go.get_world_scale to retrieve the global world 3D scale factor.
	* @param id  optional id of the game object instance to get the scale for, by default the instance of the calling script
	* @return scale  instance scale factor
	*/
	export function get_scale(id?: string | hash | url): vmath.vector3

	/**
	* The uniform scale is relative the parent (if any). If the underlying scale vector is non-uniform the min element of the vector is returned as the uniform scale factor.
	* @param id  optional id of the game object instance to get the uniform scale for, by default the instance of the calling script
	* @return scale  uniform instance scale factor
	*/
	export function get_scale_uniform(id?: string | hash | url): number

	/**
	* The function will return the world position calculated at the end of the previous frame.
	* Use go.get_position to retrieve the position relative to the parent.
	* @param id  optional id of the game object instance to get the world position for, by default the instance of the calling script
	* @return position  instance world position
	*/
	export function get_world_position(id?: string | hash | url): vmath.vector3

	/**
	* The function will return the world rotation calculated at the end of the previous frame.
	* Use go.get_rotation to retrieve the rotation relative to the parent.
	* @param id  optional id of the game object instance to get the world rotation for, by default the instance of the calling script
	* @return rotation  instance world rotation
	*/
	export function get_world_rotation(id?: string | hash | url): vmath.quaternion

	/**
	* The function will return the world 3D scale factor calculated at the end of the previous frame.
	* Use go.get_scale to retrieve the 3D scale factor relative to the parent.
	* This vector is derived by decomposing the transformation matrix and should be used with care.
	* For most cases it should be fine to use go.get_world_scale_uniform instead.
	* @param id  optional id of the game object instance to get the world scale for, by default the instance of the calling script
	* @return scale  instance world 3D scale factor
	*/
	export function get_world_scale(id?: string | hash | url): vmath.vector3

	/**
	* The function will return the world scale factor calculated at the end of the previous frame.
	* Use go.get_scale_uniform to retrieve the scale factor relative to the parent.
	* @param id  optional id of the game object instance to get the world scale for, by default the instance of the calling script
	* @return scale  instance world scale factor
	*/
	export function get_world_scale_uniform(id?: string | hash | url): number

	/**
	* The function will return the world transform matrix calculated at the end of the previous frame.
	* @param id  optional id of the game object instance to get the world transform for, by default the instance of the calling script
	* @return transform  instance world transform
	*/
	export function get_world_transform(id?: string | hash | url): vmath.matrix4

	/**
	* This function defines a property which can then be used in the script through the self-reference.
	* The properties defined this way are automatically exposed in the editor in game objects and collections which use the script.
	* Note that you can only use this function outside any callback-functions like init and update.
	* @param name  the id of the property
	* @param value  default value of the property. In the case of a url, only the empty constructor msg.url() is allowed. In the case of a resource one of the resource constructors (eg resource.atlas(), resource.font() etc) is expected.
	*/
	export function property(name: string, value: any): void

	/**
	* sets a named property of the specified game object or component, or a material constant
	* @param url  url of the game object or component having the property
	* @param property  id of the property to set
	* @param value  the value to set
	* @param options  optional options table
index into array property (1 based)
name of internal property
	*/
	export function set(url: string | hash | url, property: string | hash, value: any, options?: any): void

	/**
	* Sets the parent for a game object instance. This means that the instance will exist in the geometrical space of its parent,
	* like a basic transformation hierarchy or scene graph. If no parent is specified, the instance will be detached from any parent and exist in world
	* space.
	* This function will generate a `set_parent` message. It is not until the message has been processed that the change actually takes effect. This
	* typically happens later in the same frame or the beginning of the next frame. Refer to the manual to learn how messages are processed by the
	* engine.
	* @param id  optional id of the game object instance to set parent for, defaults to the instance containing the calling script
	* @param parent_id  optional id of the new parent game object, defaults to detaching game object from its parent
	* @param keep_world_transform  optional boolean, set to true to maintain the world transform when changing spaces. Defaults to false.
	*/
	export function set_parent(id?: string | hash | url, parent_id?: string | hash | url, keep_world_transform?: boolean): void

	/**
	* The position is relative to the parent (if any). The global world position cannot be manually set.
	* @param position  position to set
	* @param id  optional id of the game object instance to set the position for, by default the instance of the calling script
	*/
	export function set_position(position: vmath.vector3, id?: string | hash | url): void

	/**
	* The rotation is relative to the parent (if any). The global world rotation cannot be manually set.
	* @param rotation  rotation to set
	* @param id  optional id of the game object instance to get the rotation for, by default the instance of the calling script
	*/
	export function set_rotation(rotation: vmath.quaternion, id?: string | hash | url): void

	/**
	* The scale factor is relative to the parent (if any). The global world scale factor cannot be manually set.
	* ⚠ Physics are currently not affected when setting scale from this function.
	* @param scale  vector or uniform scale factor, must be greater than 0
	* @param id  optional id of the game object instance to get the scale for, by default the instance of the calling script
	*/
	export function set_scale(scale: number | vmath.vector3, id?: string | hash | url): void

	/**
	* ⚠ The function uses world transformation calculated at the end of previous frame.
	* @param position  position which need to be converted
	* @param url  url of the game object which coordinate system convert to
	* @return converted_postion  converted position
	*/
	export function world_to_local_position(position: vmath.vector3, url: string | hash | url): vmath.vector3

	/**
	* ⚠ The function uses world transformation calculated at the end of previous frame.
	* @param transformation  transformation which need to be converted
	* @param url  url of the game object which coordinate system convert to
	* @return converted_transform  converted transformation
	*/
	export function world_to_local_transform(transformation: vmath.matrix4, url: string | hash | url): vmath.matrix4





	/**
	* The position of the game object.
	* The type of the property is vector3.
	*/
	export let position: any

	/**
	* Post this message to an instance to make that instance release the user input focus.
	* See acquire_input_focus for more information on how the user input handling
	* works.
	*/
	export type release_input_focus = "release_input_focus"

	/**
	* The rotation of the game object.
	* The type of the property is quaternion.
	*/
	export let rotation: any

	/**
	* The uniform scale of the game object. The type of the property is number.
	*/
	export let scale: any

	/**
	* When this message is sent to an instance, it sets the parent of that instance. This means that the instance will exist
	* in the geometrical space of its parent, like a basic transformation hierarchy or scene graph. If no parent is specified,
	* the instance will be detached from any parent and exist in world space. A script can send this message to itself to set
	* the parent of its instance.
	*/
	export type set_parent = "set_parent"


}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace gui {


	/**
	* The fonts used in the gui. The type of the property is hash.
	* Key must be specified in options table.
	*/
	export let fonts: any

	/**
	* fit adjust mode
	*/
	export let ADJUST_FIT: any

	/**
	* stretch adjust mode
	*/
	export let ADJUST_STRETCH: any

	/**
	* zoom adjust mode
	*/
	export let ADJUST_ZOOM: any

	/**
	* bottom y-anchor
	*/
	export let ANCHOR_BOTTOM: any

	/**
	* left x-anchor
	*/
	export let ANCHOR_LEFT: any

	/**
	* no anchor
	*/
	export let ANCHOR_NONE: any

	/**
	* right x-anchor
	*/
	export let ANCHOR_RIGHT: any

	/**
	* top y-anchor
	*/
	export let ANCHOR_TOP: any

	/**
	* additive blending
	*/
	export let BLEND_ADD: any

	/**
	* additive alpha blending
	*/
	export let BLEND_ADD_ALPHA: any

	/**
	* alpha blending
	*/
	export let BLEND_ALPHA: any

	/**
	* multiply blending
	*/
	export let BLEND_MULT: any

	/**
	* screen blending
	*/
	export let BLEND_SCREEN: any

	/**
	* clipping mode none
	*/
	export let CLIPPING_MODE_NONE: any

	/**
	* clipping mode stencil
	*/
	export let CLIPPING_MODE_STENCIL: any

	/**
	* in-back
	*/
	export let EASING_INBACK: any

	/**
	* in-bounce
	*/
	export let EASING_INBOUNCE: any

	/**
	* in-circlic
	*/
	export let EASING_INCIRC: any

	/**
	* in-cubic
	*/
	export let EASING_INCUBIC: any

	/**
	* in-elastic
	*/
	export let EASING_INELASTIC: any

	/**
	* in-exponential
	*/
	export let EASING_INEXPO: any

	/**
	* in-out-back
	*/
	export let EASING_INOUTBACK: any

	/**
	* in-out-bounce
	*/
	export let EASING_INOUTBOUNCE: any

	/**
	* in-out-circlic
	*/
	export let EASING_INOUTCIRC: any

	/**
	* in-out-cubic
	*/
	export let EASING_INOUTCUBIC: any

	/**
	* in-out-elastic
	*/
	export let EASING_INOUTELASTIC: any

	/**
	* in-out-exponential
	*/
	export let EASING_INOUTEXPO: any

	/**
	* in-out-quadratic
	*/
	export let EASING_INOUTQUAD: any

	/**
	* in-out-quartic
	*/
	export let EASING_INOUTQUART: any

	/**
	* in-out-quintic
	*/
	export let EASING_INOUTQUINT: any

	/**
	* in-out-sine
	*/
	export let EASING_INOUTSINE: any

	/**
	* in-quadratic
	*/
	export let EASING_INQUAD: any

	/**
	* in-quartic
	*/
	export let EASING_INQUART: any

	/**
	* in-quintic
	*/
	export let EASING_INQUINT: any

	/**
	* in-sine
	*/
	export let EASING_INSINE: any

	/**
	* linear interpolation
	*/
	export let EASING_LINEAR: any

	/**
	* out-back
	*/
	export let EASING_OUTBACK: any

	/**
	* out-bounce
	*/
	export let EASING_OUTBOUNCE: any

	/**
	* out-circlic
	*/
	export let EASING_OUTCIRC: any

	/**
	* out-cubic
	*/
	export let EASING_OUTCUBIC: any

	/**
	* out-elastic
	*/
	export let EASING_OUTELASTIC: any

	/**
	* out-exponential
	*/
	export let EASING_OUTEXPO: any

	/**
	* out-in-back
	*/
	export let EASING_OUTINBACK: any

	/**
	* out-in-bounce
	*/
	export let EASING_OUTINBOUNCE: any

	/**
	* out-in-circlic
	*/
	export let EASING_OUTINCIRC: any

	/**
	* out-in-cubic
	*/
	export let EASING_OUTINCUBIC: any

	/**
	* out-in-elastic
	*/
	export let EASING_OUTINELASTIC: any

	/**
	* out-in-exponential
	*/
	export let EASING_OUTINEXPO: any

	/**
	* out-in-quadratic
	*/
	export let EASING_OUTINQUAD: any

	/**
	* out-in-quartic
	*/
	export let EASING_OUTINQUART: any

	/**
	* out-in-quintic
	*/
	export let EASING_OUTINQUINT: any

	/**
	* out-in-sine
	*/
	export let EASING_OUTINSINE: any

	/**
	* out-quadratic
	*/
	export let EASING_OUTQUAD: any

	/**
	* out-quartic
	*/
	export let EASING_OUTQUART: any

	/**
	* out-quintic
	*/
	export let EASING_OUTQUINT: any

	/**
	* out-sine
	*/
	export let EASING_OUTSINE: any

	/**
	* default keyboard
	*/
	export let KEYBOARD_TYPE_DEFAULT: any

	/**
	* email keyboard
	*/
	export let KEYBOARD_TYPE_EMAIL: any

	/**
	* number input keyboard
	*/
	export let KEYBOARD_TYPE_NUMBER_PAD: any

	/**
	* password keyboard
	*/
	export let KEYBOARD_TYPE_PASSWORD: any

	/**
	* elliptical pie node bounds
	*/
	export let PIEBOUNDS_ELLIPSE: any

	/**
	* rectangular pie node bounds
	*/
	export let PIEBOUNDS_RECTANGLE: any

	/**
	* center pivot
	*/
	export let PIVOT_CENTER: any

	/**
	* east pivot
	*/
	export let PIVOT_E: any

	/**
	* north pivot
	*/
	export let PIVOT_N: any

	/**
	* north-east pivot
	*/
	export let PIVOT_NE: any

	/**
	* north-west pivot
	*/
	export let PIVOT_NW: any

	/**
	* south pivot
	*/
	export let PIVOT_S: any

	/**
	* south-east pivot
	*/
	export let PIVOT_SE: any

	/**
	* south-west pivot
	*/
	export let PIVOT_SW: any

	/**
	* west pivot
	*/
	export let PIVOT_W: any

	/**
	* loop backward
	*/
	export let PLAYBACK_LOOP_BACKWARD: any

	/**
	* loop forward
	*/
	export let PLAYBACK_LOOP_FORWARD: any

	/**
	* ping pong loop
	*/
	export let PLAYBACK_LOOP_PINGPONG: any

	/**
	* once backward
	*/
	export let PLAYBACK_ONCE_BACKWARD: any

	/**
	* once forward
	*/
	export let PLAYBACK_ONCE_FORWARD: any

	/**
	* once forward and then backward
	*/
	export let PLAYBACK_ONCE_PINGPONG: any

	/**
	* color property
	*/
	export let PROP_COLOR: any

	/**
	* euler property
	*/
	export let PROP_EULER: any

	/**
	* fill_angle property
	*/
	export let PROP_FILL_ANGLE: any

	/**
	* inner_radius property
	*/
	export let PROP_INNER_RADIUS: any

	/**
	* outline color property
	*/
	export let PROP_OUTLINE: any

	/**
	* position property
	*/
	export let PROP_POSITION: any

	/**
	* rotation property
	*/
	export let PROP_ROTATION: any

	/**
	* scale property
	*/
	export let PROP_SCALE: any

	/**
	* shadow color property
	*/
	export let PROP_SHADOW: any

	/**
	* size property
	*/
	export let PROP_SIZE: any

	/**
	* slice9 property
	*/
	export let PROP_SLICE9: any

	/**
	* data error
	*/
	export let RESULT_DATA_ERROR: any

	/**
	* out of resource
	*/
	export let RESULT_OUT_OF_RESOURCES: any

	/**
	* texture already exists
	*/
	export let RESULT_TEXTURE_ALREADY_EXISTS: any

	/**
	* automatic size mode
	*/
	export let SIZE_MODE_AUTO: any

	/**
	* manual size mode
	*/
	export let SIZE_MODE_MANUAL: any

	/**
	* This starts an animation of a node property according to the specified parameters.
	* If the node property is already being animated, that animation will be canceled and
	* replaced by the new one. Note however that several different node properties
	* can be animated simultaneously. Use `gui.cancel_animation` to stop the animation
	* before it has completed.
	* Composite properties of type vector3, vector4 or quaternion
	* also expose their sub-components (x, y, z and w).
	* You can address the components individually by suffixing the name with a dot '.'
	* and the name of the component.
	* For instance, `"position.x"` (the position x coordinate) or `"color.w"`
	* (the color alpha value).
	* If a `complete_function` (Lua function) is specified, that function will be called
	* when the animation has completed.
	* By starting a new animation in that function, several animations can be sequenced
	* together. See the examples below for more information.
	* @param node  node to animate
	* @param property  property to animate

- `"position"`
- `"rotation"`
- `"euler"`
- `"scale"`
- `"color"`
- `"outline"`
- `"shadow"`
- `"size"`
- `"fill_angle"` (pie)
- `"inner_radius"` (pie)
- `"slice9"` (slice9)

The following property constants are defined equaling the corresponding property string names.

- `gui.PROP_POSITION`
- `gui.PROP_ROTATION`
- `gui.PROP_EULER`
- `gui.PROP_SCALE`
- `gui.PROP_COLOR`
- `gui.PROP_OUTLINE`
- `gui.PROP_SHADOW`
- `gui.PROP_SIZE`
- `gui.PROP_FILL_ANGLE`
- `gui.PROP_INNER_RADIUS`
- `gui.PROP_SLICE9`

	* @param to  target property value
	* @param easing  easing to use during animation.
     Either specify one of the `gui.EASING_*` constants or provide a
with a custom curve. See the animation guide for more information.
	* @param duration  duration of the animation in seconds.
	* @param delay  delay before the animation starts in seconds.
	* @param complete_function  function to call when the
     animation has completed
	* @param playback  playback mode

- `gui.PLAYBACK_ONCE_FORWARD`
- `gui.PLAYBACK_ONCE_BACKWARD`
- `gui.PLAYBACK_ONCE_PINGPONG`
- `gui.PLAYBACK_LOOP_FORWARD`
- `gui.PLAYBACK_LOOP_BACKWARD`
- `gui.PLAYBACK_LOOP_PINGPONG`

	*/
	export function animate(node: node, property: any, to: number | vmath.vector3 | vmath.vector4 | vmath.quaternion, easing: any, duration: number, delay?: number, complete_function?: any, playback?: any): void

	/**
	* If an animation of the specified node is currently running (started by `gui.animate`), it will immediately be canceled.
	* @param node  node that should have its animation canceled
	* @param property  property for which the animation should be canceled

- `"position"`
- `"rotation"`
- `"euler"`
- `"scale"`
- `"color"`
- `"outline"`
- `"shadow"`
- `"size"`
- `"fill_angle"` (pie)
- `"inner_radius"` (pie)
- `"slice9"` (slice9)

	*/
	export function cancel_animation(node: node, property: any): void

	/**
	* Cancels any running flipbook animation on the specified node.
	* @param node  node cancel flipbook animation for
	*/
	export function cancel_flipbook(node: node): void

	/**
	* Make a clone instance of a node. The cloned node will be identical to the
	* original node, except the id which is generated as the string "node" plus
	* a sequential unsigned integer value.
	* This function does not clone the supplied node's children nodes.
	* Use gui.clone_tree for that purpose.
	* @param node  node to clone
	* @return clone  the cloned node
	*/
	export function clone(node: node): node

	/**
	* Make a clone instance of a node and all its children.
	* Use gui.clone to clone a node excluding its children.
	* @param node  root node to clone
	* @return clones  a table mapping node ids to the corresponding cloned nodes
	*/
	export function clone_tree(node: node): any

	/**
	* Deletes the specified node. Any child nodes of the specified node will be
	* recursively deleted.
	* @param node  node to delete
	*/
	export function delete_node(node: node): void

	/**
	* Delete a dynamically created texture.
	* @param texture  texture id
	*/
	export function delete_texture(texture: string | hash): void

	/**
	* Instead of using specific getters such as gui.get_position or gui.get_scale,
	* you can use gui.get instead and supply the property as a string or a hash.
	* While this function is similar to go.get, there are a few more restrictions
	* when operating in the gui namespace. Most notably, only these propertie identifiers are supported:
	* 
	* - `"position"`
	* - `"rotation"`
	* - `"euler"`
	* - `"scale"`
	* - `"color"`
	* - `"outline"`
	* - `"shadow"`
	* - `"size"`
	* - `"fill_angle"` (pie)
	* - `"inner_radius"` (pie)
	* - `"slice9"` (slice9)
	* 
	* The value returned will either be a vmath.vector4 or a single number, i.e getting the "position"
	* property will return a vec4 while getting the "position.x" property will return a single value.
	* @param node  node to get the property for
	* @param property  the property to retrieve
	*/
	export function get(node: node, property: any): void

	/**
	* Returns the adjust mode of a node.
	* The adjust mode defines how the node will adjust itself to screen
	* resolutions that differs from the one in the project settings.
	* @param node  node from which to get the adjust mode (node)
	* @return adjust_mode  the current adjust mode

- `gui.ADJUST_FIT`
- `gui.ADJUST_ZOOM`
- `gui.ADJUST_STRETCH`

	*/
	export function get_adjust_mode(node: node): any

	/**
	* gets the node alpha
	* @param node  node from which to get alpha
	*/
	export function get_alpha(node: node): void

	/**
	* Returns the blend mode of a node.
	* Blend mode defines how the node will be blended with the background.
	* @param node  node from which to get the blend mode
	* @return blend_mode  blend mode

- `gui.BLEND_ALPHA`
- `gui.BLEND_ADD`
- `gui.BLEND_ADD_ALPHA`
- `gui.BLEND_MULT`
- `gui.BLEND_SCREEN`

	*/
	export function get_blend_mode(node: node): any

	/**
	* If node is set as an inverted clipping node, it will clip anything inside as opposed to outside.
	* @param node  node from which to get the clipping inverted state
	* @return inverted  true or false
	*/
	export function get_clipping_inverted(node: node): boolean

	/**
	* Clipping mode defines how the node will clip it's children nodes
	* @param node  node from which to get the clipping mode
	* @return clipping_mode  clipping mode

- `gui.CLIPPING_MODE_NONE`
- `gui.CLIPPING_MODE_STENCIL`

	*/
	export function get_clipping_mode(node: node): any

	/**
	* If node is set as visible clipping node, it will be shown as well as clipping. Otherwise, it will only clip but not show visually.
	* @param node  node from which to get the clipping visibility state
	* @return visible  true or false
	*/
	export function get_clipping_visible(node: node): boolean

	/**
	* Returns the color of the supplied node. The components
	* of the returned vector4 contains the color channel values:
	* 
	* 
	* 
	* Component
	* Color value
	* 
	* 
	* 
	* 
	* x
	* Red value
	* 
	* 
	* y
	* Green value
	* 
	* 
	* z
	* Blue value
	* 
	* 
	* w
	* Alpha value
	* 
	* 
	* 
	* @param node  node to get the color from
	* @return color  node color
	*/
	export function get_color(node: node): vmath.vector4

	/**
	* Returns the rotation of the supplied node.
	* The rotation is expressed in degree Euler angles.
	* @param node  node to get the rotation from
	* @return rotation  node rotation
	*/
	export function get_euler(node: node): vmath.vector3

	/**
	* Returns the sector angle of a pie node.
	* @param node  node from which to get the fill angle
	* @return angle  sector angle
	*/
	export function get_fill_angle(node: node): number

	/**
	* Get node flipbook animation.
	* @param node  node to get flipbook animation from
	* @return animation  animation id
	*/
	export function get_flipbook(node: node): hash

	/**
	* This is only useful nodes with flipbook animations. Gets the normalized cursor of the flipbook animation on a node.
	* @param node  node to get the cursor for (node)
	* @return cursor  cursor value
	*/
	export function get_flipbook_cursor(node: node): number

	/**
	* This is only useful nodes with flipbook animations. Gets the playback rate of the flipbook animation on a node.
	* @param node  node to set the cursor for
	* @return rate  playback rate
	*/
	export function get_flipbook_playback_rate(node: node): number

	/**
	* This is only useful for text nodes. The font must be mapped to the gui scene in the gui editor.
	* @param node  node from which to get the font
	* @return font  font id
	*/
	export function get_font(node: node): hash

	/**
	* This is only useful for text nodes. The font must be mapped to the gui scene in the gui editor.
	* @param font_name  font of which to get the path hash
	* @return hash  path hash to resource
	*/
	export function get_font_resource(font_name: hash | string): hash

	/**
	* Returns the scene height.
	* @return height  scene height
	*/
	export function get_height(): number

	/**
	* Retrieves the id of the specified node.
	* @param node  the node to retrieve the id from
	* @return id  the id of the node
	*/
	export function get_id(node: node): hash

	/**
	* Retrieve the index of the specified node among its siblings.
	* The index defines the order in which a node appear in a GUI scene.
	* Higher index means the node is drawn on top of lower indexed nodes.
	* @param node  the node to retrieve the id from
	* @return index  the index of the node
	*/
	export function get_index(node: node): number

	/**
	* gets the node inherit alpha state
	* @param node  node from which to get the inherit alpha state
	*/
	export function get_inherit_alpha(node: node): void

	/**
	* Returns the inner radius of a pie node.
	* The radius is defined along the x-axis.
	* @param node  node from where to get the inner radius
	* @return radius  inner radius
	*/
	export function get_inner_radius(node: node): number

	/**
	* The layer must be mapped to the gui scene in the gui editor.
	* @param node  node from which to get the layer
	* @return layer  layer id
	*/
	export function get_layer(node: node): hash

	/**
	* gets the scene current layout
	* @return layout  layout id
	*/
	export function get_layout(): hash

	/**
	* Returns the leading value for a text node.
	* @param node  node from where to get the leading
	* @return leading  leading scaling value (default=1)
	*/
	export function get_leading(node: node): number

	/**
	* Returns whether a text node is in line-break mode or not.
	* This is only useful for text nodes.
	* @param node  node from which to get the line-break for
	* @return line_break  `true` or `false`
	*/
	export function get_line_break(node: node): boolean

	/**
	* Returns the material of a node.
	* The material must be mapped to the gui scene in the gui editor.
	* @param node  node to get the material for
	*/
	export function get_material(node: node): void

	/**
	* Retrieves the node with the specified id.
	* @param id  id of the node to retrieve
	* @return instance  a new node instance
	*/
	export function get_node(id: string | hash): node

	/**
	* Returns the outer bounds mode for a pie node.
	* @param node  node from where to get the outer bounds mode
	* @return bounds_mode  the outer bounds mode of the pie node:

- `gui.PIEBOUNDS_RECTANGLE`
- `gui.PIEBOUNDS_ELLIPSE`

	*/
	export function get_outer_bounds(node: node): any

	/**
	* Returns the outline color of the supplied node.
	* See gui.get_color for info how vectors encode color values.
	* @param node  node to get the outline color from
	* @return color  outline color
	*/
	export function get_outline(node: node): vmath.vector4

	/**
	* Returns the parent node of the specified node.
	* If the supplied node does not have a parent, `nil` is returned.
	* @param node  the node from which to retrieve its parent
	* @return parent  parent instance or `nil`
	*/
	export function get_parent(node: node): LuaMultiReturn<[node, any]>

	/**
	* Get the paricle fx for a gui node
	* @param node  node to get particle fx for
	* @return particlefx  particle fx id
	*/
	export function get_particlefx(node: node): hash

	/**
	* Returns the number of generated vertices around the perimeter
	* of a pie node.
	* @param node  pie node
	* @return vertices  vertex count
	*/
	export function get_perimeter_vertices(node: node): number

	/**
	* The pivot specifies how the node is drawn and rotated from its position.
	* @param node  node to get pivot from
	* @return pivot  pivot constant

- `gui.PIVOT_CENTER`
- `gui.PIVOT_N`
- `gui.PIVOT_NE`
- `gui.PIVOT_E`
- `gui.PIVOT_SE`
- `gui.PIVOT_S`
- `gui.PIVOT_SW`
- `gui.PIVOT_W`
- `gui.PIVOT_NW`

	*/
	export function get_pivot(node: node): any

	/**
	* Returns the position of the supplied node.
	* @param node  node to get the position from
	* @return position  node position
	*/
	export function get_position(node: node): vmath.vector3

	/**
	* Returns the rotation of the supplied node.
	* The rotation is expressed as a quaternion
	* @param node  node to get the rotation from
	* @return rotation  node rotation
	*/
	export function get_rotation(node: node): vmath.quaternion

	/**
	* Returns the scale of the supplied node.
	* @param node  node to get the scale from
	* @return scale  node scale
	*/
	export function get_scale(node: node): vmath.vector3

	/**
	* Returns the screen position of the supplied node. This function returns the
	* calculated transformed position of the node, taking into account any parent node
	* transforms.
	* @param node  node to get the screen position from
	* @return position  node screen position
	*/
	export function get_screen_position(node: node): vmath.vector3

	/**
	* Returns the shadow color of the supplied node.
	* See gui.get_color for info how vectors encode color values.
	* @param node  node to get the shadow color from
	* @return color  node shadow color
	*/
	export function get_shadow(node: node): vmath.vector4

	/**
	* Returns the size of the supplied node.
	* @param node  node to get the size from
	* @return size  node size
	*/
	export function get_size(node: node): vmath.vector3

	/**
	* Returns the size of a node.
	* The size mode defines how the node will adjust itself in size. Automatic
	* size mode alters the node size based on the node's content. Automatic size
	* mode works for Box nodes and Pie nodes which will both adjust their size
	* to match the assigned image. Particle fx and Text nodes will ignore
	* any size mode setting.
	* @param node  node from which to get the size mode (node)
	* @return size_mode  the current size mode

- `gui.SIZE_MODE_MANUAL`
- `gui.SIZE_MODE_AUTO`

	*/
	export function get_size_mode(node: node): any

	/**
	* Returns the slice9 configuration values for the node.
	* @param node  node to manipulate
	* @return values  configuration values
	*/
	export function get_slice9(node: node): vmath.vector4

	/**
	* Returns the text value of a text node. This is only useful for text nodes.
	* @param node  node from which to get the text
	* @return text  text value
	*/
	export function get_text(node: node): string

	/**
	* Returns the texture of a node.
	* This is currently only useful for box or pie nodes.
	* The texture must be mapped to the gui scene in the gui editor.
	* @param node  node to get texture from
	* @return texture  texture id
	*/
	export function get_texture(node: node): hash

	/**
	* Returns the tracking value of a text node.
	* @param node  node from where to get the tracking
	* @return tracking  tracking scaling number (default=0)
	*/
	export function get_tracking(node: node): number

	/**
	* Get a node and all its children as a Lua table.
	* @param node  root node to get node tree from
	* @return clones  a table mapping node ids to the corresponding nodes
	*/
	export function get_tree(node: node): any

	/**
	* Returns `true` if a node is visible and `false` if it's not.
	* Invisible nodes are not rendered.
	* @param node  node to query
	* @return visible  whether the node is visible or not
	*/
	export function get_visible(node: node): boolean

	/**
	* Returns the scene width.
	* @return width  scene width
	*/
	export function get_width(): number

	/**
	* The x-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to get x-anchor from
	* @return anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_LEFT`
- `gui.ANCHOR_RIGHT`

	*/
	export function get_xanchor(node: node): any

	/**
	* The y-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to get y-anchor from
	* @return anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_TOP`
- `gui.ANCHOR_BOTTOM`

	*/
	export function get_yanchor(node: node): any

	/**
	* Hides the on-display touch keyboard on the device.
	*/
	export function hide_keyboard(): void

	/**
	* Returns `true` if a node is enabled and `false` if it's not.
	* Disabled nodes are not rendered and animations acting on them are not evaluated.
	* @param node  node to query
	* @param recursive  check hierarchy recursively
	* @return enabled  whether the node is enabled or not
	*/
	export function is_enabled(node: node, recursive: boolean): boolean

	/**
	* Alters the ordering of the two supplied nodes by moving the first node
	* above the second.
	* If the second argument is `nil` the first node is moved to the top.
	* @param node  to move
	* @param reference  reference node above which the first node should be moved
	*/
	export function move_above(node: node, reference: any): void

	/**
	* Alters the ordering of the two supplied nodes by moving the first node
	* below the second.
	* If the second argument is `nil` the first node is moved to the bottom.
	* @param node  to move
	* @param reference  reference node below which the first node should be moved
	*/
	export function move_below(node: node, reference: any): void

	/**
	* Dynamically create a new box node.
	* @param pos  node position
	* @param size  node size
	* @return node  new box node
	*/
	export function new_box_node(pos: vmath.vector3 | vmath.vector4, size: vmath.vector3): node

	/**
	* Dynamically create a particle fx node.
	* @param pos  node position
	* @param particlefx  particle fx resource name
	* @return node  new particle fx node
	*/
	export function new_particlefx_node(pos: vmath.vector3 | vmath.vector4, particlefx: hash | string): node

	/**
	* Dynamically create a new pie node.
	* @param pos  node position
	* @param size  node size
	* @return node  new pie node
	*/
	export function new_pie_node(pos: vmath.vector3 | vmath.vector4, size: vmath.vector3): node

	/**
	* Dynamically create a new text node.
	* @param pos  node position
	* @param text  node text
	* @return node  new text node
	*/
	export function new_text_node(pos: vmath.vector3 | vmath.vector4, text: string): node

	/**
	* Dynamically create a new texture.
	* @param texture_id  texture id
	* @param width  texture width
	* @param height  texture height
	* @param type  texture type

- `"rgb"` - RGB
- `"rgba"` - RGBA
- `"l"` - LUMINANCE

	* @param buffer  texture data
	* @param flip  flip texture vertically
	* @return success  texture creation was successful
	* @return code  one of the gui.RESULT_* codes if unsuccessful
	*/
	export function new_texture(texture_id: string | hash, width: number, height: number, type: any, buffer: string, flip: boolean): LuaMultiReturn<[boolean, number]>

	/**
	* Tests whether a coordinate is within the bounding box of a
	* node.
	* @param node  node to be tested for picking
	* @param x  x-coordinate (see on_input )
	* @param y  y-coordinate (see on_input )
	* @return pickable  pick result
	*/
	export function pick_node(node: node, x: number, y: number): boolean

	/**
	* Play flipbook animation on a box or pie node.
	* The current node texture must contain the animation.
	* Use this function to set one-frame still images on the node.
	* @param node  node to set animation for
	* @param animation  animation id
	* @param complete_function  optional function to call when the animation has completed

`self`

The current object.

`node`

The node that is animated.


	* @param play_properties  optional table with properties

`offset`
The normalized initial value of the animation cursor when the animation starts playing
`playback_rate`
The rate with which the animation will be played. Must be positive

	*/
	export function play_flipbook(node: node, animation: string | hash, complete_function?: any, play_properties?: any): void

	/**
	* Plays the paricle fx for a gui node
	* @param node  node to play particle fx for
	* @param emitter_state_function  optional callback function that will be called when an emitter attached to this particlefx changes state.

`self`
The current object
`node`
The particle fx node, or `nil` if the node was deleted
`emitter`
The id of the emitter
`state`
the new state of the emitter:


- `particlefx.EMITTER_STATE_SLEEPING`
- `particlefx.EMITTER_STATE_PRESPAWN`
- `particlefx.EMITTER_STATE_SPAWNING`
- `particlefx.EMITTER_STATE_POSTSPAWN`

	*/
	export function play_particlefx(node: node, emitter_state_function?: any): void

	/**
	* Resets the input context of keyboard. This will clear marked text.
	*/
	export function reset_keyboard(): void

	/**
	* Resets the node material to the material assigned in the gui scene.
	* @param node  node to reset the material for
	*/
	export function reset_material(node: node): void

	/**
	* Resets all nodes in the current GUI scene to their initial state.
	* The reset only applies to static node loaded from the scene.
	* Nodes that are created dynamically from script are not affected.
	*/
	export function reset_nodes(): void

	/**
	* Convert the screen position to the local position of supplied node
	* @param node  node used for getting local transformation matrix
	* @param screen_position  screen position
	* @return local_position  local position
	*/
	export function screen_to_local(node: node, screen_position: vmath.vector3): vmath.vector3

	/**
	* Instead of using specific setteres such as gui.set_position or gui.set_scale,
	* you can use gui.set instead and supply the property as a string or a hash.
	* While this function is similar to go.get and go.set, there are a few more restrictions
	* when operating in the gui namespace. Most notably, only these propertie identifiers are supported:
	* 
	* - `"position"`
	* - `"rotation"`
	* - `"euler"`
	* - `"scale"`
	* - `"color"`
	* - `"outline"`
	* - `"shadow"`
	* - `"size"`
	* - `"fill_angle"` (pie)
	* - `"inner_radius"` (pie)
	* - `"slice9"` (slice9)
	* 
	* The value to set must either be a vmath.vector4, vmath.vector3, vmath.quat or a single number and depends on the property name you want to set.
	* I.e when setting the "position" property, you need to use a vmath.vector4 and when setting a single component of the property,
	* such as "position.x", you need to use a single value.
	* Note: When setting the rotation using the "rotation" property, you need to pass in a vmath.quat. This behaviour is different than from the gui.set_rotation function,
	* the intention is to move new functionality closer to go namespace so that migrating between gui and go is easier. To set the rotation using degrees instead,
	* use the "euler" property instead. The rotation and euler properties are linked, changing one of them will change the backing data of the other.
	* @param node  node to set the property for
	* @param property  the property to set
	* @param value  the property to set
	*/
	export function set(node: node, property: any, value: number | vmath.vector4 | vmath.vector3 | vmath.quaternion): void

	/**
	* Sets the adjust mode on a node.
	* The adjust mode defines how the node will adjust itself to screen
	* resolutions that differs from the one in the project settings.
	* @param node  node to set adjust mode for
	* @param adjust_mode  adjust mode to set

- `gui.ADJUST_FIT`
- `gui.ADJUST_ZOOM`
- `gui.ADJUST_STRETCH`

	*/
	export function set_adjust_mode(node: node, adjust_mode: any): void

	/**
	* sets the node alpha
	* @param node  node for which to set alpha
	* @param alpha  0..1 alpha color
	*/
	export function set_alpha(node: node, alpha: number): void

	/**
	* Set the blend mode of a node.
	* Blend mode defines how the node will be blended with the background.
	* @param node  node to set blend mode for
	* @param blend_mode  blend mode to set

- `gui.BLEND_ALPHA`
- `gui.BLEND_ADD`
- `gui.BLEND_ADD_ALPHA`
- `gui.BLEND_MULT`
- `gui.BLEND_SCREEN`

	*/
	export function set_blend_mode(node: node, blend_mode: any): void

	/**
	* If node is set as an inverted clipping node, it will clip anything inside as opposed to outside.
	* @param node  node to set clipping inverted state for
	* @param inverted  true or false
	*/
	export function set_clipping_inverted(node: node, inverted: boolean): void

	/**
	* Clipping mode defines how the node will clip it's children nodes
	* @param node  node to set clipping mode for
	* @param clipping_mode  clipping mode to set

- `gui.CLIPPING_MODE_NONE`
- `gui.CLIPPING_MODE_STENCIL`

	*/
	export function set_clipping_mode(node: node, clipping_mode: any): void

	/**
	* If node is set as an visible clipping node, it will be shown as well as clipping. Otherwise, it will only clip but not show visually.
	* @param node  node to set clipping visibility for
	* @param visible  true or false
	*/
	export function set_clipping_visible(node: node, visible: boolean): void

	/**
	* Sets the color of the supplied node. The components
	* of the supplied vector3 or vector4 should contain the color channel values:
	* 
	* 
	* 
	* Component
	* Color value
	* 
	* 
	* 
	* 
	* x
	* Red value
	* 
	* 
	* y
	* Green value
	* 
	* 
	* z
	* Blue value
	* 
	* 
	* vector4
	* Alpha value
	* 
	* 
	* 
	* @param node  node to set the color for
	* @param color  new color
	*/
	export function set_color(node: node, color: vmath.vector3 | vmath.vector4): void

	/**
	* Sets a node to the disabled or enabled state.
	* Disabled nodes are not rendered and animations acting on them are not evaluated.
	* @param node  node to be enabled/disabled
	* @param enabled  whether the node should be enabled or not
	*/
	export function set_enabled(node: node, enabled: boolean): void

	/**
	* Sets the rotation of the supplied node.
	* The rotation is expressed in degree Euler angles.
	* @param node  node to set the rotation for
	* @param rotation  new rotation
	*/
	export function set_euler(node: node, rotation: vmath.vector3 | vmath.vector4): void

	/**
	* Set the sector angle of a pie node.
	* @param node  node to set the fill angle for
	* @param angle  sector angle
	*/
	export function set_fill_angle(node: node, angle: number): void

	/**
	* This is only useful nodes with flipbook animations. The cursor is normalized.
	* @param node  node to set the cursor for
	* @param cursor  cursor value
	*/
	export function set_flipbook_cursor(node: node, cursor: number): void

	/**
	* This is only useful nodes with flipbook animations. Sets the playback rate of the flipbook animation on a node. Must be positive.
	* @param node  node to set the cursor for
	* @param playback_rate  playback rate
	*/
	export function set_flipbook_playback_rate(node: node, playback_rate: number): void

	/**
	* This is only useful for text nodes.
	* The font must be mapped to the gui scene in the gui editor.
	* @param node  node for which to set the font
	* @param font  font id
	*/
	export function set_font(node: node, font: string | hash): void

	/**
	* Set the id of the specicied node to a new value.
	* Nodes created with the gui.new_*_node() functions get
	* an empty id. This function allows you to give dynamically
	* created nodes an id.
	* ⚠ No checking is done on the uniqueness of supplied ids.
	* It is up to you to make sure you use unique ids.
	* @param node  node to set the id for
	* @param id  id to set
	*/
	export function set_id(node: node, id: string | hash): void

	/**
	* sets the node inherit alpha state
	* @param node  node from which to set the inherit alpha state
	* @param inherit_alpha  true or false
	*/
	export function set_inherit_alpha(node: node, inherit_alpha: boolean): void

	/**
	* Sets the inner radius of a pie node.
	* The radius is defined along the x-axis.
	* @param node  node to set the inner radius for
	* @param radius  inner radius
	*/
	export function set_inner_radius(node: node, radius: number): void

	/**
	* The layer must be mapped to the gui scene in the gui editor.
	* @param node  node for which to set the layer
	* @param layer  layer id
	*/
	export function set_layer(node: node, layer: string | hash): void

	/**
	* Sets the leading value for a text node. This value is used to
	* scale the line spacing of text.
	* @param node  node for which to set the leading
	* @param leading  a scaling value for the line spacing (default=1)
	*/
	export function set_leading(node: node, leading: number): void

	/**
	* Sets the line-break mode on a text node.
	* This is only useful for text nodes.
	* @param node  node to set line-break for
	* @param line_break  true or false
	*/
	export function set_line_break(node: node, line_break: boolean): void

	/**
	* Set the material on a node. The material must be mapped to the gui scene in the gui editor,
	* and assigning a material is supported for all node types. To set the default material that
	* is assigned to the gui scene node, use `gui.reset_material(node_id)` instead.
	* @param node  node to set material for
	* @param material  material id
	*/
	export function set_material(node: node, material: string | hash): void

	/**
	* Sets the outer bounds mode for a pie node.
	* @param node  node for which to set the outer bounds mode
	* @param bounds_mode  the outer bounds mode of the pie node:

- `gui.PIEBOUNDS_RECTANGLE`
- `gui.PIEBOUNDS_ELLIPSE`

	*/
	export function set_outer_bounds(node: node, bounds_mode: any): void

	/**
	* Sets the outline color of the supplied node.
	* See gui.set_color for info how vectors encode color values.
	* @param node  node to set the outline color for
	* @param color  new outline color
	*/
	export function set_outline(node: node, color: vmath.vector3 | vmath.vector4): void

	/**
	* Sets the parent node of the specified node.
	* @param node  node for which to set its parent
	* @param parent  parent node to set
	* @param keep_scene_transform  optional flag to make the scene position being perserved
	*/
	export function set_parent(node: node, parent: node, keep_scene_transform?: boolean): void

	/**
	* Set the paricle fx for a gui node
	* @param node  node to set particle fx for
	* @param particlefx  particle fx id
	*/
	export function set_particlefx(node: node, particlefx: hash | string): void

	/**
	* Sets the number of generated vertices around the perimeter of a pie node.
	* @param node  pie node
	* @param vertices  vertex count
	*/
	export function set_perimeter_vertices(node: node, vertices: number): void

	/**
	* The pivot specifies how the node is drawn and rotated from its position.
	* @param node  node to set pivot for
	* @param pivot  pivot constant

- `gui.PIVOT_CENTER`
- `gui.PIVOT_N`
- `gui.PIVOT_NE`
- `gui.PIVOT_E`
- `gui.PIVOT_SE`
- `gui.PIVOT_S`
- `gui.PIVOT_SW`
- `gui.PIVOT_W`
- `gui.PIVOT_NW`

	*/
	export function set_pivot(node: node, pivot: any): void

	/**
	* Sets the position of the supplied node.
	* @param node  node to set the position for
	* @param position  new position
	*/
	export function set_position(node: node, position: vmath.vector3 | vmath.vector4): void

	/**
	* Set the order number for the current GUI scene.
	* The number dictates the sorting of the "gui" render predicate,
	* in other words in which order the scene will be rendered in relation
	* to other currently rendered GUI scenes.
	* The number must be in the range 0 to 15.
	* @param order  rendering order (0-15)
	*/
	export function set_render_order(order: number): void

	/**
	* Sets the rotation of the supplied node.
	* The rotation is expressed as a quaternion
	* @param node  node to set the rotation for
	* @param rotation  new rotation
	*/
	export function set_rotation(node: node, rotation: vmath.quaternion | vmath.vector4): void

	/**
	* Sets the scaling of the supplied node.
	* @param node  node to set the scale for
	* @param scale  new scale
	*/
	export function set_scale(node: node, scale: vmath.vector3 | vmath.vector4): void

	/**
	* Set the screen position to the supplied node
	* @param node  node to set the screen position to
	* @param screen_position  screen position
	*/
	export function set_screen_position(node: node, screen_position: vmath.vector3): void

	/**
	* Sets the shadow color of the supplied node.
	* See gui.set_color for info how vectors encode color values.
	* @param node  node to set the shadow color for
	* @param color  new shadow color
	*/
	export function set_shadow(node: node, color: vmath.vector3 | vmath.vector4): void

	/**
	* Sets the size of the supplied node.
	* ⚠ You can only set size on nodes with size mode set to SIZE_MODE_MANUAL
	* @param node  node to set the size for
	* @param size  new size
	*/
	export function set_size(node: node, size: vmath.vector3 | vmath.vector4): void

	/**
	* Sets the size mode of a node.
	* The size mode defines how the node will adjust itself in size. Automatic
	* size mode alters the node size based on the node's content. Automatic size
	* mode works for Box nodes and Pie nodes which will both adjust their size
	* to match the assigned image. Particle fx and Text nodes will ignore
	* any size mode setting.
	* @param node  node to set size mode for
	* @param size_mode  size mode to set

- `gui.SIZE_MODE_MANUAL`
- `gui.SIZE_MODE_AUTO`

	*/
	export function set_size_mode(node: node, size_mode: any): void

	/**
	* Set the slice9 configuration values for the node.
	* @param node  node to manipulate
	* @param values  new values
	*/
	export function set_slice9(node: node, values: vmath.vector4): void

	/**
	* Set the text value of a text node. This is only useful for text nodes.
	* @param node  node to set text for
	* @param text  text to set
	*/
	export function set_text(node: node, text: string): void

	/**
	* Set the texture on a box or pie node. The texture must be mapped to
	* the gui scene in the gui editor. The function points out which texture
	* the node should render from. If the texture is an atlas, further
	* information is needed to select which image/animation in the atlas
	* to render. In such cases, use `gui.play_flipbook()` in
	* addition to this function.
	* @param node  node to set texture for
	* @param texture  texture id
	*/
	export function set_texture(node: node, texture: string | hash): void

	/**
	* Set the texture buffer data for a dynamically created texture.
	* @param texture  texture id
	* @param width  texture width
	* @param height  texture height
	* @param type  texture type

- `"rgb"` - RGB
- `"rgba"` - RGBA
- `"l"` - LUMINANCE

	* @param buffer  texture data
	* @param flip  flip texture vertically
	* @return success  setting the data was successful
	*/
	export function set_texture_data(texture: string | hash, width: number, height: number, type: any, buffer: string, flip: boolean): boolean

	/**
	* Sets the tracking value of a text node. This value is used to
	* adjust the vertical spacing of characters in the text.
	* @param node  node for which to set the tracking
	* @param tracking  a scaling number for the letter spacing (default=0)
	*/
	export function set_tracking(node: node, tracking: number): void

	/**
	* Set if a node should be visible or not. Only visible nodes are rendered.
	* @param node  node to be visible or not
	* @param visible  whether the node should be visible or not
	*/
	export function set_visible(node: node, visible: boolean): void

	/**
	* The x-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to set x-anchor for
	* @param anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_LEFT`
- `gui.ANCHOR_RIGHT`

	*/
	export function set_xanchor(node: node, anchor: any): void

	/**
	* The y-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to set y-anchor for
	* @param anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_TOP`
- `gui.ANCHOR_BOTTOM`

	*/
	export function set_yanchor(node: node, anchor: any): void

	/**
	* Shows the on-display touch keyboard.
	* The specified type of keyboard is displayed if it is available on
	* the device.
	* 🤖.
	* @param type  keyboard type

- `gui.KEYBOARD_TYPE_DEFAULT`
- `gui.KEYBOARD_TYPE_EMAIL`
- `gui.KEYBOARD_TYPE_NUMBER_PAD`
- `gui.KEYBOARD_TYPE_PASSWORD`

	* @param autoclose  if the keyboard should automatically close when clicking outside
	*/
	export function show_keyboard(type: any, autoclose: boolean): void

	/**
	* Stops the particle fx for a gui node
	* @param node  node to stop particle fx for
	* @param options  options when stopping the particle fx. Supported options:

`clear`: instantly clear spawned particles

	*/
	export function stop_particlefx(node: node, options: any): void


	/**
	* This message is broadcast to every GUI component when a layout change has been initiated
	* on device.
	*/
	export type layout_changed = "layout_changed"

	/**
	* The main material (the default material assigned to a GUI) used when rendering the gui. The type of the property is hash.
	*/
	export let material: any

	/**
	* The materials used when rendering the gui. The type of the property is hash.
	* Key must be specified in options table.
	*/
	export let materials: any




	/**
	* The textures used in the gui. The type of the property is hash.
	* Key must be specified in options table.
	*/
	export let textures: any


}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace physics {

	/**
	* The angular damping value for the collision object. Setting this value alters the damping of
	* angular motion of the object (rotation). Valid values are between 0 (no damping) and 1 (full damping).
	*/
	export let angular_damping: any

	/**
	* vector3.
	* The velocity is measured as a rotation around the vector with a speed equivalent to the vector length
	* in radians/s.
	*/
	export let angular_velocity: any

	/**
	* Post this message to a collision-object-component to apply the specified force on the collision object.
	* The collision object must be dynamic.
	*/
	export type apply_force = "apply_force"

	/**
	* See physics.set_listener.
	* This message is sent to a function specified in physics.set_listener
	* when two collision objects collide.
	* This message only reports that a collision has occurred and will be sent once per frame and per colliding pair.
	* For more detailed information, check for the contact_point_event.
	*/
	export type collision_event = "collision_event"

	/**
	* This message is broadcasted to every component of an instance that has a collision object,
	* when the collision object collides with another collision object. For a script to take action
	* when such a collision happens, it should check for this message in its `on_message` callback
	* function.
	* This message only reports that a collision actually happened and will only be sent once per
	* colliding pair and frame.
	* To retrieve more detailed information, check for the `contact_point_response` instead.
	*/
	export type collision_response = "collision_response"

	/**
	* See physics.set_listener.
	* This message is sent to a function specified in physics.set_listener when
	* a collision object has contact points with another collision object.
	* Since multiple contact points can occur for two colliding objects, this event can be sent
	* multiple times in the same frame for the same two colliding objects. To only be notified once
	* when the collision occurs, check for the collision_event event instead.
	*/
	export type contact_point_event = "contact_point_event"

	/**
	* This message is broadcasted to every component of an instance that has a collision object,
	* when the collision object has contact points with respect to another collision object.
	* For a script to take action when such contact points occur, it should check for this message
	* in its `on_message` callback function.
	* Since multiple contact points can occur for two colliding objects, this message can be sent
	* multiple times in the same frame for the same two colliding objects. To only be notified once
	* when the collision occurs, check for the `collision_response` message instead.
	*/
	export type contact_point_response = "contact_point_response"

	/**
	* The linear damping value for the collision object. Setting this value alters the damping of
	* linear motion of the object. Valid values are between 0 (no damping) and 1 (full damping).
	*/
	export let linear_damping: any

	/**
	* The current linear velocity of the collision object component as a vector3.
	* The velocity is measured in units/s (pixels/s).
	*/
	export let linear_velocity: any

	/**
	* READ ONLY Returns the defined physical mass of the collision object component as a number.
	*/
	export let mass: any

	/**
	* fixed joint type
	*/
	export let JOINT_TYPE_FIXED: any

	/**
	* hinge joint type
	*/
	export let JOINT_TYPE_HINGE: any

	/**
	* slider joint type
	*/
	export let JOINT_TYPE_SLIDER: any

	/**
	* spring joint type
	*/
	export let JOINT_TYPE_SPRING: any

	/**
	* weld joint type
	*/
	export let JOINT_TYPE_WELD: any

	/**
	* wheel joint type
	*/
	export let JOINT_TYPE_WHEEL: any

	/**
	* Create a physics joint between two collision object components.
	* Note: Currently only supported in 2D physics.
	* @param joint_type  the joint type
	* @param collisionobject_a  first collision object
	* @param joint_id  id of the joint
	* @param position_a  local position where to attach the joint on the first collision object
	* @param collisionobject_b  second collision object
	* @param position_b  local position where to attach the joint on the second collision object
	* @param properties  optional joint specific properties table
See each joint type for possible properties field. The one field that is accepted for all joint types is:
`collide_connected`: Set this flag to true if the attached bodies should collide.
	*/
	export function create_joint(joint_type: number, collisionobject_a: string | hash | url, joint_id: string | hash, position_a: vmath.vector3, collisionobject_b: string | hash | url, position_b: vmath.vector3, properties?: any): void

	/**
	* Destroy an already physics joint. The joint has to be created before a
	* destroy can be issued.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	*/
	export function destroy_joint(collisionobject: string | hash | url, joint_id: string | hash): void

	/**
	* Get the gravity in runtime. The gravity returned is not global, it will return
	* the gravity for the collection that the function is called from.
	* Note: For 2D physics the z component will always be zero.
	* @return gravity  gravity vector of collection
	*/
	export function get_gravity(): vmath.vector3

	/**
	* Returns the group name of a collision object as a hash.
	* @param url  the collision object to return the group of.
	* @return group  hash value of the group.
`local function check_is_enemy()
    local group = physics.get_group(&quot;#collisionobject&quot;)
    return group == hash(&quot;enemy&quot;)
end
`
	*/
	export function get_group(url: string | hash | url): hash

	/**
	* Get a table for properties for a connected joint. The joint has to be created before
	* properties can be retrieved.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	* @return properties  properties table. See the joint types for what fields are available, the only field available for all types is:

`collide_connected`: Set this flag to true if the attached bodies should collide.

	*/
	export function get_joint_properties(collisionobject: string | hash | url, joint_id: string | hash): any

	/**
	* Get the reaction force for a joint. The joint has to be created before
	* the reaction force can be calculated.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	* @return force  reaction force for the joint
	*/
	export function get_joint_reaction_force(collisionobject: string | hash | url, joint_id: string | hash): vmath.vector3

	/**
	* Get the reaction torque for a joint. The joint has to be created before
	* the reaction torque can be calculated.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	* @return torque  the reaction torque on bodyB in N*m.
	*/
	export function get_joint_reaction_torque(collisionobject: string | hash | url, joint_id: string | hash): any

	/**
	* Returns true if the specified group is set in the mask of a collision
	* object, false otherwise.
	* @param url  the collision object to check the mask of.
	* @param group  the name of the group to check for.
	* @return maskbit  boolean value of the maskbit. 'true' if present, 'false' otherwise.
`local function is_invincible()
    -- check if the collisionobject would collide with the &quot;bullet&quot; group
    local invincible = physics.get_maskbit(&quot;#collisionobject&quot;, &quot;bullet&quot;)
    return invincible
end
`
	*/
	export function get_maskbit(url: string | hash | url, group: string): boolean

	/**
	* Gets collision shape data from a collision object
	* @param url  the collision object.
	* @param shape  the name of the shape to get data for.
	* @return table  A table containing meta data about the physics shape

`type`
The shape type. Supported values:


- `physics.SHAPE_TYPE_SPHERE`
- `physics.SHAPE_TYPE_BOX`
- `physics.SHAPE_TYPE_CAPSULE` *Only supported for 3D physics*
- `physics.SHAPE_TYPE_HULL`

The returned table contains different fields depending on which type the shape is.
If the shape is a sphere:

`diameter`
the diameter of the sphere shape

If the shape is a box:

`dimensions`
a `vmath.vector3` of the box dimensions

If the shape is a capsule:

`diameter`
the diameter of the capsule poles
`height`
the height of the capsule

`local function get_shape_meta()
    local sphere = physics.get_shape(&quot;#collisionobject&quot;, &quot;my_sphere_shape&quot;)
    -- returns a table with sphere.diameter
    return sphere
end
`
	*/
	export function get_shape(url: string | hash | url, shape: string | hash): any

	/**
	* Ray casts are used to test for intersections against collision objects in the physics world.
	* Collision objects of types kinematic, dynamic and static are tested against. Trigger objects
	* do not intersect with ray casts.
	* Which collision objects to hit is filtered by their collision groups and can be configured
	* through `groups`.
	* @param from  the world position of the start of the ray
	* @param to  the world position of the end of the ray
	* @param groups  a lua table containing the hashed groups for which to test collisions against
	* @param options  a lua table containing options for the raycast.

`all`
Set to `true` to return all ray cast hits. If `false`, it will only return the closest hit.

	* @return result  It returns a list. If missed it returns `nil`. See ray_cast_response for details on the returned values.
	*/
	export function raycast(from: vmath.vector3, to: vmath.vector3, groups: any, options: any): LuaMultiReturn<[any, any]>

	/**
	* Ray casts are used to test for intersections against collision objects in the physics world.
	* Collision objects of types kinematic, dynamic and static are tested against. Trigger objects
	* do not intersect with ray casts.
	* Which collision objects to hit is filtered by their collision groups and can be configured
	* through `groups`.
	* The actual ray cast will be performed during the physics-update.
	* 
	* - If an object is hit, the result will be reported via a ray_cast_response message.
	* - If there is no object hit, the result will be reported via a ray_cast_missed message.
	* 
	* @param from  the world position of the start of the ray
	* @param to  the world position of the end of the ray
	* @param groups  a lua table containing the hashed groups for which to test collisions against
	* @param request_id  a number between [0,-255]. It will be sent back in the response for identification, 0 by default
	*/
	export function raycast_async(from: vmath.vector3, to: vmath.vector3, groups: any, request_id?: number): void

	/**
	* Set the gravity in runtime. The gravity change is not global, it will only affect
	* the collection that the function is called from.
	* Note: For 2D physics the z component of the gravity vector will be ignored.
	* @param gravity  the new gravity vector
	*/
	export function set_gravity(gravity: vmath.vector3): void

	/**
	* Updates the group property of a collision object to the specified
	* string value. The group name should exist i.e. have been used in
	* a collision object in the editor.
	* @param url  the collision object affected.
	* @param group  the new group name to be assigned.
`local function change_collision_group()
     physics.set_group(&quot;#collisionobject&quot;, &quot;enemy&quot;)
end
`
	*/
	export function set_group(url: string | hash | url, group: string): void

	/**
	* Flips the collision shapes horizontally for a collision object
	* @param url  the collision object that should flip its shapes
	* @param flip  `true` if the collision object should flip its shapes, `false` if not
	*/
	export function set_hflip(url: string | hash | url, flip: boolean): void

	/**
	* Updates the properties for an already connected joint. The joint has to be created before
	* properties can be changed.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	* @param properties  joint specific properties table
Note: The `collide_connected` field cannot be updated/changed after a connection has been made.
	*/
	export function set_joint_properties(collisionobject: string | hash | url, joint_id: string | hash, properties: any): void

	/**
	* sets a physics world event listener. If a function is set, physics messages will no longer be sent.
	* @param callback  A callback that receives information about all the physics interactions in this physics world.

`self`
The calling script
`event`
The type of event. Can be one of these messages:


- contact_point_event
- collision_event
- trigger_event
- ray_cast_response
- ray_cast_missed


`data`
The callback value data is a table that contains event-related data. See the documentation for details on the messages.

	*/
	export function set_listener(callback: any): void

	/**
	* Sets or clears the masking of a group (maskbit) in a collision object.
	* @param url  the collision object to change the mask of.
	* @param group  the name of the group (maskbit) to modify in the mask.
	* @param maskbit  boolean value of the new maskbit. 'true' to enable, 'false' to disable.
`local function make_invincible()
    -- no longer collide with the &quot;bullet&quot; group
    physics.set_maskbit(&quot;#collisionobject&quot;, &quot;bullet&quot;, false)
end
`
	*/
	export function set_maskbit(url: string | hash | url, group: string, maskbit: boolean): void

	/**
	* Sets collision shape data for a collision object. Please note that updating data in 3D
	* can be quite costly for box and capsules. Because of the physics engine, the cost
	* comes from having to recreate the shape objects when certain shapes needs to be updated.
	* @param url  the collision object.
	* @param shape  the name of the shape to get data for.
	* @param table  the shape data to update the shape with.
See physics.get_shape for a detailed description of each field in the data table.
`local function set_shape_data()
    -- set capsule shape data
    local data = {}
    data.diameter = 10
    data.height = 20
    physics.set_shape(&quot;#collisionobject&quot;, &quot;my_capsule_shape&quot;, data)

    -- set sphere shape data
    data = {}
    data.diameter = 10
    physics.set_shape(&quot;#collisionobject&quot;, &quot;my_sphere_shape&quot;, data)

    -- set box shape data
    data = {}
    data.dimensions = vmath.vector3(10, 10, 5)
    physics.set_shape(&quot;#collisionobject&quot;, &quot;my_box_shape&quot;, data)
end
`
	*/
	export function set_shape(url: string | hash | url, shape: string | hash, table: any): void

	/**
	* Flips the collision shapes vertically for a collision object
	* @param url  the collision object that should flip its shapes
	* @param flip  `true` if the collision object should flip its shapes, `false` if not
	*/
	export function set_vflip(url: string | hash | url, flip: boolean): void

	/**
	* The function recalculates the density of each shape based on the total area of all shapes and the specified mass, then updates the mass of the body accordingly.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  the collision object whose mass needs to be updated.
	* @param mass  the new mass value to set for the collision object.
	*/
	export function update_mass(collisionobject: string | hash | url, mass: number): void

	/**
	* Collision objects tend to fall asleep when inactive for a small period of time for
	* efficiency reasons. This function wakes them up.
	* @param url  the collision object to wake.
`function on_input(self, action_id, action)
    if action_id == hash(&quot;test&quot;) and action.pressed then
        physics.wakeup(&quot;#collisionobject&quot;)
    end
end
`
	*/
	export function wakeup(url: string | hash | url): void

	/**
	* This message is sent back to the sender of a ray_cast_request, or to the physics world listener
	* if it is set (see physics.set_listener), if the ray didn't hit any collision object.
	* See physics.raycast_async for examples of how to use it.
	*/
	export type ray_cast_missed = "ray_cast_missed"

	/**
	* This message is sent back to the sender of a ray_cast_request, or to the physics world listener
	* if it is set (see physics.set_listener), if the ray hits a collision object.
	* See physics.raycast_async for examples of how to use it.
	*/
	export type ray_cast_response = "ray_cast_response"

	/**
	* See physics.set_listener.
	* This message is sent to a function specified in physics.set_listener
	* when a collision object interacts with another collision object and one of them is a trigger.
	* This message only reports that an interaction actually happened and will be sent once per colliding pair and frame.
	* For more detailed information, check for the contact_point_event.
	*/
	export type trigger_event = "trigger_event"

	/**
	* This message is broadcasted to every component of an instance that has a collision object,
	* when the collision object interacts with another collision object and one of them is a trigger.
	* For a script to take action when such an interaction happens, it should check for this message
	* in its `on_message` callback function.
	* This message only reports that an interaction actually happened and will only be sent once per
	* colliding pair and frame. To retrieve more detailed information, check for the
	* `contact_point_response` instead.
	*/
	export type trigger_response = "trigger_response"

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace profiler {

	/**
	* pause on current frame
	*/
	export let MODE_PAUSE: any

	/**
	* start recording
	*/
	export let MODE_RECORD: any

	/**
	* continously show latest frame
	*/
	export let MODE_RUN: any

	/**
	* pause at peak frame
	*/
	export let MODE_SHOW_PEAK_FRAME: any

	/**
	* show full profiler ui
	*/
	export let VIEW_MODE_FULL: any

	/**
	* show mimimal profiler ui
	*/
	export let VIEW_MODE_MINIMIZED: any

	/**
	* Creates and shows or hides and destroys the on-sceen profiler ui
	* The profiler is a real-time tool that shows the numbers of milliseconds spent
	* in each scope per frame as well as counters. The profiler is very useful for
	* tracking down performance and resource problems.
	* @param enabled  true to enable, false to disable
	*/
	export function enable_ui(enabled: boolean): void

	/**
	* Get the percent of CPU usage by the application, as reported by the OS.
	* 🌎 HTML5.
	* 🌎 Windows), this information is only available
	* by default in the debug version of the engine. It can be enabled in release version as well
	* by checking `track_cpu` under `profiler` in the `game.project` file.
	* (This means that the engine will sample the CPU usage in intervalls during execution even in release mode.)
	* @return percent  of CPU used by the application
	*/
	export function get_cpu_usage(): number

	/**
	* Get the amount of memory used (resident/working set) by the application in bytes, as reported by the OS.
	* 🌎 HTML5.
	* The values are gathered from internal OS functions which correspond to the following;
	* 
	* 
	* 
	* OS
	* Value
	* 
	* 
	* 
	* 
	* 🌎 Linux
	* Resident memory
	* 
	* 
	* 🌎 Windows
	* Working set
	* 
	* 
	* 🌎 HTML5
	* 🌎 Not available
	* 
	* 
	* 
	* @return bytes  used by the application
	*/
	export function get_memory_usage(): number

	/**
	* Send a text to the profiler
	* @param text  the string to send to the profiler
	*/
	export function log_text(text: string): void

	/**
	* Get the number of recorded frames in the on-screen profiler ui recording buffer
	* @return frame_count  the number of recorded frames, zero if on-screen profiler is disabled
	*/
	export function recorded_frame_count(): number

	/**
	* Starts a profile scope.
	* @param name  The name of the scope
	*/
	export function scope_begin(name: string): void

	/**
	* End the current profile scope.
	*/
	export function scope_end(): void

	/**
	* Set the on-screen profile mode - run, pause, record or show peak frame
	* @param mode  the mode to set the ui profiler in

- `profiler.MODE_RUN` This is default mode that continously shows the last frame
- `profiler.MODE_PAUSE` Pauses on the currently displayed frame
- `profiler.MODE_SHOW_PEAK_FRAME` Pauses on the currently displayed frame but shows a new frame if that frame is slower
- `profiler.MODE_RECORD` Records all incoming frames to the recording buffer

To stop recording, switch to a different mode such as `MODE_PAUSE` or `MODE_RUN`.
You can also use the `view_recorded_frame` function to display a recorded frame. Doing so stops the recording as well.
Every time you switch to recording mode the recording buffer is cleared.
The recording buffer is also cleared when setting the `MODE_SHOW_PEAK_FRAME` mode.
	*/
	export function set_ui_mode(mode: any): void

	/**
	* Set the on-screen profile view mode - minimized or expanded
	* @param mode  the view mode to set the ui profiler in

- `profiler.VIEW_MODE_FULL` The default mode which displays all the ui profiler details
- `profiler.VIEW_MODE_MINIMIZED` Minimized mode which only shows the top header (fps counters and ui profiler mode)

	*/
	export function set_ui_view_mode(mode: any): void

	/**
	* Shows or hides the time the engine waits for vsync in the on-screen profiler
	* Each frame the engine waits for vsync and depending on your vsync settings and how much time
	* your game logic takes this time can dwarf the time in the game logic making it hard to
	* see details in the on-screen profiler graph and lists.
	* Also, by hiding this the FPS times in the header show the time spent each time excuding the
	* time spent waiting for vsync. This shows you how long time your game is spending actively
	* working each frame.
	* This setting also effects the display of recorded frames but does not affect the actual
	* recorded frames so it is possible to toggle this on and off when viewing recorded frames.
	* By default the vsync wait times is displayed in the profiler.
	* @param visible  true to include it in the display, false to hide it.
	*/
	export function set_ui_vsync_wait_visible(visible: boolean): void

	/**
	* Pauses and displays a frame from the recording buffer in the on-screen profiler ui
	* The frame to show can either be an absolute frame or a relative frame to the current frame.
	* @param frame_index  a table where you specify one of the following parameters:

- `distance` The offset from the currently displayed frame (this is truncated between zero and the number of recorded frames)
- `frame` The frame index in the recording buffer (1 is first recorded frame)

	*/
	export function view_recorded_frame(frame_index: any): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace render {

	/**
	* Set render clear color. This is the color that appears on the screen where nothing is rendered, i.e. background.
	*/
	export type clear_color = "clear_color"

	/**
	* Draw a text on the screen. This should be used for debugging purposes only.
	*/
	export type draw_debug_text = "draw_debug_text"

	/**
	* Draw a line on the screen. This should mostly be used for debugging purposes.
	*/
	export type draw_line = "draw_line"

	/**
	* 
	*/
	export let BLEND_CONSTANT_ALPHA: any

	/**
	* 
	*/
	export let BLEND_CONSTANT_COLOR: any

	/**
	* 
	*/
	export let BLEND_DST_ALPHA: any

	/**
	* 
	*/
	export let BLEND_DST_COLOR: any

	/**
	* 
	*/
	export let BLEND_ONE: any

	/**
	* 
	*/
	export let BLEND_ONE_MINUS_CONSTANT_ALPHA: any

	/**
	* 
	*/
	export let BLEND_ONE_MINUS_CONSTANT_COLOR: any

	/**
	* 
	*/
	export let BLEND_ONE_MINUS_DST_ALPHA: any

	/**
	* 
	*/
	export let BLEND_ONE_MINUS_DST_COLOR: any

	/**
	* 
	*/
	export let BLEND_ONE_MINUS_SRC_ALPHA: any

	/**
	* 
	*/
	export let BLEND_ONE_MINUS_SRC_COLOR: any

	/**
	* 
	*/
	export let BLEND_SRC_ALPHA: any

	/**
	* 
	*/
	export let BLEND_SRC_ALPHA_SATURATE: any

	/**
	* 
	*/
	export let BLEND_SRC_COLOR: any

	/**
	* 
	*/
	export let BLEND_ZERO: any

	/**
	* 
	*/
	export let BUFFER_COLOR0_BIT: any

	/**
	* 
	*/
	export let BUFFER_COLOR1_BIT: any

	/**
	* 
	*/
	export let BUFFER_COLOR2_BIT: any

	/**
	* 
	*/
	export let BUFFER_COLOR3_BIT: any

	/**
	* 
	*/
	export let BUFFER_COLOR_BIT: any

	/**
	* 
	*/
	export let BUFFER_DEPTH_BIT: any

	/**
	* 
	*/
	export let BUFFER_STENCIL_BIT: any

	/**
	* 
	*/
	export let COMPARE_FUNC_ALWAYS: any

	/**
	* 
	*/
	export let COMPARE_FUNC_EQUAL: any

	/**
	* 
	*/
	export let COMPARE_FUNC_GEQUAL: any

	/**
	* 
	*/
	export let COMPARE_FUNC_GREATER: any

	/**
	* 
	*/
	export let COMPARE_FUNC_LEQUAL: any

	/**
	* 
	*/
	export let COMPARE_FUNC_LESS: any

	/**
	* 
	*/
	export let COMPARE_FUNC_NEVER: any

	/**
	* 
	*/
	export let COMPARE_FUNC_NOTEQUAL: any

	/**
	* 
	*/
	export let FACE_BACK: any

	/**
	* 
	*/
	export let FACE_FRONT: any

	/**
	* 
	*/
	export let FACE_FRONT_AND_BACK: any

	/**
	* 
	*/
	export let FILTER_LINEAR: any

	/**
	* 
	*/
	export let FILTER_NEAREST: any

	/**
	* 
	*/
	export let FORMAT_DEPTH: any

	/**
	* 
	*/
	export let FORMAT_LUMINANCE: any

	/**
	* May be nil if the format isn't supported
	*/
	export let FORMAT_R16F: any

	/**
	* May be nil if the format isn't supported
	*/
	export let FORMAT_R32F: any

	/**
	* May be nil if the format isn't supported
	*/
	export let FORMAT_RG16F: any

	/**
	* May be nil if the format isn't supported
	*/
	export let FORMAT_RG32F: any

	/**
	* 
	*/
	export let FORMAT_RGB: any

	/**
	* May be nil if the format isn't supported
	*/
	export let FORMAT_RGB16F: any

	/**
	* May be nil if the format isn't supported
	*/
	export let FORMAT_RGB32F: any

	/**
	* 
	*/
	export let FORMAT_RGBA: any

	/**
	* May be nil if the format isn't supported
	*/
	export let FORMAT_RGBA16F: any

	/**
	* May be nil if the format isn't supported
	*/
	export let FORMAT_RGBA32F: any

	/**
	* 
	*/
	export let FORMAT_STENCIL: any

	/**
	* 
	*/
	export let FRUSTUM_PLANES_ALL: any

	/**
	* 
	*/
	export let FRUSTUM_PLANES_SIDES: any

	/**
	* 
	*/
	export let RENDER_TARGET_DEFAULT: any

	/**
	* 
	*/
	export let STATE_BLEND: any

	/**
	* 
	*/
	export let STATE_CULL_FACE: any

	/**
	* 
	*/
	export let STATE_DEPTH_TEST: any

	/**
	* 
	*/
	export let STATE_POLYGON_OFFSET_FILL: any

	/**
	* 
	*/
	export let STATE_STENCIL_TEST: any

	/**
	* 
	*/
	export let STENCIL_OP_DECR: any

	/**
	* 
	*/
	export let STENCIL_OP_DECR_WRAP: any

	/**
	* 
	*/
	export let STENCIL_OP_INCR: any

	/**
	* 
	*/
	export let STENCIL_OP_INCR_WRAP: any

	/**
	* 
	*/
	export let STENCIL_OP_INVERT: any

	/**
	* 
	*/
	export let STENCIL_OP_KEEP: any

	/**
	* 
	*/
	export let STENCIL_OP_REPLACE: any

	/**
	* 
	*/
	export let STENCIL_OP_ZERO: any

	/**
	* 
	*/
	export let WRAP_CLAMP_TO_BORDER: any

	/**
	* 
	*/
	export let WRAP_CLAMP_TO_EDGE: any

	/**
	* 
	*/
	export let WRAP_MIRRORED_REPEAT: any

	/**
	* 
	*/
	export let WRAP_REPEAT: any

	/**
	* Clear buffers in the currently enabled render target with specified value. If the render target has been created with multiple
	* color attachments, all buffers will be cleared with the same value.
	* @param buffers  table with keys specifying which buffers to clear and values set to clear values. Available keys are:

- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	*/
	export function clear(buffers: any): void

	/**
	* Constant buffers are used to set shader program variables and are optionally passed to the `render.draw()` function.
	* The buffer's constant elements can be indexed like an ordinary Lua table, but you can't iterate over them with pairs() or ipairs().
	* @return buffer  new constant buffer
	*/
	export function constant_buffer(): any

	/**
	* Deletes a render target created by a render script.
	* You cannot delete a render target resource.
	* @param render_target  render target to delete
	*/
	export function delete_render_target(render_target: any): void

	/**
	* If a material is currently enabled, disable it.
	* The name of the material must be specified in the ".render" resource set
	* in the "game.project" setting.
	*/
	export function disable_material(): void

	/**
	* Disables a render state.
	* @param state  state to disable

- `render.STATE_DEPTH_TEST`
- `render.STATE_STENCIL_TEST`
- `render.STATE_BLEND`
🤖 not available on iOS and Android)
- `render.STATE_CULL_FACE`
- `render.STATE_POLYGON_OFFSET_FILL`

	*/
	export function disable_state(state: any): void

	/**
	* Disables a texture that has previourly been enabled.
	* @param binding  texture binding, either by texture unit, string or hash that should be disabled
	*/
	export function disable_texture(binding: number | string | hash): void

	/**
	* Draws all objects that match a specified predicate. An optional constant buffer can be
	* provided to override the default constants. If no constants buffer is provided, a default
	* system constants buffer is used containing constants as defined in materials and set through
	* go.set (or particlefx.set_constant) on visual components.
	* @param predicate  predicate to draw for
	* @param options  optional table with properties:

`frustum`
A frustum matrix used to cull renderable items. (E.g. `local frustum = proj * view`). default=nil
`frustum_planes`
Determines which sides of the frustum will be used. Default is render.FRUSTUM_PLANES_SIDES.


- render.FRUSTUM_PLANES_SIDES : The left, right, top and bottom sides of the frustum.
- render.FRUSTUM_PLANES_ALL : All 6 sides of the frustum.


`constants`
optional constants to use while rendering

	*/
	export function draw(predicate: any, options?: any): void

	/**
	* Draws all 3d debug graphics such as lines drawn with "draw_line" messages and physics visualization.
	* @param options  optional table with properties:

`frustum`
A frustum matrix used to cull renderable items. (E.g. `local frustum = proj * view`). May be nil.
`frustum_planes`
Determines which sides of the frustum will be used. Default is render.FRUSTUM_PLANES_SIDES.


- render.FRUSTUM_PLANES_SIDES : The left, right, top and bottom sides of the frustum.
- render.FRUSTUM_PLANES_ALL : All sides of the frustum.

	*/
	export function draw_debug3d(options?: any): void

	/**
	* If another material was already enabled, it will be automatically disabled
	* and the specified material is used instead.
	* The name of the material must be specified in the ".render" resource set
	* in the "game.project" setting.
	* @param material_id  material id to enable
	*/
	export function enable_material(material_id: string | hash): void

	/**
	* Enables a particular render state. The state will be enabled until disabled.
	* @param state  state to enable

- `render.STATE_DEPTH_TEST`
- `render.STATE_STENCIL_TEST`
- `render.STATE_BLEND`
🤖 not available on iOS and Android)
- `render.STATE_CULL_FACE`
- `render.STATE_POLYGON_OFFSET_FILL`

	*/
	export function enable_state(state: any): void

	/**
	* Sets the specified texture handle for a render target attachment or a regular texture
	* that should be used for rendering. The texture can be bound to either a texture unit
	* or to a sampler name by a hash or a string.
	* A texture can be bound to multiple units and sampler names at the same time,
	* the actual binding will be applied to the shaders when a shader program is bound.
	* When mixing binding using both units and sampler names, you might end up in situations
	* where two different textures will be applied to the same bind location in the shader.
	* In this case, the texture set to the named sampler will take precedence over the unit.
	* Note that you can bind multiple sampler names to the same texture, in case you want to reuse
	* the same texture for differnt use-cases. It is however recommended that you use the same name
	* everywhere for the textures that should be shared across different materials.
	* @param binding  texture binding, either by texture unit, string or hash for the sampler name that the texture should be bound to
	* @param handle_or_name  render target or texture handle that should be bound, or a named resource in the "Render Resource" table in the currently assigned .render file
	* @param buffer_type  optional buffer type from which to enable the texture. Note that this argument only applies to render targets. Defaults to `render.BUFFER_COLOR_BIT`. These values are supported:

- `render.BUFFER_COLOR_BIT`

If The render target has been created as depth and/or stencil textures, these buffer types can be used:

- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

If the render target has been created with multiple color attachments, these buffer types can be used
to enable those textures as well. Currently 4 color attachments are supported:

- `render.BUFFER_COLOR0_BIT`
- `render.BUFFER_COLOR1_BIT`
- `render.BUFFER_COLOR2_BIT`
- `render.BUFFER_COLOR3_BIT`

	*/
	export function enable_texture(binding: number | string | hash, handle_or_name: any, buffer_type?: any): void

	/**
	* Returns the logical window height that is set in the "game.project" settings.
	* Note that the actual window pixel size can change, either by device constraints
	* or user input.
	* @return height  specified window height
	*/
	export function get_height(): number

	/**
	* Returns the specified buffer height from a render target.
	* @param render_target  render target from which to retrieve the buffer height
	* @param buffer_type  which type of buffer to retrieve the height from

- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	* @return height  the height of the render target buffer texture
	*/
	export function get_render_target_height(render_target: any, buffer_type: any): number

	/**
	* Returns the specified buffer width from a render target.
	* @param render_target  render target from which to retrieve the buffer width
	* @param buffer_type  which type of buffer to retrieve the width from

- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_COLOR[x]_BIT` (x: [0..3], if supported!)
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	* @return width  the width of the render target buffer texture
	*/
	export function get_render_target_width(render_target: any, buffer_type: any): number

	/**
	* Returns the logical window width that is set in the "game.project" settings.
	* Note that the actual window pixel size can change, either by device constraints
	* or user input.
	* @return width  specified window width (number)
	*/
	export function get_width(): number

	/**
	* Returns the actual physical window height.
	* Note that this value might differ from the logical height that is set in the
	* "game.project" settings.
	* @return height  actual window height
	*/
	export function get_window_height(): number

	/**
	* Returns the actual physical window width.
	* Note that this value might differ from the logical width that is set in the
	* "game.project" settings.
	* @return width  actual window width
	*/
	export function get_window_width(): number

	/**
	* This function returns a new render predicate for objects with materials matching
	* the provided material tags. The provided tags are combined into a bit mask
	* for the predicate. If multiple tags are provided, the predicate matches materials
	* with all tags ANDed together.
	* The current limit to the number of tags that can be defined is `64`.
	* @param tags  table of tags that the predicate should match. The tags can be of either hash or string type
	* @return predicate  new predicate
	*/
	export function predicate(tags: any): any

	/**
	* Creates a new render target according to the supplied
	* specification table.
	* The table should contain keys specifying which buffers should be created
	* with what parameters. Each buffer key should have a table value consisting
	* of parameters. The following parameter keys are available:
	* 
	* 
	* 
	* Key
	* Values
	* 
	* 
	* 
	* 
	* `format`
	* `render.FORMAT_LUMINANCE``render.FORMAT_RGB``render.FORMAT_RGBA``render.FORMAT_DEPTH``render.FORMAT_STENCIL``render.FORMAT_RGBA32F``render.FORMAT_RGBA16F`
	* 
	* 
	* `width`
	* number
	* 
	* 
	* `height`
	* number
	* 
	* 
	* `min_filter` (optional)
	* `render.FILTER_LINEAR``render.FILTER_NEAREST`
	* 
	* 
	* `mag_filter` (optional)
	* `render.FILTER_LINEAR``render.FILTER_NEAREST`
	* 
	* 
	* `u_wrap`     (optional)
	* `render.WRAP_CLAMP_TO_BORDER``render.WRAP_CLAMP_TO_EDGE``render.WRAP_MIRRORED_REPEAT``render.WRAP_REPEAT`
	* 
	* 
	* `v_wrap`     (optional)
	* `render.WRAP_CLAMP_TO_BORDER``render.WRAP_CLAMP_TO_EDGE``render.WRAP_MIRRORED_REPEAT``render.WRAP_REPEAT`
	* 
	* 
	* `flags`      (optional)
	* `render.TEXTURE_BIT` (only applicable to depth and stencil buffers)
	* 
	* 
	* 
	* The render target can be created to support multiple color attachments. Each attachment can have different format settings and texture filters,
	* but attachments must be added in sequence, meaning you cannot create a render target at slot 0 and 3.
	* Instead it has to be created with all four buffer types ranging from [0..3] (as denoted by render.BUFFER_COLORX_BIT where 'X' is the attachment you want to create).
	* It is not guaranteed that the device running the script can support creating render targets with multiple color attachments. To check if the device can support multiple attachments,
	* you can check if the `render` table contains any of the `BUFFER_COLOR1_BIT`, `BUFFER_COLOR2_BIT` or `BUFFER_COLOR3_BIT` constants:
	* `function init(self)
	*     if render.BUFFER_COLOR1_BIT == nil then
	*         -- this devices does not support multiple color attachments
	*     end
	* end
	* `
	* @param name  render target name
	* @param parameters  table of buffer parameters, see the description for available keys and values
	* @return render_target  new render target
	*/
	export function render_target(name: string, parameters: any): any

	/**
	* Specifies the arithmetic used when computing pixel values that are written to the frame
	* buffer. In RGBA mode, pixels can be drawn using a function that blends the source RGBA
	* pixel values with the destination pixel values already in the frame buffer.
	* Blending is initially disabled.
	* `source_factor` specifies which method is used to scale the source color components.
	* `destination_factor` specifies which method is used to scale the destination color
	* components.
	* Source color components are referred to as (Rs,Gs,Bs,As).
	* Destination color components are referred to as (Rd,Gd,Bd,Ad).
	* The color specified by setting the blendcolor is referred to as (Rc,Gc,Bc,Ac).
	* The source scale factor is referred to as (sR,sG,sB,sA).
	* The destination scale factor is referred to as (dR,dG,dB,dA).
	* The color values have integer values between 0 and (kR,kG,kB,kA), where kc = 2mc - 1 and mc is the number of bitplanes for that color. I.e for 8 bit color depth, color values are between `0` and `255`.
	* Available factor constants and corresponding scale factors:
	* 
	* 
	* 
	* Factor constant
	* Scale factor (fR,fG,fB,fA)
	* 
	* 
	* 
	* 
	* `render.BLEND_ZERO`
	* (0,0,0,0)
	* 
	* 
	* `render.BLEND_ONE`
	* (1,1,1,1)
	* 
	* 
	* `render.BLEND_SRC_COLOR`
	* (Rs/kR,Gs/kG,Bs/kB,As/kA)
	* 
	* 
	* `render.BLEND_ONE_MINUS_SRC_COLOR`
	* (1,1,1,1) - (Rs/kR,Gs/kG,Bs/kB,As/kA)
	* 
	* 
	* `render.BLEND_DST_COLOR`
	* (Rd/kR,Gd/kG,Bd/kB,Ad/kA)
	* 
	* 
	* `render.BLEND_ONE_MINUS_DST_COLOR`
	* (1,1,1,1) - (Rd/kR,Gd/kG,Bd/kB,Ad/kA)
	* 
	* 
	* `render.BLEND_SRC_ALPHA`
	* (As/kA,As/kA,As/kA,As/kA)
	* 
	* 
	* `render.BLEND_ONE_MINUS_SRC_ALPHA`
	* (1,1,1,1) - (As/kA,As/kA,As/kA,As/kA)
	* 
	* 
	* `render.BLEND_DST_ALPHA`
	* (Ad/kA,Ad/kA,Ad/kA,Ad/kA)
	* 
	* 
	* `render.BLEND_ONE_MINUS_DST_ALPHA`
	* (1,1,1,1) - (Ad/kA,Ad/kA,Ad/kA,Ad/kA)
	* 
	* 
	* `render.BLEND_CONSTANT_COLOR`
	* (Rc,Gc,Bc,Ac)
	* 
	* 
	* `render.BLEND_ONE_MINUS_CONSTANT_COLOR`
	* (1,1,1,1) - (Rc,Gc,Bc,Ac)
	* 
	* 
	* `render.BLEND_CONSTANT_ALPHA`
	* (Ac,Ac,Ac,Ac)
	* 
	* 
	* `render.BLEND_ONE_MINUS_CONSTANT_ALPHA`
	* (1,1,1,1) - (Ac,Ac,Ac,Ac)
	* 
	* 
	* `render.BLEND_SRC_ALPHA_SATURATE`
	* (i,i,i,1) where i = min(As, kA - Ad) /kA
	* 
	* 
	* 
	* The blended RGBA values of a pixel comes from the following equations:
	* 
	* - Rd = min(kR, Rs * sR + Rd * dR)
	* - Gd = min(kG, Gs * sG + Gd * dG)
	* - Bd = min(kB, Bs * sB + Bd * dB)
	* - Ad = min(kA, As * sA + Ad * dA)
	* 
	* Blend function `(render.BLEND_SRC_ALPHA, render.BLEND_ONE_MINUS_SRC_ALPHA)` is useful for
	* drawing with transparency when the drawn objects are sorted from farthest to nearest.
	* It is also useful for drawing antialiased points and lines in arbitrary order.
	* @param source_factor  source factor
	* @param destination_factor  destination factor
	*/
	export function set_blend_func(source_factor: any, destination_factor: any): void

	/**
	* Specifies whether the individual color components in the frame buffer is enabled for writing (`true`) or disabled (`false`). For example, if `blue` is `false`, nothing is written to the blue component of any pixel in any of the color buffers, regardless of the drawing operation attempted. Note that writing are either enabled or disabled for entire color components, not the individual bits of a component.
	* The component masks are all initially `true`.
	* @param red  red mask
	* @param green  green mask
	* @param blue  blue mask
	* @param alpha  alpha mask
	*/
	export function set_color_mask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void

	/**
	* Specifies whether front- or back-facing polygons can be culled
	* when polygon culling is enabled. Polygon culling is initially disabled.
	* If mode is `render.FACE_FRONT_AND_BACK`, no polygons are drawn, but other
	* primitives such as points and lines are drawn. The initial value for
	* `face_type` is `render.FACE_BACK`.
	* @param face_type  face type

- `render.FACE_FRONT`
- `render.FACE_BACK`
- `render.FACE_FRONT_AND_BACK`

	*/
	export function set_cull_face(face_type: any): void

	/**
	* Specifies the function that should be used to compare each incoming pixel
	* depth value with the value present in the depth buffer.
	* The comparison is performed only if depth testing is enabled and specifies
	* the conditions under which a pixel will be drawn.
	* Function constants:
	* 
	* - `render.COMPARE_FUNC_NEVER` (never passes)
	* - `render.COMPARE_FUNC_LESS` (passes if the incoming depth value is less than the stored value)
	* - `render.COMPARE_FUNC_LEQUAL` (passes if the incoming depth value is less than or equal to the stored value)
	* - `render.COMPARE_FUNC_GREATER` (passes if the incoming depth value is greater than the stored value)
	* - `render.COMPARE_FUNC_GEQUAL` (passes if the incoming depth value is greater than or equal to the stored value)
	* - `render.COMPARE_FUNC_EQUAL` (passes if the incoming depth value is equal to the stored value)
	* - `render.COMPARE_FUNC_NOTEQUAL` (passes if the incoming depth value is not equal to the stored value)
	* - `render.COMPARE_FUNC_ALWAYS` (always passes)
	* 
	* The depth function is initially set to `render.COMPARE_FUNC_LESS`.
	* @param func  depth test function, see the description for available values
	*/
	export function set_depth_func(func: any): void

	/**
	* Specifies whether the depth buffer is enabled for writing. The supplied mask governs
	* if depth buffer writing is enabled (`true`) or disabled (`false`).
	* The mask is initially `true`.
	* @param depth  depth mask
	*/
	export function set_depth_mask(depth: boolean): void

	/**
	* Sets the scale and units used to calculate depth values.
	* If `render.STATE_POLYGON_OFFSET_FILL` is enabled, each fragment's depth value
	* is offset from its interpolated value (depending on the depth value of the
	* appropriate vertices). Polygon offset can be used when drawing decals, rendering
	* hidden-line images etc.
	* `factor` specifies a scale factor that is used to create a variable depth
	* offset for each polygon. The initial value is `0`.
	* `units` is multiplied by an implementation-specific value to create a
	* constant depth offset. The initial value is `0`.
	* The value of the offset is computed as `factor` &times; `DZ` + `r` &times; `units`
	* `DZ` is a measurement of the depth slope of the polygon which is the change in z (depth)
	* values divided by the change in either x or y coordinates, as you traverse a polygon.
	* The depth values are in window coordinates, clamped to the range [0, 1].
	* `r` is the smallest value that is guaranteed to produce a resolvable difference.
	* It's value is an implementation-specific constant.
	* The offset is added before the depth test is performed and before the
	* value is written into the depth buffer.
	* @param factor  polygon offset factor
	* @param units  polygon offset units
	*/
	export function set_polygon_offset(factor: number, units: number): void

	/**
	* Sets the projection matrix to use when rendering.
	* @param matrix  projection matrix
	*/
	export function set_projection(matrix: vmath.matrix4): void

	/**
	* Sets a render target. Subsequent draw operations will be to the
	* render target until it is replaced by a subsequent call to set_render_target.
	* This function supports render targets created by a render script, or a render target resource.
	* @param render_target  render target to set. render.RENDER_TARGET_DEFAULT to set the default render target
	* @param options  optional table with behaviour parameters

`transient`
Transient frame buffer types are only valid while the render target is active, i.e becomes undefined when a new target is set by a subsequent call to set_render_target.
 Default is all non-transient. Be aware that some hardware uses a combined depth stencil buffer and when this is the case both are considered non-transient if exclusively selected!
 A buffer type defined that doesn't exist in the render target is silently ignored.


- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	*/
	export function set_render_target(render_target: any, options?: any): void

	/**
	* Sets the render target size for a render target created from
	* either a render script, or from a render target resource.
	* @param render_target  render target to set size for
	* @param width  new render target width
	* @param height  new render target height
	*/
	export function set_render_target_size(render_target: any, width: number, height: number): void

	/**
	* Stenciling is similar to depth-buffering as it enables and disables drawing on a
	* per-pixel basis. First, GL drawing primitives are drawn into the stencil planes.
	* Second, geometry and images are rendered but using the stencil planes to mask out
	* where to draw.
	* The stencil test discards a pixel based on the outcome of a comparison between the
	* reference value `ref` and the corresponding value in the stencil buffer.
	* `func` specifies the comparison function. See the table below for values.
	* The initial value is `render.COMPARE_FUNC_ALWAYS`.
	* `ref` specifies the reference value for the stencil test. The value is clamped to
	* the range [0, 2n-1], where n is the number of bitplanes in the stencil buffer.
	* The initial value is `0`.
	* `mask` is ANDed with both the reference value and the stored stencil value when the test
	* is done. The initial value is all `1`'s.
	* Function constant:
	* 
	* - `render.COMPARE_FUNC_NEVER` (never passes)
	* - `render.COMPARE_FUNC_LESS` (passes if (ref &amp; mask) &lt; (stencil &amp; mask))
	* - `render.COMPARE_FUNC_LEQUAL` (passes if (ref &amp; mask) &lt;= (stencil &amp; mask))
	* - `render.COMPARE_FUNC_GREATER` (passes if (ref &amp; mask) &gt; (stencil &amp; mask))
	* - `render.COMPARE_FUNC_GEQUAL` (passes if (ref &amp; mask) &gt;= (stencil &amp; mask))
	* - `render.COMPARE_FUNC_EQUAL` (passes if (ref &amp; mask) = (stencil &amp; mask))
	* - `render.COMPARE_FUNC_NOTEQUAL` (passes if (ref &amp; mask) != (stencil &amp; mask))
	* - `render.COMPARE_FUNC_ALWAYS` (always passes)
	* 
	* @param func  stencil test function, see the description for available values
	* @param ref  reference value for the stencil test
	* @param mask  mask that is ANDed with both the reference value and the stored stencil value when the test is done
	*/
	export function set_stencil_func(func: any, ref: number, mask: number): void

	/**
	* The stencil mask controls the writing of individual bits in the stencil buffer.
	* The least significant `n` bits of the parameter `mask`, where `n` is the number of
	* bits in the stencil buffer, specify the mask.
	* Where a `1` bit appears in the mask, the corresponding
	* bit in the stencil buffer can be written. Where a `0` bit appears in the mask,
	* the corresponding bit in the stencil buffer is never written.
	* The mask is initially all `1`'s.
	* @param mask  stencil mask
	*/
	export function set_stencil_mask(mask: number): void

	/**
	* The stencil test discards a pixel based on the outcome of a comparison between the
	* reference value `ref` and the corresponding value in the stencil buffer.
	* To control the test, call render.set_stencil_func.
	* This function takes three arguments that control what happens to the stored stencil
	* value while stenciling is enabled. If the stencil test fails, no change is made to the
	* pixel's color or depth buffers, and `sfail` specifies what happens to the stencil buffer
	* contents.
	* Operator constants:
	* 
	* - `render.STENCIL_OP_KEEP` (keeps the current value)
	* - `render.STENCIL_OP_ZERO` (sets the stencil buffer value to 0)
	* - `render.STENCIL_OP_REPLACE` (sets the stencil buffer value to `ref`, as specified by render.set_stencil_func)
	* - `render.STENCIL_OP_INCR` (increments the stencil buffer value and clamp to the maximum representable unsigned value)
	* - `render.STENCIL_OP_INCR_WRAP` (increments the stencil buffer value and wrap to zero when incrementing the maximum representable unsigned value)
	* - `render.STENCIL_OP_DECR` (decrements the current stencil buffer value and clamp to 0)
	* - `render.STENCIL_OP_DECR_WRAP` (decrements the current stencil buffer value and wrap to the maximum representable unsigned value when decrementing zero)
	* - `render.STENCIL_OP_INVERT` (bitwise inverts the current stencil buffer value)
	* 
	* `dppass` and `dpfail` specify the stencil buffer actions depending on whether subsequent
	* depth buffer tests succeed (dppass) or fail (dpfail).
	* The initial value for all operators is `render.STENCIL_OP_KEEP`.
	* @param sfail  action to take when the stencil test fails
	* @param dpfail  the stencil action when the stencil test passes
	* @param dppass  the stencil action when both the stencil test and the depth test pass, or when the stencil test passes and either there is no depth buffer or depth testing is not enabled
	*/
	export function set_stencil_op(sfail: any, dpfail: any, dppass: any): void

	/**
	* Sets the view matrix to use when rendering.
	* @param matrix  view matrix to set
	*/
	export function set_view(matrix: vmath.matrix4): void

	/**
	* Set the render viewport to the specified rectangle.
	* @param x  left corner
	* @param y  bottom corner
	* @param width  viewport width
	* @param height  viewport height
	*/
	export function set_viewport(x: number, y: number, width: number, height: number): void

	/**
	* Set the size of the game window. Only works on desktop platforms.
	*/
	export type resize = "resize"

	/**
	* Reports a change in window size. This is initiated on window resize on desktop or by orientation changes
	* on mobile devices.
	*/
	export type window_resized = "window_resized"

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace resource {

	/**
	* BASIS_UASTC compression type
	*/
	export let COMPRESSION_TYPE_BASIS_UASTC: any

	/**
	* COMPRESSION_TYPE_DEFAULT compression type
	*/
	export let COMPRESSION_TYPE_DEFAULT: any

	/**
	* luminance type texture format
	*/
	export let TEXTURE_FORMAT_LUMINANCE: any

	/**
	* R16F type texture format
	*/
	export let TEXTURE_FORMAT_R16F: any

	/**
	* R32F type texture format
	*/
	export let TEXTURE_FORMAT_R32F: any

	/**
	* RG16F type texture format
	*/
	export let TEXTURE_FORMAT_RG16F: any

	/**
	* RG32F type texture format
	*/
	export let TEXTURE_FORMAT_RG32F: any

	/**
	* RGB type texture format
	*/
	export let TEXTURE_FORMAT_RGB: any

	/**
	* RGB16F type texture format
	*/
	export let TEXTURE_FORMAT_RGB16F: any

	/**
	* RGB32F type texture format
	*/
	export let TEXTURE_FORMAT_RGB32F: any

	/**
	* RGBA type texture format
	*/
	export let TEXTURE_FORMAT_RGBA: any

	/**
	* RGBA16F type texture format
	*/
	export let TEXTURE_FORMAT_RGBA16F: any

	/**
	* RGBA32F type texture format
	*/
	export let TEXTURE_FORMAT_RGBA32F: any

	/**
	* RGBA_ASTC_4x4 type texture format
	*/
	export let TEXTURE_FORMAT_RGBA_ASTC_4x4: any

	/**
	* RGBA_BC3 type texture format
	*/
	export let TEXTURE_FORMAT_RGBA_BC3: any

	/**
	* RGBA_BC7 type texture format
	*/
	export let TEXTURE_FORMAT_RGBA_BC7: any

	/**
	* RGBA_ETC2 type texture format
	*/
	export let TEXTURE_FORMAT_RGBA_ETC2: any

	/**
	* RGBA_PVRTC_2BPPV1 type texture format
	*/
	export let TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1: any

	/**
	* RGBA_PVRTC_4BPPV1 type texture format
	*/
	export let TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1: any

	/**
	* RGB_BC1 type texture format
	*/
	export let TEXTURE_FORMAT_RGB_BC1: any

	/**
	* RGB_ETC1 type texture format
	*/
	export let TEXTURE_FORMAT_RGB_ETC1: any

	/**
	* RGB_PVRTC_2BPPV1 type texture format
	*/
	export let TEXTURE_FORMAT_RGB_PVRTC_2BPPV1: any

	/**
	* RGB_PVRTC_4BPPV1 type texture format
	*/
	export let TEXTURE_FORMAT_RGB_PVRTC_4BPPV1: any

	/**
	* RG_BC5 type texture format
	*/
	export let TEXTURE_FORMAT_RG_BC5: any

	/**
	* R_BC4 type texture format
	*/
	export let TEXTURE_FORMAT_R_BC4: any

	/**
	* 2D texture type
	*/
	export let TEXTURE_TYPE_2D: any

	/**
	* 2D Array texture type
	*/
	export let TEXTURE_TYPE_2D_ARRAY: any

	/**
	* Cube map texture type
	*/
	export let TEXTURE_TYPE_CUBE_MAP: any

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @param path  optional resource path string to the resource
	* @return path  a path hash to the binary version of the resource
	*/
	export function atlas(path?: string): hash

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @param path  optional resource path string to the resource
	* @return path  a path hash to the binary version of the resource
	*/
	export function buffer(path?: string): hash

	/**
	* This function creates a new atlas resource that can be used in the same way as any atlas created during build time.
	* The path used for creating the atlas must be unique, trying to create a resource at a path that is already
	* registered will trigger an error. If the intention is to instead modify an existing atlas, use the resource.set_atlas
	* function. Also note that the path to the new atlas resource must have a '.texturesetc' extension,
	* meaning "/path/my_atlas" is not a valid path but "/path/my_atlas.texturesetc" is.
	* When creating the atlas, at least one geometry and one animation is required, and an error will be
	* raised if these requirements are not met. A reference to the resource will be held by the collection
	* that created the resource and will automatically be released when that collection is destroyed.
	* Note that releasing a resource essentially means decreasing the reference count of that resource,
	* and not necessarily that it will be deleted.
	* @param path  The path to the resource.
	* @param table  A table containing info about how to create the atlas. Supported entries:



`texture`
the path to the texture resource, e.g "/main/my_texture.texturec"




`animations`
a list of the animations in the atlas. Supports the following fields:




`id`
the id of the animation, used in e.g sprite.play_animation




`width`
the width of the animation




`height`
the height of the animation




`frame_start`
index to the first geometry of the animation. Indices are lua based and must be in the range of 1 ..  in atlas.




`frame_end`
index to the last geometry of the animation (non-inclusive). Indices are lua based and must be in the range of 1 ..  in atlas.




`playback`
optional playback mode of the animation, the default value is go.PLAYBACK_ONCE_FORWARD




`fps`
optional fps of the animation, the default value is 30




`flip_vertical`
optional flip the animation vertically, the default value is false




`flip_horizontal`
optional flip the animation horizontally, the default value is false




`geometries`
A list of the geometries that should map to the texture data. Supports the following fields:




`id`
The name of the geometry. Used when matching animations between multiple atlases




`vertices`
a list of the vertices in texture space of the geometry in the form {px0, py0, px1, py1, ..., pxn, pyn}




`uvs`
a list of the uv coordinates in texture space of the geometry in the form of {u0, v0, u1, v1, ..., un, vn}




`indices`
a list of the indices of the geometry in the form {i0, i1, i2, ..., in}. Each tripe in the list represents a triangle.



	* @return path  Returns the atlas resource path
	*/
	export function create_atlas(path: string, table: any): hash

	/**
	* This function creates a new buffer resource that can be used in the same way as any buffer created during build time.
	* The function requires a valid buffer created from either buffer.create or another pre-existing buffer resource.
	* By default, the new resource will take ownership of the buffer lua reference, meaning the buffer will not automatically be removed
	* when the lua reference to the buffer is garbage collected. This behaviour can be overruled by specifying 'transfer_ownership = false'
	* in the argument table. If the new buffer resource is created from a buffer object that is created by another resource,
	* the buffer object will be copied and the new resource will effectively own a copy of the buffer instead.
	* Note that the path to the new resource must have the '.bufferc' extension, "/path/my_buffer" is not a valid path but "/path/my_buffer.bufferc" is.
	* The path must also be unique, attempting to create a buffer with the same name as an existing resource will raise an error.
	* @param path  The path to the resource.
	* @param table  A table containing info about how to create the buffer. Supported entries:



`buffer`
the buffer to bind to this resource




`transfer_ownership`
optional flag to determine wether or not the resource should take over ownership of the buffer object (default true)



	* @return path  Returns the buffer resource path
	*/
	export function create_buffer(path: string, table: any): hash

	/**
	* Creates a new texture resource that can be used in the same way as any texture created during build time.
	* The path used for creating the texture must be unique, trying to create a resource at a path that is already
	* registered will trigger an error. If the intention is to instead modify an existing texture, use the resource.set_texture
	* function. Also note that the path to the new texture resource must have a '.texturec' extension,
	* meaning "/path/my_texture" is not a valid path but "/path/my_texture.texturec" is.
	* If the texture is created without a buffer, the pixel data will be blank.
	* @param path  The path to the resource.
	* @param table  A table containing info about how to create the texture. Supported entries:

`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`
- `resource.TEXTURE_TYPE_CUBE_MAP`


`width`
The width of the texture (in pixels). Must be larger than 0.
`height`
The width of the texture (in pixels). Must be larger than 0.
`format`
The texture format, note that some of these formats might not be supported by the running device. Supported values:


- `resource.TEXTURE_FORMAT_LUMINANCE`
- `resource.TEXTURE_FORMAT_RGB`
- `resource.TEXTURE_FORMAT_RGBA`

These constants might not be available on the device:

- `resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGB_ETC1`
- `resource.TEXTURE_FORMAT_RGBA_ETC2`
- `resource.TEXTURE_FORMAT_RGBA_ASTC_4x4`
- `resource.TEXTURE_FORMAT_RGB_BC1`
- `resource.TEXTURE_FORMAT_RGBA_BC3`
- `resource.TEXTURE_FORMAT_R_BC4`
- `resource.TEXTURE_FORMAT_RG_BC5`
- `resource.TEXTURE_FORMAT_RGBA_BC7`
- `resource.TEXTURE_FORMAT_RGB16F`
- `resource.TEXTURE_FORMAT_RGB32F`
- `resource.TEXTURE_FORMAT_RGBA16F`
- `resource.TEXTURE_FORMAT_RGBA32F`
- `resource.TEXTURE_FORMAT_R16F`
- `resource.TEXTURE_FORMAT_RG16F`
- `resource.TEXTURE_FORMAT_R32F`
- `resource.TEXTURE_FORMAT_RG32F`

You can test if the device supports these values by checking if a specific enum is nil or not:
`if resource.TEXTURE_FORMAT_RGBA16F ~= nil then
    -- it is safe to use this format
end
`


`max_mipmaps`
optional max number of mipmaps. Defaults to zero, i.e no mipmap support
`compression_type`
optional specify the compression type for the data in the buffer object that holds the texture data. Will only be used when a compressed buffer has been passed into the function.
Creating an empty texture with no buffer data is not supported as a core feature. Defaults to resource.COMPRESSION_TYPE_DEFAULT, i.e no compression. Supported values:


- `COMPRESSION_TYPE_DEFAULT`
- `COMPRESSION_TYPE_BASIS_UASTC`

	* @param buffer  optional buffer of precreated pixel data
	* @return path  The path to the resource.
	*/
	export function create_texture(path: string, table: any, buffer?: buffer): hash

	/**
	* Creates a new texture resource that can be used in the same way as any texture created during build time.
	* The path used for creating the texture must be unique, trying to create a resource at a path that is already
	* registered will trigger an error. If the intention is to instead modify an existing texture, use the resource.set_texture
	* function. Also note that the path to the new texture resource must have a '.texturec' extension,
	* meaning "/path/my_texture" is not a valid path but "/path/my_texture.texturec" is.
	* If the texture is created without a buffer, the pixel data will be blank.
	* The difference between the async version and resource.create_texture is that the texture data will be uploaded
	* in a graphics worker thread. The function will return a resource immediately that contains a 1x1 blank texture which can be used
	* immediately after the function call. When the new texture has been uploaded, the initial blank texture will be deleted and replaced with the
	* new texture. Be careful when using the initial texture handle handle as it will not be valid after the upload has finished.
	* @param path  The path to the resource.
	* @param table  
A table containing info about how to create the texture. Supported entries:
`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`
- `resource.TEXTURE_TYPE_CUBE_MAP`


`width`
The width of the texture (in pixels). Must be larger than 0.
`height`
The width of the texture (in pixels). Must be larger than 0.
`format`
The texture format, note that some of these formats might not be supported by the running device. Supported values:


- `resource.TEXTURE_FORMAT_LUMINANCE`
- `resource.TEXTURE_FORMAT_RGB`
- `resource.TEXTURE_FORMAT_RGBA`

These constants might not be available on the device:

- `resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGB_ETC1`
- `resource.TEXTURE_FORMAT_RGBA_ETC2`
- `resource.TEXTURE_FORMAT_RGBA_ASTC_4x4`
- `resource.TEXTURE_FORMAT_RGB_BC1`
- `resource.TEXTURE_FORMAT_RGBA_BC3`
- `resource.TEXTURE_FORMAT_R_BC4`
- `resource.TEXTURE_FORMAT_RG_BC5`
- `resource.TEXTURE_FORMAT_RGBA_BC7`
- `resource.TEXTURE_FORMAT_RGB16F`
- `resource.TEXTURE_FORMAT_RGB32F`
- `resource.TEXTURE_FORMAT_RGBA16F`
- `resource.TEXTURE_FORMAT_RGBA32F`
- `resource.TEXTURE_FORMAT_R16F`
- `resource.TEXTURE_FORMAT_RG16F`
- `resource.TEXTURE_FORMAT_R32F`
- `resource.TEXTURE_FORMAT_RG32F`

You can test if the device supports these values by checking if a specific enum is nil or not:
`if resource.TEXTURE_FORMAT_RGBA16F ~= nil then
    -- it is safe to use this format
end
`


`max_mipmaps`
optional max number of mipmaps. Defaults to zero, i.e no mipmap support
`compression_type`
optional specify the compression type for the data in the buffer object that holds the texture data. Will only be used when a compressed buffer has been passed into the function.
Creating an empty texture with no buffer data is not supported as a core feature. Defaults to resource.COMPRESSION_TYPE_DEFAULT, i.e no compression. Supported values:


- `COMPRESSION_TYPE_DEFAULT`
- `COMPRESSION_TYPE_BASIS_UASTC`

	* @param buffer  optional buffer of precreated pixel data
	* @return path  The path to the resource.
	* @return request_id  The request id for the async request.
	*/
	export function create_texture_async(path: string, table: any, buffer?: buffer): LuaMultiReturn<[hash, any]>

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @param path  optional resource path string to the resource
	* @return path  a path hash to the binary version of the resource
	*/
	export function font(path?: string): hash

	/**
	* Returns the atlas data for an atlas
	* @param path  The path to the atlas resource
	* @return data  A table with the following entries:

- texture
- geometries
- animations

See resource.set_atlas for a detailed description of each field
	*/
	export function get_atlas(path: hash | string): any

	/**
	* gets the buffer from a resource
	* @param path  The path to the resource
	* @return buffer  The resource buffer
	*/
	export function get_buffer(path: hash | string): buffer

	/**
	* Gets render target info from a render target resource path or a render target handle
	* @param path  The path to the resource or a render target handle
	* @return table  A table containing info about the render target:

`handle`
the opaque handle to the texture resource
'attachments'
a table of attachments, where each attachment contains the following entries:
`handle`
the opaque handle to the texture resource
`width`
width of the texture
`height`
height of the texture
`depth`
depth of the texture (i.e 1 for a 2D texture and 6 for a cube map)
`mipmaps`
number of mipmaps of the texture
`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`
- `resource.TEXTURE_TYPE_CUBE_MAP`
- `resource.TEXTURE_TYPE_2D_ARRAY`


`buffer_type`
The attachment buffer type. Supported values:


- `resource.BUFFER_TYPE_COLOR0`
- `resource.BUFFER_TYPE_COLOR1`
- `resource.BUFFER_TYPE_COLOR2`
- `resource.BUFFER_TYPE_COLOR3`
- `resource.BUFFER_TYPE_DEPTH`
- `resource.BUFFER_TYPE_STENCIL`

	*/
	export function get_render_target_info(path: any): any

	/**
	* Gets the text metrics from a font
	* @param url  the font to get the (unscaled) metrics from
	* @param text  text to measure
	* @param options  A table containing parameters for the text. Supported entries:

`width`
The width of the text field. Not used if `line_break` is false.
`leading`
The leading (default 1.0)
`tracking`
The tracking (default 0.0)
`line_break`
If the calculation should consider line breaks (default false)

	* @return metrics  a table with the following fields:

- width
- height
- max_ascent
- max_descent

	*/
	export function get_text_metrics(url: hash, text: string, options?: any): any

	/**
	* Gets texture info from a texture resource path or a texture handle
	* @param path  The path to the resource or a texture handle
	* @return table  A table containing info about the texture:

`handle`
the opaque handle to the texture resource
`width`
width of the texture
`height`
height of the texture
`depth`
depth of the texture (i.e 1 for a 2D texture and 6 for a cube map)
`mipmaps`
number of mipmaps of the texture
`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`
- `resource.TEXTURE_TYPE_CUBE_MAP`
- `resource.TEXTURE_TYPE_2D_ARRAY`

	*/
	export function get_texture_info(path: any): any

	/**
	* Loads the resource data for a specific resource.
	* @param path  The path to the resource
	* @return buffer  Returns the buffer stored on disc
	*/
	export function load(path: string): buffer

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @param path  optional resource path string to the resource
	* @return path  a path hash to the binary version of the resource
	*/
	export function material(path?: string): hash

	/**
	* Release a resource.
	* ⚠ This is a potentially dangerous operation, releasing resources currently being used can cause unexpected behaviour.
	* @param path  The path to the resource.
	*/
	export function release(path: hash | string): void

	/**
	* Sets the resource data for a specific resource
	* @param path  The path to the resource
	* @param buffer  The buffer of precreated data, suitable for the intended resource type
	*/
	export function set(path: string | hash, buffer: buffer): void

	/**
	* Sets the data for a specific atlas resource. Setting new atlas data is specified by passing in
	* a texture path for the backing texture of the atlas, a list of geometries and a list of animations
	* that map to the entries in the geometry list. The geometry entries are represented by three lists:
	* vertices, uvs and indices that together represent triangles that are used in other parts of the
	* engine to produce render objects from.
	* Vertex and uv coordinates for the geometries are expected to be
	* in pixel coordinates where 0,0 is the top left corner of the texture.
	* There is no automatic padding or margin support when setting custom data,
	* which could potentially cause filtering artifacts if used with a material sampler that has linear filtering.
	* If that is an issue, you need to calculate padding and margins manually before passing in the geometry data to
	* this function.
	* @param path  The path to the atlas resource
	* @param table  A table containing info about the atlas. Supported entries:



`texture`
the path to the texture resource, e.g "/main/my_texture.texturec"




`animations`
a list of the animations in the atlas. Supports the following fields:




`id`
the id of the animation, used in e.g sprite.play_animation




`width`
the width of the animation




`height`
the height of the animation




`frame_start`
index to the first geometry of the animation. Indices are lua based and must be in the range of 1 ..  in atlas.




`frame_end`
index to the last geometry of the animation (non-inclusive). Indices are lua based and must be in the range of 1 ..  in atlas.




`playback`
optional playback mode of the animation, the default value is go.PLAYBACK_ONCE_FORWARD




`fps`
optional fps of the animation, the default value is 30




`flip_vertical`
optional flip the animation vertically, the default value is false




`flip_horizontal`
optional flip the animation horizontally, the default value is false




`geometries`
A list of the geometries that should map to the texture data. Supports the following fields:




`vertices`
a list of the vertices in texture space of the geometry in the form {px0, py0, px1, py1, ..., pxn, pyn}




`uvs`
a list of the uv coordinates in texture space of the geometry in the form of {u0, v0, u1, v1, ..., un, vn}




`indices`
a list of the indices of the geometry in the form {i0, i1, i2, ..., in}. Each tripe in the list represents a triangle.



	*/
	export function set_atlas(path: hash | string, table: any): void

	/**
	* Sets the buffer of a resource. By default, setting the resource buffer will either copy the data from the incoming buffer object
	* to the buffer stored in the destination resource, or make a new buffer object if the sizes between the source buffer and the destination buffer
	* stored in the resource differs. In some cases, e.g performance reasons, it might be beneficial to just set the buffer object on the resource without copying or cloning.
	* To achieve this, set the `transfer_ownership` flag to true in the argument table. Transferring ownership from a lua buffer to a resource with this function
	* works exactly the same as resource.create_buffer: the destination resource will take ownership of the buffer held by the lua reference, i.e the buffer will not automatically be removed
	* when the lua reference to the buffer is garbage collected.
	* Note: When setting a buffer with `transfer_ownership = true`, the currently bound buffer in the resource will be destroyed.
	* @param path  The path to the resource
	* @param buffer  The resource buffer
	* @param table  A table containing info about how to set the buffer. Supported entries:



`transfer_ownership`
optional flag to determine wether or not the resource should take over ownership of the buffer object (default false)



	*/
	export function set_buffer(path: hash | string, buffer: buffer, table: any): void

	/**
	* Update internal sound resource (wavc/oggc) with new data
	* @param path  The path to the resource
	* @param buffer  A lua string containing the binary sound data
	*/
	export function set_sound(path: hash | string, buffer: string): void

	/**
	* Sets the pixel data for a specific texture.
	* @param path  The path to the resource
	* @param table  A table containing info about the texture. Supported entries:

`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`
- `resource.TEXTURE_TYPE_CUBE_MAP`


`width`
The width of the texture (in pixels)
`height`
The width of the texture (in pixels)
`format`
The texture format, note that some of these formats are platform specific. Supported values:


- `resource.TEXTURE_FORMAT_LUMINANCE`
- `resource.TEXTURE_FORMAT_RGB`
- `resource.TEXTURE_FORMAT_RGBA`

These constants might not be available on the device:
- `resource.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1`
- `resource.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1`
- `resource.TEXTURE_FORMAT_RGB_ETC1`
- `resource.TEXTURE_FORMAT_RGBA_ETC2`
- `resource.TEXTURE_FORMAT_RGBA_ASTC_4x4`
- `resource.TEXTURE_FORMAT_RGB_BC1`
- `resource.TEXTURE_FORMAT_RGBA_BC3`
- `resource.TEXTURE_FORMAT_R_BC4`
- `resource.TEXTURE_FORMAT_RG_BC5`
- `resource.TEXTURE_FORMAT_RGBA_BC7`
- `resource.TEXTURE_FORMAT_RGB16F`
- `resource.TEXTURE_FORMAT_RGB32F`
- `resource.TEXTURE_FORMAT_RGBA16F`
- `resource.TEXTURE_FORMAT_RGBA32F`
- `resource.TEXTURE_FORMAT_R16F`
- `resource.TEXTURE_FORMAT_RG16F`
- `resource.TEXTURE_FORMAT_R32F`
- `resource.TEXTURE_FORMAT_RG32F`
You can test if the device supports these values by checking if a specific enum is nil or not:
`if resource.TEXTURE_FORMAT_RGBA16F ~= nil then
    -- it is safe to use this format
end
`


`x`
optional x offset of the texture (in pixels)
`y`
optional y offset of the texture (in pixels)
`mipmap`
optional mipmap to upload the data to
`compression_type`
optional specify the compression type for the data in the buffer object that holds the texture data. Defaults to resource.COMPRESSION_TYPE_DEFAULT, i.e no compression. Supported values:


- `COMPRESSION_TYPE_DEFAULT`
- `COMPRESSION_TYPE_BASIS_UASTC`

	* @param buffer  The buffer of precreated pixel data
⚠ To update a cube map texture you need to pass in six times the amount of data via the buffer, since a cube map has six sides!
	*/
	export function set_texture(path: hash | string, table: any, buffer: buffer): void

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @param path  optional resource path string to the resource
	* @return path  a path hash to the binary version of the resource
	*/
	export function texture(path?: string): hash

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @param path  optional resource path string to the resource
	* @return path  a path hash to the binary version of the resource
	*/
	export function tile_source(path?: string): hash

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace sys {

	/**
	* Terminates the game application and reports the specified `code` to the OS.
	* This message can only be sent to the designated `@system` socket.
	*/
	export type exit = "exit"

	/**
	* Reboots the game engine with a specified set of arguments.
	* Arguments will be translated into command line arguments. Sending the reboot
	* command is equivalent to starting the engine with the same arguments.
	* On startup the engine reads configuration from "game.project" in the
	* project root.
	* This message can only be sent to the designated `@system` socket.
	*/
	export type reboot = "reboot"

	/**
	* Set game update-frequency (frame cap). This option is equivalent to `display.update_frequency` in
	* the "game.project" settings but set in run-time. If `Vsync` checked in "game.project", the rate will
	* be clamped to a swap interval that matches any detected main monitor refresh rate. If `Vsync` is
	* unchecked the engine will try to respect the rate in software using timers. There is no
	* guarantee that the frame cap will be achieved depending on platform specifics and hardware settings.
	* This message can only be sent to the designated `@system` socket.
	*/
	export type set_update_frequency = "set_update_frequency"

	/**
	* Set the vsync swap interval. The interval with which to swap the front and back buffers
	* in sync with vertical blanks (v-blank), the hardware event where the screen image is updated
	* with data from the front buffer. A value of 1 swaps the buffers at every v-blank, a value of
	* 2 swaps the buffers every other v-blank and so on. A value of 0 disables waiting for v-blank
	* before swapping the buffers. Default value is 1.
	* When setting the swap interval to 0 and having `vsync` disabled in
	* "game.project", the engine will try to respect the set frame cap value from
	* "game.project" in software instead.
	* This setting may be overridden by driver settings.
	* This message can only be sent to the designated `@system` socket.
	*/
	export type set_vsync = "set_vsync"

	/**
	* Starts video recording of the game frame-buffer to file. Current video format is the
	* open vp8 codec in the ivf container. It's possible to upload this format directly
	* to YouTube. The VLC video player has native support but with the known issue that
	* not the entire file is played back. It's probably an issue with VLC.
	* The Miro Video Converter has support for vp8/ivf.
	* 🐧 Video recording is only supported on desktop platforms.
	* 🐧 Audio is currently not supported
	* 🐧 Window width and height must be a multiple of 8 to be able to record video.
	* This message can only be sent to the designated `@system` socket.
	*/
	export type start_record = "start_record"

	/**
	* Stops the currently active video recording.
	* 🐧 Video recording is only supported on desktop platforms.
	* This message can only be sent to the designated `@system` socket.
	*/
	export type stop_record = "stop_record"

	/**
	* network connected through other, non cellular, connection
	*/
	export let NETWORK_CONNECTED: any

	/**
	* network connected through mobile cellular
	*/
	export let NETWORK_CONNECTED_CELLULAR: any

	/**
	* no network connection found
	*/
	export let NETWORK_DISCONNECTED: any

	/**
	* an asyncronous request is unable to read the resource
	*/
	export let REQUEST_STATUS_ERROR_IO_ERROR: any

	/**
	* an asyncronous request is unable to locate the resource
	*/
	export let REQUEST_STATUS_ERROR_NOT_FOUND: any

	/**
	* an asyncronous request has finished successfully
	*/
	export let REQUEST_STATUS_FINISHED: any

	/**
	* deserializes buffer into a lua table
	* @param buffer  buffer to deserialize from
	* @return table  lua table with deserialized data
	*/
	export function deserialize(buffer: string): any

	/**
	* Check if a path exists
	* Good for checking if a file exists before loading a large file
	* @param path  path to check
	* @return result  `true` if the path exists, `false` otherwise
	*/
	export function exists(path: string): any

	/**
	* Terminates the game application and reports the specified `code` to the OS.
	* @param code  exit code to report to the OS, 0 means clean exit
	*/
	export function exit(code: number): void

	/**
	* Returns a table with application information for the requested app.
	* 📱 On iOS, the `app_string` is an url scheme for the app that is queried. Your
	* game needs to list the schemes that are queried in an `LSApplicationQueriesSchemes` array
	* in a custom "Info.plist".
	* 📱 On Android, the `app_string` is the package identifier for the app.
	* @param app_string  platform specific string with application package or query, see above for details.
	* @return app_info  table with application information in the following fields:

`installed`
`true` if the application is installed, `false` otherwise.

	*/
	export function get_application_info(app_string: string): any

	/**
	* The path from which the application is run.
	* @return path  path to application executable
	*/
	export function get_application_path(): string

	/**
	* Get integer config value from the game.project configuration file with optional default value
	* @param key  key to get value for. The syntax is SECTION.KEY
	* @param default_value  (optional) default value to return if the value does not exist
	* @return value  config value as an integer. default_value if the config key does not exist. 0 if no default value was supplied.
	*/
	export function get_config_int(key: string, default_value?: any): any

	/**
	* Get number config value from the game.project configuration file with optional default value
	* @param key  key to get value for. The syntax is SECTION.KEY
	* @param default_value  (optional) default value to return if the value does not exist
	* @return value  config value as an number. default_value if the config key does not exist. 0 if no default value was supplied.
	*/
	export function get_config_number(key: string, default_value?: number): number

	/**
	* Get string config value from the game.project configuration file with optional default value
	* @param key  key to get value for. The syntax is SECTION.KEY
	* @param default_value  (optional) default value to return if the value does not exist
	* @return value  config value as a string. default_value if the config key does not exist. nil if no default value was supplied.
	*/
	export function get_config_string(key: string, default_value?: string): string

	/**
	* 🤖 Returns the current network connectivity status
	* on mobile platforms.
	* On desktop, this function always return `sys.NETWORK_CONNECTED`.
	* @return status  network connectivity status:

- `sys.NETWORK_DISCONNECTED` (no network connection is found)
- `sys.NETWORK_CONNECTED_CELLULAR` (connected through mobile cellular)
- `sys.NETWORK_CONNECTED` (otherwise, Wifi)

	*/
	export function get_connectivity(): any

	/**
	* Returns a table with engine information.
	* @return engine_info  table with engine information in the following fields:

`version`
The current Defold engine version, i.e. "1.2.96"
`version_sha1`
The SHA1 for the current engine build, i.e. "0060183cce2e29dbd09c85ece83cbb72068ee050"
`is_debug`
If the engine is a debug or release version

	*/
	export function get_engine_info(): any

	/**
	* Create a path to the host device for unit testing
	* Useful for saving logs etc during development
	* @param filename  file to read from
	* @return host_path  the path prefixed with the proper host mount
	*/
	export function get_host_path(filename: string): string

	/**
	* Returns an array of tables with information on network interfaces.
	* @return ifaddrs  an array of tables. Each table entry contain the following fields:

`name`
Interface name
`address`
might be `nil` if not available.
`mac`
might be nil if not available.
`up`
`true` if the interface is up (available to transmit and receive data), `false` otherwise.
`running`
`true` if the interface is running, `false` otherwise.

	*/
	export function get_ifaddrs(): any

	/**
	* The save-file path is operating system specific and is typically located under the user's home directory.
	* @param application_id  user defined id of the application, which helps define the location of the save-file
	* @param file_name  file-name to get path for
	* @return path  path to save-file
	*/
	export function get_save_file(application_id: string, file_name: string): string

	/**
	* Returns a table with system information.
	* @param options  optional options table
this flag ignores values might be secured by OS e.g. `device_ident`
	* @return sys_info  table with system information in the following fields:

`device_model`
Only available on iOS and Android.
`manufacturer`
Only available on iOS and Android.
`system_name`
The system name: "Darwin", "Linux", "Windows", "HTML5", "Android" or "iPhone OS"
`system_version`
The system OS version.
`api_version`
The API version on the system.
`language`
Two character ISO-639 format, i.e. "en".
`device_language`
Two character ISO-639 format (i.e. "sr") and, if applicable, followed by a dash (-) and an ISO 15924 script code (i.e. "sr-Cyrl" or "sr-Latn"). Reflects the device preferred language.
`territory`
Two character ISO-3166 format, i.e. "US".
`gmt_offset`
The current offset from GMT (Greenwich Mean Time), in minutes.
`device_ident`
"android_id" on Android. On Android, you need to add `READ_PHONE_STATE` permission to be able to get this data. We don't use this permission in Defold.
`user_agent`
The HTTP user agent, i.e. "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8"

	*/
	export function get_sys_info(options?: any): any

	/**
	* If the file exists, it must have been created by `sys.save` to be loaded.
	* @param filename  file to read from
	* @return loaded  lua table, which is empty if the file could not be found
	*/
	export function load(filename: string): any

	/**
	* The sys.load_buffer function will first try to load the resource
	* from any of the mounted resource locations and return the data if
	* any matching entries found. If not, the path will be tried
	* as is from the primary disk on the device.
	* In order for the engine to include custom resources in the build process, you need
	* to specify them in the "custom_resources" key in your "game.project" settings file.
	* You can specify single resource files or directories. If a directory is included
	* in the resource list, all files and directories in that directory is recursively
	* included:
	* For example "main/data/,assets/level_data.json".
	* @param path  the path to load the buffer from
	* @return buffer  the buffer with data
	*/
	export function load_buffer(path: string): buffer

	/**
	* The sys.load_buffer function will first try to load the resource
	* from any of the mounted resource locations and return the data if
	* any matching entries found. If not, the path will be tried
	* as is from the primary disk on the device.
	* In order for the engine to include custom resources in the build process, you need
	* to specify them in the "custom_resources" key in your "game.project" settings file.
	* You can specify single resource files or directories. If a directory is included
	* in the resource list, all files and directories in that directory is recursively
	* included:
	* For example "main/data/,assets/level_data.json".
	* Note that issuing multiple requests of the same resource will yield
	* individual buffers per request. There is no implic caching of the buffers
	* based on request path.
	* @param path  the path to load the buffer from
	* @param status_callback  A status callback that will be invoked when a request has been handled, or an error occured. The result is a table containing:

`status`
The status of the request, supported values are:


- `resource.REQUEST_STATUS_FINISHED`
- `resource.REQUEST_STATUS_ERROR_IO_ERROR`
- `resource.REQUEST_STATUS_ERROR_NOT_FOUND`


`buffer`
If the request was successfull, this will contain the request payload in a buffer object, and nil otherwise. Make sure to check the status before doing anything with the buffer value!

	* @return handle  a handle to the request
	*/
	export function load_buffer_async(path: string, status_callback: any): any

	/**
	* Loads a custom resource. Specify the full filename of the resource that you want
	* to load. When loaded, the file data is returned as a string.
	* If loading fails, the function returns `nil` plus the error message.
	* In order for the engine to include custom resources in the build process, you need
	* to specify them in the "custom_resources" key in your "game.project" settings file.
	* You can specify single resource files or directories. If a directory is included
	* in the resource list, all files and directories in that directory is recursively
	* included:
	* For example "main/data/,assets/level_data.json".
	* @param filename  resource to load, full path
	* @return data  loaded data, or `nil` if the resource could not be loaded
	* @return error  the error message, or `nil` if no error occurred
	*/
	export function load_resource(filename: string): string
	export function load_resource(filename: string): any

	/**
	* Open URL in default application, typically a browser
	* @param url  url to open
	* @param attributes  table with attributes
`target`
: Optional. Specifies the target attribute or the name of the window. The following values are supported:
- `_self` - (default value) URL replaces the current page.
- `_blank` - URL is loaded into a new window, or tab.
- `_parent` - URL is loaded into the parent frame.
- `_top` - URL replaces any framesets that may be loaded.
- `name` - The name of the window (Note: the name does not specify the title of the new window).
	* @return success  a boolean indicating if the url could be opened or not
	*/
	export function open_url(url: string, attributes?: any): boolean

	/**
	* Reboots the game engine with a specified set of arguments.
	* Arguments will be translated into command line arguments. Calling reboot
	* function is equivalent to starting the engine with the same arguments.
	* On startup the engine reads configuration from "game.project" in the
	* project root.
	* @param arg1  argument 1
	* @param arg2  argument 2
	* @param arg3  argument 3
	* @param arg4  argument 4
	* @param arg5  argument 5
	* @param arg6  argument 6
	*/
	export function reboot(arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, arg6: string): void

	/**
	* The table can later be loaded by `sys.load`.
	* Use `sys.get_save_file` to obtain a valid location for the file.
	* Internally, this function uses a workspace buffer sized output file sized 512kb.
	* This size reflects the output file size which must not exceed this limit.
	* Additionally, the total number of rows that any one table may contain is limited to 65536
	* (i.e. a 16 bit range). When tables are used to represent arrays, the values of
	* keys are permitted to fall within a 32 bit range, supporting sparse arrays, however
	* the limit on the total number of rows remains in effect.
	* @param filename  file to write to
	* @param table  lua table to save
	* @return success  a boolean indicating if the table could be saved or not
	*/
	export function save(filename: string, table: any): boolean

	/**
	* The buffer can later deserialized by `sys.deserialize`.
	* This method has all the same limitations as `sys.save`.
	* @param table  lua table to serialize
	* @return buffer  serialized data buffer
	*/
	export function serialize(table: any): string

	/**
	* Sets the host that is used to check for network connectivity against.
	* @param host  hostname to check against
	*/
	export function set_connectivity_host(host: string): void

	/**
	* Set the Lua error handler function.
	* The error handler is a function which is called whenever a lua runtime error occurs.
	* @param error_handler  the function to be called on error

`source`
The runtime context of the error. Currently, this is always `"lua"`.
`message`
The source file, line number and error message.
`traceback`
The stack traceback.

	*/
	export function set_error_handler(error_handler: any): void

	/**
	* Set game update-frequency (frame cap). This option is equivalent to `display.update_frequency` in
	* the "game.project" settings but set in run-time. If `Vsync` checked in "game.project", the rate will
	* be clamped to a swap interval that matches any detected main monitor refresh rate. If `Vsync` is
	* unchecked the engine will try to respect the rate in software using timers. There is no
	* guarantee that the frame cap will be achieved depending on platform specifics and hardware settings.
	* @param frequency  target frequency. 60 for 60 fps
	*/
	export function set_update_frequency(frequency: number): void

	/**
	* Set the vsync swap interval. The interval with which to swap the front and back buffers
	* in sync with vertical blanks (v-blank), the hardware event where the screen image is updated
	* with data from the front buffer. A value of 1 swaps the buffers at every v-blank, a value of
	* 2 swaps the buffers every other v-blank and so on. A value of 0 disables waiting for v-blank
	* before swapping the buffers. Default value is 1.
	* When setting the swap interval to 0 and having `vsync` disabled in
	* "game.project", the engine will try to respect the set frame cap value from
	* "game.project" in software instead.
	* This setting may be overridden by driver settings.
	* @param swap_interval  target swap interval.
	*/
	export function set_vsync_swap_interval(swap_interval: number): void

	/**
	* Toggles the on-screen physics visual debugging mode which is very useful for
	* tracking down issues related to physics. This mode visualizes
	* all collision object shapes and normals at detected contact points. Toggling
	* this mode on is equal to setting `physics.debug` in the "game.project" settings,
	* but set in run-time.
	* This message can only be sent to the designated `@system` socket.
	*/
	export type toggle_physics_debug = "toggle_physics_debug"

	/**
	* Toggles the on-screen profiler.
	* The profiler is a real-time tool that shows the numbers of milliseconds spent
	* in each scope per frame as well as counters. The profiler is very useful for
	* tracking down performance and resource problems.
	* In addition to the on-screen profiler, Defold includes a web-based profiler that
	* allows you to sample a series of data points and then analyze them in detail.
	* The web profiler is available at `http://&lt;device IP&gt;:8002` where  is
	* the IP address of the device you are running your game on.
	* This message can only be sent to the designated `@system` socket.
	*/
	export type toggle_profile = "toggle_profile"

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace window {

	/**
	* dimming mode off
	*/
	export let DIMMING_OFF: any

	/**
	* dimming mode on
	*/
	export let DIMMING_ON: any

	/**
	* dimming mode unknown
	*/
	export let DIMMING_UNKNOWN: any

	/**
	* deiconified window event
	*/
	export let WINDOW_EVENT_DEICONIFIED: any

	/**
	* focus gained window event
	*/
	export let WINDOW_EVENT_FOCUS_GAINED: any

	/**
	* focus lost window event
	*/
	export let WINDOW_EVENT_FOCUS_LOST: any

	/**
	* iconify window event
	*/
	export let WINDOW_EVENT_ICONFIED: any

	/**
	* resized window event
	*/
	export let WINDOW_EVENT_RESIZED: any

	/**
	* 🤖 Returns the current dimming mode set on a mobile device.
	* The dimming mode specifies whether or not a mobile device should dim the screen after a period without user interaction.
	* On platforms that does not support dimming, `window.DIMMING_UNKNOWN` is always returned.
	* @return mode  The mode for screen dimming

- `window.DIMMING_UNKNOWN`
- `window.DIMMING_ON`
- `window.DIMMING_OFF`

	*/
	export function get_dim_mode(): any

	/**
	* This returns the current lock state of the mouse cursor
	* @return state  The lock state
	*/
	export function get_mouse_lock(): boolean

	/**
	* This returns the current window size (width and height).
	* @return width  The window width
	* @return height  The window height
	*/
	export function get_size(): LuaMultiReturn<[number, number]>

	/**
	* 🤖 Sets the dimming mode on a mobile device.
	* The dimming mode specifies whether or not a mobile device should dim the screen after a period without user interaction. The dimming mode will only affect the mobile device while the game is in focus on the device, but not when the game is running in the background.
	* This function has no effect on platforms that does not support dimming.
	* @param mode  The mode for screen dimming

- `window.DIMMING_ON`
- `window.DIMMING_OFF`

	*/
	export function set_dim_mode(mode: any): void

	/**
	* Sets a window event listener.
	* @param callback  A callback which receives info about window events. Pass an empty function or `nil` if you no longer wish to receive callbacks.

`self`
The calling script
`event`
The type of event. Can be one of these:


- `window.WINDOW_EVENT_FOCUS_LOST`
- `window.WINDOW_EVENT_FOCUS_GAINED`
- `window.WINDOW_EVENT_RESIZED`
- `window.WINDOW_EVENT_ICONIFIED`
- `window.WINDOW_EVENT_DEICONIFIED`


`data`
The callback value `data` is a table which currently holds these values


`width`: The width of a resize event. nil otherwise.
`height`: The height of a resize event. nil otherwise.

	*/
	export function set_listener(callback: any): void

	/**
	* Set the locking state for current mouse cursor on a PC platform.
	* This function locks or unlocks the mouse cursor to the center point of the window. While the cursor is locked,
	* mouse position updates will still be sent to the scripts as usual.
	* @param flag  The lock state for the mouse cursor
	*/
	export function set_mouse_lock(flag: boolean): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace buffer {

	/**
	* float32
	*/
	export let VALUE_TYPE_FLOAT32: any

	/**
	* int16
	*/
	export let VALUE_TYPE_INT16: any

	/**
	* int32
	*/
	export let VALUE_TYPE_INT32: any

	/**
	* int64
	*/
	export let VALUE_TYPE_INT64: any

	/**
	* int8
	*/
	export let VALUE_TYPE_INT8: any

	/**
	* uint16
	*/
	export let VALUE_TYPE_UINT16: any

	/**
	* uint32
	*/
	export let VALUE_TYPE_UINT32: any

	/**
	* uint64
	*/
	export let VALUE_TYPE_UINT64: any

	/**
	* uint8
	*/
	export let VALUE_TYPE_UINT8: any

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
	export function copy_buffer(dst: buffer, dstoffset: number, src: buffer, srcoffset: number, count: number): void

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
	export function copy_stream(dst: bufferstream, dstoffset: number, src: bufferstream, srcoffset: number, count: number): void

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

	* @return buffer  the new buffer
	*/
	export function create(element_count: number, declaration: any): buffer

	/**
	* Get a copy of all the bytes from a specified stream as a Lua string.
	* @param buffer  the source buffer
	* @param stream_name  the name of the stream
	* @return data  the buffer data as a Lua string
	*/
	export function get_bytes(buffer: buffer, stream_name: hash): string

	/**
	* Get a named metadata entry from a buffer along with its type.
	* @param buf  the buffer to get the metadata from
	* @param metadata_name  name of the metadata entry
	* @return values  table of metadata values or `nil` if the entry does not exist
	* @return value_type  numeric type of values or `nil`
	*/
	export function get_metadata(buf: buffer, metadata_name: hash | string): LuaMultiReturn<[any, any, any, any]>

	/**
	* Get a specified stream from a buffer.
	* @param buffer  the buffer to get the stream from
	* @param stream_name  the stream name
	* @return stream  the data stream
	*/
	export function get_stream(buffer: buffer, stream_name: hash | string): bufferstream

	/**
	* Creates or updates a metadata array entry on a buffer.
	* ⚠ The value type and count given when updating the entry should match those used when first creating it.
	* @param buf  the buffer to set the metadata on
	* @param metadata_name  name of the metadata entry
	* @param values  actual metadata, an array of numeric values
	* @param value_type  type of values when stored
	*/
	export function set_metadata(buf: buffer, metadata_name: hash | string, values: any, value_type: any): void

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
	export function run(code: string): string

	/**
	* Set a JavaScript interaction listener callaback from lua that will be
	* invoked when a user interacts with the web page by clicking, touching or typing.
	* The callback can then call DOM restricted actions like requesting a pointer lock,
	* or start playing sounds the first time the callback is invoked.
	* @param callback  The interaction callback. Pass an empty function or `nil` if you no longer wish to receive callbacks.

`self`
The calling script

	*/
	export function set_interaction_listener(callback: any): void

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
The script instance
`id`
Internal message identifier. Do not use!
`response`
The response data. Contains the fields:


`status`: the status of the response
`response`: the response data (if not saved on disc)
`headers`: all the returned headers
`path`: the stored path (if saved to disc)
`error`: if any unforeseen errors occurred (e.g. file I/O)

	* @param headers  optional table with custom headers
	* @param post_data  optional data to send
	* @param options  optional table with request parameters. Supported entries:

`timeout`: timeout in seconds
Not available in HTML5 build
Not available in HTML5 build
Not available in HTML5 build

	*/
	export function request(url: string, method: string, callback: any, headers?: any, post_data?: string, options?: any): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace image {

	/**
	* luminance image type
	*/
	export let TYPE_LUMINANCE: any

	/**
	* luminance image type
	*/
	export let TYPE_LUMINANCE_ALPHA: any

	/**
	* RGB image type
	*/
	export let TYPE_RGB: any

	/**
	* RGBA image type
	*/
	export let TYPE_RGBA: any

	/**
	* Load image (PNG or JPEG) from buffer.
	* @param buffer  image data buffer
	* @param options  An optional table containing parameters for loading the image. Supported entries:

`premultiply_alpha`
True if alpha should be premultiplied into the color components. Defaults to `false`.
`flip_vertically`
True if the image contents should be flipped vertically. Defaults to `false`.

	* @return image  object or `nil` if loading fails. The object is a table with the following fields:

`width`: image width
`height`: image height
`type`: image type
- `image.TYPE_RGB`
- `image.TYPE_RGBA`
- `image.TYPE_LUMINANCE`
- `image.TYPE_LUMINANCE_ALPHA`


`buffer`: the raw image data

	*/
	export function load(buffer: string, options?: any): LuaMultiReturn<[any, any]>

	/**
	* Load image (PNG or JPEG) from a string buffer.
	* @param buffer  image data buffer
	* @param options  An optional table containing parameters for loading the image. Supported entries:

`premultiply_alpha`
True if alpha should be premultiplied into the color components. Defaults to `false`.
`flip_vertically`
True if the image contents should be flipped vertically. Defaults to `false`.

	* @return image  object or `nil` if loading fails. The object is a table with the following fields:

`width`: image width
`height`: image height
`type`: image type
- `image.TYPE_RGB`
- `image.TYPE_RGBA`
- `image.TYPE_LUMINANCE`
- `image.TYPE_LUMINANCE_ALPHA`


`buffer`: the script buffer that holds the decompressed image data. See buffer.create how to use the buffer.

	*/
	export function load_buffer(buffer: string, options?: any): LuaMultiReturn<[any, any]>

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace json {

	/**
	* Decode a string of JSON data into a Lua table.
	* A Lua error is raised for syntax errors.
	* @param json  json data
	* @param options  table with decode options

`decode_null_as_userdata`: wether to decode a JSON null value as json.null or nil (default is nil)

	* @return data  decoded json
	*/
	export function decode(json: string, options: any): any

	/**
	* Encode a lua table to a JSON string.
	* A Lua error is raised for syntax errors.
	* @param tbl  lua table to encode
	* @param options  table with encode options

`encode_empty_table_as_object`: wether to encode an empty table as an JSON object or array (default is object)

	* @return json  encoded json
	*/
	export function encode(tbl: any, options: any): string

	/**
	* null
	*/
	 let null$: any
	export { null$ as null }

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
	export function post(receiver: string | url | hash, message_id: string | hash, message?: any): void

	/**
	* This is equivalent to `msg.url(nil)` or `msg.url("#")`, which creates an url to the current
	* script component.
	* @return url  a new URL
	*/
	export function url(): url

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
	export function url(urlstring: string): url

	/**
	* creates a new URL from separate arguments
	* @param socket  socket of the URL
	* @param path  path of the URL
	* @param fragment  fragment of the URL
	* @return url  a new URL
	*/
	export function url(socket?: string | hash, path?: string | hash, fragment?: string | hash): url

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace timer {

	/**
	* Indicates an invalid timer handle
	*/
	export let INVALID_TIMER_HANDLE: any

	/**
	* You may cancel a timer from inside a timer callback.
	* Cancelling a timer that is already executed or cancelled is safe.
	* @param handle  the timer handle returned by timer.delay()
	* @return true  if the timer was active, false if the timer is already cancelled / complete
	*/
	export function cancel(handle: hash): boolean

	/**
	* Adds a timer and returns a unique handle.
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
	export function delay(delay: number, repeat: boolean, callback: any): hash

	/**
	* Get information about timer.
	* @param handle  the timer handle returned by timer.delay()
	* @return data  table or `nil` if timer is cancelled/completed. table with data in the following fields:

`time_remaining`
Time remaining until the next time a timer.delay() fires.
`delay`
Time interval.
`repeating`
true = repeat timer until cancel, false = one-shot timer.

	*/
	export function get_info(handle: hash): LuaMultiReturn<[any, any]>

	/**
	* Manual triggering a callback for a timer.
	* @param handle  the timer handle returned by timer.delay()
	* @return true  if the timer was active, false if the timer is already cancelled / complete
	*/
	export function trigger(handle: hash): boolean

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
	export function conj(q1: vmath.quaternion): vmath.quaternion

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
	export function cross(v1: vmath.vector3, v2: vmath.vector3): vmath.vector3

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
	export function dot(v1: vmath.vector3 | vmath.vector4, v2: vmath.vector3 | vmath.vector4): number

	/**
	* The resulting matrix is the inverse of the supplied matrix.
	* ⚠ For ortho-normal matrices, e.g. regular object transformation,
	* use `vmath.ortho_inv()` instead.
	* The specialized inverse for ortho-normalized matrices is much faster
	* than the general inverse.
	* @param m1  matrix to invert
	* @return m  inverse of the supplied matrix
	*/
	export function inv(m1: vmath.matrix4): vmath.matrix4

	/**
	* Returns the length of the supplied vector or quaternion.
	* If you are comparing the lengths of vectors or quaternions, you should compare
	* the length squared instead as it is slightly more efficient to calculate
	* (it eliminates a square root calculation).
	* @param v  value of which to calculate the length
	* @return n  length
	*/
	export function length(v: vmath.vector3 | vmath.vector4 | vmath.quaternion): number

	/**
	* Returns the squared length of the supplied vector or quaternion.
	* @param v  value of which to calculate the squared length
	* @return n  squared length
	*/
	export function length_sqr(v: vmath.vector3 | vmath.vector4 | vmath.quaternion): number

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
	export function lerp(t: number, v1: vmath.vector3, v2: vmath.vector3): vmath.vector3
	export function lerp(t: number, v1: vmath.vector4, v2: vmath.vector4): vmath.vector4

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
	export function lerp(t: number, q1: vmath.quaternion, q2: vmath.quaternion): vmath.quaternion

	/**
	* Linearly interpolate between two values. Lerp is useful
	* to describe transitions from one value to another over time.
	* ⚠ The function does not clamp t between 0 and 1.
	* @param t  interpolation parameter, 0-1
	* @param n1  number to lerp from
	* @param n2  number to lerp to
	* @return n  the lerped number
	*/
	export function lerp(t: number, n1: number, n2: number): number

	/**
	* The resulting identity matrix describes a transform with
	* no translation or rotation.
	* @return m  identity matrix
	*/
	export function matrix4(): vmath.matrix4

	/**
	* Creates a new matrix with all components set to the
	* corresponding values from the supplied matrix. I.e.
	* the function creates a copy of the given matrix.
	* @param m1  existing matrix
	* @return m  matrix which is a copy of the specified matrix
	*/
	export function matrix4(m1: vmath.matrix4): vmath.matrix4

	/**
	* The resulting matrix describes a rotation around the axis by the specified angle.
	* @param v  axis
	* @param angle  angle in radians
	* @return m  matrix represented by axis and angle
	*/
	export function matrix4_axis_angle(v: vmath.vector3, angle: number): vmath.matrix4

	/**
	* The resulting matrix describes the same rotation as the quaternion, but does not have any translation (also like the quaternion).
	* @param q  quaternion to create matrix from
	* @return m  matrix represented by quaternion
	*/
	export function matrix4_from_quat(q: vmath.quaternion): vmath.matrix4

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
	export function matrix4_frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): vmath.matrix4

	/**
	* The resulting matrix is created from the supplied look-at parameters.
	* This is useful for constructing a view matrix for a camera or
	* rendering in general.
	* @param eye  eye position
	* @param look_at  look-at position
	* @param up  up vector
	* @return m  look-at matrix
	*/
	export function matrix4_look_at(eye: vmath.vector3, look_at: vmath.vector3, up: vmath.vector3): vmath.matrix4

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
	export function matrix4_orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): vmath.matrix4

	/**
	* Creates a perspective projection matrix.
	* This is useful to construct a projection matrix for a camera or rendering in general.
	* @param fov  angle of the full vertical field of view in radians
	* @param aspect  aspect ratio
	* @param near  coordinate for near clipping plane
	* @param far  coordinate for far clipping plane
	* @return m  perspective projection matrix
	*/
	export function matrix4_perspective(fov: number, aspect: number, near: number, far: number): vmath.matrix4

	/**
	* The resulting matrix describes a rotation around the x-axis
	* by the specified angle.
	* @param angle  angle in radians around x-axis
	* @return m  matrix from rotation around x-axis
	*/
	export function matrix4_rotation_x(angle: number): vmath.matrix4

	/**
	* The resulting matrix describes a rotation around the y-axis
	* by the specified angle.
	* @param angle  angle in radians around y-axis
	* @return m  matrix from rotation around y-axis
	*/
	export function matrix4_rotation_y(angle: number): vmath.matrix4

	/**
	* The resulting matrix describes a rotation around the z-axis
	* by the specified angle.
	* @param angle  angle in radians around z-axis
	* @return m  matrix from rotation around z-axis
	*/
	export function matrix4_rotation_z(angle: number): vmath.matrix4

	/**
	* The resulting matrix describes a translation of a point
	* in euclidean space.
	* @param position  position vector to create matrix from
	* @return m  matrix from the supplied position vector
	*/
	export function matrix4_translation(position: vmath.vector3 | vmath.vector4): vmath.matrix4

	/**
	* Performs an element wise multiplication between two vectors of the same type
	* The returned value is a vector defined as (e.g. for a vector3):
	* `v = vmath.mul_per_elem(a, b) = vmath.vector3(a.x * b.x, a.y * b.y, a.z * b.z)`
	* @param v1  first vector
	* @param v2  second vector
	* @return v  multiplied vector
	*/
	export function mul_per_elem(v1: vmath.vector3, v2: vmath.vector3): vmath.vector3
	export function mul_per_elem(v1: vmath.vector4, v2: vmath.vector4): vmath.vector4

	/**
	* Normalizes a vector, i.e. returns a new vector with the same
	* direction as the input vector, but with length 1.
	* ⚠ The length of the vector must be above 0, otherwise a
	* division-by-zero will occur.
	* @param v1  vector to normalize
	* @return v  new normalized vector
	*/
	export function normalize(v1: vmath.vector3): vmath.vector3
	export function normalize(v1: vmath.vector4): vmath.vector4
	export function normalize(v1: vmath.quaternion): vmath.quaternion

	/**
	* The resulting matrix is the inverse of the supplied matrix.
	* The supplied matrix has to be an ortho-normal matrix, e.g.
	* describe a regular object transformation.
	* ⚠ For matrices that are not ortho-normal
	* use the general inverse `vmath.inv()` instead.
	* @param m1  ortho-normalized matrix to invert
	* @return m  inverse of the supplied matrix
	*/
	export function ortho_inv(m1: vmath.matrix4): vmath.matrix4

	/**
	* Calculates the extent the projection of the first vector onto the second.
	* The returned value is a scalar p defined as:
	* `p = |P| cos &#x03B8; / |Q|`
	* where &#x03B8; is the angle between the vectors P and Q.
	* @param v1  vector to be projected on the second
	* @param v2  vector onto which the first will be projected, must not have zero length
	* @return n  the projected extent of the first vector onto the second
	*/
	export function project(v1: vmath.vector3, v2: vmath.vector3): number

	/**
	* Creates a new identity quaternion. The identity
	* quaternion is equal to:
	* `vmath.quat(0, 0, 0, 1)`
	* @return q  new identity quaternion
	*/
	export function quat(): vmath.quaternion

	/**
	* Creates a new quaternion with all components set to the
	* corresponding values from the supplied quaternion. I.e.
	* This function creates a copy of the given quaternion.
	* @param q1  existing quaternion
	* @return q  new quaternion
	*/
	export function quat(q1: vmath.quaternion): vmath.quaternion

	/**
	* Creates a new quaternion with the components set
	* according to the supplied parameter values.
	* @param x  x coordinate
	* @param y  y coordinate
	* @param z  z coordinate
	* @param w  w coordinate
	* @return q  new quaternion
	*/
	export function quat(x: number, y: number, z: number, w: number): vmath.quaternion

	/**
	* The resulting quaternion describes a rotation of `angle`
	* radians around the axis described by the unit vector `v`.
	* @param v  axis
	* @param angle  angle
	* @return q  quaternion representing the axis-angle rotation
	*/
	export function quat_axis_angle(v: vmath.vector3, angle: number): vmath.quaternion

	/**
	* The resulting quaternion describes the rotation from the
	* identity quaternion (no rotation) to the coordinate system
	* as described by the given x, y and z base unit vectors.
	* @param x  x base vector
	* @param y  y base vector
	* @param z  z base vector
	* @return q  quaternion representing the rotation of the specified base vectors
	*/
	export function quat_basis(x: vmath.vector3, y: vmath.vector3, z: vmath.vector3): vmath.quaternion

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
	export function quat_from_to(v1: vmath.vector3, v2: vmath.vector3): vmath.quaternion

	/**
	* The resulting quaternion describes a rotation of `angle`
	* radians around the x-axis.
	* @param angle  angle in radians around x-axis
	* @return q  quaternion representing the rotation around the x-axis
	*/
	export function quat_rotation_x(angle: number): vmath.quaternion

	/**
	* The resulting quaternion describes a rotation of `angle`
	* radians around the y-axis.
	* @param angle  angle in radians around y-axis
	* @return q  quaternion representing the rotation around the y-axis
	*/
	export function quat_rotation_y(angle: number): vmath.quaternion

	/**
	* The resulting quaternion describes a rotation of `angle`
	* radians around the z-axis.
	* @param angle  angle in radians around z-axis
	* @return q  quaternion representing the rotation around the z-axis
	*/
	export function quat_rotation_z(angle: number): vmath.quaternion

	/**
	* Returns a new vector from the supplied vector that is
	* rotated by the rotation described by the supplied
	* quaternion.
	* @param q  quaternion
	* @param v1  vector to rotate
	* @return v  the rotated vector
	*/
	export function rotate(q: vmath.quaternion, v1: vmath.vector3): vmath.vector3

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
	export function slerp(t: number, v1: vmath.vector3, v2: vmath.vector3): vmath.vector3
	export function slerp(t: number, v1: vmath.vector4, v2: vmath.vector4): vmath.vector4

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
	export function slerp(t: number, q1: vmath.quaternion, q2: vmath.quaternion): vmath.quaternion

	/**
	* Creates a vector of arbitrary size. The vector is initialized
	* with numeric values from a table.
	* ⚠ The table values are converted to floating point
	* values. If a value cannot be converted, a 0 is stored in that
	* value position in the vector.
	* @param t  table of numbers
	* @return v  new vector
	*/
	export function vector(t: any): any

	/**
	* Creates a new zero vector with all components set to 0.
	* @return v  new zero vector
	*/
	export function vector3(): vmath.vector3

	/**
	* Creates a new vector with all components set to the
	* supplied scalar value.
	* @param n  scalar value to splat
	* @return v  new vector
	*/
	export function vector3(n: number): vmath.vector3

	/**
	* Creates a new vector with all components set to the
	* corresponding values from the supplied vector. I.e.
	* This function creates a copy of the given vector.
	* @param v1  existing vector
	* @return v  new vector
	*/
	export function vector3(v1: vmath.vector3): vmath.vector3

	/**
	* Creates a new vector with the components set to the
	* supplied values.
	* @param x  x coordinate
	* @param y  y coordinate
	* @param z  z coordinate
	* @return v  new vector
	*/
	export function vector3(x: number, y: number, z: number): vmath.vector3

	/**
	* Creates a new zero vector with all components set to 0.
	* @return v  new zero vector
	*/
	export function vector4(): vmath.vector4

	/**
	* Creates a new vector with all components set to the
	* supplied scalar value.
	* @param n  scalar value to splat
	* @return v  new vector
	*/
	export function vector4(n: number): vmath.vector4

	/**
	* Creates a new vector with all components set to the
	* corresponding values from the supplied vector. I.e.
	* This function creates a copy of the given vector.
	* @param v1  existing vector
	* @return v  new vector
	*/
	export function vector4(v1: vmath.vector4): vmath.vector4

	/**
	* Creates a new vector with the components set to the
	* supplied values.
	* @param x  x coordinate
	* @param y  y coordinate
	* @param z  z coordinate
	* @param w  w coordinate
	* @return v  new vector
	*/
	export function vector4(x: number, y: number, z: number, w: number): vmath.vector4

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace zlib {

	/**
	* A lua error is raised is on error
	* @param buf  buffer to deflate
	* @return buf  deflated buffer
	*/
	export function deflate(buf: string): string

	/**
	* A lua error is raised is on error
	* @param buf  buffer to inflate
	* @return buf  inflated buffer
	*/
	export function inflate(buf: string): string

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace camera {

	/**
	* Post this message to a camera-component to activate it.
	* Several cameras can be active at the same time, but only the camera that was last activated will be used for rendering.
	* When the camera is deactivated (see `release_camera_focus`), the previously activated camera will again be used for rendering automatically.
	* The reason it is called "camera focus" is the similarity to how acquiring input focus works (see `acquire_input_focus`).
	*/
	export type acquire_camera_focus = "acquire_camera_focus"

	/**
	* The ratio between the frustum width and height. Used when calculating the
	* projection of a perspective camera.
	* The type of the property is number.
	*/
	export let aspect_ratio: any

	/**
	* makes camera active
	* @param url  url of camera component
	*/
	export function acquire_focus(url: string | hash | url): void

	/**
	* deactivate camera
	* @param url  url of camera component
	*/
	export function release_focus(url: string | hash | url): void

	/**
	* Camera frustum far plane.
	* The type of the property is float.
	*/
	export let far_z: any

	/**
	* Vertical field of view of the camera.
	* The type of the property is float.
	*/
	export let fov: any

	/**
	* Camera frustum near plane.
	* The type of the property is float.
	*/
	export let near_z: any

	/**
	* Zoom level when using an orthographic projection.
	* The type of the property is float.
	*/
	export let orthographic_zoom: any

	/**
	* READ ONLY The calculated projection matrix of the camera.
	* The type of the property is matrix4.
	*/
	export let projection: any

	/**
	* 
	* Post this message to a camera-component to deactivate it. The camera is then removed from the active cameras.
	* See `acquire_camera_focus` for more information how the active cameras are used in rendering.
	* 
	*/
	export type release_camera_focus = "release_camera_focus"

	/**
	* 
	* Post this message to a camera-component to set its properties at run-time.
	* 
	*/
	export type set_camera = "set_camera"

	/**
	* READ ONLY The calculated view matrix of the camera.
	* The type of the property is matrix4.
	*/
	export let view: any

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace collectionfactory {

	/**
	* loaded
	*/
	export let STATUS_LOADED: any

	/**
	* loading
	*/
	export let STATUS_LOADING: any

	/**
	* unloaded
	*/
	export let STATUS_UNLOADED: any

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
	export function create(url: string | hash | url, position?: vmath.vector3, rotation?: vmath.quaternion, properties?: any, scale?: number): any

	/**
	* This returns status of the collection factory.
	* Calling this function when the factory is not marked as dynamic loading always returns COMP_COLLECTION_FACTORY_STATUS_LOADED.
	* @param url  the collection factory component to get status from
	* @return status  status of the collection factory component

- `collectionfactory.STATUS_UNLOADED`
- `collectionfactory.STATUS_LOADING`
- `collectionfactory.STATUS_LOADED`

	*/
	export function get_status(url?: string | hash | url): any

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
	export function load(url?: string | hash | url, complete_function?: any): void

	/**
	* Changes the prototype for the collection factory.
	* Setting the prototype to "nil" will revert back to the original prototype.
	* @param url  the collection factory component
	* @param prototype  the path to the new prototype, or `nil`
	*/
	export function set_prototype(url?: string | hash | url, prototype?: any): void

	/**
	* This decreases the reference count for each resource loaded with collectionfactory.load. If reference is zero, the resource is destroyed.
	* Calling this function when the factory is not marked as dynamic loading does nothing.
	* @param url  the collection factory component to unload
	*/
	export function unload(url?: string | hash | url): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace collectionproxy {

	/**
	* Post this message to a collection-proxy-component to start background loading of the referenced collection.
	* When the loading has completed, the message proxy_loaded will be sent back to the script.
	* A loaded collection must be initialized (message init) and enabled (message enable) in order to be simulated and drawn.
	*/
	export type async_load = "async_load"

	/**
	* return an indexed table of resources for a collection proxy. Each
	* entry is a hexadecimal string that represents the data of the specific
	* resource. This representation corresponds with the filename for each
	* individual resource that is exported when you bundle an application with
	* LiveUpdate functionality.
	* @param collectionproxy  the collectionproxy to check for resources.
	* @return resources  the resources
	*/
	export function get_resources(collectionproxy: url): any

	/**
	* return an array of missing resources for a collection proxy. Each
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
	export function missing_resources(collectionproxy: url): any

	/**
	* Post this message to a collection-proxy-component to disable the referenced collection, which in turn disables the contained game objects and components.
	*/
	export type disable = "disable"

	/**
	* Post this message to a collection-proxy-component to enable the referenced collection, which in turn enables the contained game objects and components.
	* If the referenced collection was not initialized prior to this call, it will automatically be initialized.
	*/
	export type enable = "enable"

	/**
	* Post this message to a collection-proxy-component to finalize the referenced collection, which in turn finalizes the contained game objects and components.
	*/
	export type final = "final"

	/**
	* Post this message to a collection-proxy-component to initialize the game objects and components in the referenced collection.
	* Sending enable to an uninitialized collection proxy automatically initializes it.
	* The init message simply provides a higher level of control.
	*/
	export type init = "init"

	/**
	* Post this message to a collection-proxy-component to start the loading of the referenced collection.
	* When the loading has completed, the message proxy_loaded will be sent back to the script.
	* A loaded collection must be initialized (message init) and enabled (message enable) in order to be simulated and drawn.
	*/
	export type load = "load"

	/**
	* This message is sent back to the script that initiated a collection proxy load when the referenced
	* collection is loaded. See documentation for load for examples how to use.
	*/
	export type proxy_loaded = "proxy_loaded"

	/**
	* This message is sent back to the script that initiated an unload with a collection proxy when
	* the referenced collection is unloaded. See documentation for unload for examples how to use.
	*/
	export type proxy_unloaded = "proxy_unloaded"

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
	export type set_time_step = "set_time_step"

	/**
	* Post this message to a collection-proxy-component to start the unloading of the referenced collection.
	* When the unloading has completed, the message proxy_unloaded will be sent back to the script.
	*/
	export type unload = "unload"

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace factory {

	/**
	* loaded
	*/
	export let STATUS_LOADED: any

	/**
	* loading
	*/
	export let STATUS_LOADING: any

	/**
	* unloaded
	*/
	export let STATUS_UNLOADED: any

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
	export function create(url: string | hash | url, position?: vmath.vector3, rotation?: vmath.quaternion, properties?: any, scale?: number | vmath.vector3): hash

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
	export function get_status(url?: string | hash | url): any

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
	export function load(url?: string | hash | url, complete_function?: any): void

	/**
	* Changes the prototype for the factory.
	* @param url  the factory component
	* @param prototype  the path to the new prototype, or `nil`
	*/
	export function set_prototype(url?: string | hash | url, prototype?: any): void

	/**
	* This decreases the reference count for each resource loaded with factory.load. If reference is zero, the resource is destroyed.
	* Calling this function when the factory is not marked as dynamic loading does nothing.
	* @param url  the factory component to unload
	*/
	export function unload(url?: string | hash | url): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace label {

	/**
	* The color of the label. The type of the property is vector4.
	*/
	export let color: any

	/**
	* The font used when rendering the label. The type of the property is hash.
	*/
	export let font: any

	/**
	* Gets the text from a label component
	* @param url  the label to get the text from
	* @return metrics  the label text
	*/
	export function get_text(url: string | hash | url): string

	/**
	* Sets the text of a label component
	* ⚠ This method uses the message passing that means the value will be set after `dispatch messages` step.
	* More information is available in the Application Lifecycle manual.
	* @param url  the label that should have a constant set
	* @param text  the text
	*/
	export function set_text(url: string | hash | url, text: string): void

	/**
	* The leading of the label. This value is used to scale the line spacing of text.
	* The type of the property is number.
	*/
	export let leading: any

	/**
	* The line break of the label.
	* This value is used to adjust the vertical spacing of characters in the text.
	* The type of the property is boolean.
	*/
	export let line_break: any

	/**
	* The material used when rendering the label. The type of the property is hash.
	*/
	export let material: any

	/**
	* The outline color of the label. The type of the property is vector4.
	*/
	export let outline: any

	/**
	* The scale of the label. The type of the property is number (uniform)
	* or vector3 (non uniform).
	*/
	export let scale: any

	/**
	* The shadow color of the label. The type of the property is vector4.
	*/
	export let shadow: any

	/**
	* Returns the size of the label. The size will constrain the text if line break is enabled.
	* The type of the property is vector3.
	*/
	export let size: any

	/**
	* The tracking of the label.
	* This value is used to adjust the vertical spacing of characters in the text.
	* The type of the property is number.
	*/
	export let tracking: any

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace model {

	/**
	* The current animation set on the component. The type of the property is hash.
	*/
	export let animation: any

	/**
	* The normalized animation cursor. The type of the property is number.
	* ⚠ Please note that model events may not fire as expected when the cursor is manipulated directly.
	*/
	export let cursor: any

	/**
	* The material used when rendering the model. The type of the property is hash.
	*/
	export let material: any

	/**
	* Cancels all animation on a model component.
	* @param url  the model for which to cancel the animation
	*/
	export function cancel(url: string | hash | url): void

	/**
	* Gets the id of the game object that corresponds to a model skeleton bone.
	* The returned game object can be used for parenting and transform queries.
	* This function has complexity `O(n)`, where `n` is the number of bones in the model skeleton.
	* Game objects corresponding to a model skeleton bone can not be individually deleted.
	* @param url  the model to query
	* @param bone_id  id of the corresponding bone
	* @return id  id of the game object
	*/
	export function get_go(url: string | hash | url, bone_id: string | hash): hash

	/**
	* Get the enabled state of a mesh
	* @param url  the model
	* @param mesh_id  the id of the mesh
	* @return enabled  true if the mesh is visible, false otherwise
	*/
	export function get_mesh_enabled(url: string | hash | url, mesh_id: string | hash | url): boolean

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
	export function play_anim(url: string | hash | url, anim_id: string | hash, playback: any, play_properties?: any, complete_function?: any): void

	/**
	* Enable or disable visibility of a mesh
	* @param url  the model
	* @param mesh_id  the id of the mesh
	* @param enabled  true if the mesh should be visible, false if it should be hideen
	*/
	export function set_mesh_enabled(url: string | hash | url, mesh_id: string | hash | url, enabled: boolean): void

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
	export type model_animation_done = "model_animation_done"

	/**
	* The animation playback rate. A multiplier to the animation playback rate. The type of the property is number.
	*/
	export let playback_rate: any

	/**
	* The texture hash id of the model. Used for getting/setting model texture for unit 0-7
	*/
	export let textureN: any

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace particlefx {

	/**
	* postspawn state
	*/
	export let EMITTER_STATE_POSTSPAWN: any

	/**
	* prespawn state
	*/
	export let EMITTER_STATE_PRESPAWN: any

	/**
	* sleeping state
	*/
	export let EMITTER_STATE_SLEEPING: any

	/**
	* spawning state
	*/
	export let EMITTER_STATE_SPAWNING: any

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
	export function play(url: string | hash | url, emitter_state_function?: any): void

	/**
	* Resets a shader constant for a particle FX component emitter.
	* The constant must be defined in the material assigned to the emitter.
	* Resetting a constant through this function implies that the value defined in the material will be used.
	* Which particle FX to reset a constant for is identified by the URL.
	* @param url  the particle FX that should have a constant reset
	* @param emitter  the id of the emitter
	* @param constant  the name of the constant
	*/
	export function reset_constant(url: string | hash | url, emitter: string | hash, constant: string | hash): void

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
	export function set_constant(url: string | hash | url, emitter: string | hash, constant: string | hash, value: vmath.vector4): void

	/**
	* Stops a particle FX component from playing.
	* Stopping a particle FX does not remove already spawned particles.
	* Which particle FX to stop is identified by the URL.
	* @param url  the particle fx that should stop playing
	* @param options  Options when stopping the particle fx. Supported options:

`clear`: instantly clear spawned particles

	*/
	export function stop(url: string | hash | url, options: any): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace sound {

	/**
	* The gain on the sound-component. Note that gain is in linear scale,
	* between 0 and 1.
	*/
	export let gain: any

	/**
	* The pan on the sound-component. The valid range is from -1.0 to 1.0,
	* representing -45 degrees left, to +45 degrees right.
	*/
	export let pan: any

	/**
	* Post this message to a sound-component to make it play its sound. Multiple voices is supported. The limit is set to 32 voices per sound component.
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* ⚠ A sound will continue to play even if the game object the sound component belonged to is deleted. You can send a `stop_sound` to stop the sound.
	* ⚠ `play_id` should be specified in case you want to receive `sound_done` or `sound_stopped` in `on_message()`.
	*/
	export type play_sound = "play_sound"

	/**
	* Post this message to a sound-component to set gain on all active playing voices.
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	*/
	export type set_gain = "set_gain"

	/**
	* The sound data used when playing the sound. The type of the property is hash.
	*/
	export let sound: any

	/**
	* Get mixer group gain
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* @param group  group name
	* @return gain  gain in linear scale
	*/
	export function get_group_gain(group: string | hash): number

	/**
	* Get a mixer group name as a string.
	* ⚠ This function is to be used for debugging and
	* development tooling only. The function does a reverse hash lookup, which does not
	* return a proper string value when the game is built in release mode.
	* @param group  group name
	* @return name  group name
	*/
	export function get_group_name(group: string | hash): string

	/**
	* Get a table of all mixer group names (hashes).
	* @return groups  table of mixer group names
	*/
	export function get_groups(): any

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
	export function get_peak(group: string | hash, window: number): LuaMultiReturn<[number, number]>

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
	export function get_rms(group: string | hash, window: number): LuaMultiReturn<[number, number]>

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
	export function is_music_playing(): boolean

	/**
	* Checks if a phone call is active. If there is an active phone call all
	* other sounds will be muted until the phone call is finished.
	* 🌎 On non mobile platforms,
	* this function always return `false`.
	* @return call_active  `true` if there is an active phone call, `false` otherwise.
	*/
	export function is_phone_call_active(): boolean

	/**
	* Pause all active voices
	* @param url  the sound that should pause
	* @param pause  true if the sound should pause
	*/
	export function pause(url: string | hash | url, pause: any): void

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

	* @param complete_function  function to call when the sound has finished playing or stopped manually via sound.stop.

`self`
The current object.
`message_id`
The name of the completion message, which can be either `"sound_done"` if the sound has finished playing, or `"sound_stopped"` if it was stopped manually.
`message`
Information about the completion:


`play_id` - the sequential play identifier that was given by the sound.play function.


`sender`
The invoker of the callback: the sound component.

	* @return play_id  The identifier for the sound voice
	*/
	export function play(url: string | hash | url, play_properties?: any, complete_function?: any): number

	/**
	* Set gain on all active playing voices of a sound.
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* @param url  the sound to set the gain of
	* @param gain  sound gain between 0 and 1. The final gain of the sound will be a combination of this gain, the group gain and the master gain.
	*/
	export function set_gain(url: string | hash | url, gain?: number): void

	/**
	* Set mixer group gain
	* ⚠ Note that gain is in linear scale, between 0 and 1.
	* To get the dB value from the gain, use the formula `20 * log(gain)`.
	* Inversely, to find the linear value from a dB value, use the formula
	* `10db/20`.
	* @param group  group name
	* @param gain  gain in linear scale
	*/
	export function set_group_gain(group: string | hash, gain: number): void

	/**
	* Set panning on all active playing voices of a sound.
	* The valid range is from -1.0 to 1.0, representing -45 degrees left, to +45 degrees right.
	* @param url  the sound to set the panning value to
	* @param pan  sound panning between -1.0 and 1.0
	*/
	export function set_pan(url: string | hash | url, pan?: number): void

	/**
	* Stop playing all active voices or just one voice if `play_id` provided
	* @param url  the sound component that should stop
	* @param stop_properties  
optional table with properties:
`play_id`
the sequential play identifier that should be stopped (was given by the sound.play() function)

	*/
	export function stop(url: string | hash | url, stop_properties?: any): void

	/**
	* This message is sent back to the sender of a `play_sound` message
	* if the sound could be played to completion and a `play_id` was provided with the `play_sound` message.
	*/
	export type sound_done = "sound_done"

	/**
	* This message is sent back to the sender of a `play_sound` message, if the sound
	* has been manually stopped and a `play_id` was provided with the `play_sound` message.
	*/
	export type sound_stopped = "sound_stopped"

	/**
	* The speed on the sound-component where 1.0 is normal speed, 0.5 is half
	* speed and 2.0 is double speed.
	*/
	export let speed: any

	/**
	* Post this message to a sound-component to make it stop playing all active voices
	*/
	export type stop_sound = "stop_sound"

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace sprite {

	/**
	* hash.
	*/
	export let animation: any

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
	export type animation_done = "animation_done"

	/**
	* The normalized animation cursor. The type of the property is number.
	*/
	export let cursor: any

	/**
	* READ ONLY The frame count of the currently playing animation.
	*/
	export let frame_count: any

	/**
	* The image used when rendering the sprite. The type of the property is hash.
	*/
	export let image: any

	/**
	* The material used when rendering the sprite. The type of the property is hash.
	*/
	export let material: any

	/**
	* Post this message to a sprite component to make it play an animation from its tile set.
	*/
	export type play_animation = "play_animation"

	/**
	* number.
	* The playback_rate is a non-negative number, a negative value will be clamped to 0.
	*/
	export let playback_rate: any

	/**
	* The non-uniform scale of the sprite. The type of the property is vector3.
	*/
	export let scale: any

	/**
	* The size of the sprite, not allowing for any additional scaling that may be applied.
	* The type of the property is vector3. It is not possible to set the size if the size mode
	* of the sprite is set to auto.
	*/
	export let size: any

	/**
	* The slice values of the sprite. The type of the property is a vector4 that corresponds to
	* the left, top, right, bottom values of the sprite in the editor.
	* It is not possible to set the slice property if the size mode of the sprite is set to auto.
	*/
	export let slice: any

	/**
	* Play an animation on a sprite component from its tile set
	* An optional completion callback function can be provided that will be called when
	* the animation has completed playing. If no function is provided,
	* a animation_done message is sent to the script that started the animation.
	* @param url  the sprite that should play the animation
	* @param id  hashed id of the animation to play
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
	export function play_flipbook(url: string | hash | url, id: string | hash, complete_function?: any, play_properties?: any): void

	/**
	* Sets horizontal flipping of the provided sprite's animations.
	* The sprite is identified by its URL.
	* If the currently playing animation is flipped by default, flipping it again will make it appear like the original texture.
	* @param url  the sprite that should flip its animations
	* @param flip  `true` if the sprite should flip its animations, `false` if not
	*/
	export function set_hflip(url: string | hash | url, flip: boolean): void

	/**
	* Sets vertical flipping of the provided sprite's animations.
	* The sprite is identified by its URL.
	* If the currently playing animation is flipped by default, flipping it again will make it appear like the original texture.
	* @param url  the sprite that should flip its animations
	* @param flip  `true` if the sprite should flip its animations, `false` if not
	*/
	export function set_vflip(url: string | hash | url, flip: boolean): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace tilemap {

	/**
	* The material used when rendering the tile map. The type of the property is hash.
	*/
	export let material: any

	/**
	* The tile source used when rendering the tile map. The type of the property is hash.
	*/
	export let tile_source: any

	/**
	* flip tile horizontally
	*/
	export let H_FLIP: any

	/**
	* rotate tile 180 degrees clockwise
	*/
	export let ROTATE_180: any

	/**
	* rotate tile 270 degrees clockwise
	*/
	export let ROTATE_270: any

	/**
	* rotate tile 90 degrees clockwise
	*/
	export let ROTATE_90: any

	/**
	* flip tile vertically
	*/
	export let V_FLIP: any

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
	export function get_bounds(url: string | hash | url): LuaMultiReturn<[number, number, number, number]>

	/**
	* Get the tile set at the specified position in the tilemap.
	* The position is identified by the tile index starting at origin
	* with index 1, 1. (see tilemap.set_tile())
	* Which tile map and layer to query is identified by the URL and the
	* layer name parameters.
	* @param url  the tile map
	* @param layer  name of the layer for the tile
	* @param x  x-coordinate of the tile
	* @param y  y-coordinate of the tile
	* @return tile  index of the tile
	*/
	export function get_tile(url: string | hash | url, layer: string | hash, x: number, y: number): number

	/**
	* Replace a tile in a tile map with a new tile.
	* The coordinates of the tiles are indexed so that the "first" tile just
	* above and to the right of origin has coordinates 1,1.
	* Tiles to the left of and below origin are indexed 0, -1, -2 and so forth.
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
	* Transform bitmask is arithmetic sum of one or both FLIP constants (`tilemap.H_FLIP`, `tilemap.V_FLIP`) and/or one of ROTATION constants
	* (`tilemap.ROTATE_90`, `tilemap.ROTATE_180`, `tilemap.ROTATE_270`).
	* Flip always applies before rotation (clockwise).
	* @param url  the tile map
	* @param layer  name of the layer for the tile
	* @param x  x-coordinate of the tile
	* @param y  y-coordinate of the tile
	* @param tile  index of new tile to set. 0 resets the cell
	* @param transform_bitmask  optional flip and/or rotation should be applied to the tile
	*/
	export function set_tile(url: string | hash | url, layer: string | hash, x: number, y: number, tile: number, transform_bitmask?: number): void

	/**
	* Sets the visibility of the tilemap layer
	* @param url  the tile map
	* @param layer  name of the layer for the tile
	* @param visible  should the layer be visible
	*/
	export function set_visible(url: string | hash | url, layer: string | hash, visible: boolean): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

