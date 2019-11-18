import React, { Component } from 'react'; 

class AutenticarUsuario extends Component{

    constructor(props){
        super(props);

        //declarar os atributos da classe

        this.state = {
                mensagem : "", login: "", senha: ""
            }
        
        //registrando a função que será declarada na classe
        this.autenticar = this.autenticar.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    autenticar(e){
        e.preventDefault(); //anular a ação do submit do formulário
        this.setState({ mensagem : "Processando, por favor aguarde..." });

        var self = this;

        $.ajax({
            type : "POST",
            url: "http://localhost:61454/api/Login",
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                login : self.state.login,
                senha : self.state.senha
            }),
            success: function(result){
                
                result = JSON.parse(result);

                if(result.authenticated){
                
                    self.setState({ mensagem : "Usuário autenticado com sucesso."});
                    localStorage['accessToken'] = result.accessToken;

                    console.log(localStorage['accessToken']);
                }
            },
            error: function(e){
                
                if(e.status == 400){
                    self.setState({mensagem : "Acesso Negado"});
                }
                else{
                    self.setState({mensagem: "Ocorreu um erro"});
                    console.log(e);
                }
            }
        });
    };

    setLogin(e){
        this.setState( { login : e.target.value } );
    }

    setSenha(e){
        this.setState( { senha : e.target.value } );
    };

    render(){
        return(
            <div>
                <h4>Autenticar Usuário</h4>
                <hr/>

                <form method="post" onSubmit={this.autenticar}>

                    <label>Login de Acesso:</label>
                    <input type="text" className="form-control col-md-6" placeholder="Digite aqui"
                    onChange={this.setLogin}
                    value={this.state.login}/>
                    <br/>
                    <label>Senha de Acesso:</label>
                    <input type="password" className="form-control col-md-6" placeholder="Digite aqui"
                    onChange={this.setSenha}
                    value={this.state.senha}/>
                    <br/>
                    <button type="submit" value="Acessar Sistema" className = "btn btn-primary">Acessar Sistema</button>

                    <br/><br/>

                    <strong>{this.state.mensagem}</strong>

                </form>
            </div>
        )
    }
}

export default AutenticarUsuario;