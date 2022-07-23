
Pod::Spec.new do |s|
  s.name         = "RNModule"
  s.version      = "1.0.0"
  s.summary      = "RNModule"
  s.description  = <<-DESC
                  RNModule
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "dev.ghlee@gmail.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/leegeunhyeok/react-native-module.git", :tag => "master" }
  s.source_files  = "RNModule/**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"
end
