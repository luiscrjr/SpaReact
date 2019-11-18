import React, { Component } from 'react'; 

class ConsultarFornecedor extends Component{

    constructor(props){
        super(props);

        this.state = {
            menwsagem : "", fornecedores : []
        };

        this.consultarFornecedores = this.consultarFornecedores.bind(this);
        this.excluirFornecedor = this.excluirFornecedor.bind(this);
    }

    excluirFornecedor(id){

        var self = this;

        if(confirm('Deseja excluir o registro?')){
            
            $.ajax({
                type: "DELETE",
                url: "http://localhost:61454/api/Fornecedor/" + id,
                headers: {'Authorization' : 'Bearer ' + localStorage["accessToken"] },
                success: function(data){
                    self.setState({ mensagem : "Fornecedor excluido com sucesso" });
                    self.consultarFornecedores();
                },
                error: function(e){
                    self.setState({ mensagem: "Erro ao excluir fornecedor" });
                }
              });

        }
    }

    consultarFornecedores(){
      var self = this;
      
      $.ajax({
        type: "GET",
        url: "http://localhost:61454/api/Fornecedor",
        headers: {'Authorization' : 'Bearer ' + localStorage["accessToken"] },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            
            self.setState({ fornecedores : data });

        },
        error: function(e){
            self.setState({ mensagem: e.responseText });
        }
      });
      
    };

    //função executada quando o componente é carregado...
    componentDidMount(){
        this.consultarFornecedores();
    }

    render(){

        var self = this;

        return(
            <div>

                <strong>{self.state.mensagem}</strong>

                <h4>Consultar Fornecedor</h4>
                <hr/>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome do Fornecedor</th>
                            <th>Razão Social</th>
                            <th>CNPJ</th>
                            <th>Operações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            self.state.fornecedores.map(function(item, i){
                                return (
                                    <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.razaoSocial}</td>
                                    <td>{item.cnpj}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                        onClick={e => self.excluirFornecedor(item.id)}>
                                            Excluir</button>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}

export default ConsultarFornecedor;