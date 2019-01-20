import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Должность:</strong> {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Местоположение:</strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Описание:</strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Степень:</strong> {edu.degree}
        </p>
        <p>
          <strong>Область знаний:</strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.location === "" ? null : (
            <span>
              <strong>Местоположение:</strong> {edu.location}
            </span>
          )}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Описание:</strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Опыт работы</h3>
          {expItems.length > 0 ? (
            <ul>{expItems}</ul>
          ) : (
            <p className="text-center">Не указано</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Образование</h3>
          {eduItems.length > 0 ? (
            <ul>{eduItems}</ul>
          ) : (
            <p className="text-center">Не указано</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
