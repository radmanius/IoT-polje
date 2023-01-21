/*!
 * \file 
 * \brief Weather Click example
 * 
 * # Description
 * This demo-app shows the temperature, pressure and humidity measurement using Weather click.
 *
 * The demo application is composed of two sections :
 * 
 * ## Application Init 
 * Configuring clicks and log objects.
 * Setting the click in the default configuration to start the measurement.
 * 
 * ## Application Task  
 * Reads Temperature data, Relative Huminidy data and Pressure data, 
 * this data logs to USBUART every 1500ms.
 * 
 * \author Katarina Perendic
 *
 */
// ------------------------------------------------------------------- INCLUDES

#include "board.h"
#include "log.h"
#include "lr4.h"    //dodano
#include "weather.h"
#include "string.h"

// ------------------------------------------------------------------ VARIABLES

#define PROCESS_BUFFER_SIZE 128
#define PROCESS_COUNT 350

static char app_buf[ 100 ] = { 0 };
static int8_t app_buf_len = 0;

// ------------------------------------------------------------------ KLJUC -dodano, logicno, kk
// CHIRPSTACK APP_KEY
// bd 40 b1 29 80 6f 4a b0 c3 38 dd 1c 88 9b 01 2d

//u little endian obliku:

static uint8_t app_key[16] = {
                        0x2d, 0x01,
                        0x9b, 0x88,
                        0x1c, 0xdd,
                        0x38, 0xc3,
                        0xb0, 0x4a,
                        0x6f, 0x80,
                        0x29, 0xb1,
                        0x40, 0xbd
                        };
//kraj dodanog

static lr4_t lr4;
static lr4_tx_msg_t lr4_tx_msg;
static weather_t weather;
static log_t logger;

// -------------------------------------------------------- ADDITIONAL FUNCTIONS

static void response_handler( uint8_t *cmd, uint8_t *pl_size, uint8_t *pl_buffer )
{
    log_printf( &logger, "IND TYPE: 0x%.2X\r\n", ( uint16_t ) *cmd );
    
    log_printf( &logger, "PAYLOAD : " );
    
    for ( uint8_t cnt = 0; cnt < *pl_size; cnt++ )
    {
        log_printf( &logger, "0x%.2X ", ( uint16_t ) pl_buffer[ cnt ] );
    }
    log_printf( &logger, "\r\n" );
}

// ------------------------------------------------------ APPLICATION FUNCTIONS

void application_init ( void )
{
    log_cfg_t log_cfg;
    weather_cfg_t cfg;
    lr4_cfg_t lr_cfg;       //dodano

    /** 
     * Logger initialization.
     * Default baud rate: 115200
     * Default log level: LOG_LEVEL_DEBUG
     * @note If USB_UART_RX and USB_UART_TX 
     * are defined as HAL_PIN_NC, you will 
     * need to define them manually for log to work. 
     * See @b LOG_MAP_USB_UART macro definition for detailed explanation.
     */
    
    #define USB_UART_RX PD6
    #define USB_UART_TX PD5
    
    LOG_MAP_USB_UART( log_cfg );
    log_init( &logger, &log_cfg );
    log_info( &logger, "---- Application Init KK ProjektR ----" );
    log_info( &logger, "---- Mjerenja senzora razine vode ----" );
    //log_info( &logger, "---- i senzora vlage i temperature ----"); 
    log_info( &logger, "---- šalju se putem LoRa modula na ----" );
    log_info( &logger, "---- LoRaWAN Gateway ----" );
    
    Delay_ms(1000);


    //  Click initialization.

    lr4_cfg_setup( &lr_cfg );
    LR4_MAP_MIKROBUS( lr_cfg, MIKROBUS_1 );
    lr4_init( &lr4, &lr_cfg );
    
    weather_cfg_setup( &cfg );
    WEATHER_MAP_MIKROBUS( cfg, MIKROBUS_2 );
    weather_init( &weather, &cfg );

    weather_default_cfg( &weather );
    
    Delay_ms( 100 );
    lr4_set_ind_handler( &lr4, response_handler );
    log_printf( &logger, "Hard reset!\r\n" );
    lr4_hard_reset( &lr4 );
    log_printf( &logger, "------------------------\r\n" );
    log_printf( &logger, "Factory reset!\r\n" );
    lr4_factory_reset( &lr4 );
    log_printf( &logger, "------------------------\r\n" );
    Delay_ms( 1000 );
    uint32_t tmp_data = 0;
    log_printf( &logger, "Get FW version!\r\n" );
    lr4_get_fw_version( &lr4, &tmp_data );
    log_printf( &logger, "FW vesion is: 0x%.8LX\r\n", tmp_data );
    log_printf( &logger, "------------------------\r\n" );
    Delay_ms( 1000 );
    log_printf( &logger, "Get Serial Number!\r\n" );
    lr4_get_serial_no( &lr4, &tmp_data );
    log_printf( &logger, "Serial Number is: 0x%.8LX\r\n", tmp_data );
    log_printf( &logger, "------------------------\r\n" );
    Delay_ms( 1000 );
    uint8_t tmp_buf[ 8 ] = { 0 };
    log_printf( &logger, "Get Dev EUI!\r\n" );
    lr4_get_dev_eui( &lr4, tmp_buf );
    log_printf( &logger, "Dev EUI is: 0x%.2X%.2X%.2X%.2X%.2X%.2X%.2X%.2X\r\n", ( uint16_t ) tmp_buf[ 7 ],
                                                                               ( uint16_t ) tmp_buf[ 6 ],
                                                                               ( uint16_t ) tmp_buf[ 5 ],
                                                                               ( uint16_t ) tmp_buf[ 4 ],
                                                                               ( uint16_t ) tmp_buf[ 3 ],
                                                                               ( uint16_t ) tmp_buf[ 2 ],
                                                                               ( uint16_t ) tmp_buf[ 1 ],
                                                                               ( uint16_t ) tmp_buf[ 0 ] );
    log_printf( &logger, "------------------------\r\n" );
    Delay_ms( 1000 );
    
     //setting APP KEY ----------------------------------------------------------dodanoKK
    if (lr4_set_key (&lr4, app_key, 0) == 0){
        log_printf(&logger, "App key is set!\n");
        log_printf(&logger, "----------------------\r\n");
    }
    
    //--------------------------------------------------------------------------kraj dodanog kk
    
    log_printf( &logger, "Join Network!\r\n" );
    lr4_join_network( &lr4, LR4_JOIN_OVER_THE_AIR_ACTIVATION_MODE );
    log_printf( &logger, "------------------------\r\n" );
    Delay_ms( 1000 );
}

void send_message (char *payload, int size, int port){
        lr4_tx_msg_t message;
        message.data_in = payload;
        message.n_bytes = size;
        message.port = port;
        message.option =  0;
        if(lr4_tx_message (&lr4, &message)==0){
                    log_printf( &logger, "-------------Message sent-----------\r\n" );
        }
        else {
            log_printf( &logger, "-------------Failed to send message-----------\r\n" );
        }
    }

void application_task ( void )
{
    
    //je li spojen --dodano
    log_printf( &logger, "Get Activation Status!\r\n" );
    uint8_t status = lr4_get_status( &lr4, LR4_GET_ACTIVATION_MODE );
    log_printf( &logger, "Status: " );
    switch ( status )
    {
        case LR4_STATUS_NOT_ACTIVATED :
        {
            log_printf( &logger, "Not activated.\r\n" );
            break;
        }
        case LR4_STATUS_JOINING :
        {
            log_printf( &logger, "Joining...\r\n" );
            break;
        }
        case LR4_STATUS_JOINED :
        {
            log_printf( &logger, "Joined.\r\n" );
            break;
        }
        case LR4_STATUS_MAC_ERROR :
        {
            log_printf( &logger, "MAC ERROR.\r\n" );
            break;
        }
        default :
        {
            break;
        }
    }
    log_printf( &logger, "------------------------\r\n" );
    Delay_ms( 1000 );
    
    //kraj dodanog    
    
    
    
    weather_data_t weather_data;

    //  Task implementation.

    weather_get_ambient_data( &weather, &weather_data );

    log_printf( &logger, " \r\n ---- Weather data ----- \r\n" );
    log_printf( &logger, "[PRESSURE]: %.2f mBar.\n\r", weather_data.pressure );
    log_printf( &logger, "[TEMPERATURE]: %.2f C.\n\r", weather_data.temperature );
    log_printf( &logger, "[HUMIDITY]: %.2f %%.\n\r", weather_data.humidity );

    Delay_ms( 1500 );
}

void main ( void )
{
    application_init( );

    for ( ; ; )
    {
        application_task( );
        Delay_ms(1000);
        char tlak[] = {weather_data.pressure};
        char temp[] = {weather_data.temperature};
        char vlaga[] = {weather_data.humidity};
        char podaci_w[200];
        strcpy(podaci_w, tlak + temp + vlaga);
        send_message(podaci_w, sizeof(podaci_w), 1 );
        log_printf(&logger, podaci_w);
        log_printf(&logger, "\n");
    }
}


// ------------------------------------------------------------------------ END
