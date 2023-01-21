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
#include "string.h"
#include "drv_digital_out.h"
#include "drv_digital_in.h"


#define PROCESS_BUFFER_SIZE 128
#define PROCESS_COUNT 350







// ------------------------------------------------------------  UART VARIABLES

static log_t logger;


static char app_buf[ 100 ] = { 0 };
static int8_t app_buf_len = 0;


static digital_out_t izlaz;
static digital_in_t ulaz;
static digital_out_t test;


int counter=0;

// ------------------------------------------------------------- ADDITIONAL FUNCTIONS





void logger_init(void){
    /** 
     * Logger initialization.
     * Default baud rate: 115200
     * Default log level: LOG_LEVEL_DEBUG
     * @note If USB_UART_RX and USB_UART_TX 
     * are defined as HAL_PIN_NC, you will 
     * need to define them manually for log to work. 
     * See @b LOG_MAP_USB_UART macro definition for detailed explanation.
     */
    
    log_cfg_t log_cfg;
    LOG_MAP_MIKROBUS( log_cfg, MIKROBUS_2 );
    log_init( &logger, &log_cfg );
    log_info( &logger, "---- Application Init  ---- \r\n " );
    log_info( &logger, "Test za senzor razine vode\r\n" );




}

// ------------------------------------------------------ APPLICATION FUNCTIONS






void application_init ( void )
{

    //  logger and lora initialization.
    
    
    
    logger_init();
    

    
    Delay_ms( 1000);
     
    
    digital_out_init(&izlaz, PC8);          //OVO SAD JE DOBRO, staro: PB7
    digital_in_init(&ulaz, PD15);            //OVO SAD JE DOBRO, staro:PC7
    
//    digital_out_init(&izlaz, PD14);          //PB7
//    digital_in_init(&ulaz, PD15);            //PC7
    
//     digital_out_init(&izlaz, PD11);
//     digital_out_init(&test, PD10);

    
    
    
}


void application_task ( void )
{


//     app_buf_len = log_read ( &logger, app_buf, PROCESS_BUFFER_SIZE );
//     Delay_ms(100);
//     if ( app_buf_len > 0 ) {
//         
// 
//         if(atoi(app_buf) == 1){
//     
//             log_info( &logger, "Otvaram ventil \r\n\n" );
//         }
//         
//         else if(atoi(app_buf) == 0){
//             
// 
//             log_info( &logger, "zatvaram ventil \r\n\n" );
//             
//         }
//         else{
//             log_info( &logger, "Otvaranje ventila: 1 \n Zatvaranje ventila: 0 \r\n" );
//         }
//         
//         memset( app_buf, 0, PROCESS_BUFFER_SIZE );
//     }
//     
//     Delay_ms( 1000 );

    
    
    digital_out_high(&izlaz);
    while(1){
        if(digital_in_read(&ulaz)!=1)
            log_info( &logger, "Senzor NIJE aktiviran!! \r\n" );
        else 
            log_info( &logger, "%d Senzor aktiviran!! \r\n", counter++ );
        Delay_ms(700);
    }
}

    void main ( void )
    {
    

    application_init( );

    for ( ; ; )
    {
        application_task( );
    }
}


// ------------------------------------------------------------------------ END
