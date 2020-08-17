# air

clonar repositório.

Na pasta arduino usar os comandos

pip install pymongo==2.4.2
pip3 install pymongo==2.4.2

Na pasta api rodar os comandos

npm install
npm fund

Na pasta dashboard rodar os comandos

npm install
npm fund

Na pasta /home/pi/.config/lxsession/LXDE-pi/(se não existir, deve criar) e acessar o arquivo autostart:
certificar-se de que essas linhas abaixo estejam no arquivo:

@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@point-rpi ;

Acrescentar na ultima linha:
lxterminal -e bash /home/pi/Desktop/air/init.sh

acessar o arquivo /etc/lightdm/lightdm.conf
e adicionar as linhas no final:

[SeatDefaults]
xserver-command=X -s 0 -dpms

entrar nas configurações do navegador, ir em:
Idioma -> Sugerir a tradução de páginas que não estão em um idioma que você conheça. E desmatar a tag.
