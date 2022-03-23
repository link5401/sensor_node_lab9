serial.onDataReceived("$", function on_data_received() {
    
    signal2 = serial.readString()
    if (signal2[1] == "3") {
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else if (signal2[1] == "2") {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
    
})
//  NPNLCD.lcd_init(63)
let signal2 = ""
let counter_sensor = 0
radio.setGroup(1)
led.enable(false)
basic.forever(function on_forever() {
    //  NPNLCD.show_number(NPNBitKit.analog_soil_mosture(AnalogPin.P2), 0, 1)
    NPNBitKit.DHT11Read(DigitalPin.P3)
    serial.writeLine("!1:TEMP:" + ("" + NPNBitKit.DHT11Temp()) + "#")
    basic.pause(100)
    serial.writeLine("!1:HUMI:" + ("" + NPNBitKit.DHT11Hum()) + "#")
    basic.pause(100)
    serial.writeLine("!1:SOIL:" + ("" + NPNBitKit.AnalogSoilMosture(AnalogPin.P2)) + "#")
    basic.pause(10000)
})
