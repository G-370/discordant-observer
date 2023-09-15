import zlib
import pathlib
import datetime
import base64

from utils import slugify

_buffer: bytearray = bytearray()
_zlib = zlib.decompressobj()

def dump_msg(host, rawmsg: bytes):
    root = pathlib.Path('./dumps')
    root.mkdir(exist_ok=True)
    ws = root / 'websocket'
    ws.mkdir(exist_ok=True)
    wshost = ws / f'{slugify(host)}.data'

    with open(wshost, 'ta') as file:
        enc_msg = base64.encodebytes(rawmsg).decode('utf-8')
        file.write(f'{enc_msg}\n')

def handle_msg(rawmsg):
    global _buffer, _zlib
    if type(rawmsg) is bytes:
        _buffer.extend(rawmsg)

        if len(rawmsg) < 4 or rawmsg[-4:] != b'\x00\x00\xff\xff':
            return
        msg = _zlib.decompress(_buffer)
        msg = msg.decode('utf-8')
        _buffer = bytearray()

        return msg
    else:
        print('Message is not bytes!! it is...', type(rawmsg))