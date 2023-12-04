import './purchasing_policies.css';
function PurchasingPolicies() {
    return (
        <>
            <hr className='container'></hr>
            <section className="purchasing-policies">
                <div className='container main_poli'>
                    <div className="row sub_poli">
                        <div className="col-3 box-icon d-flex">

                            <span className='policies_icon'><i
                                className="bi bi-rocket-takeoff"></i></span>
                            <div className="content_box">
                                <p className='caption'>Free shiping</p>
                                <h5 className="fs-6">Invoice over 100$</h5>
                            </div>

                        </div>
                        <div className="col-3 box-icon d-flex">

                            <span className='policies_icon'><i
                                className="bi bi-arrow-counterclockwise"></i></span>
                            <div className="content_box" >
                                <p className='caption'>Refund</p>
                                <h5 className="fs-6">Within 30 days</h5>
                            </div>

                        </div>
                        <div className="col-3 box-icon d-flex">

                            <span className='policies_icon'><i className="bi bi-info-circle"></i></span>
                            <div className="content_box">
                                <p className='caption'>20% discount</p>
                                <h5 className="fs-6">Sign up an account</h5>
                            </div>

                        </div>
                        <div className="col-3 box-icon d-flex">

                            <span className='policies_icon'><i className="bi bi-headset"></i></span>
                            <div className="content_box">
                                <p className='caption'>Hotline</p>
                                <h5 className="fs-6">1134 3123</h5>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}

export default PurchasingPolicies;