import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";

const API = 'https://dummyjson.com/products/category/smartphones';



const Movil = () => {




    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.products);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, []);
    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Datos...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los Datos</h4>
                <p>{error}</p>
            </div>
        );
    }
    return (

<div className="container-fluid feature bg-light py-5">
  <div className="container py-5" >
    <div className="text-center mx-auto pb-5 "  style={{maxWidth: 800}}>
      <h4 className="text-primary animate__animated animate__backInDown"> Lista de </h4>
      <h1 className="display-4 mb-4  animate__animated animate__bounce" data-wow-delay="0.2s">Celulares</h1>
     
      
        


        <div className="row justify-content-center animate__animated animate__fadeInUp" data-wow-delay="0.2s">
                {datos.map((item) => (
                    <CardProductos key={item.id} item={item} />
                ))}

            </div>
    </div>

    
  </div>
</div>



    )
}

export default Movil