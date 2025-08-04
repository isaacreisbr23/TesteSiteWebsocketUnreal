	// InteracoesComponent.cpp

	#include "InteracoesComponent.h"
	#include "Engine/Engine.h"
	#include "Components/StaticMeshComponent.h"



	UInteracoesComponent::UInteracoesComponent()
	{
		PrimaryComponentTick.bCanEverTick = true;

		bLampada = false;
		ValorCorVermelha = 0.0;

	}

	void UInteracoesComponent::AlterarLocationDaMesh(double X, double Y, double Z)
	{
		FVector NovaLocation(X,Y,Z);
	
		UInteracoesComponent::GetOwner()->AddActorLocalOffset(NovaLocation);

	}

	void UInteracoesComponent::AlterarLuz() {

		bLampada = !bLampada;

	}

	void UInteracoesComponent::AlterarRotationDaMesh(double X, double Y, double Z)
	{

		FRotator NovaRotation(X, Y, Z);

		UInteracoesComponent::GetOwner()->AddActorLocalRotation(NovaRotation);

	}

	void UInteracoesComponent::EnviarColisao()
	{
		WebSocket->Send("Actor Colidiu com o cubo");

	}

	bool UInteracoesComponent::AlterarNomeDoClient(FString NovoNome, UTextRenderComponent* textRenderParaAlterar)
	{	

		textRenderParaAlterar -> SetText(FText::FromString(NovoNome));

		return false;
	}

	bool UInteracoesComponent::EnviarMensagemGlobal(FString MensagemGlobal, float TempoParaMostrar)
	{	

		GEngine->AddOnScreenDebugMessage(-1, TempoParaMostrar, FColor::Green, FString::Printf(TEXT("%s"), *MensagemGlobal));

		return false;
	}

	void UInteracoesComponent::BeginPlay()
	{
		Super::BeginPlay();

	}

	void UInteracoesComponent::ConectarWebSocket(FString EnderecoSocket)
	{

		TWeakObjectPtr<UInteracoesComponent> WeakThis(this);

		if (!FModuleManager::Get().IsModuleLoaded("WebSockets"))
		{
			FModuleManager::LoadModuleChecked<FWebSocketsModule>("WebSockets");
		}
		
		WebSocket = FWebSocketsModule::Get().CreateWebSocket(EnderecoSocket);

		WebSocket->OnConnected().AddLambda([]()
			{
				UE_LOG(LogTemp, Log, TEXT("WebSocket conectado com sucesso!"));
			});

		WebSocket->OnConnectionError().AddLambda([](const FString& Error)
			{
				UE_LOG(LogTemp, Error, TEXT("Erro na conexão: %s"), *Error);
			});



		//comandos recebidos
		WebSocket->OnMessage().AddLambda([WeakThis](const FString& Message)
			{
				UE_LOG(LogTemp, Log, TEXT("Mensagem recebida: %s"), *Message);

				if (WeakThis.IsValid()) {

					if (Message == "Mudar Estado da Lampada") {

						WeakThis->AlterarLuz();

						if (WeakThis->bLampada && WeakThis-> WebSocket) {

							WeakThis -> WebSocket->Send(TEXT("Luz Ligada"));


						}
						if(WeakThis->bLampada == false && WeakThis-> WebSocket) {
							WeakThis->WebSocket->Send(TEXT("Luz Desligada"));

						}


					}

					if (Message == "Alterar Location em X") {

						WeakThis->AlterarLocationDaMesh(10.0, 0, 0);

					}

					if (Message == "Alterar Location em -X") {

						WeakThis->AlterarLocationDaMesh(-10.0, 0, 0);
					}

					if (Message == "Alterar Location em Y") {

						WeakThis->AlterarLocationDaMesh(0, 8, 0);
					}

					if (Message == "Alterar Location em -Y") {

						WeakThis->AlterarLocationDaMesh(0, -10, 0);
					}

					if (Message == "Alterar Location em Z") {
						WeakThis->AlterarLocationDaMesh(0, 0, 10);
					}
				
					if (Message == "Alterar Location em -Z") {

						WeakThis->AlterarLocationDaMesh(0, 0, -10);

					}

					if (Message == "Alterar rotation em X") {
						WeakThis->AlterarRotationDaMesh(10, 0, 0);
					}

					if (Message == "Alterar rotation em -X") {

						WeakThis->AlterarRotationDaMesh(-10, 0, 0);
					}

					if (Message == "Alterar rotation em Y") {

						WeakThis->AlterarRotationDaMesh(0, 10, 0);
					}


					if (Message == "Alterar rotation em -Y") {

						WeakThis->AlterarRotationDaMesh(0, -10, 0);
					}

					if (Message.Contains("Alterar Nome para: ")) {

						FString NomeRecebidoDoServer;

						Message.Split("Alterar Nome para: ", nullptr, &NomeRecebidoDoServer);

						WeakThis->LocalNomeRecebido = NomeRecebidoDoServer;

						WeakThis->WebSocket->Send("Nome alterado");

						
						
					}

					if (Message.Contains("Enviar mensagem global:")) {
						
						FString MensagemGlobalRecebida;
						float TempoNaTela = 3.0;
						Message.Split("Enviar mensagem global:", nullptr, &MensagemGlobalRecebida);
						WeakThis->EnviarMensagemGlobal(MensagemGlobalRecebida,TempoNaTela);



					}

					//Mudança RGB
					if (Message.Contains("ValorVermelho:")) {
					
						FString ValorSliderRecebidoVermelho;
						Message.Split("ValorVermelho:", nullptr, &ValorSliderRecebidoVermelho);

						WeakThis-> ValorCorVermelha = FCString::Atof(*ValorSliderRecebidoVermelho);
					

						UE_LOG(LogTemp, Log, TEXT("%s"), *FString::SanitizeFloat(WeakThis->ValorCorVermelha));

					

					}


					if (Message.Contains("ValorVerde:")) {

						FString ValorSliderRecebidoVerde;
						Message.Split("ValorVerde:", nullptr, &ValorSliderRecebidoVerde);

						WeakThis->ValorCorVerde = FCString::Atof(*ValorSliderRecebidoVerde);


						UE_LOG(LogTemp, Log, TEXT("%s"), *FString::SanitizeFloat(WeakThis->ValorCorVerde));



					}




					if (Message.Contains("ValorAzul:")) {	

						FString ValorSliderRecebidoAzul;
						Message.Split("ValorAzul:", nullptr, &ValorSliderRecebidoAzul);

						WeakThis->ValorCorAzul = FCString::Atof(*ValorSliderRecebidoAzul);


						UE_LOG(LogTemp, Log, TEXT("%s"), *FString::SanitizeFloat(WeakThis->ValorCorAzul));



					}

				}
				else {

					UE_LOG(LogTemp, Log, TEXT("WeakThis nao é valido"));
				}
			});

		WebSocket->Connect();
	}

	void UInteracoesComponent::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
	{
		Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	}
