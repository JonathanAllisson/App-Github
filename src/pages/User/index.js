import React, {Component} from 'react';
import api from '../../services/api';

import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnedAvatar, Info, Title, Author } from './styles';
import { View } from 'react-native';

export default class User extends Component {



  state = {
    repositories: [],
  };

  async componentDidMount(){

    const user = this.props.route.params.user;
    const type = this.props.route.params.type;

    const response = await api.get(`/users/${user.login}/${type}?sort=created`);

    this.setState({ repositories: response.data });
  }

  handleNavigate = (repository) =>{
    const { navigation } = this.props;

    console.log(repository);

    navigation.navigate('Repository', { repository });
  }

  render(){

    const { repositories } = this.state;

    const user = this.props.route.params.user;

    return(
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={repositories}
          keyExtractor={repository => String(repository.id)}
          renderItem={({ item }) => (
            <Starred onPress={() => this.handleNavigate(item)}>
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
