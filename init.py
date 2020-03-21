import eel

eel.init('web')

eel.start('index.html', size=(1000, 473), block=False, port=8000)


@eel.expose
def save(strings):
    text = ''
    length = len(strings)
    length = length - 1
    for element, string in enumerate(strings):
        line_break = '\n'

        if length == element:
            line_break = ''

        text += string[1] + line_break

    text_file = open(r"C:\Windows\System32\drivers\etc\hosts", "w")
    text_file.write(text)
    text_file.close()


@eel.expose
def get_data():
    my_file = open(r"C:\Windows\System32\drivers\etc\hosts", 'r')
    strings = my_file.read().split('\n', 100)
    ips = []
    for element, string in enumerate(strings):
        ips.append([element, string])

    return ips


while True:
    eel.sleep(10)
