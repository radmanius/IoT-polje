/*!
 * \file 
 * \brief LR4 Click example
 * 
 * # Description
 * This example reads and processes data from LR 4 clicks.
 *
 * The demo application is composed of two sections :
 * 
 * ## Application Init 
 * Initializes the driver, and resets the click board to factory default configuration.
 * Then performs a group of commands for getting the FW version, the serial number, and the DevEUI.
 * After that executes the join activation by personalization command.
 * 
 * ## Application Task  
 * Checks the activation and session status and displays the results on the USB UART.
 * 
 * ## Additional Function
 * - response_handler - Parses and logs all the module responses on the USB UART.
 * 
 * \author MikroE Team
 *
 */
// ------------------------------------------------------------------- INCLUDES

#include "board.h"
#include "log.h"
#include "lr4.h"
#include "string.h"
//-------dodano----17.01.2023.
#include "drv_digital_out.h"
#include "drv_digital_in.h"


#define PROCESS_BUFFER_SIZE 128
#define PROCESS_COUNT 350

static char app_buf[ 100 ] = { 0 };
static int8_t app_buf_len = 0;


static digital_out_t izlaz;
static digital_in_t ulaz;
static digital_out_t test;


int counter=0;


//------kraj dodanog----17.01.2023.

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

// ------------------------------------------------------------------ VARIABLES

static lr4_t lr4;
static lr4_tx_msg_t lr4_tx_msg;
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
    lr4_cfg_t cfg;

    /** 
     * Logger initialization.
     * Default baud rate: 115200
     * Default log level: LOG_LEVEL_DEBUG
     * @note If USB_UART_RX and USB_UART_TX 
     * are defined as HAL_PIN_NC, you will 
     * need to define them manually for log to work. 
     * See @b LOG_MAP_USB_UART macro definition for detailed explanation.
     */
    
    #define USB_UART_RX PD9
    #define USB_UART_TX PD8
    LOG_MAP_USB_UART( log_cfg );
    log_init( &logger, &log_cfg );
    log_info( &logger, "---- Application Init KK ProjektR ----" );
    log_info( &logger, "---- Mjerenja senzora razine vode ----" );
    //log_info( &logger, "---- i senzora vlage i temperature ----"); 
    log_info( &logger, "---- šalju se putem LoRa modula na ----" );
    log_info( &logger, "---- LoRaWAN Gateway ----" );
    
    Delay_ms(1000);

    //  Click initialization.

    lr4_cfg_setup( &cfg );
    LR4_MAP_MIKROBUS( cfg, MIKROBUS_1 );
    lr4_init( &lr4, &cfg );

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
    log_printf( &logger, "Get Session Status!\r\n" );
    status = lr4_get_status( &lr4, LR4_GET_SESSION_STATUS_MODE );
    log_printf( &logger, "Status: " );
    switch ( status )
    {
        case LR4_STATUS_IDLE :
        {
            log_printf( &logger, "Idle.\r\n" );
            break;
        }
        case LR4_STATUS_BUSY :
        {
            log_printf( &logger, "Busy (LR session running).\r\n" );
            break;
        }
        case LR4_STATUS_DEV_NOT_ACTIVATED :
        {
            log_printf( &logger, "Device not activated.\r\n" );
            break;
        }
        case LR4_STATUS_DELAYED :
        {
            log_printf( &logger, "Delayed (LR session paused due to Duty-cycle).\r\n" );
            break;
        }
        default :
        {
            break;
        }
    }
    log_printf( &logger, "------------------------\r\n" );
    Delay_ms( 1000 );
    
    

}

void main ( void )
{
    application_init( );
    
    digital_out_init(&izlaz, PC8);          //senzor na kamenu
    digital_in_init(&ulaz, PD15);           //senzor na kamenu

    for ( ; ; )
    {
        application_task( );        
        Delay_ms(1000);
        
        digital_out_high(&izlaz);
        char poruka[50];
        if(digital_in_read(&ulaz)!=1){
            log_info( &logger, "Senzor NIJE aktiviran!! \r\n" );
            strcpy(poruka, "Nedostaje vode");
        }
        else{ 
            log_info( &logger, "%d Senzor aktiviran!! \r\n", counter++ );
            strcpy(poruka, "Ima dovoljno vode");
        }
        Delay_ms(700);
        //char porukaUP;
        //while(porukaUP != EOF){
        //    porukaUP
        //}
        //char poruka[] = {"hi there"};
        send_message(poruka, sizeof(poruka), 1 );       //poruke su Base64 encoded    
        log_printf(&logger, poruka);
        log_printf(&logger, "\n");
    }
}


// ------------------------------------------------------------------------ END
