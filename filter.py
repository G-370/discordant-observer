from mitmproxy.http import HTTPFlow, Request, Response
from mitmproxy.udp import UDPFlow, UDPMessage
import pathlib
import datetime
import json
import base64
from wsdecomp import handle_msg, dump_msg
from utils import slugify
import zlib

"""An addon using the abbreviated scripting syntax."""

def filter_for_hoyo(host):
    return 'hoyo' in host or 'yuanshen' in host or 'hk4e' in host

def filter_for_disco(host):
    return 'discord' in host

class DiscordGatewayDecoder:
    def __init__(self) -> None:
        self.buffer = bytearray()
        self.zlib = zlib.decompressobj
    def handle_raw_message(self, msg: bytes):
        ending = msg[-4:]

        if (ending == b"\x00\x00\xFF\xFF"):
            self.buffer.extend(msg)
            full_msg = bytes(self.buffer)
            
        else:
            self.buffer.extend(msg)

client_discord_decoders = {}

class Hoyorun:
    def __init__(self):
        self.num = 0
        pathlib.Path('./dumps').mkdir(exist_ok=True)

    def dump(self, request: Request, response: Response):
        now = datetime.datetime.now().timestamp()
        dump_filename = slugify(str(now) + '/' + request.url)

        if (len(dump_filename) >= 100):
            dump_filename = slugify(str(now) + '/' + request.host)

        dump_fp = pathlib.Path('./dumps') / f'{dump_filename}.json'

        req_headers = dict(request.headers)
        resp_headers = dict(response.headers)
        
        req_content = {}
        try:
            req_content = request.json()
        except json.decoder.JSONDecodeError as exp:
            req_content = {
                '#error': 'NOT JSON',
                'val': base64.encodebytes(request.content).decode('utf-8')
            }
        except TypeError:
            req_content: {
                '#error': 'CONTENT UNAVAILABLE'
            }
        except Exception:
            req_content: {
                '#error': 'WHAT MANNER OF CONTENT IS THIS?'
            }

        resp_content = {}
        try:
            resp_content = response.json()
        except json.decoder.JSONDecodeError as exp:
            resp_content = {
                '#error': 'NOT JSON',
                'val': base64.encodebytes(response.content).decode('utf-8')
            }
        except TypeError:
            resp_content: {
                '#error': 'CONTENT UNAVAILABLE'
            }
        except Exception:
            req_content: {
                '#error': 'WHAT MANNER OF CONTENT IS THIS?'
            }

        dump_fp.write_text(json.dumps({
            'request': {
                'headers': req_headers,
                'content': req_content
            },
            'response': {
                'headers': resp_headers,
                'content': resp_content
            }
        }, indent=2))

    def response(self, flow: HTTPFlow):
        host = flow.request.host
        is_mihoyo = filter_for_hoyo(host)
        if (is_mihoyo):
            print('Hoyorun: ', flow.request.url)
    
    def udp_message(self, flow: UDPFlow): 
        print('udpump: ', flow.type, flow.metadata, flow.client_conn.peername)
    def udp_start(self, flow: UDPFlow):
        print('udp_start:', flow.type, flow.metadata, flow.client_conn.peername)
    def websocket_message(self, flow: HTTPFlow):
        ws_msg = flow.websocket.messages[-1]

        if (ws_msg.type == 'RECEIVE'):
            base64.b64decode(ws_msg.content)

        if ('gateway.discord.gg' in flow.request.host):
            print('Capturing Discord Gateway Message')
            print('\t flow.client_conn ', flow.client_conn.peername)

addons = [Hoyorun()]