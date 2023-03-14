import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filme.css'
import { toast } from 'react-toastify'

function Filme(){
    const { id } = useParams();
    const [filme, setFilme]= useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"d1506eaeddfd2d5fdfcd8f8e1c51722b",
                    language:"pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("filme nao encontrado")
                navigate('/', {replace : true});
                return;
            })
        }

        loadFilme();

        return (() =>{
                console.log('é')
        })
    }, [id,navigate])

    
    function salvarFilme(){
        const minhaLista = localStorage.getItem("@gikoflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme ja está na lista")
            return;

        }
        filmesSalvos.push(filme);
        localStorage.setItem("@gikoflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes</h1>
            </div>
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='button-area'>
                <button onClick={salvarFilme}>Salvar</button>
                <button><a  target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a></button>
            </div>
        </div>
    )
}

export default Filme;