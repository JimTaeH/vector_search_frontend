import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from "axios";

function SearchResults() {
    const [products, setProducts] = useState([]);
    const [searchPrompt, setSearchPrompt] = useState();
    const [productIDS, setProductIDS] = useState([]);
    const [suggestion, setSuggestion] = useState();
    const navigate = useNavigate();

    function handleProductIDS(e) {
        setProductIDS([
            ...productIDS, 
            {"productID": e.target.value}
        ])
    }

    function handleProductCompare() {
        navigate('/comparison', {state: productIDS})
    }

    function handleSearchPrompt(e) {
        setSearchPrompt(e.target.value);
    }

    function handleSearchRequest() {
        const promise = axios.post('/api/product_embedd_first_text_later', {"sprompt": searchPrompt})
        promise.then((response) => setProducts(response.data.all_product))
    }

    function handleSuggestion(e) {
        const idOfProduct = e.target.value
        const promise = axios.post('/api/product_single_suggestion', {"productid": idOfProduct})
        setSuggestion("Loading...")
        promise.then((response) => setSuggestion(response.data))
    }

    return (
        <>
            <h1 className="display-1 text-center" style={{color: "#FFFFFF", fontWeight: "bolder"}}> Search Products </h1>
            <div className='container'>
                <div className="row justify-content-center">
                    <p className='text-center' style={{color: "#FFFFFF"}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>
            <div className='container mt-5'>
                <h5 className="display-5 text-left" style={{color: "#FFFFFF", fontWeight: "bolder"}}> Price Comparison </h5>
                <div className='row'>
                    {productIDS.map((productID) => (
                        <div className='col'>
                            <p className='text-center' style={{color: "#FFFFFF", backgroundColor: "#000"}}> {productID.productID} </p>
                        </div>
                        ))}
                </div>
                <button type="button" className="btn btn-dark mt-3" onClick={handleProductCompare}> compare </button>
            </div>
            <div className='container mt-5'>
                <div className="row justify-content-center">
                    <p className='text-center' style={{color: "#C8ACD6"}}>
                        <b> Search for any product that you want </b>
                    </p>
                </div>
                <div className="row">
                    <div className='col-10'>
                        <input type="text" className="form-control" placeholder="enter what you need ..." style={{maxWidth: "100%"}} value={searchPrompt} onInput={handleSearchPrompt}></input>
                    </div>
                    <div className='col-2 d-flex justify-content-center'>
                        <button type="submit" class="btn btn-primary" onClick={handleSearchRequest} style={{width: "75%", backgroundColor: "#A91D3A", borderColor: "transparent"}}>Search</button>
                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                <div className='row'>
                    {products.map(
                        (product) => (
                            <div className='col mt-3'>
                                <div className="card" style={{width: "25rem", backgroundColor: "#EEEEEE", borderBottomLeftRadius: "5%", borderBottomRightRadius: "5%"}}>
                                    <img src={product.image !== "No Image" ? (product.image) : ("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png")} className="card-img-top" alt="..." style={{height: "20rem"}}></img>
                                    <div className="card-body">
                                        <h5 className="card-title"> {product.name} </h5>
                                        <p className="card-text"> {product.brand} </p>
                                        <p className="card-text"> {product.price} </p>
                                        <div className='d-flex justify-content-center'>
                                            <a href={product.link} className="btn btn-primary ms-2" target='_blank' rel='noreferrer' style={{backgroundColor: "#C73659", borderColor: "transparent"}}> Go to store </a>
                                            <button className="btn btn-primary ms-2" value={product.productID} onClick={handleProductIDS} style={{backgroundColor: "#C73659", borderColor: "transparent"}}> Wishlist </button>
                                            <button type="button" className="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#scrollBackdrop" value={product.productID} onClick={handleSuggestion} style={{backgroundColor: "#C73659", borderColor: "transparent"}}> Suggestion </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
                <div className="modal fade" id="scrollBackdrop">
                    <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div class="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Product Suggestion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" dangerouslySetInnerHTML={{__html: suggestion}}>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SearchResults;