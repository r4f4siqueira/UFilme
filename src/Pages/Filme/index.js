import React, {useEffect, useState}from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import './filme-info.css'
import {toast} from 'react-toastify'

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-br",
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                console.log('Filme nao encontrado')
                navigate('/',{replace : true})
                return;
            })
        }
        loadFilme();
        return ()=>{
            console.log('Desmontar componente')
        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmesSalvo)=>filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn('Filme JÁ ESTÁ como favorito')
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
        toast.success('Filme salvo!')
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes ...</h1>
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
            <div className='area-buttons'>
                <button className='salvar' onClick={salvarFilme}>Adicionar aos Favoritos</button>
                <button className='trailer'>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title}`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}
export default Filme;