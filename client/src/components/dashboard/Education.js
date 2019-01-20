import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>
          &ndash;
          {edu.to === null ? (
            "now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Удалить
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Образование</h4>
        {education.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Учебное заведение</th>
                <th>Степень\Сертификат\...</th>
                <th>Область знаний</th>
                <th>Период</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{education}</tbody>
          </table>
        ) : (
          <p>Не указано</p>
        )}
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
