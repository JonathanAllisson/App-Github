import React, {Component} from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnedAvatar, Info, Title, Author } from './styles';
import { View } from 'react-native';

export default class User extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
  };

  async componentDidMount(){

    const user = this.props.route.params.user;
    const type = this.props.route.params.type;

    const response = await api.get(`/users/${user.login}/${type}?sort=created`);

    this.setState({ stars: response.data });
  }

  render(){

    const { stars } = this.state;

    const user = this.props.route.params.user;

    return(
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnedAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
