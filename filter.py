from mitmproxy.http import HTTPFlow

"""An addon using the abbreviated scripting syntax."""

def filter_for_hoyo(host):
    return 'hoyo' in host or 'yuanshen' in host or 'hk4e' in host


class Hoyorun:
    def __init__(self):
        self.num = 0

    def response(self, flow: HTTPFlow):
        host = flow.request.host
        is_mihoyo = filter_for_hoyo(host)
        if (is_mihoyo):
            print('Hoyorun: ', flow.request.url)
            print('\t request headers')
            for key in flow.request.headers:
                print(f'\t {key}: {flow.request.headers[key]}')
            print('\t response headers')
            for key in flow.response.headers:
                print(f'\t {key}: {flow.response.headers[key]}')

addons = [Hoyorun()]