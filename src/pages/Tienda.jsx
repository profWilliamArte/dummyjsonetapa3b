import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";

const API='https://dummyjson.com/products?limit=10&skip=';
const Tienda = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // paginador
    const [skip, setSkip] = useState(0);
    const [total , setTotal] = useState(0);
    const [paginas, setPaginas] = useState(10);
    const URI=API+skip
    const getDatos = async () => {
        try {
            const response = await fetch(URI);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.products);
            setTotal(data.total)
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, [skip]);
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
                <h4>Error al cargar los datos</h4>
                <p>{error}</p>
            </div>
        );
    }
    return (

<div className="container-fluid feature bg-light py-5">
  <div className="container py-5">
    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: 800}}>
      <h4 className="text-primary"> Lista de </h4>
      <h1 className="display-4 mb-4">Productos</h1>

        <div className="d-flex justify-content-between align-content-center border-bottom mb-3 pb-2">
          <p className="lead m-0 fw-bold text-sombra ">Pagina {Math.floor(skip / 10) + 1} de {Math.ceil(total / 10)}</p>
          <nav className="">
            <ul className="pagination m-0">
              <li className="page-item">
                <a className="page-link" href="#"
                  onClick={() => {
                    if (skip >= paginas) {
                      setSkip(skip - paginas);
                    }
                  }}
                >
                  &lt;&lt;
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  {Math.floor(skip / paginas) + 1}
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#"
                  onClick={() => {
                    if (skip + paginas < total) {
                      setSkip(skip + paginas);
                    }
                  }}
                >
                  &gt;&gt;
                </a>
              </li>
            </ul>
          </nav>

        </div>
   
        


        <div className="row justify-content-center">
                {datos.map((item) => (
                    <CardProductos key={item.id} item={item} />
                ))}

            </div>
    </div>

    
  </div>
</div>



    )
}

export default Tienda