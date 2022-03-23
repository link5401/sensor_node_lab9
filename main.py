def on_data_received():
    global signal2
    signal2 = serial.read_string()
    if signal2[1] == "3":
        pins.digital_write_pin(DigitalPin.P0, 1)
    elif signal2[1] == "2":
        pins.digital_write_pin(DigitalPin.P0, 0)
serial.on_data_received("$", on_data_received)
# NPNLCD.lcd_init(63)
signal2 = ""
counter_sensor = 0
radio.set_group(1)
led.enable(False)

def on_forever():
    # NPNLCD.show_number(NPNBitKit.analog_soil_mosture(AnalogPin.P2), 0, 1)

    NPNBitKit.dht11_read(DigitalPin.P3)
    serial.write_line("!1:TEMP:" + str(NPNBitKit.dht11_temp()) + "#")
    basic.pause(100)
    serial.write_line("!1:HUMI:" + str(NPNBitKit.dht11_hum()) + "#")
    basic.pause(100)
    serial.write_line("!1:SOIL:" + str(NPNBitKit.analog_soil_mosture(AnalogPin.P2)) + "#")
    basic.pause(10000)
basic.forever(on_forever)