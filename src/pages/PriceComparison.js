import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useLocation } from 'react-router-dom';
import axios from "axios";

function PriceComparison() {
    const [products, setProducts] = useState([]);
    const productToCompare = useLocation();
    const [suggestion, setSuggestion] = useState();
    const [prompt, setPrompt] = useState();

    function handleProductCompare() {
        const promise = axios.post('/api/user_product_comparison', {"productids": productToCompare.state})
        promise.then((response) => setProducts(response.data.all_product))
    }

    function handleSuggestion() {
        const promise = axios.post('/api/product_suggestion', {"productids": productToCompare.state})
        setSuggestion("Loading")
        promise.then((response) => setSuggestion(response.data))
    }

    function handlePrompt(e) {
        setPrompt(e.target.value)
    }

    function handleAnySuggestion(e) {
        const promise = axios.post('/api/product_any_suggestion', {"sprompt": prompt})
        setSuggestion("Loading")
        promise.then((response) => setSuggestion(response.data))
    }

    useEffect(() => {
        handleProductCompare();
    }, []);

    return (
        <>
            <div className='container mt-5'>
                <h1 className="display-1 text-center" style={{color: "#FFFFFF", fontWeight: "bolder"}}> Product Comparison </h1>
            </div>
            <div className='container mt-5 d-flex justify-content-center'>
                { suggestion ? (<div className='pt-5 pb-5 ps-5 pe-5' style={{backgroundColor: "#EEEEEE"}} dangerouslySetInnerHTML={{__html: suggestion}}></div>) : (<button className='btn btn-primary' onClick={handleSuggestion} style={{backgroundColor: "#A91D3A", borderColor: "transparent"}}> Get Suggestion </button>) }
            </div>
            <div className='container mt-3'>
                <div className="row">
                    <div className='col-10'>
                        <input type="text" className="form-control" placeholder="enter what you need ..." style={{maxWidth: "100%"}} value={prompt} onInput={handlePrompt}></input>
                    </div>
                    <div className='col-2 d-flex justify-content-center'>
                        <button type="submit" class="btn btn-primary" onClick={handleAnySuggestion} style={{width: "75%", backgroundColor: "#A91D3A", borderColor: "transparent"}}>Submit</button>
                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                {products.map(
                    (product) => (
                        <div class="card border-white mb-3" style={{maxWidth: "100%", backgroundColor: "transparent"}}>
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={product.image !== "No Image" ? (product.image) : ("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png")} class="img-fluid rounded-start" alt="..."></img>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title" style={{color: "#FFF"}}> {product.name} </h5>
                                        <p class="card-text" style={{color: "#FFF"}}> {product.description} </p>
                                        <p class="card-text" style={{color: "#FFF"}}> Price: {product.price} </p>
                                        <p class="card-text" style={{color: "#FFF"}}> Brand: {product.brand} </p>
                                        <a href={product.link} className="btn btn-primary ms-2" target='_blank' rel='noreferrer' style={{backgroundColor: "#A91D3A", borderColor: "transparent"}}> Go to store </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    )
};

export default PriceComparison;