import zlib

_buffer: bytearray = bytearray()
_zlib = zlib.decompressobj()

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