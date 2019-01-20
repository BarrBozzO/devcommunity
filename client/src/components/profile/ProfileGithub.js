import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: "64c2dce67ee6396ba8a7",
      clientSecret: "f4c35dfb0be22c40d3e71b4cf0701db79cda1299",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;

    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <h4>
            <a
              href={repo.html_url}
              className="text-info"
              rel="noopener noreferrer"
              target="_blank"
            >
              {repo.name}
            </a>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="col-md-6">
          <span className="badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge-success">Forks: {repo.forks_count}</span>
        </div>
      </div>
    ));

    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Последние Github репозитории</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.object.isRequired
};

export default ProfileGithub;
