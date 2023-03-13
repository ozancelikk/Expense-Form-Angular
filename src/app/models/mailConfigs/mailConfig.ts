export interface MailConfig{
    id:string,
    smtpServer:string,
    from:string,
    to:string[],
    password:string,
    port:number,
    enableSsl:boolean
}

