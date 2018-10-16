import React, { Component } from "react";

export default class Register extends Component {
    render(){
        return (
          <React.Fragment>
            <div className="row">
                <div>
                    <h4><strong>Register HashTag</strong></h4>
                    <button type="button" className="btn btn-success" data-toggle="modal" data-target="#hashtagModal">Register</button>
                </div>
            </div>

            <div className="modal" id="hashtagModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Register HashTag</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="X">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="register-tag">Name</label>
                                    <input type="text" className="form-control" id="register-tag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
          </React.Fragment>  
        );
    }
}