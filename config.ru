require 'rubygems'
require 'rack'
require 'rack/contrib'
require 'rack/trystatic'
require 'mime/types'

use Rack::Deflater
use Rack::ETag

$rootdir="site"

use Rack::TryStatic, 
    :root => $rootdir,                              # static files root dir
    :urls => %w[/],                                 # match all requests 
    :try => ['.html', 'index.html', '/index.html']  # try these postfixes sequentially

errorFile='site/404.html'
run lambda { [404, {
                "Last-Modified"  => File.mtime(errorFile).httpdate,
                "Content-Type"   => "text/html",
                "Content-Length" => File.size(errorFile).to_s
            }, File.read(errorFile)] }
