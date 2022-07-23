package com.rnmodule

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class RNModuleModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "RNModuleModule"
    }

    @ReactMethod
    fun run(name: String, promise: Promise) {
        promise.resolve("Hello, $name!")
    }
}
