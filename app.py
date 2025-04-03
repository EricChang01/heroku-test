from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='client/build', static_url_path='')

# API endpoint
@app.route('/api/hello')
def hello():
    return jsonify({'message': 'Hello from Flask backend!'})

# Serve React static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # If the file exists in the build directory, serve it.
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    # Otherwise, serve index.html (for React Router)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)