import zlib

_buffer: bytearray = bytearray()
_zlib = zlib.decompressobj()

def handle_msg(msg):
    global _buffer, _zlib
    if type(msg) is bytes:
        _buffer.extend(msg)

        if len(msg) < 4 or msg[-4:] != b'\x00\x00\xff\xff':
            return
        msg = _zlib.decompress(_buffer)
        msg = msg.decode('utf-8')
        _buffer = bytearray()

        return msg