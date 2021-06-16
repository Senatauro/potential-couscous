/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk'); 
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'}); 

exports.handler = async (event, context, callback) => 
{
    console.log(JSON.stringify(event, 0,4))
    ////////////////
    //Verifica CPF//
    ////////////////
    var paramsCPF =  {
        TableName:'Client-fj4h4cg72vbi3fw7ghwf53xggu-devclone',
        FilterExpression:'cpf = :cpf',
        ExpressionAttributeValues:{ ":cpf" : event.arguments.input.cpf,}
    };//Espera a promessa de pesquisa terminar antes de continuar a execução do código
    let resultadoCPF = await ddb.scan(paramsCPF).promise();
    
    //Se a quantidade de emails encontradas for maior que 1,
    //não deve adicionar no banco essa entrada e retonar que email já está sendo utilizado
    if(resultadoCPF.Items.length >= 1)
    {
        event.arguments.input.cpf = "nao_unico"
    }

    /////////////////////
    //Verifica Telefone//
    /////////////////////
    /* NÃO VERIFICA MAIS TELEFONE E EMAIL POR CONTA DA UTILIZAÇÃO DO AUTH
    var paramsPhone =  {
        TableName:'Client-fj4h4cg72vbi3fw7ghwf53xggu-devclone',
        FilterExpression:'phone = :phone',
        ExpressionAttributeValues:{ ":phone" : event.arguments.input.phone,}
    };//Espera a promessa de pesquisa terminar antes de continuar a execução do código
    let resultadoPhone = await ddb.scan(paramsPhone).promise();
    
    //Se a quantidade de emails encontradas for maior que 1,
    //não deve adicionar no banco essa entrada e retonar que email já está sendo utilizado
    if(resultadoPhone.Items.length >= 1)
    {
        event.arguments.input.phone = "nao_unico"
    }

    //////////////////
    //Verifica Email//
    //////////////////
    var paramsEmail =  {
        TableName:'Client-fj4h4cg72vbi3fw7ghwf53xggu-devclone',
        FilterExpression:'email = :email',
        ExpressionAttributeValues:{ ":email" : event.arguments.input.email,}
    };//Espera a promessa de pesquisa terminar antes de continuar a execução do código
    let resultadoEmail = await ddb.scan(paramsEmail).promise();
    
    //Se a quantidade de emails encontradas for maior que 1,
    //não deve adicionar no banco essa entrada e retonar que email já está sendo utilizado
    if(resultadoEmail.Items.length >= 1)
    {
        event.arguments.input.email = "nao_unico"
    }
    */

    ////////////////
    //Retorna erro//
    ////////////////
    if(resultadoCPF.Items.length >= 1 /*|| resultadoPhone >= 1 || resultadoEmail >= 1*/){
        event.arguments.input.id = "nao_unico" //Gera ID unico
        return event.arguments.input
    }
    
    ///////////////////////////////////////
    //Checa se está sendo enviado com JWT//
    ///////////////////////////////////////
    if(event.identity === undefined)
    {
        event.arguments.input.id = "auth error" //Gera ID unico
        return event.arguments.input
    }

    /////////////////////////
    //Cria entrada no banco//
    /////////////////////////
    //Se nenhum dos parametros acima foi encontrado, cria uma entrada no banco com os valores passados
    event.arguments.input.id = uuidv4() //Gera ID unico
    event.arguments.input.owner = event.identity.username   //Adiciona ID do usuário que criou os dados
    //Prepara parametros para adicionar no banco de dados
    const paramsEntrada = {
        TableName: 'Client-fj4h4cg72vbi3fw7ghwf53xggu-devclone',
        Item: event.arguments.input
    }
    let putResultado = await ddb.put(paramsEntrada).promise().catch((err) => {
        console.error(err)
        return {id: "error"}
    });
    console.log("Deu tudo certo")
    return event.arguments.input
};
