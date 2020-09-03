# air

Instalar o mongodb (https://pimylifeup.com/mongodb-raspberry-pi/)
<br/>
Atualizar o node e npm (https://github.com/nodesource/distributions)

------------------------------------

clonar repositório.
====================================

<p>
Na pasta arduino usar os comandos
<br />
pip install pymongo==2.4.2
<br />
pip3 install pymongo==2.4.2
</p>

-------------------------------------

<p>
Na pasta api rodar os comandos
  <br />
npm install
  <br />
npm fund
</p>

--------------------------------------

<p>
Na pasta dashboard rodar os comandos
<br />
npm install
<br />
npm fund
</p>

--------------------------------------

<p>
Na pasta /home/pi/.config/lxsession/LXDE-pi/(se não existir, deve criar) e acessar o arquivo autostart:
certificar-se de que essas linhas abaixo estejam no arquivo:
<br />
@lxpanel --profile LXDE-pi
  <br />
@pcmanfm --desktop --profile LXDE-pi
  <br />
@xscreensaver -no-splash
  <br />
@point-rpi ;
<br />
Acrescentar na ultima linha:
lxterminal -e bash /home/pi/Desktop/air/init.sh
</p>

--------------------------------------

<p>
acessar o arquivo /etc/lightdm/lightdm.conf
e adicionar as linhas no final:
<br />
[SeatDefaults]
  <br />
xserver-command=X -s 0 -dpms
</p>

--------------------------------------

<p>
entrar nas configurações do navegador, ir em:
Idioma -> Sugerir a tradução de páginas que não estão em um idioma que você conheça. E desmatar a tag.
</p>
