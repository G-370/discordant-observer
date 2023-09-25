from mitmproxy.http import HTTPFlow, Request, Response
from mitmproxy.udp import UDPFlow, UDPMessage
import pathlib
import datetime
import json
import requests
import base64
from wsdecomp import handle_msg, dump_msg
from utils import slugify
from typing import Dict
import zlib

"""An addon using the abbreviated scripting syntax."""

def filter_for_hoyo(host):
    return 'hoyo' in host or 'yuanshen' in host or 'hk4e' in host

def filter_for_disco(host):
    return 'discord' in host

class DiscordGatewayDecoder:
    def __init__(self) -> None:
        self.buffer = bytearray()
        self.zlib = zlib.decompressobj()
    def handle_raw_message(self, msg: bytes):
        ending = msg[-4:]

        if (ending == b"\x00\x00\xFF\xFF"):
            self.buffer.extend(msg)
            full_msg = bytes(self.buffer)
            self.buffer = bytearray()

            jsonstr = self.zlib.decompress(full_msg)
            print('gayes!', jsonstr)
        else:
            self.buffer.extend(msg)

client_discord_decoders: Dict[str, DiscordGatewayDecoder] = {}

def capture_discord_gateway_message(client_key: str, msg: bytes):
    if (client_key not in client_discord_decoders):
        client_discord_decoders[client_key] = DiscordGatewayDecoder()
    
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
            (ipstr, ipval) = flow.client_conn.peername

            print(ws_msg.type)

            data = ws_msg.content
            capture_discord_gateway_message(ipstr, data)
            print('Capturing Discord Gateway Message')

addons = [DiscordSnoofington()]