import React, { useEffect, useState, useRef } from "react";
import './App.css';

export default function WebSocketComponent() {
  const [messages, setMessages] = useState([]);
  const [MensagensRecebidas, setMensagensRecebidas] = useState([]);
  
  //sliders
  const [valorSlider, setValorSlider] = useState(0);
  const [valorSliderVerde, setValorSliderVerde] = useState(0);
  const [valorSliderAzul, setValorSliderAzul] = useState(0);// valor inicial do slider


  //entry do ip
  const [valorIp, setValorIp] = useState("");
  const [inputIp, setInputIp] = useState("");

  const socketRef = useRef(null);


  //entry do nome
  const [valorNome, setvalorNome] = useState("");
  const [inputNome, setinputNome] = useState("");


  //entry da msg global
  const [valorMensagemGlobal, setvalorMensagemGlobal] = useState("");
  const [inputMensagemGlobal, setinputMensagemGlobal] = useState("");

  //Conexao ao socket
  const conectarAoSocket = () => {

    let url;
    console.log(inputIp);

    if (inputIp !== ""){
      url =  new WebSocket("ws://"+inputIp+":9999");
    
      socketRef.current = url;



      // ---------- HANDLE DOS RETORNOS DO SERVER ----------
      socketRef.current.onmessage = (event) => {
        setMessages((prev) => [...prev, event.data]);

        if (event.data === "Luz Ligada") {
          document.getElementById("BotaoLamp").style.backgroundColor="greeen";

        } else if (event.data !== "Luz Desligada") {
          document.getElementById("BotaoLamp").style.backgroundColor="gray";
        }

        if (event.data === "Actor Colidiu com o cubo"){


        }
      };

      // ---------- ABERTURA DO SOCKET ----------
      socketRef.current.onopen = () => {
        console.log("Conectado ao WebSocket");

        alert("Conectado");
      };


      // ---------- HANDLE DAS MENSAGENS COM O SERVER ----------
      socketRef.current.onmessage = (event) => {
        setMessages((prev) => [...prev, event.data]);

        if (event.data === "Luz Ligada") {
          document.getElementById("BotaoLamp").style.backgroundColor="greeen";

        } else if (event.data !== "Luz Desligada") {
          document.getElementById("BotaoLamp").style.backgroundColor="gray";
        }

        if (event.data === "Actor Colidiu com o cubo"){


        }

        if(event.data === "Nome alterado"){

          alert("Nome alterado");

        }
      };


      // ---------- FECHAMENTO DO SOCKET ----------
      socketRef.current.onclose = () => {
        console.log("WebSocket desconectado");
        alert("Desconectado do servidor");
      };

      return () => {
        socketRef.current.close();
      };
    }
    if (inputIp === ""){
      console.log("URL nao contem link valido");
      alert("o Ip nao pode conter um url vazio");
    }
    else{
      alert("Falha ao conectar, confira o endereço inserido e se o servidor esta ativo");
    }
  }



  //Funcoes locais
  const enviarMensagem = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Mudar Estado da Lampada");
    } else {
      console.log("Socket não está aberto");
    }
  };

  const mudarLocationEmX = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar Location em X");
    } else {
      console.log("Erro no socket");
    }
  };

  const mudarLocationEmXNegativo = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar Location em -X");
    }
  };

  const mudarLocationEmY = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar Location em Y");
    }
  };

  const mudarLocationEmYNegativo = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar Location em -Y");
    }
  };

  const mudarLocationEmZ = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar Location em Z");
    }
  };

  const mudarLocationEmZNegativo = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar Location em -Z");
    }
  };

  const mudarRotationEmX = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar rotation em X");
    }
  };

  const mudarRotationEmXNegativo = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar rotation em -X");
    }
  };


  const mudarRotationEmY = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar rotation em Y");
    }
  };

  const mudarRotationEmYNegativo = () => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar rotation em -Y");
    }
  };


  const handleSliderChange = (event) => {

    const novoValor = event.target.value;
    setValorSlider(novoValor);

    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("ValorVermelho:" + novoValor);
    }

  };


  
  const handleSliderChangeVerde = (event) => {

    const novoValorVerde = event.target.value;
    setValorSliderVerde(novoValorVerde);

    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("ValorVerde:" + novoValorVerde);
    }

  };

  
  const handleSliderChangeAzul = (event) => {

    const novoValorAzul = event.target.value;
    setValorSliderAzul(novoValorAzul);

    if (socketRef.current.readyState === WebSocket.OPEN){

      socketRef.current.send("ValorAzul:"+novoValorAzul);

    }

  };

  // --------- Entry de conexao com servidor ----------
  const handleChangeEnderecoDoServer = (event) => {


    const EnderecoServer = event.target.value;
    setInputIp(EnderecoServer);

  }

  const setarIpDoServer = () => {
    
    setValorIp(inputIp);

    conectarAoSocket();

  }


  // --------- Entry de mudança de nome ----------
  const alterarNomeDoClient = () => {

    

    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Alterar Nome para: " + valorNome);
      console.log("Alterar Nome para: " + valorNome);
    } else {
      console.log("Erro no socket");
    }

  }

  const handleNomeDoClient = (event) => {

    const NomeASerPassado = event.target.value;
    setvalorNome(NomeASerPassado);
    setinputNome(NomeASerPassado);
   

  }


  // -------- entry para enviar mensagem -------

  const handleMsgGlobal = (event) => {

    const mensagemASerPassada = event.target.value;
    setvalorMensagemGlobal(mensagemASerPassada);
    setinputMensagemGlobal(mensagemASerPassada);

  }

  const enviarMensagemGlobal = () => {

    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("Enviar mensagem global:" + valorMensagemGlobal);
      console.log("Enviar mensagem global:" + valorMensagemGlobal);
    } else {
      console.log("Erro no socket");
    }

  }
 
  // ---------- RETORNO (HTML) ----------
  return (
    <div style={{ padding: '20px' }}>

      <input type="text" onChange={handleChangeEnderecoDoServer} placeholder="Ip do server "></input>
      <button onClick={setarIpDoServer}>Conectar</button>

      <h2>Mensagens do servidor:</h2>
      <button id="BotaoLamp" onClick={enviarMensagem}>Mudar estado da lâmpada</button>
      <button className='BotaoLocation' onClick={mudarLocationEmX}>Mudar a location em X = 10</button>
      <button className='BotaoLocation' onClick={mudarLocationEmXNegativo}>Mudar a location em X = -10</button>
      <button className='BotaoLocation' onClick={mudarLocationEmY}>Mudar a location em Y = 10</button>
      <button className='BotaoLocation' onClick={mudarLocationEmYNegativo}>Mudar a location em Y = -10</button>
      <button className='BotaoLocation' onClick={mudarLocationEmZ}>Mudar a location em Z = 10</button>
      <button className='BotaoLocation' onClick={mudarLocationEmZNegativo}>Mudar a location em Z = -10</button>
      <button className='BotaoLocation' onClick={mudarRotationEmX}>Mudar a rotation em X = 10</button>
      <button className='BotaoLocation' onClick={mudarRotationEmXNegativo}>Mudar a rotation em X = -10</button>
      <button className='BotaoLocation' onClick={mudarRotationEmY}>Mudar a rotation em Y = 10</button>
      <button className='BotaoLocation' onClick={mudarRotationEmYNegativo}>Mudar a rotation em Y = -10</button>

      <input type="text" onChange={handleNomeDoClient} placeholder="Nome no jogo"></input>
      <button onClick={alterarNomeDoClient}>Alterar Nome</button>

      <input type="text" onChange={handleMsgGlobal} placeholder="Enviar msg global"></input>
      <button onClick={enviarMensagemGlobal}>Enviar Mensagem global</button>

      <hr />

      <h3>Red:</h3>
      <input
        type="range"
        min="0"
        max="100"
        value={valorSlider}
        onChange={handleSliderChange}
        style={{ width: '100%' }}
      />
      <p>Valor selecionado: {valorSlider}</p>

      <h3>Green:</h3>
      <input
        type="range"
        min="0"
        max="100"
        value={valorSliderVerde}
        onChange={handleSliderChangeVerde}
        style={{ width: '100%' }}
      />
      <p>Valor selecionado: {valorSliderVerde}</p>

      <h3>Blue:</h3>
      <input
        type="range"
        min="0"
        max="100"
        value={valorSliderAzul}
        onChange={handleSliderChangeAzul}
        style={{ width: '100%' }}
      />
      <p>Valor selecionado: {valorSliderAzul}</p>

      <div>
        <h1>Mensagens recebidas:</h1>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))} 
      </div>



    </div>
    
  );
}
