// InteracoesComponent.h

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "IWebSocket.h"
#include "WebSocketsModule.h"

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

	UPROPERTY(EditAnywhere, BlueprintReadWrite) float ValorCorVermelha;
	UPROPERTY(EditAnywhere, BlueprintReadWrite) float ValorCorVerde;
	UPROPERTY(EditAnywhere, BlueprintReadWrite) float ValorCorAzul;

protected:
	virtual void BeginPlay() override;

public:
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;

private:
	TSharedPtr<IWebSocket> WebSocket;

	void ConectarWebSocket();
};
