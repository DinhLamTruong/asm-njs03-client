import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HistoryAPI from '../../API/HistoryAPI';

function DetailHistory(props) {
  const { id } = useParams();

  const [cart, setCart] = useState([]);

  const [information, setInformation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await HistoryAPI.getDetail(id);

      setCart(response[0].products);

      setInformation(response[0]);
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Detail Order</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active">Detail</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="p-5">
        <h1 className="h2 text-uppercase">Information Order</h1>
        <p>ID User: {information.userId}</p>
        <p>Full Name: {information.fullname}</p>
        <p>Phone: {information.phone}</p>
        <p>Address: {information.address}</p>
        <p>Total: {(+information.total).toLocaleString('vi-VN')} VND</p>
      </div>

      <div className="table-responsive pt-5 pb-5">
        <table className="table">
          <thead className="bg-light">
            <tr className="text-center">
              <th className="border-0" scope="col">
                {' '}
                <strong className="text-small text-uppercase">
                  ID Product
                </strong>
              </th>
              <th className="border-0" scope="col">
                {' '}
                <strong className="text-small text-uppercase">Image</strong>
              </th>
              <th className="border-0" scope="col">
                {' '}
                <strong className="text-small text-uppercase">Name</strong>
              </th>
              <th className="border-0" scope="col">
                {' '}
                <strong className="text-small text-uppercase">Price</strong>
              </th>
              <th className="border-0" scope="col">
                {' '}
                <strong className="text-small text-uppercase">Count</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map(value => (
                <tr className="text-center" key={value.productId._id}>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.productId._id}</h6>
                  </td>
                  <td className="pl-0 border-0">
                    <div className="media align-items-center justify-content-center">
                      <Link
                        className="reset-anchor d-block animsition-link"
                        to={`/detail/${value.productId._id}`}
                      >
                        <img src={value.productId.img1} alt="..." width="200" />
                      </Link>
                    </div>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.productId.name}</h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{(+value.productId.price).toLocaleString('vi-VN')} VND</h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.quantity}</h6>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailHistory;
