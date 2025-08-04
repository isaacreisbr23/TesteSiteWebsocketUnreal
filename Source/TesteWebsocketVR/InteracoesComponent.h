// InteracoesComponent.h

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "IWebSocket.h"
#include "WebSocketsModule.h"

#include "Components/TextRenderComponent.h"

#include "InteracoesComponent.generated.h"

UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class TESTEWEBSOCKETVR_API UInteracoesComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	UInteracoesComponent();

	UPROPERTY(BlueprintReadWrite) bool bLampada;

	UFUNCTION(BlueprintCallable) void AlterarLocationDaMesh(double X, double Y, double Z);
	UFUNCTION(BlueprintCallable) void AlterarLuz();
	UFUNCTION(BlueprintCallable) void AlterarRotationDaMesh(double X, double Y, double Z);
	UFUNCTION(BlueprintCallable) void EnviarColisao();
	UFUNCTION(BlueprintCallable) bool AlterarNomeDoClient(FString NovoNome, UTextRenderComponent* textRenderParaAlterar);
	UFUNCTION(BlueprintCallable) bool EnviarMensagemGlobal(FString MensagemGlobal, float TempoParaMostrar);

	UPROPERTY(EditAnywhere, BlueprintReadWrite) float ValorCorVermelha;
	UPROPERTY(EditAnywhere, BlueprintReadWrite) float ValorCorVerde;
	UPROPERTY(EditAnywhere, BlueprintReadWrite) float ValorCorAzul;

	UPROPERTY(BlueprintReadWrite) FString LocalNomeRecebido;

protected:
	virtual void BeginPlay() override;

public:
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;

private:
	TSharedPtr<IWebSocket> WebSocket;

	UFUNCTION(BlueprintCallable)void ConectarWebSocket(FString EnderecoSocket);
};
