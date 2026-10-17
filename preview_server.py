import http.server, socketserver, webbrowser, threading, os

PORT=8000
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control","no-store, no-cache, must-revalidate, max-age=0")
        super().end_headers()

threading.Timer(0.7, lambda: webbrowser.open(f"http://localhost:{PORT}/index.html")).start()

with socketserver.TCPServer(("",PORT),Handler) as httpd:
    print(f"Portfolio preview: http://localhost:{PORT}/index.html")
    httpd.serve_forever()
