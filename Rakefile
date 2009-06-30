class File
  # string output from file
  def self.path_to_string(path)
    File.new(path).read
  end

  # saves a string to a specified file path
  def self.string_to_file(string, path)
    directory = File.dirname(path)
    FileUtils.mkdir_p directory unless File.directory?(directory)
    File.open(path, 'w') { |f| f << string }
  end
end

desc "Bundle files"
task :package do
  pwd = File.dirname(__FILE__)
  output = []
  ["jquery.fusebox", "jquery.fusebox.fn", "jquery.fusebox.container",
    "jquery.fusebox.bindings"].each do |file|
    output << File.path_to_string(File.join(pwd, "src", "#{file}.js"))
  end

  File.string_to_file(output.join("\n"), File.join(pwd, "jquery", "jquery.fusebox.js"))
end
