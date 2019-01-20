import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>{exp.location}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>
          &ndash;
          {exp.current === true ? (
            "now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Удалить
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Опыт работы</h4>
        {experience.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Компания</th>
                <th>Наименование</th>
                <th>Местоположение</th>
                <th>Период</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{experience}</tbody>
          </table>
        ) : (
          <p>Не указано</p>
        )}
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
