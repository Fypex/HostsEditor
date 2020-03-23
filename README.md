# Hosts editor
![enter image description here](https://raw.githubusercontent.com/Fypex/hosts-editor/master/screen.png)
##### Introduction

This sources use web technologies together with the eel plugin, the operation of these sources depends on the presence of a chrome browser on your computer
Details on working with the eel plugin can be found in the [repository](https://github.com/samuelhwilliams/Eel) of this plugin


##### Compilation

```sh
$ git clone https://github.com/Fypex/hosts-editor.git
$ cd hosts-editor
$ pip install eel
$ pip install PyInstaller
$ python -m eel init.py web --onefile --noconsole -n "HostsEditor" -i"logo.ico" --uac-admin
```

> After compilation need move manifest file from `build` folder to one directory with exe file

> Need admin rights