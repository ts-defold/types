/** @noSelfInFile */
/// <reference types="lua-types/5.1" />
/// <reference types="@typescript-to-lua/language-extensions" />

// DEFOLD. stable version 1.10.4 (1aafd0a262ff40214ed7f51302d92fa587c607ef)
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //


declare type hash = {
}

declare type url = {
	socket: hash,
	path: hash,
	fragment: hash,
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


declare namespace liveupdate {














	/**
	* Adds a resource mount to the resource system.
	* The mounts are persisted between sessions.
	* After the mount succeeded, the resources are available to load. (i.e. no reboot required)
	* @param name  Unique name of the mount
	* @param uri  The uri of the mount, including the scheme. Currently supported schemes are 'zip' and 'archive'.
	* @param priority  Priority of mount. Larger priority takes prescedence
	* @param callback  Callback after the asynchronous request completed
	* @return result  The result of the request
	*/
	export function add_mount(name: string, uri: string, priority: number, callback: any): number

	/**
	* Return a reference to the Manifest that is currently loaded.
	* @return manifest_reference  reference to the Manifest that is currently loaded
	*/
	export function get_current_manifest(): number

	/**
	* Get an array of the current mounts
	* This can be used to determine if a new mount is needed or not
	* @return mounts  Array of mounts
	*/
	export function get_mounts(): any

	/**
	* Is any liveupdate data mounted and currently in use?
	* This can be used to determine if a new manifest or zip file should be downloaded.
	* @return bool  true if a liveupdate archive (any format) has been loaded
	*/
	export function is_using_liveupdate_data(): boolean

	/**
	* Remove a mount the resource system.
	* The remaining mounts are persisted between sessions.
	* Removing a mount does not affect any loaded resources.
	* @param name  Unique name of the mount
	* @return result  The result of the call
	*/
	export function remove_mount(name: string): number

	/**
	* Stores a zip file and uses it for live update content. The contents of the
	* zip file will be verified against the manifest to ensure file integrity.
	* It is possible to opt out of the resource verification using an option passed
	* to this function.
	* The path is stored in the (internal) live update location.
	* @param path  the path to the original file on disc
	* @param callback  the callback function
executed after the storage has completed

`self`
The current object.
`status`
the status of the store operation (See liveupdate.store_manifest)

	* @param options  optional table with extra parameters. Supported entries:

`verify`: if archive should be verified as well as stored (defaults to true)

	*/
	export function store_archive(path: string, callback: any, options?: any): void

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


- `liveupdate.LIVEUPDATE_OK`
- `liveupdate.LIVEUPDATE_INVALID_RESOURCE`
- `liveupdate.LIVEUPDATE_VERSION_MISMATCH`
- `liveupdate.LIVEUPDATE_ENGINE_VERSION_MISMATCH`
- `liveupdate.LIVEUPDATE_SIGNATURE_MISMATCH`
- `liveupdate.LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH`
- `liveupdate.LIVEUPDATE_FORMAT_ERROR`

	*/
	export function store_manifest(manifest_buffer: string, callback: any): void

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
	export function store_resource(manifest_reference: number, data: string, hexdigest: string, callback: any): void

}
// =^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^= //

