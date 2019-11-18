import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import AutenticarUsuario from './AutenticarUsuario';
import CadastrarFornecedor from './CadastrarFornecedor';
import ConsultarFornecedor from './ConsultarFornecedor';

class Layout extends Component {

    //método utilizado para renderizar o conteúdo HTML do component
    render() {
        return (

            <HashRouter>

                <div className="container">

                    <div className="card card-body bg-dark text-white">
                        <h3>Sistema de Controle de Produtos</h3>
                        <div>First React App</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <ul>
                                <li><NavLink to = "/login">Autenticar Usuário</NavLink></li>
                                <li><NavLink to = "/cadastro-fornecedor">Cadastrar Fornecedores</NavLink></li>
                                <li><NavLink to = "/consulta-fornecedor">Consultar Fornecedores</NavLink></li>
                            </ul>
                        </div>
                        <div className="col-md-9">
                            
                            <Route path = "/login" component={AutenticarUsuario} />
                            <Route path = "/cadastro-fornecedor" component={CadastrarFornecedor} />
                            <Route path = "/consulta-fornecedor" component={ConsultarFornecedor} />

                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Layout;