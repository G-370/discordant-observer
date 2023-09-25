import etf
import json
import base64
import pymongo

from flask import Flask, request, jsonify

db = pymongo.MongoClient(host='autosystem', port=27027)
dsd_gateway = db.dsd_dmg
received_messages = dsd_gateway.received_messages

app = Flask(__name__)

def decompress_dmg(decompressed_msg):
    try:
        print('jsonussy', decompressed_msg.decode('utf-8'))
    except Exception as e:
        print('not possible to decode decompressed message, must be using discord application')
        terms = etf.binary_to_term(decompressed_msg)

        cleaned = {etf.etf_json(name): etf.etf_json(val) for name, val in terms.items()}

        received_messages.insert_one(cleaned)

        print('inserted one dmg')

@app.post("/dmg")
def add_country():
    content_data = request.get_data()
    decompress_dmg(content_data)
    return 'OK'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='51235', debug=True)