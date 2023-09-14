from mitmproxy.http import HTTPFlow, Request, Response
from mitmproxy.udp import UDPFlow, UDPMessage
import pathlib
import datetime
import re
import json
import base64

"""An addon using the abbreviated scripting syntax."""

def filter_for_hoyo(host):
    return 'hoyo' in host or 'yuanshen' in host or 'hk4e' in host

def filter_for_disco(host):
    return 'discord' in host

def slugify(s):
  s = s.lower().strip()
  s = re.sub(r'[^\w\s-]', '-', s)
  s = re.sub(r'[\s_-]+', '-', s)
  s = re.sub(r'^-+|-+$', '-', s)
  return s

class Hoyorun:
    def __init__(self):
        self.num = 0
        pathlib.Path('./dumps').mkdir(exist_ok=True)

    def dump(self, request: Request, response: Response):
        now = datetime.datetime.now().timestamp()
        dump_filename = slugify(str(now) + '/' + request.url)
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
            self.dump(flow.request, flow.response)

            # print('\t request headers')
            # for key in flow.request.headers:
            #     print(f'\t\t {key}: {flow.request.headers[key]}')
            # print('\t response headers')
            # for key in flow.response.headers:
            #     print(f'\t\t {key}: {flow.response.headers[key]}')
    
    def udp_message(self, flow: UDPFlow): 
        print('udpump: ', flow.type, flow.metadata, flow.client_conn.peername)
        pass

addons = [Hoyorun()]