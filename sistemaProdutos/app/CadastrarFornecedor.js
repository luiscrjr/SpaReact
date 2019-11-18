import React, { Component } from 'react'; 

class CadastrarFornecedor extends Component{

    //construtor
    constructor(props){
        super(props);

        this.state = {
            mensagem : "", nome: "", razaoSocial: "", cnpj: ""
        };

        //registrando as funções
        this.cadastrarFornecedor = this.cadastrarFornecedor.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setRazaoSocial = this.setRazaoSocial.bind(this);
        this.setCnpj = this.setCnpj.bind(this);
    }

    cadastrarFornecedor(e){
        e.preventDefault();

        this.setState({ "mensagem" : "Processando, por favor aguarde..." });
        var self = this;

        $.ajax({
            type: "POST",
            url: "http://localhost:61454/api/Fornecedor",
            headers: {'Authorization' : 'Bearer ' + localStorage["accessToken"] },
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                nome : self.state.nome,
                razaoSocial : self.state.razaoSocial,
                cnpj : self.state.cnpj
            }),
            success: function(){
                self.setState({ mensagem : "Fornecedor cadastrado com sucesso." ,
                                nome : "",
                                cnpj : "",
                                razaoSocial : ""});
                
            },
            error: function(e){

                if(e.status == 401){
                    self.setState({ mensagem : "Acesso Negado" });
                }
                else{
                    self.setState({ mensagem: e.responseText });
                    console.log(e);
                }

            }
        });
    };

    setNome(e){
        this.setState({ nome : e.target.value })
    };

    setRazaoSocial(e){
        this.setState({ razaoSocial : e.target.value })
    };

    setCnpj(e){
        this.setState({ cnpj : e.target.value })
    };

    render(){
        return(
            <div>
                <h4>Cadastrar Fornecedor</h4>
                <hr/>

                <form method="post" id="formCadastroFornecedor" onSubmit={this.cadastrarFornecedor}>
                    <label>Nome do Fornecedor:</label>
                    <input type="text" className="form-control col-md-6" placeholder="Digite aqui"
                    onChange={this.setNome}
                    value={this.state.nome}/>

                    <br/>

                    <label>Razão social:</label>
                    <input type="text" className="form-control col-md-6" placeholder="Digite aqui"
                    onChange={this.setRazaoSocial}
                    value={this.state.razaoSocial}/>

                    <br/>

                    <label>CNPJ:</label>
                    <input type="text" className="form-control col-md-6" placeholder="Digite aqui"
                    onChange={this.setCnpj}
                    value={this.state.cnpj}/>

                    <br/>

                    <input type="submit" className="btn btn-success" value="Cadastrar Fornecedor"/>

                    <br/><br/>

                    <strong>{this.state.mensagem}</strong>

                </form>

            </div>
        )
    }
}

export default CadastrarFornecedor;