import asyncio
import websockets

import threading

from tkinter import *

import socket
import psutil


hostname = socket.gethostname()
ip_local = socket.gethostbyname(hostname)

# Lista para armazenar conexões ativas
clients = set()

App = Tk()

App.geometry("200x200")






comandos_permitidos = ["ValorAzul:","ValorVerde:","ValorVermelho:","Alterar lampada na unreal",  "Alterar Location em X" , "Mudar Estado da Lampada", "Alterar Location em -X", "Alterar Location em Y", "Alterar Location em -Y", "Alterar Location em Z", "Alterar Location em -Z", "Alterar rotation em X", "Alterar rotation em -X", "Alterar rotation em Y", "Alterar rotation em -Y", "Alterar rotation em Z","Alterar rotation em -Z" ]
retornos_permitidos = ["Actor Colidiu com o cubo","Luz Ligada","Lampada ligada na unreal"]



def coletar_ip_com_gateway():

    try:
        # Conecta de forma fake a um IP público (Google DNS) sem enviar dados
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception as e:
        print("Erro ao obter IP:", e)
        return None

ip_de_rede = coletar_ip_com_gateway()


Label(App, text=f'Conetecte-se em: {ip_de_rede}:9999').pack()


async def handler(websocket):

    async def checar_comando_recebido(mensagemRecebida):

        for comando in comandos_permitidos:
            if mensagemRecebida.startswith(comando):
                await enviar_para_todos(mensagemRecebida)
                return

        for retorno in retornos_permitidos:
            if mensagemRecebida.startswith(retorno):
                await enviar_para_todos(mensagemRecebida)
                print(f'[*]Retorno Recebido {mensagemRecebida}')
                return
    
    print("Cliente conectado") 
    clients.add(websocket)

    try:
        async for message in websocket:
            print("Mensagem recebida:", message)

            await checar_comando_recebido(message) #funcao para checar se o comando recebido esta presente na lista de strings
            await websocket.send(f"Echo: {message}")

    except websockets.exceptions.ConnectionClosed:
        print("Cliente desconectado")

    finally:
        clients.remove(websocket)

async def enviar_para_todos(msg):

    if clients:

        await asyncio.gather(*(client.send(msg) for client in clients))
        print(f"Mensagem enviada: {msg}")

    else:

        print("Nenhum cliente conectado.")



async def main():

    async with websockets.serve(handler, ip_de_rede, 9999):
        print(f'Servidor WebSocket rodando em ws://{ip_de_rede}:9999')
        await asyncio.Future()  # mantém o servidor rodando



def rodarInterfaceNaTrheadSeparada():
    asyncio.run(main())

threading.Thread(target=rodarInterfaceNaTrheadSeparada, daemon=True).start()


if __name__ == "__main__":
    
    App.mainloop()
