from mitmproxy.http import HTTPFlow, Request, Response
from mitmproxy.udp import UDPFlow, UDPMessage
import pathlib
import datetime
import json
import requests
import base64
import flask
from wsdecomp import handle_msg, dump_msg
from utils import slugify
from typing import Dict
import zlib
import etf

"""An addon using the abbreviated scripting syntax."""

def filter_for_hoyo(host):
    return 'hoyo' in host or 'yuanshen' in host or 'hk4e' in host

def filter_for_disco(host):
    return 'discord' in host

class DiscordGatewayDecoder:
    def __init__(self, key) -> None:
        self.buffer = bytearray()
        self.zlib = zlib.decompressobj()
        self.key = key
    def handle_raw_message(self, msg: bytes):
        ending = msg[-4:]

        if (ending == b"\x00\x00\xFF\xFF"):
            self.buffer.extend(msg)
            full_msg = bytes(self.buffer)
            self.buffer = bytearray()
            try:
                decompressed_msg = self.zlib.decompress(full_msg)

                #requests.post(url="http://0.0.0.0:51235/dmg", data=decompressed_msg)

            except Exception as e:
                client_discord_decoders.pop(self.key)
                print('Exception, could not decompress message buffer, self destroying...', e)
        else:
            self.buffer.extend(msg)

client_discord_decoders: Dict[str, DiscordGatewayDecoder] = {}

def capture_discord_gateway_message(client_key: str, msg: bytes):
    if (client_key not in client_discord_decoders):
        client_discord_decoders[client_key] = DiscordGatewayDecoder(client_key)
    
    client_discord_decoders[client_key].handle_raw_message(msg)

class DiscordSnoofington:
    def __init__(self):
        self.num = 0
        pathlib.Path('./dumps').mkdir(exist_ok=True)
    
    def request(self, flow: HTTPFlow):
        url = flow.request.url
        evil = '/science' in url or 'sentry.io' in url
        if (evil):
            print('Preventing evil request to: ', url)
            flow.kill()

    def websocket_message(self, flow: HTTPFlow):
        ws_msg = flow.websocket.messages[-1]

        if ('gateway.discord.gg' in flow.request.host):
            print('message metadata', '\t', flow.metadata)
            (ipstr, ipval) = flow.client_conn.peername
            websocket_key = flow.request.headers.get('Sec-WebSocket-Key')

            user_agent = flow.request.headers.get('User-Agent')
            if (type(user_agent) == type(b'\x00')):
                user_agent = user_agent.decode('utf-8')
            user_agent = user_agent.lower()

            decoder_key = f'{ipstr}_{websocket_key}'

            data = ws_msg.content

            if (not ws_msg.from_client):
                capture_discord_gateway_message(decoder_key, data)
                print('Capturing Discord Gateway Message ', decoder_key, list(client_discord_decoders.keys()))

addons = [DiscordSnoofington()]