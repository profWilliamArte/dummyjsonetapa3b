import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import ModalProductos from "./ModalProductos";

import { CarritoContext } from "../contexts/CarritoContext"
import { formatCurrency } from "../util/funciones";



const CardProductos = ({ item }) => {


    const { cart, agregar } = useContext(CarritoContext)

    const getCantidad = (producto) => {
        return cart.find((item) => item.id === producto.id)?.cantidad || 0
    }

    const totalProd = getCantidad(item)
    const precioTotal = parseFloat(item.price * totalProd);



    const [cant, setCant] = useState(() => getCantidad(item) || 1);
    const handleChange = (event) => {
        setCant(event.target.value);
    };
    return (
        <div className="col-md-4 col-xl-3 mb-3 " key={item.id}>
            <div className="card h-100 ">
                <div className="card-header p-0">
                    {totalProd > 0 && (
                        <span
                            className="badge rounded-pill bg-warning text-dark  fs-3 m-1" style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}>
                            {totalProd}
                        </span>
                    )}
                    <img src={item.thumbnail} alt="" className="img-fluid" />
                </div>
                <div className="card-body text-center">
                    <p className="fs-5">{item.title}</p>
                    <p className="text-muted">
                        <b>Marca:</b> {item.brand}<br />
                        <b>Stock:</b> {item.stock}
                    </p>
                    <p className="fs-6 text-danger fw-bold">Precio: {formatCurrency(item.price)}$</p>
                </div>
                <div className="card-footer text-center">
                    <a href="#" className="btn btn-primary btn-sm me-3" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>Modal</a>
                    <Link to={`/detalle/${item.id}/${item.title}`} href="#" className="btn btn-info btn-sm" >Detalle</Link>
                    <hr />
                    <div className="d-flex justify-content-center">
                    <select
                        value={cant}
                        onChange={handleChange}
                        className="form-control bg-dark text-white-50"
                        style={{ width: 70 }}
                    >
                        {Array.from({ length: item.stock + 1 }, (_, i) => i).map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {totalProd === 0 ? (
                        <button className="btn btn-outline-success btn-sm mx-1" onClick={() => agregar(item, cant)}>Add</button>
                    ) : (
                        <button className="btn btn-outline-warning btn-sm mx-1" onClick={() => agregar(item, cant)}>OK</button>
                    )}
                    </div>
                   
                </div>
            </div>

            <ModalProductos item={item} />



        </div>
    )
}

export default CardProductos