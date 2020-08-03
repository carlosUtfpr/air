#include<ArduinoJson.h>

typedef struct Data{
    float pressao;
    uint16_t angulo;
    uint8_t alarm;
} Data;

void setup() {
  Serial.begin(115200);
}

void loop()
{   
    digitalWrite(27,!digitalRead(27));
    
    Data dado = {0};
    dado.alarm = 1;
    dado.pressao = analogRead(-48)*0.1105;
    dado.angulo = dado.pressao*3 - 10;
    
    const int capacity = JSON_OBJECT_SIZE(3);
    StaticJsonDocument<capacity> doc;
    
    doc["alarm"] = dado.alarm;
    doc["pressao"] = dado.pressao;
    doc["angulo"] = dado.angulo;
   
    serializeJson(doc, Serial);
    Serial.println();
    delay(500);
}
