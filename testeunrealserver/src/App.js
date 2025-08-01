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



  const conectarAoSocket = () => {

    const url =  new WebSocket("ws://"+inputIp);
    socketRef.current = url;

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


    socketRef.current.onopen = () => {
      console.log("Conectado ao WebSocket");

      alert("Conectado");
    };

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

    socketRef.current.onclose = () => {
      console.log("WebSocket desconectado");
    };

    return () => {
      socketRef.current.close();
    };

  }


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

  const HandleChangeEnderecoDoServer = (event) => {


    const EnderecoServer = event.target.value;
    setInputIp(EnderecoServer);

  }

  const setarIpDoServer = () => {
    
    setValorIp(inputIp);

    conectarAoSocket();

  }

  return (
    <div style={{ padding: '20px' }}>

      <input type="text" onChange={HandleChangeEnderecoDoServer} placeholder="Ip do server "></input>
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
