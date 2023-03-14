import './erro.css';
import { Link } from 'react-router-dom';
function Erro(){
    return(
        <div className="erro">
            <h1>404</h1>
            <h2>Página Não Encontrada</h2>
            <Link to='/'>Veja todos filmes</Link>
        </div>
    )
}

export default Erro;