import Foundation

@objc(RNModuleModule)
class RNModuleModule: NSObject {
  @objc
  func run(_ name: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve("Hello, '\(name)'!")
  }
}
