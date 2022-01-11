import sys, os, platform

PYTHON_VERSION = ["", "3", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9"];

version = sys.version_info
v_info = str(version.major) + '.' + str(version.minor) + '.' + str(version.micro)

if version < (3, 0):
    print("### This script requires Python 3.x or higher! ###")
    print("[You are using Python: " + v_info + "]")
    print("### Maybe you should enter the python3 or python3.x to run this script ###")
    sys.exit(1)
else:
    isOk = False
    print("set up python virtual environment...")
    for v in PYTHON_VERSION:
        if(os.system('python' + v + ' -m venv venv') == 0):
            isOk = True
            break

    if(isOk == False):
        print("### Maybe you should enter the python3 or python3.x to run this script ###")
        sys.exit(1)

    operSystem = platform.system()

    for v in PYTHON_VERSION:
        if(operSystem == 'Windows'):
            sys.path.append('.\\venv\\Lib\\site-packages')
        else:
            sys.path.append('./venv/lib/python' + v + '/site-packages')


    coloramaCmd = ''
    if(operSystem == 'Windows'):
        coloramaCmd = '.\\venv\\Scripts\\pip install colorama'
    else:
        coloramaCmd = './venv/bin/pip install colorama'

    try:
        from colorama import init, Fore, Back, Style
    except ImportError:
        os.system(coloramaCmd)


    wgetCmd = ''
    if(operSystem == 'Windows'):
        wgetCmd = '.\\venv\\Scripts\\pip install wget'
    else:
        wgetCmd = './venv/bin/pip install wget'

    try:
        import wget
    except ImportError:
        os.system(wgetCmd)

    from colorama import init, Fore, Back, Style
    init(autoreset=True)
    class Colored(object):
        def red(self, s):
            return Fore.RED + s

        def green(self, s):
            return Fore.GREEN  + s

        def yellow(self, s):
            return Fore.YELLOW + s

        def blue(self, s):
            return Fore.BLUE + s

        def magenta(self, s):
            return Fore.MAGENTA + s

        def cyan(self, s):
            return Fore.CYAN + s

    color = Colored()
    print(color.cyan('virtual environment set up successful!'))
    print(color.green('[install pixi libraries...]'))

    if(operSystem == 'Windows'):
        pixiLib = '.\\src\\native\\modules\\viewer\\dep-libs'
    else:
        pixiLib = './src/native/modules/viewer/dep-libs'

    isExist = os.path.exists(pixiLib)
    if not isExist:
        os.makedirs(pixiLib)

    import wget
    try:
        wget.download('https://pixijs.download/v6.0.2/pixi.min.js', out=pixiLib)
        wget.download('https://pixijs.download/v6.0.2/pixi.min.js.map', out=pixiLib)
    except:
        print(color.red('some errors in installing pixi libraries'))
        print(color.red('please check the ') + color.yellow('wget commands ') + color.red('in install.py!'))
        sys.exit(1)
    else:
        print('')
        print(color.green('[install pixi libraries successful!]'))

