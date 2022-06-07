import { setModalShow } from "../store/actions/modalAction";
import { fetchCompany } from "../store/actions/companyAction";
import { useSelector, useDispatch } from "react-redux";
import { deleteCompany } from "../store/actions/companyAction";
import FormView from "./FormView";
import { useEffect, useState } from "react";
export default function CommpanyView() {
  const dispatch = useDispatch();
  const { modalShow, companyData } = useSelector((state) => state.company);
  const [edits, setEdit] = useState(false);

  function edit() {
    setEdit(true);
    dispatch(setModalShow(true));
  }

  function deleteById() {
    dispatch(deleteCompany(companyData.id));
  }
  useEffect(() => {
    dispatch(fetchCompany());
  }, []);
  return (
    <div className="table">
      <FormView
        show={modalShow}
        onHide={() => dispatch(setModalShow(false))}
        edits={edits}
      />
      <div className="container-xl">
        <div className="table-responsives">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6 titlefood">
                  <h2>
                    About <b>Company</b>
                  </h2>
                </div>
                {!companyData && (
                  <div className="col-sm-6">
                    <a
                      className="btn btn-success"
                      onClick={() => {
                        dispatch(setModalShow(true));
                      }}
                    >
                      <i className="material-icons">&#xE147;</i>
                      <span>Add Company</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div>
              {companyData && (
                <>
                  <section id="intro">
                    <div className="intro-content">
                      <h2 className="posisition">
                        {companyData.name}
                        <br></br>
                      </h2>
                      <div>
                        <p>
                          <b>Address :</b> {companyData.address}
                          <br></br>
                        </p>
                        <p>
                          <b>Description :</b> {companyData.description}
                          <br></br>
                        </p>
                        <a
                          onClick={() => {
                            edit();
                          }}
                          className="btn-get-started scrollto"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => {
                            deleteById();
                          }}
                          className="btn-projects scrollto"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
