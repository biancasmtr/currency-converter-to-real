# Projeto Conversor de moedas - com [Angular CLI](https://github.com/angular/angular-cli) versão 16.1.0.

O projeto consiste em um site simples onde apresenta informações de conversão de moedas, sendo exibidas as informações do valor de R$1 (BRL) para as seguintes 3 moedas: Dólar Canadense (CAD), Peso Argentino (ARS) e Libra Esterlina (GBP). Os valores são recuperados através da [Awsome API](https://docs.awesomeapi.com.br/api-de-moedas). São exibidos na tela as informações de valor da moeda, variação e último horário de atualização.
Os dados são salvos em cache no localStorage por 3 minutos e a página atualiza as informações também a cada 3 minutos.

O projeto foi criado em Angular 16. Os testes foram realizados com Jasmine e Karma e estilizado com SCSS.

## Antes de começar

Certifique-se de ter instalado o Node.js 12.22.0 ou superior em sua máquina. Você pode usar o nvm para gerenciar várias versões de nós em sua máquina.
Certifique-se de ter instalada a última versão do Angular em sua máquina, você pode instalá-lo utilizando o seguinte código em seu prompt de comando: 

```
npm install - g @angular/cli
```

## Começando

Você pode configurar este projeto usando gerenciadores de pacotes npm ou yarn.

## Clonar repositório

``` 
https://github.com/biancasmtr/currency-converter-to-real
```

## Navegue até o repositório clonado

``` 
cd currency-converter-to-real
```

## Instalar dependências

``` 
yarn install
#or
npm install
```

## Iniciar servidor de desenvolvimento

``` 
ng serve
```

Abra http://localhost:4200 (ou a porta que ele sugerir) com seu navegador para ver o resultado.

## Teste Unitários

abra seu command line/prompt de comando e dentro da raiz do projetos execute a seguinte instrução

``` 
ng test
```
