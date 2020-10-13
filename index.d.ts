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


declare namespace crash {

	/**
	* android build fingerprint
	*/
	let SYSFIELD_ANDROID_BUILD_FINGERPRINT: any

	/**
	* system device language as reported by sys.get_sys_info
	*/
	let SYSFIELD_DEVICE_LANGUAGE: any

	/**
	* device model as reported by sys.get_sys_info
	*/
	let SYSFIELD_DEVICE_MODEL: any

	/**
	* engine version as hash
	*/
	let SYSFIELD_ENGINE_HASH: any

	/**
	* engine version as release number
	*/
	let SYSFIELD_ENGINE_VERSION: any

	/**
	* system language as reported by sys.get_sys_info
	*/
	let SYSFIELD_LANGUAGE: any

	/**
	* device manufacturer as reported by sys.get_sys_info
	*/
	let SYSFIELD_MANUFACTURER: any

	/**
	* The max number of sysfields.
	*/
	let SYSFIELD_MAX: any

	/**
	* system name as reported by sys.get_sys_info
	*/
	let SYSFIELD_SYSTEM_NAME: any

	/**
	* system version as reported by sys.get_sys_info
	*/
	let SYSFIELD_SYSTEM_VERSION: any

	/**
	* system territory as reported by sys.get_sys_info
	*/
	let SYSFIELD_TERRITORY: any

	/**
	* The max number of user fields.
	*/
	let USERFIELD_MAX: any

	/**
	* The max size of a single user field.
	*/
	let USERFIELD_SIZE: any

	/**
	* A table is returned containing the addresses of the call stack.
	* @param handle  crash dump handle
	* @return backtrace  table containing the backtrace
	*/
	function get_backtrace(handle: number): object

	/**
	* The format of read text blob is platform specific
	* and not guaranteed
	* but can be useful for manual inspection.
	* @param handle  crash dump handle
	* @return blob  string with the platform specific data
	*/
	function get_extra_data(handle: number): string

	/**
	* The function returns a table containing entries with sub-tables that
	* have fields 'name' and 'address' set for all loaded modules.
	* @param handle  crash dump handle
	* @return modules  module table
	*/
	function get_modules(handle: number): object

	/**
	* read signal number from a crash report
	* @param handle  crash dump handle
	* @return signal  signal number
	*/
	function get_signum(handle: number): number

	/**
	* reads a system field from a loaded crash dump
	* @param handle  crash dump handle
	* @param index  system field enum. Must be less than crash.SYSFIELD_MAX
	* @return value  value recorded in the crash dump, or nil if it didn't exist
	*/
	function get_sys_field(handle: number, index: number): string

	/**
	* reads user field from a loaded crash dump
	* @param handle  crash dump handle
	* @param index  user data slot index
	* @return value  user data value recorded in the crash dump
	*/
	function get_user_field(handle: number, index: number): string

	/**
	* The crash dump will be removed from disk upon a successful
	* load, so loading is one-shot.
	* @return handle  handle to the loaded dump, or nil if no dump was found
	*/
	function load_previous(): number

	/**
	* releases a previously loaded crash dump
	* @param handle  handle to loaded crash dump
	*/
	function release(handle: number): void

	/**
	* Crashes occuring before the path is set will be stored to a default engine location.
	* @param path  file path to use
	*/
	function set_file_path(path: string): void

	/**
	* Store a user value that will get written to a crash dump when
	* a crash occurs. This can be user id:s, breadcrumb data etc.
	* There are 32 slots indexed from 0. Each slot stores at most 255 characters.
	* @param index  slot index. 0-indexed
	* @param value  string value to store
	*/
	function set_user_field(index: number, value: string): void

	/**
	* Performs the same steps as if a crash had just occured but
	* allows the program to continue.
	* The generated dump can be read by crash.load_previous
	*/
	function write_dump(): void

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
	//let acquire_input_focus: string

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
	* 
	*/
	//let disable: string

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
	* 
	*/
	//let enable: string

	/**
	* The rotation of the game object expressed in Euler angles.
	* Euler angles are specified in degrees in the interval (-360, 360).
	* The type of the property is vector3.
	*/
	let euler: any

	/**
	* This is a callback-function, which is called by the engine when a script component is finalized (destroyed). It can
	* be used to e.g. take some last action, report the finalization to other game object instances, delete spawned objects
	* or release user input focus (see release_input_focus).
	* @param self  reference to the script state to be used for storing data
	*/
	function final(self: object): void

	/**
	* in-back
	*/
	let EASING_INBACK: any

	/**
	* in-bounce
	*/
	let EASING_INBOUNCE: any

	/**
	* in-circlic
	*/
	let EASING_INCIRC: any

	/**
	* in-cubic
	*/
	let EASING_INCUBIC: any

	/**
	* in-elastic
	*/
	let EASING_INELASTIC: any

	/**
	* in-exponential
	*/
	let EASING_INEXPO: any

	/**
	* in-out-back
	*/
	let EASING_INOUTBACK: any

	/**
	* in-out-bounce
	*/
	let EASING_INOUTBOUNCE: any

	/**
	* in-out-circlic
	*/
	let EASING_INOUTCIRC: any

	/**
	* in-out-cubic
	*/
	let EASING_INOUTCUBIC: any

	/**
	* in-out-elastic
	*/
	let EASING_INOUTELASTIC: any

	/**
	* in-out-exponential
	*/
	let EASING_INOUTEXPO: any

	/**
	* in-out-quadratic
	*/
	let EASING_INOUTQUAD: any

	/**
	* in-out-quartic
	*/
	let EASING_INOUTQUART: any

	/**
	* in-out-quintic
	*/
	let EASING_INOUTQUINT: any

	/**
	* in-out-sine
	*/
	let EASING_INOUTSINE: any

	/**
	* in-quadratic
	*/
	let EASING_INQUAD: any

	/**
	* in-quartic
	*/
	let EASING_INQUART: any

	/**
	* in-quintic
	*/
	let EASING_INQUINT: any

	/**
	* in-sine
	*/
	let EASING_INSINE: any

	/**
	* linear interpolation
	*/
	let EASING_LINEAR: any

	/**
	* out-back
	*/
	let EASING_OUTBACK: any

	/**
	* out-bounce
	*/
	let EASING_OUTBOUNCE: any

	/**
	* out-circlic
	*/
	let EASING_OUTCIRC: any

	/**
	* out-cubic
	*/
	let EASING_OUTCUBIC: any

	/**
	* out-elastic
	*/
	let EASING_OUTELASTIC: any

	/**
	* out-exponential
	*/
	let EASING_OUTEXPO: any

	/**
	* out-in-back
	*/
	let EASING_OUTINBACK: any

	/**
	* out-in-bounce
	*/
	let EASING_OUTINBOUNCE: any

	/**
	* out-in-circlic
	*/
	let EASING_OUTINCIRC: any

	/**
	* out-in-cubic
	*/
	let EASING_OUTINCUBIC: any

	/**
	* out-in-elastic
	*/
	let EASING_OUTINELASTIC: any

	/**
	* out-in-exponential
	*/
	let EASING_OUTINEXPO: any

	/**
	* out-in-quadratic
	*/
	let EASING_OUTINQUAD: any

	/**
	* out-in-quartic
	*/
	let EASING_OUTINQUART: any

	/**
	* out-in-quintic
	*/
	let EASING_OUTINQUINT: any

	/**
	* out-in-sine
	*/
	let EASING_OUTINSINE: any

	/**
	* out-quadratic
	*/
	let EASING_OUTQUAD: any

	/**
	* out-quartic
	*/
	let EASING_OUTQUART: any

	/**
	* out-quintic
	*/
	let EASING_OUTQUINT: any

	/**
	* out-sine
	*/
	let EASING_OUTSINE: any

	/**
	* loop backward
	*/
	let PLAYBACK_LOOP_BACKWARD: any

	/**
	* loop forward
	*/
	let PLAYBACK_LOOP_FORWARD: any

	/**
	* ping pong loop
	*/
	let PLAYBACK_LOOP_PINGPONG: any

	/**
	* no playback
	*/
	let PLAYBACK_NONE: any

	/**
	* once backward
	*/
	let PLAYBACK_ONCE_BACKWARD: any

	/**
	* once forward
	*/
	let PLAYBACK_ONCE_FORWARD: any

	/**
	* once ping pong
	*/
	let PLAYBACK_ONCE_PINGPONG: any

	/**
	* This is only supported for numerical properties. If the node property is already being
	* animated, that animation will be canceled and replaced by the new one.
	* If a `complete_function` (lua function) is specified, that function will be called when the animation has completed.
	* By starting a new animation in that function, several animations can be sequenced together. See the examples for more information.
	* ⚠ If you call `go.animate()` from a game object's `final()` function,
	* any passed `complete_function` will be ignored and never called upon animation completion.
	* See the properties guide for which properties can be animated and the animation guide for how to animate them.
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
	function animate(url: any, property: any, playback: any, to: any, easing: any, duration: number, delay?: number, complete_function?: any): void

	/**
	* By calling this function, all stored animations of the given property will be canceled.
	* See the properties guide for which properties can be animated and the animation guide for how to animate them.
	* @param url  url of the game object or component having the property
	* @param property  ide of the property to animate
	*/
	function cancel_animations(url: any, property: any): void

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
	* gets a named property of the specified game object or component
	* @param url  url of the game object or component having the property
	* @param property  id of the property to retrieve
	* @return value  the value of the specified property
	*/
	function get(url: any, property: any): any

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
	function get_id(path?: string): hash

	/**
	* The position is relative the parent (if any). Use go.get_world_position to retrieve the global world position.
	* @param id  optional id of the game object instance to get the position for, by default the instance of the calling script
	* @return position  instance position
	*/
	function get_position(id?: any): any

	/**
	* The rotation is relative to the parent (if any). Use go.get_world_rotation to retrieve the global world rotation.
	* @param id  optional id of the game object instance to get the rotation for, by default the instance of the calling script
	* @return rotation  instance rotation
	*/
	function get_rotation(id?: any): any

	/**
	* The scale is relative the parent (if any). Use go.get_world_scale to retrieve the global world 3D scale factor.
	* @param id  optional id of the game object instance to get the scale for, by default the instance of the calling script
	* @return scale  instance scale factor
	*/
	function get_scale(id?: any): any

	/**
	* The uniform scale is relative the parent (if any). If the underlying scale vector is non-uniform the min element of the vector is returned as the uniform scale factor.
	* @param id  optional id of the game object instance to get the uniform scale for, by default the instance of the calling script
	* @return scale  uniform instance scale factor
	*/
	function get_scale_uniform(id?: any): number

	/**
	* Use go.get_position to retrieve the position relative to the parent.
	* @param id  optional id of the game object instance to get the world position for, by default the instance of the calling script
	* @return position  instance world position
	*/
	function get_world_position(id?: any): any

	/**
	* Use `go.get_rotation` to retrieve the rotation relative to the parent.
	* @param id  optional id of the game object instance to get the world rotation for, by default the instance of the calling script
	* @return rotation  instance world rotation
	*/
	function get_world_rotation(id?: any): any

	/**
	* Use `go.get_scale` to retrieve the 3D scale factor relative to the parent.
	* This vector is derived by decomposing the transformation matrix and should be used with care.
	* For most cases it should be fine to use go.get_world_scale_uniform instead.
	* @param id  optional id of the game object instance to get the world scale for, by default the instance of the calling script
	* @return scale  instance world 3D scale factor
	*/
	function get_world_scale(id?: any): any

	/**
	* Use `go.get_scale_uniform` to retrieve the scale factor relative to the parent.
	* @param id  optional id of the game object instance to get the world scale for, by default the instance of the calling script
	* @return scale  instance world scale factor
	*/
	function get_world_scale_uniform(id?: any): number

	/**
	* gets the game object instance world transform matrix
	* @param id  optional id of the game object instance to get the world transform for, by default the instance of the calling script
	* @return transform  instance world transform
	*/
	function get_world_transform(id?: any): any

	/**
	* This function defines a property which can then be used in the script through the self-reference.
	* The properties defined this way are automatically exposed in the editor in game objects and collections which use the script.
	* Note that you can only use this function outside any callback-functions like init and update.
	* @param name  the id of the property
	* @param value  default value of the property. In the case of a url, only the empty constructor msg.url() is allowed. In the case of a resource one of the resource constructors (eg resource.atlas(), resource.font() etc) is expected.
	*/
	function property(name: string, value: any): void

	/**
	* sets a named property of the specified game object or component, or a material constant
	* @param url  url of the game object or component having the property
	* @param property  id of the property to set
	* @param value  the value to set
	*/
	function set(url: any, property: any, value: any): void

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
	function set_parent(id?: any, parent_id?: any, keep_world_transform?: boolean): void

	/**
	* The position is relative to the parent (if any). The global world position cannot be manually set.
	* @param position  position to set
	* @param id  optional id of the game object instance to set the position for, by default the instance of the calling script
	*/
	function set_position(position: any, id?: any): void

	/**
	* The rotation is relative to the parent (if any). The global world rotation cannot be manually set.
	* @param rotation  rotation to set
	* @param id  optional id of the game object instance to get the rotation for, by default the instance of the calling script
	*/
	function set_rotation(rotation: any, id?: any): void

	/**
	* The scale factor is relative to the parent (if any). The global world scale factor cannot be manually set.
	* ⚠ Physics are currently not affected when setting scale from this function.
	* @param scale  vector or uniform scale factor, must be greater than 0
	* @param id  optional id of the game object instance to get the scale for, by default the instance of the calling script
	*/
	function set_scale(scale: any, id?: any): void

	/**
	* This is a callback-function, which is called by the engine when a script component is initialized. It can be used
	* to set the initial state of the script.
	* @param self  reference to the script state to be used for storing data
	*/
	function init(self: object): void

	/**
	* This is a callback-function, which is called by the engine when user input is sent to the game object instance of the script.
	* It can be used to take action on the input, e.g. move the instance according to the input.
	* For an instance to obtain user input, it must first acquire input focus
	* through the message `acquire_input_focus`.
	* Any instance that has obtained input will be put on top of an
	* input stack. Input is sent to all listeners on the stack until the
	* end of stack is reached, or a listener returns `true`
	* to signal that it wants input to be consumed.
	* See the documentation of acquire_input_focus for more
	* information.
	* The `action` parameter is a table containing data about the input mapped to the
	* `action_id`.
	* For mapped actions it specifies the value of the input and if it was just pressed or released.
	* Actions are mapped to input in an input_binding-file.
	* Mouse movement is specifically handled and uses `nil` as its `action_id`.
	* The `action` only contains positional parameters in this case, such as x and y of the pointer.
	* Here is a brief description of the available table fields:
	* 
	* 
	* 
	* Field
	* Description
	* 
	* 
	* 
	* 
	* `value`
	* The amount of input given by the user. This is usually 1 for buttons and 0-1 for analogue inputs. This is not present for mouse movement.
	* 
	* 
	* `pressed`
	* If the input was pressed this frame. This is not present for mouse movement.
	* 
	* 
	* `released`
	* If the input was released this frame. This is not present for mouse movement.
	* 
	* 
	* `repeated`
	* If the input was repeated this frame. This is similar to how a key on a keyboard is repeated when you hold it down. This is not present for mouse movement.
	* 
	* 
	* `x`
	* The x value of a pointer device, if present.
	* 
	* 
	* `y`
	* The y value of a pointer device, if present.
	* 
	* 
	* `screen_x`
	* The screen space x value of a pointer device, if present.
	* 
	* 
	* `screen_y`
	* The screen space y value of a pointer device, if present.
	* 
	* 
	* `dx`
	* The change in x value of a pointer device, if present.
	* 
	* 
	* `dy`
	* The change in y value of a pointer device, if present.
	* 
	* 
	* `screen_dx`
	* The change in screen space x value of a pointer device, if present.
	* 
	* 
	* `screen_dy`
	* The change in screen space y value of a pointer device, if present.
	* 
	* 
	* `gamepad`
	* The index of the gamepad device that provided the input.
	* 
	* 
	* `touch`
	* List of touch input, one element per finger, if present. See table below about touch input
	* 
	* 
	* 
	* Touch input table:
	* 
	* 
	* 
	* Field
	* Description
	* 
	* 
	* 
	* 
	* `id`
	* A number identifying the touch input during its duration.
	* 
	* 
	* `pressed`
	* True if the finger was pressed this frame.
	* 
	* 
	* `released`
	* True if the finger was released this frame.
	* 
	* 
	* `tap_count`
	* Number of taps, one for single, two for double-tap, etc
	* 
	* 
	* `x`
	* The x touch location.
	* 
	* 
	* `y`
	* The y touch location.
	* 
	* 
	* `dx`
	* The change in x value.
	* 
	* 
	* `dy`
	* The change in y value.
	* 
	* 
	* `acc_x`
	* Accelerometer x value (if present).
	* 
	* 
	* `acc_y`
	* Accelerometer y value (if present).
	* 
	* 
	* `acc_z`
	* Accelerometer z value (if present).
	* 
	* 
	* 
	* @param self  reference to the script state to be used for storing data
	* @param action_id  id of the received input action, as mapped in the input_binding-file
	* @param action  a table containing the input data, see above for a description
	* @return consume  optional boolean to signal if the input should be consumed (not passed on to others) or not, default is false
	*/
	function on_input(self: object, action_id: hash, action: object): boolean | undefined

	/**
	* This is a callback-function, which is called by the engine whenever a message has been sent to the script component.
	* It can be used to take action on the message, e.g. send a response back to the sender of the message.
	* The `message` parameter is a table containing the message data. If the message is sent from the engine, the
	* documentation of the message specifies which data is supplied.
	* @param self  reference to the script state to be used for storing data
	* @param message_id  id of the received message
	* @param message  a table containing the message data
	* @param sender  address of the sender
	*/
	function on_message(self: object, message_id: hash, message: object, sender: url): void

	/**
	* This is a callback-function, which is called by the engine when the script component is reloaded, e.g. from the editor.
	* It can be used for live development, e.g. to tweak constants or set up the state properly for the instance.
	* @param self  reference to the script state to be used for storing data
	*/
	function on_reload(self: object): void

	/**
	* The position of the game object.
	* The type of the property is vector3.
	*/
	let position: any

	/**
	* Post this message to an instance to make that instance release the user input focus.
	* See acquire_input_focus for more information on how the user input handling
	* works.
	*/
	//let release_input_focus: string

	/**
	* The rotation of the game object.
	* The type of the property is quaternion.
	*/
	let rotation: any

	/**
	* The uniform scale of the game object. The type of the property is number.
	*/
	let scale: any

	/**
	* When this message is sent to an instance, it sets the parent of that instance. This means that the instance will exist
	* in the geometrical space of its parent, like a basic transformation hierarchy or scene graph. If no parent is specified,
	* the instance will be detached from any parent and exist in world space. A script can send this message to itself to set
	* the parent of its instance.
	*/
	//let set_parent: string

	/**
	* This is a callback-function, which is called by the engine every frame to update the state of a script component.
	* It can be used to perform any kind of game related tasks, e.g. moving the game object instance.
	* @param self  reference to the script state to be used for storing data
	* @param dt  the time-step of the frame update
	*/
	function update(self: object, dt: number): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace gui {

	/**
	* This is a callback-function, which is called by the engine when a gui component is finalized (destroyed). It can
	* be used to e.g. take some last action, report the finalization to other game object instances
	* or release user input focus (see `release_input_focus`). There is no use in starting any animations or similar
	* from this function since the gui component is about to be destroyed.
	* @param self  reference to the script state to be used for storing data
	*/
	function final(self: object): void

	/**
	* fit adjust mode
	*/
	let ADJUST_FIT: any

	/**
	* stretch adjust mode
	*/
	let ADJUST_STRETCH: any

	/**
	* zoom adjust mode
	*/
	let ADJUST_ZOOM: any

	/**
	* bottom y-anchor
	*/
	let ANCHOR_BOTTOM: any

	/**
	* left x-anchor
	*/
	let ANCHOR_LEFT: any

	/**
	* no anchor
	*/
	let ANCHOR_NONE: any

	/**
	* right x-anchor
	*/
	let ANCHOR_RIGHT: any

	/**
	* top y-anchor
	*/
	let ANCHOR_TOP: any

	/**
	* additive blending
	*/
	let BLEND_ADD: any

	/**
	* additive alpha blending
	*/
	let BLEND_ADD_ALPHA: any

	/**
	* alpha blending
	*/
	let BLEND_ALPHA: any

	/**
	* multiply blending
	*/
	let BLEND_MULT: any

	/**
	* clipping mode none
	*/
	let CLIPPING_MODE_NONE: any

	/**
	* clipping mode stencil
	*/
	let CLIPPING_MODE_STENCIL: any

	/**
	* in-back
	*/
	let EASING_INBACK: any

	/**
	* in-bounce
	*/
	let EASING_INBOUNCE: any

	/**
	* in-circlic
	*/
	let EASING_INCIRC: any

	/**
	* in-cubic
	*/
	let EASING_INCUBIC: any

	/**
	* in-elastic
	*/
	let EASING_INELASTIC: any

	/**
	* in-exponential
	*/
	let EASING_INEXPO: any

	/**
	* in-out-back
	*/
	let EASING_INOUTBACK: any

	/**
	* in-out-bounce
	*/
	let EASING_INOUTBOUNCE: any

	/**
	* in-out-circlic
	*/
	let EASING_INOUTCIRC: any

	/**
	* in-out-cubic
	*/
	let EASING_INOUTCUBIC: any

	/**
	* in-out-elastic
	*/
	let EASING_INOUTELASTIC: any

	/**
	* in-out-exponential
	*/
	let EASING_INOUTEXPO: any

	/**
	* in-out-quadratic
	*/
	let EASING_INOUTQUAD: any

	/**
	* in-out-quartic
	*/
	let EASING_INOUTQUART: any

	/**
	* in-out-quintic
	*/
	let EASING_INOUTQUINT: any

	/**
	* in-out-sine
	*/
	let EASING_INOUTSINE: any

	/**
	* in-quadratic
	*/
	let EASING_INQUAD: any

	/**
	* in-quartic
	*/
	let EASING_INQUART: any

	/**
	* in-quintic
	*/
	let EASING_INQUINT: any

	/**
	* in-sine
	*/
	let EASING_INSINE: any

	/**
	* linear interpolation
	*/
	let EASING_LINEAR: any

	/**
	* out-back
	*/
	let EASING_OUTBACK: any

	/**
	* out-bounce
	*/
	let EASING_OUTBOUNCE: any

	/**
	* out-circlic
	*/
	let EASING_OUTCIRC: any

	/**
	* out-cubic
	*/
	let EASING_OUTCUBIC: any

	/**
	* out-elastic
	*/
	let EASING_OUTELASTIC: any

	/**
	* out-exponential
	*/
	let EASING_OUTEXPO: any

	/**
	* out-in-back
	*/
	let EASING_OUTINBACK: any

	/**
	* out-in-bounce
	*/
	let EASING_OUTINBOUNCE: any

	/**
	* out-in-circlic
	*/
	let EASING_OUTINCIRC: any

	/**
	* out-in-cubic
	*/
	let EASING_OUTINCUBIC: any

	/**
	* out-in-elastic
	*/
	let EASING_OUTINELASTIC: any

	/**
	* out-in-exponential
	*/
	let EASING_OUTINEXPO: any

	/**
	* out-in-quadratic
	*/
	let EASING_OUTINQUAD: any

	/**
	* out-in-quartic
	*/
	let EASING_OUTINQUART: any

	/**
	* out-in-quintic
	*/
	let EASING_OUTINQUINT: any

	/**
	* out-in-sine
	*/
	let EASING_OUTINSINE: any

	/**
	* out-quadratic
	*/
	let EASING_OUTQUAD: any

	/**
	* out-quartic
	*/
	let EASING_OUTQUART: any

	/**
	* out-quintic
	*/
	let EASING_OUTQUINT: any

	/**
	* out-sine
	*/
	let EASING_OUTSINE: any

	/**
	* default keyboard
	*/
	let KEYBOARD_TYPE_DEFAULT: any

	/**
	* email keyboard
	*/
	let KEYBOARD_TYPE_EMAIL: any

	/**
	* number input keyboard
	*/
	let KEYBOARD_TYPE_NUMBER_PAD: any

	/**
	* password keyboard
	*/
	let KEYBOARD_TYPE_PASSWORD: any

	/**
	* elliptical pie node bounds
	*/
	let PIEBOUNDS_ELLIPSE: any

	/**
	* rectangular pie node bounds
	*/
	let PIEBOUNDS_RECTANGLE: any

	/**
	* center pivot
	*/
	let PIVOT_CENTER: any

	/**
	* east pivot
	*/
	let PIVOT_E: any

	/**
	* north pivot
	*/
	let PIVOT_N: any

	/**
	* north-east pivot
	*/
	let PIVOT_NE: any

	/**
	* north-west pivot
	*/
	let PIVOT_NW: any

	/**
	* south pivot
	*/
	let PIVOT_S: any

	/**
	* south-east pivot
	*/
	let PIVOT_SE: any

	/**
	* south-west pivot
	*/
	let PIVOT_SW: any

	/**
	* west pivot
	*/
	let PIVOT_W: any

	/**
	* loop backward
	*/
	let PLAYBACK_LOOP_BACKWARD: any

	/**
	* loop forward
	*/
	let PLAYBACK_LOOP_FORWARD: any

	/**
	* ping pong loop
	*/
	let PLAYBACK_LOOP_PINGPONG: any

	/**
	* once backward
	*/
	let PLAYBACK_ONCE_BACKWARD: any

	/**
	* once forward
	*/
	let PLAYBACK_ONCE_FORWARD: any

	/**
	* once forward and then backward
	*/
	let PLAYBACK_ONCE_PINGPONG: any

	/**
	* color property
	*/
	let PROP_COLOR: any

	/**
	* fill_angle property
	*/
	let PROP_FILL_ANGLE: any

	/**
	* inner_radius property
	*/
	let PROP_INNER_RADIUS: any

	/**
	* outline color property
	*/
	let PROP_OUTLINE: any

	/**
	* position property
	*/
	let PROP_POSITION: any

	/**
	* rotation property
	*/
	let PROP_ROTATION: any

	/**
	* scale property
	*/
	let PROP_SCALE: any

	/**
	* shadow color property
	*/
	let PROP_SHADOW: any

	/**
	* size property
	*/
	let PROP_SIZE: any

	/**
	* slice9 property
	*/
	let PROP_SLICE9: any

	/**
	* automatic size mode
	*/
	let SIZE_MODE_AUTO: any

	/**
	* manual size mode
	*/
	let SIZE_MODE_MANUAL: any

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
	function animate(node: node, property: any, to: any, easing: any, duration: number, delay?: number, complete_function?: any, playback?: any): void

	/**
	* If an animation of the specified node is currently running (started by `gui.animate`), it will immediately be canceled.
	* @param node  node that should have its animation canceled
	* @param property  property for which the animation should be canceled

- `"position"`
- `"rotation"`
- `"scale"`
- `"color"`
- `"outline"`
- `"shadow"`
- `"size"`
- `"fill_angle"` (pie)
- `"inner_radius"` (pie)
- `"slice9"` (slice9)

	*/
	function cancel_animation(node: node, property: any): void

	/**
	* Cancels any running flipbook animation on the specified node.
	* @param node  node cancel flipbook animation for
	*/
	function cancel_flipbook(node: node): void

	/**
	* cancel a spine animation
	* @param node  spine node that should cancel its animation
	*/
	function cancel_spine(node: node): void

	/**
	* Make a clone instance of a node.
	* This function does not clone the supplied node's children nodes.
	* Use gui.clone_tree for that purpose.
	* @param node  node to clone
	* @return clone  the cloned node
	*/
	function clone(node: node): node

	/**
	* Make a clone instance of a node and all its children.
	* Use gui.clone to clone a node excluding its children.
	* @param node  root node to clone
	* @return clones  a table mapping node ids to the corresponding cloned nodes
	*/
	function clone_tree(node: node): object

	/**
	* Deletes the specified node. Any child nodes of the specified node will be
	* recursively deleted.
	* @param node  node to delete
	*/
	function delete_node(node: node): void

	/**
	* Delete a dynamically created texture.
	* @param texture  texture id
	*/
	function delete_texture(texture: any): void

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
	function get_adjust_mode(node: node): any

	/**
	* Returns the blend mode of a node.
	* Blend mode defines how the node will be blended with the background.
	* @param node  node from which to get the blend mode
	* @return blend_mode  blend mode

- `gui.BLEND_ALPHA`
- `gui.BLEND_ADD`
- `gui.BLEND_ADD_ALPHA`
- `gui.BLEND_MULT`

	*/
	function get_blend_mode(node: node): any

	/**
	* If node is set as an inverted clipping node, it will clip anything inside as opposed to outside.
	* @param node  node from which to get the clipping inverted state
	* @return inverted  true or false
	*/
	function get_clipping_inverted(node: node): boolean

	/**
	* Clipping mode defines how the node will clipping it's children nodes
	* @param node  node from which to get the clipping mode
	* @return clipping_mode  clipping mode

- `gui.CLIPPING_MODE_NONE`
- `gui.CLIPPING_MODE_STENCIL`

	*/
	function get_clipping_mode(node: node): any

	/**
	* If node is set as visible clipping node, it will be shown as well as clipping. Otherwise, it will only clip but not show visually.
	* @param node  node from which to get the clipping visibility state
	* @return visible  true or false
	*/
	function get_clipping_visible(node: node): boolean

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
	function get_color(node: node): any

	/**
	* Returns the sector angle of a pie node.
	* @param node  node from which to get the fill angle
	* @return angle  sector angle
	*/
	function get_fill_angle(node: node): number

	/**
	* Get node flipbook animation.
	* @param node  node to get flipbook animation from
	* @return animation  animation id
	*/
	function get_flipbook(node: node): hash

	/**
	* This is only useful nodes with flipbook animations. Gets the normalized cursor of the flipbook animation on a node.
	* @param node  node to get the cursor for (node)
	* @return cursor  cursor value
	*/
	function get_flipbook_cursor(node: any): number

	/**
	* This is only useful nodes with flipbook animations. Gets the playback rate of the flipbook animation on a node.
	* @param node  node to set the cursor for
	* @return rate  playback rate
	*/
	function get_flipbook_playback_rate(node: node): number

	/**
	* This is only useful for text nodes. The font must be mapped to the gui scene in the gui editor.
	* @param node  node from which to get the font
	* @return font  font id
	*/
	function get_font(node: node): hash

	/**
	* Returns the scene height.
	* @return height  scene height
	*/
	function get_height(): number

	/**
	* Retrieves the id of the specified node.
	* @param node  the node to retrieve the id from
	* @return id  the id of the node
	*/
	function get_id(node: node): hash

	/**
	* Retrieve the index of the specified node.
	* The index defines the order in which a node appear in a GUI scene.
	* Higher index means the node is drawn on top of lower indexed nodes.
	* @param node  the node to retrieve the id from
	* @return index  the index of the node
	*/
	function get_index(node: node): number

	/**
	* gets the node inherit alpha state
	* @param node  node from which to get the inherit alpha state
	*/
	function get_inherit_alpha(node: node): void

	/**
	* Returns the inner radius of a pie node.
	* The radius is defined along the x-axis.
	* @param node  node from where to get the inner radius
	* @return radius  inner radius
	*/
	function get_inner_radius(node: node): number

	/**
	* The layer must be mapped to the gui scene in the gui editor.
	* @param node  node from which to get the layer
	* @return layer  layer id
	*/
	function get_layer(node: node): hash

	/**
	* gets the scene current layout
	* @return layout  layout id
	*/
	function get_layout(): hash

	/**
	* Returns the leading value for a text node.
	* @param node  node from where to get the leading
	* @return leading  leading scaling value (default=1)
	*/
	function get_leading(node: node): number

	/**
	* Returns whether a text node is in line-break mode or not.
	* This is only useful for text nodes.
	* @param node  node from which to get the line-break for
	* @return line_break  `true` or `false`
	*/
	function get_line_break(node: node): boolean

	/**
	* Retrieves the node with the specified id.
	* @param id  id of the node to retrieve
	* @return instance  a new node instance
	*/
	function get_node(id: any): node

	/**
	* Returns the outer bounds mode for a pie node.
	* @param node  node from where to get the outer bounds mode
	* @return bounds_mode  the outer bounds mode of the pie node:

- `gui.PIEBOUNDS_RECTANGLE`
- `gui.PIEBOUNDS_ELLIPSE`

	*/
	function get_outer_bounds(node: node): any

	/**
	* Returns the outline color of the supplied node.
	* See gui.get_color for info how vectors encode color values.
	* @param node  node to get the outline color from
	* @return color  outline color
	*/
	function get_outline(node: node): any

	/**
	* Returns the parent node of the specified node.
	* If the supplied node does not have a parent, `nil` is returned.
	* @param node  the node from which to retrieve its parent
	* @return parent  parent instance or nil
	*/
	function get_parent(node: node): node

	/**
	* Get the paricle fx for a gui node
	* @param node  node to get particle fx for
	* @return type_hash  particle fx id
	*/
	function get_particlefx(node: node): any | undefined

	/**
	* Returns the number of generated vertices around the perimeter
	* of a pie node.
	* @param node  pie node
	* @return vertices  vertex count
	*/
	function get_perimeter_vertices(node: node): number

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
	function get_pivot(node: node): any

	/**
	* Returns the position of the supplied node.
	* @param node  node to get the position from
	* @return position  node position
	*/
	function get_position(node: node): any

	/**
	* Returns the rotation of the supplied node.
	* The rotation is expressed in degree Euler angles.
	* @param node  node to get the rotation from
	* @return rotation  node rotation
	*/
	function get_rotation(node: node): any

	/**
	* Returns the scale of the supplied node.
	* @param node  node to get the scale from
	* @return scale  node scale
	*/
	function get_scale(node: node): any

	/**
	* Returns the screen position of the supplied node. This function returns the
	* calculated transformed position of the node, taking into account any parent node
	* transforms.
	* @param node  node to get the screen position from
	* @return position  node screen position
	*/
	function get_screen_position(node: node): any

	/**
	* Returns the shadow color of the supplied node.
	* See gui.get_color for info how vectors encode color values.
	* @param node  node to get the shadow color from
	* @return color  node shadow color
	*/
	function get_shadow(node: node): any

	/**
	* Returns the size of the supplied node.
	* @param node  node to get the size from
	* @return size  node size
	*/
	function get_size(node: node): any

	/**
	* Returns the size of a node.
	* The size mode defines how the node will adjust itself in size. Automatic
	* size mode alters the node size based on the node's content. Automatic size
	* mode works for Box nodes and Pie nodes which will both adjust their size
	* to match the assigned image. Spine, Particle fx and Text nodes will ignore
	* any size mode setting.
	* @param node  node from which to get the size mode (node)
	* @return size_mode  the current size mode

- `gui.SIZE_MODE_MANUAL`
- `gui.SIZE_MODE_AUTO`

	*/
	function get_size_mode(node: node): any

	/**
	* Returns the slice9 configuration values for the node.
	* @param node  node to manipulate
	* @return values  configuration values
	*/
	function get_slice9(node: node): any

	/**
	* Gets the playing animation on a spine node
	* @param node  node to get spine skin from
	* @return id  spine animation id, 0 if no animation is playing
	*/
	function get_spine_animation(node: node): hash

	/**
	* The returned node can be used for parenting and transform queries.
	* This function has complexity O(n), where n is the number of bones in the spine model skeleton.
	* @param node  spine node to query for bone node
	* @param bone_id  id of the corresponding bone
	* @return bone  node corresponding to the spine bone
	*/
	function get_spine_bone(node: node, bone_id: any): node

	/**
	* This is only useful for spine nodes. Gets the normalized cursor of the animation on a spine node.
	* @param node  spine node to get the cursor for (node)
	* @return cursor  cursor value
	*/
	function get_spine_cursor(node: any): number

	/**
	* This is only useful for spine nodes. Gets the playback rate of the animation on a spine node.
	* @param node  spine node to set the cursor for
	* @return rate  playback rate
	*/
	function get_spine_playback_rate(node: node): number

	/**
	* Returns the spine scene id of the supplied node.
	* This is currently only useful for spine nodes.
	* The returned spine scene must be mapped to the gui scene in the gui editor.
	* @param node  node to get texture from
	* @return spine_scene  spine scene id
	*/
	function get_spine_scene(node: node): hash

	/**
	* Gets the spine skin of a spine node
	* @param node  node to get spine skin from
	* @return id  spine skin id, 0 if no explicit skin is set
	*/
	function get_spine_skin(node: node): hash

	/**
	* Returns the text value of a text node. This is only useful for text nodes.
	* @param node  node from which to get the text
	* @return text  text value
	*/
	function get_text(node: node): string

	/**
	* Get text metrics given the provided font, text and parameters.
	* @param font  font id
	* @param text  text to measure
	* @param width  max-width. Use for line-breaks (default=FLT_MAX)
	* @param line_break  true to break lines accordingly to width (default=false)
	* @param leading  scale value for line spacing (default=1)
	* @param tracking  scale value for letter spacing (default=0)
	* @return metrics  a table with the following fields:

- width
- height
- max_ascent
- max_descent

	*/
	function get_text_metrics(font: any, text: string, width: number, line_break: boolean, leading: number, tracking: number): object

	/**
	* Get the text metrics from a text node.
	* @param node  text node to measure text from
	* @return metrics  a table with the following fields:

- width
- height
- max_ascent
- max_descent

	*/
	function get_text_metrics_from_node(node: node): object

	/**
	* Returns the texture of a node.
	* This is currently only useful for box or pie nodes.
	* The texture must be mapped to the gui scene in the gui editor.
	* @param node  node to get texture from
	* @return texture  texture id
	*/
	function get_texture(node: node): hash

	/**
	* Returns the tracking value of a text node.
	* @param node  node from where to get the tracking
	* @return tracking  tracking scaling number (default=0)
	*/
	function get_tracking(node: node): number

	/**
	* Returns the scene width.
	* @return width  scene width
	*/
	function get_width(): number

	/**
	* The x-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to get x-anchor from
	* @return anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_LEFT`
- `gui.ANCHOR_RIGHT`

	*/
	function get_xanchor(node: node): any

	/**
	* The y-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to get y-anchor from
	* @return anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_TOP`
- `gui.ANCHOR_BOTTOM`

	*/
	function get_yanchor(node: node): any

	/**
	* Hides the on-display touch keyboard on the device.
	*/
	function hide_keyboard(): void

	/**
	* Returns `true` if a node is enabled and `false` if it's not.
	* Disabled nodes are not rendered and animations acting on them are not evaluated.
	* @param node  node to query
	* @return enabled  whether the node is enabled or not
	*/
	function is_enabled(node: node): boolean

	/**
	* Alters the ordering of the two supplied nodes by moving the first node
	* above the second.
	* If the second argument is `nil` the first node is moved to the top.
	* @param node  to move
	* @param node  reference node above which the first node should be moved
	*/
	function move_above(node: node, node1: any): void

	/**
	* Alters the ordering of the two supplied nodes by moving the first node
	* below the second.
	* If the second argument is `nil` the first node is moved to the bottom.
	* @param node  to move
	* @param node  reference node below which the first node should be moved
	*/
	function move_below(node: node, node1: any): void

	/**
	* Dynamically create a new box node.
	* @param pos  node position
	* @param size  node size
	* @return node  new box node
	*/
	function new_box_node(pos: any, size: any): node

	/**
	* Dynamically create a particle fx node.
	* @param pos  node position
	* @param particlefx  particle fx resource name
	* @return node  new particle fx node
	*/
	function new_particlefx_node(pos: any, particlefx: any): node

	/**
	* Dynamically create a new pie node.
	* @param pos  node position
	* @param size  node size
	* @return node  new pie node
	*/
	function new_pie_node(pos: any, size: any): node

	/**
	* Dynamically create a new spine node.
	* @param pos  node position
	* @param spine_scene  spine scene id
	* @return node  new spine node
	*/
	function new_spine_node(pos: any, spine_scene: any): node

	/**
	* Dynamically create a new text node.
	* @param pos  node position
	* @param text  node text
	* @return node  new text node
	*/
	function new_text_node(pos: any, text: string): node

	/**
	* Dynamically create a new texture.
	* @param texture  texture id
	* @param width  texture width
	* @param height  texture height
	* @param type  texture type

- `"rgb"` - RGB
- `"rgba"` - RGBA
- `"l"` - LUMINANCE

	* @param buffer  texture data
	* @param flip  flip texture vertically
	* @return success  texture creation was successful
	*/
	function new_texture(texture: any, width: number, height: number, type: any, buffer: string, flip: boolean): boolean

	/**
	* Tests whether a coordinate is within the bounding box of a
	* node.
	* @param node  node to be tested for picking
	* @param x  x-coordinate (see on_input )
	* @param y  y-coordinate (see on_input )
	* @return pickable  pick result
	*/
	function pick_node(node: node, x: number, y: number): boolean

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
	function play_flipbook(node: node, animation: any, complete_function?: any, play_properties?: object): void

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
	function play_particlefx(node: node, emitter_state_function?: any): void

	/**
	* Starts a spine animation.
	* @param node  spine node that should play the animation
	* @param animation_id  id of the animation to play
	* @param playback  playback mode

- `gui.PLAYBACK_ONCE_FORWARD`
- `gui.PLAYBACK_ONCE_BACKWARD`
- `gui.PLAYBACK_ONCE_PINGPONG`
- `gui.PLAYBACK_LOOP_FORWARD`
- `gui.PLAYBACK_LOOP_BACKWARD`
- `gui.PLAYBACK_LOOP_PINGPONG`

	* @param play_properties  optional table with properties

`blend_duration`
The duration of a linear blend between the current and new animation
`offset`
The normalized initial value of the animation cursor when the animation starts playing
`playback_rate`
The rate with which the animation will be played. Must be positive

	* @param complete_function  function to call when the animation has completed
	*/
	function play_spine_anim(node: node, animation_id: any, playback: any, play_properties?: object, complete_function?: any): void

	/**
	* Resets the input context of keyboard. This will clear marked text.
	*/
	function reset_keyboard(): void

	/**
	* Resets all nodes in the current GUI scene to their initial state.
	* The reset only applies to static node loaded from the scene.
	* Nodes that are created dynamically from script are not affected.
	*/
	function reset_nodes(): void

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
	function set_adjust_mode(node: node, adjust_mode: any): void

	/**
	* Set the blend mode of a node.
	* Blend mode defines how the node will be blended with the background.
	* @param node  node to set blend mode for
	* @param blend_mode  blend mode to set

- `gui.BLEND_ALPHA`
- `gui.BLEND_ADD`
- `gui.BLEND_ADD_ALPHA`
- `gui.BLEND_MULT`

	*/
	function set_blend_mode(node: node, blend_mode: any): void

	/**
	* If node is set as an inverted clipping node, it will clip anything inside as opposed to outside.
	* @param node  node to set clipping inverted state for
	* @param inverted  true or false
	*/
	function set_clipping_inverted(node: node, inverted: boolean): void

	/**
	* Clipping mode defines how the node will clipping it's children nodes
	* @param node  node to set clipping mode for
	* @param clipping_mode  clipping mode to set

- `gui.CLIPPING_MODE_NONE`
- `gui.CLIPPING_MODE_STENCIL`

	*/
	function set_clipping_mode(node: node, clipping_mode: any): void

	/**
	* If node is set as an visible clipping node, it will be shown as well as clipping. Otherwise, it will only clip but not show visually.
	* @param node  node to set clipping visibility for
	* @param visible  true or false
	*/
	function set_clipping_visible(node: node, visible: boolean): void

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
	function set_color(node: node, color: any): void

	/**
	* Sets a node to the disabled or enabled state.
	* Disabled nodes are not rendered and animations acting on them are not evaluated.
	* @param node  node to be enabled/disabled
	* @param enabled  whether the node should be enabled or not
	*/
	function set_enabled(node: node, enabled: boolean): void

	/**
	* Set the sector angle of a pie node.
	* @param node  node to set the fill angle for
	* @param angle  sector angle
	*/
	function set_fill_angle(node: node, angle: number): void

	/**
	* This is only useful nodes with flipbook animations. The cursor is normalized.
	* @param node  node to set the cursor for
	* @param cursor  cursor value
	*/
	function set_flipbook_cursor(node: node, cursor: number): void

	/**
	* This is only useful nodes with flipbook animations. Sets the playback rate of the flipbook animation on a node. Must be positive.
	* @param node  node to set the cursor for
	* @param playback_rate  playback rate
	*/
	function set_flipbook_playback_rate(node: node, playback_rate: number): void

	/**
	* This is only useful for text nodes.
	* The font must be mapped to the gui scene in the gui editor.
	* @param node  node for which to set the font
	* @param font  font id
	*/
	function set_font(node: node, font: any): void

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
	function set_id(node: node, id: any): void

	/**
	* sets the node inherit alpha state
	* @param node  node from which to set the inherit alpha state
	* @param inherit_alpha  true or false
	*/
	function set_inherit_alpha(node: node, inherit_alpha: boolean): void

	/**
	* Sets the inner radius of a pie node.
	* The radius is defined along the x-axis.
	* @param node  node to set the inner radius for
	* @param radius  inner radius
	*/
	function set_inner_radius(node: node, radius: number): void

	/**
	* The layer must be mapped to the gui scene in the gui editor.
	* @param node  node for which to set the layer
	* @param layer  layer id
	*/
	function set_layer(node: node, layer: any): void

	/**
	* Sets the leading value for a text node. This value is used to
	* scale the line spacing of text.
	* @param node  node for which to set the leading
	* @param leading  a scaling value for the line spacing (default=1)
	*/
	function set_leading(node: node, leading: number): void

	/**
	* Sets the line-break mode on a text node.
	* This is only useful for text nodes.
	* @param node  node to set line-break for
	* @param line_break  true or false
	*/
	function set_line_break(node: node, line_break: boolean): void

	/**
	* Sets the outer bounds mode for a pie node.
	* @param node  node for which to set the outer bounds mode
	* @param bounds_mode  the outer bounds mode of the pie node:

- `gui.PIEBOUNDS_RECTANGLE`
- `gui.PIEBOUNDS_ELLIPSE`

	*/
	function set_outer_bounds(node: node, bounds_mode: any): void

	/**
	* Sets the outline color of the supplied node.
	* See gui.set_color for info how vectors encode color values.
	* @param node  node to set the outline color for
	* @param color  new outline color
	*/
	function set_outline(node: node, color: any): void

	/**
	* Sets the parent node of the specified node.
	* @param node  node for which to set its parent
	* @param parent  parent node to set
	* @param keep_scene_transform  optional flag to make the scene position being perserved
	*/
	function set_parent(node: node, parent: node, keep_scene_transform: boolean): void

	/**
	* Set the paricle fx for a gui node
	* @param node  node to set particle fx for
	* @param particlefx  particle fx id
	*/
	function set_particlefx(node: node, particlefx: any): void

	/**
	* Sets the number of generated vertices around the perimeter of a pie node.
	* @param node  pie node
	* @param vertices  vertex count
	*/
	function set_perimeter_vertices(node: node, vertices: number): void

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
	function set_pivot(node: node, pivot: any): void

	/**
	* Sets the position of the supplied node.
	* @param node  node to set the position for
	* @param position  new position
	*/
	function set_position(node: node, position: any): void

	/**
	* Set the order number for the current GUI scene.
	* The number dictates the sorting of the "gui" render predicate,
	* in other words in which order the scene will be rendered in relation
	* to other currently rendered GUI scenes.
	* The number must be in the range 0 to 15.
	* @param order  rendering order (0-15)
	*/
	function set_render_order(order: number): void

	/**
	* Sets the rotation of the supplied node.
	* The rotation is expressed in degree Euler angles.
	* @param node  node to set the rotation for
	* @param rotation  new rotation
	*/
	function set_rotation(node: node, rotation: any): void

	/**
	* Sets the scaling of the supplied node.
	* @param node  node to set the scale for
	* @param scale  new scale
	*/
	function set_scale(node: node, scale: any): void

	/**
	* Sets the shadow color of the supplied node.
	* See gui.set_color for info how vectors encode color values.
	* @param node  node to set the shadow color for
	* @param color  new shadow color
	*/
	function set_shadow(node: node, color: any): void

	/**
	* Sets the size of the supplied node.
	* ⚠ You can only set size on nodes with size mode set to SIZE_MODE_MANUAL
	* @param node  node to set the size for
	* @param size  new size
	*/
	function set_size(node: node, size: any): void

	/**
	* Sets the size mode of a node.
	* The size mode defines how the node will adjust itself in size. Automatic
	* size mode alters the node size based on the node's content. Automatic size
	* mode works for Box nodes and Pie nodes which will both adjust their size
	* to match the assigned image. Spine, Particle fx and Text nodes will ignore
	* any size mode setting.
	* @param node  node to set size mode for
	* @param size_mode  size mode to set

- `gui.SIZE_MODE_MANUAL`
- `gui.SIZE_MODE_AUTO`

	*/
	function set_size_mode(node: node, size_mode: any): void

	/**
	* Set the slice9 configuration values for the node.
	* @param node  node to manipulate
	* @param values  new values
	*/
	function set_slice9(node: node, values: any): void

	/**
	* This is only useful for spine nodes. The cursor is normalized.
	* @param node  spine node to set the cursor for
	* @param cursor  cursor value
	*/
	function set_spine_cursor(node: node, cursor: number): void

	/**
	* This is only useful for spine nodes. Sets the playback rate of the animation on a spine node. Must be positive.
	* @param node  spine node to set the cursor for
	* @param playback_rate  playback rate
	*/
	function set_spine_playback_rate(node: node, playback_rate: number): void

	/**
	* Set the spine scene on a spine node. The spine scene must be mapped to the gui scene in the gui editor.
	* @param node  node to set spine scene for
	* @param spine_scene  spine scene id
	*/
	function set_spine_scene(node: node, spine_scene: any): void

	/**
	* Sets the spine skin on a spine node.
	* @param node  node to set the spine skin on
	* @param spine_skin  spine skin id
	* @param spine_slot  optional slot id to only change a specific slot
	*/
	function set_spine_skin(node: node, spine_skin: any, spine_slot?: any): void

	/**
	* Set the text value of a text node. This is only useful for text nodes.
	* @param node  node to set text for
	* @param text  text to set
	*/
	function set_text(node: node, text: string): void

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
	function set_texture(node: node, texture: any): void

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
	function set_texture_data(texture: any, width: number, height: number, type: any, buffer: string, flip: boolean): boolean

	/**
	* Sets the tracking value of a text node. This value is used to
	* adjust the vertical spacing of characters in the text.
	* @param node  node for which to set the tracking
	* @param tracking  a scaling number for the letter spacing (default=0)
	*/
	function set_tracking(node: node, tracking: number): void

	/**
	* The x-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to set x-anchor for
	* @param anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_LEFT`
- `gui.ANCHOR_RIGHT`

	*/
	function set_xanchor(node: node, anchor: any): void

	/**
	* The y-anchor specifies how the node is moved when the game is run in a different resolution.
	* @param node  node to set y-anchor for
	* @param anchor  anchor constant

- `gui.ANCHOR_NONE`
- `gui.ANCHOR_TOP`
- `gui.ANCHOR_BOTTOM`

	*/
	function set_yanchor(node: node, anchor: any): void

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
	function show_keyboard(type: any, autoclose: boolean): void

	/**
	* Stops the particle fx for a gui node
	* @param node  node to stop particle fx for
	*/
	function stop_particlefx(node: node): void

	/**
	* This is a callback-function, which is called by the engine when a gui component is initialized. It can be used
	* to set the initial state of the script and gui scene.
	* @param self  reference to the script state to be used for storing data
	*/
	function init(self: object): void

	/**
	* This message is broadcast to every GUI component when a layout change has been initiated
	* on device.
	*/
	//let layout_changed: string

	/**
	* The material used when rendering the gui. The type of the property is hash.
	*/
	let material: any

	/**
	* This is a callback-function, which is called by the engine when user input is sent to the instance of the gui component.
	* It can be used to take action on the input, e.g. modify the gui according to the input.
	* For an instance to obtain user input, it must first acquire input
	* focus through the message `acquire_input_focus`.
	* Any instance that has obtained input will be put on top of an
	* input stack. Input is sent to all listeners on the stack until the
	* end of stack is reached, or a listener returns `true`
	* to signal that it wants input to be consumed.
	* See the documentation of acquire_input_focus for more
	* information.
	* The `action` parameter is a table containing data about the input mapped to the
	* `action_id`.
	* For mapped actions it specifies the value of the input and if it was just pressed or released.
	* Actions are mapped to input in an input_binding-file.
	* Mouse movement is specifically handled and uses `nil` as its `action_id`.
	* The `action` only contains positional parameters in this case, such as x and y of the pointer.
	* Here is a brief description of the available table fields:
	* 
	* 
	* 
	* Field
	* Description
	* 
	* 
	* 
	* 
	* `value`
	* The amount of input given by the user. This is usually 1 for buttons and 0-1 for analogue inputs. This is not present for mouse movement.
	* 
	* 
	* `pressed`
	* If the input was pressed this frame. This is not present for mouse movement.
	* 
	* 
	* `released`
	* If the input was released this frame. This is not present for mouse movement.
	* 
	* 
	* `repeated`
	* If the input was repeated this frame. This is similar to how a key on a keyboard is repeated when you hold it down. This is not present for mouse movement.
	* 
	* 
	* `x`
	* The x value of a pointer device, if present.
	* 
	* 
	* `y`
	* The y value of a pointer device, if present.
	* 
	* 
	* `screen_x`
	* The screen space x value of a pointer device, if present.
	* 
	* 
	* `screen_y`
	* The screen space y value of a pointer device, if present.
	* 
	* 
	* `dx`
	* The change in x value of a pointer device, if present.
	* 
	* 
	* `dy`
	* The change in y value of a pointer device, if present.
	* 
	* 
	* `screen_dx`
	* The change in screen space x value of a pointer device, if present.
	* 
	* 
	* `screen_dy`
	* The change in screen space y value of a pointer device, if present.
	* 
	* 
	* `gamepad`
	* The index of the gamepad device that provided the input.
	* 
	* 
	* `touch`
	* List of touch input, one element per finger, if present. See table below about touch input
	* 
	* 
	* 
	* Touch input table:
	* 
	* 
	* 
	* Field
	* Description
	* 
	* 
	* 
	* 
	* `id`
	* A number identifying the touch input during its duration.
	* 
	* 
	* `pressed`
	* True if the finger was pressed this frame.
	* 
	* 
	* `released`
	* True if the finger was released this frame.
	* 
	* 
	* `tap_count`
	* Number of taps, one for single, two for double-tap, etc
	* 
	* 
	* `x`
	* The x touch location.
	* 
	* 
	* `y`
	* The y touch location.
	* 
	* 
	* `dx`
	* The change in x value.
	* 
	* 
	* `dy`
	* The change in y value.
	* 
	* 
	* `acc_x`
	* Accelerometer x value (if present).
	* 
	* 
	* `acc_y`
	* Accelerometer y value (if present).
	* 
	* 
	* `acc_z`
	* Accelerometer z value (if present).
	* 
	* 
	* 
	* @param self  reference to the script state to be used for storing data
	* @param action_id  id of the received input action, as mapped in the input_binding-file
	* @param action  a table containing the input data, see above for a description
	* @return consume  optional boolean to signal if the input should be consumed (not passed on to others) or not, default is false
	*/
	function on_input(self: object, action_id: hash, action: object): boolean | undefined

	/**
	* This is a callback-function, which is called by the engine whenever a message has been sent to the gui component.
	* It can be used to take action on the message, e.g. update the gui or send a response back to the sender of the message.
	* The `message` parameter is a table containing the message data. If the message is sent from the engine, the
	* documentation of the message specifies which data is supplied.
	* See the update function for examples on how to use this callback-function.
	* @param self  reference to the script state to be used for storing data
	* @param message_id  id of the received message
	* @param message  a table containing the message data
	*/
	function on_message(self: object, message_id: hash, message: object): void

	/**
	* 
	* This is a callback-function, which is called by the engine when the gui script is reloaded, e.g. from the editor.
	* It can be used for live development, e.g. to tweak constants or set up the state properly for the script.
	* 
	* @param self  reference to the script state to be used for storing data
	*/
	function on_reload(self: object): void

	/**
	* This is a callback-function, which is called by the engine every frame to update the state of a gui component.
	* It can be used to perform any kind of gui related tasks, e.g. animating nodes.
	* @param self  reference to the script state to be used for storing data
	* @param dt  the time-step of the frame update
	*/
	function update(self: object, dt: number): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace physics {

	/**
	* The angular damping value for the collision object. Setting this value alters the damping of
	* angular motion of the object (rotation). Valid values are between 0 (no damping) and 1 (full damping).
	*/
	let angular_damping: any

	/**
	* vector3.
	* The velocity is measured as a rotation around the vector with a speed equivalent to the vector length
	* in radians/s.
	*/
	let angular_velocity: any

	/**
	* Post this message to a collision-object-component to apply the specified force on the collision object.
	* The collision object must be dynamic.
	*/
	//let apply_force: string

	/**
	* This message is broadcasted to every component of an instance that has a collision object,
	* when the collision object collides with another collision object. For a script to take action
	* when such a collision happens, it should check for this message in its `on_message` callback
	* function.
	* This message only reports that a collision actually happened and will only be sent once per
	* colliding pair and frame.
	* To retrieve more detailed information, check for the `contact_point_response` instead.
	*/
	//let collision_response: string

	/**
	* This message is broadcasted to every component of an instance that has a collision object,
	* when the collision object has contact points with respect to another collision object.
	* For a script to take action when such contact points occur, it should check for this message
	* in its `on_message` callback function.
	* Since multiple contact points can occur for two colliding objects, this message can be sent
	* multiple times in the same frame for the same two colliding objects. To only be notified once
	* when the collision occurs, check for the `collision_response` message instead.
	*/
	//let contact_point_response: string

	/**
	* The linear damping value for the collision object. Setting this value alters the damping of
	* linear motion of the object. Valid values are between 0 (no damping) and 1 (full damping).
	*/
	let linear_damping: any

	/**
	* READ ONLY Returns the current linear velocity of the collision object component as a vector3.
	* The velocity is measured in units/s (pixels/s).
	*/
	let linear_velocity: any

	/**
	* READ ONLY Returns the defined physical mass of the collision object component as a number.
	*/
	let mass: any

	/**
	* fixed joint type
	*/
	let JOINT_TYPE_FIXED: any

	/**
	* hinge joint type
	*/
	let JOINT_TYPE_HINGE: any

	/**
	* slider joint type
	*/
	let JOINT_TYPE_SLIDER: any

	/**
	* spring joint type
	*/
	let JOINT_TYPE_SPRING: any

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
	function create_joint(joint_type: number, collisionobject_a: any, joint_id: any, position_a: any, collisionobject_b: any, position_b: any, properties?: object): void

	/**
	* Destroy an already physics joint. The joint has to be created before a
	* destroy can be issued.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	*/
	function destroy_joint(collisionobject: any, joint_id: any): void

	/**
	* Get the gravity in runtime. The gravity returned is not global, it will return
	* the gravity for the collection that the function is called from.
	* Note: For 2D physics the z component will always be zero.
	* @return type_vector3  gravity vector of collection
	*/
	function get_gravity(): any | undefined

	/**
	* Get a table for properties for a connected joint. The joint has to be created before
	* properties can be retrieved.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	* @return type_table  properties table. See the joint types for what fields are available, the only field available for all types is:

`collide_connected`: Set this flag to true if the attached bodies should collide.

	*/
	function get_joint_properties(collisionobject: any, joint_id: any): boolean | undefined

	/**
	* Get the reaction force for a joint. The joint has to be created before
	* the reaction force can be calculated.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	* @return force  reaction force for the joint
	*/
	function get_joint_reaction_force(collisionobject: any, joint_id: any): any

	/**
	* Get the reaction torque for a joint. The joint has to be created before
	* the reaction torque can be calculated.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	* @return torque  the reaction torque on bodyB in N*m.
	*/
	function get_joint_reaction_torque(collisionobject: any, joint_id: any): any

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

	* @return result  It returns a list. If missed it returns nil. See `ray_cast_response` for details on the returned values.
	*/
	function raycast(from: any, to: any, groups: object, options: object): object

	/**
	* Ray casts are used to test for intersections against collision objects in the physics world.
	* Collision objects of types kinematic, dynamic and static are tested against. Trigger objects
	* do not intersect with ray casts.
	* Which collision objects to hit is filtered by their collision groups and can be configured
	* through `groups`.
	* The actual ray cast will be performed during the physics-update.
	* 
	* - If an object is hit, the result will be reported via a `ray_cast_response` message.
	* - If there is no object hit, the result will be reported via a `ray_cast_missed` message.
	* 
	* @param from  the world position of the start of the ray
	* @param to  the world position of the end of the ray
	* @param groups  a lua table containing the hashed groups for which to test collisions against
	* @param request_id  a number between [0,-255]. It will be sent back in the response for identification, 0 by default
	*/
	function raycast_async(from: any, to: any, groups: object, request_id?: number): void

	/**
	* Set the gravity in runtime. The gravity change is not global, it will only affect
	* the collection that the function is called from.
	* Note: For 2D physics the z component of the gravity vector will be ignored.
	* @param gravity  the new gravity vector
	*/
	function set_gravity(gravity: any): void

	/**
	* Flips the collision shapes horizontally for a collision object
	* @param url  the collision object that should flip its shapes
	* @param flip  `true` if the collision object should flip its shapes, `false` if not
	*/
	function set_hflip(url: any, flip: boolean): void

	/**
	* Updates the properties for an already connected joint. The joint has to be created before
	* properties can be changed.
	* Note: Currently only supported in 2D physics.
	* @param collisionobject  collision object where the joint exist
	* @param joint_id  id of the joint
	* @param properties  joint specific properties table
Note: The `collide_connected` field cannot be updated/changed after a connection has been made.
	*/
	function set_joint_properties(collisionobject: any, joint_id: any, properties: object): void

	/**
	* Flips the collision shapes vertically for a collision object
	* @param url  the collision object that should flip its shapes
	* @param flip  `true` if the collision object should flip its shapes, `false` if not
	*/
	function set_vflip(url: any, flip: boolean): void

	/**
	* This message is sent back to the sender of a `ray_cast_request`, if the ray didn't hit any
	* collision object. See `physics.raycast_async` for examples of how to use it.
	*/
	//let ray_cast_missed: string

	/**
	* This message is sent back to the sender of a `ray_cast_request`, if the ray hit a
	* collision object. See `physics.raycast_async` for examples of how to use it.
	*/
	//let ray_cast_response: string

	/**
	* This message is broadcasted to every component of an instance that has a collision object,
	* when the collision object interacts with another collision object and one of them is a trigger.
	* For a script to take action when such an interaction happens, it should check for this message
	* in its `on_message` callback function.
	* This message only reports that an interaction actually happened and will only be sent once per
	* colliding pair and frame. To retrieve more detailed information, check for the
	* `contact_point_response` instead.
	*/
	//let trigger_response: string

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace profiler {

	/**
	* pause on current frame
	*/
	let MODE_PAUSE: any

	/**
	* start recording
	*/
	let MODE_RECORD: any

	/**
	* continously show latest frame
	*/
	let MODE_RUN: any

	/**
	* pause at peak frame
	*/
	let MODE_SHOW_PEAK_FRAME: any

	/**
	* show full profiler ui
	*/
	let VIEW_MODE_FULL: any

	/**
	* show mimimal profiler ui
	*/
	let VIEW_MODE_MINIMIZED: any

	/**
	* Creates and shows or hides and destroys the on-sceen profiler ui
	* The profiler is a real-time tool that shows the numbers of milliseconds spent
	* in each scope per frame as well as counters. The profiler is very useful for
	* tracking down performance and resource problems.
	* @param enabled  true to enable, false to disable
	*/
	function enable_ui(enabled: boolean): void

	/**
	* Get the percent of CPU usage by the application, as reported by the OS.
	* 🌎 HTML5.
	* 🌎 Windows), this information is only available
	* by default in the debug version of the engine. It can be enabled in release version as well
	* by checking `track_cpu` under `profiler` in the `game.project` file.
	* (This means that the engine will sample the CPU usage in intervalls during execution even in release mode.)
	* @return percent  of CPU used by the application
	*/
	function get_cpu_usage(): number

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
	function get_memory_usage(): number

	/**
	* Get the number of recorded frames in the on-screen profiler ui recording buffer
	* @return frame_count  the number of recorded frames, zero if on-screen profiler is disabled
	*/
	function recorded_frame_count(): number

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
	function set_ui_mode(mode: any): void

	/**
	* Set the on-screen profile view mode - minimized or expanded
	* @param mode  the view mode to set the ui profiler in

- `profiler.VIEW_MODE_FULL` The default mode which displays all the ui profiler details
- `profiler.VIEW_MODE_MINIMIZED` Minimized mode which only shows the top header (fps counters and ui profiler mode)

	*/
	function set_ui_view_mode(mode: any): void

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
	function set_ui_vsync_wait_visible(visible: boolean): void

	/**
	* Pauses and displays a frame from the recording buffer in the on-screen profiler ui
	* The frame to show can either be an absolute frame or a relative frame to the current frame.
	* @param frame_index  a table where you specify one of the following parameters:

- `distance` The offset from the currently displayed frame (this is truncated between zero and the number of recorded frames)
- `frame` The frame index in the recording buffer (1 is first recorded frame)

	*/
	function view_recorded_frame(frame_index: object): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace render {

	/**
	* Set render clear color. This is the color that appears on the screen where nothing is rendered, i.e. background.
	*/
	//let clear_color: string

	/**
	* Draw a text on the screen. This should be used for debugging purposes only.
	*/
	//let draw_debug_text: string

	/**
	* Draw a line on the screen. This should mostly be used for debugging purposes.
	*/
	//let draw_line: string

	/**
	* 
	*/
	let BLEND_CONSTANT_ALPHA: any

	/**
	* 
	*/
	let BLEND_CONSTANT_COLOR: any

	/**
	* 
	*/
	let BLEND_DST_ALPHA: any

	/**
	* 
	*/
	let BLEND_DST_COLOR: any

	/**
	* 
	*/
	let BLEND_ONE: any

	/**
	* 
	*/
	let BLEND_ONE_MINUS_CONSTANT_ALPHA: any

	/**
	* 
	*/
	let BLEND_ONE_MINUS_CONSTANT_COLOR: any

	/**
	* 
	*/
	let BLEND_ONE_MINUS_DST_ALPHA: any

	/**
	* 
	*/
	let BLEND_ONE_MINUS_DST_COLOR: any

	/**
	* 
	*/
	let BLEND_ONE_MINUS_SRC_ALPHA: any

	/**
	* 
	*/
	let BLEND_ONE_MINUS_SRC_COLOR: any

	/**
	* 
	*/
	let BLEND_SRC_ALPHA: any

	/**
	* 
	*/
	let BLEND_SRC_ALPHA_SATURATE: any

	/**
	* 
	*/
	let BLEND_SRC_COLOR: any

	/**
	* 
	*/
	let BLEND_ZERO: any

	/**
	* 
	*/
	let BUFFER_COLOR_BIT: any

	/**
	* 
	*/
	let BUFFER_DEPTH_BIT: any

	/**
	* 
	*/
	let BUFFER_STENCIL_BIT: any

	/**
	* 
	*/
	let COMPARE_FUNC_ALWAYS: any

	/**
	* 
	*/
	let COMPARE_FUNC_EQUAL: any

	/**
	* 
	*/
	let COMPARE_FUNC_GEQUAL: any

	/**
	* 
	*/
	let COMPARE_FUNC_GREATER: any

	/**
	* 
	*/
	let COMPARE_FUNC_LEQUAL: any

	/**
	* 
	*/
	let COMPARE_FUNC_LESS: any

	/**
	* 
	*/
	let COMPARE_FUNC_NEVER: any

	/**
	* 
	*/
	let COMPARE_FUNC_NOTEQUAL: any

	/**
	* 
	*/
	let FACE_BACK: any

	/**
	* 
	*/
	let FACE_FRONT: any

	/**
	* 
	*/
	let FACE_FRONT_AND_BACK: any

	/**
	* 
	*/
	let FILTER_LINEAR: any

	/**
	* 
	*/
	let FILTER_NEAREST: any

	/**
	* 
	*/
	let FORMAT_DEPTH: any

	/**
	* 
	*/
	let FORMAT_LUMINANCE: any

	/**
	* 
	*/
	let FORMAT_RGB: any

	/**
	* 
	*/
	let FORMAT_RGBA: any

	/**
	* 
	*/
	let FORMAT_RGBA_DXT1: any

	/**
	* 
	*/
	let FORMAT_RGBA_DXT3: any

	/**
	* 
	*/
	let FORMAT_RGBA_DXT5: any

	/**
	* 
	*/
	let FORMAT_RGB_DXT1: any

	/**
	* 
	*/
	let FORMAT_STENCIL: any

	/**
	* 
	*/
	let RENDER_TARGET_DEFAULT: any

	/**
	* 
	*/
	let STATE_BLEND: any

	/**
	* 
	*/
	let STATE_CULL_FACE: any

	/**
	* 
	*/
	let STATE_DEPTH_TEST: any

	/**
	* 
	*/
	let STATE_POLYGON_OFFSET_FILL: any

	/**
	* 
	*/
	let STATE_STENCIL_TEST: any

	/**
	* 
	*/
	let STENCIL_OP_DECR: any

	/**
	* 
	*/
	let STENCIL_OP_DECR_WRAP: any

	/**
	* 
	*/
	let STENCIL_OP_INCR: any

	/**
	* 
	*/
	let STENCIL_OP_INCR_WRAP: any

	/**
	* 
	*/
	let STENCIL_OP_INVERT: any

	/**
	* 
	*/
	let STENCIL_OP_KEEP: any

	/**
	* 
	*/
	let STENCIL_OP_REPLACE: any

	/**
	* 
	*/
	let STENCIL_OP_ZERO: any

	/**
	* 
	*/
	let WRAP_CLAMP_TO_BORDER: any

	/**
	* 
	*/
	let WRAP_CLAMP_TO_EDGE: any

	/**
	* 
	*/
	let WRAP_MIRRORED_REPEAT: any

	/**
	* 
	*/
	let WRAP_REPEAT: any

	/**
	* Clear buffers in the currently enabled render target with specified value.
	* @param buffers  table with keys specifying which buffers to clear and values set to clear values. Available keys are:

- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	*/
	function clear(buffers: object): void

	/**
	* Constant buffers are used to set shader program variables and are optionally passed to the `render.draw()` function. The buffer's constant elements can be indexed like an ordinary Lua table, but you can't iterate over them with pairs() or ipairs().
	* @return buffer  new constant buffer
	*/
	function constant_buffer(): any

	/**
	* Deletes a previously created render target.
	* @param render_target  render target to delete
	*/
	function delete_render_target(render_target: any): void

	/**
	* If a material is currently enabled, disable it.
	* The name of the material must be specified in the ".render" resource set
	* in the "game.project" setting.
	*/
	function disable_material(): void

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
	function disable_state(state: any): void

	/**
	* Disables a texture unit for a render target that has previourly been enabled.
	* @param unit  texture unit to disable
	*/
	function disable_texture(unit: number): void

	/**
	* Draws all objects that match a specified predicate. An optional constant buffer can be
	* provided to override the default constants. If no constants buffer is provided, a default
	* system constants buffer is used containing constants as defined in materials and set through
	* go.set (or particlefx.set_constant) on visual components.
	* @param predicate  predicate to draw for
	* @param constants  optional constants to use while rendering
	*/
	function draw(predicate: any, constants?: any): void

	/**
	* Draws all 3d debug graphics such as lines drawn with "draw_line" messages and physics visualization.
	*/
	function draw_debug3d(): void

	/**
	* If another material was already enabled, it will be automatically disabled
	* and the specified material is used instead.
	* The name of the material must be specified in the ".render" resource set
	* in the "game.project" setting.
	* @param material_id  material id to enable
	*/
	function enable_material(material_id: any): void

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
	function enable_state(state: any): void

	/**
	* Sets the specified render target's specified buffer to be
	* used as texture with the specified unit.
	* A material shader can then use the texture to sample from.
	* @param unit  texture unit to enable texture for
	* @param render_target  render target from which to enable the specified texture unit
	* @param buffer_type  buffer type from which to enable the texture

- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	*/
	function enable_texture(unit: number, render_target: any, buffer_type: any): void

	/**
	* Returns the logical window height that is set in the "game.project" settings.
	* Note that the actual window pixel size can change, either by device constraints
	* or user input.
	* @return height  specified window height
	*/
	function get_height(): number

	/**
	* Returns the specified buffer height from a render target.
	* @param render_target  render target from which to retrieve the buffer height
	* @param buffer_type  which type of buffer to retrieve the height from

- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	* @return height  the height of the render target buffer texture
	*/
	function get_render_target_height(render_target: any, buffer_type: any): number

	/**
	* Returns the specified buffer width from a render target.
	* @param render_target  render target from which to retrieve the buffer width
	* @param buffer_type  which type of buffer to retrieve the width from

- `render.BUFFER_COLOR_BIT`
- `render.BUFFER_DEPTH_BIT`
- `render.BUFFER_STENCIL_BIT`

	* @return width  the width of the render target buffer texture
	*/
	function get_render_target_width(render_target: any, buffer_type: any): number

	/**
	* Returns the logical window width that is set in the "game.project" settings.
	* Note that the actual window pixel size can change, either by device constraints
	* or user input.
	* @return width  specified window width (number)
	*/
	function get_width(): number

	/**
	* Returns the actual physical window height.
	* Note that this value might differ from the logical height that is set in the
	* "game.project" settings.
	* @return height  actual window height
	*/
	function get_window_height(): number

	/**
	* Returns the actual physical window width.
	* Note that this value might differ from the logical width that is set in the
	* "game.project" settings.
	* @return width  actual window width
	*/
	function get_window_width(): number

	/**
	* This function returns a new render predicate for objects with materials matching
	* the provided material tags. The provided tags are combined into a bit mask
	* for the predicate. If multiple tags are provided, the predicate matches materials
	* with all tags ANDed together.
	* The current limit to the number of tags that can be defined is `64`.
	* @param tags  table of tags that the predicate should match. The tags can be of either hash or string type
	* @return predicate  new predicate
	*/
	function predicate(tags: object): any

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
	* `render.FORMAT_LUMINANCE``render.FORMAT_RGB``render.FORMAT_RGBA` `render.FORMAT_RGB_DXT1``render.FORMAT_RGBA_DXT1``render.FORMAT_RGBA_DXT3` `render.FORMAT_RGBA_DXT5``render.FORMAT_DEPTH``render.FORMAT_STENCIL`
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
	* `min_filter`
	* `render.FILTER_LINEAR``render.FILTER_NEAREST`
	* 
	* 
	* `mag_filter`
	* `render.FILTER_LINEAR``render.FILTER_NEAREST`
	* 
	* 
	* `u_wrap`
	* `render.WRAP_CLAMP_TO_BORDER``render.WRAP_CLAMP_TO_EDGE``render.WRAP_MIRRORED_REPEAT``render.WRAP_REPEAT`
	* 
	* 
	* `v_wrap`
	* `render.WRAP_CLAMP_TO_BORDER``render.WRAP_CLAMP_TO_EDGE``render.WRAP_MIRRORED_REPEAT``render.WRAP_REPEAT`
	* 
	* 
	* 
	* @param name  render target name
	* @param parameters  table of buffer parameters, see the description for available keys and values
	* @return render_target  new render target
	*/
	function render_target(name: string, parameters: object): any

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
	function set_blend_func(source_factor: any, destination_factor: any): void

	/**
	* Specifies whether the individual color components in the frame buffer is enabled for writing (`true`) or disabled (`false`). For example, if `blue` is `false`, nothing is written to the blue component of any pixel in any of the color buffers, regardless of the drawing operation attempted. Note that writing are either enabled or disabled for entire color components, not the individual bits of a component.
	* The component masks are all initially `true`.
	* @param red  red mask
	* @param green  green mask
	* @param blue  blue mask
	* @param alpha  alpha mask
	*/
	function set_color_mask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void

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
	function set_cull_face(face_type: any): void

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
	function set_depth_func(func: any): void

	/**
	* Specifies whether the depth buffer is enabled for writing. The supplied mask governs
	* if depth buffer writing is enabled (`true`) or disabled (`false`).
	* The mask is initially `true`.
	* @param depth  depth mask
	*/
	function set_depth_mask(depth: boolean): void

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
	function set_polygon_offset(factor: number, units: number): void

	/**
	* Sets the projection matrix to use when rendering.
	* @param matrix  projection matrix
	*/
	function set_projection(matrix: any): void

	/**
	* Sets a render target. Subsequent draw operations will be to the
	* render target until it is replaced by a subsequent call to set_render_target.
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
	function set_render_target(render_target: any, options?: object): void

	/**
	* sets the render target size
	* @param render_target  render target to set size for
	* @param width  new render target width
	* @param height  new render target height
	*/
	function set_render_target_size(render_target: any, width: number, height: number): void

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
	function set_stencil_func(func: any, ref: number, mask: number): void

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
	function set_stencil_mask(mask: number): void

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
	function set_stencil_op(sfail: any, dpfail: any, dppass: any): void

	/**
	* Sets the view matrix to use when rendering.
	* @param matrix  view matrix to set
	*/
	function set_view(matrix: any): void

	/**
	* Set the render viewport to the specified rectangle.
	* @param x  left corner
	* @param y  bottom corner
	* @param width  viewport width
	* @param height  viewport height
	*/
	function set_viewport(x: number, y: number, width: number, height: number): void

	/**
	* Set the size of the game window. Only works on desktop platforms.
	*/
	//let resize: string

	/**
	* Reports a change in window size. This is initiated on window resize on desktop or by orientation changes
	* on mobile devices.
	*/
	//let window_resized: string

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace resource {

	/**
	* LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH
	*/
	let LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH: any

	/**
	* LIVEUPDATE_ENGINE_VERSION_MISMATCH
	*/
	let LIVEUPDATE_ENGINE_VERSION_MISMATCH: any

	/**
	* LIVEUPDATE_FORMAT_ERROR
	*/
	let LIVEUPDATE_FORMAT_ERROR: any

	/**
	* LIVEUPDATE_INVALID_RESOURCE
	*/
	let LIVEUPDATE_INVALID_RESOURCE: any

	/**
	* LIVEUPDATE_OK
	*/
	let LIVEUPDATE_OK: any

	/**
	* LIVEUPDATE_SCHEME_MISMATCH
	*/
	let LIVEUPDATE_SCHEME_MISMATCH: any

	/**
	* LIVEUPDATE_SIGNATURE_MISMATCH
	*/
	let LIVEUPDATE_SIGNATURE_MISMATCH: any

	/**
	* LIVEUPDATE_VERSION_MISMATCH
	*/
	let LIVEUPDATE_VERSION_MISMATCH: any

	/**
	* luminance type texture format
	*/
	let TEXTURE_FORMAT_LUMINANCE: any

	/**
	* RGB type texture format
	*/
	let TEXTURE_FORMAT_RGB: any

	/**
	* RGBA type texture format
	*/
	let TEXTURE_FORMAT_RGBA: any

	/**
	* 2D texture type
	*/
	let TEXTURE_TYPE_2D: any

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @return path  a path hash to the binary version of the resource
	*/
	function atlas(): hash

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @return path  a path hash to the binary version of the resource
	*/
	function buffer(): hash

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @return path  a path hash to the binary version of the resource
	*/
	function font(): hash

	/**
	* gets the buffer from a resource
	* @param path  The path to the resource
	* @return buffer  The resource buffer
	*/
	function get_buffer(path: any): buffer

	/**
	* Return a reference to the Manifest that is currently loaded.
	* @return manifest_reference  reference to the Manifest that is currently loaded
	*/
	function get_current_manifest(): number

	/**
	* Loads the resource data for a specific resource.
	* @param path  The path to the resource
	* @return buffer  Returns the buffer stored on disc
	*/
	function load(path: string): buffer

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @return path  a path hash to the binary version of the resource
	*/
	function material(): hash

	/**
	* Sets the resource data for a specific resource
	* @param path  The path to the resource
	* @param buffer  The buffer of precreated data, suitable for the intended resource type
	*/
	function set(path: any, buffer: buffer): void

	/**
	* sets the buffer of a resource
	* @param path  The path to the resource
	* @param buffer  The resource buffer
	*/
	function set_buffer(path: any, buffer: buffer): void

	/**
	* Sets the pixel data for a specific texture.
	* @param path  The path to the resource
	* @param table  A table containing info about the texture. Supported entries:

`type`
The texture type. Supported values:


- `resource.TEXTURE_TYPE_2D`


`width`
The width of the texture (in pixels)
`height`
The width of the texture (in pixels)
`format`
The texture format. Supported values:


- `resource.TEXTURE_FORMAT_LUMINANCE`
- `resource.TEXTURE_FORMAT_RGB`
- `resource.TEXTURE_FORMAT_RGBA`

	* @param buffer  The buffer of precreated pixel data
⚠ Currently, only 1 mipmap is generated.
	*/
	function set_texture(path: any, table: object, buffer: buffer): void

	/**
	* Create a new manifest from a buffer. The created manifest is verified
	* by ensuring that the manifest was signed using the bundled public/private
	* key-pair during the bundle process and that the manifest supports the current
	* running engine version. Once the manifest is verified it is stored on device.
	* The next time the engine starts (or is rebooted) it will look for the stored
	* manifest before loading resources. Storing a new manifest allows the
	* developer to update the game, modify existing resources, or add new
	* resources to the game through LiveUpdate.
	* @param manifest_buffer  the binary data that represents the manifest
	* @param callback  the callback function
executed once the engine has attempted to store the manifest.

`self`
The current object.
`status`
the status of the store operation:


- `resource.LIVEUPATE_OK`
- `resource.LIVEUPATE_INVALID_RESOURCE`
- `resource.LIVEUPATE_VERSION_MISMATCH`
- `resource.LIVEUPATE_ENGINE_VERSION_MISMATCH`
- `resource.LIVEUPATE_SIGNATURE_MISMATCH`
- `resource.LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH`
- `resource.LIVEUPDATE_FORMAT_ERROR`

	*/
	function store_manifest(manifest_buffer: string, callback: any): void

	/**
	* add a resource to the data archive and runtime index. The resource will be verified
	* internally before being added to the data archive.
	* @param manifest_reference  The manifest to check against.
	* @param data  The resource data that should be stored.
	* @param hexdigest  The expected hash for the resource,
retrieved through collectionproxy.missing_resources.
	* @param callback  The callback
function that is executed once the engine has been attempted to store
the resource.

`self`
The current object.
`hexdigest`
The hexdigest of the resource.
`status`
Whether or not the resource was successfully stored.

	*/
	function store_resource(manifest_reference: number, data: string, hexdigest: string, callback: any): void

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @return path  a path hash to the binary version of the resource
	*/
	function texture(): hash

	/**
	* Constructor-like function with two purposes:
	* 
	* - Load the specified resource as part of loading the script
	* - Return a hash to the run-time version of the resource
	* 
	* ⚠ This function can only be called within go.property function calls.
	* @return path  a path hash to the binary version of the resource
	*/
	function tile_source(): hash

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace sys {

	/**
	* Terminates the game application and reports the specified `code` to the OS.
	* This message can only be sent to the designated `@system` socket.
	*/
	//let exit: string

	/**
	* Reboots the game engine with a specified set of arguments.
	* Arguments will be translated into command line arguments. Sending the reboot
	* command is equivalent to starting the engine with the same arguments.
	* On startup the engine reads configuration from "game.project" in the
	* project root.
	* This message can only be sent to the designated `@system` socket.
	*/
	//let reboot: string

	/**
	* Set game update-frequency (frame cap). This option is equivalent to `display.update_frequency` in
	* the "game.project" settings but set in run-time. If `Vsync` checked in "game.project", the rate will
	* be clamped to a swap interval that matches any detected main monitor refresh rate. If `Vsync` is
	* unchecked the engine will try to respect the rate in software using timers. There is no
	* guarantee that the frame cap will be achieved depending on platform specifics and hardware settings.
	* This message can only be sent to the designated `@system` socket.
	*/
	//let set_update_frequency: string

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
	//let set_vsync: string

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
	//let start_record: string

	/**
	* Stops the currently active video recording.
	* 🐧 Video recording is only supported on desktop platforms.
	* This message can only be sent to the designated `@system` socket.
	*/
	//let stop_record: string

	/**
	* network connected through other, non cellular, connection
	*/
	let NETWORK_CONNECTED: any

	/**
	* network connected through mobile cellular
	*/
	let NETWORK_CONNECTED_CELLULAR: any

	/**
	* no network connection found
	*/
	let NETWORK_DISCONNECTED: any

	/**
	* Terminates the game application and reports the specified `code` to the OS.
	* @param code  exit code to report to the OS, 0 means clean exit
	*/
	function exit(code: number): void

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
	function get_application_info(app_string: string): object

	/**
	* The path from which the application is run.
	* @return path  path to application executable
	*/
	function get_application_path(): string

	/**
	* Get config value from the game.project configuration file.
	* In addition to the project file, configuration values can also be passed
	* to the runtime as command line arguments with the `--config` argument.
	* @param key  key to get value for. The syntax is SECTION.KEY
	* @return value  config value as a string. nil if the config key doesn't exists
	*/
	function get_config(key: string): string

	/**
	* Get config value from the game.project configuration file with default value
	* @param key  key to get value for. The syntax is SECTION.KEY
	* @param default_value  default value to return if the value does not exist
	* @return value  config value as a string. default_value if the config key does not exist
	*/
	function get_config(key: string, default_value: string): string

	/**
	* 🤖 Returns the current network connectivity status
	* on mobile platforms.
	* On desktop, this function always return `sys.NETWORK_CONNECTED`.
	* @return status  network connectivity status:

- `sys.NETWORK_DISCONNECTED` (no network connection is found)
- `sys.NETWORK_CONNECTED_CELLULAR` (connected through mobile cellular)
- `sys.NETWORK_CONNECTED` (otherwise, Wifi)

	*/
	function get_connectivity(): any

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
	function get_engine_info(): object

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
	function get_ifaddrs(): object

	/**
	* The save-file path is operating system specific and is typically located under the user's home directory.
	* @param application_id  user defined id of the application, which helps define the location of the save-file
	* @param file_name  file-name to get path for
	* @return path  path to save-file
	*/
	function get_save_file(application_id: string, file_name: string): string

	/**
	* Returns a table with system information.
	* @return sys_info  table with system information in the following fields:

`device_model`
Only available on iOS and Android.
`manufacturer`
Only available on iOS and Android.
`system_name`
The system OS name: "Darwin", "Linux", "Windows", "HTML5", "Android" or "iPhone OS"
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
	function get_sys_info(): object

	/**
	* If the file exists, it must have been created by `sys.save` to be loaded.
	* @param filename  file to read from
	* @return loaded  lua table, which is empty if the file could not be found
	*/
	function load(filename: string): object

	/**
	* Loads a custom resource. Specify the full filename of the resource that you want
	* to load. When loaded, the file data is returned as a string.
	* If loading fails, the function returns nil plus the error message.
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
	function load_resource(filename: string): string

	/**
	* Open URL in default application, typically a browser
	* @param url  url to open
	* @param attributes  table with attributes
`target`
: Optional. Specifies the target attribute or the name of the window. The following values are supported:
- `_self` - URL replaces the current page. This is default.
- `_blank` - URL is loaded into a new window, or tab.
- `_parent` - URL is loaded into the parent frame.
- `_top` - URL replaces any framesets that may be loaded.
- `name` - The name of the window (Note: the name does not specify the title of the new window).
	* @return success  a boolean indicating if the url could be opened or not
	*/
	function open_url(url: string, attributes?: object): boolean

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
	function reboot(arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, arg6: string): void

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
	function save(filename: string, table: object): boolean

	/**
	* Sets the host that is used to check for network connectivity against.
	* @param host  hostname to check against
	*/
	function set_connectivity_host(host: string): void

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
	function set_error_handler(error_handler: any): void

	/**
	* Set game update-frequency (frame cap). This option is equivalent to `display.update_frequency` in
	* the "game.project" settings but set in run-time. If `Vsync` checked in "game.project", the rate will
	* be clamped to a swap interval that matches any detected main monitor refresh rate. If `Vsync` is
	* unchecked the engine will try to respect the rate in software using timers. There is no
	* guarantee that the frame cap will be achieved depending on platform specifics and hardware settings.
	* @param frequency  target frequency. 60 for 60 fps
	*/
	function set_update_frequency(frequency: any): void

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
	function set_vsync_swap_interval(swap_interval: any): void

	/**
	* Toggles the on-screen physics visual debugging mode which is very useful for
	* tracking down issues related to physics. This mode visualizes
	* all collision object shapes and normals at detected contact points. Toggling
	* this mode on is equal to setting `physics.debug` in the "game.project" settings,
	* but set in run-time.
	* This message can only be sent to the designated `@system` socket.
	*/
	//let toggle_physics_debug: string

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
	//let toggle_profile: string

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare namespace window {

	/**
	* dimming mode off
	*/
	let DIMMING_OFF: any

	/**
	* dimming mode on
	*/
	let DIMMING_ON: any

	/**
	* dimming mode unknown
	*/
	let DIMMING_UNKNOWN: any

	/**
	* deiconified window event
	*/
	let WINDOW_EVENT_DEICONIFIED: any

	/**
	* focus gained window event
	*/
	let WINDOW_EVENT_FOCUS_GAINED: any

	/**
	* focus lost window event
	*/
	let WINDOW_EVENT_FOCUS_LOST: any

	/**
	* iconify window event
	*/
	let WINDOW_EVENT_ICONFIED: any

	/**
	* resized window event
	*/
	let WINDOW_EVENT_RESIZED: any

	/**
	* 🤖 Returns the current dimming mode set on a mobile device.
	* The dimming mode specifies whether or not a mobile device should dim the screen after a period without user interaction.
	* On platforms that does not support dimming, `window.DIMMING_UNKNOWN` is always returned.
	* @return mode  The mode for screen dimming

- `window.DIMMING_UNKNOWN`
- `window.DIMMING_ON`
- `window.DIMMING_OFF`

	*/
	function get_dim_mode(): any

	/**
	* This returns the current window size (width and height).
	* @return width  The window width
	* @return height  The window height
	*/
	function get_size(): number

	/**
	* 🤖 Sets the dimming mode on a mobile device.
	* The dimming mode specifies whether or not a mobile device should dim the screen after a period without user interaction. The dimming mode will only affect the mobile device while the game is in focus on the device, but not when the game is running in the background.
	* This function has no effect on platforms that does not support dimming.
	* @param mode  The mode for screen dimming

- `window.DIMMING_ON`
- `window.DIMMING_OFF`

	*/
	function set_dim_mode(mode: any): void

	/**
	* Sets a window event listener.
	* @param callback  A callback which receives info about window events. Pass an empty function or nil if you no longer wish to receive callbacks.

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
	function set_listener(callback: any): void

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

