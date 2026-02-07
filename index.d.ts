/** @noSelfInFile */
/// <reference types="@typescript-to-lua/language-extensions" />
/// <reference types="lua-types/5.1" />
/// <reference types="lua-types/special/jit-only" />

// DEFOLD. stable version 1.12.1 (16c6fd602f32de4814660672c38ce3ccbbc1fb59)

/**
 * All ids in the engine are represented as hashes, so a string needs to be hashed
before it can be compared with an id.
 * @param s string to hash
 * @returns a hashed string
 * @example To compare a message_id in an on-message callback function:
```lua
function on_message(self, message_id, message, sender)
    if message_id == hash("my_message") then
        -- Act on the message here
    end
end
```
 */
declare function hash(s: string): hash;
/**
 * Returns a hexadecimal representation of a hash value.
The returned string is always padded with leading zeros.
 * @param h hash value to get hex string for
 * @returns hex representation of the hash
 * @example ```lua
local h = hash("my_hash")
local hexstr = hash_to_hex(h)
print(hexstr) --> a2bc06d97f580aab
```
 */
declare function hash_to_hex(h: hash): string;
/**
 * Pretty printing of Lua values. This function prints Lua values
in a manner similar to +print()+, but will also recurse into tables
and pretty print them. There is a limit to how deep the function
will recurse.
 * @param v value to print
 * @example Pretty printing a Lua table with a nested table:
```lua
local t2 = { 1, 2, 3, 4 }
local t = { key = "value", key2 = 1234, key3 = t2 }
pprint(t)
```

Resulting in the following output (note that the key order in non array
Lua tables is undefined):
```lua
{
  key3 = {
    1 = 1,
    2 = 2,
    3 = 3,
    4 = 4,
  }
  key2 = 1234,
  key = value,
}
```
 */
declare function pprint(...v: any[]): void;
/**
 * A unique identifier used to reference resources, messages, properties, and other entities within the game.
 */
declare type hash = Readonly<LuaUserdata & { readonly __hash__: unique symbol; }>;
/**
 * A reference to game resources, such as game objects, components, and assets.
 */
declare type url = { socket: hash; path: hash; fragment: hash | undefined; };
/**
 * A representation of a GUI object.
 */
declare type node = Readonly<LuaUserdata & { readonly __node__: unique symbol; }>;
/**
 * A block of memory that can store binary data.
 */
declare type buffer = object;
/**
 * A data stream derived from a buffer.
 */
declare type bufferstream = LuaUserdata & number[] & object;


declare namespace b2d {
/**
 * Get the Box2D body from a collision object
 * @param url the url to the game object collision component
 */
export function get_body(url: string | hash | url): typeof b2d.body | undefined;
/**
 * Get the Box2D world from the current collection
 * @returns the world if successful. Otherwise `nil`.
 */
export function get_world(): unknown;
}

declare namespace b2d {
export namespace body {
/**
 * Dynamic body
 */
export const B2_DYNAMIC_BODY: number;
/**
 * Kinematic body
 */
export const B2_KINEMATIC_BODY: number;
/**
 * Static (immovable) body
 */
export const B2_STATIC_BODY: number;
/**
 * Apply an angular impulse.
 * @param body body
 * @param impulse impulse the angular impulse in units of kgmm/s
 */
export function apply_angular_impulse(body: typeof b2d.body, impulse: number): void;
/**
 * Apply a force at a world point. If the force is not
applied at the center of mass, it will generate a torque and
affect the angular velocity. This wakes up the body.
 * @param body body
 * @param force the world force vector, usually in Newtons (N).
 * @param point the world position of the point of application.
 */
export function apply_force(body: typeof b2d.body, force: vmath.vector3, point: vmath.vector3): void;
/**
 * Apply a force to the center of mass. This wakes up the body.
 * @param body body
 * @param force the world force vector, usually in Newtons (N).
 */
export function apply_force_to_center(body: typeof b2d.body, force: vmath.vector3): void;
/**
 * Apply an impulse at a point. This immediately modifies the velocity.
It also modifies the angular velocity if the point of application
is not at the center of mass. This wakes up the body.
 * @param body body
 * @param impulse the world impulse vector, usually in N-seconds or kg-m/s.
 * @param point the world position of the point of application.
 */
export function apply_linear_impulse(body: typeof b2d.body, impulse: vmath.vector3, point: vmath.vector3): void;
/**
 * Apply a torque. This affects the angular velocity
without affecting the linear velocity of the center of mass.
This wakes up the body.
 * @param body body
 * @param torque torque about the z-axis (out of the screen), usually in N-m.
 */
export function apply_torque(body: typeof b2d.body, torque: number): void;
/**
 * You can disable sleeping on this body. If you disable sleeping, the body will be woken.
 * @param body body
 * @param enable if false, the body will never sleep, and consume more CPU
 */
export function enable_sleep(body: typeof b2d.body, enable: boolean): void;
/**
 * Get the angle in radians.
 * @param body body
 * @returns the current world rotation angle in radians.
 */
export function get_angle(body: typeof b2d.body): number;
/**
 * Get the angular damping of the body.
 * @param body body
 * @returns the damping
 */
export function get_angular_damping(body: typeof b2d.body): number;
/**
 * Get the angular velocity.
 * @param body body
 * @returns the angular velocity in radians/second.
 */
export function get_angular_velocity(body: typeof b2d.body): number;
/**
 * Get the gravity scale of the body.
 * @param body body
 * @returns the scale
 */
export function get_gravity_scale(body: typeof b2d.body): number;
/**
 * Get the linear damping of the body.
 * @param body body
 * @returns the damping
 */
export function get_linear_damping(body: typeof b2d.body): number;
/**
 * Get the linear velocity of the center of mass.
 * @param body body
 * @returns the linear velocity of the center of mass.
 */
export function get_linear_velocity(body: typeof b2d.body): vmath.vector3;
/**
 * Get the world velocity of a local point.
 * @param body body
 * @param local_point a point in local coordinates.
 * @returns the world velocity of a point.
 */
export function get_linear_velocity_from_local_point(body: typeof b2d.body, local_point: vmath.vector3): vmath.vector3;
/**
 * Get the world linear velocity of a world point attached to this body.
 * @param body body
 * @param world_point a point in world coordinates.
 * @returns the world velocity of a point.
 */
export function get_linear_velocity_from_world_point(body: typeof b2d.body, world_point: vmath.vector3): vmath.vector3;
/**
 * Get the local position of the center of mass.
 * @param body body
 * @returns Get the local position of the center of mass.
 */
export function get_local_center_of_mass(body: typeof b2d.body): vmath.vector3;
/**
 * Gets a local point relative to the body's origin given a world point.
 * @param body body
 * @param world_point a point in world coordinates.
 * @returns the corresponding local point relative to the body's origin.
 */
export function get_local_point(body: typeof b2d.body, world_point: vmath.vector3): vmath.vector3;
/**
 * Gets a local vector given a world vector.
 * @param body body
 * @param world_vector a vector in world coordinates.
 * @returns the corresponding local vector.
 */
export function get_local_vector(body: typeof b2d.body, world_vector: vmath.vector3): vmath.vector3;
/**
 * Get the total mass of the body.
 * @param body body
 * @returns the mass, usually in kilograms (kg).
 */
export function get_mass(body: typeof b2d.body): number;
/**
 * Get the world body origin position.
 * @param body body
 * @returns the world position of the body's origin.
 */
export function get_position(body: typeof b2d.body): vmath.vector3;
/**
 * Get the rotational inertia of the body about the local origin.
 * @param body body
 * @returns the rotational inertia, usually in kg-m^2.
 */
export function get_rotational_inertia(body: typeof b2d.body): number;
/**
 * Get the type of this body.
 * @param body body
 * @returns the body type
 */
export function get_type(body: typeof b2d.body): unknown;
/**
 * Get the parent world of this body.
 * @param body body
 */
export function get_world(body: typeof b2d.body): unknown;
/**
 * Get the world position of the center of mass.
 * @param body body
 * @returns Get the world position of the center of mass.
 */
export function get_world_center_of_mass(body: typeof b2d.body): vmath.vector3;
/**
 * Get the world coordinates of a point given the local coordinates.
 * @param body body
 * @param local_vector localPoint a point on the body measured relative the the body's origin.
 * @returns the same point expressed in world coordinates.
 */
export function get_world_point(body: typeof b2d.body, local_vector: vmath.vector3): vmath.vector3;
/**
 * Get the world coordinates of a vector given the local coordinates.
 * @param body body
 * @param local_vector a vector fixed in the body.
 * @returns the same vector expressed in world coordinates.
 */
export function get_world_vector(body: typeof b2d.body, local_vector: vmath.vector3): vmath.vector3;
/**
 * Get the active state of the body.
 * @param body body
 * @returns is the body active
 */
export function is_active(body: typeof b2d.body): boolean;
/**
 * Get the sleeping state of this body.
 * @param body body
 * @returns true if the body is awake, false if it's sleeping.
 */
export function is_awake(body: typeof b2d.body): boolean;
/**
 * Is this body in bullet mode
 * @param body body
 * @returns true if the body is in bullet mode
 */
export function is_bullet(body: typeof b2d.body): boolean;
/**
 * Does this body have fixed rotation?
 * @param body body
 * @returns is the rotation fixed
 */
export function is_fixed_rotation(body: typeof b2d.body): boolean;
/**
 * Is this body allowed to sleep
 * @param body body
 * @returns true if the body is allowed to sleep
 */
export function is_sleeping_enabled(body: typeof b2d.body): boolean;
/**
 * This resets the mass properties to the sum of the mass properties of the fixtures.
This normally does not need to be called unless you called SetMassData to override
 * @param body body
 */
export function reset_mass_data(body: typeof b2d.body): void;
/**
 * Set the active state of the body. An inactive body is not
simulated and cannot be collided with or woken up.
If you pass a flag of true, all fixtures will be added to the
broad-phase.
If you pass a flag of false, all fixtures will be removed from
the broad-phase and all contacts will be destroyed.
Fixtures and joints are otherwise unaffected. You may continue
to create/destroy fixtures and joints on inactive bodies.
Fixtures on an inactive body are implicitly inactive and will
not participate in collisions, ray-casts, or queries.
Joints connected to an inactive body are implicitly inactive.
An inactive body is still owned by a b2World object and remains
in the body list.
 * @param body body
 * @param enable true if the body should be active
 */
export function set_active(body: typeof b2d.body, enable: boolean): void;
/**
 * Set the angular damping of the body.
 * @param body body
 * @param damping the damping
 */
export function set_angular_damping(body: typeof b2d.body, damping: number): void;
/**
 * Set the angular velocity.
 * @param body body
 * @param omega the new angular velocity in radians/second.
 */
export function set_angular_velocity(body: typeof b2d.body, omega: number): void;
/**
 * Set the sleep state of the body. A sleeping body has very low CPU cost.
 * @param body body
 * @param enable flag set to false to put body to sleep, true to wake it.
 */
export function set_awake(body: typeof b2d.body, enable: boolean): void;
/**
 * Should this body be treated like a bullet for continuous collision detection?
 * @param body body
 * @param enable if true, the body will be in bullet mode
 */
export function set_bullet(body: typeof b2d.body, enable: boolean): void;
/**
 * Set this body to have fixed rotation. This causes the mass to be reset.
 * @param body body
 * @param enable true if the rotation should be fixed
 */
export function set_fixed_rotation(body: typeof b2d.body, enable: boolean): void;
/**
 * Set the gravity scale of the body.
 * @param body body
 * @param scale the scale
 */
export function set_gravity_scale(body: typeof b2d.body, scale: number): void;
/**
 * Set the linear damping of the body.
 * @param body body
 * @param damping the damping
 */
export function set_linear_damping(body: typeof b2d.body, damping: number): void;
/**
 * Set the linear velocity of the center of mass.
 * @param body body
 * @param velocity the new linear velocity of the center of mass.
 */
export function set_linear_velocity(body: typeof b2d.body, velocity: vmath.vector3): void;
/**
 * Set the position of the body's origin and rotation.
This breaks any contacts and wakes the other bodies.
Manipulating a body's transform may cause non-physical behavior.
 * @param body body
 * @param position the world position of the body's local origin.
 * @param angle the world position of the body's local origin.
 */
export function set_transform(body: typeof b2d.body, position: vmath.vector3, angle: number): void;
/**
 * Set the type of this body. This may alter the mass and velocity.
 * @param body body
 * @param type the body type
 */
export function set_type(body: typeof b2d.body, type: any): void;
}
}

declare namespace buffer {
/**
 * Float, single precision, 4 bytes
 */
export const VALUE_TYPE_FLOAT32: number;
/**
 * Signed integer, 2 bytes
 */
export const VALUE_TYPE_INT16: number;
/**
 * Signed integer, 4 bytes
 */
export const VALUE_TYPE_INT32: number;
/**
 * Signed integer, 8 bytes
 */
export const VALUE_TYPE_INT64: number;
/**
 * Signed integer, 1 byte
 */
export const VALUE_TYPE_INT8: number;
/**
 * Unsigned integer, 2 bytes
 */
export const VALUE_TYPE_UINT16: number;
/**
 * Unsigned integer, 4 bytes
 */
export const VALUE_TYPE_UINT32: number;
/**
 * Unsigned integer, 8 bytes
 */
export const VALUE_TYPE_UINT64: number;
/**
 * Unsigned integer, 1 byte
 */
export const VALUE_TYPE_UINT8: number;
/**
 * Copy all data streams from one buffer to another, element wise.
⚠ Each of the source streams must have a matching stream in the
destination buffer. The streams must match in both type and size.
The source and destination buffer can be the same.
 * @param dst the destination buffer
 * @param dstoffset the offset to start copying data to
 * @param src the source data buffer
 * @param srcoffset the offset to start copying data from
 * @param count the number of elements to copy
 * @example How to copy elements (e.g. vertices) from one buffer to another
```lua
-- copy entire buffer
buffer.copy_buffer(dstbuffer, 0, srcbuffer, 0, #srcbuffer)

-- copy last 10 elements to the front of another buffer
buffer.copy_buffer(dstbuffer, 0, srcbuffer, #srcbuffer - 10, 10)
```
 */
export function copy_buffer(dst: buffer, dstoffset: number, src: buffer, srcoffset: number, count: number): void;
/**
 * Copy a specified amount of data from one stream to another.
⚠ The value type and size must match between source and destination streams.
The source and destination streams can be the same.
 * @param dst the destination stream
 * @param dstoffset the offset to start copying data to (measured in value type)
 * @param src the source data stream
 * @param srcoffset the offset to start copying data from (measured in value type)
 * @param count the number of values to copy (measured in value type)
 * @example How to update a texture of a sprite:
```lua
-- copy entire stream
local srcstream = buffer.get_stream(srcbuffer, hash("xyz"))
local dststream = buffer.get_stream(dstbuffer, hash("xyz"))
buffer.copy_stream(dststream, 0, srcstream, 0, #srcstream)
```
 */
export function copy_stream(dst: bufferstream, dstoffset: number, src: bufferstream, srcoffset: number, count: number): void;
/**
 * Create a new data buffer containing a specified set of streams. A data buffer
can contain one or more streams with typed data. This is useful for managing
compound data, for instance a vertex buffer could contain separate streams for
vertex position, color, normal etc.
 * @param element_count The number of elements the buffer should hold
 * @param declaration A table where each entry (table) describes a stream

hash | string `name`: The name of the stream
constant `type`: The data type of the stream
number `count`: The number of values each element should hold

 * @returns the new buffer
 * @example How to create and initialize a buffer
```lua
function init(self)
  local size = 128
  self.image = buffer.create( size * size, { {name=hash("rgb"), type=buffer.VALUE_TYPE_UINT8, count=3 } })
  self.imagestream = buffer.get_stream(self.image, hash("rgb"))

  for y=0,self.height-1 do
     for x=0,self.width-1 do
         local index = y * self.width * 3 + x * 3 + 1
         self.imagestream[index + 0] = self.r
         self.imagestream[index + 1] = self.g
         self.imagestream[index + 2] = self.b
     end
  end
```
 */
export function create(element_count: number, declaration: { hash: hash | string; type: number; count: number }): buffer;
/**
 * Get a copy of all the bytes from a specified stream as a Lua string.
 * @param buffer the source buffer
 * @param stream_name the name of the stream
 * @returns the buffer data as a Lua string
 */
export function get_bytes(buffer: buffer, stream_name: hash): string;
/**
 * Get a named metadata entry from a buffer along with its type.
 * @param buf the buffer to get the metadata from
 * @param metadata_name name of the metadata entry
 * @returns table of metadata values or `nil` if the entry does not exist & numeric type of values or `nil`
 * @example How to get a metadata entry from a buffer
```lua
-- retrieve a metadata entry named "somefloats" and its nomeric type
local values, type = buffer.get_metadata(buf, hash("somefloats"))
if metadata then print(#metadata.." values in 'somefloats'") end
```
 */
export function get_metadata(buf: buffer, metadata_name: hash | string): LuaMultiReturn<[object | undefined, number | undefined]>;
/**
 * Get a specified stream from a buffer.
 * @param buffer the buffer to get the stream from
 * @param stream_name the stream name
 * @returns the data stream
 */
export function get_stream(buffer: buffer, stream_name: hash | string): bufferstream;
/**
 * Creates or updates a metadata array entry on a buffer.
⚠ The value type and count given when updating the entry should match those used when first creating it.
 * @param buf the buffer to set the metadata on
 * @param metadata_name name of the metadata entry
 * @param values actual metadata, an array of numeric values
 * @param value_type type of values when stored
 * @example How to set a metadata entry on a buffer
```lua
-- create a new metadata entry with three floats
buffer.set_metadata(buf, hash("somefloats"), {1.5, 3.2, 7.9}, buffer.VALUE_TYPE_FLOAT32)
-- ...
-- update to a new set of values
buffer.set_metadata(buf, hash("somefloats"), {-2.5, 10.0, 32.2}, buffer.VALUE_TYPE_FLOAT32)
```
 */
export function set_metadata(buf: buffer, metadata_name: hash | string, values: number[] | LuaSet<number>, value_type: number): void;
}

declare namespace camera {
/**
 * Computes zoom so the original display area covers the entire window while preserving aspect ratio.
Equivalent to using max(window_width/width, window_height/height).
 */
export const ORTHO_MODE_AUTO_COVER: number;
/**
 * Computes zoom so the original display area (game.project width/height) fits inside the window
while preserving aspect ratio. Equivalent to using min(window_width/width, window_height/height).
 */
export const ORTHO_MODE_AUTO_FIT: number;
/**
 * Uses the manually set orthographic zoom value (camera.set_orthographic_zoom).
 */
export const ORTHO_MODE_FIXED: number;
/**
 * Gets the effective aspect ratio of the camera. If auto aspect ratio is enabled,
returns the aspect ratio calculated from the current render target dimensions.
Otherwise returns the manually set aspect ratio.
 * @param camera camera id
 * @returns the effective aspect ratio.
 */
export function get_aspect_ratio(camera: url | number | undefined): number;
/**
 * Returns whether auto aspect ratio is enabled. When enabled, the camera automatically
calculates aspect ratio from render target dimensions. When disabled, uses the
manually set aspect ratio value.
 * @param camera camera id
 * @returns true if auto aspect ratio is enabled
 */
export function get_auto_aspect_ratio(camera: url | number | undefined): boolean;
/**
 * This function returns a table with all the camera URLs that have been
registered in the render context.
 * @example ```lua
for k,v in pairs(camera.get_cameras()) do
    render.set_camera(v)
    render.draw(...)
    render.set_camera()
end
```
 */
export function get_cameras(): url[];
/**
 * get enabled
 * @param camera camera id
 * @returns true if the camera is enabled
 */
export function get_enabled(camera: url | number | undefined): boolean;
/**
 * get far z
 * @param camera camera id
 * @returns the far z.
 */
export function get_far_z(camera: url | number | undefined): number;
/**
 * get field of view
 * @param camera camera id
 * @returns the field of view.
 */
export function get_fov(camera: url | number | undefined): number;
/**
 * get near z
 * @param camera camera id
 * @returns the near z.
 */
export function get_near_z(camera: url | number | undefined): number;
/**
 * get orthographic zoom mode
 * @param camera camera id
 * @returns one of camera.ORTHO_MODE_FIXED, camera.ORTHO_MODE_AUTO_FIT or
camera.ORTHO_MODE_AUTO_COVER
 */
export function get_orthographic_mode(camera: url | number | undefined): number;
/**
 * get orthographic zoom
 * @param camera camera id
 * @returns the zoom level when the camera uses orthographic projection.
 */
export function get_orthographic_zoom(camera: url | number | undefined): number;
/**
 * get projection matrix
 * @param camera camera id
 * @returns the projection matrix.
 */
export function get_projection(camera: url | number | undefined): vmath.matrix4;
/**
 * get view matrix
 * @param camera camera id
 * @returns the view matrix.
 */
export function get_view(camera: url | number | undefined): vmath.matrix4;
/**
 * Converts a screen-space 2D point with view depth to a 3D world point.
z is the view depth in world units measured from the camera plane along the camera forward axis.
If a camera isn't specified, the last enabled camera is used.
 * @param pos Screen-space position (x, y) with z as view depth in world units
 * @param camera optional camera id
 * @returns the world coordinate
 * @example Place objects at the touch point with a random Z position, keeping them within the visible view zone.
```lua
 function on_input(self, action_id, action)
     if action_id == hash("touch") then
         if action.pressed then
             local percpective_camera = msg.url("#perspective_camera")
             local random_z = math.random(camera.get_near_z(percpective_camera) + 0.01, camera.get_far_z(percpective_camera) - 0.01)
             local world_position = camera.screen_to_world(vmath.vector3(action.screen_x, action.screen_y, random_z), percpective_camera)
             go.set_position(world_position, "/go1")
         end
     end
 end
```
 */
export function screen_to_world(pos: vmath.vector3, camera?: url | number | undefined): vmath.vector3;
/**
 * Converts 2D screen coordinates (x,y) to the 3D world-space point on the camera's near plane for that pixel.
If a camera isn't specified, the last enabled camera is used.
 * @param x X coordinate on screen.
 * @param y Y coordinate on screen.
 * @param camera optional camera id
 * @returns the world coordinate on the camera near plane
 * @example Place objects at the touch point.
```lua
 function on_input(self, action_id, action)
     if action_id == hash("touch") then
         if action.pressed then
             local world_position = camera.screen_xy_to_world(action.screen_x, action.screen_y)
             go.set_position(world_position, "/go1")
         end
     end
 end
```
 */
export function screen_xy_to_world(x: number, y: number, camera?: url | number | undefined): vmath.vector3;
/**
 * Sets the manual aspect ratio for the camera. This value is only used when
auto aspect ratio is disabled. To disable auto aspect ratio and use this
manual value, call camera.set_auto_aspect_ratio(camera, false).
 * @param camera camera id
 * @param aspect_ratio the manual aspect ratio value.
 */
export function set_aspect_ratio(camera: url | number | undefined, aspect_ratio: number): void;
/**
 * Enables or disables automatic aspect ratio calculation. When enabled (true),
the camera automatically calculates aspect ratio from render target dimensions.
When disabled (false), uses the manually set aspect ratio value.
 * @param camera camera id
 * @param auto_aspect_ratio true to enable auto aspect ratio
 */
export function set_auto_aspect_ratio(camera: url | number | undefined, auto_aspect_ratio: boolean): void;
/**
 * set far z
 * @param camera camera id
 * @param far_z the far z.
 */
export function set_far_z(camera: url | number | undefined, far_z: number): void;
/**
 * set field of view
 * @param camera camera id
 * @param fov the field of view.
 */
export function set_fov(camera: url | number | undefined, fov: number): void;
/**
 * set near z
 * @param camera camera id
 * @param near_z the near z.
 */
export function set_near_z(camera: url | number | undefined, near_z: number): void;
/**
 * set orthographic zoom mode
 * @param camera camera id
 * @param mode camera.ORTHO_MODE_FIXED, camera.ORTHO_MODE_AUTO_FIT or camera.ORTHO_MODE_AUTO_COVER
 */
export function set_orthographic_mode(camera: url | number | undefined, mode: number): void;
/**
 * set orthographic zoom
 * @param camera camera id
 * @param orthographic_zoom the zoom level when the camera uses orthographic projection.
 */
export function set_orthographic_zoom(camera: url | number | undefined, orthographic_zoom: number): void;
/**
 * Converts a 3D world position to screen-space coordinates with view depth.
Returns a vector3 where x and y are in screen pixels and z is the view depth in world units
measured from the camera plane along the camera forward axis. The returned z can be used with
camera.screen_to_world to reconstruct the world position on the same pixel ray.
If a camera isn't specified, the last enabled camera is used.
 * @param world_pos World-space position
 * @param camera optional camera id
 * @returns Screen position (x,y in pixels, z is view depth)
 * @example Convert go position into screen pisition
```lua
 go.update_world_transform("/go1")
 local world_pos = go.get_world_position("/go1")
 local screen_pos = camera.world_to_screen(world_pos)
```
 */
export function world_to_screen(world_pos: vmath.vector3, camera?: url | number | undefined): vmath.vector3;
}

declare namespace collectionfactory {
/**
 * loaded
 */
export const STATUS_LOADED: number;
/**
 * loading
 */
export const STATUS_LOADING: number;
/**
 * unloaded
 */
export const STATUS_UNLOADED: number;
/**
 * The URL identifies the collectionfactory component that should do the spawning.
Spawning is instant, but spawned game objects get their first update calls the following frame. The supplied parameters for position, rotation and scale
will be applied to the whole collection when spawned.
Script properties in the created game objects can be overridden through
a properties-parameter table. The table should contain game object ids
(hash) as keys and property tables as values to be used when initiating each
spawned game object.
See go.property for more information on script properties.
The function returns a table that contains a key for each game object
id (hash), as addressed if the collection file was top level, and the
corresponding spawned instance id (hash) as value with a unique path
prefix added to each instance.
⚠ Calling collectionfactory.create create on a collection factory that is marked as dynamic without having loaded resources
using collectionfactory.load will synchronously load and create resources which may affect application performance.
 * @param url the collection factory component to be used
 * @param position position to assign to the newly spawned collection
 * @param rotation rotation to assign to the newly spawned collection
 * @param properties table of script properties to propagate to any new game object instances
 * @param scale uniform scaling to apply to the newly spawned collection (must be greater than 0).
 * @example How to spawn a collection of game objects:
```lua
function init(self)
  -- Spawn a small group of enemies.
  local pos = vmath.vector3(100, 12.5, 0)
  local rot = vmath.quat_rotation_z(math.pi / 2)
  local scale = 0.5
  local props = {}
  props[hash("/enemy_leader")] = { health = 1000.0 }
  props[hash("/enemy_1")] = { health = 200.0 }
  props[hash("/enemy_2")] = { health = 400.0, color = hash("green") }

  local self.enemy_ids = collectionfactory.create("#enemyfactory", pos, rot, props, scale)
  -- enemy_ids now map to the spawned instance ids:
  --
  -- pprint(self.enemy_ids)
  --
  -- DEBUG:SCRIPT:
  -- {
  --   hash: [/enemy_leader] = hash: [/collection0/enemy_leader],
  --   hash: [/enemy_1] = hash: [/collection0/enemy_1],
  --   hash: [/enemy_2] = hash: [/collection0/enemy_2]
  -- }

  -- Send "attack" message to the leader. First look up its instance id.
  local leader_id = self.enemy_ids[hash("/enemy_leader")]
  msg.post(leader_id, "attack")
end
```

How to delete a spawned collection:
```lua
go.delete(self.enemy_ids)
```
 */
export function create(url: string | hash | url, position?: vmath.vector3, rotation?: vmath.quaternion, properties?: object, scale?: number | vmath.vector3): LuaMap<hash, hash>;
/**
 * This returns status of the collection factory.
Calling this function when the factory is not marked as dynamic loading always returns COMP_COLLECTION_FACTORY_STATUS_LOADED.
 * @param url the collection factory component to get status from
 * @returns status of the collection factory component

`collectionfactory.STATUS_UNLOADED`
`collectionfactory.STATUS_LOADING`
`collectionfactory.STATUS_LOADED`

 */
export function get_status(url?: string | hash | url): number;
/**
 * Resources loaded are referenced by the collection factory component until the existing (parent) collection is destroyed or collectionfactory.unload is called.
Calling this function when the factory is not marked as dynamic loading does nothing.
 * @param url the collection factory component to load
 * @param complete_function function to call when resources are loaded.

`self`
object The current object.
`url`
url url of the collection factory component
`result`
boolean True if resource were loaded successfully

 * @example How to load resources of a collection factory prototype.
```lua
collectionfactory.load("#factory", function(self, url, result) end)
```
 */
export function load(url?: string | hash | url, complete_function?: (this: any, url: url, result: boolean,) => void): void;
/**
 * Changes the prototype for the collection factory.
Setting the prototype to "nil" will revert back to the original prototype.
 * @param url the collection factory component
 * @param prototype the path to the new prototype, or `nil`
 * @example How to unload the previous prototypes resources, and then spawn a new collection
```lua
collectionfactory.unload("#factory") -- unload the previous resources
collectionfactory.set_prototype("#factory", "/main/levels/level1.collectionc")
local ids = collectionfactory.create("#factory", go.get_world_position(), vmath.quat())
```
 */
export function set_prototype(url?: string | hash | url, prototype?: string | undefined): void;
/**
 * This decreases the reference count for each resource loaded with collectionfactory.load. If reference is zero, the resource is destroyed.
Calling this function when the factory is not marked as dynamic loading does nothing.
 * @param url the collection factory component to unload
 * @example How to unload resources of a collection factory prototype loaded with collectionfactory.load
```lua
collectionfactory.unload("#factory")
```
 */
export function unload(url?: string | hash | url): void;
}

declare namespace collectionproxy {
/**
 * It's impossible to change the collection if the collection is already loaded.
 */
export const RESULT_ALREADY_LOADED: number;
/**
 * It's impossible to change the collection while the collection proxy is loading.
 */
export const RESULT_LOADING: number;
/**
 * It's impossible to change the collection for a proxy that isn't excluded.
 */
export const RESULT_NOT_EXCLUDED: number;
/**
 * return an indexed table of resources for a collection proxy where the
referenced collection has been excluded using LiveUpdate. Each entry is a
hexadecimal string that represents the data of the specific resource.
This representation corresponds with the filename for each individual
resource that is exported when you bundle an application with LiveUpdate
functionality.
 * @param collectionproxy the collectionproxy to check for resources.
 * @example ```lua
local function print_resources(self, cproxy)
    local resources = collectionproxy.get_resources(cproxy)
    for _, v in ipairs(resources) do
        print("Resource: " .. v)
    end
end
```
 */
export function get_resources(collectionproxy: url): string[];
/**
 * return an array of missing resources for a collection proxy. Each
entry is a hexadecimal string that represents the data of the specific
resource. This representation corresponds with the filename for each
individual resource that is exported when you bundle an application with
LiveUpdate functionality. It should be considered good practise to always
check whether or not there are any missing resources in a collection proxy
before attempting to load the collection proxy.
 * @param collectionproxy the collectionproxy to check for missing
resources.
 * @example ```lua
function init(self)
end

local function callback(self, id, response)
    local expected = self.resources[id]
    if response ~= nil and response.status == 200 then
        print("Successfully downloaded resource: " .. expected)
        resource.store_resource(response.response)
    else
        print("Failed to download resource: " .. expected)
        -- error handling
    end
end

local function download_resources(self, cproxy)
    self.resources = {}
    local resources = collectionproxy.missing_resources(cproxy)
    for _, v in ipairs(resources) do
        print("Downloading resource: " .. v)

        local uri = "http://example.defold.com/" .. v
        local id = http.request(uri, "GET", callback)
        self.resources[id] = v
    end
end
```
 */
export function missing_resources(collectionproxy: url): string[];
/**
 * The collection should be loaded by the collection proxy.
Setting the collection to "nil" will revert it back to the original collection.
The collection proxy shouldn't be loaded and should have the 'Exclude' checkbox checked.
This functionality is designed to simplify the management of Live Update resources.
 * @param url the collection proxy component
 * @param prototype the path to the new collection, or `nil`
 * @returns collection change was successful & one of the collectionproxy.RESULT_* codes if unsuccessful
 * @example The example assume the script belongs to an instance with collection-proxy-component with id "proxy".
```lua
local ok, error = collectionproxy.set_collection("/go#collectionproxy", "/LU/3.collectionc")
 if ok then
     print("The collection has been changed to /LU/3.collectionc")
 else
     print("Error changing collection to /LU/3.collectionc ", error)
 end
 msg.post("/go#collectionproxy", "load")
 msg.post("/go#collectionproxy", "init")
 msg.post("/go#collectionproxy", "enable")
```
 */
export function set_collection(url?: string | hash | url, prototype?: string | undefined): LuaMultiReturn<[boolean, number]>;
}

declare namespace crash {
/**
 * android build fingerprint
 */
export const SYSFIELD_ANDROID_BUILD_FINGERPRINT: number;
/**
 * system device language as reported by sys.get_sys_info
 */
export const SYSFIELD_DEVICE_LANGUAGE: number;
/**
 * device model as reported by sys.get_sys_info
 */
export const SYSFIELD_DEVICE_MODEL: number;
/**
 * engine version as hash
 */
export const SYSFIELD_ENGINE_HASH: number;
/**
 * engine version as release number
 */
export const SYSFIELD_ENGINE_VERSION: number;
/**
 * system language as reported by sys.get_sys_info
 */
export const SYSFIELD_LANGUAGE: number;
/**
 * device manufacturer as reported by sys.get_sys_info
 */
export const SYSFIELD_MANUFACTURER: number;
/**
 * The max number of sysfields.
 */
export const SYSFIELD_MAX: number;
/**
 * system name as reported by sys.get_sys_info
 */
export const SYSFIELD_SYSTEM_NAME: number;
/**
 * system version as reported by sys.get_sys_info
 */
export const SYSFIELD_SYSTEM_VERSION: number;
/**
 * system territory as reported by sys.get_sys_info
 */
export const SYSFIELD_TERRITORY: number;
/**
 * The max number of user fields.
 */
export const USERFIELD_MAX: number;
/**
 * The max size of a single user field.
 */
export const USERFIELD_SIZE: number;
/**
 * A table is returned containing the addresses of the call stack.
 * @param handle crash dump handle
 * @returns table containing the backtrace
 */
export function get_backtrace(handle: number): object;
/**
 * The format of read text blob is platform specific
and not guaranteed
but can be useful for manual inspection.
 * @param handle crash dump handle
 * @returns string with the platform specific data
 */
export function get_extra_data(handle: number): string;
/**
 * The function returns a table containing entries with sub-tables that
have fields 'name' and 'address' set for all loaded modules.
 * @param handle crash dump handle
 */
export function get_modules(handle: number): { name: unknown; address: unknown }[];
/**
 * read signal number from a crash report
 * @param handle crash dump handle
 * @returns signal number
 */
export function get_signum(handle: number): number;
/**
 * reads a system field from a loaded crash dump
 * @param handle crash dump handle
 * @param index system field enum. Must be less than crash.SYSFIELD_MAX
 * @returns value recorded in the crash dump, or `nil` if it didn't exist
 */
export function get_sys_field(handle: number, index: number): string | undefined;
/**
 * reads user field from a loaded crash dump
 * @param handle crash dump handle
 * @param index user data slot index
 * @returns user data value recorded in the crash dump
 */
export function get_user_field(handle: number, index: number): string;
/**
 * The crash dump will be removed from disk upon a successful
load, so loading is one-shot.
 * @returns handle to the loaded dump, or `nil` if no dump was found
 */
export function load_previous(): number | undefined;
/**
 * releases a previously loaded crash dump
 * @param handle handle to loaded crash dump
 */
export function release(handle: number): void;
/**
 * Crashes occuring before the path is set will be stored to a default engine location.
 * @param path file path to use
 */
export function set_file_path(path: string): void;
/**
 * Store a user value that will get written to a crash dump when
a crash occurs. This can be user id:s, breadcrumb data etc.
There are 32 slots indexed from 0. Each slot stores at most 255 characters.
 * @param index slot index. 0-indexed
 * @param value string value to store
 */
export function set_user_field(index: number, value: string): void;
/**
 * Performs the same steps as if a crash had just occured but
allows the program to continue.
The generated dump can be read by crash.load_previous
 */
export function write_dump(): void;
}

declare namespace factory {
/**
 * loaded
 */
export const STATUS_LOADED: number;
/**
 * loading
 */
export const STATUS_LOADING: number;
/**
 * unloaded
 */
export const STATUS_UNLOADED: number;
/**
 * The URL identifies which factory should create the game object.
If the game object is created inside of the frame (e.g. from an update callback), the game object will be created instantly, but none of its component will be updated in the same frame.
Properties defined in scripts in the created game object can be overridden through the properties-parameter below.
See go.property for more information on script properties.
⚠ Calling factory.create on a factory that is marked as dynamic without having loaded resources
using factory.load will synchronously load and create resources which may affect application performance.
 * @param url the factory that should create a game object.
 * @param position the position of the new game object, the position of the game object calling `factory.create()` is used by default, or if the value is `nil`.
 * @param rotation the rotation of the new game object, the rotation of the game object calling `factory.create()` is used by default, or if the value is `nil`.
 * @param properties the properties defined in a script attached to the new game object.
 * @param scale the scale of the new game object (must be greater than 0), the scale of the game object containing the factory is used by default, or if the value is `nil`
 * @returns the global id of the spawned game object
 * @example How to create a new game object:
```lua
function init(self)
    -- create a new game object and provide property values
    self.my_created_object = factory.create("#factory", nil, nil, {my_value = 1})
    -- communicate with the object
    msg.post(self.my_created_object, "hello")
end
```

And then let the new game object have a script attached:
```lua
go.property("my_value", 0)

function init(self)
    -- do something with self.my_value which is now one
end
```
 */
export function create(url: string | hash | url, position?: vmath.vector3, rotation?: vmath.quaternion, properties?: object, scale?: number | vmath.vector3): hash;
/**
 * This returns status of the factory.
Calling this function when the factory is not marked as dynamic loading always returns
factory.STATUS_LOADED.
 * @param url the factory component to get status from
 * @returns status of the factory component

`factory.STATUS_UNLOADED`
`factory.STATUS_LOADING`
`factory.STATUS_LOADED`

 */
export function get_status(url?: string | hash | url): number;
/**
 * Resources are referenced by the factory component until the existing (parent) collection is destroyed or factory.unload is called.
Calling this function when the factory is not marked as dynamic loading does nothing.
 * @param url the factory component to load
 * @param complete_function function to call when resources are loaded.

`self`
object The current object.
`url`
url url of the factory component
`result`
boolean True if resources were loaded successfully

 * @example How to load resources of a factory prototype.
```lua
factory.load("#factory", function(self, url, result) end)
```
 */
export function load(url?: string | hash | url, complete_function?: (this: any, url: url, result: boolean,) => void): void;
/**
 * Changes the prototype for the factory.
 * @param url the factory component
 * @param prototype the path to the new prototype, or `nil`
 * @example How to unload the previous prototypes resources, and then spawn a new game object
```lua
factory.unload("#factory") -- unload the previous resources
factory.set_prototype("#factory", "/main/levels/enemyA.goc")
local id = factory.create("#factory", go.get_world_position(), vmath.quat())
```
 */
export function set_prototype(url?: string | hash | url, prototype?: string | undefined): void;
/**
 * This decreases the reference count for each resource loaded with factory.load. If reference is zero, the resource is destroyed.
Calling this function when the factory is not marked as dynamic loading does nothing.
 * @param url the factory component to unload
 * @example How to unload resources of a factory prototype loaded with factory.load
```lua
factory.unload("#factory")
```
 */
export function unload(url?: string | hash | url): void;
}

declare namespace font {
/**
 * associates a ttf resource to a .fontc file.
 * @param fontc The path to the .fontc resource
 * @param ttf The path to the .ttf resource
 * @example ```lua
local font_hash = hash("/assets/fonts/roboto.fontc")
local ttf_hash = hash("/assets/fonts/Roboto/Roboto-Bold.ttf")
font.add_font(font_hash, ttf_hash)
```
 */
export function add_font(fontc: string | hash, ttf: string | hash): void;
/**
 * Gets information about a font, such as the associated font files
 * @param fontc The path to the .fontc resource
 */
export function get_info(fontc: string | hash): { path: hash, fonts: { path: string, path_hash: hash }[] };
/**
 * prepopulates the font glyph cache with rasterised glyphs
 * @param fontc The path to the .fontc resource
 * @param text The text to layout
 * @param callback (optional) A callback function that is called after the request is finished

`self`
object The current object.
`request_id`
number The request id
`result`
boolean True if request was succesful
`errstring`
string `nil` if the request was successful

 * @returns Returns the asynchronous request id
 * @example ```lua
local font_hash = hash("/assets/fonts/roboto.fontc")
font.prewarm_text(font_hash, "Some text", function (self, request_id, result, errstring)
        -- cache is warm, show the text!
    end)
```
 */
export function prewarm_text(fontc: string | hash, text: string, callback?: ((this: any, request_id: any, result: any, errstring: any) => void)): number;
/**
 * associates a ttf resource to a .fontc file
 * @param fontc The path to the .fontc resource
 * @param ttf The path to the .ttf resource
 * @example ```lua
local font_hash = hash("/assets/fonts/roboto.fontc")
local ttf_hash = hash("/assets/fonts/Roboto/Roboto-Bold.ttf")
font.remove_font(font_hash, ttf_hash)
```
 */
export function remove_font(fontc: string | hash, ttf: string | hash): void;
}

declare namespace go {
/**
 * in-back
 */
export const EASING_INBACK: number;
/**
 * in-bounce
 */
export const EASING_INBOUNCE: number;
/**
 * in-circlic
 */
export const EASING_INCIRC: number;
/**
 * in-cubic
 */
export const EASING_INCUBIC: number;
/**
 * in-elastic
 */
export const EASING_INELASTIC: number;
/**
 * in-exponential
 */
export const EASING_INEXPO: number;
/**
 * in-out-back
 */
export const EASING_INOUTBACK: number;
/**
 * in-out-bounce
 */
export const EASING_INOUTBOUNCE: number;
/**
 * in-out-circlic
 */
export const EASING_INOUTCIRC: number;
/**
 * in-out-cubic
 */
export const EASING_INOUTCUBIC: number;
/**
 * in-out-elastic
 */
export const EASING_INOUTELASTIC: number;
/**
 * in-out-exponential
 */
export const EASING_INOUTEXPO: number;
/**
 * in-out-quadratic
 */
export const EASING_INOUTQUAD: number;
/**
 * in-out-quartic
 */
export const EASING_INOUTQUART: number;
/**
 * in-out-quintic
 */
export const EASING_INOUTQUINT: number;
/**
 * in-out-sine
 */
export const EASING_INOUTSINE: number;
/**
 * in-quadratic
 */
export const EASING_INQUAD: number;
/**
 * in-quartic
 */
export const EASING_INQUART: number;
/**
 * in-quintic
 */
export const EASING_INQUINT: number;
/**
 * in-sine
 */
export const EASING_INSINE: number;
/**
 * linear interpolation
 */
export const EASING_LINEAR: number;
/**
 * out-back
 */
export const EASING_OUTBACK: number;
/**
 * out-bounce
 */
export const EASING_OUTBOUNCE: number;
/**
 * out-circlic
 */
export const EASING_OUTCIRC: number;
/**
 * out-cubic
 */
export const EASING_OUTCUBIC: number;
/**
 * out-elastic
 */
export const EASING_OUTELASTIC: number;
/**
 * out-exponential
 */
export const EASING_OUTEXPO: number;
/**
 * out-in-back
 */
export const EASING_OUTINBACK: number;
/**
 * out-in-bounce
 */
export const EASING_OUTINBOUNCE: number;
/**
 * out-in-circlic
 */
export const EASING_OUTINCIRC: number;
/**
 * out-in-cubic
 */
export const EASING_OUTINCUBIC: number;
/**
 * out-in-elastic
 */
export const EASING_OUTINELASTIC: number;
/**
 * out-in-exponential
 */
export const EASING_OUTINEXPO: number;
/**
 * out-in-quadratic
 */
export const EASING_OUTINQUAD: number;
/**
 * out-in-quartic
 */
export const EASING_OUTINQUART: number;
/**
 * out-in-quintic
 */
export const EASING_OUTINQUINT: number;
/**
 * out-in-sine
 */
export const EASING_OUTINSINE: number;
/**
 * out-quadratic
 */
export const EASING_OUTQUAD: number;
/**
 * out-quartic
 */
export const EASING_OUTQUART: number;
/**
 * out-quintic
 */
export const EASING_OUTQUINT: number;
/**
 * out-sine
 */
export const EASING_OUTSINE: number;
/**
 * loop backward
 */
export const PLAYBACK_LOOP_BACKWARD: number;
/**
 * loop forward
 */
export const PLAYBACK_LOOP_FORWARD: number;
/**
 * ping pong loop
 */
export const PLAYBACK_LOOP_PINGPONG: number;
/**
 * no playback
 */
export const PLAYBACK_NONE: number;
/**
 * once backward
 */
export const PLAYBACK_ONCE_BACKWARD: number;
/**
 * once forward
 */
export const PLAYBACK_ONCE_FORWARD: number;
/**
 * once ping pong
 */
export const PLAYBACK_ONCE_PINGPONG: number;
/**
 * This is only supported for numerical properties. If the node property is already being
animated, that animation will be canceled and replaced by the new one.
If a `complete_function` (lua function) is specified, that function will be called when the animation has completed.
By starting a new animation in that function, several animations can be sequenced together. See the examples for more information.
⚠ If you call `go.animate()` from a game object's `final()` function,
any passed `complete_function` will be ignored and never called upon animation completion.
See the properties guide for which properties can be animated and the animation guide for how
them.
 * @param url url of the game object or component having the property
 * @param property id of the property to animate
 * @param playback playback mode of the animation

`go.PLAYBACK_ONCE_FORWARD`
`go.PLAYBACK_ONCE_BACKWARD`
`go.PLAYBACK_ONCE_PINGPONG`
`go.PLAYBACK_LOOP_FORWARD`
`go.PLAYBACK_LOOP_BACKWARD`
`go.PLAYBACK_LOOP_PINGPONG`

 * @param to target property value
 * @param easing easing to use during animation. Either specify a constant, see the animation guide for a complete list, or a vmath.vector with a curve
 * @param duration duration of the animation in seconds
 * @param delay delay before the animation starts in seconds
 * @param complete_function optional function to call when the animation has completed

`self`

object The current object.

`url`

url The game object or component instance for which the property is animated.

`property`

hash The id of the animated property.


 * @example Animate the position of a game object to x = 10 during 1 second, then y = 20 during 1 second:
```lua
local function x_done(self, url, property)
    go.animate(go.get_id(), "position.y", go.PLAYBACK_ONCE_FORWARD, 20, go.EASING_LINEAR, 1)
end

function init(self)
    go.animate(go.get_id(), "position.x", go.PLAYBACK_ONCE_FORWARD, 10, go.EASING_LINEAR, 1, 0, x_done)
end
```

Animate the y position of a game object using a crazy custom easing curve:
```lua
local values = { 0, 0, 0, 0, 0, 0, 0, 0,
                 1, 1, 1, 1, 1, 1, 1, 1,
                 0, 0, 0, 0, 0, 0, 0, 0,
                 1, 1, 1, 1, 1, 1, 1, 1,
                 0, 0, 0, 0, 0, 0, 0, 0,
                 1, 1, 1, 1, 1, 1, 1, 1,
                 0, 0, 0, 0, 0, 0, 0, 0,
                 1, 1, 1, 1, 1, 1, 1, 1 }
local vec = vmath.vector(values)
go.animate("go", "position.y", go.PLAYBACK_LOOP_PINGPONG, 100, vec, 2.0)
```
 */
export function animate(url: string | hash | url, property: string | hash, playback: typeof go.PLAYBACK_ONCE_FORWARD | typeof go.PLAYBACK_ONCE_BACKWARD | typeof go.PLAYBACK_ONCE_PINGPONG | typeof go.PLAYBACK_LOOP_FORWARD | typeof go.PLAYBACK_LOOP_BACKWARD | typeof go.PLAYBACK_LOOP_PINGPONG, to: number | vmath.vector3 | vmath.vector4 | vmath.quaternion, easing: number | vmath.vector3 | vmath.vector4 | vmath.quaternion | ReturnType<typeof vmath.vector>, duration: number, delay?: number, complete_function?: ((this: any, url: any, property: any) => void)): void;
/**
 * By calling this function, all or specified stored property animations of the game object or component will be canceled.
See the properties guide for which properties can be animated and the animation guide for how to animate them.
 * @param url url of the game object or component
 * @param property optional id of the property to cancel
 * @example Cancel the animation of the position of a game object:
```lua
go.cancel_animations(go.get_id(), "position")
```

Cancel all property animations of the current game object:
```lua
go.cancel_animations(".")
```

Cancel all property animations of the sprite component of the current game object:
```lua
go.cancel_animations("#sprite")
```
 */
export function cancel_animations(url: string | hash | url, property?: string | hash): void;
/**
 * Delete one or more game objects identified by id. Deletion is asynchronous meaning that
the game object(s) are scheduled for deletion which will happen at the end of the current
frame. Note that game objects scheduled for deletion will be counted against
`max_instances` in "game.project" until they are actually removed.
⚠ Deleting a game object containing a particle FX component emitting particles will not immediately stop the particle FX from emitting particles. You need to manually stop the particle FX using `particlefx.stop()`.
⚠ Deleting a game object containing a sound component that is playing will not immediately stop the sound from playing. You need to manually stop the sound using `sound.stop()`.
 * @param id optional id or table of id's of the instance(s) to delete, the instance of the calling script is deleted by default
 * @param recursive optional boolean, set to true to recursively delete child hiearchy in child to parent order
 * @example This example demonstrates how to delete game objects
```lua
-- Delete the script game object
go.delete()
-- Delete a game object with the id "my_game_object".
local id = go.get_id("my_game_object") -- retrieve the id of the game object to be deleted
go.delete(id)
-- Delete a list of game objects.
local ids = { hash("/my_object_1"), hash("/my_object_2"), hash("/my_object_3") }
go.delete(ids)
```

This example demonstrates how to delete a game objects and their children (child to parent order)
```lua
-- Delete the script game object and it's children
go.delete(true)
-- Delete a game object with the id "my_game_object" and it's children.
local id = go.get_id("my_game_object") -- retrieve the id of the game object to be deleted
go.delete(id, true)
-- Delete a list of game objects and their children.
local ids = { hash("/my_object_1"), hash("/my_object_2"), hash("/my_object_3") }
go.delete(ids, true)
```
 */
export function delete_(id?: string | hash | url | object, recursive?: boolean): void;
export {delete_ as delete};
/**
 * This function can check for game objects in any collection by specifying
the collection name in the URL.
 * @param url url of the game object to check
 * @returns true if the game object exists
 * @example Check if game object "my_game_object" exists in the current collection
```lua
go.exists("/my_game_object")
```

Check if game object exists in another collection
```lua
go.exists("other_collection:/my_game_object")
```
 */
export function exists(url: string | hash | url): boolean;
/**
 * This is a callback-function, which is called by the engine when a script component is finalized (destroyed). It can
be used to e.g. take some last action, report the finalization to other game object instances, delete spawned objects
or release user input focus (see release_input_focus).
 * @param this reference to the script state to be used for storing data
 * @example ```lua
function final(self)
    -- report finalization
    msg.post("my_friend_instance", "im_dead", {my_stats = self.some_value})
end
```
 */
export function final(this: LuaUserdata): void;
/**
 * This is a callback-function, which is called by the engine at fixed intervals to update the state of a script
component. The function will be called if 'Fixed Update Frequency' is enabled in the Engine section of game.project.
It can for instance be used to update game logic with the physics simulation if using a fixed timestep for the
physics (enabled by ticking 'Use Fixed Timestep' in the Physics section of game.project).
 * @param this reference to the script state to be used for storing data
 * @param dt the time-step of the frame update
 */
export function fixed_update(this: LuaUserdata, dt: number): void;
/**
 * gets a named property of the specified game object or component
 * @param url url of the game object or component having the property
 * @param property id of the property to retrieve
 * @param options optional options table
- index number index into array property (1 based)
- key hash name of internal property
 * @example Get a property "speed" from a script "player", the property must be declared in the player-script:
```lua
go.property("speed", 50)
```

Then in the calling script (assumed to belong to the same game object, but does not have to):
```lua
local speed = go.get("#player", "speed")
```Get a value in a material property array

```lua
-- get the first vector4 in the array: example[0] (the glsl indices are 0-based)
go.get(url, "example", {index=1})

-- get the last vector4 in the array: example[15] (the glsl indices are 0-based)
go.get(url, "example", {index=16})

-- get an element of a vector4 in the array: example[0].x (the glsl indices are 0-based)
go.get(url, "example.x", {index=1})
```

Getting all values in a material property array as a table
```lua
-- get all vector4's in the constant array
go.get(url, "example")
-- result: { vector4, vector4, ... }

-- get all elements of the vector4's from an array
go.get(url, "example.x")
-- result: { number1, number2, ... }
```Get a named property

```lua
function init(self)
    -- get the resource of a certain gui font
    local font_hash = go.get("#gui", "fonts", {key = "system_font_BIG"})
end
```
 */
export function get(url: string | hash | url, property: string | hash, options?: object): unknown;
/**
 * Returns or constructs an instance identifier. The instance id is a hash
of the absolute path to the instance.

If `path` is specified, it can either be absolute or relative to the instance of the calling script.
If `path` is not specified, the id of the game object instance the script is attached to will be returned.

 * @param path path of the instance for which to return the id
 * @returns instance id
 * @example For the instance with path ```lua
/my_sub_collection/my_instance```, the following calls are equivalent:
```lua
local id = go.get_id() -- no path, defaults to the instance containing the calling script
print(id) --> hash: [/my_sub_collection/my_instance]

local id = go.get_id("/my_sub_collection/my_instance") -- absolute path
print(id) --> hash: [/my_sub_collection/my_instance]

local id = go.get_id("my_instance") -- relative path
print(id) --> hash: [/my_sub_collection/my_instance]
```
 */
export function get_id(path?: string): hash;
/**
 * Get the parent for a game object instance.
 * @param id optional id of the game object instance to get parent for, defaults to the instance containing the calling script
 * @returns parent instance or `nil`
 * @example Get parent of the instance containing the calling script:
```lua
local parent_id = go.get_parent()
```

Get parent of the instance with id "x":
```lua
local parent_id = go.get_parent("x")
```
 */
export function get_parent(id?: string | hash | url): hash | undefined;
/**
 * The position is relative the parent (if any). Use go.get_world_position to retrieve the global world position.
 * @param id optional id of the game object instance to get the position for, by default the instance of the calling script
 * @returns instance position
 * @example Get the position of the game object instance the script is attached to:
```lua
local p = go.get_position()
```

Get the position of another game object instance "my_gameobject":
```lua
local pos = go.get_position("my_gameobject")
```
 */
export function get_position(id?: string | hash | url): vmath.vector3;
/**
 * The rotation is relative to the parent (if any). Use go.get_world_rotation to retrieve the global world rotation.
 * @param id optional id of the game object instance to get the rotation for, by default the instance of the calling script
 * @returns instance rotation
 * @example Get the rotation of the game object instance the script is attached to:
```lua
local r = go.get_rotation()
```

Get the rotation of another game object instance with id "x":
```lua
local r = go.get_rotation("x")
```
 */
export function get_rotation(id?: string | hash | url): vmath.quaternion;
/**
 * The scale is relative the parent (if any). Use go.get_world_scale to retrieve the global world 3D scale factor.
 * @param id optional id of the game object instance to get the scale for, by default the instance of the calling script
 * @returns instance scale factor
 * @example Get the scale of the game object instance the script is attached to:
```lua
local s = go.get_scale()
```

Get the scale of another game object instance with id "x":
```lua
local s = go.get_scale("x")
```
 */
export function get_scale(id?: string | hash | url): vmath.vector3;
/**
 * The uniform scale is relative the parent (if any). If the underlying scale vector is non-uniform the min element of the vector is returned as the uniform scale factor.
 * @param id optional id of the game object instance to get the uniform scale for, by default the instance of the calling script
 * @returns uniform instance scale factor
 * @example Get the scale of the game object instance the script is attached to:
```lua
local s = go.get_scale_uniform()
```

Get the uniform scale of another game object instance with id "x":
```lua
local s = go.get_scale_uniform("x")
```
 */
export function get_scale_uniform(id?: string | hash | url): number;
/**
 * The function will return the world position calculated at the end of the previous frame.
To recalculate it within the current frame, use go.update_world_transform on the instance before calling this.
Use go.get_position to retrieve the position relative to the parent.
 * @param id optional id of the game object instance to get the world position for, by default the instance of the calling script
 * @returns instance world position
 * @example Get the world position of the game object instance the script is attached to:
```lua
local p = go.get_world_position()
```

Get the world position of another game object instance with id "x":
```lua
local p = go.get_world_position("x")
```
 */
export function get_world_position(id?: string | hash | url): vmath.vector3;
/**
 * The function will return the world rotation calculated at the end of the previous frame.
To recalculate it within the current frame, use go.update_world_transform on the instance before calling this.
Use go.get_rotation to retrieve the rotation relative to the parent.
 * @param id optional id of the game object instance to get the world rotation for, by default the instance of the calling script
 * @returns instance world rotation
 * @example Get the world rotation of the game object instance the script is attached to:
```lua
local r = go.get_world_rotation()
```

Get the world rotation of another game object instance with id "x":
```lua
local r = go.get_world_rotation("x")
```
 */
export function get_world_rotation(id?: string | hash | url): vmath.quaternion;
/**
 * The function will return the world 3D scale factor calculated at the end of the previous frame.
To recalculate it within the current frame, use go.update_world_transform on the instance before calling this.
Use go.get_scale to retrieve the 3D scale factor relative to the parent.
This vector is derived by decomposing the transformation matrix and should be used with care.
For most cases it should be fine to use go.get_world_scale_uniform instead.
 * @param id optional id of the game object instance to get the world scale for, by default the instance of the calling script
 * @returns instance world 3D scale factor
 * @example Get the world 3D scale of the game object instance the script is attached to:
```lua
local s = go.get_world_scale()
```

Get the world scale of another game object instance "x":
```lua
local s = go.get_world_scale("x")
```
 */
export function get_world_scale(id?: string | hash | url): vmath.vector3;
/**
 * The function will return the world scale factor calculated at the end of the previous frame.
To recalculate it within the current frame, use go.update_world_transform on the instance before calling this.
Use go.get_scale_uniform to retrieve the scale factor relative to the parent.
 * @param id optional id of the game object instance to get the world scale for, by default the instance of the calling script
 * @returns instance world scale factor
 * @example Get the world scale of the game object instance the script is attached to:
```lua
local s = go.get_world_scale_uniform()
```

Get the world scale of another game object instance with id "x":
```lua
local s = go.get_world_scale_uniform("x")
```
 */
export function get_world_scale_uniform(id?: string | hash | url): number;
/**
 * The function will return the world transform matrix calculated at the end of the previous frame.
To recalculate it within the current frame, use go.update_world_transform on the instance before calling this.
 * @param id optional id of the game object instance to get the world transform for, by default the instance of the calling script
 * @returns instance world transform
 * @example Get the world transform of the game object instance the script is attached to:
```lua
local m = go.get_world_transform()
```

Get the world transform of another game object instance with id "x":
```lua
local m = go.get_world_transform("x")
```
 */
export function get_world_transform(id?: string | hash | url): vmath.matrix4;
/**
 * This is a callback-function, which is called by the engine when a script component is initialized. It can be used
to set the initial state of the script.
 * @param this reference to the script state to be used for storing data
 * @example ```lua
function init(self)
    -- set up useful data
    self.my_value = 1
end
```
 */
export function init(this: LuaUserdata): void;
/**
 * This is a callback-function, which is called by the engine at the end of the frame to update the state of a script
component. Use it to make final adjustments to the game object instance.
 * @param this reference to the script state to be used for storing data
 * @param dt the time-step of the frame update
 */
export function late_update(this: LuaUserdata, dt: number): void;
/**
 * This is a callback-function, which is called by the engine when user input is sent to the game object instance of the script.
It can be used to take action on the input, e.g. move the instance according to the input.
For an instance to obtain user input, it must first acquire input focus
through the message `acquire_input_focus`.
Any instance that has obtained input will be put on top of an
input stack. Input is sent to all listeners on the stack until the
end of stack is reached, or a listener returns `true`
to signal that it wants input to be consumed.
See the documentation of acquire_input_focus for more
information.
The `action` parameter is a table containing data about the input mapped to the
`action_id`.
For mapped actions it specifies the value of the input and if it was just pressed or released.
Actions are mapped to input in an input_binding-file.
Mouse movement is specifically handled and uses `nil` as its `action_id`.
The `action` only contains positional parameters in this case, such as x and y of the pointer.
Here is a brief description of the available table fields:



Field
Description




`value`
The amount of input given by the user. This is usually 1 for buttons and 0-1 for analogue inputs. This is not present for mouse movement and text input.


`pressed`
If the input was pressed this frame. This is not present for mouse movement and text input.


`released`
If the input was released this frame. This is not present for mouse movement and text input.


`repeated`
If the input was repeated this frame. This is similar to how a key on a keyboard is repeated when you hold it down. This is not present for mouse movement and text input.


`x`
The x value of a pointer device, if present. This is not present for gamepad, key and text input.


`y`
The y value of a pointer device, if present. This is not present for gamepad, key and text input.


`screen_x`
The screen space x value of a pointer device, if present. This is not present for gamepad, key and text input.


`screen_y`
The screen space y value of a pointer device, if present. This is not present for gamepad, key and text input.


`dx`
The change in x value of a pointer device, if present. This is not present for gamepad, key and text input.


`dy`
The change in y value of a pointer device, if present. This is not present for gamepad, key and text input.


`screen_dx`
The change in screen space x value of a pointer device, if present. This is not present for gamepad, key and text input.


`screen_dy`
The change in screen space y value of a pointer device, if present. This is not present for gamepad, key and text input.


`gamepad`
The index of the gamepad device that provided the input. See table below about gamepad input.


`touch`
List of touch input, one element per finger, if present. See table below about touch input


`text`
Text input from a (virtual) keyboard or similar.


`marked_text`
Sequence of entered symbols while entering a symbol combination, for example Japanese Kana.



Gamepad specific fields:



Field
Description




`gamepad`
The index of the gamepad device that provided the input.


`userid`
Id of the user associated with the controller. Usually only relevant on consoles.


`gamepad_unknown`
True if the inout originated from an unknown/unmapped gamepad.


`gamepad_name`
Name of the gamepad


`gamepad_axis`
List of gamepad axis values. For raw gamepad input only.


`gamepadhats`
List of gamepad hat values. For raw gamepad input only.


`gamepad_buttons`
List of gamepad button values. For raw gamepad input only.



Touch input table:



Field
Description




`id`
A number identifying the touch input during its duration.


`pressed`
True if the finger was pressed this frame.


`released`
True if the finger was released this frame.


`tap_count`
Number of taps, one for single, two for double-tap, etc


`x`
The x touch location.


`y`
The y touch location.


`dx`
The change in x value.


`dy`
The change in y value.


`acc_x`
Accelerometer x value (if present).


`acc_y`
Accelerometer y value (if present).


`acc_z`
Accelerometer z value (if present).



 * @param this reference to the script state to be used for storing data
 * @param action_id id of the received input action, as mapped in the input_binding-file
 * @param action a table containing the input data, see above for a description
 * @returns optional boolean to signal if the input should be consumed (not passed on to others) or not, default is false
 * @example This example demonstrates how a game object instance can be moved as a response to user input.
```lua
function init(self)
    -- acquire input focus
    msg.post(".", "acquire_input_focus")
    -- maximum speed the instance can be moved
    self.max_speed = 2
    -- velocity of the instance, initially zero
    self.velocity = vmath.vector3()
end

function update(self, dt)
    -- move the instance
    go.set_position(go.get_position() + dt * self.velocity)
end

function on_input(self, action_id, action)
    -- check for movement input
    if action_id == hash("right") then
        if action.released then -- reset velocity if input was released
            self.velocity = vmath.vector3()
        else -- update velocity
            self.velocity = vmath.vector3(action.value * self.max_speed, 0, 0)
        end
    end
end
```
 */
export function on_input(this: LuaUserdata, action_id: hash, action: object): boolean | undefined;
/**
 * This is a callback-function, which is called by the engine whenever a message has been sent to the script component.
It can be used to take action on the message, e.g. send a response back to the sender of the message.
The `message` parameter is a table containing the message data. If the message is sent from the engine, the
documentation of the message specifies which data is supplied.
 * @param this reference to the script state to be used for storing data
 * @param message_id id of the received message
 * @param message a table containing the message data
 * @param sender address of the sender
 * @example This example demonstrates how a game object instance, called "a", can communicate with another instance, called "b". It
is assumed that both script components of the instances has id "script".
Script of instance "a":
```lua
function init(self)
    -- let b know about some important data
    msg.post("b#script", "my_data", {important_value = 1})
end
```

Script of instance "b":
```lua
function init(self)
    -- store the url of instance "a" for later use, by specifying nil as socket we
    -- automatically use our own socket
    self.a_url = msg.url(nil, go.get_id("a"), "script")
end

function on_message(self, message_id, message, sender)
    -- check message and sender
    if message_id == hash("my_data") and sender == self.a_url then
        -- use the data in some way
        self.important_value = message.important_value
    end
end
```
 */
export function on_message(this: LuaUserdata, message_id: hash, message: object, sender: url): void;
/**
 * This is a callback-function, which is called by the engine when the script component is reloaded, e.g. from the editor.
It can be used for live development, e.g. to tweak constants or set up the state properly for the instance.
 * @param this reference to the script state to be used for storing data
 * @example This example demonstrates how to tweak the speed of a game object instance that is moved on user input.
```lua
function init(self)
    -- acquire input focus
    msg.post(".", "acquire_input_focus")
    -- maximum speed the instance can be moved, this value is tweaked in the on_reload function below
    self.max_speed = 2
    -- velocity of the instance, initially zero
    self.velocity = vmath.vector3()
end

function update(self, dt)
    -- move the instance
    go.set_position(go.get_position() + dt * self.velocity)
end

function on_input(self, action_id, action)
    -- check for movement input
    if action_id == hash("right") then
        if action.released then -- reset velocity if input was released
            self.velocity = vmath.vector3()
        else -- update velocity
            self.velocity = vmath.vector3(action.value * self.max_speed, 0, 0)
        end
    end
end

function on_reload(self)
    -- edit this value and reload the script component
    self.max_speed = 100
end
```
 */
export function on_reload(this: LuaUserdata): void;
/**
 * This function defines a property which can then be used in the script through the self-reference.
The properties defined this way are automatically exposed in the editor in game objects and collections which use the script.
Note that you can only use this function outside any callback-functions like init and update.
 * @param name the id of the property
 * @param value default value of the property. In the case of a url, only the empty constructor msg.url() is allowed. In the case of a resource one of the resource constructors (eg resource.atlas(), resource.font() etc) is expected.
 * @example This example demonstrates how to define a property called "health" in a script.
The health is decreased whenever someone sends a message called "take_damage" to the script.
```lua
go.property("health", 100)

function init(self)
    -- prints 100 to the output
    print(self.health)
end

function on_message(self, message_id, message, sender)
    if message_id == hash("take_damage") then
        self.health = self.health - message.damage
        print("Ouch! My health is now: " .. self.health)
    end
end
```
 */
export function property(name: string, value: number | hash | url | vmath.vector3 | vmath.vector4 | vmath.quaternion | any | boolean): void;
/**
 * sets a named property of the specified game object or component, or a material constant
 * @param url url of the game object or component having the property
 * @param property id of the property to set
 * @param value the value to set
 * @param options optional options table
- index integer index into array property (1 based)
- key hash name of internal property
 * @example Set a property "speed" of a script "player", the property must be declared in the player-script:
```lua
go.property("speed", 50)
```

Then in the calling script (assumed to belong to the same game object, but does not have to):
```lua
go.set("#player", "speed", 100)
```Set a vector4 in a material property array

```lua
-- set the first vector4 in the array: example[0] = v (the glsl indices are 0-based)
go.set(url, "example", vmath.vector4(1,1,1,1), {index=1})

-- set the last vector4 in the array: example[15] = v (the glsl indices are 0-based)
go.set(url, "example", vmath.vector4(2,2,2,2), {index=16})

-- set an element of a vector4 in the array: example[0].x = 7 (the glsl indices are 0-based)
go.set(url, "example.x", 7, {index=1})
```

Set a material property array by a table of vector4
```lua
-- set the first two vector4's in the array
-- if the array has more than two elements in the array they will not be set
go.set(url, "example", { vmath.vector4(1,1,1,1), vmath.vector4(2,2,2,2) })
```Set a named property

```lua
go.property("big_font", resource.font())

function init(self)
    go.set("#gui", "fonts", self.big_font, {key = "system_font_BIG"})
end
```
 */
export function set(url: string | hash | url, property: string | hash, value: number | boolean | hash | url | vmath.vector3 | vmath.vector4 | vmath.quaternion | any, options?: object): void;
/**
 * Sets the parent for a game object instance. This means that the instance will exist in the geometrical space of its parent,
like a basic transformation hierarchy or scene graph. If no parent is specified, the instance will be detached from any parent and exist in world
space.
This function will generate a `set_parent` message. It is not until the message has been processed that the change actually takes effect. This
typically happens later in the same frame or the beginning of the next frame. Refer to the manual to learn how messages are processed by the
engine.
 * @param id optional id of the game object instance to set parent for, defaults to the instance containing the calling script
 * @param parent_id optional id of the new parent game object, defaults to detaching game object from its parent
 * @param keep_world_transform optional boolean, set to true to maintain the world transform when changing spaces. Defaults to false.
 * @example Attach myself to another instance "my_parent":
```lua
go.set_parent(go.get_id(),go.get_id("my_parent"))
```

Attach an instance "my_instance" to another instance "my_parent":
```lua
go.set_parent(go.get_id("my_instance"),go.get_id("my_parent"))
```

Detach an instance "my_instance" from its parent (if any):
```lua
go.set_parent(go.get_id("my_instance"))
```
 */
export function set_parent(id?: string | hash | url, parent_id?: string | hash | url, keep_world_transform?: boolean): void;
/**
 * The position is relative to the parent (if any). The global world position cannot be manually set.
 * @param position position to set
 * @param id optional id of the game object instance to set the position for, by default the instance of the calling script
 * @example Set the position of the game object instance the script is attached to:
```lua
local p = ...
go.set_position(p)
```

Set the position of another game object instance with id "x":
```lua
local p = ...
go.set_position(p, "x")
```
 */
export function set_position(position: vmath.vector3, id?: string | hash | url): void;
/**
 * The rotation is relative to the parent (if any). The global world rotation cannot be manually set.
 * @param rotation rotation to set
 * @param id optional id of the game object instance to get the rotation for, by default the instance of the calling script
 * @example Set the rotation of the game object instance the script is attached to:
```lua
local r = ...
go.set_rotation(r)
```

Set the rotation of another game object instance with id "x":
```lua
local r = ...
go.set_rotation(r, "x")
```
 */
export function set_rotation(rotation: vmath.quaternion, id?: string | hash | url): void;
/**
 * The scale factor is relative to the parent (if any). The global world scale factor cannot be manually set.
⚠ See manual to know how physics affected when setting scale from this function.
 * @param scale vector or uniform scale factor, must be greater than 0
 * @param id optional id of the game object instance to get the scale for, by default the instance of the calling script
 * @example Set the scale of the game object instance the script is attached to:
```lua
local s = vmath.vector3(2.0, 1.0, 1.0)
go.set_scale(s)
```

Set the scale of another game object instance with id "obj_id":
```lua
local s = 1.2
go.set_scale(s, "obj_id")
```
 */
export function set_scale(scale: number | vmath.vector3, id?: string | hash | url): void;
/**
 * The scale factor is relative to the parent (if any). The global world scale factor cannot be manually set.
⚠ See manual to know how physics affected when setting scale from this function.
 * @param scale vector or uniform scale factor, must be greater than 0
 * @param id optional id of the game object instance to get the scale for, by default the instance of the calling script
 * @example Set the scale of the game object instance the script is attached to:
```lua
local s = vmath.vector3(2.0, 1.0, 5.0)
go.set_scale_xy(s) -- z will not be set here, only x and y
```

Set the scale of another game object instance with id "obj_id":
```lua
local s = 1.2
go.set_scale_xy(s, "obj_id") -- z will not be set here, only x and y
```
 */
export function set_scale_xy(scale: number | vmath.vector3, id?: string | hash | url): void;
/**
 * This is a callback-function, which is called by the engine every frame to update the state of a script component.
It can be used to perform any kind of game related tasks, e.g. moving the game object instance.
 * @param this reference to the script state to be used for storing data
 * @param dt the time-step of the frame update
 * @example This example demonstrates how to move a game object instance through the script component:
```lua
function init(self)
    -- set initial velocity to be 1 along world x-axis
    self.my_velocity = vmath.vector3(1, 0, 0)
end

function update(self, dt)
    -- move the game object instance
    go.set_position(go.get_position() + dt * self.my_velocity)
end
```
 */
export function update(this: LuaUserdata, dt: number): void;
/**
 * Recalculates and updates the cached world transform immediately for the target instance
and its ancestors (parent chain up to the collection root). Descendants (children) are
not updated by this function.
If no id is provided, the instance of the calling script is used.
⚠ Use this after changing local transform mid-frame when you need the
new world transform right away (e.g. before end-of-frame updates). Note that child
instances will still have last-frame world transforms until the regular update.
 * @param id optional id of the game object instance to update
 * @example Update this game object's world transform:
```lua
go.update_world_transform()
```

Update another game object's world transform:
```lua
go.update_world_transform("/other")
```
 */
export function update_world_transform(id?: string | hash | url): void;
/**
 * ⚠ The function uses world transformation calculated at the end of previous frame.
 * @param position position which need to be converted
 * @param url url of the game object which coordinate system convert to
 * @returns converted position
 * @example Convert position of "test" game object into coordinate space of "child" object.
```lua
  local test_pos = go.get_world_position("/test")
  local child_pos = go.get_world_position("/child")
  local new_position = go.world_to_local_position(test_pos, "/child")
```
 */
export function world_to_local_position(position: vmath.vector3, url: string | hash | url): vmath.vector3;
/**
 * ⚠ The function uses world transformation calculated at the end of previous frame.
 * @param transformation transformation which need to be converted
 * @param url url of the game object which coordinate system convert to
 * @returns converted transformation
 * @example Convert transformation of "test" game object into coordinate space of "child" object.
```lua
   local test_transform = go.get_world_transform("/test")
   local child_transform = go.get_world_transform("/child")
   local result_transform = go.world_to_local_transform(test_transform, "/child")
```
 */
export function world_to_local_transform(transformation: vmath.matrix4, url: string | hash | url): vmath.matrix4;
}declare namespace go {
export type final = (this: any) => void;
export type fixed_update = (this: any, dt: number) => void;
export type init = (this: any) => void;
export type input_message = {
		value?: number;
		pressed?: boolean;
		released?: boolean;
		repeated?: boolean;
		x?: number;
		y?: number;
		screen_x?: number;
		screen_y?: number;
		dx?: number;
		dy?: number;
		screen_dx?: number;
		screen_dy?: number;
		gamepad?: number;
		touch?: touch_input[];
	};
export type late_update = (this: any, dt: number) => void;
export type on_input = (this: any, action_id: hash, action: go.input_message) => void;
export type on_message = (this: any, message_id: hash, message: object, sender: url) => void;
export type on_reload = (this: any) => void;
export type touch_input = {
		id: number;
		pressed: boolean;
		released: boolean;
		tap_count: number;
		x: number;
		y: number;
		dx: number;
		dy: number;
		acc_x?: number;
		acc_y?: number;
		acc_z?: number;
	};
export type update = (this: any, dt: number) => void;
}

declare namespace graphics {
export const BLEND_FACTOR_CONSTANT_ALPHA: number;
export const BLEND_FACTOR_CONSTANT_COLOR: number;
export const BLEND_FACTOR_DST_ALPHA: number;
export const BLEND_FACTOR_DST_COLOR: number;
export const BLEND_FACTOR_ONE: number;
export const BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA: number;
export const BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR: number;
export const BLEND_FACTOR_ONE_MINUS_DST_ALPHA: number;
export const BLEND_FACTOR_ONE_MINUS_DST_COLOR: number;
export const BLEND_FACTOR_ONE_MINUS_SRC_ALPHA: number;
export const BLEND_FACTOR_ONE_MINUS_SRC_COLOR: number;
export const BLEND_FACTOR_SRC_ALPHA: number;
export const BLEND_FACTOR_SRC_ALPHA_SATURATE: number;
export const BLEND_FACTOR_SRC_COLOR: number;
export const BLEND_FACTOR_ZERO: number;
export const BUFFER_TYPE_COLOR0_BIT: number;
/**
 * May be nil if multitarget rendering isn't supported
 */
export const BUFFER_TYPE_COLOR1_BIT: number;
/**
 * May be nil if multitarget rendering isn't supported
 */
export const BUFFER_TYPE_COLOR2_BIT: number;
/**
 * May be nil if multitarget rendering isn't supported
 */
export const BUFFER_TYPE_COLOR3_BIT: number;
export const BUFFER_TYPE_DEPTH_BIT: number;
export const BUFFER_TYPE_STENCIL_BIT: number;
export const COMPARE_FUNC_ALWAYS: number;
export const COMPARE_FUNC_EQUAL: number;
export const COMPARE_FUNC_GEQUAL: number;
export const COMPARE_FUNC_GREATER: number;
export const COMPARE_FUNC_LEQUAL: number;
export const COMPARE_FUNC_LESS: number;
export const COMPARE_FUNC_NEVER: number;
export const COMPARE_FUNC_NOTEQUAL: number;
export const COMPRESSION_TYPE_BASIS_ETC1S: number;
export const COMPRESSION_TYPE_BASIS_UASTC: number;
export const COMPRESSION_TYPE_DEFAULT: number;
export const COMPRESSION_TYPE_WEBP: number;
export const COMPRESSION_TYPE_WEBP_LOSSY: number;
export const FACE_TYPE_BACK: number;
export const FACE_TYPE_FRONT: number;
export const FACE_TYPE_FRONT_AND_BACK: number;
export const STATE_ALPHA_TEST: number;
export const STATE_ALPHA_TEST_SUPPORTED: number;
export const STATE_BLEND: number;
export const STATE_CULL_FACE: number;
export const STATE_DEPTH_TEST: number;
export const STATE_POLYGON_OFFSET_FILL: number;
export const STATE_SCISSOR_TEST: number;
export const STATE_STENCIL_TEST: number;
export const STENCIL_OP_DECR: number;
export const STENCIL_OP_DECR_WRAP: number;
export const STENCIL_OP_INCR: number;
export const STENCIL_OP_INCR_WRAP: number;
export const STENCIL_OP_INVERT: number;
export const STENCIL_OP_KEEP: number;
export const STENCIL_OP_REPLACE: number;
export const STENCIL_OP_ZERO: number;
export const TEXTURE_FILTER_DEFAULT: number;
export const TEXTURE_FILTER_LINEAR: number;
export const TEXTURE_FILTER_LINEAR_MIPMAP_LINEAR: number;
export const TEXTURE_FILTER_LINEAR_MIPMAP_NEAREST: number;
export const TEXTURE_FILTER_NEAREST: number;
export const TEXTURE_FILTER_NEAREST_MIPMAP_LINEAR: number;
export const TEXTURE_FILTER_NEAREST_MIPMAP_NEAREST: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_BGRA8U: number;
export const TEXTURE_FORMAT_DEPTH: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_LUMINANCE: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_LUMINANCE_ALPHA: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_R16F: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_R32F: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_R32UI: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RG16F: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RG32F: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGB: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGB16F: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGB32F: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA16F: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA32F: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA32UI: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA_16BPP: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA_ASTC_4X4: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA_BC3: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA_BC7: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA_ETC2: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGB_16BPP: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGB_BC1: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGB_ETC1: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGB_PVRTC_2BPPV1: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RGB_PVRTC_4BPPV1: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RG_BC5: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_RG_ETC2: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_R_BC4: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_FORMAT_R_ETC2: number;
export const TEXTURE_FORMAT_STENCIL: number;
export const TEXTURE_TYPE_2D: number;
export const TEXTURE_TYPE_2D_ARRAY: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_TYPE_3D: number;
export const TEXTURE_TYPE_CUBE_MAP: number;
export const TEXTURE_TYPE_IMAGE_2D: number;
/**
 * May be nil if the graphics driver doesn't support it
 */
export const TEXTURE_TYPE_IMAGE_3D: number;
export const TEXTURE_USAGE_FLAG_COLOR: number;
export const TEXTURE_USAGE_FLAG_INPUT: number;
export const TEXTURE_USAGE_FLAG_MEMORYLESS: number;
export const TEXTURE_USAGE_FLAG_SAMPLE: number;
export const TEXTURE_USAGE_FLAG_STORAGE: number;
export const TEXTURE_WRAP_CLAMP_TO_BORDER: number;
export const TEXTURE_WRAP_CLAMP_TO_EDGE: number;
export const TEXTURE_WRAP_MIRRORED_REPEAT: number;
export const TEXTURE_WRAP_REPEAT: number;
}

declare namespace gui {
/**
 * Adjust mode is used when the screen resolution differs from the project settings.
The fit mode ensures that the entire node is visible in the adjusted gui scene.
 */
export const ADJUST_FIT: number;
/**
 * Adjust mode is used when the screen resolution differs from the project settings.
The stretch mode ensures that the node is displayed as is in the adjusted gui scene, which might scale it non-uniformally.
 */
export const ADJUST_STRETCH: number;
/**
 * Adjust mode is used when the screen resolution differs from the project settings.
The zoom mode ensures that the node fills its entire area and might make the node exceed it.
 */
export const ADJUST_ZOOM: number;
/**
 * bottom y-anchor
 */
export const ANCHOR_BOTTOM: number;
/**
 * left x-anchor
 */
export const ANCHOR_LEFT: number;
/**
 * no anchor
 */
export const ANCHOR_NONE: number;
/**
 * right x-anchor
 */
export const ANCHOR_RIGHT: number;
/**
 * top y-anchor
 */
export const ANCHOR_TOP: number;
/**
 * additive blending
 */
export const BLEND_ADD: number;
/**
 * additive alpha blending
 */
export const BLEND_ADD_ALPHA: number;
/**
 * alpha blending
 */
export const BLEND_ALPHA: number;
/**
 * multiply blending
 */
export const BLEND_MULT: number;
/**
 * screen blending
 */
export const BLEND_SCREEN: number;
/**
 * clipping mode none
 */
export const CLIPPING_MODE_NONE: number;
/**
 * clipping mode stencil
 */
export const CLIPPING_MODE_STENCIL: number;
/**
 * in-back
 */
export const EASING_INBACK: number;
/**
 * in-bounce
 */
export const EASING_INBOUNCE: number;
/**
 * in-circlic
 */
export const EASING_INCIRC: number;
/**
 * in-cubic
 */
export const EASING_INCUBIC: number;
/**
 * in-elastic
 */
export const EASING_INELASTIC: number;
/**
 * in-exponential
 */
export const EASING_INEXPO: number;
/**
 * in-out-back
 */
export const EASING_INOUTBACK: number;
/**
 * in-out-bounce
 */
export const EASING_INOUTBOUNCE: number;
/**
 * in-out-circlic
 */
export const EASING_INOUTCIRC: number;
/**
 * in-out-cubic
 */
export const EASING_INOUTCUBIC: number;
/**
 * in-out-elastic
 */
export const EASING_INOUTELASTIC: number;
/**
 * in-out-exponential
 */
export const EASING_INOUTEXPO: number;
/**
 * in-out-quadratic
 */
export const EASING_INOUTQUAD: number;
/**
 * in-out-quartic
 */
export const EASING_INOUTQUART: number;
/**
 * in-out-quintic
 */
export const EASING_INOUTQUINT: number;
/**
 * in-out-sine
 */
export const EASING_INOUTSINE: number;
/**
 * in-quadratic
 */
export const EASING_INQUAD: number;
/**
 * in-quartic
 */
export const EASING_INQUART: number;
/**
 * in-quintic
 */
export const EASING_INQUINT: number;
/**
 * in-sine
 */
export const EASING_INSINE: number;
/**
 * linear interpolation
 */
export const EASING_LINEAR: number;
/**
 * out-back
 */
export const EASING_OUTBACK: number;
/**
 * out-bounce
 */
export const EASING_OUTBOUNCE: number;
/**
 * out-circlic
 */
export const EASING_OUTCIRC: number;
/**
 * out-cubic
 */
export const EASING_OUTCUBIC: number;
/**
 * out-elastic
 */
export const EASING_OUTELASTIC: number;
/**
 * out-exponential
 */
export const EASING_OUTEXPO: number;
/**
 * out-in-back
 */
export const EASING_OUTINBACK: number;
/**
 * out-in-bounce
 */
export const EASING_OUTINBOUNCE: number;
/**
 * out-in-circlic
 */
export const EASING_OUTINCIRC: number;
/**
 * out-in-cubic
 */
export const EASING_OUTINCUBIC: number;
/**
 * out-in-elastic
 */
export const EASING_OUTINELASTIC: number;
/**
 * out-in-exponential
 */
export const EASING_OUTINEXPO: number;
/**
 * out-in-quadratic
 */
export const EASING_OUTINQUAD: number;
/**
 * out-in-quartic
 */
export const EASING_OUTINQUART: number;
/**
 * out-in-quintic
 */
export const EASING_OUTINQUINT: number;
/**
 * out-in-sine
 */
export const EASING_OUTINSINE: number;
/**
 * out-quadratic
 */
export const EASING_OUTQUAD: number;
/**
 * out-quartic
 */
export const EASING_OUTQUART: number;
/**
 * out-quintic
 */
export const EASING_OUTQUINT: number;
/**
 * out-sine
 */
export const EASING_OUTSINE: number;
/**
 * default keyboard
 */
export const KEYBOARD_TYPE_DEFAULT: number;
/**
 * email keyboard
 */
export const KEYBOARD_TYPE_EMAIL: number;
/**
 * number input keyboard
 */
export const KEYBOARD_TYPE_NUMBER_PAD: number;
/**
 * password keyboard
 */
export const KEYBOARD_TYPE_PASSWORD: number;
/**
 * elliptical pie node bounds
 */
export const PIEBOUNDS_ELLIPSE: number;
/**
 * rectangular pie node bounds
 */
export const PIEBOUNDS_RECTANGLE: number;
/**
 * center pivot
 */
export const PIVOT_CENTER: number;
/**
 * east pivot
 */
export const PIVOT_E: number;
/**
 * north pivot
 */
export const PIVOT_N: number;
/**
 * north-east pivot
 */
export const PIVOT_NE: number;
/**
 * north-west pivot
 */
export const PIVOT_NW: number;
/**
 * south pivot
 */
export const PIVOT_S: number;
/**
 * south-east pivot
 */
export const PIVOT_SE: number;
/**
 * south-west pivot
 */
export const PIVOT_SW: number;
/**
 * west pivot
 */
export const PIVOT_W: number;
/**
 * loop backward
 */
export const PLAYBACK_LOOP_BACKWARD: number;
/**
 * loop forward
 */
export const PLAYBACK_LOOP_FORWARD: number;
/**
 * ping pong loop
 */
export const PLAYBACK_LOOP_PINGPONG: number;
/**
 * once backward
 */
export const PLAYBACK_ONCE_BACKWARD: number;
/**
 * once forward
 */
export const PLAYBACK_ONCE_FORWARD: number;
/**
 * once forward and then backward
 */
export const PLAYBACK_ONCE_PINGPONG: number;
/**
 * color property
 */
export const PROP_COLOR: number;
/**
 * euler property
 */
export const PROP_EULER: number;
/**
 * fill_angle property
 */
export const PROP_FILL_ANGLE: number;
/**
 * inner_radius property
 */
export const PROP_INNER_RADIUS: number;
/**
 * leading property
 */
export const PROP_LEADING: number;
/**
 * outline color property
 */
export const PROP_OUTLINE: number;
/**
 * position property
 */
export const PROP_POSITION: number;
/**
 * rotation property
 */
export const PROP_ROTATION: number;
/**
 * scale property
 */
export const PROP_SCALE: number;
/**
 * shadow color property
 */
export const PROP_SHADOW: number;
/**
 * size property
 */
export const PROP_SIZE: number;
/**
 * slice9 property
 */
export const PROP_SLICE9: number;
/**
 * tracking property
 */
export const PROP_TRACKING: number;
/**
 * The provided data is not in the expected format or is in some other way
incorrect, for instance the image data provided to gui.new_texture().
 */
export const RESULT_DATA_ERROR: number;
/**
 * The system is out of resources, for instance when trying to create a new
texture using gui.new_texture().
 */
export const RESULT_OUT_OF_RESOURCES: number;
/**
 * The texture id already exists when trying to use gui.new_texture().
 */
export const RESULT_TEXTURE_ALREADY_EXISTS: number;
/**
 * Safe area mode that applies insets on all edges.
 */
export const SAFE_AREA_BOTH: number;
/**
 * Safe area mode that applies insets only on the long edges.
 */
export const SAFE_AREA_LONG: number;
/**
 * Safe area mode that ignores safe area insets.
 */
export const SAFE_AREA_NONE: number;
/**
 * Safe area mode that applies insets only on the short edges.
 */
export const SAFE_AREA_SHORT: number;
/**
 * The size of the node is determined by the currently assigned texture.
 */
export const SIZE_MODE_AUTO: number;
/**
 * The size of the node is determined by the size set in the editor, the constructor or by gui.set_size()
 */
export const SIZE_MODE_MANUAL: number;
/**
 * box type
 */
export const TYPE_BOX: number;
/**
 * custom type
 */
export const TYPE_CUSTOM: number;
/**
 * particlefx type
 */
export const TYPE_PARTICLEFX: number;
/**
 * pie type
 */
export const TYPE_PIE: number;
/**
 * text type
 */
export const TYPE_TEXT: number;
/**
 * This starts an animation of a node property according to the specified parameters.
If the node property is already being animated, that animation will be canceled and
replaced by the new one. Note however that several different node properties
can be animated simultaneously. Use `gui.cancel_animation` to stop the animation
before it has completed.
Composite properties of type vector3, vector4 or quaternion
also expose their sub-components (x, y, z and w).
You can address the components individually by suffixing the name with a dot '.'
and the name of the component.
For instance, `"position.x"` (the position x coordinate) or `"color.w"`
(the color alpha value).
If a `complete_function` (Lua function) is specified, that function will be called
when the animation has completed.
By starting a new animation in that function, several animations can be sequenced
together. See the examples below for more information.
 * @param node node to animate
 * @param property property to animate

`"position"`
`"rotation"`
`"euler"`
`"scale"`
`"color"`
`"outline"`
`"shadow"`
`"size"`
`"fill_angle"` (pie)
`"inner_radius"` (pie)
`"leading"` (text)
`"tracking"` (text)
`"slice9"` (slice9)

The following property constants are defined equaling the corresponding property string names.

`gui.PROP_POSITION`
`gui.PROP_ROTATION`
`gui.PROP_EULER`
`gui.PROP_SCALE`
`gui.PROP_COLOR`
`gui.PROP_OUTLINE`
`gui.PROP_SHADOW`
`gui.PROP_SIZE`
`gui.PROP_FILL_ANGLE`
`gui.PROP_INNER_RADIUS`
`gui.PROP_LEADING`
`gui.PROP_TRACKING`
`gui.PROP_SLICE9`

 * @param to target property value
 * @param easing easing to use during animation.
     Either specify one of the `gui.EASING_*` constants or provide a
     vector with a custom curve. See the animation guide for more information.
 * @param duration duration of the animation in seconds.
 * @param delay delay before the animation starts in seconds.
 * @param complete_function function to call when the
     animation has completed
 * @param playback playback mode

`gui.PLAYBACK_ONCE_FORWARD`
`gui.PLAYBACK_ONCE_BACKWARD`
`gui.PLAYBACK_ONCE_PINGPONG`
`gui.PLAYBACK_LOOP_FORWARD`
`gui.PLAYBACK_LOOP_BACKWARD`
`gui.PLAYBACK_LOOP_PINGPONG`

 * @example How to start a simple color animation, where the node fades in to white during 0.5 seconds:
```lua
gui.set_color(node, vmath.vector4(0, 0, 0, 0)) -- node is fully transparent
gui.animate(node, gui.PROP_COLOR, vmath.vector4(1, 1, 1, 1), gui.EASING_INOUTQUAD, 0.5) -- start animation
```

How to start a sequenced animation where the node fades in to white during 0.5 seconds, stays visible for 2 seconds and then fades out:
```lua
local function on_animation_done(self, node)
    -- fade out node, but wait 2 seconds before the animation starts
    gui.animate(node, gui.PROP_COLOR, vmath.vector4(0, 0, 0, 0), gui.EASING_OUTQUAD, 0.5, 2.0)
end

function init(self)
    -- fetch the node we want to animate
    local my_node = gui.get_node("my_node")
    -- node is initially set to fully transparent
    gui.set_color(my_node, vmath.vector4(0, 0, 0, 0))
    -- animate the node immediately and call on_animation_done when the animation has completed
    gui.animate(my_node, gui.PROP_COLOR, vmath.vector4(1, 1, 1, 1), gui.EASING_INOUTQUAD, 0.5, 0.0, on_animation_done)
end
```

How to animate a node's y position using a crazy custom easing curve:
```lua
function init(self)
    local values = { 0, 0, 0, 0, 0, 0, 0, 0,
                     1, 1, 1, 1, 1, 1, 1, 1,
                     0, 0, 0, 0, 0, 0, 0, 0,
                     1, 1, 1, 1, 1, 1, 1, 1,
                     0, 0, 0, 0, 0, 0, 0, 0,
                     1, 1, 1, 1, 1, 1, 1, 1,
                     0, 0, 0, 0, 0, 0, 0, 0,
                     1, 1, 1, 1, 1, 1, 1, 1 }
    local vec = vmath.vector(values)
    local node = gui.get_node("box")
    gui.animate(node, "position.y", 100, vec, 4.0, 0, nil, gui.PLAYBACK_LOOP_PINGPONG)
end
```
 */
export function animate(node: node, property: string | number, to: number | vmath.vector3 | vmath.vector4 | vmath.quaternion, easing: number | vmath.vector3 | vmath.vector4 | vmath.quaternion | ReturnType<typeof vmath.vector>, duration: number, delay?: number, complete_function?: (this: any, node: node,) => void, playback?: number): void;
/**
 * If one or more animations of the specified node is currently running (started by `gui.animate`), they will immediately be canceled.
 * @param node node that should have its animation canceled
 * @param property optional property for which the animation should be canceled

`"position"`
`"rotation"`
`"euler"`
`"scale"`
`"color"`
`"outline"`
`"shadow"`
`"size"`
`"fill_angle"` (pie)
`"inner_radius"` (pie)
`"leading"` (text)
`"tracking"` (text)
`"slice9"` (slice9)

 * @example Start an animation of the position property of a node, then cancel parts of
the animation:
```lua
local node = gui.get_node("my_node")
-- animate to new position
local pos = vmath.vector3(100, 100, 0)
gui.animate(node, "position", pos, go.EASING_LINEAR, 2)
...
-- cancel animation of the x component.
gui.cancel_animations(node, "position.x")
```

Cancels all property animations on a node in a single call:
```lua
local node = gui.get_node("my_node")
-- animate to new position and scale
gui.animate(node, "position", vmath.vector3(100, 100, 0), go.EASING_LINEAR, 5)
gui.animate(node, "scale", vmath.vector3(0.5), go.EASING_LINEAR, 5)
...
-- cancel positioning and scaling at once
gui.cancel_animations(node)
```
 */
export function cancel_animations(node: node, property?: undefined | string | number): void;
/**
 * Cancels any running flipbook animation on the specified node.
 * @param node node cancel flipbook animation for
 * @example ```lua
local node = gui.get_node("anim_node")
gui.cancel_flipbook(node)
```
 */
export function cancel_flipbook(node: node): void;
/**
 * Make a clone instance of a node. The cloned node will be identical to the
original node, except the id which is generated as the string "node" plus
a sequential unsigned integer value.
This function does not clone the supplied node's children nodes.
Use gui.clone_tree for that purpose.
 * @param node node to clone
 * @returns the cloned node
 */
export function clone(node: node): node;
/**
 * Make a clone instance of a node and all its children.
Use gui.clone to clone a node excluding its children.
 * @param node root node to clone
 * @returns a table mapping node ids to the corresponding cloned nodes
 */
export function clone_tree(node: node): object;
/**
 * Deletes the specified node. Any child nodes of the specified node will be
recursively deleted.
 * @param node node to delete
 * @example Delete a particular node and any child nodes it might have:
```lua
local node = gui.get_node("my_node")
gui.delete_node(node)
```
 */
export function delete_node(node: node): void;
/**
 * Delete a dynamically created texture.
 * @param texture texture id
 * @example ```lua
function init(self)
     -- Create a texture.
     if gui.new_texture("temp_tx", 10, 10, "rgb", string.rep('\0', 10 * 10 * 3)) then
         -- Do something with the texture.
         ...

         -- Delete the texture
         gui.delete_texture("temp_tx")
     end
end
```
 */
export function delete_texture(texture: string | hash): void;
/**
 * This is a callback-function, which is called by the engine when a gui component is finalized (destroyed). It can
be used to e.g. take some last action, report the finalization to other game object instances
or release user input focus (see `release_input_focus`). There is no use in starting any animations or similar
from this function since the gui component is about to be destroyed.
 * @param this reference to the script state to be used for storing data
 * @example ```lua
function final(self)
    -- report finalization
    msg.post("my_friend_instance", "im_dead", {my_stats = self.some_value})
end
```
 */
export function final(this: LuaUserdata): void;
/**
 * Instead of using specific getters such as gui.get_position or gui.get_scale,
you can use gui.get instead and supply the property as a string or a hash.
While this function is similar to go.get, there are a few more restrictions
when operating in the gui namespace. Most notably, only these explicitly named properties are supported:

`"position"`
`"rotation"`
`"euler"`
`"scale"`
`"color"`
`"outline"`
`"shadow"`
`"size"`
`"fill_angle"` (pie)
`"inner_radius"` (pie)
`"leading"` (text)
`"tracking"` (text)
`"slice9"` (slice9)

The value returned will either be a vmath.vector4 or a single number, i.e getting the "position"
property will return a vec4 while getting the "position.x" property will return a single value.
You can also use this function to get material constants.
 * @param node node to get the property for
 * @param property the property to retrieve
 * @param options optional options table (only applicable for material constants)
- `index` number index into array property (1 based)
 * @example Get properties on existing nodes:
```lua
local node = gui.get_node("my_box_node")
local node_position = gui.get(node, "position")
```
 */
export function get(node: node, property: string | hash | number, options?: object): unknown;
/**
 * Returns the adjust mode of a node.
The adjust mode defines how the node will adjust itself to screen
resolutions that differs from the one in the project settings.
 * @param node node from which to get the adjust mode (node)
 * @returns the current adjust mode

`gui.ADJUST_FIT`
`gui.ADJUST_ZOOM`
`gui.ADJUST_STRETCH`

 */
export function get_adjust_mode(node: node): number;
/**
 * gets the node alpha
 * @param node node from which to get alpha
 * @returns alpha
 */
export function get_alpha(node: node): number;
/**
 * Returns the blend mode of a node.
Blend mode defines how the node will be blended with the background.
 * @param node node from which to get the blend mode
 * @returns blend mode

`gui.BLEND_ALPHA`
`gui.BLEND_ADD`
`gui.BLEND_ADD_ALPHA`
`gui.BLEND_MULT`
`gui.BLEND_SCREEN`

 */
export function get_blend_mode(node: node): number;
/**
 * If node is set as an inverted clipping node, it will clip anything inside as opposed to outside.
 * @param node node from which to get the clipping inverted state
 * @returns `true` or `false`
 */
export function get_clipping_inverted(node: node): boolean;
/**
 * Clipping mode defines how the node will clip it's children nodes
 * @param node node from which to get the clipping mode
 * @returns clipping mode

  `gui.CLIPPING_MODE_NONE`
  `gui.CLIPPING_MODE_STENCIL`

 */
export function get_clipping_mode(node: node): number;
/**
 * If node is set as visible clipping node, it will be shown as well as clipping. Otherwise, it will only clip but not show visually.
 * @param node node from which to get the clipping visibility state
 * @returns `true` or `false`
 */
export function get_clipping_visible(node: node): boolean;
/**
 * Returns the color of the supplied node. The components
of the returned vector4 contains the color channel values:



Component
Color value




x
Red value


y
Green value


z
Blue value


w
Alpha value



 * @param node node to get the color from
 * @returns node color
 */
export function get_color(node: node): vmath.vector4;
/**
 * Returns the rotation of the supplied node.
The rotation is expressed in degree Euler angles.
 * @param node node to get the rotation from
 * @returns node rotation
 */
export function get_euler(node: node): vmath.vector3;
/**
 * Returns the sector angle of a pie node.
 * @param node node from which to get the fill angle
 * @returns sector angle
 */
export function get_fill_angle(node: node): number;
/**
 * Get node flipbook animation.
 * @param node node to get flipbook animation from
 * @returns animation id
 */
export function get_flipbook(node: node): hash;
/**
 * This is only useful nodes with flipbook animations. Gets the normalized cursor of the flipbook animation on a node.
 * @param node node to get the cursor for (node)
 * @returns cursor value
 */
export function get_flipbook_cursor(node: node): number;
/**
 * This is only useful nodes with flipbook animations. Gets the playback rate of the flipbook animation on a node.
 * @param node node to set the cursor for
 * @returns playback rate
 */
export function get_flipbook_playback_rate(node: node): number;
/**
 * This is only useful for text nodes. The font must be mapped to the gui scene in the gui editor.
 * @param node node from which to get the font
 * @returns font id
 */
export function get_font(node: node): hash;
/**
 * This is only useful for text nodes. The font must be mapped to the gui scene in the gui editor.
 * @param font_name font of which to get the path hash
 * @returns path hash to resource
 * @example Get the text metrics for a text
```lua
function init(self)
  local node = gui.get_node("name")
  local font_name = gui.get_font(node)
  local font = gui.get_font_resource(font_name)
  local metrics = resource.get_text_metrics(font, "The quick brown fox\n jumps over the lazy dog")
end
```
 */
export function get_font_resource(font_name: hash | string): hash;
/**
 * Returns the scene height.
 * @returns scene height
 */
export function get_height(): number;
/**
 * Retrieves the id of the specified node.
 * @param node the node to retrieve the id from
 * @returns the id of the node
 * @example Gets the id of a node:
```lua
local node = gui.get_node("my_node")

local id = gui.get_id(node)
print(id) --> hash: [my_node]
```
 */
export function get_id(node: node): hash;
/**
 * Retrieve the index of the specified node among its siblings.
The index defines the order in which a node appear in a GUI scene.
Higher index means the node is drawn on top of lower indexed nodes.
 * @param node the node to retrieve the id from
 * @returns the index of the node
 * @example Compare the index order of two sibling nodes:
```lua
local node1 = gui.get_node("my_node_1")
local node2 = gui.get_node("my_node_2")

if gui.get_index(node1) < gui.get_index(node2) then
    -- node1 is drawn below node2
else
    -- node2 is drawn below node1
end
```
 */
export function get_index(node: node): number;
/**
 * gets the node inherit alpha state
 * @param node node from which to get the inherit alpha state
 * @returns `true` or `false`
 */
export function get_inherit_alpha(node: node): boolean;
/**
 * Returns the inner radius of a pie node.
The radius is defined along the x-axis.
 * @param node node from where to get the inner radius
 * @returns inner radius
 */
export function get_inner_radius(node: node): number;
/**
 * The layer must be mapped to the gui scene in the gui editor.
 * @param node node from which to get the layer
 * @returns layer id
 */
export function get_layer(node: node): hash;
/**
 * gets the scene current layout
 * @returns layout id
 */
export function get_layout(): hash;
/**
 * Returns a table mapping each layout id hash to a vector3(width, height, 0). For the default layout,
the current scene resolution is returned. If a layout name is not present in the Display Profiles (or when
no display profiles are assigned), the width/height pair is 0.
 */
export function get_layouts(): LuaMap<hash, vmath.vector3>;
/**
 * Returns the leading value for a text node.
 * @param node node from where to get the leading
 * @returns leading scaling value (default=1)
 */
export function get_leading(node: node): number;
/**
 * Returns whether a text node is in line-break mode or not.
This is only useful for text nodes.
 * @param node node from which to get the line-break for
 * @returns `true` or `false`
 */
export function get_line_break(node: node): boolean;
/**
 * Returns the material of a node.
The material must be mapped to the gui scene in the gui editor.
 * @param node node to get the material for
 * @returns material id
 * @example Getting the material for a node, and assign it to another node:
```lua
local node1 = gui.get_node("my_node")
local node2 = gui.get_node("other_node")
local node1_material = gui.get_material(node1)
gui.set_material(node2, node1_material)
```
 */
export function get_material(node: node): hash;
/**
 * Retrieves the node with the specified id.
 * @param id id of the node to retrieve
 * @returns a new node instance
 * @example Gets a node by id and change its color:
```lua
local node = gui.get_node("my_node")
local red = vmath.vector4(1.0, 0.0, 0.0, 1.0)
gui.set_color(node, red)
```
 */
export function get_node(id: string | hash): node;
/**
 * Returns the outer bounds mode for a pie node.
 * @param node node from where to get the outer bounds mode
 * @returns the outer bounds mode of the pie node:

`gui.PIEBOUNDS_RECTANGLE`
`gui.PIEBOUNDS_ELLIPSE`

 */
export function get_outer_bounds(node: node): number;
/**
 * Returns the outline color of the supplied node.
See gui.get_color for info how vectors encode color values.
 * @param node node to get the outline color from
 * @returns outline color
 */
export function get_outline(node: node): vmath.vector4;
/**
 * Returns the parent node of the specified node.
If the supplied node does not have a parent, `nil` is returned.
 * @param node the node from which to retrieve its parent
 * @returns parent instance or `nil`
 */
export function get_parent(node: node): node | undefined;
/**
 * Get the paricle fx for a gui node
 * @param node node to get particle fx for
 * @returns particle fx id
 */
export function get_particlefx(node: node): hash;
/**
 * Returns the number of generated vertices around the perimeter
of a pie node.
 * @param node pie node
 * @returns vertex count
 */
export function get_perimeter_vertices(node: node): number;
/**
 * The pivot specifies how the node is drawn and rotated from its position.
 * @param node node to get pivot from
 * @returns pivot constant

  `gui.PIVOT_CENTER`
  `gui.PIVOT_N`
  `gui.PIVOT_NE`
  `gui.PIVOT_E`
  `gui.PIVOT_SE`
  `gui.PIVOT_S`
  `gui.PIVOT_SW`
  `gui.PIVOT_W`
  `gui.PIVOT_NW`

 */
export function get_pivot(node: node): number;
/**
 * Returns the position of the supplied node.
 * @param node node to get the position from
 * @returns node position
 */
export function get_position(node: node): vmath.vector3;
/**
 * Returns the rotation of the supplied node.
The rotation is expressed as a quaternion
 * @param node node to get the rotation from
 * @returns node rotation
 */
export function get_rotation(node: node): vmath.quaternion;
/**
 * Returns the scale of the supplied node.
 * @param node node to get the scale from
 * @returns node scale
 */
export function get_scale(node: node): vmath.vector3;
/**
 * Returns the screen position of the supplied node. This function returns the
calculated transformed position of the node, taking into account any parent node
transforms.
 * @param node node to get the screen position from
 * @returns node screen position
 */
export function get_screen_position(node: node): vmath.vector3;
/**
 * Returns the shadow color of the supplied node.
See gui.get_color for info how vectors encode color values.
 * @param node node to get the shadow color from
 * @returns node shadow color
 */
export function get_shadow(node: node): vmath.vector4;
/**
 * Returns the size of the supplied node.
 * @param node node to get the size from
 * @returns node size
 */
export function get_size(node: node): vmath.vector3;
/**
 * Returns the size of a node.
The size mode defines how the node will adjust itself in size. Automatic
size mode alters the node size based on the node's content. Automatic size
mode works for Box nodes and Pie nodes which will both adjust their size
to match the assigned image. Particle fx and Text nodes will ignore
any size mode setting.
 * @param node node from which to get the size mode (node)
 * @returns the current size mode

`gui.SIZE_MODE_MANUAL`
`gui.SIZE_MODE_AUTO`

 */
export function get_size_mode(node: node): number;
/**
 * Returns the slice9 configuration values for the node.
 * @param node node to manipulate
 * @returns configuration values
 */
export function get_slice9(node: node): vmath.vector4;
/**
 * Returns the text value of a text node. This is only useful for text nodes.
 * @param node node from which to get the text
 * @returns text value
 */
export function get_text(node: node): string;
/**
 * Returns the texture of a node.
This is currently only useful for box or pie nodes.
The texture must be mapped to the gui scene in the gui editor.
 * @param node node to get texture from
 * @returns texture id
 */
export function get_texture(node: node): hash;
/**
 * Returns the tracking value of a text node.
 * @param node node from where to get the tracking
 * @returns tracking scaling number (default=0)
 */
export function get_tracking(node: node): number;
/**
 * Get a node and all its children as a Lua table.
 * @param node root node to get node tree from
 * @returns a table mapping node ids to the corresponding nodes
 */
export function get_tree(node: node): object;
/**
 * gets the node type
 * @param node node from which to get the type
 * @returns type

`gui.TYPE_BOX`
`gui.TYPE_TEXT`
`gui.TYPE_PIE`
`gui.TYPE_PARTICLEFX`
`gui.TYPE_CUSTOM`
 & id of the custom type
 */
export function get_type(node: node): LuaMultiReturn<[number, number | undefined]>;
/**
 * Returns `true` if a node is visible and `false` if it's not.
Invisible nodes are not rendered.
 * @param node node to query
 * @returns whether the node is visible or not
 */
export function get_visible(node: node): boolean;
/**
 * Returns the scene width.
 * @returns scene width
 */
export function get_width(): number;
/**
 * The x-anchor specifies how the node is moved when the game is run in a different resolution.
 * @param node node to get x-anchor from
 * @returns anchor constant

`gui.ANCHOR_NONE`
`gui.ANCHOR_LEFT`
`gui.ANCHOR_RIGHT`

 */
export function get_xanchor(node: node): number;
/**
 * The y-anchor specifies how the node is moved when the game is run in a different resolution.
 * @param node node to get y-anchor from
 * @returns anchor constant

`gui.ANCHOR_NONE`
`gui.ANCHOR_TOP`
`gui.ANCHOR_BOTTOM`

 */
export function get_yanchor(node: node): number;
/**
 * Hides the on-display touch keyboard on the device.
 */
export function hide_keyboard(): void;
/**
 * This is a callback-function, which is called by the engine when a gui component is initialized. It can be used
to set the initial state of the script and gui scene.
 * @param this reference to the script state to be used for storing data
 * @example ```lua
function init(self)
    -- set up useful data
    self.my_value = 1
end
```
 */
export function init(this: LuaUserdata): void;
/**
 * Returns `true` if a node is enabled and `false` if it's not.
Disabled nodes are not rendered and animations acting on them are not evaluated.
 * @param node node to query
 * @param recursive check hierarchy recursively
 * @returns whether the node is enabled or not
 */
export function is_enabled(node: node, recursive?: boolean): boolean;
/**
 * Alters the ordering of the two supplied nodes by moving the first node
above the second.
If the second argument is `nil` the first node is moved to the top.
 * @param node to move
 * @param reference reference node above which the first node should be moved
 */
export function move_above(node: node, reference: node | undefined): void;
/**
 * Alters the ordering of the two supplied nodes by moving the first node
below the second.
If the second argument is `nil` the first node is moved to the bottom.
 * @param node to move
 * @param reference reference node below which the first node should be moved
 */
export function move_below(node: node, reference: node | undefined): void;
/**
 * Dynamically create a new box node.
 * @param pos node position
 * @param size node size
 * @returns new box node
 */
export function new_box_node(pos: vmath.vector3 | vmath.vector4, size: vmath.vector3): node;
/**
 * Dynamically create a particle fx node.
 * @param pos node position
 * @param particlefx particle fx resource name
 * @returns new particle fx node
 */
export function new_particlefx_node(pos: vmath.vector3 | vmath.vector4, particlefx: hash | string): node;
/**
 * Dynamically create a new pie node.
 * @param pos node position
 * @param size node size
 * @returns new pie node
 */
export function new_pie_node(pos: vmath.vector3 | vmath.vector4, size: vmath.vector3): node;
/**
 * Dynamically create a new text node.
 * @param pos node position
 * @param text node text
 * @returns new text node
 */
export function new_text_node(pos: vmath.vector3 | vmath.vector4, text: string): node;
/**
 * Dynamically create a new texture.
 * @param texture_id texture id
 * @param width texture width
 * @param height texture height
 * @param type texture type

`"rgb"` - RGB
`"rgba"` - RGBA
`"l"` - LUMINANCE
`"astc"` - ASTC compressed format

 * @param buffer texture data
 * @param flip flip texture vertically
 * @returns texture creation was successful & one of the gui.RESULT_* codes if unsuccessful
 * @example How to create a texture and apply it to a new box node:
```lua
function init(self)
     local w = 200
     local h = 300

     -- A nice orange. String with the RGB values.
     local orange = string.char(0xff) .. string.char(0x80) .. string.char(0x10)

     -- Create the texture. Repeat the color string for each pixel.
     local ok, reason = gui.new_texture("orange_tx", w, h, "rgb", string.rep(orange, w * h))
     if ok then
         -- Create a box node and apply the texture to it.
         local n = gui.new_box_node(vmath.vector3(200, 200, 0), vmath.vector3(w, h, 0))
         gui.set_texture(n, "orange_tx")
     else
         -- Could not create texture for some reason...
         if reason == gui.RESULT_TEXTURE_ALREADY_EXISTS then
             ...
         else
             ...
         end
     end
end
```How to create a texture using .astc format

```lua
local path = "/assets/images/logo_4x4.astc"
local buffer = sys.load_resource(path)
local n = gui.new_box_node(pos, vmath.vector3(size, size, 0))
-- size is read from the .astc buffer
-- flip is not supported
gui.new_texture(path, 0, 0, "astc", buffer, false)
gui.set_texture(n, path)
```
 */
export function new_texture(texture_id: string | hash, width: number, height: number, type: string | number, buffer: string, flip: boolean): LuaMultiReturn<[boolean, number]>;
/**
 * This is a callback-function, which is called by the engine when user input is sent to the instance of the gui component.
It can be used to take action on the input, e.g. modify the gui according to the input.
For an instance to obtain user input, it must first acquire input
focus through the message `acquire_input_focus`.
Any instance that has obtained input will be put on top of an
input stack. Input is sent to all listeners on the stack until the
end of stack is reached, or a listener returns `true`
to signal that it wants input to be consumed.
See the documentation of acquire_input_focus for more
information.
The `action` parameter is a table containing data about the input mapped to the
`action_id`.
For mapped actions it specifies the value of the input and if it was just pressed or released.
Actions are mapped to input in an input_binding-file.
Mouse movement is specifically handled and uses `nil` as its `action_id`.
The `action` only contains positional parameters in this case, such as x and y of the pointer.
Here is a brief description of the available table fields:



Field
Description




`value`
The amount of input given by the user. This is usually 1 for buttons and 0-1 for analogue inputs. This is not present for mouse movement and text input.


`pressed`
If the input was pressed this frame. This is not present for mouse movement and text input.


`released`
If the input was released this frame. This is not present for mouse movement and text input.


`repeated`
If the input was repeated this frame. This is similar to how a key on a keyboard is repeated when you hold it down. This is not present for mouse movement and text input.


`x`
The x value of a pointer device, if present. This is not present for gamepad, key and text input.


`y`
The y value of a pointer device, if present. This is not present for gamepad, key and text input.


`screen_x`
The screen space x value of a pointer device, if present. This is not present for gamepad, key and text input.


`screen_y`
The screen space y value of a pointer device, if present. This is not present for gamepad, key and text input.


`dx`
The change in x value of a pointer device, if present. This is not present for gamepad, key and text input.


`dy`
The change in y value of a pointer device, if present. This is not present for gamepad, key and text input.


`screen_dx`
The change in screen space x value of a pointer device, if present. This is not present for gamepad, key and text input.


`screen_dy`
The change in screen space y value of a pointer device, if present. This is not present for gamepad, key and text input.


`gamepad`
The index of the gamepad device that provided the input. See table below about gamepad input.


`touch`
List of touch input, one element per finger, if present. See table below about touch input


`text`
Text input from a (virtual) keyboard or similar.


`marked_text`
Sequence of entered symbols while entering a symbol combination, for example Japanese Kana.



Gamepad specific fields:



Field
Description




`gamepad`
The index of the gamepad device that provided the input.


`userid`
Id of the user associated with the controller. Usually only relevant on consoles.


`gamepad_unknown`
True if the inout originated from an unknown/unmapped gamepad.


`gamepad_name`
Name of the gamepad


`gamepad_axis`
List of gamepad axis values. For raw gamepad input only.


`gamepadhats`
List of gamepad hat values. For raw gamepad input only.


`gamepad_buttons`
List of gamepad button values. For raw gamepad input only.



Touch input table:



Field
Description




`id`
A number identifying the touch input during its duration.


`pressed`
True if the finger was pressed this frame.


`released`
True if the finger was released this frame.


`tap_count`
Number of taps, one for single, two for double-tap, etc


`x`
The x touch location.


`y`
The y touch location.


`dx`
The change in x value.


`dy`
The change in y value.


`acc_x`
Accelerometer x value (if present).


`acc_y`
Accelerometer y value (if present).


`acc_z`
Accelerometer z value (if present).



 * @param this reference to the script state to be used for storing data
 * @param action_id id of the received input action, as mapped in the input_binding-file
 * @param action a table containing the input data, see above for a description
 * @returns optional boolean to signal if the input should be consumed (not passed on to others) or not, default is false
 * @example ```lua
function on_input(self, action_id, action)
    -- check for input
    if action_id == hash("my_action") then
        -- take appropritate action
        self.my_value = action.value
    end
    -- consume input
    return true
end
```
 */
export function on_input(this: LuaUserdata, action_id: hash, action: object): boolean | undefined;
/**
 * This is a callback-function, which is called by the engine whenever a message has been sent to the gui component.
It can be used to take action on the message, e.g. update the gui or send a response back to the sender of the message.
The `message` parameter is a table containing the message data. If the message is sent from the engine, the
documentation of the message specifies which data is supplied.
See the update function for examples on how to use this callback-function.
 * @param this reference to the script state to be used for storing data
 * @param message_id id of the received message
 * @param message a table containing the message data
 */
export function on_message(this: LuaUserdata, message_id: hash, message: object): void;
/**
 * 
This is a callback-function, which is called by the engine when the gui script is reloaded, e.g. from the editor.
It can be used for live development, e.g. to tweak constants or set up the state properly for the script.

 * @param this reference to the script state to be used for storing data
 * @example ```lua
function on_reload(self)
    -- restore some color (or similar)
    gui.set_color(gui.get_node("my_node"), self.my_original_color)
end
```
 */
export function on_reload(this: LuaUserdata): void;
/**
 * Tests whether a coordinate is within the bounding box of a
node.
 * @param node node to be tested for picking
 * @param x x-coordinate (see on_input )
 * @param y y-coordinate (see on_input )
 * @returns pick result
 */
export function pick_node(node: node, x: number, y: number): boolean;
/**
 * Play flipbook animation on a box or pie node.
The current node texture must contain the animation.
Use this function to set one-frame still images on the node.
 * @param node node to set animation for
 * @param animation animation id
 * @param complete_function optional function to call when the animation has completed

`self`

object The current object.

`node`

node The node that is animated.


 * @param play_properties optional table with properties

`offset`
number The normalized initial value of the animation cursor when the animation starts playing
`playback_rate`
number The rate with which the animation will be played. Must be positive

 * @example Set the texture of a node to a flipbook animation from an atlas:
```lua
local function anim_callback(self, node)
    -- Take action after animation has played.
end

function init(self)
    -- Create a new node and set the texture to a flipbook animation
    local node = gui.get_node("button_node")
    gui.set_texture(node, "gui_sprites")
    gui.play_flipbook(node, "animated_button")
end
```

Set the texture of a node to an image from an atlas:
```lua
-- Create a new node and set the texture to a "button.png" from atlas
local node = gui.get_node("button_node")
gui.set_texture(node, "gui_sprites")
gui.play_flipbook(node, "button")
```
 */
export function play_flipbook(node: node, animation: string | hash, complete_function?: (this: any, node: node,) => void, play_properties?: { offset?: number; playback_rate?: number }): void;
/**
 * Plays the paricle fx for a gui node
 * @param node node to play particle fx for
 * @param emitter_state_function optional callback function that will be called when an emitter attached to this particlefx changes state.

`self`
object The current object
`node`
hash The particle fx node, or `nil` if the node was deleted
`emitter`
hash The id of the emitter
`state`
constant the new state of the emitter:


`particlefx.EMITTER_STATE_SLEEPING`
`particlefx.EMITTER_STATE_PRESPAWN`
`particlefx.EMITTER_STATE_SPAWNING`
`particlefx.EMITTER_STATE_POSTSPAWN`

 * @example How to play a particle fx when a gui node is created.
The callback receives the gui node, the hash of the id
of the emitter, and the new state of the emitter as particlefx.EMITTER_STATE_.
```lua
local function emitter_state_change(self, node, emitter, state)
  if emitter == hash("exhaust") and state == particlefx.EMITTER_STATE_POSTSPAWN then
    -- exhaust is done spawning particles...
  end
end

function init(self)
    gui.play_particlefx(gui.get_node("particlefx"), emitter_state_change)
end
```
 */
export function play_particlefx(node: node, emitter_state_function?: ((this: any, node: any, emitter: any, state: any) => void)): void;
/**
 * Resets the input context of keyboard. This will clear marked text.
 */
export function reset_keyboard(): void;
/**
 * Resets the node material to the material assigned in the gui scene.
 * @param node node to reset the material for
 * @example Resetting the material for a node:
```lua
local node = gui.get_node("my_node")
gui.reset_material(node)
```
 */
export function reset_material(node: node): void;
/**
 * Resets all nodes in the current GUI scene to their initial state.
The reset only applies to static node loaded from the scene.
Nodes that are created dynamically from script are not affected.
 */
export function reset_nodes(): void;
/**
 * Convert the screen position to the local position of supplied node
 * @param node node used for getting local transformation matrix
 * @param screen_position screen position
 * @returns local position
 */
export function screen_to_local(node: node, screen_position: vmath.vector3): vmath.vector3;
/**
 * Instead of using specific setteres such as gui.set_position or gui.set_scale,
you can use gui.set instead and supply the property as a string or a hash.
While this function is similar to go.get and go.set, there are a few more restrictions
when operating in the gui namespace. Most notably, only these named properties identifiers are supported:

`"position"`
`"rotation"`
`"euler"`
`"scale"`
`"color"`
`"outline"`
`"shadow"`
`"size"`
`"fill_angle"` (pie)
`"inner_radius"` (pie)
`"leading"` (text)
`"tracking"` (text)
`"slice9"` (slice9)

The value to set must either be a vmath.vector4, vmath.vector3, vmath.quat or a single number and depends on the property name you want to set.
I.e when setting the "position" property, you need to use a vmath.vector4 and when setting a single component of the property,
such as "position.x", you need to use a single value.
Note: When setting the rotation using the "rotation" property, you need to pass in a vmath.quat. This behaviour is different than from the gui.set_rotation function,
the intention is to move new functionality closer to go namespace so that migrating between gui and go is easier. To set the rotation using degrees instead,
use the "euler" property instead. The rotation and euler properties are linked, changing one of them will change the backing data of the other.
Similar to go.set, you can also use gui.set for setting material constant values on a node. E.g if a material has specified a constant called `tint` in
the .material file, you can use gui.set to set the value of that constant by calling `gui.set(node, "tint", vmath.vec4(1,0,0,1))`, or `gui.set(node, "matrix", vmath.matrix4())`
if the constant is a matrix. Arrays are also supported by gui.set - to set an array constant, you need to pass in an options table with the 'index' key set.
If the material has a constant array called 'tint_array' specified in the material, you can use `gui.set(node, "tint_array", vmath.vec4(1,0,0,1), { index = 4})` to set the fourth array element to a different value.
 * @param node node to set the property for, or msg.url() to the gui itself
 * @param property the property to set
 * @param value the property to set
 * @param options optional options table (only applicable for material constants)
- `index` number index into array property (1 based)
- `key` hash name of internal property
 * @example Updates the position property on an existing node:
```lua
local node = gui.get_node("my_box_node")
local node_position = gui.get(node, "position")
gui.set(node, "position.x", node_position.x + 128)
```

Updates the rotation property on an existing node:
```lua
local node = gui.get_node("my_box_node")
gui.set(node, "rotation", vmath.quat_rotation_z(math.rad(45)))
-- this is equivalent to:
gui.set(node, "euler.z", 45)
-- or using the entire vector:
gui.set(node, "euler", vmath.vector3(0,0,45))
-- or using the set_rotation
gui.set_rotation(node, vmath.vector3(0,0,45))
```

Sets various material constants for a node:
```lua
local node = gui.get_node("my_box_node")
gui.set(node, "tint", vmath.vector4(1,0,0,1))
-- matrix4 is also supported
gui.set(node, "light_matrix", vmath.matrix4())
-- update a constant in an array at position 4. the array is specified in the shader as:
-- uniform vec4 tint_array[4]; // lua is 1 based, shader is 0 based
gui.set(node, "tint_array", vmath.vector4(1,0,0,1), { index = 4 })
-- update a matrix constant in an array at position 4. the array is specified in the shader as:
-- uniform mat4 light_matrix_array[4];
gui.set(node, "light_matrix_array", vmath.matrix4(), { index = 4 })
-- update a sub-element in a constant
gui.set(node, "tint.x", 1)
-- update a sub-element in an array constant at position 4
gui.set(node, "tint_array.x", 1, {index = 4})
```

Set a named property
```lua
function on_message(self, message_id, message, sender)
   if message_id == hash("set_font") then
       gui.set(msg.url(), "fonts", message.font, {key = "my_font_name"})
       gui.set_font(gui.get_node("text"), "my_font_name")
   elseif message_id == hash("set_texture") then
       gui.set(msg.url(), "textures", message.texture, {key = "my_texture"})
       gui.set_texture(gui.get_node("box"), "my_texture")
       gui.play_flipbook(gui.get_node("box"), "logo_256")
   end
end
```
 */
export function set(node: node | url, property: string | hash | number, value: number | vmath.vector4 | vmath.vector3 | vmath.quaternion, options?: object): void;
/**
 * Sets the adjust mode on a node.
The adjust mode defines how the node will adjust itself to screen
resolutions that differs from the one in the project settings.
 * @param node node to set adjust mode for
 * @param adjust_mode adjust mode to set

`gui.ADJUST_FIT`
`gui.ADJUST_ZOOM`
`gui.ADJUST_STRETCH`

 */
export function set_adjust_mode(node: node, adjust_mode: number): void;
/**
 * sets the node alpha
 * @param node node for which to set alpha
 * @param alpha 0..1 alpha color
 */
export function set_alpha(node: node, alpha: number): void;
/**
 * Set the blend mode of a node.
Blend mode defines how the node will be blended with the background.
 * @param node node to set blend mode for
 * @param blend_mode blend mode to set

`gui.BLEND_ALPHA`
`gui.BLEND_ADD`
`gui.BLEND_ADD_ALPHA`
`gui.BLEND_MULT`
`gui.BLEND_SCREEN`

 */
export function set_blend_mode(node: node, blend_mode: number): void;
/**
 * If node is set as an inverted clipping node, it will clip anything inside as opposed to outside.
 * @param node node to set clipping inverted state for
 * @param inverted `true` or `false`
 */
export function set_clipping_inverted(node: node, inverted: boolean): void;
/**
 * Clipping mode defines how the node will clip it's children nodes
 * @param node node to set clipping mode for
 * @param clipping_mode clipping mode to set

  `gui.CLIPPING_MODE_NONE`
  `gui.CLIPPING_MODE_STENCIL`

 */
export function set_clipping_mode(node: node, clipping_mode: number): void;
/**
 * If node is set as an visible clipping node, it will be shown as well as clipping. Otherwise, it will only clip but not show visually.
 * @param node node to set clipping visibility for
 * @param visible `true` or `false`
 */
export function set_clipping_visible(node: node, visible: boolean): void;
/**
 * Sets the color of the supplied node. The components
of the supplied vector3 or vector4 should contain the color channel values:



Component
Color value




x
Red value


y
Green value


z
Blue value


w vector4
Alpha value



 * @param node node to set the color for
 * @param color new color
 */
export function set_color(node: node, color: vmath.vector3 | vmath.vector4): void;
/**
 * Sets a node to the disabled or enabled state.
Disabled nodes are not rendered and animations acting on them are not evaluated.
 * @param node node to be enabled/disabled
 * @param enabled whether the node should be enabled or not
 */
export function set_enabled(node: node, enabled: boolean): void;
/**
 * Sets the rotation of the supplied node.
The rotation is expressed in degree Euler angles.
 * @param node node to set the rotation for
 * @param rotation new rotation
 */
export function set_euler(node: node, rotation: vmath.vector3 | vmath.vector4): void;
/**
 * Set the sector angle of a pie node.
 * @param node node to set the fill angle for
 * @param angle sector angle
 */
export function set_fill_angle(node: node, angle: number): void;
/**
 * This is only useful nodes with flipbook animations. The cursor is normalized.
 * @param node node to set the cursor for
 * @param cursor cursor value
 */
export function set_flipbook_cursor(node: node, cursor: number): void;
/**
 * This is only useful nodes with flipbook animations. Sets the playback rate of the flipbook animation on a node. Must be positive.
 * @param node node to set the cursor for
 * @param playback_rate playback rate
 */
export function set_flipbook_playback_rate(node: node, playback_rate: number): void;
/**
 * This is only useful for text nodes.
The font must be mapped to the gui scene in the gui editor.
 * @param node node for which to set the font
 * @param font font id
 */
export function set_font(node: node, font: string | hash): void;
/**
 * Set the id of the specicied node to a new value.
Nodes created with the gui.new_*_node() functions get
an empty id. This function allows you to give dynamically
created nodes an id.
⚠ No checking is done on the uniqueness of supplied ids.
It is up to you to make sure you use unique ids.
 * @param node node to set the id for
 * @param id id to set
 * @example Create a new node and set its id:
```lua
local pos = vmath.vector3(100, 100, 0)
local size = vmath.vector3(100, 100, 0)
local node = gui.new_box_node(pos, size)
gui.set_id(node, "my_new_node")
```
 */
export function set_id(node: node, id: string | hash): void;
/**
 * sets the node inherit alpha state
 * @param node node from which to set the inherit alpha state
 * @param inherit_alpha `true` or `false`
 */
export function set_inherit_alpha(node: node, inherit_alpha: boolean): void;
/**
 * Sets the inner radius of a pie node.
The radius is defined along the x-axis.
 * @param node node to set the inner radius for
 * @param radius inner radius
 */
export function set_inner_radius(node: node, radius: number): void;
/**
 * The layer must be mapped to the gui scene in the gui editor.
 * @param node node for which to set the layer
 * @param layer layer id
 */
export function set_layer(node: node, layer: string | hash): void;
/**
 * Applies a named layout on the GUI scene. This re-applies per-layout node descriptors
and, if a matching Display Profile exists, updates the scene resolution. Emits
the "layout_changed" message to the scene script when the layout actually changes.
 * @param layout the layout id to apply
 * @returns true if the layout exists in the scene and was applied, false otherwise
 */
export function set_layout(layout: string | hash): boolean;
/**
 * Sets the leading value for a text node. This value is used to
scale the line spacing of text.
 * @param node node for which to set the leading
 * @param leading a scaling value for the line spacing (default=1)
 */
export function set_leading(node: node, leading: number): void;
/**
 * Sets the line-break mode on a text node.
This is only useful for text nodes.
 * @param node node to set line-break for
 * @param line_break `true` or `false`
 */
export function set_line_break(node: node, line_break: boolean): void;
/**
 * Set the material on a node. The material must be mapped to the gui scene in the gui editor,
and assigning a material is supported for all node types. To set the default material that
is assigned to the gui scene node, use `gui.reset_material(node_id)` instead.
 * @param node node to set material for
 * @param material material id
 * @example Assign an existing material to a node:
```lua
local node = gui.get_node("my_node")
gui.set_material(node, "my_material")
```
 */
export function set_material(node: node, material: string | hash): void;
/**
 * Sets the outer bounds mode for a pie node.
 * @param node node for which to set the outer bounds mode
 * @param bounds_mode the outer bounds mode of the pie node:

`gui.PIEBOUNDS_RECTANGLE`
`gui.PIEBOUNDS_ELLIPSE`

 */
export function set_outer_bounds(node: node, bounds_mode: number): void;
/**
 * Sets the outline color of the supplied node.
See gui.set_color for info how vectors encode color values.
 * @param node node to set the outline color for
 * @param color new outline color
 */
export function set_outline(node: node, color: vmath.vector3 | vmath.vector4): void;
/**
 * Sets the parent node of the specified node.
 * @param node node for which to set its parent
 * @param parent parent node to set, pass `nil` to remove parent
 * @param keep_scene_transform optional flag to make the scene position being perserved
 */
export function set_parent(node: node, parent?: node, keep_scene_transform?: boolean): void;
/**
 * Set the paricle fx for a gui node
 * @param node node to set particle fx for
 * @param particlefx particle fx id
 */
export function set_particlefx(node: node, particlefx: hash | string): void;
/**
 * Sets the number of generated vertices around the perimeter of a pie node.
 * @param node pie node
 * @param vertices vertex count
 */
export function set_perimeter_vertices(node: node, vertices: number): void;
/**
 * The pivot specifies how the node is drawn and rotated from its position.
 * @param node node to set pivot for
 * @param pivot pivot constant

  `gui.PIVOT_CENTER`
  `gui.PIVOT_N`
  `gui.PIVOT_NE`
  `gui.PIVOT_E`
  `gui.PIVOT_SE`
  `gui.PIVOT_S`
  `gui.PIVOT_SW`
  `gui.PIVOT_W`
  `gui.PIVOT_NW`

 */
export function set_pivot(node: node, pivot: number): void;
/**
 * Sets the position of the supplied node.
 * @param node node to set the position for
 * @param position new position
 */
export function set_position(node: node, position: vmath.vector3 | vmath.vector4): void;
/**
 * Set the order number for the current GUI scene.
The number dictates the sorting of the "gui" render predicate,
in other words in which order the scene will be rendered in relation
to other currently rendered GUI scenes.
The number must be in the range 0 to 15.
 * @param order rendering order (0-15)
 */
export function set_render_order(order: number): void;
/**
 * Sets the rotation of the supplied node.
The rotation is expressed as a quaternion
 * @param node node to set the rotation for
 * @param rotation new rotation
 */
export function set_rotation(node: node, rotation: vmath.quaternion | vmath.vector4): void;
/**
 * Sets how the safe area is applied to this gui scene.
 * @param mode safe area mode

`gui.SAFE_AREA_NONE`
`gui.SAFE_AREA_LONG`
`gui.SAFE_AREA_SHORT`
`gui.SAFE_AREA_BOTH`

 */
export function set_safe_area_mode(mode: number): void;
/**
 * Sets the scaling of the supplied node.
 * @param node node to set the scale for
 * @param scale new scale
 */
export function set_scale(node: node, scale: vmath.vector3 | vmath.vector4): void;
/**
 * Set the screen position to the supplied node
 * @param node node to set the screen position to
 * @param screen_position screen position
 */
export function set_screen_position(node: node, screen_position: vmath.vector3): void;
/**
 * Sets the shadow color of the supplied node.
See gui.set_color for info how vectors encode color values.
 * @param node node to set the shadow color for
 * @param color new shadow color
 */
export function set_shadow(node: node, color: vmath.vector3 | vmath.vector4): void;
/**
 * Sets the size of the supplied node.
⚠ You can only set size on nodes with size mode set to SIZE_MODE_MANUAL
 * @param node node to set the size for
 * @param size new size
 */
export function set_size(node: node, size: vmath.vector3 | vmath.vector4): void;
/**
 * Sets the size mode of a node.
The size mode defines how the node will adjust itself in size. Automatic
size mode alters the node size based on the node's content. Automatic size
mode works for Box nodes and Pie nodes which will both adjust their size
to match the assigned image. Particle fx and Text nodes will ignore
any size mode setting.
 * @param node node to set size mode for
 * @param size_mode size mode to set

`gui.SIZE_MODE_MANUAL`
`gui.SIZE_MODE_AUTO`

 */
export function set_size_mode(node: node, size_mode: number): void;
/**
 * Set the slice9 configuration values for the node.
 * @param node node to manipulate
 * @param values new values
 */
export function set_slice9(node: node, values: vmath.vector4): void;
/**
 * Set the text value of a text node. This is only useful for text nodes.
 * @param node node to set text for
 * @param text text to set
 */
export function set_text(node: node, text: string | number): void;
/**
 * Set the texture on a box or pie node. The texture must be mapped to
the gui scene in the gui editor. The function points out which texture
the node should render from. If the texture is an atlas, further
information is needed to select which image/animation in the atlas
to render. In such cases, use `gui.play_flipbook()` in
addition to this function.
 * @param node node to set texture for
 * @param texture texture id
 * @example To set a texture (or animation) from an atlas:
```lua
local node = gui.get_node("box_node")
gui.set_texture(node, "my_atlas")
gui.play_flipbook(node, "image")
```

Set a dynamically created texture to a node. Note that there is only
one texture image in this case so ```lua
gui.set_texture()``` is
sufficient.
```lua
local w = 200
local h = 300
-- A nice orange. String with the RGB values.
local orange = string.char(0xff) .. string.char(0x80) .. string.char(0x10)
-- Create the texture. Repeat the color string for each pixel.
if gui.new_texture("orange_tx", w, h, "rgb", string.rep(orange, w * h)) then
    local node = gui.get_node("box_node")
    gui.set_texture(node, "orange_tx")
end
```
 */
export function set_texture(node: node, texture: string | hash): void;
/**
 * Set the texture buffer data for a dynamically created texture.
 * @param texture texture id
 * @param width texture width
 * @param height texture height
 * @param type texture type

  `"rgb"` - RGB
  `"rgba"` - RGBA
  `"l"` - LUMINANCE
  `"astc"` - ASTC compressed format

 * @param buffer texture data
 * @param flip flip texture vertically
 * @returns setting the data was successful
 * @example ```lua
function init(self)
     local w = 200
     local h = 300

     -- Create a dynamic texture, all white.
     if gui.new_texture("dynamic_tx", w, h, "rgb", string.rep(string.char(0xff), w * h * 3)) then
         -- Create a box node and apply the texture to it.
         local n = gui.new_box_node(vmath.vector3(200, 200, 0), vmath.vector3(w, h, 0))
         gui.set_texture(n, "dynamic_tx")

         ...

         -- Change the data in the texture to a nice orange.
         local orange = string.char(0xff) .. string.char(0x80) .. string.char(0x10)
         if gui.set_texture_data("dynamic_tx", w, h, "rgb", string.rep(orange, w * h)) then
             -- Go on and to more stuff
             ...
         end
     else
         -- Something went wrong
         ...
     end
end
```
 */
export function set_texture_data(texture: string | hash, width: number, height: number, type: string | number, buffer: string, flip: boolean): boolean;
/**
 * Sets the tracking value of a text node. This value is used to
adjust the vertical spacing of characters in the text.
 * @param node node for which to set the tracking
 * @param tracking a scaling number for the letter spacing (default=0)
 */
export function set_tracking(node: node, tracking: number): void;
/**
 * Set if a node should be visible or not. Only visible nodes are rendered.
 * @param node node to be visible or not
 * @param visible whether the node should be visible or not
 */
export function set_visible(node: node, visible: boolean): void;
/**
 * The x-anchor specifies how the node is moved when the game is run in a different resolution.
 * @param node node to set x-anchor for
 * @param anchor anchor constant

`gui.ANCHOR_NONE`
`gui.ANCHOR_LEFT`
`gui.ANCHOR_RIGHT`

 */
export function set_xanchor(node: node, anchor: number): void;
/**
 * The y-anchor specifies how the node is moved when the game is run in a different resolution.
 * @param node node to set y-anchor for
 * @param anchor anchor constant

`gui.ANCHOR_NONE`
`gui.ANCHOR_TOP`
`gui.ANCHOR_BOTTOM`

 */
export function set_yanchor(node: node, anchor: number): void;
/**
 * Shows the on-display touch keyboard.
The specified type of keyboard is displayed if it is available on
the device.
This function is only available on iOS and Android.  🤖.
 * @param type keyboard type

`gui.KEYBOARD_TYPE_DEFAULT`
`gui.KEYBOARD_TYPE_EMAIL`
`gui.KEYBOARD_TYPE_NUMBER_PAD`
`gui.KEYBOARD_TYPE_PASSWORD`

 * @param autoclose if the keyboard should automatically close when clicking outside
 */
export function show_keyboard(type: number, autoclose: boolean): void;
/**
 * Stops the particle fx for a gui node
 * @param node node to stop particle fx for
 * @param options options when stopping the particle fx. Supported options:

boolean `clear`: instantly clear spawned particles

 */
export function stop_particlefx(node: node, options?: { clear: boolean }): void;
/**
 * This is a callback-function, which is called by the engine every frame to update the state of a gui component.
It can be used to perform any kind of gui related tasks, e.g. animating nodes.
 * @param this reference to the script state to be used for storing data
 * @param dt the time-step of the frame update
 * @example This example demonstrates how to update a text node that displays game score in a counting fashion.
It is assumed that the gui component receives messages from the game when a new score is to be shown.
```lua
function init(self)
    -- fetch the score text node for later use (assumes it is called "score")
    self.score_node = gui.get_node("score")
    -- keep track of the current score counted up so far
    self.current_score = 0
    -- keep track of the target score we should count up to
    self.target_score = 0
    -- how fast we will update the score, in score/second
    self.score_update_speed = 1
end

function update(self, dt)
    -- check if target score is more than current score
    if self.current_score < self.target_score
        -- increment current score according to the speed
        self.current_score = self.current_score + dt * self.score_update_speed
        -- check if we went past the target score, clamp current score in that case
        if self.current_score > self.target_score then
            self.current_score = self.target_score
        end
        -- update the score text node
        gui.set_text(self.score_node, "" .. math.floor(self.current_score))
    end
end

function on_message(self, message_id, message, sender)
    -- check the message
    if message_id == hash("set_score") then
        self.target_score = message.score
    end
end
```
 */
export function update(this: LuaUserdata, dt: number): void;
}declare namespace gui {
export type final = (this: any) => void;
export type init = (this: any) => void;
export type on_input = (this: any, action_id: hash, action: go.input_message) => void;
export type on_message = (this: any, message_id: hash, message: object, sender: url) => void;
export type on_reload = (this: any) => void;
export type update = (this: any, dt: number) => void;
}

declare namespace html5 {
/**
 * Executes the supplied string as JavaScript inside the browser.
A call to this function is blocking, the result is returned as-is, as a string.
(Internally this will execute the string using the `eval()` JavaScript function.)
 * @param code Javascript code to run
 * @returns result as string
 * @example ```lua
local res = html5.run("10 + 20") -- returns the string "30"
print(res)
local res_num = tonumber(res) -- convert to number
print(res_num - 20) -- prints 10
```
 */
export function run(code: string): string;
/**
 * Set a JavaScript interaction listener callaback from lua that will be
invoked when a user interacts with the web page by clicking, touching or typing.
The callback can then call DOM restricted actions like requesting a pointer lock,
or start playing sounds the first time the callback is invoked.
 * @param callback The interaction callback. Pass an empty function or `nil` if you no longer wish to receive callbacks.

`self`
object The calling script

 * @example ```lua
local function on_interaction(self)
    print("on_interaction called")
    html5.set_interaction_listener(nil)
end

function init(self)
    html5.set_interaction_listener(on_interaction)
end
```
 */
export function set_interaction_listener(callback: ((this: any) => void) | undefined): void;
}

declare namespace http {
/**
 * Perform a HTTP/HTTPS request.
⚠ If no timeout value is passed, the configuration value "network.http_timeout" is used. If that is not set, the timeout value is `0` (which blocks indefinitely).
 * @param url target url
 * @param method HTTP/HTTPS method, e.g. "GET", "PUT", "POST" etc.
 * @param callback response callback function

`self`
object The script instance
`id`
hash Internal message identifier. Do not use!
`response`
table The response data. Contains the fields:


number `status`: the status of the response
string `response`: the response data (if not saved on disc)
table `headers`: all the returned headers (if status is 200 or 206)
string `path`: the stored path (if saved to disc)
string `error`: if any unforeseen errors occurred (e.g. file I/O)
number `bytes_received`: the amount of bytes received/sent for a request, only if option `report_progress` is true
number `bytes_total`: the total amount of bytes for a request, only if option `report_progress` is true
number `range_start`: the start offset into the requested file
number `range_end`: the end offset into the requested file (inclusive)
number `document_size`: the full size of the requested file

 * @param headers optional table with custom headers
 * @param post_data optional data to send
 * @param options optional table with request parameters. Supported entries:

number `timeout`: timeout in seconds
string `path`: path on disc where to download the file. Only overwrites the path if status is 200. ⚠ Path should be absolute
boolean `ignore_cache`: don't return cached data if we get a 304. ⚠ Not available in HTML5 build
boolean `chunked_transfer`: use chunked transfer encoding for https requests larger than 16kb. Defaults to true. ⚠ Not available in HTML5 build
boolean `report_progress`: when it is true, the amount of bytes sent and/or received for a request will be passed into the callback function

 * @example Basic HTTP-GET request. The callback receives a table with the response
in the fields status, the response (the data) and headers (a table).
```lua
local function http_result(self, _, response)
    if response.bytes_total ~= nil then
        update_my_progress_bar(self, response.bytes_received / response.bytes_total)
    else
        print(response.status)
        print(response.response)
        pprint(response.headers)
    end
end

function init(self)
    http.request("http://www.google.com", "GET", http_result, nil, nil, { report_progress = true })
end
```
 */
export function request(url: string, method: string, callback: ((this: any, id: any, response: any) => void), headers?: { [key: string]: string | number }, post_data?: string, options?: { timeout?: number; path?: string; ignore_cache?: boolean; chunked_transfer?: boolean; report_progress?: boolean; proxy?: string }): void;
}

declare namespace image {
/**
 * luminance image type
 */
export const TYPE_LUMINANCE: number;
/**
 * luminance image type
 */
export const TYPE_LUMINANCE_ALPHA: number;
/**
 * RGB image type
 */
export const TYPE_RGB: number;
/**
 * RGBA image type
 */
export const TYPE_RGBA: number;
/**
 * get the header of an .astc buffer
 * @param buffer .astc file data buffer
 * @example How to get the block size and dimensions from a .astc file
```lua
local s = sys.load_resource("/assets/cat.astc")
local header = image.get_astc_header(s)
pprint(s)
```
 */
export function get_astc_header(buffer: string): {
						width: number;
						height: number;
						depth: number;
						block_size_x: number;
						block_size_y: number;
						block_size_z: number;
					} | undefined;
/**
 * Load image (PNG or JPEG) from buffer.
 * @param buffer image data buffer
 * @param options An optional table containing parameters for loading the image. Supported entries:

`premultiply_alpha`
boolean True if alpha should be premultiplied into the color components. Defaults to `false`.
`flip_vertically`
boolean True if the image contents should be flipped vertically. Defaults to `false`.

 * @example How to load an image from an URL and create a GUI texture from it:
```lua
local imgurl = "http://www.site.com/image.png"
http.request(imgurl, "GET", function(self, id, response)
        local img = image.load(response.response)
        local tx = gui.new_texture("image_node", img.width, img.height, img.type, img.buffer)
    end)
```
 */
export function load(buffer: string, options?: { premultiply_alpha?: boolean; flip_vertically?: boolean }): {
						width: number;
						height: number;
						type: number;
						buffer: string;
					} | undefined;
/**
 * Load image (PNG or JPEG) from a string buffer.
 * @param buffer image data buffer
 * @param options An optional table containing parameters for loading the image. Supported entries:

`premultiply_alpha`
boolean True if alpha should be premultiplied into the color components. Defaults to `false`.
`flip_vertically`
boolean True if the image contents should be flipped vertically. Defaults to `false`.

 * @example Load an image from an URL as a buffer and create a texture resource from it:
```lua
local imgurl = "http://www.site.com/image.png"
http.request(imgurl, "GET", function(self, id, response)
        local img = image.load_buffer(response.response, { flip_vertically = true })
        local tparams = {
            width  = img.width,
            height = img.height,
            type   = graphics.TEXTURE_TYPE_2D,
            format = graphics.TEXTURE_FORMAT_RGBA }

        local my_texture_id = resource.create_texture("/my_custom_texture.texturec", tparams, img.buffer)
        -- Apply the texture to a model
        go.set("/go1#model", "texture0", my_texture_id)
    end)
```
 */
export function load_buffer(buffer: string, options?: { premultiply_alpha?: boolean; flip_vertically?: boolean }): {
						width: number;
						height: number;
						type: number;
						buffer: string;
					} | undefined;
}

declare namespace json {
/**
 * Decode a string of JSON data into a Lua table.
A Lua error is raised for syntax errors.
 * @param json json data
 * @param options table with decode options

boolean `decode_null_as_userdata`: wether to decode a JSON null value as json.null or nil (default is nil)

 * @example Converting a string containing JSON data into a Lua table:
```lua
function init(self)
    local jsonstring = '{"persons":[{"name":"John Doe"},{"name":"Darth Vader"}]}'
    local data = json.decode(jsonstring)
    pprint(data)
end
```

Results in the following printout:
```lua
{
  persons = {
    1 = {
      name = John Doe,
    }
    2 = {
      name = Darth Vader,
    }
  }
}
```
 */
export function decode(json: string, options?: { decode_null_as_userdata: boolean }): unknown;
/**
 * Encode a lua table to a JSON string.
A Lua error is raised for syntax errors.
 * @param tbl lua table to encode
 * @param options table with encode options

string `encode_empty_table_as_object`: wether to encode an empty table as an JSON object or array (default is object)

 * @returns encoded json
 * @example Convert a lua table to a JSON string:
```lua
function init(self)
     local tbl = {
          persons = {
               { name = "John Doe"},
               { name = "Darth Vader"}
          }
     }
     local jsonstring = json.encode(tbl)
     pprint(jsonstring)
end
```

Results in the following printout:
```lua
{"persons":[{"name":"John Doe"},{"name":"Darth Vader"}]}
```
 */
export function encode(tbl: object, options?: { encode_empty_table_as_object: boolean }): string;
/**
 * Represents the null primitive from a json file
 */
export let null_: number;
export {null_ as null};
}

declare namespace label {
/**
 * Gets the text from a label component
 * @param url the label to get the text from
 * @returns the label text
 * @example ```lua
function init(self)
    local text = label.get_text("#label")
    print(text)
end
```
 */
export function get_text(url: string | hash | url): string;
/**
 * Sets the text of a label component
⚠ This method uses the message passing that means the value will be set after `dispatch messages` step.
More information is available in the Application Lifecycle manual.
 * @param url the label that should have a constant set
 * @param text the text
 * @example ```lua
function init(self)
    label.set_text("#label", "Hello World!")
end
```
 */
export function set_text(url: string | hash | url, text: string | number): void;
}

declare namespace liveupdate {
/**
 * Mismatch between between expected bundled resources and actual bundled resources. The manifest expects a resource to be in the bundle, but it was not found in the bundle. This is typically the case when a non-excluded resource was modified between publishing the bundle and publishing the manifest.
 */
export const LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH: number;
/**
 * Mismatch between running engine version and engine versions supported by manifest.
 */
export const LIVEUPDATE_ENGINE_VERSION_MISMATCH: number;
/**
 * Failed to parse manifest data buffer. The manifest was probably produced by a different engine version.
 */
export const LIVEUPDATE_FORMAT_ERROR: number;
/**
 * Argument was invalid
 */
export const LIVEUPDATE_INVAL: number;
/**
 * The handled resource is invalid.
 */
export const LIVEUPDATE_INVALID_HEADER: number;
/**
 * The header of the resource is invalid.
 */
export const LIVEUPDATE_INVALID_RESOURCE: number;
/**
 * I/O operation failed
 */
export const LIVEUPDATE_IO_ERROR: number;
/**
 * Memory wasn't allocated
 */
export const LIVEUPDATE_MEM_ERROR: number;
/**
 * LIVEUPDATE_OK
 */
export const LIVEUPDATE_OK: number;
/**
 * Mismatch between scheme used to load resources. Resources are loaded with a different scheme than from manifest, for example over HTTP or directly from file. This is typically the case when running the game directly from the editor instead of from a bundle.
 */
export const LIVEUPDATE_SCHEME_MISMATCH: number;
/**
 * Mismatch between manifest expected signature and actual signature.
 */
export const LIVEUPDATE_SIGNATURE_MISMATCH: number;
/**
 * Unspecified error
 */
export const LIVEUPDATE_UNKNOWN: number;
/**
 * Mismatch between manifest expected version and actual version.
 */
export const LIVEUPDATE_VERSION_MISMATCH: number;
/**
 * Adds a resource mount to the resource system.
The mounts are persisted between sessions.
After the mount succeeded, the resources are available to load. (i.e. no reboot required)
 * @param name Unique name of the mount
 * @param uri The uri of the mount, including the scheme. Currently supported schemes are 'zip' and 'archive'.
 * @param priority Priority of mount. Larger priority takes prescedence
 * @param callback Callback after the asynchronous request completed
 * @returns The result of the request
 * @example Add multiple mounts. Higher priority takes precedence.
```lua
liveupdate.add_mount("common", "zip:/path/to/common_stuff.zip", 10, function (result) end) -- base pack
liveupdate.add_mount("levelpack_1", "zip:/path/to/levels_1_to_20.zip", 20, function (result) end) -- level pack
liveupdate.add_mount("season_pack_1", "zip:/path/to/easter_pack_1.zip", 30, function (result) end) -- season pack, overriding content in the other packs
```
 */
export function add_mount(name: string, uri: string, priority: number, callback: () => void): number;
/**
 * Return a reference to the Manifest that is currently loaded.
 * @returns reference to the Manifest that is currently loaded
 */
export function get_current_manifest(): number;
/**
 * Get an array of the current mounts
This can be used to determine if a new mount is needed or not
 * @returns Array of mounts
 * @example Output the current resource mounts
```lua
pprint("MOUNTS", liveupdate.get_mounts())
```

Give an output like:
```lua
DEBUG:SCRIPT: MOUNTS,
{ --[[0x119667bf0]]
  1 = { --[[0x119667c50]]
    name = "liveupdate",
    uri = "zip:/device/path/to/acchives/liveupdate.zip",
    priority = 5
  },
  2 = { --[[0x119667d50]]
    name = "_base",
    uri = "archive:build/default/game.dmanifest",
    priority = -10
  }
}
```
 */
export function get_mounts(): object;
/**
 * Is any liveupdate data mounted and currently in use?
This can be used to determine if a new manifest or zip file should be downloaded.
 * @returns true if a liveupdate archive (any format) has been loaded
 */
export function is_using_liveupdate_data(): boolean;
/**
 * Remove a mount the resource system.
The remaining mounts are persisted between sessions.
Removing a mount does not affect any loaded resources.
 * @param name Unique name of the mount
 * @returns The result of the call
 * @example Add multiple mounts. Higher priority takes precedence.
```lua
liveupdate.remove_mount("season_pack_1")
```
 */
export function remove_mount(name: string): number;
/**
 * Stores a zip file and uses it for live update content. The contents of the
zip file will be verified against the manifest to ensure file integrity.
It is possible to opt out of the resource verification using an option passed
to this function.
The path is stored in the (internal) live update location.
 * @param path the path to the original file on disc
 * @param callback the callback function
executed after the storage has completed

`self`
object The current object.
`status`
constant the status of the store operation (See liveupdate.store_manifest)

 * @param options optional table with extra parameters. Supported entries:

boolean `verify`: if archive should be verified as well as stored (defaults to true)

 * @example How to download an archive with HTTP and store it on device.
```lua
local LIVEUPDATE_URL = <a file server url>

-- This can be anything, but you should keep the platform bundles apart
local ZIP_FILENAME = 'defold.resourcepack.zip'

local APP_SAVE_DIR = "LiveUpdateDemo"

function init(self)
    self.proxy = "levels#level1"

    print("INIT: is_using_liveupdate_data:", liveupdate.is_using_liveupdate_data())
    -- let's download the archive
    msg.post("#", "attempt_download_archive")
end

-- helper function to store headers from the http request (e.g. the ETag)
local function store_http_response_headers(name, data)
    local path = sys.get_save_file(APP_SAVE_DIR, name)
    sys.save(path, data)
end

local function load_http_response_headers(name)
    local path = sys.get_save_file(APP_SAVE_DIR, name)
    return sys.load(path)
end

-- returns headers that can potentially generate a 304
-- without redownloading the file again
local function get_http_request_headers(name)
    local data = load_http_response_headers(name)
    local headers = {}
    for k, v in pairs(data) do
        if string.lower(k) == 'etag' then
            headers['If-None-Match'] = v
        elseif string.lower(k) == 'last-modified' then
            headers['If-Modified-Since'] = v
        end
    end
    return headers
end

local function store_archive_cb(self, path, status)
    if status == true then
        print("Successfully stored live update archive!", path)
        sys.reboot()
    else
        print("Failed to store live update archive, ", path)
        -- remove the path
    end
end

function on_message(self, message_id, message, sender)
    if message_id == hash("attempt_download_archive") then

        -- by supplying the ETag, we don't have to redownload the file again
        -- if we already have downloaded it.
        local headers = get_http_request_headers(ZIP_FILENAME .. '.json')
        if not liveupdate.is_using_liveupdate_data() then
            headers = {} -- live update data has been purged, and we need do a fresh download
        end

        local path = sys.get_save_file(APP_SAVE_DIR, ZIP_FILENAME)
        local options = {
            path = path,        -- a temporary file on disc. will be removed upon successful liveupdate storage
            ignore_cache = true -- we don't want to store a (potentially large) duplicate in our http cache
        }

        local url = LIVEUPDATE_URL .. ZIP_FILENAME
        print("Downloading", url)
        http.request(url, "GET", function(self, id, response)
            if response.status == 304 then
                print(string.format("%d: Archive zip file up-to-date", response.status))
            elseif response.status == 200 and response.error == nil then
                -- register the path to the live update system
                liveupdate.store_archive(response.path, store_archive_cb)
                -- at this point, the "path" has been moved internally to a different location

                -- save the ETag for the next run
                store_http_response_headers(ZIP_FILENAME .. '.json', response.headers)
            else
                print("Error when downloading", url, "to", path, ":", response.status, response.error)
            end

            -- If we got a 200, we would call store_archive_cb() then reboot
            -- Second time, if we get here, it should be after a 304, and then
            -- we can load the missing resources from the liveupdate archive
            if liveupdate.is_using_liveupdate_data() then
                msg.post(self.proxy, "load")
            end
        end,
        headers, nil, options)
```
 */
export function store_archive(path: string, callback: ((this: any, status: any) => void), options?: { verify: boolean }): void;
/**
 * Create a new manifest from a buffer. The created manifest is verified
by ensuring that the manifest was signed using the bundled public/private
key-pair during the bundle process and that the manifest supports the current
running engine version. Once the manifest is verified it is stored on device.
The next time the engine starts (or is rebooted) it will look for the stored
manifest before loading resources. Storing a new manifest allows the
developer to update the game, modify existing resources, or add new
resources to the game through LiveUpdate.
 * @param manifest_buffer the binary data that represents the manifest
 * @param callback the callback function
executed once the engine has attempted to store the manifest.

`self`
object The current object.
`status`
constant the status of the store operation:


`liveupdate.LIVEUPDATE_OK`
`liveupdate.LIVEUPDATE_INVALID_RESOURCE`
`liveupdate.LIVEUPDATE_VERSION_MISMATCH`
`liveupdate.LIVEUPDATE_ENGINE_VERSION_MISMATCH`
`liveupdate.LIVEUPDATE_SIGNATURE_MISMATCH`
`liveupdate.LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH`
`liveupdate.LIVEUPDATE_FORMAT_ERROR`

 * @example How to download a manifest with HTTP and store it on device.
```lua
local function store_manifest_cb(self, status)
  if status == liveupdate.LIVEUPDATE_OK then
    pprint("Successfully stored manifest. This manifest will be loaded instead of the bundled manifest the next time the engine starts.")
  else
    pprint("Failed to store manifest")
  end
end

local function download_and_store_manifest(self)
  http.request(MANIFEST_URL, "GET", function(self, id, response)
      if response.status == 200 then
        liveupdate.store_manifest(response.response, store_manifest_cb)
      end
    end)
end
```
 */
export function store_manifest(manifest_buffer: string, callback: ((this: any, status: any) => void)): void;
/**
 * add a resource to the data archive and runtime index. The resource will be verified
internally before being added to the data archive.
 * @param manifest_reference The manifest to check against.
 * @param data The resource data that should be stored.
 * @param hexdigest The expected hash for the resource,
retrieved through collectionproxy.missing_resources.
 * @param callback The callback
function that is executed once the engine has been attempted to store
the resource.

`self`
object The current object.
`hexdigest`
string The hexdigest of the resource.
`status`
boolean Whether or not the resource was successfully stored.

 * @example ```lua
function init(self)
    self.manifest = liveupdate.get_current_manifest()
end

local function callback_store_resource(self, hexdigest, status)
     if status == true then
          print("Successfully stored resource: " .. hexdigest)
     else
          print("Failed to store resource: " .. hexdigest)
     end
end

local function load_resources(self, target)
     local resources = collectionproxy.missing_resources(target)
     for _, resource_hash in ipairs(resources) do
          local baseurl = "http://example.defold.com:8000/"
          http.request(baseurl .. resource_hash, "GET", function(self, id, response)
               if response.status == 200 then
                    liveupdate.store_resource(self.manifest, response.response, resource_hash, callback_store_resource)
               else
                    print("Failed to download resource: " .. resource_hash)
               end
          end)
     end
end
```
 */
export function store_resource(manifest_reference: number, data: string, hexdigest: string, callback: ((this: any, hexdigest: any, status: any) => void)): void;
}

declare namespace model {
/**
 * Cancels all animation on a model component.
 * @param url the model for which to cancel the animation
 */
export function cancel(url: string | hash | url): void;
/**
 * Get AABB of the whole model in local coordinate space.
AABB information return as a table with `min` and `max` fields, where `min` and `max` has type `vmath.vector3`.
 * @param url the model
 * @example ```lua
model.get_aabb("#model") -> { min = vmath.vector3(-2.5, -3.0, 0), max = vmath.vector3(1.5, 5.5, 0) }
model.get_aabb("#empty") -> { min = vmath.vector3(0, 0, 0), max = vmath.vector3(0, 0, 0) }
```
 */
export function get_aabb(url: string | hash | url): {min: vmath.vector3, max: vmath.vector3};
/**
 * Gets the id of the game object that corresponds to a model skeleton bone.
The returned game object can be used for parenting and transform queries.
This function has complexity `O(n)`, where `n` is the number of bones in the model skeleton.
Game objects corresponding to a model skeleton bone can not be individually deleted.
 * @param url the model to query
 * @param bone_id id of the corresponding bone
 * @returns id of the game object
 * @example The following examples assumes that the model component has id "model".
How to parent the game object of the calling script to the "right_hand" bone of the model in a player game object:
```lua
function init(self)
    local parent = model.get_go("player#model", "right_hand")
    msg.post(".", "set_parent", {parent_id = parent})
end
```
 */
export function get_go(url: string | hash | url, bone_id: string | hash): hash;
/**
 * Get AABB of all meshes.
AABB information return as a table with `min` and `max` fields, where `min` and `max` has type `vmath.vector3`.
 * @param url the model
 * @example ```lua
model.get_mesh_aabb("#model") -> { hash("Sword") = { min = vmath.vector3(-0.5, -0.5, 0), max = vmath.vector3(0.5, 0.5, 0) }, hash("Shield") = { min = vmath.vector3(-0.5, -0.5, -0.5), max = vmath.vector3(0.5, 0.5, 0.5) } }
```
 */
export function get_mesh_aabb(url: string | hash | url): LuaMap<hash, { min: vmath.vector3, max: vmath.vector3 }>[];
/**
 * Get the enabled state of a mesh
 * @param url the model
 * @param mesh_id the id of the mesh
 * @returns true if the mesh is visible, false otherwise
 * @example ```lua
function init(self)
    if model.get_mesh_enabled("#model", "Sword") then
       -- set properties specific for the sword
       self.weapon_properties = game.data.weapons["Sword"]
    end
end
```
 */
export function get_mesh_enabled(url: string | hash | url, mesh_id: string | hash | url): boolean;
/**
 * Plays an animation on a model component with specified playback
mode and parameters.
An optional completion callback function can be provided that will be called when
the animation has completed playing. If no function is provided,
a model_animation_done message is sent to the script that started the animation.
⚠ The callback is not called (or message sent) if the animation is
cancelled with model.cancel. The callback is called (or message sent) only for
animations that play with the following playback modes:

`go.PLAYBACK_ONCE_FORWARD`
`go.PLAYBACK_ONCE_BACKWARD`
`go.PLAYBACK_ONCE_PINGPONG`

 * @param url the model for which to play the animation
 * @param anim_id id of the animation to play
 * @param playback playback mode of the animation

`go.PLAYBACK_ONCE_FORWARD`
`go.PLAYBACK_ONCE_BACKWARD`
`go.PLAYBACK_ONCE_PINGPONG`
`go.PLAYBACK_LOOP_FORWARD`
`go.PLAYBACK_LOOP_BACKWARD`
`go.PLAYBACK_LOOP_PINGPONG`

 * @param play_properties optional table with properties
Play properties table:

`blend_duration`
number Duration of a linear blend between the current and new animation.
`offset`
number The normalized initial value of the animation cursor when the animation starts playing.
`playback_rate`
number The rate with which the animation will be played. Must be positive.

 * @param complete_function function to call when the animation has completed.

`self`
object The current object.
`message_id`
hash The name of the completion message, `"model_animation_done"`.
`message`
table Information about the completion:


hash `animation_id` - the animation that was completed.
constant `playback` - the playback mode for the animation.


`sender`
url The invoker of the callback: the model component.

 * @example The following examples assumes that the model has id "model".
How to play the "jump" animation followed by the "run" animation:
```lua
local function anim_done(self, message_id, message, sender)
  if message_id == hash("model_animation_done") then
    if message.animation_id == hash("jump") then
      -- open animation done, chain with "run"
      local properties = { blend_duration = 0.2 }
      model.play_anim(url, "run", go.PLAYBACK_LOOP_FORWARD, properties, anim_done)
    end
  end
end

function init(self)
    local url = msg.url("#model")
    local play_properties = { blend_duration = 0.1 }
    -- first blend during 0.1 sec into the jump, then during 0.2 s into the run animation
    model.play_anim(url, "jump", go.PLAYBACK_ONCE_FORWARD, play_properties, anim_done)
end
```
 */
export function play_anim(url: string | hash | url, anim_id: string | hash, playback: number, play_properties?: { blend_duration?: number; offset?: number; playback_rate?: number }, complete_function?: ((this: any, message_id: any, message: any, sender: any) => void)): void;
/**
 * Enable or disable visibility of a mesh
 * @param url the model
 * @param mesh_id the id of the mesh
 * @param enabled true if the mesh should be visible, false if it should be hideen
 * @example ```lua
function init(self)
    model.set_mesh_enabled("#model", "Sword", false) -- hide the sword
    model.set_mesh_enabled("#model", "Axe", true)    -- show the axe
end
```
 */
export function set_mesh_enabled(url: string | hash | url, mesh_id: string | hash | url, enabled: boolean): void;
}

declare namespace msg {
/**
 * Post a message to a receiving URL. The most common case is to send messages
to a component. If the component part of the receiver is omitted, the message
is broadcast to all components in the game object.
The following receiver shorthands are available:

`"."` the current game object
`"#"` the current component

⚠ There is a 2 kilobyte limit to the message parameter table size.
 * @param receiver The receiver must be a string in URL-format, a URL object or a hashed string.
 * @param message_id The id must be a string or a hashed string.
 * @param message a lua table with message parameters to send.
 * @example Send "enable" to the sprite "my_sprite" in "my_gameobject":
```lua
msg.post("my_gameobject#my_sprite", "enable")
```

Send a "my_message" to an url with some additional data:
```lua
local params = {my_parameter = "my_value"}
msg.post(my_url, "my_message", params)
```
 */
export function post(receiver: string | url | hash, message_id: string | hash, message?: object | undefined): void;
/**
 * This is equivalent to `msg.url(nil)` or `msg.url("#")`, which creates an url to the current
script component.
 * @returns a new URL
 * @example Create a new URL which will address the current script:
```lua
local my_url = msg.url()
print(my_url) --> url: [current_collection:/my_instance#my_component]
```
 */
export function url(): url;
/**
 * The format of the string must be `[socket:][path][#fragment]`, which is similar to a HTTP URL.
When addressing instances:

`socket` is the name of a valid world (a collection)
`path` is the id of the instance, which can either be relative the instance of the calling script or global
`fragment` would be the id of the desired component

In addition, the following shorthands are available:

`"."` the current game object
`"#"` the current component

 * @param urlstring string to create the url from
 * @returns a new URL
 * @example ```lua
local my_url = msg.url("#my_component")
print(my_url) --> url: [current_collection:/my_instance#my_component]

local my_url = msg.url("my_collection:/my_sub_collection/my_instance#my_component")
print(my_url) --> url: [my_collection:/my_sub_collection/my_instance#my_component]

local my_url = msg.url("my_socket:")
print(my_url) --> url: [my_collection:]
```
 */
export function url(urlstring: string): url;
/**
 * creates a new URL from separate arguments
 * @param socket socket of the URL
 * @param path path of the URL
 * @param fragment fragment of the URL
 * @returns a new URL
 * @example ```lua
local my_socket = "main" -- specify by valid name
local my_path = hash("/my_collection/my_gameobject") -- specify as string or hash
local my_fragment = "component" -- specify as string or hash
local my_url = msg.url(my_socket, my_path, my_fragment)

print(my_url) --> url: [main:/my_collection/my_gameobject#component]
print(my_url.socket) --> 786443 (internal numeric value)
print(my_url.path) --> hash: [/my_collection/my_gameobject]
print(my_url.fragment) --> hash: [component]
```
 */
export function url(socket?: string | hash, path?: string | hash, fragment?: string | hash): url;
}declare namespace msg {
export type generic_message = { [key: string|number]: unknown };
}

declare namespace particlefx {
/**
 * The emitter is not spawning any particles, but has particles that are still alive.
 */
export const EMITTER_STATE_POSTSPAWN: number;
/**
 * The emitter will be in this state when it has been started but before spawning any particles. Normally the emitter is in this state for a short time, depending on if a start delay has been set for this emitter or not.
 */
export const EMITTER_STATE_PRESPAWN: number;
/**
 * The emitter does not have any living particles and will not spawn any particles in this state.
 */
export const EMITTER_STATE_SLEEPING: number;
/**
 * The emitter is spawning particles.
 */
export const EMITTER_STATE_SPAWNING: number;
/**
 * Starts playing a particle FX component.
Particle FX started this way need to be manually stopped through `particlefx.stop()`.
Which particle FX to play is identified by the URL.
⚠ A particle FX will continue to emit particles even if the game object the particle FX component belonged to is deleted. You can call `particlefx.stop()` to stop it from emitting more particles.
 * @param url the particle fx that should start playing.
 * @param emitter_state_function optional callback function that will be called when an emitter attached to this particlefx changes state.

`self`
object The current object
`id`
hash The id of the particle fx component
`emitter`
hash The id of the emitter
`state`
constant the new state of the emitter:


`particlefx.EMITTER_STATE_SLEEPING`
`particlefx.EMITTER_STATE_PRESPAWN`
`particlefx.EMITTER_STATE_SPAWNING`
`particlefx.EMITTER_STATE_POSTSPAWN`

 * @example How to play a particle fx when a game object is created.
The callback receives the hash of the path to the particlefx, the hash of the id
of the emitter, and the new state of the emitter as particlefx.EMITTER_STATE_.
```lua
local function emitter_state_change(self, id, emitter, state)
  if emitter == hash("exhaust") and state == particlefx.EMITTER_STATE_POSTSPAWN then
    -- exhaust is done spawning particles...
  end
end

function init(self)
    particlefx.play("#particlefx", emitter_state_change)
end
```
 */
export function play(url: string | hash | url, emitter_state_function?: ((this: any, id: any, emitter: any, state: any) => void)): void;
/**
 * Resets a shader constant for a particle FX component emitter.
The constant must be defined in the material assigned to the emitter.
Resetting a constant through this function implies that the value defined in the material will be used.
Which particle FX to reset a constant for is identified by the URL.
 * @param url the particle FX that should have a constant reset
 * @param emitter the id of the emitter
 * @param constant the name of the constant
 * @example The following examples assumes that the particle FX has id "particlefx", it
contains an emitter with the id "emitter" and that the default-material in builtins is used, which defines the constant "tint".
If you assign a custom material to the sprite, you can reset the constants defined there in the same manner.
How to reset the tinting of particles from an emitter:
```lua
function init(self)
    particlefx.reset_constant("#particlefx", "emitter", "tint")
end
```
 */
export function reset_constant(url: string | hash | url, emitter: string | hash, constant: string | hash): void;
/**
 * Sets a shader constant for a particle FX component emitter.
The constant must be defined in the material assigned to the emitter.
Setting a constant through this function will override the value set for that constant in the material.
The value will be overridden until particlefx.reset_constant is called.
Which particle FX to set a constant for is identified by the URL.
 * @param url the particle FX that should have a constant set
 * @param emitter the id of the emitter
 * @param constant the name of the constant
 * @param value the value of the constant
 * @example The following examples assumes that the particle FX has id "particlefx", it
contains an emitter with the id "emitter" and that the default-material in builtins is used, which defines the constant "tint".
If you assign a custom material to the sprite, you can reset the constants defined there in the same manner.
How to tint particles from an emitter red:
```lua
function init(self)
    particlefx.set_constant("#particlefx", "emitter", "tint", vmath.vector4(1, 0, 0, 1))
end
```
 */
export function set_constant(url: string | hash | url, emitter: string | hash, constant: string | hash, value: vmath.vector4): void;
/**
 * Stops a particle FX component from playing.
Stopping a particle FX does not remove already spawned particles.
Which particle FX to stop is identified by the URL.
 * @param url the particle fx that should stop playing
 * @param options Options when stopping the particle fx. Supported options:

boolean `clear`: instantly clear spawned particles

 * @example How to stop a particle fx when a game object is deleted and immediately also clear
any spawned particles:
```lua
function final(self)
    particlefx.stop("#particlefx", { clear = true })
end
```
 */
export function stop(url: string | hash | url, options?: { clear: boolean }): void;
}

declare namespace physics {
/**
 * The following properties are available when connecting a joint of `JOINT_TYPE_FIXED` type:
 * @param max_length The maximum length of the rope.
 */
export const JOINT_TYPE_FIXED: number;
/**
 * The following properties are available when connecting a joint of `JOINT_TYPE_HINGE` type:
 * @param reference_angle The bodyB angle minus bodyA angle in the reference state (radians).
 * @param lower_angle The lower angle for the joint limit (radians).
 * @param upper_angle The upper angle for the joint limit (radians).
 * @param max_motor_torque The maximum motor torque used to achieve the desired motor speed. Usually in N-m.
 * @param motor_speed The desired motor speed. Usually in radians per second.
 * @param enable_limit A flag to enable joint limits.
 * @param enable_motor A flag to enable the joint motor.
 * @param joint_angle READ ONLYCurrent joint angle in radians.
(Read only field, available from `physics.get_joint_properties()`)
 * @param joint_speed READ ONLYCurrent joint angle speed in radians per second.
(Read only field, available from `physics.get_joint_properties()`)
 */
export const JOINT_TYPE_HINGE: number;
/**
 * The following properties are available when connecting a joint of `JOINT_TYPE_SLIDER` type:
 * @param local_axis_a The local translation unit axis in bodyA.
 * @param reference_angle The constrained angle between the bodies: bodyB_angle - bodyA_angle.
 * @param enable_limit Enable/disable the joint limit.
 * @param lower_translation The lower translation limit, usually in meters.
 * @param upper_translation The upper translation limit, usually in meters.
 * @param enable_motor Enable/disable the joint motor.
 * @param max_motor_force The maximum motor torque, usually in N-m.
 * @param motor_speed The desired motor speed in radians per second.
 * @param joint_translation READ ONLYCurrent joint translation, usually in meters.
(Read only field, available from `physics.get_joint_properties()`)
 * @param joint_speed READ ONLYCurrent joint translation speed, usually in meters per second.
(Read only field, available from `physics.get_joint_properties()`)
 */
export const JOINT_TYPE_SLIDER: number;
/**
 * The following properties are available when connecting a joint of `JOINT_TYPE_SPRING` type:
 * @param length The natural length between the anchor points.
 * @param frequency The mass-spring-damper frequency in Hertz. A value of 0 disables softness.
 * @param damping The damping ratio. 0 = no damping, 1 = critical damping.
 */
export const JOINT_TYPE_SPRING: number;
/**
 * The following properties are available when connecting a joint of `JOINT_TYPE_WELD` type:
 * @param reference_angle READ ONLYThe bodyB angle minus bodyA angle in the reference state (radians).
 * @param frequency The mass-spring-damper frequency in Hertz. Rotation only. Disable softness with a value of 0.
 * @param damping The damping ratio. 0 = no damping, 1 = critical damping.
 */
export const JOINT_TYPE_WELD: number;
/**
 * The following properties are available when connecting a joint of `JOINT_TYPE_WHEEL` type:
 * @param local_axis_a The local translation unit axis in bodyA.
 * @param max_motor_torque The maximum motor torque used to achieve the desired motor speed. Usually in N-m.
 * @param motor_speed The desired motor speed in radians per second.
 * @param enable_motor Enable/disable the joint motor.
 * @param frequency The mass-spring-damper frequency in Hertz. Rotation only. Disable softness with a value of 0.
 * @param damping The spring damping ratio. 0 = no damping, 1 = critical damping.
 * @param joint_translation READ ONLYCurrent joint translation, usually in meters.
(Read only field, available from `physics.get_joint_properties()`)
 * @param joint_speed READ ONLYCurrent joint translation speed, usually in meters per second.
(Read only field, available from `physics.get_joint_properties()`)
 */
export const JOINT_TYPE_WHEEL: number;
export const SHAPE_TYPE_BOX: number;
export const SHAPE_TYPE_CAPSULE: number;
export const SHAPE_TYPE_HULL: number;
export const SHAPE_TYPE_SPHERE: number;
/**
 * Create a physics joint between two collision object components.
Note: Currently only supported in 2D physics.
 * @param joint_type the joint type
 * @param collisionobject_a first collision object
 * @param joint_id id of the joint
 * @param position_a local position where to attach the joint on the first collision object
 * @param collisionobject_b second collision object
 * @param position_b local position where to attach the joint on the second collision object
 * @param properties optional joint specific properties table
See each joint type for possible properties field. The one field that is accepted for all joint types is:
- boolean `collide_connected`: Set this flag to true if the attached bodies should collide.
 */
export function create_joint(joint_type: number, collisionobject_a: string | hash | url, joint_id: string | hash, position_a: vmath.vector3, collisionobject_b: string | hash | url, position_b: vmath.vector3, properties?: { [key: string]: number | boolean | vmath.vector3 } | LuaMap<string, number | boolean | vmath.vector3>): void;
/**
 * Destroy an already physics joint. The joint has to be created before a
destroy can be issued.
Note: Currently only supported in 2D physics.
 * @param collisionobject collision object where the joint exist
 * @param joint_id id of the joint
 */
export function destroy_joint(collisionobject: string | hash | url, joint_id: string | hash): void;
/**
 * Get the gravity in runtime. The gravity returned is not global, it will return
the gravity for the collection that the function is called from.
Note: For 2D physics the z component will always be zero.
 * @returns gravity vector of collection
 * @example ```lua
function init(self)
    local gravity = physics.get_gravity()
    -- Inverse gravity!
    gravity = -gravity
    physics.set_gravity(gravity)
end
```
 */
export function get_gravity(): vmath.vector3;
/**
 * Returns the group name of a collision object as a hash.
 * @param url the collision object to return the group of.
 * @returns hash value of the group.
`local function check_is_enemy()
    local group = physics.get_group("#collisionobject")
    return group == hash("enemy")
end
`
 */
export function get_group(url: string | hash | url): hash;
/**
 * Get a table for properties for a connected joint. The joint has to be created before
properties can be retrieved.
Note: Currently only supported in 2D physics.
 * @param collisionobject collision object where the joint exist
 * @param joint_id id of the joint
 */
export function get_joint_properties(collisionobject: string | hash | url, joint_id: string | hash): { [key: string]: number | boolean | vmath.vector3 };
/**
 * Get the reaction force for a joint. The joint has to be created before
the reaction force can be calculated.
Note: Currently only supported in 2D physics.
 * @param collisionobject collision object where the joint exist
 * @param joint_id id of the joint
 * @returns reaction force for the joint
 */
export function get_joint_reaction_force(collisionobject: string | hash | url, joint_id: string | hash): vmath.vector3;
/**
 * Get the reaction torque for a joint. The joint has to be created before
the reaction torque can be calculated.
Note: Currently only supported in 2D physics.
 * @param collisionobject collision object where the joint exist
 * @param joint_id id of the joint
 * @returns the reaction torque on bodyB in N*m.
 */
export function get_joint_reaction_torque(collisionobject: string | hash | url, joint_id: string | hash): number;
/**
 * Returns true if the specified group is set in the mask of a collision
object, false otherwise.
 * @param url the collision object to check the mask of.
 * @param group the name of the group to check for.
 * @returns boolean value of the maskbit. 'true' if present, 'false' otherwise.
`local function is_invincible()
    -- check if the collisionobject would collide with the "bullet" group
    local invincible = physics.get_maskbit("#collisionobject", "bullet")
    return invincible
end
`
 */
export function get_maskbit(url: string | hash | url, group: string): boolean;
/**
 * Gets collision shape data from a collision object
 * @param url the collision object.
 * @param shape the name of the shape to get data for.
 */
export function get_shape(url: string | hash | url, shape: string | hash): {type: number, diameter?: number, height?: number, dimensions?: vmath.vector3};
/**
 * Ray casts are used to test for intersections against collision objects in the physics world.
Collision objects of types kinematic, dynamic and static are tested against. Trigger objects
do not intersect with ray casts.
Which collision objects to hit is filtered by their collision groups and can be configured
through `groups`.
NOTE: Ray casts will ignore collision objects that contain the starting point of the ray. This is a limitation in Box2D.
 * @param from the world position of the start of the ray
 * @param to the world position of the end of the ray
 * @param groups a lua table containing the hashed groups for which to test collisions against
 * @param options a lua table containing options for the raycast.

`all`
boolean Set to `true` to return all ray cast hits. If `false`, it will only return the closest hit.

 * @example How to perform a ray cast synchronously:
```lua
function init(self)
    self.groups = {hash("world"), hash("enemy")}
end

function update(self, dt)
    -- request ray cast
    local result = physics.raycast(from, to, self.groups, {all=true})
    if result ~= nil then
        -- act on the hit (see 'ray_cast_response')
        for _,result in ipairs(results) do
            handle_result(result)
        end
    end
end
```
 */
export function raycast(from: vmath.vector3, to: vmath.vector3, groups: hash[] | LuaSet<hash>, options?: { all: boolean }): { fraction: number, position: vmath.vector3, normal: vmath.vector3, id: hash, group: hash, request_id: number } | undefined;
/**
 * Ray casts are used to test for intersections against collision objects in the physics world.
Collision objects of types kinematic, dynamic and static are tested against. Trigger objects
do not intersect with ray casts.
Which collision objects to hit is filtered by their collision groups and can be configured
through `groups`.
The actual ray cast will be performed during the physics-update.

If an object is hit, the result will be reported via a ray_cast_response message.
If there is no object hit, the result will be reported via a ray_cast_missed message.

NOTE: Ray casts will ignore collision objects that contain the starting point of the ray. This is a limitation in Box2D.
 * @param from the world position of the start of the ray
 * @param to the world position of the end of the ray
 * @param groups a lua table containing the hashed groups for which to test collisions against
 * @param request_id a number in range [0,255]. It will be sent back in the response for identification, 0 by default
 * @example How to perform a ray cast asynchronously:
```lua
function init(self)
    self.my_groups = {hash("my_group1"), hash("my_group2")}
end

function update(self, dt)
    -- request ray cast
    physics.raycast_async(my_start, my_end, self.my_groups)
end

function on_message(self, message_id, message, sender)
    -- check for the response
    if message_id == hash("ray_cast_response") then
        -- act on the hit
    elseif message_id == hash("ray_cast_missed") then
        -- act on the miss
    end
end
```
 */
export function raycast_async(from: vmath.vector3, to: vmath.vector3, groups: hash[] | LuaSet<hash>, request_id?: number): void;
/**
 * Only one physics world event listener can be set at a time.
 * @param callback A callback that receives an information about all the physics interactions in this physics world.

`self`
object The calling script
`event`
constant The type of event. Can be one of these messages:


contact_point_event
collision_event
trigger_event
ray_cast_response
ray_cast_missed


`data`
table The callback value data is a table that contains event-related data. See the documentation for details on the messages.

 * @example ```lua
local function physics_world_listener(self, events)
  for _,event in ipairs(events):
      local event_type = event['type']
      if event_type == hash("contact_point_event") then
          pprint(event)
          -- {
          --  distance = 2.1490633487701,
          --  applied_impulse = 0
          --  a = { --[[0x113f7c6c0]]
          --    group = hash: [box],
          --    id = hash: [/box]
          --    mass = 0,
          --    normal = vmath.vector3(0.379, 0.925, -0),
          --    position = vmath.vector3(517.337, 235.068, 0),
          --    instance_position = vmath.vector3(480, 144, 0),
          --    relative_velocity = vmath.vector3(-0, -0, -0),
          --  },
          --  b = { --[[0x113f7c840]]
          --    group = hash: [circle],
          --    id = hash: [/circle]
          --    mass = 0,
          --    normal = vmath.vector3(-0.379, -0.925, 0),
          --    position = vmath.vector3(517.337, 235.068, 0),
          --    instance_position = vmath.vector3(-0.0021, 0, -0.0022),
          --    relative_velocity = vmath.vector3(0, 0, 0),
          --  },
          -- }
      elseif event == hash("collision_event") then
          pprint(event)
          -- {
          --  a = {
          --          group = hash: [default],
          --          position = vmath.vector3(183, 666, 0),
          --          id = hash: [/go1]
          --      },
          --  b = {
          --          group = hash: [default],
          --          position = vmath.vector3(185, 704.05865478516, 0),
          --          id = hash: [/go2]
          --      }
          -- }
      elseif event ==  hash("trigger_event") then
          pprint(event)
          -- {
          --  enter = true,
          --  b = {
          --      group = hash: [default],
          --      id = hash: [/go2]
          --  },
          --  a = {
          --      group = hash: [default],
          --      id = hash: [/go1]
          --  }
          -- },
      elseif event ==  hash("ray_cast_response") then
          pprint(event)
          --{
          --  group = hash: [default],
          --  request_id = 0,
          --  position = vmath.vector3(249.92222595215, 249.92222595215, 0),
          --  fraction = 0.68759721517563,
          --  normal = vmath.vector3(0, 1, 0),
          --  id = hash: [/go]
          -- }
      elseif event ==  hash("ray_cast_missed") then
          pprint(event)
          -- {
          --  request_id = 0
          --},
      end
end

function init(self)
    physics.set_event_listener(physics_world_listener)
end
```
 */
export function set_event_listener(callback: ((this: any, events: any) => void) | undefined): void;
/**
 * Set the gravity in runtime. The gravity change is not global, it will only affect
the collection that the function is called from.
Note: For 2D physics the z component of the gravity vector will be ignored.
 * @param gravity the new gravity vector
 * @example ```lua
function init(self)
    -- Set "upside down" gravity for this collection.
    physics.set_gravity(vmath.vector3(0, 10.0, 0))
end
```
 */
export function set_gravity(gravity: vmath.vector3): void;
/**
 * Updates the group property of a collision object to the specified
string value. The group name should exist i.e. have been used in
a collision object in the editor.
 * @param url the collision object affected.
 * @param group the new group name to be assigned.
`local function change_collision_group()
     physics.set_group("#collisionobject", "enemy")
end
`
 */
export function set_group(url: string | hash | url, group: hash | string): void;
/**
 * Flips the collision shapes horizontally for a collision object
 * @param url the collision object that should flip its shapes
 * @param flip `true` if the collision object should flip its shapes, `false` if not
 * @example ```lua
function init(self)
    self.fliph = true -- set on some condition
    physics.set_hflip("#collisionobject", self.fliph)
end
```
 */
export function set_hflip(url: string | hash | url, flip: boolean): void;
/**
 * Updates the properties for an already connected joint. The joint has to be created before
properties can be changed.
Note: Currently only supported in 2D physics.
 * @param collisionobject collision object where the joint exist
 * @param joint_id id of the joint
 * @param properties joint specific properties table
Note: The `collide_connected` field cannot be updated/changed after a connection has been made.
 */
export function set_joint_properties(collisionobject: string | hash | url, joint_id: string | hash, properties: { [key: string]: number | boolean | vmath.vector3 } | LuaMap<string, number | boolean | vmath.vector3>): void;
/**
 * Sets or clears the masking of a group (maskbit) in a collision object.
 * @param url the collision object to change the mask of.
 * @param group the name of the group (maskbit) to modify in the mask.
 * @param maskbit boolean value of the new maskbit. 'true' to enable, 'false' to disable.
`local function make_invincible()
    -- no longer collide with the "bullet" group
    physics.set_maskbit("#collisionobject", "bullet", false)
end
`
 */
export function set_maskbit(url: string | hash | url, group: hash | string, maskbit: boolean): void;
/**
 * Sets collision shape data for a collision object. Please note that updating data in 3D
can be quite costly for box and capsules. Because of the physics engine, the cost
comes from having to recreate the shape objects when certain shapes needs to be updated.
 * @param url the collision object.
 * @param shape the name of the shape to get data for.
 * @param table the shape data to update the shape with.
See physics.get_shape for a detailed description of each field in the data table.
`local function set_shape_data()
    -- set capsule shape data
    local data = {}
    data.type = physics.SHAPE_TYPE_CAPSULE
    data.diameter = 10
    data.height = 20
    physics.set_shape("#collisionobject", "my_capsule_shape", data)

    -- set sphere shape data
    data = {}
    data.type = physics.SHAPE_TYPE_SPHERE
    data.diameter = 10
    physics.set_shape("#collisionobject", "my_sphere_shape", data)

    -- set box shape data
    data = {}
    data.type = physics.SHAPE_TYPE_BOX
    data.dimensions = vmath.vector3(10, 10, 5)
    physics.set_shape("#collisionobject", "my_box_shape", data)
end
`
 */
export function set_shape(url: string | hash | url, shape: string | hash, table: { type: number; diameter?: number; height?: number; dimensions?: vmath.vector3 }): void;
/**
 * Flips the collision shapes vertically for a collision object
 * @param url the collision object that should flip its shapes
 * @param flip `true` if the collision object should flip its shapes, `false` if not
 * @example ```lua
function init(self)
    self.flipv = true -- set on some condition
    physics.set_vflip("#collisionobject", self.flipv)
end
```
 */
export function set_vflip(url: string | hash | url, flip: boolean): void;
/**
 * The function recalculates the density of each shape based on the total area of all shapes and the specified mass, then updates the mass of the body accordingly.
Note: Currently only supported in 2D physics.
 * @param collisionobject the collision object whose mass needs to be updated.
 * @param mass the new mass value to set for the collision object.
 * @example ```lua
 physics.update_mass("#collisionobject", 14)
```
 */
export function update_mass(collisionobject: string | hash | url, mass: number): void;
/**
 * Collision objects tend to fall asleep when inactive for a small period of time for
efficiency reasons. This function wakes them up.
 * @param url the collision object to wake.
`function on_input(self, action_id, action)
    if action_id == hash("test") and action.pressed then
        physics.wakeup("#collisionobject")
    end
end
`
 */
export function wakeup(url: string | hash | url): void;
}

declare namespace profiler {
/**
 * pause on current frame
 */
export const MODE_PAUSE: number;
/**
 * start recording
 */
export const MODE_RECORD: number;
/**
 * continously show latest frame
 */
export const MODE_RUN: number;
/**
 * pause at peak frame
 */
export const MODE_SHOW_PEAK_FRAME: number;
/**
 * show full profiler ui
 */
export const VIEW_MODE_FULL: number;
/**
 * show mimimal profiler ui
 */
export const VIEW_MODE_MINIMIZED: number;
/**
 * logs the current frame to the console
 * @example ```lua
profiler.dump_frame()
```
 */
export function dump_frame(): void;
/**
 * The profiler is a real-time tool that shows the numbers of milliseconds spent
in each scope per frame as well as counters. The profiler is very useful for
tracking down performance and resource problems.
 * @param enabled true to enable, false to disable
 * @example ```lua
-- Show the profiler UI
profiler.enable(true)
```
 */
export function enable(enabled: boolean): void;
/**
 * Creates and shows or hides and destroys the on-sceen profiler ui
The profiler is a real-time tool that shows the numbers of milliseconds spent
in each scope per frame as well as counters. The profiler is very useful for
tracking down performance and resource problems.
 * @param enabled true to enable, false to disable
 * @example ```lua
-- Show the profiler UI
profiler.enable_ui(true)
```
 */
export function enable_ui(enabled: boolean): void;
/**
 * Get the percent of CPU usage by the application, as reported by the OS.
⚠ This function is not available on 🌎 HTML5.
For some platforms (🤖 Android, 🐧 Linux and 🪟 Windows), this information is only available
by default in the debug version of the engine. It can be enabled in release version as well
by checking `track_cpu` under `profiler` in the `game.project` file.
(This means that the engine will sample the CPU usage in intervalls during execution even in release mode.)
 * @returns of CPU used by the application
 */
export function get_cpu_usage(): number;
/**
 * Get the amount of memory used (resident/working set) by the application in bytes, as reported by the OS.
⚠ This function is not available on 🌎 HTML5.
The values are gathered from internal OS functions which correspond to the following;



OS
Value




 iOS🍎 MacOS🤖Android🐧 Linux
Resident memory


🪟 Windows
Working set


🌎 HTML5
⚠ Not available



 * @returns used by the application
 * @example Get memory usage before and after loading a collection:
```lua
print(profiler.get_memory_usage())
msg.post("#collectionproxy", "load")
...
print(profiler.get_memory_usage()) -- will report a higher number than the initial call
```
 */
export function get_memory_usage(): number;
/**
 * Send a text to the connected profiler
 * @param text the string to send to the connected profiler
 * @example ```lua
profiler.log_text("Event: " .. name)
```
 */
export function log_text(text: string): void;
/**
 * Get the number of recorded frames in the on-screen profiler ui recording buffer
 * @returns the number of recorded frames, zero if on-screen profiler is disabled
 * @example ```lua
-- Show the last recorded frame
local recorded_frame_count = profiler.recorded_frame_count()
profiler.view_recorded_frame(recorded_frame_count)
```
 */
export function recorded_frame_count(): number;
/**
 * Starts a profile scope.
 * @param name The name of the scope
 * @example ```lua
-- Go back one frame
profiler.scope_begin("test_function")
  test_function()
profiler.scope_end()
```
 */
export function scope_begin(name: string): void;
/**
 * End the current profile scope.
 */
export function scope_end(): void;
/**
 * Set the on-screen profile mode - run, pause, record or show peak frame
 * @param mode the mode to set the ui profiler in

`profiler.MODE_RUN` This is default mode that continously shows the last frame
`profiler.MODE_PAUSE` Pauses on the currently displayed frame
`profiler.MODE_SHOW_PEAK_FRAME` Pauses on the currently displayed frame but shows a new frame if that frame is slower
`profiler.MODE_RECORD` Records all incoming frames to the recording buffer

To stop recording, switch to a different mode such as `MODE_PAUSE` or `MODE_RUN`.
You can also use the `view_recorded_frame` function to display a recorded frame. Doing so stops the recording as well.
Every time you switch to recording mode the recording buffer is cleared.
 * @example ```lua
function start_recording()
     profiler.set_ui_mode(profiler.MODE_RECORD)
end

function stop_recording()
     profiler.set_ui_mode(profiler.MODE_PAUSE)
end
```
 */
export function set_ui_mode(mode: number): void;
/**
 * Set the on-screen profile view mode - minimized or expanded
 * @param mode the view mode to set the ui profiler in

`profiler.VIEW_MODE_FULL` The default mode which displays all the ui profiler details
`profiler.VIEW_MODE_MINIMIZED` Minimized mode which only shows the top header (fps counters and ui profiler mode)

 * @example ```lua
-- Minimize the profiler view
profiler.set_ui_view_mode(profiler.VIEW_MODE_MINIMIZED)
```
 */
export function set_ui_view_mode(mode: number): void;
/**
 * Shows or hides the time the engine waits for vsync in the on-screen profiler
Each frame the engine waits for vsync and depending on your vsync settings and how much time
your game logic takes this time can dwarf the time in the game logic making it hard to
see details in the on-screen profiler graph and lists.
Also, by hiding this the FPS times in the header show the time spent each time excuding the
time spent waiting for vsync. This shows you how long time your game is spending actively
working each frame.
This setting also effects the display of recorded frames but does not affect the actual
recorded frames so it is possible to toggle this on and off when viewing recorded frames.
By default the vsync wait times is displayed in the profiler.
 * @param visible true to include it in the display, false to hide it.
 * @example ```lua
-- Exclude frame wait time form the profiler ui
profiler.set_ui_vsync_wait_visible(false)
```
 */
export function set_ui_vsync_wait_visible(visible: boolean): void;
/**
 * Pauses and displays a frame from the recording buffer in the on-screen profiler ui
The frame to show can either be an absolute frame or a relative frame to the current frame.
 * @param frame_index a table where you specify one of the following parameters:

`distance` The offset from the currently displayed frame (this is truncated between zero and the number of recorded frames)
`frame` The frame index in the recording buffer (1 is first recorded frame)

 * @example ```lua
-- Go back one frame
profiler.view_recorded_frame({distance = -1})
```
 */
export function view_recorded_frame(frame_index: { distance?: number; frame?: number }): void;
}

declare namespace render {
export const FRUSTUM_PLANES_ALL: number;
export const FRUSTUM_PLANES_SIDES: number;
export const RENDER_TARGET_DEFAULT: number;
/**
 * Depth sort far-to-near (default; good for transparent passes).
 */
export const SORT_BACK_TO_FRONT: number;
/**
 * Depth sort near-to-far (good for opaque passes to reduce overdraw).
 */
export const SORT_FRONT_TO_BACK: number;
/**
 * No per-call sorting; draw entries in insertion order.
 */
export const SORT_NONE: number;
/**
 * Clear buffers in the currently enabled render target with specified value. If the render target has been created with multiple
color attachments, all buffers will be cleared with the same value.
 * @param buffers table with keys specifying which buffers to clear and values set to clear values. Available keys are:

`graphics.BUFFER_TYPE_COLOR0_BIT`
`graphics.BUFFER_TYPE_DEPTH_BIT`
`graphics.BUFFER_TYPE_STENCIL_BIT`

 * @example Clear the color buffer and the depth buffer.
```lua
render.clear({[graphics.BUFFER_TYPE_COLOR0_BIT] = vmath.vector4(0, 0, 0, 0), [graphics.BUFFER_TYPE_DEPTH_BIT] = 1})
```
 */
export function clear(buffers: { 
							[key: number]: vmath.vector4 | number
						}): void;
/**
 * Constant buffers are used to set shader program variables and are optionally passed to the `render.draw()` function.
The buffer's constant elements can be indexed like an ordinary Lua table, but you can't iterate over them with pairs() or ipairs().
 * @example Set a "tint" constant in a constant buffer in the render script:
```lua
local constants = render.constant_buffer()
constants.tint = vmath.vector4(1, 1, 1, 1)
```

Then use the constant buffer when drawing a predicate:
```lua
render.draw(self.my_pred, {constants = constants})
```

The constant buffer also supports array values by specifying constants in a table:
```lua
local constants = render.constant_buffer()
constants.light_colors    = {}
constants.light_colors[1] = vmath.vector4(1, 0, 0, 1)
constants.light_colors[2] = vmath.vector4(0, 1, 0, 1)
constants.light_colors[3] = vmath.vector4(0, 0, 1, 1)
```

You can also create the table by passing the vectors directly when creating the table:
```lua
local constants = render.constant_buffer()
constants.light_colors    = {
     vmath.vector4(1, 0, 0, 1)
     vmath.vector4(0, 1, 0, 1)
     vmath.vector4(0, 0, 1, 1)
}

-- Add more constant to the array
constants.light_colors[4] = vmath.vector4(1, 1, 1, 1)
```
 */
export function constant_buffer(): constant_buffer;
/**
 * Deletes a render target created by a render script.
You cannot delete a render target resource.
 * @param render_target render target to delete
 * @example How to delete a render target:
```lua
 render.delete_render_target(self.my_render_target)
```
 */
export function delete_render_target(render_target: render_target): void;
/**
 * If a material is currently enabled, disable it.
The name of the material must be specified in the ".render" resource set
in the "game.project" setting.
 * @example Enable material named "glow", then draw my_pred with it.
```lua
render.enable_material("glow")
render.draw(self.my_pred)
render.disable_material()
```
 */
export function disable_material(): void;
/**
 * Disables a render state.
 * @param state state to disable

`graphics.STATE_DEPTH_TEST`
`graphics.STATE_STENCIL_TEST`
`graphics.STATE_BLEND`
`graphics.STATE_ALPHA_TEST` (🤖 not available on iOS and Android)
`graphics.STATE_CULL_FACE`
`graphics.STATE_POLYGON_OFFSET_FILL`

 * @example Disable face culling when drawing the tile predicate:
```lua
render.disable_state(graphics.STATE_CULL_FACE)
render.draw(self.tile_pred)
```
 */
export function disable_state(state: number): void;
/**
 * Disables a texture that has previourly been enabled.
 * @param binding texture binding, either by texture unit, string or hash that should be disabled
 * @example ```lua
function update(self, dt)
    render.enable_texture(0, self.my_render_target, graphics.BUFFER_TYPE_COLOR0_BIT)
    -- draw a predicate with the render target available as texture 0 in the predicate
    -- material shader.
    render.draw(self.my_pred)
    -- done, disable the texture
    render.disable_texture(0)
end
```
 */
export function disable_texture(binding: number | string | hash): void;
/**
 * Dispatches the currently enabled compute program. The dispatch call takes three arguments x,y,z which constitutes
the 'global working group' of the compute dispatch. Together with the 'local working group' specified in the compute shader
as a layout qualifier, these two sets of parameters forms the number of invocations the compute shader will execute.
An optional constant buffer can be provided to override the default constants. If no constants buffer is provided, a default
system constants buffer is used containing constants as defined in the compute program.
 * @param x global work group size X
 * @param y global work group size Y
 * @param z global work group size Z
 * @param options optional table with properties:

`constants`
constant_buffer optional constants to use while rendering

 * @example ```lua
function init(self)
    local color_params = { format = graphics.TEXTURE_FORMAT_RGBA,
                           width = render.get_window_width(),
                           height = render.get_window_height()}
    self.scene_rt = render.render_target({[graphics.BUFFER_TYPE_COLOR0_BIT] = color_params})
end

function update(self, dt)
    render.set_compute("bloom")
    render.enable_texture(0, self.backing_texture)
    render.enable_texture(1, self.scene_rt)
    render.dispatch_compute(128, 128, 1)
    render.set_compute()
end
```

Dispatch a compute program with a constant buffer:
```lua
local constants = render.constant_buffer()
constants.tint = vmath.vector4(1, 1, 1, 1)
render.dispatch_compute(32, 32, 32, {constants = constants})
```
 */
export function dispatch_compute(x: number, y: number, z: number, options?: { constants: constant_buffer }): void;
/**
 * Draws all objects that match a specified predicate. An optional constant buffer can be
provided to override the default constants. If no constants buffer is provided, a default
system constants buffer is used containing constants as defined in materials and set through
go.set (or particlefx.set_constant) on visual components.
 * @param predicate predicate to draw for
 * @param options optional table with properties:

`frustum`
matrix4 A frustum matrix used to cull renderable items. (E.g. `local frustum = proj * view`). default=nil
`frustum_planes`
int Determines which sides of the frustum will be used. Default is render.FRUSTUM_PLANES_SIDES.


render.FRUSTUM_PLANES_SIDES : The left, right, top and bottom sides of the frustum.
render.FRUSTUM_PLANES_ALL : All 6 sides of the frustum.


`constants`
constant_buffer optional constants to use while rendering
`sort_order`
int How to sort draw order for world-ordered entries. Default uses the renderer's preferred world sorting (back-to-front).

 * @example ```lua
function init(self)
    -- define a predicate matching anything with material tag "my_tag"
    self.my_pred = render.predicate({hash("my_tag")})
end

function update(self, dt)
    -- draw everything in the my_pred predicate
    render.draw(self.my_pred)
end
```

Draw predicate with constants:
```lua
local constants = render.constant_buffer()
constants.tint = vmath.vector4(1, 1, 1, 1)
render.draw(self.my_pred, {constants = constants})
```

Draw with predicate and frustum culling (without near+far planes):
```lua
local frustum = self.proj * self.view
render.draw(self.my_pred, {frustum = frustum})
```

Draw with predicate and frustum culling (with near+far planes):
```lua
local frustum = self.proj * self.view
render.draw(self.my_pred, {frustum = frustum, frustum_planes = render.FRUSTUM_PLANES_ALL})
```
 */
export function draw(predicate: number, options?: { frustum?: vmath.matrix4; frustum_planes?: number; constants?: constant_buffer }): void;
/**
 * Draws all 3d debug graphics such as lines drawn with "draw_line" messages and physics visualization.
 * @param options optional table with properties:

`frustum`
matrix4 A frustum matrix used to cull renderable items. (E.g. `local frustum = proj * view`). May be nil.
`frustum_planes`
int Determines which sides of the frustum will be used. Default is render.FRUSTUM_PLANES_SIDES.


render.FRUSTUM_PLANES_SIDES : The left, right, top and bottom sides of the frustum.
render.FRUSTUM_PLANES_ALL : All sides of the frustum.

 * @example ```lua
function update(self, dt)
    -- draw debug visualization
    render.draw_debug3d()
end
```
 */
export function draw_debug3d(options?: { frustum?: vmath.matrix4; frustum_planes?: number }): void;
/**
 * If another material was already enabled, it will be automatically disabled
and the specified material is used instead.
The name of the material must be specified in the ".render" resource set
in the "game.project" setting.
 * @param material_id material id to enable
 * @example Enable material named "glow", then draw my_pred with it.
```lua
render.enable_material("glow")
render.draw(self.my_pred)
render.disable_material()
```
 */
export function enable_material(material_id: string | hash): void;
/**
 * Enables a particular render state. The state will be enabled until disabled.
 * @param state state to enable

`graphics.STATE_DEPTH_TEST`
`graphics.STATE_STENCIL_TEST`
`graphics.STATE_BLEND`
`graphics.STATE_ALPHA_TEST` (🤖 not available on iOS and Android)
`graphics.STATE_CULL_FACE`
`graphics.STATE_POLYGON_OFFSET_FILL`

 * @example Enable stencil test when drawing the gui predicate, then disable it:
```lua
render.enable_state(graphics.STATE_STENCIL_TEST)
render.draw(self.gui_pred)
render.disable_state(graphics.STATE_STENCIL_TEST)
```
 */
export function enable_state(state: number): void;
/**
 * Sets the specified texture handle for a render target attachment or a regular texture
that should be used for rendering. The texture can be bound to either a texture unit
or to a sampler name by a hash or a string.
A texture can be bound to multiple units and sampler names at the same time,
the actual binding will be applied to the shaders when a shader program is bound.
When mixing binding using both units and sampler names, you might end up in situations
where two different textures will be applied to the same bind location in the shader.
In this case, the texture set to the named sampler will take precedence over the unit.
Note that you can bind multiple sampler names to the same texture, in case you want to reuse
the same texture for differnt use-cases. It is however recommended that you use the same name
everywhere for the textures that should be shared across different materials.
 * @param binding texture binding, either by texture unit, string or hash for the sampler name that the texture should be bound to
 * @param handle_or_name render target or texture handle that should be bound, or a named resource in the "Render Resource" table in the currently assigned .render file
 * @param buffer_type optional buffer type from which to enable the texture. Note that this argument only applies to render targets. Defaults to `graphics.BUFFER_TYPE_COLOR0_BIT`. These values are supported:

`graphics.BUFFER_TYPE_COLOR0_BIT`

If The render target has been created as depth and/or stencil textures, these buffer types can be used:

`graphics.BUFFER_TYPE_DEPTH_BIT`
`graphics.BUFFER_TYPE_STENCIL_BIT`

If the render target has been created with multiple color attachments, these buffer types can be used
to enable those textures as well. Currently 4 color attachments are supported:

`graphics.BUFFER_TYPE_COLOR0_BIT`
`graphics.BUFFER_TYPE_COLOR1_BIT`
`graphics.BUFFER_TYPE_COLOR2_BIT`
`graphics.BUFFER_TYPE_COLOR3_BIT`

 * @example ```lua
function update(self, dt)
    -- enable target so all drawing is done to it
    render.set_render_target(self.my_render_target)

    -- draw a predicate to the render target
    render.draw(self.my_pred)

    -- disable target
    render.set_render_target(render.RENDER_TARGET_DEFAULT)

    render.enable_texture(0, self.my_render_target, graphics.BUFFER_TYPE_COLOR0_BIT)
    -- draw a predicate with the render target available as texture 0 in the predicate
    -- material shader.
    render.draw(self.my_pred)
end
```

```lua
function update(self, dt)
    -- enable render target by resource id
    render.set_render_target('my_rt_resource')
    render.draw(self.my_pred)
    render.set_render_target(render.RENDER_TARGET_DEFAULT)

    render.enable_texture(0, 'my_rt_resource', graphics.BUFFER_TYPE_COLOR0_BIT)
    -- draw a predicate with the render target available as texture 0 in the predicate
    -- material shader.
    render.draw(self.my_pred)
end
```

```lua
function update(self, dt)
    -- bind a texture to the texture unit 0
    render.enable_texture(0, self.my_texture_handle)
    -- bind the same texture to a named sampler
    render.enable_texture("my_texture_sampler", self.my_texture_handle)
end
```
 */
export function enable_texture(binding: number | string | hash, handle_or_name: number | string | hash, buffer_type?: typeof graphics.BUFFER_TYPE_COLOR0_BIT | typeof graphics.BUFFER_TYPE_COLOR1_BIT | typeof graphics.BUFFER_TYPE_COLOR2_BIT | typeof graphics.BUFFER_TYPE_COLOR3_BIT | typeof graphics.BUFFER_TYPE_DEPTH_BIT | typeof graphics.BUFFER_TYPE_STENCIL_BIT): void;
/**
 * Returns the logical window height that is set in the "game.project" settings.
Note that the actual window pixel size can change, either by device constraints
or user input.
 * @returns specified window height
 * @example Get the height of the window
```lua
local h = render.get_height()
```
 */
export function get_height(): number;
/**
 * Returns the specified buffer height from a render target.
 * @param render_target render target from which to retrieve the buffer height
 * @param buffer_type which type of buffer to retrieve the height from

`graphics.BUFFER_TYPE_COLOR0_BIT`
`graphics.BUFFER_TYPE_DEPTH_BIT`
`graphics.BUFFER_TYPE_STENCIL_BIT`

 * @returns the height of the render target buffer texture
 * @example ```lua
-- get the height of the render target color buffer
local h = render.get_render_target_height(self.target_right, graphics.BUFFER_TYPE_COLOR0_BIT)
-- get the height of a render target resource
local w = render.get_render_target_height('my_rt_resource', graphics.BUFFER_TYPE_COLOR0_BIT)
```
 */
export function get_render_target_height(render_target: render_target, buffer_type: typeof graphics.BUFFER_TYPE_COLOR0_BIT | typeof graphics.BUFFER_TYPE_COLOR1_BIT | typeof graphics.BUFFER_TYPE_COLOR2_BIT | typeof graphics.BUFFER_TYPE_COLOR3_BIT | typeof graphics.BUFFER_TYPE_DEPTH_BIT | typeof graphics.BUFFER_TYPE_STENCIL_BIT): number;
/**
 * Returns the specified buffer width from a render target.
 * @param render_target render target from which to retrieve the buffer width
 * @param buffer_type which type of buffer to retrieve the width from

`graphics.BUFFER_TYPE_COLOR0_BIT`
`graphics.BUFFER_TYPE_COLOR[x]_BIT` (x: [0..3], if supported!)
`graphics.BUFFER_TYPE_DEPTH_BIT`
`graphics.BUFFER_TYPE_STENCIL_BIT`

 * @returns the width of the render target buffer texture
 * @example ```lua
-- get the width of the render target color buffer
local w = render.get_render_target_width(self.target_right, graphics.BUFFER_TYPE_COLOR0_BIT)
-- get the width of a render target resource
local w = render.get_render_target_width('my_rt_resource', graphics.BUFFER_TYPE_COLOR0_BIT)
```
 */
export function get_render_target_width(render_target: render_target, buffer_type: typeof graphics.BUFFER_TYPE_COLOR0_BIT | typeof graphics.BUFFER_TYPE_COLOR1_BIT | typeof graphics.BUFFER_TYPE_COLOR2_BIT | typeof graphics.BUFFER_TYPE_COLOR3_BIT | typeof graphics.BUFFER_TYPE_DEPTH_BIT | typeof graphics.BUFFER_TYPE_STENCIL_BIT): number;
/**
 * Returns the logical window width that is set in the "game.project" settings.
Note that the actual window pixel size can change, either by device constraints
or user input.
 * @returns specified window width (number)
 * @example Get the width of the window.
```lua
local w = render.get_width()
```
 */
export function get_width(): number;
/**
 * Returns the actual physical window height.
Note that this value might differ from the logical height that is set in the
"game.project" settings.
 * @returns actual window height
 * @example Get the actual height of the window
```lua
local h = render.get_window_height()
```
 */
export function get_window_height(): number;
/**
 * Returns the actual physical window width.
Note that this value might differ from the logical width that is set in the
"game.project" settings.
 * @returns actual window width
 * @example Get the actual width of the window
```lua
local w = render.get_window_width()
```
 */
export function get_window_width(): number;
/**
 * This function returns a new render predicate for objects with materials matching
the provided material tags. The provided tags are combined into a bit mask
for the predicate. If multiple tags are provided, the predicate matches materials
with all tags ANDed together.
The current limit to the number of tags that can be defined is `64`.
 * @param tags table of tags that the predicate should match. The tags can be of either hash or string type
 * @returns new predicate
 * @example Create a new render predicate containing all visual objects that
have a material with material tags "opaque" AND "smoke".
```lua
local p = render.predicate({hash("opaque"), hash("smoke")})
```
 */
export function predicate(tags: Array<hash | string> | LuaSet<hash | string>): number;
/**
 * Creates a new render target according to the supplied
specification table.
The table should contain keys specifying which buffers should be created
with what parameters. Each buffer key should have a table value consisting
of parameters. The following parameter keys are available:



Key
Values




`format`
`graphics.TEXTURE_FORMAT_LUMINANCE``graphics.TEXTURE_FORMAT_RGB``graphics.TEXTURE_FORMAT_RGBA``graphics.TEXTURE_FORMAT_DEPTH``graphics.TEXTURE_FORMAT_STENCIL``graphics.TEXTURE_FORMAT_RGBA32F``graphics.TEXTURE_FORMAT_RGBA16F`


`width`
number


`height`
number


`min_filter` (optional)
`graphics.TEXTURE_FILTER_LINEAR``graphics.TEXTURE_FILTER_NEAREST`


`mag_filter` (optional)
`graphics.TEXTURE_FILTER_LINEAR``graphics.TEXTURE_FILTER_NEAREST`


`u_wrap`     (optional)
`graphics.TEXTURE_WRAP_CLAMP_TO_BORDER``graphics.TEXTURE_WRAP_CLAMP_TO_EDGE``graphics.TEXTURE_WRAP_MIRRORED_REPEAT``graphics.TEXTURE_WRAP_REPEAT`


`v_wrap`     (optional)
`graphics.TEXTURE_WRAP_CLAMP_TO_BORDER``graphics.TEXTURE_WRAP_CLAMP_TO_EDGE``graphics.TEXTURE_WRAP_MIRRORED_REPEAT``graphics.TEXTURE_WRAP_REPEAT`


`flags`      (optional)
`render.TEXTURE_BIT` (only applicable to depth and stencil buffers)



The render target can be created to support multiple color attachments. Each attachment can have different format settings and texture filters,
but attachments must be added in sequence, meaning you cannot create a render target at slot 0 and 3.
Instead it has to be created with all four buffer types ranging from [0..3] (as denoted by graphics.BUFFER_TYPE_COLORX_BIT where 'X' is the attachment you want to create).
It is not guaranteed that the device running the script can support creating render targets with multiple color attachments. To check if the device can support multiple attachments,
you can check if the `render` table contains any of the `BUFFER_TYPE_COLOR1_BIT`, `BUFFER_TYPE_COLOR2_BIT` or `BUFFER_TYPE_COLOR3_BIT` constants:
`function init(self)
    if graphics.BUFFER_TYPE_COLOR1_BIT == nil then
        -- this devices does not support multiple color attachments
    end
end
`
 * @param name render target name
 * @param parameters table of buffer parameters, see the description for available keys and values
 * @example How to create a new render target and draw to it:
```lua
function init(self)
    -- render target buffer parameters
    local color_params = { format = graphics.TEXTURE_FORMAT_RGBA,
                           width = render.get_window_width(),
                           height = render.get_window_height(),
                           min_filter = graphics.TEXTURE_FILTER_LINEAR,
                           mag_filter = graphics.TEXTURE_FILTER_LINEAR,
                           u_wrap = graphics.TEXTURE_WRAP_CLAMP_TO_EDGE,
                           v_wrap = graphics.TEXTURE_WRAP_CLAMP_TO_EDGE }
    local depth_params = { format = graphics.TEXTURE_FORMAT_DEPTH,
                           width = render.get_window_width(),
                           height = render.get_window_height(),
                           u_wrap = graphics.TEXTURE_WRAP_CLAMP_TO_EDGE,
                           v_wrap = graphics.TEXTURE_WRAP_CLAMP_TO_EDGE }
    self.my_render_target = render.render_target({[graphics.BUFFER_TYPE_COLOR0_BIT] = color_params, [graphics.BUFFER_TYPE_DEPTH_BIT] = depth_params })
end

function update(self, dt)
    -- enable target so all drawing is done to it
    render.set_render_target(self.my_render_target)

    -- draw a predicate to the render target
    render.draw(self.my_pred)
end
```

How to create a render target with multiple outputs:
```lua
function init(self)
    -- render target buffer parameters
    local color_params_rgba = { format = graphics.TEXTURE_FORMAT_RGBA,
                                width = render.get_window_width(),
                                height = render.get_window_height(),
                                min_filter = graphics.TEXTURE_FILTER_LINEAR,
                                mag_filter = graphics.TEXTURE_FILTER_LINEAR,
                                u_wrap = graphics.TEXTURE_WRAP_CLAMP_TO_EDGE,
                                v_wrap = graphics.TEXTURE_WRAP_CLAMP_TO_EDGE }
    local color_params_float = { format = graphics.TEXTURE_FORMAT_RG32F,
                           width = render.get_window_width(),
                           height = render.get_window_height(),
                           min_filter = graphics.TEXTURE_FILTER_LINEAR,
                           mag_filter = graphics.TEXTURE_FILTER_LINEAR,
                           u_wrap = graphics.TEXTURE_WRAP_CLAMP_TO_EDGE,
                           v_wrap = graphics.TEXTURE_WRAP_CLAMP_TO_EDGE }


    -- Create a render target with three color attachments
    -- Note: No depth buffer is attached here
    self.my_render_target = render.render_target({
           [graphics.BUFFER_TYPE_COLOR0_BIT] = color_params_rgba,
           [graphics.BUFFER_TYPE_COLOR1_BIT] = color_params_rgba,
           [graphics.BUFFER_TYPE_COLOR2_BIT] = color_params_float, })
end

function update(self, dt)
    -- enable target so all drawing is done to it
    render.enable_render_target(self.my_render_target)

    -- draw a predicate to the render target
    render.draw(self.my_pred)
end
```
 */
export function render_target(name: string, parameters: { [key: number]: {
							format: number,
							width: number,
							height: number,
							min_filter?: number,
							mag_filter?: number,
							u_wrap?: number,
							v_wrap?: number,
							flags?: number,
						} }): render_target;
/**
 * Specifies the arithmetic used when computing pixel values that are written to the frame
buffer. In RGBA mode, pixels can be drawn using a function that blends the source RGBA
pixel values with the destination pixel values already in the frame buffer.
Blending is initially disabled.
`source_factor` specifies which method is used to scale the source color components.
`destination_factor` specifies which method is used to scale the destination color
components.
Source color components are referred to as (Rs,Gs,Bs,As).
Destination color components are referred to as (Rd,Gd,Bd,Ad).
The color specified by setting the blendcolor is referred to as (Rc,Gc,Bc,Ac).
The source scale factor is referred to as (sR,sG,sB,sA).
The destination scale factor is referred to as (dR,dG,dB,dA).
The color values have integer values between 0 and (kR,kG,kB,kA), where kc = 2mc - 1 and mc is the number of bitplanes for that color. I.e for 8 bit color depth, color values are between `0` and `255`.
Available factor constants and corresponding scale factors:



Factor constant
Scale factor (fR,fG,fB,fA)




`graphics.BLEND_FACTOR_ZERO`
(0,0,0,0)


`graphics.BLEND_FACTOR_ONE`
(1,1,1,1)


`graphics.BLEND_FACTOR_SRC_COLOR`
(Rs/kR,Gs/kG,Bs/kB,As/kA)


`graphics.BLEND_FACTOR_ONE_MINUS_SRC_COLOR`
(1,1,1,1) - (Rs/kR,Gs/kG,Bs/kB,As/kA)


`graphics.BLEND_FACTOR_DST_COLOR`
(Rd/kR,Gd/kG,Bd/kB,Ad/kA)


`graphics.BLEND_FACTOR_ONE_MINUS_DST_COLOR`
(1,1,1,1) - (Rd/kR,Gd/kG,Bd/kB,Ad/kA)


`graphics.BLEND_FACTOR_SRC_ALPHA`
(As/kA,As/kA,As/kA,As/kA)


`graphics.BLEND_FACTOR_ONE_MINUS_SRC_ALPHA`
(1,1,1,1) - (As/kA,As/kA,As/kA,As/kA)


`graphics.BLEND_FACTOR_DST_ALPHA`
(Ad/kA,Ad/kA,Ad/kA,Ad/kA)


`graphics.BLEND_FACTOR_ONE_MINUS_DST_ALPHA`
(1,1,1,1) - (Ad/kA,Ad/kA,Ad/kA,Ad/kA)


`graphics.BLEND_FACTOR_CONSTANT_COLOR`
(Rc,Gc,Bc,Ac)


`graphics.BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR`
(1,1,1,1) - (Rc,Gc,Bc,Ac)


`graphics.BLEND_FACTOR_CONSTANT_ALPHA`
(Ac,Ac,Ac,Ac)


`graphics.BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA`
(1,1,1,1) - (Ac,Ac,Ac,Ac)


`graphics.BLEND_FACTOR_SRC_ALPHA_SATURATE`
(i,i,i,1) where i = min(As, kA - Ad) /kA



The blended RGBA values of a pixel comes from the following equations:

Rd = min(kR, Rs * sR + Rd * dR)
Gd = min(kG, Gs * sG + Gd * dG)
Bd = min(kB, Bs * sB + Bd * dB)
Ad = min(kA, As * sA + Ad * dA)

Blend function `(graphics.BLEND_FACTOR_SRC_ALPHA, graphics.BLEND_FACTOR_ONE_MINUS_SRC_ALPHA)` is useful for
drawing with transparency when the drawn objects are sorted from farthest to nearest.
It is also useful for drawing antialiased points and lines in arbitrary order.
 * @param source_factor source factor
 * @param destination_factor destination factor
 * @example Set the blend func to the most common one:
```lua
render.set_blend_func(graphics.BLEND_FACTOR_SRC_ALPHA, graphics.BLEND_FACTOR_ONE_MINUS_SRC_ALPHA)
```
 */
export function set_blend_func(source_factor: number, destination_factor: number): void;
/**
 * Sets the current render camera to be used for rendering. If a render camera
has been set by the render script, the renderer will be using its projection and view matrix
during rendering. If a projection and/or view matrix has been set by the render script,
they will not be used until the current render camera has been reset by calling `render.set_camera()`.
If the 'use_frustum' flag in the options table has been set to true, the renderer will automatically use the
camera frustum for frustum culling regardless of what frustum is being passed into the render.draw() function.
Note that the frustum plane option in render.draw can still be used together with the camera.
 * @param camera camera id to use, or nil to reset
 * @param options optional table with properties:

`use_frustum`
boolean If true, the renderer will use the cameras view-projection matrix for frustum culling (default: false)

 * @example Set the current camera to be used for rendering
```lua
render.set_camera("main:/my_go#camera")
render.draw(self.my_pred)
render.set_camera(nil)
```

Use the camera frustum for frustum culling together with a specific frustum plane option for the draw command
```lua
-- The camera frustum will take precedence over the frustum plane option in render.draw
render.set_camera("main:/my_go#camera", { use_frustum = true })
-- However, we can still customize the frustum planes regardless of the camera option!
render.draw(self.my_pred, { frustum_planes = render.FRUSTUM_PLANES_ALL })
render.set_camera()
```
 */
export function set_camera(camera: url | number | undefined, options?: { use_frustum: boolean }): void;
/**
 * Specifies whether the individual color components in the frame buffer is enabled for writing (`true`) or disabled (`false`). For example, if `blue` is `false`, nothing is written to the blue component of any pixel in any of the color buffers, regardless of the drawing operation attempted. Note that writing are either enabled or disabled for entire color components, not the individual bits of a component.
The component masks are all initially `true`.
 * @param red red mask
 * @param green green mask
 * @param blue blue mask
 * @param alpha alpha mask
 * @example ```lua
-- alpha cannot be written to frame buffer
render.set_color_mask(true, true, true, false)
```
 */
export function set_color_mask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void;
/**
 * The name of the compute program must be specified in the ".render" resource set
in the "game.project" setting. If nil (or no arguments) are passed to this function,
the current compute program will instead be disabled.
 * @param compute compute id to use, or nil to disable
 * @example Enable compute program named "fractals", then dispatch it.
```lua
render.set_compute("fractals")
render.enable_texture(0, self.backing_texture)
render.dispatch_compute(128, 128, 1)
render.set_compute()
```
 */
export function set_compute(compute: string | hash | undefined): void;
/**
 * Specifies whether front- or back-facing polygons can be culled
when polygon culling is enabled. Polygon culling is initially disabled.
If mode is `graphics.FACE_TYPE_FRONT_AND_BACK`, no polygons are drawn, but other
primitives such as points and lines are drawn. The initial value for
`face_type` is `graphics.FACE_TYPE_BACK`.
 * @param face_type face type

`graphics.FACE_TYPE_FRONT`
`graphics.FACE_TYPE_BACK`
`graphics.FACE_TYPE_FRONT_AND_BACK`

 * @example How to enable polygon culling and set front face culling:
```lua
render.enable_state(graphics.STATE_CULL_FACE)
render.set_cull_face(graphics.FACE_TYPE_FRONT)
```
 */
export function set_cull_face(face_type: number): void;
/**
 * Specifies the function that should be used to compare each incoming pixel
depth value with the value present in the depth buffer.
The comparison is performed only if depth testing is enabled and specifies
the conditions under which a pixel will be drawn.
Function constants:

`graphics.COMPARE_FUNC_NEVER` (never passes)
`graphics.COMPARE_FUNC_LESS` (passes if the incoming depth value is less than the stored value)
`graphics.COMPARE_FUNC_LEQUAL` (passes if the incoming depth value is less than or equal to the stored value)
`graphics.COMPARE_FUNC_GREATER` (passes if the incoming depth value is greater than the stored value)
`graphics.COMPARE_FUNC_GEQUAL` (passes if the incoming depth value is greater than or equal to the stored value)
`graphics.COMPARE_FUNC_EQUAL` (passes if the incoming depth value is equal to the stored value)
`graphics.COMPARE_FUNC_NOTEQUAL` (passes if the incoming depth value is not equal to the stored value)
`graphics.COMPARE_FUNC_ALWAYS` (always passes)

The depth function is initially set to `graphics.COMPARE_FUNC_LESS`.
 * @param func depth test function, see the description for available values
 * @example Enable depth test and set the depth test function to "not equal".
```lua
render.enable_state(graphics.STATE_DEPTH_TEST)
render.set_depth_func(graphics.COMPARE_FUNC_NOTEQUAL)
```
 */
export function set_depth_func(func: number): void;
/**
 * Specifies whether the depth buffer is enabled for writing. The supplied mask governs
if depth buffer writing is enabled (`true`) or disabled (`false`).
The mask is initially `true`.
 * @param depth depth mask
 * @example How to turn off writing to the depth buffer:
```lua
render.set_depth_mask(false)
```
 */
export function set_depth_mask(depth: boolean): void;
/**
 * Set or remove listener. Currenly only only two type of events can arrived:
`render.CONTEXT_EVENT_CONTEXT_LOST` - when rendering context lost. Rending paused and all graphics resources become invalid.
`render.CONTEXT_EVENT_CONTEXT_RESTORED` - when rendering context was restored. Rendering still paused and graphics resources still
invalid but can be reloaded.
 * @param callback A callback that receives all render related events.
Pass `nil` if want to remove listener.

`self`
object The render script
`event_type`
string Rendering event. Possible values: `render.CONTEXT_EVENT_CONTEXT_LOST`, `render.CONTEXT_EVENT_CONTEXT_RESTORED`

 * @example Set listener and handle render context events.
```lua
--- custom.render_script
function init(self)
   render.set_listener(function(self, event_type)
       if event_type == render.CONTEXT_EVENT_CONTEXT_LOST then
           --- Some stuff when rendering context is lost
       elseif event_type == render.CONTEXT_EVENT_CONTEXT_RESTORED then
           --- Start reload resources, reload game, etc.
       end
   end)
end
```
 */
export function set_listener(callback: ((this: any, event_type: any) => void) | undefined): void;
/**
 * Sets the scale and units used to calculate depth values.
If `graphics.STATE_POLYGON_OFFSET_FILL` is enabled, each fragment's depth value
is offset from its interpolated value (depending on the depth value of the
appropriate vertices). Polygon offset can be used when drawing decals, rendering
hidden-line images etc.
`factor` specifies a scale factor that is used to create a variable depth
offset for each polygon. The initial value is `0`.
`units` is multiplied by an implementation-specific value to create a
constant depth offset. The initial value is `0`.
The value of the offset is computed as `factor` × `DZ` + `r` × `units`
`DZ` is a measurement of the depth slope of the polygon which is the change in z (depth)
values divided by the change in either x or y coordinates, as you traverse a polygon.
The depth values are in window coordinates, clamped to the range [0, 1].
`r` is the smallest value that is guaranteed to produce a resolvable difference.
It's value is an implementation-specific constant.
The offset is added before the depth test is performed and before the
value is written into the depth buffer.
 * @param factor polygon offset factor
 * @param units polygon offset units
 * @example ```lua
render.enable_state(graphics.STATE_POLYGON_OFFSET_FILL)
render.set_polygon_offset(1.0, 1.0)
```
 */
export function set_polygon_offset(factor: number, units: number): void;
/**
 * Sets the projection matrix to use when rendering.
 * @param matrix projection matrix
 * @example How to set the projection to orthographic with world origo at lower left,
width and height as set in project settings and depth (z) between -1 and 1:
```lua
render.set_projection(vmath.matrix4_orthographic(0, render.get_width(), 0, render.get_height(), -1, 1))
```
 */
export function set_projection(matrix: vmath.matrix4): void;
/**
 * Sets a render target. Subsequent draw operations will be to the
render target until it is replaced by a subsequent call to set_render_target.
This function supports render targets created by a render script, or a render target resource.
 * @param render_target render target to set. render.RENDER_TARGET_DEFAULT to set the default render target
 * @param options optional table with behaviour parameters

`transient`
table Transient frame buffer types are only valid while the render target is active, i.e becomes undefined when a new target is set by a subsequent call to set_render_target.
 Default is all non-transient. Be aware that some hardware uses a combined depth stencil buffer and when this is the case both are considered non-transient if exclusively selected!
 A buffer type defined that doesn't exist in the render target is silently ignored.


`graphics.BUFFER_TYPE_COLOR0_BIT`
`graphics.BUFFER_TYPE_DEPTH_BIT`
`graphics.BUFFER_TYPE_STENCIL_BIT`

 * @example How to set a render target and draw to it and then switch back to the default render target
The render target defines the depth/stencil buffers as transient, when set_render_target is called the next time the buffers may be invalidated and allow for optimisations depending on driver support
```lua
function update(self, dt)
    -- set render target so all drawing is done to it
    render.set_render_target(self.my_render_target, { transient = { graphics.BUFFER_TYPE_DEPTH_BIT, graphics.BUFFER_TYPE_STENCIL_BIT } } )

    -- draw a predicate to the render target
    render.draw(self.my_pred)

    -- set default render target. This also invalidates the depth and stencil buffers of the current target (self.my_render_target)
    --  which can be an optimisation on some hardware
    render.set_render_target(render.RENDER_TARGET_DEFAULT)

end
```

```lua
function update(self, dt)
    -- set render target by a render target resource identifier
    render.set_render_target('my_rt_resource')

    -- draw a predicate to the render target
    render.draw(self.my_pred)

    -- reset the render target to the default backbuffer
    render.set_render_target(render.RENDER_TARGET_DEFAULT)

end
```
 */
export function set_render_target(render_target: render_target, options?: { transient: number[] | LuaSet<number> }): void;
/**
 * Sets the render target size for a render target created from
either a render script, or from a render target resource.
 * @param render_target render target to set size for
 * @param width new render target width
 * @param height new render target height
 * @example Resize render targets to the current window size:
```lua
render.set_render_target_size(self.my_render_target, render.get_window_width(), render.get_window_height())
render.set_render_target_size('my_rt_resource', render.get_window_width(), render.get_window_height())
```
 */
export function set_render_target_size(render_target: render_target, width: number, height: number): void;
/**
 * Stenciling is similar to depth-buffering as it enables and disables drawing on a
per-pixel basis. First, GL drawing primitives are drawn into the stencil planes.
Second, geometry and images are rendered but using the stencil planes to mask out
where to draw.
The stencil test discards a pixel based on the outcome of a comparison between the
reference value `ref` and the corresponding value in the stencil buffer.
`func` specifies the comparison function. See the table below for values.
The initial value is `graphics.COMPARE_FUNC_ALWAYS`.
`ref` specifies the reference value for the stencil test. The value is clamped to
the range [0, 2n-1], where n is the number of bitplanes in the stencil buffer.
The initial value is `0`.
`mask` is ANDed with both the reference value and the stored stencil value when the test
is done. The initial value is all `1`'s.
Function constant:

`graphics.COMPARE_FUNC_NEVER` (never passes)
`graphics.COMPARE_FUNC_LESS` (passes if (ref & mask) < (stencil & mask))
`graphics.COMPARE_FUNC_LEQUAL` (passes if (ref & mask) <= (stencil & mask))
`graphics.COMPARE_FUNC_GREATER` (passes if (ref & mask) > (stencil & mask))
`graphics.COMPARE_FUNC_GEQUAL` (passes if (ref & mask) >= (stencil & mask))
`graphics.COMPARE_FUNC_EQUAL` (passes if (ref & mask) = (stencil & mask))
`graphics.COMPARE_FUNC_NOTEQUAL` (passes if (ref & mask) != (stencil & mask))
`graphics.COMPARE_FUNC_ALWAYS` (always passes)

 * @param func stencil test function, see the description for available values
 * @param ref reference value for the stencil test
 * @param mask mask that is ANDed with both the reference value and the stored stencil value when the test is done
 * @example ```lua
-- let only 0's pass the stencil test
render.set_stencil_func(graphics.COMPARE_FUNC_EQUAL, 0, 1)
```
 */
export function set_stencil_func(func: number, ref: number, mask: number): void;
/**
 * The stencil mask controls the writing of individual bits in the stencil buffer.
The least significant `n` bits of the parameter `mask`, where `n` is the number of
bits in the stencil buffer, specify the mask.
Where a `1` bit appears in the mask, the corresponding
bit in the stencil buffer can be written. Where a `0` bit appears in the mask,
the corresponding bit in the stencil buffer is never written.
The mask is initially all `1`'s.
 * @param mask stencil mask
 * @example ```lua
-- set the stencil mask to all 1:s
render.set_stencil_mask(0xff)
```
 */
export function set_stencil_mask(mask: number): void;
/**
 * The stencil test discards a pixel based on the outcome of a comparison between the
reference value `ref` and the corresponding value in the stencil buffer.
To control the test, call render.set_stencil_func.
This function takes three arguments that control what happens to the stored stencil
value while stenciling is enabled. If the stencil test fails, no change is made to the
pixel's color or depth buffers, and `sfail` specifies what happens to the stencil buffer
contents.
Operator constants:

`graphics.STENCIL_OP_KEEP` (keeps the current value)
`graphics.STENCIL_OP_ZERO` (sets the stencil buffer value to 0)
`graphics.STENCIL_OP_REPLACE` (sets the stencil buffer value to `ref`, as specified by render.set_stencil_func)
`graphics.STENCIL_OP_INCR` (increments the stencil buffer value and clamp to the maximum representable unsigned value)
`graphics.STENCIL_OP_INCR_WRAP` (increments the stencil buffer value and wrap to zero when incrementing the maximum representable unsigned value)
`graphics.STENCIL_OP_DECR` (decrements the current stencil buffer value and clamp to 0)
`graphics.STENCIL_OP_DECR_WRAP` (decrements the current stencil buffer value and wrap to the maximum representable unsigned value when decrementing zero)
`graphics.STENCIL_OP_INVERT` (bitwise inverts the current stencil buffer value)

`dppass` and `dpfail` specify the stencil buffer actions depending on whether subsequent
depth buffer tests succeed (dppass) or fail (dpfail).
The initial value for all operators is `graphics.STENCIL_OP_KEEP`.
 * @param sfail action to take when the stencil test fails
 * @param dpfail the stencil action when the stencil test passes
 * @param dppass the stencil action when both the stencil test and the depth test pass, or when the stencil test passes and either there is no depth buffer or depth testing is not enabled
 * @example Set the stencil function to never pass and operator to always draw 1's
on test fail.
```lua
render.set_stencil_func(graphics.COMPARE_FUNC_NEVER, 1, 0xFF)
-- always draw 1's on test fail
render.set_stencil_op(graphics.STENCIL_OP_REPLACE, graphics.STENCIL_OP_KEEP, graphics.STENCIL_OP_KEEP)
```
 */
export function set_stencil_op(sfail: number, dpfail: number, dppass: number): void;
/**
 * Sets the view matrix to use when rendering.
 * @param matrix view matrix to set
 * @example How to set the view and projection matrices according to
the values supplied by a camera.
```lua
function init(self)
  self.view = vmath.matrix4()
  self.projection = vmath.matrix4()
end

function update(self, dt)
  -- set the view to the stored view value
  render.set_view(self.view)
  -- now we can draw with this view
end

function on_message(self, message_id, message)
  if message_id == hash("set_view_projection") then
     -- camera view and projection arrives here.
     self.view = message.view
     self.projection = message.projection
  end
end
```
 */
export function set_view(matrix: vmath.matrix4): void;
/**
 * Set the render viewport to the specified rectangle.
 * @param x left corner
 * @param y bottom corner
 * @param width viewport width
 * @param height viewport height
 * @example ```lua
-- Set the viewport to the window dimensions.
render.set_viewport(0, 0, render.get_window_width(), render.get_window_height())
```
 */
export function set_viewport(x: number, y: number, width: number, height: number): void;
}declare namespace render {
export type constant_buffer = { [key: string]: any };
export type render_target = LuaUserdata & { __brand: "render_target" };
}

declare namespace resource {
/**
 * Constructor-like function with two purposes:

Load the specified resource as part of loading the script
Return a hash to the run-time version of the resource

⚠ This function can only be called within go.property function calls.
 * @param path optional resource path string to the resource
 * @returns a path hash to the binary version of the resource
 * @example Load an atlas and set it to a sprite:
```lua
go.property("my_atlas", resource.atlas("/atlas.atlas"))
function init(self)
  go.set("#sprite", "image", self.my_atlas)
end
```

Load an atlas and set it to a gui:
```lua
go.property("my_atlas", resource.atlas("/atlas.atlas"))
function init(self)
  go.set("#gui", "textures", self.my_atlas, {key = "my_atlas"})
end
```
 */
export function atlas(path?: string): hash;
/**
 * Constructor-like function with two purposes:

Load the specified resource as part of loading the script
Return a hash to the run-time version of the resource

⚠ This function can only be called within go.property function calls.
 * @param path optional resource path string to the resource
 * @returns a path hash to the binary version of the resource
 * @example Set a unique buffer it to a sprite:
```lua
go.property("my_buffer", resource.buffer("/cube.buffer"))
function init(self)
  go.set("#mesh", "vertices", self.my_buffer)
end
```
 */
export function buffer(path?: string): hash;
/**
 * This function creates a new atlas resource that can be used in the same way as any atlas created during build time.
The path used for creating the atlas must be unique, trying to create a resource at a path that is already
registered will trigger an error. If the intention is to instead modify an existing atlas, use the resource.set_atlas
function. Also note that the path to the new atlas resource must have a '.texturesetc' extension,
meaning "/path/my_atlas" is not a valid path but "/path/my_atlas.texturesetc" is.
When creating the atlas, at least one geometry and one animation is required, and an error will be
raised if these requirements are not met. A reference to the resource will be held by the collection
that created the resource and will automatically be released when that collection is destroyed.
Note that releasing a resource essentially means decreasing the reference count of that resource,
and not necessarily that it will be deleted.
 * @param path The path to the resource.
 * @param table A table containing info about how to create the atlas. Supported entries:



`texture`
string | hash the path to the texture resource, e.g "/main/my_texture.texturec"




`animations`
table a list of the animations in the atlas. Supports the following fields:




`id`
string the id of the animation, used in e.g sprite.play_animation




`width`
number the width of the animation




`height`
number the height of the animation




`frame_start`
number index to the first geometry of the animation. Indices are lua based and must be in the range of 1 ..  in atlas.




`frame_end`
number index to the last geometry of the animation (non-inclusive). Indices are lua based and must be in the range of 1 ..  in atlas.




`playback`
constant optional playback mode of the animation, the default value is go.PLAYBACK_ONCE_FORWARD




`fps`
number optional fps of the animation, the default value is 30




`flip_vertical`
boolean optional flip the animation vertically, the default value is false




`flip_horizontal`
boolean optional flip the animation horizontally, the default value is false




`geometries`
table A list of the geometries that should map to the texture data. Supports the following fields:




`id`
string The name of the geometry. Used when matching animations between multiple atlases




`width`
number The width of the image the sprite geometry represents




`height`
number The height of the image the sprite geometry represents




`pivot_x`
number The pivot x value of the image in unit coords. (0,0) is upper left corner, (1,1) is bottom right. Default is 0.5.




`pivot_y`
number The pivot y value of the image in unit coords. (0,0) is upper left corner, (1,1) is bottom right. Default is 0.5.




`rotated`
boolean Whether the image is rotated 90 degrees counter-clockwise in the atlas. This affects UV coordinate generation for proper rendering. Default is false.




`vertices`
table a list of the vertices in image space of the geometry in the form {px0, py0, px1, py1, ..., pxn, pyn}




`uvs`
table a list of the uv coordinates in image space of the geometry in the form of {u0, v0, u1, v1, ..., un, vn}.




`indices`
table a list of the indices of the geometry in the form {i0, i1, i2, ..., in}. Each tripe in the list represents a triangle.



 * @returns Returns the atlas resource path
 * @example Create a backing texture and an atlas
```lua
function init(self)
    -- create an empty texture
    local tparams = {
        width          = 128,
        height         = 128,
        type           = graphics.TEXTURE_TYPE_2D,
        format         = graphics.TEXTURE_FORMAT_RGBA,
    }
    local my_texture_id = resource.create_texture("/my_texture.texturec", tparams)

    -- optionally use resource.set_texture to upload data to texture

    -- create an atlas with one animation and one square geometry
    -- note that the function doesn't support hashes for the texture,
    -- you need to use a string for the texture path here aswell
    local aparams = {
        texture = "/my_texture.texturec",
        animations = {
            {
                id          = "my_animation",
                width       = 128,
                height      = 128,
                frame_start = 1,
                frame_end   = 2,
            }
        },
        geometries = {
            {
                id = 'idle0',
                width = 128,
                height = 128,
                pivot_x = 0.5,
                pivot_y = 0.5,
                vertices  = {
                    0,   0,
                    0,   128,
                    128, 128,
                    128, 0
                },
                uvs = {
                    0,   0,
                    0,   128,
                    128, 128,
                    128, 0
                },
                indices = {0,1,2,0,2,3}
            }
        }
    }
    local my_atlas_id = resource.create_atlas("/my_atlas.texturesetc", aparams)

    -- assign the atlas to the 'sprite' component on the same go
    go.set("#sprite", "image", my_atlas_id)
end
```
 */
export function create_atlas(path: string, table: { texture: string | hash; animations: {
												id: string;
												width: number;
												height: number;
												frame_start: number;
												frame_end: number;
												playback?: number;
												fps?: number;
												flip_vertical?: boolean;
												flip_horizontal?: boolean;
											}[]; geometries: {
												id: string;
												width: number;
												height: number;
												pivot_x: number;
												pivot_y: number;
												rotated: boolean;
												vertices: number[] | LuaSet<number>;
												uvs: number[] | LuaSet<number>;
												indices: number[] | LuaSet<number>;
											}[] }): hash;
/**
 * This function creates a new buffer resource that can be used in the same way as any buffer created during build time.
The function requires a valid buffer created from either buffer.create or another pre-existing buffer resource.
By default, the new resource will take ownership of the buffer lua reference, meaning the buffer will not automatically be removed
when the lua reference to the buffer is garbage collected. This behaviour can be overruled by specifying 'transfer_ownership = false'
in the argument table. If the new buffer resource is created from a buffer object that is created by another resource,
the buffer object will be copied and the new resource will effectively own a copy of the buffer instead.
Note that the path to the new resource must have the '.bufferc' extension, "/path/my_buffer" is not a valid path but "/path/my_buffer.bufferc" is.
The path must also be unique, attempting to create a buffer with the same name as an existing resource will raise an error.
 * @param path The path to the resource.
 * @param table A table containing info about how to create the buffer. Supported entries:



`buffer`
buffer the buffer to bind to this resource




`transfer_ownership`
boolean optional flag to determine wether or not the resource should take over ownership of the buffer object (default true)



 * @returns Returns the buffer resource path
 * @example Create a buffer object and bind it to a buffer resource
```lua
function init(self)
    local size = 1
    local positions = {
        -- triangle 1
         size,  size, 0,
        -size, -size, 0,
         size, -size, 0,
        -- triangle 2
         size, size,  0,
        -size,  size, 0,
        -size, -size, 0,
    }

    local buffer_handle = buffer.create(#positions, {
        {
            name  = hash("position"),
            type  = buffer.VALUE_TYPE_FLOAT32,
            count = 3
        }
    })

    local stream = buffer.get_stream(buffer_handle, hash("position"))

    -- transfer vertex data to buffer
    for k=1,#positions do
        stream[k] = positions[k]
    end

    local my_buffer = resource.create_buffer("/my_buffer.bufferc", { buffer = buffer_handle })
    go.set("/go#mesh", "vertices", my_buffer)
end
```Create a buffer resource from existing resource

```lua
function init(self)
    local res = resource.get_buffer("/my_buffer_path.bufferc")
    -- create a cloned buffer resource from another resource buffer
    local buf = reource.create_buffer("/my_cloned_buffer.bufferc", { buffer = res })
    -- assign cloned buffer to a mesh component
    go.set("/go#mesh", "vertices", buf)
end
```
 */
export function create_buffer(path: string, table?: { buffer: buffer; transfer_ownership?: boolean }): hash;
/**
 * Creates a sound data resource
Supported formats are .oggc, .opusc and .wavc
 * @param path the path to the resource. Must not already exist.
 * @param options A table containing parameters for the text. Supported entries:

`data`
string The raw data of the file. May be partial, but must include the header of the file
`filesize`
number If the file is partial, it must also specify the full size of the complete file.
`partial`
boolean Is the data not representing the full file, but just the initial chunk?

 * @returns the resulting path hash to the resource
 * @example ```lua
function init(self)
    -- create a new sound resource, given the initial chunk of the file
    local relative_path = "/a/unique/resource/name.oggc"
    local hash = resource.create_sound_data(relative_path, { data = data, filesize = filesize, partial = true })
    go.set("#music", "sound", hash) -- override the previous sound resource
    sound.play("#music") -- start the playing
end
```
 */
export function create_sound_data(path: string, options?: { data: string; filesize?: number; partial?: boolean }): hash;
/**
 * Creates a new texture resource that can be used in the same way as any texture created during build time.
The path used for creating the texture must be unique, trying to create a resource at a path that is already
registered will trigger an error. If the intention is to instead modify an existing texture, use the resource.set_texture
function. Also note that the path to the new texture resource must have a '.texturec' extension,
meaning "/path/my_texture" is not a valid path but "/path/my_texture.texturec" is.
If the texture is created without a buffer, the pixel data will be blank.
 * @param path The path to the resource.
 * @param table A table containing info about how to create the texture. Supported entries:

`type`
number The texture type. Supported values:


`graphics.TEXTURE_TYPE_2D`
`graphics.TEXTURE_TYPE_IMAGE_2D`
`graphics.TEXTURE_TYPE_3D`
`graphics.TEXTURE_TYPE_IMAGE_3D`
`graphics.TEXTURE_TYPE_CUBE_MAP`


`width`
number The width of the texture (in pixels). Must be larger than 0.
`height`
number The width of the texture (in pixels). Must be larger than 0.
`depth`
number The depth of the texture (in pixels). Must be larger than 0. Only used when `type` is `graphics.TEXTURE_TYPE_3D` or `graphics.TEXTURE_TYPE_IMAGE_3D`.
`format`
number The texture format, note that some of these formats might not be supported by the running device. Supported values:


`graphics.TEXTURE_FORMAT_LUMINANCE`
`graphics.TEXTURE_FORMAT_RGB`
`graphics.TEXTURE_FORMAT_RGBA`

These constants might not be available on the device:

`graphics.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1`
`graphics.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1`
`graphics.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1`
`graphics.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1`
`graphics.TEXTURE_FORMAT_RGB_ETC1`
`graphics.TEXTURE_FORMAT_RGBA_ETC2`
`graphics.TEXTURE_FORMAT_RGBA_ASTC_4X4`
`graphics.TEXTURE_FORMAT_RGB_BC1`
`graphics.TEXTURE_FORMAT_RGBA_BC3`
`graphics.TEXTURE_FORMAT_R_BC4`
`graphics.TEXTURE_FORMAT_RG_BC5`
`graphics.TEXTURE_FORMAT_RGBA_BC7`
`graphics.TEXTURE_FORMAT_RGB16F`
`graphics.TEXTURE_FORMAT_RGB32F`
`graphics.TEXTURE_FORMAT_RGBA16F`
`graphics.TEXTURE_FORMAT_RGBA32F`
`graphics.TEXTURE_FORMAT_R16F`
`graphics.TEXTURE_FORMAT_RG16F`
`graphics.TEXTURE_FORMAT_R32F`
`graphics.TEXTURE_FORMAT_RG32F`

You can test if the device supports these values by checking if a specific enum is nil or not:
`if graphics.TEXTURE_FORMAT_RGBA16F ~= nil then
    -- it is safe to use this format
end
`


`flags`
number Texture creation flags that can be used to dictate how the texture is created. The default value is graphics.TEXTURE_USAGE_FLAG_SAMPLE, which means that the texture can be sampled from a shader.
These flags may or may not be supported on the running device and/or the underlying graphics API and is simply used internally as a 'hint' when creating the texture. There is no guarantee that any of these will have any effect. Supported values:


`graphics.TEXTURE_USAGE_FLAG_SAMPLE` - The texture can be sampled from a shader (default)
`graphics.TEXTURE_USAGE_FLAG_MEMORYLESS` - The texture can be used as a memoryless texture, i.e only transient memory for the texture is used during rendering
`graphics.TEXTURE_USAGE_FLAG_STORAGE` - The texture can be used as a storage texture, which is required for a shader to write to the texture


`max_mipmaps`
number optional max number of mipmaps. Defaults to zero, i.e no mipmap support
`compression_type`
number optional specify the compression type for the data in the buffer object that holds the texture data. Will only be used when a compressed buffer has been passed into the function.
Creating an empty texture with no buffer data is not supported as a core feature. Defaults to graphics.COMPRESSION_TYPE_DEFAULT, i.e no compression. Supported values:


`COMPRESSION_TYPE_DEFAULT`
`COMPRESSION_TYPE_BASIS_UASTC`

 * @param buffer optional buffer of precreated pixel data
 * @returns The path to the resource.
⚠ 3D Textures are currently only supported on OpenGL and Vulkan adapters. To check if your device supports 3D textures, use:
```lua
if graphics.TEXTURE_TYPE_3D ~= nil then
    -- Device and graphics adapter support 3D textures
end
 * @example How to create an 128x128 RGBA texture resource and assign it to a model
```lua
function init(self)
    local tparams = {
       width          = 128,
       height         = 128,
       type           = graphics.TEXTURE_TYPE_2D,
       format         = graphics.TEXTURE_FORMAT_RGBA,
   }
   local my_texture_id = resource.create_texture("/my_custom_texture.texturec", tparams)
   go.set("#model", "texture0", my_texture_id)
end
```How to create an 128x128 floating point texture (RGBA32F) resource from a buffer object

```lua
function init(self)
    -- Create a new buffer with 4 components and FLOAT32 type
    local tbuffer = buffer.create(128 * 128, { {name=hash("rgba"), type=buffer.VALUE_TYPE_FLOAT32, count=4} } )
    local tstream = buffer.get_stream(tbuffer, hash("rgba"))

    -- Fill the buffer stream with some float values
    for y=1,128 do
        for x=1,128 do
            local index = (y-1) * 128 * 4 + (x-1) * 4 + 1
            tstream[index + 0] = 999.0
            tstream[index + 1] = -1.0
            tstream[index + 2] = 0.5
            tstream[index + 3] = 1.0
        end
    end

    -- Create a 2D Texture with a RGBA23F format
    local tparams = {
       width          = 128,
       height         = 128,
       type           = graphics.TEXTURE_TYPE_2D,
       format         = graphics.TEXTURE_FORMAT_RGBA32F,
   }

   -- Note that we pass the buffer as the last argument here!
   local my_texture_id = resource.create_texture("/my_custom_texture.texturec", tparams, tbuffer)

   -- assign the texture to a model
   go.set("#model", "texture0", my_texture_id)
end
```How to create a 32x32x32 floating point 3D texture that can be used to generate volumetric data in a compute shader

```lua
function init(self)
    local t_volume = resource.create_texture("/my_backing_texture.texturec", {
        type   = graphics.TEXTURE_TYPE_IMAGE_3D,
        width  = 32,
        height = 32,
        depth  = 32,
        format = resource.TEXTURE_FORMAT_RGBA32F,
        flags  = resource.TEXTURE_USAGE_FLAG_STORAGE + resource.TEXTURE_USAGE_FLAG_SAMPLE,
    })

    -- pass the backing texture to the render script
    msg.post("@render:", "add_textures", { t_volume })
end
```How to create 512x512 texture array with 5 pages.

```lua
        local new_tex = resource.create_texture("/runtime/example_array.texturec", {
            type = graphics.TEXTURE_TYPE_2D_ARRAY,
            width = 512,
            height = 512,
            page_count = 5,
            format = graphics.TEXTURE_FORMAT_RGB,
        })
```
 */
export function create_texture(path: string, table: { type: number; width: number; height: number; depth: number; format: number; flags: number; max_mipmaps?: number; compression_type?: number }, buffer?: buffer): hash;
/**
 * Creates a new texture resource that can be used in the same way as any texture created during build time.
The path used for creating the texture must be unique, trying to create a resource at a path that is already
registered will trigger an error. If the intention is to instead modify an existing texture, use the resource.set_texture
function. Also note that the path to the new texture resource must have a '.texturec' extension,
meaning "/path/my_texture" is not a valid path but "/path/my_texture.texturec" is.
If the texture is created without a buffer, the pixel data will be blank.
The difference between the async version and resource.create_texture is that the texture data will be uploaded
in a graphics worker thread. The function will return a resource immediately that contains a 1x1 blank texture which can be used
immediately after the function call. When the new texture has been uploaded, the initial blank texture will be deleted and replaced with the
new texture. Be careful when using the initial texture handle handle as it will not be valid after the upload has finished.
 * @param path The path to the resource.
 * @param table 
A table containing info about how to create the texture. Supported entries:
`type`
number The texture type. Supported values:


`graphics.TEXTURE_TYPE_2D`
`graphics.TEXTURE_TYPE_IMAGE_2D`
`graphics.TEXTURE_TYPE_3D`
`graphics.TEXTURE_TYPE_IMAGE_3D`
`graphics.TEXTURE_TYPE_CUBE_MAP`


`width`
number The width of the texture (in pixels). Must be larger than 0.
`height`
number The width of the texture (in pixels). Must be larger than 0.
`depth`
number The depth of the texture (in pixels). Must be larger than 0. Only used when `type` is `graphics.TEXTURE_TYPE_3D` or `graphics.TEXTURE_TYPE_IMAGE_3D`.
`format`
number The texture format, note that some of these formats might not be supported by the running device. Supported values:


`graphics.TEXTURE_FORMAT_LUMINANCE`
`graphics.TEXTURE_FORMAT_RGB`
`graphics.TEXTURE_FORMAT_RGBA`

These constants might not be available on the device:

`graphics.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1`
`graphics.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1`
`graphics.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1`
`graphics.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1`
`graphics.TEXTURE_FORMAT_RGB_ETC1`
`graphics.TEXTURE_FORMAT_RGBA_ETC2`
`graphics.TEXTURE_FORMAT_RGBA_ASTC_4X4`
`graphics.TEXTURE_FORMAT_RGB_BC1`
`graphics.TEXTURE_FORMAT_RGBA_BC3`
`graphics.TEXTURE_FORMAT_R_BC4`
`graphics.TEXTURE_FORMAT_RG_BC5`
`graphics.TEXTURE_FORMAT_RGBA_BC7`
`graphics.TEXTURE_FORMAT_RGB16F`
`graphics.TEXTURE_FORMAT_RGB32F`
`graphics.TEXTURE_FORMAT_RGBA16F`
`graphics.TEXTURE_FORMAT_RGBA32F`
`graphics.TEXTURE_FORMAT_R16F`
`graphics.TEXTURE_FORMAT_RG16F`
`graphics.TEXTURE_FORMAT_R32F`
`graphics.TEXTURE_FORMAT_RG32F`

You can test if the device supports these values by checking if a specific enum is nil or not:
`if graphics.TEXTURE_FORMAT_RGBA16F ~= nil then
    -- it is safe to use this format
end
`


`flags`
number Texture creation flags that can be used to dictate how the texture is created. Supported values:


`graphics.TEXTURE_USAGE_FLAG_SAMPLE` - The texture can be sampled from a shader (default)
`graphics.TEXTURE_USAGE_FLAG_MEMORYLESS` - The texture can be used as a memoryless texture, i.e only transient memory for the texture is used during rendering
`graphics.TEXTURE_USAGE_FLAG_STORAGE` - The texture can be used as a storage texture, which is required for a shader to write to the texture


`max_mipmaps`
number optional max number of mipmaps. Defaults to zero, i.e no mipmap support
`compression_type`
number optional specify the compression type for the data in the buffer object that holds the texture data. Will only be used when a compressed buffer has been passed into the function.
Creating an empty texture with no buffer data is not supported as a core feature. Defaults to graphics.COMPRESSION_TYPE_DEFAULT, i.e no compression. Supported values:


`COMPRESSION_TYPE_DEFAULT`
`COMPRESSION_TYPE_BASIS_UASTC`

 * @param buffer optional buffer of precreated pixel data
 * @param callback callback function when texture is created (self, request_id, resource)
 * @example Create a texture resource asyncronously with a buffer and a callback
```lua
function callback(self, request_id, resource)
    -- The resource has been updated with a new texture,
    -- so we can update other systems with the new handle,
    -- or update components to use the resource if we want
    local tinfo = resource.get_texture_info(resource)
    msg.post("@render:", "set_backing_texture", tinfo.handle)
end
function init(self)
    -- Create a texture resource async
    local tparams = {
        width          = 128,
        height         = 128,
        type           = graphics.TEXTURE_TYPE_2D,
        format         = graphics.TEXTURE_FORMAT_RGBA,
    }

    -- Create a new buffer with 4 components
    local tbuffer = buffer.create(tparams.width * tparams.height, { {name=hash("rgba"), type=buffer.VALUE_TYPE_UINT8, count=4} } )
    local tstream = buffer.get_stream(tbuffer, hash("rgba"))

    -- Fill the buffer stream with some float values
    for y=1,tparams.width do
        for x=1,tparams.height do
            local index = (y-1) * 128 * 4 + (x-1) * 4 + 1
            tstream[index + 0] = 255
            tstream[index + 1] = 0
            tstream[index + 2] = 255
            tstream[index + 3] = 255
        end
    end
    -- create the texture
    local tpath, request_id = resource.create_texture_async("/my_texture.texturec", tparams, tbuffer, callback)
    -- at this point you can use the resource as-is, but note that the texture will be a blank 1x1 texture
    -- that will be removed once the new texture has been updated
    go.set("#model", "texture0", tpath)
end
```Create a texture resource asyncronously without a callback

```lua
function init(self)
    -- Create a texture resource async
    local tparams = {
        width          = 128,
        height         = 128,
        type           = graphics.TEXTURE_TYPE_2D,
        format         = graphics.TEXTURE_FORMAT_RGBA,
    }

    -- Create a new buffer with 4 components
    local tbuffer = buffer.create(tparams.width * tparams.height, { {name=hash("rgba"), type=buffer.VALUE_TYPE_UINT8, count=4} } )
    local tstream = buffer.get_stream(tbuffer, hash("rgba"))

    -- Fill the buffer stream with some float values
    for y=1,tparams.width do
        for x=1,tparams.height do
            local index = (y-1) * 128 * 4 + (x-1) * 4 + 1
            tstream[index + 0] = 255
            tstream[index + 1] = 0
            tstream[index + 2] = 255
            tstream[index + 3] = 255
        end
    end
    -- create the texture
    local tpath, request_id = resource.create_texture_async("/my_texture.texturec", tparams, tbuffer)
    -- at this point you can use the resource as-is, but note that the texture will be a blank 1x1 texture
    -- that will be removed once the new texture has been updated
    go.set("#model", "texture0", tpath)
end
```
 */
export function create_texture_async(path: string | hash, table: { type: number; width: number; height: number; depth: number; format: number; flags: number; max_mipmaps?: number; compression_type?: number }, buffer: buffer, callback?: (this: any, request_id: number, resource: hash) => void): LuaMultiReturn<[hash, number]>;
/**
 * Constructor-like function with two purposes:

Load the specified resource as part of loading the script
Return a hash to the run-time version of the resource

⚠ This function can only be called within go.property function calls.
 * @param path optional resource path string to the resource
 * @returns a path hash to the binary version of the resource
 * @example Load a font and set it to a label:
```lua
go.property("my_font", resource.font("/font.font"))
function init(self)
  go.set("#label", "font", self.my_font)
end
```

Load a font and set it to a gui:
```lua
go.property("my_font", resource.font("/font.font"))
function init(self)
  go.set("#gui", "fonts", self.my_font, {key = "my_font"})
end
```
 */
export function font(path?: string): hash;
/**
 * Returns the atlas data for an atlas
 * @param path The path to the atlas resource
 * @returns A table with the following entries:

texture
geometries
animations

See resource.set_atlas for a detailed description of each field
 */
export function get_atlas(path: hash | string): {texture: string | hash, animations: { id: string; width: number; height: number; frame_start: number; frame_end: number; playback?: number; fps?: number; flip_vertical?: boolean; flip_horizontal?: boolean }, geometries: { vertices: number[] | LuaSet<number>; uvs: number[] | LuaSet<number>; indices: number[] | LuaSet<number> }[]};
/**
 * gets the buffer from a resource
 * @param path The path to the resource
 * @returns The resource buffer
 * @example How to get the data from a buffer
```lua
function init(self)

    local res_path = go.get("#mesh", "vertices")
    local buf = resource.get_buffer(res_path)
    local stream_positions = buffer.get_stream(buf, "position")

    for i=1,#stream_positions do
        print(i, stream_positions[i])
    end
end
```
 */
export function get_buffer(path: hash | string): buffer;
/**
 * Gets render target info from a render target resource path or a render target handle
 * @param path The path to the resource or a render target handle
 * @returns A table containing info about the render target:

`handle`
number the opaque handle to the texture resource
'attachments'
table a table of attachments, where each attachment contains the following entries:
`width`
number width of the texture
`height`
number height of the texture
`depth`
number depth of the texture (i.e 1 for a 2D texture and 6 for a cube map)
`mipmaps`
number number of mipmaps of the texture
`type`
number The texture type. Supported values:


`graphics.TEXTURE_TYPE_2D`
`graphics.TEXTURE_TYPE_CUBE_MAP`
`graphics.TEXTURE_TYPE_2D_ARRAY`


`buffer_type`
number The attachment buffer type. Supported values:


`resource.BUFFER_TYPE_COLOR0`
`resource.BUFFER_TYPE_COLOR1`
`resource.BUFFER_TYPE_COLOR2`
`resource.BUFFER_TYPE_COLOR3`
`resource.BUFFER_TYPE_DEPTH`

`resource.BUFFER_TYPE_STENCIL`



`texture`
hash The hashed path to the attachment texture resource. This field is only available if the render target passed in is a resource.



 * @example Get the metadata from a render target resource
```lua
function init(self)
    local info = resource.get_render_target_info("/my_render_target.render_targetc")
    -- the info table contains meta data about all the render target attachments
    -- so it's not necessary to use resource.get_texture here, but we do it here
    -- just to show that it's possible:
    local info_attachment_1 = resource.get_texture_info(info.attachments[1].handle)
end
```Get a texture attachment from a render target and set it on a model component

```lua
function init(self)
    local info = resource.get_render_target_info("/my_render_target.render_targetc")
    local attachment = info.attachments[1].texture
    -- you can also get texture info from the 'texture' field, since it's a resource hash
    local texture_info = resource.get_texture_info(attachment)
    go.set("#model", "texture0", attachment)
end
```
 */
export function get_render_target_info(path: hash | string | number): {handle: number, attachments: { handle: number; width: number; height: number; depth: number; mipmaps: number; type: number, buffer_type: number, texture?: hash }}[];
/**
 * Gets the text metrics from a font
 * @param url the font to get the (unscaled) metrics from
 * @param text text to measure
 * @param options A table containing parameters for the text. Supported entries:

`width`
number The width of the text field. Not used if `line_break` is false.
`leading`
number The leading (default 1.0)
`tracking`
number The tracking (default 0.0)
`line_break`
boolean If the calculation should consider line breaks (default false)

 * @returns a table with the following fields:

width
height
max_ascent
max_descent

 * @example ```lua
function init(self)
    local font = go.get("#label", "font")
    local metrics = resource.get_text_metrics(font, "The quick brown fox\n jumps over the lazy dog")
    pprint(metrics)
end
```
 */
export function get_text_metrics(url: hash, text: string, options?: { width?: number; leading?: number; tracking?: number; line_break?: boolean }): {width: number, height: number, max_ascent: number, max_descent: number};
/**
 * Gets texture info from a texture resource path or a texture handle
 * @param path The path to the resource or a texture handle
 * @returns A table containing info about the texture:

`handle`
number the opaque handle to the texture resource
`width`
number width of the texture
`height`
number height of the texture
`depth`
number depth of the texture (i.e 1 for a 2D texture, 6 for a cube map, the actual depth of a 3D texture)
`page_count`
number number of pages of the texture array. For 2D texture value is 1. For cube map - 6
`mipmaps`
number number of mipmaps of the texture
`flags`
number usage hints of the texture.
`type`
number The texture type. Supported values:


`graphics.TEXTURE_TYPE_2D`
`graphics.TEXTURE_TYPE_2D_ARRAY`
`graphics.TEXTURE_TYPE_IMAGE_2D`
`graphics.TEXTURE_TYPE_3D`
`graphics.TEXTURE_TYPE_IMAGE_3D`
`graphics.TEXTURE_TYPE_CUBE_MAP`

 * @example Create a new texture and get the metadata from it
```lua
function init(self)
    -- create an empty texture
    local tparams = {
        width          = 128,
        height         = 128,
        type           = graphics.TEXTURE_TYPE_2D,
        format         = graphics.TEXTURE_FORMAT_RGBA,
    }

    local my_texture_path = resource.create_texture("/my_texture.texturec", tparams)
    local my_texture_info = resource.get_texture_info(my_texture_path)

    -- my_texture_info now contains
    -- {
    --      handle = <the-numeric-handle>,
    --      width = 128,
    --      height = 128,
    --      depth = 1
    --      mipmaps = 1,
    --      page_count = 1,
    --      type = graphics.TEXTURE_TYPE_2D,
    --      flags = graphics.TEXTURE_USAGE_FLAG_SAMPLE
    -- }
end
```Get the meta data from an atlas resource

```lua
function init(self)
    local my_atlas_info   = resource.get_atlas("/my_atlas.a.texturesetc")
    local my_texture_info = resource.get_texture_info(my_atlas_info.texture)

    -- my_texture_info now contains the information about the texture that is backing the atlas
end
```
 */
export function get_texture_info(path: hash | string | number): {handle: number, width: number, height: number, depth: number, page_count: number, mipmaps: number, flags: number, type: number};
/**
 * Loads the resource data for a specific resource.
 * @param path The path to the resource
 * @returns Returns the buffer stored on disc
 * @example ```lua
-- read custom resource data into buffer
local buffer = resource.load("/resources/datafile")
```

In order for the engine to include custom resources in the build process, you need
to specify them in the "game.project" settings file:
```lua
[project]
title = My project
version = 0.1
custom_resources = resources/,assets/level_data.json
```
 */
export function load(path: string): buffer;
/**
 * Constructor-like function with two purposes:

Load the specified resource as part of loading the script
Return a hash to the run-time version of the resource

⚠ This function can only be called within go.property function calls.
 * @param path optional resource path string to the resource
 * @returns a path hash to the binary version of the resource
 * @example Load a material and set it to a sprite:
```lua
go.property("my_material", resource.material("/material.material"))
function init(self)
  go.set("#sprite", "material", self.my_material)
end
```

Load a material resource and update a named material with the resource:
```lua
go.property("my_material", resource.material("/material.material"))
function init(self)
  go.set("#gui", "materials", self.my_material, {key = "my_material"})
end
```
 */
export function material(path?: string): hash;
/**
 * Release a resource.
⚠ This is a potentially dangerous operation, releasing resources currently being used can cause unexpected behaviour.
 * @param path The path to the resource.
 */
export function release(path: hash | string): void;
/**
 * Constructor-like function with two purposes:

Load the specified resource as part of loading the script
Return a hash to the run-time version of the resource

⚠ This function can only be called within go.property function calls.
 * @param path optional resource path string to the resource
 * @returns a path hash to the binary version of the resource
 * @example Set a render target color attachment as a model texture:
```lua
go.property("my_render_target", resource.render_target("/rt.render_target"))
function init(self)
  local rt_info = resource.get_render_target_info(self.my_render_target)
  go.set("#model", "texture0", rt_info.attachments[1].texture)
end
```
 */
export function render_target(path?: string): hash;
/**
 * Sets the resource data for a specific resource
 * @param path The path to the resource
 * @param buffer The buffer of precreated data, suitable for the intended resource type
 * @example Assuming the folder "/res" is added to the project custom resources:
```lua
-- load a texture resource and set it on a sprite
local buffer = resource.load("/res/new.texturec")
resource.set(go.get("#sprite", "texture0"), buffer)
```
 */
export function set(path: string | hash, buffer: buffer): void;
/**
 * Sets the data for a specific atlas resource. Setting new atlas data is specified by passing in
a texture path for the backing texture of the atlas, a list of geometries and a list of animations
that map to the entries in the geometry list. The geometry entries are represented by three lists:
vertices, uvs and indices that together represent triangles that are used in other parts of the
engine to produce render objects from.
Vertex and uv coordinates for the geometries are expected to be
in pixel coordinates where 0,0 is the top left corner of the texture.
There is no automatic padding or margin support when setting custom data,
which could potentially cause filtering artifacts if used with a material sampler that has linear filtering.
If that is an issue, you need to calculate padding and margins manually before passing in the geometry data to
this function.
 * @param path The path to the atlas resource
 * @param table A table containing info about the atlas. Supported entries:



`texture`
string | hash the path to the texture resource, e.g "/main/my_texture.texturec"




`animations`
table a list of the animations in the atlas. Supports the following fields:




`id`
string the id of the animation, used in e.g sprite.play_animation




`width`
number the width of the animation




`height`
number the height of the animation




`frame_start`
number index to the first geometry of the animation. Indices are lua based and must be in the range of 1 ..  in atlas.




`frame_end`
number index to the last geometry of the animation (non-inclusive). Indices are lua based and must be in the range of 1 ..  in atlas.




`playback`
constant optional playback mode of the animation, the default value is go.PLAYBACK_ONCE_FORWARD




`fps`
number optional fps of the animation, the default value is 30




`flip_vertical`
boolean optional flip the animation vertically, the default value is false




`flip_horizontal`
boolean optional flip the animation horizontally, the default value is false




`geometries`
table A list of the geometries that should map to the texture data. Supports the following fields:




`vertices`
table a list of the vertices in texture space of the geometry in the form {px0, py0, px1, py1, ..., pxn, pyn}




`uvs`
table a list of the uv coordinates in texture space of the geometry in the form of {u0, v0, u1, v1, ..., un, vn}




`indices`
table a list of the indices of the geometry in the form {i0, i1, i2, ..., in}. Each tripe in the list represents a triangle.



 * @example Add a new animation to an existing atlas
```lua
function init(self)
    local data = resource.get_atlas("/main/my_atlas.a.texturesetc")
    local my_animation = {
        id          = "my_new_animation",
        width       = 128,
        height      = 128,
        frame_start = 1,
        frame_end   = 6,
        playback    = go.PLAYBACK_LOOP_PINGPONG,
        fps         = 8
    }
    table.insert(data.animations, my_animation)
    resource.set_atlas("/main/my_atlas.a.texturesetc", data)
end
```Sets atlas data for a 256x256 texture with a single animation being rendered as a quad

```lua
function init(self)
    local params = {
        texture = "/main/my_256x256_texture.texturec",
        animations = {
            {
                id          = "my_animation",
                width       = 256,
                height      = 256,
                frame_start = 1,
                frame_end   = 2,
            }
        },
        geometries = {
            {
                vertices = {
                    0,   0,
                    0,   256,
                    256, 256,
                    256, 0
                },
                uvs = {
                    0, 0,
                    0, 256,
                    256, 256,
                    256, 0
                },
                indices = { 0,1,2,0,2,3 }
            }
        }
    }
    resource.set_atlas("/main/test.a.texturesetc", params)
end
```
 */
export function set_atlas(path: hash | string, table: { texture: string | hash; animations: { id: string; width: number; height: number; frame_start: number; frame_end: number; playback?: number; fps?: number; flip_vertical?: boolean; flip_horizontal?: boolean }; geometries: { vertices: number[] | LuaSet<number>; uvs: number[] | LuaSet<number>; indices: number[] | LuaSet<number> }[] }): void;
/**
 * Sets the buffer of a resource. By default, setting the resource buffer will either copy the data from the incoming buffer object
to the buffer stored in the destination resource, or make a new buffer object if the sizes between the source buffer and the destination buffer
stored in the resource differs. In some cases, e.g performance reasons, it might be beneficial to just set the buffer object on the resource without copying or cloning.
To achieve this, set the `transfer_ownership` flag to true in the argument table. Transferring ownership from a lua buffer to a resource with this function
works exactly the same as resource.create_buffer: the destination resource will take ownership of the buffer held by the lua reference, i.e the buffer will not automatically be removed
when the lua reference to the buffer is garbage collected.
Note: When setting a buffer with `transfer_ownership = true`, the currently bound buffer in the resource will be destroyed.
 * @param path The path to the resource
 * @param buffer The resource buffer
 * @param table A table containing info about how to set the buffer. Supported entries:



`transfer_ownership`
boolean optional flag to determine wether or not the resource should take over ownership of the buffer object (default false)



 * @example How to set the data from a buffer
```lua
local function fill_stream(stream, verts)
    for key, value in ipairs(verts) do
        stream[key] = verts[key]
    end
end

function init(self)

    local res_path = go.get("#mesh", "vertices")

    local positions = {
         1, -1, 0,
         1,  1, 0,
         -1, -1, 0
    }

    local num_verts = #positions / 3

    -- create a new buffer
    local buf = buffer.create(num_verts, {
        { name = hash("position"), type=buffer.VALUE_TYPE_FLOAT32, count = 3 }
    })

    local buf = resource.get_buffer(res_path)
    local stream_positions = buffer.get_stream(buf, "position")

    fill_stream(stream_positions, positions)

    resource.set_buffer(res_path, buf)
end
```
 */
export function set_buffer(path: hash | string, buffer: buffer, table?: { transfer_ownership?: boolean }): void;
/**
 * Update internal sound resource (wavc/oggc/opusc) with new data
 * @param path The path to the resource
 * @param buffer A lua string containing the binary sound data
 */
export function set_sound(path: hash | string, buffer: string): void;
/**
 * Sets the pixel data for a specific texture.
 * @param path The path to the resource
 * @param table A table containing info about the texture. Supported entries:

`type`
number The texture type. Supported values:


`graphics.TEXTURE_TYPE_2D`
`graphics.TEXTURE_TYPE_IMAGE_2D`
`graphics.TEXTURE_TYPE_3D`
`graphics.TEXTURE_TYPE_IMAGE_3D`
`graphics.TEXTURE_TYPE_CUBE_MAP`


`width`
number The width of the texture (in pixels)
`height`
number The width of the texture (in pixels)
`format`
number The texture format, note that some of these formats are platform specific. Supported values:


`graphics.TEXTURE_FORMAT_LUMINANCE`
`graphics.TEXTURE_FORMAT_RGB`
`graphics.TEXTURE_FORMAT_RGBA`

These constants might not be available on the device:
- `graphics.TEXTURE_FORMAT_RGB_PVRTC_2BPPV1`
- `graphics.TEXTURE_FORMAT_RGB_PVRTC_4BPPV1`
- `graphics.TEXTURE_FORMAT_RGBA_PVRTC_2BPPV1`
- `graphics.TEXTURE_FORMAT_RGBA_PVRTC_4BPPV1`
- `graphics.TEXTURE_FORMAT_RGB_ETC1`
- `graphics.TEXTURE_FORMAT_RGBA_ETC2`
- `graphics.TEXTURE_FORMAT_RGBA_ASTC_4X4`
- `graphics.TEXTURE_FORMAT_RGB_BC1`
- `graphics.TEXTURE_FORMAT_RGBA_BC3`
- `graphics.TEXTURE_FORMAT_R_BC4`
- `graphics.TEXTURE_FORMAT_RG_BC5`
- `graphics.TEXTURE_FORMAT_RGBA_BC7`
- `graphics.TEXTURE_FORMAT_RGB16F`
- `graphics.TEXTURE_FORMAT_RGB32F`
- `graphics.TEXTURE_FORMAT_RGBA16F`
- `graphics.TEXTURE_FORMAT_RGBA32F`
- `graphics.TEXTURE_FORMAT_R16F`
- `graphics.TEXTURE_FORMAT_RG16F`
- `graphics.TEXTURE_FORMAT_R32F`
- `graphics.TEXTURE_FORMAT_RG32F`
You can test if the device supports these values by checking if a specific enum is nil or not:
`if graphics.TEXTURE_FORMAT_RGBA16F ~= nil then
    -- it is safe to use this format
end
`


`x`
number optional x offset of the texture (in pixels)
`y`
number optional y offset of the texture (in pixels)
`z`
number optional z offset of the texture (in pixels). Only applies to 3D textures
`page`
number optional slice of the array texture. Only applies to 2D texture arrays. Zero-based
`mipmap`
number optional mipmap to upload the data to
`compression_type`
number optional specify the compression type for the data in the buffer object that holds the texture data. Defaults to graphics.COMPRESSION_TYPE_DEFAULT, i.e no compression. Supported values:


`COMPRESSION_TYPE_DEFAULT`
`COMPRESSION_TYPE_BASIS_UASTC`

 * @param buffer The buffer of precreated pixel data
⚠ To update a cube map texture you need to pass in six times the amount of data via the buffer, since a cube map has six sides!
⚠ 3D Textures are currently only supported on OpenGL and Vulkan adapters. To check if your device supports 3D textures, use:
```lua
if graphics.TEXTURE_TYPE_3D ~= nil then
    -- Device and graphics adapter support 3D textures
end
 * @example How to set all pixels of an atlas
```lua
function init(self)
  self.height = 128
  self.width = 128
  self.buffer = buffer.create(self.width * self.height, { {name=hash("rgb"), type=buffer.VALUE_TYPE_UINT8, count=3} } )
  self.stream = buffer.get_stream(self.buffer, hash("rgb"))

  for y=1,self.height do
      for x=1,self.width do
          local index = (y-1) * self.width * 3 + (x-1) * 3 + 1
          self.stream[index + 0] = 0xff
          self.stream[index + 1] = 0x80
          self.stream[index + 2] = 0x10
      end
  end

  local resource_path = go.get("#model", "texture0")
  local args = { width=self.width, height=self.height, type=graphics.TEXTURE_TYPE_2D, format=graphics.TEXTURE_FORMAT_RGB, num_mip_maps=1 }
  resource.set_texture( resource_path, args, self.buffer )
end
```How to update a specific region of an atlas by using the x,y values. Assumes the already set atlas is a 128x128 texture.

```lua
function init(self)
  self.x = 16
  self.y = 16
  self.height = 128 - self.x * 2
  self.width = 128 - self.y * 2
  self.buffer = buffer.create(self.width * self.height, { {name=hash("rgb"), type=buffer.VALUE_TYPE_UINT8, count=3} } )
  self.stream = buffer.get_stream(self.buffer, hash("rgb"))

  for y=1,self.height do
      for x=1,self.width do
          local index = (y-1) * self.width * 3 + (x-1) * 3 + 1
          self.stream[index + 0] = 0xff
          self.stream[index + 1] = 0x80
          self.stream[index + 2] = 0x10
      end
  end

  local resource_path = go.get("#model", "texture0")
  local args = { width=self.width, height=self.height, x=self.x, y=self.y, type=graphics.TEXTURE_TYPE_2D, format=graphics.TEXTURE_FORMAT_RGB, num_mip_maps=1 }
  resource.set_texture(resource_path, args, self.buffer )
end
```Update a texture from a buffer resource
```lua
go.property("my_buffer", resource.buffer("/my_default_buffer.buffer"))

function init(self)
    local resource_path = go.get("#model", "texture0")
    -- the "my_buffer" resource is expected to hold 128 * 128 * 3 bytes!
    local args = {
         width  = 128,
         height = 128,
         type   = graphics.TEXTURE_TYPE_2D,
         format = graphics.TEXTURE_FORMAT_RGB
     }
    -- Note that the extra resource.get_buffer call is a requirement here
    -- since the "self.my_buffer" is just pointing to a buffer resource path
    -- and not an actual buffer object or buffer resource.
    resource.set_texture(resource_path, args, resource.get_buffer(self.my_buffer))
end
```Update an existing 3D texture from a lua buffer

```lua

function init(self)
    -- create a buffer that can hold the data of a 8x8x8 texture
    local tbuffer = buffer.create(8 * 8 * 8, { {name=hash("rgba"), type=buffer.VALUE_TYPE_FLOAT32, count=4} } )
    local tstream = buffer.get_stream(tbuffer, hash("rgba"))

    -- populate the buffer with some data
    local index = 1
    for z=1,8 do
        for y=1,8 do
            for x=1,8 do
                tstream[index + 0] = x
                tstream[index + 1] = y
                tstream[index + 2] = z
                tstream[index + 3] = 1.0
                index = index + 4
            end
        end
    end

    local t_args = {
        type   = graphics.TEXTURE_TYPE_IMAGE_3D,
        width  = 8,
        height = 8,
        depth  = 8,
        format = resource.TEXTURE_FORMAT_RGBA32F
    }

    -- This expects that the texture resource "/my_3d_texture.texturec" already exists
    -- and is a 3D texture resource. To create a dynamic 3D texture resource
    -- use the "resource.create_texture" function.
    resource.set_texture("/my_3d_texture.texturec", t_args, tbuffer)
endUpdate texture 2nd array page with loaded texture from png

```lua
    -- new_tex is resource handle of texture which was created via resource.create_resource
    local tex_path = "/bundle_resources/page_02.png"
    local data = sys.load_resource(tex_path)
    local buf = image.load_buffer(data)
    resource.set_texture(new_tex, {
        type = graphics.TEXTURE_TYPE_2D_ARRAY,
        width = buf.width,
        height = buf.height,
        page = 1,
        format = graphics.TEXTURE_FORMAT_RGB
    }, buf.buffer)
    go.set("#mesh", "texture0", new_tex)
```
 */
export function set_texture(path: hash | string, table: { type: number; width: number; height: number; format: number; x?: number; y?: number; z?: number; page?: number; mipmap?: number; compression_type?: number }, buffer: buffer): void;
/**
 * Constructor-like function with two purposes:

Load the specified resource as part of loading the script
Return a hash to the run-time version of the resource

⚠ This function can only be called within go.property function calls.
 * @param path optional resource path string to the resource
 * @returns a path hash to the binary version of the resource
 * @example Load a texture and set it to a model:
```lua
go.property("my_texture", resource.texture("/texture.png"))
function init(self)
  go.set("#model", "texture0", self.my_texture)
end
```
 */
export function texture(path?: string): hash;
/**
 * Constructor-like function with two purposes:

Load the specified resource as part of loading the script
Return a hash to the run-time version of the resource

⚠ This function can only be called within go.property function calls.
 * @param path optional resource path string to the resource
 * @returns a path hash to the binary version of the resource
 * @example Load tile source and set it to a tile map:
```lua
go.property("my_tile_source", resource.tile_source("/tilesource.tilesource"))
function init(self)
  go.set("#tilemap", "tile_source", self.my_tile_source)
end
```
 */
export function tile_source(path?: string): hash;
}

declare namespace socket {
/**
 * This constant contains the maximum number of sockets that the select function can handle.
 */
export const _SETSIZE: number;
/**
 * This constant has a string describing the current LuaSocket version.
 */
export const _VERSION: string;
/**
 * This function is a shortcut that creates and returns a TCP client object connected to a remote
address at a given port. Optionally, the user can also specify the local address and port to
bind (`locaddr` and `locport`), or restrict the socket family to `"inet"` or `"inet6"`.
Without specifying family to connect, whether a tcp or tcp6 connection is created depends on
your system configuration.
 * @param address the address to connect to.
 * @param port the port to connect to.
 * @param locaddr optional local address to bind to.
 * @param locport optional local port to bind to.
 * @param family optional socket family to use, `"inet"` or `"inet6"`.
 * @returns a new IPv6 TCP client object, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
export function connect(address: string, port: number, locaddr?: string, locport?: number, family?: string): LuaMultiReturn<[typeof socket.client | undefined, string | undefined]>;
/**
 * Returns the time in seconds, relative to the system epoch (Unix epoch time since January 1, 1970 (UTC) or Windows file time since January 1, 1601 (UTC)).
You should use the values returned by this function for relative measurements only.
 * @returns the number of seconds elapsed.
 * @example How to use the gettime() function to measure running time:
```lua
t = socket.gettime()
-- do stuff
print(socket.gettime() - t .. " seconds elapsed")
```
 */
export function gettime(): number;
/**
 * This function creates and returns a clean try function that allows for cleanup before the exception is raised.
The `finalizer` function will be called in protected mode (see protect).
 * @param finalizer a function that will be called before the try throws the exception.
 * @example Perform operations on an open socket ```lua
c```:
```lua
-- create a try function that closes 'c' on error
local try = socket.newtry(function() c:close() end)
-- do everything reassured c will be closed
try(c:send("hello there?\r\n"))
local answer = try(c:receive())
...
try(c:send("good bye\r\n"))
c:close()
```
 */
export function newtry(finalizer: (...args: any[]) => any): (...args: any[]) => unknown;
/**
 * Converts a function that throws exceptions into a safe function. This function only catches exceptions thrown by try functions. It does not catch normal Lua errors.
⚠ Beware that if your function performs some illegal operation that raises an error, the protected function will catch the error and return it as a string. This is because try functions uses errors as the mechanism to throw exceptions.
 * @param func a function that calls a try function (or assert, or error) to throw exceptions.
 * @example ```lua
local dostuff = socket.protect(function()
    local try = socket.newtry()
    local c = try(socket.connect("myserver.com", 80))
    try = socket.newtry(function() c:close() end)
    try(c:send("hello?\r\n"))
    local answer = try(c:receive())
    c:close()
end)

local n, error = dostuff()
```
 */
export function protect(func: (...args: any[]) => any): (...args: any[]) => LuaMultiReturn<[undefined, string]>;
/**
 * The function returns a list with the sockets ready for reading, a list with the sockets ready for writing and an error message. The error message is "timeout" if a timeout condition was met and nil otherwise. The returned tables are doubly keyed both by integers and also by the sockets themselves, to simplify the test if a specific socket has changed status.
`Recvt` and `sendt` parameters can be empty tables or `nil`. Non-socket values (or values with non-numeric indices) in these arrays will be silently ignored.
The returned tables are doubly keyed both by integers and also by the sockets themselves, to simplify the test if a specific socket has changed status.
⚠ This function can monitor a limited number of sockets, as defined by the constant socket._SETSIZE. This number may be as high as 1024 or as low as 64 by default, depending on the system. It is usually possible to change this at compile time. Invoking select with a larger number of sockets will raise an error.
⚠ A known bug in WinSock causes select to fail on non-blocking TCP sockets. The function may return a socket as writable even though the socket is not ready for sending.
⚠ Calling select with a server socket in the receive parameter before a call to accept does not guarantee accept will return immediately. Use the settimeout method or accept might block forever.
⚠ If you close a socket and pass it to select, it will be ignored.
(Using select with non-socket objects: Any object that implements `getfd` and `dirty` can be used with select, allowing objects from other libraries to be used within a socket.select driven loop.)
 * @param recvt array with the sockets to test for characters available for reading.
 * @param sendt array with sockets that are watched to see if it is OK to immediately write on them.
 * @param timeout the maximum amount of time (in seconds) to wait for a change in status. Nil, negative or omitted timeout value allows the function to block indefinitely.
 * @returns a list with the sockets ready for reading. & a list with the sockets ready for writing. & an error message. "timeout" if a timeout condition was met, otherwise `nil`.
 */
export function select(recvt: object, sendt: object, timeout?: number): LuaMultiReturn<[object, object, string | undefined]>;
/**
 * This function drops a number of arguments and returns the remaining.
It is useful to avoid creation of dummy variables:
`D` is the number of arguments to drop. `Ret1` to `retN` are the arguments.
The function returns `retD+1` to `retN`.
 * @param d the number of arguments to drop.
 * @param ret1 argument 1.
 * @param ret2 argument 2.
 * @param retN argument N.
 * @returns argument D+1. & argument D+2. & argument N.
 * @example Instead of doing the following with dummy variables:
```lua
-- get the status code and separator from SMTP server reply
local dummy1, dummy2, code, sep = string.find(line, "^(%d%d%d)(.?)")
```

You can skip a number of variables:
```lua
-- get the status code and separator from SMTP server reply
local code, sep = socket.skip(2, string.find(line, "^(%d%d%d)(.?)"))
```
 */
export function skip(d: number, ret1?: any, ret2?: any, retN?: any): LuaMultiReturn<[any | undefined, any | undefined, any | undefined]>;
/**
 * Freezes the program execution during a given amount of time.
 * @param time the number of seconds to sleep for.
 */
export function sleep(time: number): void;
/**
 * Creates and returns an IPv4 TCP master object. A master object can be transformed into a server object with the method `listen` (after a call to `bind`) or into a client object with the method `connect`. The only other method supported by a master object is the `close` method.
 * @returns a new IPv4 TCP master object, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
export function tcp(): LuaMultiReturn<[typeof socket.master | undefined, string | undefined]>;
/**
 * Creates and returns an IPv6 TCP master object. A master object can be transformed into a server object with the method `listen` (after a call to `bind`) or into a client object with the method connect. The only other method supported by a master object is the close method.
Note: The TCP object returned will have the option "ipv6-v6only" set to true.
 * @returns a new IPv6 TCP master object, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
export function tcp6(): LuaMultiReturn<[typeof socket.master | undefined, string | undefined]>;
/**
 * Creates and returns an unconnected IPv4 UDP object. Unconnected objects support the `sendto`, `receive`, `receivefrom`, `getoption`, `getsockname`, `setoption`, `settimeout`, `setpeername`, `setsockname`, and `close` methods. The `setpeername` method is used to connect the object.
 * @returns a new unconnected IPv4 UDP object, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
export function udp(): LuaMultiReturn<[typeof socket.unconnected | undefined, string | undefined]>;
/**
 * Creates and returns an unconnected IPv6 UDP object. Unconnected objects support the `sendto`, `receive`, `receivefrom`, `getoption`, `getsockname`, `setoption`, `settimeout`, `setpeername`, `setsockname`, and `close` methods. The `setpeername` method is used to connect the object.
Note: The UDP object returned will have the option "ipv6-v6only" set to true.
 * @returns a new unconnected IPv6 UDP object, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
export function udp6(): LuaMultiReturn<[typeof socket.unconnected | undefined, string | undefined]>;
export namespace dns {
/**
 * This function converts a host name to IPv4 or IPv6 address.
The supplied address can be an IPv4 or IPv6 address or host name.
The function returns a table with all information returned by the resolver:
`{
 [1] = {
    family = family-name-1,
    addr = address-1
  },
  ...
  [n] = {
    family = family-name-n,
    addr = address-n
  }
}
`

Here, family contains the string `"inet"` for IPv4 addresses, and `"inet6"` for IPv6 addresses.
In case of error, the function returns nil followed by an error message.
 * @param address a hostname or an IPv4 or IPv6 address.
 * @returns a table with all information returned by the resolver, or if an error occurs, `nil`. & the error message, or `nil` if no error occurred.
 */
export function getaddrinfo(address: string): LuaMultiReturn<[object | undefined, string | undefined]>;
/**
 * Returns the standard host name for the machine as a string.
 * @returns the host name for the machine.
 */
export function gethostname(): string;
/**
 * This function converts an address to host name.
The supplied address can be an IPv4 or IPv6 address or host name.
The function returns a table with all information returned by the resolver:
`{
  [1] = host-name-1,
  ...
  [n] = host-name-n,
}
`
 * @param address a hostname or an IPv4 or IPv6 address.
 * @returns a table with all information returned by the resolver, or if an error occurs, `nil`. & the error message, or `nil` if no error occurred.
 */
export function getnameinfo(address: string): LuaMultiReturn<[object | undefined, string | undefined]>;
/**
 * This function converts from an IPv4 address to host name.
The address can be an IPv4 address or a host name.
 * @param address an IPv4 address or host name.
 * @returns the canonic host name of the given address, or `nil` in case of an error. & a table with all information returned by the resolver, or if an error occurs, the error message string.
 */
export function tohostname(address: string): LuaMultiReturn<[string | undefined, object | string]>;
/**
 * This function converts a host name to IPv4 address.
The address can be an IP address or a host name.
 * @param address a hostname or an IP address.
 * @returns the first IP address found for the hostname, or `nil` in case of an error. & a table with all information returned by the resolver, or if an error occurs, the error message string.
 */
export function toip(address: string): LuaMultiReturn<[string | undefined, object | string]>;
}
class client {
/**
 * Closes the TCP object. The internal socket used by the object is closed and the local address to which the object was bound is made available to other applications. No further operations (except for further calls to the close method) are allowed on a closed socket.
⚠ It is important to close all used sockets once they are not needed, since, in many systems, each socket uses a file descriptor, which are limited system resources. Garbage-collected objects are automatically closed before destruction, though.
 */
close(): void;
/**
 * Check the read buffer status.
⚠ This is an internal method, any use is unlikely to be portable.
 * @returns `true` if there is any data in the read buffer, `false` otherwise.
 */
dirty(): boolean;
/**
 * Returns the underlying socket descriptor or handle associated to the object.
⚠ This is an internal method, any use is unlikely to be portable.
 * @returns the descriptor or handle. In case the object has been closed, the return will be -1.
 */
getfd(): number;
/**
 * Gets options for the TCP object. See client:setoption for description of the option names and values.
 * @param option the name of the option to get:

`"keepalive"`
`"linger"`
`"reuseaddr"`
`"tcp-nodelay"`

 * @returns the option value, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
getoption(option: string): LuaMultiReturn<[any | undefined, string | undefined]>;
/**
 * Returns information about the remote side of a connected client object.
⚠ It makes no sense to call this method on server objects.
 * @returns a string with the IP address of the peer, the port number that peer is using for the connection, and the family ("inet" or "inet6"). In case of error, the method returns `nil`.
 */
getpeername(): string;
/**
 * Returns the local address information associated to the object.
 * @returns a string with local IP address, the local port number, and the family ("inet" or "inet6"). In case of error, the method returns `nil`.
 */
getsockname(): string;
/**
 * Returns accounting information on the socket, useful for throttling of bandwidth.
 * @returns a string with the number of bytes received, the number of bytes sent, and the age of the socket object in seconds.
 */
getstats(): string;
/**
 * Reads data from a client object, according to the specified `read pattern`. Patterns follow the Lua file I/O format, and the difference in performance between patterns is negligible.
 * @param pattern the read pattern that can be any of the following:

`"*a"`
reads from the socket until the connection is closed. No end-of-line translation is performed;
`"*l"`
reads a line of text from the socket. The line is terminated by a LF character (ASCII 10), optionally preceded by a CR character (ASCII 13). The CR and LF characters are not included in the returned line. In fact, all CR characters are ignored by the pattern. This is the default pattern;
`number`
causes the method to read a specified number of bytes from the socket.

 * @param prefix an optional string to be concatenated to the beginning of any received data before return.
 * @returns the received pattern, or `nil` in case of error. & the error message, or `nil` if no error occurred. The error message can be the string `"closed"` in case the connection was closed before the transmission was completed or the string `"timeout"` in case there was a timeout during the operation. & a (possibly empty) string containing the partial that was received, or `nil` if no error occurred.
 */
receive(pattern?: string | number, prefix?: string): LuaMultiReturn<[string | undefined, string | undefined, string | undefined]>;
/**
 * Sends data through client object.
The optional arguments i and j work exactly like the standard string.sub Lua function to allow the selection of a substring to be sent.
⚠ Output is not buffered. For small strings, it is always better to concatenate them in Lua (with the `..` operator) and send the result in one call instead of calling the method several times.
 * @param data the string to be sent.
 * @param i optional starting index of the string.
 * @param j optional end index of string.
 * @returns the index of the last byte within [i, j] that has been sent, or `nil` in case of error. Notice that, if `i` is 1 or absent, this is effectively the total number of bytes sent. & the error message, or `nil` if no error occurred. The error message can be `"closed"` in case the connection was closed before the transmission was completed or the string `"timeout"` in case there was a timeout during the operation. & in case of error, the index of the last byte within [i, j] that has been sent. You might want to try again from the byte following that. `nil` if no error occurred.
 */
send(data: string, i?: number, j?: number): LuaMultiReturn<[number | undefined, string | undefined, number | undefined]>;
/**
 * Sets the underling socket descriptor or handle associated to the object. The current one is simply replaced, not closed, and no other change to the object state is made
 * @param handle the descriptor or handle to set.
 */
setfd(handle: number): void;
/**
 * Sets options for the TCP object. Options are only needed by low-level or time-critical applications. You should only modify an option if you are sure you need it.
 * @param option the name of the option to set. The value is provided in the `value` parameter:

`"keepalive"`
Setting this option to `true` enables the periodic transmission of messages on a connected socket. Should the connected party fail to respond to these messages, the connection is considered broken and processes using the socket are notified;
`"linger"`
Controls the action taken when unsent data are queued on a socket and a close is performed. The value is a table with the following keys:


boolean `on`
number `timeout` (seconds)

If the 'on' field is set to true, the system will block the process on the close attempt until it is able to transmit the data or until `timeout` has passed. If 'on' is false and a close is issued, the system will process the close in a manner that allows the process to continue as quickly as possible. It is not advised to set this to anything other than zero;

`"reuseaddr"`
Setting this option indicates that the rules used in validating addresses supplied in a call to `bind` should allow reuse of local addresses;
`"tcp-nodelay"`
Setting this option to `true` disables the Nagle's algorithm for the connection;
`"ipv6-v6only"`
Setting this option to `true` restricts an inet6 socket to sending and receiving only IPv6 packets.

 * @param value the value to set for the specified option.
 * @returns the value `1`, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
setoption(option: string, value?: any): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Resets accounting information on the socket, useful for throttling of bandwidth.
 * @param received the new number of bytes received.
 * @param sent the new number of bytes sent.
 * @param age the new age in seconds.
 * @returns the value `1` in case of success, or `nil` in case of error.
 */
setstats(received: number, sent: number, age: number): number | undefined;
/**
 * Changes the timeout values for the object. By default, all I/O operations are blocking. That is, any call to the methods `send`, `receive`, and `accept` will block indefinitely, until the operation completes. The `settimeout` method defines a limit on the amount of time the I/O methods can block. When a timeout is set and the specified amount of time has elapsed, the affected methods give up and fail with an error code.
There are two timeout modes and both can be used together for fine tuning.
⚠ Although timeout values have millisecond precision in LuaSocket, large blocks can cause I/O functions not to respect timeout values due to the time the library takes to transfer blocks to and from the OS and to and from the Lua interpreter. Also, function that accept host names and perform automatic name resolution might be blocked by the resolver for longer than the specified timeout value.
 * @param value the amount of time to wait, in seconds. The `nil` timeout value allows operations to block indefinitely. Negative timeout values have the same effect.
 * @param mode optional timeout mode to set:

`"b"`
block timeout. Specifies the upper limit on the amount of time LuaSocket can be blocked by the operating system while waiting for completion of any single I/O operation. This is the default mode;
`"t"`
total timeout. Specifies the upper limit on the amount of time LuaSocket can block a Lua script before returning from a call.

 */
settimeout(value: number, mode?: string): void;
/**
 * Shuts down part of a full-duplex connection.
 * @param mode which way of the connection should be shut down:

`"both"`
disallow further sends and receives on the object. This is the default mode;
`"send"`
disallow further sends on the object;
`"receive"`
disallow further receives on the object.

 * @returns the value `1`.
 */
shutdown(mode: string): number;
}
class connected {
/**
 * Closes a UDP object. The internal socket used by the object is closed and the local address to which the object was bound is made available to other applications. No further operations (except for further calls to the close method) are allowed on a closed socket.
⚠ It is important to close all used sockets once they are not needed, since, in many systems, each socket uses a file descriptor, which are limited system resources. Garbage-collected objects are automatically closed before destruction, though.
 */
close(): void;
/**
 * Gets an option value from the UDP object. See connected:setoption for description of the option names and values.
 * @param option the name of the option to get:

`"dontroute"`
`"broadcast"`
`"reuseaddr"`
`"reuseport"`
`"ip-multicast-loop"`
`"ipv6-v6only"`
`"ip-multicast-if"`
`"ip-multicast-ttl"`
`"ip-add-membership"`
`"ip-drop-membership"`

 * @returns the option value, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
getoption(option: string): LuaMultiReturn<[any | undefined, string | undefined]>;
/**
 * Retrieves information about the peer associated with a connected UDP object.
⚠ It makes no sense to call this method on unconnected objects.
 * @returns a string with the IP address of the peer, the port number that peer is using for the connection, and the family ("inet" or "inet6"). In case of error, the method returns `nil`.
 */
getpeername(): string;
/**
 * Returns the local address information associated to the object.
⚠ UDP sockets are not bound to any address until the `setsockname` or the `sendto` method is called for the first time (in which case it is bound to an ephemeral port and the wild-card address).
 * @returns a string with local IP address, a number with the local port, and the family ("inet" or "inet6"). In case of error, the method returns `nil`.
 */
getsockname(): string;
/**
 * Receives a datagram from the UDP object. If the UDP object is connected, only datagrams coming from the peer are accepted. Otherwise, the returned datagram can come from any host.
 * @param size optional maximum size of the datagram to be retrieved. If there are more than size bytes available in the datagram, the excess bytes are discarded. If there are less then size bytes available in the current datagram, the available bytes are returned. If size is omitted, the maximum datagram size is used (which is currently limited by the implementation to 8192 bytes).
 * @returns the received datagram, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
receive(size?: number): LuaMultiReturn<[string | undefined, string | undefined]>;
/**
 * Sends a datagram to the UDP peer of a connected object.
⚠ In UDP, the send method never blocks and the only way it can fail is if the underlying transport layer refuses to send a message to the specified address (i.e. no interface accepts the address).
 * @param datagram a string with the datagram contents. The maximum datagram size for UDP is 64K minus IP layer overhead. However datagrams larger than the link layer packet size will be fragmented, which may deteriorate performance and/or reliability.
 * @returns the value `1` on success, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
send(datagram: string): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Sets options for the UDP object. Options are only needed by low-level or time-critical applications. You should only modify an option if you are sure you need it.
 * @param option the name of the option to set. The value is provided in the `value` parameter:

`"dontroute"`
Indicates that outgoing messages should bypass the standard routing facilities. Receives a boolean value;
`"broadcast"`
Requests permission to send broadcast datagrams on the socket. Receives a boolean value;
`"reuseaddr"`
Indicates that the rules used in validating addresses supplied in a `bind` call should allow reuse of local addresses. Receives a boolean value;
`"reuseport"`
Allows completely duplicate bindings by multiple processes if they all set `"reuseport"` before binding the port. Receives a boolean value;
`"ip-multicast-loop"`
Specifies whether or not a copy of an outgoing multicast datagram is delivered to the sending host as long as it is a member of the multicast group. Receives a boolean value;
`"ipv6-v6only"`
Specifies whether to restrict inet6 sockets to sending and receiving only IPv6 packets. Receive a boolean value;
`"ip-multicast-if"`
Sets the interface over which outgoing multicast datagrams are sent. Receives an IP address;
`"ip-multicast-ttl"`
Sets the Time To Live in the IP header for outgoing multicast datagrams. Receives a number;

`"ip-add-membership"`: Joins the multicast group specified. Receives a table with fields:

string `multiaddr` (IP address)
string `interface` (IP address)


"'ip-drop-membership"`
Leaves the multicast group specified. Receives a table with fields:


string `multiaddr` (IP address)
string `interface` (IP address)

 * @param value the value to set for the specified option.
 * @returns the value `1`, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
setoption(option: string, value?: any): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Changes the peer of a UDP object. This method turns an unconnected UDP object into a connected UDP object or vice versa.
For connected objects, outgoing datagrams will be sent to the specified peer, and datagrams received from other peers will be discarded by the OS. Connected UDP objects must use the `send` and `receive` methods instead of `sendto` and `receivefrom`.
⚠ Since the address of the peer does not have to be passed to and from the OS, the use of connected UDP objects is recommended when the same peer is used for several transmissions and can result in up to 30% performance gains.
 * @param ___ if address is "*" and the object is connected, the peer association is removed and the object becomes an unconnected object again.
 * @returns the value `1` on success, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
setpeername(___: string): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Changes the timeout values for the object. By default, the `receive` and `receivefrom`  operations are blocking. That is, any call to the methods will block indefinitely, until data arrives. The `settimeout` function defines a limit on the amount of time the functions can block. When a timeout is set and the specified amount of time has elapsed, the affected methods give up and fail with an error code.
⚠ In UDP, the `send` and `sendto` methods never block (the datagram is just passed to the OS and the call returns immediately). Therefore, the `settimeout` method has no effect on them.
 * @param value the amount of time to wait, in seconds. The `nil` timeout value allows operations to block indefinitely. Negative timeout values have the same effect.
 */
settimeout(value: number): void;
}
class master {
/**
 * Binds a master object to address and port on the local host.
 * @param address an IP address or a host name. If address is `"*"`, the system binds to all local interfaces using the `INADDR_ANY` constant.
 * @param port the port to commect to, in the range [0..64K). If port is 0, the system automatically chooses an ephemeral port.
 * @returns the value `1`, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
bind(address: string, port: number): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Closes the TCP object. The internal socket used by the object is closed and the local address to which the object was bound is made available to other applications. No further operations (except for further calls to the close method) are allowed on a closed socket.
⚠ It is important to close all used sockets once they are not needed, since, in many systems, each socket uses a file descriptor, which are limited system resources. Garbage-collected objects are automatically closed before destruction, though.
 */
close(): void;
/**
 * Attempts to connect a master object to a remote host, transforming it into a client object. Client objects support methods send, receive, getsockname, getpeername, settimeout, and close.
Note that the function `socket.connect` is available and is a shortcut for the creation of client sockets.
 * @param address an IP address or a host name. If address is `"*"`, the system binds to all local interfaces using the `INADDR_ANY` constant.
 * @param port the port to commect to, in the range [0..64K). If port is 0, the system automatically chooses an ephemeral port.
 * @returns the value `1`, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
connect(address: string, port: number): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Check the read buffer status.
⚠ This is an internal method, any use is unlikely to be portable.
 * @returns `true` if there is any data in the read buffer, `false` otherwise.
 */
dirty(): boolean;
/**
 * Returns the underlying socket descriptor or handle associated to the object.
⚠ This is an internal method, any use is unlikely to be portable.
 * @returns the descriptor or handle. In case the object has been closed, the return will be -1.
 */
getfd(): number;
/**
 * Returns the local address information associated to the object.
 * @returns a string with local IP address, the local port number, and the family ("inet" or "inet6"). In case of error, the method returns `nil`.
 */
getsockname(): string;
/**
 * Returns accounting information on the socket, useful for throttling of bandwidth.
 * @returns a string with the number of bytes received, the number of bytes sent, and the age of the socket object in seconds.
 */
getstats(): string;
/**
 * Specifies the socket is willing to receive connections, transforming the object into a server object. Server objects support the `accept`, `getsockname`, `setoption`, `settimeout`, and `close` methods.
 * @param backlog the number of client connections that can be queued waiting for service. If the queue is full and another client attempts connection, the connection is refused.
 * @returns the value `1`, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
listen(backlog: number): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Sets the underling socket descriptor or handle associated to the object. The current one is simply replaced, not closed, and no other change to the object state is made
 * @param handle the descriptor or handle to set.
 */
setfd(handle: number): void;
/**
 * Resets accounting information on the socket, useful for throttling of bandwidth.
 * @param received the new number of bytes received.
 * @param sent the new number of bytes sent.
 * @param age the new age in seconds.
 * @returns the value `1` in case of success, or `nil` in case of error.
 */
setstats(received: number, sent: number, age: number): number | undefined;
/**
 * Changes the timeout values for the object. By default, all I/O operations are blocking. That is, any call to the methods `send`, `receive`, and `accept` will block indefinitely, until the operation completes. The `settimeout` method defines a limit on the amount of time the I/O methods can block. When a timeout is set and the specified amount of time has elapsed, the affected methods give up and fail with an error code.
There are two timeout modes and both can be used together for fine tuning.
⚠ Although timeout values have millisecond precision in LuaSocket, large blocks can cause I/O functions not to respect timeout values due to the time the library takes to transfer blocks to and from the OS and to and from the Lua interpreter. Also, function that accept host names and perform automatic name resolution might be blocked by the resolver for longer than the specified timeout value.
 * @param value the amount of time to wait, in seconds. The `nil` timeout value allows operations to block indefinitely. Negative timeout values have the same effect.
 * @param mode optional timeout mode to set:

`"b"`
block timeout. Specifies the upper limit on the amount of time LuaSocket can be blocked by the operating system while waiting for completion of any single I/O operation. This is the default mode;
`"t"`
total timeout. Specifies the upper limit on the amount of time LuaSocket can block a Lua script before returning from a call.

 */
settimeout(value: number, mode?: string): void;
}
class server {
/**
 * Waits for a remote connection on the server object and returns a client object representing that connection.
⚠ Calling `socket.select` with a server object in the `recvt` parameter before a call to accept does not guarantee accept will return immediately. Use the `settimeout` method or accept might block until another client shows up.
 * @returns if a connection is successfully initiated, a client object is returned, or `nil` in case of error. & the error message, or `nil` if no error occurred. The error is `"timeout"` if a timeout condition is met.
 */
accept(): LuaMultiReturn<[typeof socket.client | undefined, string | undefined]>;
/**
 * Closes the TCP object. The internal socket used by the object is closed and the local address to which the object was bound is made available to other applications. No further operations (except for further calls to the close method) are allowed on a closed socket.
⚠ It is important to close all used sockets once they are not needed, since, in many systems, each socket uses a file descriptor, which are limited system resources. Garbage-collected objects are automatically closed before destruction, though.
 */
close(): void;
/**
 * Check the read buffer status.
⚠ This is an internal method, any use is unlikely to be portable.
 * @returns `true` if there is any data in the read buffer, `false` otherwise.
 */
dirty(): boolean;
/**
 * Returns the underlying socket descriptor or handle associated to the object.
⚠ This is an internal method, any use is unlikely to be portable.
 * @returns the descriptor or handle. In case the object has been closed, the return will be -1.
 */
getfd(): number;
/**
 * Gets options for the TCP object. See server:setoption for description of the option names and values.
 * @param option the name of the option to get:

`"keepalive"`
`"linger"`
`"reuseaddr"`
`"tcp-nodelay"`

 * @returns the option value, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
getoption(option: string): LuaMultiReturn<[any | undefined, string | undefined]>;
/**
 * Returns the local address information associated to the object.
 * @returns a string with local IP address, the local port number, and the family ("inet" or "inet6"). In case of error, the method returns `nil`.
 */
getsockname(): string;
/**
 * Returns accounting information on the socket, useful for throttling of bandwidth.
 * @returns a string with the number of bytes received, the number of bytes sent, and the age of the socket object in seconds.
 */
getstats(): string;
/**
 * Sets the underling socket descriptor or handle associated to the object. The current one is simply replaced, not closed, and no other change to the object state is made
 * @param handle the descriptor or handle to set.
 */
setfd(handle: number): void;
/**
 * Sets options for the TCP object. Options are only needed by low-level or time-critical applications. You should only modify an option if you are sure you need it.
 * @param option the name of the option to set. The value is provided in the `value` parameter:

`"keepalive"`
Setting this option to `true` enables the periodic transmission of messages on a connected socket. Should the connected party fail to respond to these messages, the connection is considered broken and processes using the socket are notified;
`"linger"`
Controls the action taken when unsent data are queued on a socket and a close is performed. The value is a table with the following keys:


boolean `on`
number `timeout` (seconds)

If the 'on' field is set to true, the system will block the process on the close attempt until it is able to transmit the data or until `timeout` has passed. If 'on' is false and a close is issued, the system will process the close in a manner that allows the process to continue as quickly as possible. It is not advised to set this to anything other than zero;

`"reuseaddr"`
Setting this option indicates that the rules used in validating addresses supplied in a call to `bind` should allow reuse of local addresses;
`"tcp-nodelay"`
Setting this option to `true` disables the Nagle's algorithm for the connection;
`"ipv6-v6only"`
Setting this option to `true` restricts an inet6 socket to sending and receiving only IPv6 packets.

 * @param value the value to set for the specified option.
 * @returns the value `1`, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
setoption(option: string, value?: any): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Resets accounting information on the socket, useful for throttling of bandwidth.
 * @param received the new number of bytes received.
 * @param sent the new number of bytes sent.
 * @param age the new age in seconds.
 * @returns the value `1` in case of success, or `nil` in case of error.
 */
setstats(received: number, sent: number, age: number): number | undefined;
/**
 * Changes the timeout values for the object. By default, all I/O operations are blocking. That is, any call to the methods `send`, `receive`, and `accept` will block indefinitely, until the operation completes. The `settimeout` method defines a limit on the amount of time the I/O methods can block. When a timeout is set and the specified amount of time has elapsed, the affected methods give up and fail with an error code.
There are two timeout modes and both can be used together for fine tuning.
⚠ Although timeout values have millisecond precision in LuaSocket, large blocks can cause I/O functions not to respect timeout values due to the time the library takes to transfer blocks to and from the OS and to and from the Lua interpreter. Also, function that accept host names and perform automatic name resolution might be blocked by the resolver for longer than the specified timeout value.
 * @param value the amount of time to wait, in seconds. The `nil` timeout value allows operations to block indefinitely. Negative timeout values have the same effect.
 * @param mode optional timeout mode to set:

`"b"`
block timeout. Specifies the upper limit on the amount of time LuaSocket can be blocked by the operating system while waiting for completion of any single I/O operation. This is the default mode;
`"t"`
total timeout. Specifies the upper limit on the amount of time LuaSocket can block a Lua script before returning from a call.

 */
settimeout(value: number, mode?: string): void;
}
class unconnected {
/**
 * Closes a UDP object. The internal socket used by the object is closed and the local address to which the object was bound is made available to other applications. No further operations (except for further calls to the close method) are allowed on a closed socket.
⚠ It is important to close all used sockets once they are not needed, since, in many systems, each socket uses a file descriptor, which are limited system resources. Garbage-collected objects are automatically closed before destruction, though.
 */
close(): void;
/**
 * Gets an option value from the UDP object. See unconnected:setoption for description of the option names and values.
 * @param option the name of the option to get:

`"dontroute"`
`"broadcast"`
`"reuseaddr"`
`"reuseport"`
`"ip-multicast-loop"`
`"ipv6-v6only"`
`"ip-multicast-if"`
`"ip-multicast-ttl"`
`"ip-add-membership"`
`"ip-drop-membership"`

 * @returns the option value, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
getoption(option: string): LuaMultiReturn<[any | undefined, string | undefined]>;
/**
 * Returns the local address information associated to the object.
⚠ UDP sockets are not bound to any address until the `setsockname` or the `sendto` method is called for the first time (in which case it is bound to an ephemeral port and the wild-card address).
 * @returns a string with local IP address, a number with the local port, and the family ("inet" or "inet6"). In case of error, the method returns `nil`.
 */
getsockname(): string;
/**
 * Receives a datagram from the UDP object. If the UDP object is connected, only datagrams coming from the peer are accepted. Otherwise, the returned datagram can come from any host.
 * @param size optional maximum size of the datagram to be retrieved. If there are more than size bytes available in the datagram, the excess bytes are discarded. If there are less then size bytes available in the current datagram, the available bytes are returned. If size is omitted, the maximum datagram size is used (which is currently limited by the implementation to 8192 bytes).
 * @returns the received datagram, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
receive(size?: number): LuaMultiReturn<[string | undefined, string | undefined]>;
/**
 * Works exactly as the receive method, except it returns the IP address and port as extra return values (and is therefore slightly less efficient).
 * @param size optional maximum size of the datagram to be retrieved.
 * @returns the received datagram, or `nil` in case of error. & the IP address, or the error message in case of error. & the port number, or `nil` in case of error.
 */
receivefrom(size?: number): LuaMultiReturn<[string | undefined, string, number | undefined]>;
/**
 * Sends a datagram to the specified IP address and port number.
⚠ In UDP, the send method never blocks and the only way it can fail is if the underlying transport layer refuses to send a message to the specified address (i.e. no interface accepts the address).
 * @param datagram a string with the datagram contents. The maximum datagram size for UDP is 64K minus IP layer overhead. However datagrams larger than the link layer packet size will be fragmented, which may deteriorate performance and/or reliability.
 * @param ip the IP address of the recipient. Host names are not allowed for performance reasons.
 * @param port the port number at the recipient.
 * @returns the value `1` on success, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
sendto(datagram: string, ip: string, port: number): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Sets options for the UDP object. Options are only needed by low-level or time-critical applications. You should only modify an option if you are sure you need it.
 * @param option the name of the option to set. The value is provided in the `value` parameter:

`"dontroute"`
Indicates that outgoing messages should bypass the standard routing facilities. Receives a boolean value;
`"broadcast"`
Requests permission to send broadcast datagrams on the socket. Receives a boolean value;
`"reuseaddr"`
Indicates that the rules used in validating addresses supplied in a `bind` call should allow reuse of local addresses. Receives a boolean value;
`"reuseport"`
Allows completely duplicate bindings by multiple processes if they all set `"reuseport"` before binding the port. Receives a boolean value;
`"ip-multicast-loop"`
Specifies whether or not a copy of an outgoing multicast datagram is delivered to the sending host as long as it is a member of the multicast group. Receives a boolean value;
`"ipv6-v6only"`
Specifies whether to restrict inet6 sockets to sending and receiving only IPv6 packets. Receive a boolean value;
`"ip-multicast-if"`
Sets the interface over which outgoing multicast datagrams are sent. Receives an IP address;
`"ip-multicast-ttl"`
Sets the Time To Live in the IP header for outgoing multicast datagrams. Receives a number;

`"ip-add-membership"`: Joins the multicast group specified. Receives a table with fields:

string `multiaddr` (IP address)
string `interface` (IP address)


"'ip-drop-membership"`
Leaves the multicast group specified. Receives a table with fields:


string `multiaddr` (IP address)
string `interface` (IP address)

 * @param value the value to set for the specified option.
 * @returns the value `1`, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
setoption(option: string, value?: any): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Changes the peer of a UDP object. This method turns an unconnected UDP object into a connected UDP object or vice versa.
For connected objects, outgoing datagrams will be sent to the specified peer, and datagrams received from other peers will be discarded by the OS. Connected UDP objects must use the `send` and `receive` methods instead of `sendto` and `receivefrom`.
⚠ Since the address of the peer does not have to be passed to and from the OS, the use of connected UDP objects is recommended when the same peer is used for several transmissions and can result in up to 30% performance gains.
 * @param address an IP address or a host name.
 * @param port the port number.
 * @returns the value `1` on success, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
setpeername(address: string, port: number): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Binds the UDP object to a local address.
⚠ This method can only be called before any datagram is sent through the UDP object, and only once. Otherwise, the system automatically binds the object to all local interfaces and chooses an ephemeral port as soon as the first datagram is sent. After the local address is set, either automatically by the system or explicitly by `setsockname`, it cannot be changed.
 * @param address an IP address or a host name. If address is "*" the system binds to all local interfaces using the constant `INADDR_ANY`.
 * @param port the port number. If port is 0, the system chooses an ephemeral port.
 * @returns the value `1` on success, or `nil` in case of error. & the error message, or `nil` if no error occurred.
 */
setsockname(address: string, port: number): LuaMultiReturn<[number | undefined, string | undefined]>;
/**
 * Changes the timeout values for the object. By default, the `receive` and `receivefrom`  operations are blocking. That is, any call to the methods will block indefinitely, until data arrives. The `settimeout` function defines a limit on the amount of time the functions can block. When a timeout is set and the specified amount of time has elapsed, the affected methods give up and fail with an error code.
⚠ In UDP, the `send` and `sendto` methods never block (the datagram is just passed to the OS and the call returns immediately). Therefore, the `settimeout` method has no effect on them.
 * @param value the amount of time to wait, in seconds. The `nil` timeout value allows operations to block indefinitely. Negative timeout values have the same effect.
 */
settimeout(value: number): void;
}
}declare namespace socket {
export type TCP = client & master & server;
export type TCPOptions = | 'ipv6-v6only'
		| 'keepalive'
		| 'linger'
		| 'reuseaddr'
		| 'tcp-nodelay';
export type TCPReceiveError = 'closed' | 'timeout';
export type TCPReceivePattern = number | '*a' | '*l';
export type TCPShutdownMode = 'both' | 'receive' | 'send';
export type TCPTimeoutMode = 'b' | 't';
export type UDP = connected & unconnected;
export type UDPOptions = | 'broadcast'
		| 'dontroute'
		| 'ip-add-membership'
		| 'ip-drop-membership'
		| 'ip-multicast-if'
		| 'ip-multicast-loop'
		| 'ip-multicast-ttl'
		| 'ipv6-v6only'
		| 'reuseaddr'
		| 'reuseport';
}

declare namespace sound {
/**
 * Get mixer group gain
 * @param group group name
 * @returns gain in [0 1] range ([-60dB.. 0dB])
 * @example Get the mixer group gain for the "soundfx" and convert to dB:
```lua
local gain = sound.get_group_gain("soundfx")
local gain_db = 60 * gain
```
 */
export function get_group_gain(group: string | hash): number;
/**
 * Get a mixer group name as a string.
⚠ This function is to be used for debugging and
development tooling only. The function does a reverse hash lookup, which does not
return a proper string value when the game is built in release mode.
 * @param group group name
 * @returns group name
 * @example Get the mixer group string names so we can show them as labels on a dev mixer overlay:
```lua
local groups = sound.get_groups()
for _,group in ipairs(groups) do
    local name = sound.get_group_name(group)
    msg.post("/mixer_overlay#gui", "set_mixer_label", { group = group, label = name})
end
```
 */
export function get_group_name(group: string | hash): string;
/**
 * Get a table of all mixer group names (hashes).
 * @returns table of mixer group names
 * @example Get the mixer groups, set all gains to 0 except for "master" and "soundfx"
where gain is set to 1:
```lua
local groups = sound.get_groups()
for _,group in ipairs(groups) do
    if group == hash("master") or group == hash("soundfx") then
        sound.set_group_gain(group, 1)
    else
        sound.set_group_gain(group, 0)
    end
end
```
 */
export function get_groups(): hash[];
/**
 * Get peak value from mixer group.
⚠ Note that gain is in linear scale, between 0 and 1.
To get the dB value from the gain, use the formula `20 * log(gain)`.
Inversely, to find the linear value from a dB value, use the formula
`10db/20`.
Also note that the returned value might be an approximation and in particular
the effective window might be larger than specified.
 * @param group group name
 * @param window window length in seconds
 * @returns peak value for left channel & peak value for right channel
 * @example Get the peak gain from the "master" group and convert to dB for displaying:
```lua
local left_p, right_p = sound.get_peak("master", 0.1)
left_p_db = 20 * log(left_p)
right_p_db = 20 * log(right_p)
```
 */
export function get_peak(group: string | hash, window: number): LuaMultiReturn<[number, number]>;
/**
 * Get RMS (Root Mean Square) value from mixer group. This value is the
square root of the mean (average) value of the squared function of
the instantaneous values.
For instance: for a sinewave signal with a peak gain of -1.94 dB (0.8 linear),
the RMS is `0.8 × 1/sqrt(2)` which is about 0.566.
⚠ Note the returned value might be an approximation and in particular
the effective window might be larger than specified.
 * @param group group name
 * @param window window length in seconds
 * @returns RMS value for left channel & RMS value for right channel
 * @example Get the RMS from the "master" group where a mono -1.94 dB sinewave is playing:
```lua
local rms = sound.get_rms("master", 0.1) -- throw away right channel.
print(rms) --> 0.56555819511414
```
 */
export function get_rms(group: string | hash, window: number): LuaMultiReturn<[number, number]>;
/**
 * Checks if background music is playing, e.g. from iTunes.
🍎🪟🐧🌎 On non mobile platforms,
this function always return `false`.
⚠🤖 On Android you can only get a correct reading
of this state if your game is not playing any sounds itself. This is a limitation
in the Android SDK. If your game is playing any sounds, even with a gain of zero, this
function will return `false`.
The best time to call this function is:

In the `init` function of your main collection script before any sounds are triggered
In a window listener callback when the window.WINDOW_EVENT_FOCUS_GAINED event is received

Both those times will give you a correct reading of the state even when your application is
swapped out and in while playing sounds and it works equally well on Android and iOS.
 * @returns `true` if music is playing, otherwise `false`.
 * @example If music is playing, mute "master":
```lua
if sound.is_music_playing() then
    -- mute "master"
    sound.set_group_gain("master", 0)
end
```
 */
export function is_music_playing(): boolean;
/**
 * Checks if a phone call is active. If there is an active phone call all
other sounds will be muted until the phone call is finished.
🍎🪟🐧🌎 On non mobile platforms,
this function always return `false`.
 * @returns `true` if there is an active phone call, `false` otherwise.
 * @example Test if a phone call is on-going:
```lua
if sound.is_phone_call_active() then
    -- do something sensible.
end
```
 */
export function is_phone_call_active(): boolean;
/**
 * Pause all active voices
 * @param url the sound that should pause
 * @param pause true if the sound should pause
 * @example Assuming the script belongs to an instance with a sound-component with id "sound", this will make the component pause all playing voices:
```lua
sound.pause("#sound", true)
```
 */
export function pause(url: string | hash | url, pause: boolean): void;
/**
 * Make the sound component play its sound. Multiple voices are supported. The limit is set to 32 voices per sound component.
⚠ A sound will continue to play even if the game object the sound component belonged to is deleted. You can call `sound.stop()` to stop the sound.
 * @param url the sound that should play
 * @param play_properties 
optional table with properties:
`delay`
number delay in seconds before the sound starts playing, default is 0.
`gain`
number sound gain between 0 and 1, default is 1. The final gain of the sound will be a combination of this gain, the group gain and the master gain.
`pan`
number sound pan between -1 and 1, default is 0. The final pan of the sound will be an addition of this pan and the sound pan.
`speed`
number sound speed where 1.0 is normal speed, 0.5 is half speed and 2.0 is double speed. The final speed of the sound will be a multiplication of this speed and the sound speed.
`start_time`
number start playback offset (seconds). Optional, mutually exclusive with `start_frame`.
`start_frame`
number start playback offset (frames/samples). Optional, mutually exclusive with `start_time`. If both are provided, `start_frame` is used.

 * @param complete_function function to call when the sound has finished playing or stopped manually via sound.stop.

`self`
object The current object.
`message_id`
hash The name of the completion message, which can be either `"sound_done"` if the sound has finished playing, or `"sound_stopped"` if it was stopped manually.
`message`
table Information about the completion:


number `play_id` - the sequential play identifier that was given by the sound.play function.


`sender`
url The invoker of the callback: the sound component.

 * @returns The identifier for the sound voice
 * @example Assuming the script belongs to an instance with a sound-component with id "sound", this will make the component play its sound after 1 second:
```lua
sound.play("#sound", { delay = 1, gain = 0.9, pan = -1.0 } )
```

Using the callback argument, you can chain several sounds together:
```lua
local function sound_done(self, message_id, message, sender)
  -- play 'boom' sound fx when the countdown has completed
  if message_id == hash("sound_done") and message.play_id == self.countdown_id then
    sound.play("#boom", nil, sound_done)
  end
end

function init(self)
  self.countdown_id = sound.play("#countdown", nil, sound_done)
end
```
 */
export function play(url: string | hash | url, play_properties?: { delay?: number; gain?: number; pan?: number; speed?: number; start_time?: number; start_frame?: number }, complete_function?: (this: any, message_id: hash, message: { play_id: number }, sender: url,) => void): number;
/**
 * Set gain on all active playing voices of a sound.
 * @param url the sound to set the gain of
 * @param gain sound gain between 0 and 1 [-60dB .. 0dB]. The final gain of the sound will be a combination of this gain, the group gain and the master gain.
 * @example Assuming the script belongs to an instance with a sound-component with id "sound", this will set the gain to 0.9
```lua
sound.set_gain("#sound", 0.9)
```
 */
export function set_gain(url: string | hash | url, gain?: number): void;
/**
 * Set mixer group gain
 * @param group group name
 * @param gain gain in range [0..1] mapped to [0 .. -60dB]
 * @example Set mixer group gain on the "soundfx" group to 50% (-30dB):
```lua
sound.set_group_gain("soundfx", 0.5)
```
 */
export function set_group_gain(group: string | hash, gain: number): void;
/**
 * Set panning on all active playing voices of a sound.
The valid range is from -1.0 to 1.0, representing -45 degrees left, to +45 degrees right.
 * @param url the sound to set the panning value to
 * @param pan sound panning between -1.0 and 1.0
 * @example Assuming the script belongs to an instance with a sound-component with id "sound", this will set the gain to 0.5
```lua
sound.set_pan("#sound", 0.5) -- pan to the right
```
 */
export function set_pan(url: string | hash | url, pan?: number): void;
/**
 * Stop playing all active voices or just one voice if `play_id` provided
 * @param url the sound component that should stop
 * @param stop_properties 
optional table with properties:
`play_id`
number the sequential play identifier that should be stopped (was given by the sound.play() function)

 * @example Assuming the script belongs to an instance with a sound-component with id "sound", this will make the component stop all playing voices:
```lua
sound.stop("#sound")
local id = sound.play("#sound")
sound.stop("#sound", {play_id = id})
```
 */
export function stop(url: string | hash | url, stop_properties?: { play_id: ReturnType<typeof play> }): void;
}

declare namespace sprite {
/**
 * Play an animation on a sprite component from its tile set
An optional completion callback function can be provided that will be called when
the animation has completed playing. If no function is provided,
a animation_done message is sent to the script that started the animation.
 * @param url the sprite that should play the animation
 * @param id hashed id of the animation to play
 * @param complete_function function to call when the animation has completed.

`self`
object The current object.
`message_id`
hash The name of the completion message, `"animation_done"`.
`message`
table Information about the completion:


number `current_tile` - the current tile of the sprite.
hash `id` - id of the animation that was completed.


`sender`
url The invoker of the callback: the sprite component.

 * @param play_properties optional table with properties:

`offset`
number the normalized initial value of the animation cursor when the animation starts playing.
`playback_rate`
number the rate with which the animation will be played. Must be positive.

 * @example The following examples assumes that the model has id "sprite".
How to play the "jump" animation followed by the "run" animation:
```lua
local function anim_done(self, message_id, message, sender)
  if message_id == hash("animation_done") then
    if message.id == hash("jump") then
      -- jump animation done, chain with "run"
      sprite.play_flipbook(url, "run")
    end
  end
end
```

```lua
function init(self)
  local url = msg.url("#sprite")
  sprite.play_flipbook(url, "jump", anim_done)
end
```
 */
export function play_flipbook(url: string | hash | url, id: string | hash, complete_function?: (this: any, message_id: hash, message: { current_tile: number; id: hash }, sender: url,) => void, play_properties?: { offset?: number; playback_rate?: number }): void;
/**
 * Sets horizontal flipping of the provided sprite's animations.
The sprite is identified by its URL.
If the currently playing animation is flipped by default, flipping it again will make it appear like the original texture.
 * @param url the sprite that should flip its animations
 * @param flip `true` if the sprite should flip its animations, `false` if not
 * @example How to flip a sprite so it faces the horizontal movement:
```lua
function update(self, dt)
  -- calculate self.velocity somehow
  sprite.set_hflip("#sprite", self.velocity.x < 0)
end
```

It is assumed that the sprite component has id "sprite" and that the original animations faces right.
 */
export function set_hflip(url: string | hash | url, flip: boolean): void;
/**
 * Sets vertical flipping of the provided sprite's animations.
The sprite is identified by its URL.
If the currently playing animation is flipped by default, flipping it again will make it appear like the original texture.
 * @param url the sprite that should flip its animations
 * @param flip `true` if the sprite should flip its animations, `false` if not
 * @example How to flip a sprite in a game which negates gravity as a game mechanic:
```lua
function update(self, dt)
  -- calculate self.up_side_down somehow, then:
  sprite.set_vflip("#sprite", self.up_side_down)
end
```

It is assumed that the sprite component has id "sprite" and that the original animations are up-right.
 */
export function set_vflip(url: string | hash | url, flip: boolean): void;
}

declare namespace sys {
/**
 * network connected through other, non cellular, connection
 */
export const NETWORK_CONNECTED: number;
/**
 * network connected through mobile cellular
 */
export const NETWORK_CONNECTED_CELLULAR: number;
/**
 * no network connection found
 */
export const NETWORK_DISCONNECTED: number;
/**
 * an asyncronous request is unable to read the resource
 */
export const REQUEST_STATUS_ERROR_IO_ERROR: number;
/**
 * an asyncronous request is unable to locate the resource
 */
export const REQUEST_STATUS_ERROR_NOT_FOUND: number;
/**
 * an asyncronous request has finished successfully
 */
export const REQUEST_STATUS_FINISHED: number;
/**
 * This function will raise a Lua error if an error occurs while deserializing the buffer.
 * @param buffer buffer to deserialize from
 * @example Deserialize a lua table that was previously serialized:
```lua
local buffer = sys.serialize(my_table)
local table = sys.deserialize(buffer)
```
 */
export function deserialize(buffer: string): unknown;
/**
 * Check if a path exists
Good for checking if a file exists before loading a large file
 * @param path path to check
 * @returns `true` if the path exists, `false` otherwise
 * @example Load data but return nil if path didn't exist
```lua
if not sys.exists(path) then
    return nil
end
return sys.load(path) -- returns {} if it failed
```
 */
export function exists(path: string): boolean;
/**
 * Terminates the game application and reports the specified `code` to the OS.
 * @param code exit code to report to the OS, 0 means clean exit
 * @example This examples demonstrates how to exit the application when some kind of quit messages is received (maybe from gui or similar):
```lua
function on_message(self, message_id, message, sender)
    if message_id == hash("quit") then
        sys.exit(0)
    end
end
```
 */
export function exit(code: number): void;
/**
 * Returns a table with application information for the requested app.
 On iOS, the `app_string` is an url scheme for the app that is queried. Your
game needs to list the schemes that are queried in an `LSApplicationQueriesSchemes` array
in a custom "Info.plist".
🤖 On Android, the `app_string` is the package identifier for the app.
 * @param app_string platform specific string with application package or query, see above for details.
 * @example Check if twitter is installed:
```lua
sysinfo = sys.get_sys_info()
twitter = {}

if sysinfo.system_name == "Android" then
  twitter = sys.get_application_info("com.twitter.android")
elseif sysinfo.system_name == "iPhone OS" then
  twitter = sys.get_application_info("twitter:")
end

if twitter.installed then
  -- twitter is installed!
end
```

 Info.plist for the iOS app needs to list the schemes that are queried:
```lua
...
<key>LSApplicationQueriesSchemes</key>
 <array>
   <string>twitter</string>
 </array>
...
```
 */
export function get_application_info(app_string: string): {installed: boolean};
/**
 * The path from which the application is run.
This function will raise a Lua error if unable to get the application support path.
 * @returns path to application executable
 * @example Find a path where we can store data (the example path is on the macOS platform):
```lua
-- macOS: /Applications/my_game.app
local application_path = sys.get_application_path()
print(application_path) --> /Applications/my_game.app

-- Windows: C:\Program Files\my_game\my_game.exe
print(application_path) --> C:\Program Files\my_game

-- Linux: /home/foobar/my_game/my_game
print(application_path) --> /home/foobar/my_game

-- Android package name: com.foobar.my_game
print(application_path) --> /data/user/0/com.foobar.my_game

-- iOS: my_game.app
print(application_path) --> /var/containers/Bundle/Applications/123456AB-78CD-90DE-12345678ABCD/my_game.app

-- HTML5: http://www.foobar.com/my_game/
print(application_path) --> http://www.foobar.com/my_game
```
 */
export function get_application_path(): string;
/**
 * Get boolean config value from the game.project configuration file with optional default value
 * @param key key to get value for. The syntax is SECTION.KEY
 * @param default_value (optional) default value to return if the value does not exist
 * @returns config value as a boolean. default_value if the config key does not exist. false if no default value was supplied.
 * @example Get user config value
```lua
local vsync = sys.get_config_boolean("display.vsync", false)
```
 */
export function get_config_boolean(key: string, default_value?: boolean): boolean;
/**
 * Get integer config value from the game.project configuration file with optional default value
 * @param key key to get value for. The syntax is SECTION.KEY
 * @param default_value (optional) default value to return if the value does not exist
 * @returns config value as an integer. default_value if the config key does not exist. 0 if no default value was supplied.
 * @example Get user config value
```lua
local speed = sys.get_config_int("my_game.speed", 20) -- with default value
```

```lua
local testmode = sys.get_config_int("my_game.testmode") -- without default value
if testmode ~= nil then
    -- do stuff
end
```
 */
export function get_config_int(key: string, default_value?: number): number;
/**
 * Get number config value from the game.project configuration file with optional default value
 * @param key key to get value for. The syntax is SECTION.KEY
 * @param default_value (optional) default value to return if the value does not exist
 * @returns config value as an number. default_value if the config key does not exist. 0 if no default value was supplied.
 * @example Get user config value
```lua
local speed = sys.get_config_number("my_game.speed", 20.0)
```
 */
export function get_config_number(key: string, default_value?: number): number;
/**
 * Get string config value from the game.project configuration file with optional default value
 * @param key key to get value for. The syntax is SECTION.KEY
 * @param default_value (optional) default value to return if the value does not exist
 * @returns config value as a string. default_value if the config key does not exist. nil if no default value was supplied.
 * @example Get user config value
```lua
local text = sys.get_config_string("my_game.text", "default text"))
```

Start the engine with a bootstrap config override and add a custom config value
```lua
$ dmengine --config=bootstrap.main_collection=/mytest.collectionc --config=mygame.testmode=1
```

Read the custom config value from the command line
```lua
local testmode = sys.get_config_int("mygame.testmode")
```
 */
export function get_config_string(key: string, default_value?: string): string;
/**
 *  🤖 Returns the current network connectivity status
on mobile platforms.
On desktop, this function always return `sys.NETWORK_CONNECTED`.
 * @returns network connectivity status:

`sys.NETWORK_DISCONNECTED` (no network connection is found)
`sys.NETWORK_CONNECTED_CELLULAR` (connected through mobile cellular)
`sys.NETWORK_CONNECTED` (otherwise, Wifi)

 * @example Check if we are connected through a cellular connection
```lua
if (sys.NETWORK_CONNECTED_CELLULAR == sys.get_connectivity()) then
  print("Connected via cellular, avoid downloading big files!")
end
```
 */
export function get_connectivity(): number;
/**
 * Returns a table with engine information.
 * @returns table with engine information
 * @example How to retrieve engine information:
```lua
-- Update version text label so our testers know what version we're running
local engine_info = sys.get_engine_info()
local version_str = "Defold " .. engine_info.version .. "\n" .. engine_info.version_sha1
gui.set_text(gui.get_node("version"), version_str)
```
 */
export function get_engine_info(): {version: string, version_sha1: string, is_debug: boolean};
/**
 * Create a path to the host device for unit testing
Useful for saving logs etc during development
 * @param filename file to read from
 * @returns the path prefixed with the proper host mount
 * @example Save data on the host
```lua
local host_path = sys.get_host_path("logs/test.txt")
sys.save(host_path, mytable)
```

Load data from the host
```lua
local host_path = sys.get_host_path("logs/test.txt")
local table = sys.load(host_path)
```
 */
export function get_host_path(filename: string): string;
/**
 * Returns an array of tables with information on network interfaces.
 * @example How to get the IP address of interface "en0":
```lua
ifaddrs = sys.get_ifaddrs()
for _,interface in ipairs(ifaddrs) do
  if interface.name == "en0" then
    local ip = interface.address
  end
end
```
 */
export function get_ifaddrs(): { name: string, address: string | undefined, mac: string | undefined, up: boolean, running: boolean }[];
/**
 * The save-file path is operating system specific and is typically located under the user's home directory.
This function will raise a Lua error if unable to get the save file path.
 * @param application_id user defined id of the application, which helps define the location of the save-file
 * @param file_name file-name to get path for
 * @returns path to save-file
 * @example Find a path where we can store data:
```lua
local my_file_path = sys.get_save_file("my_game", "my_file")
-- macOS: /Users/foobar/Library/Application Support/my_game/my_file
print(my_file_path) --> /Users/foobar/Library/Application Support/my_game/my_file

-- Windows: C:\Users\foobar\AppData\Roaming\my_game\my_file
print(my_file_path) --> C:\Users\foobar\AppData\Roaming\my_game\my_file

-- Linux: $XDG_DATA_HOME/my_game/my_file or /home/foobar/.my_game/my_file
-- Linux: Defaults to /home/foobar/.local/share/my_game/my_file if neither exist.
print(my_file_path) --> /home/foobar/.local/share/my_game/my_file

-- Android package name: com.foobar.packagename
print(my_file_path) --> /data/data/0/com.foobar.packagename/files/my_file

-- iOS: my_game.app
print(my_file_path) --> /var/mobile/Containers/Data/Application/123456AB-78CD-90DE-12345678ABCD/my_game/my_file

-- HTML5 path inside the IndexedDB: /data/.my_game/my_file or /.my_game/my_file
print(my_file_path) --> /data/.my_game/my_file
```
 */
export function get_save_file(application_id: string, file_name: string): string;
/**
 * Returns a table with system information.
 * @param options optional options table
- ignore_secure boolean this flag ignores values might be secured by OS e.g. `device_ident`
 * @returns table with system information
 * @example How to get system information:
```lua
local info = sys.get_sys_info()
if info.system_name == "HTML5" then
  -- We are running in a browser.
end
```
 */
export function get_sys_info(options?: { ignore_secure: boolean }): {device_model?: string, manufacturer?: string, system_name: string, system_version: string, api_version: string, language: string, device_language: string, territory: string, gmt_offset: number, device_ident?: string, user_agent?: string};
/**
 * If the file exists, it must have been created by `sys.save` to be loaded.
This function will raise a Lua error if an error occurs while loading the file.
 * @param filename file to read from
 * @example Load data that was previously saved, e.g. an earlier game session:
```lua
local my_file_path = sys.get_save_file("my_game", "my_file")
local my_table = sys.load(my_file_path)
if not next(my_table) then
  -- empty table
end
```
 */
export function load(filename: string): unknown;
/**
 * The sys.load_buffer function will first try to load the resource
from any of the mounted resource locations and return the data if
any matching entries found. If not, the path will be tried
as is from the primary disk on the device.
In order for the engine to include custom resources in the build process, you need
to specify them in the "custom_resources" key in your "game.project" settings file.
You can specify single resource files or directories. If a directory is included
in the resource list, all files and directories in that directory is recursively
included:
For example "main/data/,assets/level_data.json".
 * @param path the path to load the buffer from
 * @returns the buffer with data
 * @example Load binary data from a custom project resource:
```lua
local my_buffer = sys.load_buffer("/assets/my_level_data.bin")
local data_str = buffer.get_bytes(my_buffer, "data")
local has_my_header = string.sub(data_str,1,6) == "D3F0LD"
```

Load binary data from non-custom resource files on disk:
```lua
local asset_1 = sys.load_buffer("folder_next_to_binary/my_level_asset.txt")
local asset_2 = sys.load_buffer("/my/absolute/path")
```
 */
export function load_buffer(path: string): buffer;
/**
 * The sys.load_buffer function will first try to load the resource
from any of the mounted resource locations and return the data if
any matching entries found. If not, the path will be tried
as is from the primary disk on the device.
In order for the engine to include custom resources in the build process, you need
to specify them in the "custom_resources" key in your "game.project" settings file.
You can specify single resource files or directories. If a directory is included
in the resource list, all files and directories in that directory is recursively
included:
For example "main/data/,assets/level_data.json".
Note that issuing multiple requests of the same resource will yield
individual buffers per request. There is no implic caching of the buffers
based on request path.
 * @param path the path to load the buffer from
 * @param status_callback A status callback that will be invoked when a request has been handled, or an error occured. The result is a table containing:

`status`
number The status of the request, supported values are:


`resource.REQUEST_STATUS_FINISHED`
`resource.REQUEST_STATUS_ERROR_IO_ERROR`
`resource.REQUEST_STATUS_ERROR_NOT_FOUND`


`buffer`
buffer If the request was successfull, this will contain the request payload in a buffer object, and nil otherwise. Make sure to check the status before doing anything with the buffer value!

 * @returns a handle to the request
 * @example Load binary data from a custom project resource and update a texture resource:
```lua
function my_callback(self, request_id, result)
  if result.status == resource.REQUEST_STATUS_FINISHED then
     resource.set_texture("/my_texture", { ... }, result.buf)
  end
end

local my_request = sys.load_buffer_async("/assets/my_level_data.bin", my_callback)
```

Load binary data from non-custom resource files on disk:
```lua
function my_callback(self, request_id, result)
  if result.status ~= sys.REQUEST_STATUS_FINISHED then
    -- uh oh! File could not be found, do something graceful
  elseif request_id == self.first_asset then
    -- result.buffer contains data from my_level_asset.bin
  elif request_id == self.second_asset then
    -- result.buffer contains data from 'my_level.bin'
  end
end

function init(self)
  self.first_asset = hash("folder_next_to_binary/my_level_asset.bin")
  self.second_asset = hash("/some_absolute_path/my_level.bin")
  self.first_request = sys.load_buffer_async(self.first_asset, my_callback)
  self.second_request = sys.load_buffer_async(self.second_asset, my_callback)
end
```
 */
export function load_buffer_async(path: string, status_callback: (this: any, request_id: number, result: { status: number; buffer: buffer | undefined },) => void): number;
/**
 * Loads a custom resource. Specify the full filename of the resource that you want
to load. When loaded, the file data is returned as a string.
If loading fails, the function returns `nil` plus the error message.
In order for the engine to include custom resources in the build process, you need
to specify them in the "custom_resources" key in your "game.project" settings file.
You can specify single resource files or directories. If a directory is included
in the resource list, all files and directories in that directory is recursively
included:
For example "main/data/,assets/level_data.json".
 * @param filename resource to load, full path
 * @example ```lua
-- Load level data into a string
local data, error = sys.load_resource("/assets/level_data.json")
-- Decode json string to a Lua table
if data then
  local data_table = json.decode(data)
  pprint(data_table)
else
  print(error)
end
```
 */
export function load_resource(filename: string): LuaMultiReturn<[string | undefined, string | undefined]>;
/**
 * Open URL in default application, typically a browser
 * @param url url to open
 * @param attributes table with attributes
`target`
- string 🌎: Optional. Specifies the target attribute or the name of the window. The following values are supported:
- `_self` - (default value) URL replaces the current page.
- `_blank` - URL is loaded into a new window, or tab.
- `_parent` - URL is loaded into the parent frame.
- `_top` - URL replaces any framesets that may be loaded.
- `name` - The name of the window (Note: the name does not specify the title of the new window).
 * @returns a boolean indicating if the url could be opened or not
 * @example Open an URL:
```lua
local success = sys.open_url("http://www.defold.com", {target = "_blank"})
if not success then
  -- could not open the url...
end
```
 */
export function open_url(url: string, attributes?: { target?: string }): boolean;
/**
 * Reboots the game engine with a specified set of arguments.
Arguments will be translated into command line arguments. Calling reboot
function is equivalent to starting the engine with the same arguments.
On startup the engine reads configuration from "game.project" in the
project root.
 * @param arg1 argument 1
 * @param arg2 argument 2
 * @param arg3 argument 3
 * @param arg4 argument 4
 * @param arg5 argument 5
 * @param arg6 argument 6
 * @example How to reboot engine with a specific bootstrap collection.
```lua
local arg1 = '--config=bootstrap.main_collection=/my.collectionc'
local arg2 = 'build/game.projectc'
sys.reboot(arg1, arg2)
```
 */
export function reboot(arg1?: string, arg2?: string, arg3?: string, arg4?: string, arg5?: string, arg6?: string): void;
/**
 * The table can later be loaded by `sys.load`.
Use `sys.get_save_file` to obtain a valid location for the file.
Internally, this function uses a workspace buffer sized output file sized 512kb.
This size reflects the output file size which must not exceed this limit.
Additionally, the total number of rows that any one table may contain is limited to 65536
(i.e. a 16 bit range). When tables are used to represent arrays, the values of
keys are permitted to fall within a 32 bit range, supporting sparse arrays, however
the limit on the total number of rows remains in effect.
This function will raise a Lua error if an error occurs while saving the table.
 * @param filename file to write to
 * @param table lua table to save
 * @example Save data:
```lua
local my_table = {}
table.insert(my_table, "my_value")
local my_file_path = sys.get_save_file("my_game", "my_file")
sys.save(my_file_path, my_table)
```
 */
export function save(filename: string, table: object): void;
/**
 * The buffer can later deserialized by `sys.deserialize`.
This function has all the same limitations as `sys.save`.
This function will raise a Lua error if an error occurs while serializing the table.
 * @param table lua table to serialize
 * @returns serialized data buffer
 * @example Serialize table:
```lua
local my_table = {}
table.insert(my_table, "my_value")
local buffer = sys.serialize(my_table)
```
 */
export function serialize(table: object): string;
/**
 * Sets the host that is used to check for network connectivity against.
 * @param host hostname to check against
 * @example ```lua
sys.set_connectivity_host("www.google.com")
```
 */
export function set_connectivity_host(host: string): void;
/**
 * Enables engine throttling.
 * @param enable true if throttling should be enabled
 * @param cooldown the time period to do update + render for (seconds)
 * @example Disable throttling
```lua
sys.set_engine_throttle(false)
```

Enable throttling
```lua
sys.set_engine_throttle(true, 1.5)
```
 */
export function set_engine_throttle(enable: boolean, cooldown: number): void;
/**
 * Set the Lua error handler function.
The error handler is a function which is called whenever a lua runtime error occurs.
 * @param error_handler the function to be called on error

`source`
string The runtime context of the error. Currently, this is always `"lua"`.
`message`
string The source file, line number and error message.
`traceback`
string The stack traceback.

 * @example Install error handler that just prints the errors
```lua
local function my_error_handler(source, message, traceback)
  print(source)    --> lua
  print(message)   --> main/my.script:10: attempt to perform arithmetic on a string value
  print(traceback) --> stack traceback:
                   -->         main/test.script:10: in function 'boom'
                   -->         main/test.script:15: in function <main/my.script:13>
end

local function boom()
  return 10 + "string"
end

function init(self)
  sys.set_error_handler(my_error_handler)
  boom()
end
```
 */
export function set_error_handler(error_handler: (source: string, message: string, traceback: string,) => void): void;
/**
 * Disables rendering
 * @param enable true if throttling should be enabled
 * @example Disable rendering
```lua
sys.set_render_enable(false)
```
 */
export function set_render_enable(enable: boolean): void;
/**
 * Set game update-frequency (frame cap). This option is equivalent to `display.update_frequency` in
the "game.project" settings but set in run-time. If `Vsync` checked in "game.project", the rate will
be clamped to a swap interval that matches any detected main monitor refresh rate. If `Vsync` is
unchecked the engine will try to respect the rate in software using timers. There is no
guarantee that the frame cap will be achieved depending on platform specifics and hardware settings.
 * @param frequency target frequency. 60 for 60 fps
 * @example Setting the update frequency to 60 frames per second
```lua
sys.set_update_frequency(60)
```
 */
export function set_update_frequency(frequency: number): void;
/**
 * Set the vsync swap interval. The interval with which to swap the front and back buffers
in sync with vertical blanks (v-blank), the hardware event where the screen image is updated
with data from the front buffer. A value of 1 swaps the buffers at every v-blank, a value of
2 swaps the buffers every other v-blank and so on. A value of 0 disables waiting for v-blank
before swapping the buffers. Default value is 1.
When setting the swap interval to 0 and having `vsync` disabled in
"game.project", the engine will try to respect the set frame cap value from
"game.project" in software instead.
This setting may be overridden by driver settings.
 * @param swap_interval target swap interval.
 * @example Setting the swap intervall to swap every v-blank
```lua
sys.set_vsync_swap_interval(1)
```
 */
export function set_vsync_swap_interval(swap_interval: number): void;
}

declare namespace tilemap {
/**
 * flip tile horizontally
 */
export const H_FLIP: number;
/**
 * rotate tile 180 degrees clockwise
 */
export const ROTATE_180: number;
/**
 * rotate tile 270 degrees clockwise
 */
export const ROTATE_270: number;
/**
 * rotate tile 90 degrees clockwise
 */
export const ROTATE_90: number;
/**
 * flip tile vertically
 */
export const V_FLIP: number;
/**
 * Get the bounds for a tile map. This function returns multiple values:
The lower left corner index x and y coordinates (1-indexed),
the tile map width and the tile map height.
The resulting values take all tile map layers into account, meaning that
the bounds are calculated as if all layers were collapsed into one.
 * @param url the tile map
 * @returns x coordinate of the bottom left corner & y coordinate of the bottom left corner & number of columns (width) in the tile map & number of rows (height) in the tile map
 * @example ```lua
-- get the level bounds.
local x, y, w, h = tilemap.get_bounds("/level#tilemap")
```
 */
export function get_bounds(url: string | hash | url): LuaMultiReturn<[number, number, number, number]>;
/**
 * Get the tile set at the specified position in the tilemap.
The position is identified by the tile index starting at origin
with index 1, 1. (see tilemap.set_tile())
Which tile map and layer to query is identified by the URL and the
layer name parameters.
 * @param url the tile map
 * @param layer name of the layer for the tile
 * @param x x-coordinate of the tile
 * @param y y-coordinate of the tile
 * @returns index of the tile
 * @example ```lua
-- get the tile under the player.
local tileno = tilemap.get_tile("/level#tilemap", "foreground", self.player_x, self.player_y)
```
 */
export function get_tile(url: string | hash | url, layer: string | hash, x: number, y: number): number;
/**
 * Get the tile information at the specified position in the tilemap.
The position is identified by the tile index starting at origin
with index 1, 1. (see tilemap.set_tile())
Which tile map and layer to query is identified by the URL and the
layer name parameters.
 * @param url the tile map
 * @param layer name of the layer for the tile
 * @param x x-coordinate of the tile
 * @param y y-coordinate of the tile
 * @example ```lua
-- get the tile under the player.
local tile_info = tilemap.get_tile_info("/level#tilemap", "foreground", self.player_x, self.player_y)
pprint(tile_info)
-- {
--    index = 0,
--    h_flip = false,
--    v_flip = true,
--    rotate_90 = false
-- }
```
 */
export function get_tile_info(url: string | hash | url, layer: string | hash, x: number, y: number): {index: number, h_flip: boolean, v_flip: boolean, rotate_90: boolean};
/**
 * Retrieves all the tiles for the specified layer in the tilemap.
It returns a table of rows where the keys are the
tile positions (see tilemap.get_bounds()).
You can iterate it using `tiles[row_index][column_index]`.
 * @param url the tilemap
 * @param layer the name of the layer for the tiles
 * @example ```lua
local left, bottom, columns_count, rows_count = tilemap.get_bounds("#tilemap")
local tiles = tilemap.get_tiles("#tilemap", "layer")
local tile, count = 0, 0
for row_index = bottom, bottom + rows_count - 1 do
    for column_index = left, left + columns_count - 1 do
        tile = tiles[row_index][column_index]
        count = count + 1
    end
end
```
 */
export function get_tiles(url: string | hash | url, layer: string | hash): { [key:number]: { [key:number]: number } };
/**
 * Replace a tile in a tile map with a new tile.
The coordinates of the tiles are indexed so that the "first" tile just
above and to the right of origin has coordinates 1,1.
Tiles to the left of and below origin are indexed 0, -1, -2 and so forth.

+-------+-------+------+------+
|  0,3  |  1,3  | 2,3  | 3,3  |
+-------+-------+------+------+
|  0,2  |  1,2  | 2,2  | 3,2  |
+-------+-------+------+------+
|  0,1  |  1,1  | 2,1  | 3,1  |
+-------O-------+------+------+
|  0,0  |  1,0  | 2,0  | 3,0  |
+-------+-------+------+------+


The coordinates must be within the bounds of the tile map as it were created.
That is, it is not possible to extend the size of a tile map by setting tiles outside the edges.
To clear a tile, set the tile to number 0. Which tile map and layer to manipulate is identified by the URL and the layer name parameters.
Transform bitmask is arithmetic sum of one or both FLIP constants (`tilemap.H_FLIP`, `tilemap.V_FLIP`) and/or one of ROTATION constants
(`tilemap.ROTATE_90`, `tilemap.ROTATE_180`, `tilemap.ROTATE_270`).
Flip always applies before rotation (clockwise).
 * @param url the tile map
 * @param layer name of the layer for the tile
 * @param x x-coordinate of the tile
 * @param y y-coordinate of the tile
 * @param tile index of new tile to set. 0 resets the cell
 * @param transform_bitmask optional flip and/or rotation should be applied to the tile
 * @example ```lua
-- Clear the tile under the player.
tilemap.set_tile("/level#tilemap", "foreground", self.player_x, self.player_y, 0)

-- Set tile with different combination of flip and rotation
tilemap.set_tile("#tilemap", "layer1", x, y, 0, tilemap.H_FLIP + tilemap.V_FLIP + tilemap.ROTATE_90)
tilemap.set_tile("#tilemap", "layer1", x, y, 0, tilemap.H_FLIP + tilemap.ROTATE_270)
tilemap.set_tile("#tilemap", "layer1", x, y, 0, tilemap.V_FLIP + tilemap.H_FLIP)
tilemap.set_tile("#tilemap", "layer1", x, y, 0, tilemap.ROTATE_180)
```
 */
export function set_tile(url: string | hash | url, layer: string | hash, x: number, y: number, tile: number, transform_bitmask?: number): void;
/**
 * Sets the visibility of the tilemap layer
 * @param url the tile map
 * @param layer name of the layer for the tile
 * @param visible should the layer be visible
 * @example ```lua
-- Disable rendering of the layer
tilemap.set_visible("/level#tilemap", "foreground", false)
```
 */
export function set_visible(url: string | hash | url, layer: string | hash, visible: boolean): void;
}

declare namespace timer {
/**
 * Indicates an invalid timer handle
 */
export const INVALID_TIMER_HANDLE: number;
/**
 * You may cancel a timer from inside a timer callback.
Cancelling a timer that is already executed or cancelled is safe.
 * @param handle the timer handle returned by timer.delay()
 * @returns if the timer was active, false if the timer is already cancelled / complete
 * @example ```lua
self.handle = timer.delay(1, true, function() print("print every second") end)
...
local result = timer.cancel(self.handle)
if not result then
   print("the timer is already cancelled")
end
```
 */
export function cancel(handle: number): boolean;
/**
 * Adds a timer and returns a unique handle.
You may create more timers from inside a timer callback.
Using a delay of 0 will result in a timer that triggers at the next frame just before
script update functions.
If you want a timer that triggers on each frame, set delay to 0.0f and repeat to true.
Timers created within a script will automatically die when the script is deleted.
 * @param delay time interval in seconds
 * @param repeating true = repeat timer until cancel, false = one-shot timer
 * @param callback timer callback function

`self`
object The current object
`handle`
number The handle of the timer
`time_elapsed`
number The elapsed time - on first trigger it is time since timer.delay call, otherwise time since last trigger

 * @returns identifier for the create timer, returns timer.INVALID_TIMER_HANDLE if the timer can not be created
 * @example A simple one-shot timer
```lua
timer.delay(1, false, function() print("print in one second") end)
```

Repetitive timer which canceled after 10 calls
```lua
local function call_every_second(self, handle, time_elapsed)
  self.counter = self.counter + 1
  print("Call #", self.counter)
  if self.counter == 10 then
    timer.cancel(handle) -- cancel timer after 10 calls
  end
end

self.counter = 0
timer.delay(1, true, call_every_second)
```
 */
export function delay(delay: number, repeating: boolean, callback: (this: any, handle: number, time_elapsed: number,) => void): number;
/**
 * Get information about timer.
 * @param handle the timer handle returned by timer.delay()
 * @returns table or `nil` if timer is cancelled/completed. table with data in the following fields:

`time_remaining`
number Time remaining until the next time a timer.delay() fires.
`delay`
number Time interval.
`repeating`
boolean true = repeat timer until cancel, false = one-shot timer.

 * @example ```lua
self.handle = timer.delay(1, true, function() print("print every second") end)
...
local result = timer.get_info(self.handle)
if not result then
   print("the timer is already cancelled or complete")
else
   pprint(result) -- delay, time_remaining, repeating
end
```
 */
export function get_info(handle: number): undefined | { time_remaining: number, delay: number, repeating: boolean };
/**
 * Manual triggering a callback for a timer.
 * @param handle the timer handle returned by timer.delay()
 * @returns if the timer was active, false if the timer is already cancelled / complete
 * @example ```lua
self.handle = timer.delay(1, true, function() print("print every second or manually by timer.trigger") end)
...
local result = timer.trigger(self.handle)
if not result then
   print("the timer is already cancelled or complete")
end
```
 */
export function trigger(handle: number): boolean;
}

declare namespace types {
/**
 * Check if passed type is hash.
 * @param var_ Variable to check type
 */
export function is_hash(var_: any): var_ is hash;
/**
 * Check if passed type is matrix4.
 * @param var_ Variable to check type
 */
export function is_matrix4(var_: any): var_ is vmath.matrix4;
/**
 * Check if passed type is quaternion.
 * @param var_ Variable to check type
 */
export function is_quat(var_: any): var_ is vmath.quaternion;
/**
 * Check if passed type is URL.
 * @param var_ Variable to check type
 */
export function is_url(var_: any): var_ is url;
/**
 * Check if passed type is vector.
 * @param var_ Variable to check type
 */
export function is_vector(var_: any): var_ is vmath.vector;
/**
 * Check if passed type is vector3.
 * @param var_ Variable to check type
 */
export function is_vector3(var_: any): var_ is vmath.vector3;
/**
 * Check if passed type is vector4.
 * @param var_ Variable to check type
 */
export function is_vector4(var_: any): var_ is vmath.vector4;
}

declare namespace vmath {
/**
 * Clamp input value to be in range of [min, max]. In case if input value has vector3|vector4 type
return new vector3|vector4 with clamped value at every vector's element.
Min/max arguments can be vector3|vector4. In that case clamp excuted per every vector's element
 * @param value Input value or vector of values
 * @param min Min value(s) border
 * @param max Max value(s) border
 * @returns Clamped value or vector
 * @example ```lua
local value1 = 56
print(vmath.clamp(value1, 89, 134)) -> 89
local v2 = vmath.vector3(190, 190, -10)
print(vmath.clamp(v2, -50, 150)) -> vmath.vector3(150, 150, -10)
local v3 = vmath.vector4(30, -30, 45, 1)
print(vmath.clamp(v3, 0, 20)) -> vmath.vector4(20, 0, 20, 1)

local min_v = vmath.vector4(0, -10, -10, 1)
print(vmath.clamp(v3, min_v, 20)) -> vmath.vector4(20, -10, 20, 1)
```
 */
export function clamp(value: number | vmath.vector3 | vmath.vector4, min: number | vmath.vector3 | vmath.vector4, max: number | vmath.vector3 | vmath.vector4): number | vmath.vector3 | vmath.vector4;
/**
 * Calculates the conjugate of a quaternion. The result is a
quaternion with the same magnitudes but with the sign of
the imaginary (vector) parts changed:
`q* = [w, -v]`
 * @param q1 quaternion of which to calculate the conjugate
 * @returns the conjugate
 * @example ```lua
local quat = vmath.quat(1, 2, 3, 4)
print(vmath.conj(quat)) --> vmath.quat(-1, -2, -3, 4)
```
 */
export function conj(q1: vmath.quaternion): vmath.quaternion;
/**
 * Given two linearly independent vectors P and Q, the cross product,
P &#x00D7; Q, is a vector that is perpendicular to both P and Q and
therefore normal to the plane containing them.
If the two vectors have the same direction (or have the exact
opposite direction from one another, i.e. are not linearly independent)
or if either one has zero length, then their cross product is zero.
 * @param v1 first vector
 * @param v2 second vector
 * @returns a new vector representing the cross product
 * @example ```lua
local vec1 = vmath.vector3(1, 0, 0)
local vec2 = vmath.vector3(0, 1, 0)
print(vmath.cross(vec1, vec2)) --> vmath.vector3(0, 0, 1)
local vec3 = vmath.vector3(-1, 0, 0)
print(vmath.cross(vec1, vec3)) --> vmath.vector3(0, -0, 0)
```
 */
export function cross(v1: vmath.vector3, v2: vmath.vector3): vmath.vector3;
/**
 * The returned value is a scalar defined as:
`P &#x22C5; Q = |P| |Q| cos &#x03B8;`
where &#x03B8; is the angle between the vectors P and Q.

If the dot product is positive then the angle between the vectors is below 90 degrees.
If the dot product is zero the vectors are perpendicular (at right-angles to each other).
If the dot product is negative then the angle between the vectors is more than 90 degrees.

 * @param v1 first vector
 * @param v2 second vector
 * @returns dot product
 * @example ```lua
if vmath.dot(vector1, vector2) == 0 then
    -- The two vectors are perpendicular (at right-angles to each other)
    ...
end
```
 */
export function dot(v1: vmath.vector3 | vmath.vector4, v2: vmath.vector3 | vmath.vector4): number;
/**
 * Converts euler angles (x, y, z) in degrees into a quaternion
The error is guaranteed to be less than 0.001.
If the first argument is vector3, its values are used as x, y, z angles.
 * @param x rotation around x-axis in degrees or vector3 with euler angles in degrees
 * @param y rotation around y-axis in degrees
 * @param z rotation around z-axis in degrees
 * @returns quaternion describing an equivalent rotation (231 (YZX) rotation sequence)
 * @example ```lua
local q = vmath.euler_to_quat(0, 45, 90)
print(q) --> vmath.quat(0.27059805393219, 0.27059805393219, 0.65328145027161, 0.65328145027161)

local v = vmath.vector3(0, 0, 90)
print(vmath.euler_to_quat(v)) --> vmath.quat(0, 0, 0.70710676908493, 0.70710676908493)
```
 */
export function euler_to_quat(x: number | vmath.vector3, y: number, z: number): vmath.quaternion;
/**
 * The resulting matrix is the inverse of the supplied matrix.
⚠ For ortho-normal matrices, e.g. regular object transformation,
use `vmath.ortho_inv()` instead.
The specialized inverse for ortho-normalized matrices is much faster
than the general inverse.
 * @param m1 matrix to invert
 * @returns inverse of the supplied matrix
 * @example ```lua
local mat1 = vmath.matrix4_rotation_z(3.141592653)
local mat2 = vmath.inv(mat1)
-- M * inv(M) = identity matrix
print(mat1 * mat2) --> vmath.matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
```
 */
export function inv(m1: vmath.matrix4): vmath.matrix4;
/**
 * Returns the length of the supplied vector or quaternion.
If you are comparing the lengths of vectors or quaternions, you should compare
the length squared instead as it is slightly more efficient to calculate
(it eliminates a square root calculation).
 * @param v value of which to calculate the length
 * @returns length
 * @example ```lua
if vmath.length(self.velocity) < max_velocity then
    -- The speed (velocity vector) is below max.

    -- TODO: max_velocity can be expressed as squared
    -- so we can compare with length_sqr() instead.
    ...
end
```
 */
export function length(v: vmath.vector3 | vmath.vector4 | vmath.quaternion): number;
/**
 * Returns the squared length of the supplied vector or quaternion.
 * @param v value of which to calculate the squared length
 * @returns squared length
 * @example ```lua
if vmath.length_sqr(vector1) < vmath.length_sqr(vector2) then
    -- Vector 1 has less magnitude than vector 2
    ...
end
```
 */
export function length_sqr(v: vmath.vector3 | vmath.vector4 | vmath.quaternion): number;
/**
 * Linearly interpolate between two vectors. The function
treats the vectors as positions and interpolates between
the positions in a straight line. Lerp is useful to describe
transitions from one place to another over time.
⚠ The function does not clamp t between 0 and 1.
 * @param t interpolation parameter, 0-1
 * @param v1 vector to lerp from
 * @param v2 vector to lerp to
 * @returns the lerped vector
 * @example ```lua
function init(self)
    self.t = 0
end

function update(self, dt)
    self.t = self.t + dt
    if self.t <= 1 then
        local startpos = vmath.vector3(0, 600, 0)
        local endpos = vmath.vector3(600, 0, 0)
        local pos = vmath.lerp(self.t, startpos, endpos)
        go.set_position(pos, "go")
    end
end
```
 */
export function lerp(t: number, v1: vmath.vector3 | vmath.vector4, v2: vmath.vector3 | vmath.vector4): vmath.vector3 | vmath.vector4;
/**
 * Linearly interpolate between two quaternions. Linear
interpolation of rotations are only useful for small
rotations. For interpolations of arbitrary rotations,
vmath.slerp yields much better results.
⚠ The function does not clamp t between 0 and 1.
 * @param t interpolation parameter, 0-1
 * @param q1 quaternion to lerp from
 * @param q2 quaternion to lerp to
 * @returns the lerped quaternion
 * @example ```lua
function init(self)
    self.t = 0
end

function update(self, dt)
    self.t = self.t + dt
    if self.t <= 1 then
        local startrot = vmath.quat_rotation_z(0)
        local endrot = vmath.quat_rotation_z(3.141592653)
        local rot = vmath.lerp(self.t, startrot, endrot)
        go.set_rotation(rot, "go")
    end
end
```
 */
export function lerp(t: number, q1: vmath.quaternion, q2: vmath.quaternion): vmath.quaternion;
/**
 * Linearly interpolate between two values. Lerp is useful
to describe transitions from one value to another over time.
⚠ The function does not clamp t between 0 and 1.
 * @param t interpolation parameter, 0-1
 * @param n1 number to lerp from
 * @param n2 number to lerp to
 * @returns the lerped number
 * @example ```lua
function init(self)
    self.t = 0
end

function update(self, dt)
    self.t = self.t + dt
    if self.t <= 1 then
        local startx = 0
        local endx = 600
        local x = vmath.lerp(self.t, startx, endx)
        go.set_position(vmath.vector3(x, 100, 0), "go")
    end
end
```
 */
export function lerp(t: number, n1: number, n2: number): number;
/**
 * The resulting identity matrix describes a transform with
no translation or rotation.
 * @returns identity matrix
 * @example ```lua
local mat = vmath.matrix4()
print(mat) --> vmath.matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
-- get column 0:
print(mat.c0) --> vmath.vector4(1, 0, 0, 0)
-- get the value in row 3 and column 2:
print(mat.m32) --> 0
```
 */
export function matrix4(): vmath.matrix4;
/**
 * Creates a new matrix with all components set to the
corresponding values from the supplied matrix. I.e.
the function creates a copy of the given matrix.
 * @param m1 existing matrix
 * @returns matrix which is a copy of the specified matrix
 * @example ```lua
local mat1 = vmath.matrix4_rotation_x(3.141592653)
local mat2 = vmath.matrix4(mat1)
if mat1 == mat2 then
    -- yes, they are equal
    print(mat2) --> vmath.matrix4(1, 0, 0, 0, 0, -1, 8.7422776573476e-08, 0, 0, -8.7422776573476e-08, -1, 0, 0, 0, 0, 1)
end
```
 */
export function matrix4(m1: vmath.matrix4): vmath.matrix4;
/**
 * The resulting matrix describes a rotation around the axis by the specified angle.
 * @param v axis
 * @param angle angle in radians
 * @returns matrix represented by axis and angle
 * @example ```lua
local vec = vmath.vector4(1, 1, 0, 0)
local axis = vmath.vector3(0, 0, 1) -- z-axis
local mat = vmath.matrix4_axis_angle(axis, 3.141592653)
print(mat * vec) --> vmath.vector4(-0.99999994039536, -1.0000001192093, 0, 0)
```
 */
export function matrix4_axis_angle(v: vmath.vector3, angle: number): vmath.matrix4;
/**
 * Creates a new matrix constructed from separate
translation vector, roation quaternion and scale vector
 * @param translation translation
 * @param rotation rotation
 * @param scale scale
 * @returns new matrix4
 * @example ```lua
local translation = vmath.vector3(103, -95, 14)
local quat = vmath.quat(1, 2, 3, 4)
local scale = vmath.vector3(1, 0.5, 0.5)
local result = vmath.matrix4_compose(translation, quat, scale)
print(result) --> vmath.matrix4(-25, -10, 11, 103, 28, -9.5, 2, -95, -10, 10, -4.5, 14, 0, 0, 0, 1)
```
 */
export function matrix4_compose(translation: vmath.vector3 | vmath.vector4, rotation: vmath.quaternion, scale: vmath.vector3): vmath.matrix4;
/**
 * Constructs a frustum matrix from the given values. The left, right,
top and bottom coordinates of the view cone are expressed as distances
from the center of the near clipping plane. The near and far coordinates
are expressed as distances from the tip of the view frustum cone.
 * @param left coordinate for left clipping plane
 * @param right coordinate for right clipping plane
 * @param bottom coordinate for bottom clipping plane
 * @param top coordinate for top clipping plane
 * @param near coordinate for near clipping plane
 * @param far coordinate for far clipping plane
 * @returns matrix representing the frustum
 * @example ```lua
-- Construct a projection frustum with a vertical and horizontal
-- FOV of 45 degrees. Useful for rendering a square view.
local proj = vmath.matrix4_frustum(-1, 1, -1, 1, 1, 1000)
render.set_projection(proj)
```
 */
export function matrix4_frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): vmath.matrix4;
/**
 * The resulting matrix is created from the supplied look-at parameters.
This is useful for constructing a view matrix for a camera or
rendering in general.
 * @param eye eye position
 * @param look_at look-at position
 * @param up up vector
 * @returns look-at matrix
 * @example ```lua
-- Set up a perspective camera at z 100 with 45 degrees (pi/2) FOV
-- Aspect ratio 4:3
local eye = vmath.vector3(0, 0, 100)
local look_at = vmath.vector3(0, 0, 0)
local up = vmath.vector3(0, 1, 0)
local view = vmath.matrix4_look_at(eye, look_at, up)
render.set_view(view)
local proj = vmath.matrix4_perspective(3.141592/2, 4/3, 1, 1000)
render.set_projection(proj)
```
 */
export function matrix4_look_at(eye: vmath.vector3, look_at: vmath.vector3, up: vmath.vector3): vmath.matrix4;
/**
 * Creates an orthographic projection matrix.
This is useful to construct a projection matrix for a camera or rendering in general.
 * @param left coordinate for left clipping plane
 * @param right coordinate for right clipping plane
 * @param bottom coordinate for bottom clipping plane
 * @param top coordinate for top clipping plane
 * @param near coordinate for near clipping plane
 * @param far coordinate for far clipping plane
 * @returns orthographic projection matrix
 * @example ```lua
-- Set up an orthographic projection based on the width and height
-- of the game window.
local w = render.get_width()
local h = render.get_height()
local proj = vmath.matrix4_orthographic(- w / 2, w / 2, -h / 2, h / 2, -1000, 1000)
render.set_projection(proj)
```
 */
export function matrix4_orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): vmath.matrix4;
/**
 * Creates a perspective projection matrix.
This is useful to construct a projection matrix for a camera or rendering in general.
 * @param fov angle of the full vertical field of view in radians
 * @param aspect aspect ratio
 * @param near coordinate for near clipping plane
 * @param far coordinate for far clipping plane
 * @returns perspective projection matrix
 * @example ```lua
-- Set up a perspective camera at z 100 with 45 degrees (pi/2) FOV
-- Aspect ratio 4:3
local eye = vmath.vector3(0, 0, 100)
local look_at = vmath.vector3(0, 0, 0)
local up = vmath.vector3(0, 1, 0)
local view = vmath.matrix4_look_at(eye, look_at, up)
render.set_view(view)
local proj = vmath.matrix4_perspective(3.141592/2, 4/3, 1, 1000)
render.set_projection(proj)
```
 */
export function matrix4_perspective(fov: number, aspect: number, near: number, far: number): vmath.matrix4;
/**
 * The resulting matrix describes the same rotation as the quaternion, but does not have any translation (also like the quaternion).
 * @param q quaternion to create matrix from
 * @returns matrix represented by quaternion
 * @example ```lua
local vec = vmath.vector4(1, 1, 0, 0)
local quat = vmath.quat_rotation_z(3.141592653)
local mat = vmath.matrix4_quat(quat)
print(mat * vec) --> vmath.matrix4_frustum(-1, 1, -1, 1, 1, 1000)
```
 */
export function matrix4_quat(q: vmath.quaternion): vmath.matrix4;
/**
 * The resulting matrix describes a rotation around the x-axis
by the specified angle.
 * @param angle angle in radians around x-axis
 * @returns matrix from rotation around x-axis
 * @example ```lua
local vec = vmath.vector4(1, 1, 0, 0)
local mat = vmath.matrix4_rotation_x(3.141592653)
print(mat * vec) --> vmath.vector4(1, -1, -8.7422776573476e-08, 0)
```
 */
export function matrix4_rotation_x(angle: number): vmath.matrix4;
/**
 * The resulting matrix describes a rotation around the y-axis
by the specified angle.
 * @param angle angle in radians around y-axis
 * @returns matrix from rotation around y-axis
 * @example ```lua
local vec = vmath.vector4(1, 1, 0, 0)
local mat = vmath.matrix4_rotation_y(3.141592653)
print(mat * vec) --> vmath.vector4(-1, 1, 8.7422776573476e-08, 0)
```
 */
export function matrix4_rotation_y(angle: number): vmath.matrix4;
/**
 * The resulting matrix describes a rotation around the z-axis
by the specified angle.
 * @param angle angle in radians around z-axis
 * @returns matrix from rotation around z-axis
 * @example ```lua
local vec = vmath.vector4(1, 1, 0, 0)
local mat = vmath.matrix4_rotation_z(3.141592653)
print(mat * vec) --> vmath.vector4(-0.99999994039536, -1.0000001192093, 0, 0)
```
 */
export function matrix4_rotation_z(angle: number): vmath.matrix4;
/**
 * Creates a new matrix constructed from scale vector
 * @param scale scale
 * @returns new matrix4
 * @example ```lua
local scale = vmath.vector3(1, 0.5, 0.5)
local result = vmath.matrix4_scale(scale)
print(result) --> vmath.matrix4(1, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1)
```
 */
export function matrix4_scale(scale: vmath.vector3): vmath.matrix4;
/**
 * creates a new matrix4 from uniform scale
 * @param scale scale
 * @returns new matrix4
 * @example ```lua
local result = vmath.matrix4_scale(0.5)
print(result) --> vmath.matrix4(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1)
```
 */
export function matrix4_scale(scale: number): vmath.matrix4;
/**
 * Creates a new matrix4 from three scale components
 * @param scale_x scale along X axis
 * @param scale_y sclae along Y axis
 * @param scale_z scale along Z asis
 * @returns new matrix4
 * @example ```lua
local result = vmath.matrix4_scale(1, 0.5, 0.5)
print(result) --> vmath.matrix4(1, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1)
```
 */
export function matrix4_scale(scale_x: number, scale_y: number, scale_z: number): vmath.matrix4;
/**
 * The resulting matrix describes a translation of a point
in euclidean space.
 * @param position position vector to create matrix from
 * @returns matrix from the supplied position vector
 * @example ```lua
-- Set camera view from custom view and translation matrices
local mat_trans = vmath.matrix4_translation(vmath.vector3(0, 10, 100))
local mat_view  = vmath.matrix4_rotation_y(-3.141592/4)
render.set_view(mat_view * mat_trans)
```
 */
export function matrix4_translation(position: vmath.vector3 | vmath.vector4): vmath.matrix4;
/**
 * Performs an element wise multiplication between two vectors of the same type
The returned value is a vector defined as (e.g. for a vector3):
`v = vmath.mul_per_elem(a, b) = vmath.vector3(a.x * b.x, a.y * b.y, a.z * b.z)`
 * @param v1 first vector
 * @param v2 second vector
 * @returns multiplied vector
 * @example ```lua
local blend_color = vmath.mul_per_elem(color1, color2)
```
 */
export function mul_per_elem(v1: vmath.vector3 | vmath.vector4, v2: vmath.vector3 | vmath.vector4): vmath.vector3 | vmath.vector4;
/**
 * Normalizes a vector, i.e. returns a new vector with the same
direction as the input vector, but with length 1.
⚠ The length of the vector must be above 0, otherwise a
division-by-zero will occur.
 * @param v1 vector to normalize
 * @returns new normalized vector
 * @example ```lua
local vec = vmath.vector3(1, 2, 3)
local norm_vec = vmath.normalize(vec)
print(norm_vec) --> vmath.vector3(0.26726123690605, 0.5345224738121, 0.80178368091583)
print(vmath.length(norm_vec)) --> 0.99999994039536
```
 */
export function normalize(v1: vmath.vector3 | vmath.vector4 | vmath.quaternion): vmath.vector3 | vmath.vector4 | vmath.quaternion;
/**
 * The resulting matrix is the inverse of the supplied matrix.
The supplied matrix has to be an ortho-normal matrix, e.g.
describe a regular object transformation.
⚠ For matrices that are not ortho-normal
use the general inverse `vmath.inv()` instead.
 * @param m1 ortho-normalized matrix to invert
 * @returns inverse of the supplied matrix
 * @example ```lua
local mat1 = vmath.matrix4_rotation_z(3.141592653)
local mat2 = vmath.ortho_inv(mat1)
-- M * inv(M) = identity matrix
print(mat1 * mat2) --> vmath.matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
```
 */
export function ortho_inv(m1: vmath.matrix4): vmath.matrix4;
/**
 * Calculates the extent the projection of the first vector onto the second.
The returned value is a scalar p defined as:
`p = |P| cos &#x03B8; / |Q|`
where &#x03B8; is the angle between the vectors P and Q.
 * @param v1 vector to be projected on the second
 * @param v2 vector onto which the first will be projected, must not have zero length
 * @returns the projected extent of the first vector onto the second
 * @example ```lua
local v1 = vmath.vector3(1, 1, 0)
local v2 = vmath.vector3(2, 0, 0)
print(vmath.project(v1, v2)) --> 0.5
```
 */
export function project(v1: vmath.vector3, v2: vmath.vector3): number;
/**
 * Creates a new identity quaternion. The identity
quaternion is equal to:
`vmath.quat(0, 0, 0, 1)`
 * @returns new identity quaternion
 * @example ```lua
local quat = vmath.quat()
print(quat) --> vmath.quat(0, 0, 0, 1)
print(quat.w) --> 1
```
 */
export function quat(): vmath.quaternion;
/**
 * Creates a new quaternion with all components set to the
corresponding values from the supplied quaternion. I.e.
This function creates a copy of the given quaternion.
 * @param q1 existing quaternion
 * @returns new quaternion
 * @example ```lua
local quat1 = vmath.quat(1, 2, 3, 4)
local quat2 = vmath.quat(quat1)
if quat1 == quat2 then
    -- yes, they are equal
    print(quat2) --> vmath.quat(1, 2, 3, 4)
end
```
 */
export function quat(q1: vmath.quaternion): vmath.quaternion;
/**
 * Creates a new quaternion with the components set
according to the supplied parameter values.
 * @param x x coordinate
 * @param y y coordinate
 * @param z z coordinate
 * @param w w coordinate
 * @returns new quaternion
 * @example ```lua
local quat = vmath.quat(1, 2, 3, 4)
print(quat) --> vmath.quat(1, 2, 3, 4)
```
 */
export function quat(x: number, y: number, z: number, w: number): vmath.quaternion;
/**
 * The resulting quaternion describes a rotation of `angle`
radians around the axis described by the unit vector `v`.
 * @param v axis
 * @param angle angle
 * @returns quaternion representing the axis-angle rotation
 * @example ```lua
local axis = vmath.vector3(1, 0, 0)
local rot = vmath.quat_axis_angle(axis, 3.141592653)
local vec = vmath.vector3(1, 1, 0)
print(vmath.rotate(rot, vec)) --> vmath.vector3(1, -1, -8.7422776573476e-08)
```
 */
export function quat_axis_angle(v: vmath.vector3, angle: number): vmath.quaternion;
/**
 * The resulting quaternion describes the rotation from the
identity quaternion (no rotation) to the coordinate system
as described by the given x, y and z base unit vectors.
 * @param x x base vector
 * @param y y base vector
 * @param z z base vector
 * @returns quaternion representing the rotation of the specified base vectors
 * @example ```lua
-- Axis rotated 90 degrees around z.
local rot_x = vmath.vector3(0, -1, 0)
local rot_y = vmath.vector3(1, 0, 0)
local z = vmath.vector3(0, 0, 1)
local rot1 = vmath.quat_basis(rot_x, rot_y, z)
local rot2 = vmath.quat_from_to(vmath.vector3(0, 1, 0), vmath.vector3(1, 0, 0))
if rot1 == rot2 then
    -- These quaternions are equal!
    print(rot2) --> vmath.quat(0, 0, -0.70710676908493, 0.70710676908493)
end
```
 */
export function quat_basis(x: vmath.vector3, y: vmath.vector3, z: vmath.vector3): vmath.quaternion;
/**
 * The resulting quaternion describes the rotation that,
if applied to the first vector, would rotate the first
vector to the second. The two vectors must be unit
vectors (of length 1).
⚠ The result is undefined if the two vectors point in opposite directions
 * @param v1 first unit vector, before rotation
 * @param v2 second unit vector, after rotation
 * @returns quaternion representing the rotation from first to second vector
 * @example ```lua
local v1 = vmath.vector3(1, 0, 0)
local v2 = vmath.vector3(0, 1, 0)
local rot = vmath.quat_from_to(v1, v2)
print(vmath.rotate(rot, v1)) --> vmath.vector3(0, 0.99999994039536, 0)
```
 */
export function quat_from_to(v1: vmath.vector3, v2: vmath.vector3): vmath.quaternion;
/**
 * Creates a new quaternion with the components set
according to the supplied parameter values.
 * @param matrix source matrix4
 * @returns new quaternion
 */
export function quat_matrix4(matrix: vmath.matrix4): vmath.quaternion;
/**
 * The resulting quaternion describes a rotation of `angle`
radians around the x-axis.
 * @param angle angle in radians around x-axis
 * @returns quaternion representing the rotation around the x-axis
 * @example ```lua
local rot = vmath.quat_rotation_x(3.141592653)
local vec = vmath.vector3(1, 1, 0)
print(vmath.rotate(rot, vec)) --> vmath.vector3(1, -1, -8.7422776573476e-08)
```
 */
export function quat_rotation_x(angle: number): vmath.quaternion;
/**
 * The resulting quaternion describes a rotation of `angle`
radians around the y-axis.
 * @param angle angle in radians around y-axis
 * @returns quaternion representing the rotation around the y-axis
 * @example ```lua
local rot = vmath.quat_rotation_y(3.141592653)
local vec = vmath.vector3(1, 1, 0)
print(vmath.rotate(rot, vec)) --> vmath.vector3(-1, 1, 8.7422776573476e-08)
```
 */
export function quat_rotation_y(angle: number): vmath.quaternion;
/**
 * The resulting quaternion describes a rotation of `angle`
radians around the z-axis.
 * @param angle angle in radians around z-axis
 * @returns quaternion representing the rotation around the z-axis
 * @example ```lua
local rot = vmath.quat_rotation_z(3.141592653)
local vec = vmath.vector3(1, 1, 0)
print(vmath.rotate(rot, vec)) --> vmath.vector3(-0.99999988079071, -1, 0)
```
 */
export function quat_rotation_z(angle: number): vmath.quaternion;
/**
 * Converts a quaternion into euler angles (r0, r1, r2), based on YZX rotation order.
To handle gimbal lock (singularity at r1 ~ +/- 90 degrees), the cut off is at r0 = +/- 88.85 degrees, which snaps to +/- 90.
The provided quaternion is expected to be normalized.
The error is guaranteed to be less than +/- 0.02 degrees
 * @param q source quaternion
 * @returns euler angle x in degrees & euler angle y in degrees & euler angle z in degrees
 * @example ```lua
local q = vmath.quat_rotation_z(math.rad(90))
print(vmath.quat_to_euler(q)) --> 0 0 90

local q2 = vmath.quat_rotation_y(math.rad(45)) * vmath.quat_rotation_z(math.rad(90))
local v = vmath.vector3(vmath.quat_to_euler(q2))
print(v) --> vmath.vector3(0, 45, 90)
```
 */
export function quat_to_euler(q: vmath.quaternion): LuaMultiReturn<[number, number, number]>;
/**
 * Returns a new vector from the supplied vector that is
rotated by the rotation described by the supplied
quaternion.
 * @param q quaternion
 * @param v1 vector to rotate
 * @returns the rotated vector
 * @example ```lua
local vec = vmath.vector3(1, 1, 0)
local rot = vmath.quat_rotation_z(3.141592563)
print(vmath.rotate(rot, vec)) --> vmath.vector3(-1.0000002384186, -0.99999988079071, 0)
```
 */
export function rotate(q: vmath.quaternion, v1: vmath.vector3): vmath.vector3;
/**
 * Spherically interpolates between two vectors. The difference to
lerp is that slerp treats the vectors as directions instead of
positions in space.
The direction of the returned vector is interpolated by the angle
and the magnitude is interpolated between the magnitudes of the
from and to vectors.
⚠ Slerp is computationally more expensive than lerp.
The function does not clamp t between 0 and 1.
 * @param t interpolation parameter, 0-1
 * @param v1 vector to slerp from
 * @param v2 vector to slerp to
 * @returns the slerped vector
 * @example ```lua
function init(self)
    self.t = 0
end

function update(self, dt)
    self.t = self.t + dt
    if self.t <= 1 then
        local startpos = vmath.vector3(0, 600, 0)
        local endpos = vmath.vector3(600, 0, 0)
        local pos = vmath.slerp(self.t, startpos, endpos)
        go.set_position(pos, "go")
    end
end
```
 */
export function slerp(t: number, v1: vmath.vector3 | vmath.vector4, v2: vmath.vector3 | vmath.vector4): vmath.vector3 | vmath.vector4;
/**
 * Slerp travels the torque-minimal path maintaining constant
velocity, which means it travels along the straightest path along
the rounded surface of a sphere. Slerp is useful for interpolation
of rotations.
Slerp travels the torque-minimal path, which means it travels
along the straightest path the rounded surface of a sphere.
⚠ The function does not clamp t between 0 and 1.
 * @param t interpolation parameter, 0-1
 * @param q1 quaternion to slerp from
 * @param q2 quaternion to slerp to
 * @returns the slerped quaternion
 * @example ```lua
function init(self)
    self.t = 0
end

function update(self, dt)
    self.t = self.t + dt
    if self.t <= 1 then
        local startrot = vmath.quat_rotation_z(0)
        local endrot = vmath.quat_rotation_z(3.141592653)
        local rot = vmath.slerp(self.t, startrot, endrot)
        go.set_rotation(rot, "go")
    end
end
```
 */
export function slerp(t: number, q1: vmath.quaternion, q2: vmath.quaternion): vmath.quaternion;
/**
 * Creates a vector of arbitrary size. The vector is initialized
with numeric values from a table.
⚠ The table values are converted to floating point
values. If a value cannot be converted, a 0 is stored in that
value position in the vector.
 * @param t table of numbers
 * @example How to create a vector with custom data to be used for animation easing:
```lua
local values = { 0, 0.5, 0 }
local vec = vmath.vector(values)
print(vec) --> vmath.vector (size: 3)
print(vec[2]) --> 0.5
```
 */
export function vector(t: number[] | LuaSet<number>): vector;
/**
 * Creates a new zero vector with all components set to 0.
 * @returns new zero vector
 * @example ```lua
local vec = vmath.vector3()
pprint(vec) --> vmath.vector3(0, 0, 0)
print(vec.x) --> 0
```
 */
export function vector3(): vmath.vector3;
/**
 * Creates a new vector with all components set to the
supplied scalar value.
 * @param n scalar value to splat
 * @returns new vector
 * @example ```lua
local vec = vmath.vector3(1.0)
print(vec) --> vmath.vector3(1, 1, 1)
print(vec.x) --> 1
```
 */
export function vector3(n: number): vmath.vector3;
/**
 * Creates a new vector with all components set to the
corresponding values from the supplied vector. I.e.
This function creates a copy of the given vector.
 * @param v1 existing vector
 * @returns new vector
 * @example ```lua
local vec1 = vmath.vector3(1.0)
local vec2 = vmath.vector3(vec1)
if vec1 == vec2 then
    -- yes, they are equal
    print(vec2) --> vmath.vector3(1, 1, 1)
end
```
 */
export function vector3(v1: vmath.vector3): vmath.vector3;
/**
 * Creates a new vector with the components set to the
supplied values.
 * @param x x coordinate
 * @param y y coordinate
 * @param z z coordinate
 * @returns new vector
 * @example ```lua
local vec = vmath.vector3(1.0, 2.0, 3.0)
print(vec) --> vmath.vector3(1, 2, 3)
print(-vec) --> vmath.vector3(-1, -2, -3)
print(vec * 2) --> vmath.vector3(2, 4, 6)
print(vec + vmath.vector3(2.0)) --> vmath.vector3(3, 4, 5)
print(vec - vmath.vector3(2.0)) --> vmath.vector3(-1, 0, 1)
```
 */
export function vector3(x: number, y: number, z: number): vmath.vector3;
/**
 * Creates a new zero vector with all components set to 0.
 * @returns new zero vector
 * @example ```lua
local vec = vmath.vector4()
print(vec) --> vmath.vector4(0, 0, 0, 0)
print(vec.w) --> 0
```
 */
export function vector4(): vmath.vector4;
/**
 * Creates a new vector with all components set to the
supplied scalar value.
 * @param n scalar value to splat
 * @returns new vector
 * @example ```lua
local vec = vmath.vector4(1.0)
print(vec) --> vmath.vector4(1, 1, 1, 1)
print(vec.w) --> 1
```
 */
export function vector4(n: number): vmath.vector4;
/**
 * Creates a new vector with all components set to the
corresponding values from the supplied vector. I.e.
This function creates a copy of the given vector.
 * @param v1 existing vector
 * @returns new vector
 * @example ```lua
local vect1 = vmath.vector4(1.0)
local vect2 = vmath.vector4(vec1)
if vec1 == vec2 then
    -- yes, they are equal
    print(vec2) --> vmath.vector4(1, 1, 1, 1)
end
```
 */
export function vector4(v1: vmath.vector4): vmath.vector4;
/**
 * Creates a new vector with the components set to the
supplied values.
 * @param x x coordinate
 * @param y y coordinate
 * @param z z coordinate
 * @param w w coordinate
 * @returns new vector
 * @example ```lua
local vec = vmath.vector4(1.0, 2.0, 3.0, 4.0)
print(vec) --> vmath.vector4(1, 2, 3, 4)
print(-vec) --> vmath.vector4(-1, -2, -3, -4)
print(vec * 2) --> vmath.vector4(2, 4, 6, 8)
print(vec + vmath.vector4(2.0)) --> vmath.vector4(3, 4, 5, 6)
print(vec - vmath.vector4(2.0)) --> vmath.vector4(-1, 0, 1, 2)
```
 */
export function vector4(x: number, y: number, z: number, w: number): vmath.vector4;
}declare namespace vmath {
export function clamp(value: number, min: number | vmath.vector3 | vmath.vector4, max: number | vmath.vector3 | vmath.vector4): number;
export function clamp(value: vmath.vector3, min: number | vmath.vector3 | vmath.vector4, max: number | vmath.vector3 | vmath.vector4): vmath.vector3;
export function clamp(value: vmath.vector4, min: number | vmath.vector3 | vmath.vector4, max: number | vmath.vector3 | vmath.vector4): vmath.vector4;
export type matrix4 = number & {
		/**
			 * Multiplication Operator for Matrix4
			 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
			 */
		mul: LuaMultiplicationMethod<vmath.vector4, vmath.vector4> &
			LuaMultiplicationMethod<number, vmath.matrix4>;
		c0: vmath.vector4;
		c1: vmath.vector4;
		c2: vmath.vector4;
		c3: vmath.vector4;
		m00: number;
		m01: number;
		m02: number;
		m03: number;
		m10: number;
		m11: number;
		m12: number;
		m13: number;
		m20: number;
		m21: number;
		m22: number;
		m23: number;
		m30: number;
		m31: number;
		m32: number;
		m33: number;
	};
export function mul_per_elem(v1: vmath.vector3, v2: vmath.vector3): vmath.vector3;
export function mul_per_elem(v1: vmath.vector4, v2: vmath.vector4): vmath.vector4;
export function normalize(v1: vmath.vector3): vmath.vector3;
export function normalize(v1: vmath.vector4): vmath.vector4;
export function normalize(v1: vmath.quaternion): vmath.quaternion;
export function normalize(v1: vmath.vector): vmath.vector;
export type quaternion = number & {
		/**
			 * Multiplication Operator for Matrix4
			 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
			 */
		mul: LuaMultiplicationMethod<vmath.quaternion, vmath.quaternion>;
		x: number;
		y: number;
		z: number;
		w: number;
	};
export function slerp(t: number, v1: vmath.vector3, v2: vmath.vector3): vmath.vector3;
export function slerp(t: number, v1: vmath.vector4, v2: vmath.vector4): vmath.vector4;
export type vector = number & { [key: number]: number };
export type vector3 = number & {
		/**
		 * Addition Operator for Vector3
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		add: LuaAdditionMethod<vmath.vector3, vmath.vector3>;
		/**
		 * Subtraction Operator for Vector3
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		sub: LuaSubtractionMethod<vmath.vector3, vmath.vector3>;
		/**
		 * Multiplication Operator for Vector3
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		mul: LuaMultiplicationMethod<number, vmath.vector3>;
		/**
		 * Division Operator for Vector3
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		div: LuaDivisionMethod<number, vmath.vector3>;
		/**
		 * Negation Operator for Vector3
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		unm: LuaNegationMethod<vmath.vector3>;
		x: number;
		y: number;
		z: number;
	};
export type vector4 = number & {
		/**
		 * Addition Operator for Vector4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		add: LuaAdditionMethod<vmath.vector4, vmath.vector4>;
		/**
		 * Subtraction Operator for Vector4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		sub: LuaSubtractionMethod<vmath.vector4, vmath.vector4>;
		/**
		 * Multiplication Operator for Vector4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		mul: LuaMultiplicationMethod<number, vmath.vector4>;
		/**
		 * Division Operator for Vector4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		div: LuaDivisionMethod<number, vmath.vector4>;
		/**
		 * Negation Operator for Vector4
		 * @see {@link https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types|TSTL Docs}
		 */
		unm: LuaNegationMethod<vmath.vector4>;
		x: number;
		y: number;
		z: number;
		w: number;
	};
}

declare namespace window {
/**
 * Dimming mode is used to control whether or not a mobile device should dim the screen after a period without user interaction.
 */
export const DIMMING_OFF: number;
/**
 * Dimming mode is used to control whether or not a mobile device should dim the screen after a period without user interaction.
 */
export const DIMMING_ON: number;
/**
 * Dimming mode is used to control whether or not a mobile device should dim the screen after a period without user interaction.
This mode indicates that the dim mode can't be determined, or that the platform doesn't support dimming.
 */
export const DIMMING_UNKNOWN: number;
/**
 * 📱 🪟 🐧 This event is sent to a window event listener when the game window or app screen is
restored after being iconified.
 */
export const WINDOW_EVENT_DEICONIFIED: number;
/**
 * This event is sent to a window event listener when the game window or app screen has
gained focus.
This event is also sent at game startup and the engine gives focus to the game.
 */
export const WINDOW_EVENT_FOCUS_GAINED: number;
/**
 * This event is sent to a window event listener when the game window or app screen has lost focus.
 */
export const WINDOW_EVENT_FOCUS_LOST: number;
/**
 * 📱 🪟 🐧 This event is sent to a window event listener when the game window or app screen is
iconified (reduced to an application icon in a toolbar, application tray or similar).
 */
export const WINDOW_EVENT_ICONFIED: number;
/**
 * This event is sent to a window event listener when the game window or app screen is resized.
The new size is passed along in the data field to the event listener.
 */
export const WINDOW_EVENT_RESIZED: number;
/**
 *  🤖 Returns the current dimming mode set on a mobile device.
The dimming mode specifies whether or not a mobile device should dim the screen after a period without user interaction.
On platforms that does not support dimming, `window.DIMMING_UNKNOWN` is always returned.
 * @returns The mode for screen dimming

`window.DIMMING_UNKNOWN`
`window.DIMMING_ON`
`window.DIMMING_OFF`

 */
export function get_dim_mode(): number;
/**
 * This returns the content scale of the current display.
 * @returns The display scale
 */
export function get_display_scale(): number;
/**
 * This returns the current lock state of the mouse cursor
 * @returns The lock state
 */
export function get_mouse_lock(): boolean;
/**
 * This returns the safe area rectangle (x, y, width, height) and the inset
values relative to the window edges. On platforms without a safe area,
this returns the full window size and zero insets.
 * @returns safe area data

`safe_area`
table table containing these keys:


number `x`
number `y`
number `width`
number `height`
number `inset_left`
number `inset_top`
number `inset_right`
number `inset_bottom`

 */
export function get_safe_area(): {
						x: number,
						y: number,
						width: number,
						height: number,
						inset_left: number,
						inset_top: number,
						inset_right: number,
						inset_bottom: number,
						};
/**
 * This returns the current window size (width and height).
 * @returns The window width & The window height
 */
export function get_size(): LuaMultiReturn<[number, number]>;
/**
 *  🤖 Sets the dimming mode on a mobile device.
The dimming mode specifies whether or not a mobile device should dim the screen after a period without user interaction. The dimming mode will only affect the mobile device while the game is in focus on the device, but not when the game is running in the background.
This function has no effect on platforms that does not support dimming.
 * @param mode The mode for screen dimming

`window.DIMMING_ON`
`window.DIMMING_OFF`

 */
export function set_dim_mode(mode: number): void;
/**
 * Sets a window event listener. Only one window event listener can be set at a time.
 * @param callback A callback which receives info about window events. Pass an empty function or `nil` if you no longer wish to receive callbacks.

`self`
object The calling script
`event`
constant The type of event. Can be one of these:


`window.WINDOW_EVENT_FOCUS_LOST`
`window.WINDOW_EVENT_FOCUS_GAINED`
`window.WINDOW_EVENT_RESIZED`
`window.WINDOW_EVENT_ICONIFIED`
`window.WINDOW_EVENT_DEICONIFIED`


`data`
table The callback value `data` is a table which currently holds these values


number `width`: The width of a resize event. nil otherwise.
number `height`: The height of a resize event. nil otherwise.

 * @example ```lua
function window_callback(self, event, data)
    if event == window.WINDOW_EVENT_FOCUS_LOST then
        print("window.WINDOW_EVENT_FOCUS_LOST")
    elseif event == window.WINDOW_EVENT_FOCUS_GAINED then
        print("window.WINDOW_EVENT_FOCUS_GAINED")
    elseif event == window.WINDOW_EVENT_ICONFIED then
        print("window.WINDOW_EVENT_ICONFIED")
    elseif event == window.WINDOW_EVENT_DEICONIFIED then
        print("window.WINDOW_EVENT_DEICONIFIED")
    elseif event == window.WINDOW_EVENT_RESIZED then
        print("Window resized: ", data.width, data.height)
    end
end

function init(self)
    window.set_listener(window_callback)
end
```
 */
export function set_listener(callback: (this: any, event: number, data: { width?: number; height?: number },) => void): void;
/**
 * Set the locking state for current mouse cursor on a PC platform.
This function locks or unlocks the mouse cursor to the center point of the window. While the cursor is locked,
mouse position updates will still be sent to the scripts as usual.
 * @param flag The lock state for the mouse cursor
 */
export function set_mouse_lock(flag: boolean): void;
/**
 * Sets the window position.
 * @param x Horizontal position of window
 * @param y Vertical position of window
 */
export function set_position(x: number, y: number): void;
/**
 * Sets the window size. Works on desktop platforms only.
 * @param width Width of window
 * @param height Height of window
 */
export function set_size(width: number, height: number): void;
/**
 * Sets the window title. Works on desktop platforms.
 * @param title The title, encoded as UTF-8
 */
export function set_title(title: string): void;
}declare namespace window {
/**
 * Pass `undefined` if you no longer wish to receive callbacks.
 * @param callback
 */
export function set_listener(callback: undefined): void;
}

declare namespace zlib {
/**
 * A lua error is raised is on error
 * @param buf buffer to deflate
 * @returns deflated buffer
 * @example ```lua
local data = "This is a string with uncompressed data."
local compressed_data = zlib.deflate(data)
local s = ""
for c in string.gmatch(compressed_data, ".") do
    s = s .. '\\' .. string.byte(c)
end
print(s) --> \120\94\11\201\200\44\86\0\162\68\133\226\146\162 ...
```
 */
export function deflate(buf: string): string;
/**
 * A lua error is raised is on error
 * @param buf buffer to inflate
 * @returns inflated buffer
 * @example ```lua
local data = "\120\94\11\201\200\44\86\0\162\68\133\226\146\162\204\188\116\133\242\204\146\12\133\210\188\228\252\220\130\162\212\226\226\212\20\133\148\196\146\68\61\0\44\67\14\201"
local uncompressed_data = zlib.inflate(data)
print(uncompressed_data) --> This is a string with uncompressed data.
```
 */
export function inflate(buf: string): string;
}

