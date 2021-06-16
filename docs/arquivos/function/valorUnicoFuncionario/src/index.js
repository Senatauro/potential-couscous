/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk'); 
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'}); 

exports.handler = async (event, context, callback) => 
{
    /*
        NÃO É MAIS NECESSÁRIO, TUDO PODE SER FEITO PELO AUTH
    */
    console.log(JSON.stringify(event, 0,4))
    //Prepara pesquisa para verificar cnpj
    var paramsLogin =  {
        TableName:'Employee-fj4h4cg72vbi3fw7ghwf53xggu-devclone',
        FilterExpression:'login = :login',
        ExpressionAttributeValues:{ ":login" : event.arguments.input.login,}
    };//Espera a promessa de pesquisa terminar antes de continuar a execução do código
    let resultadoLogin = await ddb.scan(paramsLogin).promise();
    
    //Se a quantidade de emails encontradas for maior que 1,
    //não deve adicionar no banco essa entrada e retonar que email já está sendo utilizado
    if(resultadoLogin.Items.length >= 1)
    {
        event.arguments.input.login = "nao_unico"
    }

    ////////////////
    //Retorna erro//
    ////////////////
    if(resultadoLogin.Items.length >= 1){
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
        TableName: 'Employee-fj4h4cg72vbi3fw7ghwf53xggu-devclone',
        Item: event.arguments.input
    }
    let putResultado = await ddb.put(paramsEntrada).promise().catch((err) => {
        console.error(err)
        return {id: "error"}
    });
    console.log("Deu tudo certo")
    return event.arguments.input
};
