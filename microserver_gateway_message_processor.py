import etf
import json

from flask import Flask, request, jsonify

app = Flask(__name__)

def decompress_dmg(decompressed_msg):
    try:
        print('jsonussy', decompressed_msg.decode('utf-8'))
    except Exception as e:
        print('not possible to decode decompressed message, must be using discord application')
        terms = etf.binary_to_term(decompressed_msg)

        cleaned = {etf.etf_json(name): etf.etf_json(val) for name, val in terms.items()}

        dumpty = json.dumps(cleaned, indent=True)
        print('did this sussy work?', dumpty)

@app.post("/dmg")
def add_country():
    if request.is_json:
        content_data = request.get_data()
        decompress_dmg(content_data)
        return 'OK'
    return {"error": "Request must be JSON"}, 415

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='51235', debug=True)